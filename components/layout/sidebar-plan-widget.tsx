'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { useSession } from '@/services/api/auth/auth.queries';

type SubscriptionData = {
  status?: 'ACTIVE' | 'FREE' | 'EXPIRED';
  tierRank?: number;
  billingCycle?: 'MONTHLY' | 'ANNUAL';
  amountPaid?: number;
  currentPeriodStart?: string;
  currentPeriodEnd?: string;
  daysRemaining?: number;
  plan?: {
    id?: string;
    tier?: 'LITTLE_STEPS' | 'GROW_TOGETHER' | 'PERSONALIZED_PATHWAYS';
    name?: string;
  };
};

function formatShortDate(dateStr: string | null | undefined): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function SidebarPlanWidget({
  variant = 'sidebar-desktop',
  onNavigate,
}: {
  variant?: 'sidebar-desktop' | 'sidebar-mobile' | 'header-dropdown';
  onNavigate?: () => void;
}) {
  const { data: session } = useSession();

  const { data: subscription, isLoading } = useQuery<SubscriptionData>({
    queryKey: ['my-subscription'],
    queryFn: async () => {
      const res = await fetch('/api/memberships/my-subscription');
      if (!res.ok) return null;
      const data = await res.json();
      return data?.data ?? data;
    },
    enabled: Boolean(session?.user),
    staleTime: 30 * 1000,
  });

  const isFree =
    !subscription || subscription.status === 'FREE' || subscription.plan?.tier === 'LITTLE_STEPS';
  const isExpired = subscription?.status === 'EXPIRED';
  const isActivePaid = subscription?.status === 'ACTIVE' && !isFree;

  const planName = isLoading
    ? 'Loading...'
    : (subscription?.plan?.name ?? (session?.user ? 'Little Steps' : 'Free Plan'));

  const periodText = isLoading
    ? 'Checking status...'
    : isActivePaid
      ? `Active through ${formatShortDate(subscription?.currentPeriodEnd)}`
      : isExpired
        ? `Expired on ${formatShortDate(subscription?.currentPeriodEnd)}`
        : 'Permanent Free Tier';

  const isHighestTier = subscription?.plan?.tier === 'PERSONALIZED_PATHWAYS' && isActivePaid;
  const isMidTier = subscription?.plan?.tier === 'GROW_TOGETHER' && isActivePaid;

  const buttonText = isHighestTier
    ? 'Manage Membership'
    : isMidTier
      ? 'Upgrade Personalized Pathways'
      : 'Upgrade Membership';

  // 1. Header Dropdown variant
  if (variant === 'header-dropdown') {
    return (
      <Link
        href="/membership"
        onClick={onNavigate}
        className="block rounded-xl border border-[#fae2da] bg-[linear-gradient(175.51deg,#ffffff_20%,#fbded5_120%,#fad6cb_200%)] p-4 transition-all hover:opacity-95"
      >
        <p className="font-manrope text-[11px] font-semibold uppercase tracking-[0.25px] text-[#515b60]">
          Current Plan
        </p>
        <p className="mt-1 font-nunito text-lg font-bold leading-tight tracking-[-0.27px] text-[#263238]">
          {planName}
        </p>
        <p className="mt-1 font-manrope text-xs leading-4.5 text-[#515b60]">{periodText}</p>
      </Link>
    );
  }

  // 2. Mobile Sidebar variant
  if (variant === 'sidebar-mobile') {
    return (
      <section
        className="relative mt-6 flex flex-col justify-between overflow-hidden rounded-xl border border-[#fae2da] bg-[linear-gradient(165deg,#ffffff_10%,#fbded5_45%,#fad6cb_68%,#f9d0c3_96%)] p-4 shadow-xs"
        aria-label="Current membership plan"
      >
        <div className="relative z-10 flex w-full flex-col">
          <p className="font-manrope text-[11px] font-semibold uppercase tracking-[0.25px] text-[#515b60]">
            Current Plan
          </p>
          <p className="mt-1 font-nunito text-lg font-bold leading-tight tracking-[-0.27px] text-[#263238]">
            {planName}
          </p>
          <p className="mt-1 font-manrope text-xs leading-4.5 text-[#515b60]">{periodText}</p>
        </div>
        <Link
          href="/membership"
          onClick={onNavigate}
          className="relative z-10 mt-3.5 flex min-h-11 w-full items-center justify-center rounded-full border border-[#e8ebe8] bg-white px-3 py-2 font-nunito text-center text-xs font-semibold leading-4 tracking-[-0.084px] text-[#2f7d7e] shadow-xs transition-all hover:bg-[#f6fbfb] hover:border-[#2f7d7e]/30 active:scale-[0.99]"
        >
          <span className="truncate">{buttonText}</span>
        </Link>
      </section>
    );
  }

  // 3. Desktop Sidebar variant (default)
  return (
    <section
      className="relative mt-auto mb-4 mx-3.5 flex shrink-0 flex-col justify-between overflow-hidden rounded-xl border border-[#fae2da] bg-[linear-gradient(165deg,#ffffff_10%,#fbded5_45%,#fad6cb_68%,#f9d0c3_96%)] p-4 shadow-xs"
      aria-label="Current membership plan"
    >
      <div className="relative z-10 flex w-full flex-col">
        <p className="font-manrope text-[11px] font-semibold uppercase tracking-[0.25px] text-[#515b60]">
          Current Plan
        </p>
        <p className="mt-1 font-nunito text-lg font-bold leading-tight tracking-[-0.27px] text-[#263238]">
          {planName}
        </p>
        <p className="mt-1 font-manrope text-xs leading-4.5 text-[#515b60]">{periodText}</p>
      </div>
      <Link
        href="/membership"
        onClick={onNavigate}
        className="relative z-10 mt-3.5 flex min-h-11 w-full items-center justify-center rounded-full border border-[#e8ebe8] bg-white px-3 py-2 font-nunito text-center text-xs font-semibold leading-4 tracking-[-0.084px] text-[#2f7d7e] shadow-xs transition-all hover:bg-[#f6fbfb] hover:border-[#2f7d7e]/30 active:scale-[0.99]"
      >
        <span className="truncate">{buttonText}</span>
      </Link>
    </section>
  );
}
