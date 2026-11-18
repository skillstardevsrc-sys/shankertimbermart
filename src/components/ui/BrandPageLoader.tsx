"use client";

import React from "react";
import { BrandLogoAnimation } from "./BrandLogoAnimation";

interface BrandPageLoaderProps {
  message?: string;
  subMessage?: string;
  fullScreen?: boolean;
}

export function BrandPageLoader({
  message = "Loading Architectural Material...",
  subMessage = "Crafting Spaces. Defining Living.",
  fullScreen = true,
}: BrandPageLoaderProps) {
  return (
    <div
      className={`${
        fullScreen
          ? "fixed inset-0 z-50 bg-ivory/95 backdrop-blur-md"
          : "w-full py-20 bg-ivory"
      } flex flex-col items-center justify-center p-6 select-none transition-all duration-500`}
    >
      <div className="flex flex-col items-center justify-center space-y-6 max-w-sm text-center">
        {/* Animated Brand Logo with Rotating Wood Rings, Rising Trees, and Plaque */}
        <BrandLogoAnimation size={260} showSubtitle={true} />

        {/* Loading Narrative & Progress Beam */}
        <div className="space-y-3 pt-2 w-full flex flex-col items-center">
          <span className="font-serif text-2xl font-medium text-walnut tracking-tight animate-pulse">
            {message}
          </span>
          <span className="text-xs tracking-[0.22em] uppercase text-timber font-semibold">
            {subMessage}
          </span>

          {/* Timber Gold Progress Line */}
          <div className="w-48 h-1 bg-sand-200 rounded-full overflow-hidden mt-2 relative">
            <div className="absolute inset-y-0 w-full bg-gradient-to-r from-timber-600 via-timber to-sand-400 rounded-full animate-pulse-amber" />
          </div>
        </div>
      </div>
    </div>
  );
}
