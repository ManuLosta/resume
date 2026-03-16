"use client";

import { useLanguage } from "../language-context";

export function Skills() {
  const { cv, t } = useLanguage();

  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold mb-6 text-[rgb(0,79,144)]">{t.skills}</h2>
      <div className="space-y-4">
        {cv.skills.map((skill, index) => (
          <div key={index}>
            <h3 className="font-medium text-black mb-2">{skill.name}</h3>
            <div className="flex flex-wrap gap-2">
              {skill.keywords.map((keyword, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-sm bg-zinc-100 text-zinc-700 rounded-full"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
