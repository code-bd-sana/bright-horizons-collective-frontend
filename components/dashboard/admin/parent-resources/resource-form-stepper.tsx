const resourceSteps = [
  'Basic Info',
  'Content',
  'Attachments',
  'Related',
  'Membership',
  'SEO',
  'Review',
];

export function ResourceFormStepper({ currentStep }: { currentStep: 1 | 2 | 3 | 4 | 5 | 6 | 7 }) {
  return (
    <ol className="flex min-w-max items-center">
      {resourceSteps.map((step, index) => {
        const stepNumber = index + 1;
        const active = stepNumber === currentStep;
        const complete = stepNumber < currentStep;

        return (
          <li key={step} className="flex items-center">
            <div
              className={`flex h-10 items-center gap-2 rounded-[14px] px-3 py-2 ${active ? 'bg-[rgba(47,125,126,0.07)]' : ''}`}
            >
              <span
                className={`flex size-6 items-center justify-center rounded-full font-nunito text-xs font-bold leading-4 ${complete || active ? 'bg-[#2f7d7e] text-white' : 'bg-[#eef2f2] text-[#607d8b]'}`}
              >
                {complete ? <Check aria-hidden="true" size={14} strokeWidth={2} /> : stepNumber}
              </span>
              <span
                className={`font-manrope text-[13px] leading-5 ${active ? 'font-semibold text-[#2f7d7e]' : complete ? 'text-[#263238]' : 'text-[#607d8b]'}`}
              >
                {step}
              </span>
            </div>
            {index < resourceSteps.length - 1 && (
              <span
                aria-hidden="true"
                className={`h-px w-5 shrink-0 ${complete ? 'bg-[#2f7d7e]' : 'bg-[#e7eceb]'}`}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
import { Check } from 'lucide-react';
