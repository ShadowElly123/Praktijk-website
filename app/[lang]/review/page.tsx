import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { hasLocale } from "../../lib/locale";
import { ReviewClient } from "../../components/review/ReviewClient";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/review">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return {
    title: "Tekst nakijken — Lucas Borghys",
    // Interne reviewtool, nooit indexeren of volgen.
    robots: { index: false, follow: false },
  };
}

export default async function ReviewPage({ params }: PageProps<"/[lang]/review">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <ReviewClient />;
}
