import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block bg-white rounded-3xl p-3 border border-sand-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_22px_45px_rgb(43,29,21,0.09)] transition-all duration-500 hover:-translate-y-1.5"
    >
      {/* Inset Curved Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-sand-100">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-walnut/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 left-3 bg-walnut/85 backdrop-blur-md text-ivory text-[10px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full border border-white/10 shadow-sm">
          {project.category}
        </div>
      </div>

      {/* Card Details */}
      <div className="p-5 space-y-3">
        {project.location && (
          <div className="flex items-center text-xs text-charcoal/60 gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-timber" />
            <span>{project.location}</span>
          </div>
        )}

        <h3 className="font-serif text-2xl font-medium text-walnut group-hover:text-timber transition-colors line-clamp-1">
          {project.title}
        </h3>

        <p className="text-xs text-charcoal/70 line-clamp-2 leading-relaxed">
          {project.overview}
        </p>

        <div className="pt-3 flex items-center justify-between text-xs font-semibold text-timber group-hover:text-walnut transition-colors border-t border-sand-100">
          <span className="inline-flex items-center gap-1.5">View Architecture & Materials</span>
          <span className="w-7 h-7 rounded-full bg-sand-100 group-hover:bg-walnut group-hover:text-ivory flex items-center justify-center transition-all duration-300">
            <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
}
