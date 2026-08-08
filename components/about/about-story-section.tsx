import Image from 'next/image';

const storyAssets = {
  photo: '/About/figma-about-739-33969-image108.png',
  photoMask: '/About/figma-about-739-33969-image107.svg',
} as const;

const desktopPhotoMaskStyle = {
  maskImage: `url('${storyAssets.photoMask}')`,
  maskPosition: '329.391px 15.012px',
  maskRepeat: 'no-repeat',
  maskSize: '710px 690.856px',
  WebkitMaskImage: `url('${storyAssets.photoMask}')`,
  WebkitMaskPosition: '329.391px 15.012px',
  WebkitMaskRepeat: 'no-repeat',
  WebkitMaskSize: '710px 690.856px',
};

const compactPhotoMaskStyle = {
  maskImage: `url('${storyAssets.photoMask}')`,
  maskPosition: 'center',
  maskRepeat: 'no-repeat',
  maskSize: '100% 100%',
  WebkitMaskImage: `url('${storyAssets.photoMask}')`,
  WebkitMaskPosition: 'center',
  WebkitMaskRepeat: 'no-repeat',
  WebkitMaskSize: '100% 100%',
};

const milestones = [
  {
    year: '2018',
    title: 'Our Beginning',
    description:
      'Two educators frustrated by one-size-fits-all approaches decided there had to be a better way.',
    background: 'bg-[#FFE9D5]',
  },
  {
    year: '2019',
    title: 'Why We Started',
    description:
      'We listened to hundreds of parents who felt lost navigating child development and wanted personalized guidance.',
    background: 'bg-[#E8F5E4]',
  },
  {
    year: '2021',
    title: 'Growing Together',
    description:
      'Our community grew to 5,000 families, each receiving curated, stage-appropriate activity plans.',
    background: 'bg-[#FFE9D5]',
  },
  {
    year: '2024',
    title: 'Our Future Vision',
    description:
      "Building the world's most trusted family development platform—caring, inclusive, and backed by research.",
    background: 'bg-[#E8F5E4]',
  },
] as const;

function DesktopStoryPhoto() {
  return (
    <div className="inline-grid shrink-0 grid-cols-[max-content] grid-rows-[max-content] place-items-start leading-none">
      <div
        className="col-start-1 row-start-1 relative -ml-[329.39px] -mt-[15.01px] h-[711.993px] w-[1154.707px]"
        style={desktopPhotoMaskStyle}
      >
        <Image
          src={storyAssets.photo}
          alt="Children learning and playing together"
          fill
          sizes="1155px"
          className="pointer-events-none object-cover"
        />
      </div>
    </div>
  );
}

function ResponsiveStoryPhoto() {
  return (
    <div
      className="relative mx-auto aspect-[710/690.856] w-full max-w-[560px]"
      style={compactPhotoMaskStyle}
    >
      <Image
        src={storyAssets.photo}
        alt="Children learning and playing together"
        fill
        sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1023px) 560px, 45vw"
        className="pointer-events-none object-cover object-[42%_center]"
      />
    </div>
  );
}

function StoryTimeline({ desktop = false }: { desktop?: boolean }) {
  return (
    <div
      className={`w-full border-l-2 border-dashed border-[#A8C5A0] ${desktop ? 'pl-[26px]' : 'pl-4 sm:pl-5'}`}
    >
      {milestones.map((milestone, index) => (
        <div
          key={milestone.year}
          className={`${desktop ? 'w-[705px] pl-4' : 'w-full pl-3.5 sm:pl-4'} ${index === 0 ? '' : desktop ? 'pt-8' : 'pt-6 sm:pt-8'}`}
        >
          <article className={`rounded-2xl p-5 ${milestone.background}`}>
            <p className="h-6 pt-1 font-nunito text-xs font-bold uppercase leading-4 tracking-[1.2px] text-[#F4845F]">
              {milestone.year}
            </p>
            <h3 className="h-8 pt-1 font-nunito text-lg font-semibold leading-7 text-[#3D3A4E]">
              {milestone.title}
            </h3>
            <p className="pt-1 font-manrope text-base leading-6 tracking-[-0.176px] text-[#737373]">
              {milestone.description}
            </p>
          </article>
        </div>
      ))}
    </div>
  );
}

function StoryContent({ desktop = false }: { desktop?: boolean }) {
  return (
    <div
      className={`flex flex-col ${desktop ? 'h-[902px] w-[731px] shrink-0 justify-center gap-12' : 'w-full max-w-[731px] gap-10'}`}
    >
      <header className="flex flex-col items-start gap-4">
        <span className="rounded-xl border border-[#FAE1D9] bg-[#FCE9E3] px-2 py-1.5 font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#614840]">
          Our Story
        </span>
        <h2
          className={`font-nunito font-semibold tracking-[-0.48px] text-[#263238] ${desktop ? 'text-[48px] leading-14' : 'text-[32px] leading-[38px] sm:text-4xl sm:leading-11'}`}
        >
          A Journey Built on Love &amp; Learning
        </h2>
      </header>

      <StoryTimeline desktop={desktop} />
    </div>
  );
}

export function AboutStorySection() {
  return (
    <section aria-label="Our Story" className="bg-[#FDFDFC]">
      <div className="relative mx-auto hidden aspect-[1920/1325] w-full max-w-[1920px] lg:block">
        <div
          className="relative h-[1325px] w-[1920px] origin-top-left"
          style={{ transform: 'scale(min(1, calc(100vw / 1920px)))' }}
        >
          <div className="flex h-[1325px] items-start justify-center px-20 py-[120px]">
            <div className="flex items-end gap-[131px]">
              <DesktopStoryPhoto />
              <StoryContent desktop />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[731px] flex-col gap-12 px-5 py-16 sm:px-8 sm:py-20 md:px-12 md:py-24 lg:hidden">
        <ResponsiveStoryPhoto />
        <StoryContent />
      </div>
    </section>
  );
}
