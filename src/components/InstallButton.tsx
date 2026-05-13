import { Download } from "lucide-react";
import { usePWAInstall } from "@/hooks/usePWAInstall";

export function InstallButton() {
  const { canInstall, promptInstall, installed, iosInstall } = usePWAInstall();

  if (installed) return null;

  return (
    <div className="relative">
      {canInstall ? (
        <button
          className="inline-flex items-center gap-2 rounded-lg border-2 border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground transition hover:bg-muted"
          onClick={() => promptInstall()}
          aria-label="Install app"
        >
          <Download className="h-4 w-4" />
          Install App
        </button>
      ) : iosInstall ? (
        <div className="rounded-lg border-2 border-border bg-card p-3 text-xs text-muted-foreground">
          Add to Home Screen: tap Share then "Add to Home Screen".
        </div>
      ) : null}
    </div>
  );
}
