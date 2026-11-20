import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const DOOR_ITEMS = [
  {
    name: "Natural Wood Veneer Doors",
    type: "Hand-Matched Exotic Veneers",
    desc: "Single piece sliced Teak, Walnut and Oak veneers pressed over solid core frames.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80",
    slug: "designer-veneer-doors",
    href: "/products",
  },
  {
    name: "High-Pressure Lam Doors",
    type: "Scratch & Stain Resistant HPL",
    desc: "1mm decorative laminate surfaces offering zero polish maintenance and impact durability.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80",
    slug: "heavy-duty-lam-doors",
    href: "/products",
  },
  {
    name: "Veneer Fold & Membrane Doors",
    type: "Seamless 3D PVC Wrapped",
    desc: "CNC routed contemporary designs vacuum membrane wrapped for flawless water-resistant edges.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80",
    slug: "membrane-and-veneer-fold-doors",
    href: "/products",
  },
  {
    name: "Solid WPC Composite Doors",
    type: "100% Termite & Waterproof",
    desc: "Virgin polymer and wood powder composite ideal for bathrooms, toilets, and balconies.",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop&q=80",
    slug: "wpc-doors-and-frames-collection",
    href: "/products",
  },
];

export function DoorsCollection() {
  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-transparent relative overflow-hidden">
      <div className="relative z-10 max-w-site mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
          <div>
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.24em] text-[#6E5053] uppercase block mb-1.5">
              DOORS &amp; ENTRANCES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#3F2E2F]">
              An Entrance That Makes a Statement.
            </h2>
            <p className="text-xs sm:text-sm text-[#3F2E2F]/75 mt-1 font-normal max-w-xl">
              Architectural doors engineered for dimensional rigidity, tactile warmth, and enduring security.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 glass-pill px-5 py-2.5 text-xs font-semibold text-[#3F2E2F] hover:bg-white transition-all shadow-sm self-start md:self-end"
          >
            <span>Explore Door Configurator</span>
            <span className="text-xs">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DOOR_ITEMS.map((door) => (
            <Link
              key={door.name}
              href={door.href}
              className="group glass-card rounded-[26px] p-3 border border-white/80 shadow-[0_8px_24px_rgba(63,46,47,0.06)] flex flex-col hover:shadow-[0_16px_36px_rgba(63,46,47,0.12)] hover:-translate-y-1 transition-all duration-300 hover:bg-white"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[20px] bg-[#EAD7CF]/30">
                <Image
                  src={door.image}
                  alt={door.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-semibold text-[#6E5053] uppercase tracking-wider block">
                    {door.type}
                  </span>
                  <h3 className="font-serif text-lg font-medium text-[#3F2E2F] group-hover:text-[#6E5053] transition-colors line-clamp-1 mt-0.5">
                    {door.name}
                  </h3>
                  <p className="text-xs text-[#3F2E2F]/70 line-clamp-2 mt-1 leading-relaxed">
                    {door.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#CDAFB0]/20 flex items-center justify-between text-xs font-semibold text-[#6E5053]">
                  <span>Configure Options</span>
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
