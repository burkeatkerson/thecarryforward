import Link from "next/link";
import { clusters } from "@/lib/clusters";
import { SITE_NAME } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="no-print mt-16 pb-16">
      <div className="mx-auto max-w-[1120px] px-5 sm:px-10">
        <div className="sheet px-8 py-10 sm:px-12">
          <div className="flex flex-wrap items-baseline justify-between gap-3 border-b-2 border-ink pb-4">
            <Link href="/" className="font-serif text-2xl font-semibold">
              {SITE_NAME}
            </Link>
            <span className="kicker font-normal text-[10px] text-ink-mute">
              Specialty tax &amp; incentives, explained plainly
            </span>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-x-7 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
            {clusters.map((c) => (
              <div key={c.slug} className="border-t-2 border-ink pt-2.5">
                <h2 className="kicker text-[11px]">
                  <Link href={`/${c.slug}`} className="text-ink hover:text-accent">
                    {c.shortName}
                  </Link>
                </h2>
                <p className="mt-1.5 font-serif text-sm leading-relaxed text-ink-soft">
                  {c.tagline}
                </p>
              </div>
            ))}
            <div className="border-t-2 border-ink pt-2.5">
              <h2 className="kicker text-[11px] text-ink">The paper</h2>
              <ul className="mt-1.5 space-y-1 font-serif text-sm leading-relaxed">
                <li>
                  <Link href="/the-index" className="text-ink-soft hover:text-accent">
                    The Index
                  </Link>
                </li>
                <li>
                  <Link href="/glossary" className="text-ink-soft hover:text-accent">
                    Glossary
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-ink-soft hover:text-accent">
                    About &amp; standards
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <p className="mt-8 border-t border-line pt-4 font-serif text-[13px] italic leading-relaxed text-ink-mute">
            © {new Date().getFullYear()} {SITE_NAME}. Educational material only — nothing here is
            tax, legal, or accounting advice. Consult a qualified professional about your own
            facts. We do not sell tax studies, and no provider pays for placement.
          </p>
        </div>
      </div>
    </footer>
  );
}
