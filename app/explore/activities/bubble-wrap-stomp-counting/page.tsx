import { redirect } from 'next/navigation';

export default function BubbleWrapStompCountingPage() {
  redirect('/explore?tab=activities');
}
