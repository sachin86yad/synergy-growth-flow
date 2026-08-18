import { createFileRoute } from "@tanstack/react-router";

import { Cta } from "@/components/site/Cta";
import { Reveal } from "@/components/site/Reveal";
import { BRAND, PROJECTS } from "@/config/site";

const title = `Concept Projects — Website, Chatbot & Automation Builds | ${BRAND.name}`;
const description =
  "Three concept projects showing how we structure websites, AI chatbots and n8n automation for clinics, real estate and hospitality businesses.";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="container-page py-16 md:py-20">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Work</p>
            <h1 className="mt-4 text-[length:var(--text-display)] font-semibold">
              Concept projects, clearly labelled
            </h1>
            <p className="measure mt-5 text-[length:var(--text-body-lg)] text-muted-foreground">
              {BRAND.name} is a new studio. Rather than dress up other people's work, these are
              concept builds that show our thinking end to end — problem, approach and the
              systems involved.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="container-page divide-y divide-border">
        {PROJECTS.map((project) => (
          <article key={project.slug} id={project.slug} className="scroll-mt-24 py-12 md:py-16">
            <Reveal className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
              <div>
                <span className="w-fit rounded-sm border border-accent/40 px-2 py-1 text-[0.6875rem] font-semibold tracking-[0.12em] text-accent uppercase">
                  {project.label}
                </span>
                <p className="mt-5 text-xs text-muted-foreground">{project.category}</p>
                <h2 className="mt-1 text-[length:var(--text-title)] font-semibold">
                  {project.title}
                </h2>
                <p className="measure mt-3 text-muted-foreground">{project.summary}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-sm border border-border px-2 py-1 text-xs text-muted-foreground"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-border bg-surface p-5 sm:p-7">
                <h3 className="text-sm font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                  The problem
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">{project.problem}</p>
                <h3 className="mt-7 text-sm font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                  The approach
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {project.approach.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm">
                      <span
                        aria-hidden
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </article>
        ))}
      </div>

      <section className="border-t border-border bg-surface section-y">
        <div className="container-page text-center">
          <h2 className="text-[length:var(--text-display)] font-semibold">
            Want this built for your business?
          </h2>
          <p className="measure mx-auto mt-5 text-muted-foreground">
            Send the details and we'll map the same structure to your services and your
            customers.
          </p>
          <div className="mt-8 flex justify-center">
            <Cta to="/contact">Book a Free Consultation</Cta>
          </div>
        </div>
      </section>
    </>
  );
}