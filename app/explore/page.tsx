import { ExploreCatalog } from '@/components/explore-catalog';
import { ExploreHeroSection } from '@/components/explore-hero-section';
import { ExploreWaveTransition } from '@/components/explore-wave-transition';

export default function ExplorePage() {
  return (
    <main>
      <ExploreHeroSection />
      <ExploreWaveTransition />
      <ExploreCatalog />
    </main>
  );
}
