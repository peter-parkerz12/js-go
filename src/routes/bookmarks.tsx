import { createFileRoute, Link } from "@tanstack/react-router";
import { useAppStore } from "@/store/useAppStore";
import { LESSONS } from "@/data/curriculum";
import { Bookmark } from "lucide-react";

export const Route = createFileRoute("/bookmarks")({
  component: () => {
    const bookmarks = useAppStore((s) => s.bookmarks);
    const items = LESSONS.filter((l) => bookmarks.includes(l.slug));
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <span className="chip"><Bookmark className="h-3 w-3" /> Saved</span>
        <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Bookmarks</h1>
        {items.length === 0 ? (
          <div className="bento mt-6 p-6 text-sm text-muted-foreground">
            No bookmarks yet. Open any lesson and click <strong>Bookmark</strong>.
          </div>
        ) : (
          <ul className="mt-6 space-y-3">
            {items.map((l) => (
              <li key={l.slug}>
                <Link to={`/learn/javascript/${l.slug}`} className="bento bento-hover block p-5">
                  <div className="font-extrabold">{l.title}</div>
                  <div className="text-sm text-muted-foreground">{l.description}</div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  },
  head: () => ({ meta: [{ title: "Bookmarks — JS:GO" }] }),
});
