# RidgeLine Roofing — website

Next.js 15 (App Router) + TypeScript + Motion + Lenis. Every page is prerendered to static HTML, so it's fast and fully crawlable.

## Develop

```bash
npm install
npm run dev          # http://localhost:3000
```

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Local dev server |
| `npm run build` | Production build (pulls the latest ProjectMapIt projects first) |
| `npm start` | Serve the production build |
| `npm run build:static` | Static export to `/out` for plain shared hosting |
| `npm run sync:projects` | Refresh `src/data/projects.json` from ProjectMapIt |

## Deploy to Hostinger from GitHub

### Option A: Node.js Web App (recommended)

1. Push this repo to GitHub.
2. In hPanel, go to **Websites → Add website → Node.js Apps → Import Git repository**, then pick the repo.
3. Use these settings:
   - Framework: **Next.js**
   - Node version: **20.x or newer**
   - Build command: `npm run build`
   - Start command: `npm start`
4. Add these environment variables:
   - `NEXT_PUBLIC_SITE_URL=https://www.ridgelineroofingmn.com`
   - Quote form emails the owner through SMTP (`/api/quote`). Create a Gmail app password, then set:
     - `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=465`
     - `SMTP_USER=<Gmail address that sends>`, `SMTP_PASS=<16-char Gmail app password>`
     - `QUOTE_TO_EMAIL=cchrist10@gmail.com,bryan@webvisionrank.com` (comma-separated)
     - Without these the form shows a "please call us" message.
5. Point the domain at the app. Each push to `main` redeploys.

The legacy 301 redirects in `next.config.ts` apply in this mode.

### Option B: Shared hosting (static)

The `/api/quote` route needs a Node server, so static export can't build with it. For static, delete `src/app/api` and set `NEXT_PUBLIC_FORM_ENDPOINT` to a Formspree/Web3Forms URL instead.

1. Run `npm run build:static`.
2. Upload the **contents** of `/out` to `public_html`.
3. `public/.htaccess` is exported with the site. It forces HTTPS + www and handles the legacy redirects.

## Content

- **Business info, home copy, FAQs:** `src/lib/content.ts`
- **Service pages:** `src/lib/services.ts`. Their slugs match the old Duda URLs.
- **City pages:** `src/lib/cities.ts`. The 27 pages are at `/areas-we-serve/<slug>`.
- **Photos:** the originals live in `/pictures`, which is git-ignored. Web-optimized copies are in `public/images` and mapped in `content.ts → images`.
- **Project map:** `src/data/projects.json` is synced from ProjectMapIt on every build. For privacy, house numbers are stripped and coordinates are rounded to about 100 m.

## SEO notes

- URLs match the current site, so existing rankings carry over. Changed URLs are 301-redirected.
- Each page has a unique title, meta description, and canonical URL, plus Open Graph tags.
- JSON-LD on each page:
  - `RoofingContractor` on every page
  - `Service`, `FAQPage`, and `BreadcrumbList` on service and city pages
  - `ItemList` of projects on `/portfolio`
- `sitemap.xml` and `robots.txt` are generated automatically.
- The project map is rendered as indexable HTML. The old ProjectMapIt embed hid itself from crawlers, so these pages were invisible to Google before.

### Before launch

- [ ] Migrate the 16 blog posts from the old site, keeping the same slugs (they can go in the `[slug]` route):
  - `/what-austin-mn-homeowners-should-know-before-a-roof-replacement`
  - `/five-warning-signs-your-lakeville-roof-needs-inspection-after-severe-weather`
  - `/storm-restoration-for-maple-grove-roofs-inspection-through-repair`
  - `/roof-repair-vs-roof-replacement-in-bloomington-making-the-smart-investment-after-storm-damage`
  - `/how-minneapolis-hail-storms-impact-your-roof-and-when-it-s-time-for-a-roof-replacement`
  - `/comparing-tpo-roofing-installation-for-waseca-mn-businesses`
  - `/scheduling-residential-roofing-inspections-in-faribault-mn`
  - `/avoiding-common-mistakes-during-roof-replacement-in-owatonna-mn`
  - `/planning-commercial-rubber-roofing-installation-in-albert-lea-mn`
  - `/which-metal-roofing-system-fits-your-rochester-mn-property`
  - `/when-to-call-a-roofer-in-waseca`
  - `/what-to-expect-from-commercial-roofing-repairs-in-rochester`
  - `/how-to-find-a-roofing-inspector-in-minneapolis`
  - `/duluth-resident-s-guide-to-roofing-replacement`
  - `/finding-quality-metal-roofing-in-st-paul-what-to-know`
  - `/how-to-choose-a-roofer-in-austin`
- [ ] Set the SMTP vars and send a test submission.
- [ ] Submit `https://www.ridgelineroofingmn.com/sitemap.xml` in Google Search Console.
- [ ] Point the Google Business Profile website link at the new homepage.
- [ ] Optional: embed live Google reviews in `src/components/home/Reviews.tsx`.
