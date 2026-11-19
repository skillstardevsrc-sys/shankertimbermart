"use client";

import { Minus, Plus, HelpCircle, FileText } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  salesUnit: string;
  availableUnits?: string[];
  additionalNotes?: string;
  minQuantity?: number;
  onChangeQuantity: (quantity: number) => void;
  onChangeSalesUnit?: (unit: string) => void;
  onChangeAdditionalNotes: (notes: string) => void;
  productTypeName?: string;
}

export function QuantitySelector({
  quantity,
  salesUnit,
  availableUnits = ["pieces", "sheets", "running feet", "cubic feet", "sets", "units"],
  additionalNotes = "",
  minQuantity = 1,
  onChangeQuantity,
  onChangeSalesUnit,
  onChangeAdditionalNotes,
  productTypeName,
}: QuantitySelectorProps) {
  const handleDecrement = () => {
    if (quantity > minQuantity) {
      onChangeQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    onChangeQuantity(quantity + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= minQuantity) {
      onChangeQuantity(val);
    } else if (e.target.value === "") {
      onChangeQuantity(minQuantity);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-walnut tracking-tight">
          Specify Quantity & Project Requirements
        </h3>
        <p className="text-xs sm:text-sm text-charcoal/70 mt-1">
          Indicate how many units or volume of {productTypeName || "this product"} are required for your project.
        </p>
      </div>

      {/* Quantity Stepper & Sales Unit */}
      <div className="p-6 rounded-2xl bg-white border border-sand-300 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-walnut">
              Required Quantity:
            </span>
            <div className="text-xs text-charcoal/60 mt-0.5">
              Minimum order requirement: {minQuantity} {salesUnit}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Stepper controls */}
            <div className="flex items-center rounded-xl border border-sand-300 bg-sand-100/60 p-1">
              <button
                type="button"
                onClick={handleDecrement}
                disabled={quantity <= minQuantity}
                className="w-10 h-10 rounded-lg bg-white border border-sand-300 flex items-center justify-center text-walnut hover:bg-sand-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>

              <input
                type="number"
                min={minQuantity}
                value={quantity}
                onChange={handleInputChange}
                className="w-16 sm:w-20 text-center bg-transparent text-base font-semibold text-walnut font-mono outline-none"
              />

              <button
                type="button"
                onClick={handleIncrement}
                className="w-10 h-10 rounded-lg bg-white border border-sand-300 flex items-center justify-center text-walnut hover:bg-sand-200 transition-colors shadow-sm"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Sales Unit Dropdown / Badge */}
            {onChangeSalesUnit && availableUnits.length > 1 ? (
              <select
                value={salesUnit}
                onChange={(e) => onChangeSalesUnit(e.target.value)}
                className="px-3 py-2.5 rounded-xl border border-sand-300 bg-white text-xs font-semibold uppercase tracking-wider text-walnut shadow-sm outline-none cursor-pointer"
              >
                {availableUnits.map((u) => (
                  <option key={u} value={u}>
                    {u.toUpperCase()}
                  </option>
                ))}
              </select>
            ) : (
              <span className="px-3 py-2.5 rounded-xl bg-sand-200/80 text-xs font-semibold uppercase tracking-wider text-walnut border border-sand-300">
                {salesUnit}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Additional Requirement / Project Notes Field */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-walnut flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-timber" />
          <span>Additional Requirements or Custom Architectural Specifications:</span>
        </label>
        <textarea
          rows={3}
          value={additionalNotes}
          onChange={(e) => onChangeAdditionalNotes(e.target.value)}
          placeholder="e.g. Requires factory hinge mortising; 3 coats clear PU finish; delivery required to RS Puram site in 3 weeks; need quotation for matching architrave beadings."
          className="w-full px-4 py-3 rounded-xl border border-sand-300 focus:border-timber focus:ring-1 focus:ring-timber bg-white text-xs text-walnut shadow-sm outline-none resize-none leading-relaxed"
        />
        <p className="text-[11px] text-charcoal/60">
          Our estimators will factor these exact joinery and site details directly into your customized quotation.
        </p>
      </div>
    </div>
  );
}
