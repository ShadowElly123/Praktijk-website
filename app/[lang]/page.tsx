import { notFound } from "next/navigation";
import { getContent, hasLocale, type Locale } from "../lib/locale";
import { Hero } from "../components/sections/Hero";
import { Verwelkoming } from "../components/sections/Verwelkoming";
import { Intermezzo } from "../components/sections/Intermezzo";
import { Werkwijze } from "../components/sections/Werkwijze";
import { OverMij } from "../components/sections/OverMij";
import { Praktisch } from "../components/sections/Praktisch";
import { Contact } from "../components/sections/Contact";
import { SiteFooter } from "../components/sections/SiteFooter";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const c = getContent(lang);
  return (
    <main>
      <Hero c={c} />
      <Verwelkoming c={c} />
      <Intermezzo c={c} />
      <Werkwijze c={c} />
      <OverMij c={c} />
      <Praktisch c={c} />
      <Contact c={c} lang={lang as Locale} />
      <SiteFooter c={c} lang={lang as Locale} />
    </main>
  );
}
