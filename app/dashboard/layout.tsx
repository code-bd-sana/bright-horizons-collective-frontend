import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { cookies } from 'next/headers';
import { DEMO_SESSION_COOKIE, readDemoSession } from '@/lib/demo-session';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const session = await readDemoSession(cookieStore.get(DEMO_SESSION_COOKIE)?.value);

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <Sidebar role={session?.role} />
      <div className="flex flex-col flex-1 min-w-0">
        <Header />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
