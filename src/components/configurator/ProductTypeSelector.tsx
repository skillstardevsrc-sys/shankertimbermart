"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Info, ShieldCheck, Sparkles, Filter } from "lucide-react";
import { ConfiguratorProductType } from "@/lib/configurator/types";

interface ProductTypeSelectorProps {
  productTypes: ConfiguratorProductType[];
  selectedProductTypeId: string | null;
  onSelectProductType: (productType: ConfiguratorProductType) => void;
  title?: string;
  subtitle?: string;
  categorySlug?: string;
}

export function ProductTypeSelector({
  productTypes,
  selectedProductTypeId,
  onSelectProductType,
  title = "Select Product Type",
  subtitle = "Choose the specific architectural construction and typology.",
  categorySlug,
}: ProductTypeSelectorProps) {
  // Support wood species filtering for Timber (Hardwood vs Softwood)
  const isTimber = categorySlug === "timber";
  const [timberFilter, setTimberFilter] = useState<"all" | "hardwood" | "softwood">("all");

  const filteredTypes = productTypes.filter((pt) => {
    if (!isTimber || timberFilter === "all") return true;
    if (timberFilter === "hardwood") return pt.subtitle.toLowerCase().includes("hardwood");
    if (timberFilter === "softwood") return pt.subtitle.toLowerCase().includes("softwood");
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-walnut tracking-tight">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-charcoal/70 mt-1">{subtitle}</p>
        </div>

        {/* Timber Filter Tabs if on Timber */}
        {isTimber && (
          <div className="inline-flex p-1 rounded-xl bg-sand-200/70 border border-sand-300 self-start sm:self-auto text-xs font-medium">
            <button
              type="button"
              onClick={() => setTimberFilter("all")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                timberFilter === "all"
                  ? "bg-walnut text-ivory shadow-sm font-semibold"
                  : "text-walnut/70 hover:text-walnut"
              }`}
            >
              All Species ({productTypes.length})
            </button>
            <button
              type="button"
              onClick={() => setTimberFilter("hardwood")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                timberFilter === "hardwood"
                  ? "bg-walnut text-ivory shadow-sm font-semibold"
                  : "text-walnut/70 hover:text-walnut"
              }`}
            >
              Hardwood (5)
            </button>
            <button
              type="button"
              onClick={() => setTimberFilter("softwood")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                timberFilter === "softwood"
                  ? "bg-walnut text-ivory shadow-sm font-semibold"
                  : "text-walnut/70 hover:text-walnut"
              }`}
            >
              Softwood (5)
            </button>
          </div>
        )}
      </div>

      {/* Grid of Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTypes.map((pt) => {
          const isSelected = selectedProductTypeId === pt.id;

          return (
            <div
              key={pt.id}
              onClick={() => onSelectProductType(pt)}
              className={`group relative rounded-xl overflow-hidden bg-white cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? "border-2 border-timber bg-timber/5 shadow-card ring-1 ring-timber/30"
                  : "border border-sand-300/80 hover:border-timber/60 hover:shadow-sm"
              }`}
            >
              {/* Image Preview with 4:5 ratio */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-sand-100">
                <Image
                  src={pt.image}
                  alt={pt.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-walnut/60 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />

                {/* Selected Checkmark Badge */}
                {isSelected ? (
                  <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-timber text-ivory flex items-center justify-center shadow-md animate-in zoom-in-75 duration-150">
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  </div>
                ) : (
                  <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-ivory/80 backdrop-blur-sm border border-sand-300 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="w-2 h-2 rounded-full bg-timber/50" />
                  </div>
                )}
              </div>

              {/* Text Information */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-semibold tracking-wider uppercase text-timber">
                    {pt.subtitle.split("•")[0]}
                  </span>
                  <h4 className="font-serif text-lg sm:text-xl font-semibold text-walnut group-hover:text-timber transition-colors">
                    {pt.name}
                  </h4>
                  <p className="text-xs text-charcoal/70 line-clamp-2 leading-relaxed">
                    {pt.description}
                  </p>
                </div>

                {/* Feature tags */}
                {pt.features && pt.features.length > 0 && (
                  <div className="pt-2 flex flex-wrap gap-1 border-t border-sand-200">
                    {pt.features.slice(0, 2).map((feat, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 text-[10px] bg-sand-100 text-walnut/80 px-2 py-0.5 rounded-md font-medium"
                      >
                        <ShieldCheck className="w-2.5 h-2.5 text-olive" />
                        <span>{feat}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
