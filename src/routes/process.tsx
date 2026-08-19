import { createFileRoute } from "@tanstack/react-router";

import { Cta } from "@/components/site/Cta";
import { FlowChain } from "@/components/site/FlowChain";
import { Reveal } from "@/components/site/Reveal";
import { BRAND, GROWTH_CHAIN, PROCESS_STEPS } from "@/config/site";

const title = `Our Process — Discover, Strategize, Build, Launch, Optimize | ${BRAND.name}`;
const description =
  "How we run projects: discovery, strategy, staged build, tested launch and ongoing optimisation, with a clear output at every stage.";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ProcessPage,
});

function ProcessPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="container-page py-10 md:py-14">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Process</p>
            <h1 className="mt-4 text-[length:var(--text-display)] font-semibold">
              How we work
            </h1>
            <p className="measure mt-5 text-[length:var(--text-body-lg)] text-muted-foreground">
              No black boxes. You see the scope, the structure and the working build before
              anything goes live.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page">
          <ol className="relative border-l border-border pl-6 sm:pl-10">
            {PROCESS_STEPS.map((step, index) => (
              <Reveal as="li" key={step.step} delay={index * 70} className="relative pb-10 last:pb-0">
                <span
                  aria-hidden
                  className="absolute -left-[1.9rem] top-1.5 size-2.5 rounded-full bg-accent sm:-left-[2.9rem]"
                />
                <p className="text-sm font-semibold text-accent tabular-nums">{step.step}</p>
                <h2 className="mt-1.5 text-[length:var(--text-title)] font-semibold">
                  {step.title}
                </h2>
                <p className="measure mt-2.5 text-muted-foreground">{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-border bg-surface section-y">
        <div className="container-page">
          <Reveal className="max-w-3xl">
            <h2 className="text-[length:var(--text-display)] font-semibold">
              What you end up owning
            </h2>
            <p className="measure mt-5 text-muted-foreground">
              A complete, documented system — not a design file and a login you can't use.
            </p>
          </Reveal>
          <Reveal className="mt-8" delay={100}>
            <FlowChain nodes={GROWTH_CHAIN} />
          </Reveal>
          <div className="mt-8">
            <Cta to="/contact">Book a Free Consultation</Cta>
          </div>
        </div>
      </section>
    </>
  );
}