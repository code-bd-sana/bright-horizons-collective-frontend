import { redirect } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { getSession } from '@/lib/auth/session';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect('/login');

  const isAdmin = session.role === 'admin';

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-[#fffdf8]">
      <Sidebar role={session.role} />
      <div className={`flex min-w-0 flex-1 flex-col ${isAdmin ? 'relative' : ''}`}>
        <Header role={session.role} />
        <main
          className={
            isAdmin
              ? 'min-h-0 flex-1 overflow-y-auto overscroll-contain p-5 sm:p-6 xl:px-10 xl:py-5'
              : 'min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain p-4 sm:p-6 xl:p-8'
          }
        >
          {children}
        </main>
      </div>
    </div>
  );
}
