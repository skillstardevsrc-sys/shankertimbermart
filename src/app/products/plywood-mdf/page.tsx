import Link from "next/link";
import { db } from "@/lib/db";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/ui/ProductCard";
import { ShieldCheck, Check, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Plywood & MDF Panels | BWP Marine 710, Russian Birch, MR Plywood Coimbatore",
  description: "Explore IS:710 certified marine plywood, Russian Birch multi-ply, shuttering plywood, and prelam MDF boards at Shankar Timber Mart, Coimbatore.",
};

export const revalidate = 0;

export default async function PlywoodMdfPage() {
  const allProducts = await db.products.getAll();
  const plywoodProducts = allProducts.filter((p) => p.category === "plywood-mdf");

  return (
    <div className="bg-ivory min-h-screen py-8 lg:py-12">
      <div className="max-w-site mx-auto px-6">
        <Breadcrumbs
          items={[
            { label: "Products", href: "/products" },
            { label: "Plywood & MDF" },
          ]}
        />

        {/* Hero Header */}
        <div className="my-8 max-w-3xl space-y-4">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-timber">
            Engineered Wood Panels & Boards
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-medium text-walnut tracking-tight">
            Plywood & MDF Collection
          </h1>
          <p className="text-base text-charcoal/80 leading-relaxed font-normal">
            Certified IS:710 Boiling Waterproof (BWP) marine plywood, architectural multi-ply Russian Birch, commercial MR panels, and high-density MDF boards from leading manufacturers including CenturyPly and Greenply.
          </p>
        </div>

        {/* Standards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 bg-white rounded-card border border-sand-200 shadow-sm space-y-2">
            <ShieldCheck className="w-6 h-6 text-olive" />
            <h4 className="font-serif text-xl font-medium text-walnut">IS:710 Marine Grade</h4>
            <p className="text-xs text-charcoal/70 leading-relaxed">
              Tested for 72+ hours boiling water resistance. 100% fortified phenolic resin bonding for wet kitchen and bath areas.
            </p>
          </div>

          <div className="p-6 bg-white rounded-card border border-sand-200 shadow-sm space-y-2">
            <Check className="w-6 h-6 text-timber" />
            <h4 className="font-serif text-xl font-medium text-walnut">Architectural Russian Birch</h4>
            <p className="text-xs text-charcoal/70 leading-relaxed">
              Solid multi-layered birch plies with void-free cores, designed for exposed edge cabinetry and CNC perforated acoustics.
            </p>
          </div>

          <div className="p-6 bg-white rounded-card border border-sand-200 shadow-sm space-y-2">
            <Check className="w-6 h-6 text-walnut" />
            <h4 className="font-serif text-xl font-medium text-walnut">Contractor Formwork Ply</h4>
            <p className="text-xs text-charcoal/70 leading-relaxed">
              Heavy-duty film-faced shuttering plywood engineered for multiple repetition cycles and mirror concrete finishes.
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {plywoodProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 p-8 bg-walnut text-ivory rounded-card flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-serif text-2xl font-medium">Need Bulk Commercial Plywood Quotation?</h3>
            <p className="text-xs text-sand-200">Submit your Bill of Quantities for site delivery in Coimbatore and surrounding districts.</p>
          </div>
          <Link
            href="/quote?category=Plywood%20%26%20MDF"
            className="px-6 py-3 bg-timber hover:bg-timber-600 text-ivory text-xs font-semibold uppercase tracking-wider rounded-button transition-colors whitespace-nowrap"
          >
            Get Plywood Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
