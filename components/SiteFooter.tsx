import Link from "next/link";
import { clusters } from "@/lib/clusters";
import { SITE_NAME } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <Link href="/" className="footer-wordmark">
          {SITE_NAME}
        </Link>
        <div className="footer-grid">
          {clusters.map((c) => (
            <div key={c.slug}>
              <h2>
                <Link href={`/${c.slug}`}>{c.name}</Link>
              </h2>
              <ul>
                <li>
                  <Link href={`/${c.slug}`}>All {c.shortName} articles →</Link>
                </li>
              </ul>
            </div>
          ))}
          <div>
            <h2>The Carryforward</h2>
            <ul>
              <li>
                <Link href="/about">About &amp; editorial standards</Link>
              </li>
              <li>
                <Link href="/glossary">Glossary</Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="footer-note">
          © {new Date().getFullYear()} {SITE_NAME}. Educational material only — nothing here is
          tax, legal, or accounting advice. Consult a qualified professional about your own facts.
          We do not sell tax studies, and no provider pays for placement.
        </p>
      </div>
    </footer>
  );
}
