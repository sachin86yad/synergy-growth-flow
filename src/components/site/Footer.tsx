import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin } from "lucide-react";

import { BRAND, NAV_LINKS } from "@/config/site";

const socials = [
  { label: "LinkedIn", icon: Linkedin, href: "#" },
  { label: "Instagram", icon: Instagram, href: "#" },
  { label: "Facebook", icon: Facebook, href: "#" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-page grid gap-12 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:py-16">
        <div>
          <p className="flex items-center gap-2.5 text-sm font-semibold tracking-[0.14em] uppercase">
            <span aria-hidden className="size-2.5 rounded-sm bg-accent" />
            {BRAND.name}
          </p>
          <p className="mt-3 text-sm text-muted-foreground">{BRAND.tagline}</p>
          <p className="measure mt-4 text-sm text-muted-foreground">
            Websites, AI chatbots, automation, SEO and Google Ads for small and growing
            businesses.
          </p>
          <ul className="mt-6 flex gap-2">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  aria-label={social.label}
                  className="grid size-11 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-accent hover:text-foreground"
                >
                  <social.icon className="size-4" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-sm font-semibold">Explore</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {NAV_LINKS.filter((link) => link.to !== "/").map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold">Legal &amp; contact</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <Link
                to="/privacy"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/terms"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Terms &amp; Conditions
              </Link>
            </li>
            <li>
              <a
                href={`mailto:${BRAND.email}`}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {BRAND.email}
              </a>
            </li>
            <li className="text-muted-foreground">{BRAND.location}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page py-6 text-xs text-muted-foreground">
          © {BRAND.year} {BRAND.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}