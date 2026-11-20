"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { MessageCircle, ArrowRight } from "lucide-react";
import { SITE_SETTINGS } from "@/lib/constants";
import { formatWhatsAppMessage } from "@/lib/utils";

export function FinalCTASection() {
  const cleanNumber = SITE_SETTINGS.whatsappNumber.replace(/[^0-9]/g, "");
  const defaultText = formatWhatsAppMessage();
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${defaultText}`;

  return (
    <section className="py-10 sm:py-14 bg-transparent relative overflow-hidden">
      <div className="relative z-10 max-w-site mx-auto px-6 sm:px-8 lg:px-10">
        {/* Curvilinear Grand Luxury Dark Capsule Card */}
        <ScrollReveal 
          variant="scale"
          duration={0.8}
          className="relative rounded-[28px] sm:rounded-[36px] bg-[#3F2E2F] text-[#FAF1E8] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(63,46,47,0.25)] p-8 sm:p-12 lg:p-14"
        >
          {/* Subtle Ambient Plum / Blush Lighting */}
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#6E5053]/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-64 h-64 bg-[#9F7E82]/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            {/* Left Content */}
            <ScrollReveal 
              variant="left"
              delay={0.2}
              className="space-y-2 max-w-xl"
            >
              <span className="text-[11px] font-semibold tracking-[0.24em] text-[#CDAFB0] uppercase block">
                LET'S BUILD TOGETHER
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#FAF1E8] leading-[1.12]">
                Let's Build Something Beautiful.
              </h2>
              <p className="text-xs sm:text-sm text-[#FAF1E8]/75 leading-relaxed font-normal pt-1">
                Get expert advice, product recommendations and a customised solution for your space.
              </p>
            </ScrollReveal>

            {/* Right Buttons */}
            <ScrollReveal 
              variant="right"
              delay={0.3}
              className="flex flex-wrap items-center gap-3.5 shrink-0"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 bg-[#FAF1E8] hover:bg-white text-[#3F2E2F] text-xs sm:text-sm font-semibold px-6 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                <span>Get a Quote</span>
                <span className="text-xs">→</span>
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-[#FAF1E8] text-xs sm:text-sm font-medium px-6 py-3.5 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-[1.02]"
              >
                <MessageCircle className="w-4 h-4 text-[#CDAFB0]" />
                <span>Chat on WhatsApp</span>
              </a>
            </ScrollReveal>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
