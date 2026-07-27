import { notFound } from "next/navigation";
import { getContent, hasLocale, type Locale } from "../lib/locale";
import { HomeSections } from "../components/HomeSections";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const c = getContent(lang);
  return (
    <main>
      <HomeSections c={c} lang={lang as Locale} />
    </main>
  );
}
