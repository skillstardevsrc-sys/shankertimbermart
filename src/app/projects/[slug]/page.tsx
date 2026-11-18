import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/db";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { MapPin, Layers, ArrowRight, MessageCircle } from "lucide-react";
import { SITE_SETTINGS } from "@/lib/constants";
import { formatWhatsAppMessage } from "@/lib/utils";

interface ProjectDetailProps {
  params: {
    slug: string;
  };
}

export const revalidate = 0;

export async function generateMetadata({ params }: ProjectDetailProps) {
  const project = await db.projects.getBySlug(params.slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Projects Portfolio`,
    description: project.overview,
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailProps) {
  const project = await db.projects.getBySlug(params.slug);
  if (!project) {
    notFound();
  }

  const allProjects = await db.projects.getAll();
  const relatedProjects = allProjects
    .filter((p) => p.id !== project.id)
    .slice(0, 3);

  const whatsappUrl = `https://wa.me/${SITE_SETTINGS.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    `Hello Shankar Timber Mart, I saw your project "${project.title}" on your website. I would like to discuss a similar project.`
  )}`;

  return (
    <div className="bg-ivory min-h-screen py-8 lg:py-12">
      <div className="max-w-site mx-auto px-6">
        <Breadcrumbs
          items={[
            { label: "Projects", href: "/projects" },
            { label: project.title },
          ]}
        />

        {/* Hero Header */}
        <div className="my-8 max-w-3xl space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold tracking-wider uppercase text-timber px-2.5 py-1 bg-sand-200/50 rounded-sm">
              {project.category}
            </span>
            {project.location && (
              <span className="flex items-center text-xs text-charcoal/60 gap-1">
                <MapPin className="w-3.5 h-3.5 text-timber" />
                {project.location}
              </span>
            )}
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-walnut tracking-tight leading-[1.15]">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed font-normal">
            {project.overview}
          </p>
        </div>

        {/* Main Cover Image */}
        <div className="relative aspect-[16/9] w-full rounded-card overflow-hidden shadow-luxury border border-sand-300 bg-sand-100 my-8">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Project Details Grid */}
        <div className="my-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Description & Gallery */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white p-8 rounded-card border border-sand-200 shadow-sm space-y-4">
              <h2 className="font-serif text-2xl font-medium text-walnut">
                Project Narrative & Scope
              </h2>
              <p className="text-sm text-charcoal/80 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Gallery Images */}
            {project.galleryImages && project.galleryImages.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-serif text-2xl font-medium text-walnut">
                  Architectural Perspectives
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.galleryImages.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-[4/3] rounded-card overflow-hidden border border-sand-200 shadow-sm bg-sand-100"
                    >
                      <Image
                        src={img}
                        alt={`${project.title} architectural detail ${idx + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Materials Used & Discuss CTA */}
          <div className="lg:col-span-4 space-y-6">
            {/* Materials Card */}
            {project.materialsUsed && project.materialsUsed.length > 0 && (
              <div className="bg-white p-6 rounded-card border border-sand-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-timber" />
                  <h3 className="font-serif text-xl font-medium text-walnut">
                    Materials Specified & Supplied
                  </h3>
                </div>
                <ul className="space-y-2.5">
                  {project.materialsUsed.map((mat, idx) => (
                    <li key={idx} className="text-xs text-charcoal/80 flex items-start gap-2 border-b border-sand-100 pb-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-timber mt-1.5 shrink-0" />
                      <span>{mat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Discuss Similar Project CTA */}
            <div className="p-6 bg-walnut text-ivory rounded-card shadow-card space-y-4">
              <h3 className="font-serif text-2xl font-medium">
                Discuss a Similar Project
              </h3>
              <p className="text-xs text-ivory/80 leading-relaxed">
                Planning a residence, kitchen renovation or commercial interior in Coimbatore? Consult our team for material specifications.
              </p>
              <div className="space-y-2 pt-2">
                <Link
                  href={`/quote?project=${encodeURIComponent(project.title)}`}
                  className="w-full py-3 px-4 bg-timber hover:bg-timber-600 text-ivory text-xs font-semibold uppercase tracking-wider rounded-button transition-colors flex items-center justify-center gap-2 text-center"
                >
                  <span>Request Project Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-white/10 hover:bg-white/20 text-ivory text-xs font-medium rounded-button transition-colors flex items-center justify-center gap-2 text-center"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>WhatsApp Project Lead</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div className="mt-16 pt-12 border-t border-sand-200 space-y-8">
            <h2 className="font-serif text-3xl font-medium text-walnut">
              More Architectural Showcases
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProjects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
