import type { MetadataRoute } from "next";

const BASE = "https://lucasborghys-psycholoog.be";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/nl/review", "/en/review"] },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
