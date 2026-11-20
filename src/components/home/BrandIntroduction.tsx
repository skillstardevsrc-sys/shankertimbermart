"use client";

import Link from "next/link";
import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ArrowRight, Layers, ShieldCheck, Compass, Handshake } from "lucide-react";

const ABOUT_FEATURES = [
  { icon: Layers, title: "Wide Product Range" },
  { icon: ShieldCheck, title: "Quality Assured" },
  { icon: Compass, title: "Expert Guidance" },
  { icon: Handshake, title: "End-to-End Support" },
];

export function BrandIntroduction() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-transparent relative overflow-hidden">
      {/* Soft background ambient light */}
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-[#EAD7CF]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-site mx-auto px-6 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Rounded Interior Showcase with Floating Logo Card */}
          <ScrollReveal 
            variant="left"
            duration={0.8}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/3] sm:aspect-[14/11] rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-[0_16px_40px_rgba(63,46,47,0.08)] border border-white/80 bg-[#EAD7CF]/20">
              <Image
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1000&auto=format&fit=crop&q=80"
                alt="Shankar Timber Mart Interior Living Space"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* Overlapping Floating Glass Brand Logo Card */}
            <ScrollReveal 
              variant="scale"
              delay={0.25}
              duration={0.7}
              className="absolute -bottom-5 -right-3 sm:-bottom-6 sm:-right-5 w-32 h-32 sm:w-40 sm:h-40 rounded-[24px] sm:rounded-[28px] overflow-hidden glass-panel p-3 sm:p-4 shadow-[0_12px_36px_rgba(63,46,47,0.12)] border border-white/90 transition-transform hover:scale-105 duration-300"
            >
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Shankar Timber Mart Insignia"
                  fill
                  sizes="160px"
                  className="object-contain"
                />
              </div>
            </ScrollReveal>
          </ScrollReveal>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-7 space-y-6 lg:pl-4">
            <ScrollReveal 
              variant="up"
              delay={0.1}
              className="inline-block"
            >
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.24em] text-[#6E5053] uppercase">
                ABOUT US
              </span>
            </ScrollReveal>

            <ScrollReveal 
              as="h2"
              variant="up"
              delay={0.2}
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#3F2E2F] leading-[1.12]"
            >
              Materials That Make a <br />
              <span className="italic text-[#9F7E82] font-normal">Home</span> a Home.
            </ScrollReveal>

            <ScrollReveal 
              as="p"
              variant="up"
              delay={0.3}
              className="text-sm sm:text-base text-[#3F2E2F]/80 leading-relaxed font-normal"
            >
              Shankar Timber Mart brings a wide range of quality timber, plywood, doors, windows and modular interior solutions. With a focus on reliability, variety and expert guidance, we help you build spaces that are beautiful, durable and functional.
            </ScrollReveal>

            {/* 4 Glass Feature Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {ABOUT_FEATURES.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <ScrollReveal
                    key={item.title}
                    variant="up"
                    delay={0.35 + idx * 0.08}
                    className="glass-card p-3 rounded-2xl flex items-center gap-2.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-card hover:bg-white"
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#EAD7CF]/70 text-[#3F2E2F] flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-medium text-[#3F2E2F] leading-tight">
                      {item.title}
                    </span>
                  </ScrollReveal>
                );
              })}
            </div>

            {/* CTA Button */}
            <ScrollReveal 
              variant="up"
              delay={0.65}
              className="pt-2"
            >
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-[#3F2E2F] hover:bg-[#6E5053] text-[#FAF1E8] text-xs sm:text-sm font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                <span>Know More</span>
                <ArrowRight className="w-4 h-4 text-[#FAF1E8]" />
              </Link>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
