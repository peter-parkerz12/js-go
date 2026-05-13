import { createFileRoute, Link } from "@tanstack/react-router";
import { useAppStore } from "@/store/useAppStore";
import { LESSONS, lessonsByTrack } from "@/data/curriculum";
import { Trophy } from "lucide-react";

export const Route = createFileRoute("/progress")({
  component: () => {
    const completed = useAppStore((s) => s.completed);
    const total = LESSONS.length;
    const pct = Math.round((completed.length / total) * 100);
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <span className="chip"><Trophy className="h-3 w-3" /> Progress</span>
        <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Your progress</h1>
        <div className="bento mt-6 p-6">
          <div className="flex items-end justify-between">
            <div>
              <div className="font-mono text-5xl font-black">{pct}%</div>
              <div className="text-sm text-muted-foreground">{completed.length} / {total} lessons complete</div>
            </div>
          </div>
          <div className="mt-4 h-3 w-full overflow-hidden rounded-full border-2 border-border bg-background">
            <div className="h-full bg-accent transition-[width] duration-500" style={{ width: `${pct}%` }} />
          </div>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {(["javascript", "html", "css"] as const).map((t) => {
            const list = lessonsByTrack(t);
            const done = list.filter((l) => completed.includes(l.slug)).length;
            return (
              <div key={t} className="bento p-5">
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t}</div>
                <div className="mt-1 font-mono text-2xl font-black">{done}/{list.length}</div>
              </div>
            );
          })}
        </div>
        <Link to="/learn/javascript" className="btn-accent mt-8 inline-flex">Continue learning →</Link>
      </div>
    );
  },
  head: () => ({ meta: [{ title: "Progress — JS:GO" }] }),
});
