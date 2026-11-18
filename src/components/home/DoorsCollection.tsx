import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WoodPatternBackground } from "@/components/ui/WoodPatternBackground";

const DOOR_ITEMS = [
  {
    name: "Natural Wood Veneer Doors",
    type: "Hand-Matched Exotic Veneers",
    desc: "Single piece sliced Teak, Walnut and Oak veneers pressed over solid core frames.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80",
    slug: "designer-veneer-doors",
  },
  {
    name: "High-Pressure Lam Doors",
    type: "Scratch & Stain Resistant HPL",
    desc: "1mm decorative laminate surfaces offering zero polish maintenance and impact durability.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80",
    slug: "heavy-duty-lam-doors",
  },
  {
    name: "Veneer Fold & Membrane Doors",
    type: "Seamless 3D PVC Wrapped",
    desc: "CNC routed contemporary designs vacuum membrane wrapped for flawless water-resistant edges.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80",
    slug: "membrane-and-veneer-fold-doors",
  },
  {
    name: "Solid WPC Composite Doors",
    type: "100% Termite & Waterproof",
    desc: "Virgin polymer and wood powder composite ideal for bathrooms, toilets, and balconies.",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop&q=80",
    slug: "wpc-doors-and-frames-collection",
  },
];

export function DoorsCollection() {
  return (
    <section className="py-20 lg:py-28 bg-ivory-100/70 border-t border-b border-sand-200 relative overflow-hidden">
      {/* Unified Aesthetic Wood Growth Rings Background */}
      <WoodPatternBackground opacity="opacity-[0.07]" />

      <div className="relative z-10 max-w-site mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeading
            tagline="Doors & Entrances"
            title="An Entrance That Makes a Statement."
            subtitle="Architectural doors engineered for dimensional rigidity, tactile warmth, and enduring security."
            className="mb-0"
          />

          <Link
            href="/products/doors-wpc"
            className="inline-flex items-center gap-2 bg-walnut hover:bg-walnut-700 text-ivory text-xs font-semibold uppercase tracking-wider px-7 py-3.5 rounded-full transition-all duration-300 shadow-sm self-start md:self-end"
          >
            <span>Explore Door Collection</span>
            <ArrowRight className="w-4 h-4 text-sand-300" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DOOR_ITEMS.map((door) => (
            <Link
              key={door.name}
              href={`/products/${door.slug}`}
              className="group bg-white rounded-3xl p-3 shadow-card border border-sand-200/90 flex flex-col hover:shadow-hover hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-sand-200">
                <Image
                  src={door.image}
                  alt={door.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-walnut/75 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                <div className="absolute bottom-3 left-3 right-3 text-ivory">
                  <span className="inline-block px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] tracking-wider uppercase font-semibold text-sand-200 border border-white/20">
                    {door.type}
                  </span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-serif text-xl font-medium text-walnut group-hover:text-timber transition-colors">
                    {door.name}
                  </h3>
                  <p className="text-xs text-charcoal/70 mt-1.5 line-clamp-2 leading-relaxed">
                    {door.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-sand-100 flex items-center justify-between text-xs font-semibold text-timber group-hover:text-walnut transition-colors">
                  <span>View Details</span>
                  <div className="w-7 h-7 rounded-full bg-sand-100 group-hover:bg-timber group-hover:text-ivory transition-colors flex items-center justify-center">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
