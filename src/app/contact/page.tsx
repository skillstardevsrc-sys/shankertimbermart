import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { EnquiryForm } from "@/components/ui/EnquiryForm";
import { SITE_SETTINGS } from "@/lib/constants";
import { formatWhatsAppMessage } from "@/lib/utils";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

export const metadata = {
  title: "Contact Us & Showroom Location | Shankar Timber Mart Coimbatore",
  description: "Visit Shankar Timber Mart at 178-C, Mettupalayam Road, Coimbatore. Call +91 94430 42244 or send an online enquiry for timber and interior solutions.",
};

export default function ContactPage() {
  const cleanNumber = SITE_SETTINGS.whatsappNumber.replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${formatWhatsAppMessage()}`;

  return (
    <div className="bg-ivory min-h-screen py-8 lg:py-12">
      <div className="max-w-site mx-auto px-6">
        <Breadcrumbs items={[{ label: "Contact Us" }]} />

        {/* Hero Header */}
        <div className="my-8 max-w-3xl space-y-4">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-timber">
            Coimbatore Showroom & Enquiries
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-medium text-walnut tracking-tight">
            Connect With Our Materials Team
          </h1>
          <p className="text-base text-charcoal/80 leading-relaxed font-normal">
            Whether you are building a private residence, planning a turnkey interior, or procuring bulk shuttering plywood, our team on Mettupalayam Road is ready to assist.
          </p>
        </div>

        {/* Main Grid: Details + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 my-12 items-start">
          {/* Left Column: Direct Contact Info & Showroom Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-8 rounded-card border border-sand-200 shadow-card space-y-6">
              <h2 className="font-serif text-2xl font-medium text-walnut border-b border-sand-100 pb-3">
                Showroom Details
              </h2>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-timber shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-walnut block">Physical Address:</strong>
                    <span className="text-charcoal/80">
                      {SITE_SETTINGS.address},<br />
                      {SITE_SETTINGS.city}, {SITE_SETTINGS.state},<br />
                      {SITE_SETTINGS.country} – {SITE_SETTINGS.pincode}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-timber shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-walnut block">Telephone & Mobile:</strong>
                    <a
                      href={`tel:${SITE_SETTINGS.phone}`}
                      className="text-charcoal/80 hover:text-timber transition-colors block"
                    >
                      {SITE_SETTINGS.phone}
                    </a>
                    {SITE_SETTINGS.alternatePhone && (
                      <a
                        href={`tel:${SITE_SETTINGS.alternatePhone}`}
                        className="text-charcoal/80 hover:text-timber transition-colors block"
                      >
                        {SITE_SETTINGS.alternatePhone}
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-timber shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-walnut block">Email Inquiries:</strong>
                    <a
                      href={`mailto:${SITE_SETTINGS.email}`}
                      className="text-charcoal/80 hover:text-timber transition-colors"
                    >
                      {SITE_SETTINGS.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-timber shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-walnut block">Operating Hours:</strong>
                    <span className="text-charcoal/80">
                      {SITE_SETTINGS.openingHours}
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Action */}
              <div className="pt-4 border-t border-sand-100">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold uppercase tracking-wider rounded-button shadow-sm transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Start Live WhatsApp Chat</span>
                </a>
              </div>
            </div>

            {/* Google Maps Embed Container */}
            <div className="bg-white rounded-card border border-sand-200 overflow-hidden shadow-card">
              <div className="p-4 bg-ivory-100 border-b border-sand-200 text-xs font-semibold text-walnut uppercase tracking-wider flex items-center justify-between">
                <span>Showroom Location Map</span>
                <span className="text-timber">Coimbatore</span>
              </div>
              <div className="aspect-[4/3] w-full bg-sand-100 relative">
                <iframe
                  title="Shankar Timber Mart Location"
                  src="https://maps.google.com/maps?q=11.023456,76.945678&hl=en&z=15&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Lead Contact Form */}
          <div className="lg:col-span-7">
            <EnquiryForm
              title="Send Us Your Project Requirements"
              subtitle="Fill out this form and our technical desk will get in touch with you promptly."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
