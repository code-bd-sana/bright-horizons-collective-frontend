import { AboutFaqSection } from '@/components/about/about-faq-section';
import { AboutFinalCtaSection } from '@/components/about/about-final-cta-section';
import { AboutHero } from '@/components/about/about-hero';
import { AboutJourneySection } from '@/components/about/about-journey-section';
import { AboutStorySection } from '@/components/about/about-story-section';
import { AboutSupportSection } from '@/components/about/about-support-section';
import { AboutValuesSection } from '@/components/about/about-values-section';

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <AboutStorySection />
      <AboutSupportSection />
      <AboutValuesSection />
      <AboutJourneySection />
      <AboutFaqSection />
      <AboutFinalCtaSection />
    </main>
  );
}
