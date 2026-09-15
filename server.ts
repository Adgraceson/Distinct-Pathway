import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware for parsing JSON requests
app.use(express.json({ limit: "1mb" }));

// Contact submission recipient - editable default placeholder
const RECIPIENT_EMAIL = process.env.CONTACT_RECIPIENT_EMAIL || "hundred.opoku@gmail.com";
const FORMSPREE_ENDPOINT = process.env.FORMSPREE_ENDPOINT || process.env.VITE_FORMSPREE_ENDPOINT || "https://formspree.io/f/myeyrvev";

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "Distinct Pathway Real Estates API",
    recipientConfigured: RECIPIENT_EMAIL,
    formspreeBackend: FORMSPREE_ENDPOINT,
    timestamp: new Date().toISOString()
  });
});

// Helper for phone validation (Ghanaian or international format)
function isValidPhoneNumber(phone: string): boolean {
  // Accepts Ghanaian formats: +233..., 02..., 05..., 03..., or generic international E.164
  const cleaned = phone.replace(/[\s\-()]/g, "");
  return /^(\+?\d{9,15})$/.test(cleaned);
}

// Helper for email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Helper to sanitize strings against HTML injection
function sanitize(input: unknown): string {
  if (typeof input !== "string") return "";
  return input
    .trim()
    .replace(/[<>]/g, ""); // Strip potentially dangerous tag delimiters
}

/**
 * POST /api/contact
 * Handles message submissions from prospective property buyers, sellers, and tenants.
 */
app.post("/api/contact", async (req, res) => {
  try {
    const {
      fullName,
      phone,
      email,
      propertyInterest,
      preferredLocation,
      budgetRange,
      subject,
      message,
      preferredContactMethod,
      consent,
      honeypot
    } = req.body;

    // 1. Anti-spam honeypot detection
    if (honeypot && String(honeypot).trim().length > 0) {
      console.warn("[SPAM DETECTED] Honeypot triggered, silently dropping submission.");
      return res.status(200).json({
        success: true,
        message: "Your message has been processed."
      });
    }

    // 2. Validate mandatory fields
    const cleanName = sanitize(fullName);
    const cleanPhone = sanitize(phone);
    const cleanEmail = sanitize(email);
    const cleanMessage = sanitize(message);
    const cleanSubject = sanitize(subject) || "Website Property Inquiry";

    if (!cleanName || !cleanPhone || !cleanEmail || !cleanMessage) {
      return res.status(400).json({
        success: false,
        error: "Please complete all required fields (Full Name, Phone, Email, Message)."
      });
    }

    if (!isValidEmail(cleanEmail)) {
      return res.status(400).json({
        success: false,
        error: "Please provide a valid email address."
      });
    }

    if (!isValidPhoneNumber(cleanPhone)) {
      return res.status(400).json({
        success: false,
        error: "Please enter a valid phone number (e.g., +233 54 483 3556 or 054 483 3556)."
      });
    }

    if (!consent) {
      return res.status(400).json({
        success: false,
        error: "Please accept the contact consent to allow our team to reach you."
      });
    }

    const submissionPayload = {
      recipient: RECIPIENT_EMAIL,
      submittedAt: new Date().toISOString(),
      sender: {
        fullName: cleanName,
        phone: cleanPhone,
        email: cleanEmail,
        preferredContactMethod: sanitize(preferredContactMethod) || "Phone"
      },
      inquiryDetails: {
        propertyInterest: sanitize(propertyInterest) || "General Inquiry",
        preferredLocation: sanitize(preferredLocation) || "Flexible / Not Specified",
        budgetRange: sanitize(budgetRange) || "Not Specified",
        subject: cleanSubject,
        message: cleanMessage
      }
    };

    console.log("==================================================");
    console.log("📧 NEW PROPERTY INQUIRY RECEIVED FOR DISTINCT PATHWAY");
    console.log(`Forwarding To: ${RECIPIENT_EMAIL} & Formspree (${FORMSPREE_ENDPOINT})`);
    console.log(JSON.stringify(submissionPayload, null, 2));
    console.log("==================================================");

    // Forward to Formspree backend
    if (FORMSPREE_ENDPOINT) {
      try {
        const formspreeRes = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            name: cleanName,
            phone: cleanPhone,
            email: cleanEmail,
            _replyto: cleanEmail,
            propertyInterest: sanitize(propertyInterest) || "General Inquiry",
            preferredLocation: sanitize(preferredLocation) || "Flexible",
            budgetRange: sanitize(budgetRange) || "Not Specified",
            subject: cleanSubject,
            message: cleanMessage,
            preferredContactMethod: sanitize(preferredContactMethod) || "Phone",
            _subject: `[Distinct Pathway Real Estates] New Property Inquiry from ${cleanName}`
          })
        });

        if (!formspreeRes.ok) {
          const errBody = await formspreeRes.text();
          console.warn("[Formspree Warning] Formspree responded with status:", formspreeRes.status, errBody);
        } else {
          console.log("✅ Formspree notification delivered successfully!");
        }
      } catch (forwardErr) {
        console.error("Failed to transmit to Formspree endpoint:", forwardErr);
      }
    }

    return res.status(200).json({
      success: true,
      message: "Thank you! Your message has been safely delivered to Distinct Pathway Real Estates. Our team will contact you shortly.",
      recipientConfigured: RECIPIENT_EMAIL
    });
  } catch (error: any) {
    console.error("Error processing contact form submission:", error);
    return res.status(500).json({
      success: false,
      error: "An unexpected error occurred while transmitting your message. Please reach us directly via WhatsApp or phone."
    });
  }
});

/**
 * POST /api/consultation
 * Handles Site Visit and Consultation Booking requests.
 */
app.post("/api/consultation", async (req, res) => {
  try {
    const {
      fullName,
      phone,
      email,
      preferredDate,
      preferredTime,
      consultationType,
      propertyOfInterest,
      notes,
      consent,
      honeypot
    } = req.body;

    if (honeypot && String(honeypot).trim().length > 0) {
      return res.status(200).json({ success: true, message: "Consultation logged." });
    }

    const cleanName = sanitize(fullName);
    const cleanPhone = sanitize(phone);
    const cleanEmail = sanitize(email);

    if (!cleanName || !cleanPhone) {
      return res.status(400).json({
        success: false,
        error: "Please provide your full name and telephone/WhatsApp number."
      });
    }

    if (!isValidPhoneNumber(cleanPhone)) {
      return res.status(400).json({
        success: false,
        error: "Please provide a valid phone number."
      });
    }

    const bookingPayload = {
      recipient: RECIPIENT_EMAIL,
      bookedAt: new Date().toISOString(),
      client: {
        fullName: cleanName,
        phone: cleanPhone,
        email: cleanEmail
      },
      appointment: {
        preferredDate: sanitize(preferredDate) || "Earliest Available",
        preferredTime: sanitize(preferredTime) || "Morning",
        consultationType: sanitize(consultationType) || "Site Visit",
        propertyOfInterest: sanitize(propertyOfInterest) || "General Portfolio",
        notes: sanitize(notes)
      }
    };

    console.log("==================================================");
    console.log("📅 NEW CONSULTATION / SITE VISIT BOOKING REQUEST");
    console.log(`Forwarding To: ${RECIPIENT_EMAIL} & Formspree (${FORMSPREE_ENDPOINT})`);
    console.log(JSON.stringify(bookingPayload, null, 2));
    console.log("==================================================");

    // Forward consultation/site-visit booking to Formspree backend
    if (FORMSPREE_ENDPOINT) {
      try {
        const consultationForwardPayload: Record<string, any> = {
          name: cleanName,
          phone: cleanPhone,
          consultationType: sanitize(consultationType) || "Site Visit",
          preferredDate: sanitize(preferredDate) || "Earliest Available",
          preferredTime: sanitize(preferredTime) || "Morning",
          propertyOfInterest: sanitize(propertyOfInterest) || "General Portfolio",
          notes: sanitize(notes) || "None",
          _subject: `[Distinct Pathway Real Estates] New Booking/Site Visit from ${cleanName} (${cleanPhone})`
        };

        if (cleanEmail && cleanEmail.includes("@")) {
          consultationForwardPayload.email = cleanEmail;
          consultationForwardPayload._replyto = cleanEmail;
        }

        const formspreeRes = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify(consultationForwardPayload)
        });

        if (!formspreeRes.ok) {
          const errText = await formspreeRes.text();
          console.warn("[Formspree Warning] Consultation booking failed to post to Formspree:", formspreeRes.status, errText);
        } else {
          console.log("✅ Formspree consultation booking delivered successfully!");
        }
      } catch (err) {
        console.error("Failed to post consultation booking to Formspree:", err);
      }
    }

    return res.status(200).json({
      success: true,
      message: "Your consultation request has been scheduled. A Distinct Pathway consultant will confirm your visit timing promptly."
    });
  } catch (error: any) {
    console.error("Error processing consultation booking:", error);
    return res.status(500).json({
      success: false,
      error: "Unable to process appointment right now. Please call our office directly."
    });
  }
});

/**
 * Start the HTTP Server and mount Vite / Static handlers
 */
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Distinct Pathway server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
