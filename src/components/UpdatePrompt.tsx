import { ArrowUpRight, RefreshCcw } from "lucide-react";
import { useSWUpdate } from "@/hooks/useSWUpdate";

export function UpdatePrompt() {
  const { updateAvailable, activateUpdate } = useSWUpdate();

  if (!updateAvailable) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[min(92vw,420px)] -translate-x-1/2 rounded-2xl border-2 border-border bg-card p-4 shadow-[0_10px_0_0_var(--color-border)]">
      <div className="flex items-start gap-3">
        <div className="mt-1 rounded-full border border-border bg-accent p-2 text-accent-foreground">
          <ArrowUpRight className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <p className="font-semibold">New version available</p>
          <p className="mt-1 text-sm text-muted-foreground">Refresh to load the latest content and updates.</p>
        </div>
      </div>
      <button
        onClick={activateUpdate}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-border bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground transition hover:bg-accent-foreground hover:text-accent"
      >
        <RefreshCcw className="h-4 w-4" />
        Update Now
      </button>
    </div>
  );
}
