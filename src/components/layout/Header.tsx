"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown, ArrowRight, Phone } from "lucide-react";
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
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-ivory/95 backdrop-blur-md shadow-card border-b border-sand-300/60 py-2.5"
          : "bg-ivory border-b border-sand-200 py-3.5"
      }`}
    >
      {/* Top micro bar for direct contact & Coimbatore showroom */}
      <div className="hidden lg:block border-b border-sand-200/80 -mt-1.5 mb-2.5 pb-2 text-xs text-charcoal/70">
        <div className="max-w-site mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span>Showroom: 178-C, Mettupalayam Road, Coimbatore</span>
            <span className="text-sand-300">|</span>
            <span className="text-timber font-medium">Finest Quality Architectural Products</span>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href={`tel:${SITE_SETTINGS.phone}`}
              className="flex items-center gap-1.5 hover:text-timber transition-colors font-medium text-walnut"
            >
              <Phone className="w-3 h-3 text-timber" />
              <span>{SITE_SETTINGS.phone}</span>
            </a>
            <span className="text-sand-300">|</span>
            <Link href="/admin" className="hover:text-timber text-[11px] text-charcoal/50">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-site mx-auto px-6 flex items-center justify-between">
        {/* Left: Shankar Timber Mart Brand Identity with Official Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/logo.png"
              alt="Shankar Timber Mart Official Brand Logo"
              fill
              priority
              sizes="(max-width: 640px) 48px, 56px"
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-walnut group-hover:text-timber transition-colors leading-none">
              SHANKAR
            </span>
            <div className="flex items-center space-x-1.5 mt-1">
              <span className="text-[10px] tracking-[0.24em] uppercase font-semibold text-timber">
                TIMBER MART
              </span>
              <span className="w-1 h-1 rounded-full bg-sand-400"></span>
              <span className="text-[9px] tracking-wider text-charcoal/60 uppercase">Coimbatore</span>
            </div>
          </div>
        </Link>

        {/* Middle: Desktop Navigation Items */}
        <nav className="hidden lg:flex items-center space-x-7">
          {NAVIGATION_LINKS.map((link) => {
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
                      className={`w-4 h-4 transition-transform duration-200 ${
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
                    ? "text-timber font-semibold"
                    : "text-walnut hover:text-timber"
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-timber rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center space-x-4">
          <Link
            href="/quote"
            className="hidden md:inline-flex items-center gap-2 bg-walnut hover:bg-walnut-700 text-ivory text-xs tracking-wider uppercase font-semibold px-5 py-2.5 rounded-button transition-all shadow-sm hover:shadow-md"
          >
            <span>Get a Quote</span>
            <ArrowRight className="w-3.5 h-3.5 text-sand-300" />
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
