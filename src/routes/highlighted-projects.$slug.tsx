import { createFileRoute, Link } from "@tanstack/react-router";
import { getHighlightedProject, HIGHLIGHTED_PROJECTS } from "@/highlighted-projects/data";
import { ProjectLayout } from "@/highlighted-projects/layout";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/highlighted-projects/$slug")({
  component: ProjectPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-md px-4 py-20 text-center">
      <h1 className="text-3xl font-black">Project not found</h1>
      <Link to="/highlighted-projects" className="btn-accent mt-5 inline-flex">
        <ArrowLeft className="h-4 w-4" /> Back to Highlighted Projects
      </Link>
    </div>
  ),
  head: ({ params }) => {
    const project = HIGHLIGHTED_PROJECTS.find((p) => p.slug === params.slug);
    return {
      meta: [
        { title: `${project?.title ?? "Project Guide"} — JS:GO` },
        {
          name: "description",
          content: project?.objective ?? "JavaScript highlight project guide",
        },
      ],
    };
  },
});

function ProjectPage() {
  const { slug } = Route.useParams();
  const project = getHighlightedProject(slug);

  if (!project) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="text-3xl font-black">Project not found</h1>
        <Link to="/highlighted-projects" className="btn-accent mt-5 inline-flex">
          <ArrowLeft className="h-4 w-4" /> Back to Highlighted Projects
        </Link>
      </div>
    );
  }

  return <ProjectLayout project={project} />;
}
