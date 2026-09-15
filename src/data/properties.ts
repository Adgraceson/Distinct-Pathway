import { Property } from '../types';

/**
 * SAMPLE PROPERTY LISTINGS
 * 
 * Instructions for Website Owner:
 * You can edit, add, or remove listings directly in this file.
 * Each property has title, category, price, location, specs, amenities, and images.
 * All prices are shown in Ghana Cedis (GH₵).
 */

export const SAMPLE_PROPERTIES: Property[] = [
  {
    id: "prop-01",
    slug: "prime-serviced-land-prampram",
    title: "Prime Serviced Residential Plots",
    category: "Land for Sale",
    listingType: "For Sale",
    location: "Prampram (Near Oasis International)",
    region: "Greater Accra Region",
    price: 48000,
    priceFormatted: "GH₵ 48,000",
    size: "70 x 100 ft (1 Full Plot)",
    isFeatured: true,
    badge: "Featured",
    documentStatus: "Properly Documented & Verified Site Plan",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1524813686514-a57563d77d61?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1464295440335-ee082a75ccca?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Carefully demarcated and easily accessible residential plots situated in a fast-developing neighborhood in Prampram. Close to electricity poles, accessible community roads, and within short proximity to the coastal breeze. Ideal for building a family residence or long-term land banking.",
    amenities: [
      "Demarcated & Well-Beaconed",
      "Water Supply Ready",
      "Electricity Lines Accessible",
      "Motorable Access Roads",
      "Peaceful Community Setting",
      "Documentation Support Included"
    ]
  },
  {
    id: "prop-02",
    slug: "executive-4bed-villa-east-legon-hills",
    title: "Executive 4-Bedroom Contemporary Villa",
    category: "House for Sale",
    listingType: "For Sale",
    location: "East Legon Hills, Accra",
    region: "Greater Accra Region",
    price: 1850000,
    priceFormatted: "GH₵ 1,850,000",
    bedrooms: 4,
    bathrooms: 4.5,
    size: "420 sqm Total Built Area",
    isFeatured: true,
    badge: "For Sale",
    documentStatus: "Registered Land Title Certificate",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "An architecturally refined 4-bedroom detached villa combining clean modern lines with spacious family living. Features all ensuite bedrooms, an ultra-modern fitted kitchen with quartz countertops, family lounge upstairs, servant quarters, and ample parking for up to 4 vehicles.",
    amenities: [
      "All Ensuite Bedrooms",
      "Fully Fitted Modern Kitchen",
      "CCTV & Electric Fencing",
      "Automated Gate",
      "Solar Power Backup Provision",
      "Spacious Compound",
      "Balcony with Serene Views"
    ]
  },
  {
    id: "prop-03",
    slug: "luxury-2bed-apartment-cantonments",
    title: "Modern 2-Bedroom Luxury Serviced Apartment",
    category: "Apartment for Rent",
    listingType: "For Rent",
    location: "Cantonments, Accra",
    region: "Greater Accra Region",
    price: 18500,
    priceFormatted: "GH₵ 18,500",
    pricePeriod: "/ month",
    bedrooms: 2,
    bathrooms: 2,
    size: "115 sqm Living Area",
    isFeatured: true,
    badge: "For Rent",
    documentStatus: "Corporate Lease Ready",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Centrally located in high-demand Cantonments, this elegant serviced apartment offers top-tier finishes, high ceilings, floor-to-ceiling double-glazed windows, swimming pool access, and 24/7 security concierge. Perfect for expatriates, diplomats, or discerning corporate executives.",
    amenities: [
      "Swimming Pool & Gym Access",
      "24/7 Uniformed Security",
      "Standby Generator",
      "High-speed Fiber Internet Ready",
      "Underground Parking",
      "Elevator Access",
      "On-site Facility Management"
    ]
  },
  {
    id: "prop-04",
    slug: "commercial-office-hub-tema-community1",
    title: "Prime Commercial Complex & Retail Hub",
    category: "Commercial Property",
    listingType: "For Sale",
    location: "Tema Community 1 (Central Business Area)",
    region: "Greater Accra Region",
    price: 3200000,
    priceFormatted: "GH₵ 3,200,000",
    size: "520 sqm Commercial Space",
    isFeatured: false,
    badge: "For Sale",
    documentStatus: "Registered Commercial Lease & Permits",
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "A versatile multi-level commercial property located in the commercial heart of Tema. Positioned for maximum foot and vehicular traffic with broad street frontage, multiple office suites, client reception, and dedicated parking bays. Excellent candidate for corporate headquarters, financial institution, or medical clinic.",
    amenities: [
      "High-Visibility Road Frontage",
      "Multiple Self-Contained Suites",
      "Dedicated Client Parking",
      "3-Phase Industrial Power Line",
      "High-Capacity Water Reservoirs",
      "Security Gatehouse & Perimeter Wall"
    ]
  },
  {
    id: "prop-05",
    slug: "gated-community-investment-appolonia",
    title: "High-Yield Gated Community Land Package",
    category: "Investment Property",
    listingType: "For Sale",
    location: "Appolonia City Corridor, Greater Accra",
    region: "Greater Accra Region",
    price: 220000,
    priceFormatted: "GH₵ 220,000",
    size: "1 Full Acre (Approx. 4-6 Plots)",
    isFeatured: true,
    badge: "Hot Deal",
    documentStatus: "Verified Master Deed & Title Track",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "An outstanding long-term capital appreciation opportunity. Located right along the thriving Appolonia mixed-development corridor, this full acre land parcel is optimal for estate developers, institutional investors, or private syndicates seeking high-yield capital gains in Greater Accra.",
    amenities: [
      "Rapidly Appreciating Growth Corridor",
      "Dry, Solid Flat Ground",
      "Direct Road Connectivity",
      "Clear Boundary Markers",
      "No Water-logging Issues",
      "Investment Advisory Support"
    ]
  },
  {
    id: "prop-06",
    slug: "newly-built-smart-home-oyarifa",
    title: "Newly Built 3-Bedroom Smart Family House",
    category: "Newly Built Home",
    listingType: "For Sale",
    location: "Oyarifa (Near Aburi Foothills)",
    region: "Greater Accra Region",
    price: 980000,
    priceFormatted: "GH₵ 980,000",
    bedrooms: 3,
    bathrooms: 3.5,
    size: "260 sqm Built Area / 60x80 Plot",
    isFeatured: true,
    badge: "New",
    documentStatus: "Ready for Title Transfer",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Freshly completed in 2024, this modern 3-bedroom detached home features breezy hilltop microclimates, contemporary open-concept interior layouts, stylish sanitary fittings, ambient recessed ceiling lighting, and pre-wired smart security switches. Move-in ready for modern homeowners.",
    amenities: [
      "3 Ensuite Bedrooms + Guest Toilet",
      "Open-Plan Living & Dining Area",
      "Polished Porcelain Tiled Floors",
      "Fitted Wardrobes",
      "Dedicated Water Storage Tanks",
      "Perimeter Wall with Razor Wire",
      "Paved Compound"
    ]
  },
  {
    id: "prop-07",
    slug: "commercial-warehouse-hub-tema-port-strip",
    title: "Heavy-Duty Warehouse & Logistics Facility",
    category: "Commercial Property",
    listingType: "For Sale",
    location: "Tema Industrial Area (Near Port Access)",
    region: "Greater Accra Region",
    price: 4800000,
    priceFormatted: "GH₵ 4,800,000",
    size: "1,200 sqm Covered Floor",
    isFeatured: false,
    badge: "For Sale",
    documentStatus: "Industrial Commercial Lease",
    images: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Strategic industrial asset configured for supply-chain operators, import/export enterprises, and manufacturing firms. Offers high clearance roofs, reinforced concrete floor load capacity, container truck turn-around turning circle, administrative mezzanine offices, and 24-hr security checkpoint.",
    amenities: [
      "Direct Highway to Tema Harbour",
      "Heavy Truck Turning Bay",
      "High Eaves Clearance (9m)",
      "3-Phase Industrial Power",
      "Administrative Staff Office Block",
      "Perimeter Security System"
    ]
  },
  {
    id: "prop-08",
    slug: "beachfront-estate-plots-kokrobite",
    title: "Serviced Coastal Estate Residential Land",
    category: "Land for Sale",
    listingType: "For Sale",
    location: "Kokrobite - Langma Coastal Strip",
    region: "Greater Accra Region",
    price: 85000,
    priceFormatted: "GH₵ 85,000",
    size: "80 x 100 ft (Generous Plot)",
    isFeatured: false,
    badge: "For Sale",
    documentStatus: "Properly Surveyed & Site Plan Available",
    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1524813686514-a57563d77d61?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Elevated coastal plots providing sweeping natural breezes and scenic tropical tranquility. Situated within minutes of boutique resorts and beaches, yet easily linked back to Accra via newly upgraded road networks. Ideal for holiday retreats, guest houses, or eco-friendly residential homes.",
    amenities: [
      "Naturally Elevated Ground",
      "Fresh Coastal Air & Ambience",
      "Good Motorable Access",
      "Developing Residential Cluster",
      "Surveyed & Verified Pillars",
      "Dedicated Escort for Site Inspections"
    ]
  }
];

export const PROPERTY_LOCATIONS = [
  "All Locations",
  "Tema - Ashaiman",
  "Prampram",
  "East Legon Hills",
  "Cantonments",
  "Oyarifa",
  "Appolonia City",
  "Tema Industrial Area",
  "Kokrobite"
];

export const PROPERTY_CATEGORIES: Array<{ label: string; value: string }> = [
  { label: "All Categories", value: "All" },
  { label: "Land for Sale", value: "Land for Sale" },
  { label: "House for Sale", value: "House for Sale" },
  { label: "Apartment for Rent", value: "Apartment for Rent" },
  { label: "Commercial Property", value: "Commercial Property" },
  { label: "Investment Property", value: "Investment Property" },
  { label: "Newly Built Home", value: "Newly Built Home" }
];
