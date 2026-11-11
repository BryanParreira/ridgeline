"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Delegated click tracking for phone and email links, site-wide.
export default function AnalyticsEvents() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href^='tel:'], a[href^='mailto:']") as HTMLAnchorElement | null;
      if (!a || !window.gtag) return;
      const isTel = a.href.startsWith("tel:");
      window.gtag("event", isTel ? "phone_click" : "email_click", {
        link_url: a.getAttribute("href"),
        page_path: window.location.pathname,
      });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
