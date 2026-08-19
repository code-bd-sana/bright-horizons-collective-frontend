import { Star, CheckCircle, Flame } from 'lucide-react';

export function StatCards() {
  const stats = [
    { value: '23', label: 'Activities completed', icon: Star },
    { value: '40%', label: 'Weekly plan completion', icon: CheckCircle },
    { value: '8', label: 'Current activity streak', icon: Flame },
  ];

  return (
    <div className="flex w-full flex-col gap-6 md:flex-row md:items-center">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="flex flex-1 flex-col items-center justify-center gap-3 rounded-2xl border border-[#E8EBE8] bg-[#FAFAFA] p-4 text-center"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#FAFAFA] bg-[#F1F3F3]">
            <stat.icon className="h-4 w-4 text-[#263238]" />
          </div>
          <div className="flex flex-col items-center">
            <span className="font-nunito text-2xl font-medium leading-8 text-[#272F3A]">
              {stat.value}
            </span>
            <span className="font-manrope text-xs font-medium uppercase leading-4.5 tracking-[0.04em] text-[#515B60]">
              {stat.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
