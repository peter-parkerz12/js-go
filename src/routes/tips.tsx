import { createFileRoute } from "@tanstack/react-router";
import { TIPS } from "@/data/tips";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/tips")({
  component: TipsPage,
  head: () => ({
    meta: [
      { title: "Tips & Discipline — JS:GO" },
      {
        name: "description",
        content: "Productivity, learning, and mindset systems for developers.",
      },
    ],
  }),
});

function TipsPage() {
  const cats = Array.from(new Set(TIPS.map((t) => t.category)));
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <span className="chip">
        <Sparkles className="h-3 w-3" /> Mindset
      </span>
      <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Tips & discipline</h1>
      <p className="mt-3 max-w-xl text-muted-foreground">
        Skill compounds when habits do. These are the systems behind learning fast and staying out
        of tutorial hell.
      </p>
      {cats.map((cat) => (
        <section key={cat} className="mt-8">
          <h2 className="mb-3 text-lg font-extrabold tracking-tight">{cat}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {TIPS.filter((t) => t.category === cat).map((t) => (
              <article key={t.slug} className="bento p-5">
                <h3 className="text-lg font-extrabold tracking-tight">{t.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t.body}</p>
                {t.bullets && (
                  <ul className="mt-3 space-y-1 text-sm">
                    {t.bullets.map((b) => (
                      <li key={b}>→ {b}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
