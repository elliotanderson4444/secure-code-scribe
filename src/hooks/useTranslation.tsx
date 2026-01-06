import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Language, translations, getDirection } from "@/lib/translations";

type TranslationContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
  dir: "ltr" | "rtl";
  isRTL: boolean;
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("safeguard-lang");
    return (saved as Language) || "en";
  });

  useEffect(() => {
    localStorage.setItem("safeguard-lang", language);
    document.documentElement.dir = getDirection(language);
    document.documentElement.lang = language;
  }, [language]);

  const dir = getDirection(language);
  
  const value: TranslationContextType = {
    language,
    setLanguage,
    t: translations[language],
    dir,
    isRTL: language === "ar",
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
}
