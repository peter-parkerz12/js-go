import { Link } from "@tanstack/react-router";
import { ChevronRight, Home } from "lucide-react";

export function Breadcrumbs({ projectTitle }: { projectTitle?: string }) {
  return (
    <nav
      className="flex items-center gap-1.5 text-xs text-muted-foreground"
      aria-label="Breadcrumb"
    >
      <Link
        to="/"
        className="flex items-center gap-1 hover:text-foreground transition-colors"
        aria-label="Home"
      >
        <Home className="h-3.5 w-3.5" />
      </Link>
      <ChevronRight className="h-3 w-3 shrink-0" />

      <Link to="/projects" className="hover:text-foreground transition-colors">
        Projects
      </Link>
      <ChevronRight className="h-3 w-3 shrink-0" />

      <Link to="/highlighted-projects" className="hover:text-foreground transition-colors">
        Highlighted
      </Link>

      {projectTitle && (
        <>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <span className="font-semibold text-foreground truncate max-w-[150px] sm:max-w-xs">
            {projectTitle}
          </span>
        </>
      )}
    </nav>
  );
}
