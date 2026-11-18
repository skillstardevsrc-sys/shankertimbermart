import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Scissors, Ruler, ShieldCheck } from "lucide-react";
import { db } from "@/lib/db";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/ui/ProductCard";

export const metadata = {
  title: "Natural Timber Collection | Hardwood & Softwood in Coimbatore",
  description: "Authentic Burma Teak, African Teak, Mahogany, Padauk, Malaysian Sal, White Ash, and Oak timber logs and planed lumber at Shankar Timber Mart, Coimbatore.",
};

export const revalidate = 0;

export default async function TimberCategoryPage() {
  const allProducts = await db.products.getAll();
  const timberProducts = allProducts.filter((p) => p.category === "timber");

  const hardwoods = timberProducts.filter((p) => p.subcategory === "hardwood");
  const softwoods = timberProducts.filter((p) => p.subcategory === "softwood");

  return (
    <div className="bg-ivory min-h-screen py-8 lg:py-12">
      <div className="max-w-site mx-auto px-6">
        <Breadcrumbs
          items={[
            { label: "Products", href: "/products" },
            { label: "Timber Collection" },
          ]}
        />

        {/* Hero Header */}
        <div className="my-8 max-w-3xl space-y-4">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-timber">
            Natural Lumber & Sawn Logs
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-medium text-walnut tracking-tight">
            The Timber Collection
          </h1>
          <p className="text-base text-charcoal/80 leading-relaxed font-normal">
            Seasoned hardwood and imported softwood hand-selected for structural stability, grain elegance, and enduring weather resistance in Coimbatore&apos;s tropical climate.
          </p>
        </div>

        {/* Woodworking Services Banner */}
        <div className="p-6 bg-white rounded-card border border-sand-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-16">
          <div className="space-y-1">
            <h3 className="font-serif text-xl font-medium text-walnut">
              In-House Sizing, Planing & Rebating
            </h3>
            <p className="text-xs text-charcoal/70">
              Need custom 4-sided planed beams or frame sections? Our machines plane to exact millimeter tolerances.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/services#timber-planing"
              className="text-xs font-semibold text-timber hover:text-walnut inline-flex items-center gap-1.5"
            >
              <span>Explore Planing Services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/quote?category=Timber"
              className="px-4 py-2 bg-walnut hover:bg-walnut-700 text-ivory text-xs font-semibold uppercase tracking-wider rounded-button transition-colors"
            >
              Request Timber Rates
            </Link>
          </div>
        </div>

        {/* Hardwoods Section */}
        <div className="space-y-6 mb-16">
          <div className="border-b border-sand-200 pb-3">
            <h2 className="font-serif text-3xl font-medium text-walnut">
              Natural Hardwoods
            </h2>
            <p className="text-xs text-charcoal/60 mt-1">
              High density, exceptional termite resistance, and generational longevity (Teak, Sal, Padauk, Mahogany).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hardwoods.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Softwoods Section */}
        <div className="space-y-6">
          <div className="border-b border-sand-200 pb-3">
            <h2 className="font-serif text-3xl font-medium text-walnut">
              Architectural Softwoods & Pale Woods
            </h2>
            <p className="text-xs text-charcoal/60 mt-1">
              American White Ash, European White Oak, Steamed Beech, and Seasoned Pine for contemporary interiors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {softwoods.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
