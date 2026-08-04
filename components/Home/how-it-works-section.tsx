import Image from 'next/image';

const assetBase = '/Home/figma-home-1183-11776-img';

type Step = {
  number: string;
  title: string;
  description: string;
  descriptionWidth: number;
  titleWidth?: number;
  color: string;
  cardHeight: number;
  circleHeight: number;
  bodyHeight: number;
};

const steps: Step[] = [
  {
    number: '01',
    title: "Create child's profile",
    description:
      "Tell us about your child's age, interests, strengths, developmental goals, and daily routines.",
    descriptionWidth: 232,
    color: '#E9F1EE',
    cardHeight: 195,
    circleHeight: 141,
    bodyHeight: 147,
  },
  {
    number: '02',
    title: 'Receive your personalized weekly plan',
    description:
      "Every Monday you'll receive a customised plan with one activity each day, caregiver tips, and developmental guidance.",
    descriptionWidth: 270,
    titleWidth: 239,
    color: '#D2E3DC',
    cardHeight: 194,
    circleHeight: 146,
    bodyHeight: 146,
  },
  {
    number: '03',
    title: 'Explore the activity library',
    description: 'Search hundreds of therapist-designed activities anytime.',
    descriptionWidth: 232,
    color: '#BCD5CB',
    cardHeight: 195,
    circleHeight: 147,
    bodyHeight: 147,
  },
  {
    number: '04',
    title: 'Complete activities together',
    description: 'Save favourites, print resources, and build meaningful routines.',
    descriptionWidth: 232,
    color: '#D5E5E5',
    cardHeight: 194,
    circleHeight: 146,
    bodyHeight: 146,
  },
  {
    number: '05',
    title: 'Share feedback.',
    description: 'Tell us what worked, what your child enjoyed, or what was challenging.',
    descriptionWidth: 270,
    titleWidth: 239,
    color: '#ACCBCB',
    cardHeight: 194,
    circleHeight: 146,
    bodyHeight: 141,
  },
  {
    number: '06',
    title: 'Plans continue to improve',
    description:
      "Future recommendations become more personalized based on your feedback and your child's progress.",
    descriptionWidth: 232,
    color: '#82B1B2',
    cardHeight: 194,
    circleHeight: 146,
    bodyHeight: 146,
  },
];

function HowItWorksHeading() {
  return (
    <header className="flex h-[106px] flex-col items-center gap-4 text-center">
      <span className="rounded-xl border border-[#FAE1D9] bg-[#FCE9E3] px-2 py-1.5 font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#614840]">
        How It Works
      </span>
      <h2 className="whitespace-nowrap font-nunito text-5xl leading-14 font-semibold tracking-[-0.48px] text-[#263238]">
        Simple to start
      </h2>
    </header>
  );
}

function WorkflowStep({ step }: { step: Step }) {
  return (
    <article
      className="flex shrink-0 items-start gap-6 rounded-2xl p-6"
      style={{ backgroundColor: step.color, height: `${step.cardHeight}px` }}
    >
      <span
        className="flex shrink-0 items-center overflow-hidden rounded-[96px] bg-white px-3.5 font-nunito text-lg leading-6 font-medium tracking-[-0.27px] text-[#475467]"
        style={{ height: `${step.circleHeight}px` }}
      >
        {step.number}
      </span>
      <div
        className="flex shrink-0 flex-col items-start justify-between"
        style={{ height: `${step.bodyHeight}px`, width: `${step.descriptionWidth}px` }}
      >
        <h3
          className="font-nunito text-xl leading-7 font-medium text-[#101828]"
          style={{ width: `${step.titleWidth ?? step.descriptionWidth}px` }}
        >
          {step.title}
        </h3>
        <p className="font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#475467]">
          {step.description}
        </p>
      </div>
    </article>
  );
}

function ForwardConnector({ className }: { className: string }) {
  return (
    <div className={`relative h-[58px] w-[216px] shrink-0 ${className}`}>
      <Image
        src={`${assetBase}-vector1.svg`}
        alt=""
        fill
        sizes="216px"
        className="max-w-none"
        style={{ bottom: '-4.6%', left: 0, right: '-1.23%', top: '-0.86%' }}
      />
    </div>
  );
}

function ReverseConnector({ className }: { className: string }) {
  return (
    <div className={`absolute flex h-[58px] w-[216px] items-center justify-center ${className}`}>
      <div className="relative h-[58px] w-[216px] -scale-y-100 rotate-180">
        <Image
          src={`${assetBase}-vector3.svg`}
          alt=""
          fill
          sizes="216px"
          className="max-w-none"
          style={{ bottom: '-4.6%', left: 0, right: '-1.23%', top: '-0.86%' }}
        />
      </div>
    </div>
  );
}

function VerticalConnector() {
  return (
    <div className="absolute left-[1691px] top-[488px] flex h-[318px] w-[147px] items-center justify-center">
      <div className="relative h-[318px] w-[147px] -scale-y-100 rotate-180">
        <Image
          src={`${assetBase}-vector2.svg`}
          alt=""
          fill
          sizes="147px"
          className="max-w-none"
          style={{ bottom: '-0.84%', left: '-0.34%', right: '-1.81%', top: '-0.16%' }}
        />
      </div>
    </div>
  );
}

function DesktopWorkflow() {
  return (
    <div className="relative mx-auto hidden h-[1111px] max-w-[1920px] min-[1600px]:block">
      <div className="absolute left-1/2 top-40 -translate-x-1/2">
        <HowItWorksHeading />
      </div>

      <div className="absolute left-[158px] top-[346px] flex items-center gap-px">
        <WorkflowStep step={steps[0]} />
        <ForwardConnector className="" />
      </div>

      <div className="absolute left-[753px] top-[370px] flex items-center gap-px">
        <WorkflowStep step={steps[1]} />
        <ForwardConnector className="" />
      </div>

      <div className="absolute left-[1407px] top-[394px]">
        <WorkflowStep step={steps[2]} />
      </div>
      <VerticalConnector />

      <ReverseConnector className="left-[1096px] top-[777px]" />
      <ReverseConnector className="left-[463px] top-[801px]" />

      <div className="absolute left-[1313px] top-[709px]">
        <WorkflowStep step={steps[3]} />
      </div>
      <div className="absolute left-[680px] top-[733px]">
        <WorkflowStep step={steps[4]} />
      </div>
      <div className="absolute left-[85px] top-[757px]">
        <WorkflowStep step={steps[5]} />
      </div>
    </div>
  );
}

function CompactWorkflow() {
  return (
    <div className="mx-auto max-w-[718px] px-5 py-24 sm:px-8 sm:py-32 min-[1600px]:hidden">
      <HowItWorksHeading />
      <div className="mt-16 flex flex-col items-center gap-6">
        {steps.map((step) => (
          <WorkflowStep key={step.number} step={step} />
        ))}
      </div>
    </div>
  );
}

export function HowItWorksSection() {
  return (
    <section className="bg-[#FDFDFC]">
      <DesktopWorkflow />
      <CompactWorkflow />
    </section>
  );
}
