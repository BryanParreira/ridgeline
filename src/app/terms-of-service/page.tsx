import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { company } from "@/lib/content";
import { breadcrumbSchema, pageMeta } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Terms of Service | RidgeLine Roofing, Austin MN",
  description:
    "Terms for using the RidgeLine Roofing website in Austin, MN, including quote requests, roof checkup estimates and project information.",
  path: "/terms-of-service",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Terms of Service", path: "/terms-of-service" },
];

export default function TermsPage() {
  return (
    <main id="main">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Legal"
        title="Terms of Service"
        intro="The ground rules for using this website."
      />
      <section className="section">
        <div className="container legal">
          <p className="legal-updated">Last updated: November 11, 2026</p>

          <h2>About these terms</h2>
          <p>
            This website is operated by {company.name} LLC, {company.address}. By using it you agree to these terms. If you do not agree, please do
            not use the site.
          </p>

          <h2>Information is general</h2>
          <p>
            Content on this site, including service descriptions, project photos, the Roof Checkup tool and any price or lifespan ranges, is general
            information. It is not a quote, inspection or guarantee. Only a written estimate or contract from RidgeLine, after an on-site inspection,
            binds us to a price, scope or warranty.
          </p>

          <h2>Licensing and credentials</h2>
          <p>
            RidgeLine Roofing is a licensed Minnesota residential roofing contractor ({company.owner.license}). Manufacturer credentials, such as
            CertainTeed SidingMaster Pro, belong to their respective owners.
          </p>

          <h2>Quote requests and messages</h2>
          <p>
            When you send a request, you confirm the information is accurate and that you are authorized to request work on the property. Submitting
            a request does not create a contract. See our <Link href="/privacy-policy">Privacy Policy</Link> for how we handle your details.
          </p>

          <h2>Acceptable use</h2>
          <p>
            Do not misuse the site: no attempts to break, overload or scrape it in a way that harms it, no submitting false or abusive requests, and
            no use for unlawful purposes.
          </p>

          <h2>Intellectual property</h2>
          <p>
            Text, logos, photos and design on this site belong to {company.name} LLC or its licensors. You may not copy or reuse them without
            permission, except for personal, non-commercial viewing.
          </p>

          <h2>Third-party links</h2>
          <p>We link to services such as Google and Facebook. We do not control them and are not responsible for their content or practices.</p>

          <h2>Disclaimer and limit of liability</h2>
          <p>
            The site is provided &ldquo;as is&rdquo; without warranties of any kind. To the fullest extent the law allows, RidgeLine is not liable for
            indirect or consequential damages from using the site. Nothing here limits any warranty stated in a signed roofing contract or any right
            you have under Minnesota law.
          </p>

          <h2>Governing law</h2>
          <p>These terms are governed by the laws of the State of Minnesota.</p>

          <h2>Changes</h2>
          <p>We may update these terms. Continued use of the site means you accept the current version.</p>

          <h2>Contact</h2>
          <p>
            Call <a href={company.phoneHref}>{company.phone}</a> or write to {company.name} LLC, {company.address}.
          </p>
        </div>
      </section>
    </main>
  );
}
