import Image from 'next/image';
import Link from 'next/link';

const aboutAssets = {
  arrow: '/About/figma-about-739-33851-vector.svg',
  divider: '/About/figma-about-739-33851-line2.svg',
  horizontalGrid: '/Home/figma-home-1183-10835-frame3.svg',
  horizontalGridMask: '/Home/figma-home-1183-10835-frame2.svg',
  ratingStar: '/About/figma-about-739-33851-icon.svg',
  stars: '/About/figma-about-739-33851-image10.png',
  photoBottom: '/About/figma-about-739-33851-vector1.png',
  photoCenter: '/About/figma-about-739-33851-union1.png',
  photoLeft: '/About/figma-about-739-33851-union2.png',
  verticalGrid: '/Home/figma-home-1183-10835-frame4.svg',
} as const;

const horizontalGridMaskStyle = {
  maskImage: `url('${aboutAssets.horizontalGridMask}')`,
  maskPosition: '-123px -392.098px',
  maskRepeat: 'no-repeat',
  maskSize: '1689px 949px',
  WebkitMaskImage: `url('${aboutAssets.horizontalGridMask}')`,
  WebkitMaskPosition: '-123px -392.098px',
  WebkitMaskRepeat: 'no-repeat',
  WebkitMaskSize: '1689px 949px',
};

const verticalGridMaskStyle = {
  maskImage: `url('${aboutAssets.horizontalGridMask}')`,
  maskPosition: '-238.859px -297.733px',
  maskRepeat: 'no-repeat',
  maskSize: '1689px 949px',
  WebkitMaskImage: `url('${aboutAssets.horizontalGridMask}')`,
  WebkitMaskPosition: '-238.859px -297.733px',
  WebkitMaskRepeat: 'no-repeat',
  WebkitMaskSize: '1689px 949px',
};

function RatingBadge() {
  return (
    <div className="flex w-[178px] items-center gap-2.5 rounded-xl border border-[#E8EBE8] bg-white px-2 py-1.5 font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#263238]">
      <span className="flex items-center gap-1">
        <Image src={aboutAssets.ratingStar} alt="" width={16} height={16} />
        4.9
      </span>
      <Image src={aboutAssets.divider} alt="" width={1} height={10} className="h-2.5 w-px" />
      <span>2,400+ families</span>
    </div>
  );
}

function PrimaryButton() {
  return (
    <Link
      href="/register"
      className="inline-flex min-w-20 items-center justify-center gap-1 overflow-hidden rounded-full border border-[#ACCBCB] bg-linear-to-b from-[#2F7D7E]/60 to-[#2F7D7E] px-3 py-2 font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-[#F8FAFC] shadow-[inset_0px_-6px_2px_rgba(255,255,255,0.07)]"
    >
      <span className="px-1">Become a Member</span>
      <Image src={aboutAssets.arrow} alt="" width={16} height={16} />
    </Link>
  );
}

function SecondaryButton() {
  return (
    <Link
      href="/explore"
      className="inline-flex min-w-20 items-center justify-center rounded-full border border-[#ACCBCB] px-3 py-2 font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-[#263238]"
    >
      <span className="px-1">Explore Resources</span>
    </Link>
  );
}

function AboutArtwork({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="relative mx-auto mt-12 h-[300px] w-full max-w-[520px]">
        <Image
          src={aboutAssets.photoLeft}
          alt="Family sharing a happy moment"
          width={357}
          height={356}
          className="absolute left-[2%] top-[24%] w-[45%] -rotate-[12.48deg]"
        />
        <Image
          src={aboutAssets.photoCenter}
          alt="Child learning at a table"
          width={266.4}
          height={268}
          className="absolute left-[44%] top-0 w-[36%] rotate-[12.7deg]"
        />
        <Image
          src={aboutAssets.photoBottom}
          alt="Child playing with developmental toys"
          width={247.704}
          height={272.618}
          className="absolute bottom-0 left-[45%] w-[33%] rotate-[10.71deg]"
        />
        <Image
          src={aboutAssets.stars}
          alt=""
          width={134}
          height={134}
          className="absolute right-[1%] top-[38%] w-[20%] rotate-[24.1deg]"
        />
      </div>
    );
  }

  return (
    <div className="absolute left-[calc(50%+28px)] top-[245px] z-10 h-[480px] w-[842px]">
      <div className="absolute left-[352px] top-[239.5px] flex h-[313.915px] w-[294.067px] items-center justify-center">
        <Image
          src={aboutAssets.photoBottom}
          alt="Child playing with developmental toys"
          width={247.704}
          height={272.618}
          className="max-w-none rotate-[10.71deg]"
        />
      </div>
      <div className="absolute left-[352px] top-[-59.5px] flex h-[320.006px] w-[318.797px] items-center justify-center">
        <Image
          src={aboutAssets.photoCenter}
          alt="Child learning at a table"
          width={266.4}
          height={268}
          className="max-w-none rotate-[12.7deg]"
        />
      </div>
      <div className="absolute left-[-21px] top-[82.5px] flex h-[424.749px] w-[425.371px] items-center justify-center">
        <Image
          src={aboutAssets.photoLeft}
          alt="Family sharing a happy moment"
          width={356.871}
          height={356.053}
          className="max-w-none -rotate-[12.48deg]"
        />
      </div>
      <div className="absolute left-[591px] top-[150.5px] flex size-[177.031px] items-center justify-center">
        <Image
          src={aboutAssets.stars}
          alt=""
          width={134}
          height={134}
          className="size-[134px] rotate-[24.1deg] object-cover"
        />
      </div>
    </div>
  );
}

function AboutHeroGrid() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[238px] top-[597.1px] h-[340.933px] w-[1417.001px]"
        style={horizontalGridMaskStyle}
      >
        <Image src={aboutAssets.horizontalGrid} alt="" fill className="object-fill" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[353.86px] top-[502.73px] flex h-[528.973px] w-[1193.264px] items-center justify-center"
      >
        <div
          className="relative h-[1193.264px] w-[528.973px] rotate-[-90deg]"
          style={verticalGridMaskStyle}
        >
          <Image src={aboutAssets.verticalGrid} alt="" fill className="object-fill" />
        </div>
      </div>
    </>
  );
}

function DesktopAboutHero() {
  return (
    <div className="relative mx-auto hidden aspect-[1920/789] w-full max-w-[1920px] lg:block">
      <div
        className="relative h-[789px] w-[1920px] origin-top-left"
        style={{ transform: 'scale(min(1, calc(100vw / 1920px)))' }}
      >
        <AboutHeroGrid />
        <div className="absolute left-[calc(50%-874px)] top-[245px] z-10 flex h-[467px] w-[1744px] items-center justify-between">
          <div className="flex w-[822px] flex-col items-start gap-8">
            <div className="flex w-full flex-col items-start gap-4">
              <RatingBadge />
              <h1 className="h-[184px] w-[691px] font-nunito text-[56px] font-semibold leading-16 tracking-[-0.56px] text-[#263238]">
                <span className="block">Supporting Families</span>
                <span className="block">
                  Through Every <span className="text-[#F2B59F]">Stage of</span>
                </span>
                <span className="block">
                  <span className="text-[#F2B59F]">Childhood</span> Development
                </span>
              </h1>
              <p className="w-[601px] font-manrope text-base leading-6 tracking-[-0.176px] text-[#607077]">
                Bright Horizons Collective exists to help families confidently support their
                children&apos;s development through expert guidance, meaningful activities,
                personalized plans, and trusted educational resources.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <PrimaryButton />
              <SecondaryButton />
            </div>
          </div>
        </div>
        <AboutArtwork />
      </div>
    </div>
  );
}

function CompactAboutHero() {
  return (
    <div className="overflow-hidden px-5 pb-16 pt-36 sm:px-8 lg:hidden">
      <div className="mx-auto max-w-[601px]">
        <RatingBadge />
        <h1 className="mt-4 font-nunito text-[clamp(36px,8vw,52px)] font-semibold leading-[1.14] tracking-[-0.56px] text-[#263238]">
          Supporting Families Through Every{' '}
          <span className="text-[#F2B59F]">Stage of Childhood</span> Development
        </h1>
        <p className="mt-4 font-manrope text-base leading-6 tracking-[-0.176px] text-[#607077]">
          Bright Horizons Collective exists to help families confidently support their
          children&apos;s development through expert guidance, meaningful activities, personalized
          plans, and trusted educational resources.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <PrimaryButton />
          <SecondaryButton />
        </div>
        <AboutArtwork compact />
      </div>
    </div>
  );
}

export function AboutHero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#FDFDFC] text-[#263238]">
      <DesktopAboutHero />
      <CompactAboutHero />
    </section>
  );
}
