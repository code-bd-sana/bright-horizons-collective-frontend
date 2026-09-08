'use client';

import { Gavel, HeartHandshake, HeartPlus, KeyRound, SquareArrowOutUpRight } from 'lucide-react';
import { toast } from 'sonner';

const legalDocuments = [
  {
    title: 'Privacy Policy',
    description:
      "How we collect, use, and safeguard your family's personal information and activity data.",
    icon: KeyRound,
  },
  {
    title: 'Terms & Conditions',
    description:
      'The agreement governing your use of the Bright Horizons platform and our service obligations.',
    icon: Gavel,
  },
  {
    title: 'Affiliate Disclosure',
    description:
      'Transparency regarding our partnerships and recommendations within the Collective.',
    icon: HeartHandshake,
  },
  {
    title: 'Medical Disclaimer',
    description:
      'Important health-related information regarding developmental activities and safety guidance.',
    icon: HeartPlus,
  },
] as const;

export function LegalPanel() {
  return (
    <section className="w-full max-w-227 rounded-[20px] border-2 border-[#e8ebe8] bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)] sm:p-8.5">
      <h2 className="font-nunito text-xl font-semibold leading-7 text-[#263238] sm:text-2xl sm:leading-8">
        Legal &amp; Transparency
      </h2>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {legalDocuments.map(({ title, description, icon: Icon }) => (
          <button
            className="grid min-h-30 grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-x-2.5 gap-y-1 rounded-2xl border border-[#e8ebe8] bg-white p-3 text-left transition-colors hover:bg-[#f8fbfa] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#2f7d7e] sm:p-4"
            key={title}
            onClick={() => toast.success(`${title} is ready to view.`)}
            type="button"
          >
            <span className="row-span-2 flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#f1f3f3] text-[#515b60]">
              <Icon aria-hidden="true" size={20} strokeWidth={1.5} />
            </span>
            <span className="min-w-0 font-nunito text-sm font-medium leading-5 tracking-[-0.176px] text-[#263238] sm:text-base sm:leading-6">
              {title}
            </span>
            <SquareArrowOutUpRight
              aria-hidden="true"
              className="shrink-0 text-[#515b60]"
              size={20}
              strokeWidth={1.5}
            />
            <span className="col-start-2 col-end-4 font-manrope text-xs leading-4.5 text-[#515b60]">
              {description}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
