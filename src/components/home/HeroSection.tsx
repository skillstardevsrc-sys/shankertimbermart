"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ArrowRight, Play, ChevronLeft, ChevronRight } from "lucide-react";

export function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  const heroSlides = [
    {
      image: "/images/hero-bg.jpg",
      alt: "Shankar Timber Mart Architectural Interior Living Room and Luxury Wood Door",
    },
  ];

  return (
    <section className="relative pt-6 sm:pt-8 lg:pt-10 pb-10 sm:pb-14 bg-transparent overflow-hidden">
      {/* Ambient warm gradient orbs behind the glass container for authentic frosted glass refraction */}
      <div className="absolute top-6 left-[12%] w-[480px] h-[480px] bg-gradient-to-br from-[#EAD7CF]/80 to-[#D4A373]/45 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-6 left-[4%] w-[400px] h-[400px] bg-gradient-to-tr from-[#CDAFB0]/70 to-[#C49A88]/50 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute top-1/4 right-[8%] w-[460px] h-[460px] bg-gradient-to-bl from-[#EAD7CF]/70 via-[#DFC5B8]/50 to-[#CDAFB0]/40 rounded-full blur-[95px] pointer-events-none" />
      <div className="absolute -top-10 right-1/3 w-[340px] h-[340px] bg-white/80 rounded-full blur-[80px] pointer-events-none" />

      {/* Hidden SVG Defs for Custom Organic Architectural Card ClipPath */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <clipPath id="heroCardShape" clipPathUnits="objectBoundingBox">
            <path d="M 0.14,0 L 0.92,0 C 0.965,0 1.0,0.06 1.0,0.12 L 1.0,0.88 C 1.0,0.94 0.965,1.0 0.92,1.0 L 0.08,1.0 C 0.035,1.0 0,0.94 0,0.85 C 0.022,0.65 0.048,0.35 0.065,0.12 C 0.065,0.05 0.09,0 0.14,0 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Super Glassmorphic Master Hero Container covering both Left Content & Right Image */}
      <div className="relative z-10 max-w-site mx-auto px-6 sm:px-8 lg:px-10">
        <ScrollReveal 
          variant="scale"
          duration={0.8}
          className="relative rounded-[32px] sm:rounded-[40px] lg:rounded-[46px] p-6 sm:p-8 lg:p-10 xl:p-12 overflow-hidden transition-all duration-300"
          style={{
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.20) 45%, rgba(250, 241, 232, 0.25) 100%)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            border: "1px solid rgba(255, 255, 255, 0.75)",
            boxShadow: "0 30px 60px -12px rgba(63, 46, 47, 0.09), 0 16px 32px -16px rgba(63, 46, 47, 0.05), inset 0 1.5px 2px 0 rgba(255, 255, 255, 0.95), inset 0 -1.5px 2px 0 rgba(255, 255, 255, 0.3), inset 0 0 35px 0 rgba(255, 255, 255, 0.18)",
          }}
        >
          {/* Diagonal Glass Gloss Sheen Overlay */}
          <div 
            className="absolute inset-0 pointer-events-none rounded-[inherit]" 
            style={{
              background: "linear-gradient(125deg, rgba(255, 255, 255, 0.42) 0%, rgba(255, 255, 255, 0.10) 35%, transparent 60%, rgba(255, 255, 255, 0.15) 100%)",
            }}
          />

          {/* Top Specular Edge Gleam */}
          <div 
            className="absolute top-0 inset-x-12 h-[1.5px] pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.95) 30%, rgba(255, 255, 255, 0.95) 70%, transparent 100%)",
            }}
          />
          
          {/* Subtle Ambient Decorative Glow inside the card */}
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-[#EAD7CF]/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-72 h-72 bg-[#CDAFB0]/25 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
            
            {/* Left Column: Editorial Headline & Actions */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6 lg:space-y-7">
              <div className="space-y-3.5">
                {/* Eyebrow Label Pill */}
                <ScrollReveal 
                  variant="up"
                  delay={0.15}
                  duration={0.6}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full"
                  style={{
                    background: "rgba(255, 255, 255, 0.55)",
                    backdropFilter: "blur(14px)",
                    WebkitBackdropFilter: "blur(14px)",
                    border: "1px solid rgba(255, 255, 255, 0.85)",
                    boxShadow: "0 2px 8px rgba(63, 46, 47, 0.04), inset 0 1px 1px rgba(255, 255, 255, 0.95)",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9F7E82]" />
                  <span className="text-[10px] sm:text-[11px] tracking-[0.22em] font-semibold text-[#6E5053] uppercase">
                    CRAFTING SPACES, DEFINING LIVING
                  </span>
                </ScrollReveal>

                {/* Main Headline */}
                <ScrollReveal 
                  as="h1"
                  variant="up"
                  delay={0.25}
                  duration={0.7}
                  className="font-serif text-3xl sm:text-4xl lg:text-[48px] font-medium tracking-tight text-[#3F2E2F] leading-[1.08]"
                >
                  The Beauty of <br />
                  <span className="italic text-[#9F7E82] font-normal">Wood.</span> The Art <br />
                  of Living.
                </ScrollReveal>

                {/* Subtitle */}
                <ScrollReveal 
                  as="p"
                  variant="up"
                  delay={0.35}
                  duration={0.7}
                  className="text-xs sm:text-sm text-[#3F2E2F]/80 leading-relaxed max-w-md font-normal pt-0.5"
                >
                  Discover premium timber, plywood, doors, windows and interior solutions for beautiful spaces.
                </ScrollReveal>
              </div>

              {/* CTAs */}
              <ScrollReveal 
                variant="up"
                delay={0.45}
                duration={0.7}
                className="flex flex-wrap items-center gap-3"
              >
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 bg-[#3F2E2F] hover:bg-[#6E5053] text-[#FAF1E8] text-xs sm:text-sm font-semibold px-5 sm:px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                >
                  <span>Explore Products</span>
                  <ArrowRight className="w-4 h-4 text-[#FAF1E8]" />
                </Link>

                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 text-[#3F2E2F] hover:text-[#3F2E2F] text-xs sm:text-sm font-semibold px-5 sm:px-6 py-3 rounded-full transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: "rgba(255, 255, 255, 0.45)",
                    backdropFilter: "blur(14px)",
                    WebkitBackdropFilter: "blur(14px)",
                    border: "1px solid rgba(255, 255, 255, 0.8)",
                    boxShadow: "0 4px 14px rgba(63, 46, 47, 0.04), inset 0 1px 1.5px rgba(255, 255, 255, 0.9)",
                  }}
                >
                  <Play className="w-3.5 h-3.5 fill-[#3F2E2F] text-[#3F2E2F]" />
                  <span>View Our Projects</span>
                </Link>
              </ScrollReveal>

              {/* Verified Business Highlights (Inner Glass Stats Capsule) */}
              <ScrollReveal 
                variant="up"
                delay={0.55}
                duration={0.7}
                className="inline-flex items-center rounded-2xl px-4 sm:px-5 py-3 divide-x divide-[#CDAFB0]/30 max-w-fit"
                style={{
                  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.25) 100%)",
                  backdropFilter: "blur(18px)",
                  WebkitBackdropFilter: "blur(18px)",
                  border: "1px solid rgba(255, 255, 255, 0.8)",
                  boxShadow: "0 8px 24px rgba(63, 46, 47, 0.04), inset 0 1px 1.5px rgba(255, 255, 255, 0.95)",
                }}
              >
                <div className="pr-3.5 sm:pr-4">
                  <span className="font-serif text-xl sm:text-2xl font-bold text-[#3F2E2F] block leading-none">
                    15+
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-[#6E5053] font-medium block mt-1 whitespace-nowrap">
                    Years of Expertise
                  </span>
                </div>
                <div className="px-3.5 sm:px-4">
                  <span className="font-serif text-xl sm:text-2xl font-bold text-[#3F2E2F] block leading-none">
                    500+
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-[#6E5053] font-medium block mt-1 whitespace-nowrap">
                    Product Variants
                  </span>
                </div>
                <div className="pl-3.5 sm:pl-4">
                  <span className="font-serif text-xl sm:text-2xl font-bold text-[#3F2E2F] block leading-none">
                    1000+
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-[#6E5053] font-medium block mt-1 whitespace-nowrap">
                    Happy Clients
                  </span>
                </div>
              </ScrollReveal>

            </div>

            {/* Right Column: Architectural Hero Photo Container with Custom Angled Organic Shape */}
            <ScrollReveal 
              variant="right"
              delay={0.3}
              duration={0.85}
              className="lg:col-span-7 relative"
            >
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] filter drop-shadow-[0_16px_40px_rgba(63,46,47,0.12)]">
                {/* Clipped Card with Image */}
                <div 
                  className="relative w-full h-full overflow-hidden bg-[#EAD7CF]/30"
                  style={{ 
                    clipPath: "url(#heroCardShape)", 
                    WebkitClipPath: "url(#heroCardShape)" 
                  }}
                >
                  <Image
                    src={heroSlides[activeSlide].image}
                    alt={heroSlides[activeSlide].alt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover object-center"
                  />
                </div>

                {/* Exact Matching Organic White Border Stroke Overlay */}
                <svg 
                  className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible" 
                  viewBox="0 0 1000 660" 
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path 
                    d="M 140,0 L 920,0 C 965,0 1000,40 1000,79 L 1000,581 C 1000,620 965,660 920,660 L 80,660 C 35,660 0,620 0,561 C 22,429 48,231 65,79 C 65,33 90,0 140,0 Z" 
                    fill="none" 
                    stroke="rgba(255, 255, 255, 0.85)" 
                    strokeWidth="2" 
                    vectorEffect="non-scaling-stroke" 
                  />
                </svg>

                {/* Floating Glass Carousel Pill Controls */}
                <div 
                  className="absolute bottom-4 right-4 z-30 px-3 py-1.5 flex items-center gap-2.5 text-[#3F2E2F] rounded-full"
                  style={{
                    background: "rgba(255, 255, 255, 0.6)",
                    backdropFilter: "blur(14px)",
                    WebkitBackdropFilter: "blur(14px)",
                    border: "1px solid rgba(255, 255, 255, 0.85)",
                    boxShadow: "0 4px 14px rgba(63, 46, 47, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.95)",
                  }}
                >
                  <button
                    type="button"
                    aria-label="Previous image"
                    className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-white/80 text-[#3F2E2F] transition-colors"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3F2E2F]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3F2E2F]/30" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3F2E2F]/30" />
                  </div>
                  <button
                    type="button"
                    aria-label="Next image"
                    className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-white/80 text-[#3F2E2F] transition-colors"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
