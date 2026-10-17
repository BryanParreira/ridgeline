"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Building2, CheckCircle2, CloudLightning, Home, Search, Wrench } from "lucide-react";
import { company } from "@/lib/content";

const SERVICES = [
  { id: "replacement", label: "Roof replacement", sub: "Shingle or metal", icon: Home },
  { id: "storm", label: "Storm damage", sub: "Hail, wind, insurance", icon: CloudLightning },
  { id: "inspection", label: "Inspection", sub: "Know where you stand", icon: Search },
  { id: "commercial", label: "Commercial", sub: "TPO, EPDM, repairs", icon: Building2 },
  { id: "repair", label: "Repair / leak", sub: "Fix a specific issue", icon: Wrench },
];
const TIMING = ["As soon as possible", "Within a month", "In 1–3 months", "Just planning"];

// Set NEXT_PUBLIC_FORM_ENDPOINT (e.g. a Formspree or Web3Forms URL) to receive submissions.
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

export default function QuoteForm() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [data, setData] = useState({ service: "", timing: "", name: "", phone: "", email: "", city: "", notes: "" });
  const set = (k: keyof typeof data, v: string) => setData((d) => ({ ...d, [k]: v }));
  const go = (n: number) => {
    setDir(n > step ? 1 : -1);
    setStep(n);
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ ...data, _subject: `New roofing quote request — ${data.name}` }),
        });
        if (!res.ok) throw new Error();
      } else if (process.env.NODE_ENV === "production") {
        throw new Error("Form endpoint not configured");
      }
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  const titles = ["What do you need help with?", "When are you hoping to start?", "Where can we reach you?"];

  return (
    <div className="quote-card">
      {status === "done" ? (
        <motion.div className="q-done" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <CheckCircle2 size={52} color="var(--accent)" />
          <h3 className="q-title" style={{ margin: 0 }}>
            Thanks, {data.name.split(" ")[0] || "neighbor"}!
          </h3>
          <p style={{ color: "var(--muted)", maxWidth: "36ch" }}>
            We&apos;ll reach out shortly. Need us sooner? Call{" "}
            <a href={company.phoneHref} className="accent" style={{ fontWeight: 600 }}>
              {company.phone}
            </a>
            .
          </p>
        </motion.div>
      ) : (
        <form onSubmit={submit}>
          <div className="q-progress" aria-hidden="true">
            {titles.map((_, i) => (
              <span key={i}>
                <motion.i initial={false} animate={{ scaleX: i <= step ? 1 : 0 }} transition={{ duration: 0.4 }} />
              </span>
            ))}
          </div>
          <p className="q-step-label">Step {step + 1} of 3</p>
          <h3 className="q-title">{titles[step]}</h3>

          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <motion.div
              key={step}
              custom={dir}
              initial={{ opacity: 0, x: dir * 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -24 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              {step === 0 && (
                <div className="q-options">
                  {SERVICES.map(({ id, label, sub, icon: Icon }) => (
                    <button
                      type="button"
                      key={id}
                      className={`q-option ${data.service === id ? "selected" : ""}`}
                      onClick={() => {
                        set("service", id);
                        go(1);
                      }}
                    >
                      <Icon size={20} />
                      <strong>{label}</strong>
                      <span>{sub}</span>
                    </button>
                  ))}
                </div>
              )}
              {step === 1 && (
                <div className="q-options">
                  {TIMING.map((t) => (
                    <button
                      type="button"
                      key={t}
                      className={`q-option ${data.timing === t ? "selected" : ""}`}
                      onClick={() => {
                        set("timing", t);
                        go(2);
                      }}
                    >
                      <strong>{t}</strong>
                    </button>
                  ))}
                </div>
              )}
              {step === 2 && (
                <>
                  <div className="field-row">
                    <div className="field">
                      <label htmlFor="q-name">Name</label>
                      <input id="q-name" required autoComplete="name" value={data.name} onChange={(e) => set("name", e.target.value)} />
                    </div>
                    <div className="field">
                      <label htmlFor="q-phone">Phone</label>
                      <input id="q-phone" required type="tel" autoComplete="tel" value={data.phone} onChange={(e) => set("phone", e.target.value)} />
                    </div>
                  </div>
                  <div className="field-row">
                    <div className="field">
                      <label htmlFor="q-email">Email</label>
                      <input id="q-email" type="email" autoComplete="email" value={data.email} onChange={(e) => set("email", e.target.value)} />
                    </div>
                    <div className="field">
                      <label htmlFor="q-city">City</label>
                      <input id="q-city" required autoComplete="address-level2" value={data.city} onChange={(e) => set("city", e.target.value)} />
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="q-notes">Anything we should know? (optional)</label>
                    <textarea id="q-notes" rows={3} value={data.notes} onChange={(e) => set("notes", e.target.value)} />
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="q-actions">
            {step > 0 ? (
              <button type="button" className="link-btn" onClick={() => go(step - 1)}>
                <ArrowLeft size={16} /> Back
              </button>
            ) : (
              <span />
            )}
            {step === 2 && (
              <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Request my quote"} <ArrowRight size={16} />
              </button>
            )}
          </div>
          {status === "error" && (
            <p className="q-error">
              Something went wrong sending your request. Please call us at{" "}
              <a href={company.phoneHref} style={{ fontWeight: 600 }}>
                {company.phone}
              </a>
              .
            </p>
          )}
        </form>
      )}
    </div>
  );
}
