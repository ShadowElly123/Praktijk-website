"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { content, type Content, type Lang } from "./content";

type Ctx = {
  lang: Lang;
  t: Content;
  toggle: () => void;
  setLang: (l: Lang) => void;
};

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("nl");

  // Herstel voorkeur uit localStorage / browsertaal (na hydratie, geen SSR-mismatch).
  useEffect(() => {
    const stored = window.localStorage.getItem("lb-lang");
    if (stored === "nl" || stored === "en") {
      setLangState(stored);
      return;
    }
    if (navigator.language?.toLowerCase().startsWith("en")) {
      setLangState("en");
    }
  }, []);

  // Houd <html lang> in sync voor toegankelijkheid / SEO.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    window.localStorage.setItem("lb-lang", l);
  }, []);

  const toggle = useCallback(() => {
    setLangState((prev) => {
      const next = prev === "nl" ? "en" : "nl";
      window.localStorage.setItem("lb-lang", next);
      return next;
    });
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, t: content[lang], toggle, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang(): Ctx {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
