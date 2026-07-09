import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, BookOpen, Code2, Sparkles } from "lucide-react";
import { lessonsByPhase, lessonsByTrack } from "@/data/curriculum";
import { useAppStore } from "@/store/useAppStore";

const TRACK_META = {
  html: { label: "HTML", icon: Code2 },
  css: { label: "CSS", icon: Sparkles },
  javascript: { label: "JavaScript", icon: BookOpen },
} as const;

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const path = useRouterState({ select: (r) => r.location.pathname });
  const completed = useAppStore((s) => s.completed);

  const initialTrack: "html" | "css" | "javascript" = path.includes("/learn/html")
    ? "html"
    : path.includes("/learn/css")
      ? "css"
      : "javascript";

  const [openTrack, setOpenTrack] = useState<"html" | "css" | "javascript">(initialTrack);
  const [openPhases, setOpenPhases] = useState<Record<string, boolean>>({});

  return (
    <nav className="flex h-full flex-col gap-1 overflow-y-auto scrollbar-thin p-3 text-sm">
      {(["javascript", "html", "css"] as const).map((track) => {
        const Meta = TRACK_META[track];
        const Icon = Meta.icon;
        const isOpen = openTrack === track;
        const total = lessonsByTrack(track).length;
        const done = lessonsByTrack(track).filter((l) => completed.includes(l.slug)).length;
        return (
          <div key={track}>
            <button
              onClick={() => setOpenTrack(isOpen ? ("none" as never) : track)}
              className="flex w-full items-center justify-between rounded-lg border-2 border-border bg-card px-3 py-2 font-bold transition hover:bg-muted"
            >
              <span className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                {Meta.label}
              </span>
              <span className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-muted-foreground">
                  {done}/{total}
                </span>
                <ChevronDown className={`h-4 w-4 transition ${isOpen ? "rotate-180" : ""}`} />
              </span>
            </button>
            {isOpen && (
              <div className="mt-1 space-y-1 pl-2">
                {lessonsByPhase(track).map(([phase, lessons]) => {
                  const key = `${track}::${phase}`;
                  const open = openPhases[key] ?? true;
                  return (
                    <div key={phase}>
                      <button
                        onClick={() => setOpenPhases((p) => ({ ...p, [key]: !open }))}
                        className="flex w-full items-center justify-between px-2 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                      >
                        {phase}
                        <ChevronDown className={`h-3 w-3 transition ${open ? "rotate-180" : ""}`} />
                      </button>
                      {open && (
                        <ul className="space-y-0.5">
                          {lessons.map((l) => {
                            const href =
                              track === "javascript"
                                ? `/learn/javascript/${l.slug}`
                                : `/learn/${track}#${l.slug}`;
                            const active = path === href;
                            const isDone = completed.includes(l.slug);
                            return (
                              <li key={l.slug}>
                                <Link
                                  to={href}
                                  onClick={onNavigate}
                                  className={`flex items-center justify-between gap-2 rounded-md border border-transparent px-3 py-1.5 transition ${
                                    active
                                      ? "border-border bg-accent/15 text-foreground"
                                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                  }`}
                                >
                                  <span className="truncate">{l.title}</span>
                                  {isDone && (
                                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-success)]" />
                                  )}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
