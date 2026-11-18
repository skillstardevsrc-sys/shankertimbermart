"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Product } from "@/lib/types";
import { SITE_SETTINGS } from "@/lib/constants";
import { formatWhatsAppMessage } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  onEnquire?: (product: Product) => void;
}

export function ProductCard({ product, onEnquire }: ProductCardProps) {
  const whatsappUrl = `https://wa.me/${SITE_SETTINGS.whatsappNumber.replace(/[^0-9]/g, "")}?text=${formatWhatsAppMessage(product.name)}`;

  return (
    <div className="group bg-white rounded-3xl p-3 border border-sand-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_22px_45px_rgb(43,29,21,0.09)] transition-all duration-500 hover:-translate-y-1.5 flex flex-col">
      {/* Inset Curvilinear Image container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-sand-100">
        <Image
          src={product.images[0] || "https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?w=800&auto=format&fit=crop&q=80"}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
        />

        {/* Badge Pill */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-walnut/90 backdrop-blur-md text-ivory text-[10px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full shadow-sm">
            {product.badge}
          </div>
        )}

        {/* Associated Brand Pill */}
        {product.associatedBrand && (
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md text-walnut text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full border border-sand-200 shadow-sm">
            {product.associatedBrand}
          </div>
        )}

        {/* Hover Quick Action Pill */}
        <div className="absolute inset-0 bg-walnut/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
          <Link
            href={`/products/${product.slug}`}
            className="bg-ivory hover:bg-white text-walnut text-xs font-semibold px-5 py-2.5 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all flex items-center gap-1.5"
          >
            <span>Explore Specifications</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-timber" />
          </Link>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between text-[11px] text-timber font-semibold tracking-wider uppercase mb-1.5">
            <span>{product.subcategory || product.category}</span>
            {product.variants && (
              <span className="text-charcoal/50 lowercase bg-sand-100/70 px-2.5 py-0.5 rounded-full">
                {product.variants.length} variant{product.variants.length > 1 ? "s" : ""}
              </span>
            )}
          </div>

          <Link href={`/products/${product.slug}`}>
            <h3 className="font-serif text-xl font-medium text-walnut group-hover:text-timber transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-charcoal/70 line-clamp-2 mt-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-3 border-t border-sand-100 flex items-center justify-between gap-2">
          <Link
            href={`/products/${product.slug}`}
            className="text-xs font-semibold text-walnut hover:text-timber transition-colors inline-flex items-center gap-1"
          >
            <span>View Details</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-timber" />
          </Link>

          <div className="flex items-center gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Enquire about ${product.name} on WhatsApp`}
              className="w-8 h-8 rounded-full bg-sand-100/80 hover:bg-[#25D366] text-charcoal/70 hover:text-white flex items-center justify-center transition-all duration-300"
              title="Enquire on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            {onEnquire ? (
              <button
                onClick={() => onEnquire(product)}
                className="text-[11px] font-semibold bg-sand-100 hover:bg-walnut hover:text-ivory text-walnut px-4 py-1.5 rounded-full transition-all duration-300 shadow-sm"
              >
                Enquire
              </button>
            ) : (
              <Link
                href={`/quote?product=${encodeURIComponent(product.name)}&cat=${encodeURIComponent(product.category)}`}
                className="text-[11px] font-semibold bg-sand-100 hover:bg-walnut hover:text-ivory text-walnut px-4 py-1.5 rounded-full transition-all duration-300 shadow-sm"
              >
                Enquire
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
