"use client";

import { useLanguage } from "../language-context";

function formatDate(dateStr: string): string {
  if (dateStr === "present") return "Presente";
  const [year, month] = dateStr.split("-");
  const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  return `${months[parseInt(month) - 1]} ${year}`;
}

export function Experience() {
  const { cv, t } = useLanguage();

  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold mb-6 text-[rgb(0,79,144)]">{t.experience}</h2>
      <div className="space-y-8">
        {cv.work.map((exp, index) => (
          <div key={index}>
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-medium text-black">{exp.company}</h3>
              <span className="text-sm text-zinc-500">
                {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
              </span>
            </div>
            <p className="text-zinc-600 mb-2">
              {exp.position} — {exp.location}
            </p>
            {exp.highlights && exp.highlights.length > 0 && (
              <ul className="space-y-1">
                {exp.highlights.map((highlight, i) => (
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
