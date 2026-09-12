import { redirect } from 'next/navigation';
import { ParentDashboardPage } from '@/components/dashboard/parent-dashboard-page';
import { getSession } from '@/lib/auth/session';

export default async function DashboardPage() {
  const session = await getSession();

  if (session?.role === 'admin') {
    redirect('/dashboard/admin');
  }

  return <ParentDashboardPage />;
}
