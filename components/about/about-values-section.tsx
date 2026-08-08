import Image from 'next/image';

const valueAssets = {
  empathy: '/About/figma-about-739-34090-icon.svg',
  curiosity: '/About/figma-about-739-34090-icon1.svg',
  growth: '/About/figma-about-739-34090-icon2.svg',
  inclusivity: '/About/figma-about-739-34090-icon3.svg',
  confidence: '/About/figma-about-739-34090-icon4.svg',
  joyfulLearning: '/About/figma-about-739-34090-icon5.svg',
} as const;

const values = [
  {
    label: 'Empathy',
    icon: valueAssets.empathy,
    background: 'bg-[#FFE9D5]',
    slot: { width: 186, height: 204 },
    frame: { left: -2.89, top: -3.94, width: 190.196, height: 174.335 },
    card: { width: 184.445, height: 168, rotation: -2 },
  },
  {
    label: 'Curiosity',
    icon: valueAssets.curiosity,
    background: 'bg-[#FFF7D6]',
    slot: { width: 181, height: 168 },
    frame: { left: -3.46, top: 6.25, width: 185.909, height: 167.298 },
    card: { width: 177.873, height: 158.206, rotation: 3 },
  },
  {
    label: 'Growth',
    icon: valueAssets.growth,
    background: 'bg-[#E8F5E4]',
    slot: { width: 180, height: 168 },
    frame: { left: -1.62, top: -7.28, width: 182.912, height: 176.488 },
    card: { width: 179.914, height: 173.375, rotation: -1 },
  },
  {
    label: 'Inclusivity',
    icon: valueAssets.inclusivity,
    background: 'bg-[#EDE8F5]',
    slot: { width: 179, height: 168 },
    frame: { left: -2.47, top: 10.21, width: 181.756, height: 161.451 },
    card: { width: 176.441, height: 155.388, rotation: 2 },
  },
  {
    label: 'Confidence',
    icon: valueAssets.confidence,
    background: 'bg-[#EBF5FF]',
    slot: { width: 184, height: 204 },
    frame: { left: -4.29, top: -5.5, width: 189.75, height: 177.253 },
    card: { width: 181.206, height: 168, rotation: -3 },
  },
  {
    label: 'Joyful Learning',
    icon: valueAssets.joyfulLearning,
    background: 'bg-[#FFF1EB]',
    slot: { width: 202, height: 168 },
    frame: { left: -1.96, top: 9.73, width: 198.823, height: 160.987 },
    card: { width: 194.807, height: 155.941, rotation: 1.5 },
  },
] as const;

function ValueCardContent({
  value,
  desktop = false,
}: {
  value: (typeof values)[number];
  desktop?: boolean;
}) {
  return (
    <article
      className={`flex flex-col items-center gap-3 rounded-3xl px-8 py-7 text-center shadow-[0_4px_3px_rgba(0,0,0,0.1),0_2px_2px_rgba(0,0,0,0.1)] ${value.background}`}
      style={
        desktop
          ? { width: value.card.width, height: value.card.height }
          : { transform: `rotate(${value.card.rotation}deg)` }
      }
    >
      <span className="flex size-11 items-center justify-center rounded-2xl bg-white">
        <Image src={value.icon} alt="" width={22} height={22} />
      </span>
      <span className="whitespace-nowrap font-nunito text-base font-bold leading-6 text-[#3D3A4E]">
        {value.label}
      </span>
    </article>
  );
}

function DesktopValueCards() {
  return (
    <div className="hidden h-[260px] w-full items-start justify-center 2xl:flex">
      <div className="flex h-[204px] items-center gap-5">
        {values.map((value) => (
          <div
            key={value.label}
            className="relative shrink-0"
            style={{ width: value.slot.width, height: value.slot.height }}
          >
            <div
              className="absolute flex items-center justify-center"
              style={{
                left: value.frame.left,
                top: value.frame.top,
                width: value.frame.width,
                height: value.frame.height,
              }}
            >
              <div style={{ transform: `rotate(${value.card.rotation}deg)` }}>
                <ValueCardContent value={value} desktop />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResponsiveValueCards() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 2xl:hidden">
      {values.map((value) => (
        <ValueCardContent key={value.label} value={value} />
      ))}
    </div>
  );
}

export function AboutValuesSection() {
  return (
    <section
      aria-labelledby="about-values-heading"
      className="bg-[#FFF9F5] px-5 py-16 sm:px-8 sm:py-20 md:px-12 md:py-24 lg:px-16 lg:py-28 xl:px-20 xl:py-30 2xl:h-[654px] 2xl:px-16 2xl:py-[120px]"
    >
      <div className="mx-auto flex max-w-[1202px] flex-col items-center gap-10 sm:gap-12 2xl:w-[1202px] 2xl:max-w-none 2xl:gap-12">
        <header className="flex flex-col items-center gap-4 text-center">
          <span className="rounded-xl border border-[#D4D6D7] bg-[#FFFDF8] px-2 py-1.5 font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#515B60]">
            Our Values
          </span>
          <h2
            id="about-values-heading"
            className="font-nunito text-[32px] font-semibold leading-[38px] tracking-[-0.48px] text-[#263238] sm:text-4xl sm:leading-11 xl:text-[44px] xl:leading-[52px] 2xl:w-[573px] 2xl:text-[48px] 2xl:leading-14"
          >
            What We Believe In
          </h2>
        </header>

        <DesktopValueCards />
        <ResponsiveValueCards />
      </div>
    </section>
  );
}
