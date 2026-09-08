import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock3 } from 'lucide-react';

const yogaMask = '/Home/figma-parent-dashboard-star-mask.svg';

export function TodayActivityCard() {
  return (
    <section className="flex min-h-0 min-w-0 flex-col rounded-2xl border border-[#e8ebe8] bg-[#fffdf8] p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)] sm:p-6 min-[1800px]:min-h-174.75 min-[1800px]:p-8">
      <div className="flex flex-col gap-5 sm:gap-6">
        <h2 className="font-nunito text-xl font-medium leading-7 text-[#263238] sm:text-2xl sm:leading-8">
          Today&apos;s Activity
        </h2>

        <div className="flex flex-col gap-6">
          <div className="relative aspect-[322.443/309.925] w-full max-h-82.25 overflow-hidden rounded-2xl bg-[#d2e3dc]">
            <div
              className="absolute inset-2 sm:inset-2.5"
              style={{
                WebkitMaskImage: `url(${yogaMask})`,
                maskImage: `url(${yogaMask})`,
                WebkitMaskPosition: 'center',
                maskPosition: 'center',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
              }}
            >
              <Image
                src="/Home/figma-parent-dashboard-yoga.png"
                alt="Panda practicing an animal yoga pose"
                fill
                sizes="(max-width: 639px) calc(100vw - 64px), 560px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex flex-col gap-1">
                <p className="font-nunito text-xs font-medium leading-4 text-[#2f7d7e]">
                  Wed, Jul 20
                </p>
                <h3 className="font-nunito text-xl font-medium leading-7 text-[#263238] sm:text-2xl sm:leading-8">
                  Animal Yoga Adventure
                </h3>
              </div>
              <span className="shrink-0 rounded-full border border-[#dceeee] bg-[#e0f0e9] px-2.25 py-1.75 font-nunito text-xs font-medium leading-4 text-[#263238]">
                Easy
              </span>
            </div>

            <p className="max-w-122.25 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#515b60]">
              Move through fun animal poses to build balance and whole-body motor planning. Perfect
              for an energetic start to the week.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-start gap-2">
          <span className="flex items-center gap-1 rounded-full border border-[#d4d6d7] bg-white px-2.25 py-1.75 font-nunito text-xs font-medium leading-4 text-[#515b60]">
            <Clock3 aria-hidden="true" className="size-3 stroke-[1.5]" />
            20 min
          </span>
          <span className="flex flex-wrap gap-1.25">
            <span className="rounded-full border border-[#accbcb] bg-white px-2.25 py-1.75 font-nunito text-xs font-medium leading-4 text-[#2f7d7e]">
              Yoga cards &amp; open space
            </span>
            <span className="rounded-full border border-[#accbcb] bg-white px-2.25 py-1.75 font-nunito text-xs font-medium leading-4 text-[#2f7d7e]">
              Motor planning &amp; balance
            </span>
          </span>
        </div>

        <Link
          href="/dashboard/weekly-plans/activity-detail"
          className="flex min-h-11 w-full items-center justify-center gap-1 rounded-full bg-[#2f7d7e] px-3 font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-white shadow-[inset_0_-6px_2px_rgba(255,255,255,0.07)] transition-colors hover:bg-[#235d5d]"
        >
          Start Activity
          <ArrowRight className="size-4 stroke-2" />
        </Link>
      </div>
    </section>
  );
}
