import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Archivo, Spectral, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import { getContent, hasLocale, LOCALES } from "../lib/locale";
import { GrainOverlay } from "../components/chrome/GrainOverlay";
import { SideRail } from "../components/chrome/SideRail";
import { TopChrome } from "../components/chrome/TopChrome";

const sans = Archivo({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const serif = Spectral({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "500"],
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
    metadataBase: new URL("https://lucasborghys-psycholoog.be"),
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
  };
}

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const c = getContent(lang);

  // Gestructureerde data: de persoon + de praktijk als lokale zorgverlener.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Person", "MedicalBusiness"],
    name: c.site.name,
    jobTitle: "Klinisch psycholoog",
    url: `https://lucasborghys-psycholoog.be/${lang}`,
    telephone: "+32493020543",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Sint-Pietersnieuwstraat 97",
      postalCode: "9000",
      addressLocality: "Gent",
      addressCountry: "BE",
    },
    areaServed: { "@type": "City", name: "Gent" },
    availableLanguage: ["nl", "en"],
    knowsLanguage: ["nl", "en"],
  };

  return (
    <html
      lang={lang}
      className={`${sans.variable} ${serif.variable} ${mono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div style={{ position: "relative", background: "var(--bg)" }}>
          <GrainOverlay />
          <SideRail text={c.site.rail} />
          <TopChrome name={c.site.name} region={c.site.region} />
          {children}
        </div>
      </body>
    </html>
  );
}
