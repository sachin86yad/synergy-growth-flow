import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import type { Service } from "@/config/site";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group relative flex h-full flex-col rounded-lg border border-border bg-card p-6 shadow-[0_1px_2px_-1px_oklch(0.45_0.03_250/0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-[var(--shadow-elevated)]">
      <span className="grid size-11 place-items-center rounded-md border border-border bg-surface text-accent">
        <service.icon className="size-5" aria-hidden />
      </span>
      <h3 className="mt-5 text-lg font-semibold">{service.title}</h3>
      <p className="mt-2.5 text-sm text-muted-foreground">{service.description}</p>
      <Link
        to="/services"
        hash={service.slug}
        className="mt-6 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-accent"
      >
        Learn More
        <ArrowUpRight
          className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden
        />
        <span className="sr-only">about {service.title}</span>
      </Link>
    </article>
  );
}