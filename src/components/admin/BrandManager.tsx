"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import { Brand } from "@/lib/types";

interface BrandManagerProps {
  initialBrands: Brand[];
}

export function BrandManager({ initialBrands }: BrandManagerProps) {
  const [brands, setBrands] = useState<Brand[]>(initialBrands);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    category: "Plywood & Panels",
    description: "",
    logoUrl: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=300&auto=format&fit=crop&q=80",
    websiteUrl: "",
    featured: true,
  });

  const handleOpenCreate = () => {
    setFormData({
      name: "",
      category: "Plywood & Panels",
      description: "",
      logoUrl: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=300&auto=format&fit=crop&q=80",
      websiteUrl: "",
      featured: true,
    });
    setEditingBrand(null);
    setIsCreating(true);
  };

  const handleOpenEdit = (b: Brand) => {
    setFormData({
      name: b.name,
      category: b.category,
      description: b.description || "",
      logoUrl: b.logoUrl,
      websiteUrl: b.websiteUrl || "",
      featured: b.featured,
    });
    setEditingBrand(b);
    setIsCreating(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (editingBrand) {
        const res = await fetch(`/api/brands/${editingBrand.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.success && data.brand) {
          setBrands((prev) =>
            prev.map((item) => (item.id === editingBrand.id ? data.brand : item))
          );
          setEditingBrand(null);
        }
      } else {
        const res = await fetch("/api/brands", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.success && data.brand) {
          setBrands((prev) => [...prev, data.brand]);
          setIsCreating(false);
        }
      }
    } catch (err) {
      console.error("Save brand error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this brand?")) return;
    try {
      const res = await fetch(`/api/brands/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setBrands((prev) => prev.filter((b) => b.id !== id));
      }
    } catch (err) {
      console.error("Delete brand error:", err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-card border border-sand-200 shadow-sm">
        <div>
          <h3 className="font-serif text-xl font-medium text-walnut">
            Brochure Brands ({brands.length})
          </h3>
          <p className="text-xs text-charcoal/60 mt-0.5">
            Manage partner brands such as CenturyPly, Greenply, Fenesta, Royal Touch, etc.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-walnut hover:bg-walnut-700 text-ivory text-xs font-semibold uppercase tracking-wider rounded-button shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4 text-sand-300" />
          <span>Add Associated Brand</span>
        </button>
      </div>

      {(isCreating || editingBrand) && (
        <div className="bg-white p-8 rounded-card border-2 border-timber/50 shadow-luxury space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-sand-200 pb-4">
            <h3 className="font-serif text-2xl font-medium text-walnut">
              {editingBrand ? `Edit Brand: ${editingBrand.name}` : "Add Associated Brand"}
            </h3>
            <button
              onClick={() => {
                setIsCreating(false);
                setEditingBrand(null);
              }}
              className="p-1 text-charcoal/50 hover:text-charcoal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-walnut uppercase mb-1">
                  Brand Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. CenturyPly"
                  className="w-full px-3 py-2 text-sm bg-ivory-50 border border-sand-300 rounded-form"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-walnut uppercase mb-1">
                  Product Category / Specialty *
                </label>
                <input
                  type="text"
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g. Plywood, Panels & Veneers"
                  className="w-full px-3 py-2 text-sm bg-ivory-50 border border-sand-300 rounded-form"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-walnut uppercase mb-1">
                Official Website URL
              </label>
              <input
                type="url"
                value={formData.websiteUrl}
                onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                placeholder="https://..."
                className="w-full px-3 py-2 text-sm bg-ivory-50 border border-sand-300 rounded-form"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-walnut uppercase mb-1">
                Description / Product Specialization
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Description as appearing in brochure..."
                className="w-full px-3 py-2 text-sm bg-ivory-50 border border-sand-300 rounded-form"
              />
            </div>

            <div className="pt-4 border-t border-sand-100 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsCreating(false);
                  setEditingBrand(null);
                }}
                className="px-4 py-2 border border-sand-300 rounded-button text-xs font-medium text-charcoal"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-walnut hover:bg-walnut-700 text-ivory text-xs font-semibold uppercase tracking-wider rounded-button shadow-sm"
              >
                {isSubmitting ? "Saving..." : "Save Brand"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Brands Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {brands.map((b) => (
          <div
            key={b.id}
            className="p-6 bg-white rounded-card border border-sand-200 shadow-sm flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-semibold text-timber uppercase tracking-wider">
                  {b.category}
                </span>
                <div className="w-8 h-8 rounded-full bg-sand-100 flex items-center justify-center font-bold text-walnut font-serif text-sm">
                  {b.name.charAt(0)}
                </div>
              </div>
              <h4 className="font-serif text-2xl font-medium text-walnut">
                {b.name}
              </h4>
              <p className="text-xs text-charcoal/70 mt-2 line-clamp-3">
                {b.description}
              </p>
            </div>

            <div className="pt-3 border-t border-sand-100 flex justify-between items-center text-xs">
              <button
                onClick={() => handleOpenEdit(b)}
                className="font-semibold text-timber hover:text-walnut"
              >
                Edit Brand
              </button>
              <button
                onClick={() => handleDelete(b.id)}
                className="text-red-400 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
