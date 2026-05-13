import { createFileRoute } from "@tanstack/react-router";
import { PROJECTS } from "@/data/projects";
import { Hammer } from "lucide-react";

export const Route = createFileRoute("/projects")({
  component: ProjectsPage,
  head: () => ({ meta: [{ title: "Projects — JS:GO" }, { name: "description", content: "Real builds you can ship." }] }),
});

function ProjectsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <span className="chip"><Hammer className="h-3 w-3" /> Build to learn</span>
      <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Projects</h1>
      <p className="mt-3 max-w-xl text-muted-foreground">
        Reading is not learning. These projects make the concepts permanent.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {PROJECTS.map((p) => (
          <article key={p.slug} className="bento bento-hover p-6">
            <div className="mb-2 flex flex-wrap gap-2">
              <span className="chip">{p.difficulty}</span>
              {p.concepts.slice(0, 3).map((c) => (
                <span key={c} className="chip">{c}</span>
              ))}
            </div>
            <h2 className="text-xl font-extrabold tracking-tight">{p.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
            <div className="mt-4">
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Steps</div>
              <ol className="mt-1 list-decimal space-y-1 pl-4 text-sm">
                {p.steps.map((s) => <li key={s}>{s}</li>)}
              </ol>
            </div>
            <div className="mt-3">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-accent-2)]">Stretch goals</div>
              <ul className="mt-1 list-disc space-y-1 pl-4 text-sm text-muted-foreground">
                {p.challenges.map((c) => <li key={c}>{c}</li>)}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
