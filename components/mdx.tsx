import type { MDXComponents } from "mdx/types";
import { slugify } from "@/lib/content";

/* ——— Editorial callouts ——— */

export function KeyTakeaway({ children }: { children: React.ReactNode }) {
  return (
    <aside className="takeaway">
      <span className="kicker">↳ Key takeaway</span>
      {children}
    </aside>
  );
}

export function Callout({
  label = "Note",
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <aside className="callout">
      <span className="kicker">↳ {label}</span>
      {children}
    </aside>
  );
}

/* ——— Charts: ink-on-paper bars in a bordered, auto-numbered figure ———
   Single series; the `highlight` index (optional) is drawn in the accent ink.
   Values render as visible mono text; the aria-label mirrors the data. */

export type BarDatum = { label: string; value: number; display?: string };

export function BarChart({
  title,
  data,
  note,
  unit = "",
  highlight,
}: {
  title: string;
  data: BarDatum[];
  note?: string;
  unit?: string;
  highlight?: number;
}) {
  const max = Math.max(...data.map((d) => Math.abs(d.value)), 1);
  return (
    <figure className="figure">
      <figcaption>
        <span className="fig-title">{title}</span>
        {unit ? <span>{unit}</span> : null}
      </figcaption>
      <div
        role="img"
        aria-label={`${title}. ${data
          .map((d) => `${d.label}: ${d.display ?? `${d.value}${unit}`}`)
          .join("; ")}.`}
      >
        {data.map((d, i) => {
          const pct = Math.max((Math.abs(d.value) / max) * 100, 1.5);
          const display = d.display ?? `${d.value}${unit}`;
          const hot = i === highlight;
          return (
            <div
              key={d.label}
              aria-hidden="true"
              className="grid grid-cols-[minmax(5.5rem,11rem)_1fr] items-center gap-3 py-[0.32rem]"
            >
              <span
                className={`text-right font-serif text-[0.85rem] leading-tight ${
                  hot ? "font-semibold text-accent" : "text-ink-soft"
                }`}
              >
                {d.label}
              </span>
              <span className="relative h-4">
                <span
                  className={`absolute inset-y-0 left-0 ${hot ? "bg-accent" : "bg-ink"}`}
                  style={{ width: `${pct}%` }}
                />
                <span
                  className={`absolute top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[0.66rem] ${
                    pct > 55 ? "text-paper" : hot ? "text-accent" : "text-ink-mute"
                  }`}
                  style={
                    pct > 55
                      ? { right: `${100 - pct + 1.5}%` }
                      : { left: `calc(${pct}% + 0.5rem)` }
                  }
                >
                  {display}
                </span>
              </span>
            </div>
          );
        })}
      </div>
      {note ? <p className="fig-note">{note}</p> : null}
    </figure>
  );
}

/* ——— Heading anchors for the table of contents ——— */

function heading(depth: 2 | 3) {
  const Tag = `h${depth}` as const;
  return function Heading({ children }: { children?: React.ReactNode }) {
    const text = typeof children === "string" ? children : extractText(children);
    return <Tag id={slugify(text)}>{children}</Tag>;
  };
}

function extractText(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (node && typeof node === "object" && "props" in node) {
    return extractText((node as { props: { children?: React.ReactNode } }).props.children);
  }
  return "";
}

export const mdxComponents: MDXComponents = {
  h2: heading(2),
  h3: heading(3),
  table: (props) => (
    <div className="table-wrap">
      <table {...props} />
    </div>
  ),
  KeyTakeaway,
  Callout,
  BarChart,
};
