import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { GlobalNavigationLoader } from "@/components/ui/GlobalNavigationLoader";
import { SITE_SETTINGS } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.shankartimbermart.com"),
  title: {
    default: "Shankar Timber Mart | Premium Timber, Doors, Windows & Interior Solutions in Coimbatore",
    template: "%s | Shankar Timber Mart Coimbatore",
  },
  description:
    "Shankar Timber Mart is Coimbatore's premier destination for Burma Teak, natural hardwoods, BWP marine plywood, designer veneer doors, uPVC & aluminium windows, and modular interior solutions.",
  icons: {
    icon: [
      { url: "/icon.png" },
      { url: "/favicon.ico" },
      { url: "/logo.png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
      { url: "/logo.png" },
    ],
    shortcut: "/favicon.ico",
  },
  keywords: [
    "Timber dealers in Coimbatore",
    "Timber suppliers in Coimbatore",
    "Burma Teak wood Coimbatore",
    "Plywood dealers in Coimbatore",
    "BWP marine plywood Coimbatore",
    "Wooden doors in Coimbatore",
    "Veneer doors Coimbatore",
    "WPC doors Coimbatore",
    "uPVC windows in Coimbatore",
    "Aluminium windows in Coimbatore",
    "Modular kitchen solutions in Coimbatore",
    "CenturyPly dealers Coimbatore",
    "Fenesta windows Coimbatore",
  ],
  authors: [{ name: "Shankar Timber Mart" }],
  creator: "Shankar Timber Mart",
  publisher: "Shankar Timber Mart",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.shankartimbermart.com",
    siteName: "Shankar Timber Mart",
    title: "Shankar Timber Mart — Crafting Spaces. Defining Living.",
    description: "Premium materials and thoughtful solutions for spaces that deserve better. Timber, Plywood, Doors, Windows, and Modular Interiors in Coimbatore.",
    images: [
      {
        url: "/logo.png",
        width: 1024,
        height: 672,
        alt: "Shankar Timber Mart Brand Logo",
      },
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
        width: 1200,
        height: 630,
        alt: "Shankar Timber Mart Architectural Solutions",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HomeGoodsStore",
    name: SITE_SETTINGS.businessName,
    image: "https://www.shankartimbermart.com/logo.png",
    logo: "https://www.shankartimbermart.com/logo.png",
    url: "https://www.shankartimbermart.com",
    telephone: SITE_SETTINGS.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_SETTINGS.address,
      addressLocality: SITE_SETTINGS.city,
      addressRegion: SITE_SETTINGS.state,
      postalCode: SITE_SETTINGS.pincode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "11.023456",
      longitude: "76.945678",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "20:30",
      },
    ],
    priceRange: "₹₹₹",
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#EAD7CF] text-charcoal font-sans">
        <Suspense fallback={null}>
          <GlobalNavigationLoader />
        </Suspense>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
