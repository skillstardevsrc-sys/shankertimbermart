"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, Trash2, ShoppingBag, ArrowRight, PlusCircle, Check } from "lucide-react";
import { ConfiguredItem } from "@/lib/configurator/types";

interface EnquiryScheduleDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: ConfiguredItem[];
  onRemoveItem: (id: string) => void;
  onConfigureNew: () => void;
  onProceedToSubmit: () => void;
}

export function EnquiryScheduleDrawer({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onConfigureNew,
  onProceedToSubmit,
}: EnquiryScheduleDrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-walnut/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Slide-over panel */}
      <div className="relative w-full max-w-lg bg-ivory shadow-2xl z-10 flex flex-col h-full border-l border-sand-300">
        {/* Drawer Header */}
        <div className="p-5 sm:p-6 bg-white border-b border-sand-300 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-sand-200 text-walnut flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-timber" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-semibold text-walnut">
                Quotation Schedule
              </h3>
              <p className="text-xs text-charcoal/60">
                {items.length} {items.length === 1 ? "product" : "products"} configured
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-charcoal/60 hover:text-walnut hover:bg-sand-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {items.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-sand-200 text-charcoal/40 flex items-center justify-center mx-auto">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-lg font-medium text-walnut">
                Your schedule is empty
              </h4>
              <p className="text-xs text-charcoal/60 max-w-xs mx-auto">
                Configure your first product by selecting a category and specifying your dimensions and material preferences.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onConfigureNew();
                }}
                className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-button bg-walnut text-ivory text-xs font-semibold uppercase tracking-wider"
              >
                <span>Start Configuring</span>
              </button>
            </div>
          ) : (
            items.map((item, index) => {
              const dimStr = [
                item.dimensions.height ? `H:${item.dimensions.height}` : "",
                item.dimensions.width ? `W:${item.dimensions.width}` : "",
                item.dimensions.length ? `L:${item.dimensions.length}` : "",
                item.dimensions.thickness ? `T:${item.dimensions.thickness}` : "",
                item.dimensions.unit || "",
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <div
                  key={item.id}
                  className="rounded-xl bg-white border border-sand-300 p-4 shadow-sm flex items-start gap-4 transition-all hover:border-sand-400"
                >
                  {/* Thumbnail */}
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-sand-100 shrink-0 border border-sand-200">
                    <Image
                      src={item.designImage || item.materialImage || item.productImage}
                      alt={item.productTypeName}
                      fill
                      sizes="64px"
                      className="object-cover object-center"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-timber tracking-wider block">
                          {item.categoryName}
                        </span>
                        <h5 className="font-serif text-base font-semibold text-walnut leading-snug line-clamp-1">
                          {item.productTypeName}
                        </h5>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1 text-charcoal/40 hover:text-red-600 transition-colors"
                        title="Remove configuration"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-xs text-charcoal/70 space-y-0.5 mt-1.5">
                      {item.materialName && (
                        <div className="truncate">
                          Material: <span className="text-walnut font-medium">{item.materialName}</span>
                        </div>
                      )}
                      {item.designName && (
                        <div className="truncate">
                          Design: <span className="text-walnut font-medium">{item.designName}</span>
                        </div>
                      )}
                      <div className="text-[11px] font-mono text-charcoal/60 truncate">
                        {dimStr || "Standard Sizing"}
                      </div>
                    </div>

                    <div className="mt-2 pt-2 border-t border-sand-200 flex items-center justify-between text-xs">
                      <span className="text-walnut font-semibold">
                        Qty: {item.quantity} {item.salesUnit}
                      </span>
                      <span className="text-[10px] text-olive font-medium">Configured</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer Actions */}
        {items.length > 0 && (
          <div className="p-5 sm:p-6 bg-white border-t border-sand-300 space-y-3">
            <button
              type="button"
              onClick={() => {
                onClose();
                onConfigureNew();
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-button bg-sand-200 hover:bg-sand-300 text-walnut text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              <PlusCircle className="w-4 h-4 text-timber" />
              <span>Configure Another Product</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onProceedToSubmit();
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-button bg-walnut hover:bg-walnut-700 text-ivory text-xs font-semibold uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
            >
              <span>Submit Entire Enquiry ({items.length} Items)</span>
              <ArrowRight className="w-4 h-4 text-sand-300" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
