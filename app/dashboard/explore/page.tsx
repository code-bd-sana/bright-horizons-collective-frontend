import { DashboardExplorePage } from '@/components/dashboard/explore/dashboard-explore-page';
import { isExploreTab } from '@/features/explore/model/explore-types';

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string | string[] }>;
}) {
  const params = await searchParams;
  const requestedTab = Array.isArray(params.tab) ? params.tab[0] : params.tab;
  const initialTab = isExploreTab(requestedTab) ? requestedTab : 'activities';

  return <DashboardExplorePage initialTab={initialTab} />;
}
