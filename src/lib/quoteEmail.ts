export type Quote = {
  service: string;
  timing: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  notes: string;
};

const SERVICE_LABELS: Record<string, string> = {
  replacement: "Roof replacement",
  storm: "Storm damage",
  inspection: "Inspection",
  commercial: "Commercial",
  repair: "Repair / leak",
};

export const serviceLabel = (id: string) => SERVICE_LABELS[id] ?? id;

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function quoteSubject(q: Quote) {
  return `New quote request: ${q.name} (${serviceLabel(q.service)}) – ${q.city}`;
}

export function quoteText(q: Quote) {
  return [
    "NEW QUOTE REQUEST",
    "",
    `Name: ${q.name}`,
    `Phone: ${q.phone}`,
    `Email: ${q.email || "—"}`,
    `City: ${q.city}`,
    `Service: ${serviceLabel(q.service)}`,
    `Timing: ${q.timing}`,
    `Notes: ${q.notes || "—"}`,
  ].join("\n");
}

export function quoteHtml(q: Quote) {
  const tel = q.phone.replace(/[^\d+]/g, "");
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #eee;width:110px;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#8a8f98;vertical-align:top">${label}</td>
      <td style="padding:12px 0;border-bottom:1px solid #eee;font-size:15px;color:#1b1f27;font-weight:600">${value}</td>
    </tr>`;
  const button = (href: string, label: string, primary: boolean) =>
    `<a href="${href}" style="display:inline-block;margin:0 8px 8px 0;padding:13px 22px;border-radius:8px;font-size:14px;font-weight:700;text-decoration:none;${
      primary ? "background:#c8421f;color:#fff" : "background:#fff;color:#1b1f27;border:1px solid #d5d8de"
    }">${label}</a>`;

  return `<!doctype html>
<html><body style="margin:0;padding:0;background:#f2f3f5;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f2f3f5;padding:24px 12px">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;border-radius:12px;overflow:hidden">
        <tr><td style="background:#1b1f27;padding:26px 32px">
          <div style="color:#fff;font-size:20px;font-weight:800;letter-spacing:.02em">RidgeLine <span style="color:#e8663f">Roofing</span></div>
          <div style="color:#aab0bb;font-size:13px;margin-top:4px">New quote request from your website</div>
        </td></tr>
        <tr><td style="padding:32px">
          <div style="display:inline-block;background:#fdeee9;color:#c8421f;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:6px 12px;border-radius:99px">${esc(serviceLabel(q.service))}</div>
          <h1 style="margin:14px 0 4px;font-size:24px;color:#1b1f27">${esc(q.name)}</h1>
          <p style="margin:0 0 20px;color:#6b7280;font-size:14px">${esc(q.city)} · Wants to start: <strong>${esc(q.timing)}</strong></p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${row("Phone", `<a href="tel:${esc(tel)}" style="color:#1b1f27;text-decoration:none">${esc(q.phone)}</a>`)}
            ${row("Email", q.email ? `<a href="mailto:${esc(q.email)}" style="color:#1b1f27;text-decoration:none">${esc(q.email)}</a>` : "—")}
            ${row("City", esc(q.city))}
            ${row("Service", esc(serviceLabel(q.service)))}
            ${row("Timing", esc(q.timing))}
          </table>
          <div style="margin:24px 0 8px;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#8a8f98">Notes</div>
          <div style="background:#f7f8fa;border-left:3px solid #c8421f;border-radius:4px;padding:14px 16px;font-size:15px;line-height:1.55;color:#1b1f27;white-space:pre-wrap">${q.notes ? esc(q.notes) : "<span style='color:#8a8f98'>No notes provided.</span>"}</div>
          <div style="margin-top:28px">
            ${button(`tel:${esc(tel)}`, "Call " + esc(q.name.split(" ")[0] || "customer"), true)}
            ${q.email ? button(`mailto:${esc(q.email)}`, "Reply by email", false) : ""}
          </div>
        </td></tr>
        <tr><td style="padding:18px 32px;background:#f7f8fa;color:#8a8f98;font-size:12px">Sent from the quote form at ridgelineroofingmn.com. Replying to this email goes to the customer${q.email ? "" : " (no email given, call instead)"}.</td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}
