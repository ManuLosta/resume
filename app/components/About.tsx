"use client";

import { useLanguage } from "../language-context";

export function About() {
  const { cv, t } = useLanguage();

  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold mb-4 text-zinc-800 uppercase tracking-wider">{t.about}</h2>
      <p className="text-zinc-600 leading-relaxed text-lg">
        {cv.summary}
      </p>
    </section>
  );
}
