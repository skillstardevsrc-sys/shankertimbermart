import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WoodPatternBackground } from "@/components/ui/WoodPatternBackground";
import { Service } from "@/lib/types";

interface ServicesSectionProps {
  services: Service[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section className="py-20 lg:py-28 bg-ivory relative overflow-hidden">
      {/* Unified Aesthetic Wood Growth Rings Background */}
      <WoodPatternBackground opacity="opacity-[0.07]" />

      <div className="relative z-10 max-w-site mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <SectionHeading
            tagline="Precision Value-Add Services"
            title="Beyond Materials. Complete Solutions."
            subtitle="Equipped with heavy-duty woodworking machinery and seasoned carpenters to deliver site-ready timber and turnkey fit-outs."
            className="mb-0"
          />

          <Link
            href="/services"
            className="inline-flex items-center gap-2 border border-sand-300 bg-white hover:bg-sand-50 text-walnut text-xs font-semibold uppercase tracking-wider px-7 py-3.5 rounded-full shadow-sm hover:shadow transition-all duration-300 self-start md:self-end"
          >
            <span>All Services</span>
            <ArrowRight className="w-4 h-4 text-timber" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.slice(0, 3).map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
