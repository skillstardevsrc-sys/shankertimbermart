export type ConfiguratorCategoryId =
  | "doors"
  | "wpc"
  | "windows"
  | "timber"
  | "plywood-mdf"
  | "modular-interiors";

export interface ConfiguratorCategory {
  id: ConfiguratorCategoryId;
  name: string;
  tagline: string;
  description: string;
  image: string;
  badge?: string;
  steps: StepDefinition[];
}

export type StepKey =
  | "product"
  | "material"
  | "design"
  | "dimensions"
  | "quantity"
  | "enquiry";

export interface StepDefinition {
  key: StepKey;
  number: string; // "01", "02", etc.
  label: string;
  description: string;
}

export interface ConfiguratorProductType {
  id: string;
  categoryId: ConfiguratorCategoryId;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  features: string[];
  specs?: Record<string, string>;
  supportedMaterialIds?: string[]; // IDs of compatible materials
  supportedDesignIds?: string[]; // IDs of compatible designs
  supportedThicknesses?: string[];
  defaultSalesUnit?: string;
}

export interface ConfiguratorMaterial {
  id: string;
  categoryId: ConfiguratorCategoryId;
  name: string;
  shortDescription: string;
  image: string;
  textureThumb: string;
  colorTone?: string;
  sheen?: string;
  durability?: string;
  compatibleProductIds: string[]; // Product types this material applies to
  supportedDesignIds?: string[]; // Designs compatible with this material
}

export interface ConfiguratorDesign {
  id: string;
  designCode: string; // e.g. "STM-DR-VN01"
  name: string;
  description: string;
  image: string;
  categoryId: ConfiguratorCategoryId;
  styleCategory?: string; // "Minimalist", "Classic", "Modern", "Luxury", "Natural Wood", etc.
  compatibleProductIds: string[];
  compatibleMaterialIds: string[];
  frameFinish?: string;
  glassOption?: string;
}

export interface DimensionFieldConfig {
  height?: {
    enabled: boolean;
    label: string;
    defaultValue?: number;
    min?: number;
    max?: number;
    presets?: number[];
  };
  width?: {
    enabled: boolean;
    label: string;
    defaultValue?: number;
    min?: number;
    max?: number;
    presets?: number[];
  };
  thickness?: {
    enabled: boolean;
    label: string;
    options?: string[];
    defaultValue?: string;
  };
  length?: {
    enabled: boolean;
    label: string;
    defaultValue?: number;
    min?: number;
    max?: number;
  };
  supportedUnits: ("mm" | "cm" | "in" | "ft" | "running-ft" | "cft" | "sq-ft")[];
  defaultUnit: "mm" | "cm" | "in" | "ft" | "running-ft" | "cft" | "sq-ft";
  standardSizePresets?: {
    label: string;
    width: number;
    height: number;
    unit: string;
  }[];
  consultationOption?: boolean;
}

export interface ConfiguredItem {
  id: string;
  categoryId: ConfiguratorCategoryId;
  categoryName: string;
  productTypeId: string;
  productTypeName: string;
  productImage: string;
  materialId?: string;
  materialName?: string;
  materialImage?: string;
  designId?: string;
  designCode?: string;
  designName?: string;
  designImage?: string;
  finishOption?: string;
  styleCategory?: string;
  dimensions: {
    height?: number;
    width?: number;
    length?: number;
    thickness?: string;
    unit: string;
    standardSizeLabel?: string;
    isCustom?: boolean;
    notes?: string;
  };
  specialRequirements?: {
    woodRequirement?: string; // e.g., "Timber planks", "Custom cutting", "Planing", "Door frame requirements"
    windowSubMaterial?: "upvc" | "aluminium";
    windowOpeningStyle?: string;
    glassOption?: string;
    frameFinish?: string;
    kitchenLayout?: string;
    wardrobeDoors?: string;
    projectAreaSqFt?: number;
    roomCount?: number;
    siteMeasurementRequested?: boolean;
    additionalNotes?: string;
  };
  quantity: number;
  salesUnit: string; // "pieces", "sheets", "running feet", "cubic feet", "units"
  configuredAt: string;
}

export interface ConfiguratorEnquirySubmission {
  items: ConfiguredItem[];
  customer: {
    fullName: string;
    phone: string;
    email?: string;
    customerType: string;
    projectLocation?: string;
    additionalMessage?: string;
    siteMeasurementConsultationRequested?: boolean;
    consent: boolean;
  };
}
