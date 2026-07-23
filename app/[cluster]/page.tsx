import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { clusters, getCluster } from "@/lib/clusters";
import { getClusterArticles, type ArticleMeta } from "@/lib/content";
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

function ResultRow({ a }: { a: ArticleMeta }) {
  return (
    <li className="border-b border-line">
      <Link href={`/${a.cluster}/${a.slug}`} className="group flex gap-4 py-5 sm:gap-5">
        <div className="hidden w-[70px] flex-none sm:block" aria-hidden="true">
          {a.type === "guide" ? (
            <div className="flex h-[52px] items-end gap-[3px]">
              <div className="h-full flex-1 bg-ink" />
              <div className="h-[62%] flex-1 bg-ink" />
              <div className="h-[60%] flex-1 bg-ink" />
              <div className="h-[36%] flex-1 bg-accent" />
            </div>
          ) : (
            <div className="border border-line py-2.5 text-center">
              <span className="font-mono text-[22px] leading-none text-ink-faint">§</span>
            </div>
          )}
        </div>
        <div className="flex-1">
          <p className="kicker mb-1 font-medium text-[10px] text-ink-mute">
            {a.type === "guide" ? "Guide" : "Brief"} · {a.readingMinutes} min
            {a.type === "guide" ? " · In depth" : ""}
          </p>
          <h3 className="font-serif text-2xl font-semibold leading-[1.05] group-hover:text-accent">
            {a.title}
          </h3>
          <p className="mt-1.5 font-serif text-sm leading-normal text-ink-soft">
            {a.description}
          </p>
        </div>
      </Link>
    </li>
  );
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
        <div className="mx-auto max-w-[1120px] px-5 pt-11 sm:px-10">
          <div className="sheet px-7 py-9 sm:px-11 sm:py-10">
            <div className="flex flex-wrap items-end justify-between gap-3 border-b-2 border-ink pb-4">
              <div>
                <p className="kicker mb-1.5 text-[10px] font-medium">
                  <Link href="/" className="text-accent hover:text-accent-deep">
                    ← Front Page
                  </Link>
                </p>
                <h1 className="font-serif text-4xl font-semibold leading-none sm:text-[42px]">
                  {c.name}
                </h1>
              </div>
              <span className="kicker font-normal text-[11px] text-ink-mute">
                {articles.length} pieces · {guides.length} guides · {briefs.length} briefs
              </span>
            </div>
            <p className="mt-4 max-w-[62ch] font-serif text-lg italic leading-normal text-ink-soft">
              {c.description}
            </p>

            <div className="mt-7 grid gap-9 lg:grid-cols-[196px_1fr]">
              {/* Rail */}
              <aside className="no-print hidden lg:block">
                <p className="kicker border-b border-ink pb-1.5 text-[10px]">In this section</p>
                <div className="mt-2.5 space-y-1 font-serif text-sm leading-loose text-ink-soft">
                  <div className="flex justify-between">
                    <span>Guides</span>
                    <span className="font-mono text-[11px] text-ink-faint">{guides.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Briefs</span>
                    <span className="font-mono text-[11px] text-ink-faint">{briefs.length}</span>
                  </div>
                </div>
                <p className="kicker mt-7 border-b border-ink pb-1.5 text-[10px]">Other sections</p>
                <ul className="mt-2.5 font-serif text-sm leading-loose text-ink-soft">
                  {clusters
                    .filter((x) => x.slug !== c.slug)
                    .map((x) => {
                      const n = getClusterArticles(x.slug).length;
                      return (
                        <li key={x.slug} className="flex justify-between gap-2">
                          <Link href={`/${x.slug}`} className="hover:text-accent">
                            {x.shortName}
                          </Link>
                          <span className="font-mono text-[11px] text-ink-faint">{n}</span>
                        </li>
                      );
                    })}
                </ul>
                <p className="kicker mt-7 border-b border-ink pb-1.5 text-[10px]">Reference</p>
                <ul className="mt-2.5 font-serif text-sm leading-loose text-ink-soft">
                  <li>
                    <Link href="/the-index" className="hover:text-accent">
                      The full index
                    </Link>
                  </li>
                  <li>
                    <Link href="/glossary" className="hover:text-accent">
                      Glossary
                    </Link>
                  </li>
                </ul>
              </aside>

              {/* Results */}
              <div>
                <div className="flex items-baseline justify-between border-b border-line pb-2">
                  <span className="kicker font-normal text-[11px] text-ink-mute">
                    In depth · {guides.length} guides
                  </span>
                </div>
                <ul>
                  {guides.map((a) => (
                    <ResultRow key={a.slug} a={a} />
                  ))}
                </ul>
                <div className="mt-8 flex items-baseline justify-between border-b border-line pb-2">
                  <span className="kicker font-normal text-[11px] text-ink-mute">
                    Briefs &amp; answers · {briefs.length}
                  </span>
                </div>
                <ul>
                  {briefs.map((a) => (
                    <ResultRow key={a.slug} a={a} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
