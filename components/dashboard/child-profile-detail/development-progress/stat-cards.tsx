import { Flame, CheckCircle2, CalendarCheckIcon } from 'lucide-react';

export function StatCards() {
  const stats = [
    { value: '23', label: 'Activities completed', icon: CheckCircle2 },
    { value: '40%', label: 'Weekly plan completion', icon: CalendarCheckIcon },
    { value: '8', label: 'Current activity streak', icon: Flame },
  ];

  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3 2xl:gap-6">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="flex min-w-0 flex-col gap-3 rounded-2xl border border-[#E8EBE8] bg-[#FAFAFA] p-4"
        >
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-[#FAFAFA] bg-[#F1F3F3]">
            <stat.icon className="size-4 text-[#263238]" />
          </div>
          <div className="flex flex-col">
            <span className="font-nunito text-2xl font-medium leading-8 text-[#272F3A]">
              {stat.value}
            </span>
            <span className="font-manrope text-xs font-medium leading-4.5 tracking-[0.04em] text-[#515B60]">
              {stat.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
