import { company } from "@/lib/content";
import { cities } from "@/lib/cities";
import { servicePages } from "@/lib/services";
import { abs } from "@/lib/site";

export const dynamic = "force-static";

// llms.txt: a plain-text summary for AI assistants and answer engines (ChatGPT, Perplexity, Claude, Gemini).
export function GET() {
  const body = `# ${company.name}

> ${company.name} is a locally owned roofing contractor based in Austin, Minnesota with ${company.years}+ years of experience. It installs and repairs residential shingle and metal roofs, installs commercial TPO and EPDM roofing, and provides 24/7 storm and hail damage repair with insurance claim help across southern Minnesota and north Iowa.

## Business facts
- Name: ${company.name}
- Type: Roofing contractor
- Address: ${company.address}
- Phone: ${company.phone}
- Emergency service: 24/7 storm damage tarping and repair
- Service area: ${cities.map((c) => `${c.name}, ${c.state}`).join("; ")}
- Free roof inspections and written quotes
- Works directly with homeowners' insurance companies on hail and wind claims
- Website: ${abs("/")}

## Services
${servicePages.map((s) => `- [${s.label}](${abs(`/${s.slug}`)}): ${s.metaDescription}`).join("\n")}

## Service areas
${cities.map((c) => `- [Roofing in ${c.name}, ${c.state}](${abs(`/areas-we-serve/${c.slug}`)})`).join("\n")}

## Key pages
- [Project map of completed roofs](${abs("/portfolio")})
- [Roofing FAQs](${abs("/faqs")})
- [Service area overview](${abs("/service-area")})
- [Request a quote](${abs("/contact-us")})
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
