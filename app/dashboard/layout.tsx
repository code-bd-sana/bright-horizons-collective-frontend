import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { cookies } from 'next/headers';
import { DEMO_SESSION_COOKIE, readDemoSession } from '@/lib/demo-session';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const session = await readDemoSession(cookieStore.get(DEMO_SESSION_COOKIE)?.value);

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-[#fffdf8]">
      <Sidebar role={session?.role} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <main className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 xl:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
