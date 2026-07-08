import type { Metadata } from "next";
import { Bricolage_Grotesque, Newsreader } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./lib/LanguageProvider";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const serif = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lucasborghys-psycholoog.be"),
  title: "Lucas Borghys · Klinisch psycholoog, Gent",
  description:
    "Gesprekstherapie in Gent. Wees welkom, en vertel. Een ontvangstruimte voor elk verhaal, elke moeilijkheid.",
  openGraph: {
    title: "Lucas Borghys · Klinisch psycholoog, Gent",
    description: "Gesprekstherapie in Gent. Wees welkom, en vertel.",
    locale: "nl_BE",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${display.variable} ${serif.variable} h-full antialiased`}>
      <body className="min-h-full">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
