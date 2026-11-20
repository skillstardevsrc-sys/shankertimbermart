import Link from "next/link";
import Image from "next/image";
import { Check, ArrowRight } from "lucide-react";
import { Service } from "@/lib/types";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="group glass-card rounded-[28px] p-3 border border-white/80 shadow-[0_8px_24px_rgba(63,46,47,0.06)] hover:shadow-[0_16px_40px_rgba(63,46,47,0.12)] hover:bg-white transition-all duration-300 hover:-translate-y-1 flex flex-col">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[20px] bg-[#EAD7CF]/30">
        <Image
          src={service.imageUrl}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 glass-pill px-3 py-1 text-[10px] font-bold text-[#3F2E2F] uppercase tracking-wider shadow-sm">
          In-House
        </div>
      </div>

      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#3F2E2F] group-hover:text-[#6E5053] transition-colors">
            {service.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#3F2E2F]/75 leading-relaxed">
            {service.shortDesc}
          </p>

          {service.benefits && service.benefits.length > 0 && (
            <ul className="space-y-1.5 pt-1">
              {service.benefits.slice(0, 3).map((benefit, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-xs text-[#3F2E2F]/80 bg-white/60 px-3 py-1.5 rounded-xl border border-white/80"
                >
                  <Check className="w-3.5 h-3.5 text-[#6E5053] shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="pt-3 border-t border-[#CDAFB0]/20 flex items-center justify-between text-xs font-semibold text-[#6E5053]">
          <Link
            href={`/services/${service.slug}`}
            className="hover:underline flex items-center gap-1.5"
          >
            <span>Learn More</span>
            <span className="text-xs">→</span>
          </Link>
          <Link
            href="/contact"
            className="glass-pill px-3 py-1 text-[11px] text-[#3F2E2F] hover:bg-white transition-all shadow-sm"
          >
            Request Service
          </Link>
        </div>
      </div>
    </div>
  );
}
