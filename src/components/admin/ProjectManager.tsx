"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Edit2, Trash2, Eye, EyeOff, X } from "lucide-react";
import { Project } from "@/lib/types";

interface ProjectManagerProps {
  initialProjects: Project[];
}

export function ProjectManager({ initialProjects }: ProjectManagerProps) {
  const [projects, setProducts] = useState<Project[]>(initialProjects);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "Residential" as Project["category"],
    location: "Coimbatore",
    overview: "",
    description: "",
    coverImage: "",
    materialsText: "",
    featured: false,
    published: true,
  });

  const handleOpenCreate = () => {
    setFormData({
      title: "",
      category: "Residential",
      location: "Coimbatore",
      overview: "",
      description: "",
      coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&auto=format&fit=crop&q=80",
      materialsText: "Burma Teak Wood, BWP 710 Marine Plywood, Fenesta Windows",
      featured: false,
      published: true,
    });
    setEditingProject(null);
    setIsCreating(true);
  };

  const handleOpenEdit = (proj: Project) => {
    setFormData({
      title: proj.title,
      category: proj.category,
      location: proj.location || "",
      overview: proj.overview,
      description: proj.description,
      coverImage: proj.coverImage,
      materialsText: proj.materialsUsed?.join(", ") || "",
      featured: proj.featured,
      published: proj.published,
    });
    setEditingProject(proj);
    setIsCreating(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const materialsUsed = formData.materialsText
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    try {
      if (editingProject) {
        const res = await fetch(`/api/projects/${editingProject.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            materialsUsed,
          }),
        });
        const data = await res.json();
        if (data.success && data.project) {
          setProducts((prev) =>
            prev.map((item) => (item.id === editingProject.id ? data.project : item))
          );
          setEditingProject(null);
        }
      } else {
        const res = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            materialsUsed,
            galleryImages: [formData.coverImage],
          }),
        });
        const data = await res.json();
        if (data.success && data.project) {
          setProducts((prev) => [data.project, ...prev]);
          setIsCreating(false);
        }
      }
    } catch (err) {
      console.error("Save project error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this showcase project?")) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error("Delete project error:", err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-card border border-sand-200 shadow-sm">
        <div>
          <h3 className="font-serif text-xl font-medium text-walnut">
            Portfolio Showcase ({projects.length})
          </h3>
          <p className="text-xs text-charcoal/60 mt-0.5">
            Manage completed residential villas, commercial studios and modular kitchens.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-walnut hover:bg-walnut-700 text-ivory text-xs font-semibold uppercase tracking-wider rounded-button shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4 text-sand-300" />
          <span>Add Project Showcase</span>
        </button>
      </div>

      {(isCreating || editingProject) && (
        <div className="bg-white p-8 rounded-card border-2 border-timber/50 shadow-luxury space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-sand-200 pb-4">
            <h3 className="font-serif text-2xl font-medium text-walnut">
              {editingProject ? `Edit: ${editingProject.title}` : "New Showcase Project"}
            </h3>
            <button
              onClick={() => {
                setIsCreating(false);
                setEditingProject(null);
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
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Modern Minimalist Residence"
                  className="w-full px-3 py-2 text-sm bg-ivory-50 border border-sand-300 rounded-form"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-walnut uppercase mb-1">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full px-3 py-2 text-sm bg-ivory-50 border border-sand-300 rounded-form text-charcoal"
                >
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Kitchens">Kitchens</option>
                  <option value="Wardrobes">Wardrobes</option>
                  <option value="Doors">Doors</option>
                  <option value="Windows">Windows</option>
                  <option value="Office Interiors">Office Interiors</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-walnut uppercase mb-1">
                  Location (City / Area)
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Race Course, Coimbatore"
                  className="w-full px-3 py-2 text-sm bg-ivory-50 border border-sand-300 rounded-form"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-walnut uppercase mb-1">
                Cover Image URL
              </label>
              <input
                type="url"
                required
                value={formData.coverImage}
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3 py-2 text-sm bg-ivory-50 border border-sand-300 rounded-form"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-walnut uppercase mb-1">
                Materials Used (comma-separated list)
              </label>
              <input
                type="text"
                value={formData.materialsText}
                onChange={(e) => setFormData({ ...formData, materialsText: e.target.value })}
                placeholder="Burma Teak, Century BWP 710, Fenesta uPVC"
                className="w-full px-3 py-2 text-sm bg-ivory-50 border border-sand-300 rounded-form"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-walnut uppercase mb-1">
                Overview *
              </label>
              <textarea
                rows={2}
                required
                value={formData.overview}
                onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                placeholder="Brief project summary..."
                className="w-full px-3 py-2 text-sm bg-ivory-50 border border-sand-300 rounded-form"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-walnut uppercase mb-1">
                Full Architectural Description *
              </label>
              <textarea
                rows={3}
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Detailed scope of supply and craftsmanship..."
                className="w-full px-3 py-2 text-sm bg-ivory-50 border border-sand-300 rounded-form"
              />
            </div>

            <div className="pt-4 border-t border-sand-100 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsCreating(false);
                  setEditingProject(null);
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
                {isSubmitting ? "Saving..." : "Save Project"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="bg-white rounded-card border border-sand-200 overflow-hidden shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/10] w-full bg-sand-100">
                <Image
                  src={proj.coverImage}
                  alt={proj.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 left-2 bg-walnut/90 text-ivory text-[10px] font-semibold uppercase px-2 py-0.5 rounded-sm">
                  {proj.category}
                </div>
              </div>
              <div className="p-4 space-y-2">
                <span className="text-[11px] text-timber font-medium block">
                  {proj.location || "Coimbatore"}
                </span>
                <h4 className="font-serif text-xl font-medium text-walnut line-clamp-1">
                  {proj.title}
                </h4>
                <p className="text-xs text-charcoal/70 line-clamp-2">
                  {proj.overview}
                </p>
              </div>
            </div>

            <div className="p-4 border-t border-sand-100 flex justify-between items-center text-xs">
              <button
                onClick={() => handleOpenEdit(proj)}
                className="font-semibold text-timber hover:text-walnut"
              >
                Edit Details
              </button>
              <button
                onClick={() => handleDelete(proj.id)}
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
