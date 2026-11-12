"use client";

import Link from "next/link";
import { Cookie } from "lucide-react";
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
    <div className="cookie-banner" role="dialog" aria-live="polite" aria-label="Cookie preferences">
      <div className="cookie-card">
        <div className="cookie-body">
          <Cookie size={20} className="cookie-icon" aria-hidden="true" />
          <p className="cookie-text">
            We use essential cookies to run this site and optional Google Analytics cookies to understand usage and improve your experience. You
            can accept all or keep only the essential ones. See our <Link href="/privacy-policy">Privacy Policy</Link>.
          </p>
        </div>
        <div className="cookie-actions">
          <button type="button" className="btn btn-outline" onClick={() => choose("denied")}>
            Essential only
          </button>
          <button type="button" className="btn btn-primary" onClick={() => choose("granted")}>
            Accept all
          </button>
        </div>
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
