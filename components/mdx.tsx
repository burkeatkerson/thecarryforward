import type { MDXComponents } from "mdx/types";
import { slugify } from "@/lib/content";

/* ——— Editorial callouts ——— */

export function KeyTakeaway({ children }: { children: React.ReactNode }) {
  return (
    <aside className="takeaway">
      <span className="kicker">Key takeaway</span>
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
      <span className="kicker">{label}</span>
      {children}
    </aside>
  );
}

/* ——— Charts: single-series ink bars, newspaper style ———
   Accessible: values are rendered as visible text; an sr-only table mirrors the data. */

export type BarDatum = { label: string; value: number; display?: string };

export function BarChart({
  title,
  data,
  note,
  unit = "",
}: {
  title: string;
  data: BarDatum[];
  note?: string;
  unit?: string;
}) {
  const max = Math.max(...data.map((d) => Math.abs(d.value)), 1);
  return (
    <figure className="figure">
      <figcaption>{title}</figcaption>
      <div role="img" aria-label={`${title}. ${data.map((d) => `${d.label}: ${d.display ?? `${d.value}${unit}`}`).join("; ")}.`}>
        {data.map((d) => {
          const pct = Math.max((Math.abs(d.value) / max) * 100, 1);
          const display = d.display ?? `${d.value}${unit}`;
          const inside = pct > 55;
          return (
            <div className="barchart-row" key={d.label} aria-hidden="true">
              <span className="barchart-label">{d.label}</span>
              <span className="barchart-track">
                <span className="barchart-bar" style={{ width: `${pct}%` }} />
                <span
                  className="barchart-value"
                  style={
                    inside
                      ? { right: `${100 - pct + 1.5}%`, color: "var(--paper)" }
                      : { left: `calc(${pct}% + 0.45rem)` }
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
