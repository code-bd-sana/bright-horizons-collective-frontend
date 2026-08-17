import Image from 'next/image';
import { ArrowRight, ChevronRight, CheckCircle2 } from 'lucide-react';

const activities = [
  {
    title: 'Sensory Rice Bin Exploration',
    subtitle: 'Sensory Processing · 20 min',
    image: '/activities/activity-1.png',
  },
  {
    title: 'Finger Painting with Pudding',
    subtitle: 'Fine Motor · 15 min',
    image: '/activities/activity-2.png',
  },
  {
    title: 'Water Pouring Station',
    subtitle: 'Coordination · 20 min',
    image: '/activities/activity-3.png',
  },
  {
    title: 'Sensory Rice Bin Exploration',
    subtitle: 'Sensory Processing · 20 min',
    image: '/activities/activity-1.png',
  },
  {
    title: 'Sensory Rice Bin Exploration',
    subtitle: 'Sensory Processing · 20 min',
    image: '/activities/activity-1.png',
  },
  {
    title: 'Sensory Rice Bin Exploration',
    subtitle: 'Sensory Processing · 20 min',
    image: '/activities/activity-1.png',
  },
];

const progressItems = [
  ['Fine Motor', '68%', '#2F7D7E'],
  ['Bilateral Coordination', '54%', '#6BABB0'],
  ['Sensory Processing', '72%', '#8FB9A8'],
  ['Self-Regulation', '45%', '#F2B59F'],
];

export function DevelopmentProgressPanel() {
  return (
    <section className="flex flex-col gap-6 rounded-2xl border border-[#E8EBE8] bg-white p-8 shadow-sm">
      <div className="flex flex-col gap-1">
        <p className="font-nunito text-xs font-medium text-[#2F7D7E]">Development Tracking</p>
        <h2 className="font-nunito text-2xl font-medium leading-8 text-[#263238]">
          Emma&apos;s Progress
        </h2>
      </div>

      <div className="flex flex-col items-center gap-6">
        <Image
          src="/emmas-progress.svg"
          alt="Emma's Progress Chart"
          width={152}
          height={152}
          priority
        />

        <div className="w-full space-y-2">
          {progressItems.map(([label, value, color]) => (
            <div key={label} className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-[5px]" style={{ backgroundColor: color }} />
                <span className="font-nunito text-xs font-medium leading-4 text-[#263238]">
                  {label}
                </span>
              </span>
              <span className="font-nunito text-xs font-bold leading-4" style={{ color }}>
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="flex w-full items-center justify-center gap-1 rounded-full border border-[#D8DDD9] px-3 py-2 font-nunito text-base font-medium text-[#2F7D7E] shadow-[inset_0_-6px_2px_0_rgba(255,255,255,0.07)] hover:bg-[#FDFDFC] transition-colors"
      >
        View Progress Report
        <ArrowRight className="h-4 w-4" />
      </button>
    </section>
  );
}

export function RecentActivityPanel() {
  return (
    <section className="flex flex-col gap-6 rounded-2xl border border-[#E8EBE8] bg-white p-8 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="font-nunito text-2xl font-medium leading-8 text-[#263238]">
          Recent activity
        </h2>
        <button
          type="button"
          className="flex items-center gap-1 py-1.5 font-nunito text-base font-medium text-[#2F7D7E] hover:underline"
        >
          View all
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-col gap-5">
        {activities.map((activity, index) => (
          <div key={`${activity.title}-${index}`} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src={activity.image}
                alt={activity.title}
                width={54}
                height={54}
                className="shrink-0 object-contain"
              />
              <div className="flex flex-col gap-2">
                <p className="font-nunito text-lg font-medium leading-6 tracking-[-0.015em] text-[#263238]">
                  {activity.title}
                </p>
                <p className="font-manrope text-sm font-normal leading-5.5 tracking-[-0.006em] text-[#515B60]">
                  {activity.subtitle}
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-[#515B60]" />
              <span className="font-manrope text-sm font-normal text-[#515B60]">Completed</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
