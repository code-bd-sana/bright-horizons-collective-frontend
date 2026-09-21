'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, HelpCircle, AlertCircle, RefreshCw } from 'lucide-react';

function PaymentCancelContent() {
  const searchParams = useSearchParams();
  const planId = searchParams.get('plan_id');

  return (
    <div className="flex min-h-[85vh] w-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg rounded-3xl border border-[#e7eceb] bg-white p-6 text-center shadow-[0_12px_40px_rgba(0,0,0,0.06)] sm:p-10">
        {/* Warning / Cancel Icon */}
        <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-[#fef3ec]">
          <AlertCircle className="size-10 text-[#e06d53]" strokeWidth={2.2} />
        </div>

        <h1 className="mt-5 font-nunito text-3xl font-bold text-[#263238] sm:text-4xl">
          Payment Cancelled
        </h1>
        <p className="mt-2 font-manrope text-sm leading-relaxed text-[#607d8b] sm:text-base">
          Your checkout was not completed and <strong>no funds were charged</strong> to your card.
        </p>

        {/* Informational Card */}
        <div className="mt-6 rounded-2xl border border-[#f5ded5] bg-[#fffaf8] p-5 text-left text-sm text-[#515b60]">
          <h2 className="font-nunito text-base font-bold text-[#263238]">What happens next?</h2>
          <ul className="mt-2 space-y-2 font-manrope text-xs leading-relaxed text-[#7d8488] sm:text-sm">
            <li className="flex items-start gap-2">
              <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#e06d53]" />
              <span>Your account remains on your current membership tier with full access.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#e06d53]" />
              <span>You can restart checkout at any time whenever you are ready.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#e06d53]" />
              <span>
                If you encountered an issue with payment, our support team is here to help.
              </span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href={planId ? `/membership?plan=${encodeURIComponent(planId)}` : '/membership'}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#2f7d7e] font-manrope text-sm font-semibold text-white transition-all hover:bg-[#266b6c]"
          >
            <RefreshCw size={16} />
            <span>Choose a Plan</span>
          </Link>
          <Link
            href="/dashboard"
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl border border-[#d8ddd9] bg-white font-manrope text-sm font-semibold text-[#515b60] transition-colors hover:bg-[#f8fbfa]"
          >
            <ArrowLeft size={16} />
            <span>Go to Dashboard</span>
          </Link>
        </div>

        {/* Support Link */}
        <div className="mt-6 pt-4 text-center">
          <Link
            href="/dashboard/support"
            className="inline-flex items-center gap-1.5 font-manrope text-xs text-[#607d8b] transition-colors hover:text-[#2f7d7e]"
          >
            <HelpCircle size={14} />
            <span>Questions or need assistance? Contact Support</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export function PaymentCancelPage() {
  return (
    <Suspense fallback={<div className="min-h-[85vh]" />}>
      <PaymentCancelContent />
    </Suspense>
  );
}
