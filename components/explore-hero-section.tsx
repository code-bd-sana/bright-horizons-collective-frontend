'use client';

import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';

export function ExploreHeroSection() {
  return (
    <section className="relative flex min-h-dvh items-start justify-center overflow-hidden bg-[#FDFDFC] pt-48 text-[#263238] max-lg:min-h-0 max-lg:pb-20 max-lg:pt-36">
      <div className="relative z-10 flex w-187.75 flex-col items-center gap-8 px-5 text-center max-lg:w-full">
        <div className="flex w-full flex-col items-center gap-4">
          <div className="flex w-44.5 items-center gap-2.5 rounded-xl border border-[#E8EBE8] bg-white px-2 py-1.5 font-manrope text-sm leading-5.5 tracking-[-0.084px] shadow-sm">
            <span className="flex items-center gap-1">
              <Star className="size-4 fill-[#FF8B36] text-[#FF8B36]" />
              4.9
            </span>
            <span className="h-2.5 w-px bg-[#D1D5D6]" />
            <span>2,400+ families</span>
          </div>

          <h1 className="font-nunito text-[56px] font-semibold leading-16 tracking-[-0.56px] max-lg:text-[clamp(34px,6vw,56px)] max-lg:leading-[1.14]">
            Support for every stage of your{' '}
            <span className="text-[#F2B59F]">child&apos;s development.</span>
          </h1>

          <p className="w-155.25 font-manrope text-base leading-6 tracking-[-0.176px] text-[#607077] max-lg:w-full">
            Discover expert-curated activities, developmental resources, toy recommendations,
            printables, and learning ideas for every stage of childhood.
          </p>
        </div>

        <Link
          href="/register"
          className="relative inline-flex min-w-20 items-center justify-center gap-1 overflow-hidden rounded-full border border-[#ACCBCB] bg-linear-to-b from-[#2F7D7E]/60 to-[#2F7D7E] px-3 py-2 font-nunito text-sm font-medium leading-6 tracking-[-0.176px] text-[#F8FAFC] shadow-[inset_0px_-6px_2px_rgba(255,255,255,0.07)]"
        >
          <span className="px-1">Become a Member</span>
          <ArrowRight className="size-4" strokeWidth={1.8} />
        </Link>
      </div>
    </section>
  );
}

export default ExploreHeroSection;
