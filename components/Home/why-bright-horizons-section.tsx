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
    <h2 className="w-full max-w-[540px] text-center font-nunito text-[clamp(28px,5vw,48px)] leading-[1.16] font-semibold tracking-[-0.48px] text-[#263238]">
      Why <span className="text-[#F2B59F]">Bright Horizons Collective?</span>
    </h2>
  );
}

function SearchAndHopeCard() {
  return (
    <article className="flex min-h-[396px] h-full w-full max-w-[566px] flex-col justify-between gap-4 rounded-2xl border border-[#D4D6D7] bg-white p-6 sm:p-8">
      <div className="flex flex-col gap-2">
        <span className="font-manrope text-[28px] leading-7">😮‍💨</span>
        <h3 className="font-nunito text-xl sm:text-2xl leading-7 sm:leading-8 font-medium text-[#263238]">
          The search-and-hope approach
        </h3>
        <p className="w-full font-manrope text-xs sm:text-sm leading-[20px] sm:leading-[22px] tracking-[-0.084px] text-[#515B60]">
          Endless Pinterest boards and free printables that weren&apos;t made for your child.
          Activities that look great in theory but don&apos;t quite land. You&apos;re left wondering
          if you&apos;re doing enough.
        </p>
      </div>

      <ul className="flex flex-col gap-2 pt-2">
        {searchAndHopeItems.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <span className="w-[11px] pt-px font-manrope text-sm leading-[21px] font-bold text-[#A8ADAF]">
              ✕
            </span>
            <span className="font-manrope text-xs sm:text-sm leading-[20px] sm:leading-[22px] tracking-[-0.084px] text-[#515B60]">
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
    <article className="relative flex min-h-[396px] h-full w-full max-w-[566px] flex-col justify-between rounded-2xl border-2 border-[#E9F1EE] bg-[#E9F1EE] p-6 sm:p-9 pt-8 sm:pt-9">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <span className="font-manrope text-[28px] leading-7">🌱</span>
          <h3 className="w-full font-nunito text-xl sm:text-2xl leading-7 sm:leading-8 font-medium text-[#174A4D]">
            One OT. One plan. Built for your child.
          </h3>
          <p className="w-full font-manrope text-xs sm:text-sm leading-[20px] sm:leading-[22px] tracking-[-0.084px] text-[#263238]">
            Every Monday you get a new weekly plan — morning, afternoon, and evening activities
            selected by a licensed pediatric OT who knows your child&apos;s profile. No searching.
            No guessing. Just doing.
          </p>
        </div>

        <ul className="flex w-full flex-col gap-2 pt-2">
          {brightHorizonsItems.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <span className="mt-0.5 flex size-[18px] shrink-0 items-center justify-center rounded-[9px] bg-[#2F7D7E]">
                <Image
                  src={`${assetBase}-icon.svg`}
                  alt=""
                  width={11}
                  height={11}
                  className="size-[11px]"
                />
              </span>
              <span className="font-manrope text-xs sm:text-sm leading-[20px] sm:leading-[22px] tracking-[-0.084px] text-[#174A4D]">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <span className="absolute -top-[13px] left-6 sm:left-7 rounded-full bg-[#2F7D7E] px-3 sm:px-4 py-1 font-manrope text-[10px] sm:text-xs leading-4 font-extrabold tracking-[1px] text-white">
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
    <div className="mx-auto max-w-290 px-4 py-16 sm:px-8 sm:py-24 min-[1600px]:hidden">
      <div className="mx-auto flex justify-center">
        <ComparisonTitle />
      </div>
      <div className="mt-10 sm:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch justify-items-center">
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
