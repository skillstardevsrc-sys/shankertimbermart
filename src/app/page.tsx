import { db } from "@/lib/db";
import { HeroSection } from "@/components/home/HeroSection";
import { BrandIntroduction } from "@/components/home/BrandIntroduction";
import { ProductCategoryCards } from "@/components/home/ProductCategoryCards";
import { FeaturedTimberCollection } from "@/components/home/FeaturedTimberCollection";
import { DoorsCollection } from "@/components/home/DoorsCollection";
import { WindowsFenestaSection } from "@/components/home/WindowsFenestaSection";
import { ModularInteriorsSection } from "@/components/home/ModularInteriorsSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ProjectPortfolioSection } from "@/components/home/ProjectPortfolioSection";
import { AssociatedBrandsSection } from "@/components/home/AssociatedBrandsSection";
import { WhyChooseUsSection } from "@/components/home/WhyChooseUsSection";
import { FinalCTASection } from "@/components/home/FinalCTASection";

export const revalidate = 0; // Dynamic server rendering for live CMS updates

export default async function HomePage() {
  const [projects, services] = await Promise.all([
    db.projects.getAll(),
    db.services.getAll(),
  ]);

  return (
    <div className="flex flex-col">
      {/* SECTION 01 — HERO */}
      <HeroSection />

      {/* SECTION 02 — BRAND INTRODUCTION */}
      <BrandIntroduction />

      {/* SECTION 03 — PRODUCT CATEGORIES */}
      <ProductCategoryCards />

      {/* SECTION 04 — FEATURED TIMBER COLLECTION */}
      <FeaturedTimberCollection />

      {/* SECTION 05 — DOORS COLLECTION */}
      <DoorsCollection />

      {/* SECTION 06 — WINDOWS AND FENESTA */}
      <WindowsFenestaSection />

      {/* SECTION 07 — MODULAR INTERIORS */}
      <ModularInteriorsSection />

      {/* SECTION 08 — SERVICES */}
      <ServicesSection services={services} />

      {/* SECTION 09 — PROJECT PORTFOLIO */}
      <ProjectPortfolioSection projects={projects} />

      {/* SECTION 10 — ASSOCIATED BRANDS */}
      <AssociatedBrandsSection />

      {/* SECTION 11 — WHY CHOOSE US */}
      <WhyChooseUsSection />

      {/* SECTION 12 — FINAL CTA */}
      <FinalCTASection />
    </div>
  );
}
