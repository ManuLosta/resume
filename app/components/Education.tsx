"use client";

import { useLanguage } from "../language-context";

const months = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  es: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
};

function formatDate(dateStr: string, language: "en" | "es"): string {
  if (dateStr === "present") return language === "es" ? "Present" : "Present";
  const [year, month] = dateStr.split("-");
  return `${months[language][parseInt(month) - 1]} ${year}`;
}

export function Education() {
  const { cv, t, language } = useLanguage();

  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold mb-6 text-[rgb(0,79,144)]">{t.education}</h2>
      <div className="space-y-8">
        {cv.education.map((edu, index) => (
          <div key={index}>
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-medium text-black">{edu.institution}</h3>
              <span className="text-sm text-zinc-500">
                {edu.startDate ? formatDate(edu.startDate, language) : ""} – {formatDate(edu.endDate, language)}
              </span>
            </div>
            <p className="text-zinc-600">
              {edu.area} — {edu.location}
            </p>
            {edu.highlights && edu.highlights.length > 0 && (
              <ul className="mt-2 space-y-1">
                {edu.highlights.map((highlight, i) => (
                  <li key={i} className="text-sm text-zinc-500 flex">
                    <span className="mr-2">•</span>
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
