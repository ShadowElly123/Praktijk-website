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
      {/* Gedeelde achtergrond-laag: Verwelkoming, Intermezzo en Werkwijze zijn
          transparant, deze wrapper levert de kleur en de stacking-context. Zo kan
          de intermezzo-spotlight (zIndex -1) ongestoord over de sectiegrenzen
          heen doorlopen in plaats van bij elke sectie te worden afgekapt. */}
      <div style={{ position: "relative", zIndex: 0, background: "var(--bg)" }}>
        <Verwelkoming c={c} />
        <Intermezzo c={c} />
        <Werkwijze c={c} />
      </div>
      <OverMij c={c} />
      <Praktisch c={c} />
      <Contact c={c} />
      <SiteFooter c={c} lang={lang as Locale} />
    </main>
  );
}
