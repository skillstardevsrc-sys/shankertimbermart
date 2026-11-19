"use client";

import { useState } from "react";
import Image from "next/image";
import { ZoomIn, Sparkles, Layers, Ruler, ShieldCheck, Check } from "lucide-react";
import { ConfiguratorDesign, ConfiguratorProductType, ConfiguratorMaterial } from "@/lib/configurator/types";

interface DesignPreviewProps {
  design: ConfiguratorDesign | null;
  productType: ConfiguratorProductType | null;
  material: ConfiguratorMaterial | null;
  categoryName?: string;
}

export function DesignPreview({
  design,
  productType,
  material,
  categoryName,
}: DesignPreviewProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  // Fallback to design image, material image, or product type image
  const displayImage =
    design?.image || material?.image || productType?.image || "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=900&auto=format&fit=crop&q=85";

  const displayTitle = design?.name || productType?.name || "Architectural Product Preview";
  const displayCode = design?.designCode || productType?.id.toUpperCase();

  return (
    <div className="relative rounded-2xl overflow-hidden bg-white border border-sand-300 shadow-luxury flex flex-col">
      {/* Visual Image Area (4:5 Aspect Ratio) */}
      <div
        className="relative aspect-[4/5] w-full overflow-hidden bg-sand-100 cursor-zoom-in group"
        onClick={() => setIsZoomed(!isZoomed)}
      >
        <Image
          src={displayImage}
          alt={displayTitle}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className={`object-cover object-center transition-transform duration-500 ease-out ${
            isZoomed ? "scale-150 cursor-zoom-out" : "group-hover:scale-105"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-walnut/70 via-transparent to-transparent opacity-60 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2">
            {categoryName && (
              <span className="bg-walnut/90 backdrop-blur-md text-ivory text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full border border-sand-300/30">
                {categoryName}
              </span>
            )}
            {displayCode && (
              <span className="bg-sand-200/90 backdrop-blur-md text-walnut text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border border-sand-400/40">
                {displayCode}
              </span>
            )}
          </div>

          <button
            type="button"
            className="pointer-events-auto p-2 rounded-full bg-white/80 backdrop-blur-md text-walnut hover:bg-white transition-colors shadow-sm"
            onClick={(e) => {
              e.stopPropagation();
              setIsZoomed(!isZoomed);
            }}
            title={isZoomed ? "Reset zoom" : "Click to inspect texture detail"}
          >
            <ZoomIn className="w-3.5 h-3.5 text-timber" />
          </button>
        </div>

        {/* Bottom Floating Specifications Bar */}
        <div className="absolute bottom-3.5 left-3.5 right-3.5 p-3.5 rounded-xl bg-walnut/85 backdrop-blur-md text-ivory border border-sand-300/20 shadow-lg pointer-events-none">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] tracking-widest uppercase font-semibold text-sand-300">
              Live Configuration Preview
            </span>
            {design?.styleCategory && (
              <span className="text-[10px] bg-sand-400/20 text-sand-200 px-2 py-0.5 rounded-full font-medium">
                {design.styleCategory}
              </span>
            )}
          </div>
          <h4 className="font-serif text-lg sm:text-xl font-semibold text-ivory line-clamp-1">
            {displayTitle}
          </h4>

          {/* Active selections pill list */}
          <div className="mt-2 pt-2 border-t border-sand-300/20 flex flex-wrap gap-2 text-[11px] text-ivory/80">
            {productType && (
              <span className="inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-timber" />
                <span className="font-medium">{productType.name}</span>
              </span>
            )}
            {material && (
              <span className="inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-sand-300" />
                <span className="text-sand-200">{material.name}</span>
              </span>
            )}
            {design?.frameFinish && (
              <span className="inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-olive" />
                <span>Finish: {design.frameFinish}</span>
              </span>
            )}
            {design?.glassOption && (
              <span className="inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-300" />
                <span>Glass: {design.glassOption}</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
