"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const KEY = "rl_consent";

type Choice = "granted" | "denied";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function apply(choice: Choice) {
  try {
    window.gtag?.("consent", "update", { analytics_storage: choice });
  } catch {
    /* ignore */
  }
}

function store(choice: Choice) {
  try {
    localStorage.setItem(KEY, choice);
  } catch {
    /* storage blocked: choice applies for this visit only */
  }
}

export default function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(KEY);
    } catch {
      /* ignore */
    }
    if (saved === "granted" || saved === "denied") apply(saved);
    else setOpen(true);

    const reopen = () => setOpen(true);
    window.addEventListener("rl-open-cookie-settings", reopen);
    return () => window.removeEventListener("rl-open-cookie-settings", reopen);
  }, []);

  const choose = (choice: Choice) => {
    store(choice);
    apply(choice);
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-modal="false" aria-labelledby="cookie-title" aria-describedby="cookie-desc">
      <p id="cookie-title" className="cookie-title">
        Your privacy
      </p>
      <p id="cookie-desc" className="cookie-text">
        We use Google Analytics cookies to see which pages help homeowners, so we can improve the site. They stay off unless you accept. Details in our{" "}
        <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>
      <div className="cookie-actions">
        <button type="button" className="btn btn-outline" onClick={() => choose("denied")}>
          Decline
        </button>
        <button type="button" className="btn btn-primary" onClick={() => choose("granted")}>
          Accept
        </button>
      </div>
    </div>
  );
}

export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event("rl-open-cookie-settings"))}>
      Cookie settings
    </button>
  );
}
