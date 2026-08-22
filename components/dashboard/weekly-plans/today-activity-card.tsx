import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock3 } from 'lucide-react';

const yogaMask = '/Home/figma-parent-dashboard-star-mask.svg';

export function TodayActivityCard() {
  return (
    <section className="flex min-h-0 flex-col rounded-[16px] border border-[#e8ebe8] bg-[#fffdf8] p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)] sm:p-6 lg:min-h-[699px] lg:gap-6 lg:p-8">
      <div className="flex flex-col gap-6">
        <h2 className="font-nunito text-2xl font-medium leading-8 text-[#263238]">
          Today&apos;s Activity
        </h2>

        <div className="flex flex-col gap-6">
          <div className="relative h-[260px] w-full overflow-hidden rounded-2xl bg-[#d2e3dc] sm:h-[329px]">
            <div className="absolute left-[calc(50%-0.21px)] top-1/2 h-[323px] w-[330.57px] -translate-x-1/2 -translate-y-1/2">
              <div
                className="absolute -left-[11.36px] -top-[131.22px] h-[612.357px] w-[360.603px]"
                style={{
                  WebkitMaskImage: `url(${yogaMask})`,
                  maskImage: `url(${yogaMask})`,
                  WebkitMaskPosition: '14.157px 138.729px',
                  maskPosition: '14.157px 138.729px',
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat',
                  WebkitMaskSize: '322.443px 309.926px',
                  maskSize: '322.443px 309.926px',
                }}
              >
                <Image
                  src="/Home/figma-parent-dashboard-yoga.png"
                  alt="Panda practicing an animal yoga pose"
                  fill
                  sizes="361px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1">
                <p className="font-nunito text-xs font-medium leading-4 text-[#2f7d7e]">
                  Wed, Jul 20
                </p>
                <h3 className="font-nunito text-[24px] font-medium leading-8 text-[#263238]">
                  Animal Yoga Adventure
                </h3>
              </div>
              <span className="shrink-0 rounded-full border border-[#dceeee] bg-[#e0f0e9] px-2.25 py-1.75 font-nunito text-xs font-medium leading-4 text-[#263238]">
                Easy
              </span>
            </div>

            <p className="max-w-[489px] font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#515b60]">
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
          href="/explore/activities/animal-yoga-adventure"
          className="flex h-10 w-full items-center justify-center gap-1 rounded-full bg-[#2f7d7e] px-3 font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-white shadow-[inset_0_-6px_2px_rgba(255,255,255,0.07)] transition-colors hover:bg-[#235d5d]"
        >
          Start Activity
          <ArrowRight className="size-4 stroke-[2]" />
        </Link>
      </div>
    </section>
  );
}
