import { getRoleConfig } from '@/lib/role-config';
import { ActivitiesLibraryPage } from '@/components/dashboard/admin/activities-library/activities-library-page';
import { notFound } from 'next/navigation';

export default async function AdminSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const matchingItem = getRoleConfig('admin').menuItems.find(
    (item) => item.href === `/dashboard/admin/${section}`
  );

  if (!matchingItem) notFound();

  if (section === 'activities-library') return <ActivitiesLibraryPage />;

  return (
    <section className="mx-auto w-full max-w-343.5 pb-8 text-[#263238]">
      <p className="font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#7d8488]">
        Administration
      </p>
      <h1 className="mt-1 font-nunito text-2xl font-medium leading-8 sm:text-[32px] sm:leading-10">
        {matchingItem.name}
      </h1>
      <p className="mt-2 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#7d8488]">
        This admin workspace is ready for its dedicated management interface.
      </p>
    </section>
  );
}
