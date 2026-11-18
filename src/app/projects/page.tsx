import { db } from "@/lib/db";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectGalleryView } from "@/components/projects/ProjectGalleryView";

export const metadata = {
  title: "Completed Projects & Portfolio | Shankar Timber Mart Coimbatore",
  description: "View architectural residences, modern penthouses, luxury culinary kitchens, and corporate spaces completed with materials from Shankar Timber Mart.",
};

export const revalidate = 0;

export default async function ProjectsPage() {
  const projects = await db.projects.getAll();

  return (
    <div className="bg-ivory min-h-screen py-8 lg:py-12">
      <div className="max-w-site mx-auto px-6">
        <Breadcrumbs items={[{ label: "Projects Portfolio" }]} />

        {/* Hero Header */}
        <div className="my-8 max-w-3xl space-y-4">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-timber">
            Executed Architecture & Interiors
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-medium text-walnut tracking-tight">
            Spaces That Inspire.
          </h1>
          <p className="text-base text-charcoal/80 leading-relaxed font-normal">
            Explore authentic residential villas, executive workplaces, and bespoke interior cabinetry executed across Coimbatore and Tamil Nadu using Shankar Timber Mart materials.
          </p>
        </div>

        <ProjectGalleryView initialProjects={projects} />
      </div>
    </div>
  );
}
