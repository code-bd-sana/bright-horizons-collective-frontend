import { notFound } from 'next/navigation';
import { childDetails } from '@/components/dashboard/child-profile-detail/types';
import { StatCards } from '@/components/dashboard/child-profile-detail/development-progress/stat-cards';
import { DevelopmentAreas } from '@/components/dashboard/child-profile-detail/development-progress/development-areas';
import { Highlights } from '@/components/dashboard/child-profile-detail/development-progress/highlights';
import { NextSteps } from '@/components/dashboard/child-profile-detail/development-progress/next-steps';

export default async function DevelopmentProgressPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const child = childDetails[id];

  if (!child) notFound();

  return (
    <div className="mx-auto mt-8 flex w-full max-w-343.5 flex-col gap-6 pb-12 sm:mt-14 sm:gap-10">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="font-nunito text-2xl font-medium leading-8 tracking-[-0.005em] text-[#263238] sm:text-[32px] sm:leading-10">
            Development Progress
          </h1>
          <p className="font-manrope text-sm font-normal leading-5.5 tracking-[-0.006em] text-[#7D8488]">
            A summary of {child.name}&apos;s engagement across development areas- based on
            activities completed, not evaluations.
          </p>
        </div>
        <StatCards />
      </div>

      <DevelopmentAreas />
      <Highlights />
      <NextSteps />
    </div>
  );
}
