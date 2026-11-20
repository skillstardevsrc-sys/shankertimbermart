"use client";

import Image from "next/image";
import { ArrowRight, CheckCircle2, Layers } from "lucide-react";
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
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
        <div className="inline-block">
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.24em] text-[#6E5053] uppercase">
            STEP 01 — ARCHITECTURAL PORTFOLIO
          </span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#3F2E2F] tracking-tight">
          Select Your Product Category
        </h2>
        <p className="text-xs sm:text-sm text-[#3F2E2F]/75 leading-relaxed font-normal">
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
              className={`group cursor-pointer rounded-[26px] overflow-hidden glass-card transition-all duration-300 flex flex-col hover:-translate-y-1 ${
                isSelected
                  ? "ring-2 ring-[#3F2E2F] shadow-[0_16px_40px_rgba(63,46,47,0.14)] bg-white border-transparent"
                  : "border border-white/80 hover:bg-white hover:shadow-[0_16px_36px_rgba(63,46,47,0.10)]"
              }`}
            >
              {/* Category Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EAD7CF]/30">
                <Image
                  src={cat.image}
                  alt={`${cat.name} - Shankar Timber Mart`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Badge if present */}
                {cat.badge && (
                  <span className="absolute top-3 left-3 glass-pill px-3 py-1 text-[#3F2E2F] text-[10px] font-semibold tracking-wider uppercase shadow-sm">
                    {cat.badge}
                  </span>
                )}

                {/* Selection indicator pill */}
                {isSelected && (
                  <div className="absolute top-3 right-3 bg-[#3F2E2F] text-[#FAF1E8] text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 shadow-md animate-in fade-in zoom-in-90 duration-200">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Selected</span>
                  </div>
                )}
              </div>

              {/* Card Content */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <h3 className="font-serif text-2xl font-medium text-[#3F2E2F] group-hover:text-[#6E5053] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#3F2E2F]/70 line-clamp-2 leading-relaxed font-normal">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-3 flex items-center justify-between border-t border-[#CDAFB0]/20">
                  <span className="text-xs text-[#6E5053] font-medium flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5" />
                    <span>{cat.steps.length} Customisation Steps</span>
                  </span>

                  <button
                    type="button"
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200 ${
                      isSelected
                        ? "bg-[#3F2E2F] text-[#FAF1E8] shadow-sm"
                        : "glass-pill text-[#3F2E2F] hover:bg-[#3F2E2F] hover:text-[#FAF1E8]"
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
