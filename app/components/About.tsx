"use client";

import { useLanguage } from "../language-context";

export function About() {
  const { cv, t } = useLanguage();

  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold mb-4 text-[rgb(0,79,144)]">{t.about}</h2>
      <p className="text-zinc-600 leading-relaxed">
        {cv.summary}
      </p>
    </section>
  );
}
