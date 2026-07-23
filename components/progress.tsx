"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const KEY = "cf-read";

function readSet(): Set<string> {
  try {
    const raw = localStorage.getItem(KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

/** Invisible: marks an article as read for course progress. */
export function MarkRead({ id }: { id: string }) {
  useEffect(() => {
    try {
      const s = readSet();
      if (!s.has(id)) {
        s.add(id);
        localStorage.setItem(KEY, JSON.stringify([...s]));
      }
    } catch {
      /* private mode etc. — progress is a nicety */
    }
  }, [id]);
  return null;
}

export type LessonMeta = {
  id: string; // cluster/slug
  href: string;
  title: string;
  minutes: number;
  type: "guide" | "brief";
};

/** Segmented progress bar (prototype style). */
function Segments({ done, total, ids }: { done: Set<string>; total: number; ids: string[] }) {
  return (
    <div className="flex gap-1" aria-hidden="true">
      {ids.map((id) => (
        <div
          key={id}
          className={`h-1.5 flex-1 ${done.has(id) ? "bg-ink" : "bg-line"}`}
        />
      ))}
    </div>
  );
}

/** Course card progress (course hub). */
export function CourseCardProgress({ ids }: { ids: string[] }) {
  const [done, setDone] = useState<Set<string>>(new Set());
  useEffect(() => setDone(readSet()), []);
  const n = ids.filter((i) => done.has(i)).length;
  return (
    <div>
      <Segments done={done} total={ids.length} ids={ids} />
      <p className="mt-1.5 font-mono text-[10px] text-ink-mute">
        {n === 0 ? "Not started" : `${n} of ${ids.length} complete`}
      </p>
    </div>
  );
}

/** Full syllabus with read-state, for the course page. */
export function Syllabus({ lessons }: { lessons: LessonMeta[] }) {
  const [done, setDone] = useState<Set<string>>(new Set());
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setDone(readSet());
    setLoaded(true);
  }, []);
  const n = lessons.filter((l) => done.has(l.id)).length;
  const resume = lessons.find((l) => !done.has(l.id)) ?? lessons[0];

  return (
    <div>
      <div className="border-[1.5px] border-ink p-4 sm:hidden">
        <ProgressBox n={n} total={lessons.length} resume={resume} lessons={lessons} />
      </div>
      <div className="mt-6 sm:mt-0">
        <p className="kicker mb-4 text-[11px] text-ink-mute">Syllabus</p>
        {lessons.map((l, i) => {
          const isDone = loaded && done.has(l.id);
          const isNext = loaded && resume?.id === l.id && n > 0;
          return (
            <Link
              key={l.id}
              href={l.href}
              className={`group flex gap-4 border-t py-4 ${
                i === 0 ? "border-ink" : "border-line"
              } ${isNext ? "-mx-3 bg-paper-shade px-3" : ""} ${
                i === lessons.length - 1 ? "border-b border-b-ink" : ""
              }`}
            >
              <span
                className={`w-8 flex-none font-serif text-[22px] leading-none ${
                  isDone ? "text-ink-faint" : isNext ? "text-accent" : "text-line"
                }`}
                aria-hidden="true"
              >
                {isDone ? "✓" : isNext ? "▸" : i + 1}
              </span>
              <span className="flex-1">
                <span
                  className={`block font-serif text-[21px] font-semibold leading-tight group-hover:text-accent ${
                    isDone ? "text-ink-mute" : ""
                  }`}
                >
                  {l.title}
                </span>
                <span className="kicker mt-1 block font-normal text-[9px] text-ink-faint">
                  {isDone ? "Complete · " : isNext ? "Up next · " : ""}
                  {l.type === "guide" ? "Guide" : "Brief"} · {l.minutes} min
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

/** Progress box for the course header rail. */
export function CourseProgressBox({ lessons }: { lessons: LessonMeta[] }) {
  const [done, setDone] = useState<Set<string>>(new Set());
  useEffect(() => setDone(readSet()), []);
  const n = lessons.filter((l) => done.has(l.id)).length;
  const resume = lessons.find((l) => !done.has(l.id)) ?? lessons[0];
  return <ProgressBox n={n} total={lessons.length} resume={resume} lessons={lessons} />;
}

function ProgressBox({
  n,
  total,
  resume,
  lessons,
}: {
  n: number;
  total: number;
  resume: LessonMeta;
  lessons: LessonMeta[];
}) {
  return (
    <div>
      <div className="flex justify-between font-mono text-[10px] uppercase tracking-[0.1em] text-ink-mute">
        <span>Progress</span>
        <span>
          {n} / {total}
        </span>
      </div>
      <div className="mt-2 flex gap-1" aria-hidden="true">
        {lessons.map((l, i) => (
          <div key={l.id} className={`h-1.5 flex-1 ${i < n ? "bg-ink" : "bg-line"}`} />
        ))}
      </div>
      {resume ? (
        <Link
          href={resume.href}
          className="kicker mt-3.5 block bg-accent px-3 py-2.5 text-center text-[11px] text-paper hover:bg-accent-deep"
        >
          {n === 0 ? "Start the course" : n >= total ? "Revisit lesson 1" : "Resume next lesson"}
        </Link>
      ) : null}
    </div>
  );
}
