import { Check } from 'lucide-react';

export const resourceFormSteps = [
  { number: 1, label: 'Basic Info', href: '/dashboard/admin/parent-resources/add-resource' },
  { number: 2, label: 'Content', href: '/dashboard/admin/parent-resources/add-resource/content' },
  {
    number: 3,
    label: 'Attachments',
    href: '/dashboard/admin/parent-resources/add-resource/attachments',
  },
  { number: 4, label: 'Related', href: '/dashboard/admin/parent-resources/add-resource/related' },
  {
    number: 5,
    label: 'Membership',
    href: '/dashboard/admin/parent-resources/add-resource/membership',
  },
  { number: 6, label: 'SEO', href: '/dashboard/admin/parent-resources/add-resource/seo' },
  { number: 7, label: 'Review', href: '/dashboard/admin/parent-resources/add-resource/review' },
] as const;

export type ResourceFormStep = (typeof resourceFormSteps)[number]['number'];

export function ResourceFormStepper({ currentStep }: { currentStep: ResourceFormStep }) {
  return (
    <ol className="flex min-w-max items-center">
      {resourceFormSteps.map(({ label, number: stepNumber }, index) => {
        const active = stepNumber === currentStep;
        const complete = stepNumber < currentStep;

        return (
          <li key={label} className="flex items-center">
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
                {label}
              </span>
            </div>
            {index < resourceFormSteps.length - 1 && (
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
