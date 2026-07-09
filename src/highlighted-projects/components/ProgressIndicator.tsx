import { useEffect, useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { CircleCheck, Trophy } from "lucide-react";

export function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight === 0) {
        setScrollProgress(0);
        return;
      }
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Fire once initially
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-[54px] left-0 z-50 h-1 bg-[var(--color-accent-2)] transition-all duration-75"
      style={{ width: `${scrollProgress}%` }}
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={Math.round(scrollProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
}

export function ProjectCompletion({ slug }: { slug: string }) {
  const completed = useAppStore((s) => s.completed);
  const toggleCompleted = useAppStore((s) => s.toggleCompleted);

  const isDone = completed.includes(`highlighted-${slug}`);

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => toggleCompleted(`highlighted-${slug}`)}
        className={`btn-brutal gap-2 text-xs md:text-sm py-2 px-4 shadow-[2px_2px_0_0_var(--color-border)] hover:shadow-[3px_3px_0_0_var(--color-border)] ${
          isDone
            ? "bg-[var(--color-success)] text-white hover:translate-y-0 active:translate-y-0"
            : "btn-ghost"
        }`}
        aria-pressed={isDone}
      >
        <CircleCheck
          className={`h-4 w-4 ${isDone ? "fill-white text-[var(--color-success)]" : ""}`}
        />
        <span>{isDone ? "Project Completed" : "Mark as Completed"}</span>
      </button>
      {isDone && (
        <span
          className="chip bg-[var(--color-success)]/10 text-[var(--color-success)] border-[var(--color-success)]/30 animate-pulse"
          role="status"
        >
          <Trophy className="h-3.5 w-3.5" />
          React Ready!
        </span>
      )}
    </div>
  );
}
