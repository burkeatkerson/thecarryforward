import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { glossary } from "@/lib/glossary";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Glossary of Specialty Tax Terms",
  description:
    "Plain-English definitions of the terms that recur in specialty tax work: QREs, the four-part test, Section 174A, MACRS, recapture, the payroll tax offset, and more.",
  alternates: { canonical: "/glossary" },
};

export default function GlossaryPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "The Carryforward Glossary",
    url: `${SITE_URL}/glossary`,
    hasDefinedTerm: glossary.map((g) => ({
      "@type": "DefinedTerm",
      name: g.term,
      description: g.def,
    })),
  };
  return (
    <>
      <SiteHeader activeCluster="glossary" />
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="narrow">
          <Breadcrumbs
            crumbs={[
              { name: "Home", href: "/" },
              { name: "Glossary", href: "/glossary" },
            ]}
          />
          <header className="article-head">
            <span className="kicker">Reference</span>
            <h1>Glossary</h1>
            <p className="dek">
              The vocabulary of specialty tax, defined plainly. Every term here appears throughout
              our guides.
            </p>
          </header>
          <dl className="glossary">
            {glossary.map((g) => (
              <div key={g.term}>
                <dt>{g.term}</dt>
                <dd>{g.def}</dd>
              </div>
            ))}
          </dl>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
