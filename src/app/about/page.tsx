import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, MapPin, Compass, Sparkles } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE_SETTINGS } from "@/lib/constants";

export const metadata = {
  title: "About Us | Shankar Timber Mart Coimbatore",
  description: "Learn about Shankar Timber Mart's legacy, craftsmanship standards, and dedication to architectural timber and interior solutions in Coimbatore.",
};

export default function AboutPage() {
  return (
    <div className="bg-ivory min-h-screen">
      {/* Header Banner */}
      <section className="bg-walnut text-ivory py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?w=1920&auto=format&fit=crop&q=80"
            alt="Timber craftsmanship background"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-walnut via-walnut/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-site mx-auto px-6">
          <Breadcrumbs items={[{ label: "About Us" }]} />
          <div className="max-w-2xl space-y-4 mt-6">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-sand-300">
              Shankar Timber Mart
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-ivory leading-[1.1]">
              Crafting Spaces. <br />
              <span className="italic font-normal text-sand-300">Defining Living.</span>
            </h1>
            <p className="text-base sm:text-lg text-ivory/80 leading-relaxed font-normal">
              A premium destination for architectural timber, verified marine plywood, designer doors, engineered windows, and turnkey interior solutions in Coimbatore.
            </p>
          </div>
        </div>
      </section>

      {/* Heritage & Purpose */}
      <section className="py-20 lg:py-28 max-w-site mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <SectionHeading
              tagline="Our Philosophy"
              title="Built on Genuine Timber & Architectural Integrity."
              subtitle="We believe building a home or commercial landmark begins with authentic materials that respect nature and withstand time."
              className="mb-0"
            />
            <p className="text-sm text-charcoal/80 leading-relaxed">
              Situated prominently at 178-C, Mettupalayam Road, Coimbatore, Shankar Timber Mart was conceived as more than a standard building materials supplier. Our showroom is curated for architects, builders, and discerning homeowners who value material truth.
            </p>
            <p className="text-sm text-charcoal/80 leading-relaxed">
              We eliminate the uncertainty often associated with timber sourcing. Every log of Burma Teak, every stack of Malaysian Sal, and every sheet of BWP marine plywood is selected, measured, and verified before it reaches your job site.
            </p>

            <div className="pt-4 space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-olive shrink-0 mt-0.5" />
                <span className="text-sm text-charcoal/80">
                  <strong className="text-walnut">Direct Material Verification:</strong> Every grade of hardwood and plywood is certified to its exact specifications without unbranded substitutions.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-olive shrink-0 mt-0.5" />
                <span className="text-sm text-charcoal/80">
                  <strong className="text-walnut">Precision Machine Processing:</strong> In-house horizontal band saws, 4-sided planers, and sizing equipment guarantee millimeter accuracy.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-olive shrink-0 mt-0.5" />
                <span className="text-sm text-charcoal/80">
                  <strong className="text-walnut">Single-Window Execution:</strong> Seamless integration across structural timber frames, finished doors, engineered windows, and bespoke modular cabinetry.
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-card overflow-hidden shadow-luxury border border-sand-300">
              <Image
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1000&auto=format&fit=crop&q=80"
                alt="Wood craftsmanship and detailing"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Target Audiences Served */}
      <section className="py-20 bg-ivory-100/60 border-t border-b border-sand-200">
        <div className="max-w-site mx-auto px-6">
          <SectionHeading
            tagline="Tailored Experiences"
            title="Dedicated Services For Every Stakeholder"
            subtitle="How we collaborate with homeowners, design professionals, and building contractors."
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white rounded-card border border-sand-200 shadow-card space-y-4">
              <span className="text-xs font-semibold tracking-wider uppercase text-timber block">
                Audience 01
              </span>
              <h3 className="font-serif text-2xl font-medium text-walnut">
                Homeowners & Villa Builders
              </h3>
              <p className="text-xs text-charcoal/70 leading-relaxed">
                We guide you through choosing the perfect entrance door, understanding marine plywood for your modular kitchen, and selecting termite-free WPC solutions for bathrooms.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-timber hover:text-walnut transition-colors"
              >
                <span>Explore Homeowner Solutions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-8 bg-white rounded-card border border-sand-200 shadow-card space-y-4">
              <span className="text-xs font-semibold tracking-wider uppercase text-timber block">
                Audience 02
              </span>
              <h3 className="font-serif text-2xl font-medium text-walnut">
                Architects & Interior Designers
              </h3>
              <p className="text-xs text-charcoal/70 leading-relaxed">
                Access curated timber flitches, tactile veneers, Russian birch samples, and technical specifications for custom residential and hospitality design concepts.
              </p>
              <Link
                href="/quote?type=Architect"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-timber hover:text-walnut transition-colors"
              >
                <span>Request Material Samples</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-8 bg-white rounded-card border border-sand-200 shadow-card space-y-4">
              <span className="text-xs font-semibold tracking-wider uppercase text-timber block">
                Audience 03
              </span>
              <h3 className="font-serif text-2xl font-medium text-walnut">
                Contractors & Commercial Builders
              </h3>
              <p className="text-xs text-charcoal/70 leading-relaxed">
                Dependable volume supply of film-faced shuttering plywood, structural Sal wood chowkhats, commercial MR panels, and site logistics support across Tamil Nadu.
              </p>
              <Link
                href="/quote?type=Contractor"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-timber hover:text-walnut transition-colors"
              >
                <span>Submit Bill of Quantities</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Showroom Visit CTA */}
      <section className="py-20 max-w-site mx-auto px-6 text-center space-y-6">
        <MapPin className="w-8 h-8 text-timber mx-auto" />
        <h2 className="font-serif text-3xl sm:text-4xl font-medium text-walnut">
          Visit Our Coimbatore Showroom
        </h2>
        <p className="text-sm sm:text-base text-charcoal/70 max-w-xl mx-auto leading-relaxed">
          {SITE_SETTINGS.address}, {SITE_SETTINGS.city}, {SITE_SETTINGS.state} – {SITE_SETTINGS.pincode}. <br />
          Open Monday through Saturday from 9:00 AM to 8:30 PM.
        </p>
        <div className="pt-2 flex justify-center gap-4">
          <Link
            href="/contact"
            className="bg-walnut hover:bg-walnut-700 text-ivory text-xs font-semibold uppercase tracking-wider px-6 py-3.5 rounded-button transition-colors"
          >
            Get Showroom Directions
          </Link>
          <Link
            href="/quote"
            className="border border-sand-300 hover:bg-sand-50 text-walnut text-xs font-semibold uppercase tracking-wider px-6 py-3.5 rounded-button transition-colors"
          >
            Enquire Online
          </Link>
        </div>
      </section>
    </div>
  );
}
