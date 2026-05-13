import Fuse from "fuse.js";
import { useEffect, useMemo, useRef, useState } from "react";
import { LESSONS } from "@/data/curriculum";
import { Search, ArrowRight } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

interface Item {
  title: string;
  description: string;
  href: string;
  group: string;
  tags?: string[];
}

const ITEMS: Item[] = [
  ...LESSONS.map((l) => ({
    title: l.title,
    description: l.description,
    href: l.track === "javascript" ? `/learn/javascript/${l.slug}` : `/learn/${l.track}#${l.slug}`,
    group: l.phase,
    tags: l.tags,
  })),
  { title: "Roadmap", description: "Your 60–90 day plan", href: "/roadmap", group: "Pages" },
  { title: "Projects", description: "Build to learn", href: "/projects", group: "Pages" },
  { title: "Practice Playground", description: "Live HTML/CSS/JS sandbox", href: "/practice", group: "Pages" },
  { title: "Tips & Discipline", description: "Productivity and learning systems", href: "/tips", group: "Pages" },
  { title: "Bookmarks", description: "Your saved lessons", href: "/bookmarks", group: "Pages" },
  { title: "Progress", description: "What you have completed", href: "/progress", group: "Pages" },
];

export function CommandPalette({
  open,
  onOpenChange,
  onPick,
}: {
  open: boolean;
  onOpenChange: (b: boolean) => void;
  onPick: (href: string) => void;
}) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const recent = useAppStore((s) => s.recentSearches);
  const pushRecent = useAppStore((s) => s.pushRecent);

  const fuse = useMemo(
    () =>
      new Fuse(ITEMS, {
        keys: ["title", "description", "tags", "group"],
        threshold: 0.35,
        ignoreLocation: true,
      }),
    [],
  );

  const results = useMemo(() => {
    if (!q.trim()) return ITEMS.slice(0, 8);
    return fuse.search(q).slice(0, 12).map((r) => r.item);
  }, [q, fuse]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 30);
    else { setQ(""); setActive(0); }
  }, [open]);

  useEffect(() => { setActive(0); }, [q]);

  if (!open) return null;

  const pick = (item: Item) => {
    if (q.trim()) pushRecent(q.trim());
    onPick(item.href);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center p-4 pt-[12vh]">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => onOpenChange(false)} />
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-xl overflow-hidden rounded-2xl border-2 border-border bg-card shadow-[10px_10px_0_0_var(--color-border)]"
      >
        <div className="flex items-center gap-3 border-b-2 border-border px-4 py-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
              if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
              if (e.key === "Enter" && results[active]) pick(results[active]);
              if (e.key === "Escape") onOpenChange(false);
            }}
            placeholder="Search lessons, projects, pages…"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <kbd className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
            ESC
          </kbd>
        </div>
        <div className="max-h-[60vh] overflow-y-auto scrollbar-thin p-2">
          {!q && recent.length > 0 && (
            <div className="px-3 pb-2 pt-1 text-[10px] uppercase tracking-wider text-muted-foreground">
              Recent
            </div>
          )}
          {!q && recent.slice(0, 4).map((r) => (
            <button
              key={r}
              onClick={() => setQ(r)}
              className="block w-full rounded-md px-3 py-1.5 text-left text-sm text-muted-foreground hover:bg-muted"
            >
              {r}
            </button>
          ))}
          <div className="px-3 pb-2 pt-2 text-[10px] uppercase tracking-wider text-muted-foreground">
            {q ? "Results" : "Suggested"}
          </div>
          {results.length === 0 && (
            <div className="px-3 py-8 text-center text-sm text-muted-foreground">
              Nothing matched “{q}”. Try another word.
            </div>
          )}
          <ul>
            {results.map((r, i) => (
              <li key={r.href}>
                <button
                  onMouseEnter={() => setActive(i)}
                  onClick={() => pick(r)}
                  className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left transition ${
                    i === active ? "bg-accent/15" : "hover:bg-muted"
                  }`}
                >
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold">{r.title}</div>
                    <div className="truncate text-xs text-muted-foreground">{r.description}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="hidden rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground sm:inline">
                      {r.group}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
