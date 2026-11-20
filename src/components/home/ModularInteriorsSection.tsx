import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const INTERIOR_SERVICES = [
  {
    title: "Modular Kitchens",
    desc: "100% waterproof BWP marine plywood carcass with German soft-close mechanisms, acrylic finishes, and quartz countertops.",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80",
    href: "/products",
  },
  {
    title: "Walk-In & Sliding Wardrobes",
    desc: "Floor-to-ceiling profiles with integrated warm LED sensors, vanity compartments, and fluted glass panels.",
    image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=800&auto=format&fit=crop&q=80",
    href: "/products",
  },
  {
    title: "Living & TV Feature Consoles",
    desc: "Floating credenzas with hidden wiring chases, acoustic fluted timber battens, and marble laminate feature walls.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
    href: "/products",
  },
  {
    title: "Turnkey Home & Office Execution",
    desc: "End-to-end material sourcing, precision cutting, factory manufacturing, and white-glove site installation.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80",
    href: "/products",
  },
];

export function ModularInteriorsSection() {
  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-transparent relative overflow-hidden">
      <div className="relative z-10 max-w-site mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
          <div>
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.24em] text-[#6E5053] uppercase block mb-1.5">
              MODULAR INTERIOR ARCHITECTURE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#3F2E2F]">
              Thoughtfully Designed. Beautifully Lived.
            </h2>
            <p className="text-xs sm:text-sm text-[#3F2E2F]/75 mt-1 font-normal max-w-xl">
              Custom modular cabinetry and turnkey interior spaces built upon certified marine plywood and master-grade joinery.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 glass-pill px-5 py-2.5 text-xs font-semibold text-[#3F2E2F] hover:bg-white transition-all shadow-sm self-start md:self-end"
          >
            <span>Explore Modular Interiors</span>
            <span className="text-xs">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {INTERIOR_SERVICES.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group glass-card rounded-[28px] p-3 sm:p-4 border border-white/80 hover:bg-white hover:shadow-[0_16px_40px_rgba(63,46,47,0.12)] transition-all duration-300 flex flex-col hover:-translate-y-1"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[20px] bg-[#EAD7CF]/30">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-4 sm:p-5 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#3F2E2F] group-hover:text-[#6E5053] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#3F2E2F]/70 line-clamp-2 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#CDAFB0]/20 flex items-center justify-between text-xs font-semibold text-[#6E5053]">
                  <span>Configure Interior</span>
                  <span className="text-xs">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
