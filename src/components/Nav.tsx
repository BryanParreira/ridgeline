"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronRight, Menu, Phone, X } from "lucide-react";
import { company, nav } from "@/lib/content";
import Logo from "./Logo";

export default function Nav() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState<string | null>(null);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 8));
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className={`nav ${scrolled || open ? "scrolled" : ""}`}>
      <div className="container nav-inner">
        <Link href="/" aria-label="RidgeLine Roofing home">
          <Logo />
        </Link>

        <nav aria-label="Primary">
          <ul className="nav-links" onMouseLeave={() => setHover(null)}>
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              const show = hover ? hover === item.href : active;
              return (
                <li key={item.href} onMouseEnter={() => setHover(item.href)}>
                  <Link href={item.href} aria-current={active ? "page" : undefined}>
                    {item.label}
                    {show && (
                      <motion.span
                        layoutId="nav-underline"
                        className="nav-underline"
                        transition={{ type: "spring", stiffness: 500, damping: 40 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="nav-cta">
          <a href={company.phoneHref} className="nav-phone" aria-label={`Call ${company.phone}`}>
            <Phone size={17} />
            <span className="nav-phone-text">{company.phone}</span>
          </a>
          <Link href="/contact-us" className="btn btn-primary">
            Get a Quote
          </Link>
          <button
            className="menu-btn"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {[{ label: "Home", href: "/" }, ...nav, { label: "Contact", href: "/contact-us" }].map((item) => (
              <Link key={item.href} href={item.href} className="item">
                {item.label} <ChevronRight size={20} />
              </Link>
            ))}
            <a href={company.phoneHref} className="btn btn-primary">
              <Phone size={17} /> Call {company.phone} <ArrowRight size={16} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
