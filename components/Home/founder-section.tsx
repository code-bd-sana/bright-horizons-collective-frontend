import Image from 'next/image';

const assetBase = '/Home/figma-home-1183-11743-img';

function FounderHeading() {
  return (
    <header className="flex flex-col items-center gap-3 sm:gap-4 text-center px-4">
      <span className="rounded-xl border border-[#FAE1D9] bg-[#FFFDF8] px-2 py-1.5 font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#614840]">
        Who we are
      </span>
      <h2 className="font-nunito text-[clamp(28px,5vw,48px)] leading-[1.16] font-semibold tracking-[-0.48px] text-[#263238]">
        The person behind the plan
      </h2>
    </header>
  );
}

const credentialsList = [
  'Licensed Pediatric Occupational Therapist',
  'NBCOT Certified',
  '7+ years clinical practice',
  'Home Health Specialist',
  'Evidence-Based Practice',
  'Family-Centered Care',
];

function Credentials() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-[#F5C4B2] w-full max-w-[600px]">
      {credentialsList.map((cred) => (
        <div
          key={cred}
          className="flex items-center justify-center p-3 sm:p-4 border-r border-b border-[#F5C4B2] text-center"
        >
          <p className="font-manrope text-xs sm:text-sm leading-[20px] sm:leading-[22px] tracking-[-0.084px] text-[#493630]">
            {cred}
          </p>
        </div>
      ))}
    </div>
  );
}

function FounderCopy() {
  return (
    <div className="flex w-full max-w-[719px] flex-col items-start gap-6">
      <div className="flex w-full flex-col gap-5 sm:gap-6">
        <div className="w-full font-manrope text-sm sm:text-base lg:text-lg leading-relaxed lg:leading-[27px] tracking-[-0.27px] text-[#263238] space-y-4">
          <p className="font-medium text-lg sm:text-xl text-[#174A4D]">Hi, I&apos;m Jaicy.</p>
          <p>
            I&apos;m a licensed pediatric occupational therapist passionate about helping children
            grow through meaningful play while empowering parents with practical, evidence-based
            guidance.
          </p>
          <p>
            Bright Horizons Collective was created to simplify developmental support by bringing
            together therapist-designed activities, personalized weekly plans, parent education, and
            trusted developmental resources into one easy-to-use platform.
          </p>
          <p>
            My goal is to help families spend less time wondering what to do next and more time
            creating meaningful moments together.
          </p>
        </div>
        <div className="w-full max-w-[531px]">
          <Image
            src={`${assetBase}-line4.svg`}
            alt=""
            width={531}
            height={18}
            className="h-auto w-full max-w-[531px] object-contain"
          />
        </div>
      </div>

      <div className="flex w-full flex-col items-start gap-3 sm:gap-4 pt-2">
        <h3 className="w-full font-nunito text-2xl sm:text-[32px] lg:text-[40px] leading-tight font-semibold tracking-[-0.4px] text-[#515B60]">
          Jaicy
        </h3>
        <Credentials />
      </div>
    </div>
  );
}

function FounderPortrait() {
  return (
    <div className="relative h-full w-[430px] shrink-0">
      <div
        className="absolute -left-[66.33px] top-[43.95px] size-[552.748px]"
        style={{
          maskImage: `url('${assetBase}-image130.svg')`,
          maskPosition: '81.269px 86.005px',
          maskRepeat: 'no-repeat',
          maskSize: '400.119px 383.198px',
          WebkitMaskImage: `url('${assetBase}-image130.svg')`,
          WebkitMaskPosition: '81.269px 86.005px',
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskSize: '400.119px 383.198px',
        }}
      >
        <Image
          src={`${assetBase}-image131.png`}
          alt="Jaicy, licensed pediatric occupational therapist"
          fill
          sizes="553px"
          className="object-cover"
        />
      </div>

      <div
        className="absolute left-[36.24px] top-[-80.08px] flex h-[372.674px] w-[409.675px] items-center justify-center"
        style={{ mixBlendMode: 'plus-lighter' }}
      >
        <div className="relative h-[230.383px] w-[339.458px] rotate-[31.12deg] overflow-hidden">
          {/* The Figma export needs its crop to extend beyond this frame. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${assetBase}-image132.png`}
            alt=""
            className="absolute max-w-none"
            style={{ height: '183.63%', left: '-12.61%', top: '-43.14%', width: '124.62%' }}
          />
        </div>
      </div>
    </div>
  );
}

function DesktopFounder() {
  return (
    <div className="relative mx-auto hidden h-[903px] max-w-[1920px] min-[1600px]:block">
      <div className="flex h-full flex-col items-center gap-20 bg-[#F6E6D4] p-20">
        <FounderHeading />
        <div className="flex w-[1214px] items-center justify-between self-center">
          <FounderCopy />
          <div className="flex self-stretch">
            <FounderPortrait />
          </div>
        </div>
      </div>
    </div>
  );
}

function CompactFounderPortrait() {
  return (
    <div className="relative h-[424px] w-[344px] max-[360px]:h-[356px] max-[360px]:w-[287px] sm:h-[530px] sm:w-[430px]">
      <div className="absolute left-0 top-0 h-[530px] w-[430px] origin-top-left scale-80 max-[360px]:scale-[0.67] sm:scale-100">
        <FounderPortrait />
      </div>
    </div>
  );
}

function CompactFounder() {
  return (
    <div className="bg-[#F6E6D4] px-4 py-16 sm:px-8 sm:py-24 lg:py-32 min-[1600px]:hidden">
      <div className="mx-auto max-w-290">
        <FounderHeading />
        <div className="mt-10 sm:mt-16 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10 lg:gap-14">
          <div className="flex-1 w-full flex justify-center lg:justify-start">
            <FounderCopy />
          </div>
          <CompactFounderPortrait />
        </div>
      </div>
    </div>
  );
}

export function FounderSection() {
  return (
    <section>
      <DesktopFounder />
      <CompactFounder />
    </section>
  );
}
