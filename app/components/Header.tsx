"use client";

import { useLanguage } from "../language-context";
import { pdf } from "@react-pdf/renderer";
import { PDFDocument } from "./PDFDocument";
import Link from "next/link";

export function Header() {
  const { language, cv, t } = useLanguage();

  const handleDownload = async () => {
    const blob = await pdf(<PDFDocument cv={cv} language={language} />).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `resume-${language}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const otherLang = language === "en" ? "es" : "en";

  return (
    <div className="flex justify-end items-center gap-4 mb-8">
      <Link
        href={`/${otherLang}`}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-zinc-300 text-zinc-700 rounded-full hover:bg-zinc-100 transition-colors"
      >
        {otherLang === "en" ? "🇺🇸 EN" : "🇪🇸 ES"}
      </Link>
      <button
        onClick={handleDownload}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white text-black rounded-full hover:bg-zinc-200 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" x2="12" y1="15" y2="3" />
        </svg>
        {t.downloadResume}
      </button>
    </div>
  );
}
