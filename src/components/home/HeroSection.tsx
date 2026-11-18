import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Compass, Sparkles } from "lucide-react";
import { HeroProductCustomizer } from "./HeroProductCustomizer";

export function HeroSection() {
  return (
    <section className="relative min-h-[82vh] lg:min-h-[88vh] flex items-center bg-walnut text-ivory overflow-hidden py-10 lg:py-14">
      {/* Cinematic Architectural Background Image with Clean Non-Blocking Gradient */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&auto=format&fit=crop&q=85"
          alt="Shankar Timber Mart Architectural Showcase"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-35 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-walnut/95 via-walnut/85 to-walnut/75 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-site mx-auto px-4 sm:px-6 w-full">
        {/* 2-Column Balanced Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Headline, Copy & Trust Highlights (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Tagline Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sand-400/15 border border-sand-400/30 text-sand-200 text-xs tracking-[0.2em] uppercase font-semibold backdrop-blur-md shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-timber" />
              <span>Crafting Spaces. Defining Living.</span>
            </div>

            {/* Hero Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-ivory leading-[1.1]">
              The Beauty of Wood. <br />
              <span className="italic font-normal text-sand-300">The Art of Living.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-sm sm:text-base text-ivory/80 leading-relaxed max-w-xl font-normal">
              Direct importers of genuine Burma & African Teak, exotic Padauk, and architectural timber. Choose your wood, design, and dimensions right on the studio card to configure and order your custom piece instantly.
            </p>

            {/* Action CTAs */}
            <div className="pt-1 flex flex-wrap items-center gap-3">
              <Link
                href="/products"
                className="bg-timber hover:bg-timber-600 text-ivory text-xs uppercase tracking-wider font-semibold px-6 py-3.5 rounded-full shadow-hover flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02]"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/projects"
                className="border border-sand-300/40 hover:border-sand-300 hover:bg-sand-300/10 text-ivory text-xs uppercase tracking-wider font-semibold px-6 py-3.5 rounded-full transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm"
              >
                <Compass className="w-4 h-4 text-sand-300" />
                <span>View Our Projects</span>
              </Link>
            </div>

            {/* Trust Highlights Strip */}
            <div className="pt-4 border-t border-white/10 grid grid-cols-3 gap-3 text-xs text-ivory/80">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <span className="block font-serif text-lg sm:text-xl text-sand-200 font-medium mb-0.5">
                  100% Genuine
                </span>
                <span className="text-[10px] text-ivory/70 leading-snug block">
                  Direct Burma & African Teak
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <span className="block font-serif text-lg sm:text-xl text-sand-200 font-medium mb-0.5">
                  BWP 710
                </span>
                <span className="text-[10px] text-ivory/70 leading-snug block">
                  Certified Marine Waterproof
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <span className="block font-serif text-lg sm:text-xl text-sand-200 font-medium mb-0.5">
                  Turnkey
                </span>
                <span className="text-[10px] text-ivory/70 leading-snug block">
                  Hand Carvings & Factory Finish
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Step-by-Step Bespoke Studio Card Hook (6 Cols) */}
          <div className="lg:col-span-6 w-full max-w-lg lg:max-w-none mx-auto">
            <HeroProductCustomizer />
          </div>
        </div>
      </div>
    </section>
  );
}
