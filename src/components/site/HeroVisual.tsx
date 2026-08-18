import { Bot, Building2, Database, Globe, UserCheck, Workflow } from "lucide-react";

const stages = [
  { icon: Globe, label: "Website", note: "Fast, clear, built to convert" },
  { icon: Bot, label: "AI Chatbot", note: "Answers and qualifies visitors" },
  { icon: UserCheck, label: "Lead", note: "Captured with full context" },
  { icon: Workflow, label: "n8n Automation", note: "Routing, enrichment, alerts" },
  { icon: Database, label: "CRM", note: "Every enquiry in one place" },
  { icon: Building2, label: "Business", note: "Predictable pipeline" },
];

/** The system diagram beside the hero headline: website → chatbot → lead → automation → CRM. */
export function HeroVisual() {
  return (
    <div className="relative rounded-xl border border-border bg-surface p-4 shadow-[var(--shadow-elevated)] sm:p-6">
      <div className="flex items-center justify-between gap-3 border-b border-border pb-4">
        <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
          Growth system
        </p>
        <span className="flex items-center gap-2 text-xs text-muted-foreground">
          <span aria-hidden className="flow-dot size-1.5 rounded-full bg-accent" />
          live
        </span>
      </div>

      <ol className="mt-4 space-y-2">
        {stages.map((stage, index) => (
          <li key={stage.label} className="relative">
            <div className="flex items-center gap-3 rounded-md border border-border bg-card px-3 py-3 transition-colors hover:border-accent/60 hover:bg-card-hover">
              <span className="grid size-9 shrink-0 place-items-center rounded-md border border-border bg-surface text-accent">
                <stage.icon className="size-4" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold">{stage.label}</span>
                <span className="block truncate text-xs text-muted-foreground">{stage.note}</span>
              </span>
              <span className="ml-auto text-[0.6875rem] text-muted-foreground tabular-nums">
                0{index + 1}
              </span>
            </div>
            {index < stages.length - 1 && (
              <span aria-hidden className="ml-[2.05rem] block h-2 w-px bg-border-strong" />
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}