import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Sliders } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { EnquiryForm } from "@/components/ui/EnquiryForm";
import { CustomerType } from "@/lib/types";

export const metadata = {
  title: "Get a Quote | Material Estimations & Quantity Requirements",
  description: "Request customized quotes for timber, BWP marine plywood, designer doors, Fenesta windows, and modular interiors in Coimbatore.",
};

interface QuotePageProps {
  searchParams: {
    product?: string;
    category?: string;
    cat?: string;
    type?: string;
    service?: string;
    brand?: string;
  };
}

export default function QuotePage({ searchParams }: QuotePageProps) {
  const initialProduct = searchParams.product || searchParams.service || searchParams.brand || "";
  const initialCategory = searchParams.category || searchParams.cat || "Timber";
  const initialType = (searchParams.type as CustomerType) || "Homeowner";

  return (
    <div className="bg-ivory min-h-screen py-8 lg:py-12">
      <div className="max-w-site mx-auto px-6">
        <Breadcrumbs items={[{ label: "Get a Quote" }]} />

        {/* Visual Configurator Promo Banner */}
        <div className="my-8 rounded-2xl bg-walnut text-ivory p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border border-sand-400/20 shadow-luxury">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand-400/20 text-sand-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-timber" />
              <span>Visual Guided Selection</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-ivory">
              Need custom dimensions, materials &amp; designs?
            </h2>
            <p className="text-xs sm:text-sm text-ivory/80 leading-relaxed">
              Use our interactive Product Configurator to select materials, choose designs, enter custom dimensions, and build a multi-item enquiry schedule.
            </p>
          </div>
          <Link
            href="/configurator"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-timber hover:bg-timber-600 text-ivory text-xs uppercase tracking-wider font-semibold shadow-md transition-all hover:scale-105"
          >
            <span>Launch Configurator</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="my-8 max-w-2xl space-y-3">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-timber">
            Direct Material Estimation
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-medium text-walnut tracking-tight">
            Request Material Specifications & Quotation
          </h1>
          <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed font-normal">
            Whether you require standard stock dimensions or customized joinery sizing, our quotation team will compile availability, verified specifications, and transparent rates.
          </p>
        </div>

        <div className="max-w-3xl my-10">
          <Suspense fallback={<div className="p-8 text-center">Loading quote form...</div>}>
            <EnquiryForm
              initialProduct={initialProduct}
              initialCategory={initialCategory}
              initialCustomerType={initialType}
              title="Project Quotation Form"
              subtitle="Please provide accurate dimensions or quantities so we can calculate exact material schedules."
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
