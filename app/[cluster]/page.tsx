import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { clusters, getCluster } from "@/lib/clusters";
import { getClusterArticles } from "@/lib/content";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return clusters.map((c) => ({ cluster: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cluster: string }>;
}): Promise<Metadata> {
  const { cluster } = await params;
  const c = getCluster(cluster);
  if (!c) return {};
  return {
    title: c.name,
    description: c.description,
    alternates: { canonical: `/${c.slug}` },
    openGraph: { title: `${c.name} — ${SITE_NAME}`, description: c.description },
  };
}

export default async function HubPage({
  params,
}: {
  params: Promise<{ cluster: string }>;
}) {
  const { cluster } = await params;
  const c = getCluster(cluster);
  if (!c) notFound();
  const articles = getClusterArticles(c.slug);
  const guides = articles.filter((a) => a.type === "guide");
  const briefs = articles.filter((a) => a.type === "brief");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: c.name,
    description: c.description,
    url: `${SITE_URL}/${c.slug}`,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
  };

  return (
    <>
      <SiteHeader activeCluster={c.slug} />
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="wide">
          <Breadcrumbs
            crumbs={[
              { name: "Home", href: "/" },
              { name: c.name, href: `/${c.slug}` },
            ]}
          />
          <header className="hub-head">
            <span className="kicker">{c.tagline}</span>
            <h1>{c.name}</h1>
            <p>{c.description}</p>
          </header>
          <div className="hub-columns">
            <section aria-label="Guides">
              <div className="section-head" style={{ paddingTop: "1.2rem" }}>
                <h2>In depth</h2>
                <span className="rule-fill" />
              </div>
              <ul className="hub-list">
                {guides.map((a) => (
                  <li className="hub-item" key={a.slug}>
                    <span className="kicker">
                      Guide · {a.readingMinutes} min read
                    </span>
                    <h3>
                      <Link href={`/${c.slug}/${a.slug}`}>{a.title}</Link>
                    </h3>
                    <p>{a.description}</p>
                  </li>
                ))}
              </ul>
            </section>
            <aside className="hub-side" aria-label="Briefs">
              <h2>Briefs &amp; answers</h2>
              <ul>
                {briefs.map((a) => (
                  <li key={a.slug}>
                    <Link href={`/${c.slug}/${a.slug}`}>{a.title}</Link>
                  </li>
                ))}
              </ul>
              <h2 style={{ marginTop: "2rem" }}>Other topics</h2>
              <ul>
                {clusters
                  .filter((x) => x.slug !== c.slug)
                  .map((x) => (
                    <li key={x.slug}>
                      <Link href={`/${x.slug}`}>{x.name}</Link>
                    </li>
                  ))}
              </ul>
            </aside>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
