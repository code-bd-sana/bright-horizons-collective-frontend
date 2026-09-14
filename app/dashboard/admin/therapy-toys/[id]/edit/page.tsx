'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { TherapyToyForm } from '@/components/dashboard/admin/therapy-toys/therapy-toy-form';
import { useAdminTherapyToy } from '@/features/therapy-toys/hooks/therapy-toys.queries';

export default function EditTherapyToyPage() {
  const params = useParams<{ id: string }>();
  const toyQuery = useAdminTherapyToy(params.id);

  if (toyQuery.isLoading) {
    return (
      <div
        className="mx-auto h-128 w-full max-w-211.25 animate-pulse rounded-3xl bg-white"
        aria-label="Loading therapy toy"
      />
    );
  }

  if (toyQuery.isError || !toyQuery.data) {
    return (
      <section className="mx-auto flex w-full max-w-211.25 flex-col items-center gap-4 rounded-3xl bg-white p-8 text-center">
        <h1 className="font-nunito text-xl font-bold text-[#263238]">
          Unable to load this therapy toy
        </h1>
        <p className="font-manrope text-sm text-[#607d8b]">
          {toyQuery.error?.message ?? 'The toy was not found.'}
        </p>
        <Link
          href="/dashboard/admin/therapy-toys"
          className="rounded-full bg-[#2f7d7e] px-5 py-2.5 font-manrope text-sm font-semibold text-white"
        >
          Back to Therapy Toys
        </Link>
      </section>
    );
  }

  return <TherapyToyForm toy={toyQuery.data} />;
}
