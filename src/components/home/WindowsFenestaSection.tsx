import Link from "next/link";
import Image from "next/image";
import { ArrowRight, VolumeX, Shield, Sun, Wind } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WoodPatternBackground } from "@/components/ui/WoodPatternBackground";

const WINDOW_TYPES = [
  { name: "Slider Windows", desc: "2-track and 3-track smooth sliding with integrated bug screen options." },
  { name: "Casement Windows", desc: "Side-hung outward opening with multi-point perimeter security locking." },
  { name: "Tilt & Turn", desc: "Dual European operation for draft-free top ventilation and full interior cleaning access." },
  { name: "Villa & French Doors", desc: "Grand floor-to-ceiling multi-point glass doors connecting patios and verandas." },
  { name: "Bay & Combination", desc: "Multi-angle bay units creating architectural alcoves and extended garden views." },
  { name: "Glass to Glass & Louvers", desc: "Seamless corner glazing and adjustable ventilation louvers for modern facades." },
];

export function WindowsFenestaSection() {
  return (
    <section className="py-20 lg:py-28 bg-ivory relative overflow-hidden">
      {/* Unified Aesthetic Wood Growth Rings Background */}
      <WoodPatternBackground opacity="opacity-[0.07]" />

      <div className="relative z-10 max-w-site mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7 space-y-6">
            <SectionHeading
              tagline="Engineered Fenestrations"
              title="Windows That Transform the Way You Live."
              subtitle="Precision-fabricated uPVC and slimline aluminium windows engineered to block exterior noise, conserve air conditioning, and withstand extreme monsoon winds."
              className="mb-0"
            />

            {/* Performance Feature Curved Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              <div className="p-4 bg-white rounded-2xl border border-sand-200/90 shadow-sm text-center space-y-1.5 hover:shadow-card hover:border-timber/40 transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-sand-100 flex items-center justify-center text-timber mx-auto">
                  <VolumeX className="w-5 h-5" />
                </div>
                <span className="font-serif text-xl font-medium text-walnut block">40 dB</span>
                <span className="text-[11px] text-charcoal/70 block">Acoustic Reduction</span>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-sand-200/90 shadow-sm text-center space-y-1.5 hover:shadow-card hover:border-timber/40 transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-sand-100 flex items-center justify-center text-timber mx-auto">
                  <Sun className="w-5 h-5" />
                </div>
                <span className="font-serif text-xl font-medium text-walnut block">30%</span>
                <span className="text-[11px] text-charcoal/70 block">Energy Savings</span>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-sand-200/90 shadow-sm text-center space-y-1.5 hover:shadow-card hover:border-timber/40 transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-sand-100 flex items-center justify-center text-timber mx-auto">
                  <Wind className="w-5 h-5" />
                </div>
                <span className="font-serif text-xl font-medium text-walnut block">2500 Pa</span>
                <span className="text-[11px] text-charcoal/70 block">Wind Resistance</span>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-sand-200/90 shadow-sm text-center space-y-1.5 hover:shadow-card hover:border-timber/40 transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-sand-100 flex items-center justify-center text-timber mx-auto">
                  <Shield className="w-5 h-5" />
                </div>
                <span className="font-serif text-xl font-medium text-walnut block">100%</span>
                <span className="text-[11px] text-charcoal/70 block">Weather Sealed</span>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Fenesta / Window Feature Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-luxury border-2 border-sand-300/80 bg-sand-100">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&auto=format&fit=crop&q=80"
                alt="Architectural uPVC and Aluminium Windows"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            {/* Fenesta association curved callout plaque */}
            <div className="absolute -bottom-6 left-5 right-5 bg-walnut/95 backdrop-blur-md text-ivory p-5 rounded-2xl shadow-hover border border-walnut-700/80">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] tracking-widest uppercase font-semibold text-sand-300 block">
                    Brochure Association
                  </span>
                  <span className="font-serif text-lg font-medium">
                    Fenesta Engineered Window Systems
                  </span>
                </div>
                <Link
                  href="/products/windows-fenesta"
                  className="w-9 h-9 rounded-full bg-timber hover:bg-timber-600 text-white flex items-center justify-center transition-colors shadow-sm"
                  aria-label="Explore Fenesta"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Typologies Grid with Curved Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          {WINDOW_TYPES.map((type) => (
            <div
              key={type.name}
              className="p-6 bg-white rounded-2xl border border-sand-200/90 shadow-sm space-y-2 hover:border-timber/60 hover:shadow-card transition-all duration-300"
            >
              <h3 className="font-serif text-xl font-medium text-walnut">
                {type.name}
              </h3>
              <p className="text-xs text-charcoal/70 leading-relaxed">
                {type.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
