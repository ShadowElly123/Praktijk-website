import { notFound } from "next/navigation";
import { getContent, hasLocale } from "../lib/locale";

// Voorlopige pagina — wordt in Fase 3/4 de volledige sectie-assemblage.
export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const c = getContent(lang);
  return (
    <main style={{ padding: "20vh 8vw", fontFamily: "var(--font-serif)" }}>
      <h1
        style={{
          fontFamily: "var(--font-sans)",
          color: "var(--title)",
          fontSize: "clamp(52px,8vw,116px)",
          lineHeight: 0.98,
          margin: 0,
        }}
      >
        {c.hero.titel}
        <br />
        <span
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontWeight: 300,
            color: "var(--brass)",
          }}
        >
          {c.hero.accent}
        </span>
      </h1>
      <p style={{ color: "var(--muted)", maxWidth: 440, marginTop: 34 }}>{c.hero.sub}</p>
    </main>
  );
}
