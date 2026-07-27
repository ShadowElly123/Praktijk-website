import type { MetadataRoute } from "next";

const BASE = "https://lucasborghys.be";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/nl/preview-edit", "/en/preview-edit"] },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
