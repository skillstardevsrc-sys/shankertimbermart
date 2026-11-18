import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, MessageCircle, ArrowUpRight } from "lucide-react";
import { SITE_SETTINGS } from "@/lib/constants";
import { formatWhatsAppMessage } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="bg-walnut text-ivory/80 pt-16 pb-10 border-t border-walnut-700">
      <div className="max-w-site mx-auto px-6">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-walnut-700/60">
          {/* Column 1: Brand Logo & Tagline */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-flex items-center gap-3.5 group">
              <div className="relative w-16 h-16 shrink-0 transition-transform group-hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="Shankar Timber Mart Brand Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-ivory block leading-none">
                  SHANKAR
                </span>
                <span className="text-[10px] tracking-[0.28em] uppercase text-sand-300 font-semibold block mt-1">
                  TIMBER MART
                </span>
                <span className="text-[9px] tracking-widest uppercase text-timber/80 block mt-0.5">
                  Finest Quality Products
                </span>
              </div>
            </Link>

            <p className="font-serif italic text-lg text-sand-200">
              "{SITE_SETTINGS.tagline}"
            </p>
            <p className="text-sm text-ivory/70 leading-relaxed max-w-sm">
              {SITE_SETTINGS.supportingStatement}
            </p>

            <div className="pt-2 flex items-center space-x-4">
              <a
                href={`https://wa.me/${SITE_SETTINGS.whatsappNumber.replace(/[^0-9]/g, "")}?text=${formatWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-button text-xs font-semibold hover:opacity-95 transition-opacity"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Enquiry</span>
              </a>
              <Link
                href="/quote"
                className="inline-flex items-center gap-1.5 border border-sand-400 text-sand-200 px-4 py-2 rounded-button text-xs font-semibold hover:bg-sand-400/10 transition-colors"
              >
                <span>Get a Quote</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Column 2: Products */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-ivory font-medium tracking-wide">
              Product Categories
            </h4>
            <ul className="space-y-2 text-sm text-ivory/70">
              <li>
                <Link href="/products/timber" className="hover:text-sand-300 transition-colors">
                  Hardwood & Softwood Timber
                </Link>
              </li>
              <li>
                <Link href="/products/plywood-mdf" className="hover:text-sand-300 transition-colors">
                  BWP & MR Plywood
                </Link>
              </li>
              <li>
                <Link href="/products/plywood-mdf?sub=birch" className="hover:text-sand-300 transition-colors">
                  Russian Birch Multi-Ply
                </Link>
              </li>
              <li>
                <Link href="/products/doors-wpc" className="hover:text-sand-300 transition-colors">
                  Veneer & Solid Flush Doors
                </Link>
              </li>
              <li>
                <Link href="/products/doors-wpc?sub=wpc" className="hover:text-sand-300 transition-colors">
                  WPC Waterproof Doors & Frames
                </Link>
              </li>
              <li>
                <Link href="/products/windows-fenesta" className="hover:text-sand-300 transition-colors">
                  uPVC & Aluminium Windows
                </Link>
              </li>
              <li>
                <Link href="/products/modular-interiors" className="hover:text-sand-300 transition-colors">
                  Modular Kitchens & Interiors
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Solutions & Brands */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-ivory font-medium tracking-wide">
              Solutions & Brands
            </h4>
            <ul className="space-y-2 text-sm text-ivory/70">
              <li>
                <Link href="/services#timber-planing" className="hover:text-sand-300 transition-colors">
                  Precision Timber Planing
                </Link>
              </li>
              <li>
                <Link href="/services#timber-cutting" className="hover:text-sand-300 transition-colors">
                  Custom Sizing & Frame Rebating
                </Link>
              </li>
              <li>
                <Link href="/services#turnkey-interiors" className="hover:text-sand-300 transition-colors">
                  Turnkey Home & Office Fit-Out
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-sand-300 transition-colors">
                  Completed Projects Portfolio
                </Link>
              </li>
              <li>
                <Link href="/brands" className="hover:text-sand-300 transition-colors">
                  CenturyPly & Greenply
                </Link>
              </li>
              <li>
                <Link href="/brands" className="hover:text-sand-300 transition-colors">
                  Fenesta Architectural Windows
                </Link>
              </li>
              <li>
                <Link href="/brands" className="hover:text-sand-300 transition-colors">
                  Royal Touch & Merino Laminates
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Location & Contact */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-ivory font-medium tracking-wide">
              Showroom Location
            </h4>
            <div className="space-y-3 text-sm text-ivory/70">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-timber shrink-0 mt-1" />
                <span>
                  {SITE_SETTINGS.address},<br />
                  {SITE_SETTINGS.city}, {SITE_SETTINGS.state},<br />
                  {SITE_SETTINGS.country} – {SITE_SETTINGS.pincode}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-timber shrink-0" />
                <a href={`tel:${SITE_SETTINGS.phone}`} className="hover:text-sand-300 transition-colors">
                  {SITE_SETTINGS.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-timber shrink-0" />
                <a href={`mailto:${SITE_SETTINGS.email}`} className="hover:text-sand-300 transition-colors">
                  {SITE_SETTINGS.email}
                </a>
              </div>
              <p className="text-xs text-sand-300 pt-1">
                {SITE_SETTINGS.openingHours}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Policies */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-ivory/50 gap-4">
          <p>
            © {new Date().getFullYear()} Shankar Timber Mart. All rights reserved. Crafting Spaces. Defining Living.
          </p>
          <div className="flex items-center space-x-6">
            <Link href="/privacy-policy" className="hover:text-sand-300 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-sand-300 transition-colors">
              Terms & Conditions
            </Link>
            <span>•</span>
            <Link href="/admin" className="hover:text-sand-300 transition-colors">
              CMS Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
