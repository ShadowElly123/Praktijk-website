import { NextResponse, type NextRequest } from "next/server";
import { LOCALES, DEFAULT_LOCALE } from "./app/lib/locale";

/**
 * Stuur ongeprefixte paden door naar /{DEFAULT_LOCALE}{path}.
 *
 * Bewust GÉÉN taalherkenning meer via de Accept-Language-header. Die stuurde
 * iedereen met een Engelstalige browserinstelling naar /en — en de in-app
 * browsers van Facebook en Instagram melden standaard `en-US`, ook bij
 * Vlaamse gebruikers. Gemeten over de eerste zes weken: 32 bezoekers landden
 * rechtstreeks op /en met 84% bounce (tegenover 10% op /nl), slechts 5 van de
 * 37 scrolden daar voorbij de hero, en maar 7 van de 40 vonden de weg terug
 * naar /nl. Twee derde van dat verkeer viel op de twee lanceerdagen, precies
 * de dagen waarop de enige drie contactaanvragen binnenkwamen.
 *
 * Voor een Gentse praktijk is Nederlands de juiste standaard. /en blijft
 * volwaardig bereikbaar via de NL/EN-schakelaar in de topbalk (sticky, dus
 * altijd in beeld) en via een directe link.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return;

  request.nextUrl.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Sla API-routes, interne paden, statics en bestanden-met-extensie over.
  matcher: ["/((?!api|_next|images|favicon.ico|.*\\.).*)"],
};
