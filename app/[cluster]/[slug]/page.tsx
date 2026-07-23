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
import { findLesson, getCourseLessons } from "@/lib/courses";
import { MarkRead } from "@/components/progress";

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
  const lesson = findLesson(cluster, slug);
  const courseLessons = lesson ? getCourseLessons(lesson.course) : [];
  const lessonPrev = lesson && lesson.index > 0 ? courseLessons[lesson.index - 1] : null;
  const lessonNext =
    lesson && lesson.index < courseLessons.length - 1 ? courseLessons[lesson.index + 1] : null;

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
        <div className="mx-auto max-w-[1120px] px-5 pt-11 sm:px-10">
          <article className="sheet px-6 py-10 sm:px-14 sm:py-12">
            <Breadcrumbs
              crumbs={[
                { name: "Front Page", href: "/" },
                { name: c.name, href: `/${cluster}` },
                { name: a.title, href: `/${cluster}/${slug}` },
              ]}
            />
            <MarkRead id={`${cluster}/${slug}`} />

            {lesson ? (
              <div className="no-print mx-auto mt-6 flex max-w-[680px] flex-wrap items-baseline justify-between gap-2 border-[1.5px] border-ink px-4 py-2.5">
                <span className="kicker text-[10px] text-ink-mute">
                  Lesson {lesson.index + 1} of {courseLessons.length} ·{" "}
                  <Link
                    href={`/courses/${lesson.course.slug}`}
                    className="text-accent hover:text-accent-deep"
                  >
                    {lesson.course.title}
                  </Link>
                </span>
                {lessonNext ? (
                  <Link
                    href={`/${lessonNext.cluster}/${lessonNext.slug}`}
                    className="kicker text-[10px] text-ink hover:text-accent"
                  >
                    Next lesson →
                  </Link>
                ) : (
                  <span className="kicker text-[10px] text-ink-faint">Final lesson</span>
                )}
              </div>
            ) : null}

            {/* Head, centered on the reading measure */}
            <header className="mx-auto mt-7 max-w-[680px]">
              <p className="kicker mb-3.5 text-xs text-accent">
                {c.name} · {a.type === "guide" ? "Guide" : "Brief"} ·{" "}
                {a.level === "intro" ? "Intro" : a.level === "pro" ? "Pro" : "Working"} level
              </p>
              <h1 className="font-serif text-[34px] font-semibold leading-[1.05] tracking-[-0.01em] sm:text-[48px]">
                {a.title}
              </h1>
              <p className="mt-4 font-serif text-xl italic leading-normal text-ink-soft">
                {a.description}
              </p>
              <div className="kicker mt-5 flex flex-wrap justify-between gap-2 border-y border-ink py-2.5 font-medium text-[11px] text-ink-mute">
                <span>By The Carryforward Desk</span>
                <span>
                  {a.readingMinutes} min read · {formatDate(a.date)}
                  {a.updated ? ` · Updated ${formatDate(a.updated)}` : ""}
                </span>
              </div>
            </header>

            {/* On this page — compact, above the fold, no sticky rail on the sheet */}
            {headings.length > 3 ? (
              <nav
                aria-label="On this page"
                className="toc mx-auto mt-6 max-w-[680px] border border-line px-5 py-4"
              >
                <p className="kicker mb-2 text-[10px] text-ink-mute">On this page</p>
                <ol className="columns-1 gap-x-8 font-serif text-[15px] leading-[1.85] text-ink-soft sm:columns-2">
                  {headings
                    .filter((h) => h.depth === 2)
                    .map((h) => (
                      <li key={h.id}>
                        <a href={`#${h.id}`} className="hover:text-accent">
                          {h.text}
                        </a>
                      </li>
                    ))}
                </ol>
              </nav>
            ) : null}

            <div className="prose mx-auto mt-8 max-w-[680px]">
              <MDXRemote
                source={a.content}
                components={mdxComponents}
                options={{
                  mdxOptions: { remarkPlugins: [remarkGfm] },
                  // Our MDX is first-party, version-controlled content — allow JSX
                  // expression props (chart data). blockDangerousJS stays on (default).
                  blockJS: false,
                }}
              />
            </div>

            {a.faq.length > 0 ? (
              <section
                aria-label="Frequently asked questions"
                className="mx-auto mt-10 max-w-[680px] border-t-2 border-ink pt-5"
              >
                <h2 className="kicker text-xs">Frequently asked questions</h2>
                <dl className="mt-3">
                  {a.faq.map((f, i) => (
                    <div
                      key={f.q}
                      className={i > 0 ? "mt-4 border-t border-line-faint pt-4" : undefined}
                    >
                      <dt className="font-serif text-lg font-semibold leading-snug">{f.q}</dt>
                      <dd className="mt-1.5 font-serif text-base leading-relaxed text-ink-soft">
                        {f.a}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            ) : null}

            {/* Course pager */}
            {lesson ? (
              <nav
                aria-label="Course navigation"
                className="no-print mx-auto mt-10 flex max-w-[680px] justify-between gap-6 border-y-[1.5px] border-ink py-4"
              >
                {lessonPrev ? (
                  <Link
                    href={`/${lessonPrev.cluster}/${lessonPrev.slug}`}
                    className="group max-w-[45%]"
                  >
                    <span className="kicker text-[10px] text-ink-mute">← Previous lesson</span>
                    <span className="mt-1 block font-serif text-base font-semibold leading-tight group-hover:text-accent">
                      {lessonPrev.title}
                    </span>
                  </Link>
                ) : (
                  <Link href={`/courses/${lesson.course.slug}`} className="group max-w-[45%]">
                    <span className="kicker text-[10px] text-ink-mute">← Course home</span>
                    <span className="mt-1 block font-serif text-base font-semibold leading-tight group-hover:text-accent">
                      {lesson.course.title}
                    </span>
                  </Link>
                )}
                {lessonNext ? (
                  <Link
                    href={`/${lessonNext.cluster}/${lessonNext.slug}`}
                    className="group ml-auto max-w-[45%] text-right"
                  >
                    <span className="kicker text-[10px] text-accent">Next lesson →</span>
                    <span className="mt-1 block font-serif text-base font-semibold leading-tight group-hover:text-accent">
                      {lessonNext.title}
                    </span>
                  </Link>
                ) : (
                  <Link
                    href={`/courses/${lesson.course.slug}`}
                    className="group ml-auto max-w-[45%] text-right"
                  >
                    <span className="kicker text-[10px] text-accent">Course complete ✓</span>
                    <span className="mt-1 block font-serif text-base font-semibold leading-tight group-hover:text-accent">
                      Back to {lesson.course.title}
                    </span>
                  </Link>
                )}
              </nav>
            ) : null}

            {/* Prev / next within the section */}
            <nav
              aria-label="More in this section"
              className="no-print mx-auto mt-10 flex max-w-[680px] justify-between gap-6 border-t border-line pt-5"
            >
              {prev ? (
                <Link href={`/${cluster}/${prev.slug}`} className="group max-w-[45%]">
                  <span className="kicker text-[10px] text-ink-mute">← Previous in {c.shortName}</span>
                  <span className="mt-1 block font-serif text-base font-semibold leading-tight group-hover:text-accent">
                    {prev.title}
                  </span>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link href={`/${cluster}/${next.slug}`} className="group ml-auto max-w-[45%] text-right">
                  <span className="kicker text-[10px] text-ink-mute">Next in {c.shortName} →</span>
                  <span className="mt-1 block font-serif text-base font-semibold leading-tight group-hover:text-accent">
                    {next.title}
                  </span>
                </Link>
              ) : null}
            </nav>

            {/* Keep reading */}
            {related.length > 0 ? (
              <section
                aria-label="Keep reading"
                className="no-print mx-auto mt-9 max-w-[680px] border-t-2 border-ink pt-5"
              >
                <h2 className="kicker mb-3.5 text-[11px] text-ink-mute">Keep reading</h2>
                <div className="grid gap-5 sm:grid-cols-2">
                  {related.map((r) => (
                    <Link
                      key={`${r.cluster}/${r.slug}`}
                      href={`/${r.cluster}/${r.slug}`}
                      className="group border-t border-line pt-2.5"
                    >
                      <span className="kicker text-[10px] text-accent">
                        {clusters.find((x) => x.slug === r.cluster)?.shortName} ·{" "}
                        {r.type === "guide" ? "Guide" : "Brief"}
                      </span>
                      <span className="mt-1.5 block font-serif text-xl font-semibold leading-tight group-hover:text-accent">
                        {r.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}
          </article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
