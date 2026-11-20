import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Linkedin, Youtube } from "lucide-react";
import { SITE_SETTINGS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-[#3F2E2F] text-[#FAF1E8]/80 pt-12 sm:pt-16 pb-8 border-t border-white/10">
      <div className="max-w-site mx-auto px-6 sm:px-8 lg:px-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand Logo & Tagline */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative w-11 h-11 shrink-0 transition-transform group-hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="Shankar Timber Mart Brand Logo"
                  fill
                  sizes="44px"
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold tracking-tight text-[#FAF1E8] block leading-none">
                  SHANKAR
                </span>
                <span className="text-[10px] tracking-[0.24em] uppercase text-[#CDAFB0] font-bold block mt-1">
                  TIMBER MART
                </span>
              </div>
            </Link>

            <p className="text-xs text-[#FAF1E8]/70 italic leading-snug">
              Crafting Spaces. Defining Living.
            </p>
            <p className="text-xs text-[#FAF1E8]/60 leading-relaxed max-w-sm pt-1">
              Coimbatore's premier destination for certified architectural timber, plywood, bespoke veneer doors, modern windows, and turnkey modular interiors.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#FAF1E8]">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">
                  Projects
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Products */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#FAF1E8]">
              Products
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/products/doors" className="hover:text-white transition-colors">
                  Doors
                </Link>
              </li>
              <li>
                <Link href="/products/wpc" className="hover:text-white transition-colors">
                  WPC
                </Link>
              </li>
              <li>
                <Link href="/products/windows" className="hover:text-white transition-colors">
                  Windows
                </Link>
              </li>
              <li>
                <Link href="/products/timber" className="hover:text-white transition-colors">
                  Timber
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#FAF1E8]">
              Support
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/brands" className="hover:text-white transition-colors">
                  Our Brands
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Get a Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Stay Connected */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#FAF1E8]">
              Stay Connected
            </h4>
            <div className="flex items-center space-x-3 text-[#FAF1E8]/80">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors hover:text-white"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors hover:text-white"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors hover:text-white"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors hover:text-white"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#FAF1E8]/50 gap-3">
          <span>
            © {new Date().getFullYear()} Shankar Timber Mart. All rights reserved.
          </span>
          <span>178-C, Mettupalayam Road, Coimbatore, Tamil Nadu</span>
        </div>
      </div>
    </footer>
  );
}
