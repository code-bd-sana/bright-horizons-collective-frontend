'use client';

import { ArrowRight, BadgeCheck, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export interface HeroSectionProps {
  rating?: string;
  familyCount?: string;
  headlineMain?: string;
  headlineHighlight?: string;
  headlineEnd?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
}

const planItems = [
  'Outdoor balance walk',
  'Fine motor sorting',
  'Creative storytelling circle',
  'Sensory bin warm-up',
];

export function HeroSection({
  rating = '4.9',
  familyCount = '2,400+ families',
  headlineMain = 'Supporting your ',
  headlineHighlight = "child's development-",
  headlineEnd = ' one meaningful activity at a time.',
  subtitle = "Receive personalized weekly plans, therapist-designed activities, and evidence-based parent guidance tailored to your child's age, interests, and developmental goals.",
  ctaText = 'Start Free',
  ctaHref = '/register',
}: HeroSectionProps) {
  return (
    <section className="relative h-dvh min-h-0 overflow-hidden bg-[#FDFDFC] text-[#263238] max-lg:h-auto">
      <div className="absolute inset-x-0 top-0 h-270 origin-top scale-[min(1,calc(100dvh/1080))] max-lg:relative max-lg:h-auto max-lg:origin-center max-lg:scale-100">
        <div className="absolute left-1/2 top-48 z-20 flex w-241.25 -translate-x-1/2 flex-col items-center gap-8 text-center max-lg:relative max-lg:left-auto max-lg:top-auto max-lg:mx-auto max-lg:w-full max-lg:translate-x-0 max-lg:px-5 max-lg:pt-14">
          <div className="flex w-full flex-col items-center gap-4">
            <div className="flex items-center gap-2.5 rounded-xl border border-[#E8EBE8] bg-white px-2 py-1.5 font-manrope text-sm leading-5.5 tracking-[-0.084px] shadow-sm">
              <span className="flex items-center gap-1">
                <Star className="size-4 fill-[#FF8B36] text-[#FF8B36]" />
                {rating}
              </span>
              <span className="h-2.5 w-px bg-[#D1D5D6]" />
              <span>{familyCount}</span>
            </div>

            <div className="relative">
              <h1 className="w-241.25 font-nunito text-[56px] font-semibold leading-16 tracking-[-0.56px] max-lg:w-full max-lg:text-[clamp(34px,6vw,56px)] max-lg:leading-[1.14]">
                {headlineMain}
                <span className="text-[#F2B59F]">{headlineHighlight}</span>
                {headlineEnd}
              </h1>
              <Image
                src="/Home/figma-hero-sparkle.png"
                alt=""
                width={99}
                height={99}
                className="pointer-events-none absolute -right-20.25 -top-3.75 size-28.25 rotate-[81.16deg] object-contain max-lg:hidden"
              />
            </div>

            <p className="w-169.25 font-manrope text-base leading-6 tracking-[-0.176px] text-[#607077] max-lg:w-full">
              {subtitle}
            </p>
          </div>

          <Link
            href={ctaHref}
            className="relative inline-flex min-w-20 items-center justify-center gap-1 overflow-hidden rounded-full border border-[#ACCBCB] bg-linear-to-b from-[#2F7D7E]/60 to-[#2F7D7E] px-3 py-2 font-nunito text-sm font-medium leading-6 tracking-[-0.176px] text-[#F8FAFC] shadow-[inset_0px_-6px_2px_rgba(255,255,255,0.07)]"
          >
            <span className="px-1">{ctaText}</span>
            <ArrowRight className="size-4" strokeWidth={1.8} />
          </Link>
        </div>

        <div className="absolute left-1/2 top-140.5 z-20 flex -translate-x-1/2 text-center items-center gap-6 max-lg:relative max-lg:left-auto max-lg:top-auto max-lg:mx-auto max-lg:mt-8 max-lg:w-full max-lg:translate-x-0 max-lg:flex-wrap max-lg:justify-center max-lg:px-5">
          {[
            'Created by a Licensed Pediatric Occupational Therapist',
            'Family-Centered',
            'Designed for Ages 0–8',
          ].map((label, index) => (
            <div
              key={label}
              className={`flex flex-col items-center gap-2 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#493630] ${index === 0 ? 'w-51.5' : 'whitespace-nowrap'}`}
            >
              <span className="flex size-8 items-center justify-center rounded-full bg-[#E9F1EE]">
                <span className="flex size-5 items-center justify-center rounded-full bg-[#8FB9A8] text-white">
                  <BadgeCheck className="size-4" strokeWidth={1.8} />
                </span>
              </span>
              <span>{label}</span>
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute left-1/2 top-124.75 h-234 w-379.5 -translate-x-1/2 mask-[url('/Home/figma-hero-mask.svg')] mask-[15px_144px] mask-no-repeat mask-size-[1444px_711px] max-lg:relative max-lg:left-auto max-lg:top-auto max-lg:-mt-3.75 max-lg:h-[min(62vw,600px)] max-lg:w-full max-lg:translate-x-0 max-lg:mask-center max-lg:mask-cover">
          <Image
            src="/Home/figma-hero-photo.png"
            alt="Children celebrating in a sunny flower field"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="absolute left-[calc(50%-712px)] top-187.5 z-30 flex h-[222.657px] w-[336.645px] items-center justify-center max-lg:bottom-[6%] max-lg:left-[6%] max-lg:top-auto max-lg:h-auto max-lg:w-[min(336.645px,76vw)]">
          <div className="h-44.75 w-78.5 shrink-0 rotate-[-8.34deg] max-lg:w-[min(314px,72vw)]">
            <div className="flex h-44.75 w-78.5 flex-col items-center rounded-2xl border-2 border-white/10 bg-[#F9F3ED] px-5.5 py-4.5 shadow-[0px_8px_18px_rgba(23,74,77,0.15)] max-lg:w-full">
              <p className="font-manrope text-xs font-semibold uppercase leading-4.5 tracking-[0.48px] text-[#263238]">
                This week&apos;s plan
              </p>
              {planItems.map((item, index) => (
                <div
                  key={item}
                  className={`flex w-42.5 items-center gap-2 ${index === 0 || index === 2 ? 'h-7.5 pt-2.5' : 'h-6.75 pt-1.75'}`}
                >
                  <span
                    className={`flex size-4.25 shrink-0 items-center justify-center rounded-[8.5px] border-2 ${index < 3 ? 'border-[#2F7D7E] bg-[#2F7D7E]' : 'border-[#D5E5E5]'}`}
                  >
                    {index < 3 && (
                      <Image
                        src="/Home/figma-plan-check.svg"
                        alt=""
                        width={9}
                        height={9}
                        className="size-2.25"
                      />
                    )}
                  </span>
                  <span
                    className={`font-nunito text-xs font-medium leading-4 ${index === 3 ? 'text-[#263238]' : 'text-[#7D8488]'}`}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute left-[calc(50%-797px)] top-174.75 z-30 flex size-[177.031px] items-center justify-center max-lg:hidden">
          <Image
            src="/Home/figma-plan-stars.png"
            alt=""
            width={134}
            height={134}
            className="size-33.5 rotate-[24.1deg] object-contain"
          />
        </div>

        <Image
          src="/Home/figma-hero-creature.png"
          alt=""
          width={30}
          height={36}
          className="pointer-events-none absolute left-[calc(50%+461px)] top-173.25 z-30 h-11 w-10 -scale-y-100 rotate-[-161.55deg] object-contain max-lg:hidden"
        />
        <div className="absolute left-[calc(50%+396px)] top-178 z-30 flex h-24 w-21 rotate-[18.65deg] flex-col items-center rounded-[16.551px] border border-[#D9F99D] bg-[#F7FEE7] px-[17.551px] py-[12.822px] shadow-[0px_4.729px_11.822px_rgba(23,74,77,0.1)] max-lg:bottom-[22%] max-lg:left-auto max-lg:right-[7%] max-lg:top-auto">
          <span className="font-manrope text-[23.644px] leading-[35.466px]">🌱</span>
          <span className="font-nunito text-center text-xs font-bold leading-4 text-[#174A4D]">
            Week 6<br />
            streak!
          </span>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
