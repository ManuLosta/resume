"use client";

import Image from "next/image";
import { useLanguage } from "../language-context";

export function Profile() {
  const { cv } = useLanguage();

  return (
    <div className="flex flex-col items-center text-center mb-8">
      <div className="w-40 h-40 rounded-full overflow-hidden bg-zinc-200 mb-6 ring-4 ring-white shadow-lg">
        <Image
          src="/me.jpg"
          alt={cv.basics.name}
          width={160}
          height={160}
          className="w-full h-full object-cover"
          priority
        />
      </div>
      <h1 className="text-3xl font-bold mb-2 text-white">{cv.basics.name}</h1>
      <p className="text-zinc-300 text-lg mb-4">{cv.basics.label}</p>
      <div className="flex flex-col gap-1 text-sm text-zinc-400">
        <p>{cv.basics.email}</p>
        <p>{cv.basics.phone}</p>
        <p>{cv.basics.location.city}, {cv.basics.location.countryCode}</p>
      </div>
      <div className="mt-4 flex gap-4">
        {cv.basics.profiles.map((profile, index) => (
          <a
            key={index}
            href={profile.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-zinc-300 hover:text-white transition-colors"
          >
            {profile.network}
          </a>
        ))}
      </div>
    </div>
  );
}
