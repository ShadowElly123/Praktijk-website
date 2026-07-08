import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getContent, hasLocale } from "../../lib/locale";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/privacy">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const c = getContent(lang);
  return {
    title: `${c.privacy.title} · ${c.site.name}`,
    // Concept: nog niet indexeren tot juridisch nagekeken.
    robots: { index: false, follow: true },
    alternates: { canonical: `/${lang}/privacy` },
  };
}

export default async function PrivacyPage({ params }: PageProps<"/[lang]/privacy">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const c = getContent(lang);
  const p = c.privacy;

  return (
    <main
      className="sec-x"
      style={{
        minHeight: "100vh",
        boxSizing: "border-box",
        paddingTop: "20vh",
        paddingBottom: "12vh",
        background: "var(--bg)",
      }}
    >
      <div style={{ maxWidth: 720 }}>
        <div
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 12,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--brass)",
            marginBottom: 20,
          }}
        >
          {p.draftNote}
        </div>

        <h1
          style={{
            margin: "0 0 28px",
            fontFamily: "var(--font-sans), sans-serif",
            fontWeight: 600,
            fontSize: "clamp(34px,5vw,64px)",
            lineHeight: 1.02,
            letterSpacing: "-0.02em",
            color: "var(--title)",
          }}
        >
          {p.title}
        </h1>

        <p
          style={{
            margin: "0 0 48px",
            fontFamily: "var(--font-serif), serif",
            fontWeight: 300,
            fontSize: 20,
            lineHeight: 1.7,
            color: "var(--text)",
          }}
        >
          {p.intro}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {p.sections.map((s) => (
            <section key={s.h}>
              <h2
                style={{
                  margin: "0 0 10px",
                  fontFamily: "var(--font-sans), sans-serif",
                  fontWeight: 500,
                  fontSize: 18,
                  color: "var(--brass)",
                }}
              >
                {s.h}
              </h2>
              <p
                style={{
                  margin: 0,
                  maxWidth: 640,
                  fontFamily: "var(--font-serif), serif",
                  fontWeight: 300,
                  fontSize: 17,
                  lineHeight: 1.8,
                  color: "var(--muted)",
                }}
              >
                {s.p}
              </p>
            </section>
          ))}
        </div>

        <Link
          href={`/${lang}`}
          style={{
            display: "inline-block",
            marginTop: 56,
            fontFamily: "var(--font-mono), monospace",
            fontSize: 13,
            letterSpacing: "0.1em",
            color: "var(--brass)",
            textDecoration: "none",
          }}
        >
          ← {p.back}
        </Link>
      </div>
    </main>
  );
}
