"use client";

import { useEffect } from "react";

// One delegated listener: feeds cursor position to cards (--mx/--my) for a soft spotlight, and pulls
// [data-magnetic] buttons slightly toward the cursor. Fine-pointer devices only; touch screens skip it.
export default function PointerFX() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let mag: HTMLElement | null = null;

    const move = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const t = e.target as HTMLElement;
        const card = t.closest<HTMLElement>(".card, .bento-tile, .glance");
        if (card) {
          const r = card.getBoundingClientRect();
          card.style.setProperty("--mx", `${e.clientX - r.left}px`);
          card.style.setProperty("--my", `${e.clientY - r.top}px`);
        }
        const m = t.closest<HTMLElement>("[data-magnetic]");
        if (mag && mag !== m) mag.style.transform = "";
        mag = m;
        if (m) {
          const r = m.getBoundingClientRect();
          const x = (e.clientX - (r.left + r.width / 2)) * 0.22;
          const y = (e.clientY - (r.top + r.height / 2)) * 0.3;
          m.style.transform = `translate(${x}px, ${y}px)`;
        }
      });
    };
    const leave = () => {
      if (mag) mag.style.transform = "";
      mag = null;
    };
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}
