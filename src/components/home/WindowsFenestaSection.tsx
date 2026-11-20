import Link from "next/link";
import Image from "next/image";
import { ArrowRight, VolumeX, Shield, Sun, Wind } from "lucide-react";

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
    <section className="py-14 sm:py-20 lg:py-24 bg-transparent relative overflow-hidden">
      <div className="relative z-10 max-w-site mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-12">
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.24em] text-[#6E5053] uppercase block mb-1.5">
                ENGINEERED FENESTRATIONS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#3F2E2F] leading-[1.12]">
                Windows That Transform the Way You Live.
              </h2>
              <p className="text-xs sm:text-sm text-[#3F2E2F]/75 mt-2 leading-relaxed max-w-xl font-normal">
                Precision-fabricated uPVC and slimline aluminium windows engineered to block exterior noise, conserve air conditioning, and withstand extreme weather.
              </p>
            </div>

            {/* Performance Feature Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="glass-card p-3.5 rounded-2xl text-center space-y-1">
                <div className="w-8 h-8 rounded-full bg-[#EAD7CF]/70 flex items-center justify-center text-[#3F2E2F] mx-auto">
                  <VolumeX className="w-4 h-4" />
                </div>
                <span className="font-serif text-lg font-medium text-[#3F2E2F] block">40 dB</span>
                <span className="text-[10px] text-[#3F2E2F]/65 block">Acoustic Reduction</span>
              </div>

              <div className="glass-card p-3.5 rounded-2xl text-center space-y-1">
                <div className="w-8 h-8 rounded-full bg-[#EAD7CF]/70 flex items-center justify-center text-[#3F2E2F] mx-auto">
                  <Sun className="w-4 h-4" />
                </div>
                <span className="font-serif text-lg font-medium text-[#3F2E2F] block">30%</span>
                <span className="text-[10px] text-[#3F2E2F]/65 block">Energy Savings</span>
              </div>

              <div className="glass-card p-3.5 rounded-2xl text-center space-y-1">
                <div className="w-8 h-8 rounded-full bg-[#EAD7CF]/70 flex items-center justify-center text-[#3F2E2F] mx-auto">
                  <Wind className="w-4 h-4" />
                </div>
                <span className="font-serif text-lg font-medium text-[#3F2E2F] block">2500 Pa</span>
                <span className="text-[10px] text-[#3F2E2F]/65 block">Wind Resistance</span>
              </div>

              <div className="glass-card p-3.5 rounded-2xl text-center space-y-1">
                <div className="w-8 h-8 rounded-full bg-[#EAD7CF]/70 flex items-center justify-center text-[#3F2E2F] mx-auto">
                  <Shield className="w-4 h-4" />
                </div>
                <span className="font-serif text-lg font-medium text-[#3F2E2F] block">100%</span>
                <span className="text-[10px] text-[#3F2E2F]/65 block">Weather Sealed</span>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Window Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] rounded-[28px] overflow-hidden shadow-[0_16px_40px_rgba(63,46,47,0.10)] border border-white/80 bg-[#EAD7CF]/30">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&auto=format&fit=crop&q=80"
                alt="Architectural slim sightline aluminium window installation"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Window Types Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {WINDOW_TYPES.map((type) => (
            <Link
              key={type.name}
              href="/products"
              className="glass-card p-4 rounded-[20px] hover:bg-white transition-all duration-300 hover:-translate-y-1 block text-left"
            >
              <h4 className="font-serif text-sm font-semibold text-[#3F2E2F] leading-tight">
                {type.name}
              </h4>
              <p className="text-[11px] text-[#3F2E2F]/65 line-clamp-2 mt-1">
                {type.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
