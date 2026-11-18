import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SITE_SETTINGS } from "@/lib/constants";

export const metadata = {
  title: "Terms & Conditions | Shankar Timber Mart",
  description: "Terms and conditions governing quotation, material supply, and showroom policies at Shankar Timber Mart.",
};

export default function TermsPage() {
  return (
    <div className="bg-ivory min-h-screen py-8 lg:py-12">
      <div className="max-w-site mx-auto px-6">
        <Breadcrumbs items={[{ label: "Terms & Conditions" }]} />

        <div className="max-w-3xl my-8 bg-white p-8 md:p-12 rounded-card border border-sand-200 shadow-card space-y-6">
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-walnut">
            Terms & Conditions
          </h1>
          <p className="text-xs text-charcoal/60">
            Last Updated: November 2026
          </p>

          <div className="space-y-4 text-sm text-charcoal/80 leading-relaxed">
            <h2 className="font-serif text-xl font-medium text-walnut pt-2">
              1. Quotations & Material Specifications
            </h2>
            <p>
              All online product listings, specifications, and brochure items are subject to timber stock availability and batch natural variations. Quotations generated through the website or over WhatsApp represent estimates based on initial client descriptions and are finalized upon physical inspection of site requirements or technical cut lists.
            </p>

            <h2 className="font-serif text-xl font-medium text-walnut pt-2">
              2. Natural Timber Characteristics
            </h2>
            <p>
              Timber is an authentic biological material. Natural variations in grain, color tone, annual rings, and small knots are inherent characteristics of real wood and confirm its genuineness rather than a defect.
            </p>

            <h2 className="font-serif text-xl font-medium text-walnut pt-2">
              3. Custom Cutting & Planing Work
            </h2>
            <p>
              Timber cut or planed to customer-specified non-standard dimensions cannot be returned or cancelled once woodworking operations have commenced. We advise checking site opening measurements prior to confirming custom frame profiles.
            </p>

            <h2 className="font-serif text-xl font-medium text-walnut pt-2">
              4. Governing Jurisdiction
            </h2>
            <p>
              All transactions, commercial contracts, and supply agreements are governed by the laws of India, subject to the jurisdiction of the courts of Coimbatore, Tamil Nadu.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
