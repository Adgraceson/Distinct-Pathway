export type PropertyCategory = 
  | 'Land for Sale'
  | 'House for Sale'
  | 'Apartment for Rent'
  | 'Commercial Property'
  | 'Investment Property'
  | 'Newly Built Home';

export type PropertyFilter = 'All' | 'For Sale' | 'For Rent' | 'Land' | 'Commercial';

export interface Property {
  id: string;
  title: string;
  category: PropertyCategory;
  listingType: 'For Sale' | 'For Rent';
  location: string;
  region: string;
  price: number;
  priceFormatted: string;
  pricePeriod?: string; // e.g. "/ month" or "/ year"
  bedrooms?: number;
  bathrooms?: number;
  size: string; // e.g. "70 x 100 ft (1 Plot)" or "450 sqm"
  isFeatured: boolean;
  badge?: 'Featured' | 'For Sale' | 'For Rent' | 'Hot Deal' | 'New';
  images: string[];
  description: string;
  amenities: string[];
  documentStatus: string; // e.g. "Land Title Certificate Registered", "Indenture & Site Plan Ready"
  slug: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  benefits: string[];
}

export interface TestimonialItem {
  id: string;
  author: string;
  role: string;
  location: string;
  propertyAcquired: string;
  content: string;
  rating: number;
  avatarUrl: string;
  isSamplePlaceholder: boolean;
}

export interface ContactFormData {
  fullName: string;
  phone: string;
  email: string;
  propertyInterest: string;
  preferredLocation: string;
  budgetRange: string;
  subject: string;
  message: string;
  preferredContactMethod: 'Phone' | 'WhatsApp' | 'Email';
  consent: boolean;
  honeypot?: string; // spam protection hidden trap
}

export interface ConsultationFormData {
  fullName: string;
  phone: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  consultationType: 'Site Visit' | 'Office Consultation' | 'WhatsApp Call';
  propertyOfInterest?: string;
  notes?: string;
  consent: boolean;
  honeypot?: string;
}
