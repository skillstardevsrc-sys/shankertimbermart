"use client";

import { Check } from "lucide-react";
import { StepDefinition } from "@/lib/configurator/types";

interface ConfiguratorProgressProps {
  steps: StepDefinition[];
  currentStepIndex: number;
  onStepClick: (stepIndex: number) => void;
  canNavigateToStep: (stepIndex: number) => boolean;
}

export function ConfiguratorProgress({
  steps,
  currentStepIndex,
  onStepClick,
  canNavigateToStep,
}: ConfiguratorProgressProps) {
  return (
    <div className="w-full bg-[#FAF1E8]/90 backdrop-blur-xl border-b border-[#CDAFB0]/30 py-3.5 px-4 sm:px-6 shadow-[0_4px_20px_rgba(63,46,47,0.04)] sticky top-[65px] z-30">
      <div className="max-w-site mx-auto">
        {/* Progress List */}
        <div className="flex items-center justify-between overflow-x-auto no-scrollbar gap-2 sm:gap-4">
          {steps.map((step, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            const isClickable = canNavigateToStep(idx);

            return (
              <div
                key={step.key}
                onClick={() => {
                  if (isClickable) onStepClick(idx);
                }}
                className={`group flex items-center gap-2.5 shrink-0 transition-all ${
                  isClickable ? "cursor-pointer" : "cursor-not-allowed opacity-60"
                }`}
              >
                {/* Numbered Pill / Check circle */}
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                    isCurrent
                      ? "bg-[#3F2E2F] text-[#FAF1E8] ring-4 ring-[#CDAFB0]/40 shadow-sm"
                      : isCompleted
                      ? "bg-[#6E5053] text-[#FAF1E8] shadow-sm group-hover:scale-105"
                      : "bg-white/60 text-[#3F2E2F]/50 border border-[#CDAFB0]/40"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  ) : (
                    <span>{step.number}</span>
                  )}
                </div>

                {/* Step Text Label */}
                <div className="hidden md:flex flex-col text-left">
                  <span
                    className={`text-[10px] uppercase font-bold tracking-wider ${
                      isCurrent
                        ? "text-[#3F2E2F]"
                        : isCompleted
                        ? "text-[#6E5053]"
                        : "text-[#3F2E2F]/40"
                    }`}
                  >
                    Step {step.number}
                  </span>
                  <span
                    className={`text-xs font-semibold leading-tight line-clamp-1 ${
                      isCurrent
                        ? "text-[#3F2E2F]"
                        : isCompleted
                        ? "text-[#3F2E2F] group-hover:text-[#6E5053] transition-colors"
                        : "text-[#3F2E2F]/50"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>

                {/* Arrow connector divider between steps */}
                {idx < steps.length - 1 && (
                  <div
                    className={`hidden sm:block w-4 lg:w-8 h-[2px] rounded-full mx-1 ${
                      idx < currentStepIndex ? "bg-[#6E5053]" : "bg-[#CDAFB0]/40"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
