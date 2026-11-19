import Link from "next/link";
import { ArrowRight, Sparkles, Layers, Sliders } from "lucide-react";
import { db } from "@/lib/db";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCatalogView } from "@/components/products/ProductCatalogView";

export const metadata = {
  title: "Products Catalogue | Timber, Plywood, Doors, Windows & Interiors",
  description: "Browse Shankar Timber Mart's complete range of Burma Teak, natural hardwoods, BWP 710 marine plywood, designer veneer doors, uPVC windows, and modular interiors in Coimbatore.",
};

export const revalidate = 0;

export default async function ProductsPage() {
  const products = await db.products.getAll();

  return (
    <div className="bg-ivory min-h-screen py-8 lg:py-12">
      <div className="max-w-site mx-auto px-6">
        <Breadcrumbs items={[{ label: "Products Catalogue" }]} />

        {/* PROMINENT CONFIGURATOR HERO BANNER */}
        <div className="my-8 rounded-2xl bg-walnut text-ivory p-6 sm:p-8 lg:p-10 shadow-luxury relative overflow-hidden border border-walnut-700">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sand-400/20 border border-sand-400/40 text-sand-300 text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-timber" />
              <span>Interactive Configurator & Quotation System</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-ivory leading-tight">
              Customise Doors, Windows, Timber &amp; Interiors
            </h2>
            <p className="text-sm sm:text-base text-ivory/80 leading-relaxed font-normal">
              Select your product category, choose compatible materials, pick architectural design patterns, and enter custom millwork dimensions to receive an official Shankar Timber Mart quotation.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/configurator"
                className="inline-flex items-center gap-2 bg-timber hover:bg-timber-600 text-ivory text-xs uppercase tracking-wider font-semibold px-6 py-3.5 rounded-full shadow-hover transition-all duration-300 hover:scale-[1.02]"
              >
                <span>Launch Product Configurator</span>
                <ArrowRight className="w-4 h-4 text-ivory" />
              </Link>
            </div>
          </div>
        </div>

        <div className="my-8">
          <SectionHeading
            tagline="Materials Showroom"
            title="Architectural Materials Catalogue"
            subtitle="Explore hand-inspected timber, certified marine plywood, designer doors, acoustic windows, and custom modular solutions."
            className="mb-8"
          />
        </div>

        <ProductCatalogView initialProducts={products} />
      </div>
    </div>
  );
}
