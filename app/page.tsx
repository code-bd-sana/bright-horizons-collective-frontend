import React from 'react';
import { HeroSection } from '@/components/hero-section';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFFDF8] text-[#263238] font-sans antialiased selection:bg-[#2F7D7E]/20">
      {/* Section 1: Hero Section */}
      <HeroSection />

      {/* Main Container for upcoming homepage sections */}
      <main className="w-full">{/* Sections 2 to 10 will be added here one by one */}</main>
    </div>
  );
}
