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
    <nav aria-label="Breadcrumb" className="kicker no-print text-[10px] font-medium">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex flex-wrap items-center gap-2">
        {crumbs.map((c, i) => (
          <li key={c.href} className="flex items-center gap-2">
            {i > 0 ? <span className="text-line">/</span> : null}
            {i < crumbs.length - 1 ? (
              <Link
                href={c.href}
                className={i === 0 ? "text-accent hover:text-accent-deep" : "text-ink-mute hover:text-accent"}
              >
                {i === 0 ? "← " : ""}
                {c.name}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink-mute">
                {c.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
