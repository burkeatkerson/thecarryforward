import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { IndexBrowser, type IndexEntry } from "@/components/IndexBrowser";
import { clusters } from "@/lib/clusters";
import { getAllArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: "The Index — Every Article",
  description:
    "The complete index of The Carryforward: every guide and brief on the R&D credit, Section 174/174A, cost segregation, energy incentives, and the fundamentals — searchable in one place.",
  alternates: { canonical: "/the-index" },
};

export default function TheIndexPage() {
  const entries: IndexEntry[] = getAllArticles().map((a) => ({
    cluster: a.cluster,
    clusterName: clusters.find((c) => c.slug === a.cluster)?.name ?? a.cluster,
    slug: a.slug,
    title: a.title,
    description: a.description,
    type: a.type,
    tags: a.tags,
    minutes: a.readingMinutes,
  }));

  return (
    <>
      <SiteHeader />
      <main id="main">
        <div className="mx-auto max-w-[1120px] px-5 pt-11 sm:px-10">
          <div className="sheet px-7 py-9 sm:px-11 sm:py-10">
            <div className="flex flex-wrap items-end justify-between gap-3 border-b-2 border-ink pb-4">
              <div>
                <p className="kicker mb-1.5 text-[10px] font-medium">
                  <span className="text-ink-mute">The complete index</span>
                </p>
                <h1 className="font-serif text-4xl font-semibold leading-none sm:text-[42px]">
                  The Index
                </h1>
              </div>
              <span className="kicker text-right font-normal text-[11px] text-ink-mute">
                {entries.length} pieces
                <br />
                Updated continuously
              </span>
            </div>
            <div className="mt-6">
              <IndexBrowser entries={entries} />
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
