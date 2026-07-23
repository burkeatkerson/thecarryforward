import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { clusters } from "@/lib/clusters";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <div className="narrow" style={{ padding: "3rem 1.25rem" }}>
          <span className="kicker">Error 404</span>
          <h1>Page not found.</h1>
          <p>
            This page may have moved, or the address may be mistyped. Try one of the topics
            instead:
          </p>
          <ul>
            {clusters.map((c) => (
              <li key={c.slug}>
                <Link href={`/${c.slug}`}>{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
