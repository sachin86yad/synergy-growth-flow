import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";

import { Cta } from "@/components/site/Cta";
import { Reveal } from "@/components/site/Reveal";
import { BRAND, SERVICES } from "@/config/site";

const title = `Services — Websites, AI Chatbots, Automation, SEO & Ads | ${BRAND.name}`;
const description =
  "Website development, AI chatbots, AI automation, n8n workflow automation, SEO and Google Ads — delivered as one connected growth system.";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="container-page py-16 md:py-20">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Services</p>
            <h1 className="mt-4 text-[length:var(--text-display)] font-semibold">
              Build the site, automate the follow-up, then buy the traffic
            </h1>
            <p className="measure mt-5 text-[length:var(--text-body-lg)] text-muted-foreground">
              Each service below can be delivered on its own, but they are designed to work
              together so every enquiry is captured, qualified and followed up automatically.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="container-page divide-y divide-border">
        {SERVICES.map((service) => (
          <section key={service.slug} id={service.slug} className="scroll-mt-24 py-12 md:py-16">
            <Reveal className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
              <div>
                <span className="grid size-11 place-items-center rounded-md border border-border bg-card text-accent">
                  <service.icon className="size-5" aria-hidden />
                </span>
                <h2 className="mt-5 text-[length:var(--text-title)] font-semibold">
                  {service.title}
                </h2>
                <p className="measure mt-3 text-muted-foreground">{service.description}</p>
              </div>
              <ul className="grid content-start gap-3 sm:grid-cols-2">
                {service.details.map((detail) => (
                  <li
                    key={detail}
                    className="flex items-start gap-2.5 rounded-md border border-border bg-card px-4 py-3 text-sm"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                    {detail}
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>
        ))}
      </div>

      <section className="border-t border-border bg-surface section-y">
        <div className="container-page text-center">
          <h2 className="text-[length:var(--text-display)] font-semibold">
            Not sure which of these you need?
          </h2>
          <p className="measure mx-auto mt-5 text-muted-foreground">
            Describe the problem instead of the solution — we'll recommend the smallest scope
            that actually moves the number you care about.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Cta to="/contact">Book a Free Consultation</Cta>
            <Cta to="/process" variant="outline">
              See our process
            </Cta>
          </div>
        </div>
      </section>
    </>
  );
}