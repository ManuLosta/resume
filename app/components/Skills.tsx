"use client";

import { useLanguage } from "../language-context";

export function Skills() {
  const { cv, t } = useLanguage();

  const translations = {
    en: {
      languages: "Languages",
    },
    es: {
      languages: "Idiomas",
    },
  };

  const langTranslations = translations[t.language];

  return (
    <>
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-6 text-zinc-800 uppercase tracking-wider">{t.skills}</h2>
        <div className="space-y-6">
          {cv.skills.map((skill, skillIndex) => (
            <div key={skillIndex}>
              <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-3">{skill.name}</h3>
              <div className="flex flex-wrap gap-2">
                {skill.keywords.map((keyword, keywordIndex) => (
                  <span
                    key={`${skillIndex}-${keywordIndex}`}
                    className="px-3 py-1.5 text-sm bg-zinc-100 text-zinc-700 rounded-full font-medium"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-6 text-zinc-800 uppercase tracking-wider">{langTranslations.languages}</h2>
        <div className="flex flex-wrap gap-3">
          {cv.languages.map((lang, index) => (
            <span
              key={index}
              className="px-4 py-2 text-sm bg-zinc-100 text-zinc-700 rounded-full font-medium"
            >
              {lang.language} — {lang.fluency}
            </span>
          ))}
        </div>
      </section>
    </>
  );
}
