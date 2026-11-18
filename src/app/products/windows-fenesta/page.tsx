import Link from "next/link";
import { db } from "@/lib/db";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductCard } from "@/components/ui/ProductCard";
import { VolumeX, Shield, Sun, Wind, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Windows & Fenesta Showcase | uPVC & Slim Aluminium Windows Coimbatore",
  description: "Acoustic and thermal engineered uPVC and slimline aluminium windows and doors at Shankar Timber Mart, Coimbatore.",
};

export const revalidate = 0;

export default async function WindowsFenestaPage() {
  const allProducts = await db.products.getAll();
  const windowProducts = allProducts.filter((p) => p.category === "windows");

  return (
    <div className="bg-ivory min-h-screen py-8 lg:py-12">
      <div className="max-w-site mx-auto px-6">
        <Breadcrumbs
          items={[
            { label: "Products", href: "/products" },
            { label: "Windows & Fenesta" },
          ]}
        />

        {/* Hero Header */}
        <div className="my-8 max-w-3xl space-y-4">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-timber">
            Architectural Glazing Systems
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-medium text-walnut tracking-tight">
            Windows & Fenesta Showcase
          </h1>
          <p className="text-base text-charcoal/80 leading-relaxed font-normal">
            Precision-engineered uPVC multi-chambered window profiles and slimline aluminium sliding systems designed for acoustic isolation, thermal energy conservation, and weather sealing.
          </p>
        </div>

        {/* Association Callout */}
        <div className="p-6 bg-white rounded-card border border-sand-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
          <div>
            <span className="text-[10px] tracking-wider uppercase font-semibold text-timber block mb-1">
              Brochure Brand Association
            </span>
            <h3 className="font-serif text-2xl font-medium text-walnut">
              Fenesta Engineered Windows & Doors
            </h3>
            <p className="text-xs text-charcoal/70 mt-1">
              Consult with Shankar Timber Mart for Fenesta engineered systems, custom sizing schedules, and installation consultation.
            </p>
          </div>
          <Link
            href="/quote?category=Windows"
            className="px-5 py-2.5 bg-walnut hover:bg-walnut-700 text-ivory text-xs font-semibold uppercase tracking-wider rounded-button transition-colors whitespace-nowrap"
          >
            Get Window Schedule Quote
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {windowProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
