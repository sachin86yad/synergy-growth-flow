import { createFileRoute } from "@tanstack/react-router";

import { BRAND } from "@/config/site";

const title = `Privacy Policy | ${BRAND.name}`;
const description = `How ${BRAND.name} collects, stores and uses the information you submit through this website.`;

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <section className="section-y">
      <div className="container-page max-w-3xl">
        <h1 className="text-[length:var(--text-display)] font-semibold">Privacy Policy</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Placeholder policy — review with a legal advisor before publishing.
        </p>

        <div className="mt-8 space-y-8 text-muted-foreground">
          <div>
            <h2 className="text-[length:var(--text-title)] font-semibold text-foreground">
              What we collect
            </h2>
            <p className="mt-3">
              When you submit the enquiry form we store the name, business name, email, phone
              number, selected service, budget range and project details you provide.
            </p>
          </div>
          <div>
            <h2 className="text-[length:var(--text-title)] font-semibold text-foreground">
              How we use it
            </h2>
            <p className="mt-3">
              Only to respond to your enquiry, prepare an estimate and keep a record of our
              conversation. We do not sell your data or use it for unrelated marketing.
            </p>
          </div>
          <div>
            <h2 className="text-[length:var(--text-title)] font-semibold text-foreground">
              Storage and access
            </h2>
            <p className="mt-3">
              Enquiries are stored in a managed database. Access is restricted to authorised
              server-side code and {BRAND.name} staff who need it to reply to you.
            </p>
          </div>
          <div>
            <h2 className="text-[length:var(--text-title)] font-semibold text-foreground">
              Your choices
            </h2>
            <p className="mt-3">
              Email <a className="text-accent" href={`mailto:${BRAND.email}`}>{BRAND.email}</a> to
              request a copy of your data or ask us to delete it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}