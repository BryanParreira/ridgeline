"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Phone } from "lucide-react";
import { company } from "@/lib/content";

const AGES = [
  { label: "Under 10 years", pts: 0 },
  { label: "10 to 15 years", pts: 2 },
  { label: "15 to 20 years", pts: 4 },
  { label: "20+ years", pts: 6 },
  { label: "Not sure", pts: 3 },
];
const MATERIALS = [
  { label: "Asphalt shingle", life: "20 to 30 years", pts: 0 },
  { label: "Metal", life: "40 to 70 years", pts: -2 },
  { label: "Flat / rubber / TPO", life: "20 to 30 years", pts: 0 },
  { label: "Not sure", life: "varies", pts: 0 },
];
const SIGNS = [
  { id: "leak", label: "Water stains or leaks inside", pts: 5 },
  { id: "missing", label: "Missing, curled or cracked shingles", pts: 4 },
  { id: "granules", label: "Shingle granules in the gutters", pts: 3 },
  { id: "ice", label: "Ice dams or icicles every winter", pts: 3 },
  { id: "hail", label: "Hail or high wind in the last 2 years", pts: 4 },
  { id: "sag", label: "Sagging or soft spots", pts: 6 },
];

const verdict = (score: number) =>
  score >= 11
    ? { tone: "high", title: "Get it inspected soon", body: "Your answers point to real wear or damage. A free inspection will tell you if a repair is enough or if replacement is the smarter move, and whether insurance may cover it.", timing: "As soon as possible" }
    : score >= 6
      ? { tone: "mid", title: "Worth a professional look", body: "Nothing screams emergency, but the age and signs you described are what we check first. A quick inspection catches small problems before they turn into leaks.", timing: "Within a month" }
      : { tone: "low", title: "Looking healthy", body: "Based on your answers your roof is in decent shape. Keep an eye on it after big storms, and call us for a free check if anything changes.", timing: "Just planning" };

// 3-question roof health check that ends in a lead form (posts to the same /api/quote as the main form).
export default function RoofCheckup() {
  const [step, setStep] = useState(0);
  const [age, setAge] = useState<number | null>(null);
  const [mat, setMat] = useState<number | null>(null);
  const [signs, setSigns] = useState<string[]>([]);
  const [lead, setLead] = useState({ name: "", phone: "", city: "", website: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const score = useMemo(
    () => Math.max(0, (age !== null ? AGES[age].pts : 0) + (mat !== null ? MATERIALS[mat].pts : 0) + signs.reduce((n, id) => n + (SIGNS.find((s) => s.id === id)?.pts ?? 0), 0)),
    [age, mat, signs],
  );
  const v = verdict(score);
  const pct = Math.min(100, Math.round((score / 20) * 100));

  async function send(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_FORM_ENDPOINT || "/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          service: "inspection",
          timing: v.timing,
          ...lead,
          notes: `Roof checkup result: ${v.title} (score ${score}). Age: ${age !== null ? AGES[age].label : "?"}. Material: ${mat !== null ? MATERIALS[mat].label : "?"}. Signs: ${signs.length ? signs.map((id) => SIGNS.find((s) => s.id === id)?.label).join("; ") : "none"}.`,
          _subject: `Roof checkup lead: ${lead.name}`,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  const slide = { initial: { opacity: 0, x: 24 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -24 }, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const } };

  return (
    <div className="quote-card checkup">
      <div className="q-progress" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <span key={i}>
            <motion.i initial={false} animate={{ scaleX: i <= step ? 1 : 0 }} transition={{ duration: 0.4 }} />
          </span>
        ))}
      </div>
      <AnimatePresence mode="wait" initial={false}>
        {step === 0 && (
          <motion.div key="0" {...slide}>
            <p className="q-step-label">Question 1 of 3</p>
            <h3 className="q-title">How old is your roof?</h3>
            <div className="q-options">
              {AGES.map((a, i) => (
                <button type="button" key={a.label} className={`q-option ${age === i ? "selected" : ""}`} onClick={() => { setAge(i); setStep(1); }}>
                  <strong>{a.label}</strong>
                </button>
              ))}
            </div>
          </motion.div>
        )}
        {step === 1 && (
          <motion.div key="1" {...slide}>
            <p className="q-step-label">Question 2 of 3</p>
            <h3 className="q-title">What is it made of?</h3>
            <div className="q-options">
              {MATERIALS.map((m, i) => (
                <button type="button" key={m.label} className={`q-option ${mat === i ? "selected" : ""}`} onClick={() => { setMat(i); setStep(2); }}>
                  <strong>{m.label}</strong>
                  <span>Typical life: {m.life}</span>
                </button>
              ))}
            </div>
            <div className="q-actions"><button type="button" className="link-btn" onClick={() => setStep(0)}><ArrowLeft size={16} /> Back</button><span /></div>
          </motion.div>
        )}
        {step === 2 && (
          <motion.div key="2" {...slide}>
            <p className="q-step-label">Question 3 of 3</p>
            <h3 className="q-title">Notice any of these? (pick all that apply)</h3>
            <div className="check-list">
              {SIGNS.map((s) => {
                const on = signs.includes(s.id);
                return (
                  <button type="button" key={s.id} role="checkbox" aria-checked={on} className={`check-item ${on ? "on" : ""}`} onClick={() => setSigns((x) => (on ? x.filter((i) => i !== s.id) : [...x, s.id]))}>
                    <span className="box">{on && <CheckCircle2 size={18} />}</span>
                    {s.label}
                  </button>
                );
              })}
            </div>
            <div className="q-actions">
              <button type="button" className="link-btn" onClick={() => setStep(1)}><ArrowLeft size={16} /> Back</button>
              <button type="button" className="btn btn-primary" onClick={() => setStep(3)}>See my result <ArrowRight size={16} /></button>
            </div>
          </motion.div>
        )}
        {step === 3 && (
          <motion.div key="3" {...slide}>
            <p className="q-step-label">Your roof checkup</p>
            <div className={`verdict ${v.tone}`}>
              <div className="meter" aria-hidden="true"><motion.i initial={{ width: 0 }} animate={{ width: `${Math.max(pct, 6)}%` }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} /></div>
              <h3 className="q-title" style={{ margin: "10px 0 6px" }}>{v.title}</h3>
              <p>{v.body}</p>
            </div>
            {status === "done" ? (
              <p className="q-done-note"><CheckCircle2 size={18} /> Thanks, {lead.name.split(" ")[0] || "neighbor"}. We&apos;ll call to set up your free inspection.</p>
            ) : (
              <form onSubmit={send}>
                <div className="field-row">
                  <div className="field"><label htmlFor="c-name">Name</label><input id="c-name" required autoComplete="name" value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })} /></div>
                  <div className="field"><label htmlFor="c-phone">Phone</label><input id="c-phone" required type="tel" autoComplete="tel" value={lead.phone} onChange={(e) => setLead({ ...lead, phone: e.target.value })} /></div>
                </div>
                <div className="field"><label htmlFor="c-city">City</label><input id="c-city" required autoComplete="address-level2" value={lead.city} onChange={(e) => setLead({ ...lead, city: e.target.value })} /></div>
                <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0 }} value={lead.website} onChange={(e) => setLead({ ...lead, website: e.target.value })} />
                <div className="q-actions">
                  <button type="button" className="link-btn" onClick={() => setStep(2)}><ArrowLeft size={16} /> Back</button>
                  <button type="submit" className="btn btn-primary" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Book free inspection"} <ArrowRight size={16} /></button>
                </div>
                {status === "error" && <p className="q-error">Something went wrong. Please call <a href={company.phoneHref} style={{ fontWeight: 600 }}><Phone size={13} /> {company.phone}</a>.</p>}
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
