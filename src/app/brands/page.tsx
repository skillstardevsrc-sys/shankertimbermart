import Link from "next/link";
import { db } from "@/lib/db";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ExternalLink, ArrowRight, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Associated Brands | CenturyPly, Fenesta, Greenply, Royal Touch Coimbatore",
  description: "Explore the premium plywood, laminates, surfaces, and window brands associated with Shankar Timber Mart, Coimbatore.",
};

export const revalidate = 0;

export default async function BrandsPage() {
  const brands = await db.brands.getAll();

  return (
    <div className="bg-ivory min-h-screen py-8 lg:py-12">
      <div className="max-w-site mx-auto px-6">
        <Breadcrumbs items={[{ label: "Associated Brands" }]} />

        {/* Hero Header */}
        <div className="my-8 max-w-3xl space-y-4">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-timber">
            Brochure Brand Associations
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-medium text-walnut tracking-tight">
            Trusted Names. Better Spaces.
          </h1>
          <p className="text-base text-charcoal/80 leading-relaxed font-normal">
            We source and stock proven architectural materials from India and international leading manufacturers. Every brand featured in our brochure represents high quality, reliable warranties, and certified standards.
          </p>
        </div>

        {/* Brand Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-12">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="bg-white p-8 rounded-card border border-sand-200 shadow-card hover:shadow-hover transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-full bg-ivory-100 flex items-center justify-center text-timber font-serif text-2xl font-bold border border-sand-200">
                    {brand.name.charAt(0)}
                  </div>
                  <span className="text-[11px] font-semibold text-timber uppercase tracking-wider bg-sand-100 px-2.5 py-1 rounded-sm">
                    {brand.category}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-2xl font-medium text-walnut">
                    {brand.name}
                  </h3>
                  {brand.description && (
                    <p className="text-xs text-charcoal/70 mt-2 leading-relaxed">
                      {brand.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-sand-100 flex items-center justify-between text-xs">
                <Link
                  href={`/quote?brand=${encodeURIComponent(brand.name)}`}
                  className="font-semibold text-walnut hover:text-timber inline-flex items-center gap-1 transition-colors"
                >
                  <span>Enquire Brand Products</span>
                  <ArrowRight className="w-3.5 h-3.5 text-timber" />
                </Link>

                {brand.websiteUrl && (
                  <a
                    href={brand.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-charcoal/40 hover:text-charcoal transition-colors"
                    title={`Visit official ${brand.name} site`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Association Clarification Note */}
        <div className="p-6 bg-ivory-100 rounded-card border border-sand-200 text-xs text-charcoal/70 text-center max-w-2xl mx-auto leading-relaxed">
          <p>
            Brand names and trademarks displayed are the property of their respective owners and appear as listed in Shankar Timber Mart&apos;s product brochure for material availability and cataloging purposes.
          </p>
        </div>
      </div>
    </div>
  );
}
