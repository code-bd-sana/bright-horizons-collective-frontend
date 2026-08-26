'use client';

import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

import { ResourceFormNavigation } from './resource-form-navigation';
import { ResourceFormStepper } from './resource-form-stepper';

const membershipTiers = [
  {
    id: 'little-steps',
    name: 'Little Steps',
    description: 'Freely available to all members — no lock.',
    badgeClassName: 'bg-[#edf6f2] px-0 text-[#2f7d7e]',
    radioClassName: 'border-[#2f7d7e]',
    selectedDotClassName: 'bg-[#2f7d7e]',
  },
  {
    id: 'grow-together',
    name: 'Grow Together',
    description: 'Available to Grow Together and Personalized Pathways members.',
    badgeClassName: 'bg-[#dcefe7] px-2.5 text-[#2f7d7e]',
    radioClassName: 'border-[#2f7d7e]',
    selectedDotClassName: 'bg-[#2f7d7e]',
  },
  {
    id: 'personalized-pathways',
    name: 'Personalized Pathways',
    description: 'Exclusive to Personalized Pathways members only.',
    badgeClassName: 'bg-[#fce9e2] px-2.5 text-[#a05a3a]',
    radioClassName: 'border-[#a05a3a]',
    selectedDotClassName: 'bg-[#a05a3a]',
  },
] as const;

type MembershipTier = (typeof membershipTiers)[number]['id'];

export function AddResourceMembership() {
  const [membershipTier, setMembershipTier] = useState<MembershipTier>('little-steps');

  function saveMembership() {
    const tier = membershipTiers.find(({ id }) => id === membershipTier);
    toast.success(`${tier?.name} access saved.`);
  }

  return (
    <section className="mx-auto w-full max-w-231.5 pb-8 pt-6 text-[#263238] lg:pt-0">
      <Link
        href="/dashboard/admin/parent-resources"
        className="inline-flex items-center gap-1.5 font-manrope text-sm font-medium leading-5 text-[#607d8b]"
      >
        <span aria-hidden="true">←</span>
        Back to Parent Resources
      </Link>

      <h1 className="mt-5 font-nunito text-2xl font-bold leading-9">Create Resource</h1>

      <div className="mt-5 overflow-x-auto rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
        <ResourceFormStepper currentStep={5} />
      </div>

      <section className="mt-5 rounded-2xl border border-[#e7eceb] bg-white p-5 shadow-[0_4px_6px_rgba(0,0,0,0.06)] sm:p-6.25">
        <h2 className="font-nunito text-lg font-bold leading-6.75">5. Membership</h2>

        <div className="mt-5 max-w-215 space-y-4">
          <p className="max-w-179.5 font-manrope text-sm leading-5.25 text-[#607d8b]">
            Control which membership tier can access this resource. Resources set to Grow Together
            or above are locked for Little Steps families with an upgrade prompt.
          </p>

          <fieldset className="grid gap-3">
            <legend className="sr-only">Membership access tier</legend>
            {membershipTiers.map((tier) => {
              const selected = membershipTier === tier.id;

              return (
                <label
                  key={tier.id}
                  className={`flex min-h-20.5 cursor-pointer items-center gap-4 rounded-[14px] border-2 p-4.5 transition-colors ${selected ? 'border-[#2f7d7e] bg-[#edf6f2]' : 'border-[#e7eceb] bg-white hover:border-[#accbcb]'}`}
                >
                  <input
                    className="sr-only"
                    type="radio"
                    name="membership-tier"
                    value={tier.id}
                    checked={selected}
                    onChange={() => setMembershipTier(tier.id)}
                  />
                  <span
                    aria-hidden="true"
                    className={`flex size-4 shrink-0 items-center justify-center rounded-full border-2 ${tier.radioClassName}`}
                  >
                    {selected && (
                      <span className={`size-2 rounded-full ${tier.selectedDotClassName}`} />
                    )}
                  </span>
                  <span className="flex flex-col items-start gap-1">
                    <span
                      className={`inline-flex items-center rounded-full py-0.5 font-manrope text-xs font-semibold leading-4 ${tier.badgeClassName}`}
                    >
                      {tier.name}
                    </span>
                    <span className="font-manrope text-xs font-medium leading-4.5 text-[#607d8b]">
                      {tier.description}
                    </span>
                  </span>
                </label>
              );
            })}
          </fieldset>
        </div>
      </section>

      <ResourceFormNavigation
        currentStep={5}
        onNext={saveMembership}
        onSaveChanges={saveMembership}
      />
    </section>
  );
}
