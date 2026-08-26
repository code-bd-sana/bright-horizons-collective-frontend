'use client';

import {
  Archive,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  Copy,
  FileText,
  Pencil,
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

import type { ParentResource } from './parent-resources-types';

type ResourceDetailsPageProps = {
  resource: ParentResource;
};

const detailCards = [
  ['Category', 'Sensory'],
  ['Type', 'Article'],
  ['Reading Time', '8 min read'],
  ['Author', 'Jaicy'],
] as const;

const publishingCards = [
  ['Created By', 'Jaicy'],
  ['Created Date', 'Mar 1, 2025'],
  ['Last Updated', 'Apr 2, 2025'],
  ['Published Date', 'Mar 5, 2025'],
] as const;

const analytics = [
  ['312', 'Total Views', 'text-[#2f7d7e]'],
  ['0', 'Total Downloads', 'text-[#4caf50]'],
  ['2 days ago', 'Last Viewed', 'text-[#607d8b]'],
] as const;

function DetailCard({
  label,
  value,
  large = false,
}: {
  label: string;
  value: string;
  large?: boolean;
}) {
  return (
    <div className={`rounded-[14px] bg-[#f4f8f6] p-3 ${large ? 'h-[86.5px]' : 'h-[65.5px]'}`}>
      <p className="font-manrope text-[11px] font-semibold leading-[16.5px] tracking-[0.55px] text-[#607d8b] uppercase">
        {label}
      </p>
      <p className="pt-1 font-manrope text-sm font-semibold leading-5.25 text-[#263238]">{value}</p>
    </div>
  );
}

function RelatedItem({
  children,
  weeklyPlan = false,
}: {
  children: React.ReactNode;
  weeklyPlan?: boolean;
}) {
  const ItemIcon = weeklyPlan ? CalendarDays : FileText;

  return (
    <button
      type="button"
      onClick={() => toast.message(`${children} is ready to view.`)}
      className="flex h-14.5 w-full items-center gap-3 rounded-[14px] border border-[#e7eceb] p-3.25 text-left transition-colors hover:bg-[#f4f8f6]"
    >
      <span
        className={`flex size-8 shrink-0 items-center justify-center rounded-[14px] ${weeklyPlan ? 'bg-[rgba(143,185,168,0.08)]' : 'bg-[rgba(47,125,126,0.08)]'}`}
      >
        <ItemIcon aria-hidden="true" size={14} strokeWidth={1.6} className="text-[#2f7d7e]" />
      </span>
      <span className="min-w-0 flex-1 truncate font-manrope text-sm leading-5.25 text-[#263238]">
        {children}
      </span>
      <ArrowRight
        aria-hidden="true"
        size={13}
        strokeWidth={1.7}
        className="shrink-0 text-[#607d8b]"
      />
    </button>
  );
}

export function ResourceDetailsPage({ resource }: ResourceDetailsPageProps) {
  const title =
    resource.id === 'sensory-processing'
      ? 'Understanding Sensory Processing in Young Children'
      : resource.title;

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-6 pb-8 text-[#263238]">
      <Link
        href="/dashboard/admin/parent-resources"
        className="inline-flex w-fit items-center gap-1.5 font-manrope text-sm font-medium leading-5 text-[#607d8b]"
      >
        <ArrowLeft aria-hidden="true" size={16} strokeWidth={1.6} />
        Back to Parent Resources
      </Link>

      <article className="overflow-hidden rounded-2xl border border-[#e7eceb] bg-white p-px shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
        <div className="flex h-48 items-center justify-center rounded-[14px] bg-[rgba(47,125,126,0.09)]">
          <BookOpen aria-hidden="true" size={36} strokeWidth={1.5} className="text-[#2f7d7e]" />
        </div>
        <div className="p-6">
          <div className="flex min-h-29.75 flex-col justify-between">
            <div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-[#edf6f2] px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 text-[#4caf50]">
                  Published
                </span>
                <span className="rounded-full bg-[#edf6f2] px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 text-[#2f7d7e]">
                  Little Steps
                </span>
                <span className="rounded-full bg-[rgba(47,125,126,0.08)] px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 text-[#2f7d7e]">
                  Article
                </span>
              </div>
              <h1 className="pt-3 font-nunito text-[22px] font-bold leading-8.25 text-[#263238]">
                {title}
              </h1>
            </div>

            <div className="flex flex-wrap gap-2 pt-4">
              <button
                type="button"
                onClick={() => toast.success(`“${title}” duplicated.`)}
                className="inline-flex h-9.5 items-center gap-2 rounded-[14px] border border-[#e7eceb] px-3.25 py-2.25 font-manrope text-sm font-semibold leading-5 text-[#607d8b]"
              >
                <Copy aria-hidden="true" size={14} strokeWidth={1.6} />
                Duplicate
              </button>
              <button
                type="button"
                onClick={() => toast.success(`“${title}” archived.`)}
                className="inline-flex h-9.5 items-center gap-2 rounded-[14px] border border-[rgba(184,134,11,0.25)] bg-[#fff8e1] px-3.25 py-2.25 font-manrope text-sm font-semibold leading-5 text-[#b8860b]"
              >
                <Archive aria-hidden="true" size={14} strokeWidth={1.6} />
                Archive
              </button>
              <Link
                href="/dashboard/admin/parent-resources/add-resource"
                className="inline-flex h-9.5 items-center gap-2 rounded-[14px] bg-[#2f7d7e] px-4 py-2 font-manrope text-sm font-semibold leading-5 text-white"
              >
                <Pencil aria-hidden="true" size={14} strokeWidth={1.6} />
                Edit Resource
              </Link>
            </div>
          </div>
        </div>
      </article>

      <article className="rounded-2xl border border-[#e7eceb] bg-white p-6.25 shadow-[0_4px_6px_rgba(0,0,0,0.06)]">
        <h2 className="font-nunito text-lg font-bold leading-6.75">Overview</h2>
        <p className="pt-4 font-manrope text-[15px] leading-[25.5px] text-[#607d8b]">
          A comprehensive guide to understanding how children process sensory information and how to
          support them at home.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {detailCards.map(([label, value]) => (
            <DetailCard key={label} label={label} value={value} large />
          ))}
        </div>
      </article>

      <article className="rounded-2xl border border-[#e7eceb] bg-white p-6.25 shadow-[0_4px_6px_rgba(0,0,0,0.06)]">
        <h2 className="font-nunito text-lg font-bold leading-6.75">Content</h2>
        <p className="pt-4 font-manrope text-[15px] leading-6.75 text-[#263238]">
          Sensory processing is the way our nervous system receives messages from the senses and
          turns them into appropriate motor and behavioral responses. Every child develops their
          sensory systems at their own pace...
        </p>
        <div className="mt-5 rounded-[14px] border border-[rgba(47,125,126,0.14)] bg-[#edf6f2] p-4.25 font-manrope text-sm leading-5.25 text-[#2f7d7e]">
          <strong>Callout box example:</strong> Key takeaway or important note for parents would
          appear here.
        </div>
      </article>

      <article className="rounded-2xl border border-[#e7eceb] bg-white p-6.25 shadow-[0_4px_6px_rgba(0,0,0,0.06)]">
        <h2 className="font-nunito text-lg font-bold leading-6.75">Related Content</h2>
        <div className="pt-4">
          <section>
            <h3 className="font-manrope text-xs font-semibold leading-4.5 tracking-[0.6px] text-[#607d8b] uppercase">
              Related Activities
            </h3>
            <div className="space-y-2 pt-2">
              <RelatedItem>Color Sorting Sensory Play</RelatedItem>
              <RelatedItem>Sensory Bin: Kinetic Sand</RelatedItem>
            </div>
          </section>
          <section className="mt-4">
            <h3 className="font-manrope text-xs font-semibold leading-4.5 tracking-[0.6px] text-[#607d8b] uppercase">
              Related Weekly Plans
            </h3>
            <div className="pt-2">
              <RelatedItem weeklyPlan>Sensory Foundations — Week 1</RelatedItem>
            </div>
          </section>
        </div>
      </article>

      <article className="rounded-2xl border border-[#e7eceb] bg-white p-6.25 shadow-[0_4px_6px_rgba(0,0,0,0.06)]">
        <h2 className="font-nunito text-lg font-bold leading-6.75">Analytics</h2>
        <div className="grid gap-4 pt-4 sm:grid-cols-3">
          {analytics.map(([value, label, color]) => (
            <div key={label} className="h-21 rounded-[14px] bg-[#f4f8f6] p-4 text-center">
              <p className={`font-nunito text-[28px] font-bold leading-7 ${color}`}>{value}</p>
              <p className="pt-1.5 font-manrope text-xs leading-4.5 text-[#607d8b]">{label}</p>
            </div>
          ))}
        </div>
      </article>

      <article className="rounded-2xl border border-[#e7eceb] bg-white p-6.25 shadow-[0_4px_6px_rgba(0,0,0,0.06)]">
        <h2 className="font-nunito text-lg font-bold leading-6.75">Publishing Information</h2>
        <div className="grid gap-4 pt-4 sm:grid-cols-2 lg:grid-cols-4">
          {publishingCards.map(([label, value]) => (
            <DetailCard key={label} label={label} value={value} />
          ))}
        </div>
      </article>
    </section>
  );
}
