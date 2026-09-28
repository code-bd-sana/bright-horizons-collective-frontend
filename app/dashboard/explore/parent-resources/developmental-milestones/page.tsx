import { redirect } from 'next/navigation';

export default function DashboardDevelopmentalMilestonesPage() {
  redirect('/dashboard/explore?tab=parent-resources');
}
