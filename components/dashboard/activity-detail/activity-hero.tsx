'use client';

import { useState } from 'react';
import Image from 'next/image';

const DEFAULT_HERO_IMAGE = '/Home/figma-activity-detail-hero.png';

interface ActivityHeroProps {
  imageSrc?: string | null;
  title: string;
  difficulty?: string | null;
  ageRange?: string | null;
}

export function ActivityHero({
  imageSrc,
  title,
  difficulty = 'Easy',
  ageRange = '2–5 yr',
}: ActivityHeroProps) {
  const [imageError, setImageError] = useState(false);
  const effectiveSrc = imageError || !imageSrc ? DEFAULT_HERO_IMAGE : imageSrc;

  return (
    <div className="w-full">
      <div className="relative h-55 w-full overflow-hidden rounded-2xl bg-(--secondary\/200,#d2e3dc) sm:h-90 2xl:h-119.25">
        <Image
          src={effectiveSrc}
          alt={title}
          fill
          sizes="(min-width: 1600px) 1000px, (min-width: 768px) 75vw, 100vw"
          className="object-cover"
          onError={() => setImageError(true)}
          priority
        />

        {/* Badges */}
        <div className="absolute left-4 top-4 flex items-center gap-3">
          {difficulty && (
            <div className="flex items-center rounded-full border border-(--secondary\/100,#e9f1ee) bg-[#e0f0e9] px-2.25 py-1.75">
              <span className="font-nunito text-xs font-medium leading-4 text-[#263238]">
                {difficulty}
              </span>
            </div>
          )}
          {ageRange && (
            <div className="flex items-center rounded-full border border-(--secondary\/100,#e9f1ee) bg-white px-2.25 py-1.75">
              <span className="font-nunito text-xs font-medium leading-4 text-[#263238]">
                {ageRange}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
