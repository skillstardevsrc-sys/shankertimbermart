import Link from "next/link";
import { db } from "@/lib/db";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductCard } from "@/components/ui/ProductCard";
import { Shield, Sparkles, Droplets } from "lucide-react";

export const metadata = {
  title: "Designer Doors & WPC Systems | Veneer, Lam & Waterproof Doors Coimbatore",
  description: "Exquisite natural wood veneer entrance doors, laminated flush doors, and 100% waterproof WPC composite doors & frames at Shankar Timber Mart, Coimbatore.",
};

export const revalidate = 0;

export default async function DoorsWpcPage() {
  const allProducts = await db.products.getAll();
  const doorProducts = allProducts.filter((p) => p.category === "doors" || p.category === "wpc");

  return (
    <div className="bg-ivory min-h-screen py-8 lg:py-12">
      <div className="max-w-site mx-auto px-6">
        <Breadcrumbs
          items={[
            { label: "Products", href: "/products" },
            { label: "Doors & WPC Systems" },
          ]}
        />

        {/* Hero Header */}
        <div className="my-8 max-w-3xl space-y-4">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-timber">
            Entrances & Interior Partitions
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-medium text-walnut tracking-tight">
            Doors & WPC Collection
          </h1>
          <p className="text-base text-charcoal/80 leading-relaxed font-normal">
            From monumental natural wood veneer pivot entrance doors to zero-maintenance laminated doors and 100% waterproof solid WPC composite frames for wet zones.
          </p>
        </div>

        {/* Technology Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 bg-white rounded-card border border-sand-200 shadow-sm space-y-2">
            <Sparkles className="w-6 h-6 text-timber" />
            <h4 className="font-serif text-xl font-medium text-walnut">Book-Matched Veneers</h4>
            <p className="text-xs text-charcoal/70 leading-relaxed">
              Hand-sliced natural wood veneers finished with protective international polyurethane coats for velvet touch and UV depth.
            </p>
          </div>

          <div className="p-6 bg-white rounded-card border border-sand-200 shadow-sm space-y-2">
            <Droplets className="w-6 h-6 text-olive" />
            <h4 className="font-serif text-xl font-medium text-walnut">100% Waterproof WPC</h4>
            <p className="text-xs text-charcoal/70 leading-relaxed">
              Composite extruded doors and frames immune to termite infestation, warping, and swelling even when submerged in water.
            </p>
          </div>

          <div className="p-6 bg-white rounded-card border border-sand-200 shadow-sm space-y-2">
            <Shield className="w-6 h-6 text-walnut" />
            <h4 className="font-serif text-xl font-medium text-walnut">Precision CNC Mortising</h4>
            <p className="text-xs text-charcoal/70 leading-relaxed">
              Doors pre-machined for concealed hinges, magnetic architectural latches, and multi-point smart locks to avoid site damage.
            </p>
          </div>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {doorProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
