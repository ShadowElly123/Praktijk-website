import { ImageResponse } from "next/og";
import { getContent, hasLocale, LOCALES } from "../lib/locale";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
// Taalneutraal (eigennaam + stad) zodat de alt in beide talen klopt; de
// tekst ín het beeld wordt wél per taal gezet via c.site.role hieronder.
export const alt = "Lucas Borghys · Gent";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

// Donker, cinematisch OG-beeld: naam + rol in de clair-obscur-taal.
// Satori ondersteunt geen CSS-grid; alles via flexbox.
export default async function OgImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const c = getContent(hasLocale(lang) ? lang : "nl");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background:
            "radial-gradient(120% 90% at 80% 15%, #24201a 0%, #0E0D0C 55%)",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#C2A683",
            marginBottom: 24,
          }}
        >
          {c.site.region}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 700,
            color: "#F1EDE5",
            lineHeight: 1,
          }}
        >
          {c.site.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 34,
            color: "#cdc7bc",
            marginTop: 20,
          }}
        >
          {c.site.role}
        </div>
      </div>
    ),
    { ...size },
  );
}
