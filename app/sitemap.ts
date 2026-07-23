import type { MetadataRoute } from "next";
import { clusters } from "@/lib/clusters";
import { courses } from "@/lib/courses";
import { getAllArticles } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();
  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/the-index`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/courses`, changeFrequency: "monthly", priority: 0.8 },
    ...courses.map((c) => ({
      url: `${SITE_URL}/courses/${c.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${SITE_URL}/glossary`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/about`, changeFrequency: "yearly", priority: 0.3 },
    ...clusters.map((c) => ({
      url: `${SITE_URL}/${c.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...articles.map((a) => ({
      url: `${SITE_URL}/${a.cluster}/${a.slug}`,
      lastModified: new Date(a.updated ?? a.date),
      changeFrequency: "monthly" as const,
      priority: a.type === "guide" ? 0.8 : 0.7,
    })),
  ];
}
