import type { MetadataRoute } from "next";
import { getNovedades } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600;

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
  { url: `${SITE_URL}/blog`, changeFrequency: "daily", priority: 0.9 },
  { url: `${SITE_URL}/novena`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_URL}/entronizaciones`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_URL}/testimonios`, changeFrequency: "weekly", priority: 0.8 },
  { url: `${SITE_URL}/misiones`, changeFrequency: "weekly", priority: 0.8 },
  { url: `${SITE_URL}/videos`, changeFrequency: "weekly", priority: 0.8 },
  { url: `${SITE_URL}/instagram`, changeFrequency: "daily", priority: 0.8 },
  { url: `${SITE_URL}/contacto`, changeFrequency: "yearly", priority: 0.6 },
];

function parseLastModified(value: string): Date | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let blogEntries: MetadataRoute.Sitemap = [];

  try {
    const novedades = await getNovedades();
    blogEntries = novedades
      .filter((novedad) => novedad.publicado && novedad.slug)
      .map((novedad) => ({
        url: `${SITE_URL}/blog/${encodeURIComponent(novedad.slug)}`,
        lastModified: parseLastModified(novedad.fecha),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));
  } catch {
    blogEntries = [];
  }

  return [...STATIC_ROUTES, ...blogEntries];
}
