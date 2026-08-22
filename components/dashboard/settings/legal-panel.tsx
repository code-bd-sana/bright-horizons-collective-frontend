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
    <section className="w-full max-w-227 rounded-[20px] border-2 border-[#e8ebe8] bg-white p-8 shadow-[0_1px_2px_rgba(0,0,0,0.05)] sm:p-8.5">
      <h2 className="font-nunito text-2xl font-semibold leading-8 text-[#263238]">
        Legal &amp; Transparency
      </h2>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {legalDocuments.map(({ title, description, icon: Icon }) => (
          <button
            className="flex min-h-30 items-start justify-between gap-4 rounded-2xl border border-[#e8ebe8] bg-white p-4 text-left transition-colors hover:bg-[#f8fbfa] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#2f7d7e]"
            key={title}
            onClick={() => toast.success(`${title} is ready to view.`)}
            type="button"
          >
            <span className="flex min-w-0 gap-2.5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#f1f3f3] text-[#515b60]">
                <Icon aria-hidden="true" size={20} strokeWidth={1.5} />
              </span>
              <span className="min-w-0">
                <span className="block font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-[#263238]">
                  {title}
                </span>
                <span className="mt-1 block font-manrope text-xs leading-4.5 text-[#515b60]">
                  {description}
                </span>
              </span>
            </span>
            <SquareArrowOutUpRight
              aria-hidden="true"
              className="mt-2 shrink-0 text-[#515b60]"
              size={20}
              strokeWidth={1.5}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
