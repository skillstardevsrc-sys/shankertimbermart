"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ChevronDown, ChevronUp, MessageCircle, Phone, ArrowRight } from "lucide-react";
import { MEGA_MENU_CATEGORIES, SITE_SETTINGS } from "@/lib/constants";
import { formatWhatsAppMessage } from "@/lib/utils";

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNavigation({ isOpen, onClose }: MobileNavigationProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleCategory = (title: string) => {
    setExpandedCategory(expandedCategory === title ? null : title);
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-walnut/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-sm w-full bg-ivory shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-sand-300">
        {/* Drawer Header with Official Logo */}
        <div>
          <div className="p-5 border-b border-sand-200 flex items-center justify-between">
            <Link href="/" onClick={onClose} className="flex items-center gap-2.5">
              <div className="relative w-11 h-11 shrink-0">
                <Image
                  src="/logo.png"
                  alt="Shankar Timber Mart Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <div className="font-serif text-lg font-bold tracking-tight text-walnut leading-none">
                  SHANKAR
                </div>
                <div className="text-[9px] tracking-[0.22em] uppercase text-timber font-medium mt-0.5">
                  Timber Mart
                </div>
              </div>
            </Link>
            <button
              onClick={onClose}
              className="p-2 text-walnut hover:text-timber transition-colors rounded-button focus:outline-none focus:ring-2 focus:ring-timber"
              aria-label="Close navigation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-6 space-y-4">
            <Link
              href="/"
              onClick={onClose}
              className="block text-lg font-serif text-walnut hover:text-timber font-medium transition-colors"
            >
              Home
            </Link>

            {/* Expandable Products Section */}
            <div className="border-t border-b border-sand-200 py-3 space-y-2">
              <div className="flex items-center justify-between text-lg font-serif text-walnut font-medium">
                <Link href="/products" onClick={onClose} className="hover:text-timber">
                  Products Catalogue
                </Link>
                <button
                  onClick={() => toggleCategory("all")}
                  className="p-1 text-timber"
                  aria-label="Toggle all categories"
                >
                  {expandedCategory ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
              </div>

              {MEGA_MENU_CATEGORIES.map((cat) => (
                <div key={cat.title} className="pl-3 py-1">
                  <div
                    onClick={() => toggleCategory(cat.title)}
                    className="flex items-center justify-between py-1.5 text-sm font-medium text-walnut cursor-pointer hover:text-timber"
                  >
                    <span>{cat.title}</span>
                    {expandedCategory === cat.title ? (
                      <ChevronUp className="w-4 h-4 text-timber" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-charcoal/50" />
                    )}
                  </div>

                  {expandedCategory === cat.title && (
                    <ul className="pl-3 py-2 space-y-2 border-l border-sand-300">
                      {cat.items.map((sub) => (
                        <li key={sub.name}>
                          <Link
                            href={sub.href}
                            onClick={onClose}
                            className="block text-xs text-charcoal/80 hover:text-timber py-0.5"
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            <Link
              href="/services"
              onClick={onClose}
              className="block text-lg font-serif text-walnut hover:text-timber font-medium transition-colors"
            >
              Services
            </Link>
            <Link
              href="/projects"
              onClick={onClose}
              className="block text-lg font-serif text-walnut hover:text-timber font-medium transition-colors"
            >
              Projects Portfolio
            </Link>
            <Link
              href="/brands"
              onClick={onClose}
              className="block text-lg font-serif text-walnut hover:text-timber font-medium transition-colors"
            >
              Our Brands
            </Link>
            <Link
              href="/about"
              onClick={onClose}
              className="block text-lg font-serif text-walnut hover:text-timber font-medium transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              onClick={onClose}
              className="block text-lg font-serif text-walnut hover:text-timber font-medium transition-colors"
            >
              Contact Us
            </Link>
          </nav>
        </div>

        {/* Drawer Actions */}
        <div className="p-6 border-t border-sand-200 bg-ivory-100 space-y-3">
          <Link
            href="/quote"
            onClick={onClose}
            className="w-full py-3 px-4 bg-walnut hover:bg-walnut-700 text-ivory font-medium text-sm text-center rounded-button flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <span>Get a Quote</span>
            <ArrowRight className="w-4 h-4 text-sand-300" />
          </Link>

          <a
            href={`https://wa.me/${SITE_SETTINGS.whatsappNumber.replace(/[^0-9]/g, "")}?text=${formatWhatsAppMessage()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 border border-sand-300 bg-white hover:bg-sand-50 text-walnut font-medium text-sm text-center rounded-button flex items-center justify-center gap-2 transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>Chat on WhatsApp</span>
          </a>

          <a
            href={`tel:${SITE_SETTINGS.phone}`}
            className="w-full py-2 text-xs text-charcoal/70 text-center flex items-center justify-center gap-1.5 hover:text-timber"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Direct: {SITE_SETTINGS.phone}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
