import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Moon, Search, Sun, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { Sidebar } from "./Sidebar";
import { CommandPalette } from "./CommandPalette";
import { InstallButton } from "./InstallButton";

export function Header() {
  const navigate = useNavigate();
  const { theme, toggleTheme, setTheme } = useAppStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

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

  // Body scroll lock + Escape-to-close for mobile drawer
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      // Focus the close button when drawer opens
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Keyboard: Escape closes drawer
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [mobileOpen]);

  return (
    <>
      <header
        className="sticky top-0 z-40 border-b-2 border-border bg-background/85 backdrop-blur"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between gap-3 px-4">
          <div className="flex min-w-0 items-center gap-3">
            <button
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border-2 border-border bg-card transition hover:bg-muted lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-haspopup="dialog"
            >
              <Menu className="h-5 w-5" />
            </button>
            <Link to="/" className="flex min-w-0 items-center gap-2 font-black tracking-tight">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border-2 border-border bg-accent text-accent-foreground shadow-[3px_3px_0_0_var(--color-border)]">
                <span className="font-mono text-sm">{"</>"}</span>
              </span>
              <span className="truncate text-lg">JS:GO</span>
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
<<<<<<< HEAD
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
=======
                  className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
                  activeProps={{
                    className:
                      "rounded-md px-3 py-1.5 text-sm font-medium text-foreground bg-muted",
                  }}
>>>>>>> fd8bc72495f2244aff2974795fe3ecec7fd909df
                >
                  {i.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              onClick={() => setPaletteOpen(true)}
              className="hidden items-center gap-2 rounded-lg border-2 border-border bg-card px-3 py-1.5 text-xs text-muted-foreground transition hover:bg-muted sm:inline-flex"
            >
              <Search className="h-3.5 w-3.5 shrink-0" />
              <span className="hidden lg:inline">Search lessons…</span>
              <kbd className="ml-2 rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px]">
                ⌘K
              </kbd>
            </button>
            <button
              onClick={() => setPaletteOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-lg border-2 border-border bg-card transition hover:bg-muted sm:hidden"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <InstallButton />
            <button
              onClick={toggleTheme}
              className="flex h-11 w-11 items-center justify-center rounded-lg border-2 border-border bg-card transition hover:bg-muted"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
<<<<<<< HEAD
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-80 max-w-[85vw] border-r-2 border-border bg-background flex flex-col">
            <div className="flex h-14 items-center justify-between border-b-2 border-border px-4 shrink-0">
=======
        <div
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer panel */}
          <aside
            className="absolute left-0 top-0 flex h-full w-72 max-w-[85vw] flex-col border-r-2 border-border bg-background"
            style={{
              paddingTop: "env(safe-area-inset-top)",
              paddingBottom: "env(safe-area-inset-bottom)",
            }}
          >
            <div className="flex h-14 items-center justify-between border-b-2 border-border px-4">
>>>>>>> fd8bc72495f2244aff2974795fe3ecec7fd909df
              <span className="font-black">Menu</span>
              <button
                ref={closeButtonRef}
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-border transition hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
<<<<<<< HEAD
            
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
=======
            <div className="min-h-0 flex-1 overflow-y-auto">
>>>>>>> fd8bc72495f2244aff2974795fe3ecec7fd909df
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
