import React from 'react';
import { HeroSection } from '@/components/Home/hero-section';
import { WeeklyPlanSection } from '@/components/Home/weekly-plan-section';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FDFDFC] font-sans text-[#263238] antialiased selection:bg-[#2F7D7E]/20">
      <HeroSection />
      <main className="w-full">
        <WeeklyPlanSection />
      </main>
    </div>
  );
}
