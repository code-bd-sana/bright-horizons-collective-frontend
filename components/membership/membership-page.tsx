'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loader2, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { toast } from 'sonner';

import {
  membershipPlans as defaultPlans,
  TIER_RANKS,
  type MembershipPlan,
  type MembershipTier,
} from '@/components/membership/membership-plans';
import { MembershipComparison } from '@/components/membership/membership-comparison';
import { MembershipFaqSection } from '@/components/membership/membership-faq-section';
import { MembershipFinalCta } from '@/components/membership/membership-final-cta';
import { MembershipTestimonials } from '@/components/membership/membership-testimonials';
import { useSession } from '@/services/api/auth/auth.queries';

const MEMBERSHIP_ASSET_ROOT = '/Membership/';
const HOME_ASSET_ROOT = '/Home/';

type BillingCycle = 'monthly' | 'annual';

const trialBenefits = ['7-day premium trial', 'Cancel anytime', 'Secure payment'];

const formatPrice = (price: number | undefined) => (price === undefined ? '' : `$${price}`);

function BillingToggle({
  billingCycle,
  annualDiscount,
  onChange,
}: {
  billingCycle: BillingCycle;
  annualDiscount?: number;
  onChange: (billingCycle: BillingCycle) => void;
}) {
  const optionClass = (option: BillingCycle) =>
    `flex shrink-0 items-center justify-center rounded-[24px] font-nunito text-base font-medium leading-6 tracking-[-0.176px] whitespace-nowrap transition-colors ${
      billingCycle === option
        ? 'border border-[#F5EEFF] bg-[#2F7D7E] text-white shadow-[0_8px_20px_rgba(0,0,0,0.14)]'
        : 'text-[#656175]'
    }`;

  return (
    <div
      aria-label="Billing frequency"
      className="flex h-11 w-full max-w-69 items-center gap-0.5 overflow-hidden rounded-[24px] bg-[#D5E5E5] p-0.5 sm:h-12 sm:max-w-75"
    >
      <button
        type="button"
        aria-pressed={billingCycle === 'monthly'}
        onClick={() => onChange('monthly')}
        className={`${optionClass('monthly')} h-10 w-22 text-sm sm:h-11 sm:w-26.75 sm:text-base ${
          billingCycle === 'monthly' ? 'px-1 sm:px-2.25' : 'px-1 sm:p-2.5'
        }`}
      >
        <span>Bill monthly</span>
      </button>
      <button
        type="button"
        aria-pressed={billingCycle === 'annual'}
        onClick={() => onChange('annual')}
        className={`${optionClass('annual')} h-10 w-44.5 gap-1 px-2 text-sm sm:h-10.5 sm:w-48.25 sm:gap-1.5 sm:px-3 sm:text-base`}
      >
        <span className="whitespace-nowrap">Bill annually</span>
        <span className="flex h-5 items-center justify-center rounded-[12px] border border-[#F5EEFF] bg-white px-2 font-nunito text-[11px] font-medium leading-4 text-[#2F7D7E] sm:h-5.5 sm:text-xs">
          Save {annualDiscount ?? 20}%
        </span>
      </button>
    </div>
  );
}

function FeatureCheck({ paid = false }: { paid?: boolean }) {
  return (
    <span className="mt-0.75 flex size-4 shrink-0 items-center justify-center rounded-[9px] bg-[#E9F1EE]">
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
  isCurrentPlan,
  isLowerTier,
  isUpgrade,
  unusedCredit,
  daysRemaining,
  activePlanName,
  isCheckingOut,
  onSelectPlan,
  className = '',
}: {
  plan: MembershipPlan;
  billingCycle: BillingCycle;
  isCurrentPlan: boolean;
  isLowerTier: boolean;
  isUpgrade: boolean;
  unusedCredit: number;
  daysRemaining: number;
  activePlanName?: string;
  isCheckingOut: boolean;
  onSelectPlan: (plan: MembershipPlan) => void;
  className?: string;
}) {
  const isFree = plan.tier === 'LITTLE_STEPS' || (!plan.monthlyPrice && !plan.annualPrice);

  const effectiveMonthly =
    plan.effectiveMonthlyPrice !== undefined
      ? plan.effectiveMonthlyPrice
      : (plan.monthlyPrice ?? 0) * (1 - (plan.monthlyDiscount ?? 0) / 100);

  const regularAnnual =
    plan.annualPrice && plan.annualPrice > 0 ? plan.annualPrice : (plan.monthlyPrice ?? 0) * 12;

  const effectiveAnnual =
    plan.effectiveAnnualPrice !== undefined
      ? plan.effectiveAnnualPrice
      : regularAnnual * (1 - (plan.annualDiscount ?? 0) / 100);

  const basePrice = billingCycle === 'annual' ? effectiveAnnual : effectiveMonthly;

  // Prorated calculation for upgrades
  const proratedCharge =
    isUpgrade && unusedCredit > 0
      ? Math.max(0.5, Math.round((basePrice - unusedCredit) * 100) / 100)
      : basePrice;

  const displayedPrice = isFree ? 'Free' : formatPrice(proratedCharge);

  const regularPrice = billingCycle === 'annual' ? regularAnnual : (plan.monthlyPrice ?? 0);

  const discountPercent =
    billingCycle === 'annual' ? (plan.annualDiscount ?? 0) : (plan.monthlyDiscount ?? 0);

  const hasDiscount = !isFree && discountPercent > 0;
  const isPopular = Boolean(plan.isPopular || plan.popular);

  return (
    <article
      aria-label={`${plan.name} membership`}
      className={`relative min-h-150 w-full max-w-105.5 rounded-[20px] bg-white p-6 sm:min-h-163.5 sm:p-8 flex flex-col justify-between ${
        isPopular
          ? 'border-2 border-[rgba(47,125,126,0.2)] shadow-[0_99px_14px_rgba(47,125,126,0),0_63px_12.5px_rgba(47,125,126,0.01),0_36px_10.5px_rgba(47,125,126,0.05),0_16px_8px_rgba(47,125,126,0.09),0_4px_4.5px_rgba(47,125,126,0.1)]'
          : 'border border-[#D8DDD9] shadow-[0_2px_6px_rgba(23,74,77,0.06)]'
      } ${className}`}
    >
      {isPopular && (
        <>
          <span className="pointer-events-none absolute -top-16 left-1/2 flex size-17.5 -translate-x-1/2 items-center justify-center min-[1400px]:left-52.25 min-[1400px]:translate-x-0">
            <span className="relative block size-17.5 -scale-y-100 rotate-180">
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
          <span className="absolute -top-3.75 left-1/2 flex h-6.5 -translate-x-1/2 items-center rounded-full bg-[#F2B59F] px-4.5 py-1.25 font-manrope text-[10px] font-extrabold leading-4 tracking-[0.7616px] whitespace-nowrap text-white">
            MOST POPULAR
          </span>
        </>
      )}

      <div className="flex w-full flex-col gap-4">
        <div className={isPopular ? 'min-h-21' : 'min-h-15'}>
          <h2 className="font-nunito text-xl font-semibold leading-7 text-[#2F7D7E]">
            {plan.name}
          </h2>
          <p className="mt-2 font-manrope text-sm leading-6 text-[#515B60]">{plan.description}</p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-baseline gap-1.5" aria-live="polite">
            <span className="font-nunito text-[40px] font-semibold leading-12 tracking-[-0.4px] text-[#263238]">
              {displayedPrice}
            </span>
            {!isFree && (
              <span className="font-manrope text-sm font-medium text-[#7d8488]">
                {billingCycle === 'annual' ? '/ year' : '/ month'}
              </span>
            )}
            {hasDiscount && (
              <span className="font-manrope text-base font-normal leading-6 tracking-[-0.176px] text-[#A8ADAF] line-through">
                {formatPrice(regularPrice)}
              </span>
            )}
            {hasDiscount && (
              <span className="rounded-full bg-[#edf6f2] px-2 py-0.5 font-manrope text-[10px] font-bold text-[#2f7d7e]">
                {billingCycle === 'annual' ? `Save ${discountPercent}%` : `-${discountPercent}%`}
              </span>
            )}
          </div>

          {/* Proration Credit Badge */}
          {isUpgrade && unusedCredit > 0 && (
            <div className="rounded-xl border border-[rgba(47,125,126,0.25)] bg-[#edf6f2] px-3 py-1.5 text-xs text-[#2f7d7e]">
              <span className="font-semibold">Upgrade Credit Applied:</span> Less $
              {unusedCredit.toFixed(2)} from your active {activePlanName} plan.
            </div>
          )}

          {!isFree && billingCycle === 'annual' && effectiveAnnual > 0 && !isUpgrade && (
            <p className="font-manrope text-xs text-[#7d8488]">
              Equivalent to ${Math.round(effectiveAnnual / 12)}/month, billed annually
            </p>
          )}

          {isLowerTier && (
            <p className="font-manrope text-xs font-semibold text-[#a05a3a]">
              Your account currently has access to our higher {activePlanName} tier.
            </p>
          )}

          <div className="pt-2">
            {/* 1. Lower Tier -> Downgrade Strictly Blocked */}
            {isLowerTier ? (
              <button
                type="button"
                disabled
                title={`You have active access to ${activePlanName}. Downgrading is not permitted until your current subscription period ends.`}
                className="flex h-12.5 w-full items-center justify-center gap-1.5 rounded-full border border-[#e8ebe8] bg-[#f8faf9] px-4 py-3.5 font-manrope text-xs font-bold text-[#90a4ae] cursor-not-allowed"
              >
                <ShieldCheck size={15} />
                <span>Active on Higher Tier</span>
              </button>
            ) : isCurrentPlan ? (
              daysRemaining <= 7 && daysRemaining > 0 ? (
                <button
                  type="button"
                  disabled={isCheckingOut}
                  onClick={() => onSelectPlan(plan)}
                  className="flex h-12.5 w-full items-center justify-center gap-2 rounded-full border-2 border-[#2f7d7e] bg-[#2f7d7e] px-6.5 py-3.5 font-manrope text-[14.4px] font-bold text-white shadow-xs transition-opacity hover:opacity-90"
                >
                  {isCheckingOut ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Renewing...</span>
                    </>
                  ) : (
                    <span>Renew Plan ({daysRemaining}d left)</span>
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  disabled
                  className="flex h-12.5 w-full items-center justify-center rounded-full border-2 border-[#d5e5e5] bg-[#edf6f2] px-6.5 py-3.5 font-manrope text-[14.4px] font-bold text-[#2f7d7e] opacity-90 cursor-default"
                >
                  Current Plan
                </button>
              )
            ) : isFree ? (
              <button
                type="button"
                onClick={() => onSelectPlan(plan)}
                className="flex h-12.5 w-full items-center justify-center rounded-full border-2 border-[#D5E5E5] bg-white px-6.5 py-3.5 font-manrope text-[14.4px] font-bold leading-[21.6px] text-[#2F7D7E] transition-colors hover:bg-[#f5f8f7]"
              >
                Start Free
              </button>
            ) : isUpgrade ? (
              <button
                type="button"
                disabled={isCheckingOut}
                onClick={() => onSelectPlan(plan)}
                className="flex h-12.5 w-full items-center justify-center gap-2 rounded-full border-2 border-[#2F7D7E] bg-[#2F7D7E] px-6.5 py-3.5 font-manrope text-[14.4px] font-bold leading-[21.6px] text-white shadow-sm transition-all hover:bg-[#266b6c] disabled:opacity-60"
              >
                {isCheckingOut ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Preparing Checkout...</span>
                  </>
                ) : (
                  <>
                    <ArrowUpRight size={16} />
                    <span>Upgrade to {plan.name}</span>
                  </>
                )}
              </button>
            ) : (
              <button
                type="button"
                disabled={isCheckingOut}
                onClick={() => onSelectPlan(plan)}
                className={`flex h-12.5 w-full items-center justify-center gap-2 rounded-full border-2 px-6.5 py-3.5 font-manrope text-[14.4px] font-bold leading-[21.6px] whitespace-nowrap transition-all disabled:opacity-60 ${
                  isPopular
                    ? 'border-[#D5E5E5] bg-[#2F7D7E] text-white hover:bg-[#266b6c]'
                    : 'border-[#D5E5E5] bg-white text-[#2F7D7E] hover:bg-[#f5f8f7]'
                }`}
              >
                {isCheckingOut ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Preparing Checkout...</span>
                  </>
                ) : (
                  <span>Choose {plan.name}</span>
                )}
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 py-4">
          {plan.featuresHeading && (
            <p className="font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#7D8488]">
              {plan.featuresHeading}
            </p>
          )}
          <ul className="flex flex-col gap-2">
            {plan.features.map((feature) => (
              <li
                key={feature}
                className="flex gap-2.5 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#263238]"
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
  const router = useRouter();
  const { data: session } = useSession();
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('annual');
  const [checkoutPlanId, setCheckoutPlanId] = useState<string | null>(null);

  // Fetch live membership plans from Next.js BFF API
  const { data: serverPlans } = useQuery<MembershipPlan[]>({
    queryKey: ['public-membership-plans'],
    queryFn: async () => {
      const res = await fetch('/api/memberships/plans');
      if (!res.ok) throw new Error('Failed to load membership plans');
      const data = await res.json();
      return Array.isArray(data) ? data : data?.data || [];
    },
    staleTime: 30 * 1000,
  });

  // Fetch current user active subscription (if logged in)
  const { data: currentSubscription } = useQuery<{
    status?: string;
    tierRank?: number;
    billingCycle?: string;
    amountPaid?: number;
    currentPeriodStart?: string;
    currentPeriodEnd?: string;
    daysRemaining?: number;
    unusedCredit?: number;
    plan?: { id?: string; tier?: MembershipTier; name?: string };
  }>({
    queryKey: ['my-subscription'],
    queryFn: async () => {
      const res = await fetch('/api/memberships/my-subscription');
      if (!res.ok) return null;
      return res.json();
    },
    enabled: Boolean(session?.user),
    staleTime: 15 * 1000,
  });

  // Merge live server plans with default fallback structure
  const plans = useMemo(() => {
    if (!serverPlans || serverPlans.length === 0) return defaultPlans;

    const tierOrder: MembershipTier[] = ['LITTLE_STEPS', 'GROW_TOGETHER', 'PERSONALIZED_PATHWAYS'];

    return tierOrder.map((tier) => {
      const matched = serverPlans.find((p) => p.tier === tier);
      const fallback = defaultPlans.find((p) => p.tier === tier) || defaultPlans[0];

      if (!matched) return fallback;

      return {
        ...fallback,
        ...matched,
        features:
          matched.features && matched.features.length > 0 ? matched.features : fallback.features,
        featuresHeading:
          tier === 'GROW_TOGETHER'
            ? 'Everything in Little Steps, plus:'
            : tier === 'PERSONALIZED_PATHWAYS'
              ? 'Includes everything in Grow Together plus'
              : undefined,
      };
    });
  }, [serverPlans]);

  // Calculate highest annual discount among plans for billing toggle
  const maxAnnualDiscount = useMemo(() => {
    const discounts = plans.map((p) => p.annualDiscount || 0).filter((d) => d > 0);
    return discounts.length > 0 ? Math.max(...discounts) : 20;
  }, [plans]);

  // Active subscription analysis
  const isSubActive = currentSubscription?.status === 'ACTIVE';
  const activeRank =
    isSubActive && currentSubscription?.tierRank
      ? currentSubscription.tierRank
      : session?.user
        ? 1
        : 0;
  const activePlanName = currentSubscription?.plan?.name ?? 'Little Steps';
  const activeDaysRemaining = currentSubscription?.daysRemaining ?? 0;
  const activeUnusedCredit = currentSubscription?.unusedCredit ?? 0;

  // Handle plan checkout or registration
  const handleSelectPlan = async (plan: MembershipPlan) => {
    const isFree = plan.tier === 'LITTLE_STEPS' || (!plan.monthlyPrice && !plan.annualPrice);

    if (isFree) {
      if (session?.user) {
        router.push('/dashboard');
      } else {
        router.push('/register');
      }
      return;
    }

    // Paid Plan Selection
    if (!session?.user) {
      toast.info('Please sign in or create an account to activate your subscription.');
      const planParam = plan.id ? `&plan=${plan.id}` : '';
      router.push(`/register?cycle=${billingCycle.toUpperCase()}${planParam}`);
      return;
    }

    if (!plan.id) {
      toast.error('Plan identifier missing. Please refresh and try again.');
      return;
    }

    const cardRank = plan.tier ? TIER_RANKS[plan.tier] : 1;

    // Check downgrade attempt
    if (isSubActive && cardRank < activeRank) {
      toast.error(
        `Downgrading from ${activePlanName} is not permitted while your subscription is active. Downgrades take effect after your current period ends.`
      );
      return;
    }

    setCheckoutPlanId(plan.id);
    try {
      const res = await fetch('/api/payments/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: plan.id,
          billingCycle: billingCycle.toUpperCase(), // 'MONTHLY' | 'ANNUAL'
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Unable to start checkout session.');
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received.');
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Unable to initiate checkout. Please try again.'
      );
      setCheckoutPlanId(null);
    }
  };

  const checkIsCurrentPlan = (plan: MembershipPlan) => {
    if (!session?.user || !currentSubscription) return false;
    if (plan.tier === 'LITTLE_STEPS') {
      return (
        currentSubscription.status === 'FREE' ||
        (!isSubActive && currentSubscription.plan?.tier === 'LITTLE_STEPS')
      );
    }
    return (
      isSubActive &&
      currentSubscription.plan?.tier === plan.tier &&
      currentSubscription.billingCycle === billingCycle.toUpperCase()
    );
  };

  const checkIsLowerTier = (plan: MembershipPlan) => {
    if (!isSubActive || !plan.tier) return false;
    const cardRank = TIER_RANKS[plan.tier] || 1;
    return cardRank < activeRank;
  };

  const checkIsUpgrade = (plan: MembershipPlan) => {
    if (!isSubActive || !plan.tier) return false;
    const cardRank = TIER_RANKS[plan.tier] || 1;
    const isTierUpgrade = cardRank > activeRank;
    const isCycleUpgrade =
      cardRank === activeRank &&
      billingCycle === 'annual' &&
      currentSubscription?.billingCycle === 'MONTHLY';
    return isTierUpgrade || isCycleUpgrade;
  };

  return (
    <main className="relative overflow-x-clip bg-[#FDFDFC] text-[#263238]">
      <section
        aria-labelledby="membership-heading"
        className="relative min-h-screen overflow-x-clip bg-[#FDFDFC] px-5 pt-28 pb-24 sm:px-8 sm:pt-32 min-[1400px]:h-[1594px] min-[1400px]:min-h-0 min-[1400px]:p-0"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 hidden h-313.25 overflow-hidden min-[1400px]:block"
        >
          <Image
            src={`${MEMBERSHIP_ASSET_ROOT}cloud.svg`}
            alt=""
            width={2148}
            height={519}
            priority
            className="absolute top-228.75 left-1/2 h-129.75 w-[2148px] max-w-none -translate-x-1/2 rotate-180"
          />
        </div>

        <Image
          src={`${MEMBERSHIP_ASSET_ROOT}cloud.svg`}
          alt=""
          width={2148}
          height={519}
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-1/2 h-55 w-227.5 max-w-none -translate-x-1/2 rotate-180 opacity-90 sm:h-75 sm:w-310 min-[1400px]:hidden"
        />

        <div className="relative z-10 mx-auto flex w-full max-w-167.75 flex-col items-center gap-8 text-center min-[1400px]:absolute min-[1400px]:top-48 min-[1400px]:left-1/2 min-[1400px]:mx-0 min-[1400px]:-translate-x-1/2">
          <div className="flex w-full flex-col items-center gap-4">
            <div className="flex h-8.5 w-44.5 items-center rounded-xl border border-[#E8EBE8] bg-white px-2 py-1.5">
              <div className="flex items-center gap-2.5">
                <span className="flex items-center gap-1">
                  <Image
                    src={`${MEMBERSHIP_ASSET_ROOT}rating-star.svg`}
                    alt=""
                    width={16}
                    height={16}
                    aria-hidden="true"
                  />
                  <span className="font-manrope text-sm leading-5.5 tracking-[-0.084px]">4.9</span>
                </span>
                <span aria-hidden="true" className="h-2.5 w-px bg-[#D8DDD9]" />
                <span className="font-manrope text-sm leading-5.5 tracking-[-0.084px] whitespace-nowrap">
                  2,400+ families
                </span>
              </div>
            </div>

            <h1
              id="membership-heading"
              className="w-full font-nunito text-[32px] font-semibold leading-10 tracking-[-0.4px] text-[#263238] sm:text-5xl sm:leading-14 min-[1400px]:text-[56px] min-[1400px]:leading-16"
            >
              Choose the membership that&apos;s{' '}
              <span className="text-[#F2B59F]">right for your family.</span>
            </h1>

            <p className="max-w-155.25 font-manrope text-base leading-6 tracking-[-0.176px] text-[#607077]">
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

        <div className="relative z-10 mx-auto mt-10 flex w-fit min-[1400px]:absolute min-[1400px]:top-142.5 min-[1400px]:left-1/2 min-[1400px]:mt-0 min-[1400px]:-translate-x-1/2">
          <BillingToggle
            billingCycle={billingCycle}
            annualDiscount={maxAnnualDiscount}
            onChange={setBillingCycle}
          />
        </div>

        <div className="relative z-10 mx-auto mt-24 grid w-full max-w-328.5 grid-cols-1 justify-items-center gap-x-6 gap-y-16 min-[740px]:grid-cols-2 min-[1180px]:grid-cols-3 min-[1400px]:absolute min-[1400px]:top-181 min-[1400px]:left-1/2 min-[1400px]:mt-0 min-[1400px]:flex min-[1400px]:w-328.5 min-[1400px]:-translate-x-1/2 min-[1400px]:items-start min-[1400px]:gap-6">
          {plans[0] && (
            <MembershipCard
              plan={plans[0]}
              billingCycle={billingCycle}
              isCurrentPlan={checkIsCurrentPlan(plans[0])}
              isLowerTier={checkIsLowerTier(plans[0])}
              isUpgrade={checkIsUpgrade(plans[0])}
              unusedCredit={activeUnusedCredit}
              daysRemaining={activeDaysRemaining}
              activePlanName={activePlanName}
              isCheckingOut={checkoutPlanId === plans[0].id}
              onSelectPlan={handleSelectPlan}
              className="min-[1400px]:mt-14 min-[1400px]:shrink-0"
            />
          )}
          {plans[1] && (
            <MembershipCard
              plan={plans[1]}
              billingCycle={billingCycle}
              isCurrentPlan={checkIsCurrentPlan(plans[1])}
              isLowerTier={checkIsLowerTier(plans[1])}
              isUpgrade={checkIsUpgrade(plans[1])}
              unusedCredit={activeUnusedCredit}
              daysRemaining={activeDaysRemaining}
              activePlanName={activePlanName}
              isCheckingOut={checkoutPlanId === plans[1].id}
              onSelectPlan={handleSelectPlan}
              className="mt-10 min-[740px]:mt-0 min-[1400px]:shrink-0"
            />
          )}
          {plans[2] && (
            <MembershipCard
              plan={plans[2]}
              billingCycle={billingCycle}
              isCurrentPlan={checkIsCurrentPlan(plans[2])}
              isLowerTier={checkIsLowerTier(plans[2])}
              isUpgrade={checkIsUpgrade(plans[2])}
              unusedCredit={activeUnusedCredit}
              daysRemaining={activeDaysRemaining}
              activePlanName={activePlanName}
              isCheckingOut={checkoutPlanId === plans[2].id}
              onSelectPlan={handleSelectPlan}
              className="min-[1400px]:mt-14 min-[1400px]:shrink-0"
            />
          )}
        </div>
      </section>
      <MembershipComparison />
      <MembershipTestimonials />
      <MembershipFaqSection />
      <MembershipFinalCta />
    </main>
  );
}

export default MembershipPage;
