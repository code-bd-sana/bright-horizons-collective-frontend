import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

import { ProfileHeader } from '@/components/dashboard/child-profile-detail/profile-header';
import { childDetails } from '@/components/dashboard/child-profile-detail/types';

export default async function ChildProfileLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const child = childDetails[id];

  if (!child) notFound();

  return (
    <section className="mx-auto w-full max-w-382.25">
      <ProfileHeader child={child} />
      {children}
    </section>
  );
}
