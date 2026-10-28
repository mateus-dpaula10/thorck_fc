import type { MetadataRoute } from "next";
import { elenco, SITE_URL, slugDe } from "@/data/clube";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const agora = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified: agora, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/jogos/`, lastModified: agora, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/elenco/`, lastModified: agora, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/historia/`, lastModified: agora, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE_URL}/contato/`, lastModified: agora, changeFrequency: "yearly", priority: 0.6 },
    ...elenco.map((j) => ({
      url: `${SITE_URL}/elenco/${slugDe(j.nome)}/`,
      lastModified: agora,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
