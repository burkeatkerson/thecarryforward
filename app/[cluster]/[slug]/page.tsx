import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { mdxComponents } from "@/components/mdx";
import { clusters, getCluster } from "@/lib/clusters";
import {
  extractHeadings,
  getAllArticles,
  getArticle,
  getRelated,
  getSiblings,
} from "@/lib/content";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ cluster: a.cluster, slug: a.slug }));
}

export const dynamicParams = false;

type Params = Promise<{ cluster: string; slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { cluster, slug } = await params;
  const a = getArticle(cluster, slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.description,
    alternates: { canonical: `/${cluster}/${slug}` },
    openGraph: {
      title: a.title,
      description: a.description,
      type: "article",
      publishedTime: a.date,
      modifiedTime: a.updated ?? a.date,
    },
  };
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { cluster, slug } = await params;
  const c = getCluster(cluster);
  const a = getArticle(cluster, slug);
  if (!c || !a) notFound();

  const headings = extractHeadings(a.content);
  const related = getRelated(a);
  const { prev, next } = getSiblings(a);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    datePublished: a.date,
    dateModified: a.updated ?? a.date,
    url: `${SITE_URL}/${cluster}/${slug}`,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    articleSection: c.name,
  };

  const faqLd =
    a.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: a.faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  return (
    <>
      <SiteHeader activeCluster={cluster} />
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
        />
        {faqLd ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
          />
        ) : null}
        <div className="article-shell">
          <div className="article-main">
            <Breadcrumbs
              crumbs={[
                { name: "Home", href: "/" },
                { name: c.name, href: `/${cluster}` },
                { name: a.title, href: `/${cluster}/${slug}` },
              ]}
            />
            <header className="article-head">
              <span className="kicker">
                {a.type === "guide" ? "Guide" : "Brief"} · {a.readingMinutes} min read
              </span>
              <h1>{a.title}</h1>
              <p className="dek">{a.description}</p>
              <p className="meta">
                Published {formatDate(a.date)}
                {a.updated ? ` · Updated ${formatDate(a.updated)}` : ""}
              </p>
            </header>
            <div className="prose">
              <MDXRemote
                source={a.content}
                components={mdxComponents}
                options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
              />
            </div>

            {a.faq.length > 0 ? (
              <section className="faq" aria-label="Frequently asked questions">
                <h2>Frequently asked questions</h2>
                <dl>
                  {a.faq.map((f) => (
                    <div key={f.q}>
                      <dt>{f.q}</dt>
                      <dd>{f.a}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            ) : null}

            <nav className="pager" aria-label="More in this topic">
              {prev ? (
                <Link href={`/${cluster}/${prev.slug}`} className="prev">
                  <span className="kicker">← Previous in {c.shortName}</span>
                  <span className="pager-title">{prev.title}</span>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link href={`/${cluster}/${next.slug}`} className="next">
                  <span className="kicker">Next in {c.shortName} →</span>
                  <span className="pager-title">{next.title}</span>
                </Link>
              ) : null}
            </nav>

            {related.length > 0 ? (
              <section className="related" aria-label="Related reading">
                <h2>Related reading</h2>
                <ul>
                  {related.map((r) => (
                    <li key={`${r.cluster}/${r.slug}`}>
                      <Link href={`/${r.cluster}/${r.slug}`}>{r.title}</Link>
                      <span className="meta">
                        {clusters.find((x) => x.slug === r.cluster)?.shortName} ·{" "}
                        {r.type === "guide" ? "Guide" : "Brief"} · {r.readingMinutes} min
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>

          {headings.length > 2 ? (
            <nav className="toc" aria-label="On this page">
              <h2>On this page</h2>
              <ul>
                {headings.map((h) => (
                  <li key={h.id} className={h.depth === 3 ? "depth-3" : undefined}>
                    <a href={`#${h.id}`}>{h.text}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
