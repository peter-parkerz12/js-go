import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/productivity")({
  component: () => (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-4xl font-black tracking-tight md:text-5xl">Productivity</h1>
      <p className="mt-3 text-muted-foreground">A short, working system for daily progress.</p>
      <div className="mt-6 space-y-4">
        {[
          {
            t: "Morning: 1 question",
            b: "Write the ONE thing you will ship today on a sticky note.",
          },
          { t: "Block: 90 minutes", b: "Phone in another room. One tab. A real timer." },
          {
            t: "Recall: 5 minutes",
            b: "Close the tab. Try to rebuild what you just learned without looking.",
          },
          { t: "Ship: 1 commit", b: "Push something — even tiny. Streaks beat heroics." },
          { t: "Review: weekly", b: "What did you build? What stuck? What is next?" },
        ].map((s) => (
          <div key={s.t} className="bento p-5">
            <div className="font-extrabold">{s.t}</div>
            <div className="mt-1 text-sm text-muted-foreground">{s.b}</div>
          </div>
        ))}
      </div>
      <Link to="/tips" className="btn-ghost mt-8 inline-flex">
        More mindset tips →
      </Link>
    </div>
  ),
  head: () => ({
    meta: [
      { title: "Productivity — JS:GO" },
      { name: "description", content: "Daily systems for steady progress." },
    ],
  }),
});
