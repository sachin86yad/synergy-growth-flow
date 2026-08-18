import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin } from "lucide-react";

import { ContactForm } from "@/components/site/ContactForm";
import { Reveal } from "@/components/site/Reveal";
import { BRAND } from "@/config/site";

const title = `Contact ${BRAND.name} — Book a Free Consultation`;
const description = `Tell ${BRAND.name} what you want to build, automate or grow. Send a project enquiry and get a written approach and estimate.`;

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="container-page py-16 md:py-20">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Contact</p>
            <h1 className="mt-4 text-[length:var(--text-display)] font-semibold">
              Book a free consultation
            </h1>
            <p className="measure mt-5 text-[length:var(--text-body-lg)] text-muted-foreground">
              Share a few details and you'll get a written approach with scope, timeline and an
              estimate — no obligation, no sales sequence.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-14">
          <Reveal>
            <h2 className="text-[length:var(--text-title)] font-semibold">What happens next</h2>
            <ol className="mt-5 space-y-4 text-sm text-muted-foreground">
              {[
                "We read your enquiry and check whether we're the right fit.",
                "We reply within one business day with questions or a call slot.",
                "You receive a written scope, timeline and estimate.",
              ].map((item, index) => (
                <li key={item} className="flex gap-3">
                  <span className="font-semibold text-accent tabular-nums">0{index + 1}</span>
                  {item}
                </li>
              ))}
            </ol>

            <ul className="mt-8 space-y-3 text-sm">
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-accent" aria-hidden />
                <a href={`mailto:${BRAND.email}`} className="hover:text-accent">
                  {BRAND.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-muted-foreground">
                <MapPin className="size-4 shrink-0 text-accent" aria-hidden />
                {BRAND.location}
              </li>
              <li className="flex items-center gap-2.5 text-muted-foreground">
                <Clock className="size-4 shrink-0 text-accent" aria-hidden />
                Mon–Sat, 10:00–19:00 IST
              </li>
            </ul>
          </Reveal>

          <Reveal delay={100}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}