"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  ChevronDown,
  Phone,
  MapPin,
  Mail,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  FileText,
} from "lucide-react";
import { NAVIGATION_LINKS, SITE_SETTINGS } from "@/lib/constants";
import { MegaMenu } from "./MegaMenu";
import { MobileNavigation } from "./MobileNavigation";

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* TOP MICRO BAR (Dark Walnut with Location, Contact & Social Links as in Mockup) */}
      <div className="hidden lg:block bg-[#241711] text-ivory/85 text-xs py-2 px-6 border-b border-black/20">
        <div className="max-w-site mx-auto flex justify-between items-center">
          {/* Left: Location, Phone & Email */}
          <div className="flex items-center space-x-5 text-[11px] text-ivory/90">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#C59B63]" />
              <span>178-C, Mettupalayam Road, Coimbatore, Tamil Nadu</span>
            </span>
            <span className="text-sand-400/40">|</span>
            <a
              href="tel:+917502030000"
              className="flex items-center gap-1.5 hover:text-[#C59B63] transition-colors font-medium text-ivory"
            >
              <Phone className="w-3.5 h-3.5 text-[#C59B63]" />
              <span>+91 75020 30000</span>
            </a>
            <span className="text-sand-400/40">|</span>
            <a
              href="mailto:info@shankartimbermart.com"
              className="flex items-center gap-1.5 hover:text-[#C59B63] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#C59B63]" />
              <span>info@shankartimbermart.com</span>
            </a>
          </div>

          {/* Right: Social Media Icons */}
          <div className="flex items-center space-x-4 text-ivory/75">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-[#C59B63] transition-colors"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-[#C59B63] transition-colors"
            >
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-[#C59B63] transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="hover:text-[#C59B63] transition-colors"
            >
              <Youtube className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* MAIN NAVIGATION BAR (Warm Ivory background with logo, links & quote button) */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "bg-[#FAF7F2]/95 backdrop-blur-md shadow-card border-b border-sand-300/60 py-2.5"
            : "bg-[#FAF7F2] border-b border-sand-200 py-3.5"
        }`}
      >
        <div className="max-w-site mx-auto px-6 flex items-center justify-between">
          {/* Left: Brand Identity with Logo Emblem and Tagline */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 shrink-0 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="Shankar Timber Mart Logo"
                fill
                priority
                sizes="48px"
                className="object-contain"
              />
            </div>
            <div className="flex items-center">
              <div className="flex flex-col">
                <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-walnut group-hover:text-timber transition-colors leading-tight">
                  SHANKAR
                </span>
                <span className="text-[10px] tracking-[0.24em] uppercase font-bold text-walnut leading-none">
                  TIMBER MART
                </span>
              </div>

              {/* Vertical divider and tagline as seen in mockup */}
              <div className="hidden sm:flex items-center ml-4 pl-4 border-l border-sand-300/80">
                <span className="font-serif text-xs text-charcoal/70 italic leading-snug">
                  Crafting Spaces. <br />
                  Defining Living.
                </span>
              </div>
            </div>
          </Link>

          {/* Middle: Desktop Navigation Items */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-7">
            {NAVIGATION_LINKS.filter((l) => l.label !== "Customise").map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              if (link.hasMegaMenu) {
                return (
                  <div
                    key={link.label}
                    className="relative group py-2"
                    onMouseEnter={() => setIsMegaMenuOpen(true)}
                  >
                    <Link
                      href={link.href}
                      className={`inline-flex items-center gap-1 text-sm font-medium transition-colors ${
                        isActive || isMegaMenuOpen
                          ? "text-timber"
                          : "text-walnut hover:text-timber"
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isMegaMenuOpen ? "rotate-180 text-timber" : "text-charcoal/50"
                        }`}
                      />
                    </Link>
                  </div>
                );
              }

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-medium transition-colors relative py-2 ${
                    isActive
                      ? "text-walnut font-semibold"
                      : "text-walnut hover:text-timber"
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-walnut rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: "Get a Quote" Button Matching Mockup */}
          <div className="flex items-center space-x-4">
            <Link
              href="/configurator"
              className="hidden md:inline-flex items-center gap-2 bg-[#8C582B] hover:bg-[#77471F] text-ivory text-xs sm:text-sm font-medium px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
            >
              <FileText className="w-4 h-4 text-sand-200" />
              <span>Get a Quote</span>
            </Link>

            {/* Mobile hamburger button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-walnut hover:text-timber transition-colors rounded-button focus:outline-none focus:ring-2 focus:ring-timber"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mega Menu Dropdown */}
      <MegaMenu
        isOpen={isMegaMenuOpen}
        onClose={() => setIsMegaMenuOpen(false)}
      />

      {/* Mobile Drawer */}
      <MobileNavigation
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
}
