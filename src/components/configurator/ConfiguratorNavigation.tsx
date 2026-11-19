"use client";

import { ArrowLeft, ArrowRight, ShoppingBag, PlusCircle, Sparkles } from "lucide-react";

interface ConfiguratorNavigationProps {
  onBack: () => void;
  onContinue: () => void;
  canContinue: boolean;
  canGoBack: boolean;
  continueLabel?: string;
  backLabel?: string;
  isLastStep?: boolean;
  itemsInScheduleCount?: number;
  onOpenSchedule?: () => void;
  onAddToSchedule?: () => void;
  canAddToSchedule?: boolean;
}

export function ConfiguratorNavigation({
  onBack,
  onContinue,
  canContinue,
  canGoBack,
  continueLabel = "Continue to Next Step",
  backLabel = "Previous Step",
  isLastStep = false,
  itemsInScheduleCount = 0,
  onOpenSchedule,
  onAddToSchedule,
  canAddToSchedule = false,
}: ConfiguratorNavigationProps) {
  return (
    <div className="sticky bottom-0 z-40 w-full bg-ivory/95 backdrop-blur-md border-t border-sand-300/80 py-3.5 px-4 sm:px-6 shadow-luxury">
      <div className="max-w-site mx-auto flex items-center justify-between gap-3">
        {/* Left: Back Button */}
        <div>
          {canGoBack ? (
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-button bg-white border border-walnut/30 text-walnut hover:bg-sand-100 text-xs uppercase tracking-wider font-semibold transition-all shadow-sm active:scale-95"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{backLabel}</span>
            </button>
          ) : (
            <div className="w-20" /> // spacer
          )}
        </div>

        {/* Center: Multi-Item Enquiry Schedule Quick Access */}
        <div className="flex items-center gap-2">
          {onAddToSchedule && canAddToSchedule && !isLastStep && (
            <button
              type="button"
              onClick={onAddToSchedule}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-button bg-sand-200/90 hover:bg-sand-300 text-walnut border border-sand-400/40 text-xs font-semibold tracking-wider transition-all"
              title="Add this configured item to your multi-product quotation schedule"
            >
              <PlusCircle className="w-3.5 h-3.5 text-timber" />
              <span>Add to Schedule</span>
            </button>
          )}

          {onOpenSchedule && (
            <button
              type="button"
              onClick={onOpenSchedule}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-button bg-white hover:bg-sand-100 text-walnut border border-sand-300 text-xs font-medium transition-all shadow-sm"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-timber" />
              <span className="hidden sm:inline">Quotation Schedule:</span>
              <span className="px-1.5 py-0.5 rounded-full bg-timber text-ivory text-[10px] font-bold font-mono">
                {itemsInScheduleCount}
              </span>
            </button>
          )}
        </div>

        {/* Right: Continue / Submit CTA Button */}
        <div>
          <button
            type="button"
            onClick={onContinue}
            disabled={!canContinue}
            className={`inline-flex items-center gap-2 px-6 sm:px-8 py-3 rounded-button text-xs uppercase tracking-wider font-semibold transition-all shadow-md ${
              canContinue
                ? "bg-walnut hover:bg-walnut-700 text-ivory hover:shadow-lg active:scale-95 cursor-pointer"
                : "bg-walnut/30 text-ivory/60 cursor-not-allowed shadow-none"
            }`}
          >
            <span>{continueLabel}</span>
            <ArrowRight className="w-4 h-4 text-sand-300" />
          </button>
        </div>
      </div>
    </div>
  );
}
