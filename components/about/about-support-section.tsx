import Image from 'next/image';

const supportAssets = {
  cloudMask: '/About/figma-about-739-33918-vector.svg',
  personalizedPlans: '/About/figma-about-739-34022-icon.svg',
  parentResources: '/About/figma-about-739-34022-icon1.svg',
  activityLibrary: '/About/figma-about-739-34022-icon2.svg',
  toySpotlight: '/About/figma-about-739-34022-icon3.svg',
  weeklyGuidance: '/About/figma-about-739-34022-icon4.svg',
  communitySupport: '/About/figma-about-739-34022-icon5.svg',
} as const;

const cloudMaskStyle = {
  maskImage: `url('${supportAssets.cloudMask}')`,
  maskPosition: 'center',
  maskRepeat: 'no-repeat',
  maskSize: '100% 100%',
  WebkitMaskImage: `url('${supportAssets.cloudMask}')`,
  WebkitMaskPosition: 'center',
  WebkitMaskRepeat: 'no-repeat',
  WebkitMaskSize: '100% 100%',
};

const supportItems = [
  {
    title: 'Personalized Plans',
    description: "Activities matched to your child's unique developmental stage and interests.",
    icon: supportAssets.personalizedPlans,
    iconBackground: 'bg-[#FFE9D5]',
    padding: 'p-7',
  },
  {
    title: 'Parent Resources',
    description: 'In-depth guides, webinars, and articles to support confident parenting.',
    icon: supportAssets.parentResources,
    iconBackground: 'bg-[#EDE8F5]',
    padding: 'p-7',
  },
  {
    title: 'Activity Library',
    description: 'Hundreds of curated activities updated each month by our expert team.',
    icon: supportAssets.activityLibrary,
    iconBackground: 'bg-[#E8F5E4]',
    padding: 'p-7',
  },
  {
    title: 'Toy Spotlight',
    description: 'Carefully reviewed toy picks that inspire creativity and open-ended play.',
    icon: supportAssets.toySpotlight,
    iconBackground: 'bg-[#FFF7D6]',
    padding: 'p-7',
  },
  {
    title: 'Weekly Guidance',
    description: "Gentle weekly prompts to keep you connected to your child's growth journey.",
    icon: supportAssets.weeklyGuidance,
    iconBackground: 'bg-[#EBF5FF]',
    padding: 'px-7 py-[21px]',
  },
  {
    title: 'Community Support',
    description: 'A warm, judgment-free community of parents walking the same beautiful path.',
    icon: supportAssets.communitySupport,
    iconBackground: 'bg-[#FFF1EB]',
    padding: 'p-7',
  },
] as const;

function StoryToSupportDivider() {
  return (
    <div
      aria-hidden="true"
      className="relative h-12 overflow-hidden bg-[#FDFDFC] sm:h-14 md:h-16 xl:h-20"
    >
      <div className="absolute inset-x-0 bottom-0 h-[64.43%] bg-[#E0F2FE]" style={cloudMaskStyle} />
    </div>
  );
}

function SupportCard({ item }: { item: (typeof supportItems)[number] }) {
  return (
    <article
      className={`flex min-h-[202px] flex-col items-start gap-3 rounded-3xl bg-white shadow-[0_4px_3px_rgba(0,0,0,0.1),0_2px_2px_rgba(0,0,0,0.1)] 2xl:h-[202px] 2xl:min-h-0 ${item.padding}`}
    >
      <span
        className={`flex size-12 items-center justify-center rounded-2xl ${item.iconBackground}`}
      >
        <Image src={item.icon} alt="" width={24} height={24} />
      </span>
      <h3 className="font-nunito text-xl font-bold leading-7 text-[#3D3A4E] 2xl:text-2xl">
        {item.title}
      </h3>
      <p className="font-manrope text-base leading-6 tracking-[-0.176px] text-[#515B60] 2xl:text-lg 2xl:leading-[27px] 2xl:tracking-[-0.27px]">
        {item.description}
      </p>
    </article>
  );
}

export function AboutSupportSection() {
  return (
    <section aria-labelledby="about-support-heading" className="bg-[#FDFDFC]">
      <StoryToSupportDivider />
      <div className="bg-[#E0F2FE] px-5 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-16 md:px-12 md:pb-24 lg:px-16 lg:pb-20 lg:pt-0 xl:px-20 xl:pb-24 2xl:h-[690px] 2xl:px-20 2xl:pb-[100px]">
        <div className="mx-auto flex max-w-[1761px] flex-col gap-10 sm:gap-12 2xl:gap-12">
          <header className="flex flex-col items-center gap-4 text-center">
            <span className="rounded-xl border border-[#D4D6D7] bg-[#FFFDF8] px-2 py-1.5 font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#515B60]">
              How We Help
            </span>
            <h2
              id="about-support-heading"
              className="font-nunito text-[32px] font-semibold leading-[38px] tracking-[-0.48px] text-[#263238] sm:text-4xl sm:leading-11 xl:text-[44px] xl:leading-[52px] 2xl:w-[842px] 2xl:text-[48px] 2xl:leading-14"
            >
              How We Support Your Family
            </h2>
          </header>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {supportItems.map((item) => (
              <SupportCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
