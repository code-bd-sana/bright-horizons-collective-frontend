import React from 'react';
import { Logo } from '@/components/logo';
import { Navbar } from '@/components/navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFFDF8] text-[#263238] font-sans antialiased selection:bg-[#2F7D7E]/20">
      {/* Top Header Row with Logo and Navbar components */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <Logo width={123} height={123} />
        <div className="w-full md:w-auto">
          <Navbar />
        </div>
      </header>

      {/* Main Content Area - Ready for building Home page sections from scratch */}
      <main className="w-full max-w-7xl mx-auto px-6 py-12 flex flex-col items-center justify-center min-h-[50vh]">
        {/* Section canvas ready for upcoming components */}
      </main>
    </div>
  );
}
