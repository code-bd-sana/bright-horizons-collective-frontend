import { CheckCircle2, Loader, Trophy } from 'lucide-react';

export function Highlights() {
  const items = [
    { value: '2 of 5', label: 'Activities completed', icon: CheckCircle2 },
    { value: '40%', label: 'Current Week Progress', icon: Loader },
    { value: '0 new', label: 'Milestones unlocked', icon: Trophy },
  ];

  return (
    <div className="flex min-w-0 flex-col gap-6 rounded-2xl border border-[#E8EBE8] bg-white p-4 sm:p-6 2xl:p-8">
      <h2 className="font-nunito text-2xl font-medium leading-8 text-[#263238]">
        This week&apos;s highlights
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex min-w-0 flex-row items-center gap-3 rounded-2xl bg-linear-to-r from-[#F4F6F6] via-[#F4F6F6]/80 to-transparent p-3 2xl:p-4"
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
              <item.icon className="size-5 text-[#2F7D7E]" />
            </div>
            <div className="flex flex-col">
              <span className="font-nunito text-2xl font-medium leading-8 text-[#272F3A]">
                {item.value}
              </span>
              <span className="font-manrope text-xs font-medium leading-4.5 text-[#515B60]">
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
