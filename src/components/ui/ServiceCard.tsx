import Link from "next/link";
import Image from "next/image";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { Service } from "@/lib/types";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="group bg-white rounded-3xl p-3 border border-sand-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_22px_45px_rgb(43,29,21,0.09)] transition-all duration-500 hover:-translate-y-1.5 flex flex-col">
      {/* Curved Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-sand-100">
        <Image
          src={service.imageUrl}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-walnut/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-walnut uppercase tracking-wider border border-sand-200/60 shadow-sm flex items-center gap-1">
          <Sparkles className="w-2.5 h-2.5 text-timber" />
          <span>In-House</span>
        </div>
      </div>

      {/* Card Content with Smooth Spacing */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-5">
        <div className="space-y-3">
          <h3 className="font-serif text-2xl font-medium text-walnut group-hover:text-timber transition-colors">
            {service.title}
          </h3>
          <p className="text-sm text-charcoal/75 leading-relaxed">
            {service.shortDesc}
          </p>

          {service.benefits && service.benefits.length > 0 && (
            <ul className="space-y-2 pt-2">
              {service.benefits.slice(0, 3).map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-charcoal/75 bg-ivory-50/70 px-3 py-1.5 rounded-xl border border-sand-200/50">
                  <Check className="w-3.5 h-3.5 text-olive shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="pt-4 border-t border-sand-100 flex items-center justify-between">
          <Link
            href={`/quote?service=${encodeURIComponent(service.title)}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sand-100/70 hover:bg-walnut hover:text-ivory text-xs font-semibold text-walnut transition-all duration-300"
          >
            <span>Consult on This Service</span>
            <ArrowRight className="w-3.5 h-3.5 text-timber group-hover:text-sand-300 transition-colors" />
          </Link>
        </div>
      </div>
    </div>
  );
}
