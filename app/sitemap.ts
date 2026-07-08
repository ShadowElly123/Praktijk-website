import type { MetadataRoute } from "next";

const BASE = "https://lucasborghys-psycholoog.be";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE}/nl`,
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages: { nl: `${BASE}/nl`, en: `${BASE}/en` } },
    },
    {
      url: `${BASE}/en`,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: { languages: { nl: `${BASE}/nl`, en: `${BASE}/en` } },
    },
    // Privacy staat op noindex (concept); daarom niet in de sitemap.
  ];
}
