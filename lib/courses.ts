import { getArticle, type Article } from "./content";

export type LessonRef = { cluster: string; slug: string };

export type Course = {
  slug: string;
  title: string;
  dek: string;
  level: "intro" | "working" | "pro";
  description: string;
  outcomes: string[];
  lessons: LessonRef[];
};

export const courses: Course[] = [
  {
    slug: "rd-credit-start-to-finish",
    title: "The R&D Credit, Start to Finish",
    dek: "From the four-part test to a filed Form 6765 — one continuous walkthrough of Section 41.",
    level: "intro",
    description:
      "The complete path through the federal research credit: what qualifies, what counts, how the number is computed, the elections that cannot be fixed later, and what survives examination. Built for a first serious encounter with Section 41, useful as a refresher for everyone else.",
    outcomes: [
      "Apply the four-part test at the business-component level",
      "Assemble QREs by category with defensible documentation",
      "Choose between the regular method and the ASC, and make the 280C call",
      "Claim the payroll offset correctly on an original return",
      "Prepare a claim that holds up under exam",
    ],
    lessons: [
      { cluster: "rd-tax-credit", slug: "what-is-the-rd-tax-credit" },
      { cluster: "rd-tax-credit", slug: "four-part-test-explained" },
      { cluster: "rd-tax-credit", slug: "qualified-research-expenses" },
      { cluster: "rd-tax-credit", slug: "how-to-calculate-the-rd-credit" },
      { cluster: "rd-tax-credit", slug: "section-280c-election-math" },
      { cluster: "rd-tax-credit", slug: "payroll-tax-offset-startups" },
      { cluster: "rd-tax-credit", slug: "form-6765-section-g" },
      { cluster: "rd-tax-credit", slug: "rd-credit-audit-defense" },
    ],
  },
  {
    slug: "section-174-research-deduction",
    title: "Section 174, 174A & the Research Deduction",
    dek: "The capitalization era, the return of expensing, and the transition between them.",
    level: "working",
    description:
      "How research costs are deducted — a different question from how they are credited. This track covers the TCJA capitalization years, identifying SRE expenditures, the 2025 restoration of domestic expensing under Section 174A, and the transition mechanics every affected return has to get right.",
    outcomes: [
      "Distinguish SRE expenditures from ordinary Section 162 expenses",
      "Apply Section 174A to post-2024 domestic research, and 15-year treatment to foreign",
      "Choose among amended returns and the one- or two-year catch-up",
      "Execute the accounting-method change correctly",
      "Keep the deduction rules and the credit rules straight",
    ],
    lessons: [
      { cluster: "section-174", slug: "section-174-explained" },
      { cluster: "section-174", slug: "identifying-sre-expenditures" },
      { cluster: "section-174", slug: "section-174a-explained" },
      { cluster: "section-174", slug: "section-174-transition-rules" },
      { cluster: "section-174", slug: "amended-return-vs-catch-up" },
      { cluster: "section-174", slug: "section-481a-and-174" },
      { cluster: "rd-tax-credit", slug: "rd-credit-vs-section-174" },
    ],
  },
  {
    slug: "cost-segregation-first-principles",
    title: "Cost Segregation from First Principles",
    dek: "Depreciation mechanics, the study process, and the honest arithmetic of acceleration.",
    level: "intro",
    description:
      "Cost segregation only makes sense once depreciation itself does. This track builds from MACRS fundamentals to what a study actually is, how bonus depreciation multiplies it, when it isn't worth doing, and what happens at sale — deferral, recapture, and all.",
    outcomes: [
      "Read a MACRS schedule and explain conventions and methods",
      "Evaluate whether a building is a study candidate",
      "Pair a study with 100% bonus depreciation correctly",
      "Use Form 3115 for look-back studies without amending returns",
      "Model recapture before agreeing to sell",
    ],
    lessons: [
      { cluster: "fundamentals", slug: "depreciation-basics" },
      { cluster: "cost-segregation", slug: "what-is-cost-segregation" },
      { cluster: "cost-segregation", slug: "cost-seg-process-start-to-finish" },
      { cluster: "cost-segregation", slug: "asset-classes-recovery-periods" },
      { cluster: "cost-segregation", slug: "cost-segregation-bonus-depreciation" },
      { cluster: "cost-segregation", slug: "look-back-studies-form-3115" },
      { cluster: "cost-segregation", slug: "when-cost-segregation-doesnt-make-sense" },
      { cluster: "cost-segregation", slug: "depreciation-recapture-explained" },
    ],
  },
  {
    slug: "energy-incentives-buildings",
    title: "Energy Incentives for Buildings",
    dek: "Sections 179D and 45L — certification, allocation, and the post-sunset landscape.",
    level: "working",
    description:
      "The energy-efficient commercial buildings deduction and the new energy-efficient home credit, from statutory mechanics to the certification file. Includes the prevailing-wage multipliers, allocation to designers, and what remains claimable after the June 30, 2026 terminations.",
    outcomes: [
      "Tell a deduction from a credit and price each correctly",
      "Walk a 179D claim from modeling to Form 7205",
      "Handle designer allocations from tax-exempt building owners",
      "Screen 45L eligibility by certification path and acquisition date",
      "Assess what is still claimable for projects and years already closed",
    ],
    lessons: [
      { cluster: "fundamentals", slug: "credits-vs-deductions" },
      { cluster: "energy-incentives", slug: "section-179d-explained" },
      { cluster: "energy-incentives", slug: "179d-claim-process" },
      { cluster: "energy-incentives", slug: "section-179d-designer-allocation" },
      { cluster: "energy-incentives", slug: "section-45l-home-credit" },
      { cluster: "energy-incentives", slug: "prevailing-wage-apprenticeship" },
      { cluster: "energy-incentives", slug: "energy-incentives-after-obbba" },
    ],
  },
  {
    slug: "audit-defense-documentation",
    title: "Audit Defense & Documentation",
    dek: "Building claims that survive contact with an examiner.",
    level: "working",
    description:
      "Specialty tax positions are won or lost on the file. This track covers contemporaneous documentation as a discipline, what IRS examiners are instructed to challenge, the exam process itself, Appeals, and the penalty rules that decide how expensive being wrong turns out to be.",
    outcomes: [
      "Build contemporaneous files that map evidence to legal tests",
      "Anticipate the specific challenges examiners raise on specialty claims",
      "Navigate IDRs, 30-day letters, and the exam timeline",
      "Decide when Appeals is the right forum",
      "Assert reasonable-cause and disclosure defenses correctly",
    ],
    lessons: [
      { cluster: "fundamentals", slug: "audit-readiness-documentation" },
      { cluster: "rd-tax-credit", slug: "rd-credit-documentation-playbook" },
      { cluster: "cost-segregation", slug: "cost-segregation-audit-technique-guide" },
      { cluster: "fundamentals", slug: "irs-exam-process-overview" },
      { cluster: "fundamentals", slug: "appeals-process-overview" },
      { cluster: "fundamentals", slug: "accuracy-penalties-6662" },
      { cluster: "fundamentals", slug: "statute-of-limitations-refunds" },
    ],
  },
  {
    slug: "the-incentive-stack",
    title: "The Incentive Stack",
    dek: "Planning across provisions — where the credits, deductions, and limits meet.",
    level: "pro",
    description:
      "Each incentive is simple compared to their interactions. This track works the general business credit machinery, carryforward economics, cross-provision planning through the year, and how the whole stack is scrutinized when the company is sold.",
    outcomes: [
      "Apply the §38(c) limitation and §39 ordering to a credit portfolio",
      "Plan Section 174A elections alongside the research credit",
      "Time cost segregation against income, losses, and exits",
      "Run a specialty-tax planning calendar with hard deadlines",
      "Present incentives defensibly in M&A diligence",
    ],
    lessons: [
      { cluster: "fundamentals", slug: "business-tax-credits-general-limitations" },
      { cluster: "rd-tax-credit", slug: "rd-credit-carryforward-rules" },
      { cluster: "section-174", slug: "software-companies-174-planning" },
      { cluster: "cost-segregation", slug: "cost-seg-timing-when-to-study" },
      { cluster: "energy-incentives", slug: "energy-incentives-after-obbba" },
      { cluster: "fundamentals", slug: "tax-planning-calendar-incentives" },
      { cluster: "fundamentals", slug: "tax-incentive-due-diligence-mna" },
    ],
  },
];

export function getCourse(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

/** Resolve a course's lessons to full articles, dropping (loudly) any missing refs. */
export function getCourseLessons(course: Course): Article[] {
  const out: Article[] = [];
  for (const ref of course.lessons) {
    const a = getArticle(ref.cluster, ref.slug);
    if (a) out.push(a);
    else if (process.env.NODE_ENV !== "production") {
      console.warn(`[courses] missing lesson ${ref.cluster}/${ref.slug} in ${course.slug}`);
    }
  }
  return out;
}

/** Which course (if any) contains this article, with its lesson position. */
export function findLesson(
  cluster: string,
  slug: string
): { course: Course; index: number } | null {
  for (const course of courses) {
    const index = course.lessons.findIndex((l) => l.cluster === cluster && l.slug === slug);
    if (index !== -1) return { course, index };
  }
  return null;
}

export function totalMinutes(lessons: Article[]): number {
  return lessons.reduce((s, a) => s + a.readingMinutes, 0);
}

export const LEVEL_LABEL: Record<Course["level"], string> = {
  intro: "Intro",
  working: "Working",
  pro: "Pro",
};
