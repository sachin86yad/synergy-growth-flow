import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
  className?: string;
  align?: "left" | "center";
  as?: "section" | "div";
};

export function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
  className,
  align = "left",
}: SectionProps) {
  return (
    <section id={id} className={cn("section-y", className)}>
      <div className="container-page">
        {(eyebrow || title || lead) && (
          <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {title && (
              <h2 className="mt-4 text-[length:var(--text-display)] font-semibold">{title}</h2>
            )}
            {lead && (
              <p
                className={cn(
                  "measure mt-5 text-[length:var(--text-body-lg)] text-muted-foreground",
                  align === "center" && "mx-auto",
                )}
              >
                {lead}
              </p>
            )}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}