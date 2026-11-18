import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WoodPatternBackground } from "@/components/ui/WoodPatternBackground";
import { BRAND_ASSOCIATIONS } from "@/lib/constants";

export function AssociatedBrandsSection() {
  return (
    <section className="py-20 lg:py-28 bg-ivory relative overflow-hidden">
      {/* Unified Aesthetic Wood Growth Rings Background */}
      <WoodPatternBackground opacity="opacity-[0.07]" />

      <div className="relative z-10 max-w-site mx-auto px-6">
        <SectionHeading
          tagline="Brochure Associated Brands"
          title="Trusted Names. Better Spaces."
          subtitle="We partner with India and the world's most reputable manufacturers of plywood, decorative laminates, hardware, and engineered window systems."
          centered
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6">
          {BRAND_ASSOCIATIONS.map((brand) => (
            <Link
              key={brand.name}
              href="/brands"
              className="p-6 bg-white rounded-2xl border border-sand-200/90 hover:border-timber/60 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgb(43,29,21,0.08)] hover:-translate-y-1 transition-all duration-300 text-center flex flex-col justify-between items-center group"
            >
              <div className="w-14 h-14 rounded-full bg-sand-100/70 border border-sand-200/60 flex items-center justify-center text-timber font-serif text-2xl font-bold group-hover:bg-walnut group-hover:text-sand-200 group-hover:scale-105 transition-all duration-300 mb-4 shadow-sm">
                {brand.name.charAt(0)}
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-xl font-medium text-walnut group-hover:text-timber transition-colors">
                  {brand.name}
                </h4>
                <p className="text-[11px] text-charcoal/60 line-clamp-1">
                  {brand.category}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/brands"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white border border-sand-300 text-xs font-semibold text-walnut hover:bg-walnut hover:text-ivory shadow-sm hover:shadow transition-all duration-300 uppercase tracking-wider"
          >
            <span>Explore All Associated Brand Catalogues</span>
            <ArrowRight className="w-4 h-4 text-timber" />
          </Link>
        </div>
      </div>
    </section>
  );
}
