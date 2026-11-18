import fs from "fs";
import path from "path";
import { Product, Project, Brand, Service, Enquiry, SiteSettings } from "./types";
import {
  INITIAL_PRODUCTS,
  INITIAL_PROJECTS,
  INITIAL_BRANDS,
  INITIAL_SERVICES,
  INITIAL_ENQUIRIES,
} from "./data/initialData";
import { SITE_SETTINGS } from "./constants";

export interface DatabaseSchema {
  products: Product[];
  projects: Project[];
  brands: Brand[];
  services: Service[];
  enquiries: Enquiry[];
  settings: SiteSettings;
  admin: {
    email: string;
    passwordHash: string; // "admin123" for quick demo evaluation
  };
}

const DB_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DB_DIR, "db.json");

function getDefaultData(): DatabaseSchema {
  return {
    products: INITIAL_PRODUCTS,
    projects: INITIAL_PROJECTS,
    brands: INITIAL_BRANDS,
    services: INITIAL_SERVICES,
    enquiries: INITIAL_ENQUIRIES,
    settings: SITE_SETTINGS,
    admin: {
      email: "admin@shankartimbermart.com",
      passwordHash: "admin123", // default demo credential
    },
  };
}

function readDb(): DatabaseSchema {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      const initial = getDefaultData();
      fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), "utf-8");
      return initial;
    }
    const raw = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (error) {
    console.error("Failed to read database file, using in-memory defaults:", error);
    return getDefaultData();
  }
}

function writeDb(data: DatabaseSchema): void {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    const tempFile = `${DB_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), "utf-8");
    fs.renameSync(tempFile, DB_FILE);
  } catch (error) {
    console.error("Failed to write database file:", error);
  }
}

export const db = {
  products: {
    getAll: async (): Promise<Product[]> => {
      const data = readDb();
      return data.products;
    },
    getBySlug: async (slug: string): Promise<Product | null> => {
      const data = readDb();
      return data.products.find((p) => p.slug === slug) || null;
    },
    getById: async (id: string): Promise<Product | null> => {
      const data = readDb();
      return data.products.find((p) => p.id === id) || null;
    },
    create: async (newProd: Omit<Product, "id" | "createdAt" | "updatedAt">): Promise<Product> => {
      const data = readDb();
      const product: Product = {
        ...newProd,
        id: `prod-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      data.products.unshift(product);
      writeDb(data);
      return product;
    },
    update: async (id: string, updates: Partial<Product>): Promise<Product | null> => {
      const data = readDb();
      const index = data.products.findIndex((p) => p.id === id);
      if (index === -1) return null;
      data.products[index] = {
        ...data.products[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      writeDb(data);
      return data.products[index];
    },
    delete: async (id: string): Promise<boolean> => {
      const data = readDb();
      const index = data.products.findIndex((p) => p.id === id);
      if (index === -1) return false;
      data.products.splice(index, 1);
      writeDb(data);
      return true;
    },
  },

  projects: {
    getAll: async (): Promise<Project[]> => {
      const data = readDb();
      return data.projects;
    },
    getBySlug: async (slug: string): Promise<Project | null> => {
      const data = readDb();
      return data.projects.find((p) => p.slug === slug) || null;
    },
    getById: async (id: string): Promise<Project | null> => {
      const data = readDb();
      return data.projects.find((p) => p.id === id) || null;
    },
    create: async (newProj: Omit<Project, "id" | "createdAt" | "updatedAt">): Promise<Project> => {
      const data = readDb();
      const project: Project = {
        ...newProj,
        id: `proj-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      data.projects.unshift(project);
      writeDb(data);
      return project;
    },
    update: async (id: string, updates: Partial<Project>): Promise<Project | null> => {
      const data = readDb();
      const index = data.projects.findIndex((p) => p.id === id);
      if (index === -1) return null;
      data.projects[index] = {
        ...data.projects[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      writeDb(data);
      return data.projects[index];
    },
    delete: async (id: string): Promise<boolean> => {
      const data = readDb();
      const index = data.projects.findIndex((p) => p.id === id);
      if (index === -1) return false;
      data.projects.splice(index, 1);
      writeDb(data);
      return true;
    },
  },

  brands: {
    getAll: async (): Promise<Brand[]> => {
      const data = readDb();
      return data.brands;
    },
    getById: async (id: string): Promise<Brand | null> => {
      const data = readDb();
      return data.brands.find((b) => b.id === id) || null;
    },
    create: async (newBrand: Omit<Brand, "id" | "createdAt" | "updatedAt">): Promise<Brand> => {
      const data = readDb();
      const brand: Brand = {
        ...newBrand,
        id: `brand-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      data.brands.push(brand);
      writeDb(data);
      return brand;
    },
    update: async (id: string, updates: Partial<Brand>): Promise<Brand | null> => {
      const data = readDb();
      const index = data.brands.findIndex((b) => b.id === id);
      if (index === -1) return null;
      data.brands[index] = {
        ...data.brands[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      writeDb(data);
      return data.brands[index];
    },
    delete: async (id: string): Promise<boolean> => {
      const data = readDb();
      const index = data.brands.findIndex((b) => b.id === id);
      if (index === -1) return false;
      data.brands.splice(index, 1);
      writeDb(data);
      return true;
    },
  },

  services: {
    getAll: async (): Promise<Service[]> => {
      const data = readDb();
      return data.services;
    },
    getBySlug: async (slug: string): Promise<Service | null> => {
      const data = readDb();
      return data.services.find((s) => s.slug === slug) || null;
    },
  },

  enquiries: {
    getAll: async (): Promise<Enquiry[]> => {
      const data = readDb();
      return data.enquiries;
    },
    getById: async (id: string): Promise<Enquiry | null> => {
      const data = readDb();
      return data.enquiries.find((e) => e.id === id) || null;
    },
    create: async (newEnq: Omit<Enquiry, "id" | "createdAt" | "updatedAt" | "status">): Promise<Enquiry> => {
      const data = readDb();
      const enquiry: Enquiry = {
        ...newEnq,
        id: `enq-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        status: "New",
        internalNotes: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      data.enquiries.unshift(enquiry);
      writeDb(data);
      return enquiry;
    },
    updateStatus: async (id: string, status: Enquiry["status"]): Promise<Enquiry | null> => {
      const data = readDb();
      const index = data.enquiries.findIndex((e) => e.id === id);
      if (index === -1) return null;
      data.enquiries[index].status = status;
      data.enquiries[index].updatedAt = new Date().toISOString();
      writeDb(data);
      return data.enquiries[index];
    },
    addNote: async (id: string, note: string, author = "Admin"): Promise<Enquiry | null> => {
      const data = readDb();
      const index = data.enquiries.findIndex((e) => e.id === id);
      if (index === -1) return null;
      if (!data.enquiries[index].internalNotes) {
        data.enquiries[index].internalNotes = [];
      }
      data.enquiries[index].internalNotes!.push({
        id: `note-${Date.now()}`,
        author,
        note,
        createdAt: new Date().toISOString(),
      });
      data.enquiries[index].updatedAt = new Date().toISOString();
      writeDb(data);
      return data.enquiries[index];
    },
    delete: async (id: string): Promise<boolean> => {
      const data = readDb();
      const index = data.enquiries.findIndex((e) => e.id === id);
      if (index === -1) return false;
      data.enquiries.splice(index, 1);
      writeDb(data);
      return true;
    },
  },

  settings: {
    get: async (): Promise<SiteSettings> => {
      const data = readDb();
      return data.settings || SITE_SETTINGS;
    },
    update: async (updates: Partial<SiteSettings>): Promise<SiteSettings> => {
      const data = readDb();
      data.settings = { ...data.settings, ...updates };
      writeDb(data);
      return data.settings;
    },
  },

  auth: {
    verifyAdmin: async (password: string): Promise<boolean> => {
      const data = readDb();
      return password === data.admin.passwordHash;
    },
    updatePassword: async (newPassword: string): Promise<boolean> => {
      const data = readDb();
      data.admin.passwordHash = newPassword;
      writeDb(data);
      return true;
    },
  },
};
