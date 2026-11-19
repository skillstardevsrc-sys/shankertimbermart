import fs from "fs";
import path from "path";
import {
  CONFIGURATOR_CATEGORIES,
  ALL_PRODUCT_TYPES,
  CONFIGURATOR_MATERIALS,
  CONFIGURATOR_DESIGNS,
  CATEGORY_DIMENSION_CONFIGS,
} from "./configuratorData";
import {
  ConfiguratorCategory,
  ConfiguratorCategoryId,
  ConfiguratorProductType,
  ConfiguratorMaterial,
  ConfiguratorDesign,
  DimensionFieldConfig,
  ConfiguratorEnquirySubmission,
  ConfiguredItem,
} from "./types";
import { db } from "../db";

const CONFIG_DATA_DIR = path.join(process.cwd(), "data");
const CONFIG_FILE = path.join(CONFIG_DATA_DIR, "configurator.json");

interface ConfiguratorStoreSchema {
  categories: ConfiguratorCategory[];
  productTypes: ConfiguratorProductType[];
  materials: ConfiguratorMaterial[];
  designs: ConfiguratorDesign[];
  dimensions: Record<string, DimensionFieldConfig>;
}

function getDefaultStore(): ConfiguratorStoreSchema {
  return {
    categories: CONFIGURATOR_CATEGORIES,
    productTypes: ALL_PRODUCT_TYPES,
    materials: CONFIGURATOR_MATERIALS,
    designs: CONFIGURATOR_DESIGNS,
    dimensions: CATEGORY_DIMENSION_CONFIGS,
  };
}

function readConfigStore(): ConfiguratorStoreSchema {
  try {
    if (!fs.existsSync(CONFIG_DATA_DIR)) {
      fs.mkdirSync(CONFIG_DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(CONFIG_FILE)) {
      const def = getDefaultStore();
      fs.writeFileSync(CONFIG_FILE, JSON.stringify(def, null, 2), "utf-8");
      return def;
    }
    const raw = fs.readFileSync(CONFIG_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (error) {
    console.error("Failed to read configurator.json, fallback to defaults:", error);
    return getDefaultStore();
  }
}

function writeConfigStore(data: ConfiguratorStoreSchema): void {
  try {
    if (!fs.existsSync(CONFIG_DATA_DIR)) {
      fs.mkdirSync(CONFIG_DATA_DIR, { recursive: true });
    }
    const tempFile = `${CONFIG_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), "utf-8");
    fs.renameSync(tempFile, CONFIG_FILE);
  } catch (error) {
    console.error("Failed to write configurator.json:", error);
  }
}

export const configuratorDb = {
  // Public Catalog Queries
  getCategories: async (): Promise<ConfiguratorCategory[]> => {
    const store = readConfigStore();
    return store.categories;
  },

  getCategoryById: async (id: string): Promise<ConfiguratorCategory | null> => {
    const store = readConfigStore();
    return store.categories.find((c) => c.id === id) || null;
  },

  getProductTypes: async (categoryId?: string): Promise<ConfiguratorProductType[]> => {
    const store = readConfigStore();
    if (!categoryId) return store.productTypes;
    return store.productTypes.filter((p) => p.categoryId === categoryId);
  },

  getProductTypeById: async (id: string): Promise<ConfiguratorProductType | null> => {
    const store = readConfigStore();
    return store.productTypes.find((p) => p.id === id) || null;
  },

  getMaterials: async (categoryId?: string, productTypeId?: string): Promise<ConfiguratorMaterial[]> => {
    const store = readConfigStore();
    let list = store.materials;
    if (categoryId) {
      list = list.filter((m) => m.categoryId === categoryId);
    }
    if (productTypeId) {
      list = list.filter(
        (m) =>
          !m.compatibleProductIds ||
          m.compatibleProductIds.length === 0 ||
          m.compatibleProductIds.includes(productTypeId)
      );
    }
    return list;
  },

  getDesigns: async (
    categoryId?: string,
    productTypeId?: string,
    materialId?: string
  ): Promise<ConfiguratorDesign[]> => {
    const store = readConfigStore();
    let list = store.designs;
    if (categoryId) {
      list = list.filter((d) => d.categoryId === categoryId);
    }
    if (productTypeId) {
      list = list.filter(
        (d) =>
          !d.compatibleProductIds ||
          d.compatibleProductIds.length === 0 ||
          d.compatibleProductIds.includes(productTypeId)
      );
    }
    if (materialId) {
      list = list.filter(
        (d) =>
          !d.compatibleMaterialIds ||
          d.compatibleMaterialIds.length === 0 ||
          d.compatibleMaterialIds.includes(materialId)
      );
    }
    return list;
  },

  getDimensionConfig: async (categoryId: string): Promise<DimensionFieldConfig | null> => {
    const store = readConfigStore();
    return store.dimensions[categoryId] || null;
  },

  getFullCatalog: async () => {
    const store = readConfigStore();
    return store;
  },

  // Enquiry Submission with Reference Generation
  submitEnquiry: async (submission: ConfiguratorEnquirySubmission) => {
    if (!submission.items || submission.items.length === 0) {
      throw new Error("No configured items provided in enquiry.");
    }
    if (!submission.customer?.fullName || !submission.customer?.phone) {
      throw new Error("Customer name and contact number are required.");
    }

    // Generate unique reference ID
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    const referenceCode = `STM-ENQ-${new Date().getFullYear()}-${randomHex}`;

    // Compile items summary for the description field
    const itemsSummary = submission.items
      .map((item, idx) => {
        const dimStr = [
          item.dimensions.height ? `H:${item.dimensions.height}` : "",
          item.dimensions.width ? `W:${item.dimensions.width}` : "",
          item.dimensions.length ? `L:${item.dimensions.length}` : "",
          item.dimensions.thickness ? `T:${item.dimensions.thickness}` : "",
          item.dimensions.unit ? item.dimensions.unit : "",
        ]
          .filter(Boolean)
          .join(" ");

        return `[Item ${idx + 1}] ${item.productTypeName} (${item.categoryName})
- Material: ${item.materialName || "N/A"}
- Design: ${item.designName ? `${item.designName} (${item.designCode || ""})` : "Standard"}
- Dimensions: ${dimStr || "Custom"}
- Quantity: ${item.quantity} ${item.salesUnit || "units"}
${item.specialRequirements?.woodRequirement ? `- Timber Work: ${item.specialRequirements.woodRequirement}` : ""}
${item.specialRequirements?.frameFinish ? `- Frame Finish: ${item.specialRequirements.frameFinish}` : ""}
${item.specialRequirements?.glassOption ? `- Glazing: ${item.specialRequirements.glassOption}` : ""}
${item.specialRequirements?.kitchenLayout ? `- Kitchen Layout: ${item.specialRequirements.kitchenLayout}` : ""}
${item.specialRequirements?.additionalNotes ? `- Notes: ${item.specialRequirements.additionalNotes}` : ""}`;
      })
      .join("\n\n");

    const fullDescription = `ENQUIRY REFERENCE: ${referenceCode}
CUSTOMER TYPE: ${submission.customer.customerType || "Homeowner"}
PROJECT LOCATION: ${submission.customer.projectLocation || "Coimbatore & Vicinity"}
SITE CONSULTATION REQUESTED: ${submission.customer.siteMeasurementConsultationRequested ? "YES (Measurement Survey Needed)" : "No"}

--- CONFIGURED ITEMS SCHEDULE (${submission.items.length} items) ---
${itemsSummary}

--- ADDITIONAL CUSTOMER MESSAGE ---
${submission.customer.additionalMessage || "None provided"}`;

    // Save into existing DB enquiries
    const createdEnquiry = await db.enquiries.create({
      fullName: submission.customer.fullName,
      phone: submission.customer.phone,
      email: submission.customer.email || "",
      customerType: (submission.customer.customerType as any) || "Homeowner",
      productCategory: submission.items.map((i) => i.categoryName).join(", "),
      projectLocation: submission.customer.projectLocation || "Coimbatore",
      estimatedQuantity: `${submission.items.reduce((acc, i) => acc + (i.quantity || 1), 0)} Total Units (${submission.items.length} configured items)`,
      requirementDescription: fullDescription,
      consent: submission.customer.consent ?? true,
      source: `Website Configurator (${referenceCode})`,
    });

    return {
      success: true,
      referenceCode,
      enquiryId: createdEnquiry.id,
      itemsCount: submission.items.length,
      createdAt: createdEnquiry.createdAt,
    };
  },

  // Admin Management Methods
  saveProductType: async (type: ConfiguratorProductType): Promise<ConfiguratorProductType> => {
    const store = readConfigStore();
    const idx = store.productTypes.findIndex((p) => p.id === type.id);
    if (idx >= 0) {
      store.productTypes[idx] = type;
    } else {
      store.productTypes.push(type);
    }
    writeConfigStore(store);
    return type;
  },

  deleteProductType: async (id: string): Promise<boolean> => {
    const store = readConfigStore();
    const idx = store.productTypes.findIndex((p) => p.id === id);
    if (idx === -1) return false;
    store.productTypes.splice(idx, 1);
    writeConfigStore(store);
    return true;
  },

  saveMaterial: async (material: ConfiguratorMaterial): Promise<ConfiguratorMaterial> => {
    const store = readConfigStore();
    const idx = store.materials.findIndex((m) => m.id === material.id);
    if (idx >= 0) {
      store.materials[idx] = material;
    } else {
      store.materials.push(material);
    }
    writeConfigStore(store);
    return material;
  },

  deleteMaterial: async (id: string): Promise<boolean> => {
    const store = readConfigStore();
    const idx = store.materials.findIndex((m) => m.id === id);
    if (idx === -1) return false;
    store.materials.splice(idx, 1);
    writeConfigStore(store);
    return true;
  },

  saveDesign: async (design: ConfiguratorDesign): Promise<ConfiguratorDesign> => {
    const store = readConfigStore();
    const idx = store.designs.findIndex((d) => d.id === design.id);
    if (idx >= 0) {
      store.designs[idx] = design;
    } else {
      store.designs.push(design);
    }
    writeConfigStore(store);
    return design;
  },

  deleteDesign: async (id: string): Promise<boolean> => {
    const store = readConfigStore();
    const idx = store.designs.findIndex((d) => d.id === id);
    if (idx === -1) return false;
    store.designs.splice(idx, 1);
    writeConfigStore(store);
    return true;
  },
};
