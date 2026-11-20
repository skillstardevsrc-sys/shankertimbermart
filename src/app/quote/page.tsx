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
