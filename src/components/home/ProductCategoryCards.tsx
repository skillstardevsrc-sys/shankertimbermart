"use client";

import Link from "next/link";
import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const CATEGORIES = [
  {
    title: "Doors",
    slug: "doors",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80",
    href: "/products/doors",
  },
  {
    title: "WPC",
    slug: "wpc",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80",
    href: "/products/wpc",
  },
  {
    title: "Windows",
    slug: "windows",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80",
    href: "/products/windows",
  },
  {
    title: "Timber",
    slug: "timber",
    image: "https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?w=600&auto=format&fit=crop&q=80",
    href: "/products/timber",
  },
  {
    title: "Plywood & MDF",
    slug: "plywood-mdf",
    image: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=600&auto=format&fit=crop&q=80",
    href: "/products/plywood-mdf",
  },
  {
    title: "Modular Interiors",
    slug: "modular-interiors",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80",
    href: "/products/modular-interiors",
  },
];

export function ProductCategoryCards() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-transparent relative overflow-hidden">
      <div className="relative z-10 max-w-site mx-auto px-6 sm:px-8 lg:px-10">
        {/* Section Header with Carousel Navigation */}
        <ScrollReveal 
          variant="up"
          duration={0.7}
          className="flex items-end justify-between mb-8 sm:mb-12"
        >
          <div>
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.24em] text-[#6E5053] uppercase block mb-1.5">
              OUR PRODUCTS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#3F2E2F]">
              Everything Your Space Needs.
            </h2>
          </div>

          {/* Navigation Arrows */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous categories"
              className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-[#3F2E2F] hover:bg-white transition-all shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              aria-label="Next categories"
              className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-[#3F2E2F] hover:bg-white transition-all shadow-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </ScrollReveal>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {CATEGORIES.map((cat, idx) => (
            <ScrollReveal
              key={cat.title}
              variant="scale"
              delay={idx * 0.08}
              duration={0.65}
            >
              <Link
                href={cat.href}
                className="group relative aspect-[3/4] sm:aspect-[4/5] rounded-[22px] sm:rounded-[26px] overflow-hidden border border-white/80 shadow-[0_8px_24px_rgba(63,46,47,0.06)] bg-[#EAD7CF]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(63,46,47,0.12)] flex flex-col justify-end p-3 sm:p-4 block h-full w-full"
              >
                {/* Product Photograph */}
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Gradient Scrim for Contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Floating Glass Label Card at Bottom */}
                <div className="relative z-10 glass-pill px-3.5 py-2 flex items-center justify-between text-[#3F2E2F] group-hover:bg-white transition-all duration-300 shadow-sm">
                  <span className="text-xs sm:text-[13px] font-semibold truncate">
                    {cat.title}
                  </span>
                  <span className="w-5 h-5 rounded-full bg-[#3F2E2F]/10 group-hover:bg-[#3F2E2F] group-hover:text-[#FAF1E8] flex items-center justify-center transition-colors text-[10px] shrink-0 ml-1.5">
                    →
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
