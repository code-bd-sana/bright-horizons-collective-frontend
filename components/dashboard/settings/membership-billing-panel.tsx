'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  // ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  FileText,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

type SubscriptionPlan = {
  id: string;
  tier: 'LITTLE_STEPS' | 'GROW_TOGETHER' | 'PERSONALIZED_PATHWAYS';
  name: string;
  description: string | null;
  features: string[];
};

type UserSubscription = {
  id?: string;
  plan: SubscriptionPlan;
  status: 'ACTIVE' | 'FREE' | 'EXPIRED';
  billingCycle: 'MONTHLY' | 'ANNUAL';
  amountPaid: number;
  currentPeriodStart: string | null;
  currentPeriodEnd: string | null;
  message?: string;
};

type BillingRecord = {
  id: string;
  amountPaid: number;
  currency: string;
  billingCycle: 'MONTHLY' | 'ANNUAL';
  status: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  stripeSessionId: string | null;
  createdAt: string;
  plan: SubscriptionPlan;
};

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function CurrentPlanCard() {
  const { data: subscription, isLoading } = useQuery<UserSubscription>({
    queryKey: ['my-subscription'],
    queryFn: async () => {
      const res = await fetch('/api/memberships/my-subscription');
      if (!res.ok) throw new Error('Failed to load current subscription');
      const data = await res.json();
      return data?.data ?? data;
    },
  });

  if (isLoading) {
    return (
      <section className="rounded-[20px] border-2 border-[#e8ebe8] bg-white p-6 sm:p-8 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-3 text-[#2f7d7e]">
          <Loader2 size={24} className="animate-spin" />
          <span className="font-manrope text-sm font-semibold">
            Loading membership plan details...
          </span>
        </div>
      </section>
    );
  }

  const isFree =
    !subscription || subscription.status === 'FREE' || subscription.plan?.tier === 'LITTLE_STEPS';
  const isExpired = subscription?.status === 'EXPIRED';
  const isActivePaid = subscription?.status === 'ACTIVE' && !isFree;

  const planName = subscription?.plan?.name ?? 'Little Steps';
  const features = subscription?.plan?.features ?? [
    'Selected activities',
    'Selected parent resources',
    'Therapy Toy Spotlights',
    'Weekly plan preview',
  ];

  return (
    <section className="rounded-[20px] border-2 border-[#e8ebe8] bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)] sm:p-8.5">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-manrope text-xs font-semibold leading-4.5 ${
              isActivePaid
                ? 'bg-[#edf6f2] text-[#2f7d7e]'
                : isExpired
                  ? 'bg-[#fff5f4] text-[#d32f2f]'
                  : 'bg-[#d5e5e5] text-[#263238]'
            }`}
          >
            {isActivePaid && <CheckCircle2 size={13} className="text-[#2f7d7e]" />}
            {isExpired && <Clock size={13} className="text-[#d32f2f]" />}
            {isActivePaid ? 'ACTIVE PLAN' : isExpired ? 'PLAN EXPIRED' : 'CURRENT FREE TIER'}
          </span>

          {isActivePaid && (
            <span className="rounded-full bg-[#f4f7f6] px-2.5 py-0.5 font-manrope text-[11px] font-medium text-[#607d8b]">
              {subscription?.billingCycle === 'ANNUAL' ? 'Annual Pass' : 'Monthly Pass'}
            </span>
          )}
        </div>

        <h2 className="font-nunito text-2xl font-medium leading-8 tracking-[-0.16px] text-[#2f7d7e] sm:text-[32px] sm:leading-10">
          {planName}
        </h2>

        <p className="font-manrope text-sm leading-6 text-[#515b60]">
          {isActivePaid ? (
            <>
              <span className="font-semibold text-[#263238]">Active access</span> through{' '}
              {formatDate(subscription?.currentPeriodEnd)}
            </>
          ) : isExpired ? (
            <>
              Your access expired on {formatDate(subscription?.currentPeriodEnd)}. You are now on
              the free tier.
            </>
          ) : (
            'Permanently assigned starter membership with essential developmental guidance.'
          )}
        </p>
      </div>

      <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
        {subscription?.plan?.tier === 'PERSONALIZED_PATHWAYS' && isActivePaid ? (
          <Link
            href="/membership"
            className="flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-[#a05a3a] bg-[#a05a3a] px-6 py-3 font-manrope text-[14.4px] font-bold text-white shadow-xs transition-opacity hover:opacity-90"
          >
            <ShieldCheck size={16} />
            <span>Highest Tier Active</span>
          </Link>
        ) : subscription?.plan?.tier === 'GROW_TOGETHER' && isActivePaid ? (
          <Link
            href="/membership"
            className="flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-[#d5e5e5] bg-[#2f7d7e] px-6 py-3 font-manrope text-[14.4px] font-bold text-white shadow-xs transition-opacity hover:opacity-90"
          >
            <Sparkles size={16} />
            <span>Upgrade to Personalized Pathways</span>
          </Link>
        ) : (
          <Link
            href="/membership"
            className="flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-[#d5e5e5] bg-[#2f7d7e] px-6 py-3 font-manrope text-[14.4px] font-bold text-white shadow-xs transition-opacity hover:opacity-90"
          >
            <Sparkles size={16} />
            <span>Upgrade Membership</span>
          </Link>
        )}
        <Link
          href="/membership"
          className="flex min-h-12 items-center justify-center rounded-full border-2 border-[#e8ebe8] bg-white px-6 py-3 font-manrope text-[14.4px] font-bold text-[#2f7d7e] transition-colors hover:bg-[#f5f8f7]"
        >
          View All Membership Tiers
        </Link>
      </div>

      <div className="mt-5 rounded-xl border border-[#f0f4f2] bg-[#fbfdfc] p-4 sm:p-5">
        <p className="font-manrope text-xs font-semibold uppercase tracking-wider text-[#7d8488]">
          Included In Your Membership:
        </p>
        <div className="mt-3 grid gap-x-4 gap-y-2.5 sm:grid-cols-2">
          {features.map((feature) => (
            <div className="flex items-center gap-2.5" key={feature}>
              <span className="flex size-4 shrink-0 items-center justify-center rounded-[9px] bg-[#e9f1ee]">
                <Image
                  alt=""
                  height={10}
                  src={
                    isActivePaid
                      ? '/Membership/feature-check-paid.svg'
                      : '/Membership/feature-check-free.svg'
                  }
                  width={10}
                />
              </span>
              <span className="font-manrope text-sm leading-5 text-[#263238]">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// function PaymentMethodCard() {
//   return (
//     <section className="rounded-2xl border border-[#e8ebe8] bg-white p-4 sm:p-8">
//       <div className="flex items-center justify-between">
//         <h2 className="font-nunito text-xl font-semibold leading-7 text-[#263238] sm:text-2xl sm:leading-8">
//           Payment Security & Method
//         </h2>
//         <span className="flex items-center gap-1.5 rounded-full bg-[#edf6f2] px-3 py-1 font-manrope text-xs font-semibold text-[#2f7d7e]">
//           <ShieldCheck size={15} />
//           <span>256-bit Encrypted</span>
//         </span>
//       </div>

//       <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
//         <div className="h-46 w-full max-w-full rounded-2xl bg-linear-to-br from-[#04342c] to-[#12584c] p-5 text-white shadow-[0_10px_20px_-5px_rgba(4,52,44,0.3)] sm:max-w-85.75 flex flex-col justify-between">
//           <div className="flex items-start justify-between">
//             <span className="grid size-6.25 grid-cols-3 gap-px rounded-lg bg-[#e4d8a0] p-1">
//               {Array.from({ length: 6 }, (_, index) => (
//                 <span className="rounded-[1px] bg-[#bcae62]" key={index} />
//               ))}
//             </span>
//             <span className="font-nunito text-xs font-bold tracking-[1.2px]">STRIPE SECURE</span>
//           </div>
//           <div>
//             <p className="font-manrope text-xs text-white/70">Payment Mode</p>
//             <p className="font-manrope text-sm font-semibold tracking-wide text-white">
//               One-Time Encrypted Checkout
//             </p>
//           </div>
//           <div className="flex items-end justify-between">
//             <div>
//               <p className="font-nunito text-[10px] uppercase leading-3.75 text-white/70">
//                 Standard
//               </p>
//               <p className="font-nunito text-sm leading-5">PCI-DSS Level 1</p>
//             </div>
//             <span className="flex h-6 items-center rounded bg-white/15 px-2 font-mono text-[11px] font-bold">
//               SSL SECURE
//             </span>
//           </div>
//         </div>

//         <div className="flex-1 space-y-3">
//           <h3 className="font-nunito text-base font-semibold text-[#263238]">
//             Direct, Transparent Payment Model
//           </h3>
//           <p className="font-manrope text-xs leading-relaxed text-[#515b60] sm:text-sm">
//             All subscriptions are processed via <strong>Stripe Checkout</strong>. We do not store
//             credit card numbers on our servers. You are only charged when you explicitly choose to
//             subscribe or renew.
//           </p>
//           <Link
//             href="/membership"
//             className="inline-flex items-center gap-1.5 font-manrope text-xs font-semibold text-[#2f7d7e] transition-colors hover:text-[#216263]"
//           >
//             Explore Upgrade Options <ArrowRight size={14} />
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }

function BillingHistoryTable() {
  const { data: history = [], isLoading } = useQuery<BillingRecord[]>({
    queryKey: ['my-billing-history'],
    queryFn: async () => {
      const res = await fetch('/api/memberships/my-history');
      if (!res.ok) return [];
      const data = await res.json();
      return Array.isArray(data) ? data : (data?.data ?? []);
    },
  });

  return (
    <section className="overflow-hidden rounded-xl border border-[#e8ebe8] bg-white">
      <header className="flex items-center justify-between gap-4 border-b border-[#bbcac6] px-4 py-5 sm:px-8 sm:py-6">
        <div>
          <h2 className="font-nunito text-xl font-semibold leading-7 text-[#1a1c1c] sm:text-2xl sm:leading-8">
            Billing History & Receipts
          </h2>
          <p className="mt-0.5 font-manrope text-xs text-[#7d8488]">
            Official transaction audit trail for your membership payments
          </p>
        </div>
      </header>

      {isLoading ? (
        <div className="flex items-center justify-center p-12 text-[#2f7d7e]">
          <Loader2 size={24} className="animate-spin" />
        </div>
      ) : history.length === 0 ? (
        <div className="p-8 sm:p-12 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-[#edf6f2] text-[#2f7d7e]">
            <FileText size={22} />
          </div>
          <p className="mt-3 font-nunito text-base font-semibold text-[#263238]">
            No billing transactions yet
          </p>
          <p className="mx-auto mt-1 max-w-md font-manrope text-xs leading-relaxed text-[#7d8488]">
            You are currently on the free tier. When you upgrade to a paid membership plan, your
            payment receipts and invoice records will be displayed here.
          </p>
          <Link
            href="/membership"
            className="mt-4 inline-flex items-center justify-center rounded-xl bg-[#2f7d7e] px-4 py-2 font-manrope text-xs font-semibold text-white shadow-xs transition-colors hover:bg-[#266b6c]"
          >
            Upgrade Membership
          </Link>
        </div>
      ) : (
        <>
          <div className="divide-y divide-[#e8ebe8] min-[1500px]:hidden">
            {history.map((record) => (
              <article className="space-y-3 px-4 py-5" key={record.id}>
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-nunito text-base font-semibold leading-6 text-[#1a1c1c]">
                      {record.plan?.name ?? 'Membership'} (
                      {record.billingCycle === 'ANNUAL' ? 'Annual Plan' : 'Monthly Plan'})
                    </p>
                    <p className="mt-0.5 font-manrope text-xs leading-5 text-[#515b60]">
                      {formatDate(record.createdAt)}
                    </p>
                  </div>
                  <span className="shrink-0 font-manrope text-base font-semibold text-[#3c4947]">
                    ${record.amountPaid.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(0,106,98,0.1)] px-2.5 py-1 font-nunito text-xs font-semibold text-[#006a62]">
                    <span className="size-1.5 rounded-full bg-[#006a62]" />
                    Paid
                  </span>
                  {record.stripeSessionId && (
                    <Link
                      href={`/payment/success?session_id=${record.stripeSessionId}`}
                      className="inline-flex items-center gap-1.5 font-nunito text-xs font-semibold text-[#2f7d7e] transition-colors hover:text-[#216263]"
                    >
                      <FileText size={14} />
                      View Confirmation
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>

          <div className="hidden overflow-x-auto min-[1500px]:block">
            <table className="min-w-205 w-full border-collapse text-left">
              <thead className="bg-[#f8faf9] font-nunito text-xs font-semibold uppercase tracking-wider text-[#515b60]">
                <tr>
                  <th className="px-8 py-3.5">DATE</th>
                  <th className="px-8 py-3.5">PLAN DESCRIPTION</th>
                  <th className="px-8 py-3.5">AMOUNT</th>
                  <th className="px-8 py-3.5">STATUS</th>
                  <th className="px-8 py-3.5 text-right">DETAILS</th>
                </tr>
              </thead>
              <tbody>
                {history.map((record) => (
                  <tr className="border-t border-[#e8ebe8]" key={record.id}>
                    <td className="whitespace-nowrap px-8 py-4 font-manrope text-sm text-[#3c4947]">
                      {formatDate(record.createdAt)}
                    </td>
                    <td className="whitespace-nowrap px-8 py-4 font-manrope text-sm font-semibold text-[#1a1c1c]">
                      {record.plan?.name ?? 'Membership'} (
                      {record.billingCycle === 'ANNUAL' ? 'Annual Plan' : 'Monthly Plan'})
                    </td>
                    <td className="whitespace-nowrap px-8 py-4 font-manrope text-sm font-semibold text-[#3c4947]">
                      ${record.amountPaid.toFixed(2)}
                    </td>
                    <td className="px-8 py-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(0,106,98,0.1)] px-2.5 py-0.5 font-nunito text-xs font-semibold text-[#006a62]">
                        <span className="size-1.5 rounded-full bg-[#006a62]" />
                        Paid
                      </span>
                    </td>
                    <td className="px-8 py-4 text-right">
                      {record.stripeSessionId ? (
                        <Link
                          href={`/payment/success?session_id=${record.stripeSessionId}`}
                          className="inline-flex items-center gap-1 font-nunito text-xs font-semibold text-[#2f7d7e] transition-colors hover:text-[#216263]"
                        >
                          <FileText size={14} />
                          Receipt
                        </Link>
                      ) : (
                        <span className="text-xs text-[#90a4ae]">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
}

export function MembershipBillingPanel() {
  return (
    <div className="w-full max-w-227 space-y-6">
      <CurrentPlanCard />
      {/* <PaymentMethodCard /> */}
      <BillingHistoryTable />
    </div>
  );
}
