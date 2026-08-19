import React from 'react';
import Image from 'next/image';

export function AllPlansHeader() {
  return (
    <div className="flex flex-col gap-[24px] w-full max-w-[1216px]">
      {/* Title Section */}
      <div className="flex flex-col gap-[12px]">
        <h1 className="font-['Nunito'] font-medium text-[32px] leading-[40px] text-[#263238] tracking-[-0.16px]">
          Weekly Plans
        </h1>
        <p className="font-['Manrope'] font-normal text-[14px] leading-[22px] text-[#7d8488] tracking-[-0.084px]">
          Review completed weeks, track progress over time, and download activity reports.
        </p>
      </div>

      {/* Stats Section */}
      <div className="flex flex-col md:flex-row gap-[24px] w-full">
        {/* Stat 1 */}
        <div className="bg-[#fafafa] border border-[#e8ebe8] rounded-[16px] p-[16px] flex flex-col gap-[12px] h-[154px] justify-center w-full">
          <div className="bg-[#f1f3f3] border border-[#fafafa] rounded-[8px] overflow-hidden w-[32px] h-[32px] flex items-center justify-center shrink-0">
            <Image src="/weekly-plans/icon-calendar.svg" alt="Weeks" width={16} height={16} />
          </div>
          <div className="flex flex-col">
            <p className="font-['Nunito'] font-medium text-[24px] leading-[32px] text-[#272f3a]">
              2
            </p>
            <p className="font-['Manrope'] font-medium text-[12px] leading-[18px] text-[#515b60] tracking-[0.48px]">
              Weeks completed
            </p>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-[#fafafa] border border-[#e8ebe8] rounded-[16px] p-[16px] flex flex-col gap-[12px] h-[154px] justify-center w-full">
          <div className="bg-[#f1f3f3] border border-[#fafafa] rounded-[8px] overflow-hidden w-[32px] h-[32px] flex items-center justify-center shrink-0">
            <Image src="/weekly-plans/icon-check.svg" alt="Activities" width={16} height={16} />
          </div>
          <div className="flex flex-col">
            <p className="font-['Nunito'] font-medium text-[24px] leading-[32px] text-[#272f3a]">
              23
            </p>
            <p className="font-['Manrope'] font-medium text-[12px] leading-[18px] text-[#515b60] tracking-[0.48px]">
              Activities completed
            </p>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="bg-[#fafafa] border border-[#e8ebe8] rounded-[16px] p-[16px] flex flex-col gap-[12px] h-[154px] justify-center w-full">
          <div className="bg-[#f1f3f3] border border-[#fafafa] rounded-[8px] overflow-hidden w-[32px] h-[32px] flex items-center justify-center shrink-0">
            <Image src="/weekly-plans/icon-pie.svg" alt="Completion" width={16} height={16} />
          </div>
          <div className="flex flex-col">
            <p className="font-['Nunito'] font-medium text-[24px] leading-[32px] text-[#272f3a]">
              90%
            </p>
            <p className="font-['Manrope'] font-medium text-[12px] leading-[18px] text-[#515b60] tracking-[0.48px]">
              Avg. completion
            </p>
          </div>
        </div>

        {/* Stat 4 */}
        <div className="bg-[#fafafa] border border-[#e8ebe8] rounded-[16px] p-[16px] flex flex-col gap-[12px] h-[154px] justify-center w-full">
          <div className="bg-[#f1f3f3] border border-[#fafafa] rounded-[8px] overflow-hidden w-[32px] h-[32px] flex items-center justify-center shrink-0">
            <Image src="/weekly-plans/icon-fire.svg" alt="Streak" width={16} height={16} />
          </div>
          <div className="flex flex-col">
            <p className="font-['Nunito'] font-medium text-[24px] leading-[32px] text-[#272f3a]">
              8
            </p>
            <p className="font-['Manrope'] font-medium text-[12px] leading-[18px] text-[#515b60] tracking-[0.48px]">
              Current activity streak
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
