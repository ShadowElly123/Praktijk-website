import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Bricolage_Grotesque, Spectral, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import { getContent, hasLocale, LOCALES } from "../lib/locale";
import { safeJsonLd } from "../lib/jsonld";
import { GrainOverlay } from "../components/chrome/GrainOverlay";
import { SideRail } from "../components/chrome/SideRail";
import { TopChrome } from "../components/chrome/TopChrome";
import { Analytics } from "../components/Analytics";
import { EditModeRouteProvider } from "../components/review/EditModeRouteProvider";

/* Elk gewicht hieronder is een apart woff2-bestand dat Next met een
   `<link rel="preload">` op hoge prioriteit opvraagt — dus gelijktijdig met, en
   concurrerend om dezelfde bandbreedte als, de hero-afbeelding die de LCP
   bepaalt. Gemeten stonden er acht van die bestanden (samen ~170 kB) in de
   startrij, en zat de LCP op mobiel op 4,1 s gemiddeld (p75 4,6 s), ruim boven
   de 2,5 s-drempel. Vandaar: enkel gewichten die de site echt gebruikt.

   Nagetrokken vóór het schrappen — sans staat op 500 (koppen, incl. de h1) en
   600 (naam in de topbalk), plus 400 als erfwaarde van `body`; serif staat op
   300 (lopende tekst) en 400 (FAQ-vraag), met italic voor de bijschriften.
   Sans 300 en serif 500 kwamen nergens voor. */
const sans = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600"],
  display: "swap",
});
const serif = Spectral({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400"],
  style: ["normal", "italic"],
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const c = getContent(lang);
  return {
    metadataBase: new URL("https://lucasborghys.be"),
    title: c.meta.title,
    description: c.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { nl: "/nl", en: "/en", "x-default": "/nl" },
    },
    openGraph: {
      title: c.meta.title,
      description: c.meta.description,
      locale: lang === "nl" ? "nl_BE" : "en_GB",
      type: "website",
    },
    robots: { index: true, follow: true },
    // iOS Safari herkent adressen/telefoonnummers in gewone tekst en maakt er
    // gestippelde links van (zichtbaar als puntjes onder bv. de adresregel in
    // Praktisch). Uitschakelen — onze eigen tel:-links zijn expliciete anchors
    // en blijven gewoon werken.
    formatDetection: { telephone: false, address: false, email: false, date: false },
  };
}

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const c = getContent(lang);

  // Gestructureerde data: twee gekoppelde nodes i.p.v. één gemengd type.
  // Person- en MedicalBusiness-properties horen niet op hetzelfde object
  // (jobTitle is een Person-property, address/telephone/areaServed zijn
  // Organization-properties) — dat gaf voorheen een ongeldige mix. `Psychologist`
  // is bovendien een specifiekere, door Google aanbevolen subtype van
  // MedicalBusiness i.p.v. het generieke type.
  //
  // `geo` komt uit de bestaande Google Business Profile-vermelding van de
  // praktijk (exacte pin, niet gegokt/geocodeerd). `openingHours`/`priceRange`
  // blijven bewust weg: de praktijk werkt op afspraak zonder vaste uren of
  // vaste prijs, dat verzinnen zou onjuiste info in de zoekresultaten zetten.
  const baseUrl = `https://lucasborghys.be/${lang}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Psychologist",
        "@id": `${baseUrl}#praktijk`,
        name: c.site.name,
        url: baseUrl,
        image: "https://lucasborghys.be/images/portret-v10.jpg",
        telephone: "+32493020543",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Sint-Pietersnieuwstraat 97",
          postalCode: "9000",
          addressLocality: "Gent",
          addressCountry: "BE",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 51.0446421,
          longitude: 3.7268958,
        },
        areaServed: { "@type": "City", name: "Gent" },
        availableLanguage: ["nl", "en"],
        employee: { "@id": `${baseUrl}#lucas` },
      },
      {
        "@type": "Person",
        "@id": `${baseUrl}#lucas`,
        name: c.site.name,
        jobTitle: "Klinisch psycholoog",
        knowsLanguage: ["nl", "en"],
        worksFor: { "@id": `${baseUrl}#praktijk` },
      },
    ],
  };

  return (
    <html
      lang={lang}
      className={`${sans.variable} ${serif.variable} ${mono.variable}`}
    >
      <body>
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
        />
        <EditModeRouteProvider>
          <div style={{ position: "relative", background: "var(--bg)" }}>
            <GrainOverlay />
            <SideRail text={c.site.rail} />
            <TopChrome name={c.site.name} contactLabel={c.site.contactCta} />
            {children}
          </div>
        </EditModeRouteProvider>
      </body>
    </html>
  );
}
