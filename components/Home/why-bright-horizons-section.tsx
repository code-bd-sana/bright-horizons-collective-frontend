import Image from 'next/image';

const assetBase = '/Home/figma-home-1183-11657-img';

const searchAndHopeItems = [
  'Endless searching',
  'Random activities',
  'No developmental explanation',
  'Generic printable',
  'No expert guidance',
  'One-size-fits-all',
];

const brightHorizonsItems = [
  'Personalized weekly plans',
  'Pediatric OT designed',
  'Every activity explains why it matters',
  'Personalized recommendations',
  'Parent coaching & feedback',
  'Plans evolve with your child',
];

function ComparisonTitle() {
  return (
    <h2 className="h-14 w-[459px] text-center font-nunito text-5xl leading-14 font-semibold tracking-[-0.48px] text-[#263238] max-lg:h-auto max-lg:w-full max-md:text-[34px] max-md:leading-[1.16]">
      Why <span className="text-[#F2B59F]">Bright Horizons Collective?</span>
    </h2>
  );
}

function SearchAndHopeCard() {
  return (
    <article className="flex h-[396px] w-[566px] shrink-0 flex-col gap-4 rounded-2xl border border-[#D4D6D7] bg-white p-[33px] max-lg:h-auto max-lg:w-full max-md:p-6">
      <div className="flex flex-col gap-2">
        <span className="font-manrope text-[28px] leading-7">😮‍💨</span>
        <h3 className="font-nunito text-2xl leading-8 font-medium text-[#263238]">
          The search-and-hope approach
        </h3>
        <p className="w-[492px] font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#515B60] max-lg:w-full">
          Endless Pinterest boards and free printables that weren&apos;t made for your child.
          Activities that look great in theory but don&apos;t quite land. You&apos;re left wondering
          if you&apos;re doing enough.
        </p>
      </div>

      <ul className="flex flex-col gap-2">
        {searchAndHopeItems.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <span className="w-[11px] pt-px font-manrope text-sm leading-[21px] font-bold text-[#A8ADAF]">
              ✕
            </span>
            <span className="font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#515B60]">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function BrightHorizonsCard() {
  return (
    <article className="relative flex h-[396px] w-[566px] shrink-0 flex-col rounded-2xl border-2 border-[#E9F1EE] bg-[#E9F1EE] p-[38px] max-lg:h-auto max-lg:w-full max-md:p-6 max-md:pt-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <span className="font-manrope text-[28px] leading-7">🌱</span>
          <h3 className="w-[490px] font-nunito text-2xl leading-8 font-medium text-[#174A4D] max-lg:w-full">
            One OT. One plan. Built for your child.
          </h3>
          <p className="w-[490px] font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#263238] max-lg:w-full">
            Every Monday you get a new weekly plan — morning, afternoon, and evening activities
            selected by a licensed pediatric OT who knows your child&apos;s profile. No searching.
            No guessing. Just doing.
          </p>
        </div>

        <ul className="flex w-[490px] flex-col gap-2 max-lg:w-full">
          {brightHorizonsItems.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <span className="mt-px flex size-[18px] shrink-0 items-center justify-center rounded-[9px] bg-[#2F7D7E]">
                <Image
                  src={`${assetBase}-icon.svg`}
                  alt=""
                  width={11}
                  height={11}
                  className="size-[11px]"
                />
              </span>
              <span className="font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#174A4D]">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <span className="absolute -top-[13px] left-7 rounded-full bg-[#2F7D7E] px-4 py-1 font-manrope text-xs leading-4 font-extrabold tracking-[1px] text-white">
        THE BRIGHT HORIZONS WAY
      </span>
    </article>
  );
}

function DesktopComparison() {
  return (
    <div className="relative mx-auto hidden h-[879px] max-w-[1920px] min-[1600px]:block">
      <div className="absolute left-1/2 top-20 flex w-[1291px] -translate-x-1/2 flex-col items-center gap-20">
        <ComparisonTitle />

        <div className="relative h-[503px] w-full">
          <div className="absolute left-0 top-[3px] flex size-[143.826px] items-center justify-center">
            <Image
              src={`${assetBase}-image138.png`}
              alt=""
              width={128}
              height={128}
              className="size-32 -scale-y-100 rotate-[172.39deg] object-cover"
            />
          </div>
          <div className="absolute left-[1147px] top-0 flex size-[144.642px] items-center justify-center">
            <Image
              src={`${assetBase}-image136.png`}
              alt=""
              width={128}
              height={128}
              className="size-32 rotate-[8.04deg] object-cover"
            />
          </div>

          <div className="absolute left-[72px] top-[107px] flex items-center gap-6">
            <SearchAndHopeCard />
            <BrightHorizonsCard />
          </div>
        </div>
      </div>
    </div>
  );
}

function CompactComparison() {
  return (
    <div className="mx-auto max-w-[600px] px-5 py-24 sm:px-8 sm:py-32 min-[1600px]:hidden">
      <div className="mx-auto max-w-full">
        <ComparisonTitle />
      </div>
      <div className="mt-16 flex flex-col items-center gap-6">
        <SearchAndHopeCard />
        <BrightHorizonsCard />
      </div>
    </div>
  );
}

export function WhyBrightHorizonsSection() {
  return (
    <section id="about" className="bg-[#FDFDFC]">
      <DesktopComparison />
      <CompactComparison />
    </section>
  );
}
