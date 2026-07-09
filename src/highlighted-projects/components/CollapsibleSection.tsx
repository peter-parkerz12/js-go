import { useState, ReactNode } from "react";
import { ChevronDown } from "lucide-react";

interface CollapsibleSectionProps {
  id: string;
  title: string;
  sectionNumber: number;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function CollapsibleSection({
  id,
  title,
  sectionNumber,
  children,
  defaultOpen = false,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <section className="bento bg-card overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`section-content-${id}`}
        id={`section-header-${id}`}
        className="flex w-full items-center justify-between p-5 text-left font-extrabold tracking-tight transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span className="flex items-center gap-3">
          <span className="grid h-6 w-6 place-items-center rounded-md border border-border bg-accent text-[10px] font-mono text-accent-foreground shadow-[1.5px_1.5px_0_0_var(--color-border)]">
            {String(sectionNumber).padStart(2, "0")}
          </span>
          <span className="text-base md:text-lg">{title}</span>
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        id={`section-content-${id}`}
        role="region"
        aria-labelledby={`section-header-${id}`}
        className={`transition-all duration-200 ${
          isOpen ? "block border-t-2 border-border p-5 prose-doc" : "hidden"
        }`}
      >
        {children}
      </div>
    </section>
  );
}
