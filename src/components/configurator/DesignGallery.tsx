"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Sparkles, Filter, Eye } from "lucide-react";
import { ConfiguratorDesign } from "@/lib/configurator/types";

interface DesignGalleryProps {
  designs: ConfiguratorDesign[];
  selectedDesignId: string | null;
  onSelectDesign: (design: ConfiguratorDesign) => void;
  title?: string;
  subtitle?: string;
}

export function DesignGallery({
  designs,
  selectedDesignId,
  onSelectDesign,
  title = "Select Design & Architectural Finish",
  subtitle = "Choose from verified architectural patterns and configurations.",
}: DesignGalleryProps) {
  // Style category filter
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const styleCategories = [
    "all",
    ...Array.from(new Set(designs.map((d) => d.styleCategory).filter(Boolean))),
  ];

  const filteredDesigns = designs.filter((d) => {
    if (activeFilter === "all") return true;
    return d.styleCategory === activeFilter;
  });

  if (designs.length === 0) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-sand-300">
        <p className="text-sm text-charcoal/70">
          Standard architectural flush design applies to this configuration. You may proceed to dimensions.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-walnut tracking-tight">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-charcoal/70 mt-1">{subtitle}</p>
        </div>

        {/* Style Inspiration Filters if more than 2 styles */}
        {styleCategories.length > 2 && (
          <div className="flex flex-wrap gap-1.5 self-start sm:self-auto">
            {styleCategories.map((style) => (
              <button
                key={style}
                type="button"
                onClick={() => setActiveFilter(style as string)}
                className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                  activeFilter === style
                    ? "bg-walnut text-ivory border-walnut font-medium shadow-sm"
                    : "bg-white text-charcoal/70 border-sand-300 hover:border-walnut"
                }`}
              >
                {style === "all" ? `All Designs (${designs.length})` : style}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Grid of Design Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredDesigns.map((des) => {
          const isSelected = selectedDesignId === des.id;

          return (
            <div
              key={des.id}
              onClick={() => onSelectDesign(des)}
              className={`group relative rounded-xl overflow-hidden bg-white cursor-pointer transition-all duration-200 border flex flex-col justify-between ${
                isSelected
                  ? "border-2 border-timber bg-timber/5 shadow-card ring-1 ring-timber/30"
                  : "border-sand-300/80 hover:border-timber/60 hover:shadow-sm"
              }`}
            >
              {/* Design Image Preview */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-sand-100">
                <Image
                  src={des.image}
                  alt={des.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-walnut/60 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />

                {/* Top Design ID Tag */}
                <div className="absolute top-2.5 left-2.5 bg-walnut/85 backdrop-blur-md text-ivory text-[10px] font-mono font-semibold px-2 py-0.5 rounded border border-sand-300/30">
                  {des.designCode}
                </div>

                {/* Selection Indicator */}
                {isSelected ? (
                  <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-timber text-ivory flex items-center justify-center shadow-md animate-in zoom-in-75">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                ) : (
                  <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-white/80 backdrop-blur-sm border border-sand-300 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="w-2 h-2 rounded-full bg-timber/60" />
                  </div>
                )}
              </div>

              {/* Design Card Text Info */}
              <div className="p-4 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-semibold text-timber tracking-wider">
                    {des.styleCategory || "Architectural Design"}
                  </span>
                </div>
                <h4 className="font-serif text-base sm:text-lg font-semibold text-walnut group-hover:text-timber transition-colors line-clamp-1">
                  {des.name}
                </h4>
                <p className="text-xs text-charcoal/70 line-clamp-2 leading-relaxed">
                  {des.description}
                </p>

                {/* Optional frame finish / glass indicator for windows */}
                {(des.frameFinish || des.glassOption) && (
                  <div className="pt-2 mt-2 border-t border-sand-200 text-[10px] text-charcoal/60 space-y-0.5">
                    {des.frameFinish && (
                      <div className="truncate">
                        Frame: <span className="text-walnut font-medium">{des.frameFinish}</span>
                      </div>
                    )}
                    {des.glassOption && (
                      <div className="truncate">
                        Glazing: <span className="text-walnut font-medium">{des.glassOption}</span>
                      </div>
                    )}
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
