import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
};

// Runs before paint on the client, falls back to useEffect during SSR.
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/** Fades content up once when it scrolls into view. Respects prefers-reduced-motion via CSS. */
export function Reveal({ children, className, delay = 0, as }: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  // Content is rendered visible on the server so it stays readable without JS;
  // the hidden start state is only applied once the observer can reveal it.
  const [armed, setArmed] = useState(false);
  useIsomorphicLayoutEffect(() => setArmed(true), []);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      style={visible && delay ? { animationDelay: `${delay}ms` } : undefined}
      className={cn(armed && !visible && "reveal", visible && "reveal-in", className)}
    >
      {children}
    </Tag>
  );
}