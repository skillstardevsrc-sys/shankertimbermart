import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BRAND_ASSOCIATIONS } from "@/lib/constants";

export function AssociatedBrandsSection() {
  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-transparent relative overflow-hidden">
      <div className="relative z-10 max-w-site mx-auto px-6 text-center">
        <span className="text-[11px] sm:text-xs font-semibold tracking-[0.24em] text-[#6E5053] uppercase block mb-1.5">
          ASSOCIATED BRANDS
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#3F2E2F] mb-3">
          Trusted Names. Better Spaces.
        </h2>
        <p className="text-xs sm:text-sm text-[#3F2E2F]/75 max-w-2xl mx-auto mb-10 sm:mb-12 font-normal">
          We partner with leading manufacturers of plywood, laminates, hardware, and engineered window systems.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {BRAND_ASSOCIATIONS.map((brand) => (
            <Link
              key={brand.name}
              href="/brands"
              className="glass-card p-5 sm:p-6 rounded-[22px] border border-white/80 hover:bg-white hover:shadow-[0_12px_32px_rgba(63,46,47,0.10)] hover:-translate-y-1 transition-all duration-300 text-center flex flex-col justify-between items-center group"
            >
              <div className="w-12 h-12 rounded-full bg-[#EAD7CF]/70 border border-white/80 flex items-center justify-center text-[#3F2E2F] font-serif text-xl font-bold group-hover:bg-[#3F2E2F] group-hover:text-[#FAF1E8] transition-all duration-300 mb-3 shadow-sm">
                {brand.name.charAt(0)}
              </div>
              <div className="space-y-0.5">
                <h4 className="font-serif text-base font-semibold text-[#3F2E2F] group-hover:text-[#6E5053] transition-colors">
                  {brand.name}
                </h4>
                <p className="text-[10px] text-[#3F2E2F]/60 line-clamp-1">
                  {brand.category}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/brands"
            className="inline-flex items-center gap-1.5 glass-pill px-6 py-3 text-xs font-semibold text-[#3F2E2F] hover:bg-white transition-all shadow-sm"
          >
            <span>Explore All Associated Brand Catalogues</span>
            <span className="text-xs">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
