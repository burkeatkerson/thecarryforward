import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { clusters } from "@/lib/clusters";
import { getAllArticles, getClusterArticles } from "@/lib/content";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export default function HomePage() {
  const latest = getAllArticles()
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 8);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
  };

  return (
    <>
      <SiteHeader />
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="wide">
          <section className="front-lede">
            <span className="kicker">An educational reference — est. 2026</span>
            <h1>Specialty tax, explained plainly.</h1>
            <p>
              The R&amp;D credit, Section 174, cost segregation, and energy incentives — written
              for CPAs, founders, and finance teams who want to understand the rules, not be sold
              a study. No sponsorships. No lead forms. Just the mechanics.
            </p>
          </section>

          <div className="section-head">
            <h2>Topics</h2>
            <span className="rule-fill" />
          </div>
          <section className="cluster-grid" aria-label="Topic clusters">
            {clusters.map((c) => {
              const arts = getClusterArticles(c.slug);
              const guides = arts.filter((a) => a.type === "guide").slice(0, 3);
              const briefs = arts.filter((a) => a.type === "brief").slice(0, 2);
              return (
                <div className="cluster-cell" key={c.slug}>
                  <span className="kicker">{c.tagline}</span>
                  <h2>
                    <Link href={`/${c.slug}`}>{c.name}</Link>
                  </h2>
                  <p>{c.description}</p>
                  <ul>
                    {[...guides, ...briefs].map((a) => (
                      <li key={a.slug}>
                        <Link href={`/${a.cluster}/${a.slug}`}>{a.title}</Link>
                      </li>
                    ))}
                    <li>
                      <Link href={`/${c.slug}`}>
                        <em>All {arts.length} articles →</em>
                      </Link>
                    </li>
                  </ul>
                </div>
              );
            })}
          </section>

          <div className="section-head">
            <h2>Latest</h2>
            <span className="rule-fill" />
          </div>
          <section aria-label="Latest articles" style={{ paddingBottom: "2rem" }}>
            <ul className="hub-list">
              {latest.map((a) => (
                <li className="hub-item" key={`${a.cluster}/${a.slug}`}>
                  <span className="kicker">
                    <Link href={`/${a.cluster}`}>
                      {clusters.find((c) => c.slug === a.cluster)?.shortName}
                    </Link>
                    {" · "}
                    {a.type === "guide" ? "Guide" : "Brief"} · {a.readingMinutes} min
                  </span>
                  <h3>
                    <Link href={`/${a.cluster}/${a.slug}`}>{a.title}</Link>
                  </h3>
                  <p>{a.description}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
