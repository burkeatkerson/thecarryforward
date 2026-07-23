import Link from "next/link";
import { clusters } from "@/lib/clusters";
import { SITE_MOTTO, SITE_NAME } from "@/lib/site";

export function SiteHeader({ activeCluster }: { activeCluster?: string }) {
  return (
    <header>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="masthead">
        <div className="masthead-inner">
          <Link href="/" className="wordmark">
            {SITE_NAME}
          </Link>
          <span className="masthead-motto">{SITE_MOTTO}</span>
        </div>
      </div>
      <nav className="topics-bar" aria-label="Topics">
        <div className="topics-bar-inner">
          {clusters.map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}`}
              aria-current={activeCluster === c.slug ? "true" : undefined}
            >
              {c.shortName}
            </Link>
          ))}
          <Link href="/glossary" aria-current={activeCluster === "glossary" ? "true" : undefined}>
            Glossary
          </Link>
        </div>
      </nav>
    </header>
  );
}
