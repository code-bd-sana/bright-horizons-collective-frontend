import { Check } from 'lucide-react';

const steps = [
  'Basic Info',
  'Caregiver Information',
  'Development & Focus',
  'Interests & Preferences',
];

export function AddChildStepper({ currentStep }: { currentStep: 1 | 2 | 3 | 4 }) {
  return (
    <ol className="flex min-h-18 items-center overflow-x-auto border-b border-[#d4d6d7] py-2 scrollbar-none [&::-webkit-scrollbar]:hidden">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const complete = stepNumber < currentStep;
        const active = stepNumber === currentStep;

        return (
          <li className="flex shrink-0 items-center" key={step}>
            <div className="flex items-center gap-2">
              <span
                className={`flex size-6 items-center justify-center rounded-full font-nunito text-sm font-medium leading-5 text-white ${complete || active ? 'bg-[#2f7d7e]' : 'bg-[#a8adaf]'}`}
              >
                {complete ? <Check aria-hidden="true" size={16} strokeWidth={2} /> : stepNumber}
              </span>
              <span
                className={`font-nunito text-sm font-medium leading-5.5 tracking-[-0.084px] sm:text-base sm:leading-6 sm:tracking-[-0.176px] ${complete || (active && currentStep === 4) ? 'text-[#2f7d7e]' : active ? 'text-[#263238]' : 'text-[#a8adaf]'}`}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <span className="mx-2 h-px w-6 shrink-0 bg-[#7d8488] sm:w-11" aria-hidden="true" />
            )}
          </li>
        );
      })}
    </ol>
  );
}
