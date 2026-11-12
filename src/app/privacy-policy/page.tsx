import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { CookieSettingsButton } from "@/components/CookieConsent";
import { company } from "@/lib/content";
import { breadcrumbSchema, pageMeta } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Privacy Policy | RidgeLine Roofing, Austin MN",
  description:
    "How RidgeLine Roofing in Austin, MN collects, uses and protects your information, including quote requests, phone calls and Google Analytics cookies.",
  path: "/privacy-policy",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Privacy Policy", path: "/privacy-policy" },
];

export default function PrivacyPage() {
  return (
    <main id="main">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Legal"
        title="Privacy Policy"
        intro="Plain-language summary of what we collect, why, and the choices you have."
      />
      <section className="section">
        <div className="container legal">
          <p className="legal-updated">Last updated: November 11, 2026</p>

          <h2>Who we are</h2>
          <p>
            {company.name} LLC, {company.address} (&ldquo;RidgeLine&rdquo;, &ldquo;we&rdquo;). You can reach us at{" "}
            <a href={company.phoneHref}>{company.phone}</a>.
          </p>

          <h2>Information we collect</h2>
          <ul>
            <li>
              <strong>Quote and roof checkup requests:</strong> name, phone, email, address or city, and the details you type about your roof.
            </li>
            <li>
              <strong>Phone calls, texts and email:</strong> your number or email address and the content of your message.
            </li>
            <li>
              <strong>Website usage (only if you accept cookies):</strong> pages viewed, approximate location, device and browser type, and
              clicks on our phone and email links, collected by Google Analytics.
            </li>
          </ul>

          <h2>How we use it</h2>
          <ul>
            <li>To respond to your request, schedule inspections and give you a quote.</li>
            <li>To do the roofing work you hire us for and follow up afterward.</li>
            <li>To understand which pages help homeowners and improve the site.</li>
          </ul>
          <p>We do not sell your personal information and we do not share it for advertising.</p>

          <h2>Cookies and Google Analytics</h2>
          <p>
            We use Google Analytics 4 to measure site usage. Analytics cookies are <strong>off by default</strong> and only turn on if you click
            Accept in the cookie banner. If you decline, Google Analytics does not store cookies on your device. You can change your choice at any
            time: <CookieSettingsButton className="legal-link" />. You can also block cookies in your browser settings, or use Google&rsquo;s{" "}
            <a href="https://tools.google.com/dtlpage/gaoptout" rel="noopener noreferrer" target="_blank">
              opt-out add-on
            </a>
            .
          </p>

          <h2>Who we share information with</h2>
          <p>
            Only service providers who help us run the site and respond to you, such as web hosting, email delivery for quote requests, and Google
            Analytics. They may process data only to provide their service. We may also disclose information if the law requires it.
          </p>

          <h2>How long we keep it</h2>
          <p>
            Quote requests and customer records are kept as long as needed to serve you and meet legal, warranty and tax obligations. Analytics
            data is kept for the retention period set in our Google Analytics account.
          </p>

          <h2>Your choices and rights</h2>
          <p>
            You can ask to see, correct or delete the personal information we hold about you by calling {company.phone}. Residents of states with
            privacy laws, including Minnesota, may have additional rights to access, delete, correct or opt out of certain uses of their data, and we
            honor those requests.
          </p>

          <h2>Text messages</h2>
          <p>
            If you text us, we use your number only to reply about your project. Message and data rates may apply. Reply STOP to end messages.
          </p>

          <h2>Children</h2>
          <p>This site is for property owners and is not directed to children under 13.</p>

          <h2>Security</h2>
          <p>
            We use reasonable safeguards, including HTTPS, but no method of transmission over the internet is perfectly secure.
          </p>

          <h2>Changes</h2>
          <p>We may update this policy. The date at the top shows the latest version.</p>

          <h2>Contact</h2>
          <p>
            Questions about privacy? Call <a href={company.phoneHref}>{company.phone}</a> or write to {company.name} LLC, {company.address}.
          </p>
        </div>
      </section>
    </main>
  );
}
