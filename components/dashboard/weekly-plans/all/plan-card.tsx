import React from 'react';
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
}

export function PlanCard({
  status,
  weekNumber,
  title,
  dateRange,
  progress,
  totalDays,
  imageSrc,
  progressTextOverride,
}: PlanCardProps) {
  const showCompletedTag = status === 'completed';

  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const progressText =
    progressTextOverride ||
    `${progress}/${totalDays} days · ${Math.round((progress / totalDays) * 100)}%`;

  return (
    <div className="bg-white border border-[var(--border\/500,#d8ddd9)] shadow-[0px_1px_5px_0px_rgba(23,74,77,0.05)] rounded-[16px] flex flex-col w-[286px] h-[367px] relative overflow-hidden shrink-0">
      {/* Image Header */}
      <div className="relative w-full h-[132px] bg-[#e9f1ee] shrink-0 overflow-hidden flex items-center justify-center">
        {/* Exact size from Figma's Group 8, masked with the blob SVG */}
        <div
          className="relative shrink-0 w-[121px] h-[121px]"
          style={{
            WebkitMaskImage: "url('/weekly-plans/blob.svg')",
            WebkitMaskSize: 'contain',
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            maskImage: "url('/weekly-plans/blob.svg')",
            maskSize: 'contain',
            maskRepeat: 'no-repeat',
            maskPosition: 'center',
          }}
        >
          {/* Panda image positioned to fill the masked container */}
          <div className="absolute inset-0">
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover"
              style={{ objectPosition: 'center 30%' }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-[16px] flex flex-col h-[235px] justify-between">
        <div className="flex flex-col gap-[10px]">
          {/* Tags */}
          <div className="flex items-center gap-[8px]">
            <div
              className="rounded-[8px] px-[10px] py-[3px] flex items-center justify-center"
              style={{
                backgroundImage:
                  'linear-gradient(160deg, rgb(26, 74, 76) 0%, rgb(47, 125, 126) 100%)',
              }}
            >
              <span className="font-['Nunito'] font-medium text-[12px] leading-[16px] text-white">
                Week {weekNumber}
              </span>
            </div>
            {showCompletedTag && (
              <div className="bg-[#e0f0e9] rounded-[999px] px-[10px] py-[3px] flex items-center justify-center">
                <span className="font-['Nunito'] font-medium text-[12px] leading-[16px] text-[#8fb9a8]">
                  Completed
                </span>
              </div>
            )}
          </div>

          {/* Title & Date */}
          <div className="flex flex-col">
            <h3 className="font-['Nunito'] font-medium text-[20px] leading-[28px] text-[#263238] line-clamp-1">
              {title}
            </h3>
            <p className="font-['Manrope'] font-normal text-[12px] leading-[18px] text-[#7d8488]">
              {dateRange}
            </p>
          </div>

          {/* Days Strip */}
          <div className="flex items-start gap-[4px] mt-[10px]">
            {days.map((day, idx) => {
              const isDayCompleted = idx < progress;
              return (
                <div key={idx} className="flex flex-col items-center gap-[3px] w-[22px]">
                  <div
                    className={`w-[22px] h-[22px] rounded-[11px] flex items-center justify-center shrink-0 ${
                      isDayCompleted ? 'bg-[#8fb9a8]' : 'bg-[#d4d6d7]'
                    }`}
                  >
                    {isDayCompleted && (
                      <Image src="/weekly-plans/icon-tick.svg" alt="Check" width={11} height={11} />
                    )}
                  </div>
                  <span className="font-['Manrope'] font-semibold text-[8px] leading-[12px] text-[#8fb9a8]">
                    {day}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Progress Text */}
          <div className="flex items-center gap-[6px] mt-[6px]">
            <Image src="/weekly-plans/icon-trending-up.svg" alt="Trending" width={11} height={11} />
            <span className="font-['Nunito'] font-medium text-[12px] leading-[18px] text-[color:var(--text-primary\/300,#7d8488)]">
              {progressText}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-[8px] w-full mt-auto">
          {status === 'active' && (
            <Link
              href="/dashboard/weekly-plans/activity-detail"
              className="w-full h-[38px] bg-[#2f7d7e] rounded-[10px] flex items-center justify-center gap-[6px] hover:bg-[#256869] transition-colors"
            >
              <Image
                src="/weekly-plans/icon-arrow-up-right.svg"
                alt="Start"
                width={12}
                height={12}
              />
              <span className="font-['Nunito'] font-medium text-[14px] leading-[20px] text-white">
                Start Activities
              </span>
            </Link>
          )}

          {status === 'completed' && (
            <>
              <Link
                href="/dashboard/weekly-plans/activity-detail"
                className="flex-1 h-[38px] bg-[#2f7d7e] rounded-[10px] flex items-center justify-center gap-[6px] hover:bg-[#256869] transition-colors"
              >
                <Image
                  src="/weekly-plans/icon-arrow-up-right.svg"
                  alt="View"
                  width={12}
                  height={12}
                />
                <span className="font-['Nunito'] font-medium text-[14px] leading-[20px] text-white">
                  View Plan
                </span>
              </Link>
              <button className="w-[36px] h-[36px] bg-white border border-[#d8ddd9] rounded-[10px] flex items-center justify-center hover:bg-gray-50 transition-colors shrink-0">
                <Image
                  src="/weekly-plans/icon-download.svg"
                  alt="Download"
                  width={14}
                  height={14}
                />
              </button>
            </>
          )}

          {status === 'upcoming' && (
            <>
              <button
                disabled
                className="flex-1 h-[38px] bg-white border border-[#d8ddd9] rounded-[10px] flex items-center justify-center gap-[6px]"
              >
                <Image src="/weekly-plans/icon-lock.svg" alt="Lock" width={12} height={12} />
                <span className="font-['Nunito'] font-medium text-[14px] leading-[20px] text-[#515b60]">
                  Locked
                </span>
              </button>
              <button
                disabled
                className="w-[36px] h-[36px] bg-white border border-[#d8ddd9] rounded-[10px] flex items-center justify-center opacity-50 shrink-0"
              >
                <Image
                  src="/weekly-plans/icon-download.svg"
                  alt="Download"
                  width={14}
                  height={14}
                />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
