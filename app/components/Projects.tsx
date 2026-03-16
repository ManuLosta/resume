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

export function Projects() {
  const { cv, t, language } = useLanguage();

  if (!cv.projects || cv.projects.length === 0) {
    return null;
  }

  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold mb-6 text-zinc-800 uppercase tracking-wider">{t.projects}</h2>
      <div className="space-y-6">
        {cv.projects.map((project, index) => (
          <div key={index} className="bg-zinc-50 rounded-lg p-5 border border-zinc-100">
            <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
              <h3 className="font-bold text-lg text-zinc-800">{project.name}</h3>
              <span className="text-sm text-zinc-500 font-medium">{formatDate(project.startDate, language)}</span>
            </div>
            <p className="text-zinc-600 mb-3">{project.description}</p>
            {project.highlights && project.highlights.length > 0 && (
              <ul className="space-y-1">
                {project.highlights.map((highlight, i) => (
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
