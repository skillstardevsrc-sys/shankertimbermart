export interface WoodSpecies {
  id: string;
  name: string;
  tamilName: string;
  scientificName: string;
  origin: string;
  tagline: string;
  textureImage: string;
  sampleImage: string;
  colorHex: string;
  density: string;
  durabilityRating: string;
  warrantyYears: number;
  moistureContent: string;
  grainType: string;
  pricePerCuFt: number;
  multiplier: number;
  badge?: string;
  features: string[];
}

export interface DesignStyle {
  id: string;
  name: string;
  tamilName: string;
  description: string;
  previewImage: string;
  aesthetic: string;
  carvingTime: string;
  priceExtra: number;
  popularFor: string;
}

export interface DimensionOption {
  id: string;
  name: string;
  tagline: string;
  widthFt: number;
  heightFt: number;
  thicknessMm: number;
  visualRatio: string; // e.g. "aspect-[1/2]"
  baseSqFt: number;
  multiplier: number;
}

export interface FinishOption {
  id: string;
  name: string;
  description: string;
  textureThumb: string;
  sheenLevel: string;
  durability: string;
  priceExtra: number;
}

export interface HardwareAccent {
  id: string;
  name: string;
  material: string;
  colorHex: string;
  accentClass: string;
}

export interface ProductType {
  id: string;
  name: string;
  tamilName: string;
  category: string;
  tagline: string;
  description: string;
  basePrice: number;
  iconName: string;
  heroBadge: string;
  dimensions: DimensionOption[];
  designs: DesignStyle[];
  previewAngleImages: {
    front: string;
    macro: string;
    room: string;
  };
  woodSpecificPreviews?: Record<string, { front: string; macro: string; room: string }>;
}

export const WOOD_SPECIES_LIST: WoodSpecies[] = [
  {
    id: "burma-teak",
    name: "Burma Teak Wood",
    tamilName: "பர்மா தேக்கு மரம்",
    scientificName: "Tectona grandis (Myanmar)",
    origin: "Myanmar (Direct Import)",
    tagline: "The Uncontested King of Woods • Generational Heirloom",
    textureImage: "https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?w=800&auto=format&fit=crop&q=80",
    sampleImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80",
    colorHex: "#9B642C",
    density: "680 - 750 kg/m³",
    durabilityRating: "Grade 1 (100+ Years)",
    warrantyYears: 50,
    moistureContent: "Kiln-Dried 10% - 12%",
    grainType: "Straight uniform tight annual rings with dark streaks",
    pricePerCuFt: 6200,
    multiplier: 1.45,
    badge: "Most Demanded",
    features: ["Natural high oil content", "100% Termite & borer proof", "Weather resistant", "Golden brown patina"],
  },
  {
    id: "african-teak",
    name: "African Teak (Iroko)",
    tamilName: "ஆப்பிரிக்கன் தேக்கு (இரோகோ)",
    scientificName: "Milicia excelsa",
    origin: "West & Central Africa",
    tagline: "Heavy Architectural Strength • Deep Bronze Amber",
    textureImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=80",
    sampleImage: "https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?w=800&auto=format&fit=crop&q=80",
    colorHex: "#B87333",
    density: "650 - 720 kg/m³",
    durabilityRating: "Exterior Marine Grade",
    warrantyYears: 35,
    moistureContent: "Seasoned 11%",
    grainType: "Interlocking coarse grain with golden amber luster",
    pricePerCuFt: 3800,
    multiplier: 1.15,
    badge: "Best Value Teak",
    features: ["Super high structural stability", "Exceptional decay resistance", "Matures to rich bronze", "Zero warping"],
  },
  {
    id: "padauk",
    name: "Royal Padauk Wood",
    tamilName: "படாகு / செம்மரம் (Red Gold)",
    scientificName: "Pterocarpus soyauxii",
    origin: "Tropical Rainforest Timber",
    tagline: "Vibrant Red Gold • Dramatic High-End Statement",
    textureImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop&q=80",
    sampleImage: "https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?w=800&auto=format&fit=crop&q=80",
    colorHex: "#8D3425",
    density: "740 - 820 kg/m³",
    durabilityRating: "Superior Class Hardwood",
    warrantyYears: 40,
    moistureContent: "Kiln-Dried 10%",
    grainType: "Vivid coral red with purplish-brown mineral ribbons",
    pricePerCuFt: 4600,
    multiplier: 1.3,
    badge: "Exotic Luxury",
    features: ["Exotic crimson-bronze hue", "Natural satin natural gloss", "Dimensional stability", "Architects' choice"],
  },
  {
    id: "rosewood",
    name: "Indian Rosewood (Sheesham)",
    tamilName: "ரோஸ்வுட் / ஈட்டி மரம்",
    scientificName: "Dalbergia latifolia",
    origin: "Southern Western Ghats",
    tagline: "Imperial Regal Majesty • Deep Dark Chocolate",
    textureImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80",
    sampleImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
    colorHex: "#3E2519",
    density: "830 - 880 kg/m³",
    durabilityRating: "Generational (80+ Years)",
    warrantyYears: 50,
    moistureContent: "Slow-Kiln Seasoned 10%",
    grainType: "Dramatic undulating dark chocolate with violet-black streaks",
    pricePerCuFt: 5800,
    multiplier: 1.4,
    badge: "Regal Heirloom",
    features: ["High acoustic resonance", "Heavy solid weight", "Mirror-finish polish receptivity", "Chettinad palace legacy"],
  },
  {
    id: "american-walnut",
    name: "American Black Walnut",
    tamilName: "அமெரிக்கன் வால்நட் மரம்",
    scientificName: "Juglans nigra",
    origin: "North America",
    tagline: "Modern Architectural Elite • Smoky Espresso Hue",
    textureImage: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=800&auto=format&fit=crop&q=80",
    sampleImage: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=800&auto=format&fit=crop&q=80",
    colorHex: "#4A3728",
    density: "640 - 680 kg/m³",
    durabilityRating: "Fine Joinery Grade",
    warrantyYears: 30,
    moistureContent: "Precision Kiln 9%",
    grainType: "Fluid swirling grain with rich dark coffee undertones",
    pricePerCuFt: 5200,
    multiplier: 1.35,
    badge: "Ultra Contemporary",
    features: ["Modern minimalist favorite", "Velvety smooth grain", "Rich natural dark tone", "Does not bleed oil"],
  },
  {
    id: "malaysian-sal",
    name: "Malaysian White Sal",
    tamilName: "மலேசியன் சால் மரம்",
    scientificName: "Shorea albida",
    origin: "Malaysia & South-East Asia",
    tagline: "Rock-Solid Structural Hardwood • Impervious to Termites",
    textureImage: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800&auto=format&fit=crop&q=80",
    sampleImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80",
    colorHex: "#C2A374",
    density: "880 - 980 kg/m³",
    durabilityRating: "Extreme Structural Class",
    warrantyYears: 40,
    moistureContent: "Seasoned 12%",
    grainType: "Interlocked heavy fibrous grain with warm pale gold",
    pricePerCuFt: 2950,
    multiplier: 1.0,
    badge: "Heavy Structural",
    features: ["Immense load bearing", "Unrivaled frame durability", "Zero warping under monsoon", "Cost effective strength"],
  },
  {
    id: "european-oak",
    name: "European White Oak",
    tamilName: "ஐரோப்பியன் ஓக் மரம்",
    scientificName: "Quercus alba",
    origin: "Central & Northern Europe",
    tagline: "Scandinavian Architectural Elegance • Champagne Tones",
    textureImage: "https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?w=800&auto=format&fit=crop&q=80",
    sampleImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
    colorHex: "#D5BA93",
    density: "720 - 760 kg/m³",
    durabilityRating: "High Resistance Grade",
    warrantyYears: 30,
    moistureContent: "Kiln-Dried 10%",
    grainType: "Distinctive medullary rays and clean Scandinavian grain",
    pricePerCuFt: 4800,
    multiplier: 1.25,
    badge: "Minimalist Chic",
    features: ["Clean champagne hue", "Textured tactile grain", "Ideal for fluted panels", "High tannin resistance"],
  },
  {
    id: "sustainable-pine",
    name: "New Zealand Pine & Rubberwood",
    tamilName: "பைன் & ரப்பர் வுட் (Finger-Joint)",
    scientificName: "Pinus radiata / Hevea",
    origin: "Sustainably Farmed Plantation",
    tagline: "Eco-Friendly Precision Core • Modern Light Cream",
    textureImage: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?w=800&auto=format&fit=crop&q=80",
    sampleImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=80",
    colorHex: "#E4CEAE",
    density: "520 - 580 kg/m³",
    durabilityRating: "Interior Furniture Grade",
    warrantyYears: 20,
    moistureContent: "Treated & Kiln-Dried 8%",
    grainType: "Fine straight grain with subtle light honey rings",
    pricePerCuFt: 1850,
    multiplier: 0.85,
    badge: "Eco-Conscious",
    features: ["100% kiln chemically treated", "Smooth paintable surface", "Ultra lightweight & stiff", "Budget friendly luxury"],
  },
];

export const DESIGN_STYLES: DesignStyle[] = [
  {
    id: "chettinad-heritage",
    name: "Royal Chettinad Heritage",
    tamilName: "செட்டிநாடு பாரம்பரிய வேலைப்பாடு",
    description: "Deep relief hand-carved temple motifs, floral border cornices & solid brass medallion sockets.",
    previewImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80",
    aesthetic: "Regal South Indian Temple Craft",
    carvingTime: "12 - 15 Days Master Artisan Carving",
    priceExtra: 18500,
    popularFor: "Main Entrance Doors & Grand Mandapams",
  },
  {
    id: "fluted-brass-inlay",
    name: "Contemporary Fluted with Brass Inlays",
    tamilName: "மாடர்ன் ஃப்ளூட்டட் & பித்தளை கோடுகள்",
    description: "Architectural vertical fluting with precision laser-embedded champagne brass hairline strips.",
    previewImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80",
    aesthetic: "Modern Billionaire Penthouse Minimalist",
    carvingTime: "7 - 9 Days Precision CNC & Metal Joinery",
    priceExtra: 14000,
    popularFor: "Modern Villa Pivot Doors & Dining Tables",
  },
  {
    id: "sacred-kalash-peacock",
    name: "Sacred Kalash & Peacock Gopuram",
    tamilName: "கலசம் & மயில் வடிவ தேவ கோபுரம்",
    description: "Auspicious sanctum carvings featuring sacred kalash, floral arches, divine pillars and bells.",
    previewImage: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=600&auto=format&fit=crop&q=80",
    aesthetic: "Divine Sanctum Traditional Vedic",
    carvingTime: "14 - 18 Days Traditional Sthapathi Art",
    priceExtra: 22000,
    popularFor: "Pooja Mandapams & Auspicious Entrance",
  },
  {
    id: "chevron-geometric",
    name: "Precision Geometric Chevron & Slats",
    tamilName: "ஜியோமெட்ரிக் செவ்ரான் ஸ்லாட்ஸ்",
    description: "Angled interlocking wood grain facets arranged in directional chevron slats with shadow lines.",
    previewImage: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=600&auto=format&fit=crop&q=80",
    aesthetic: "High-End European Architectural Modern",
    carvingTime: "5 - 7 Days German Precision Joinery",
    priceExtra: 9500,
    popularFor: "Designer Wardrobes & Modern Entrance",
  },
  {
    id: "victorian-panel",
    name: "Classical Victorian Raised Double-Panel",
    tamilName: "விக்டோரியன் கிளாசிக்கல் பேனல்",
    description: "Deep chamfered double-fielded solid timber panels with bold architectural perimeter moldings.",
    previewImage: "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?w=600&auto=format&fit=crop&q=80",
    aesthetic: "Timeless Colonial Grandeur",
    carvingTime: "6 - 8 Days Master Shaping",
    priceExtra: 11000,
    popularFor: "Villa Main & Bedroom Doors",
  },
  {
    id: "minimalist-zen-flush",
    name: "Minimalist Zen Flush with Natural Live Grain",
    tamilName: "மினிமலிஸ்ட் இயற்கை வுட் க்ரெய்ன்",
    description: "Seamless monolithic timber surface showcasing unhindered grain continuity and shadow gaps.",
    previewImage: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=600&auto=format&fit=crop&q=80",
    aesthetic: "Japanese Zen Minimalist Luxury",
    carvingTime: "4 - 5 Days Hand Planing & Flattening",
    priceExtra: 6500,
    popularFor: "Live-Edge Dining & Sleek Pivot Doors",
  },
];

export const FINISH_OPTIONS: FinishOption[] = [
  {
    id: "matte-polyurethane",
    name: "Architectural Matte PU Sealer",
    description: "Non-reflective velvety protection that shields against UV, spills, and moisture without glare.",
    textureThumb: "https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?w=300&auto=format&fit=crop&q=80",
    sheenLevel: "5% Matte Luster",
    durability: "High scratch & spill proof",
    priceExtra: 4500,
  },
  {
    id: "organic-teak-oil",
    name: "Hand-Rubbed Organic Teak Oil & Beeswax",
    description: "Traditional deep penetrative organic oil buffs that feed the grain from within with a warm glow.",
    textureThumb: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=300&auto=format&fit=crop&q=80",
    sheenLevel: "15% Satin Natural Sheen",
    durability: "Organic breathable protection",
    priceExtra: 3500,
  },
  {
    id: "piano-mirror-gloss",
    name: "High-Gloss Mirror Italian Melamine",
    description: "Flawless glass-smooth reflective sheen creating royal palace-like brilliance and depth.",
    textureThumb: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=300&auto=format&fit=crop&q=80",
    sheenLevel: "90% Mirror High-Gloss",
    durability: "Glass hardened surface",
    priceExtra: 6000,
  },
  {
    id: "antique-patina",
    name: "Antique Heritage Distressed Walnut Patina",
    description: "Hand-burnished dark shadowed grain edges giving the timeless look of a 100-year palace antique.",
    textureThumb: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=300&auto=format&fit=crop&q=80",
    sheenLevel: "Semi-Matte Vintage",
    durability: "Weathered antique protection",
    priceExtra: 5500,
  },
];

export const HARDWARE_ACCENTS: HardwareAccent[] = [
  {
    id: "antique-brass",
    name: "Heritage Antique Brass",
    material: "Solid Cast Brass with Natural Aging",
    colorHex: "#C59B27",
    accentClass: "from-amber-600 to-amber-300",
  },
  {
    id: "brushed-gold",
    name: "Champagne Brushed Gold",
    material: "PVD Coated Aerospace Grade Brass",
    colorHex: "#E5C158",
    accentClass: "from-yellow-500 to-amber-200",
  },
  {
    id: "matte-obsidian",
    name: "Obsidian Matte Black",
    material: "Electrostatic Powder Coated Gunmetal",
    colorHex: "#222222",
    accentClass: "from-neutral-900 to-neutral-700",
  },
  {
    id: "brushed-steel",
    name: "Brushed Satin Steel",
    material: "Grade 304 Stainless Architectural Finish",
    colorHex: "#A0A0A0",
    accentClass: "from-slate-400 to-slate-200",
  },
];

export const PRODUCT_TYPES_LIST: ProductType[] = [
  {
    id: "main-door",
    name: "Architectural Main Entrance Door",
    tamilName: "பிரதான வாசல் திட மர கதவு",
    category: "doors",
    tagline: "The Grand Gateway to Your Home • Handcrafted Solid Timber",
    description: "Solid hardwood entrance system engineered with heavy 38mm-50mm thickness, internal stabilizing cores, and artisanal hand carvings that will command attention for generations.",
    basePrice: 42000,
    iconName: "DoorClosed",
    heroBadge: "Bespoke Masterpiece",
    dimensions: [
      {
        id: "grand-entrance",
        name: "Grand Single Pivot Entrance",
        tagline: "8 ft × 4 ft • 50mm Heavy Solid Core",
        widthFt: 4.0,
        heightFt: 8.0,
        thicknessMm: 50,
        visualRatio: "aspect-[1/2]",
        baseSqFt: 32,
        multiplier: 1.25,
      },
      {
        id: "royal-double-villa",
        name: "Royal Villa Double Leaf Door",
        tagline: "8 ft × 6 ft (Two 3ft Leaves) • 45mm Thickness",
        widthFt: 6.0,
        heightFt: 8.0,
        thicknessMm: 45,
        visualRatio: "aspect-[3/4]",
        baseSqFt: 48,
        multiplier: 1.6,
      },
      {
        id: "standard-architectural",
        name: "Standard Luxury Main Door",
        tagline: "7 ft × 3.5 ft • 38mm Solid Hardwood",
        widthFt: 3.5,
        heightFt: 7.0,
        thicknessMm: 38,
        visualRatio: "aspect-[1/2]",
        baseSqFt: 24.5,
        multiplier: 1.0,
      },
      {
        id: "palatial-pivot",
        name: "Palatial 10-Foot Floor-to-Ceiling Pivot",
        tagline: "10 ft × 5 ft • 60mm German Pivot Hardware",
        widthFt: 5.0,
        heightFt: 10.0,
        thicknessMm: 60,
        visualRatio: "aspect-[1/2]",
        baseSqFt: 50,
        multiplier: 2.1,
      },
    ],
    designs: DESIGN_STYLES.filter((d) =>
      ["chettinad-heritage", "fluted-brass-inlay", "chevron-geometric", "victorian-panel", "minimalist-zen-flush"].includes(d.id)
    ),
    previewAngleImages: {
      front: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&auto=format&fit=crop&q=85",
      macro: "https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?w=1200&auto=format&fit=crop&q=85",
      room: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=85",
    },
    woodSpecificPreviews: {
      "burma-teak": {
        front: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&auto=format&fit=crop&q=85",
        macro: "https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?w=1200&auto=format&fit=crop&q=85",
        room: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=85",
      },
      "african-teak": {
        front: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&auto=format&fit=crop&q=85",
        macro: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&auto=format&fit=crop&q=85",
        room: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=85",
      },
      "padauk": {
        front: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&auto=format&fit=crop&q=85",
        macro: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&auto=format&fit=crop&q=85",
        room: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=85",
      },
      "rosewood": {
        front: "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?w=1200&auto=format&fit=crop&q=85",
        macro: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&auto=format&fit=crop&q=85",
        room: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=85",
      },
    },
  },
  {
    id: "pooja-mandapam",
    name: "Handcrafted Sacred Pooja Mandapam",
    tamilName: "பாரம்பரிய பூஜை மண்டபம்",
    category: "pooja",
    tagline: "Divine Sanctum for Sacred Blessings • Traditional Sthapathi Art",
    description: "Consecrated pooja mandapams crafted strictly from genuine Burma Teak or Rosewood with ornate shikhara gopuram carvings, sacred bells, deep brass drawer trays and acoustic warm LED integrations.",
    basePrice: 58000,
    iconName: "Sparkles",
    heroBadge: "Divine Heritage",
    dimensions: [
      {
        id: "grand-mandapam",
        name: "Grand Palace Temple Mandapam",
        tagline: "7 ft (H) × 5 ft (W) × 2.5 ft (D) • Multi-Tier Gopuram",
        widthFt: 5.0,
        heightFt: 7.0,
        thicknessMm: 45,
        visualRatio: "aspect-[4/5]",
        baseSqFt: 35,
        multiplier: 1.5,
      },
      {
        id: "medium-sanctum",
        name: "Standard Villa Pooja Unit",
        tagline: "5.5 ft (H) × 4 ft (W) × 2 ft (D) • Carved Pillars",
        widthFt: 4.0,
        heightFt: 5.5,
        thicknessMm: 38,
        visualRatio: "aspect-[4/5]",
        baseSqFt: 22,
        multiplier: 1.0,
      },
      {
        id: "compact-wall-mandir",
        name: "Modern Wall-Mounted Sacred Alcove",
        tagline: "4 ft (H) × 3 ft (W) × 1.5 ft (D) • CNC Jali Backlit",
        widthFt: 3.0,
        heightFt: 4.0,
        thicknessMm: 30,
        visualRatio: "aspect-[3/4]",
        baseSqFt: 12,
        multiplier: 0.75,
      },
    ],
    designs: DESIGN_STYLES.filter((d) =>
      ["sacred-kalash-peacock", "chettinad-heritage", "fluted-brass-inlay", "minimalist-zen-flush"].includes(d.id)
    ),
    previewAngleImages: {
      front: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=1200&auto=format&fit=crop&q=85",
      macro: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=1200&auto=format&fit=crop&q=85",
      room: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=85",
    },
  },
  {
    id: "dining-table",
    name: "Architectural Solid Wood Dining Table",
    tamilName: "திட மர டைனிங் டேபிள் மாஸ்டர்பீஸ்",
    category: "furniture",
    tagline: "Gather Around an Heirloom • Continuous Single-Log Grain",
    description: "Magnificent solid wood slab dining table, kiln-dried and leveled to museum-grade perfection with brass bowtie joinery and matching ergonomic timber bench/chairs.",
    basePrice: 65000,
    iconName: "Table",
    heroBadge: "Architect's Icon",
    dimensions: [
      {
        id: "grand-8-seater",
        name: "8 - 10 Seater Imperial Dining Slab",
        tagline: "8.5 ft × 3.5 ft • 50mm Solid Slab with Chamfered Edges",
        widthFt: 3.5,
        heightFt: 8.5,
        thicknessMm: 50,
        visualRatio: "aspect-[16/9]",
        baseSqFt: 30,
        multiplier: 1.45,
      },
      {
        id: "standard-6-seater",
        name: "6 - 8 Seater Villa Family Table",
        tagline: "6.5 ft × 3.2 ft • 40mm Solid Wood Top",
        widthFt: 3.2,
        heightFt: 6.5,
        thicknessMm: 40,
        visualRatio: "aspect-[16/9]",
        baseSqFt: 21,
        multiplier: 1.0,
      },
      {
        id: "compact-4-seater",
        name: "4 Seater Contemporary Trestle",
        tagline: "4.5 ft × 3.0 ft • 35mm Solid Wood Top",
        widthFt: 3.0,
        heightFt: 4.5,
        thicknessMm: 35,
        visualRatio: "aspect-[4/3]",
        baseSqFt: 13.5,
        multiplier: 0.75,
      },
    ],
    designs: DESIGN_STYLES.filter((d) =>
      ["minimalist-zen-flush", "fluted-brass-inlay", "chevron-geometric", "chettinad-heritage"].includes(d.id)
    ),
    previewAngleImages: {
      front: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=1200&auto=format&fit=crop&q=85",
      macro: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=1200&auto=format&fit=crop&q=85",
      room: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=85",
    },
  },
  {
    id: "sofa-frame",
    name: "Luxury Living Room Wooden Sofa Frame",
    tamilName: "அரச சோபா & லவுஞ்சர் மர கட்டமைப்பு",
    category: "furniture",
    tagline: "Ergonomic Timber Curves • Structural Immortality",
    description: "Ultra-heavy solid timber skeletal sofa frames and lounge suites crafted with mortise-and-tenon interlocking joinery designed to hold heavy high-density cushions without creaking for decades.",
    basePrice: 52000,
    iconName: "Armchair",
    heroBadge: "Ergonomic Luxury",
    dimensions: [
      {
        id: "sofa-3-plus-2-plus-1",
        name: "Grand 3+2+1 Royal Living Suite",
        tagline: "Complete 6-Seater Solid Timber Frame with Coffee Table Frame",
        widthFt: 7.5,
        heightFt: 3.0,
        thicknessMm: 50,
        visualRatio: "aspect-[16/9]",
        baseSqFt: 45,
        multiplier: 1.7,
      },
      {
        id: "sofa-3-seater-lounger",
        name: "3-Seater Minimalist Deep Lounger",
        tagline: "7 ft (L) × 3 ft (D) • Sculpted Teak Armrests",
        widthFt: 7.0,
        heightFt: 3.0,
        thicknessMm: 45,
        visualRatio: "aspect-[16/9]",
        baseSqFt: 21,
        multiplier: 1.0,
      },
      {
        id: "accent-armchair",
        name: "Sculptural Lounge Armchair (Set of 2)",
        tagline: "2.8 ft × 2.8 ft • Japandi Curved Timber Silhouette",
        widthFt: 2.8,
        heightFt: 2.8,
        thicknessMm: 40,
        visualRatio: "aspect-square",
        baseSqFt: 16,
        multiplier: 0.8,
      },
    ],
    designs: DESIGN_STYLES.filter((d) =>
      ["fluted-brass-inlay", "minimalist-zen-flush", "chettinad-heritage", "chevron-geometric"].includes(d.id)
    ),
    previewAngleImages: {
      front: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&auto=format&fit=crop&q=85",
      macro: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&auto=format&fit=crop&q=85",
      room: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=85",
    },
  },
  {
    id: "window-system",
    name: "Solid Hardwood Window & Fenesta Casement",
    tamilName: "திட மர ஜன்னல் & ஃபெனஸ்டா சிஸ்டம்",
    category: "windows",
    tagline: "Acoustic Silence • Weatherproof Joinery",
    description: "High-density Malaysian Sal or Burma Teak window frames with integrated acoustic double-glazed shutters, multi-point lock hardware, and stainless fly-mesh cassettes.",
    basePrice: 34000,
    iconName: "AppWindow",
    heroBadge: "Acoustic Shield",
    dimensions: [
      {
        id: "grand-bay-window",
        name: "Grand Bay / 3-Track Slider Window",
        tagline: "6 ft (H) × 6 ft (W) • Deep 5\" × 3\" Heavy Frame Section",
        widthFt: 6.0,
        heightFt: 6.0,
        thicknessMm: 75,
        visualRatio: "aspect-square",
        baseSqFt: 36,
        multiplier: 1.4,
      },
      {
        id: "casement-2-leaf",
        name: "2-Leaf Casement with Glass & Mesh",
        tagline: "5 ft (H) × 4 ft (W) • 4\" × 3\" Section",
        widthFt: 4.0,
        heightFt: 5.0,
        thicknessMm: 75,
        visualRatio: "aspect-[4/5]",
        baseSqFt: 20,
        multiplier: 1.0,
      },
      {
        id: "compact-ventilator",
        name: "Architectural Louver Window",
        tagline: "4 ft (H) × 2.5 ft (W) • Adjustable Timber Slats",
        widthFt: 2.5,
        heightFt: 4.0,
        thicknessMm: 65,
        visualRatio: "aspect-[2/3]",
        baseSqFt: 10,
        multiplier: 0.65,
      },
    ],
    designs: DESIGN_STYLES.filter((d) =>
      ["minimalist-zen-flush", "fluted-brass-inlay", "victorian-panel"].includes(d.id)
    ),
    previewAngleImages: {
      front: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&auto=format&fit=crop&q=85",
      macro: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=1200&auto=format&fit=crop&q=85",
      room: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=85",
    },
  },
  {
    id: "modular-wardrobe",
    name: "Architectural Fluted Timber Wardrobe",
    tamilName: "டிசைனர் மர அலமாரி & வாட்ரோப்",
    category: "modular",
    tagline: "Floor-to-Ceiling Luxury Storage • Concealed LED Accents",
    description: "Turnkey luxury wardrobe system built with boiling waterproof marine ply carcase, solid natural teak fluted shutter facias, Blum soft-close hinges, and velvet jewelry drawers.",
    basePrice: 85000,
    iconName: "FolderKanban",
    heroBadge: "Floor-to-Ceiling",
    dimensions: [
      {
        id: "full-master-suite",
        name: "Full Master Suite 4-Door Wardrobe",
        tagline: "9 ft (H) × 8 ft (W) • Floor-to-Ceiling with Lofts",
        widthFt: 8.0,
        heightFt: 9.0,
        thicknessMm: 25,
        visualRatio: "aspect-[1/1]",
        baseSqFt: 72,
        multiplier: 1.6,
      },
      {
        id: "standard-3-door",
        name: "3-Door Modern Sliding Wardrobe",
        tagline: "8 ft (H) × 6 ft (W) • Soft-Damped German Sliders",
        widthFt: 6.0,
        heightFt: 8.0,
        thicknessMm: 22,
        visualRatio: "aspect-[3/4]",
        baseSqFt: 48,
        multiplier: 1.1,
      },
      {
        id: "compact-2-door",
        name: "2-Door Guest Suite Wardrobe",
        tagline: "7 ft (H) × 4 ft (W) • Solid Wood Facias",
        widthFt: 4.0,
        heightFt: 7.0,
        thicknessMm: 20,
        visualRatio: "aspect-[1/2]",
        baseSqFt: 28,
        multiplier: 0.8,
      },
    ],
    designs: DESIGN_STYLES.filter((d) =>
      ["fluted-brass-inlay", "chevron-geometric", "minimalist-zen-flush", "victorian-panel"].includes(d.id)
    ),
    previewAngleImages: {
      front: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=1200&auto=format&fit=crop&q=85",
      macro: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=85",
      room: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=1200&auto=format&fit=crop&q=85",
    },
  },
];
