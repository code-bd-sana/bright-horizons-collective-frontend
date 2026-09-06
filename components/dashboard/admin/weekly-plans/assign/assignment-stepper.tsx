import { Check } from 'lucide-react';

const assignmentSteps = [
  'Plan Summary',
  'Choose Families',
  'Choose Children',
  'Settings',
  'Review',
];

export function AssignmentStepper({ currentStep }: { currentStep: 1 | 2 | 3 | 4 | 5 }) {
  return (
    <ol className="flex min-w-max items-center">
      {assignmentSteps.map((label, index) => {
        const step = index + 1;
        const complete = step < currentStep;
        const active = step === currentStep;

        return (
          <li key={label} className="flex items-center">
            <div
              className={`flex h-10 items-center gap-2 rounded-[14px] px-3 py-2 ${active ? 'bg-[rgba(47,125,126,0.07)]' : ''}`}
            >
              <span
                className={`flex size-6 items-center justify-center rounded-full font-nunito text-xs font-bold leading-4 ${complete || active ? 'bg-[#2f7d7e] text-white' : 'bg-[#eef2f2] text-[#607d8b]'}`}
              >
                {complete ? <Check aria-hidden="true" size={14} strokeWidth={2.3} /> : step}
              </span>
              <span
                className={`font-manrope text-[13px] leading-[19.5px] ${active ? 'font-semibold text-[#2f7d7e]' : complete ? 'text-[#263238]' : 'text-[#607d8b]'}`}
              >
                {label}
              </span>
            </div>
            {index < assignmentSteps.length - 1 ? (
              <span
                aria-hidden="true"
                className={`h-px w-6 shrink-0 ${step < currentStep ? 'bg-[#2f7d7e]' : 'bg-[#e7eceb]'}`}
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
