'use client';

import { ExploreCatalog } from '@/components/explore/explore-catalog';
import { ExploreHeroSection } from '@/components/explore/explore-hero-section';
import { ExploreWaveTransition } from '@/components/explore/explore-wave-transition';
import type { ExploreContentType } from '@/lib/explore-data';
import { useState } from 'react';

export default function ExplorePage() {
  const [activeType, setActiveType] = useState<ExploreContentType>('Activities');

  return (
    <main>
      <ExploreHeroSection />
      <ExploreWaveTransition activeType={activeType} />
      <ExploreCatalog activeType={activeType} onActiveTypeChange={setActiveType} />
    </main>
  );
}
