import { SiteSettings } from "./types";

export const SITE_SETTINGS: SiteSettings = {
  businessName: "SHANKAR TIMBER MART",
  tagline: "Crafting Spaces. Defining Living.",
  supportingStatement: "Premium materials and thoughtful solutions for spaces that deserve better.",
  address: "178-C, Mettupalayam Road",
  city: "Coimbatore",
  state: "Tamil Nadu",
  country: "India",
  pincode: "641043",
  phone: "+91 75020 30000",
  alternatePhone: "+91 94430 42244",
  whatsappNumber: "+91 75020 30000",
  email: "info@shankartimbermart.com",
  openingHours: "Monday – Saturday: 9:00 AM – 8:30 PM | Sunday: By Appointment",
  googleMapsUrl: "https://maps.google.com/?q=178-C+Mettupalayam+Road+Coimbatore+Tamil+Nadu",
  googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.123456789!2d76.945678!3d11.023456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDAxJzI0LjQiTiA3NsKwNTYnNDQuNCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin",
};

export const NAVIGATION_LINKS = [
  { label: "Home", href: "/" },
  {
    label: "Products",
    href: "/products",
    hasMegaMenu: true,
  },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Our Brands", href: "/brands" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const MEGA_MENU_CATEGORIES = [
  {
    title: "Timber",
    href: "/products/timber",
    items: [
      { name: "Hardwood Collection", href: "/products/timber?type=hardwood", desc: "Mahogany, Sal, Meranti, Padauk, Burma & African Teak" },
      { name: "Softwood Collection", href: "/products/timber?type=softwood", desc: "Pine, Maple, Beech, White Ash, Oak Wood" },
      { name: "Custom Planing & Sizing", href: "/services#timber-planing", desc: "Precision cutting & surface finishing" },
    ],
  },
  {
    title: "Plywood & MDF",
    href: "/products/plywood-mdf",
    items: [
      { name: "Commercial Plywood", href: "/products/plywood-mdf?sub=commercial", desc: "MR Grade for premium interior furniture" },
      { name: "Waterproof Plywood", href: "/products/plywood-mdf?sub=waterproof", desc: "BWP / BWR 710 marine grade plywood" },
      { name: "PVC & Rubberwood Plywood", href: "/products/plywood-mdf?sub=pvc-rubberwood", desc: "100% moisture-resistant boards" },
      { name: "Flexi & Shuttering Plywood", href: "/products/plywood-mdf?sub=specialty", desc: "Curved designs & architectural shuttering" },
      { name: "Russian Birch Plywood", href: "/products/plywood-mdf?sub=birch", desc: "Uniform multi-ply architectural strength" },
      { name: "Prelam & Plain MDF Boards", href: "/products/plywood-mdf?sub=mdf", desc: "Smooth high-density engineered panels" },
    ],
  },
  {
    title: "Doors & WPC",
    href: "/products/doors-wpc",
    items: [
      { name: "Veneer & Lam Doors", href: "/products/doors-wpc?sub=veneer-lam", desc: "Hand-selected natural wood grain veneers" },
      { name: "Veneer Fold & Membrane Doors", href: "/products/doors-wpc?sub=membrane", desc: "Contemporary embossed finishes" },
      { name: "Printed & Flush Doors", href: "/products/doors-wpc?sub=flush", desc: "Solid core structural doors" },
      { name: "WPC Doors & Frames", href: "/products/doors-wpc?sub=wpc", desc: "100% termite, borer & water-proof solutions" },
    ],
  },
  {
    title: "Windows & Fenesta",
    href: "/products/windows-fenesta",
    items: [
      { name: "uPVC Window Systems", href: "/products/windows-fenesta?sub=upvc", desc: "Acoustic insulation & energy efficiency" },
      { name: "Architectural Aluminium", href: "/products/windows-fenesta?sub=aluminium", desc: "Slim-sightline modern sliding & casement" },
      { name: "Fenesta Showcase", href: "/products/windows-fenesta?sub=fenesta", desc: "India's premier engineered window systems" },
      { name: "Window Typologies", href: "/products/windows-fenesta?sub=typologies", desc: "Slider, Casement, Tilt & Turn, Bay, Louvers" },
    ],
  },
  {
    title: "Modular Interiors",
    href: "/products/modular-interiors",
    items: [
      { name: "Modular Kitchens", href: "/products/modular-interiors?sub=kitchens", desc: "Ergonomic layouts, German hardware & finishes" },
      { name: "Designer Wardrobes", href: "/products/modular-interiors?sub=wardrobes", desc: "Walk-in & sliding systems with custom lighting" },
      { name: "TV & Entertainment Units", href: "/products/modular-interiors?sub=tv-units", desc: "Floating consoles & acoustic fluted panels" },
      { name: "Turnkey Home & Office Interiors", href: "/products/modular-interiors?sub=turnkey", desc: "End-to-end design to material execution" },
    ],
  },
];

export const BRAND_ASSOCIATIONS = [
  { name: "CenturyPly", category: "Plywood & Veneers", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=300&auto=format&fit=crop&q=80" },
  { name: "Greenply", category: "Plywood & Panels", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=300&auto=format&fit=crop&q=80" },
  { name: "Fenesta", category: "uPVC & Aluminium Windows", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=300&auto=format&fit=crop&q=80" },
  { name: "Royal Touch", category: "Luxury Laminates", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=300&auto=format&fit=crop&q=80" },
  { name: "Merino", category: "Laminates & Compact Surfaces", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=300&auto=format&fit=crop&q=80" },
  { name: "Euro Pratik", category: "Decorative Wall Panels", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=300&auto=format&fit=crop&q=80" },
  { name: "Giorio", category: "Italian Design Surfaces", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=300&auto=format&fit=crop&q=80" },
  { name: "Ranga", category: "Architectural Hardware", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=300&auto=format&fit=crop&q=80" },
  { name: "Prova", category: "Door & Panel Systems", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=300&auto=format&fit=crop&q=80" },
];
