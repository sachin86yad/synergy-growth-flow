import { useEffect, useState } from "react";

export type VisualViewportState = {
  /** Height of the visible viewport in px (excludes the on-screen keyboard). */
  height: number;
  /** Pixels of the layout viewport hidden by the on-screen keyboard. */
  keyboardInset: number;
};

/**
 * Tracks the visual viewport so fixed panels can stay above the Android/iOS
 * virtual keyboard instead of being pushed behind it.
 */
export function useVisualViewport(enabled = true): VisualViewportState {
  const [state, setState] = useState<VisualViewportState>({
    height: 0,
    keyboardInset: 0,
  });

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    const vv = window.visualViewport;

    const read = () => {
      const layoutHeight = window.innerHeight;
      const height = vv?.height ?? layoutHeight;
      const offsetTop = vv?.offsetTop ?? 0;
      // How much of the layout viewport is covered (keyboard / browser UI).
      const inset = Math.max(0, layoutHeight - height - offsetTop);
      setState((prev) =>
        Math.abs(prev.height - height) < 1 && Math.abs(prev.keyboardInset - inset) < 1
          ? prev
          : { height, keyboardInset: inset > 80 ? inset : 0 },
      );
    };

    read();

    if (vv) {
      vv.addEventListener("resize", read);
      vv.addEventListener("scroll", read);
    }
    window.addEventListener("resize", read);
    window.addEventListener("orientationchange", read);

    return () => {
      if (vv) {
        vv.removeEventListener("resize", read);
        vv.removeEventListener("scroll", read);
      }
      window.removeEventListener("resize", read);
      window.removeEventListener("orientationchange", read);
    };
  }, [enabled]);

  return state;
}
