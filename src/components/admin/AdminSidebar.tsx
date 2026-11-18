"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Package,
  FolderGit2,
  Award,
  Settings,
  LogOut,
  ExternalLink,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Leads & Enquiries", href: "/admin/enquiries", icon: Users },
  { label: "Product Catalogue", href: "/admin/products", icon: Package },
  { label: "Project Portfolio", href: "/admin/projects", icon: FolderGit2 },
  { label: "Associated Brands", href: "/admin/brands", icon: Award },
  { label: "Site Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/login", { method: "DELETE" });
      window.location.href = "/admin/login";
    } catch {
      window.location.href = "/admin/login";
    }
  };

  return (
    <aside className="w-64 bg-walnut text-ivory min-h-screen flex flex-col justify-between border-r border-walnut-700 p-6 shrink-0">
      <div className="space-y-8">
        {/* Brand with Logo */}
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 shrink-0">
            <Image
              src="/logo.png"
              alt="Shankar Timber Mart Logo"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <span className="font-serif text-xl font-bold tracking-tight text-ivory block leading-none">
              SHANKAR
            </span>
            <span className="text-[9px] tracking-[0.24em] uppercase text-sand-300 font-semibold block mt-1">
              CMS PORTAL
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-button text-xs font-semibold uppercase tracking-wider transition-colors ${
                  isActive
                    ? "bg-timber text-ivory shadow-sm"
                    : "text-ivory/70 hover:bg-walnut-700 hover:text-ivory"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer controls */}
      <div className="pt-6 border-t border-walnut-700/80 space-y-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between text-xs text-sand-300 hover:text-ivory transition-colors py-1"
        >
          <span>View Live Showroom</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-red-300 hover:bg-red-950/40 hover:text-red-200 rounded-button transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Exit / Logout</span>
        </button>
      </div>
    </aside>
  );
}
