# The Carryforward — Authoring Spec

Every article is one `.mdx` file at `content/<cluster>/<slug>.mdx`. Slugs are kebab-case.

## Frontmatter (YAML, all required unless noted)

```yaml
---
title: "Plain, specific headline — sentence case, no clickbait"
description: "One-to-two sentence dek. Answer-first; this feeds meta description and AEO."
date: "2026-03-14"          # ISO. Spread publication dates across 2026-01 through 2026-07.
type: "guide"               # "guide" (long-form, 1,800–2,800 words) or "brief" (500–900 words)
level: "working"            # "intro" (no background assumed), "working" (practitioner), "pro" (specialist nuance)
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

BarChart rules: single series only; 3–7 rows; numeric `value` (use `display` for a formatted string like `"$500,000"` with `value` as the raw number); optional `highlight={i}` draws row i in the accent ink — use it to mark the row the surrounding prose discusses; always include `note` when data is illustrative. Visual-first mandate: every guide includes at least one BarChart or substantive table (prefer both); briefs include one wherever a numeric comparison exists. Charts must carry real analytical weight — worked numbers from the article, statutory rates, or schedules — never decoration.

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

## Authoritative citations (required)

Every article links to 2–4 primary or governmental sources inline as markdown links, at the point where the authority matters. Use ONLY these verified URLs (do not invent deeper links):

- Research credit overview: https://www.irs.gov/credits-deductions/businesses/research-credit
- Form 6765: https://www.irs.gov/forms-pubs/about-form-6765
- Form 3115: https://www.irs.gov/forms-pubs/about-form-3115
- Form 4562 (depreciation): https://www.irs.gov/forms-pubs/about-form-4562
- Form 8974 (payroll offset): https://www.irs.gov/forms-pubs/about-form-8974
- Form 7205 (179D): https://www.irs.gov/forms-pubs/about-form-7205
- Pub 946, How to Depreciate Property: https://www.irs.gov/publications/p946
- Pub 538, Accounting Periods and Methods: https://www.irs.gov/publications/p538
- Cost Segregation Audit Techniques Guide: https://www.irs.gov/businesses/cost-segregation-audit-techniques-guide
- 179D deduction (IRS): https://www.irs.gov/credits-deductions/energy-efficient-commercial-buildings-deduction
- 45L credit (IRS): https://www.irs.gov/credits-deductions/45l-new-energy-efficient-home-credit
- Prevailing wage & apprenticeship (IRS): https://www.irs.gov/credits-deductions/prevailing-wage-and-apprenticeship-requirements
- 45L builder pages (ENERGY STAR): https://www.energystar.gov/partner_resources/residential_new/homes_prog_reqs/45l_fed_tax_credits
- DOE 179D qualified software: https://www.energy.gov/eere/buildings/179d-commercial-buildings-energy-efficiency-tax-deduction
- Internal Revenue Code (official): https://uscode.house.gov/browse/prelim@title26&edition=prelim
- Treasury regulations (eCFR Title 26): https://www.ecfr.gov/current/title-26
- OBBBA (H.R. 1, 119th Congress): https://www.congress.gov/bill/119th-congress/house-bill/1
- IRS Appeals: https://www.irs.gov/appeals
- Taxpayer Bill of Rights: https://www.irs.gov/taxpayer-bill-of-rights

Cite statutes and regulations in prose precisely (e.g., "Treas. Reg. §1.41-4(c)(6)") even when the link is to the general eCFR title.

## State credit articles (content/state-rd-credits/)

- Date every rate, cap, and threshold ("as of mid-2026") and note that state legislatures change these annually — verify before relying.
- Only state facts you are highly confident in; where detail is uncertain, describe the mechanism and direct readers to the state authority by name.
- External links: the state revenue agency's top-level domain ONLY (e.g. https://www.ftb.ca.gov, https://www.tax.ny.gov, https://www.cdtfa.ca.gov, https://www.revenue.state.mn.us, https://tax.illinois.gov, https://www.mass.gov/orgs/massachusetts-department-of-revenue, https://comptroller.texas.gov) — never deep links to specific pages or PDFs.
- Every state article covers: credit rate & computation base, federal conformity/divergence, refundability/transferability/carryforward, who tends to benefit, filing mechanics & deadlines, and at least one trap.

## Case briefs (content/case-law/)

- Full citation in the lede (court, reporter or docket, year). Only well-documented, widely cited cases; no invented quotes — paraphrase holdings.
- Structure: the dispute → the holding → the reasoning that matters → what it means for claims today → related cases on the site.
- Neutral: describe what the taxpayer did wrong (or right) without editorializing; the lesson is the point.

## Answer engine optimization (top priority)

- The lede's first two sentences must directly and completely answer the question the title poses — quotable in isolation.
- Prefer question-form H2s where natural ("Who can elect the payroll offset?").
- Every number gets its authority and its year. Every rule gets its cite.
- FAQ answers must be self-contained (no "see above"), 40–80 words, and restate key entities by name.

## Voice

Authoritative, dry, occasionally wry — a serious financial broadsheet, not a blog. Short sentences where the law is complicated. No exclamation marks, no "unlock", "maximize", "leverage", or "game-changer". Numbers get context ("about a fifth of the building's basis") not hype.
