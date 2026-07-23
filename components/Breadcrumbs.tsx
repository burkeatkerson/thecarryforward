import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export type Crumb = { name: string; href: string };

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.href}`,
    })),
  };
  return (
    <nav aria-label="Breadcrumb" className="crumbs">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol>
        {crumbs.map((c, i) => (
          <li key={c.href}>
            {i < crumbs.length - 1 ? (
              <Link href={c.href}>{c.name}</Link>
            ) : (
              <span aria-current="page">{c.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
