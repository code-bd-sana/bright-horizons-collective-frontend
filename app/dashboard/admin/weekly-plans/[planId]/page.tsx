import { WeeklyPlanDetailsPage } from '@/components/dashboard/admin/weekly-plans/weekly-plan-details-page';

export default async function WeeklyPlanDetailsRoute({
  params,
}: {
  params: Promise<{ planId: string }>;
}) {
  const { planId } = await params;

  return <WeeklyPlanDetailsPage planId={planId} />;
}
