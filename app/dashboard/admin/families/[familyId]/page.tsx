import { FamilyDetailsPage } from '@/components/dashboard/admin/families/family-details-page';

export default async function FamilyDetailsRoute({
  params,
}: {
  params: Promise<{ familyId: string }>;
}) {
  const { familyId } = await params;
  return <FamilyDetailsPage familyId={familyId} />;
}
