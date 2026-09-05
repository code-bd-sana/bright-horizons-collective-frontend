import { Check } from 'lucide-react';

const weeklyPlanFormSteps = ['Basic Info', 'Activities', 'Schedule', 'Membership', 'Review'];

export function WeeklyPlanFormStepper() {
  return (
    <ol className="flex min-w-max items-center">
      {weeklyPlanFormSteps.map((label, index) => {
        const active = index === 0;

        return (
          <li key={label} className="flex flex-1 items-center last:flex-none">
            <div
              className={`flex h-10 shrink-0 items-center gap-2 rounded-[14px] px-3 py-2 ${active ? 'bg-[rgba(47,125,126,0.07)]' : ''}`}
            >
              <span
                className={`flex size-6 items-center justify-center rounded-full font-nunito text-xs font-bold leading-4 ${active ? 'bg-[#2f7d7e] text-white' : 'bg-[#eef2f2] text-[#607d8b]'}`}
              >
                {active ? <Check aria-hidden="true" size={14} strokeWidth={2.2} /> : index + 1}
              </span>
              <span
                className={`font-manrope text-[13px] leading-[19.5px] ${active ? 'font-semibold text-[#2f7d7e]' : 'text-[#607d8b]'}`}
              >
                {label}
              </span>
            </div>
            {index < weeklyPlanFormSteps.length - 1 ? (
              <span aria-hidden="true" className="mx-1 h-px min-w-4 flex-1 bg-[#e7eceb]" />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
