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
      {/* FLOATING GLASS NAVIGATION BAR */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "bg-[#FAF1E8]/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(63,46,47,0.08)] border-b border-white/70 py-3"
            : "bg-[#FAF1E8]/80 backdrop-blur-lg border-b border-[#CDAFB0]/30 py-4"
        }`}
      >
        <div className="max-w-site mx-auto px-6 sm:px-8 lg:px-10 flex items-center justify-between">
          {/* Left: Brand Identity with Logo Emblem */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 shrink-0 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="Shankar Timber Mart Logo"
                fill
                priority
                sizes="44px"
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#3F2E2F] group-hover:text-[#6E5053] transition-colors leading-tight">
                SHANKAR
              </span>
              <span className="text-[10px] tracking-[0.24em] uppercase font-bold text-[#6E5053] leading-none">
                TIMBER MART
              </span>
            </div>
          </Link>

          {/* Middle: Desktop Navigation Items */}
          <nav className="hidden lg:flex items-center space-x-7 xl:space-x-8">
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
                          ? "text-[#3F2E2F] font-semibold"
                          : "text-[#3F2E2F]/80 hover:text-[#3F2E2F]"
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isMegaMenuOpen ? "rotate-180 text-[#3F2E2F]" : "text-[#3F2E2F]/50"
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
                      ? "text-[#3F2E2F] font-semibold"
                      : "text-[#3F2E2F]/80 hover:text-[#3F2E2F]"
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#3F2E2F] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: "Get a Quote ↗" Pill Button in Primary Dark */}
          <div className="flex items-center space-x-4">
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center gap-1.5 bg-[#3F2E2F] hover:bg-[#6E5053] text-[#FAF1E8] text-xs sm:text-sm font-medium px-5 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
            >
              <span>Get a Quote</span>
              <span className="text-xs">↗</span>
            </Link>

            {/* Mobile hamburger button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-[#3F2E2F] hover:text-[#6E5053] transition-colors rounded-button focus:outline-none"
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
