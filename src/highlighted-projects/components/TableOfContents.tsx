import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  title: string;
}

const TOC_ITEMS: TocItem[] = [
  { id: "overview", title: "1. Overview" },
  { id: "objectives", title: "2. Learning Objectives" },
  { id: "preview", title: "3. Final Project Preview" },
  { id: "concepts", title: "4. Concepts Covered" },
  { id: "prerequisites", title: "5. Prerequisites" },
  { id: "planning", title: "6. Project Planning" },
  { id: "build", title: "7. Step-by-Step Guide" },
  { id: "engineering", title: "8. Engineering Notes" },
  { id: "mistakes", title: "9. Common Mistakes" },
  { id: "debugging", title: "10. Debugging Workflow" },
  { id: "checklist", title: "11. Verification Checklist" },
  { id: "stretch", title: "12. Stretch Challenges" },
  { id: "reflection", title: "13. Reflection" },
  { id: "resources", title: "14. Resources" },
  { id: "next", title: "15. Next Project" },
];

export function TableOfContents() {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((e) => e.isIntersecting);
        if (visibleEntry) {
          setActiveId(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0.1,
      },
    );

    TOC_ITEMS.forEach((item) => {
      const el = document.getElementById(`section-container-${item.id}`);
      if (el) observer.observe(el);
    });

    return () => {
      TOC_ITEMS.forEach((item) => {
        const el = document.getElementById(`section-container-${item.id}`);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const handleScrollTo = (id: string) => {
    // Locate the container and header button
    const container = document.getElementById(`section-container-${id}`);
    const headerBtn = document.getElementById(`section-header-${id}`) as HTMLButtonElement | null;
    const content = document.getElementById(`section-content-${id}`);

    // If the accordion content is collapsed, programmatically trigger click on header button to open it
    if (content && content.classList.contains("hidden") && headerBtn) {
      headerBtn.click();
    }

    // Delay scroll slightly to allow the element to render/expand
    setTimeout(() => {
      if (container) {
        const topOffset = container.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: topOffset, behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <nav
      className="flex flex-col gap-1.5 p-4 rounded-xl border-2 border-border bg-card shadow-[4px_4px_0_0_var(--color-border)]"
      aria-label="Table of contents"
    >
      <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2 px-1">
        COURSE OUTLINE
      </div>
      <ul className="space-y-1">
        {TOC_ITEMS.map((item) => {
          const isActive = activeId === `section-container-${item.id}`;
          return (
            <li key={item.id}>
              <button
                onClick={() => handleScrollTo(item.id)}
                className={`w-full text-left text-xs font-semibold px-2 py-1.5 rounded transition ${
                  isActive
                    ? "bg-accent/20 text-foreground border-l-4 border-accent pl-1.5"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {item.title}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
