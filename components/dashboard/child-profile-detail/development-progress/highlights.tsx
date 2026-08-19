import { Target, TrendingUp, Trophy } from 'lucide-react';

export function Highlights() {
  const items = [
    { value: '2 of 5', label: 'Activities completed', icon: Target },
    { value: '40%', label: 'Current Week Progress', icon: TrendingUp },
    { value: '0 new', label: 'Milestones unlocked', icon: Trophy },
  ];

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-[#E8EBE8] bg-white p-6 md:p-8">
      <h2 className="font-nunito text-2xl font-medium leading-8 text-[#263238]">
        This week&apos;s highlights
      </h2>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-1 flex-col items-center justify-center gap-3 rounded-2xl border border-[#F1F3F3] bg-[#FAFAFA] p-6 text-center"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#FAFAFA] bg-white shadow-sm">
              <item.icon className="h-4 w-4 text-[#263238]" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="font-nunito text-2xl font-medium leading-8 text-[#272F3A]">
                {item.value}
              </span>
              <span className="font-manrope text-xs font-medium uppercase leading-4.5 tracking-[0.04em] text-[#515B60]">
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
