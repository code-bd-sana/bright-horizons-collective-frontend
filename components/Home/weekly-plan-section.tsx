import Image from 'next/image';
import Link from 'next/link';

const assetBase = '/Home/figma-home-1183-10956';

const activityBenefits = [
  'Step-by-step instructions',
  'Why this activity matters developmentally',
  'Materials: Yoga cards & open space',
  'Skill focus: Motor planning & balance',
  'Setup tips & safety notes',
];

type UpcomingActivityData = {
  day: string;
  date: string;
  title: string;
  description: string;
  artwork?: 'star' | 'target';
};

const upcomingActivities: UpcomingActivityData[] = [
  {
    day: 'TUE',
    date: 'Jul 21',
    title: 'Pom-Pom Rescue',
    description: 'Rescue scattered pom-poms using tongs and cups — a sneaky fine motor workout.',
  },
  {
    day: 'WED',
    date: 'Jul 22',
    title: 'Kitchen Helper Challenge',
    description: 'Rescue scattered pom-poms using tongs and cups — a sneaky fine motor workout.',
  },
  {
    day: 'THU',
    date: 'Jul 23',
    title: 'Nature Texture Hunt',
    description: 'Rescue scattered pom-poms using tongs and cups — a sneaky fine motor workout.',
  },
  {
    day: 'SUN',
    date: 'Jul 19',
    title: 'Pom-Pom Rescue',
    description: 'Rescue scattered pom-poms using tongs and cups — a sneaky fine motor workout.',
    artwork: 'target',
  },
];

function FigmaIcon({
  name,
  size,
  className = '',
}: {
  name: string;
  size: number;
  className?: string;
}) {
  return (
    <span className={`relative block shrink-0 ${className}`} style={{ width: size, height: size }}>
      <Image
        src={`${assetBase}-${name}.svg`}
        alt=""
        fill
        sizes={`${size}px`}
        className="object-contain"
      />
    </span>
  );
}

function ActivityArtwork({ variant = 'featured' }: { variant?: 'featured' | 'star' | 'target' }) {
  if (variant === 'target') {
    return (
      <span className="flex h-[60px] w-[56px] shrink-0 items-center justify-center rounded-[10px] bg-[#D2E3DC] font-manrope text-[22px] leading-[22px] text-[#263238]">
        🎯
      </span>
    );
  }

  if (variant === 'star') {
    return (
      <span className="relative block size-[60px] shrink-0">
        <Image src={`${assetBase}-img-star4.svg`} alt="" fill sizes="60px" />
      </span>
    );
  }

  return (
    <span className="relative block size-[60px] shrink-0">
      <Image src={`${assetBase}-img-star3.svg`} alt="" fill sizes="60px" />
      <span
        className="absolute left-[7px] top-[3px] h-[50px] w-[47px] overflow-hidden"
        style={{
          maskImage: `url('${assetBase}-img-image142.svg')`,
          maskPosition: '-4.578px -1.715px',
          maskRepeat: 'no-repeat',
          maskSize: '55.156px 53.015px',
        }}
      >
        <Image
          src={`${assetBase}-img-image143.png`}
          alt="Panda demonstrating a yoga pose"
          width={55}
          height={55}
          className="absolute left-[-5.13px] top-0 h-[55.17px] w-[54.69px] max-w-none"
        />
      </span>
    </span>
  );
}

function DurationBadge() {
  return (
    <span className="flex items-center gap-1 rounded-full border border-[#DCEEEE] px-[9px] py-[7px] font-manrope text-xs leading-[18px] text-[#607077]">
      <FigmaIcon name="img-icon2" size={12} />
      20 min
    </span>
  );
}

function DifficultyBadge() {
  return (
    <span className="rounded-full border border-[#DCEEEE] bg-[#E9F1EE] px-[9px] py-[7px] font-nunito text-xs font-medium leading-4 text-[#8FB9A8]">
      Easy
    </span>
  );
}

function UpcomingActivity({
  day,
  date,
  title,
  description,
  artwork = 'star',
}: UpcomingActivityData) {
  return (
    <article className="flex min-h-[106px] items-center rounded-[14px] border border-l-[3px] border-[#E9F1EE] py-[21px] pl-[23px] pr-[21px] max-lg:p-4">
      <div className="flex w-full items-start justify-between max-lg:flex-col max-lg:gap-4">
        <div className="flex min-w-0 items-start gap-6 max-sm:gap-3">
          <div className="flex w-8 shrink-0 flex-col items-center">
            <span className="font-nunito text-xs font-bold leading-4 tracking-[-0.18px] text-[#174A4D]">
              {day}
            </span>
            <span className="font-nunito text-[10px] font-medium uppercase leading-4 text-[#A8ADAF]">
              {date}
            </span>
          </div>
          <div className="flex min-w-0 items-start gap-4 max-sm:gap-3">
            <ActivityArtwork variant={artwork} />
            <div className="flex h-[60px] min-w-0 flex-col gap-2 max-lg:h-auto">
              <h4 className="font-nunito text-base font-bold leading-4 tracking-[-0.24px] text-[#174A4D]">
                {title}
              </h4>
              <p className="w-[281px] font-manrope text-xs leading-[18px] text-[#A8ADAF] max-lg:w-auto">
                {description}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 max-lg:ml-10 max-sm:ml-0">
          <DurationBadge />
          <DifficultyBadge />
        </div>
        <FigmaIcon name="img-icon3" size={16} className="rotate-90 max-lg:hidden" />
      </div>
    </article>
  );
}

function ExpandedActivity() {
  return (
    <article className="h-[336px] rounded-[14px] border border-l-[3px] border-[#2F7D7E] py-[21px] pl-[23px] pr-[21px] max-lg:h-auto max-lg:p-4">
      <div className="flex items-start justify-between py-4 max-lg:flex-col max-lg:gap-4">
        <div className="flex min-w-0 items-start gap-6 max-sm:gap-3">
          <div className="flex w-8 shrink-0 flex-col items-center">
            <span className="font-nunito text-xs font-bold leading-4 tracking-[-0.18px] text-[#174A4D]">
              MON
            </span>
            <span className="font-nunito text-[10px] font-medium uppercase leading-4 text-[#A8ADAF]">
              Jul 20
            </span>
          </div>
          <div className="flex min-w-0 items-start gap-4 max-sm:gap-3">
            <ActivityArtwork />
            <div className="flex h-[60px] min-w-0 flex-col gap-2 max-lg:h-auto">
              <h3 className="font-nunito text-base font-bold leading-4 tracking-[-0.24px] text-[#174A4D]">
                Animal Yoga Adventure
              </h3>
              <p className="w-[281px] font-manrope text-xs leading-[18px] text-[#A8ADAF] max-lg:w-auto">
                Move through fun animal poses to build balance and whole-body motor planning.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 max-lg:ml-10 max-sm:ml-0">
          <DurationBadge />
          <DifficultyBadge />
        </div>
        <FigmaIcon name="img-icon3" size={16} className="-rotate-90 max-lg:hidden" />
      </div>

      <div className="mt-1 flex items-start justify-between border-t border-[#D5E5E5] pt-6 max-lg:flex-col max-lg:gap-6">
        <div className="w-[294px] max-lg:w-full">
          <h4 className="font-nunito text-sm font-medium leading-5 tracking-[-0.084px] text-[#174A4D]">
            Each activity includes:
          </h4>
          <ul className="mt-4 space-y-2">
            {activityBenefits.map((benefit) => (
              <li
                key={benefit}
                className="flex items-start gap-[10px] font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#263238]"
              >
                <span className="mt-px flex size-[18px] shrink-0 items-center justify-center rounded-full bg-[#DCEEEE]">
                  <FigmaIcon name="img-icon4" size={11} />
                </span>
                <span className="max-lg:whitespace-normal">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-[210px] rounded-[14px] bg-[#F0F8F5] p-5 max-lg:w-full">
          <h4 className="font-nunito text-sm font-semibold leading-5 tracking-[-0.084px] text-[#2F7D7E]">
            Modifications preview:
          </h4>
          <div className="mt-4 space-y-2 font-manrope text-xs leading-[18px] text-[#263238]">
            <p>
              <span className="text-[#2F7D7E]">Easier: </span>Reduce to 2 poses and demonstrate each
              one slowly
            </p>
            <p>
              <span className="text-[#2F7D7E]">Harder: </span>Hold each pose for 5–10 seconds before
              moving on
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

function FeedbackPanel({ className = '' }: { className?: string }) {
  const feedback = [
    ['❤️', 'Loved it'],
    ['👍', 'Went well'],
    ['⏭️', 'Skipped'],
    ['⭐', "Child's favourite"],
    ['😓', 'Too difficult'],
    ['🤷', 'Not interested'],
  ];

  return (
    <aside
      className={`flex flex-col gap-8 rounded-3xl border border-[#E8EBE8] bg-white p-8 shadow-sm ${className}`}
    >
      <div className="flex flex-wrap justify-center gap-[5px]">
        {feedback.map(([emoji, label], index) => (
          <span
            key={label}
            className={`flex items-center gap-1 rounded-full border px-[9px] py-[7px] font-nunito text-xs font-medium leading-4 text-[#263238] ${index === 0 ? 'border-[#FCE9E3] bg-[#F7D3C5]' : 'border-[#D4D6D7] bg-white'}`}
          >
            <span className="font-manrope text-[14.4px] font-semibold leading-[14.4px]">
              {emoji}
            </span>
            {label}
          </span>
        ))}
      </div>
      <div className="h-[82px] w-full rounded-xl border border-[#D8DDD9] bg-white px-[15px] py-[11px] font-manrope text-xs leading-[18px] text-[#263238]/50">
        Add a note about this activity...
      </div>
    </aside>
  );
}

function DashboardTabs({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex h-[98px] w-[557px] flex-col items-start rounded-[20px] border border-white bg-[#D5E5E5] p-4 shadow-[0_7px_8px_rgba(174,171,163,0.1),0_30px_15px_rgba(174,171,163,0.09),0_67px_20px_rgba(174,171,163,0.05),0_119px_24px_rgba(174,171,163,0.01)] ${className}`}
    >
      <div className="flex w-full shrink-0 items-center gap-1">
        <div className="flex shrink-0 items-center gap-[10px] rounded-[16px] bg-white px-2 py-1.5">
          <FigmaIcon name="img-icon" size={22} />
          <span className="shrink-0 whitespace-nowrap px-1 font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-[#2F7D7E]">
            Weekly Plans
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-[10px] px-2 py-1.5">
          <FigmaIcon name="img-icon1" size={22} />
          <span className="shrink-0 whitespace-nowrap px-1 font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-[#7D8488]">
            Activity Library
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-[10px] px-2 py-1.5">
          <FigmaIcon name="img-vector" size={17.424} className="scale-[1.1052]" />
          <span className="shrink-0 whitespace-nowrap px-1 font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-[#7D8488]">
            Direct OT Messaging
          </span>
        </div>
      </div>
    </div>
  );
}

function DesktopWeeklyPlan() {
  return (
    <div className="relative mx-auto hidden h-[1401px] max-w-[1920px] min-[1600px]:block">
      <Image
        src={`${assetBase}-img-union.svg`}
        alt=""
        width={2140}
        height={502}
        className="pointer-events-none absolute left-1/2 top-[-219.33px] max-w-none -translate-x-1/2"
      />

      <div className="pointer-events-none absolute left-[calc(50%+501px)] top-[903px] h-[497px] w-[547px] overflow-hidden">
        <Image
          src={`${assetBase}-img-image113.png`}
          alt=""
          fill
          sizes="547px"
          className="object-cover object-top"
        />
      </div>

      <Image
        src={`${assetBase}-img-image112.png`}
        alt=""
        width={223}
        height={223}
        className="pointer-events-none absolute left-[calc(50%-825px)] top-[178px] size-[223px] object-contain"
      />

      <div className="absolute left-[calc(50%-583px)] right-20 top-[299px] flex items-start justify-between">
        <div className="flex flex-col gap-4">
          <h2 className="whitespace-nowrap font-nunito text-5xl font-semibold leading-14 tracking-[-0.48px] text-[#263238]">
            Guided play, delivered weekly
          </h2>
          <Link
            href="#membership"
            className="inline-flex min-h-10 w-fit items-center gap-1 rounded-full py-2 font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-[#174A4D]"
          >
            <span className="px-1">Learn More About Weekly Plans</span>
            <FigmaIcon name="img-vector1" size={16} />
          </Link>
        </div>
        <p className="w-[571px] font-manrope text-base leading-6 tracking-[-0.176px] text-[#515B60]">
          Receive personalized weekly plans designed around your child&apos;s unique strengths,
          interests, routines, and developmental goals. Parents can choose the day of the week they
          would like their new plan to become available.
        </p>
      </div>

      <div className="absolute left-1/2 top-[485px] h-[916px] w-[1166px] -translate-x-1/2">
        <DashboardTabs className="absolute left-[56px] top-0" />

        <div className="absolute left-0 top-[62px] h-[854px] w-[1166px] overflow-hidden rounded-3xl border border-[#E8EBE8] bg-white shadow-sm">
          <div className="absolute left-[55px] top-[55px] flex items-center gap-20">
            <div className="flex w-[131px] flex-col gap-2">
              <span className="font-nunito text-xs font-medium uppercase leading-4 text-[#A8ADAF]">
                Week of
              </span>
              <span className="font-nunito text-lg font-bold leading-6 tracking-[-0.27px] text-[#174A4D]">
                July 20 – July 26
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-nunito text-xs font-medium uppercase leading-4 text-[#A8ADAF]">
                Weekly Focus
              </span>
              <span className="font-nunito text-lg font-bold leading-6 tracking-[-0.27px] text-[#174A4D]">
                Bilateral Coordination &amp; Motor Planning
              </span>
            </div>
          </div>

          <div className="absolute left-[834px] top-[23px] h-[297px] w-[307px]">
            <Image src={`${assetBase}-img-star1.svg`} alt="" fill sizes="307px" />
            <span className="absolute left-[100px] top-[90px] font-manrope text-[10px] font-extrabold uppercase leading-4 tracking-[0.84px] text-[#C2917F]">
              💡 Tip of the week
            </span>
            <p className="absolute left-1/2 top-[114px] w-[170px] -translate-x-1/2 text-center font-[family-name:var(--font-lora)] text-xs italic leading-6 text-[#493630]">
              &quot;Try pairing today&apos;s activity with a favourite song to build a consistent
              routine your child can look forward to.&quot;
            </p>
          </div>

          <div className="absolute left-[55px] top-[151px] flex w-[730px] flex-col gap-5">
            <ExpandedActivity />
            {upcomingActivities.map((activity) => (
              <UpcomingActivity
                key={`${activity.day}-${activity.date}-${activity.title}`}
                {...activity}
              />
            ))}
          </div>

          <FeedbackPanel className="absolute left-[812px] top-[344px] h-[556px] w-[307px]" />
          <div className="pointer-events-none absolute bottom-0 left-0 z-20 h-[232px] w-full bg-linear-to-b from-white/0 from-[29.532%] to-white to-[81.871%]" />
        </div>
      </div>
    </div>
  );
}

function ResponsiveWeeklyPlan() {
  return (
    <div className="relative px-5 pb-24 pt-44 min-[1600px]:hidden sm:px-8 sm:pt-52">
      <Image
        src={`${assetBase}-img-union.svg`}
        alt=""
        width={2140}
        height={503}
        className="pointer-events-none absolute left-1/2 top-[-120px] h-[330px] w-[1400px] max-w-none -translate-x-1/2"
      />
      <div className="relative mx-auto max-w-290">
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_520px]">
          <div className="relative pl-0 sm:pl-36">
            <Image
              src={`${assetBase}-img-image112.png`}
              alt=""
              width={120}
              height={120}
              className="absolute left-0 top-[-24px] hidden size-28 object-contain sm:block"
            />
            <h2 className="font-nunito text-[clamp(34px,5vw,48px)] font-semibold leading-[1.16] tracking-[-0.48px]">
              Guided play, delivered weekly
            </h2>
            <Link
              href="#membership"
              className="mt-4 inline-flex items-center gap-2 font-nunito text-sm font-medium text-[#174A4D]"
            >
              Learn More About Weekly Plans <FigmaIcon name="img-vector1" size={16} />
            </Link>
          </div>
          <p className="font-manrope text-base leading-6 text-[#515B60]">
            Receive personalized weekly plans designed around your child&apos;s unique strengths,
            interests, routines, and developmental goals. Parents can choose the day of the week
            they would like their new plan to become available.
          </p>
        </div>

        <div className="relative mt-16">
          <div className="max-w-full overflow-x-auto pb-0">
            <DashboardTabs />
          </div>
          <div className="relative -mt-9 rounded-3xl border border-[#E8EBE8] bg-white p-5 pt-16 shadow-sm sm:p-8 sm:pt-20">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <p className="font-nunito text-xs uppercase text-[#A8ADAF]">Week of</p>
                <p className="mt-2 font-nunito text-lg font-bold text-[#174A4D]">
                  July 20 – July 26
                </p>
              </div>
              <div>
                <p className="font-nunito text-xs uppercase text-[#A8ADAF]">Weekly Focus</p>
                <p className="mt-2 font-nunito text-lg font-bold text-[#174A4D]">
                  Bilateral Coordination &amp; Motor Planning
                </p>
              </div>
            </div>

            <div className="mt-8 overflow-x-auto max-lg:overflow-visible">
              <div className="min-w-[730px] max-lg:min-w-0">
                <ExpandedActivity />
              </div>
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_307px]">
              <div className="space-y-5 overflow-hidden">
                {upcomingActivities.slice(0, 2).map((activity) => (
                  <div
                    key={`${activity.day}-${activity.date}-${activity.title}`}
                    className="min-w-[730px] max-lg:min-w-0"
                  >
                    <UpcomingActivity {...activity} />
                  </div>
                ))}
              </div>
              <FeedbackPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WeeklyPlanSection() {
  return (
    <section id="weekly-plans" className="relative overflow-hidden bg-[#FDFDFC] text-[#263238]">
      <DesktopWeeklyPlan />
      <ResponsiveWeeklyPlan />
    </section>
  );
}
