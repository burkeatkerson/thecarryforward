"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export type IndexEntry = {
  cluster: string;
  clusterName: string;
  slug: string;
  title: string;
  description: string;
  type: "guide" | "brief";
  tags: string[];
  minutes: number;
};

export function IndexBrowser({ entries }: { entries: IndexEntry[] }) {
  const [q, setQ] = useState("");
  const [type, setType] = useState<"all" | "guide" | "brief">("all");

  const results = useMemo(() => {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    return entries.filter((e) => {
      if (type !== "all" && e.type !== type) return false;
      if (terms.length === 0) return true;
      const hay = `${e.title} ${e.description} ${e.clusterName} ${e.tags.join(" ")}`.toLowerCase();
      return terms.every((t) => hay.includes(t));
    });
  }, [entries, q, type]);

  const byCluster = useMemo(() => {
    const m = new Map<string, IndexEntry[]>();
    for (const e of results) {
      const list = m.get(e.clusterName) ?? [];
      list.push(e);
      m.set(e.clusterName, list);
    }
    return m;
  }, [results]);

  return (
    <div>
      <div className="flex items-center gap-3 border-[1.5px] border-ink px-4 py-2.5 focus-within:border-accent">
        <span className="font-mono text-[13px] text-accent" aria-hidden="true">
          ⌕
        </span>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder='Search a term, section number, or question — try "payroll offset"…'
          aria-label="Search all articles"
          className="w-full bg-transparent font-serif text-base italic text-ink placeholder:text-ink-faint focus:outline-none"
        />
      </div>

      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-3 border-b border-line pb-2.5">
        <div className="flex gap-1.5" role="group" aria-label="Filter by format">
          {(
            [
              ["all", "All"],
              ["guide", "Guides"],
              ["brief", "Briefs"],
            ] as const
          ).map(([val, label]) => (
            <button
              key={val}
              type="button"
              onClick={() => setType(val)}
              aria-pressed={type === val}
              className={`kicker border px-2.5 py-1 text-[10px] ${
                type === val
                  ? "border-ink bg-ink text-paper"
                  : "border-ink text-ink hover:border-accent hover:text-accent"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <span className="kicker font-normal text-[11px] text-ink-mute" aria-live="polite">
          {results.length} of {entries.length} pieces
        </span>
      </div>

      {results.length === 0 ? (
        <p className="mt-8 text-center font-serif text-lg italic text-ink-faint">
          Nothing matches &ldquo;{q}&rdquo; — try a broader term, or browse a section from the
          masthead.
        </p>
      ) : (
        [...byCluster.entries()].map(([clusterName, list]) => (
          <section key={clusterName} className="mt-7">
            <h2 className="kicker border-b-2 border-ink pb-1.5 text-xs">
              {clusterName} <span className="font-normal text-ink-faint">{list.length}</span>
            </h2>
            <ul>
              {list.map((e) => (
                <li key={`${e.cluster}/${e.slug}`} className="border-b border-line-faint">
                  <Link
                    href={`/${e.cluster}/${e.slug}`}
                    className="group flex items-baseline justify-between gap-4 py-2.5"
                  >
                    <span className="font-serif text-[17px] font-medium leading-snug group-hover:text-accent">
                      {e.title}
                    </span>
                    <span className="kicker flex-none font-normal text-[9px] text-ink-faint">
                      {e.type === "guide" ? "Guide" : "Brief"} · {e.minutes} min
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))
      )}
    </div>
  );
}
