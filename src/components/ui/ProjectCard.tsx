import Link from "next/link";
import Image from "next/image";
import { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative aspect-[16/11] rounded-[26px] overflow-hidden border border-white/80 shadow-[0_10px_30px_rgba(63,46,47,0.08)] bg-[#EAD7CF]/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(63,46,47,0.14)] block"
    >
      {/* Full-Bleed Project Image */}
      <Image
        src={project.coverImage}
        alt={project.title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
      />

      {/* Atmospheric Scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Bottom Floating Information Overlay */}
      <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between z-10">
        <div>
          <h3 className="font-serif text-lg sm:text-xl font-medium text-[#FAF1E8] leading-tight">
            {project.title}
          </h3>
          <span className="text-xs text-[#FAF1E8]/75 font-normal block mt-0.5">
            {project.category}
          </span>
        </div>

        {/* Circular Glass Arrow Action */}
        <div className="w-8 h-8 rounded-full bg-white/25 group-hover:bg-white text-[#FAF1E8] group-hover:text-[#3F2E2F] backdrop-blur-md border border-white/40 flex items-center justify-center transition-all duration-300 text-xs shrink-0 ml-3">
          →
        </div>
      </div>
    </Link>
  );
}
