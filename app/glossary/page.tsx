import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
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
      <SiteHeader />
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="mx-auto max-w-[1120px] px-5 pt-11 sm:px-10">
          <div className="sheet px-7 py-9 sm:px-14 sm:py-11">
            <div className="mx-auto max-w-[680px]">
              <div className="flex flex-wrap items-end justify-between gap-3 border-b-2 border-ink pb-4">
                <div>
                  <p className="kicker mb-1.5 text-[10px] font-medium text-ink-mute">Reference</p>
                  <h1 className="font-serif text-4xl font-semibold leading-none">Glossary</h1>
                </div>
                <span className="kicker font-normal text-[11px] text-ink-mute">
                  {glossary.length} terms, plainly defined
                </span>
              </div>
              <p className="mt-4 font-serif text-lg italic leading-normal text-ink-soft">
                The vocabulary of specialty tax. Every term here appears throughout our guides.
              </p>
              <dl className="mt-6">
                {glossary.map((g, i) => (
                  <div
                    key={g.term}
                    className={i > 0 ? "mt-4 border-t border-line-faint pt-4" : undefined}
                  >
                    <dt className="font-serif text-lg font-semibold leading-snug">{g.term}</dt>
                    <dd className="mt-1 font-serif text-base leading-relaxed text-ink-soft">
                      {g.def}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
