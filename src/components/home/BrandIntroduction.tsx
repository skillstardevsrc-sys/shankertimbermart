import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { WoodPatternBackground } from "@/components/ui/WoodPatternBackground";

export function BrandIntroduction() {
  return (
    <section className="py-20 lg:py-28 bg-ivory relative overflow-hidden">
      {/* Unified Aesthetic Wood Growth Rings Background */}
      <WoodPatternBackground opacity="opacity-[0.07]" />

      <div className="relative z-10 max-w-site mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Showcase with curved architectural frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-luxury border-2 border-sand-300/80 bg-sand-100">
              <Image
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1000&auto=format&fit=crop&q=80"
                alt="Shankar Timber Mart Architectural Showroom Details"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            {/* Overlapping official brand seal card with sculpted curves */}
            <div className="hidden sm:block absolute -bottom-7 -right-7 w-56 h-56 rounded-3xl overflow-hidden shadow-hover border-4 border-ivory bg-white/95 backdrop-blur-md p-4 transition-transform hover:scale-105 duration-300">
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Shankar Timber Mart Brand Insignia"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-7 space-y-6 lg:pl-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sand-200/60 border border-sand-300 text-timber text-xs font-semibold tracking-[0.2em] uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Shankar Timber Mart — Coimbatore</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-walnut leading-[1.15]">
              Materials That Make a <br />
              <span className="italic text-timber">House a Home.</span>
            </h2>

            <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed font-normal">
              Located on Mettupalayam Road, Coimbatore, Shankar Timber Mart is a dedicated destination for architects, interior designers, homeowners, and contractors seeking authenticity in building materials.
            </p>

            <p className="text-sm text-charcoal/70 leading-relaxed">
              From hand-selected Burma Teak and seasoned hardwoods to certified BWP marine plywood, designer veneer doors, engineered uPVC and aluminium fenestrations, and turnkey modular kitchens, our showroom brings together raw natural beauty and modern fabrication standards.
            </p>

            {/* Audience Segment Highlights: Modern Curved Mini-Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-5 rounded-2xl bg-white border border-sand-200 shadow-sm hover:shadow-card hover:border-timber/40 transition-all duration-300 space-y-1.5">
                <span className="font-serif text-lg font-medium text-walnut block">For Homeowners</span>
                <span className="text-xs text-charcoal/70 leading-relaxed block">
                  Bespoke doors, kitchens, and architectural wood inspiration.
                </span>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-sand-200 shadow-sm hover:shadow-card hover:border-timber/40 transition-all duration-300 space-y-1.5">
                <span className="font-serif text-lg font-medium text-walnut block">For Architects</span>
                <span className="text-xs text-charcoal/70 leading-relaxed block">
                  Exotic wood species, verified grades, and tactile finishes.
                </span>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-sand-200 shadow-sm hover:shadow-card hover:border-timber/40 transition-all duration-300 space-y-1.5">
                <span className="font-serif text-lg font-medium text-walnut block">For Contractors</span>
                <span className="text-xs text-charcoal/70 leading-relaxed block">
                  Bulk commercial supply, shuttering ply, and precision sizing.
                </span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-5">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-walnut hover:bg-walnut-700 text-ivory text-xs font-semibold uppercase tracking-wider px-7 py-3.5 rounded-full transition-all shadow-sm hover:shadow-md"
              >
                <span>Discover Our Story</span>
                <ArrowRight className="w-4 h-4 text-sand-300" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-timber hover:text-walnut px-5 py-3.5 rounded-full border border-sand-300 hover:border-timber/50 bg-white transition-all shadow-sm"
              >
                <span>Visit Our Showroom</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
