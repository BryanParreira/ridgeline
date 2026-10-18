"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Phone, ClipboardCheck } from "lucide-react";
import { company } from "@/lib/content";

// Sticky call/quote bar for phones. Slides away while typing (keyboard open), on the contact page,
// and when the quote form is on screen, so it never covers what the visitor is doing.
export default function MobileCallBar() {
  const pathname = usePathname();
  const [typing, setTyping] = useState(false);
  const [atForm, setAtForm] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t?.matches?.("input, textarea, select")) setTyping(e.type === "focusin");
    };
    const onScroll = () => setScrolled(window.scrollY > 240);
    onScroll();
    document.addEventListener("focusin", on);
    document.addEventListener("focusout", on);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("focusin", on);
      document.removeEventListener("focusout", on);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    setAtForm(false);
    const form = document.querySelector(".quote-card");
    if (!form) return;
    const io = new IntersectionObserver(([e]) => setAtForm(e.isIntersecting), { threshold: 0.15 });
    io.observe(form);
    return () => io.disconnect();
  }, [pathname]);

  const hidden = typing || atForm || !scrolled || pathname === "/contact-us";
  return (
    <div className={`callbar ${hidden ? "is-hidden" : ""}`} aria-hidden={hidden || undefined}>
      <a href={company.phoneHref} className="btn btn-outline" tabIndex={hidden ? -1 : 0}>
        <Phone size={16} /> Call now
      </a>
      <Link href="/contact-us" className="btn btn-primary" tabIndex={hidden ? -1 : 0}>
        <ClipboardCheck size={16} /> Free quote
      </Link>
    </div>
  );
}
