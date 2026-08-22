import Image from 'next/image';

const assetBase = '/Home/figma-home-1183-11743-img';

function FounderHeading() {
  return (
    <header className="flex flex-col items-center gap-4 text-center">
      <span className="rounded-xl border border-[#FAE1D9] bg-[#FFFDF8] px-2 py-1.5 font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#614840]">
        Who we are
      </span>
      <h2 className="whitespace-nowrap font-nunito text-5xl leading-14 font-semibold tracking-[-0.48px] text-[#263238] max-lg:whitespace-normal max-md:text-[34px] max-md:leading-[1.16]">
        The person behind the plan
      </h2>
    </header>
  );
}

function Credentials() {
  return (
    <div className="flex flex-col max-md:grid max-md:grid-cols-2">
      <div className="flex items-start max-md:contents">
        <div className="flex w-[168px] flex-col items-center border-r border-b border-[#F5C4B2] px-4 py-3 max-md:w-full">
          <p className="w-[152px] font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#493630] max-md:w-full max-md:text-center">
            Licensed Pediatric Occupational Therapist
          </p>
        </div>
        <div className="flex flex-col items-center border-r border-b border-[#F5C4B2] px-4 py-3">
          <p className="w-[98px] text-center font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#493630] max-md:w-full">
            NBCOT Certified
          </p>
        </div>
        <div className="flex flex-col items-center border-b border-[#F5C4B2] px-4 py-3 max-md:border-r">
          <p className="w-[106px] text-right font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#493630] max-md:w-full max-md:text-center">
            7+ years clinical practice
          </p>
        </div>
      </div>
      <div className="flex items-start max-md:contents">
        <div className="flex flex-col items-center border-r border-[#F5C4B2] px-4 py-3">
          <p className="w-[136px] font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#493630] max-md:w-full max-md:text-center">
            Home Health Specialist
          </p>
        </div>
        <div className="flex w-[130px] flex-col items-center border-r border-[#F5C4B2] px-4 py-3 max-md:w-full max-md:border-b">
          <p className="w-[152px] text-center font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#493630] max-md:w-full">
            Evidence-Based Practice
          </p>
        </div>
        <div className="flex flex-col items-center px-4 py-3">
          <p className="w-[106px] text-right font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#493630] max-md:w-full max-md:text-center">
            Family-Centered Care
          </p>
        </div>
      </div>
    </div>
  );
}

function FounderCopy() {
  return (
    <div className="flex w-[719px] flex-col items-start gap-6 max-lg:w-full">
      <div className="flex w-full flex-col gap-6">
        <div className="w-full whitespace-pre-wrap font-manrope text-lg leading-[27px] tracking-[-0.27px] text-[#263238]">
          <p>Hi, I&apos;m Jaicy.</p>
          <p>
            I&apos;m a licensed pediatric occupational therapist passionate about helping children
            grow through meaningful play while empowering parents with practical, evidence-based
            guidance.
          </p>
          <p>&nbsp;</p>
          <p>
            Bright Horizons Collective was created to simplify developmental support by bringing
            together therapist-designed activities, personalized weekly plans, parent education, and
            trusted developmental resources into one easy-to-use platform.
          </p>
          <p>&#8203;</p>
          <p>
            My goal is to help families spend less time wondering what to do next and more time
            creating meaningful moments together.
          </p>
        </div>
        <Image
          src={`${assetBase}-line4.svg`}
          alt=""
          width={531}
          height={18}
          className="h-[18px] w-[531px] max-w-full"
        />
      </div>

      <div className="flex w-full flex-col items-start gap-2.5">
        <h3 className="w-full font-nunito text-[40px] leading-12 font-semibold tracking-[-0.4px] text-[#515B60]">
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

function CompactFounder() {
  return (
    <div className="bg-[#F6E6D4] px-5 py-24 sm:px-8 sm:py-32 min-[1600px]:hidden">
      <div className="mx-auto max-w-[719px]">
        <FounderHeading />
        <div className="mt-16 overflow-hidden">
          <FounderCopy />
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
