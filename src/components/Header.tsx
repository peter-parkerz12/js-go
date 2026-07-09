import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Moon, Search, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { Sidebar } from "./Sidebar";
import { CommandPalette } from "./CommandPalette";
import { InstallButton } from "./InstallButton";

export function Header() {
  const navigate = useNavigate();
  const { theme, toggleTheme, setTheme } = useAppStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  // Apply theme on mount + react to system if first visit
  useEffect(() => {
    if (typeof window === "undefined") return;
    setTheme(theme);
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 border-b-2 border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between gap-3 px-4">
          <div className="flex items-center gap-3">
            <button
              className="rounded-lg border-2 border-border bg-card p-1.5 lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-4 w-4" />
            </button>
            <Link to="/" className="flex items-center gap-2 font-black tracking-tight">
              <span className="grid h-8 w-8 place-items-center rounded-lg border-2 border-border bg-accent text-accent-foreground shadow-[3px_3px_0_0_var(--color-border)]">
                <span className="font-mono text-sm">{"</>"}</span>
              </span>
              <span className="text-lg">JS:GO</span>
            </Link>
            <nav className="ml-4 hidden items-center gap-1.5 md:flex">
              {[
                { to: "/roadmap", label: "Roadmap" },
                { to: "/learn/javascript", label: "Learn" },
                { to: "/projects", label: "Projects" },
                { to: "/highlighted-projects", label: "Highlighted Projects" },
                { to: "/practice", label: "Practice" },
                { to: "/tips", label: "Tips" },
              ].map((i) => (
                <Link
                  key={i.to}
                  to={i.to}
                  className={
                    i.to === "/highlighted-projects"
                      ? "rounded-md px-3 py-1 text-sm font-bold bg-yellow-300 dark:bg-yellow-400 text-black dark:text-black border-2 border-border shadow-[2px_2px_0_0_var(--color-border)] hover:bg-yellow-400 dark:hover:bg-yellow-300 transition-all duration-150 mx-1"
                      : "rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
                  }
                  activeProps={
                    i.to === "/highlighted-projects"
                      ? {
                          className:
                            "rounded-md px-3 py-1 text-sm font-bold bg-yellow-400 dark:bg-yellow-300 text-black dark:text-black border-2 border-border shadow-[3px_3px_0_0_var(--color-border)] mx-1",
                        }
                      : {
                          className:
                            "rounded-md px-3 py-1.5 text-sm font-medium text-foreground bg-muted",
                        }
                  }
                >
                  {i.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPaletteOpen(true)}
              className="hidden items-center gap-2 rounded-lg border-2 border-border bg-card px-3 py-1.5 text-xs text-muted-foreground transition hover:bg-muted sm:inline-flex"
            >
              <Search className="h-3.5 w-3.5" />
              <span>Search lessons…</span>
              <kbd className="ml-2 rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px]">
                ⌘K
              </kbd>
            </button>
            <button
              onClick={() => setPaletteOpen(true)}
              className="rounded-lg border-2 border-border bg-card p-1.5 sm:hidden"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </button>
            <InstallButton />
            <button
              onClick={toggleTheme}
              className="rounded-lg border-2 border-border bg-card p-1.5 transition hover:bg-muted"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-80 max-w-[85vw] border-r-2 border-border bg-background flex flex-col">
            <div className="flex h-14 items-center justify-between border-b-2 border-border px-4 shrink-0">
              <span className="font-black">Menu</span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Primary navigation list for mobile */}
            <div className="border-b-2 border-border p-3 flex flex-col gap-1 shrink-0">
              {[
                { to: "/roadmap", label: "Roadmap" },
                { to: "/learn/javascript", label: "Learn" },
                { to: "/projects", label: "Projects" },
                { to: "/highlighted-projects", label: "Highlighted Projects" },
                { to: "/practice", label: "Practice" },
                { to: "/tips", label: "Tips" },
              ].map((i) => (
                <Link
                  key={i.to}
                  to={i.to}
                  onClick={() => setMobileOpen(false)}
                  className={
                    i.to === "/highlighted-projects"
                      ? "rounded-md px-3 py-1.5 text-center text-sm font-bold bg-yellow-300 dark:bg-yellow-400 text-black dark:text-black border-2 border-border shadow-[2px_2px_0_0_var(--color-border)] hover:bg-yellow-400 dark:hover:bg-yellow-300 transition-all duration-150 my-1"
                      : "rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
                  }
                  activeProps={
                    i.to === "/highlighted-projects"
                      ? {
                          className:
                            "rounded-md px-3 py-1.5 text-center text-sm font-bold bg-yellow-400 dark:bg-yellow-300 text-black dark:text-black border-2 border-border shadow-[3px_3px_0_0_var(--color-border)] my-1",
                        }
                      : {
                          className:
                            "rounded-md px-3 py-1.5 text-sm font-medium text-foreground bg-muted",
                        }
                  }
                >
                  {i.label}
                </Link>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto">
              <Sidebar onNavigate={() => setMobileOpen(false)} />
            </div>
          </aside>
        </div>
      )}

      <CommandPalette
        open={paletteOpen}
        onOpenChange={setPaletteOpen}
        onPick={(href) => {
          setPaletteOpen(false);
          navigate({ to: href });
        }}
      />
    </>
  );
}
