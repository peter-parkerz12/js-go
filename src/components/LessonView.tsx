import { Link } from "@tanstack/react-router";
import {
  Bookmark,
  BookmarkCheck,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Clock,
  Lightbulb,
  Target,
} from "lucide-react";
import { CodeBlock } from "./CodeBlock";
import type { Lesson } from "@/data/curriculum";
import { neighbors } from "@/data/curriculum";
import { useAppStore } from "@/store/useAppStore";

export function LessonView({ lesson }: { lesson: Lesson }) {
  const bookmarks = useAppStore((s) => s.bookmarks);
  const completed = useAppStore((s) => s.completed);
  const toggleBookmark = useAppStore((s) => s.toggleBookmark);
  const toggleCompleted = useAppStore((s) => s.toggleCompleted);
  const { prev, next } = neighbors(lesson.slug);

  const bookmarked = bookmarks.includes(lesson.slug);
  const isDone = completed.includes(lesson.slug);

  return (
    <article className="mx-auto max-w-3xl px-4 py-6 sm:py-8">
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <span className="chip">{lesson.phase}</span>
        <span className="chip">
          <Target className="h-3 w-3" /> {lesson.difficulty}
        </span>
        <span className="chip">
          <Clock className="h-3 w-3" /> {lesson.estimatedTime}
        </span>
      </div>
      <h1
        className="text-2xl font-black leading-tight tracking-tight sm:text-3xl md:text-4xl"
        style={{ textWrap: "balance" }}
      >
        {lesson.title}
      </h1>
      <p className="mt-3 text-lg text-muted-foreground">{lesson.description}</p>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <button
          onClick={() => toggleBookmark(lesson.slug)}
          className={bookmarked ? "btn-accent" : "btn-ghost"}
        >
          {bookmarked ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
          {bookmarked ? "Bookmarked" : "Bookmark"}
        </button>
        <button
          onClick={() => toggleCompleted(lesson.slug)}
          className={isDone ? "btn-brutal" : "btn-ghost"}
        >
          <CircleCheck className="h-4 w-4" />
          {isDone ? "Completed" : "Mark complete"}
        </button>
      </div>

      {lesson.objectives.length > 0 && (
        <div className="bento mt-8 p-5">
          <div className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            You will learn
          </div>
          <ul className="space-y-1.5">
            {lesson.objectives.map((o) => (
              <li key={o} className="flex items-start gap-2 text-sm">
                <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-success)]" /> {o}
              </li>
            ))}
          </ul>
        </div>
      )}

      {lesson.analogy && (
        <div className="mt-6 rounded-xl border-2 border-border bg-accent/10 p-5">
          <div className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent">
            <Lightbulb className="h-3.5 w-3.5" /> Analogy
          </div>
          <p className="text-sm">{lesson.analogy}</p>
        </div>
      )}

      <div className="prose-doc mt-6">
        {lesson.body.map((b, i) => {
          if (b.type === "p") return <p key={i}>{b.text}</p>;
          if (b.type === "h") return <h3 key={i}>{b.text}</h3>;
          if (b.type === "list")
            return (
              <ul key={i}>
                {b.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            );
          if (b.type === "code")
            return <CodeBlock key={i} code={b.code} lang={b.lang} title={b.title} />;
          if (b.type === "callout") {
            const tone = b.tone;
            const color =
              tone === "warn"
                ? "var(--color-warning)"
                : tone === "info"
                  ? "var(--color-accent-2)"
                  : "var(--color-success)";
            return (
              <div
                key={i}
                className="my-5 rounded-xl border-2 border-border p-4 text-sm"
                style={{ background: `color-mix(in oklab, ${color} 15%, transparent)` }}
              >
                {b.text}
              </div>
            );
          }
          return null;
        })}
      </div>

      {(lesson.mistakes?.length || lesson.bestPractices?.length) && (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {lesson.mistakes?.length ? (
            <div className="bento p-5">
              <div className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--color-warning)]">
                Common mistakes
              </div>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {lesson.mistakes.map((m) => (
                  <li key={m}>• {m}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {lesson.bestPractices?.length ? (
            <div className="bento p-5">
              <div className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--color-success)]">
                Best practices
              </div>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {lesson.bestPractices.map((m) => (
                  <li key={m}>• {m}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      )}

      {lesson.practice?.length ? (
        <div className="bento mt-6 p-5">
          <div className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Practice
          </div>
          <ul className="space-y-1.5 text-sm">
            {lesson.practice.map((m) => (
              <li key={m}>→ {m}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="bento mt-8 p-5">
        <div className="mb-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Summary
        </div>
        <p className="text-sm">{lesson.summary}</p>
      </div>

      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        {prev ? (
          <Link
            to="/learn/javascript/$slug"
            params={{ slug: prev.slug }}
<<<<<<< HEAD
            className="bento bento-hover flex items-center gap-3 p-4"
=======
            className="bento bento-hover flex min-w-0 items-center gap-3 p-4"
>>>>>>> fd8bc72495f2244aff2974795fe3ecec7fd909df
          >
            <ChevronLeft className="h-5 w-5 shrink-0" />
            <div className="min-w-0">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Previous
              </div>
              <div className="truncate text-sm font-semibold">{prev.title}</div>
            </div>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            to="/learn/javascript/$slug"
            params={{ slug: next.slug }}
<<<<<<< HEAD
            className="bento bento-hover flex items-center justify-end gap-3 p-4 text-right"
          >
            <div>
=======
            className="bento bento-hover flex min-w-0 items-center justify-end gap-3 p-4 text-right"
          >
            <div className="min-w-0">
>>>>>>> fd8bc72495f2244aff2974795fe3ecec7fd909df
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Next</div>
              <div className="truncate text-sm font-semibold">{next.title}</div>
            </div>
            <ChevronRight className="h-5 w-5 shrink-0" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </article>
  );
}
