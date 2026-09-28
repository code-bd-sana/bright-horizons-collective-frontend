'use client';

import { Suspense, useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { ExploreCatalog } from '@/components/explore/explore-catalog';
import { ExploreHeroSection } from '@/components/explore/explore-hero-section';
import { ExploreWaveTransition } from '@/components/explore/explore-wave-transition';
import type { ExploreContentType } from '@/lib/explore-data';

const TAB_TO_TYPE: Record<string, ExploreContentType> = {
  activities: 'Activities',
  'parent-resources': 'Parent Resources',
  'therapy-toys': 'Therapy Toys',
};

const TYPE_TO_TAB: Record<ExploreContentType, string> = {
  Activities: 'activities',
  'Parent Resources': 'parent-resources',
  'Therapy Toys': 'therapy-toys',
};

function ExplorePageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const tabParam = searchParams.get('tab')?.toLowerCase() ?? 'activities';
  const activeType: ExploreContentType = TAB_TO_TYPE[tabParam] || 'Activities';

  const handleActiveTypeChange = useCallback(
    (newType: ExploreContentType) => {
      const newTab = TYPE_TO_TAB[newType] || 'activities';
      const params = new URLSearchParams(searchParams.toString());
      params.set('tab', newTab);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  return (
    <main>
      <ExploreHeroSection />
      <ExploreWaveTransition activeType={activeType} />
      <ExploreCatalog activeType={activeType} onActiveTypeChange={handleActiveTypeChange} />
    </main>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={null}>
      <ExplorePageContent />
    </Suspense>
  );
}
