"use client";

import { ConfiguratorMaterial } from "@/lib/configurator/types";
import { MaterialSwatch } from "./MaterialSwatch";
import { ShieldCheck, Sparkles } from "lucide-react";

interface MaterialSelectorProps {
  materials: ConfiguratorMaterial[];
  selectedMaterialId: string | null;
  onSelectMaterial: (material: ConfiguratorMaterial) => void;
  title?: string;
  subtitle?: string;
  productName?: string;
}

export function MaterialSelector({
  materials,
  selectedMaterialId,
  onSelectMaterial,
  title = "Select Material & Surface",
  subtitle = "Choose from verified architectural materials compatible with your selection.",
  productName,
}: MaterialSelectorProps) {
  if (materials.length === 0) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-sand-300">
        <p className="text-sm text-charcoal/70">
          No dedicated material options configured for this selection. Standard architectural finish will be applied.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        {productName && (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-sand-200/60 text-[11px] font-semibold text-walnut uppercase tracking-wider mb-1">
            <Sparkles className="w-3 h-3 text-timber" />
            <span>Compatible with: {productName}</span>
          </div>
        )}
        <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-walnut tracking-tight">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-charcoal/70">{subtitle}</p>
      </div>

      {/* Grid of Materials */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {materials.map((mat) => (
          <MaterialSwatch
            key={mat.id}
            material={mat}
            isSelected={selectedMaterialId === mat.id}
            onSelect={() => onSelectMaterial(mat)}
          />
        ))}
      </div>
    </div>
  );
}
