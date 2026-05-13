import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/search")({
  component: () => (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h1 className="text-3xl font-black tracking-tight">Search</h1>
      <p className="mt-3 text-muted-foreground">
        Press <kbd className="rounded border border-border bg-card px-1.5 py-0.5 font-mono text-xs">⌘K</kbd> /
        <kbd className="ml-1 rounded border border-border bg-card px-1.5 py-0.5 font-mono text-xs">Ctrl K</kbd> to open the command palette from anywhere.
      </p>
    </div>
  ),
  head: () => ({ meta: [{ title: "Search — JS:GO" }] }),
});
