import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Check, ArrowRight, Phone, MessageCircle } from "lucide-react";
import { SITE_SETTINGS } from "@/lib/constants";
import { formatWhatsAppMessage } from "@/lib/utils";

export const metadata = {
  title: "Woodworking & Joinery Services | Timber Planing, Cutting & Turnkey Interiors Coimbatore",
  description: "Specialized timber planing, 4-sided squaring, frame rebating, and turnkey home & office interior execution at Shankar Timber Mart, Coimbatore.",
};

export const revalidate = 0;

export default async function ServicesPage() {
  const services = await db.services.getAll();

  return (
    <div className="bg-ivory min-h-screen py-8 lg:py-12">
      <div className="max-w-site mx-auto px-6">
        <Breadcrumbs items={[{ label: "Services" }]} />

        {/* Hero Header */}
        <div className="my-8 max-w-3xl space-y-4">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-timber">
            Machinery & Craftsmanship
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-medium text-walnut tracking-tight">
            Beyond Materials. Complete Solutions.
          </h1>
          <p className="text-base text-charcoal/80 leading-relaxed font-normal">
            Equipped with industrial woodworking machinery, precision 4-sided planers, horizontal log band saws, and master craftsmen, Shankar Timber Mart delivers site-ready timber, custom door and window jamb frames, and turnkey interior fit-outs.
          </p>
        </div>

        {/* Services List */}
        <div className="space-y-16 my-16">
          {services.map((service, index) => {
            const isReversed = index % 2 === 1;
            return (
              <div
                key={service.id}
                id={service.slug}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white p-8 md:p-12 rounded-card border border-sand-200 shadow-card"
              >
                {/* Image */}
                <div
                  className={`lg:col-span-5 relative aspect-[16/10] rounded-card overflow-hidden bg-sand-200 ${
                    isReversed ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <Image
                    src={service.imageUrl}
                    alt={service.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div
                  className={`lg:col-span-7 space-y-5 ${
                    isReversed ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-timber">
                    Service 0{index + 1}
                  </span>
                  <h2 className="font-serif text-3xl font-medium text-walnut">
                    {service.title}
                  </h2>
                  <p className="text-sm text-charcoal/80 leading-relaxed font-normal">
                    {service.description}
                  </p>

                  {/* Benefits */}
                  {service.benefits && (
                    <div className="space-y-2 pt-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-walnut block">
                        Verified Advantages:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {service.benefits.map((benefit, bIdx) => (
                          <div key={bIdx} className="flex items-start gap-2 text-xs text-charcoal/70">
                            <Check className="w-4 h-4 text-olive shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTAs */}
                  <div className="pt-4 border-t border-sand-100 flex flex-wrap items-center gap-4">
                    <Link
                      href={`/quote?service=${encodeURIComponent(service.title)}`}
                      className="px-5 py-2.5 bg-walnut hover:bg-walnut-700 text-ivory text-xs font-semibold uppercase tracking-wider rounded-button transition-colors"
                    >
                      Enquire for Your Project
                    </Link>

                    <a
                      href={`https://wa.me/${SITE_SETTINGS.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                        `Hello Shankar Timber Mart, I would like to consult on ${service.title}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-sand-300 hover:bg-sand-50 text-walnut text-xs font-medium rounded-button transition-colors inline-flex items-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>WhatsApp Specialist</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Consultation Callout */}
        <div className="p-8 bg-walnut text-ivory rounded-card text-center space-y-4">
          <h3 className="font-serif text-3xl font-medium">Need Customized Woodworking for Your Architectural Drawing?</h3>
          <p className="text-sm text-ivory/80 max-w-xl mx-auto leading-relaxed">
            Send us your cut list, door schedules, or interior floor plans. Our technical joinery team will review tolerances and provide an itemized quote.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-timber hover:bg-timber-600 text-ivory text-xs font-semibold uppercase tracking-wider px-6 py-3.5 rounded-button transition-colors"
            >
              <span>Speak With Our Workshop Supervisor</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
