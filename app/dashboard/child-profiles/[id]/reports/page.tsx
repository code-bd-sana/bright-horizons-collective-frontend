import { notFound } from 'next/navigation';
import { childDetails } from '@/components/dashboard/child-profile-detail/types';
import { ReportsList } from '@/components/dashboard/child-profile-detail/reports/reports-list';

export default async function ReportsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const child = childDetails[id];

  if (!child) notFound();

  return (
    <div className="mx-auto mt-14 flex w-full max-w-286.75 flex-col gap-10 px-4 pb-12 md:px-8">
      <div className="flex flex-col gap-3 md:max-w-265.75 md:self-center md:w-265.75">
        <h1 className="font-nunito text-[32px] font-medium leading-10 tracking-[-0.005em] text-[#263238]">
          Therapy Reports & Progress Summaries
        </h1>
        <p className="font-manrope text-[14px] font-normal leading-5.5 tracking-[-0.006em] text-[#7D8488]">
          Exportable activity participation records and milestone summaries for pediatrician or IEP
          sharing
        </p>
      </div>

      <div className="flex flex-col gap-10">
        <ReportsList childName={child.name} />
      </div>
    </div>
  );
}
