"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

/* ------------------------------------------------------------------
   Bewerk-modus voor de bewerkbare preview: dezelfde sectiecomponenten
   als de echte site, met zichtbare tekst rechtstreeks aanklikbaar.

   Belangrijk: de context heeft `enabled: false` als standaardwaarde.
   Op de echte site wordt nooit een Provider gemonteerd, dus elke
   `<Editable>` daar valt terug op die default en rendert gewoon de
   platte tekst — nul verschil met vroeger, nul risico voor bezoekers.

   Meerdere `<Editable>`-instanties met hetzelfde pad (bv. site.name in
   zowel de topbalk als de footer) delen dezelfde waarde: de eerste die
   mount registreert de oorspronkelijke tekst, daarna houdt een sync-
   effect (zie EditMode.tsx `Editable`) alle niet-actieve instanties
   gelijk met wat er getypt wordt in de actieve.
------------------------------------------------------------------- */

type EditModeContextType = {
  enabled: boolean;
  values: Record<string, string>;
  original: Record<string, string>;
  setValue: (path: string, value: string) => void;
  register: (path: string, initial: string) => void;
};

const noop = () => {};

const EditModeContext = createContext<EditModeContextType>({
  enabled: false,
  values: {},
  original: {},
  setValue: noop,
  register: noop,
});

export function useEditMode() {
  return useContext(EditModeContext);
}

export function EditModeProvider({ children }: { children: React.ReactNode }) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [original, setOriginal] = useState<Record<string, string>>({});

  const register = useCallback((path: string, initial: string) => {
    setOriginal((o) => (path in o ? o : { ...o, [path]: initial }));
    setValues((v) => (path in v ? v : { ...v, [path]: initial }));
  }, []);

  const setValue = useCallback((path: string, value: string) => {
    setValues((v) => ({ ...v, [path]: value }));
  }, []);

  const ctx = useMemo<EditModeContextType>(
    () => ({ enabled: true, values, original, setValue, register }),
    [values, original, setValue, register]
  );

  return <EditModeContext.Provider value={ctx}>{children}</EditModeContext.Provider>;
}

export { EditModeContext };
