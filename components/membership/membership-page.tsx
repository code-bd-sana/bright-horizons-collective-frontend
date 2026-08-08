'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { membershipPlans, type MembershipPlan } from '@/components/membership/membership-plans';

const MEMBERSHIP_ASSET_ROOT = '/Membership/';
const HOME_ASSET_ROOT = '/Home/';

type BillingCycle = 'monthly' | 'annual';

const trialBenefits = ['7-day premium trial', 'Cancel anytime', 'Secure payment'];

const formatPrice = (price: number | undefined) => (price === undefined ? '' : `$${price}`);

function BillingToggle({
  billingCycle,
  onChange,
}: {
  billingCycle: BillingCycle;
  onChange: (billingCycle: BillingCycle) => void;
}) {
  const optionClass = (option: BillingCycle) =>
    `flex items-center justify-center rounded-[24px] font-nunito text-base font-medium leading-6 tracking-[-0.176px] transition-colors ${
      billingCycle === option
        ? 'border border-[#F5EEFF] bg-[#2F7D7E] text-white shadow-[0_8px_20px_rgba(0,0,0,0.14)]'
        : 'text-[#656175]'
    }`;

  return (
    <div
      aria-label="Billing frequency"
      className="flex h-12 items-center gap-0.5 overflow-hidden rounded-[24px] bg-[#D5E5E5] p-0.5"
    >
      <button
        type="button"
        aria-pressed={billingCycle === 'monthly'}
        onClick={() => onChange('monthly')}
        className={`${optionClass('monthly')} h-11 w-[107px] px-2.5`}
      >
        Bill monthly
      </button>
      <button
        type="button"
        aria-pressed={billingCycle === 'annual'}
        onClick={() => onChange('annual')}
        className={`${optionClass('annual')} h-[42px] w-[193px] gap-1.5 px-3`}
      >
        <span>Bill annually</span>
        <span className="flex h-[22px] w-[74px] items-center justify-center rounded-[12px] border border-[#F5EEFF] bg-white font-nunito text-xs font-medium leading-4 text-[#2F7D7E]">
          Save 20%
        </span>
      </button>
    </div>
  );
}

function FeatureCheck({ paid = false }: { paid?: boolean }) {
  return (
    <span className="mt-[3px] flex size-4 shrink-0 items-center justify-center rounded-[9px] bg-[#E9F1EE]">
      <Image
        src={`${MEMBERSHIP_ASSET_ROOT}${paid ? 'feature-check-paid.svg' : 'feature-check-free.svg'}`}
        alt=""
        width={10}
        height={10}
        aria-hidden="true"
      />
    </span>
  );
}

function MembershipCard({
  plan,
  billingCycle,
  className = '',
}: {
  plan: MembershipPlan;
  billingCycle: BillingCycle;
  className?: string;
}) {
  const isFree = !plan.monthlyPrice;
  const displayedPrice = formatPrice(
    billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice
  );

  return (
    <article
      aria-label={`${plan.name} membership`}
      className={`relative h-[654px] w-full max-w-[422px] rounded-[20px] bg-white ${
        plan.popular
          ? 'border-2 border-[rgba(47,125,126,0.2)] p-8 shadow-[0_99px_14px_rgba(47,125,126,0),0_63px_12.5px_rgba(47,125,126,0.01),0_36px_10.5px_rgba(47,125,126,0.05),0_16px_8px_rgba(47,125,126,0.09),0_4px_4.5px_rgba(47,125,126,0.1)]'
          : 'border border-[#D8DDD9] p-8 shadow-[0_2px_6px_rgba(23,74,77,0.06)]'
      } ${className}`}
    >
      {plan.popular && (
        <>
          <span className="pointer-events-none absolute -top-16 left-1/2 flex size-[70px] -translate-x-1/2 items-center justify-center min-[1400px]:left-[209px] min-[1400px]:translate-x-0">
            <span className="relative block size-[70px] -scale-y-100 rotate-180">
              <Image
                src={`${HOME_ASSET_ROOT}figma-home-1183-11846-img-image23.png`}
                alt=""
                fill
                sizes="70px"
                aria-hidden="true"
                className="object-cover"
              />
            </span>
          </span>
          <span className="absolute -top-[15px] left-1/2 flex h-[26px] -translate-x-1/2 items-center rounded-full bg-[#F2B59F] px-[18px] py-[5px] font-manrope text-[10px] font-extrabold leading-4 tracking-[0.7616px] whitespace-nowrap text-white">
            MOST POPULAR
          </span>
        </>
      )}

      <div className="flex w-full flex-col gap-4">
        <div className={plan.popular ? 'h-[84px]' : 'h-[60px]'}>
          <h2 className="font-nunito text-xl font-semibold leading-7 text-[#2F7D7E]">
            {plan.name}
          </h2>
          <p className="mt-2 font-manrope text-sm leading-6 text-[#515B60]">{plan.description}</p>
        </div>

        <div className="flex h-[106px] flex-col gap-2">
          <p
            className="flex h-12 items-baseline gap-1 font-nunito text-[40px] font-semibold leading-12 tracking-[-0.4px] text-[#263238]"
            aria-live="polite"
          >
            {isFree ? 'Free' : displayedPrice}
            {!isFree && billingCycle === 'annual' && (
              <span className="font-manrope text-base font-normal leading-6 tracking-[-0.176px] text-[#A8ADAF] line-through">
                {formatPrice(plan.annualRegularPrice)}
              </span>
            )}
          </p>
          <Link
            href="/register"
            className={`flex h-[50px] w-full items-center justify-center rounded-full border-2 px-[26px] py-3.5 font-manrope text-[14.4px] font-bold leading-[21.6px] whitespace-nowrap ${
              plan.popular
                ? 'border-[#D5E5E5] bg-[#2F7D7E] text-white'
                : 'border-[#D5E5E5] bg-white text-[#2F7D7E]'
            }`}
          >
            {plan.action}
          </Link>
        </div>

        <div className="flex flex-col gap-2 py-4">
          {plan.featuresHeading && (
            <p className="font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#7D8488]">
              {plan.featuresHeading}
            </p>
          )}
          <ul className="flex flex-col gap-2">
            {plan.features.map((feature) => (
              <li
                key={feature}
                className="flex gap-2.5 font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#263238]"
              >
                <FeatureCheck paid={!isFree} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export function MembershipPage() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('annual');

  return (
    <main className="relative bg-[#FDFDFC] text-[#263238]">
      <section
        aria-labelledby="membership-heading"
        className="relative min-h-screen overflow-x-clip bg-[#FDFDFC] px-5 pt-32 pb-24 sm:px-8 min-[1400px]:h-[1434px] min-[1400px]:min-h-0 min-[1400px]:p-0"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 hidden h-[1253px] overflow-hidden min-[1400px]:block"
        >
          <Image
            src={`${MEMBERSHIP_ASSET_ROOT}cloud.svg`}
            alt=""
            width={2148}
            height={519}
            priority
            className="absolute top-[915px] left-1/2 h-[519px] w-[2148px] max-w-none -translate-x-1/2 rotate-180"
          />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-[671px] flex-col items-center gap-8 text-center min-[1400px]:absolute min-[1400px]:top-48 min-[1400px]:left-1/2 min-[1400px]:mx-0 min-[1400px]:-translate-x-1/2">
          <div className="flex w-full flex-col items-center gap-4">
            <div className="flex h-[34px] w-[178px] items-center rounded-xl border border-[#E8EBE8] bg-white px-2 py-1.5">
              <div className="flex items-center gap-2.5">
                <span className="flex items-center gap-1">
                  <Image
                    src={`${MEMBERSHIP_ASSET_ROOT}rating-star.svg`}
                    alt=""
                    width={16}
                    height={16}
                    aria-hidden="true"
                  />
                  <span className="font-manrope text-sm leading-[22px] tracking-[-0.084px]">
                    4.9
                  </span>
                </span>
                <span aria-hidden="true" className="h-2.5 w-px bg-[#D8DDD9]" />
                <span className="font-manrope text-sm leading-[22px] tracking-[-0.084px] whitespace-nowrap">
                  2,400+ families
                </span>
              </div>
            </div>

            <h1
              id="membership-heading"
              className="w-full font-nunito text-[40px] font-semibold leading-[48px] tracking-[-0.56px] text-[#263238] sm:text-5xl sm:leading-14 min-[1400px]:text-[56px] min-[1400px]:leading-16"
            >
              Choose the membership that&apos;s{' '}
              <span className="text-[#F2B59F]">right for your family.</span>
            </h1>

            <p className="max-w-[621px] font-manrope text-base leading-6 tracking-[-0.176px] text-[#607077]">
              Whether you&apos;re exploring developmental activities or looking for personalized
              weekly guidance, we have a membership designed to support your family&apos;s journey.
            </p>
          </div>

          <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center">
            {trialBenefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-2">
                <Image
                  src={`${MEMBERSHIP_ASSET_ROOT}trial-check.svg`}
                  alt=""
                  width={20}
                  height={20}
                  aria-hidden="true"
                />
                <span className="font-manrope text-base leading-6 tracking-[-0.176px] whitespace-nowrap text-[#656175]">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative z-10 mx-auto mt-10 flex w-fit min-[1400px]:absolute min-[1400px]:top-[570px] min-[1400px]:left-1/2 min-[1400px]:mt-0 min-[1400px]:-translate-x-1/2">
          <BillingToggle billingCycle={billingCycle} onChange={setBillingCycle} />
        </div>

        <div className="relative z-10 mx-auto mt-28 flex max-w-[1314px] flex-col items-center gap-6 min-[1400px]:absolute min-[1400px]:top-[724px] min-[1400px]:left-1/2 min-[1400px]:mt-0 min-[1400px]:w-[1314px] min-[1400px]:-translate-x-1/2 min-[1400px]:flex-row min-[1400px]:items-start">
          <MembershipCard
            plan={membershipPlans[0]}
            billingCycle={billingCycle}
            className="min-[1400px]:mt-14 min-[1400px]:shrink-0"
          />
          <MembershipCard
            plan={membershipPlans[1]}
            billingCycle={billingCycle}
            className="mt-10 min-[1400px]:mt-0 min-[1400px]:shrink-0"
          />
          <MembershipCard
            plan={membershipPlans[2]}
            billingCycle={billingCycle}
            className="min-[1400px]:mt-13 min-[1400px]:shrink-0"
          />
        </div>
      </section>
    </main>
  );
}

export default MembershipPage;
