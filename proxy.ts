import { NextResponse, type NextRequest } from "next/server";
import { LOCALES, DEFAULT_LOCALE } from "./app/lib/locale";

// Kies de locale op basis van de Accept-Language-header, met fallback.
function pickLocale(req: NextRequest): string {
  const header = req.headers.get("accept-language") ?? "";
  const preferred = header
    .split(",")
    .map((p) => p.split(";")[0].trim().slice(0, 2).toLowerCase());
  return preferred.find((p) => (LOCALES as string[]).includes(p)) ?? DEFAULT_LOCALE;
}

// Stuur ongeprefixte paden door naar /{locale}{path}.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return;

  request.nextUrl.pathname = `/${pickLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Sla interne paden, statics en bestanden-met-extensie over.
  matcher: ["/((?!_next|images|favicon.ico|.*\\.).*)"],
};
