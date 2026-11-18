import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WoodPatternBackground } from "@/components/ui/WoodPatternBackground";
import { Project } from "@/lib/types";

interface ProjectPortfolioSectionProps {
  projects: Project[];
}

export function ProjectPortfolioSection({ projects }: ProjectPortfolioSectionProps) {
  return (
    <section className="py-20 lg:py-28 bg-ivory-100/70 border-t border-b border-sand-200 relative overflow-hidden">
      {/* Unified Aesthetic Wood Growth Rings Background */}
      <WoodPatternBackground opacity="opacity-[0.07]" />

      <div className="relative z-10 max-w-site mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <SectionHeading
            tagline="Executed Works"
            title="Spaces That Inspire."
            subtitle="Explore residences, villas, executive offices and bespoke kitchens completed with materials from Shankar Timber Mart."
            className="mb-0"
          />

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 bg-walnut hover:bg-walnut-700 text-ivory text-xs font-semibold uppercase tracking-wider px-7 py-3.5 rounded-full shadow-sm hover:shadow-md transition-all duration-300 self-start md:self-end"
          >
            <span>View Full Portfolio</span>
            <ArrowRight className="w-4 h-4 text-sand-300" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.slice(0, 3).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
