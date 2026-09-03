'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { activitySteps } from './activity-detail-data';

export function ActivityInstructions() {
  const [expanded, setExpanded] = useState<number[]>([0, 1, 2, 3, 4, 5]);
  const toggle = (index: number) =>
    setExpanded((current) =>
      current.includes(index) ? current.filter((item) => item !== index) : [...current, index]
    );
  return (
    <section className="rounded-2xl border border-[#fafafa] bg-white p-6 shadow-[0_1px_1px_rgba(0,0,0,0.05)] sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <h2 className="font-nunito text-2xl font-medium leading-8 text-[#263238]">
          Step-by-Step Instructions
        </h2>
        <p className="pt-1 font-nunito text-xs font-medium leading-4 text-[#e9f1ee]">
          7 steps · tap to expand
        </p>
      </div>
      <div className="mt-6 space-y-5">
        {activitySteps.map((step, index) => {
          const open = expanded.includes(index);
          return (
            <article
              key={step.title}
              className={`rounded-2xl border bg-white transition-colors ${open ? 'border-[#dceeee] shadow-[0_1px_1.5px_rgba(0,0,0,0.1)]' : 'border-[#e8ebe8]'}`}
            >
              <button
                type="button"
                onClick={() => toggle(index)}
                aria-expanded={open}
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
              >
                <span className="flex items-center gap-3">
                  <span className="flex size-6 items-center justify-center rounded-[15px] bg-[#dceeee] font-nunito text-xs font-medium leading-5 text-[#2f7d7e]">
                    {index + 1}
                  </span>
                  <span className="font-nunito text-lg font-medium leading-6 text-[#263238]">
                    {step.title}
                  </span>
                </span>
                {open ? (
                  <ChevronUp
                    aria-hidden="true"
                    size={16}
                    strokeWidth={1.5}
                    className="shrink-0 text-[#2f7d7e]"
                  />
                ) : (
                  <ChevronDown
                    aria-hidden="true"
                    size={16}
                    strokeWidth={1.5}
                    className="shrink-0 text-[#2f7d7e]"
                  />
                )}
              </button>
              {open && (
                <p className="-mt-2 px-5 pb-5 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#515b60]">
                  {step.detail}
                </p>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
