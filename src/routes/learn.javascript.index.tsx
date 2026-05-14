import { createFileRoute, Link } from "@tanstack/react-router";
import { Sidebar } from "@/components/Sidebar";
import { lessonsByPhase } from "@/data/curriculum";
import { ArrowRight, BookOpen } from "lucide-react";

export const Route = createFileRoute("/learn/javascript/")({
  component: JavaScriptIndex,
  head: () => ({
    meta: [
      { title: "JavaScript — JS:GO" },
      { name: "description", content: "The complete JavaScript syllabus, beginner to advanced." },
    ],
  }),
});

function JavaScriptIndex() {
  const phases = lessonsByPhase("javascript");
  return (
    <div className="mx-auto grid max-w-[1400px] grid-cols-1 lg:grid-cols-[280px_1fr]">
      <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] border-r-2 border-border lg:block">
        <Sidebar />
      </aside>
      <div className="px-4 py-10 md:py-12">
        <div className="mb-8 max-w-2xl">
          <span className="chip">
            <BookOpen className="h-3 w-3" /> JavaScript
          </span>
          <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
            JavaScript — from zero to advanced
          </h1>
          <p className="mt-3 text-muted-foreground">
            Every topic, in the right order. Each lesson is short, opinionated, and ends with
            practice.
          </p>
        </div>
        <div className="space-y-8">
          {phases.map(([phase, lessons]) => (
            <section key={phase}>
              <h2 className="mb-3 text-lg font-extrabold tracking-tight">{phase}</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {lessons.map((l) => (
                  <Link
                    key={l.slug}
                    to={`/learn/javascript/${l.slug}`}
                    className="bento bento-hover group flex flex-col gap-2 p-5"
                  >
                    <div className="flex items-center gap-2">
                      <span className="chip">{l.difficulty}</span>
                      <span className="font-mono text-[10px] text-muted-foreground">
                        {l.estimatedTime}
                      </span>
                    </div>
                    <h3 className="text-base font-extrabold tracking-tight">{l.title}</h3>
                    <p className="text-sm text-muted-foreground">{l.description}</p>
                    <div className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-accent">
                      Open <ArrowRight className="h-3 w-3 transition group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
