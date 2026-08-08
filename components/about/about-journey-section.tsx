import Image from 'next/image';

const journeyAssets = {
  arrow: '/About/figma-about-739-34148-arrow.svg',
  step: '/About/figma-about-739-34148-star.svg',
} as const;

const journeySteps = [
  'Join Membership',
  'Create Child Profile',
  'Receive Personalized Plan',
  'Explore Activities',
  'Track Progress',
  'Grow Together',
] as const;

function JourneyConnector({ vertical = false }: { vertical?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`flex h-3.5 w-[62px] shrink-0 items-center gap-1 px-1 ${vertical ? 'my-3 rotate-90' : ''}`}
    >
      {Array.from({ length: 4 }, (_, index) => (
        <span key={index} className="size-1.5 shrink-0 rounded-full bg-[#A8C5A0]" />
      ))}
      <Image
        src={journeyAssets.arrow}
        alt=""
        width={14}
        height={14}
        className="size-3.5 shrink-0"
      />
    </span>
  );
}

function JourneyStep({ number, compact = false }: { number: number; compact?: boolean }) {
  const step = (
    <article className="relative h-[190px] w-[200px] shrink-0">
      <Image
        src={journeyAssets.step}
        alt=""
        width={208.188}
        height={194.127}
        className="pointer-events-none absolute -left-[4.1px] -top-[6.38px] h-[194.127px] w-[208.188px] max-w-none"
      />
      <div className="absolute left-[53px] top-[70px] flex w-[94px] flex-col items-center gap-2 text-center">
        <span className="flex size-7 items-center justify-center rounded-full bg-[#F4845F] font-nunito text-xs font-extrabold leading-4 text-white">
          {number}
        </span>
        <h3
          className={`w-full font-nunito text-xs font-bold leading-[15px] text-[#3D3A4E] ${number === 1 || number >= 4 ? 'whitespace-nowrap' : ''}`}
        >
          {journeySteps[number - 1]}
        </h3>
      </div>
    </article>
  );

  if (!compact) {
    return step;
  }

  return (
    <div className="h-[152px] w-[160px] shrink-0">
      <div className="origin-top-left scale-80">{step}</div>
    </div>
  );
}

function DesktopJourney() {
  return (
    <ol className="hidden w-max items-center 2xl:flex">
      {journeySteps.map((label, index) => (
        <li key={label} className="flex items-center">
          <JourneyStep number={index + 1} />
          {index < journeySteps.length - 1 && <JourneyConnector />}
        </li>
      ))}
    </ol>
  );
}

function TabletJourney() {
  return (
    <div className="hidden w-full overflow-x-auto pb-3 md:block 2xl:hidden">
      <ol className="mx-auto flex w-max items-center px-1">
        {journeySteps.map((label, index) => (
          <li key={label} className="flex items-center">
            <JourneyStep number={index + 1} />
            {index < journeySteps.length - 1 && <JourneyConnector />}
          </li>
        ))}
      </ol>
    </div>
  );
}

function MobileJourney() {
  return (
    <ol className="flex flex-col items-center md:hidden">
      {journeySteps.map((label, index) => (
        <li key={label} className="flex flex-col items-center">
          <JourneyStep number={index + 1} compact />
          {index < journeySteps.length - 1 && <JourneyConnector vertical />}
        </li>
      ))}
    </ol>
  );
}

export function AboutJourneySection() {
  return (
    <section
      aria-labelledby="about-journey-heading"
      className="bg-[#EBF5FF] px-5 py-16 sm:px-8 sm:py-20 md:px-12 md:py-24 lg:px-16 2xl:h-[584px] 2xl:px-16 2xl:py-[120px]"
    >
      <div className="mx-auto flex max-w-[1792px] flex-col items-center gap-10 sm:gap-12">
        <header className="flex w-full flex-col items-center gap-4 text-center">
          <span className="rounded-xl border border-[#D4D6D7] bg-[#FFFDF8] px-2 py-1.5 font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#515B60]">
            Member Journey
          </span>
          <h2
            id="about-journey-heading"
            className="font-nunito text-[32px] font-semibold leading-[38px] tracking-[-0.48px] text-[#263238] sm:text-4xl sm:leading-11 xl:text-[48px] xl:leading-14"
          >
            Your Path to a Flourishing Family
          </h2>
        </header>

        <DesktopJourney />
        <TabletJourney />
        <MobileJourney />
      </div>
    </section>
  );
}
