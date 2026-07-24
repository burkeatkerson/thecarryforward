export type Cluster = {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  order: number;
};

export const clusters: Cluster[] = [
  {
    slug: "rd-tax-credit",
    name: "The R&D Tax Credit",
    shortName: "R&D Credit",
    tagline: "Section 41, from four-part test to Form 6765",
    description:
      "The federal research credit under Section 41 — who qualifies, how it is computed, how it is claimed, and how it survives examination. Includes the payroll tax offset for startups and the interaction with Section 280C.",
    order: 1,
  },
  {
    slug: "section-174",
    name: "Section 174 & 174A",
    shortName: "Section 174",
    tagline: "Research expenditures: capitalization, amortization, and the return of expensing",
    description:
      "The treatment of specified research or experimental expenditures — the TCJA's mandatory amortization era, the 2025 restoration of domestic expensing under Section 174A, transition rules, and the accounting-method mechanics that follow.",
    order: 2,
  },
  {
    slug: "cost-segregation",
    name: "Cost Segregation",
    shortName: "Cost Seg",
    tagline: "Accelerated depreciation for real property, done defensibly",
    description:
      "Reclassifying building components into shorter recovery periods — engineering-based studies, bonus depreciation interactions, partial dispositions, recapture, and when a study does or does not make sense.",
    order: 3,
  },
  {
    slug: "energy-incentives",
    name: "Energy Incentives",
    shortName: "Energy",
    tagline: "Sections 179D and 45L for the built environment",
    description:
      "The energy-efficient commercial buildings deduction and the new energy-efficient home credit — certification requirements, prevailing-wage multipliers, allocation to designers, and post-2025 phase-outs.",
    order: 4,
  },
  {
    slug: "state-rd-credits",
    name: "State R&D Credits",
    shortName: "State Credits",
    tagline: "The federal credit's fifty siblings, state by state",
    description:
      "State research credits look like the federal credit and behave nothing like it — different rates, bases, refundability, apportionment, and paperwork in every state. Individual state guides, multistate strategy, and the honest rankings.",
    order: 6,
  },
  {
    slug: "case-law",
    name: "The Docket",
    shortName: "The Docket",
    tagline: "The cases that shaped specialty tax",
    description:
      "The research credit and cost segregation rest on decades of litigation. Case briefs of the decisions practitioners actually cite — what was argued, what the court held, and what it means for claims today.",
    order: 7,
  },
  {
    slug: "fundamentals",
    name: "Fundamentals",
    shortName: "Fundamentals",
    tagline: "The concepts every incentive conversation depends on",
    description:
      "Credits versus deductions, depreciation and basis, accounting-method changes, amended returns and statutes of limitations, audit readiness, and how to evaluate the advisors who sell specialty tax work.",
    order: 5,
  },
  {
    slug: "real-estate-tax",
    name: "Real Estate Tax",
    shortName: "Real Estate",
    tagline: "The rules around the building, beyond depreciation",
    description:
      "Cost segregation is one chapter of real estate taxation. The rest — like-kind exchanges, passive activity rules, dealer versus investor status, QBI for rentals, opportunity zones, and partnership structures — decides whether the depreciation ever matters.",
    order: 8,
  },
  {
    slug: "entity-tax",
    name: "Entity Tax",
    shortName: "Entity Tax",
    tagline: "S corps, partnerships, and C corps — where credits live or die",
    description:
      "Every incentive flows through an entity, and the entity's own rules — S elections, basis, reasonable compensation, partnership allocations, QSBS, state PTETs — determine what a credit or deduction is actually worth to its owners.",
    order: 9,
  },
  {
    slug: "exits-ma",
    name: "Exits & M&A",
    shortName: "Exits & M&A",
    tagline: "What happens to the tax attributes when the business sells",
    description:
      "Deal structure decides tax outcomes: asset versus stock, 338(h)(10) and F-reorganizations, earnouts and installment sales, purchase price allocations — and what becomes of credit carryforwards, 174 balances, and depreciation history at closing.",
    order: 10,
  },
  {
    slug: "irs-controversy",
    name: "IRS Controversy",
    shortName: "Controversy",
    tagline: "When the government disagrees — procedure, leverage, and defense",
    description:
      "Past the exam basics: information document requests and summonses, collection due process, liens and levies, offers in compromise, trust fund penalties, privilege, and the Taxpayer Advocate — the procedural terrain where specialty claims are defended.",
    order: 11,
  },
  {
    slug: "tax-research",
    name: "Tax Research",
    shortName: "Research",
    tagline: "How to find the answer yourself — and know when you have it",
    description:
      "The method behind every article on this site: reading statutes and regulations, weighing rulings and cases, tracing legislative history, using citators, and building a research file that supports a position under Circular 230 standards.",
    order: 12,
  },
  {
    slug: "practice-management",
    name: "Practice Management",
    shortName: "Practice",
    tagline: "Running specialty tax work inside a CPA practice",
    description:
      "For the practitioners who sign the returns: engagement letters and fee structures, preparer penalty exposure, workpaper standards, vetting and pricing specialty providers, quality control for credit claims, and professional liability.",
    order: 13,
  },
].sort((a, b) => a.order - b.order);

export function getCluster(slug: string): Cluster | undefined {
  return clusters.find((c) => c.slug === slug);
}
