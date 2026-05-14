import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: () => (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-4xl font-black tracking-tight md:text-5xl">About JS:GO</h1>
      <p className="mt-4 text-muted-foreground">
        JS:GO is a focused learning platform for HTML, CSS, and modern JavaScript. Every lesson is
        short, opinionated, and ends with practice. The goal is simple: in 60–90 days you should be
        ready to step into React or Next.js without feeling lost.
      </p>
      <div className="bento mt-6 p-5">
        <h2 className="text-lg font-extrabold tracking-tight">What makes it different</h2>
        <ul className="mt-3 space-y-2 text-sm">
          <li>→ MDN-level completeness, beginner-level explanations.</li>
          <li>→ Zero fluff, zero jargon. No chapters of intro before the code.</li>
          <li>→ Color-coded code blocks with copy buttons and line numbers.</li>
          <li>→ A live HTML/CSS/JS playground built in.</li>
          <li>→ Bookmarks, progress, and a search palette (⌘K).</li>
        </ul>
      </div>
    </div>
  ),
  head: () => ({ meta: [{ title: "About — JS:GO" }] }),
});
