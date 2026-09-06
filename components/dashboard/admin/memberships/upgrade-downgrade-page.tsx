'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

import type { Member, MembershipTier } from './member-directory-data';

type PlanOption = {
  name: MembershipTier;
  price: string;
  tone: 'littleSteps' | 'growTogether' | 'personalizedPathways';
};

const planOptions: PlanOption[] = [
  { name: 'Little Steps', price: 'Free', tone: 'littleSteps' },
  { name: 'Grow Together', price: '$29 / month', tone: 'growTogether' },
  { name: 'Personalized Pathways', price: '$79 / month', tone: 'personalizedPathways' },
];

const planTones = {
  littleSteps: { badge: 'bg-[#edf6f2] text-[#2f7d7e]', radio: 'border-[#2f7d7e]' },
  growTogether: { badge: 'bg-[#dcefe7] text-[#2f7d7e]', radio: 'border-[#2f7d7e]' },
  personalizedPathways: { badge: 'bg-[#fce9e2] text-[#a05a3a]', radio: 'border-[#a05a3a]' },
} as const;

const effectiveDateOptions = [
  { value: 'immediately', title: 'Immediately', description: 'Change takes effect right now.' },
  { value: 'renewal', title: 'At next renewal', description: 'Applies from Feb 3, 2026.' },
  { value: 'custom', title: 'Custom date', description: 'Pick a specific activation date.' },
] as const;

function MembershipBadge({ plan, tone }: { plan: MembershipTier; tone: PlanOption['tone'] }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 ${planTones[tone].badge}`}
    >
      {plan}
    </span>
  );
}

function SectionCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-2xl border border-[#e7eceb] bg-white p-6.25 shadow-[0_4px_6px_rgba(0,0,0,0.06)] ${className}`}
    >
      {children}
    </section>
  );
}

export function UpgradeDowngradePage({ member }: { member: Member }) {
  const [selectedPlan, setSelectedPlan] = useState<MembershipTier>(member.membershipTier);
  const [effectiveDate, setEffectiveDate] =
    useState<(typeof effectiveDateOptions)[number]['value']>('immediately');
  const [notes, setNotes] = useState('');

  const reviewChange = () => {
    toast.success(`Membership change for ${member.name} is ready for review.`);
  };

  return (
    <section className="mx-auto w-full max-w-187.75 pb-8 text-[#263238]">
      <Link
        href="/dashboard/admin/memberships"
        className="inline-flex items-center gap-1.5 font-manrope text-sm font-medium leading-5 text-[#607d8b] transition-colors hover:text-[#2f7d7e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f7d7e]"
      >
        <ArrowLeft aria-hidden="true" size={16} strokeWidth={1.8} />
        Back
      </Link>

      <header className="mt-6">
        <h1 className="font-nunito text-2xl font-bold leading-9 text-[#263238]">
          Upgrade / Downgrade Membership
        </h1>
        <p className="pt-0.5 font-manrope text-[13px] leading-[19.5px] text-[#607d8b]">
          Admin-initiated change for <strong className="font-bold">{member.name}</strong>. This is
          distinct from the parent&apos;s own self-service upgrade flow.
        </p>
      </header>

      <SectionCard className="mt-6 h-35">
        <h2 className="font-nunito text-base font-bold leading-6 text-[#263238]">
          1. Current Membership
        </h2>
        <div className="mt-3 flex h-13.5 items-center gap-3 rounded-[14px] border border-[rgba(47,125,126,0.19)] bg-[#edf6f2] p-4.25">
          <MembershipBadge
            plan={member.membershipTier}
            tone={
              planOptions.find((plan) => plan.name === member.membershipTier)?.tone ?? 'littleSteps'
            }
          />
          <p className="font-manrope text-[13px] leading-[19.5px] text-[#607d8b]">
            Status: {member.status}
          </p>
        </div>
      </SectionCard>

      <SectionCard className="mt-6 h-86">
        <h2 className="font-nunito text-base font-bold leading-6 text-[#263238]">
          2. Select New Plan
        </h2>
        <div className="mt-3 space-y-3">
          {planOptions.map((plan) => {
            const isSelected = selectedPlan === plan.name;
            const isCurrent = member.membershipTier === plan.name;
            const tone = planTones[plan.tone];

            return (
              <label
                key={plan.name}
                className={`flex h-19.5 cursor-pointer items-center gap-4 rounded-[14px] border-2 p-4.5 transition-colors ${isSelected ? 'border-[#2f7d7e] bg-[#edf6f2]' : 'border-[#e7eceb] bg-white'}`}
              >
                <input
                  type="radio"
                  name="new-plan"
                  value={plan.name}
                  checked={isSelected}
                  onChange={() => setSelectedPlan(plan.name)}
                  className="sr-only"
                />
                <span
                  className={`flex size-4 shrink-0 items-center justify-center rounded-full border-2 ${tone.radio}`}
                  aria-hidden="true"
                >
                  {isSelected ? <span className="size-2 rounded-full bg-[#2f7d7e]" /> : null}
                </span>
                <span>
                  <span className="flex items-center gap-2">
                    <MembershipBadge plan={plan.name} tone={plan.tone} />
                    <span
                      className={`rounded-full px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 ${isCurrent ? 'bg-[#f4f8f6] text-[#607d8b]' : 'bg-[rgba(76,175,80,0.08)] text-[#4caf50]'}`}
                    >
                      {isCurrent ? 'Current' : 'Upgrade'}
                    </span>
                  </span>
                  <span className="block pt-1 font-manrope text-xs font-medium leading-4.5 text-[#607d8b]">
                    {plan.price}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </SectionCard>

      <SectionCard className="mt-6 h-76.25">
        <h2 className="font-nunito text-base font-bold leading-6 text-[#263238]">
          3. Effective Date
        </h2>
        <div className="mt-3 space-y-3">
          {effectiveDateOptions.map((option) => {
            const isSelected = effectiveDate === option.value;
            return (
              <label
                key={option.value}
                className={`flex h-16.25 cursor-pointer items-start gap-3 rounded-[14px] border p-3.25 transition-colors ${isSelected ? 'border-[#2f7d7e] bg-[rgba(47,125,126,0.02)]' : 'border-[#e7eceb] bg-white'}`}
              >
                <input
                  type="radio"
                  name="effective-date"
                  value={option.value}
                  checked={isSelected}
                  onChange={() => setEffectiveDate(option.value)}
                  className="sr-only"
                />
                <span
                  className={`mt-0.5 flex size-3.25 shrink-0 items-center justify-center rounded-full border ${isSelected ? 'border-[#2f7d7e]' : 'border-[#767676]'}`}
                  aria-hidden="true"
                >
                  {isSelected ? <span className="size-2 rounded-full bg-[#2f7d7e]" /> : null}
                </span>
                <span>
                  <span className="block font-manrope text-sm font-semibold leading-5.25 text-[#263238]">
                    {option.title}
                  </span>
                  <span className="block font-manrope text-xs font-medium leading-4.5 text-[#607d8b]">
                    {option.description}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </SectionCard>

      <SectionCard className="mt-6 h-44.25">
        <h2 className="pb-3 font-nunito text-base font-bold leading-6 text-[#263238]">
          4. Internal Notes{' '}
          <span className="font-nunito text-[13px] font-normal leading-[19.5px] text-[#607d8b]">
            (admin-only, optional)
          </span>
        </h2>
        <textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="e.g. Family requested upgrade after therapist consultation..."
          className="h-21.25 w-full resize-none rounded-xl border border-[#e7eceb] bg-[#f4f8f6] px-3.75 py-2.75 font-manrope text-sm leading-5.25 text-[#263238] outline-none placeholder:text-[rgba(38,50,56,0.5)] focus:border-[#2f7d7e] focus:ring-2 focus:ring-[#2f7d7e]/15"
        />
      </SectionCard>

      <footer className="mt-6 flex justify-end gap-3">
        <Link
          href="/dashboard/admin/memberships"
          className="flex h-10.5 items-center justify-center rounded-[14px] border border-[#e7eceb] px-4.25 py-2.75 font-manrope text-sm font-semibold leading-5 text-[#607d8b] transition-colors hover:bg-[#f8fbfa] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f7d7e]"
        >
          Cancel
        </Link>
        <button
          type="button"
          onClick={reviewChange}
          className="flex h-10.5 items-center justify-center rounded-[14px] bg-[#2f7d7e] px-5 py-2.5 font-manrope text-sm font-semibold leading-5 text-white transition-colors hover:bg-[#266b6c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f7d7e]"
        >
          Review Change →
        </button>
      </footer>
    </section>
  );
}
