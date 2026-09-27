'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface PlanCardProps {
  status: 'active' | 'upcoming' | 'completed';
  weekNumber: number;
  title: string;
  dateRange: string;
  progress: number;
  totalDays: number;
  imageSrc: string;
  progressTextOverride?: string;
  completedDays?: boolean[];
  activityLink?: string;
}

const defaultPlanImage = '/weekly-plans/plan-image.png';

export function PlanCard({
  status,
  weekNumber,
  title,
  dateRange,
  progress,
  totalDays,
  imageSrc,
  progressTextOverride,
  completedDays,
  activityLink = '/dashboard/weekly-plans',
}: PlanCardProps) {
  const [imgError, setImgError] = useState(false);
  const showCompletedTag = status === 'completed';

  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const progressText =
    progressTextOverride ||
    `${progress}/${totalDays} days · ${Math.round((progress / totalDays) * 100)}%`;

  const finalImage = imgError || !imageSrc ? defaultPlanImage : imageSrc;

  return (
    <div className="relative flex h-91.75 w-71.5 shrink-0 flex-col overflow-hidden rounded-[16px] border border-(--border\/500,#d8ddd9) bg-white p-px shadow-[0px_1px_5px_0px_rgba(23,74,77,0.05)] max-sm:w-full">
      {/* Image Header */}
      <div className="relative h-33 w-full shrink-0 overflow-hidden bg-[#e9f1ee]">
        <div
          className="absolute left-[79.02px] top-[-44.65px] h-[211.243px] w-[124.396px]"
          style={{
            WebkitMaskImage: "url('/weekly-plans/blob.svg')",
            WebkitMaskSize: '109.992px 107.965px',
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskPosition: '7.488px 55.113px',
            maskImage: "url('/weekly-plans/blob.svg')",
            maskSize: '109.992px 107.965px',
            maskRepeat: 'no-repeat',
            maskPosition: '7.488px 55.113px',
          }}
        >
          <Image
            src={finalImage}
            alt={title}
            fill
            sizes="124.396px"
            className="object-cover"
            onError={() => setImgError(true)}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2.5 px-4 pt-3.5">
        {/* Tags */}
        <div className="flex items-center gap-2">
          <div
            className="rounded-[8px] px-2.5 py-0.75 flex items-center justify-center"
            style={{
              backgroundImage:
                'linear-gradient(160deg, rgb(26, 74, 76) 0%, rgb(47, 125, 126) 100%)',
            }}
          >
            <span className="font-['Nunito'] font-medium text-[12px] leading-4 text-white">
              Week {weekNumber}
            </span>
          </div>
          {showCompletedTag && (
            <div className="bg-[#e0f0e9] rounded-[999px] px-2.5 py-0.75 flex items-center justify-center">
              <span className="font-['Nunito'] font-medium text-[12px] leading-4 text-[#2f7d7e]">
                Completed
              </span>
            </div>
          )}
        </div>

        {/* Title & Date */}
        <div className="flex flex-col">
          <h3 className="font-['Nunito'] font-medium text-[20px] leading-7 text-[#263238] line-clamp-1">
            {title}
          </h3>
          <p className="font-['Manrope'] font-normal text-[12px] leading-4.5 text-[#7d8488]">
            {dateRange}
          </p>
        </div>

        {/* Days Strip */}
        <div className="flex items-start gap-1">
          {days.map((day, idx) => {
            const isDayCompleted = completedDays ? Boolean(completedDays[idx]) : idx < progress;
            return (
              <div key={idx} className="flex flex-col items-center gap-0.75 w-5.5">
                <div
                  className={`w-5.5 h-5.5 rounded-[11px] flex items-center justify-center shrink-0 ${
                    isDayCompleted ? 'bg-[#8fb9a8]' : 'bg-[#d4d6d7]'
                  }`}
                >
                  {isDayCompleted && (
                    <Image src="/weekly-plans/icon-tick.svg" alt="Check" width={11} height={11} />
                  )}
                </div>
                <span className="font-['Manrope'] font-semibold text-[8px] leading-3 text-[#8fb9a8]">
                  {day}
                </span>
              </div>
            );
          })}
        </div>

        {/* Progress Text */}
        <div className="flex items-center gap-1.25">
          <Image src="/weekly-plans/icon-trending-up.svg" alt="Trending" width={11} height={11} />
          <span className="font-['Nunito'] font-medium text-[12px] leading-4.5 text-(--text-primary\/300,#7d8488)">
            {progressText}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-auto flex w-full items-start gap-2 px-4 pb-3.5">
        {status === 'active' && (
          <Link
            href={activityLink}
            className="w-full h-9.5 bg-[#2f7d7e] rounded-[10px] flex items-center justify-center gap-1.5 hover:bg-[#256869] transition-colors"
          >
            <Image src="/weekly-plans/icon-arrow-up-right.svg" alt="Start" width={12} height={12} />
            <span className="font-['Nunito'] font-medium text-[14px] leading-5 text-white">
              Start Activities
            </span>
          </Link>
        )}

        {status === 'completed' && (
          <>
            <Link
              href={activityLink}
              className="flex-1 h-9.5 bg-[#2f7d7e] rounded-[10px] flex items-center justify-center gap-1.5 hover:bg-[#256869] transition-colors"
            >
              <Image
                src="/weekly-plans/icon-arrow-up-right.svg"
                alt="View"
                width={12}
                height={12}
              />
              <span className="font-['Nunito'] font-medium text-[14px] leading-5 text-white">
                View Plan
              </span>
            </Link>
            <button
              type="button"
              className="w-9 h-9 bg-white border border-[#d8ddd9] rounded-[10px] flex items-center justify-center hover:bg-gray-50 transition-colors shrink-0"
              title="Download Plan Report"
            >
              <Image src="/weekly-plans/icon-download.svg" alt="Download" width={14} height={14} />
            </button>
          </>
        )}

        {status === 'upcoming' && (
          <>
            <button
              type="button"
              disabled
              className="flex-1 h-9.5 bg-white border border-[#d8ddd9] rounded-[10px] flex items-center justify-center gap-1.5 opacity-75 cursor-not-allowed"
            >
              <Image src="/weekly-plans/icon-lock.svg" alt="Lock" width={12} height={12} />
              <span className="font-['Nunito'] font-medium text-[14px] leading-5 text-[#515b60]">
                Locked
              </span>
            </button>
            <button
              type="button"
              disabled
              className="w-9 h-9 bg-white border border-[#d8ddd9] rounded-[10px] flex items-center justify-center opacity-40 shrink-0 cursor-not-allowed"
            >
              <Image src="/weekly-plans/icon-download.svg" alt="Download" width={14} height={14} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
