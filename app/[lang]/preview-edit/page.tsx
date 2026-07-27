import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getContent, hasLocale, type Locale } from "../../lib/locale";
import { HomeSections } from "../../components/HomeSections";
import { ExportBar } from "../../components/review/ExportBar";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/preview-edit">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return {
    title: "Bewerkbare preview — Lucas Borghys",
    // Interne reviewtool, nooit indexeren of volgen.
    robots: { index: false, follow: false },
  };
}

/**
 * Bewerkbare preview: exact dezelfde sectiecomponenten als de echte homepage
 * (HomeSections, gedeeld met app/[lang]/page.tsx). De EditModeProvider zelf
 * zit op layout-niveau (EditModeRouteProvider in app/[lang]/layout.tsx) —
 * NIET hier — zodat ook TopChrome en SideRail (die de layout vóór
 * `{children}` rendert) in dezelfde bewerk-context zitten. Taal wisselen
 * gebeurt via dezelfde NL/EN-pil als op de echte site (TopChrome), die
 * gewoon naar `/${lang}/preview-edit` linkt.
 */
export default async function PreviewEditPage({
  params,
}: PageProps<"/[lang]/preview-edit">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const c = getContent(lang);

  return (
    <>
      <main style={{ paddingBottom: 90 }}>
        <HomeSections c={c} lang={lang as Locale} />
      </main>
      <ExportBar locale={lang} />
    </>
  );
}
