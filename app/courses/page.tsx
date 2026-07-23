import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CourseCardProgress } from "@/components/progress";
import { courses, getCourseLessons, LEVEL_LABEL, totalMinutes } from "@/lib/courses";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Courses — Guided Tracks Through Specialty Tax",
  description:
    "Free, self-paced courses on the R&D tax credit, Section 174/174A, cost segregation, energy incentives, and audit defense — sequenced reading tracks with progress you keep in your browser.",
  alternates: { canonical: "/courses" },
};

export default function CoursesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "The Carryforward Courses",
    itemListElement: courses.map((c, i) => ({
      "@type": "Course",
      position: i + 1,
      name: c.title,
      description: c.dek,
      url: `${SITE_URL}/courses/${c.slug}`,
      provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "online",
        courseWorkload: `PT${totalMinutes(getCourseLessons(c))}M`,
      },
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    })),
  };

  return (
    <>
      <SiteHeader activeNav="courses" />
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="mx-auto max-w-[1120px] px-5 pt-11 sm:px-10">
          <div className="sheet px-7 py-9 sm:px-11 sm:py-10">
            <div className="flex flex-wrap items-end justify-between gap-3 border-b-2 border-ink pb-4">
              <div>
                <p className="kicker mb-1.5 text-[10px] font-medium text-ink-mute">
                  Guided tracks · read in order
                </p>
                <h1 className="font-serif text-4xl font-semibold leading-none sm:text-[42px]">
                  Courses
                </h1>
              </div>
              <span className="kicker text-right font-normal text-[11px] text-ink-mute">
                {courses.length} tracks · free · progress stays in your browser
              </span>
            </div>
            <p className="mt-4 max-w-[62ch] font-serif text-lg italic leading-normal text-ink-soft">
              Every lesson is one of our articles, sequenced so each builds on the last. No
              accounts, no certificates for sale — the point is that you come out understanding
              the provision.
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((c) => {
                const lessons = getCourseLessons(c);
                const ids = lessons.map((l) => `${l.cluster}/${l.slug}`);
                return (
                  <div key={c.slug} className="flex flex-col border border-ink p-5">
                    <p className="kicker text-[10px] text-accent">
                      Course · {lessons.length} lessons · {totalMinutes(lessons)} min ·{" "}
                      {LEVEL_LABEL[c.level]}
                    </p>
                    <h2 className="mt-2 font-serif text-[22px] font-semibold leading-tight">
                      <Link href={`/courses/${c.slug}`} className="hover:text-accent">
                        {c.title}
                      </Link>
                    </h2>
                    <p className="mt-2 flex-1 font-serif text-sm leading-normal text-ink-soft">
                      {c.dek}
                    </p>
                    <div className="mt-4">
                      <CourseCardProgress ids={ids} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
