"use client";

import Image from "next/image";
import { useLanguage } from "../language-context";

export function Profile() {
  const { cv } = useLanguage();

  return (
    <div className="text-center sm:text-left mb-12">
      <div className="flex justify-center sm:justify-start mb-6">
        <div className="w-32 h-32 rounded-full overflow-hidden bg-zinc-200">
          <Image
            src="/me.jpg"
            alt={cv.basics.name}
            width={128}
            height={128}
            className="w-full h-full object-cover"
            priority
          />
        </div>
      </div>
      <h1 className="text-3xl font-bold mb-2 text-black">{cv.basics.name}</h1>
      <p className="text-zinc-600">{cv.basics.label}</p>
      <div className="mt-4 flex flex-col gap-1 text-sm text-zinc-600">
        <p>{cv.basics.email}</p>
        <p>{cv.basics.phone}</p>
        <p>{cv.basics.location.city}, {cv.basics.location.countryCode}</p>
      </div>
      <div className="mt-4 flex gap-4 justify-center sm:justify-start">
        {cv.basics.profiles.map((profile, index) => (
          <a
            key={index}
            href={profile.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[rgb(0,79,144)] hover:underline"
          >
            {profile.network}
          </a>
        ))}
      </div>
    </div>
  );
}
