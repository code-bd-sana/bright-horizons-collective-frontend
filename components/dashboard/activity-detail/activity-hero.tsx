import Image from 'next/image';

export function ActivityHero() {
  return (
    <div className="w-full">
      <div className="relative h-55 w-full overflow-hidden rounded-2xl bg-(--secondary\/200,#d2e3dc) sm:h-90 2xl:h-119.25">
        <Image
          src="/Home/figma-activity-detail-hero.png"
          alt="Animal Yoga Adventure"
          fill
          sizes="(min-width: 1600px) 1000px, (min-width: 768px) 75vw, 100vw"
          className="object-cover"
        />

        {/* Badges */}
        <div className="absolute left-4 top-4 flex items-center gap-3">
          <div className="flex items-center rounded-full border border-(--secondary\/100,#e9f1ee) bg-[#e0f0e9] px-2.25 py-1.75">
            <span className="font-nunito text-xs font-medium leading-4 text-[#263238]">Easy</span>
          </div>
          <div className="flex items-center rounded-full border border-(--secondary\/100,#e9f1ee) bg-white px-2.25 py-1.75">
            <span className="font-nunito text-xs font-medium leading-4 text-[#263238]">2–5 yr</span>
          </div>
        </div>
      </div>
    </div>
  );
}
