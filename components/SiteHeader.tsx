import Link from "next/link";
import { clusters } from "@/lib/clusters";
import { SITE_NAME } from "@/lib/site";

function editionDate(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "America/Chicago",
  });
}

export function SiteHeader({ activeCluster }: { activeCluster?: string }) {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-paper shadow-[0_2px_12px_rgba(30,26,20,.08)]">
      <a
        href="#main"
        className="kicker absolute -left-[9999px] top-0 z-[100] bg-ink px-4 py-2 text-paper focus:left-0"
      >
        Skip to content
      </a>
      <div className="mx-auto max-w-[1120px] px-5 sm:px-10">
        <div className="kicker hidden justify-between border-b border-line-faint py-1.5 font-normal text-[10px] tracking-[0.12em] text-ink-mute sm:flex">
          <span>Reader Edition</span>
          <span>Specialty tax &amp; incentives, explained plainly</span>
          <span>{editionDate()}</span>
        </div>
        <div className="flex items-center justify-between gap-4 py-3">
          <Link
            href="/"
            className="font-serif text-[26px] font-semibold leading-none sm:text-[34px]"
          >
            {SITE_NAME}
          </Link>
          <nav
            aria-label="Site"
            className="kicker flex items-center gap-3 text-[11px] tracking-[0.09em] sm:gap-5"
          >
            <Link href="/the-index" className="hidden text-ink hover:text-accent sm:inline">
              The Index
            </Link>
            <Link href="/glossary" className="hidden text-ink hover:text-accent sm:inline">
              Glossary
            </Link>
            <Link href="/about" className="hidden text-ink hover:text-accent md:inline">
              About
            </Link>
            <Link
              href="/the-index"
              className="border-[1.5px] border-ink px-2.5 py-1.5 text-ink hover:border-accent hover:text-accent"
            >
              ⌕ Search
            </Link>
          </nav>
        </div>
      </div>
      <nav
        aria-label="Topics"
        className="border-t border-line-faint"
      >
        <div className="kicker mx-auto flex max-w-[1120px] gap-5 overflow-x-auto px-5 py-2 text-[11px] font-semibold tracking-[0.12em] sm:justify-center sm:gap-7 sm:px-10">
          {clusters.map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}`}
              aria-current={activeCluster === c.slug ? "true" : undefined}
              className={
                activeCluster === c.slug
                  ? "whitespace-nowrap text-accent"
                  : "whitespace-nowrap text-ink hover:text-accent"
              }
            >
              {c.shortName}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
