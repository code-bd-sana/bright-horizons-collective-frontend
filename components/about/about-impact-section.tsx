import Image from 'next/image';

const impactStats = [
  {
    value: '12,400+',
    label: 'Families Supported',
    icon: '/About/figma-about-739-33918-icon.svg',
    background: 'bg-[#FFE9D5]',
  },
  {
    value: '3,800+',
    label: 'Activities Created',
    icon: '/About/figma-about-739-33918-icon1.svg',
    background: 'bg-[#E8F5E4]',
  },
  {
    value: '950+',
    label: 'Resources Available',
    icon: '/About/figma-about-739-33918-icon2.svg',
    background: 'bg-[#EDE8F5]',
  },
  {
    value: '98%',
    label: 'Member Satisfaction',
    icon: '/About/figma-about-739-33918-icon3.svg',
    background: 'bg-[#FFF7D6]',
  },
] as const;

function CloudDivider() {
  return (
    <div aria-hidden="true" className="relative h-12 overflow-hidden sm:h-14 md:h-16 xl:h-20">
      <div className="absolute inset-x-0 bottom-0 h-[64.43%]">
        <Image
          src="/About/figma-about-739-33918-vector.svg"
          alt=""
          fill
          sizes="100vw"
          className="pointer-events-none object-fill"
        />
      </div>
    </div>
  );
}

function ImpactStat({ stat }: { stat: (typeof impactStats)[number] }) {
  return (
    <article
      className={`flex min-h-[168px] flex-col items-center justify-center gap-3 rounded-2xl p-6 xl:h-[180px] xl:min-h-0 ${stat.background}`}
    >
      <span className="flex size-12 items-center justify-center rounded-2xl bg-white">
        <Image src={stat.icon} alt="" width={28} height={28} />
      </span>
      <span className="font-nunito text-[32px] font-semibold leading-10 text-[#3D3A4E] xl:text-4xl">
        {stat.value}
      </span>
      <span className="text-center font-manrope text-sm font-medium leading-6 tracking-[0.06em] text-[#8B8A9B] sm:text-base">
        {stat.label}
      </span>
    </article>
  );
}

export function AboutImpactSection() {
  return (
    <section aria-labelledby="about-impact-heading" className="bg-[#FDFDFC]">
      <CloudDivider />
      <div className="bg-[#EBF5FF] px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:px-16 xl:h-[654px] xl:px-16 xl:py-20">
        <div className="mx-auto flex max-w-[1202px] flex-col gap-10 rounded-3xl bg-[#FFF9F5] p-6 shadow-[0_20px_12.5px_rgba(0,0,0,0.1),0_8px_5px_rgba(0,0,0,0.1)] sm:p-10 md:gap-12 md:p-12 xl:gap-12 xl:p-14">
          <header className="flex flex-col items-center gap-4 text-center">
            <span className="rounded-xl border border-[#D4D6D7] bg-[#FFFDF8] px-2 py-1.5 font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#515B60]">
              Our Impact
            </span>
            <h2
              id="about-impact-heading"
              className="font-nunito text-[32px] font-semibold leading-[38px] tracking-[-0.48px] text-[#263238] sm:text-4xl sm:leading-11 xl:text-[48px] xl:leading-14"
            >
              Changing Lives, One Family at a Time
            </h2>
          </header>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-2 xl:grid-cols-4 xl:gap-6">
            {impactStats.map((stat) => (
              <ImpactStat key={stat.label} stat={stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
