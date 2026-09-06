import { Activity, BadgeCheck, FileText } from 'lucide-react';

const summaries = [
  {
    label: 'Total Activities',
    value: '94',
    icon: Activity,
    tone: 'bg-[#edfcf7] text-[#5ac7bb] border-[#d7f6ec]',
  },
  {
    label: 'Published',
    value: '18',
    icon: BadgeCheck,
    tone: 'bg-[#fffbea] text-[#f0bf32] border-[#f9edb6]',
  },
  {
    label: 'Draft',
    value: '198',
    icon: FileText,
    tone: 'bg-[#edf7ff] text-[#3490ff] border-[#d8ebff]',
  },
];

export function ActivitySummaryCards() {
  return (
    <section
      className="grid max-w-285.75 gap-6 md:grid-cols-3"
      aria-label="Activity library summary"
    >
      {summaries.map(({ label, value, icon: Icon, tone }) => (
        <article
          key={label}
          className="flex h-38.25 items-center rounded-2xl border border-[#e3e9e8] bg-white px-4 shadow-[0_2px_5px_rgba(38,50,56,0.05)]"
        >
          <span className={`flex size-8 items-center justify-center rounded-lg border ${tone}`}>
            <Icon aria-hidden="true" size={18} strokeWidth={1.7} />
          </span>
          <div className="ml-3">
            <p className="font-nunito text-2xl font-medium leading-8 text-[#263238]">{value}</p>
            <p className="mt-1 font-manrope text-sm leading-5.5 tracking-[0.06em] text-[#65758a]">
              {label}
            </p>
          </div>
        </article>
      ))}
    </section>
  );
}
