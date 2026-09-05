'use client';

import { ArrowLeft, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { AssignmentStepper } from './assignment-stepper';

type Child = {
  id: string;
  initial: string;
  name: string;
  age: string;
};

type FamilyChildren = {
  family: string;
  children: Child[];
};

const selectedFamilyChildren: FamilyChildren[] = [
  {
    family: 'The Okonkwo Family',
    children: [
      { id: 'zara', initial: 'Z', name: 'Zara', age: '3y' },
      { id: 'kofi', initial: 'K', name: 'Kofi', age: '1y' },
    ],
  },
  {
    family: 'The Martinez Family',
    children: [{ id: 'sofia', initial: 'S', name: 'Sofia', age: '2y' }],
  },
  {
    family: 'The Chen Family',
    children: [{ id: 'eli', initial: 'E', name: 'Eli', age: '4y' }],
  },
];

function ChildChoice({
  child,
  selected,
  onToggle,
}: {
  child: Child;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onToggle}
      className={`flex h-16.25 w-full items-center gap-3 rounded-[14px] border p-3 text-left transition-colors ${selected ? 'border-[#2f7d7e] bg-[rgba(47,125,126,0.03)]' : 'border-[#e7eceb] bg-white'}`}
    >
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[rgba(143,185,168,0.19)] font-nunito text-sm font-bold leading-5 text-[#2f7d7e]">
        {child.initial}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-manrope text-sm font-semibold leading-5.25 text-[#263238]">
          {child.name}
        </span>
        <span className="block font-manrope text-xs font-medium leading-4.5 text-[#607d8b]">
          {child.age}
        </span>
      </span>
      <span
        className={`flex size-5 shrink-0 items-center justify-center rounded-lg ${selected ? 'bg-[#2f7d7e] text-white' : 'bg-[#eef2f2] text-transparent'}`}
      >
        <Check aria-hidden="true" size={13} strokeWidth={2.4} />
      </span>
    </button>
  );
}

export function AssignWeeklyPlanChildrenPage() {
  const router = useRouter();
  const [selectedChildren, setSelectedChildren] = useState(
    () => new Set(['zara', 'kofi', 'sofia', 'eli'])
  );

  function toggleChild(childId: string) {
    setSelectedChildren((current) => {
      const next = new Set(current);
      if (next.has(childId)) next.delete(childId);
      else next.add(childId);
      return next;
    });
  }

  return (
    <section className="mx-auto w-full max-w-196.75 pb-8 text-[#263238]">
      <div className="space-y-5">
        <button
          type="button"
          onClick={() => router.push('/dashboard/admin/weekly-plans')}
          className="flex items-center gap-1.5 font-manrope text-sm font-medium leading-5 text-[#607d8b]"
        >
          <ArrowLeft aria-hidden="true" size={16} strokeWidth={1.5} />
          Back
        </button>

        <div>
          <h1 className="font-nunito text-2xl font-bold leading-9 text-[#263238]">
            Assign Weekly Plan
          </h1>
          <p className="mt-0.5 font-manrope text-[13px] leading-[19.5px] text-[#607d8b]">
            Assigning: Fine Motor Builder — Week 2
          </p>
        </div>

        <section className="overflow-x-auto rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)]">
          <AssignmentStepper currentStep={3} />
        </section>

        <section className="rounded-2xl border border-[#e7eceb] bg-white p-6 shadow-[0_4px_6px_rgba(0,0,0,0.06)]">
          <h2 className="font-nunito text-lg font-bold leading-7 text-[#263238]">
            3. Choose Children
          </h2>
          <div className="mt-5 space-y-5">
            <p className="font-manrope text-sm leading-5.25 text-[#607d8b]">
              For families with multiple children, choose which children to assign the plan to.
            </p>
            {selectedFamilyChildren.map(({ family, children }) => (
              <section key={family}>
                <h3 className="font-nunito text-[15px] font-bold leading-[22.5px] text-[#263238]">
                  {family}
                </h3>
                <div className="mt-2 space-y-2">
                  {children.map((child) => (
                    <ChildChoice
                      key={child.id}
                      child={child}
                      selected={selectedChildren.has(child.id)}
                      onToggle={() => toggleChild(child.id)}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>

        <section className="flex items-center justify-between rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)]">
          <button
            type="button"
            onClick={() => router.push('/dashboard/admin/weekly-plans/assign/families')}
            className="rounded-[14px] border border-[#e7eceb] px-4.25 py-2.75 font-manrope text-sm font-semibold leading-5 text-[#607d8b]"
          >
            ← Previous
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => router.push('/dashboard/admin/weekly-plans')}
              className="rounded-[14px] border border-[#e7eceb] px-4.25 py-2.75 font-manrope text-sm font-semibold leading-5 text-[#607d8b]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                toast.success(`${selectedChildren.size} children selected.`);
                router.push('/dashboard/admin/weekly-plans/assign/settings');
              }}
              className="rounded-[14px] bg-[#2f7d7e] px-5 py-2.5 font-manrope text-sm font-semibold leading-5 text-white"
            >
              Next →
            </button>
          </div>
        </section>
      </div>
    </section>
  );
}
