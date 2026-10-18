"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type LenisLike = { destroy: () => void; scrollTo: (n: number, o?: { immediate?: boolean }) => void; stop: () => void; start: () => void };
let lenis: LenisLike | null = null;
export const getLenis = () => lenis;

// Smooth scrolling is desktop-only: touch devices keep native scrolling (faster, and no extra JS downloaded).
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let dead = false;
    const idle = (window as unknown as { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
    idle(async () => {
      const { default: Lenis } = await import("lenis");
      if (dead) return;
      lenis = new Lenis({ duration: 1.15, anchors: { offset: -80 }, autoRaf: true }) as unknown as LenisLike;
    });
    return () => {
      dead = true;
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  useEffect(() => {
    if (!window.location.hash) lenis?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
