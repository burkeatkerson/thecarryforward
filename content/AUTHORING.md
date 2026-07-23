# The Carryforward — Authoring Spec

Every article is one `.mdx` file at `content/<cluster>/<slug>.mdx`. Slugs are kebab-case.

## Frontmatter (YAML, all required unless noted)

```yaml
---
title: "Plain, specific headline — sentence case, no clickbait"
description: "One-to-two sentence dek. Answer-first; this feeds meta description and AEO."
date: "2026-03-14"          # ISO. Spread publication dates across 2026-01 through 2026-07.
type: "guide"               # "guide" (long-form, 1,800–2,800 words) or "brief" (500–900 words)
tags: ["section-41", "qres"] # 2–5 kebab-case tags from the shared vocabulary; reused across clusters for related-article linking
faq:                        # 3–5 for guides, 2–3 for briefs. Concise, self-contained answers (40–80 words) — these emit FAQPage JSON-LD.
  - q: "A real question a CPA or founder would type into a search engine?"
    a: "A direct, complete answer that stands alone without the article."
---
```

## Body conventions

- Open with a 1–2 paragraph lede that answers the core question immediately (AEO: the first 60 words should satisfy a featured-snippet query).
- Immediately after the lede, include a `<KeyTakeaway>` block: 1–2 sentences, the whole article compressed.
- Use `##` for sections and `###` for subsections (these build the table of contents). Never use `#`.
- Write for a sophisticated but non-specialist reader: CPAs, founders, CFOs. Define terms on first use. Cite authority inline in prose ("under Section 41(d)…", "Treas. Reg. §1.41-4", "TAM…", case names in italics) — no footnotes.
- Neutrality is the brand: every piece must include when the strategy does NOT apply or make sense, and what the IRS challenges. Never promotional. Never "contact a provider today."
- Guides get 5–9 `##` sections; briefs get 2–4 or none.
- Use GFM tables for any comparative or numeric material — tables are first-class. Give each a bold intro sentence, not a caption element.

## Components available in MDX

```mdx
<KeyTakeaway>
  <p>One or two sentences. Plain HTML paragraphs inside.</p>
</KeyTakeaway>

<Callout label="Watch out">
  <p>Short warning, exception, or practice note. `label` defaults to "Note".</p>
</Callout>

<BarChart
  title="Recovery periods after a typical office cost segregation study"
  unit="%"
  note="Illustrative allocation; actual results vary with building type."
  data={[
    { label: "5-year property", value: 18 },
    { label: "15-year property", value: 9 },
    { label: "39-year property", value: 73 },
  ]}
/>
```

BarChart rules: single series only; 3–7 rows; numeric `value` (use `display` for a formatted string like `"$500,000"` with `value` as the raw number); always include `note` when data is illustrative. Use charts only where they genuinely clarify (roughly 1 in 3 guides).

## Fixed legal facts (do not contradict; as of July 2026)

- The One Big Beautiful Bill Act (OBBBA) was enacted July 4, 2025.
- New **Section 174A**: domestic research or experimental (R&E) expenditures are immediately deductible for tax years beginning after December 31, 2024; taxpayers may instead elect to capitalize and amortize over at least 60 months. **Foreign** research remains capitalized over 15 years under Section 174.
- Transition: small businesses (average annual gross receipts ≤ $31M) may apply Section 174A retroactively to tax years beginning after 2021 (amended returns); all taxpayers may deduct remaining unamortized domestic 2022–2024 Section 174 amounts over one or two years beginning with the first tax year after 2024.
- TCJA-era rule (tax years 2022–2024): all Section 174 SRE costs, explicitly including software development, were capitalized — 5-year amortization domestic (midpoint convention: half-year in year one), 15-year foreign.
- 100% bonus depreciation is permanently restored for qualified property **acquired after January 19, 2025**; the pre-OBBBA phase-down (80% 2023, 60% 2024, 40% for early-2025 acquisitions) still governs earlier property.
- Section 179D terminates for property whose **construction begins after June 30, 2026**; Section 45L terminates for homes **acquired after June 30, 2026**. Both still carry prevailing wage & apprenticeship multipliers from the IRA.
- Research credit: Section 41 permanent; ASC = 14% of QREs over 50% of prior-3-year average (6% if no prior QREs); regular method 20% over base amount; Section 280C reduced-credit election; payroll tax offset up to $500,000 for qualified small businesses (< $5M gross receipts, no gross receipts before the 5-taxable-year window).
- Form 6765 redesign effective for 2024 tax years: Sections E–G, with Section G business-component reporting (optional for QSBs and taxpayers with ≤ $1.5M QREs and ≤ $50M gross receipts).
- Research credit carryback 1 year, carryforward 20 (Section 39).

## Voice

Authoritative, dry, occasionally wry — a serious financial broadsheet, not a blog. Short sentences where the law is complicated. No exclamation marks, no "unlock", "maximize", "leverage", or "game-changer". Numbers get context ("about a fifth of the building's basis") not hype.
