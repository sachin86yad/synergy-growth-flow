import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { BRAND, NAV_LINKS } from "@/config/site";
import { cn } from "@/lib/utils";
import { Cta } from "./Cta";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors duration-300",
        scrolled || open
          ? "border-border bg-background/85 backdrop-blur-xl"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-20">
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2.5 text-sm font-semibold tracking-[0.14em] uppercase"
          aria-label={`${BRAND.name} — home`}
        >
          <span aria-hidden className="size-2.5 rounded-sm bg-accent" />
          {BRAND.name}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.to === "/" }}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Cta to="/contact">Book a Free Consultation</Cta>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid size-11 place-items-center rounded-md border border-border text-foreground lg:hidden"
        >
          {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
        </button>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-border bg-background/95 backdrop-blur-xl lg:hidden"
      >
        <nav aria-label="Mobile" className="container-page flex flex-col gap-1 py-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              activeOptions={{ exact: link.to === "/" }}
              className="flex min-h-12 items-center rounded-md px-2 text-base text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {link.label}
            </Link>
          ))}
          <Cta to="/contact" className="mt-3 w-full" onClick={() => setOpen(false)}>
            Book a Free Consultation
          </Cta>
        </nav>
      </div>
    </header>
  );
}