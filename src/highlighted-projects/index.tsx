import { Link } from "@tanstack/react-router";
import { HIGHLIGHTED_PROJECTS } from "./data";
import { useAppStore } from "@/store/useAppStore";
import { ArrowRight, BookOpen, Clock, Target, Hammer, GraduationCap, Award } from "lucide-react";
import { Breadcrumbs } from "./components/Breadcrumbs";

export function LandingPage() {
  const completed = useAppStore((s) => s.completed);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <Breadcrumbs />
      </div>

      {/* Hero Header */}
      <section className="mb-10 text-center md:text-left">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-border bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">
          <GraduationCap className="h-4 w-4" />
          <span>Curriculum Learning Path</span>
        </div>
        <h1 className="text-4xl font-black leading-tight tracking-tight md:text-6xl text-foreground">
          Highlighted Projects
        </h1>
        <p className="mt-4 max-w-3xl text-lg md:text-xl text-muted-foreground">
          A premium, interactive curriculum that bridges the gap between basic syntax and
          professional frontend engineering. Learn not just WHAT to write, but WHY every pattern
          exists.
        </p>
      </section>

      {/* Why Projects Matter section */}
      <section className="grid gap-6 md:grid-cols-2 mb-12">
        <div className="bento p-6 bg-card border-l-4 border-l-accent flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-extrabold mb-3 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-accent" /> Why Projects Matter
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Reading documentation teaches syntax—the vocabulary of programming. Building projects
              teaches engineering—the grammar and structure.
              <br />
              <br />
              This course is specifically structured to force active recall. Every project
              introduces new web APIs, layout strategies, and data structures while reinforcing
              prior concepts. By writing solutions yourself, you develop a mental model of layout
              engines, asynchronous processes, and state synchronization.
            </p>
          </div>
        </div>

        <div className="bento p-6 bg-card border-l-4 border-l-[var(--color-accent-2)] flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-extrabold mb-3 flex items-center gap-2">
              <Award className="h-5 w-5 text-[var(--color-accent-2)]" /> The React Readiness Path
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Why do developers struggle to learn React? Because React introduces state
              reconciliation, asynchronous effects, and props updates all at once.
              <br />
              <br />
              These 6 projects are arranged in a strict progressive sequence. You will run into the
              limits of manual DOM manipulation (layout thrashing, messy string parsing, unsynced
              lists). By Project 6, you will naturally understand the pain points React solves,
              making frameworks feel like a logical next step rather than a confusing hurdle.
            </p>
          </div>
        </div>
      </section>

      {/* Project Cards list grid */}
      <section>
        <h2 className="text-2xl font-black mb-6 tracking-tight">The 6-Step Progressive Path</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {HIGHLIGHTED_PROJECTS.map((project) => {
            const isCompleted = completed.includes(`highlighted-${project.slug}`);

            return (
              <article
                key={project.slug}
                className={`bento bento-hover p-6 bg-card flex flex-col justify-between relative overflow-hidden ${
                  isCompleted ? "border-[var(--color-success)] bg-[var(--color-success)]/5" : ""
                }`}
              >
                {/* Completion Check Ribbon */}
                {isCompleted && (
                  <div className="absolute top-0 right-0 bg-[var(--color-success)] text-white px-2.5 py-0.5 text-[9px] font-mono font-bold rounded-bl-lg border-l border-b border-border shadow-[1.5px_1.5px_0_0_var(--color-border)]">
                    COMPLETED
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="grid h-8 w-8 place-items-center rounded-lg border-2 border-border bg-muted font-mono text-xs font-black shadow-[2px_2px_0_0_var(--color-border)]">
                      {String(project.projectNumber).padStart(2, "0")}
                    </span>
                    <div className="flex gap-1.5">
                      <span className="chip text-[10px] py-0.5 px-2">
                        <Target className="h-3 w-3" /> {project.difficulty}
                      </span>
                      <span className="chip text-[10px] py-0.5 px-2">
                        <Clock className="h-3 w-3" /> {project.estimatedTime}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-extrabold tracking-tight mb-2 text-foreground flex items-center gap-2">
                    {project.title}
                  </h3>

                  <p className="text-xs text-muted-foreground font-medium mb-4 leading-relaxed line-clamp-2">
                    <strong>Objective:</strong> {project.objective}
                  </p>

                  <div className="mb-4 p-3 bg-muted/50 rounded-xl border border-border text-xs leading-relaxed text-muted-foreground">
                    <strong>Real-World:</strong> {project.realWorldRelevance}
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.technologiesUsed.map((tech) => (
                      <span
                        key={tech}
                        className="rounded border border-border bg-background/50 px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                    <span className="rounded border border-[var(--color-accent-2)]/30 bg-[var(--color-accent-2)]/5 px-1.5 py-0.5 font-mono text-[9px] text-[var(--color-accent-2)] font-semibold">
                      {project.conceptCount} Concepts
                    </span>
                  </div>
                </div>

                <div className="border-t border-border/60 pt-4 flex items-center justify-between mt-auto">
                  {/* Small progress label */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${isCompleted ? "bg-[var(--color-success)]" : "bg-zinc-400"}`}
                    />
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">
                      {isCompleted ? "Ready for Next" : "Not Started"}
                    </span>
                  </div>

                  <Link
                    to="/highlighted-projects/$slug"
                    params={{ slug: project.slug }}
                    className="btn-accent text-xs py-1.5 px-3 flex items-center gap-1 shadow-[2px_2px_0_0_var(--color-border)]"
                  >
                    <span>Start Guide</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
