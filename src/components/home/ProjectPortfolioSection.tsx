"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ArrowRight } from "lucide-react";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Project } from "@/lib/types";

interface ProjectPortfolioSectionProps {
  projects: Project[];
}

export function ProjectPortfolioSection({ projects }: ProjectPortfolioSectionProps) {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-transparent relative overflow-hidden">
      <div className="relative z-10 max-w-site mx-auto px-6 sm:px-8 lg:px-10">
        <ScrollReveal 
          variant="up"
          duration={0.7}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4"
        >
          <div>
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.24em] text-[#6E5053] uppercase block mb-1.5">
              OUR PROJECTS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#3F2E2F]">
              A Glimpse of Our Work.
            </h2>
            <p className="text-xs sm:text-sm text-[#3F2E2F]/70 mt-1 font-normal">
              Real spaces, lasting impressions.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 glass-pill px-5 py-2.5 text-xs font-semibold text-[#3F2E2F] hover:bg-white transition-all shadow-sm self-start sm:self-end"
          >
            <span>View All Projects</span>
            <span className="text-xs">→</span>
          </Link>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.slice(0, 3).map((project, idx) => (
            <ScrollReveal
              key={project.id}
              variant="scale"
              delay={idx * 0.12}
              duration={0.65}
            >
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
