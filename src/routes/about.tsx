import { createFileRoute } from "@tanstack/react-router";

import { Cta } from "@/components/site/Cta";
import { Reveal } from "@/components/site/Reveal";
import { BRAND, TRUST_POINTS } from "@/config/site";

const title = `About ${BRAND.name} — A New Studio for Web, AI & Automation`;
const description = `${BRAND.name} is a digital growth studio building websites, AI chatbots and automated workflows for small businesses, startups and service companies.`;

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="container-page py-10 md:py-14">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">About</p>
            <h1 className="mt-4 text-[length:var(--text-display)] font-semibold">
              A studio built around one question: does it actually work?
            </h1>
            <p className="measure mt-5 text-[length:var(--text-body-lg)] text-muted-foreground">
              {BRAND.description}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal>
            <h2 className="text-[length:var(--text-title)] font-semibold">Who we help</h2>
            <ul className="mt-5 space-y-2.5 text-muted-foreground">
              {[
                "Small businesses that need a site that brings enquiries",
                "Medium-sized businesses replacing manual processes",
                "Startups that need a credible launch presence quickly",
                "Local and service-based businesses competing on response speed",
                "Growing companies whose tools no longer talk to each other",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="text-[length:var(--text-title)] font-semibold">
              Being new, transparently
            </h2>
            <p className="measure mt-5 text-muted-foreground">
              {BRAND.name} is a new business, so you won't find invented client logos,
              testimonials or made-up statistics anywhere on this site. What you can judge us on
              is the quality of this website, the concept projects, the clarity of our process and
              the working demonstrations of what we build.
            </p>
            <p className="measure mt-4 text-muted-foreground">
              Every project ends with documentation and access, so you own what we build even if
              you later take it elsewhere.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border bg-surface section-y">
        <div className="container-page">
          <h2 className="text-[length:var(--text-display)] font-semibold">How we build</h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TRUST_POINTS.map((point, index) => (
              <Reveal as="li" key={point.title} delay={index * 60}>
                <div className="h-full rounded-lg border border-border bg-card p-5">
                  <h3 className="text-base font-semibold">{point.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{point.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          <div className="mt-8">
            <Cta to="/contact">Book a Free Consultation</Cta>
          </div>
        </div>
      </section>
    </>
  );
}