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
