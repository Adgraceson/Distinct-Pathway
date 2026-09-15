/**
 * Distinct Pathway Real Estates - Company Information & Editable Placeholders
 * 
 * Instructions for Owner:
 * Update any of these values to immediately update them across the entire website.
 */

export const COMPANY_INFO = {
  name: "Distinct Pathway Real Estates",
  shortName: "Distinct Pathway",
  tagline: "Building Distinct Pathways to Property Ownership",
  country: "Ghana",
  
  // Contact Details
  phone: "+233544833556",
  phoneDisplay: "+233 54 483 3556",
  whatsappNumber: "233544833556", // Number without '+' for wa.me links
  whatsappDisplay: "+233 54 483 3556",
  email: "distinctpathway@gmail.com",
  recipientEmail: "distinctpathway@gmail.com", // Backend form submissions recipient
  formspreeEndpoint: "https://formspree.io/f/myeyrvev", // Formspree submission endpoint
  
  // Physical Office
  officeLocation: "Tema - Ashaiman",
  fullAddress: "Off Ashaiman - Tema Main Road, Greater Accra Region, Ghana",
  businessHours: "Monday - Friday / 8 am - 4 pm",
  businessHoursShort: "Mon - Fri: 8:00 AM - 4:00 PM",
  
  // Social Media Links
  socials: {
    facebook: "https://www.facebook.com/share/1LtoEnBqAm/",
    instagram: "https://www.instagram.com/distinctpathway", // Profile handle: distint pathway
    instagramHandle: "@distinctpathway",
    tiktok: "https://www.tiktok.com/@humble_graceson?_r=1&_t=ZS-99k8nJsyao8",
    tiktokHandle: "@humble_graceson"
  },
  
  // Leadership / CEO
  ceo: {
    name: "HUMBLE GRACESON",
    title: "C.E.O & Founder",
    role: "Chief Executive Officer",
    image: "https://i.imgur.com/dDJT1p7.png",
    localImage: "/ceo-humble-graceson.png",
    bio: "Visionary real estate leader committed to simplifying property acquisition across Ghana through authentic documentation, site verification, and trusted client partnerships."
  },

  // Standard WhatsApp enquiry prefilled message
  defaultWhatsAppMessage: "Hello Distinct Pathway Real Estates, I would like to enquire about a property.",
  
  // Google Maps Embed URL for Tema - Ashaiman
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63529.56994119934!2d-0.05282498263725585!3d5.698379493988628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf7df4ba057731%3A0x6b4aa311a76ebfc9!2sAshaiman!5e0!3m2!1sen!2sgh!4v1710000000000!5m2!1sen!2sgh",
  
  // Colors for inline styling reference
  colors: {
    primaryOrange: "#F36B21",
    deepCharcoal: "#222222",
    warmWhite: "#F8F7F4",
    pureWhite: "#FFFFFF",
    softCloud: "#DDE3E7",
    borderGrey: "#E7E7E7",
    landscapeGreen: "#4F713C"
  }
};

/**
 * Generate a pre-filled WhatsApp link with a custom text message
 */
export function getWhatsAppLink(customMessage?: string): string {
  const message = customMessage || COMPANY_INFO.defaultWhatsAppMessage;
  return `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
