import React from 'react';

export function ActivityHero() {
  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 w-full">
        <span className="font-['Manrope'] font-normal text-[14px] leading-[22px] text-[#2f7d7e] tracking-[-0.084px]">
          Weekly Plans
        </span>
        <span className="font-['Manrope'] font-normal text-[18px] leading-[27px] text-[#d8ddd9] tracking-[-0.27px]">
          /
        </span>
        <span className="font-['Manrope'] font-normal text-[14px] leading-[22px] text-[#263238] tracking-[-0.084px]">
          Animal Yoga Adventure
        </span>
      </div>

      {/* Hero Image Container */}
      <div className="w-full h-[477px] bg-[var(--secondary\/200,#d2e3dc)] rounded-[16px] overflow-hidden relative">
        <img
          src="http://localhost:3845/assets/bf4fc034894db390a47e176ac36cb4125172b8c8.png"
          alt="Animal Yoga Adventure"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex items-center gap-3">
          <div className="bg-[#e0f0e9] border border-[var(--secondary\/100,#e9f1ee)] rounded-full px-[9px] py-[7px] flex items-center">
            <span className="font-['Nunito'] font-medium text-[12px] leading-[16px] text-[#263238]">
              Easy
            </span>
          </div>
          <div className="bg-white border border-[var(--secondary\/100,#e9f1ee)] rounded-full px-[9px] py-[7px] flex items-center">
            <span className="font-['Nunito'] font-medium text-[12px] leading-[16px] text-[#263238]">
              2–5 yr
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
