import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";

import { ChatbotDemo } from "@/components/site/ChatbotDemo";
import { ChatWidget } from "@/components/site/ChatWidget";
import { Cta } from "@/components/site/Cta";
import { Faq } from "@/components/site/Faq";
import { FlowChain } from "@/components/site/FlowChain";
import { HeroVisual } from "@/components/site/HeroVisual";
import { Reveal } from "@/components/site/Reveal";
import { Section } from "@/components/site/Section";
import { ServiceCard } from "@/components/site/ServiceCard";
import {
  AUTOMATION_FLOW,
  AUTOMATION_USE_CASES,
  BRAND,
  GROWTH_CHAIN,
  PROCESS_STEPS,
  PROJECTS,
  SERVICES,
  TRUST_POINTS,
} from "@/config/site";

const title = `${BRAND.name} | Web Development, AI Automation & Digital Growth`;
const description = `${BRAND.name} builds high-converting websites, AI chatbots, n8n automations, SEO strategies and Google Ads campaigns that help businesses grow.`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: BRAND.name,
          description: BRAND.description,
          email: BRAND.email,
          areaServed: "IN",
          serviceType: SERVICES.map((service) => service.title),
        }),
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="hairline-grid pointer-events-none absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]"
        />
        <div className="container-page relative grid items-center gap-10 py-14 md:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">WEB • AI • AUTOMATION • GROWTH</p>
            <h1 className="mt-5 text-[length:var(--text-hero)] font-semibold">
              Build smarter. Grow faster. Automate everything in between.
            </h1>
            <p className="measure mt-6 text-[length:var(--text-body-lg)] text-muted-foreground">
              We build high-converting websites, AI-powered experiences and automated growth
              systems that help businesses attract, convert and retain more customers.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Cta to="/contact">
                Book a Free Consultation
                <ArrowRight className="size-4" aria-hidden />
              </Cta>
              <Cta to="/services" variant="outline">
                Explore Our Services
              </Cta>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Websites, chatbots and automation for small businesses, startups and growing
              service companies.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <HeroVisual />
          </Reveal>
        </div>
      </section>

      {/* Trust */}
      <section className="border-b border-border bg-surface">
        <div className="container-page py-10 md:py-12">
          <h2 className="text-sm font-semibold tracking-[0.18em] text-muted-foreground uppercase">
            How we build
          </h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {TRUST_POINTS.map((point, index) => (
              <Reveal as="li" key={point.title} delay={index * 60}>
                <p className="flex items-start gap-2 text-sm font-semibold">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                  {point.title}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{point.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Services */}
      <Section
        id="services"
        eyebrow="Services"
        title="Everything needed to get found, convert and follow up"
        lead="Six focused capabilities that work as one system — not disconnected deliverables."
      >
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => (
            <Reveal key={service.slug} delay={index * 60} className="h-full">
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Differentiator */}
      <section className="border-y border-border bg-surface section-y">
        <div className="container-page">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">The difference</p>
            <h2 className="mt-4 text-[length:var(--text-display)] font-semibold">
              Your website shouldn't just look good. It should work.
            </h2>
            <p className="measure mt-5 text-[length:var(--text-body-lg)] text-muted-foreground">
              A good-looking page that doesn't capture, qualify and route enquiries is a
              brochure. We connect the whole path from traffic to customer, so nothing depends on
              someone remembering to follow up.
            </p>
          </Reveal>
          <Reveal className="mt-8" delay={100}>
            <FlowChain nodes={GROWTH_CHAIN} />
          </Reveal>
        </div>
      </section>

      {/* AI automation */}
      <Section
        eyebrow="AI &amp; automation"
        title="Turn repetitive work into automated workflows."
        lead="If your team does it the same way every time, it can be automated — with AI making the judgement calls that used to need a human."
      >
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
          <Reveal>
            <ul className="grid gap-3 sm:grid-cols-2">
              {AUTOMATION_USE_CASES.map((useCase) => (
                <li
                  key={useCase}
                  className="flex items-center gap-2.5 rounded-md border border-border bg-card px-4 py-3 text-sm"
                >
                  <Check className="size-4 shrink-0 text-accent" aria-hidden />
                  {useCase}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100}>
            <div className="rounded-xl border border-border bg-surface p-5 sm:p-7">
              <h3 className="text-sm font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                Example workflow
              </h3>
              <FlowChain
                compact
                className="mt-6 sm:flex-col"
                nodes={AUTOMATION_FLOW.map((label) => ({ label }))}
              />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Chatbot */}
      <section className="border-y border-border bg-surface section-y">
        <div className="container-page grid items-center gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">AI chatbots</p>
            <h2 className="mt-4 text-[length:var(--text-display)] font-semibold">
              Your website can talk to your customers.
            </h2>
            <p className="measure mt-5 text-[length:var(--text-body-lg)] text-muted-foreground">
              An assistant that knows your services answers the repetitive questions, qualifies
              serious enquiries and hands them to you with context — at 2pm or 2am.
            </p>
            <ul className="mt-7 space-y-3 text-sm text-muted-foreground">
              {[
                "Answers grounded in your services, not generic AI filler",
                "Captures name, contact details and intent automatically",
                "Escalates to a human when the question needs one",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100}>
            <ChatbotDemo />
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <Section
        eyebrow="Process"
        title="How we work"
        lead="Five stages, each with a clear output you can review before the next one starts."
      >
        <ol className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {PROCESS_STEPS.map((step, index) => (
            <Reveal as="li" key={step.step} delay={index * 70}>
              <div className="h-full rounded-lg border border-border bg-card p-5 transition-colors hover:border-accent/50 hover:bg-card-hover">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-accent tabular-nums">
                    {step.step}
                  </span>
                  <span aria-hidden className="h-px flex-1 bg-border-strong" />
                </div>
                <h3 className="mt-4 text-base font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* Work */}
      <section className="border-y border-border bg-surface section-y">
        <div className="container-page">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Work</p>
            <h2 className="mt-4 text-[length:var(--text-display)] font-semibold">
              Concept projects that show the approach
            </h2>
            <p className="measure mt-5 text-[length:var(--text-body-lg)] text-muted-foreground">
              {BRAND.name} is a new studio, so these are concept builds — not client work. They
              show exactly how we structure a site, a chatbot and the automation behind it.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {PROJECTS.map((project, index) => (
              <Reveal key={project.slug} delay={index * 70} className="h-full">
                <article className="flex h-full flex-col rounded-lg border border-border bg-card p-6 transition-colors hover:border-accent/50 hover:bg-card-hover">
                  <span className="w-fit rounded-sm border border-accent/40 px-2 py-1 text-[0.6875rem] font-semibold tracking-[0.12em] text-accent uppercase">
                    {project.label}
                  </span>
                  <p className="mt-5 text-xs text-muted-foreground">{project.category}</p>
                  <h3 className="mt-1 text-lg font-semibold">{project.title}</h3>
                  <p className="mt-2.5 text-sm text-muted-foreground">{project.summary}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-sm border border-border px-2 py-1 text-xs text-muted-foreground"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/work"
                    hash={project.slug}
                    className="mt-auto inline-flex min-h-11 items-center gap-1.5 pt-6 text-sm font-semibold text-accent"
                  >
                    View Case Study
                    <ArrowRight className="size-4" aria-hidden />
                    <span className="sr-only">for the {project.title} concept project</span>
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <Section eyebrow="Pricing" title="Every business is different.">
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
          <Reveal>
            <p className="measure text-[length:var(--text-body-lg)] text-muted-foreground">
              We don't publish fixed packages, because a five-page site with one form and a site
              with AI qualification, CRM sync and paid traffic are not the same project. Pricing
              is quoted after a short conversation, in writing, with the assumptions listed.
            </p>
            <div className="mt-8">
              <Cta to="/contact">Get a Free Project Estimate</Cta>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {[
                "Scope",
                "Complexity",
                "Integrations",
                "Automation requirements",
                "Traffic",
                "Business goals",
              ].map((factor) => (
                <li
                  key={factor}
                  className="rounded-md border border-border bg-card px-4 py-3 text-sm"
                >
                  {factor}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* FAQ */}
      <section id="faq" className="border-y border-border bg-surface section-y">
        <div className="container-page">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">FAQ</p>
            <h2 className="mt-4 text-[length:var(--text-display)] font-semibold">
              Questions we get asked first
            </h2>
          </Reveal>
          <Faq />
        </div>
      </section>

      {/* Final CTA */}
      <Section align="center">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-[length:var(--text-display)] font-semibold">
            Ready to build a smarter digital business?
          </h2>
          <p className="measure mx-auto mt-5 text-[length:var(--text-body-lg)] text-muted-foreground">
            Tell us what you're trying to build, automate or grow. We'll help you figure out the
            right approach.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Cta to="/contact">Book a Free Consultation</Cta>
            <Cta to="/contact" variant="outline">
              Contact Us
            </Cta>
          </div>
        </Reveal>
      </Section>

      <ChatWidget />
    </>
  );
}
