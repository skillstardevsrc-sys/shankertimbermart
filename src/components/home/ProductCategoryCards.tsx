import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WoodPatternBackground } from "@/components/ui/WoodPatternBackground";

const CATEGORIES = [
  {
    title: "Timber Collection",
    subtitle: "Hardwood & Softwood",
    description: "Burma Teak, African Teak, Mahogany, Padauk, Malaysian Sal, White Ash, and Oak lumber.",
    image: "https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?w=800&auto=format&fit=crop&q=80",
    href: "/products/timber",
  },
  {
    title: "Plywood & MDF",
    subtitle: "Engineered Panels",
    description: "IS:710 Marine BWP plywood, Russian Birch, PVC boards, and pre-laminated high-density MDF.",
    image: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=800&auto=format&fit=crop&q=80",
    href: "/products/plywood-mdf",
  },
  {
    title: "Designer Doors",
    subtitle: "Veneer, Lam & Membrane",
    description: "Natural hand-selected veneer doors, laminated flush doors, and solid internal passage doors.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80",
    href: "/products/doors-wpc",
  },
  {
    title: "Windows & Fenesta",
    subtitle: "uPVC & Slim Aluminium",
    description: "Engineered multi-chamber acoustic uPVC and architectural slim-sightline aluminium windows.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
    href: "/products/windows-fenesta",
  },
  {
    title: "Solid WPC Solutions",
    subtitle: "100% Waterproof & Termite-Proof",
    description: "Composite doors and heavy jamb frames impervious to water for bathrooms and wet utilities.",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop&q=80",
    href: "/products/doors-wpc?sub=wpc",
  },
  {
    title: "Modular Interiors",
    subtitle: "Kitchens & Wardrobes",
    description: "Turnkey modular kitchens with marine plywood carcasses, walk-in wardrobes, and TV feature walls.",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80",
    href: "/products/modular-interiors",
  },
];

export function ProductCategoryCards() {
  return (
    <section className="py-20 lg:py-28 bg-ivory-100/70 border-t border-b border-sand-200 relative overflow-hidden">
      {/* Unified Aesthetic Wood Growth Rings Background */}
      <WoodPatternBackground opacity="opacity-[0.07]" />

      <div className="relative z-10 max-w-site mx-auto px-6">
        <SectionHeading
          tagline="Comprehensive Catalogue"
          title="Everything Your Space Needs."
          subtitle="From structural foundation timber and certified marine panels to luxury finish doors and precision windows."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="group relative bg-white rounded-3xl p-3 sm:p-4 shadow-card hover:shadow-hover transition-all duration-300 border border-sand-200/90 flex flex-col hover:-translate-y-1"
            >
              {/* Sculpted Inset Curved Image Frame */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-sand-200">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-walnut/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Micro Category Pill */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase text-walnut shadow-sm border border-white/40">
                  {cat.subtitle}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-2xl font-medium text-walnut group-hover:text-timber transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal/70 mt-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-sand-100 flex items-center justify-between text-xs font-semibold text-walnut group-hover:text-timber transition-colors">
                  <span className="px-3.5 py-1.5 rounded-full bg-ivory-100 group-hover:bg-sand-100 transition-colors">
                    Explore Collection
                  </span>
                  <div className="w-8 h-8 rounded-full bg-sand-100 group-hover:bg-timber group-hover:text-ivory transition-colors flex items-center justify-center text-timber">
                    <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
