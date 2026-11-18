import Link from "next/link";
import { db } from "@/lib/db";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductCard } from "@/components/ui/ProductCard";
import { Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Modular Interiors & Kitchens | Bespoke Joinery Coimbatore",
  description: "Turnkey modular kitchens, custom walk-in wardrobes, TV consoles, and complete interior execution at Shankar Timber Mart, Coimbatore.",
};

export const revalidate = 0;

export default async function ModularInteriorsPage() {
  const allProducts = await db.products.getAll();
  const interiorProducts = allProducts.filter((p) => p.category === "modular-interiors");

  return (
    <div className="bg-ivory min-h-screen py-8 lg:py-12">
      <div className="max-w-site mx-auto px-6">
        <Breadcrumbs
          items={[
            { label: "Products", href: "/products" },
            { label: "Modular Interiors" },
          ]}
        />

        {/* Hero Header */}
        <div className="my-8 max-w-3xl space-y-4">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-timber">
            Bespoke Living & Working Spaces
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-medium text-walnut tracking-tight">
            Modular Interiors & Kitchens
          </h1>
          <p className="text-base text-charcoal/80 leading-relaxed font-normal">
            Every module is crafted upon a 100% waterproof BWP marine plywood carcass, fitted with German hardware mechanisms, and surfaced in anti-scratch acrylics, matte lacquers, or bookmatched natural veneers.
          </p>
        </div>

        {/* Value Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 bg-white rounded-card border border-sand-200 shadow-sm space-y-2">
            <CheckCircle2 className="w-6 h-6 text-olive" />
            <h4 className="font-serif text-xl font-medium text-walnut">Zero Water Damage Guarantee</h4>
            <p className="text-xs text-charcoal/70 leading-relaxed">
              Base carcasses fabricated strictly in certified BWP 710 marine plywood, completely immune to moisture under sinks and wet counters.
            </p>
          </div>

          <div className="p-6 bg-white rounded-card border border-sand-200 shadow-sm space-y-2">
            <CheckCircle2 className="w-6 h-6 text-timber" />
            <h4 className="font-serif text-xl font-medium text-walnut">Precision Factory Joinery</h4>
            <p className="text-xs text-charcoal/70 leading-relaxed">
              Industrial CNC milling and edge banding prevent peeling, chipping, or misalignment over years of daily usage.
            </p>
          </div>

          <div className="p-6 bg-white rounded-card border border-sand-200 shadow-sm space-y-2">
            <CheckCircle2 className="w-6 h-6 text-walnut" />
            <h4 className="font-serif text-xl font-medium text-walnut">Turnkey Site Accountability</h4>
            <p className="text-xs text-charcoal/70 leading-relaxed">
              From architectural drawings to final white-glove site installation, Shankar Timber Mart manages end-to-end craftsmanship.
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {interiorProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
