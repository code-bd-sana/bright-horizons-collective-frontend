'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { XCircle, RefreshCw, LifeBuoy, ArrowLeft, ShieldAlert } from 'lucide-react';

function PaymentErrorContent() {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get('message');

  return (
    <div className="flex min-h-[85vh] w-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg rounded-3xl border border-[#e7eceb] bg-white p-6 text-center shadow-[0_12px_40px_rgba(0,0,0,0.06)] sm:p-10">
        {/* Error Icon */}
        <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-[#fde8e8]">
          <XCircle className="size-10 text-[#d32f2f]" strokeWidth={2.2} />
        </div>

        <h1 className="mt-5 font-nunito text-3xl font-bold text-[#263238] sm:text-4xl">
          Payment Unsuccessful
        </h1>
        <p className="mt-2 font-manrope text-sm leading-relaxed text-[#607d8b] sm:text-base">
          {errorMessage ||
            'We were unable to complete your transaction. No charges have been finalized.'}
        </p>

        {/* Diagnostic Recommendations */}
        <div className="mt-6 rounded-2xl border border-[#f5c6cb] bg-[#fff8f8] p-5 text-left text-sm text-[#515b60]">
          <div className="flex items-center gap-2 font-nunito text-base font-bold text-[#b71c1c]">
            <ShieldAlert size={18} />
            <span>Common things to check</span>
          </div>
          <ul className="mt-2.5 space-y-2 font-manrope text-xs leading-relaxed text-[#7d8488] sm:text-sm">
            <li className="flex items-start gap-2">
              <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#d32f2f]" />
              <span>Ensure your card number, expiration date, and CVC are entered accurately.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#d32f2f]" />
              <span>
                Check that your card has sufficient balance and allows international or online USD
                payments.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#d32f2f]" />
              <span>Try checking out with another card or payment method.</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/membership"
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#2f7d7e] font-manrope text-sm font-semibold text-white transition-all hover:bg-[#266b6c]"
          >
            <RefreshCw size={16} />
            <span>Try Again</span>
          </Link>
          <Link
            href="/dashboard/support"
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl border border-[#d8ddd9] bg-white font-manrope text-sm font-semibold text-[#515b60] transition-colors hover:bg-[#f8fbfa]"
          >
            <LifeBuoy size={16} />
            <span>Contact Support</span>
          </Link>
        </div>

        {/* Dashboard Link */}
        <div className="mt-6 pt-4 text-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 font-manrope text-xs text-[#607d8b] transition-colors hover:text-[#2f7d7e]"
          >
            <ArrowLeft size={14} />
            <span>Return to Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export function PaymentErrorPage() {
  return (
    <Suspense fallback={<div className="min-h-[85vh]" />}>
      <PaymentErrorContent />
    </Suspense>
  );
}
