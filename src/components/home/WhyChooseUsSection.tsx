"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ShieldCheck, Layers, Award, Compass, Handshake } from "lucide-react";

const WHY_US_ITEMS = [
  {
    icon: ShieldCheck,
    title: "Premium Quality Materials",
  },
  {
    icon: Layers,
    title: "Wide & Diverse Product Range",
  },
  {
    icon: Award,
    title: "Trusted Expertise",
  },
  {
    icon: Compass,
    title: "Interior Solutions",
  },
  {
    icon: Handshake,
    title: "End-to-End Support",
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-transparent relative overflow-hidden">
      <div className="relative z-10 max-w-site mx-auto px-6 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          <ScrollReveal 
            variant="left"
            duration={0.7}
            className="lg:col-span-4"
          >
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.24em] text-[#6E5053] uppercase block mb-1.5">
              WHY CHOOSE US
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[38px] font-medium tracking-tight text-[#3F2E2F] leading-tight">
              Why Choose Shankar Timber Mart?
            </h2>
          </ScrollReveal>

          {/* 5 Glass Cards in a Row */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
            {WHY_US_ITEMS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <ScrollReveal
                  key={item.title}
                  variant="scale"
                  delay={idx * 0.08}
                  duration={0.55}
                  className="glass-card p-3.5 sm:p-4 rounded-[18px] sm:rounded-[20px] flex flex-col items-center text-center space-y-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-card hover:bg-white"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#EAD7CF]/70 text-[#3F2E2F] flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="text-[11px] sm:text-xs font-semibold text-[#3F2E2F] leading-snug">
                    {item.title}
                  </h4>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
