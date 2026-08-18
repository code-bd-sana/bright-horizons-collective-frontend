import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock3 } from 'lucide-react';

const yogaMask = '/Home/figma-parent-dashboard-star-mask.svg';

export function TodayActivityCard() {
  return (
    <section className="flex flex-col overflow-hidden rounded-[16px] border border-[#e8ebe8] bg-transparent shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
      <div className="p-8">
        <h2 className="font-nunito text-2xl font-medium leading-8 text-[#263238]">
          Today&apos;s Activity
        </h2>

        <div className="relative mx-auto mt-6 h-[260px] w-full max-w-[331px] overflow-hidden rounded-2xl bg-[#d2e3dc]">
          <div
            className="absolute left-1/2 top-1/2 h-[260px] w-[331px] -translate-x-1/2 -translate-y-1/2"
            style={{
              WebkitMaskImage: `url(${yogaMask})`,
              maskImage: `url(${yogaMask})`,
              WebkitMaskPosition: 'center',
              maskPosition: 'center',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              WebkitMaskSize: '100% 100%',
              maskSize: '100% 100%',
            }}
          >
            <Image
              src="/Home/figma-parent-dashboard-yoga.png"
              alt="Panda practicing an animal yoga pose"
              fill
              sizes="331px"
              className="object-cover"
              style={{ objectPosition: '50% 58%' }}
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-nunito text-xs font-medium leading-4 text-[#2f7d7e]">
                Wed, Jul 20
              </p>
              <h3 className="mt-1 font-nunito text-xl font-medium leading-[28px] text-[#263238]">
                Animal Yoga Adventure
              </h3>
            </div>
            <span className="rounded-full border border-[#dceeee] bg-[#e0f0e9] px-2.25 py-1.75 font-nunito text-xs font-medium leading-4 text-[#263238]">
              Easy
            </span>
          </div>

          <p className="font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#515b60]">
            Move through fun animal poses to build balance and whole-body motor planning. Perfect
            for an energetic start to the week.
          </p>

          <div className="mt-1 flex flex-wrap gap-2">
            <span className="flex items-center gap-1 rounded-full border border-[#d8ddd9] bg-white px-2 py-1.5 font-manrope text-xs font-medium leading-[18px] text-[#607077]">
              <Clock3 aria-hidden="true" className="size-3 stroke-[1.5]" />
              20 min
            </span>
            <span className="rounded-full border border-[#accbcb] bg-white px-2.25 py-1.75 font-nunito text-xs font-medium leading-4 text-[#2f7d7e]">
              Yoga cards &amp; open space
            </span>
            <span className="rounded-full border border-[#accbcb] bg-white px-2.25 py-1.75 font-nunito text-xs font-medium leading-4 text-[#2f7d7e]">
              Motor planning &amp; balance
            </span>
          </div>
        </div>

        <div className="mt-8">
          <Link
            href="/explore/activities/animal-yoga-adventure"
            className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#2f7d7e] px-4 font-nunito text-base font-medium text-white transition-colors hover:bg-[#235d5d]"
          >
            Start Activity
            <ArrowRight className="size-4 stroke-[2]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
