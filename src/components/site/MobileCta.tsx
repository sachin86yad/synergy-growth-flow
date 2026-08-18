import { useEffect, useState } from "react";

import { Cta } from "./Cta";

/** Sticky mobile conversion bar; appears after the hero so it never covers key content. */
export function MobileCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur-xl lg:hidden">
      <Cta to="/contact" className="w-full">
        Book a Free Consultation
      </Cta>
    </div>
  );
}