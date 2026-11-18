"use client";

import { useState, useMemo } from "react";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Project } from "@/lib/types";

interface ProjectGalleryViewProps {
  initialProjects: Project[];
}

const CATEGORIES = [
  "All",
  "Residential",
  "Commercial",
  "Kitchens",
  "Wardrobes",
  "Doors",
  "Office Interiors",
];

export function ProjectGalleryView({ initialProjects }: ProjectGalleryViewProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    if (activeCategory === "All") return initialProjects;
    return initialProjects.filter((p) => p.category === activeCategory);
  }, [initialProjects, activeCategory]);

  return (
    <div className="space-y-8">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-button transition-all ${
                isActive
                  ? "bg-walnut text-ivory shadow-sm"
                  : "bg-white text-charcoal/80 hover:bg-sand-100 hover:text-walnut border border-sand-200"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((proj) => (
          <ProjectCard key={proj.id} project={proj} />
        ))}
      </div>
    </div>
  );
}
