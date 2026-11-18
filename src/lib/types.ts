export type ProductCategory =
  | "timber"
  | "plywood-mdf"
  | "doors"
  | "wpc"
  | "windows"
  | "modular-interiors";

export type CustomerType =
  | "Homeowner"
  | "Architect"
  | "Interior Designer"
  | "Contractor"
  | "Builder"
  | "Other";

export type LeadStatus =
  | "New"
  | "Contacted"
  | "Requirement Identified"
  | "Quotation Sent"
  | "Negotiation"
  | "Converted"
  | "Lost";

export interface ProductVariant {
  name: string;
  size?: string;
  thickness?: string;
  finish?: string;
  notes?: string;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  subcategory?: string;
  shortDescription: string;
  description: string;
  featured: boolean;
  published: boolean;
  images: string[];
  variants?: ProductVariant[];
  specifications?: ProductSpecification[];
  applications?: string[];
  finishOptions?: string[];
  associatedBrand?: string;
  badge?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: "Residential" | "Commercial" | "Kitchens" | "Wardrobes" | "Doors" | "Windows" | "Office Interiors";
  location?: string;
  overview: string;
  description: string;
  coverImage: string;
  galleryImages: string[];
  materialsUsed?: string[];
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Brand {
  id: string;
  slug: string;
  name: string;
  category: string;
  description?: string;
  logoUrl: string;
  websiteUrl?: string;
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  name?: string;
  shortDesc: string;
  description: string;
  imageUrl: string;
  benefits?: string[];
  processSteps?: string[];
  relatedProducts?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface InternalNote {
  id: string;
  author: string;
  note: string;
  createdAt: string;
}

export interface Enquiry {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  customerType: CustomerType;
  productCategory: string;
  projectLocation?: string;
  estimatedQuantity?: string;
  requirementDescription: string;
  attachmentUrl?: string;
  consent: boolean;
  status: LeadStatus;
  internalNotes?: InternalNote[];
  source?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SiteSettings {
  businessName: string;
  tagline: string;
  supportingStatement: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  phone: string;
  alternatePhone?: string;
  whatsappNumber: string;
  email: string;
  openingHours: string;
  googleMapsUrl: string;
  googleMapsEmbed: string;
}
