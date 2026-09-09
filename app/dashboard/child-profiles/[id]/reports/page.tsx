import { notFound } from 'next/navigation';
import { childDetails } from '@/components/dashboard/child-profile-detail/types';
import { ReportsList } from '@/components/dashboard/child-profile-detail/reports/reports-list';

export default async function ReportsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const child = childDetails[id];

  if (!child) notFound();

  return (
    <div className="mx-auto mt-8 flex w-full min-w-0 max-w-286.75 flex-col gap-6 pb-12 sm:mt-10 sm:gap-8 2xl:mt-14 2xl:gap-10">
      <div className="flex w-full min-w-0 flex-col gap-3 2xl:w-265.75 2xl:max-w-265.75 2xl:self-center">
        <h1 className="font-nunito text-2xl font-medium leading-8 tracking-[-0.005em] text-[#263238] sm:text-3xl sm:leading-10 2xl:text-[32px]">
          Therapy Reports & Progress Summaries
        </h1>
        <p className="font-manrope text-sm font-normal leading-5.5 tracking-[-0.006em] text-[#7D8488]">
          Exportable activity participation records and milestone summaries for pediatrician or IEP
          sharing
        </p>
      </div>

      <div className="flex flex-col gap-6 sm:gap-10">
        <ReportsList childName={child.name} />
      </div>
    </div>
  );
}
