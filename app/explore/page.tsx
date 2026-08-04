import { ExploreCatalog } from '@/components/explore/explore-catalog';
import { ExploreHeroSection } from '@/components/explore/explore-hero-section';
import { ExploreWaveTransition } from '@/components/explore/explore-wave-transition';

export default function ExplorePage() {
  return (
    <main>
      <ExploreHeroSection />
      <ExploreWaveTransition />
      <ExploreCatalog />
    </main>
  );
}
