import { redirect } from 'next/navigation';

export default function CompleteProfileRoute() {
  redirect('/dashboard/child-profiles/add-child');
}
