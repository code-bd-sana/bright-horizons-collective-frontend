import Image from 'next/image';

import { ActivityArtwork } from './activity-artwork';

export function ActivityPanel() {
  return (
    <section className="flex flex-col gap-6 rounded-2xl border border-[#e8ebe8] bg-[#fffdf8] p-4 sm:p-8 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="flex flex-col gap-1">
            <p className="font-nunito text-xs font-medium leading-4 text-[#2f7d7e]">
              Today&apos;s Activity · Mon, Jul 20
            </p>
            <h2 className="font-nunito text-2xl font-medium leading-8 text-[#263238]">
              Animal Yoga Adventure
            </h2>
          </div>
          <button
            type="button"
            className="relative flex h-10 w-full shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-[#d8ddd9] bg-[#2f7d7e] px-3 py-2 font-nunito text-sm font-medium leading-6 tracking-[-0.176px] text-white sm:w-auto"
          >
            <span className="relative">Start Activity</span>
            <Image
              className="relative"
              src="/Home/figma-child-yoga-arrow.svg"
              alt=""
              width={16}
              height={16}
            />
            <span className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_-6px_2px_rgba(255,255,255,0.07)]" />
          </button>
        </div>
        <p className="max-w-101 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#515b60]">
          Move through fun animal poses to build balance and whole-body motor planning. Perfect for
          an energetic start to the week.
        </p>
        <ActivityArtwork
          src="/Home/figma-child-yoga-panda.png"
          alt="Panda in an animal yoga pose"
          focalPoint="50% 58%"
        />
      </div>
      <div className="flex h-17 flex-col gap-2">
        <div className="flex items-center gap-1.25">
          <span className="rounded-full border border-[#dceeee] bg-[#e0f0e9] px-2.25 py-1.75 font-nunito text-xs font-medium leading-4 text-[#263238]">
            Easy
          </span>
          <span className="flex items-center gap-1 px-2 py-1.5">
            <Image src="/Home/figma-child-yoga-clock.svg" alt="" width={12} height={12} />
            <span className="font-manrope text-xs leading-4.5 text-[#607077]">20 min</span>
          </span>
        </div>
        <div className="flex flex-wrap gap-1.25">
          <span className="rounded-full border border-[#accbcb] bg-white px-2.25 py-1.75 font-nunito text-xs font-medium leading-4 text-[#2f7d7e]">
            Yoga cards &amp; open space
          </span>
          <span className="rounded-full border border-[#accbcb] bg-white px-2.25 py-1.75 font-nunito text-xs font-medium leading-4 text-[#2f7d7e]">
            Motor planning &amp; balance
          </span>
        </div>
      </div>
    </section>
  );
}
