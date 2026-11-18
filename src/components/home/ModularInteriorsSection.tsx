import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const INTERIOR_SERVICES = [
  {
    title: "Modular Kitchens",
    desc: "100% waterproof BWP marine plywood carcass with German soft-close mechanisms, acrylic finishes, and quartz countertops.",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80",
    href: "/products/modular-interiors?sub=kitchens",
  },
  {
    title: "Walk-In & Sliding Wardrobes",
    desc: "Floor-to-ceiling profiles with integrated warm LED sensors, velvet vanity trays, and fluted glass panels.",
    image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=800&auto=format&fit=crop&q=80",
    href: "/products/modular-interiors?sub=wardrobes",
  },
  {
    title: "Living & TV Feature Consoles",
    desc: "Floating credenzas with hidden wiring chases, acoustic fluted timber battens, and marble laminate feature walls.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
    href: "/products/modular-interiors?sub=tv-units",
  },
  {
    title: "Turnkey Home & Office Execution",
    desc: "End-to-end material sourcing, precision cutting, factory manufacturing, and white-glove site installation.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80",
    href: "/products/modular-interiors?sub=turnkey",
  },
];

export function ModularInteriorsSection() {
  return (
    <section className="py-20 lg:py-28 bg-walnut text-ivory">
      <div className="max-w-site mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <SectionHeading
            tagline="Turnkey Interior Architecture"
            title="Thoughtfully Designed. Beautifully Lived."
            subtitle="Custom modular cabinetry and turnkey interior spaces built upon certified marine plywood and master-grade wood joinery."
            light
            className="mb-0"
          />

          <Link
            href="/products/modular-interiors"
            className="inline-flex items-center gap-2 bg-timber hover:bg-timber-600 text-ivory text-xs font-semibold uppercase tracking-wider px-7 py-3.5 rounded-full transition-all duration-300 self-start md:self-end shadow-md"
          >
            <span>Explore Interior Solutions</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {INTERIOR_SERVICES.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group bg-walnut-700/50 rounded-3xl p-3 sm:p-4 border border-walnut-600/70 hover:border-sand-400/50 hover:bg-walnut-700/80 transition-all duration-300 flex flex-col hover:-translate-y-1 shadow-card"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-walnut-800">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-walnut via-transparent to-transparent opacity-85" />
                <div className="absolute bottom-4 left-5 right-5">
                  <h3 className="font-serif text-2xl lg:text-3xl font-medium text-ivory group-hover:text-sand-300 transition-colors">
                    {item.title}
                  </h3>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs sm:text-sm text-ivory/70 leading-relaxed">
                  {item.desc}
                </p>

                <div className="pt-3 border-t border-walnut-600/60 flex items-center justify-between text-xs font-semibold text-sand-300 group-hover:text-ivory transition-colors">
                  <span className="px-3.5 py-1.5 rounded-full bg-walnut-800/80 border border-walnut-600/60">
                    View Configuration Details
                  </span>
                  <div className="w-8 h-8 rounded-full bg-sand-400/15 group-hover:bg-sand-400/30 flex items-center justify-center transition-colors">
                    <ArrowRight className="w-4 h-4" />
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
