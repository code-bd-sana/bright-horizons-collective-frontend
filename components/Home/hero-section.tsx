'use client';

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

const heroAssets = {
  badgeCheck: '/Home/figma-home-1183-10835-vector1.svg',
  photo: '/Home/figma-home-1183-10835-image108.png',
  photoMask: '/Home/figma-home-1183-10835-image107.svg',
  planCheck: '/Home/figma-home-1183-10835-icon1.svg',
  planStars: '/Home/figma-home-1183-10835-image10.png',
  ratingStar: '/Home/figma-home-1183-10835-icon.svg',
  sparkle: '/Home/figma-home-1183-10835-image112.png',
  streakCreature: '/Home/figma-home-1183-10835-image24.png',
  arrow: '/Home/figma-home-1183-10835-vector.svg',
  divider: '/Home/figma-home-1183-10835-line2.svg',
  horizontalGridMask: '/Home/figma-home-1183-10835-frame2.svg',
  horizontalGrid: '/Home/figma-home-1183-10835-frame3.svg',
  verticalGrid: '/Home/figma-home-1183-10835-frame4.svg',
} as const;

const photoMaskStyle = {
  maskImage: `url('${heroAssets.photoMask}')`,
  maskPosition: '15px 144px',
  maskRepeat: 'no-repeat',
  maskSize: '1444px 711px',
  WebkitMaskImage: `url('${heroAssets.photoMask}')`,
  WebkitMaskPosition: '15px 144px',
  WebkitMaskRepeat: 'no-repeat',
  WebkitMaskSize: '1444px 711px',
};

const gridMaskStyle = {
  maskImage: `url('${heroAssets.horizontalGridMask}')`,
  maskPosition: '-123px -392.098px',
  maskRepeat: 'no-repeat',
  maskSize: '1689px 949px',
  WebkitMaskImage: `url('${heroAssets.horizontalGridMask}')`,
  WebkitMaskPosition: '-123px -392.098px',
  WebkitMaskRepeat: 'no-repeat',
  WebkitMaskSize: '1689px 949px',
};

const verticalGridMaskStyle = {
  maskImage: `url('${heroAssets.horizontalGridMask}')`,
  maskPosition: '-238.859px -297.733px',
  maskRepeat: 'no-repeat',
  maskSize: '1689px 949px',
  WebkitMaskImage: `url('${heroAssets.horizontalGridMask}')`,
  WebkitMaskPosition: '-238.859px -297.733px',
  WebkitMaskRepeat: 'no-repeat',
  WebkitMaskSize: '1689px 949px',
};

function PlanCard() {
  return (
    <div className="absolute left-[calc(50%-702.98px)] top-[550.66px] z-30 flex h-[217px] w-[298.058px] items-center justify-center">
      <div className="h-[179px] w-[275px] rotate-[-8.34deg] rounded-2xl border-2 border-white/10 bg-[#F9F3ED] px-[22px] py-[18px] shadow-[0px_8px_18px_rgba(23,74,77,0.15)]">
        <p className="font-manrope text-xs font-semibold uppercase leading-[18px] tracking-[0.48px] text-[#263238]">
          This week&apos;s plan
        </p>
        {planItems.map((item, index) => (
          <div
            key={item}
            className={`flex w-[170px] items-center gap-2 ${index % 2 === 0 ? 'h-[30px] pt-2.5' : 'h-[27px] pt-[7px]'}`}
          >
            <span
              className={`flex size-[17px] shrink-0 items-center justify-center rounded-[8.5px] border-2 ${index < 3 ? 'border-[#2F7D7E] bg-[#2F7D7E]' : 'border-[#D5E5E5]'}`}
            >
              {index < 3 && <Image src={heroAssets.planCheck} alt="" width={9} height={9} />}
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
  );
}

function TrustMarks() {
  return (
    <div className="absolute left-[calc(50%-0.5px)] top-[494px] z-20 flex -translate-x-1/2 items-start gap-6 text-center">
      {['Licensed Pediatric OT', 'Family-Centered', 'Designed for Ages 0–8'].map((label) => (
        <div key={label} className="flex flex-col items-center gap-2">
          <span className="flex size-8 items-center justify-center overflow-hidden rounded-full bg-[#E9F1EE]">
            <span className="flex size-5 items-center justify-center rounded-full bg-[#82B1B2]">
              <Image src={heroAssets.badgeCheck} alt="" width={16} height={16} />
            </span>
          </span>
          <span className="whitespace-nowrap font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#493630]">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

function DesktopHero({
  rating,
  familyCount,
  headlineMain,
  headlineHighlight,
  headlineEnd,
  subtitle,
  ctaText,
  ctaHref,
}: Required<HeroSectionProps>) {
  return (
    <div className="relative mx-auto hidden aspect-[1920/950] w-full max-w-[1920px] lg:block">
      <div
        className="relative h-[950px] w-[1920px] origin-top-left"
        style={{ transform: 'scale(min(1, calc(100vw / 1920px)))' }}
      >
        <div
          className="pointer-events-none absolute left-[238px] top-[597.1px] h-[340.933px] w-[1417.001px]"
          style={gridMaskStyle}
        >
          <Image src={heroAssets.horizontalGrid} alt="" fill className="object-fill" />
        </div>
        <div className="pointer-events-none absolute left-[353.86px] top-[502.73px] flex h-[528.973px] w-[1193.264px] items-center justify-center">
          <div
            className="relative h-[1193.264px] w-[528.973px] rotate-[-90deg]"
            style={verticalGridMaskStyle}
          >
            <Image src={heroAssets.verticalGrid} alt="" fill className="object-fill" />
          </div>
        </div>

        <div className="absolute left-[calc(50%-0.5px)] top-[148px] z-20 flex -translate-x-1/2 flex-col items-center gap-8 text-center">
          <div className="flex w-[965px] flex-col items-center gap-4">
            <div className="flex w-[178px] items-center gap-2.5 rounded-xl border border-[#E8EBE8] bg-white px-2 py-1.5 font-manrope text-sm leading-[22px] tracking-[-0.084px] shadow-sm">
              <span className="flex items-center gap-1">
                <Image src={heroAssets.ratingStar} alt="" width={16} height={16} />
                {rating}
              </span>
              <Image src={heroAssets.divider} alt="" width={1} height={10} className="h-2.5 w-px" />
              <span>{familyCount}</span>
            </div>

            <div className="relative">
              <h1 className="w-[965px] font-nunito text-[56px] font-semibold leading-16 tracking-[-0.56px] text-[#263238]">
                {headlineMain}
                <span className="text-[#F2B59F]">{headlineHighlight}</span>
                {headlineEnd}
              </h1>
              <div className="pointer-events-none absolute -right-[82.5px] -top-[15px] flex size-[113.335px] items-center justify-center">
                <Image
                  src={heroAssets.sparkle}
                  alt=""
                  width={99}
                  height={99}
                  className="size-[99.259px] rotate-[81.16deg] object-cover"
                />
              </div>
            </div>

            <p className="w-[677px] font-manrope text-base leading-6 tracking-[-0.176px] text-[#607077]">
              {subtitle}
            </p>
          </div>

          <Link
            href={ctaHref}
            className="relative inline-flex min-w-20 items-center justify-center gap-1 overflow-hidden rounded-full border border-[#ACCBCB] bg-linear-to-b from-[#2F7D7E]/60 to-[#2F7D7E] px-3 py-2 font-nunito text-sm font-medium leading-6 tracking-[-0.176px] text-[#F8FAFC] shadow-[inset_0px_-6px_2px_rgba(255,255,255,0.07)]"
          >
            <span className="px-1">{ctaText}</span>
            <Image src={heroAssets.arrow} alt="" width={16} height={16} />
          </Link>
        </div>

        <TrustMarks />

        <div
          className="pointer-events-none absolute left-1/2 top-[303px] h-[936px] w-[1518px] -translate-x-1/2"
          style={photoMaskStyle}
        >
          <Image
            src={heroAssets.photo}
            alt="Children celebrating in a sunny flower field"
            fill
            priority
            className="object-cover"
          />
        </div>

        <PlanCard />
        <div className="pointer-events-none absolute left-[calc(50%-788px)] top-[494px] z-30 flex size-[177.031px] items-center justify-center">
          <Image
            src={heroAssets.planStars}
            alt=""
            width={134}
            height={134}
            className="size-[134px] rotate-[24.1deg] object-cover"
          />
        </div>

        <div className="pointer-events-none absolute left-[calc(50%+483.96px)] top-[534px] z-30 flex h-[43.645px] w-[39.853px] items-center justify-center">
          <div className="relative h-9 w-7.5 rotate-[-161.55deg] overflow-hidden -scale-y-100">
            <Image
              src={heroAssets.streakCreature}
              alt=""
              fill
              className="h-[117.99%] w-[140.17%] max-w-none -translate-x-1/4 -translate-y-[18%] object-cover"
            />
          </div>
        </div>
        <div className="absolute left-[calc(50%+418.97px)] top-[553px] z-30 flex h-[115.903px] w-[104.604px] items-center justify-center">
          <div className="flex h-24 w-[88px] rotate-[18.65deg] flex-col items-center rounded-[16.551px] border border-[#D9F99D] bg-[#F7FEE7] px-[17.551px] py-[12.822px] shadow-[0px_4.729px_11.822px_rgba(23,74,77,0.1)]">
            <span className="font-manrope text-[23.644px] leading-[35.466px]">🌱</span>
            <span className="font-nunito text-center text-xs font-bold leading-4 text-[#174A4D]">
              Week 6<br />
              streak!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CompactHero({
  rating,
  familyCount,
  headlineMain,
  headlineHighlight,
  headlineEnd,
  subtitle,
  ctaText,
  ctaHref,
}: Required<HeroSectionProps>) {
  return (
    <div className="relative flex min-h-[880px] flex-col items-center overflow-hidden px-5 pb-12 pt-36 text-center lg:hidden">
      <div className="relative z-20 flex w-full max-w-[677px] flex-col items-center gap-8">
        <div className="flex w-full flex-col items-center gap-4">
          <div className="flex w-[178px] items-center gap-2.5 rounded-xl border border-[#E8EBE8] bg-white px-2 py-1.5 font-manrope text-sm leading-[22px] tracking-[-0.084px] shadow-sm">
            <span className="flex items-center gap-1">
              <Image src={heroAssets.ratingStar} alt="" width={16} height={16} />
              {rating}
            </span>
            <Image src={heroAssets.divider} alt="" width={1} height={10} className="h-2.5 w-px" />
            <span>{familyCount}</span>
          </div>
          <div className="relative">
            <h1 className="font-nunito text-[clamp(34px,6vw,52px)] font-semibold leading-[1.14] tracking-[-0.56px] text-[#263238]">
              {headlineMain}
              <span className="text-[#F2B59F]">{headlineHighlight}</span>
              {headlineEnd}
            </h1>
            <Image
              src={heroAssets.sparkle}
              alt=""
              width={72}
              height={72}
              className="pointer-events-none absolute -right-10 -top-6 size-[72px] rotate-[81.16deg] object-cover"
            />
          </div>
          <p className="max-w-[677px] font-manrope text-base leading-6 tracking-[-0.176px] text-[#607077]">
            {subtitle}
          </p>
        </div>
        <Link
          href={ctaHref}
          className="inline-flex min-w-20 items-center justify-center gap-1 rounded-full border border-[#ACCBCB] bg-linear-to-b from-[#2F7D7E]/60 to-[#2F7D7E] px-3 py-2 font-nunito text-sm font-medium leading-6 tracking-[-0.176px] text-[#F8FAFC] shadow-[inset_0px_-6px_2px_rgba(255,255,255,0.07)]"
        >
          <span className="px-1">{ctaText}</span>
          <Image src={heroAssets.arrow} alt="" width={16} height={16} />
        </Link>
      </div>

      <div className="relative z-20 mt-8 flex flex-wrap justify-center gap-x-6 gap-y-4">
        {['Licensed Pediatric OT', 'Family-Centered', 'Designed for Ages 0–8'].map((label) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-full bg-[#E9F1EE]">
              <span className="flex size-5 items-center justify-center rounded-full bg-[#82B1B2]">
                <Image src={heroAssets.badgeCheck} alt="" width={16} height={16} />
              </span>
            </span>
            <span className="whitespace-nowrap font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#493630]">
              {label}
            </span>
          </div>
        ))}
      </div>

      <div className="relative mt-6 h-[360px] w-full max-w-[900px] overflow-hidden">
        <Image
          src={heroAssets.photo}
          alt="Children celebrating in a sunny flower field"
          fill
          className="object-cover object-center"
        />
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-linear-to-t from-[#FDFDFC] to-transparent" />
      </div>
    </div>
  );
}

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
  const content = {
    rating,
    familyCount,
    headlineMain,
    headlineHighlight,
    headlineEnd,
    subtitle,
    ctaText,
    ctaHref,
  };

  return (
    <section className="relative isolate z-10 overflow-hidden bg-[#FDFDFC] text-[#263238]">
      <DesktopHero {...content} />
      <CompactHero {...content} />
    </section>
  );
}

export default HeroSection;
