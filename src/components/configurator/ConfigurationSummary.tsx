"use client";

import Image from "next/image";
import { Edit2, Sparkles, CheckCircle, FileText, Ruler, Package, Layers, PlusCircle } from "lucide-react";
import { ConfiguredItem } from "@/lib/configurator/types";

interface ConfigurationSummaryProps {
  item: ConfiguredItem;
  onEditStep: (stepKey: string) => void;
  onAddAnotherProduct?: () => void;
  onSubmitQuote: () => void;
}

export function ConfigurationSummary({
  item,
  onEditStep,
  onAddAnotherProduct,
  onSubmitQuote,
}: ConfigurationSummaryProps) {
  const dimStr = [
    item.dimensions.height ? `Height: ${item.dimensions.height}${item.dimensions.unit}` : "",
    item.dimensions.width ? `Width: ${item.dimensions.width}${item.dimensions.unit}` : "",
    item.dimensions.length ? `Length: ${item.dimensions.length}${item.dimensions.unit}` : "",
    item.dimensions.thickness ? `Thickness: ${item.dimensions.thickness}` : "",
  ]
    .filter(Boolean)
    .join(" | ");

  return (
    <div className="space-y-8">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-olive/15 text-olive text-xs font-semibold uppercase tracking-wider mb-2">
          <CheckCircle className="w-3.5 h-3.5" />
          <span>Step 06 — Specifications Complete</span>
        </div>
        <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-walnut tracking-tight">
          Review Product Configuration
        </h3>
        <p className="text-xs sm:text-sm text-charcoal/70 mt-1">
          Verify your tailored architectural specifications. You can edit any parameter or proceed to submit your formal quotation request.
        </p>
      </div>

      {/* Main Review Card */}
      <div className="rounded-2xl bg-white border border-sand-300 shadow-luxury overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Left: Product Image */}
          <div className="md:col-span-5 relative aspect-[4/5] md:aspect-auto w-full bg-sand-100 min-h-[320px]">
            <Image
              src={item.designImage || item.materialImage || item.productImage}
              alt={item.productTypeName}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-walnut/70 via-transparent to-transparent opacity-60" />

            <div className="absolute bottom-4 left-4 right-4 text-ivory">
              <span className="text-[10px] uppercase font-semibold tracking-widest text-sand-300">
                {item.categoryName}
              </span>
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-ivory">
                {item.productTypeName}
              </h4>
              {item.designCode && (
                <span className="inline-block mt-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sand-200/90 text-walnut">
                  {item.designCode}
                </span>
              )}
            </div>
          </div>

          {/* Right: Detailed Specification Table */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-sand-200">
                <span className="text-xs font-semibold uppercase tracking-wider text-walnut">
                  Customisation Parameters
                </span>
                <span className="text-[11px] text-timber font-medium">Click Edit to modify</span>
              </div>

              {/* Rows */}
              <div className="space-y-3.5 text-xs">
                {/* Product Type */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 text-charcoal/70">
                    <Layers className="w-3.5 h-3.5 text-timber" />
                    <span>Product Typology:</span>
                  </div>
                  <div className="flex items-center gap-2 text-right">
                    <span className="font-semibold text-walnut">{item.productTypeName}</span>
                    <button
                      type="button"
                      onClick={() => onEditStep("product")}
                      className="p-1 text-timber hover:text-walnut"
                      title="Edit Product"
                    >
                      <Edit2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Material */}
                {item.materialName && (
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 text-charcoal/70">
                      <Sparkles className="w-3.5 h-3.5 text-timber" />
                      <span>Material / Surface:</span>
                    </div>
                    <div className="flex items-center gap-2 text-right">
                      <span className="font-semibold text-walnut">{item.materialName}</span>
                      <button
                        type="button"
                        onClick={() => onEditStep("material")}
                        className="p-1 text-timber hover:text-walnut"
                        title="Edit Material"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Design */}
                {item.designName && (
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 text-charcoal/70">
                      <FileText className="w-3.5 h-3.5 text-timber" />
                      <span>Design Pattern:</span>
                    </div>
                    <div className="flex items-center gap-2 text-right">
                      <span className="font-semibold text-walnut">
                        {item.designName} {item.designCode ? `(${item.designCode})` : ""}
                      </span>
                      <button
                        type="button"
                        onClick={() => onEditStep("design")}
                        className="p-1 text-timber hover:text-walnut"
                        title="Edit Design"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Dimensions */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 text-charcoal/70">
                    <Ruler className="w-3.5 h-3.5 text-timber" />
                    <span>Dimensions:</span>
                  </div>
                  <div className="flex items-center gap-2 text-right">
                    <span className="font-semibold text-walnut font-mono">
                      {item.dimensions.standardSizeLabel
                        ? `${item.dimensions.standardSizeLabel} (${dimStr})`
                        : dimStr || "Custom Dimensions"}
                    </span>
                    <button
                      type="button"
                      onClick={() => onEditStep("dimensions")}
                      className="p-1 text-timber hover:text-walnut"
                      title="Edit Dimensions"
                    >
                      <Edit2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 text-charcoal/70">
                    <Package className="w-3.5 h-3.5 text-timber" />
                    <span>Quantity Required:</span>
                  </div>
                  <div className="flex items-center gap-2 text-right">
                    <span className="font-semibold text-walnut">
                      {item.quantity} {item.salesUnit}
                    </span>
                    <button
                      type="button"
                      onClick={() => onEditStep("quantity")}
                      className="p-1 text-timber hover:text-walnut"
                      title="Edit Quantity"
                    >
                      <Edit2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Special Requirements */}
                {item.specialRequirements?.kitchenLayout && (
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-charcoal/70">Kitchen Layout:</span>
                    <span className="font-semibold text-walnut">
                      {item.specialRequirements.kitchenLayout}
                    </span>
                  </div>
                )}
                {item.specialRequirements?.siteMeasurementRequested && (
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-charcoal/70">Site Measurement:</span>
                    <span className="font-semibold text-olive">
                      Requested Free Site Survey in Coimbatore
                    </span>
                  </div>
                )}
                {item.specialRequirements?.additionalNotes && (
                  <div className="pt-2 border-t border-sand-200">
                    <span className="text-charcoal/60 block text-[11px] mb-1">
                      Project Notes:
                    </span>
                    <p className="italic text-charcoal/80 bg-sand-100 p-2.5 rounded-lg text-xs leading-relaxed">
                      &quot;{item.specialRequirements.additionalNotes}&quot;
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Action Options */}
            <div className="pt-4 border-t border-sand-200 flex flex-col sm:flex-row items-center gap-3">
              {onAddAnotherProduct && (
                <button
                  type="button"
                  onClick={onAddAnotherProduct}
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-button bg-sand-200/90 hover:bg-sand-300 text-walnut text-xs font-semibold uppercase tracking-wider transition-all"
                >
                  <PlusCircle className="w-4 h-4 text-timber" />
                  <span>Configure Another Product</span>
                </button>
              )}

              <button
                type="button"
                onClick={onSubmitQuote}
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-button bg-walnut hover:bg-walnut-700 text-ivory text-xs font-semibold uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
              >
                <span>Request a Quote</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
