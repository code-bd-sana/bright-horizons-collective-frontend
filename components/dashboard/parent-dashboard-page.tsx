import Image from 'next/image';
import Link from 'next/link';
import { Check, ChevronRight, Clock3 } from 'lucide-react';

const activityMask = '/Home/figma-parent-dashboard-activity-mask.svg';
const recommendationMask = '/Home/figma-parent-dashboard-recommendation-mask.svg';
const yogaMask = '/Home/figma-parent-dashboard-star-mask.svg';

const days = [
  { label: 'Mon', state: 'complete' },
  { label: 'Tue', state: 'complete' },
  { label: 'Wed', state: 'current' },
  { label: 'Thu', state: 'upcoming' },
  { label: 'Fri', state: 'upcoming' },
  { label: 'Sat', state: 'upcoming' },
  { label: 'Sun', state: 'upcoming' },
] as const;

const progressItems = [
  { label: 'Fine Motor', value: '68%', color: '#2f7d7e' },
  { label: 'Bilateral Coordination', value: '54%', color: '#6babb0' },
  { label: 'Sensory Processing', value: '72%', color: '#8fb9a8' },
  { label: 'Self-Regulation', value: '45%', color: '#f2b59f' },
];

const recentActivities = [
  {
    title: 'Sensory Rice Bin Exploration',
    detail: 'Sensory Processing · 20 min',
    image: '/Home/figma-parent-dashboard-rice-bin.png',
  },
  {
    title: 'Finger Painting with Pudding',
    detail: 'Fine Motor · 15 min',
    image: '/Home/figma-parent-dashboard-finger-painting.png',
  },
  {
    title: 'Water Pouring Station',
    detail: 'Coordination · 20 min',
    image: '/Home/figma-parent-dashboard-water-pouring.png',
  },
  {
    title: 'Sensory Rice Bin Exploration',
    detail: 'Sensory Processing · 20 min',
    image: '/Home/figma-parent-dashboard-rice-bin.png',
  },
];

const recommendations = [
  {
    type: 'Activity',
    title: 'Lacing Cards Challenge',
    description: 'Build pincer grip and patience through guided lacing.',
    image: '/Home/figma-parent-dashboard-lacing-cards.png',
    tone: 'bg-[#e0f0e9] border-[#dceeee]',
  },
  {
    type: 'Article',
    title: 'Why Sensory Play Matters',
    description: 'Evidence-based guide to sensory integration for toddlers.',
    image: '/Home/figma-parent-dashboard-sensory-play.png',
    tone: 'bg-[#fce9e3] border-[#fce9e3]',
  },
];

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <section
      className={`rounded-2xl border border-[#e8ebe8] bg-[#fffdf8] p-8 shadow-[0_1px_2px_rgba(0,0,0,0.05)] ${className}`}
    >
      {children}
    </section>
  );
}

function ArrowLink({
  children,
  href,
  full = false,
}: {
  children: React.ReactNode;
  href: string;
  full?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`${full ? 'flex w-full' : 'inline-flex'} h-10 items-center justify-center gap-1 rounded-full border border-[#d8ddd9] px-3 py-2 font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-[#2f7d7e] transition-colors hover:bg-[#f6fbfa]`}
    >
      {children}
      <Image src="/Home/figma-parent-dashboard-progress-arrow.svg" alt="" width={16} height={16} />
    </Link>
  );
}

function WelcomeBanner() {
  const stats = [
    { icon: '/Home/figma-parent-dashboard-icon-fire.svg', value: '6', label: 'Week streak' },
    { icon: '/Home/figma-parent-dashboard-icon-star.svg', value: '42', label: 'Activities done' },
    {
      icon: '/Home/figma-parent-dashboard-icon-bookmark.svg',
      value: '8',
      label: 'Resources saved',
    },
  ];

  return (
    <section className="relative h-[340px] overflow-hidden rounded-2xl border border-[#fce9e3] bg-[#fffdf8] p-8">
      <Image
        src="/Home/figma-parent-dashboard-hero-background.svg"
        alt=""
        width={1893}
        height={1454}
        className="pointer-events-none absolute -left-8 -top-[544px] max-w-none"
      />
      <Image
        src="/Home/figma-parent-dashboard-hero-wave.svg"
        alt=""
        width={358}
        height={344}
        className="pointer-events-none absolute left-[509px] -top-[235px] max-w-none rotate-[-131.21deg]"
      />
      <Image
        src="/Home/figma-parent-dashboard-hero-squiggle-right.svg"
        alt=""
        width={358}
        height={344}
        className="pointer-events-none absolute -right-[66px] top-[138px] max-w-none rotate-[-34.13deg]"
      />
      <Image
        src="/Home/figma-parent-dashboard-hero-squiggle-left.svg"
        alt=""
        width={358}
        height={344}
        className="pointer-events-none absolute -bottom-[56px] -left-[120px] max-w-none rotate-[-33.09deg]"
      />

      <div className="relative z-10 flex h-full flex-col justify-between min-[1050px]:flex-row">
        <div className="max-w-[442px]">
          <p className="font-manrope text-sm font-medium leading-[22px] tracking-[0.084px] text-[#515b60]">
            Good morning · Sunday, July 20, 2026
          </p>
          <h1 className="mt-2 font-nunito text-[40px] font-semibold leading-12 tracking-[-0.4px] text-[#2f7d7e]">
            Welcome back, Sarah!
          </h1>
          <p className="mt-3 max-w-[442px] font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#7d8488]">
            Emma is making wonderful progress. Let&apos;s continue this week&apos;s Fine Motor
            Development plan!
          </p>
          <Link
            href="/dashboard/weekly-plans"
            className="mt-6 inline-flex h-10 items-center gap-1 rounded-full border border-[#accbcb] bg-[#2f7d7e] px-3 py-2 font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-white shadow-[inset_0_-6px_2px_rgba(255,255,255,0.07)]"
          >
            View Weekly Plan
            <Image
              src="/Home/figma-parent-dashboard-arrow-right.svg"
              alt=""
              width={16}
              height={16}
            />
          </Link>
        </div>

        <div className="mt-6 flex w-full max-w-[569px] gap-4 min-[1050px]:mt-0">
          {stats.map((stat) => (
            <article
              key={stat.label}
              className="flex h-[82px] min-w-0 flex-1 items-center justify-center gap-3 rounded-2xl border border-white bg-transparent p-4"
            >
              <span className="grid size-8 shrink-0 place-items-center overflow-hidden rounded-lg border border-[#fafafa] bg-white">
                <Image src={stat.icon} alt="" width={16} height={16} />
              </span>
              <span className="min-w-0">
                <span className="block font-nunito text-2xl font-medium leading-8 text-[#272f3a]">
                  {stat.value}
                </span>
                <span className="block whitespace-nowrap font-manrope text-xs font-medium leading-[18px] tracking-[0.48px] text-[#515b60]">
                  {stat.label}
                </span>
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TodayActivityCard() {
  return (
    <Card className="flex h-[617px] flex-col gap-6">
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-nunito text-xs font-medium leading-4 text-[#2f7d7e]">
              Today&apos;s Activity · Mon, Jul 20
            </p>
            <h2 className="mt-1 font-nunito text-2xl font-medium leading-8 text-[#263238]">
              Animal Yoga Adventure
            </h2>
          </div>
          <ArrowLink href="/explore/activities/bubble-wrap-stomp-counting">
            Start Activity
          </ArrowLink>
        </div>
        <p className="max-w-[404px] font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#515b60]">
          Move through fun animal poses to build balance and whole-body motor planning. Perfect for
          an energetic start to the week.
        </p>
      </div>

      <div className="relative h-[329px] w-full overflow-hidden rounded-2xl bg-[#d2e3dc]">
        <div
          className="absolute left-1/2 top-1/2 h-[323px] w-[331px] -translate-x-1/2 -translate-y-1/2"
          style={{
            WebkitMaskImage: `url(${yogaMask})`,
            maskImage: `url(${yogaMask})`,
            WebkitMaskPosition: 'center',
            maskPosition: 'center',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskSize: '100% 100%',
            maskSize: '100% 100%',
          }}
        >
          <Image
            src="/Home/figma-parent-dashboard-yoga.png"
            alt="Panda practicing an animal yoga pose"
            fill
            sizes="331px"
            className="object-cover"
            style={{ objectPosition: '50% 58%' }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1.25">
          <span className="rounded-full border border-[#dceeee] bg-[#e0f0e9] px-2.25 py-1.75 font-nunito text-xs font-medium leading-4 text-[#263238]">
            Easy
          </span>
          <span className="flex items-center gap-1 px-2 py-1.5 font-manrope text-xs leading-[18px] text-[#607077]">
            <Clock3 aria-hidden="true" className="size-3 stroke-[1.5]" />
            20 min
          </span>
        </div>
        <div className="flex flex-wrap gap-1.25">
          <span className="rounded-full border border-[#accbcb] bg-white px-2.25 py-1.75 font-nunito text-xs font-medium leading-4 text-[#2f7d7e]">
            Yoga cards &amp; open space
          </span>
          <span className="rounded-full border border-[#accbcb] bg-white px-2.25 py-1.75 font-nunito text-xs font-medium leading-4 text-[#2f7d7e]">
            Motor planning &amp; balance
          </span>
        </div>
      </div>
    </Card>
  );
}

function ProgressCard() {
  return (
    <Card className="flex h-[617px] flex-col">
      <p className="font-nunito text-xs font-medium leading-4 text-[#2f7d7e]">
        Development Tracking
      </p>
      <h2 className="mt-1 font-nunito text-2xl font-medium leading-8 text-[#263238]">
        Emma&apos;s Progress
      </h2>

      <div className="relative mx-auto mt-6 size-[152px]" aria-label="Development progress chart">
        <Image
          src="/Home/figma-parent-dashboard-progress-top-right.svg"
          alt=""
          width={88}
          height={76}
          className="absolute left-[64px] top-0"
        />
        <Image
          src="/Home/figma-parent-dashboard-progress-top-left.svg"
          alt=""
          width={66}
          height={76}
          className="absolute left-0 top-[2px]"
        />
        <Image
          src="/Home/figma-parent-dashboard-progress-bottom-left.svg"
          alt=""
          width={100}
          height={73}
          className="absolute left-0 top-[79px]"
        />
        <Image
          src="/Home/figma-parent-dashboard-progress-bottom-right.svg"
          alt=""
          width={58}
          height={68}
          className="absolute left-[94px] top-[79px]"
        />
      </div>

      <div className="mt-6 space-y-2">
        {progressItems.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between font-nunito text-xs font-medium leading-4 text-[#263238]"
          >
            <span className="flex items-center gap-2">
              <span className="size-2.5 rounded-full" style={{ backgroundColor: item.color }} />
              {item.label}
            </span>
            <span className="font-bold" style={{ color: item.color }}>
              {item.value}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <ArrowLink href="/dashboard/child-profiles/emma" full>
          View Progress Report
        </ArrowLink>
      </div>
    </Card>
  );
}

function WeeklyPlanCard() {
  return (
    <Card className="flex h-[617px] flex-col">
      <p className="font-nunito text-xs font-medium leading-4 text-[#2f7d7e]">
        Week 3 · July 20–26
      </p>
      <h2 className="mt-1 font-nunito text-2xl font-medium leading-8 text-[#263238]">
        This Week&apos;s Plan
      </h2>

      <div className="mt-6 rounded-xl bg-[#fce9e3] px-3 py-2">
        <p className="font-nunito text-xs font-medium leading-4 text-[#515b60]">Weekly Focus</p>
        <p className="mt-1 font-nunito text-lg font-medium leading-6 tracking-[-0.27px] text-[#493630]">
          Bilateral Coordination &amp; Motor Planning
        </p>
      </div>

      <div className="mt-6">
        <p className="font-nunito text-xs font-medium leading-4 text-[#2f7d7e]">Daily activities</p>
        <div className="mt-3 flex items-center justify-between">
          {days.map((day) => {
            const active = day.state !== 'upcoming';
            return (
              <div key={day.label} className="flex w-[30px] flex-col items-center gap-1">
                <span
                  className={`grid size-[30px] place-items-center rounded-full border-2 ${
                    active ? 'border-[#2f7d7e] bg-[#2f7d7e]' : 'border-[#d4d6d7] bg-[#d4d6d7]'
                  }`}
                >
                  {day.state === 'complete' ? (
                    <Check aria-hidden="true" className="size-5 text-white stroke-[2.5]" />
                  ) : (
                    <span className="size-2.5 rounded-full bg-white" />
                  )}
                </span>
                <span
                  className={`font-manrope text-xs font-medium leading-[18px] tracking-[0.48px] ${active ? 'text-[#2f7d7e]' : 'text-[#7d8488]'}`}
                >
                  {day.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between font-nunito text-xs font-medium leading-4">
          <span className="text-[#263238]">2 of 7 complete</span>
          <span className="text-[#2f7d7e]">28%</span>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#eaecee]">
          <span className="block h-full w-[28%] bg-[#2f7d7e]" />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 text-center">
        <div className="rounded-2xl bg-[#f4f5f4] px-4 py-3">
          <p className="font-nunito text-2xl font-medium leading-8 text-[#263238]">5</p>
          <p className="mt-1 font-nunito text-xs font-medium leading-4 text-[#7d8488]">Remaining</p>
        </div>
        <div className="rounded-2xl bg-[#f4f5f4] px-4 py-3">
          <p className="font-nunito text-2xl font-medium leading-8 text-[#2f7d7e]">2</p>
          <p className="mt-1 font-nunito text-xs font-medium leading-4 text-[#7d8488]">Completed</p>
        </div>
      </div>

      <div className="mt-6">
        <ArrowLink href="/dashboard/weekly-plans" full>
          View Full Weekly Plan
        </ArrowLink>
      </div>
    </Card>
  );
}

function RecentActivityCard() {
  return (
    <Card className="h-[444px]">
      <div className="flex items-center justify-between">
        <h2 className="font-nunito text-2xl font-medium leading-8 text-[#263238]">
          Recent activity
        </h2>
        <Link
          href="/dashboard/child-profiles/emma"
          className="inline-flex items-center font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-[#2f7d7e]"
        >
          View all <ChevronRight aria-hidden="true" className="size-4 stroke-[1.5]" />
        </Link>
      </div>
      <div className="mt-6 space-y-5">
        {recentActivities.map((activity, index) => (
          <article
            key={`${activity.title}-${index}`}
            className="flex items-start justify-between gap-4"
          >
            <div className="flex min-w-0 items-center gap-2">
              <span
                className="relative size-[54px] shrink-0"
                style={{
                  WebkitMaskImage: `url(${activityMask})`,
                  maskImage: `url(${activityMask})`,
                  WebkitMaskPosition: 'center',
                  maskPosition: 'center',
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat',
                  WebkitMaskSize: '100% 100%',
                  maskSize: '100% 100%',
                }}
              >
                <Image src={activity.image} alt="" fill sizes="54px" className="object-cover" />
              </span>
              <span className="min-w-0">
                <span className="block truncate font-nunito text-lg font-medium leading-6 tracking-[-0.27px] text-[#263238]">
                  {activity.title}
                </span>
                <span className="mt-2 block font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#515b60]">
                  {activity.detail}
                </span>
              </span>
            </div>
            <span className="flex shrink-0 items-center gap-1 font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#2f7d7e]">
              <Check aria-hidden="true" className="size-4 stroke-[2]" /> Done
            </span>
          </article>
        ))}
      </div>
    </Card>
  );
}

function MessagesCard() {
  const messages = [
    {
      initials: 'OT',
      name: 'OT Support Team',
      message:
        "Great job this week! Emma's progress on the lacing activities has been wonderful...",
      time: '9:14 am',
      tone: 'bg-[#dceeee] text-[#2f7d7e]',
    },
    {
      initials: 'BH',
      name: 'Bright Horizons',
      message:
        "Your weekly plan for July 20–26 is ready. Click to explore this week's activities...",
      time: 'Yesterday',
      tone: 'bg-[#fce9e3] text-[#b16262]',
    },
  ];

  return (
    <Card className="flex h-[444px] flex-col">
      <div className="flex items-center justify-between">
        <h2 className="font-nunito text-2xl font-medium leading-8 text-[#263238]">Messages</h2>
        <span className="rounded-full bg-[#2f7d7e] px-3 py-1 font-nunito text-xs font-medium leading-4 text-white">
          2 New
        </span>
      </div>
      <div className="mt-6 space-y-5">
        {messages.map((message) => (
          <article key={message.name} className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 gap-2">
              <span
                className={`grid size-[54px] shrink-0 place-items-center rounded-full font-nunito text-lg font-medium ${message.tone}`}
              >
                {message.initials}
              </span>
              <span className="min-w-0">
                <span className="block font-nunito text-lg font-medium leading-6 tracking-[-0.27px] text-[#263238]">
                  {message.name}
                </span>
                <span className="mt-2 block font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#515b60]">
                  {message.message}
                </span>
              </span>
            </div>
            <span className="shrink-0 font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#7d8488]">
              {message.time}
            </span>
          </article>
        ))}
      </div>
      <div className="mt-auto">
        <ArrowLink href="/dashboard/messages" full>
          Open Inbox
        </ArrowLink>
      </div>
    </Card>
  );
}

function RecommendationsCard() {
  return (
    <Card className="h-[444px]">
      <p className="font-nunito text-xs font-medium leading-4 text-[#2f7d7e]">
        Personalised For Emma
      </p>
      <h2 className="mt-1 font-nunito text-2xl font-medium leading-8 text-[#263238]">
        Recommended For You
      </h2>
      <div className="mt-6 space-y-6">
        {recommendations.map((item) => (
          <article key={item.title} className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 gap-4">
              <span
                className="relative mt-1 size-[119px] shrink-0"
                style={{
                  WebkitMaskImage: `url(${recommendationMask})`,
                  maskImage: `url(${recommendationMask})`,
                  WebkitMaskPosition: 'center',
                  maskPosition: 'center',
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat',
                  WebkitMaskSize: '100% 100%',
                  maskSize: '100% 100%',
                }}
              >
                <Image src={item.image} alt="" fill sizes="119px" className="object-cover" />
              </span>
              <span className="min-w-0">
                <span
                  className={`inline-flex rounded-full border px-2.25 py-1.25 font-nunito text-xs font-medium leading-4 text-[#263238] ${item.tone}`}
                >
                  {item.type}
                </span>
                <span className="mt-2 block font-nunito text-lg font-medium leading-6 tracking-[-0.27px] text-[#263238]">
                  {item.title}
                </span>
                <span className="mt-2 block font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#515b60]">
                  {item.description}
                </span>
                <Link
                  href="/explore"
                  className="mt-2 inline-block font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#2f7d7e]"
                >
                  Quick View
                </Link>
              </span>
            </div>
            <Image
              src="/Home/figma-parent-dashboard-bookmark.svg"
              alt="Save recommendation"
              width={16}
              height={16}
              className="mt-1 shrink-0"
            />
          </article>
        ))}
      </div>
    </Card>
  );
}

export function ParentDashboardPage() {
  return (
    <div className="-mt-4 mx-auto w-full max-w-[1529px] space-y-6">
      <WelcomeBanner />
      <div className="grid gap-6 min-[1750px]:grid-cols-[1.35fr_1fr_1fr]">
        <TodayActivityCard />
        <ProgressCard />
        <WeeklyPlanCard />
      </div>
      <div className="grid gap-6 min-[1750px]:grid-cols-[1.089fr_1fr_1.055fr]">
        <RecentActivityCard />
        <MessagesCard />
        <RecommendationsCard />
      </div>
    </div>
  );
}
