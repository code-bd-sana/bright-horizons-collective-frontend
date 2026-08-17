import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const activities = [
  'Sensory Rice Bin Exploration',
  'Finger Painting with Pudding',
  'Water Pouring Station',
  'Sensory Rice Bin Exploration',
  'Sensory Rice Bin Exploration',
  'Sensory Rice Bin Exploration',
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
    <section className="rounded-xl border border-[#e8ebe8] bg-white p-5 shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between">
        <h2 className="font-nunito text-xl font-medium text-[#263238]">Recent activity</h2>
        <button type="button" className="font-manrope text-[9px] text-[#2f7d7e]">
          View all ›
        </button>
      </div>
      <div className="mt-4 space-y-3">
        {activities.map((activity, index) => (
          <div key={`${activity}-${index}`} className="flex items-center gap-2">
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#e9f1ee] text-xs">
              {index === 1 ? '🎨' : index === 2 ? '💧' : '🌾'}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-manrope text-[10px] text-[#263238]">{activity}</p>
              <p className="font-manrope text-[8px] text-[#7d8488]">Sensory Processing · 20 min</p>
            </div>
            <span className="font-manrope text-[8px] text-[#d4d6d7]">○ Completed</span>
          </div>
        ))}
      </div>
    </section>
  );
}
