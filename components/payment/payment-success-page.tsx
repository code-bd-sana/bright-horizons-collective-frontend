'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  CheckCircle2,
  Calendar,
  CreditCard,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Loader2,
  BookOpen,
} from 'lucide-react';

type SubscriptionData = {
  id: string;
  billingCycle: 'MONTHLY' | 'ANNUAL';
  amountPaid: number;
  currentPeriodEnd: string;
  stripeSessionId?: string;
  plan: {
    id: string;
    name: string;
    tier: string;
    description?: string;
  };
};

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [loading, setLoading] = useState(!!sessionId);
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);

  useEffect(() => {
    if (!sessionId) {
      return;
    }

    let isMounted = true;

    async function verifySession() {
      try {
        const response = await fetch(`/api/payments/session-status/${sessionId}`);
        if (!response.ok) {
          throw new Error('Verification failed');
        }
        const raw = await response.json();
        const unwrapped =
          raw && typeof raw === 'object' && 'data' in raw && !('subscription' in raw)
            ? (raw as Record<string, unknown>).data
            : raw;
        const data = unwrapped as {
          subscription?: SubscriptionData;
          plan?: SubscriptionData['plan'] & { monthlyPrice?: number };
        } | null;

        if (isMounted && data) {
          if (data.subscription) {
            setSubscription(data.subscription);
          } else if (data.plan) {
            setSubscription({
              id: sessionId || '',
              billingCycle: 'MONTHLY',
              amountPaid: data.plan.monthlyPrice ?? 0,
              currentPeriodEnd: new Date(Date.now() + 30 * 86400000).toISOString(),
              plan: data.plan,
            });
          }
        }
      } catch (err) {
        console.error('Failed to verify session status:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    verifySession();

    return () => {
      isMounted = false;
    };
  }, [sessionId]);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return null;
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return null;
    }
  };

  return (
    <div className="flex min-h-[85vh] w-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl rounded-3xl border border-[#e7eceb] bg-white p-6 shadow-[0_12px_40px_rgba(47,125,126,0.08)] sm:p-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Loader2 className="size-12 animate-spin text-[#2f7d7e]" />
            <h2 className="mt-6 font-nunito text-2xl font-bold text-[#263238]">
              Confirming your membership...
            </h2>
            <p className="mt-2 font-manrope text-sm text-[#607d8b]">
              Please wait a moment while we verify your transaction.
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            {/* Success Icon */}
            <div className="relative flex size-20 items-center justify-center rounded-full bg-[#edf6f2]">
              <div className="absolute inset-0 animate-ping rounded-full bg-[#2f7d7e]/10 duration-1000" />
              <CheckCircle2 className="size-10 text-[#2f7d7e]" strokeWidth={2.2} />
            </div>

            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#edf6f2] px-3.5 py-1 text-xs font-semibold text-[#2f7d7e]">
              <Sparkles size={13} />
              <span>Membership Activated</span>
            </div>

            <h1 className="mt-4 font-nunito text-3xl font-bold text-[#263238] sm:text-4xl">
              Payment Successful!
            </h1>
            <p className="mt-2 max-w-md font-manrope text-sm leading-relaxed text-[#607d8b] sm:text-base">
              Thank you for supporting your child&apos;s developmental journey. Your account has
              been upgraded successfully.
            </p>

            {/* Receipt Summary Card */}
            <div className="mt-8 w-full rounded-2xl border border-[#e7eceb] bg-[#f8fbfa] p-5 text-left sm:p-6">
              <div className="flex items-center justify-between border-b border-[#e7eceb] pb-4">
                <div>
                  <span className="font-manrope text-xs font-semibold uppercase tracking-wider text-[#7d8488]">
                    Selected Plan
                  </span>
                  <h3 className="font-nunito text-xl font-bold text-[#2f7d7e]">
                    {subscription?.plan?.name ?? 'Bright Horizons Membership'}
                  </h3>
                </div>
                {subscription?.billingCycle && (
                  <span className="rounded-full bg-[#2f7d7e]/10 px-3 py-1 font-manrope text-xs font-semibold capitalize text-[#2f7d7e]">
                    {subscription.billingCycle.toLowerCase()} pass
                  </span>
                )}
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#2f7d7e] shadow-sm">
                    <CreditCard size={18} />
                  </div>
                  <div>
                    <span className="block font-manrope text-xs text-[#7d8488]">Amount Paid</span>
                    <span className="font-nunito text-base font-bold text-[#263238]">
                      {subscription?.amountPaid !== undefined
                        ? `$${subscription.amountPaid.toFixed(2)} USD`
                        : 'Paid via Stripe'}
                    </span>
                  </div>
                </div>

                {subscription?.currentPeriodEnd && (
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#2f7d7e] shadow-sm">
                      <Calendar size={18} />
                    </div>
                    <div>
                      <span className="block font-manrope text-xs text-[#7d8488]">Valid Until</span>
                      <span className="font-nunito text-base font-bold text-[#263238]">
                        {formatDate(subscription.currentPeriodEnd) ?? 'Active'}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {sessionId && (
                <div className="mt-4 border-t border-[#e7eceb] pt-3 text-[11px] text-[#8a9296]">
                  <span>Reference ID: </span>
                  <code className="font-mono text-[11px] text-[#515b60]">
                    {sessionId.slice(0, 24)}...
                  </code>
                </div>
              )}
            </div>

            {/* Trust badge */}
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#7d8488]">
              <ShieldCheck className="size-4 text-[#2f7d7e]" />
              <span>Secure transaction processed by Stripe</span>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
              <Link
                href="/dashboard"
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#2f7d7e] font-manrope text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#266b6c]"
              >
                <span>Go to Dashboard</span>
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/dashboard/explore"
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl border border-[#d8ddd9] bg-white font-manrope text-sm font-semibold text-[#515b60] transition-colors hover:bg-[#f8fbfa]"
              >
                <BookOpen size={16} />
                <span>Explore Activities</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[85vh] w-full items-center justify-center">
          <Loader2 className="size-10 animate-spin text-[#2f7d7e]" />
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}
