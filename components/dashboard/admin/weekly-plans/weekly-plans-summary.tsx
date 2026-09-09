import { CheckCircle2, ClipboardList, GraduationCap, Users } from 'lucide-react';
const cards = [
  {
    value: '94',
    label: 'Active Plans',
    icon: ClipboardList,
    tint: 'border-[#dcfce7] bg-[#f0fdf4] text-[#4caf50]',
  },
  {
    value: '18',
    label: 'Completed',
    icon: CheckCircle2,
    tint: 'border-[#fef9c3] bg-[#fefce8] text-[#b78b16]',
  },
  {
    value: '84%',
    label: 'Avg. Completion',
    icon: GraduationCap,
    tint: 'border-[#ffedd5] bg-[#fff7ed] text-[#ea7b33]',
  },
  {
    value: '312',
    label: 'Children Enrolled',
    icon: Users,
    tint: 'border-[#dbeafe] bg-[#ecfeff] text-[#2f7d7e]',
  },
];
export function WeeklyPlansSummary() {
  return (
    <div className="grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4">
      {cards.map(({ value, label, icon: Icon, tint }) => (
        <article
          key={label}
          className="flex min-h-28 min-w-0 items-center rounded-2xl border border-[#e8ebe8] bg-white p-4 shadow-[0_1px_1px_rgba(0,0,0,0.05)] 2xl:h-38.5"
        >
          <span
            className={`mr-3 flex size-8 items-center justify-center rounded-lg border ${tint}`}
          >
            <Icon aria-hidden="true" size={18} strokeWidth={1.7} />
          </span>
          <div className="min-w-0">
            <p className="font-nunito text-2xl font-medium leading-8 text-[#272f3a]">{value}</p>
            <p className="font-manrope text-sm font-medium leading-5.5 tracking-[0.084px] text-[#6c7787]">
              {label}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
