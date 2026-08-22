'use client';

import Image from 'next/image';
import { ArrowRight, Download } from 'lucide-react';
import { toast } from 'sonner';

const membershipFeatures = [
  'Full Explore Library',
  'Parent Resources',
  'Save favorites',
  'Five developmental questions each month',
];
const billingHistory = [
  ['Oct 12, 2023', 'Family Plus Annual Subscription', '$199.00'],
  ['Oct 12, 2022', 'Family Plus Annual Subscription', '$199.00'],
  ['Oct 12, 2021', 'Basic Monthly (First Month)', '$19.00'],
];

function CurrentPlanCard() {
  return (
    <section className="rounded-[20px] border-2 border-[#e8ebe8] bg-white p-8 shadow-[0_1px_2px_rgba(0,0,0,0.05)] sm:p-8.5">
      <div className="space-y-2">
        <span className="inline-flex rounded-full bg-[#d5e5e5] px-3 py-1 font-manrope text-xs leading-4.5 text-[#263238]">
          CURRENT PLAN
        </span>
        <h2 className="font-nunito text-[32px] font-medium leading-10 tracking-[-0.16px] text-[#2f7d7e]">
          Grow Together
        </h2>
        <p className="font-manrope text-sm leading-6 text-[#515b60]">
          <span className="text-[#263238]">Renews automatically</span> on August 25, 2026
        </p>
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <button
          className="min-h-12 rounded-full border-2 border-[#d5e5e5] bg-[#2f7d7e] px-6 py-3.5 font-manrope text-[14.4px] font-bold leading-[21.6px] text-white transition-opacity hover:opacity-90"
          onClick={() => toast.success('Membership upgrade options are ready to review.')}
          type="button"
        >
          Upgrade Membership
        </button>
        <button
          className="min-h-12 rounded-full border-2 border-[#e8ebe8] bg-white px-6 py-3.5 font-manrope text-[14.4px] font-bold leading-[21.6px] text-[#2f7d7e] transition-colors hover:bg-[#f5f8f7]"
          onClick={() => toast.success('Membership management is ready.')}
          type="button"
        >
          Manage Membership
        </button>
      </div>
      <div className="mt-4 rounded-xl py-4">
        <p className="font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#7d8488]">
          Included Features:
        </p>
        <div className="mt-2 grid gap-x-2 gap-y-2 md:grid-cols-2">
          {membershipFeatures.map((feature) => (
            <div className="flex items-center gap-2.5" key={feature}>
              <span className="flex size-4 shrink-0 items-center justify-center rounded-[9px] bg-[#e9f1ee]">
                <Image alt="" height={10} src="/Membership/feature-check-paid.svg" width={10} />
              </span>
              <span className="font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#263238]">
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PaymentMethodCard() {
  return (
    <section className="rounded-2xl border border-[#e8ebe8] bg-white p-8">
      <h2 className="font-nunito text-2xl font-semibold leading-8 text-[#263238]">
        Payment Method
      </h2>
      <div className="mt-8 h-46 w-full max-w-85.75 rounded-xl bg-[#04342c] px-4 pb-4 pt-8 text-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)]">
        <div className="flex items-start justify-between">
          <span className="grid size-6.25 grid-cols-3 gap-px rounded-lg bg-[#e4d8a0] p-1">
            {Array.from({ length: 6 }, (_, index) => (
              <span className="rounded-[1px] bg-[#bcae62]" key={index} />
            ))}
          </span>
          <span className="font-nunito text-xs font-bold tracking-[1.2px]">VISA</span>
        </div>
        <p className="mt-5 font-mono text-lg leading-7">•••• •••• •••• 4242</p>
        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="font-nunito text-[10px] uppercase leading-3.75 text-white/70">Expiry</p>
            <p className="font-nunito text-sm leading-5">05/27</p>
          </div>
          <span className="h-8 w-12 rounded bg-white/20" aria-hidden="true" />
        </div>
      </div>
      <button
        className="mt-8 flex items-center gap-1.25 font-manrope text-xs font-semibold leading-4.5 tracking-[0.48px] text-[#2f7d7e] transition-colors hover:text-[#216263]"
        onClick={() => toast.success('Payment details can now be updated.')}
        type="button"
      >
        Update Payment Details <ArrowRight aria-hidden="true" size={14} strokeWidth={1.7} />
      </button>
    </section>
  );
}

function BillingHistoryTable() {
  return (
    <section className="overflow-hidden rounded-xl border border-[#e8ebe8] bg-white">
      <header className="flex items-center justify-between border-b border-[#bbcac6] px-8 py-8">
        <h2 className="font-nunito text-2xl font-semibold leading-8 text-[#1a1c1c]">
          Billing History
        </h2>
        <button
          className="font-nunito text-sm font-medium leading-5 tracking-[-0.084px] text-[#2f7d7e] transition-colors hover:text-[#216263]"
          onClick={() => toast.success('Your billing history export is being prepared.')}
          type="button"
        >
          Export All
        </button>
      </header>
      <div className="overflow-x-auto">
        <table className="min-w-205 w-full border-collapse text-left">
          <thead className="bg-[#e8ebe8] font-nunito text-sm font-semibold leading-5 tracking-[-0.084px] text-[#515b60]">
            <tr>
              <th className="px-8 py-4">DATE</th>
              <th className="px-8 py-4">PLAN DESCRIPTION</th>
              <th className="px-8 py-4">AMOUNT</th>
              <th className="px-8 py-4">STATUS</th>
              <th className="px-8 py-4 text-right">INVOICE</th>
            </tr>
          </thead>
          <tbody>
            {billingHistory.map(([date, plan, amount]) => (
              <tr className="border-t border-[#e8ebe8]" key={date}>
                <td className="whitespace-nowrap px-8 py-4.25 font-manrope text-base leading-6 tracking-[-0.176px] text-[#3c4947]">
                  {date}
                </td>
                <td className="whitespace-nowrap px-8 py-4.25 font-manrope text-base leading-6 tracking-[-0.176px] text-[#1a1c1c]">
                  {plan}
                </td>
                <td className="whitespace-nowrap px-8 py-4.25 font-manrope text-base font-semibold leading-6 tracking-[-0.176px] text-[#3c4947]">
                  {amount}
                </td>
                <td className="px-8 py-4">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[rgba(0,106,98,0.1)] px-2 py-1 font-nunito text-xs font-medium leading-4 text-[#006a62]">
                    <span className="size-1.5 rounded-full bg-[#006a62]" />
                    Paid
                  </span>
                </td>
                <td className="px-8 py-4 text-right">
                  <button
                    aria-label={`Download invoice for ${date}`}
                    className="text-[#2f7d7e] transition-colors hover:text-[#216263]"
                    onClick={() => toast.success(`Invoice for ${date} is ready to download.`)}
                    type="button"
                  >
                    <Download aria-hidden="true" size={20} strokeWidth={1.5} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function MembershipBillingPanel() {
  return (
    <div className="w-full max-w-227 space-y-6">
      <CurrentPlanCard />
      <PaymentMethodCard />
      <BillingHistoryTable />
    </div>
  );
}
