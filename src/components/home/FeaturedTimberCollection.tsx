"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WoodPatternBackground } from "@/components/ui/WoodPatternBackground";

interface TimberItem {
  name: string;
  type: "hardwood" | "softwood";
  origin: string;
  description: string;
  idealFor: string;
  image: string;
  slug: string;
}

const TIMBER_ITEMS: TimberItem[] = [
  {
    name: "Burma Teak Wood",
    type: "hardwood",
    origin: "Authentic Myanmar Timber",
    description: "Golden honey hues, high natural oil content, and tight ring grains. Impervious to moisture and decay.",
    idealFor: "Main entrance doors, staircases, heirloom joinery",
    image: "https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?w=800&auto=format&fit=crop&q=80",
    slug: "burma-teak-wood",
  },
  {
    name: "Padauk Wood (Red Gold)",
    type: "hardwood",
    origin: "Tropical Exotic Hardwood",
    description: "Striking natural coral-red hue maturing into a warm deep burgundy with exceptional dimensional stability.",
    idealFor: "Statement entrance doors, fluted panels, luxury desks",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop&q=80",
    slug: "padauk-wood",
  },
  {
    name: "Malaysian White Sal",
    type: "hardwood",
    origin: "Imported Malaysian Timber",
    description: "Extremely heavy and dense structural timber. Naturally resistant to termites, borer beetles, and fungal rot.",
    idealFor: "Door and window frames (chowkhats), structural lintels",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80",
    slug: "malaysian-white-sal",
  },
  {
    name: "American White Ash",
    type: "softwood",
    origin: "North American Hardwood/Softwood",
    description: "Bright blonde tones with dramatic bold cathedral grain patterns. The definitive timber of Japandi and Nordic designs.",
    idealFor: "Minimalist cabinetry, feature wall slats, chairs",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80",
    slug: "white-ash-wood",
  },
  {
    name: "Architectural White Oak",
    type: "softwood",
    origin: "European / American Oak",
    description: "Subtle biscuit-tan grain with tight medullary rays and natural water resistance.",
    idealFor: "Modern kitchen facades, bespoke dining tables, flooring",
    image: "https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?w=800&auto=format&fit=crop&q=80",
    slug: "white-oak-wood",
  },
  {
    name: "African Teak (Iroko)",
    type: "hardwood",
    origin: "West African Timber",
    description: "High-density golden bronze timber offering superior outdoor and weather tolerance.",
    idealFor: "Exterior pergola beams, heavy door casings, decks",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=80",
    slug: "african-teak-wood",
  },
];

export function FeaturedTimberCollection() {
  const [activeTab, setActiveTab] = useState<"all" | "hardwood" | "softwood">("all");

  const filtered =
    activeTab === "all"
      ? TIMBER_ITEMS
      : TIMBER_ITEMS.filter((item) => item.type === activeTab);

  return (
    <section className="py-20 lg:py-28 bg-ivory relative overflow-hidden">
      {/* Unified Aesthetic Wood Growth Rings Background */}
      <WoodPatternBackground opacity="opacity-[0.07]" />

      <div className="relative z-10 max-w-site mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeading
            tagline="Hardwood & Softwood Timber"
            title="Nature's Finest Materials."
            subtitle="Hand-inspected natural timber logs, planed scantlings, and frame sections seasoned for Coimbatore's climate."
            className="mb-0"
          />

          {/* Smooth Curved Pill Filter Tabs */}
          <div className="inline-flex p-1.5 bg-sand-200/70 rounded-full border border-sand-300 self-start md:self-end shadow-sm">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-5 py-2 text-xs font-semibold rounded-full transition-all duration-300 ${
                activeTab === "all"
                  ? "bg-walnut text-ivory shadow-md"
                  : "text-charcoal/70 hover:text-walnut"
              }`}
            >
              All Woods
            </button>
            <button
              onClick={() => setActiveTab("hardwood")}
              className={`px-5 py-2 text-xs font-semibold rounded-full transition-all duration-300 ${
                activeTab === "hardwood"
                  ? "bg-walnut text-ivory shadow-md"
                  : "text-charcoal/70 hover:text-walnut"
              }`}
            >
              Hardwood (Teak, Sal, Padauk)
            </button>
            <button
              onClick={() => setActiveTab("softwood")}
              className={`px-5 py-2 text-xs font-semibold rounded-full transition-all duration-300 ${
                activeTab === "softwood"
                  ? "bg-walnut text-ivory shadow-md"
                  : "text-charcoal/70 hover:text-walnut"
              }`}
            >
              Softwood / Ash & Oak
            </button>
          </div>
        </div>

        {/* Timber Grid with Curved Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((wood) => (
            <div
              key={wood.name}
              className="bg-white rounded-3xl p-3 sm:p-4 shadow-card border border-sand-200/90 flex flex-col group hover:shadow-hover hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-sand-200">
                <Image
                  src={wood.image}
                  alt={wood.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-3 left-3 bg-walnut/90 backdrop-blur-md text-ivory text-[10px] font-semibold uppercase px-3 py-1 rounded-full shadow-sm">
                  {wood.type}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[11px] text-timber font-medium tracking-wide block">
                    {wood.origin}
                  </span>
                  <h3 className="font-serif text-2xl font-medium text-walnut">
                    {wood.name}
                  </h3>
                  <p className="text-xs text-charcoal/70 leading-relaxed">
                    {wood.description}
                  </p>
                  <div className="pt-2 text-xs text-charcoal/60">
                    <span className="font-semibold text-walnut">Ideal For: </span>
                    <span>{wood.idealFor}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-sand-100 flex items-center justify-between">
                  <Link
                    href={`/products/${wood.slug}`}
                    className="text-xs font-semibold text-walnut hover:text-timber inline-flex items-center gap-1 transition-colors"
                  >
                    <span>View Specifications</span>
                    <ArrowRight className="w-3.5 h-3.5 text-timber" />
                  </Link>
                  <Link
                    href={`/quote?product=${encodeURIComponent(wood.name)}`}
                    className="text-[11px] font-semibold bg-sand-100 hover:bg-walnut hover:text-ivory text-walnut px-4 py-1.5 rounded-full transition-all duration-300 shadow-sm"
                  >
                    Get Rate
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all timber CTA button with smooth curves */}
        <div className="mt-14 text-center">
          <Link
            href="/products/timber"
            className="inline-flex items-center gap-2 border border-sand-300 bg-white hover:bg-sand-50 text-walnut text-xs font-semibold uppercase tracking-wider px-8 py-4 rounded-full transition-all shadow-sm hover:shadow-md"
          >
            <span>Explore Complete Timber Catalogue</span>
            <ArrowRight className="w-4 h-4 text-timber" />
          </Link>
        </div>
      </div>
    </section>
  );
}
