'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { type ReactNode, useMemo } from 'react';
import type { MembershipPlan, MembershipTier } from '@/components/membership/membership-plans';

const ASSET_ROOT = '/Home/';

type Plan = {
  id?: string;
  name: string;
  description: string;
  price: string;
  action: string;
  href: string;
  featuresHeading?: string;
  features: ReactNode[];
  accent?: boolean;
  popular?: boolean;
};

const defaultPlans: Plan[] = [
  {
    name: 'Little Steps',
    description: 'Perfect for exploring Bright Horizons Collective.',
    price: 'Free',
    action: 'Start Free',
    href: '/register',
    features: [
      'Access to the Starter Resource Library (worksheets, seasonal mini activity packs, fine motor activities, tracing & visual scanning sheets)',
      '3 exclusive worksheets',
      'Monthly 4-week activity guide',
      '1 parent coaching question',
    ],
  },
  {
    name: 'Grow Together',
    description: 'Perfect for families wanting additional developmental support.',
    price: '$15',
    action: 'Choose Grow Together',
    href: '/membership',
    featuresHeading: 'Everything in Little Steps, plus:',
    features: [
      'Full Explore Library',
      'Parent Resources',
      'Save favorites',
      'Five developmental questions each month',
    ],
    accent: true,
    popular: true,
  },
  {
    name: 'Personalized Pathways',
    description: 'Our most personalized experience.',
    price: '$40',
    action: 'Choose Personalized Pathways',
    href: '/membership',
    featuresHeading: 'Includes everything in Grow Together plus',
    features: [
      'Personalized weekly plans',
      'Child-specific recommendations',
      'Progress tracking',
      'Parent feedback',
      'Premium resources',
      'Priority support',
    ],
  },
];

function formatPrice(amount?: number | null): string {
  if (amount === undefined || amount === null || amount <= 0) return 'Free';
  return Number.isInteger(amount) ? `$${amount}` : `$${amount.toFixed(2)}`;
}

function renderFeatureText(feature: ReactNode): ReactNode {
  if (typeof feature !== 'string') return feature;
  const parenIndex = feature.indexOf('(');
  if (parenIndex === -1) return feature;
  const mainText = feature.slice(0, parenIndex);
  const subText = feature.slice(parenIndex);
  return (
    <>
      {mainText} <span className="text-[#7D8488]">{subText}</span>
    </>
  );
}

function FeatureCheck({ accent = false }: { accent?: boolean }) {
  return (
    <span className="mt-0.75 inline-flex size-4 shrink-0 items-center justify-center rounded-[9px] bg-[#E9F1EE]">
      <Image
        src={`${ASSET_ROOT}${accent ? 'figma-home-1183-11846-img-icon1.svg' : 'figma-home-1183-11846-img-icon.svg'}`}
        alt=""
        width={10}
        height={10}
        aria-hidden="true"
      />
    </span>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <article
      className={`relative flex min-h-155 h-full w-full max-w-105.5 flex-col rounded-[20px] bg-white p-6 sm:p-8.25 ${
        plan.accent
          ? 'border-2 border-[#2F7D7E] shadow-[0_48px_6.5px_rgba(49,132,135,0),0_31px_6px_rgba(49,132,135,0.02),0_17px_5px_rgba(49,132,135,0.08),0_8px_4px_rgba(49,132,135,0.13),0_2px_2px_rgba(49,132,135,0.15)]'
          : 'border border-[#D8DDD9] shadow-[0_2px_6px_rgba(23,74,77,0.06)]'
      }`}
    >
      {plan.popular && (
        <>
          <Image
            src={`${ASSET_ROOT}figma-home-1183-11846-img-image23.png`}
            alt=""
            width={70}
            height={70}
            aria-hidden="true"
            className="pointer-events-none absolute -top-15.75 left-1/2 -translate-x-1/2 rotate-180 scale-y-[-1]"
          />
          <span className="absolute -top-3.5 left-1/2 inline-flex h-6.5 -translate-x-1/2 items-center whitespace-nowrap rounded-full bg-[#F2B59F] px-4.5 font-manrope text-[10px] font-extrabold leading-4 tracking-[0.762px] text-[#614840]">
            MOST POPULAR
          </span>
        </>
      )}
      <div className="flex h-full w-full flex-col justify-between">
        <div>
          <div className="min-h-15">
            <h3 className="font-nunito text-xl font-semibold leading-7 text-[#2F7D7E]">
              {plan.name}
            </h3>
            <p className="mt-1 font-manrope text-sm leading-6 text-[#515B60]">{plan.description}</p>
          </div>
          <div className="mt-4">
            <div className="flex h-12 items-end gap-1">
              <span className="font-nunito text-[36px] sm:text-[40px] font-semibold leading-12 tracking-[-0.4px] text-[#263238]">
                {plan.price}
              </span>
              {plan.price !== 'Free' && (
                <span className="mb-1.25 font-manrope text-base leading-6 text-[#515B60]">
                  /month
                </span>
              )}
            </div>
            <Link
              href={plan.href}
              className={`mt-3 flex h-12.5 w-full items-center justify-center rounded-full border-2 px-6.5 py-3.5 font-manrope text-[14.4px] font-bold leading-[21.6px] transition-colors ${
                plan.accent
                  ? 'border-[#2F7D7E] bg-[#2F7D7E] text-white hover:bg-[#174A4D]'
                  : 'border-[#D5E5E5] bg-white text-[#2F7D7E] hover:bg-[#F0F8F5]'
              }`}
            >
              {plan.action}
            </Link>
          </div>
        </div>
        <div className="mt-6 border-t border-[#D8DDD9] pt-4">
          {plan.featuresHeading && (
            <p className="mb-2 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#7D8488]">
              {plan.featuresHeading}
            </p>
          )}
          <ul className="space-y-2">
            {plan.features.map((feature, index) => (
              <li
                key={`${plan.name}-${index}`}
                className="flex gap-2.5 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#263238]"
              >
                <FeatureCheck accent={Boolean(plan.accent)} />
                <span>{renderFeatureText(feature)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

const comparisonRows = [
  ['Resource Library Access', 'Starter Library', 'Starter + Growth', 'Full Library'],
  ['Monthly Worksheets', '3', '10–15', '20+'],
  ['Weekly Activity Plan', 'check', 'check', 'check-support'],
  ['Email Coaching Questions', '1 / month', '3 / month', '5 / month'],
  ['Consulting Discount', '—', '10%', '20%'],
  ['Priority Response', '—', '—', 'check-support'],
] as const;

function CompareCheck({ support = false }: { support?: boolean }) {
  return (
    <Image
      src={`${ASSET_ROOT}${support ? 'figma-home-1183-11993-img-icon1.svg' : 'figma-home-1183-11993-img-icon.svg'}`}
      alt=""
      width={16}
      height={16}
      aria-hidden="true"
    />
  );
}

function ComparisonCell({ value, growth }: { value: string; growth?: boolean }) {
  if (value === 'check' || value === 'check-support') {
    return <CompareCheck support={value === 'check-support'} />;
  }
  if (value === '—') {
    return <span className="font-manrope text-base leading-4 text-[#607077]">{value}</span>;
  }
  return (
    <span
      className={
        growth
          ? 'font-nunito text-sm font-semibold leading-5 tracking-[-0.084px] text-[#263238]'
          : 'font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#515B60]'
      }
    >
      {value}
    </span>
  );
}

function ComparisonTable() {
  return (
    <div
      id="membership-comparison"
      className="h-113 w-243.5 overflow-hidden rounded-[20px] border-2 border-[#E9F1EE] bg-white p-2 shadow-[0_2px_14px_rgba(23,74,77,0.06)]"
    >
      <div className="h-18.75 border-b border-[#D8DDD9] bg-[#EDF6F6] px-8 pt-6.5">
        <h3 className="font-nunito text-xl font-medium leading-7 text-[#263238]">
          Compare all features
        </h3>
      </div>
      <div className="grid grid-cols-[350.266px_210.344px_239.813px_172.578px]">
        {['Feature', 'Starter', 'Growth', 'Support'].map((heading, index) => (
          <div
            key={heading}
            className={`flex h-[49.5px] items-center border-b border-[#D8DDD9] font-manrope text-sm font-semibold leading-5.5 tracking-[0.84px] ${
              index === 0 ? 'pl-6' : 'justify-center text-center'
            } ${index === 2 ? 'bg-[rgba(220,238,238,0.50)] text-[#2F7D7E]' : 'text-[#263238]'}`}
          >
            {heading}
          </div>
        ))}
        {comparisonRows.flatMap((row, rowIndex) =>
          row.map((value, columnIndex) => {
            const noBorder = rowIndex === comparisonRows.length - 1;
            const fixedHeight =
              rowIndex === 2
                ? 'h-[52px]'
                : rowIndex === comparisonRows.length - 1
                  ? 'h-[54.5px]'
                  : 'h-[55px]';
            const isDash = value === '—';
            return (
              <div
                key={`${row[0]}-${columnIndex}`}
                className={`flex ${fixedHeight} ${isDash ? 'items-start pt-[15.5px]' : 'items-center'} ${columnIndex === 0 ? 'pl-6' : 'justify-center text-center'} ${
                  noBorder ? '' : 'border-b border-[#D8DDD9]'
                } ${columnIndex === 2 ? 'bg-[rgba(220,238,238,0.28)]' : ''}`}
              >
                {columnIndex === 0 ? (
                  <span className="font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#515B60]">
                    {value}
                  </span>
                ) : (
                  <ComparisonCell value={value} growth={columnIndex === 2} />
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

function DesktopMembership({ plans }: { plans: Plan[] }) {
  return (
    <section
      id="membership"
      className="hidden h-[1836px] bg-[#FDFDFC] px-20 py-40 min-[1600px]:block"
    >
      <div className="mx-auto flex h-379 max-w-[1760px] flex-col gap-10">
        <div className="h-256">
          <div className="mx-auto h-42.5 w-275 text-center">
            <span className="inline-flex rounded-xl border border-[#FAE1D9] bg-[#F2B59F] px-2 py-1.5 font-manrope text-sm leading-5.5 text-[#614840]">
              Membership
            </span>
            <h2 className="mt-3 font-nunito text-[48px] font-semibold leading-14 tracking-[-0.48px] text-[#263238]">
              Choose the membership that&apos;s right for your family.
            </h2>
            <p className="mx-auto mt-3 w-213 font-manrope text-base leading-6 tracking-[-0.176px] text-[#607077]">
              Whether you&apos;re exploring developmental activities or looking for personalized
              weekly guidance, we have a membership designed to support your family&apos;s journey.
            </p>
          </div>

          <div className="mt-20 flex h-163.5 justify-center gap-6">
            {plans.map((plan) => (
              <PlanCard key={plan.id || plan.name} plan={plan} />
            ))}
          </div>
          <a
            href="#membership-comparison"
            className="mx-auto mt-20 flex h-10 w-105.5 items-center justify-center gap-2 rounded-full border border-[#ACCBCB] bg-[#F6E6D4] font-nunito text-base font-medium leading-6 text-[#263238]"
          >
            Compare Membership
            <Image
              src={`${ASSET_ROOT}figma-home-1183-11846-img-vector.svg`}
              alt=""
              width={16}
              height={16}
              aria-hidden="true"
            />
          </a>
        </div>
        <div className="mx-auto">
          <ComparisonTable />
        </div>
      </div>
    </section>
  );
}

function CompactMembership({ plans }: { plans: Plan[] }) {
  return (
    <section
      id="membership-compact"
      className="bg-[#FDFDFC] px-4 py-16 min-[1600px]:hidden sm:px-8 sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-290">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-xl border border-[#FAE1D9] bg-[#F2B59F] px-2 py-1.5 font-manrope text-sm leading-5.5 text-[#614840]">
            Membership
          </span>
          <h2 className="mt-3 font-nunito text-[clamp(28px,5vw,48px)] font-semibold leading-tight tracking-[-0.48px] text-[#263238]">
            Choose the membership that&apos;s right for your family.
          </h2>
          <p className="mt-3 font-manrope text-sm sm:text-base leading-6 text-[#607077]">
            Whether you&apos;re exploring developmental activities or looking for personalized
            weekly guidance, we have a membership designed to support your family&apos;s journey.
          </p>
        </div>
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {plans.map((plan) => (
            <PlanCard key={plan.id || plan.name} plan={plan} />
          ))}
        </div>
        <div className="mt-12 sm:mt-16 text-center">
          <a
            href="#membership-comparison-compact"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#ACCBCB] bg-[#F6E6D4] px-6 font-nunito text-sm sm:text-base font-medium leading-6 text-[#263238] hover:bg-[#F2B59F]/30 transition-colors"
          >
            Compare Membership
            <Image
              src={`${ASSET_ROOT}figma-home-1183-11846-img-vector.svg`}
              alt=""
              width={16}
              height={16}
              aria-hidden="true"
            />
          </a>
        </div>
        <div
          id="membership-comparison-compact"
          className="mt-12 sm:mt-16 w-full overflow-x-auto pb-4 scrollbar-thin"
        >
          <div className="min-w-243.5 flex justify-center">
            <ComparisonTable />
          </div>
        </div>
      </div>
    </section>
  );
}

export function MembershipSection({ initialPlans }: { initialPlans?: MembershipPlan[] }) {
  const { data: serverPlans } = useQuery<MembershipPlan[]>({
    queryKey: ['public-membership-plans'],
    queryFn: async () => {
      const res = await fetch('/api/memberships/plans');
      if (!res.ok) throw new Error('Failed to load membership plans');
      const data = await res.json();
      return Array.isArray(data) ? data : data?.data || [];
    },
    initialData: initialPlans,
    staleTime: 60 * 1000,
  });

  const plans = useMemo(() => {
    if (!serverPlans || serverPlans.length === 0) return defaultPlans;

    const tierOrder: MembershipTier[] = ['LITTLE_STEPS', 'GROW_TOGETHER', 'PERSONALIZED_PATHWAYS'];

    const mappedTiers: Plan[] = tierOrder.map((tier) => {
      const matched = serverPlans.find((p) => p.tier === tier);
      const fallback =
        defaultPlans.find((p) =>
          tier === 'LITTLE_STEPS'
            ? p.name === 'Little Steps'
            : tier === 'GROW_TOGETHER'
              ? p.name === 'Grow Together'
              : p.name === 'Personalized Pathways'
        ) || defaultPlans[0];

      if (!matched) return fallback;

      const monthlyPrice =
        matched.monthlyPrice ?? (tier === 'LITTLE_STEPS' ? 0 : tier === 'GROW_TOGETHER' ? 15 : 40);
      const effectivePrice = matched.effectiveMonthlyPrice ?? monthlyPrice;
      const isFree = monthlyPrice === 0 || effectivePrice === 0;

      return {
        id: matched.id,
        name: matched.name || fallback.name,
        description: matched.description || fallback.description,
        price: formatPrice(effectivePrice),
        action: isFree ? 'Start Free' : `Choose ${matched.name || fallback.name}`,
        href: isFree ? '/register' : '/membership',
        featuresHeading:
          tier === 'GROW_TOGETHER'
            ? 'Everything in Little Steps, plus:'
            : tier === 'PERSONALIZED_PATHWAYS'
              ? 'Includes everything in Grow Together plus'
              : undefined,
        features:
          matched.features && matched.features.length > 0 ? matched.features : fallback.features,
        accent: Boolean(matched.isPopular || matched.popular || tier === 'GROW_TOGETHER'),
        popular: Boolean(matched.isPopular || matched.popular),
      };
    });

    const extraPlans: Plan[] = serverPlans
      .filter((p) => p.tier && !tierOrder.includes(p.tier))
      .map((extra) => {
        const monthlyPrice = extra.monthlyPrice ?? 0;
        const effectivePrice = extra.effectiveMonthlyPrice ?? monthlyPrice;
        const isFree = monthlyPrice === 0 || effectivePrice === 0;

        return {
          id: extra.id,
          name: extra.name,
          description: extra.description || '',
          price: formatPrice(effectivePrice),
          action: isFree ? 'Start Free' : `Choose ${extra.name}`,
          href: isFree ? '/register' : '/membership',
          featuresHeading: undefined,
          features: extra.features || [],
          accent: Boolean(extra.isPopular || extra.popular),
          popular: Boolean(extra.isPopular || extra.popular),
        };
      });

    return [...mappedTiers, ...extraPlans];
  }, [serverPlans]);

  return (
    <>
      <DesktopMembership plans={plans} />
      <CompactMembership plans={plans} />
    </>
  );
}
