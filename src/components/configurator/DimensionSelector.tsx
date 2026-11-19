"use client";

import { useState } from "react";
import { Ruler, Sparkles, Check, HelpCircle, Compass, Layers } from "lucide-react";
import { DimensionFieldConfig } from "@/lib/configurator/types";

interface DimensionSelectorProps {
  config: DimensionFieldConfig;
  categorySlug: string;
  productTypeName?: string;
  dimensions: {
    height?: number;
    width?: number;
    length?: number;
    thickness?: string;
    unit: string;
    standardSizeLabel?: string;
    isCustom?: boolean;
    notes?: string;
  };
  specialRequirements?: {
    woodRequirement?: string;
    kitchenLayout?: string;
    wardrobeDoors?: string;
    projectAreaSqFt?: number;
    roomCount?: number;
    siteMeasurementRequested?: boolean;
    additionalNotes?: string;
  };
  onChangeDimensions: (updated: any) => void;
  onChangeSpecialRequirements: (updated: any) => void;
}

export const KITCHEN_LAYOUTS = [
  { id: "l-shape", name: "L-Shaped Kitchen", desc: "Two adjoining walls forming a 90° angle" },
  { id: "u-shape", name: "U-Shaped Kitchen", desc: "Three surrounding walls with maximized storage" },
  { id: "straight", name: "Straight Line / Studio", desc: "Single continuous counter wall run" },
  { id: "parallel", name: "Parallel / Galley Kitchen", desc: "Two parallel counters facing each other" },
  { id: "island", name: "Island Luxury Kitchen", desc: "L/Straight counter plus freestanding island" },
];

export const WARDROBE_CONFIGS = [
  { id: "2-door", name: "2-Door Hinged / Sliding", desc: "Compact guest bedroom (4 - 5 ft width)" },
  { id: "3-door", name: "3-Door Sliding System", desc: "Standard master bedroom (6 - 7.5 ft width)" },
  { id: "4-door", name: "4-Door Master Wardrobe", desc: "Spacious master suite (8 - 10 ft width)" },
  { id: "walk-in", name: "Walk-in Closet Suite", desc: "Dedicated dressing room perimeter joinery" },
];

export function DimensionSelector({
  config,
  categorySlug,
  productTypeName,
  dimensions,
  specialRequirements = {},
  onChangeDimensions,
  onChangeSpecialRequirements,
}: DimensionSelectorProps) {
  const [activeUnit, setActiveUnit] = useState<string>(dimensions.unit || config.defaultUnit);
  const [selectedPreset, setSelectedPreset] = useState<string>(dimensions.standardSizeLabel || "");

  const handleUnitChange = (newUnit: string) => {
    setActiveUnit(newUnit);
    onChangeDimensions({ ...dimensions, unit: newUnit });
  };

  const handlePresetSelect = (preset: { label: string; width: number; height: number; unit: string }) => {
    setSelectedPreset(preset.label);
    onChangeDimensions({
      ...dimensions,
      width: preset.width,
      height: preset.height,
      unit: preset.unit,
      standardSizeLabel: preset.label,
      isCustom: false,
    });
    setActiveUnit(preset.unit);
  };

  const isInteriors = categorySlug === "modular-interiors";
  const isWindows = categorySlug === "windows";
  const isTimber = categorySlug === "timber";
  const isPlywood = categorySlug === "plywood-mdf";

  return (
    <div className="space-y-8">
      {/* Step Header */}
      <div>
        <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-walnut tracking-tight">
          Specify Dimensions & Measurement Schedule
        </h3>
        <p className="text-xs sm:text-sm text-charcoal/70 mt-1">
          Enter custom architectural measurements or choose standard showroom specifications.
        </p>
      </div>

      {/* Measurement Unit Selector */}
      {config.supportedUnits && config.supportedUnits.length > 1 && (
        <div className="flex items-center gap-3 p-3 rounded-xl bg-sand-100/80 border border-sand-300">
          <span className="text-xs font-semibold uppercase tracking-wider text-walnut">
            Measurement Unit:
          </span>
          <div className="flex items-center gap-1.5">
            {config.supportedUnits.map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => handleUnitChange(u)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                  activeUnit === u
                    ? "bg-walnut text-ivory shadow-sm font-semibold"
                    : "bg-white text-charcoal/70 hover:text-walnut border border-sand-300"
                }`}
              >
                {u.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Standard Presets if available (e.g. Doors, Windows, Plywood) */}
      {config.standardSizePresets && config.standardSizePresets.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-walnut">
              Quick Showroom Standards:
            </span>
            <span className="text-xs text-charcoal/60">or enter custom measurements below</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {config.standardSizePresets.map((preset) => {
              const isSelected = selectedPreset === preset.label;

              return (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => handlePresetSelect(preset)}
                  className={`text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${
                    isSelected
                      ? "border-timber bg-timber/10 text-walnut font-semibold ring-1 ring-timber/30"
                      : "border-sand-300 bg-white text-charcoal/80 hover:border-timber/60"
                  }`}
                >
                  <div>
                    <div className="font-medium text-walnut">{preset.label}</div>
                    <div className="text-[11px] text-charcoal/60 mt-0.5">
                      {preset.width} × {preset.height} {preset.unit}
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-timber text-ivory flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Numerical Dimension Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Width Field */}
        {config.width?.enabled && (
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-walnut flex items-center justify-between">
              <span>{config.width.label}</span>
              <span className="text-[11px] text-timber font-mono font-bold">({activeUnit})</span>
            </label>
            <input
              type="number"
              value={dimensions.width ?? config.width.defaultValue ?? ""}
              onChange={(e) => {
                setSelectedPreset("");
                onChangeDimensions({
                  ...dimensions,
                  width: parseFloat(e.target.value) || 0,
                  isCustom: true,
                  standardSizeLabel: "",
                });
              }}
              min={config.width.min || 1}
              max={config.width.max || 10000}
              className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 focus:border-timber focus:ring-1 focus:ring-timber bg-white text-sm text-walnut font-medium shadow-sm outline-none"
              placeholder="e.g. 900"
            />
            {config.width.presets && (
              <div className="flex flex-wrap gap-1 mt-1">
                {config.width.presets.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => {
                      setSelectedPreset("");
                      onChangeDimensions({ ...dimensions, width: p, isCustom: true });
                    }}
                    className="text-[10px] px-1.5 py-0.5 rounded bg-sand-200/60 text-walnut hover:bg-sand-300 font-mono"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Height Field */}
        {config.height?.enabled && (
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-walnut flex items-center justify-between">
              <span>{config.height.label}</span>
              <span className="text-[11px] text-timber font-mono font-bold">({activeUnit})</span>
            </label>
            <input
              type="number"
              value={dimensions.height ?? config.height.defaultValue ?? ""}
              onChange={(e) => {
                setSelectedPreset("");
                onChangeDimensions({
                  ...dimensions,
                  height: parseFloat(e.target.value) || 0,
                  isCustom: true,
                  standardSizeLabel: "",
                });
              }}
              min={config.height.min || 1}
              max={config.height.max || 10000}
              className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 focus:border-timber focus:ring-1 focus:ring-timber bg-white text-sm text-walnut font-medium shadow-sm outline-none"
              placeholder="e.g. 2100"
            />
            {config.height.presets && (
              <div className="flex flex-wrap gap-1 mt-1">
                {config.height.presets.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => {
                      setSelectedPreset("");
                      onChangeDimensions({ ...dimensions, height: p, isCustom: true });
                    }}
                    className="text-[10px] px-1.5 py-0.5 rounded bg-sand-200/60 text-walnut hover:bg-sand-300 font-mono"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Length Field (for Timber & Interiors) */}
        {config.length?.enabled && (
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-walnut flex items-center justify-between">
              <span>{config.length.label}</span>
              <span className="text-[11px] text-timber font-mono font-bold">({activeUnit})</span>
            </label>
            <input
              type="number"
              value={dimensions.length ?? config.length.defaultValue ?? ""}
              onChange={(e) =>
                onChangeDimensions({
                  ...dimensions,
                  length: parseFloat(e.target.value) || 0,
                })
              }
              min={config.length.min || 1}
              max={config.length.max || 100}
              className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 focus:border-timber focus:ring-1 focus:ring-timber bg-white text-sm text-walnut font-medium shadow-sm outline-none"
              placeholder="e.g. 10"
            />
          </div>
        )}

        {/* Thickness Dropdown */}
        {config.thickness?.enabled && config.thickness.options && (
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-walnut">
              {config.thickness.label}
            </label>
            <select
              value={dimensions.thickness || config.thickness.defaultValue || config.thickness.options[0]}
              onChange={(e) =>
                onChangeDimensions({
                  ...dimensions,
                  thickness: e.target.value,
                })
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 focus:border-timber focus:ring-1 focus:ring-timber bg-white text-sm text-walnut font-medium shadow-sm outline-none"
            >
              {config.thickness.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Category-Specific Form Enhancements */}
      {/* 1. Modular Kitchen Layout Picker */}
      {isInteriors && (
        <div className="space-y-3 pt-4 border-t border-sand-200">
          <label className="text-xs font-semibold uppercase tracking-wider text-walnut">
            Kitchen / Space Layout Typology:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {KITCHEN_LAYOUTS.map((layout) => {
              const isSelected = specialRequirements.kitchenLayout === layout.name;
              return (
                <div
                  key={layout.id}
                  onClick={() =>
                    onChangeSpecialRequirements({
                      ...specialRequirements,
                      kitchenLayout: layout.name,
                    })
                  }
                  className={`p-3 rounded-xl border cursor-pointer transition-all text-xs ${
                    isSelected
                      ? "border-timber bg-timber/10 text-walnut font-semibold ring-1 ring-timber/30"
                      : "border-sand-300 bg-white text-charcoal/80 hover:border-timber/60"
                  }`}
                >
                  <div className="font-semibold text-walnut">{layout.name}</div>
                  <div className="text-[11px] text-charcoal/65 mt-0.5">{layout.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Free Site Measurement Consultation Option (for Windows & Fenestration) */}
      {config.consultationOption && (
        <div className="p-4 rounded-xl bg-sand-200/50 border border-sand-300 flex items-start gap-3">
          <input
            type="checkbox"
            id="consultationCheck"
            checked={!!specialRequirements.siteMeasurementRequested}
            onChange={(e) =>
              onChangeSpecialRequirements({
                ...specialRequirements,
                siteMeasurementRequested: e.target.checked,
              })
            }
            className="mt-1 h-4 w-4 rounded text-timber focus:ring-timber border-sand-400 accent-timber cursor-pointer"
          />
          <label htmlFor="consultationCheck" className="text-xs text-walnut cursor-pointer select-none">
            <span className="font-semibold block">Request Free Site Measurement Consultation</span>
            <span className="text-charcoal/70">
              Not sure about exact window opening dimensions? Our Fenesta certified engineer will visit your site in Coimbatore to take laser-accurate masonry measurements.
            </span>
          </label>
        </div>
      )}

      {/* Optional Measurement Notes */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold uppercase tracking-wider text-walnut">
          Measurement & Site Notes (Optional):
        </label>
        <textarea
          rows={2}
          value={dimensions.notes || ""}
          onChange={(e) => onChangeDimensions({ ...dimensions, notes: e.target.value })}
          placeholder="e.g. Existing frame already in place; 35mm rebate required; lintel level at 7ft."
          className="w-full px-3.5 py-2 rounded-xl border border-sand-300 focus:border-timber focus:ring-1 focus:ring-timber bg-white text-xs text-walnut shadow-sm outline-none resize-none"
        />
      </div>
    </div>
  );
}
