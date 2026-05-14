import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

export function BentoCard({
  title,
  description,
  icon,
  to,
  span,
  accent,
  children,
}: {
  title: string;
  description?: string;
  icon?: ReactNode;
  to?: string;
  span?: "wide" | "tall" | "xl";
  accent?: boolean;
  children?: ReactNode;
}) {
  const cls = `bento bento-hover relative flex flex-col gap-3 p-5 ${
    span === "wide"
      ? "md:col-span-2"
      : span === "tall"
        ? "md:row-span-2"
        : span === "xl"
          ? "md:col-span-2 md:row-span-2"
          : ""
  } ${accent ? "bg-accent text-accent-foreground" : ""}`;
  const inner = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl border-2 border-border bg-background/40">
          {icon}
        </div>
        {to && <ArrowUpRight className="h-4 w-4 opacity-60 transition group-hover:opacity-100" />}
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-extrabold tracking-tight">{title}</h3>
        {description && (
          <p className={`text-sm ${accent ? "opacity-80" : "text-muted-foreground"}`}>
            {description}
          </p>
        )}
      </div>
      {children}
    </>
  );
  if (to)
    return (
      <Link to={to} className={`${cls} group no-underline`}>
        {inner}
      </Link>
    );
  return <div className={cls}>{inner}</div>;
}
