import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SITE_SETTINGS } from "@/lib/constants";

export const metadata = {
  title: "Privacy Policy | Shankar Timber Mart",
  description: "Privacy policy and customer data handling practices for Shankar Timber Mart.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-ivory min-h-screen py-8 lg:py-12">
      <div className="max-w-site mx-auto px-6">
        <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

        <div className="max-w-3xl my-8 bg-white p-8 md:p-12 rounded-card border border-sand-200 shadow-card space-y-6">
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-walnut">
            Privacy Policy
          </h1>
          <p className="text-xs text-charcoal/60">
            Last Updated: November 2026
          </p>

          <div className="space-y-4 text-sm text-charcoal/80 leading-relaxed">
            <h2 className="font-serif text-xl font-medium text-walnut pt-2">
              1. Information Collection
            </h2>
            <p>
              Shankar Timber Mart collects contact and architectural project details submitted voluntarily through our enquiry forms, quotation requests, and direct communications (such as full name, phone number, email address, project location, customer category, and estimated material requirements).
            </p>

            <h2 className="font-serif text-xl font-medium text-walnut pt-2">
              2. Use of Information
            </h2>
            <p>
              We use your submitted information exclusively to:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Process and calculate timber, door, window, and interior quotations.</li>
              <li>Coordinate material deliveries and sample viewings at our Coimbatore showroom.</li>
              <li>Provide technical material guidance and timber specification sheets.</li>
              <li>Maintain customer service records and order history.</li>
            </ul>

            <h2 className="font-serif text-xl font-medium text-walnut pt-2">
              3. Protection of Customer Data
            </h2>
            <p>
              We maintain reasonable technical and organizational protections to secure customer inquiries. We never sell, rent, or trade your contact information to third-party marketing entities.
            </p>

            <h2 className="font-serif text-xl font-medium text-walnut pt-2">
              4. Contact for Privacy Matters
            </h2>
            <p>
              For questions regarding customer data or to request deletion of your inquiry records, please reach us directly at {SITE_SETTINGS.email} or visit our showroom at {SITE_SETTINGS.address}, {SITE_SETTINGS.city}, Tamil Nadu, India.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
