"use client";

import Image from "next/image";
import { ArrowRight, CheckCircle2, Sparkles, Layers } from "lucide-react";
import { ConfiguratorCategory, ConfiguratorCategoryId } from "@/lib/configurator/types";

interface ProductCategorySelectorProps {
  categories: ConfiguratorCategory[];
  selectedCategoryId: ConfiguratorCategoryId | null;
  onSelectCategory: (categoryId: ConfiguratorCategoryId) => void;
}

export function ProductCategorySelector({
  categories,
  selectedCategoryId,
  onSelectCategory,
}: ProductCategorySelectorProps) {
  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand-200/80 border border-sand-400/30 text-walnut text-xs font-semibold tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5 text-timber" />
          <span>Step 01 — Architectural Portfolio</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-walnut tracking-tight">
          Select Your Product Category
        </h2>
        <p className="text-sm sm:text-base text-charcoal/75 leading-relaxed font-normal">
          First choose the architectural product category you wish to configure. Every category features dedicated materials, tailored dimensions, and custom specifications.
        </p>
      </div>

      {/* Grid of 6 Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {categories.map((cat) => {
          const isSelected = selectedCategoryId === cat.id;

          return (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`group cursor-pointer rounded-2xl overflow-hidden bg-white transition-all duration-300 flex flex-col ${
                isSelected
                  ? "ring-2 ring-timber shadow-luxury border-transparent scale-[1.01]"
                  : "border border-sand-300/70 hover:border-timber/70 hover:shadow-card shadow-sm"
              }`}
            >
              {/* Category Image with 4:5 aspect ratio & subtle hover zoom */}
              <div className="relative aspect-[4/3] sm:aspect-[4/3.5] w-full overflow-hidden bg-sand-100">
                <Image
                  src={cat.image}
                  alt={`${cat.name} - Shankar Timber Mart`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-walnut/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Badge if present */}
                {cat.badge && (
                  <span className="absolute top-3 left-3 bg-walnut/85 backdrop-blur-md text-ivory text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full border border-sand-300/30">
                    {cat.badge}
                  </span>
                )}

                {/* Selection indicator pill */}
                {isSelected && (
                  <div className="absolute top-3 right-3 bg-timber text-ivory text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md animate-in fade-in zoom-in-90 duration-200">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Selected</span>
                  </div>
                )}
              </div>

              {/* Card Content */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-2xl font-semibold text-walnut group-hover:text-timber transition-colors">
                      {cat.name}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-charcoal/70 line-clamp-3 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-sand-200">
                  <span className="text-xs text-olive font-medium flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5" />
                    <span>{cat.steps.length} Customisation Steps</span>
                  </span>

                  <button
                    type="button"
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-3.5 py-2 rounded-button transition-all duration-200 ${
                      isSelected
                        ? "bg-timber text-ivory shadow-sm"
                        : "bg-ivory text-walnut border border-sand-300 hover:bg-timber hover:text-ivory hover:border-timber"
                    }`}
                  >
                    <span>{isSelected ? "Configuring" : "Explore"}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
