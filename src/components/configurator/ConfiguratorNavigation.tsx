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
    <div className="sticky bottom-0 z-40 w-full bg-[#FAF1E8]/95 backdrop-blur-xl border-t border-[#CDAFB0]/40 py-3.5 px-4 sm:px-6 shadow-[0_-8px_30px_rgba(63,46,47,0.08)]">
      <div className="max-w-site mx-auto flex items-center justify-between gap-3">
        {/* Left: Back Button */}
        <div>
          {canGoBack ? (
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full bg-white/70 hover:bg-white border border-[#CDAFB0]/50 text-[#3F2E2F] text-xs uppercase tracking-wider font-semibold transition-all shadow-sm active:scale-95"
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
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full glass-pill text-[#3F2E2F] hover:bg-white text-xs font-semibold tracking-wider transition-all"
              title="Add this configured item to your multi-product quotation schedule"
            >
              <PlusCircle className="w-3.5 h-3.5 text-[#6E5053]" />
              <span>Add to Schedule</span>
            </button>
          )}

          {onOpenSchedule && (
            <button
              type="button"
              onClick={onOpenSchedule}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full glass-card hover:bg-white text-[#3F2E2F] text-xs font-semibold tracking-wider transition-all"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#6E5053]" />
              <span className="hidden sm:inline">Quotation Schedule:</span>
              <span className="px-1.5 py-0.5 rounded-full bg-[#6E5053] text-[#FAF1E8] text-[10px] font-bold font-mono">
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
            className={`inline-flex items-center gap-2 px-6 sm:px-8 py-3 rounded-full text-xs uppercase tracking-wider font-semibold transition-all shadow-md ${
              canContinue
                ? "bg-[#3F2E2F] hover:bg-[#6E5053] text-[#FAF1E8] hover:shadow-lg active:scale-95 cursor-pointer"
                : "bg-[#CDAFB0]/50 text-[#3F2E2F]/40 cursor-not-allowed shadow-none"
            }`}
          >
            <span>{continueLabel}</span>
            <ArrowRight className="w-4 h-4 text-[#FAF1E8]" />
          </button>
        </div>
      </div>
    </div>
  );
}
