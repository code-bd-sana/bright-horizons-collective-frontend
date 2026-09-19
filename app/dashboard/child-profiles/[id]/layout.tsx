import { ReactNode } from 'react';
import { ChildProfileDetailProvider } from '@/features/child-profiles/context/child-profile-detail-context';
import { ProfileHeader } from '@/components/dashboard/child-profile-detail/profile-header';

export default async function ChildProfileLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <ChildProfileDetailProvider childId={id}>
      <section className="mx-auto w-full min-w-0 max-w-382.25">
        <ProfileHeader />
        {children}
      </section>
    </ChildProfileDetailProvider>
  );
}
