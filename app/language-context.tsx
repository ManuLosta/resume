"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import cvEn from "./cv-en.json";
import cvEs from "./cv-es.json";

type Language = "en" | "es";

type CVData = typeof cvEn;

interface Translations {
  about: string;
  education: string;
  experience: string;
  skills: string;
  projects: string;
  downloadResume: string;
}

const translations: Record<Language, Translations> = {
  en: {
    about: "About me",
    education: "Education",
    experience: "Experience",
    skills: "Skills",
    projects: "Projects",
    downloadResume: "Download Resume",
  },
  es: {
    about: "Sobre mí",
    education: "Educación",
    experience: "Experiencia",
    skills: "Habilidades",
    projects: "Proyectos",
    downloadResume: "Descargar CV",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  cv: CVData;
  t: Translations;
}

const cvData: Record<Language, CVData> = {
  en: cvEn,
  es: cvEs,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("language") as Language;
      if (savedLang && (savedLang === "en" || savedLang === "es")) {
        return savedLang;
      }
    }
    return "es";
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        cv: cvData[language],
        t: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
