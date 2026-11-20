import { db } from "@/lib/db";
import { HeroSection } from "@/components/home/HeroSection";
import { BrandIntroduction } from "@/components/home/BrandIntroduction";
import { ProductCategoryCards } from "@/components/home/ProductCategoryCards";
import { FeaturedTimberCollection } from "@/components/home/FeaturedTimberCollection";
import { ProjectPortfolioSection } from "@/components/home/ProjectPortfolioSection";
import { WhyChooseUsSection } from "@/components/home/WhyChooseUsSection";
import { FinalCTASection } from "@/components/home/FinalCTASection";

export const revalidate = 0; // Dynamic server rendering for live CMS updates

export default async function HomePage() {
  const projects = await db.projects.getAll();

  return (
    <div className="flex flex-col relative">
      {/* Subtle organic ambient gradients for atmospheric luxury depth */}
      <div className="absolute top-[12%] -left-40 w-[600px] h-[600px] bg-[#FAF1E8]/40 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[35%] -right-40 w-[700px] h-[700px] bg-[#CDAFB0]/30 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-[65%] -left-32 w-[650px] h-[650px] bg-[#FAF1E8]/35 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[85%] -right-32 w-[600px] h-[600px] bg-[#CDAFB0]/25 rounded-full blur-[140px] pointer-events-none" />

      {/* SECTION 01 — HERO */}
      <HeroSection />

      {/* SECTION 02 — BRAND INTRODUCTION (ABOUT US) */}
      <BrandIntroduction />

      {/* SECTION 03 — PRODUCT CATEGORIES (OUR PRODUCTS) */}
      <ProductCategoryCards />

      {/* SECTION 04 — FEATURED TIMBER COLLECTION (FEATURED MATERIALS) */}
      <FeaturedTimberCollection />

      {/* SECTION 05 — PROJECT PORTFOLIO (OUR PROJECTS) */}
      <ProjectPortfolioSection projects={projects} />

      {/* SECTION 06 — WHY CHOOSE US */}
      <WhyChooseUsSection />

      {/* SECTION 07 — FINAL CTA (LET'S BUILD SOMETHING BEAUTIFUL) */}
      <FinalCTASection />
    </div>
  );
}
