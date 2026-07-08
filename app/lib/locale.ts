import { content } from "./content";

export type Locale = "nl" | "en";
export const LOCALES: Locale[] = ["nl", "en"];
export const DEFAULT_LOCALE: Locale = "nl";
export const hasLocale = (x: string): x is Locale => (LOCALES as string[]).includes(x);

/* ------------------------------------------------------------------
   `DeepWiden` verbreedt de `as const`-literals (bv. de string "Gent")
   naar hun primitieve type (string). Zo is `Content` het STRUCTUUR-model
   (sleutels + types), niet de letterlijke NL-waarden.

   Gevolg (compile-time pariteitsgarantie): omdat `getContent` zowel de
   NL- als EN-tak naar `Content` moet kunnen teruggeven, faalt de build
   (`npm run build` → tsc) zodra NL en EN niet dezelfde structuur/sleutels
   delen. Dit vervangt een aparte test-runner.
------------------------------------------------------------------- */
type DeepWiden<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends readonly (infer U)[]
        ? readonly DeepWiden<U>[]
        : { [K in keyof T]: DeepWiden<T[K]> };

export type Content = DeepWiden<(typeof content)["nl"]>;

export const getContent = (lang: Locale): Content => content[lang];
