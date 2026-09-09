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
    <ol className="flex w-full min-w-0 items-center sm:min-w-max 2xl:min-w-max">
      {assignmentSteps.map((label, index) => {
        const step = index + 1;
        const complete = step < currentStep;
        const active = step === currentStep;

        return (
          <li
            key={label}
            className="flex min-w-0 flex-1 items-center last:flex-none sm:flex-none 2xl:flex-none"
          >
            <div
              className={`flex h-10 min-w-0 shrink-0 items-center gap-2 rounded-[14px] px-2 py-2 sm:px-3 2xl:px-3 ${active ? 'bg-[rgba(47,125,126,0.07)]' : ''}`}
            >
              <span
                className={`flex size-6 items-center justify-center rounded-full font-nunito text-xs font-bold leading-4 ${complete || active ? 'bg-[#2f7d7e] text-white' : 'bg-[#eef2f2] text-[#607d8b]'}`}
              >
                {complete ? <Check aria-hidden="true" size={14} strokeWidth={2.3} /> : step}
              </span>
              <span
                className={`truncate font-manrope text-[13px] leading-[19.5px] ${active ? 'font-semibold text-[#2f7d7e]' : complete ? 'hidden text-[#263238] sm:inline 2xl:inline' : 'hidden text-[#607d8b] sm:inline 2xl:inline'}`}
              >
                {label}
              </span>
            </div>
            {index < assignmentSteps.length - 1 ? (
              <span
                aria-hidden="true"
                className={`h-px min-w-2 flex-1 sm:w-6 sm:flex-none 2xl:w-6 2xl:flex-none ${step < currentStep ? 'bg-[#2f7d7e]' : 'bg-[#e7eceb]'}`}
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
