import { DEMO_SESSION_COOKIE, readDemoSession } from '@/lib/demo-session';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const session = await readDemoSession(cookieStore.get(DEMO_SESSION_COOKIE)?.value);

  if (session?.role !== 'admin') redirect('/dashboard');

  return children;
}
