import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { clusters } from "@/lib/clusters";
import { getAllArticles, getClusterArticles } from "@/lib/content";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

const MACRS_5YR = [20, 32, 19.2, 11.52, 11.52, 5.76];

export default function HomePage() {
  const all = getAllArticles();
  const latest = all
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 6);
  const hero = all.find(
    (a) => a.cluster === "rd-tax-credit" && a.slug === "what-is-the-rd-tax-credit"
  );

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
        <div className="mx-auto max-w-[1120px] px-5 pt-11 sm:px-10">
          <div className="sheet px-7 py-10 sm:px-12 sm:py-11">
            {/* ——— Hero story + right rail ——— */}
            <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
              <div>
                <p className="kicker mb-2 text-xs text-accent">
                  {hero ? "The R&D Credit · Guide" : "The Front Page"}
                </p>
                <h1 className="font-serif text-4xl font-semibold leading-[1.02] sm:text-[54px]">
                  <Link
                    href={hero ? `/${hero.cluster}/${hero.slug}` : "/the-index"}
                    className="hover:text-accent"
                  >
                    {hero ? hero.title : "Specialty tax, explained plainly"}
                  </Link>
                </h1>
                <p className="mt-3.5 font-serif text-xl italic leading-snug text-ink-soft">
                  {hero
                    ? hero.description
                    : "The R&D credit, Section 174, cost segregation, and energy incentives — for readers, not leads."}
                </p>
                <p className="kicker mt-4 border-y border-line py-2 font-medium text-[11px] text-ink-mute">
                  By The Carryforward Desk
                  {hero ? (
                    <>
                      {" "}· {hero.readingMinutes} min read ·{" "}
                      <Link
                        href={`/${hero.cluster}/${hero.slug}`}
                        className="text-accent hover:text-accent-deep"
                      >
                        Read the guide →
                      </Link>
                    </>
                  ) : null}
                </p>

                {/* Fig. 1 — front-page chart */}
                <figure className="mt-5 border border-ink px-5 pb-4 pt-4">
                  <figcaption className="mb-3.5 flex justify-between font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-ink-mute">
                    <span>Fig. 1 — Federal research credit, common computation paths</span>
                    <span>Rate</span>
                  </figcaption>
                  <div
                    role="img"
                    aria-label="Regular method: 20% of QREs over the base amount. Alternative simplified credit: 14% over 50% of the prior three-year average. ASC with no prior QREs: 6% of current-year QREs."
                  >
                    {[
                      { label: "Regular method", pct: 100, text: "20% over base" },
                      { label: "ASC", pct: 70, text: "14% over ½ prior avg", hot: true },
                      { label: "ASC, no history", pct: 30, text: "6% of QREs" },
                    ].map((r) => (
                      <div
                        key={r.label}
                        aria-hidden="true"
                        className="grid grid-cols-[minmax(5.5rem,10rem)_1fr] items-center gap-3 py-[0.32rem]"
                      >
                        <span
                          className={`text-right font-serif text-[0.85rem] ${
                            r.hot ? "font-semibold text-accent" : "text-ink-soft"
                          }`}
                        >
                          {r.label}
                        </span>
                        <span className="relative h-4">
                          <span
                            className={`absolute inset-y-0 left-0 ${r.hot ? "bg-accent" : "bg-ink"}`}
                            style={{ width: `${r.pct}%` }}
                          />
                          <span
                            className={`absolute top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[0.66rem] ${
                              r.pct > 55 ? "text-paper" : "text-ink-mute"
                            }`}
                            style={
                              r.pct > 55
                                ? { right: `${100 - r.pct + 2}%` }
                                : { left: `calc(${r.pct}% + 0.5rem)` }
                            }
                          >
                            {r.text}
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-2 font-serif text-[13px] italic text-ink-faint">
                    Most filers land on the ASC. The methods, worked with real numbers, in{" "}
                    <Link
                      href="/rd-tax-credit/how-to-calculate-the-rd-credit"
                      className="text-accent hover:underline"
                    >
                      How to calculate the R&D credit
                    </Link>
                    .
                  </p>
                </figure>
              </div>

              {/* Right rail */}
              <aside className="border-line lg:border-l lg:pl-6">
                <p className="kicker border-b-2 border-ink pb-1.5 text-xs">Fig. 2 — MACRS</p>
                <p className="mt-2.5 font-mono text-[10px] uppercase tracking-[0.06em] text-ink-mute">
                  5-year property · % written off per year
                </p>
                <div
                  role="img"
                  aria-label="MACRS five-year property annual depreciation: 20, 32, 19.2, 11.52, 11.52, and 5.76 percent."
                  className="mt-3"
                >
                  <div
                    aria-hidden="true"
                    className="flex h-[104px] items-end gap-2 border-b-[1.5px] border-ink"
                  >
                    {MACRS_5YR.map((v, i) => (
                      <div
                        key={i}
                        className={`flex-1 ${i === 1 ? "bg-accent" : "bg-ink"}`}
                        style={{ height: `${(v / 32) * 100}%` }}
                      />
                    ))}
                  </div>
                  <div
                    aria-hidden="true"
                    className="mt-1.5 flex gap-2 font-mono text-[10px] text-ink-mute"
                  >
                    {MACRS_5YR.map((_, i) => (
                      <span key={i} className="flex-1 text-center">
                        Y{i + 1}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 border-[1.5px] border-ink p-4">
                  <p className="kicker mb-2 text-[11px] text-accent">↳ Carryforward Tip</p>
                  <p className="font-serif text-[15px] leading-normal">
                    Under declining balance, the largest write-off lands in Year 2, not Year 1 —
                    the half-year convention holds Year 1 back.{" "}
                    <Link
                      href="/fundamentals/depreciation-basics"
                      className="text-accent hover:underline"
                    >
                      Depreciation from first principles →
                    </Link>
                  </p>
                </div>

                <div className="mt-6">
                  <p className="kicker border-b-2 border-ink pb-1.5 text-xs">Latest filings</p>
                  <ul>
                    {latest.slice(0, 4).map((a) => (
                      <li key={`${a.cluster}/${a.slug}`} className="border-b border-line-faint py-2.5">
                        <Link
                          href={`/${a.cluster}/${a.slug}`}
                          className="font-serif text-[15px] font-semibold leading-tight hover:text-accent"
                        >
                          {a.title}
                        </Link>
                        <p className="kicker mt-1 font-normal text-[9px] text-ink-faint">
                          {clusters.find((c) => c.slug === a.cluster)?.shortName} ·{" "}
                          {a.readingMinutes} min
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </div>

            {/* ——— The Index: directory spine ——— */}
            <div className="mt-9 border-t-[3px] border-double border-ink pt-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-serif text-3xl font-semibold">The Index</h2>
                <span className="kicker font-normal text-[11px] text-ink-mute">
                  {all.length} pieces · everything, in order
                </span>
              </div>
              <Link
                href="/the-index"
                className="mt-3.5 mb-6 flex items-center gap-3 border-[1.5px] border-ink px-4 py-2.5 hover:border-accent"
              >
                <span className="font-mono text-[13px] text-accent">⌕</span>
                <span className="font-serif text-base italic text-ink-faint">
                  Search a term, section number, or question — try &ldquo;payroll offset&rdquo;…
                </span>
              </Link>
              <div className="grid grid-cols-2 gap-x-6 gap-y-7 md:grid-cols-3 lg:grid-cols-5">
                {clusters.map((c) => {
                  const arts = getClusterArticles(c.slug);
                  return (
                    <div key={c.slug} className="border-t-2 border-ink pt-2.5">
                      <p className="kicker text-[11px]">
                        <Link href={`/${c.slug}`} className="text-ink hover:text-accent">
                          {c.shortName} <span className="text-ink-faint">{arts.length}</span>
                        </Link>
                      </p>
                      <ul className="mt-1.5 font-serif text-sm leading-[1.9] text-ink-soft">
                        {arts.slice(0, 4).map((a) => (
                          <li key={a.slug}>
                            <Link
                              href={`/${a.cluster}/${a.slug}`}
                              className="hover:text-accent"
                            >
                              {a.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 border-t border-line pt-3 text-center">
                <Link
                  href="/the-index"
                  className="kicker text-[11px] font-medium text-accent hover:text-accent-deep"
                >
                  Open the full index — all {all.length} pieces →
                </Link>
              </div>
            </div>

            {/* ——— Latest, as broadsheet teasers ——— */}
            <div className="mt-8 border-t-2 border-ink pt-5">
              <div className="grid gap-7 md:grid-cols-3">
                {latest.slice(0, 3).map((a, i) => (
                  <div
                    key={`${a.cluster}/${a.slug}`}
                    className={
                      i < 2 ? "md:border-r md:border-line md:pr-7" : undefined
                    }
                  >
                    <p className="kicker mb-1.5 text-[10px] text-accent">
                      {clusters.find((c) => c.slug === a.cluster)?.shortName} ·{" "}
                      {a.type === "guide" ? "Guide" : "Brief"}
                    </p>
                    <h3 className="font-serif text-[21px] font-semibold leading-tight">
                      <Link href={`/${a.cluster}/${a.slug}`} className="hover:text-accent">
                        {a.title}
                      </Link>
                    </h3>
                    <p className="mt-2 font-serif text-sm leading-normal text-ink-soft">
                      {a.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
