import { createFileRoute } from "@tanstack/react-router";

import { BRAND } from "@/config/site";

const title = `Terms & Conditions | ${BRAND.name}`;
const description = `The terms that apply to using this website and engaging ${BRAND.name} for project work.`;

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <section className="section-y">
      <div className="container-page max-w-3xl">
        <h1 className="text-[length:var(--text-display)] font-semibold">Terms &amp; Conditions</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Placeholder terms — review with a legal advisor before publishing.
        </p>

        <div className="mt-10 space-y-8 text-muted-foreground">
          <div>
            <h2 className="text-[length:var(--text-title)] font-semibold text-foreground">
              Website content
            </h2>
            <p className="mt-3">
              Content on this site is for information only. Projects labelled “Concept Project”
              are internal demonstrations and are not client work.
            </p>
          </div>
          <div>
            <h2 className="text-[length:var(--text-title)] font-semibold text-foreground">
              Quotes and estimates
            </h2>
            <p className="mt-3">
              Any figures shown are indicative. Final pricing, scope and timelines are confirmed
              in a written proposal before work begins.
            </p>
          </div>
          <div>
            <h2 className="text-[length:var(--text-title)] font-semibold text-foreground">
              Engagements
            </h2>
            <p className="mt-3">
              Project work is governed by the signed proposal, including payment milestones,
              revision rounds, third-party costs and handover terms.
            </p>
          </div>
          <div>
            <h2 className="text-[length:var(--text-title)] font-semibold text-foreground">
              Contact
            </h2>
            <p className="mt-3">
              Questions about these terms:{" "}
              <a className="text-accent" href={`mailto:${BRAND.email}`}>
                {BRAND.email}
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}