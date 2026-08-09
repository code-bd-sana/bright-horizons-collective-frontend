import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';

const CTA_ASSETS = {
  arrow: '/About/figma-about-739-34300-arrow.svg',
  artwork: '/Home/figma-home-1183-12060-img-image31.png',
  artworkMask: '/Home/figma-home-1183-12060-img-image30.svg',
} as const;

const desktopArtworkMask: CSSProperties = {
  WebkitMaskImage: `url(${CTA_ASSETS.artworkMask})`,
  maskImage: `url(${CTA_ASSETS.artworkMask})`,
  WebkitMaskPosition: '-108.182px 194.918px',
  maskPosition: '-108.182px 194.918px',
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
  WebkitMaskSize: '1330.152px 724.271px',
  maskSize: '1330.152px 724.271px',
};

const compactArtworkMask: CSSProperties = {
  WebkitMaskImage: `url(${CTA_ASSETS.artworkMask})`,
  maskImage: `url(${CTA_ASSETS.artworkMask})`,
  WebkitMaskPosition: 'center',
  maskPosition: 'center',
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
  WebkitMaskSize: 'cover',
  maskSize: 'cover',
};

export function MembershipFinalCta() {
  return (
    <section
      aria-labelledby="membership-final-cta-heading"
      className="flex items-start justify-center bg-[#FDFDFC] px-5 py-16 sm:px-8 sm:py-20 md:px-12 md:py-24 lg:px-16 min-[1600px]:h-[587px] min-[1600px]:px-20 min-[1600px]:py-20"
    >
      <div className="relative flex min-h-[427px] w-full max-w-[1280px] items-center justify-center overflow-hidden rounded-[24px] border-2 border-[#FAF0ED] bg-[#FFFDF8] px-6 py-20 text-center shadow-[0_2px_28px_rgba(39,69,67,0.06)] min-[1600px]:h-[427px] min-[1600px]:p-0">
        <div
          aria-hidden="true"
          style={desktopArtworkMask}
          className="pointer-events-none absolute top-[1.61px] left-[100.71px] hidden h-[652.831px] w-[1019.216px] opacity-30 min-[1600px]:block"
        >
          <Image src={CTA_ASSETS.artwork} alt="" fill sizes="1019px" className="object-cover" />
        </div>
        <div
          aria-hidden="true"
          style={compactArtworkMask}
          className="pointer-events-none absolute inset-x-[-15%] bottom-[-30%] h-[95%] opacity-30 min-[1600px]:hidden"
        >
          <Image
            src={CTA_ASSETS.artwork}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-bottom"
          />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-7">
          <div className="flex flex-col items-center gap-4">
            <h2
              id="membership-final-cta-heading"
              className="w-full max-w-[508px] font-nunito text-[32px] font-semibold leading-[38px] tracking-[-0.4px] text-[#414D60] sm:text-4xl sm:leading-11 min-[1600px]:text-[40px] min-[1600px]:leading-12"
            >
              Ready to support your child&apos;s development?
            </h2>
            <p className="font-manrope text-base leading-6 text-[#7D8488]">
              Start your membership today.
            </p>
          </div>

          <Link
            href="#membership-heading"
            className="inline-flex items-center gap-1 overflow-hidden rounded-full bg-[#F2B59F] px-3 py-2 font-nunito text-sm font-medium leading-5 tracking-[-0.084px] text-[#263238]"
          >
            <span className="px-1">Choose Membership</span>
            <Image src={CTA_ASSETS.arrow} alt="" width={16} height={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
