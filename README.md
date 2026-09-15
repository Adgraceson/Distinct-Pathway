# Distinct Pathway Real Estates — Web Application

A modern, responsive, and conversion-focused real-estate web application crafted for **Distinct Pathway Real Estates**, operating in Ghana.

---

## 🎨 Brand Design & Color Palette

- **Primary Orange**: `#F36B21` (Call-to-action buttons, badges, highlights, accents)
- **Deep Charcoal**: `#222222` (Headers, dark cards, footer, high-contrast framing)
- **Warm White / Sand**: `#F8F7F4` (Section canvas, subtle alternating background)
- **Pure White**: `#FFFFFF` (Content cards, modal sheets, elevated surfaces)
- **Soft Cloud Grey**: `#DDE3E7` (Subtle dividers, input borders, secondary icons)
- **Light Border Grey**: `#E7E7E7` (Crisp container boundaries)
- **Landscape Green**: `#4F713C` / Emerald (Trust markers, WhatsApp actions, status badges)

---

## 🏗️ Architecture & Component Hierarchy

```
├── .env.example                 # Environment variables specification
├── index.html                   # Entry point with SEO metadata and Open Graph tags
├── metadata.json                # Project metadata
├── package.json                 # Dependencies and build scripts
├── server.ts                    # Full-stack Express server handling /api/contact & /api/consultation
├── src/
│   ├── main.tsx                 # React DOM bootstrapper
│   ├── App.tsx                  # Master application layout and state coordinator
│   ├── index.css                # Global Tailwind CSS directives & color variables
│   ├── types/
│   │   └── index.ts             # TypeScript interfaces (Property, Service, Contact, etc.)
│   ├── data/
│   │   ├── companyInfo.ts       # Centralized business info (Phone, Email, Office, Socials, Maps)
│   │   ├── properties.ts        # Comprehensive Ghana property catalog (Prices in GH₵)
│   │   ├── services.ts          # 8 Core services data & detailed benefits
│   │   └── testimonials.ts      # Sample client journey showcase & feedback
│   └── components/
│       ├── Navbar.tsx           # Sticky brand navigation with phone & consultation trigger
│       ├── Hero.tsx             # Cinematic Ghanaian modern architecture hero with live filter
│       ├── TrustBenefits.tsx    # 3 core trust pillars
│       ├── AboutSection.tsx     # Company story, mission, and leadership modal
│       ├── FeaturedProperties.tsx # Filterable property grid (Category, Location, Price)
│       ├── PropertyCard.tsx     # Individual property card with badges and favorite toggle
│       ├── PropertyModal.tsx    # Detailed property view with gallery, amenities & enquiry
│       ├── ServicesSection.tsx  # 8 icon service cards with interactive detail popups
│       ├── WhyChooseUs.tsx      # 6 client-focused operating principles
│       ├── HowItWorks.tsx       # 4-step buyer journey (horizontal on desktop, vertical on mobile)
│       ├── MortgageCalculator.tsx # Interactive Ghana Cedis (GH₵) installment estimator
│       ├── Testimonials.tsx     # Client testimonial carousel with sample disclaimer
│       ├── CtaSection.tsx       # High-conversion orange/charcoal call-to-action banner
│       ├── ContactSection.tsx   # Validated contact form, anti-spam honeypot, office info & map
│       ├── ConsultationModal.tsx# Booking modal for site visits and office appointments
│       ├── FavoritesDrawer.tsx  # Slide-out wishlist drawer with WhatsApp multi-enquiry
│       ├── LegalModal.tsx       # Privacy Policy and Terms of Service dialog
│       └── FloatingWidgets.tsx  # Floating WhatsApp button with status ring & back-to-top
```

---

## 🚀 Step-by-Step Setup & Run Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Run in Development Mode
```bash
npm run dev
```
Starts the full-stack server with Vite middleware at `http://localhost:3000`.

### 3. Production Build
```bash
npm run build
```
Compiles static React assets into `dist/` and bundles `server.ts` into a self-contained CommonJS file at `dist/server.cjs`.

### 4. Start Production Server
```bash
npm start
```
Runs `node dist/server.cjs` on port `3000`.

---

## ⚙️ Customization Guide

### 1. Updating Company Contact Information, Phone & WhatsApp
All contact details are centralized in a single file: `src/data/companyInfo.ts`:
- **Phone number**: Update `phone` and `phoneDisplay`.
- **WhatsApp number**: Update `whatsappNumber`. Links will automatically generate with prefilled inquiry messages.
- **Email**: Update `email`.
- **Office Location**: Update `officeLocation` and `fullAddress`.
- **Business Hours**: Update `businessHours`.
- **Social Media links**: Update `facebook`, `instagram`, and `tiktok` under `socials`.
- **Google Maps**: Replace the `googleMapsEmbedUrl` iframe source with your exact Google Maps location embed URL.

### 2. Editing Properties Catalog
All property listings are located in `src/data/properties.ts`.
To add a new property, insert an object conforming to the `Property` interface:
```typescript
{
  id: 'unique-id',
  title: 'Property Title',
  category: 'Land' | 'Houses' | 'Commercial' | 'Rentals' | 'Newly Built',
  price: 250000,
  priceFormatted: 'GH₵ 250,000',
  location: 'Prampram, Greater Accra',
  dimensions: '70 x 100 ft (Standard Plot)',
  images: ['https://images.unsplash.com/...'],
  description: 'Detailed description...',
  // ...
}
```

### 3. Configuring Email Notifications
The contact form submits to `/api/contact` and `/api/consultation` in `server.ts`.
You can configure notifications using standard environment variables:

1. Copy `.env.example` to `.env`:
```env
CONTACT_RECIPIENT_EMAIL=hundred.opoku@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM=Distinct Pathway <noreply@distinctpathway.com>
```
2. For platforms like Vercel or Netlify, you can also forward the form to **Formspree** or **Web3Forms** by updating the endpoint URL in `src/components/ContactSection.tsx`.

---

## 📋 Pre-Launch Verification Checklist

Before publishing, replace these placeholders:
1. **Recipient Email**: Confirm `hundred.opoku@gmail.com` in `server.ts` or set `CONTACT_RECIPIENT_EMAIL` in `.env`.
2. **Google Maps Embed**: Replace coordinates in `src/data/companyInfo.ts` with your specific office pin in Tema - Ashaiman.
3. **Property Photography**: Replace Unsplash property photos in `src/data/properties.ts` with high-resolution photographs of your actual Ghanaian developments and surveyed sites.
4. **Verified Testimonials**: Replace the 3 sample testimonials in `src/data/testimonials.ts` with genuine client reviews and photos once completed.
