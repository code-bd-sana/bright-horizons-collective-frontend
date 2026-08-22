import { Check } from 'lucide-react';

const steps = [
  'Basic Info',
  'Caregiver Information',
  'Development & Focus',
  'Interests & Preferences',
];

export function AddChildStepper({ currentStep }: { currentStep: 1 | 2 | 3 | 4 }) {
  return (
    <ol className="flex h-18 items-center overflow-x-auto border-b border-[#d4d6d7]">
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
                className={`font-nunito text-base font-medium leading-6 tracking-[-0.176px] ${complete || (active && currentStep === 4) ? 'text-[#2f7d7e]' : active ? 'text-[#263238]' : 'text-[#a8adaf]'}`}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <span className="mx-2 h-px w-11 shrink-0 bg-[#7d8488]" aria-hidden="true" />
            )}
          </li>
        );
      })}
    </ol>
  );
}
