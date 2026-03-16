"use client";

import { useLanguage } from "../language-context";

const months = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  es: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
};

function formatDate(dateStr: string, language: "en" | "es"): string {
  if (dateStr === "present") return language === "es" ? "Presente" : "Present";
  const [year, month] = dateStr.split("-");
  return `${months[language][parseInt(month) - 1]} ${year}`;
}

export function Education() {
  const { cv, t, language } = useLanguage();

  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold mb-6 text-zinc-800 uppercase tracking-wider">{t.education}</h2>
      <div className="space-y-8">
        {cv.education.map((edu, index) => (
          <div key={index} className="relative pl-8 border-l-2 border-zinc-200">
            <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-zinc-800"></div>
            <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
              <h3 className="font-bold text-lg text-zinc-800">{edu.institution}</h3>
              <span className="text-sm text-zinc-500 font-medium">
                {edu.startDate ? formatDate(edu.startDate, language) + " — " : ""}{formatDate(edu.endDate, language)}
              </span>
            </div>
            <p className="text-zinc-600 font-medium mb-1">{edu.area}</p>
            <p className="text-sm text-zinc-500 mb-3">{edu.location}</p>
            {edu.highlights && edu.highlights.length > 0 && (
              <ul className="space-y-1">
                {edu.highlights.map((highlight, i) => (
                  <li key={i} className="text-sm text-zinc-600 flex items-start">
                    <span className="mr-2 text-zinc-400">•</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
