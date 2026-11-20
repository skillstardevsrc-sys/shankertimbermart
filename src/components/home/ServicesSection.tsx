import Link from "next/link";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Service } from "@/lib/types";

interface ServicesSectionProps {
  services: Service[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-transparent relative overflow-hidden">
      <div className="relative z-10 max-w-site mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 gap-6">
          <div>
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.24em] text-[#6E5053] uppercase block mb-1.5">
              PRECISION WORKSHOP SERVICES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#3F2E2F]">
              Beyond Materials. Complete Solutions.
            </h2>
            <p className="text-xs sm:text-sm text-[#3F2E2F]/75 mt-1 font-normal max-w-xl">
              Equipped with heavy-duty woodworking machinery and seasoned carpenters to deliver site-ready timber and turnkey fit-outs.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 glass-pill px-5 py-2.5 text-xs font-semibold text-[#3F2E2F] hover:bg-white transition-all shadow-sm self-start sm:self-end"
          >
            <span>All Services</span>
            <span className="text-xs">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.slice(0, 3).map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
