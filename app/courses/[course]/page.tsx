import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CourseProgressBox, Syllabus, type LessonMeta } from "@/components/progress";
import { courses, getCourse, getCourseLessons, LEVEL_LABEL, totalMinutes } from "@/lib/courses";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return courses.map((c) => ({ course: c.slug }));
}

export const dynamicParams = false;

type Params = Promise<{ course: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { course } = await params;
  const c = getCourse(course);
  if (!c) return {};
  return {
    title: `${c.title} — Course`,
    description: `${c.dek} A free, self-paced course from ${SITE_NAME}.`,
    alternates: { canonical: `/courses/${c.slug}` },
  };
}

export default async function CoursePage({ params }: { params: Params }) {
  const { course } = await params;
  const c = getCourse(course);
  if (!c) notFound();
  const lessons = getCourseLessons(c);
  const meta: LessonMeta[] = lessons.map((l) => ({
    id: `${l.cluster}/${l.slug}`,
    href: `/${l.cluster}/${l.slug}`,
    title: l.title,
    minutes: l.readingMinutes,
    type: l.type,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: c.title,
    description: c.description,
    url: `${SITE_URL}/courses/${c.slug}`,
    provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    educationalLevel: LEVEL_LABEL[c.level],
    numberOfCredits: 0,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: `PT${totalMinutes(lessons)}M`,
    },
    syllabusSections: lessons.map((l, i) => ({
      "@type": "Syllabus",
      position: i + 1,
      name: l.title,
      url: `${SITE_URL}/${l.cluster}/${l.slug}`,
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
            <Breadcrumbs
              crumbs={[
                { name: "Front Page", href: "/" },
                { name: "Courses", href: "/courses" },
                { name: c.title, href: `/courses/${c.slug}` },
              ]}
            />
            <div className="mt-6 grid gap-10 border-b-2 border-ink pb-7 lg:grid-cols-[1fr_260px] lg:items-end">
              <div>
                <p className="kicker mb-3 text-xs text-accent">
                  Course · {lessons.length} lessons · {totalMinutes(lessons)} min ·{" "}
                  {LEVEL_LABEL[c.level]}
                </p>
                <h1 className="font-serif text-4xl font-semibold leading-[1.0] sm:text-[48px]">
                  {c.title}
                </h1>
                <p className="mt-3.5 max-w-[52ch] font-serif text-lg italic leading-normal text-ink-soft">
                  {c.dek}
                </p>
              </div>
              <div className="hidden border-[1.5px] border-ink p-4 sm:block">
                <CourseProgressBox lessons={meta} />
              </div>
            </div>

            <div className="mt-7 grid gap-10 lg:grid-cols-[1fr_300px]">
              <Syllabus lessons={meta} />
              <aside>
                <div className="border-[1.5px] border-ink p-5">
                  <p className="kicker mb-3 text-[11px] text-ink-mute">
                    What you&rsquo;ll be able to do
                  </p>
                  <ul className="space-y-2.5 font-serif text-[15px] leading-snug">
                    {c.outcomes.map((o) => (
                      <li key={o} className="flex gap-2.5">
                        <span className="text-accent" aria-hidden="true">
                          ↳
                        </span>
                        <span>{o}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-5 border border-line p-5">
                  <p className="kicker mb-2 text-[11px] text-ink-mute">About this course</p>
                  <p className="font-serif text-sm leading-relaxed text-ink-soft">
                    {c.description}
                  </p>
                  <p className="mt-3 font-serif text-sm leading-relaxed text-ink-soft">
                    Progress is stored only in your browser. Lessons are ordinary articles — every
                    one stands alone, and the sequence is the curriculum.
                  </p>
                </div>
                <div className="mt-5">
                  <p className="kicker border-b-2 border-ink pb-1.5 text-[11px]">Other courses</p>
                  <ul className="mt-2 font-serif text-[15px] leading-relaxed">
                    {courses
                      .filter((x) => x.slug !== c.slug)
                      .map((x) => (
                        <li key={x.slug} className="border-b border-line-faint py-2">
                          <Link
                            href={`/courses/${x.slug}`}
                            className="text-ink-soft hover:text-accent"
                          >
                            {x.title}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
