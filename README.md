# The Carryforward

**thecarryforward.com** — a neutral, educational reference for specialty tax topics: the R&D tax credit (§41), Section 174/174A, cost segregation, and energy incentives (§179D/§45L).

## Stack

- **Next.js** (App Router) + **TypeScript**, fully static output
- **MDX** content on the filesystem — no database
- `gray-matter` frontmatter + `next-mdx-remote` (RSC) + `remark-gfm`

## Architecture

```
content/<cluster>/<slug>.mdx   → /<cluster>/<slug>   (article)
lib/clusters.ts                → /<cluster>          (hub page)
app/                           → /, /glossary, /about, sitemap, robots
```

Topic clusters are defined in [lib/clusters.ts](lib/clusters.ts); adding an article is dropping an `.mdx` file into the right folder. The frontmatter schema, available MDX components, and editorial voice are documented in [content/AUTHORING.md](content/AUTHORING.md).

## Commands

```sh
npm install
npm run dev     # local dev
npm run build   # static production build
```

## Design

Vintage-newspaper, typography-driven: Newsreader (text) + Libre Franklin (labels), hairline rules, double-rule section breaks, broadsheet tables, ink-on-paper SVG bar charts. No photography. Light/dark via `prefers-color-scheme`. All design tokens live in [app/globals.css](app/globals.css).

## SEO / AEO

- Per-article `Article` + `FAQPage` + `BreadcrumbList` JSON-LD
- Answer-first ledes and `KeyTakeaway` blocks; FAQ sections from frontmatter
- `sitemap.xml`, `robots.txt`, canonical URLs, OpenGraph metadata

## Editorial position

The site sells nothing — no studies, no referrals, no sponsorships. Every article covers when a strategy does *not* apply. See `/about`.
