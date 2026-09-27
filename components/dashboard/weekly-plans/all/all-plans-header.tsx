import Image from 'next/image';

interface AllPlansHeaderProps {
  weeksCompleted?: number;
  activitiesCompleted?: number;
  avgCompletion?: number;
  streak?: number;
  childName?: string;
}

export function AllPlansHeader({
  weeksCompleted = 0,
  activitiesCompleted = 0,
  avgCompletion = 0,
  streak = 0,
  childName,
}: AllPlansHeaderProps) {
  return (
    <div className="flex w-full flex-col gap-6">
      {/* Title Section */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-['Nunito'] font-medium text-[32px] leading-10 text-[#263238] tracking-[-0.16px]">
            Weekly Plans
          </h1>
          {childName && (
            <span className="inline-flex items-center rounded-full border border-[#d2e3dc] bg-[#e9f1ee] px-3 py-1 font-['Nunito'] text-sm font-semibold text-[#174a4d]">
              {childName}
            </span>
          )}
        </div>
        <p className="font-['Manrope'] font-normal text-[14px] leading-5.5 text-[#7d8488] tracking-[-0.084px]">
          Review completed weeks, track progress over time, and download activity reports
          {childName ? ` for ${childName}` : ''}.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid w-full gap-4 sm:max-lg:grid-cols-2 sm:gap-6 lg:flex lg:gap-6">
        {/* Stat 1 */}
        <div className="bg-[#fafafa] border border-[#e8ebe8] rounded-[16px] p-4 flex flex-col gap-3 h-38.5 justify-center w-full">
          <div className="bg-[#f1f3f3] border border-[#fafafa] rounded-[8px] overflow-hidden w-8 h-8 flex items-center justify-center shrink-0">
            <Image src="/weekly-plans/icon-calendar.svg" alt="Weeks" width={16} height={16} />
          </div>
          <div className="flex flex-col">
            <p className="font-['Nunito'] font-medium text-[24px] leading-8 text-[#272f3a]">
              {weeksCompleted}
            </p>
            <p className="font-['Manrope'] font-medium text-[12px] leading-4.5 text-[#515b60] tracking-[0.48px]">
              Weeks completed
            </p>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-[#fafafa] border border-[#e8ebe8] rounded-[16px] p-4 flex flex-col gap-3 h-38.5 justify-center w-full">
          <div className="bg-[#f1f3f3] border border-[#fafafa] rounded-[8px] overflow-hidden w-8 h-8 flex items-center justify-center shrink-0">
            <Image src="/weekly-plans/icon-check.svg" alt="Activities" width={16} height={16} />
          </div>
          <div className="flex flex-col">
            <p className="font-['Nunito'] font-medium text-[24px] leading-8 text-[#272f3a]">
              {activitiesCompleted}
            </p>
            <p className="font-['Manrope'] font-medium text-[12px] leading-4.5 text-[#515b60] tracking-[0.48px]">
              Activities completed
            </p>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="bg-[#fafafa] border border-[#e8ebe8] rounded-[16px] p-4 flex flex-col gap-3 h-38.5 justify-center w-full">
          <div className="bg-[#f1f3f3] border border-[#fafafa] rounded-[8px] overflow-hidden w-8 h-8 flex items-center justify-center shrink-0">
            <Image src="/weekly-plans/icon-pie.svg" alt="Completion" width={16} height={16} />
          </div>
          <div className="flex flex-col">
            <p className="font-['Nunito'] font-medium text-[24px] leading-8 text-[#272f3a]">
              {avgCompletion}%
            </p>
            <p className="font-['Manrope'] font-medium text-[12px] leading-4.5 text-[#515b60] tracking-[0.48px]">
              Avg. completion
            </p>
          </div>
        </div>

        {/* Stat 4 */}
        <div className="bg-[#fafafa] border border-[#e8ebe8] rounded-[16px] p-4 flex flex-col gap-3 h-38.5 justify-center w-full">
          <div className="bg-[#f1f3f3] border border-[#fafafa] rounded-[8px] overflow-hidden w-8 h-8 flex items-center justify-center shrink-0">
            <Image src="/weekly-plans/icon-fire.svg" alt="Streak" width={16} height={16} />
          </div>
          <div className="flex flex-col">
            <p className="font-['Nunito'] font-medium text-[24px] leading-8 text-[#272f3a]">
              {streak}
            </p>
            <p className="font-['Manrope'] font-medium text-[12px] leading-4.5 text-[#515b60] tracking-[0.48px]">
              Current activity streak
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
