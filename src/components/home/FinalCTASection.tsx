import Link from "next/link";
import { ArrowRight, Phone, MessageCircle } from "lucide-react";
import { SITE_SETTINGS } from "@/lib/constants";
import { formatWhatsAppMessage } from "@/lib/utils";
import { WoodPatternBackground } from "@/components/ui/WoodPatternBackground";

export function FinalCTASection() {
  const whatsappUrl = `https://wa.me/${SITE_SETTINGS.whatsappNumber.replace(/[^0-9]/g, "")}?text=${formatWhatsAppMessage()}`;

  return (
    <section className="py-20 lg:py-28 bg-ivory relative overflow-hidden">
      {/* Unified Aesthetic Wood Growth Rings Background */}
      <WoodPatternBackground opacity="opacity-[0.07]" />

      <div className="relative z-10 max-w-site mx-auto px-6">
        {/* Curvilinear Grand Luxury Capsule */}
        <div className="relative rounded-[2.5rem] bg-walnut text-ivory overflow-hidden border border-sand-400/25 shadow-[0_24px_60px_rgb(43,29,21,0.2)] p-8 sm:p-14 lg:p-20 text-center space-y-8">
          {/* Subtle architectural radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(#A47A4D_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-timber/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative space-y-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sand-300/10 border border-sand-300/25 text-[11px] font-semibold tracking-[0.25em] uppercase text-sand-300">
              Shankar Timber Mart — Coimbatore
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-ivory max-w-3xl mx-auto leading-[1.12]">
              Let's Build Something <br />
              <span className="italic font-normal text-sand-300">Beautiful.</span>
            </h2>

            <p className="text-base sm:text-lg text-ivory/80 max-w-2xl mx-auto leading-relaxed">
              Planning your home, office or next architectural project? Connect with our team to explore the right materials, verify grades, and receive prompt quotations.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/quote"
                className="w-full sm:w-auto bg-timber hover:bg-timber-600 text-ivory text-xs uppercase tracking-wider font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-0.5"
              >
                <span>Get a Detailed Quote</span>
                <ArrowRight className="w-4 h-4 text-sand-200" />
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs uppercase tracking-wider font-semibold px-8 py-4 rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <Link
                href="/contact"
                className="w-full sm:w-auto border border-sand-400/40 hover:bg-sand-400/15 text-ivory text-xs uppercase tracking-wider font-semibold px-8 py-4 rounded-full transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm"
              >
                <Phone className="w-3.5 h-3.5 text-sand-300" />
                <span>Visit Showroom</span>
              </Link>
            </div>

            <div className="pt-6 text-xs text-ivory/60 flex flex-wrap items-center justify-center gap-2">
              <span className="bg-walnut-800/80 px-3 py-1 rounded-full border border-white/5">
                178-C, Mettupalayam Road, Coimbatore
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="bg-walnut-800/80 px-3 py-1 rounded-full border border-white/5">
                Call: {SITE_SETTINGS.phone}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
