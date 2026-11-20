"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MEGA_MENU_CATEGORIES } from "@/lib/constants";

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  if (!isOpen) return null;

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-0 w-full bg-[#FAF1E8]/95 backdrop-blur-2xl border-t border-b border-[#CDAFB0]/40 shadow-[0_20px_50px_rgba(63,46,47,0.12)] z-50 animate-fadeIn"
    >
      <div className="max-w-site mx-auto px-6 sm:px-8 lg:px-10 py-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {MEGA_MENU_CATEGORIES.map((cat) => (
            <div key={cat.title} className="space-y-4">
              <Link
                href={cat.href}
                onClick={onClose}
                className="group flex items-center justify-between text-[#3F2E2F] font-serif text-xl font-medium tracking-tight hover:text-[#6E5053] border-b border-[#CDAFB0]/30 pb-2 transition-colors"
              >
                <span>{cat.title}</span>
                <ArrowRight className="w-4 h-4 text-[#9F7E82] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Link>
              <ul className="space-y-2.5">
                {cat.items.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="group block text-sm text-[#3F2E2F] hover:text-[#6E5053] transition-colors"
                    >
                      <span className="font-medium text-[#3F2E2F] group-hover:text-[#6E5053] transition-colors block">
                        {item.name}
                      </span>
                      <span className="text-xs text-[#3F2E2F]/65 line-clamp-1 mt-0.5">
                        {item.desc}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mega Menu Footer Banner */}
        <div className="mt-8 pt-6 border-t border-[#CDAFB0]/30 flex flex-wrap items-center justify-between text-xs text-[#3F2E2F]/80 bg-white/50 backdrop-blur-md p-4 rounded-card border border-white/60">
          <div className="flex items-center space-x-6">
            <span className="font-semibold text-[#3F2E2F]">Premium Timber & Interior Solutions:</span>
            <span>Burma Teak, Hardwoods & Plywood</span>
            <span className="text-[#CDAFB0]">•</span>
            <span>Turnkey Modular Fit-Outs</span>
          </div>
          <Link
            href="/products"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 font-medium text-[#3F2E2F] hover:text-[#6E5053]"
          >
            <span>View Full Catalogue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
