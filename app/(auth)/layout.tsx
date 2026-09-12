import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth/session';
import { getRoleConfig } from '@/lib/role-config';

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (session) redirect(getRoleConfig(session.role).homePath);

  return children;
}
