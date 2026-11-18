import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/db";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductCard } from "@/components/ui/ProductCard";
import { EnquiryForm } from "@/components/ui/EnquiryForm";
import { SITE_SETTINGS } from "@/lib/constants";
import { formatWhatsAppMessage } from "@/lib/utils";
import { MessageCircle, Check, ShieldCheck, Sparkles, Phone, ArrowRight } from "lucide-react";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export const revalidate = 0;

export async function generateMetadata({ params }: ProductPageProps) {
  const product = await db.products.getBySlug(params.slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} | Shankar Timber Mart Coimbatore`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | Shankar Timber Mart`,
      description: product.shortDescription,
      images: [{ url: product.images[0] }],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const product = await db.products.getBySlug(params.slug);
  if (!product) {
    notFound();
  }

  const allProducts = await db.products.getAll();
  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const cleanNumber = SITE_SETTINGS.whatsappNumber.replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${formatWhatsAppMessage(product.name)}`;

  return (
    <div className="bg-ivory min-h-screen py-8 lg:py-12">
      <div className="max-w-site mx-auto px-6">
        <Breadcrumbs
          items={[
            { label: "Products", href: "/products" },
            {
              label:
                product.category === "modular-interiors"
                  ? "Modular Interiors"
                  : product.category === "plywood-mdf"
                  ? "Plywood & MDF"
                  : product.category === "windows"
                  ? "Windows & Fenesta"
                  : product.category === "doors"
                  ? "Doors & WPC"
                  : "Timber",
              href: `/products/${product.category}`,
            },
            { label: product.name },
          ]}
        />

        {/* Product Overview Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 my-8 items-start">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[4/3] rounded-card overflow-hidden shadow-luxury border border-sand-300 bg-sand-100">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {product.badge && (
                <div className="absolute top-4 left-4 bg-walnut text-ivory text-xs font-semibold uppercase px-3 py-1 rounded-sm shadow-sm">
                  {product.badge}
                </div>
              )}
              {product.associatedBrand && (
                <div className="absolute top-4 right-4 bg-white/95 text-walnut text-xs font-bold uppercase px-3 py-1 rounded-sm border border-sand-200 shadow-sm">
                  {product.associatedBrand}
                </div>
              )}
            </div>

            {/* Gallery Thumbnails */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-square rounded-sm overflow-hidden border border-sand-300 bg-sand-100"
                  >
                    <Image
                      src={img}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      fill
                      sizes="25vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Title, Short Description, Quick Action CTAs */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-timber block mb-2">
                {product.subcategory || product.category}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-walnut tracking-tight leading-[1.15]">
                {product.name}
              </h1>
            </div>

            <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed font-normal">
              {product.shortDescription}
            </p>

            <div className="p-4 bg-white rounded-card border border-sand-200 text-xs text-charcoal/70 space-y-1">
              <span className="font-semibold text-walnut block">Verified Shankar Timber Mart Specification:</span>
              <span>Available for direct inspection and cut-to-order sizing at our Mettupalayam Road showroom in Coimbatore.</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-6 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold uppercase tracking-wider rounded-button shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Enquire via WhatsApp</span>
              </a>

              <a
                href="#enquiry-section"
                className="py-3.5 px-6 bg-walnut hover:bg-walnut-700 text-ivory text-xs font-semibold uppercase tracking-wider rounded-button shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <span>Request Formal Quote</span>
              </a>
            </div>

            <div className="pt-2 flex items-center gap-3 text-xs text-charcoal/60">
              <Phone className="w-3.5 h-3.5 text-timber" />
              <span>Direct Showroom Assistance: </span>
              <a href={`tel:${SITE_SETTINGS.phone}`} className="text-walnut font-medium hover:text-timber">
                {SITE_SETTINGS.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Detailed Description & Technical Specifications Grid */}
        <div className="my-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white p-8 rounded-card border border-sand-200 shadow-sm space-y-4">
              <h2 className="font-serif text-2xl font-medium text-walnut">
                Architectural Overview
              </h2>
              <p className="text-sm text-charcoal/80 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Specifications Table */}
            {product.specifications && product.specifications.length > 0 && (
              <div className="bg-white p-8 rounded-card border border-sand-200 shadow-sm space-y-4">
                <h3 className="font-serif text-2xl font-medium text-walnut">
                  Technical Specifications
                </h3>
                <div className="divide-y divide-sand-200">
                  {product.specifications.map((spec, idx) => (
                    <div key={idx} className="py-2.5 flex justify-between text-xs sm:text-sm">
                      <span className="font-medium text-walnut">{spec.label}</span>
                      <span className="text-charcoal/70 text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Available Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="bg-white p-8 rounded-card border border-sand-200 shadow-sm space-y-4">
                <h3 className="font-serif text-2xl font-medium text-walnut">
                  Available Sizing & Variants
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.variants.map((variant, idx) => (
                    <div key={idx} className="p-4 bg-ivory-50 rounded-form border border-sand-200 space-y-1">
                      <span className="font-serif text-lg font-medium text-walnut block">
                        {variant.name}
                      </span>
                      {variant.size && (
                        <p className="text-xs text-charcoal/70">
                          <strong className="text-charcoal">Size: </strong>{variant.size}
                        </p>
                      )}
                      {variant.thickness && (
                        <p className="text-xs text-charcoal/70">
                          <strong className="text-charcoal">Thickness: </strong>{variant.thickness}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Applications */}
            {product.applications && product.applications.length > 0 && (
              <div className="bg-white p-8 rounded-card border border-sand-200 shadow-sm space-y-4">
                <h3 className="font-serif text-2xl font-medium text-walnut">
                  Recommended Applications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.applications.map((app, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-charcoal/80">
                      <Check className="w-4 h-4 text-olive shrink-0" />
                      <span>{app}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Embedded Enquiry Form */}
          <div id="enquiry-section" className="lg:col-span-5">
            <div className="sticky top-28">
              <EnquiryForm
                initialProduct={product.name}
                initialCategory={
                  product.category === "modular-interiors"
                    ? "Modular Interiors"
                    : product.category === "plywood-mdf"
                    ? "Plywood & MDF"
                    : product.category === "windows"
                    ? "Windows"
                    : product.category === "doors"
                    ? "Doors"
                    : "Timber"
                }
                title={`Enquire: ${product.name}`}
                subtitle="Submit your requirements to receive availability, thicknesses, and contractor/architectural rates."
                compact
              />
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-sand-200 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-3xl font-medium text-walnut">
                Related Materials
              </h2>
              <Link
                href={`/products/${product.category}`}
                className="text-xs font-semibold text-timber hover:text-walnut inline-flex items-center gap-1 uppercase tracking-wider"
              >
                <span>View All In This Category</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
