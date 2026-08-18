import { ArrowDown, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

type Node = { label: string; note?: string };

/** Connected pipeline diagram: stacked on mobile, wrapped rows on larger screens. */
export function FlowChain({
  nodes,
  className,
  compact = false,
}: {
  nodes: Node[];
  className?: string;
  compact?: boolean;
}) {
  return (
    <ol
      className={cn(
        "grid gap-3 sm:grid-flow-row sm:auto-rows-auto",
        "sm:flex sm:flex-wrap sm:items-stretch",
        className,
      )}
    >
      {nodes.map((node, index) => (
        <li key={node.label} className="flex items-center gap-3 sm:contents">
          <div
            className={cn(
              "min-w-0 flex-1 rounded-md border border-border bg-card px-4 py-3 transition-colors hover:border-accent/60 hover:bg-card-hover sm:flex-none",
              compact ? "sm:min-w-[9.5rem]" : "sm:min-w-[11rem]",
            )}
          >
            <p className="flex items-center gap-2 text-sm font-semibold">
              <span aria-hidden className="flow-dot size-1.5 rounded-full bg-accent" />
              {node.label}
            </p>
            {node.note && <p className="mt-1 text-xs text-muted-foreground">{node.note}</p>}
          </div>
          {index < nodes.length - 1 && (
            <>
              <ArrowDown
                aria-hidden
                className="size-4 shrink-0 text-muted-foreground sm:hidden"
              />
              <ArrowRight
                aria-hidden
                className="hidden size-4 shrink-0 self-center text-muted-foreground sm:block"
              />
            </>
          )}
        </li>
      ))}
    </ol>
  );
}