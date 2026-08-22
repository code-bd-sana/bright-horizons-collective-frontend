import Image from 'next/image';

export function ActivityHero() {
  return (
    <div className="w-full">
      <div className="relative h-[220px] w-full overflow-hidden rounded-[16px] bg-[var(--secondary\/200,#d2e3dc)] sm:h-[360px] lg:h-[477px]">
        <Image
          src="/Home/figma-activity-detail-hero.png"
          alt="Animal Yoga Adventure"
          fill
          className="object-cover"
        />

        {/* Badges */}
        <div className="absolute left-4 top-4 flex items-center gap-3">
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
