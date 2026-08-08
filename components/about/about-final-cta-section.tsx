import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';

const ctaAssets = {
  arrow: '/About/figma-about-739-34300-arrow.svg',
  artwork: '/Home/figma-home-1183-12060-img-image31.png',
  artworkMask: '/Home/figma-home-1183-12060-img-image30.svg',
} as const;

const desktopArtworkMask: CSSProperties = {
  WebkitMaskImage: `url(${ctaAssets.artworkMask})`,
  maskImage: `url(${ctaAssets.artworkMask})`,
  WebkitMaskPosition: '-108.182px 194.918px',
  maskPosition: '-108.182px 194.918px',
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
  WebkitMaskSize: '1330.152px 724.271px',
  maskSize: '1330.152px 724.271px',
};

const compactArtworkMask: CSSProperties = {
  WebkitMaskImage: `url(${ctaAssets.artworkMask})`,
  maskImage: `url(${ctaAssets.artworkMask})`,
  WebkitMaskPosition: 'center',
  maskPosition: 'center',
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
  WebkitMaskSize: 'cover',
  maskSize: 'cover',
};

export function AboutFinalCtaSection() {
  return (
    <section
      aria-labelledby="about-final-cta-heading"
      className="flex items-start justify-center bg-[#FDFDFC] px-5 py-16 sm:px-8 sm:py-20 md:px-12 md:py-24 lg:px-16 min-[1600px]:h-[587px] min-[1600px]:px-20 min-[1600px]:py-20"
    >
      <div className="relative flex min-h-[427px] w-full max-w-[1280px] items-center justify-center overflow-hidden rounded-3xl border-2 border-[#FAF0ED] bg-[#FFFDF8] px-6 py-20 text-center shadow-[0_2px_28px_rgba(39,69,67,0.06)] min-[1600px]:h-[427px] min-[1600px]:p-0">
        <div
          aria-hidden="true"
          style={desktopArtworkMask}
          className="pointer-events-none absolute left-[100.71px] top-[1.61px] hidden h-[652.831px] w-[1019.216px] opacity-30 min-[1600px]:block"
        >
          <Image src={ctaAssets.artwork} alt="" fill sizes="1019px" className="object-cover" />
        </div>

        <div
          aria-hidden="true"
          style={compactArtworkMask}
          className="pointer-events-none absolute inset-x-[-15%] bottom-[-30%] h-[95%] opacity-30 min-[1600px]:hidden"
        >
          <Image
            src={ctaAssets.artwork}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-bottom"
          />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-7">
          <div className="flex flex-col items-center gap-4">
            <h2
              id="about-final-cta-heading"
              className="font-nunito text-[32px] font-semibold leading-[38px] tracking-[-0.4px] text-[#414D60] sm:text-4xl sm:leading-11 min-[1600px]:whitespace-nowrap min-[1600px]:text-[40px] min-[1600px]:leading-12"
            >
              Your child&apos;s plan is one step away.
            </h2>
            <p className="font-manrope text-base leading-6 text-[#6C7787]">
              Join thousands of families who&apos;ve made home part of the therapy plan.
            </p>
          </div>

          <Link
            href="/register"
            className="inline-flex items-center gap-1 overflow-hidden rounded-full bg-[#F2B59F] p-2.5 font-nunito text-sm font-medium leading-[21px] text-white"
          >
            <span className="px-1">Start your plan</span>
            <Image
              src={ctaAssets.arrow}
              alt=""
              width={20}
              height={20}
              aria-hidden="true"
              className="size-5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
