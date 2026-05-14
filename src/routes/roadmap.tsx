import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/roadmap")({
  component: Roadmap,
  head: () => ({
    meta: [
      { title: "Roadmap — JS:GO" },
      {
        name: "description",
        content:
          "A 60–90 day plan to go from absolute beginner to React-ready JavaScript developer.",
      },
    ],
  }),
});

const PLAN = [
  {
    week: "Week 1–2",
    title: "HTML & CSS Foundations",
    items: [
      "HTML5 boilerplate",
      "Semantic tags",
      "Forms",
      "Box model",
      "Flexbox",
      "Grid",
      "Responsive design",
    ],
    link: "/learn/html",
  },
  {
    week: "Week 3–4",
    title: "JavaScript Foundations",
    items: ["Variables & types", "Operators", "Functions", "Scope & closures", "Arrays & objects"],
    link: "/learn/javascript/what-is-javascript",
  },
  {
    week: "Week 5",
    title: "DOM & Events",
    items: ["querySelector", "Manipulation", "Event delegation", "Forms with JS"],
    link: "/learn/javascript/dom-basics",
  },
  {
    week: "Week 6",
    title: "Async JavaScript",
    items: ["Event loop", "Promises", "async/await", "fetch", "AbortController"],
    link: "/learn/javascript/event-loop",
  },
  {
    week: "Week 7",
    title: "OOP, FP, Modules",
    items: ["Prototypes & classes", "Pure functions", "Composition", "import/export"],
    link: "/learn/javascript/prototypes-classes",
  },
  {
    week: "Week 8",
    title: "Modern JS + Tooling",
    items: ["ES2024+", "npm + Vite", "ESLint, Prettier", "structuredClone, toSorted"],
    link: "/learn/javascript/modern-js",
  },
  {
    week: "Week 9–10",
    title: "Projects",
    items: ["Todo App", "Weather", "Markdown previewer", "Kanban"],
    link: "/projects",
  },
  {
    week: "Week 11–12",
    title: "React-Ready",
    items: [
      "The 20% of JS that powers React",
      "Components mental model",
      "Build a small app",
      "Read real source",
    ],
    link: "/learn/javascript/twenty-percent-for-react",
  },
];

function Roadmap() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:py-16">
      <div className="mb-8 max-w-2xl">
        <span className="chip">
          <Calendar className="h-3 w-3" /> 60–90 day plan
        </span>
        <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">The roadmap</h1>
        <p className="mt-3 text-muted-foreground">
          Follow this path 30–60 minutes a day for ~3 months. Skip nothing. Build along the way.
        </p>
      </div>
      <ol className="space-y-4">
        {PLAN.map((p, i) => (
          <li key={p.week} className="bento p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {p.week}
                </div>
                <h2 className="mt-1 text-2xl font-extrabold tracking-tight">
                  <span className="mr-2 text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {p.title}
                </h2>
              </div>
              <Link to={p.link} className="btn-ghost">
                Start →
              </Link>
            </div>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {p.items.map((it) => (
                <li key={it} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-[var(--color-success)]" /> {it}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
