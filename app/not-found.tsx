import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { clusters } from "@/lib/clusters";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <div className="mx-auto max-w-[1120px] px-5 pt-11 sm:px-10">
          <div className="sheet px-7 py-12 text-center sm:px-14">
            <p className="kicker text-xs text-accent">Correction · Error 404</p>
            <h1 className="mt-3 font-serif text-4xl font-semibold">
              This page isn&rsquo;t on file.
            </h1>
            <p className="mx-auto mt-3 max-w-[44ch] font-serif text-lg italic text-ink-soft">
              It may have moved, or the address may be mistyped. The sections below hold
              everything we publish.
            </p>
            <div className="mx-auto mt-7 flex max-w-[560px] flex-wrap justify-center gap-2.5">
              {clusters.map((c) => (
                <Link
                  key={c.slug}
                  href={`/${c.slug}`}
                  className="kicker border-[1.5px] border-ink px-3 py-1.5 text-[10px] text-ink hover:border-accent hover:text-accent"
                >
                  {c.shortName}
                </Link>
              ))}
              <Link
                href="/the-index"
                className="kicker border-[1.5px] border-accent px-3 py-1.5 text-[10px] text-accent hover:bg-accent hover:text-paper"
              >
                ⌕ Search the Index
              </Link>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
