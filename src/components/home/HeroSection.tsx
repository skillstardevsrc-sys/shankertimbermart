import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play, TreePine, Layers, Compass, Handshake } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] lg:min-h-[92vh] flex flex-col justify-between bg-walnut text-ivory overflow-hidden">
      {/* Photorealistic Architectural Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Shankar Timber Mart Architectural Interior Living Room and Luxury Wood Door"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Directional Vignette Gradient to ensure perfect text readability while letting the door & garden shine */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent lg:w-[65%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-site mx-auto px-6 sm:px-8 w-full pt-16 sm:pt-24 lg:pt-32 pb-8 flex-1 flex flex-col justify-center">
        <div className="max-w-2xl space-y-5">
          {/* Brand Overline Tag with Horizontal Rule */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] font-medium text-ivory/80">
              SHANKAR TIMBER MART
            </span>
            <span className="w-12 sm:w-16 h-[1px] bg-ivory/40" />
          </div>

          {/* Main Hero Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-[68px] font-medium tracking-tight text-ivory leading-[1.08]">
            The Beauty of <span className="text-[#C59B63] italic font-normal">Wood.</span> <br />
            The Art of Living.
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-lg text-ivory/85 leading-relaxed max-w-xl font-normal pt-1">
            Discover premium timber, plywood, doors, windows and interior solutions for beautiful spaces.
          </p>

          {/* Action CTAs */}
          <div className="pt-3 flex flex-wrap items-center gap-4">
            <Link
              href="/configurator"
              className="inline-flex items-center gap-2 bg-[#B87A3D] hover:bg-[#a66a30] text-ivory text-xs sm:text-sm font-semibold px-6 sm:px-7 py-3 sm:py-3.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4 text-ivory" />
            </Link>

            <Link
              href="/projects"
              className="inline-flex items-center gap-2.5 border border-sand-300/60 hover:border-sand-200 hover:bg-white/10 text-ivory text-xs sm:text-sm font-semibold px-6 sm:px-7 py-3 sm:py-3.5 rounded-lg backdrop-blur-md transition-all duration-300"
            >
              <Play className="w-3.5 h-3.5 fill-[#C59B63] text-[#C59B63]" />
              <span>View Our Projects</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Floating Highlights Bar (4 Columns) */}
      <div className="relative z-10 w-full border-t border-white/15 bg-black/40 backdrop-blur-md py-5 sm:py-6 px-6 sm:px-8">
        <div className="max-w-site mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-center">
          {/* Feature 01: Wide Product Range */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#C59B63]/20 border border-[#C59B63]/40 flex items-center justify-center shrink-0">
              <TreePine className="w-5 h-5 text-[#C59B63]" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-ivory leading-tight">
                Wide Product Range
              </h4>
              <p className="text-xs text-ivory/70 mt-0.5">
                Timber • Plywood • Doors • Windows
              </p>
            </div>
          </div>

          {/* Feature 02: Quality Materials */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#C59B63]/20 border border-[#C59B63]/40 flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5 text-[#C59B63]" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-ivory leading-tight">
                Quality Materials
              </h4>
              <p className="text-xs text-ivory/70 mt-0.5">
                Trusted &amp; Reliable
              </p>
            </div>
          </div>

          {/* Feature 03: Interior Solutions */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#C59B63]/20 border border-[#C59B63]/40 flex items-center justify-center shrink-0">
              <Compass className="w-5 h-5 text-[#C59B63]" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-ivory leading-tight">
                Interior Solutions
              </h4>
              <p className="text-xs text-ivory/70 mt-0.5">
                Modular &amp; Turnkey
              </p>
            </div>
          </div>

          {/* Feature 04: End-to-End Support */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#C59B63]/20 border border-[#C59B63]/40 flex items-center justify-center shrink-0">
              <Handshake className="w-5 h-5 text-[#C59B63]" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-ivory leading-tight">
                End-to-End Support
              </h4>
              <p className="text-xs text-ivory/70 mt-0.5">
                Guidance to Installation
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
