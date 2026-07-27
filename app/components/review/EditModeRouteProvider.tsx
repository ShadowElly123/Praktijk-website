"use client";

import { usePathname } from "next/navigation";
import { EditModeProvider } from "./EditMode";

/**
 * Zet de EditModeProvider enkel aan op `/preview-edit`-routes, en dat op
 * layout-niveau — niet in de pagina zelf — zodat ook TopChrome en SideRail
 * (die de layout vóór `{children}` rendert, dus buiten een pagina-eigen
 * Provider) meedelen in dezelfde bewerk-context. Op elke andere route is
 * dit een no-op passthrough: geen Provider gemonteerd, exact als voorheen.
 */
export function EditModeRouteProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const enabled = /\/preview-edit(\/|$)/.test(pathname ?? "");
  if (!enabled) return <>{children}</>;
  return <EditModeProvider>{children}</EditModeProvider>;
}
