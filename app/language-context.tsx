"use client";

import { createContext, useContext, ReactNode } from "react";
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
  language: Language;
}

const translations: Record<Language, Translations> = {
  en: {
    about: "About me",
    education: "Education",
    experience: "Experience",
    skills: "Skills",
    projects: "Projects",
    downloadResume: "Download Resume",
    language: "en",
  },
  es: {
    about: "Sobre mí",
    education: "Educación",
    experience: "Experiencia",
    skills: "Habilidades",
    projects: "Proyectos",
    downloadResume: "Descargar CV",
    language: "es",
  },
};

interface LanguageContextType {
  language: Language;
  cv: CVData;
  t: Translations;
}

const cvData: Record<Language, CVData> = {
  en: cvEn,
  es: cvEs,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ 
  children, 
  lang 
}: { 
  children: ReactNode; 
  lang: string;
}) {
  const language: Language = lang === "en" || lang === "es" ? lang : "es";

  return (
    <LanguageContext.Provider
      value={{
        language,
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

export function getLangFromParams(lang: string | undefined): Language {
  if (lang === "en" || lang === "es") {
    return lang;
  }
  return "es";
}
