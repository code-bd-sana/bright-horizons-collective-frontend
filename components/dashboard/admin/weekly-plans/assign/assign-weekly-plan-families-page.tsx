'use client';

import { ArrowLeft, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { AssignmentStepper } from './assignment-stepper';

type Family = {
  id: string;
  initial: string;
  name: string;
  children: string;
  membership: 'Grow Together' | 'Little Steps' | 'Personalized Pathways';
};

const families: Family[] = [
  {
    id: 'okonkwo',
    initial: 'O',
    name: 'The Okonkwo Family',
    children: '2 children: Zara, Kofi',
    membership: 'Grow Together',
  },
  {
    id: 'martinez',
    initial: 'M',
    name: 'The Martinez Family',
    children: '1 child: Sofia',
    membership: 'Little Steps',
  },
  {
    id: 'chen',
    initial: 'C',
    name: 'The Chen Family',
    children: '1 child: Eli',
    membership: 'Personalized Pathways',
  },
  {
    id: 'patel',
    initial: 'P',
    name: 'The Patel Family',
    children: '2 children: Mia, Arjun',
    membership: 'Grow Together',
  },
  {
    id: 'tanaka',
    initial: 'T',
    name: 'The Tanaka Family',
    children: '1 child: Ren',
    membership: 'Little Steps',
  },
  {
    id: 'williams',
    initial: 'W',
    name: 'The Williams Family',
    children: '1 child: Jade',
    membership: 'Grow Together',
  },
  {
    id: 'nguyen',
    initial: 'N',
    name: 'The Nguyen Family',
    children: '2 children: Linh, Bao',
    membership: 'Personalized Pathways',
  },
  {
    id: 'al-rashid',
    initial: 'A',
    name: 'The Al-Rashid Family',
    children: '1 child: Omar',
    membership: 'Little Steps',
  },
];

const membershipStyles = {
  'Grow Together': 'bg-[#dcefe7] text-[#2f7d7e]',
  'Little Steps': 'bg-[#edf6f2] text-[#2f7d7e]',
  'Personalized Pathways': 'bg-[#fce9e2] text-[#a05a3a]',
};

function FamilyChoice({
  family,
  selected,
  onToggle,
}: {
  family: Family;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onToggle}
      className={`flex w-full items-center gap-4 rounded-[14px] border p-4 text-left transition-colors ${selected ? 'border-[#2f7d7e] bg-[rgba(47,125,126,0.03)]' : 'border-[#e7eceb] bg-white'}`}
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[rgba(47,125,126,0.09)] font-nunito text-base font-bold leading-6 text-[#2f7d7e]">
        {family.initial}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-manrope text-sm font-semibold leading-5.25 text-[#263238]">
          {family.name}
        </span>
        <span className="block font-manrope text-xs font-medium leading-4.5 text-[#607d8b]">
          {family.children}
        </span>
      </span>
      <span
        className={`shrink-0 rounded-full px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 ${membershipStyles[family.membership]}`}
      >
        {family.membership}
      </span>
      <span
        className={`flex size-5 shrink-0 items-center justify-center rounded-lg ${selected ? 'bg-[#2f7d7e] text-white' : 'bg-[#eef2f2] text-transparent'}`}
      >
        <Check aria-hidden="true" size={13} strokeWidth={2.4} />
      </span>
    </button>
  );
}

export function AssignWeeklyPlanFamiliesPage() {
  const router = useRouter();
  const [selectedFamilies, setSelectedFamilies] = useState(
    () => new Set(['okonkwo', 'martinez', 'chen'])
  );

  function toggleFamily(familyId: string) {
    setSelectedFamilies((current) => {
      const next = new Set(current);
      if (next.has(familyId)) next.delete(familyId);
      else next.add(familyId);
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
          <AssignmentStepper currentStep={2} />
        </section>

        <section className="rounded-2xl border border-[#e7eceb] bg-white p-6 shadow-[0_4px_6px_rgba(0,0,0,0.06)]">
          <h2 className="font-nunito text-lg font-bold leading-7 text-[#263238]">
            2. Choose Families
          </h2>
          <div className="mt-5 space-y-4">
            <p className="max-w-155.5 font-manrope text-sm leading-5.25 text-[#607d8b]">
              Select one or more families to assign this plan to. Only families whose membership
              tier matches this plan&apos;s access level are shown.
            </p>
            <div className="max-w-155.5 space-y-2">
              {families.map((family) => (
                <FamilyChoice
                  key={family.id}
                  family={family}
                  selected={selectedFamilies.has(family.id)}
                  onToggle={() => toggleFamily(family.id)}
                />
              ))}
            </div>
            <p className="font-manrope text-[13px] font-semibold leading-[19.5px] text-[#2f7d7e]">
              {selectedFamilies.size} {selectedFamilies.size === 1 ? 'family' : 'families'} selected
            </p>
          </div>
        </section>

        <section className="flex items-center justify-between rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)]">
          <button
            type="button"
            onClick={() => router.push('/dashboard/admin/weekly-plans/assign')}
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
              onClick={() => toast.success(`${selectedFamilies.size} families selected.`)}
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
