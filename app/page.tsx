import { FaqSection } from '@/components/Home/faq-section';
import { FeaturedHomeContent } from '@/components/Home/featured-home-content';
import { FinalCtaSection } from '@/components/Home/final-cta-section';
import { FounderSection } from '@/components/Home/founder-section';
import { HeroSection } from '@/components/Home/hero-section';
import { HomeBenefitsSection } from '@/components/Home/home-benefits-section';
import { HowItWorksSection } from '@/components/Home/how-it-works-section';
import { MembershipSection } from '@/components/Home/membership-section';
import { ParentResourcesSection } from '@/components/Home/parent-resources-section';
import { TestimonialsSection } from '@/components/Home/testimonials-section';
import { WeeklyPlanSection } from '@/components/Home/weekly-plan-section';
import { WhyBrightHorizonsSection } from '@/components/Home/why-bright-horizons-section';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FDFDFC] font-sans text-[#263238] antialiased selection:bg-[#2F7D7E]/20">
      <HeroSection />
      <main className="w-full">
        <WeeklyPlanSection />
        <HomeBenefitsSection />
        <FeaturedHomeContent />
        <ParentResourcesSection />
        <TestimonialsSection />
        <WhyBrightHorizonsSection />
        <FounderSection />
        <HowItWorksSection />
        <FaqSection />
        <MembershipSection />
        <FinalCtaSection />
      </main>
    </div>
  );
}
