import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { quoteHtml, quoteSubject, quoteText, type Quote } from "@/lib/quoteEmail";

export const runtime = "nodejs";

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  // Honeypot: bots fill this hidden field. Pretend success.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const q: Quote = {
    service: clean(body.service, 40),
    timing: clean(body.timing, 60),
    name: clean(body.name, 100),
    phone: clean(body.phone, 40),
    email: clean(body.email, 120),
    city: clean(body.city, 80),
    notes: clean(body.notes, 2000),
  };
  if (!q.name || !q.phone || !q.city) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (q.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(q.email)) q.email = "";

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, QUOTE_TO_EMAIL } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !QUOTE_TO_EMAIL) {
    console.error("[quote] SMTP env vars missing; submission NOT sent:", q);
    return NextResponse.json({ error: "Email not configured" }, { status: 500 });
  }

  const port = Number(SMTP_PORT) || 465;
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  try {
    await transporter.sendMail({
      from: `"RidgeLine Website" <${SMTP_USER}>`,
      to: QUOTE_TO_EMAIL,
      replyTo: q.email || undefined,
      subject: quoteSubject(q),
      text: quoteText(q),
      html: quoteHtml(q),
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[quote] send failed:", err);
    return NextResponse.json({ error: "Send failed" }, { status: 502 });
  }
}
