import { redirect } from 'next/navigation';

export default function DashboardBubbleWrapStompCountingPage() {
  redirect('/dashboard/explore?tab=activities');
}
