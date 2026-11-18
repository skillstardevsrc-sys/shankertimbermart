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
      className="absolute top-full left-0 w-full bg-ivory-50 border-t border-b border-sand-300 shadow-luxury z-50 animate-fadeIn"
    >
      <div className="max-w-site mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {MEGA_MENU_CATEGORIES.map((cat) => (
            <div key={cat.title} className="space-y-4">
              <Link
                href={cat.href}
                onClick={onClose}
                className="group flex items-center justify-between text-walnut font-serif text-xl font-medium tracking-tight hover:text-timber border-b border-sand-200 pb-2 transition-colors"
              >
                <span>{cat.title}</span>
                <ArrowRight className="w-4 h-4 text-timber opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Link>
              <ul className="space-y-2.5">
                {cat.items.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="group block text-sm text-charcoal hover:text-timber transition-colors"
                    >
                      <span className="font-medium text-walnut group-hover:text-timber transition-colors block">
                        {item.name}
                      </span>
                      <span className="text-xs text-charcoal/70 line-clamp-1 mt-0.5">
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
        <div className="mt-8 pt-6 border-t border-sand-200 flex flex-wrap items-center justify-between text-xs text-charcoal/80 bg-ivory-100 p-4 rounded-card">
          <div className="flex items-center space-x-6">
            <span className="font-medium text-walnut">Specialized Services:</span>
            <span>Precision Timber Planing</span>
            <span className="text-sand-400">•</span>
            <span>Custom Sizing & Frame Rebating</span>
            <span className="text-sand-400">•</span>
            <span>Turnkey Modular Fit-Outs</span>
          </div>
          <Link
            href="/quote"
            onClick={onClose}
            className="text-timber hover:text-walnut font-semibold inline-flex items-center gap-1.5 transition-colors"
          >
            <span>Request Material Specification & Sample</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
