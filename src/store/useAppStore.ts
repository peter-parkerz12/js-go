import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "light" | "dark";

interface AppState {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  bookmarks: string[];
  toggleBookmark: (slug: string) => void;
  completed: string[];
  toggleCompleted: (slug: string) => void;
  recentSearches: string[];
  pushRecent: (q: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      theme: "dark",
      setTheme: (theme) => {
        set({ theme });
        if (typeof document !== "undefined") {
          document.documentElement.classList.toggle("dark", theme === "dark");
        }
      },
      toggleTheme: () => get().setTheme(get().theme === "dark" ? "light" : "dark"),
      bookmarks: [],
      toggleBookmark: (slug) =>
        set((s) => ({
          bookmarks: s.bookmarks.includes(slug)
            ? s.bookmarks.filter((x) => x !== slug)
            : [...s.bookmarks, slug],
        })),
      completed: [],
      toggleCompleted: (slug) =>
        set((s) => ({
          completed: s.completed.includes(slug)
            ? s.completed.filter((x) => x !== slug)
            : [...s.completed, slug],
        })),
      recentSearches: [],
      pushRecent: (q) =>
        set((s) => ({
          recentSearches: [q, ...s.recentSearches.filter((x) => x !== q)].slice(0, 8),
        })),
    }),
    { name: "jsgo-store" },
  ),
);
