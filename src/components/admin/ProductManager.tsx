"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Edit2, Trash2, Eye, EyeOff, Star, Check, X, Search } from "lucide-react";
import { Product, ProductCategory } from "@/lib/types";

interface ProductManagerProps {
  initialProducts: Product[];
}

export function ProductManager({ initialProducts }: ProductManagerProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    category: "timber" as ProductCategory,
    subcategory: "hardwood",
    shortDescription: "",
    description: "",
    badge: "",
    associatedBrand: "",
    featured: false,
    published: true,
    imageUrl: "",
  });

  const handleOpenCreate = () => {
    setFormData({
      name: "",
      category: "timber",
      subcategory: "hardwood",
      shortDescription: "",
      description: "",
      badge: "",
      associatedBrand: "",
      featured: false,
      published: true,
      imageUrl: "https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?w=800&auto=format&fit=crop&q=80",
    });
    setEditingProduct(null);
    setIsCreating(true);
  };

  const handleOpenEdit = (p: Product) => {
    setFormData({
      name: p.name,
      category: p.category,
      subcategory: p.subcategory || "",
      shortDescription: p.shortDescription,
      description: p.description,
      badge: p.badge || "",
      associatedBrand: p.associatedBrand || "",
      featured: p.featured,
      published: p.published,
      imageUrl: p.images[0] || "",
    });
    setEditingProduct(p);
    setIsCreating(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (editingProduct) {
        // Update
        const res = await fetch(`/api/products/${editingProduct.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            images: [formData.imageUrl || editingProduct.images[0]],
          }),
        });
        const data = await res.json();
        if (data.success && data.product) {
          setProducts((prev) =>
            prev.map((item) => (item.id === editingProduct.id ? data.product : item))
          );
          setEditingProduct(null);
        }
      } else {
        // Create
        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            images: [formData.imageUrl],
          }),
        });
        const data = await res.json();
        if (data.success && data.product) {
          setProducts((prev) => [data.product, ...prev]);
          setIsCreating(false);
        }
      }
    } catch (err) {
      console.error("Save product error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error("Delete product error:", err);
    }
  };

  const handleTogglePublish = async (p: Product) => {
    try {
      const res = await fetch(`/api/products/${p.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !p.published }),
      });
      const data = await res.json();
      if (data.success && data.product) {
        setProducts((prev) =>
          prev.map((item) => (item.id === p.id ? data.product : item))
        );
      }
    } catch (err) {
      console.error("Toggle publish error:", err);
    }
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-card border border-sand-200 shadow-sm">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products by name or category..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-ivory-50 border border-sand-300 rounded-form focus:outline-none focus:ring-1 focus:ring-timber"
          />
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-walnut hover:bg-walnut-700 text-ivory text-xs font-semibold uppercase tracking-wider rounded-button shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4 text-sand-300" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Editor Modal / Drawer */}
      {(isCreating || editingProduct) && (
        <div className="bg-white p-8 rounded-card border-2 border-timber/50 shadow-luxury space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-sand-200 pb-4">
            <h3 className="font-serif text-2xl font-medium text-walnut">
              {editingProduct ? `Edit: ${editingProduct.name}` : "Create New Catalogue Product"}
            </h3>
            <button
              onClick={() => {
                setIsCreating(false);
                setEditingProduct(null);
              }}
              className="p-1 text-charcoal/50 hover:text-charcoal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-walnut uppercase mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Ghana Teak Lumber"
                  className="w-full px-3 py-2 text-sm bg-ivory-50 border border-sand-300 rounded-form"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-walnut uppercase mb-1">
                  Primary Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as ProductCategory })}
                  className="w-full px-3 py-2 text-sm bg-ivory-50 border border-sand-300 rounded-form text-charcoal"
                >
                  <option value="timber">Timber</option>
                  <option value="plywood-mdf">Plywood & MDF</option>
                  <option value="doors">Doors</option>
                  <option value="wpc">WPC</option>
                  <option value="windows">Windows</option>
                  <option value="modular-interiors">Modular Interiors</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-walnut uppercase mb-1">
                  Subcategory / Wood Type
                </label>
                <input
                  type="text"
                  value={formData.subcategory}
                  onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                  placeholder="e.g. hardwood / waterproof / veneer"
                  className="w-full px-3 py-2 text-sm bg-ivory-50 border border-sand-300 rounded-form"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-walnut uppercase mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full px-3 py-2 text-sm bg-ivory-50 border border-sand-300 rounded-form"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-walnut uppercase mb-1">
                    Badge (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="e.g. Master Grade"
                    className="w-full px-3 py-2 text-sm bg-ivory-50 border border-sand-300 rounded-form"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-walnut uppercase mb-1">
                    Associated Brand
                  </label>
                  <input
                    type="text"
                    value={formData.associatedBrand}
                    onChange={(e) => setFormData({ ...formData, associatedBrand: e.target.value })}
                    placeholder="e.g. CenturyPly / Fenesta"
                    className="w-full px-3 py-2 text-sm bg-ivory-50 border border-sand-300 rounded-form"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-walnut uppercase mb-1">
                Short Description (Listing Summary) *
              </label>
              <textarea
                rows={2}
                required
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                placeholder="Brief summary for catalogue card preview..."
                className="w-full px-3 py-2 text-sm bg-ivory-50 border border-sand-300 rounded-form"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-walnut uppercase mb-1">
                Full Architectural Description *
              </label>
              <textarea
                rows={4}
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Comprehensive technical details, wood stability, and provenance..."
                className="w-full px-3 py-2 text-sm bg-ivory-50 border border-sand-300 rounded-form"
              />
            </div>

            <div className="flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-walnut">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="rounded border-sand-400 text-timber focus:ring-timber"
                />
                <span>Set as Featured on Homepage</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-walnut">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="rounded border-sand-400 text-timber focus:ring-timber"
                />
                <span>Published & Visible Online</span>
              </label>
            </div>

            <div className="pt-4 border-t border-sand-100 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsCreating(false);
                  setEditingProduct(null);
                }}
                className="px-4 py-2 border border-sand-300 rounded-button text-xs font-medium text-charcoal hover:bg-sand-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-walnut hover:bg-walnut-700 text-ivory text-xs font-semibold uppercase tracking-wider rounded-button shadow-sm"
              >
                {isSubmitting ? "Saving..." : "Save Product"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Product List Table */}
      <div className="bg-white rounded-card border border-sand-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-ivory-100 text-walnut uppercase tracking-wider font-semibold border-b border-sand-200">
              <tr>
                <th className="py-3 px-4">Image</th>
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Brand</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-100">
              {filtered.map((prod) => (
                <tr key={prod.id} className="hover:bg-ivory-50/60 transition-colors">
                  <td className="py-3 px-4">
                    <div className="relative w-12 h-12 rounded-sm overflow-hidden bg-sand-100 border border-sand-200">
                      <Image
                        src={prod.images[0] || "https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?w=200&auto=format&fit=crop&q=80"}
                        alt={prod.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-serif text-base font-medium text-walnut block">
                      {prod.name}
                    </span>
                    <span className="text-[11px] text-charcoal/50 line-clamp-1">
                      {prod.shortDescription}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="capitalize text-charcoal/80 font-medium">
                      {prod.category}
                    </span>
                    {prod.subcategory && (
                      <span className="block text-[10px] text-charcoal/50">
                        {prod.subcategory}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-charcoal/70">
                    {prod.associatedBrand || "—"}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleTogglePublish(prod)}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-semibold ${
                        prod.published
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {prod.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      <span>{prod.published ? "Published" : "Hidden"}</span>
                    </button>
                    {prod.featured && (
                      <span className="ml-2 inline-flex items-center gap-0.5 text-[10px] font-semibold text-amber-600">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        <span>Featured</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(prod)}
                      className="p-1.5 text-timber hover:text-walnut transition-colors"
                      title="Edit Product"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(prod.id)}
                      className="p-1.5 text-red-400 hover:text-red-600 transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
