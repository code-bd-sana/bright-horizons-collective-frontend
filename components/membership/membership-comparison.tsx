'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

const MEMBERSHIP_ASSET_ROOT = '/Membership/';

type BillingCycle = 'monthly' | 'annual';

const features = [
  {
    name: 'Resource Library Access',
    little: 'Starter Library',
    grow: 'Starter + Growth',
    personalized: 'Full Library',
  },
  {
    name: 'Dashboard',
    little: true,
    grow: true,
    personalized: true,
  },
  {
    name: 'Child Profiles',
    little: true,
    grow: true,
    personalized: true,
  },
  {
    name: 'Current Weekly Plan',
    little: 'Preview',
    grow: 'Full',
    personalized: 'Personalized',
  },
  {
    name: 'Previous Weekly Plans',
    little: 'Limited',
    grow: 'Full',
    personalized: 'Full',
  },
  {
    name: 'Activities',
    little: 'Limited',
    grow: 'Full Library',
    personalized: 'Full Library',
  },
  {
    name: 'Parent Resources',
    little: 'Limited',
    grow: 'Full Access',
    personalized: 'Full Access',
  },
  {
    name: 'Downloads',
    little: 'Limited',
    grow: 'Unlimited',
    personalized: 'Unlimited',
  },
  {
    name: 'Premium Content',
    little: 'Preview',
    grow: true,
    personalized: true,
  },
  {
    name: 'Developmental Questions',
    little: false,
    grow: true,
    personalized: true,
  },
  {
    name: 'Personalized Plans',
    little: false,
    grow: false,
    personalized: true,
  },
  {
    name: 'Priority Support',
    little: false,
    grow: false,
    personalized: true,
  },
];

const CheckIcon = () => (
  <Image
    src={`${MEMBERSHIP_ASSET_ROOT}feature-check-paid.svg`}
    alt=""
    width={16}
    height={16}
    aria-hidden="true"
  />
);
const XIcon = () => (
  <Image
    src={`${MEMBERSHIP_ASSET_ROOT}feature-check-free.svg`}
    alt=""
    width={16}
    height={16}
    aria-hidden="true"
  />
);

const renderValue = (value: string | boolean) => {
  if (value === true) return <CheckIcon />;
  if (value === false) return <XIcon />;
  return (
    <span className="font-manrope text-[14px] leading-5.5acking-[-0.084px] text-[#515B60]">
      {value}
    </span>
  );
};

function MobileFeatureValue({ label, value }: { label: string; value: string | boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 border-t border-[#D8DDD9] py-3 first:border-t-0 first:pt-0 last:pb-0">
      <span className="font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#607077]">
        {label}
      </span>
      <span className="flex shrink-0 items-center justify-end text-right">
        {renderValue(value)}
      </span>
    </div>
  );
}

export function MembershipComparison() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');

  return (
    <section className="relative w-full bg-[#E9F1EE] py-20 md:py-40">
      <div className="mx-auto flex w-full max-w-368 flex-col items-center gap-20 px-5 sm:px-8 min-[1504px]:px-0">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="rounded-[12px] border border-[#fae1d9] bg-[#fce9e3] px-3 py-1.5">
            <span className="font-manrope text-[14px] leading-5.5 tracking-[-0.084px] text-[#614840]">
              Compare Plan
            </span>
          </div>
          <h2 className="font-nunito text-[32px] font-semibold leading-10 tracking-[-0.48px] text-[#263238] md:text-[48px] md:leading-14">
            Detailed Memberships Features Comparison
          </h2>
        </div>

        <div className="flex w-full flex-col gap-8">
          <div className="w-full rounded-[16px] border border-[#accbcb] bg-[#f9fafa] p-4 sm:p-7">
            <div className="grid grid-cols-1 gap-8 min-[1100px]:grid-cols-[215px_minmax(0,1fr)] min-[1100px]:gap-0">
              <div className="flex flex-col gap-8">
                <h3 className="font-nunito text-[20px] font-medium leading-7 text-[#263238]">
                  Choose the Perfect Plan for Your Kids
                </h3>
                <div className="flex w-fit items-center gap-0.5 rounded-[24px] bg-[#d5e5e5] p-0.5">
                  <button
                    type="button"
                    aria-pressed={billingCycle === 'monthly'}
                    onClick={() => setBillingCycle('monthly')}
                    className={`flex items-center justify-center rounded-[24px] px-3 py-2.25 font-nunito text-[14px] font-medium leading-5 tracking-[-0.084px] transition-colors ${
                      billingCycle === 'monthly'
                        ? 'border border-white bg-[#2f7d7e] text-white shadow-[0px_8px_13px_rgba(3,63,63,0.05)]'
                        : 'text-[#656175]'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    type="button"
                    aria-pressed={billingCycle === 'annual'}
                    onClick={() => setBillingCycle('annual')}
                    className={`flex items-center justify-center rounded-[24px] p-2.5 font-nunito text-[14px] font-medium leading-5 tracking-[-0.084px] transition-colors ${
                      billingCycle === 'annual' ? 'bg-[#2f7d7e] text-white' : 'text-[#656175]'
                    }`}
                  >
                    Annually
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 min-[1100px]:flex min-[1100px]:items-center min-[1100px]:justify-between min-[1100px]:gap-12">
                <PlanSummary title="Little Steps" price="Free" action="Start Free" />
                <PlanSummary
                  title="Grow Together"
                  price={`$${billingCycle === 'monthly' ? '12' : '115'}`}
                  period={billingCycle === 'monthly' ? '/monthly' : '/yearly'}
                  action="Get Started"
                  highlighted
                />
                <PlanSummary
                  title="Personalized Pathways"
                  price={`$${billingCycle === 'monthly' ? '35' : '336'}`}
                  period={billingCycle === 'monthly' ? '/monthly' : '/yearly'}
                  action="Choose Personalized Pathways"
                />
              </div>
            </div>
          </div>

          <div className="w-full overflow-hidden rounded-[16px] border border-[#accbcb] bg-white max-md:hidden">
            <div className="grid grid-cols-[35.055%_21.331%_21.331%_22.283%] border-b border-[#accbcb]">
              <div className="flex items-center rounded-tl-[16px] bg-[#d5e5e5] px-4 py-3.5 md:px-6">
                <span className="font-manrope text-[14px] font-semibold tracking-[0.84px] text-[#263238]">
                  Feature
                </span>
              </div>
              <div className="flex items-center justify-center bg-[#d5e5e5] px-4 py-3.5 md:px-15">
                <span className="font-manrope text-[14px] font-semibold tracking-[0.84px] text-[#263238]">
                  Little Steps
                </span>
              </div>
              <div className="flex items-center justify-center bg-[#d5e5e5] px-4 py-3.5 md:px-15">
                <span className="font-manrope text-[14px] font-semibold tracking-[0.84px] text-[#2f7d7e]">
                  Grow Together
                </span>
              </div>
              <div className="flex items-center justify-center rounded-tr-[16px] bg-[#d5e5e5] px-4 py-3.5 md:px-15">
                <span className="font-manrope text-[14px] font-semibold tracking-[0.84px] text-[#263238]">
                  Personalized Pathways
                </span>
              </div>
            </div>

            <div className="flex flex-col rounded-b-[16px] bg-white">
              {features.map((feature, index) => {
                const isLast = index === features.length - 1;
                return (
                  <div
                    key={feature.name}
                    className={`grid grid-cols-[35.055%_21.331%_21.331%_22.283%] transition-colors hover:bg-gray-50/50 ${
                      !isLast ? 'border-b border-[#accbcb]' : ''
                    }`}
                  >
                    <div className="flex min-w-0 items-center px-4 py-3.5 md:px-6">
                      <span className="font-manrope text-[14px] font-normal leading-5.5 tracking-[-0.084px] text-[#263238]">
                        {feature.name}
                      </span>
                    </div>
                    <div className="flex min-w-0 items-center justify-center px-2 py-3.5 md:px-15">
                      {renderValue(feature.little)}
                    </div>
                    <div className="flex min-w-0 items-center justify-center bg-[rgba(220,238,238,0.28)] px-2 py-3.5 md:px-15">
                      {typeof feature.grow === 'string' ? (
                        <span className="font-nunito text-[14px] font-semibold leading-5 tracking-[-0.084px] text-[#263238]">
                          {feature.grow}
                        </span>
                      ) : (
                        renderValue(feature.grow)
                      )}
                    </div>
                    <div className="flex min-w-0 items-center justify-center px-2 py-3.5 md:px-15">
                      {renderValue(feature.personalized)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex w-full flex-col gap-3 md:hidden">
            {features.map((feature) => (
              <article
                key={feature.name}
                className="rounded-[16px] border border-[#ACCBCC] bg-white p-4 shadow-[0_2px_6px_rgba(23,74,77,0.04)]"
              >
                <h3 className="mb-4 font-nunito text-lg font-semibold leading-6 text-[#263238]">
                  {feature.name}
                </h3>
                <MobileFeatureValue label="Little Steps" value={feature.little} />
                <MobileFeatureValue label="Grow Together" value={feature.grow} />
                <MobileFeatureValue label="Personalized Pathways" value={feature.personalized} />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PlanSummary({
  title,
  price,
  period,
  action,
  highlighted = false,
}: {
  title: string;
  price: string;
  period?: string;
  action: string;
  highlighted?: boolean;
}) {
  return (
    <div className="flex w-full min-w-0 flex-col items-start gap-3 min-[1100px]:w-68.25 last:min-[1100px]:w-68.5">
      <div className="flex w-40.5 flex-col items-start gap-4">
        <p className="font-nunito text-[16px] font-medium leading-6 tracking-[-0.176px] text-[#263238]">
          {title}
        </p>
        <div className="flex items-center gap-3 whitespace-nowrap">
          <p className="font-nunito text-[32px] font-medium leading-10 tracking-[-0.16px] text-black">
            {price}
          </p>
          {period && (
            <p className="font-manrope text-[16px] leading-6 tracking-[-0.176px] text-[#a8adaf]">
              {period}
            </p>
          )}
        </div>
      </div>
      <Link
        href="/register"
        className={`flex min-h-12 w-full items-center justify-center gap-2 rounded-full border-2 px-3 py-3.5 font-nunito text-[16px] font-medium leading-6 tracking-[-0.176px] text-center transition-colors min-[1100px]:px-6.5 ${
          highlighted
            ? 'border-[#d5e5e5] bg-[#2f7d7e] text-white'
            : 'border-[#d5e5e5] bg-white text-[#2f7d7e]'
        }`}
      >
        <span>{action}</span>
        {highlighted && <ArrowUpRight aria-hidden="true" className="size-4 shrink-0" />}
      </Link>
    </div>
  );
}
