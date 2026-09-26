import { Suspense } from 'react';
import { MemberDirectoryPage } from '@/components/dashboard/admin/memberships/member-directory-page';

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-75 items-center justify-center font-manrope text-sm text-[#607d8b]">
          Loading member directory...
        </div>
      }
    >
      <MemberDirectoryPage />
    </Suspense>
  );
}
