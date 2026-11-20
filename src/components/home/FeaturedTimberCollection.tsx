"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const MATERIAL_TABS = ["All", "Timber", "Plywood & MDF", "Doors"];

const MATERIALS = [
  {
    name: "Teak Wood",
    category: "Timber",
    subtitle: "Burma & African Teak",
    image: "/images/timber/teak-wood.jpg",
    href: "/products/timber",
  },
  {
    name: "Mahogany",
    category: "Timber",
    subtitle: "Deep Auburn Luster",
    image: "/images/timber/mahogany-wood.jpg",
    href: "/products/timber",
  },
  {
    name: "Oak Wood",
    category: "Timber",
    subtitle: "European White Oak",
    image: "/images/timber/oak-wood.jpg",
    href: "/products/timber",
  },
  {
    name: "Pine Wood",
    category: "Timber",
    subtitle: "Pale Golden Softwood",
    image: "/images/timber/pine-wood.jpg",
    href: "/products/timber",
  },
];

export function FeaturedTimberCollection() {
  const [activeTab, setActiveTab] = useState("All");
  const [hoveredMaterial, setHoveredMaterial] = useState<typeof MATERIALS[0] | null>(null);

  const filteredMaterials =
    activeTab === "All"
      ? MATERIALS
      : MATERIALS.filter((m) => m.category === activeTab);

  const activeDisplayMaterial = hoveredMaterial || MATERIALS[0];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-transparent relative overflow-hidden">
      <div className="relative z-10 max-w-site mx-auto px-6 sm:px-8 lg:px-10">
        {/* Header & Filter Tabs */}
        <ScrollReveal 
          variant="up"
          duration={0.7}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12"
        >
          <div>
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.24em] text-[#6E5053] uppercase block mb-1.5">
              FEATURED MATERIALS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#3F2E2F]">
              Nature's Finest Materials.
            </h2>
            <p className="text-sm sm:text-base text-[#3F2E2F]/75 mt-2 max-w-xl font-normal">
              A curated selection of durable, versatile and aesthetically rich materials for every design need.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {MATERIAL_TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`text-xs font-medium px-4 py-2 rounded-full transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-[#3F2E2F] text-[#FAF1E8] shadow-sm"
                    : "glass-pill text-[#3F2E2F]/80 hover:bg-white hover:text-[#3F2E2F]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Asymmetrical Composition: Large Timber Highlight + Horizontal Swatches */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          
          {/* Left: Large Architectural Curved Timber Close-up */}
          <ScrollReveal 
            variant="left"
            duration={0.8}
            className="lg:col-span-4"
          >
            <div className="relative aspect-square rounded-[28px] sm:rounded-[36px] overflow-hidden border border-white/80 shadow-[0_16px_40px_rgba(63,46,47,0.08)] bg-[#EAD7CF]/30 group">
              <Image
                src={activeDisplayMaterial.image}
                alt={`${activeDisplayMaterial.name} texture closeup`}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-5 left-5 right-5 glass-pill px-4 py-2.5 flex items-center justify-between text-[#3F2E2F]">
                <div>
                  <span className="text-xs font-semibold block leading-tight">{activeDisplayMaterial.name}</span>
                  <span className="text-[10px] text-[#6E5053]">{activeDisplayMaterial.subtitle || "Kiln-Dried & Seasoned"}</span>
                </div>
                <Link
                  href={activeDisplayMaterial.href}
                  className="w-6 h-6 rounded-full bg-[#3F2E2F] hover:bg-[#6E5053] text-[#FAF1E8] flex items-center justify-center text-xs transition-colors"
                >
                  →
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Horizontal Carousel Swatch Cards with Left/Right Arrows */}
          <div className="lg:col-span-8 relative">
            <div className="relative flex items-center">
              {/* Prev Arrow */}
              <button
                type="button"
                aria-label="Previous swatches"
                className="hidden xl:flex absolute -left-4 z-20 w-8 h-8 rounded-full glass-card items-center justify-center text-[#3F2E2F] hover:bg-white shadow-sm transition-all"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4 w-full">
                {filteredMaterials.map((mat, idx) => {
                  const isSelected = activeDisplayMaterial.name === mat.name;
                  return (
                    <ScrollReveal
                      key={mat.name}
                      variant="up"
                      delay={idx * 0.1}
                      duration={0.6}
                      className="group flex flex-col items-center space-y-2.5 cursor-pointer"
                      style={{}}
                    >
                      <div
                        onMouseEnter={() => setHoveredMaterial(mat)}
                        className="w-full flex flex-col items-center space-y-2.5"
                      >
                        <Link
                          href={mat.href}
                          className={`relative w-full aspect-[4/3] rounded-[20px] overflow-hidden border transition-all duration-300 shadow-[0_8px_24px_rgba(63,46,47,0.06)] bg-[#EAD7CF]/20 ${
                            isSelected
                              ? "border-white ring-2 ring-[#6E5053]/40 shadow-lg scale-[1.02]"
                              : "border-white/80 hover:border-white"
                          }`}
                        >
                          <Image
                            src={mat.image}
                            alt={mat.name}
                            fill
                            sizes="(max-width: 640px) 50vw, 25vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </Link>
                        <Link
                          href={mat.href}
                          className={`glass-pill px-3.5 py-1.5 w-full text-center transition-all shadow-sm ${
                            isSelected ? "bg-white text-[#3F2E2F]" : "group-hover:bg-white"
                          }`}
                        >
                          <span className="text-xs font-semibold text-[#3F2E2F] truncate block">
                            {mat.name}
                          </span>
                        </Link>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>

              {/* Next Arrow */}
              <button
                type="button"
                aria-label="Next swatches"
                className="hidden xl:flex absolute -right-4 z-20 w-8 h-8 rounded-full glass-card items-center justify-center text-[#3F2E2F] hover:bg-white shadow-sm transition-all"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
