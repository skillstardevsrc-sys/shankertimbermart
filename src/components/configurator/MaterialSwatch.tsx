"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { ConfiguratorMaterial } from "@/lib/configurator/types";

interface MaterialSwatchProps {
  material: ConfiguratorMaterial;
  isSelected: boolean;
  onSelect: () => void;
}

export function MaterialSwatch({ material, isSelected, onSelect }: MaterialSwatchProps) {
  return (
    <div
      onClick={onSelect}
      className={`group relative rounded-xl p-3.5 bg-white cursor-pointer transition-all duration-200 border flex flex-col justify-between ${
        isSelected
          ? "border-2 border-timber bg-timber/5 shadow-card ring-1 ring-timber/30"
          : "border-sand-300/80 hover:border-timber/60 hover:shadow-sm"
      }`}
    >
      <div className="flex items-start gap-3.5">
        {/* Tactile Texture Thumbnail (1:1 Ratio) */}
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden shrink-0 border border-sand-300 shadow-inner bg-sand-100">
          <Image
            src={material.textureThumb || material.image}
            alt={material.name}
            fill
            sizes="64px"
            className="object-cover object-center group-hover:scale-110 transition-transform duration-300"
          />
          {material.colorTone && (
            <div
              className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full border border-white shadow-sm"
              style={{ backgroundColor: material.colorTone }}
              title={`Color tone: ${material.colorTone}`}
            />
          )}
        </div>

        {/* Material Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-1">
            <h4 className="font-serif text-base font-semibold text-walnut group-hover:text-timber transition-colors line-clamp-1">
              {material.name}
            </h4>
            {isSelected && (
              <div className="w-5 h-5 rounded-full bg-timber text-ivory flex items-center justify-center shrink-0 shadow-sm">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
            )}
          </div>
          <p className="text-xs text-charcoal/70 line-clamp-2 mt-1 leading-relaxed">
            {material.shortDescription}
          </p>
        </div>
      </div>

      {/* Sheen & Durability pills if available */}
      {(material.sheen || material.durability) && (
        <div className="mt-2.5 pt-2 border-t border-sand-200 flex items-center justify-between text-[10px] text-charcoal/60 font-medium">
          {material.sheen && (
            <span className="truncate max-w-[50%]">
              Sheen: <span className="text-walnut font-semibold">{material.sheen}</span>
            </span>
          )}
          {material.durability && (
            <span className="text-right truncate max-w-[50%] text-olive font-semibold">
              {material.durability}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
