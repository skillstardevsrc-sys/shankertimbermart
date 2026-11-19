"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Layers,
  Sparkles,
  Palette,
  Ruler,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  Check,
  AlertCircle,
  Eye,
  Search,
  Filter,
} from "lucide-react";
import {
  ConfiguratorCategory,
  ConfiguratorProductType,
  ConfiguratorMaterial,
  ConfiguratorDesign,
  DimensionFieldConfig,
} from "@/lib/configurator/types";

interface ProductConfiguratorAdminProps {
  initialCategories: ConfiguratorCategory[];
  initialProductTypes: ConfiguratorProductType[];
  initialMaterials: ConfiguratorMaterial[];
  initialDesigns: ConfiguratorDesign[];
  initialDimensions: Record<string, DimensionFieldConfig>;
}

export function ProductConfiguratorAdmin({
  initialCategories,
  initialProductTypes,
  initialMaterials,
  initialDesigns,
  initialDimensions,
}: ProductConfiguratorAdminProps) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "types" | "materials" | "designs" | "dimensions"
  >("overview");

  const [categories] = useState<ConfiguratorCategory[]>(initialCategories);
  const [productTypes, setProductTypes] = useState<ConfiguratorProductType[]>(initialProductTypes);
  const [materials, setMaterials] = useState<ConfiguratorMaterial[]>(initialMaterials);
  const [designs, setDesigns] = useState<ConfiguratorDesign[]>(initialDesigns);

  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Edit / Create Modals State
  const [editingProductType, setEditingProductType] = useState<Partial<ConfiguratorProductType> | null>(null);
  const [editingMaterial, setEditingMaterial] = useState<Partial<ConfiguratorMaterial> | null>(null);
  const [editingDesign, setEditingDesign] = useState<Partial<ConfiguratorDesign> | null>(null);

  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Filtered lists
  const filteredProductTypes = productTypes.filter((pt) => {
    const matchCat = filterCategory === "all" || pt.categoryId === filterCategory;
    const matchSearch =
      !searchTerm ||
      pt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pt.subtitle.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  const filteredMaterials = materials.filter((m) => {
    const matchCat = filterCategory === "all" || m.categoryId === filterCategory;
    const matchSearch =
      !searchTerm ||
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  const filteredDesigns = designs.filter((d) => {
    const matchCat = filterCategory === "all" || d.categoryId === filterCategory;
    const matchSearch =
      !searchTerm ||
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.designCode.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  // Save Product Type via API
  const handleSaveProductType = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProductType?.name || !editingProductType?.id) return;

    try {
      const res = await fetch("/api/configurator/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "saveProductType",
          payload: editingProductType,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setProductTypes((prev) => {
          const idx = prev.findIndex((p) => p.id === editingProductType.id);
          if (idx >= 0) {
            const next = [...prev];
            next[idx] = data.data;
            return next;
          }
          return [...prev, data.data];
        });
        setEditingProductType(null);
        setStatusMessage("Product type updated successfully.");
        setTimeout(() => setStatusMessage(null), 3000);
      }
    } catch (err) {
      alert("Failed to save product type.");
    }
  };

  // Delete Product Type
  const handleDeleteProductType = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product type?")) return;
    try {
      const res = await fetch("/api/configurator/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "deleteProductType", payload: { id } }),
      });
      if (res.ok) {
        setProductTypes((prev) => prev.filter((p) => p.id !== id));
        setStatusMessage("Product type removed.");
        setTimeout(() => setStatusMessage(null), 3000);
      }
    } catch {
      alert("Error deleting product type.");
    }
  };

  // Save Material via API
  const handleSaveMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMaterial?.name || !editingMaterial?.id) return;

    try {
      const res = await fetch("/api/configurator/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "saveMaterial",
          payload: editingMaterial,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setMaterials((prev) => {
          const idx = prev.findIndex((m) => m.id === editingMaterial.id);
          if (idx >= 0) {
            const next = [...prev];
            next[idx] = data.data;
            return next;
          }
          return [...prev, data.data];
        });
        setEditingMaterial(null);
        setStatusMessage("Material saved successfully.");
        setTimeout(() => setStatusMessage(null), 3000);
      }
    } catch {
      alert("Failed to save material.");
    }
  };

  // Delete Material
  const handleDeleteMaterial = async (id: string) => {
    if (!confirm("Are you sure you want to delete this material option?")) return;
    try {
      const res = await fetch("/api/configurator/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "deleteMaterial", payload: { id } }),
      });
      if (res.ok) {
        setMaterials((prev) => prev.filter((m) => m.id !== id));
        setStatusMessage("Material removed.");
        setTimeout(() => setStatusMessage(null), 3000);
      }
    } catch {
      alert("Error deleting material.");
    }
  };

  // Save Design via API
  const handleSaveDesign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDesign?.name || !editingDesign?.id) return;

    try {
      const res = await fetch("/api/configurator/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "saveDesign",
          payload: editingDesign,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setDesigns((prev) => {
          const idx = prev.findIndex((d) => d.id === editingDesign.id);
          if (idx >= 0) {
            const next = [...prev];
            next[idx] = data.data;
            return next;
          }
          return [...prev, data.data];
        });
        setEditingDesign(null);
        setStatusMessage("Design variant saved successfully.");
        setTimeout(() => setStatusMessage(null), 3000);
      }
    } catch {
      alert("Failed to save design.");
    }
  };

  // Delete Design
  const handleDeleteDesign = async (id: string) => {
    if (!confirm("Are you sure you want to delete this design pattern?")) return;
    try {
      const res = await fetch("/api/configurator/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "deleteDesign", payload: { id } }),
      });
      if (res.ok) {
        setDesigns((prev) => prev.filter((d) => d.id !== id));
        setStatusMessage("Design pattern removed.");
        setTimeout(() => setStatusMessage(null), 3000);
      }
    } catch {
      alert("Error deleting design.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Admin Subheader & Live Preview Link */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sand-300 pb-6">
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-timber">
            Module 12 — Relationship Catalogue
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-walnut">
            Product Configurator CMS
          </h1>
          <p className="text-xs sm:text-sm text-charcoal/70 mt-1">
            Manage product typologies, assign compatible materials, upload design variations, and define measurement rules.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/configurator"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-button bg-walnut hover:bg-walnut-700 text-ivory text-xs font-semibold uppercase tracking-wider shadow-sm transition-colors"
          >
            <Eye className="w-4 h-4 text-sand-300" />
            <span>Test Customer Experience</span>
            <ExternalLink className="w-3.5 h-3.5 text-sand-300" />
          </Link>
        </div>
      </div>

      {statusMessage && (
        <div className="p-3 rounded-xl bg-olive/15 text-olive text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-sand-300 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
            activeTab === "overview"
              ? "bg-walnut text-ivory shadow-sm"
              : "bg-white text-charcoal/70 hover:bg-sand-100 border border-sand-300"
          }`}
        >
          Categories ({categories.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("types")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
            activeTab === "types"
              ? "bg-walnut text-ivory shadow-sm"
              : "bg-white text-charcoal/70 hover:bg-sand-100 border border-sand-300"
          }`}
        >
          Product Typologies ({productTypes.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("materials")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
            activeTab === "materials"
              ? "bg-walnut text-ivory shadow-sm"
              : "bg-white text-charcoal/70 hover:bg-sand-100 border border-sand-300"
          }`}
        >
          Materials & Finishes ({materials.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("designs")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
            activeTab === "designs"
              ? "bg-walnut text-ivory shadow-sm"
              : "bg-white text-charcoal/70 hover:bg-sand-100 border border-sand-300"
          }`}
        >
          Design Variants ({designs.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("dimensions")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
            activeTab === "dimensions"
              ? "bg-walnut text-ivory shadow-sm"
              : "bg-white text-charcoal/70 hover:bg-sand-100 border border-sand-300"
          }`}
        >
          Dimension Rules
        </button>
      </div>

      {/* Global Filter Bar (when on types, materials, or designs) */}
      {activeTab !== "overview" && activeTab !== "dimensions" && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-xl border border-sand-300 shadow-sm">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-timber shrink-0" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-sand-300 text-xs font-semibold text-walnut outline-none cursor-pointer"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-charcoal/40" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, ID or code..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-sand-300 text-xs text-walnut outline-none"
            />
          </div>
        </div>
      )}

      {/* TAB 01: Categories Overview */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => {
              const typesCount = productTypes.filter((p) => p.categoryId === cat.id).length;
              const materialsCount = materials.filter((m) => m.categoryId === cat.id).length;
              const designsCount = designs.filter((d) => d.categoryId === cat.id).length;

              return (
                <div
                  key={cat.id}
                  className="rounded-2xl bg-white border border-sand-300 overflow-hidden shadow-sm flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/9] w-full bg-sand-100">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="33vw"
                      className="object-cover object-center"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-walnut/80 text-ivory text-[10px] font-mono uppercase">
                      ID: {cat.id}
                    </div>
                  </div>

                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif text-xl font-semibold text-walnut">{cat.name}</h4>
                      <p className="text-xs text-charcoal/70 line-clamp-2 mt-1">
                        {cat.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-sand-200 grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-2 rounded-lg bg-sand-100">
                        <span className="font-mono font-bold text-walnut block">{typesCount}</span>
                        <span className="text-[10px] text-charcoal/60">Types</span>
                      </div>
                      <div className="p-2 rounded-lg bg-sand-100">
                        <span className="font-mono font-bold text-walnut block">{materialsCount}</span>
                        <span className="text-[10px] text-charcoal/60">Materials</span>
                      </div>
                      <div className="p-2 rounded-lg bg-sand-100">
                        <span className="font-mono font-bold text-walnut block">{designsCount}</span>
                        <span className="text-[10px] text-charcoal/60">Designs</span>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-[11px] text-olive font-medium">
                        {cat.steps.length} Steps in Customer Journey
                      </span>
                      <Link
                        href={`/configurator?category=${cat.id}`}
                        target="_blank"
                        className="text-xs text-timber font-semibold hover:underline inline-flex items-center gap-1"
                      >
                        <span>Preview</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 02: Product Typologies Manager */}
      {activeTab === "types" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-serif text-xl font-semibold text-walnut">
              Registered Product Types ({filteredProductTypes.length})
            </h3>
            <button
              type="button"
              onClick={() =>
                setEditingProductType({
                  id: `type-${Date.now()}`,
                  categoryId: (filterCategory !== "all" ? filterCategory : "doors") as any,
                  name: "",
                  subtitle: "",
                  description: "",
                  image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80",
                  features: [],
                  supportedMaterialIds: [],
                  defaultSalesUnit: "pieces",
                })
              }
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-button bg-walnut text-ivory text-xs font-semibold uppercase tracking-wider"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Product Type</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProductTypes.map((pt) => (
              <div
                key={pt.id}
                className="rounded-xl bg-white border border-sand-300 p-4 shadow-sm flex flex-col justify-between space-y-3"
              >
                <div className="flex items-start gap-3">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-sand-100 shrink-0 border border-sand-200">
                    <Image
                      src={pt.image}
                      alt={pt.name}
                      fill
                      sizes="64px"
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-mono text-charcoal/50 uppercase block">
                      ID: {pt.id} • {pt.categoryId}
                    </span>
                    <h5 className="font-serif text-base font-semibold text-walnut line-clamp-1">
                      {pt.name}
                    </h5>
                    <p className="text-[11px] text-timber line-clamp-1">{pt.subtitle}</p>
                  </div>
                </div>

                <div className="text-xs text-charcoal/70 line-clamp-2">{pt.description}</div>

                <div className="pt-2 border-t border-sand-200 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-charcoal/50 font-mono">
                    Sales unit: {pt.defaultSalesUnit || "pieces"}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingProductType(pt)}
                      className="p-1.5 text-walnut hover:text-timber transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteProductType(pt.id)}
                      className="p-1.5 text-charcoal/40 hover:text-red-600 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 03: Materials & Finishes Manager */}
      {activeTab === "materials" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-serif text-xl font-semibold text-walnut">
              Material Catalog & Compatibility Rules ({filteredMaterials.length})
            </h3>
            <button
              type="button"
              onClick={() =>
                setEditingMaterial({
                  id: `mat-${Date.now()}`,
                  categoryId: (filterCategory !== "all" ? filterCategory : "doors") as any,
                  name: "",
                  shortDescription: "",
                  image: "https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?w=600&auto=format&fit=crop&q=80",
                  textureThumb: "https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?w=200&auto=format&fit=crop&q=80",
                  compatibleProductIds: [],
                })
              }
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-button bg-walnut text-ivory text-xs font-semibold uppercase tracking-wider"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Material</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredMaterials.map((mat) => (
              <div
                key={mat.id}
                className="rounded-xl bg-white border border-sand-300 p-4 shadow-sm flex flex-col justify-between space-y-3"
              >
                <div className="flex items-start gap-3">
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-sand-100 shrink-0 border border-sand-200">
                    <Image
                      src={mat.textureThumb || mat.image}
                      alt={mat.name}
                      fill
                      sizes="56px"
                      className="object-cover object-center"
                    />
                    {mat.colorTone && (
                      <div
                        className="absolute bottom-1 right-1 w-3 h-3 rounded-full border border-white"
                        style={{ backgroundColor: mat.colorTone }}
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-mono text-charcoal/50 uppercase block">
                      ID: {mat.id} • {mat.categoryId}
                    </span>
                    <h5 className="font-serif text-base font-semibold text-walnut line-clamp-1">
                      {mat.name}
                    </h5>
                    <span className="text-[10px] text-olive font-medium">
                      {mat.sheen || "Standard finish"}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-charcoal/70 line-clamp-2">{mat.shortDescription}</p>

                <div className="pt-2 border-t border-sand-200 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-charcoal/60 truncate max-w-[65%]">
                    Compatible with: {mat.compatibleProductIds?.length || "All"} types
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingMaterial(mat)}
                      className="p-1.5 text-walnut hover:text-timber transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteMaterial(mat.id)}
                      className="p-1.5 text-charcoal/40 hover:text-red-600 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 04: Designs Manager */}
      {activeTab === "designs" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-serif text-xl font-semibold text-walnut">
              Architectural Design Variations ({filteredDesigns.length})
            </h3>
            <button
              type="button"
              onClick={() =>
                setEditingDesign({
                  id: `des-${Date.now()}`,
                  designCode: `STM-DES-${Math.floor(10 + Math.random() * 90)}`,
                  categoryId: (filterCategory !== "all" ? filterCategory : "doors") as any,
                  name: "",
                  description: "",
                  image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=900&auto=format&fit=crop&q=85",
                  styleCategory: "Modern Luxury",
                  compatibleProductIds: [],
                  compatibleMaterialIds: [],
                })
              }
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-button bg-walnut text-ivory text-xs font-semibold uppercase tracking-wider"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Design Variant</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredDesigns.map((des) => (
              <div
                key={des.id}
                className="rounded-xl bg-white border border-sand-300 p-4 shadow-sm flex flex-col justify-between space-y-3"
              >
                <div className="flex items-start gap-3">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-sand-100 shrink-0 border border-sand-200">
                    <Image
                      src={des.image}
                      alt={des.name}
                      fill
                      sizes="64px"
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-mono text-amber-700 font-bold block">
                      {des.designCode}
                    </span>
                    <h5 className="font-serif text-base font-semibold text-walnut line-clamp-1">
                      {des.name}
                    </h5>
                    <span className="text-[10px] text-charcoal/50 block">
                      Style: {des.styleCategory || "Architectural"}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-charcoal/70 line-clamp-2">{des.description}</p>

                <div className="pt-2 border-t border-sand-200 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-charcoal/60 truncate max-w-[65%]">
                    Cat: {des.categoryId}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingDesign(des)}
                      className="p-1.5 text-walnut hover:text-timber transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteDesign(des.id)}
                      className="p-1.5 text-charcoal/40 hover:text-red-600 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 05: Dimension Rules Overview */}
      {activeTab === "dimensions" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(initialDimensions).map(([catId, dimConfig]) => (
              <div
                key={catId}
                className="rounded-2xl bg-white border border-sand-300 p-6 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between border-b border-sand-200 pb-3">
                  <h4 className="font-serif text-xl font-semibold text-walnut uppercase tracking-wide">
                    {catId} Dimensions Config
                  </h4>
                  <span className="text-xs font-mono font-bold text-timber bg-sand-100 px-2.5 py-1 rounded">
                    Default: {dimConfig.defaultUnit}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-charcoal/70">Supported Units:</span>
                    <span className="font-mono text-walnut">
                      {dimConfig.supportedUnits.join(", ").toUpperCase()}
                    </span>
                  </div>
                  {dimConfig.height?.enabled && (
                    <div className="flex justify-between">
                      <span className="text-charcoal/70">{dimConfig.height.label}:</span>
                      <span className="font-mono text-walnut">
                        {dimConfig.height.min} - {dimConfig.height.max} (Default: {dimConfig.height.defaultValue})
                      </span>
                    </div>
                  )}
                  {dimConfig.width?.enabled && (
                    <div className="flex justify-between">
                      <span className="text-charcoal/70">{dimConfig.width.label}:</span>
                      <span className="font-mono text-walnut">
                        {dimConfig.width.min} - {dimConfig.width.max} (Default: {dimConfig.width.defaultValue})
                      </span>
                    </div>
                  )}
                  {dimConfig.thickness?.enabled && dimConfig.thickness.options && (
                    <div>
                      <span className="text-charcoal/70 block mb-1">
                        {dimConfig.thickness.label} Options:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {dimConfig.thickness.options.map((opt) => (
                          <span
                            key={opt}
                            className="px-2 py-0.5 rounded bg-sand-100 text-walnut text-[10px]"
                          >
                            {opt}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {dimConfig.consultationOption && (
                    <div className="pt-2 text-olive font-medium">
                      ✓ Free Site Measurement Consultation Enabled
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Edit Product Type Modal */}
      {editingProductType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-walnut/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif text-xl font-bold text-walnut">Edit Product Type</h3>
            <form onSubmit={handleSaveProductType} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Type ID</label>
                <input
                  type="text"
                  required
                  value={editingProductType.id || ""}
                  onChange={(e) =>
                    setEditingProductType({ ...editingProductType, id: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg font-mono"
                />
              </div>
              <div>
                <label className="font-semibold block mb-1">Category</label>
                <select
                  value={editingProductType.categoryId || "doors"}
                  onChange={(e) =>
                    setEditingProductType({
                      ...editingProductType,
                      categoryId: e.target.value as any,
                    })
                  }
                  className="w-full p-2 border rounded-lg"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-semibold block mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={editingProductType.name || ""}
                  onChange={(e) =>
                    setEditingProductType({ ...editingProductType, name: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="font-semibold block mb-1">Subtitle / Architectural Classification</label>
                <input
                  type="text"
                  value={editingProductType.subtitle || ""}
                  onChange={(e) =>
                    setEditingProductType({ ...editingProductType, subtitle: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="font-semibold block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingProductType.description || ""}
                  onChange={(e) =>
                    setEditingProductType({ ...editingProductType, description: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="font-semibold block mb-1">Product Photograph URL</label>
                <input
                  type="url"
                  required
                  value={editingProductType.image || ""}
                  onChange={(e) =>
                    setEditingProductType({ ...editingProductType, image: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg font-mono text-[11px]"
                />
              </div>
              <div>
                <label className="font-semibold block mb-1">Default Sales Unit</label>
                <input
                  type="text"
                  value={editingProductType.defaultSalesUnit || "pieces"}
                  onChange={(e) =>
                    setEditingProductType({
                      ...editingProductType,
                      defaultSalesUnit: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div className="pt-4 flex justify-end gap-2 border-t">
                <button
                  type="button"
                  onClick={() => setEditingProductType(null)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-walnut text-ivory rounded-lg font-semibold"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Material Modal */}
      {editingMaterial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-walnut/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif text-xl font-bold text-walnut">Edit Material Option</h3>
            <form onSubmit={handleSaveMaterial} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Material ID</label>
                <input
                  type="text"
                  required
                  value={editingMaterial.id || ""}
                  onChange={(e) =>
                    setEditingMaterial({ ...editingMaterial, id: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg font-mono"
                />
              </div>
              <div>
                <label className="font-semibold block mb-1">Category</label>
                <select
                  value={editingMaterial.categoryId || "doors"}
                  onChange={(e) =>
                    setEditingMaterial({
                      ...editingMaterial,
                      categoryId: e.target.value as any,
                    })
                  }
                  className="w-full p-2 border rounded-lg"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-semibold block mb-1">Material Name</label>
                <input
                  type="text"
                  required
                  value={editingMaterial.name || ""}
                  onChange={(e) =>
                    setEditingMaterial({ ...editingMaterial, name: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="font-semibold block mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={editingMaterial.shortDescription || ""}
                  onChange={(e) =>
                    setEditingMaterial({ ...editingMaterial, shortDescription: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="font-semibold block mb-1">Image URL</label>
                <input
                  type="url"
                  required
                  value={editingMaterial.image || ""}
                  onChange={(e) =>
                    setEditingMaterial({ ...editingMaterial, image: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg font-mono text-[11px]"
                />
              </div>
              <div>
                <label className="font-semibold block mb-1">Texture Thumbnail URL</label>
                <input
                  type="url"
                  value={editingMaterial.textureThumb || ""}
                  onChange={(e) =>
                    setEditingMaterial({ ...editingMaterial, textureThumb: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg font-mono text-[11px]"
                />
              </div>
              <div>
                <label className="font-semibold block mb-1">Color Hex</label>
                <input
                  type="text"
                  value={editingMaterial.colorTone || ""}
                  onChange={(e) =>
                    setEditingMaterial({ ...editingMaterial, colorTone: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg font-mono"
                  placeholder="#A47A4D"
                />
              </div>

              <div className="pt-4 flex justify-end gap-2 border-t">
                <button
                  type="button"
                  onClick={() => setEditingMaterial(null)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-walnut text-ivory rounded-lg font-semibold"
                >
                  Save Material
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Design Modal */}
      {editingDesign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-walnut/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif text-xl font-bold text-walnut">Edit Architectural Design</h3>
            <form onSubmit={handleSaveDesign} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Design Code</label>
                <input
                  type="text"
                  required
                  value={editingDesign.designCode || ""}
                  onChange={(e) =>
                    setEditingDesign({ ...editingDesign, designCode: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg font-mono"
                  placeholder="STM-DR-VN01"
                />
              </div>
              <div>
                <label className="font-semibold block mb-1">Category</label>
                <select
                  value={editingDesign.categoryId || "doors"}
                  onChange={(e) =>
                    setEditingDesign({
                      ...editingDesign,
                      categoryId: e.target.value as any,
                    })
                  }
                  className="w-full p-2 border rounded-lg"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-semibold block mb-1">Design Name</label>
                <input
                  type="text"
                  required
                  value={editingDesign.name || ""}
                  onChange={(e) =>
                    setEditingDesign({ ...editingDesign, name: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="font-semibold block mb-1">Style Category</label>
                <input
                  type="text"
                  value={editingDesign.styleCategory || "Modern Luxury"}
                  onChange={(e) =>
                    setEditingDesign({ ...editingDesign, styleCategory: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="font-semibold block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingDesign.description || ""}
                  onChange={(e) =>
                    setEditingDesign({ ...editingDesign, description: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="font-semibold block mb-1">High-Res Photograph URL</label>
                <input
                  type="url"
                  required
                  value={editingDesign.image || ""}
                  onChange={(e) =>
                    setEditingDesign({ ...editingDesign, image: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg font-mono text-[11px]"
                />
              </div>

              <div className="pt-4 flex justify-end gap-2 border-t">
                <button
                  type="button"
                  onClick={() => setEditingDesign(null)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-walnut text-ivory rounded-lg font-semibold"
                >
                  Save Design
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
