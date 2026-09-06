import Image from 'next/image';

const assetBase = '/Home/figma-home-1183-11227-img';

const weeklyMask = {
  maskClip: 'no-clip',
  maskComposite: 'intersect',
  maskImage: `url('${assetBase}-image110.svg')`,
  maskMode: 'alpha',
  maskPosition: '26.294px 13.101px',
  maskRepeat: 'no-repeat',
  maskSize: '366.018px 336.594px',
  WebkitMaskImage: `url('${assetBase}-image110.svg')`,
  WebkitMaskPosition: '26.294px 13.101px',
  WebkitMaskRepeat: 'no-repeat',
  WebkitMaskSize: '366.018px 336.594px',
};

const activityMask = {
  maskClip: 'no-clip',
  maskComposite: 'intersect',
  maskImage: `url('${assetBase}-image109.svg')`,
  maskMode: 'alpha',
  maskPosition: '31.999px 130px',
  maskRepeat: 'no-repeat',
  maskSize: '389.828px 392.17px',
  WebkitMaskImage: `url('${assetBase}-image109.svg')`,
  WebkitMaskPosition: '31.999px 130px',
  WebkitMaskRepeat: 'no-repeat',
  WebkitMaskSize: '389.828px 392.17px',
};

const developmentMask = {
  maskClip: 'no-clip',
  maskComposite: 'intersect',
  maskImage: `url('${assetBase}-image110.svg')`,
  maskMode: 'alpha',
  maskPosition: '123.302px 158.101px',
  maskRepeat: 'no-repeat',
  maskSize: '366.018px 336.594px',
  WebkitMaskImage: `url('${assetBase}-image110.svg')`,
  WebkitMaskPosition: '123.302px 158.101px',
  WebkitMaskRepeat: 'no-repeat',
  WebkitMaskSize: '366.018px 336.594px',
};

const parentMask = {
  maskClip: 'no-clip',
  maskComposite: 'intersect',
  maskImage: `url('${assetBase}-image111.svg')`,
  maskMode: 'alpha',
  maskPosition: '17px 39px',
  maskRepeat: 'no-repeat',
  maskSize: '380.289px 430.558px',
  WebkitMaskImage: `url('${assetBase}-image111.svg')`,
  WebkitMaskPosition: '17px 39px',
  WebkitMaskRepeat: 'no-repeat',
  WebkitMaskSize: '380.289px 430.558px',
};

type BenefitCaptionProps = {
  className: string;
  color: string;
  contentWidth: number;
  description: string;
  title: string;
};

function BenefitCaption({
  className,
  color,
  contentWidth,
  description,
  title,
}: BenefitCaptionProps) {
  return (
    <article className={`absolute h-[282px] w-[422px] overflow-hidden ${className}`}>
      <div
        className="absolute left-0 top-[-265px] h-[547px] w-[422px] rounded-[249px]"
        style={{ backgroundColor: color }}
      />
      <div
        className="absolute left-1/2 top-[calc(50%-64px)] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3 text-center"
        style={{ width: contentWidth }}
      >
        <h3 className="whitespace-nowrap font-nunito text-xl font-medium leading-7 text-[#263238]">
          {title}
        </h3>
        <p className="font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#515B60]">
          {description}
        </p>
      </div>
    </article>
  );
}

function BenefitsHeading() {
  return (
    <header className="flex w-full items-start justify-between">
      <div className="flex flex-col items-start gap-4">
        <span className="rounded-xl border border-[#FAE1D9] bg-[#FCE9E3] px-2 py-1.5 font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#614840]">
          Feature
        </span>
        <h2 className="whitespace-nowrap font-nunito text-5xl font-semibold leading-14 tracking-[-0.48px] text-[#263238]">
          Designed to Make Every Week Easier
        </h2>
      </div>
      <p className="w-[571px] font-manrope text-base leading-6 tracking-[-0.176px] text-[#515B60]">
        From customized weekly developmental plans to expert OT guidance and evidence-based
        resources, you&apos;ll have everything you need to confidently support your child&apos;s
        growth every step of the way.
      </p>
    </header>
  );
}

function BenefitArtwork() {
  return (
    <div className="relative h-[533px] w-full">
      <div className="absolute left-[4.98px] top-3 size-[406px]" style={weeklyMask}>
        <Image
          src={`${assetBase}-image108.png`}
          alt=""
          fill
          sizes="406px"
          className="pointer-events-none object-cover"
        />
      </div>

      <div className="absolute left-[430px] top-[-104px] flex size-[502.361px] items-center justify-center">
        <div className="relative size-[469.089px] rotate-[4.22deg]" style={activityMask}>
          <Image
            src={`${assetBase}-image114.png`}
            alt=""
            fill
            sizes="469px"
            className="pointer-events-none object-cover"
          />
        </div>
      </div>

      <div className="absolute left-[801.98px] top-[-132px] size-[530px]" style={developmentMask}>
        <Image
          src={`${assetBase}-image113.png`}
          alt=""
          fill
          sizes="530px"
          className="pointer-events-none object-cover"
        />
      </div>

      <div className="absolute left-[1342px] top-[-14px] size-[416.606px]" style={parentMask}>
        <Image
          src={`${assetBase}-image112.png`}
          alt=""
          fill
          sizes="417px"
          className="pointer-events-none object-cover"
        />
      </div>

      <BenefitCaption
        className="left-0 top-[251px]"
        color="#FEEED7"
        contentWidth={293}
        title="Weekly Plan"
        description="One personalized developmental plan every week with daily activities, caregiver tips, and expert guidance tailored to your child."
      />
      <BenefitCaption
        className="left-[446px] top-[251px]"
        color="#FFE3E2"
        contentWidth={297}
        title="Activities"
        description="Therapist-designed activities with step-by-step instructions, developmental purpose, materials, and easy modifications."
      />
      <BenefitCaption
        className="left-[892px] top-[251px]"
        color="#D5E5E5"
        contentWidth={278}
        title="Development Tips"
        description={
          'Simple OT strategies that explain the "why" behind each activity and help you support your child\'s development with confidence.'
        }
      />
      <BenefitCaption
        className="left-[1338px] top-[251px]"
        color="#F7FEE7"
        contentWidth={294}
        title="Parent Education"
        description="Evidence-based articles, printable resources, milestone information, and practical guidance for everyday routines."
      />
    </div>
  );
}

function DesktopHomeBenefits() {
  return (
    <div className="relative mx-auto hidden h-[881px] max-w-[1920px] min-[1600px]:block">
      <div className="absolute left-1/2 top-40 w-[1760px] -translate-x-1/2">
        <BenefitsHeading />
        <div className="mt-20">
          <BenefitArtwork />
        </div>
      </div>
    </div>
  );
}

const responsiveBenefits = [
  {
    color: '#FEEED7',
    description:
      'One personalized developmental plan every week with daily activities, caregiver tips, and expert guidance tailored to your child.',
    image: `${assetBase}-image108.png`,
    title: 'Weekly Plan',
  },
  {
    color: '#FFE3E2',
    description:
      'Therapist-designed activities with step-by-step instructions, developmental purpose, materials, and easy modifications.',
    image: `${assetBase}-image114.png`,
    title: 'Activities',
  },
  {
    color: '#D5E5E5',
    description:
      'Simple OT strategies that explain the "why" behind each activity and help you support your child\'s development with confidence.',
    image: `${assetBase}-image113.png`,
    title: 'Development Tips',
  },
  {
    color: '#F7FEE7',
    description:
      'Evidence-based articles, printable resources, milestone information, and practical guidance for everyday routines.',
    image: `${assetBase}-image112.png`,
    title: 'Parent Education',
  },
];

function ResponsiveBenefitArtwork({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="absolute left-[4.98px] top-3 size-[406px]" style={weeklyMask}>
        <Image
          src={`${assetBase}-image108.png`}
          alt=""
          fill
          sizes="406px"
          className="pointer-events-none object-cover"
        />
      </div>
    );
  }

  if (index === 1) {
    return (
      <div className="absolute -left-4 top-[-104px] flex size-[502.361px] items-center justify-center">
        <div className="relative size-[469.089px] rotate-[4.22deg]" style={activityMask}>
          <Image
            src={`${assetBase}-image114.png`}
            alt=""
            fill
            sizes="469px"
            className="pointer-events-none object-cover"
          />
        </div>
      </div>
    );
  }

  if (index === 2) {
    return (
      <div className="absolute -left-[90px] top-[-132px] size-[530px]" style={developmentMask}>
        <Image
          src={`${assetBase}-image113.png`}
          alt=""
          fill
          sizes="530px"
          className="pointer-events-none object-cover"
        />
      </div>
    );
  }

  return (
    <div className="absolute left-1 top-[-14px] size-[416.606px]" style={parentMask}>
      <Image
        src={`${assetBase}-image112.png`}
        alt=""
        fill
        sizes="417px"
        className="pointer-events-none object-cover"
      />
    </div>
  );
}

function ResponsiveBenefitCard({
  benefit,
  index,
}: {
  benefit: (typeof responsiveBenefits)[number];
  index: number;
}) {
  const contentWidth = [293, 297, 278, 294][index];

  return (
    <article className="mx-auto h-[400px] w-[316px] max-[360px]:h-[362px] max-[360px]:w-[287px] sm:h-[533px] sm:w-[422px]">
      <div className="relative h-[533px] w-[422px] origin-top-left scale-75 max-[360px]:scale-[0.68] sm:scale-100">
        <ResponsiveBenefitArtwork index={index} />
        <BenefitCaption
          className="left-0 top-[251px]"
          color={benefit.color}
          contentWidth={contentWidth}
          title={benefit.title}
          description={benefit.description}
        />
      </div>
    </article>
  );
}

function ResponsiveHomeBenefits() {
  return (
    <div className="px-4 py-16 min-[1600px]:hidden sm:px-8 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-290">
        <div className="max-w-3xl lg:flex lg:max-w-none lg:items-start lg:justify-between lg:gap-12">
          <div>
            <span className="inline-flex rounded-xl border border-[#FAE1D9] bg-[#FCE9E3] px-2 py-1.5 font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#614840]">
              Feature
            </span>
            <h2 className="mt-4 font-nunito text-[clamp(28px,5vw,48px)] font-semibold leading-[1.16] tracking-[-0.48px] text-[#263238]">
              Designed to Make Every Week Easier
            </h2>
          </div>
          <p className="mt-4 sm:mt-6 max-w-[571px] font-manrope text-sm sm:text-base leading-6 tracking-[-0.176px] text-[#515B60]">
            From customized weekly developmental plans to expert OT guidance and evidence-based
            resources, you&apos;ll have everything you need to confidently support your child&apos;s
            growth every step of the way.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:mt-16 sm:grid-cols-2 sm:gap-8">
          {responsiveBenefits.map((benefit, index) => (
            <ResponsiveBenefitCard key={benefit.title} benefit={benefit} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function HomeBenefitsSection() {
  return (
    <section className="relative overflow-hidden bg-[#FDFDFC] text-[#263238]">
      <DesktopHomeBenefits />
      <ResponsiveHomeBenefits />
    </section>
  );
}
