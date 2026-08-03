import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-hidden selection:bg-primary/30">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-purple-700/20 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-700/20 blur-[120px] pointer-events-none"></div>

      {/* Navbar */}
      <header className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <nav className="hidden md:flex space-x-8 text-sm font-medium text-neutral-300">
          <a href="#features" className="hover:text-white transition-colors duration-300">
            Features
          </a>
          <a href="#about" className="hover:text-white transition-colors duration-300">
            About
          </a>
          <a href="#docs" className="hover:text-white transition-colors duration-300">
            Docs
          </a>
        </nav>
        <Link
          href="/login"
          className="px-5 py-2 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-full backdrop-blur-md transition-all duration-300 inline-block"
        >
          Get Started
        </Link>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center pt-32 pb-20 px-6 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center px-4 py-1.5 mb-8 text-xs font-medium text-blue-300 bg-blue-900/30 border border-blue-500/30 rounded-full backdrop-blur-sm">
          <span className="flex w-2 h-2 mr-2 bg-blue-400 rounded-full animate-pulse"></span>
          Next-Gen Framework Released
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
          Build faster with <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-purple-500 to-pink-500">
            stunning aesthetics.
          </span>
        </h1>

        <p className="max-w-2xl text-lg md:text-xl text-neutral-400 mb-12 leading-relaxed">
          Experience the ultimate frontend template designed for speed, flexibility, and
          jaw-dropping visual appeal. Ship your next big idea in record time.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/dashboard"
            className="px-8 py-4 text-base font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-full shadow-[0_0_40px_-10px_rgba(37,99,235,0.8)] transition-all duration-300 hover:scale-105 inline-block"
          >
            Start Building
          </Link>
          <Link
            href="/login"
            className="px-8 py-4 text-base font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-105 inline-block"
          >
            Sign In
          </Link>
        </div>

        {/* Feature Cards / Glassmorphism showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 w-full text-left">
          {[
            {
              title: 'Lightning Fast',
              description:
                'Optimized for maximum performance and perfect Lighthouse scores out of the box.',
            },
            {
              title: 'Premium Design',
              description: 'Carefully crafted typography, spacing, and colors that scream quality.',
            },
            {
              title: 'Developer Ready',
              description: 'Configured with ESLint, TypeScript, and Tailwind CSS for the best DX.',
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="group p-8 rounded-3xl bg-white/3 border border-white/10 backdrop-blur-lg hover:bg-white/8 hover:-translate-y-1 transition-all duration-500 cursor-default"
            >
              <div className="w-12 h-12 mb-6 rounded-2xl bg-linear-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <div className="w-4 h-4 bg-white/80 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed group-hover:text-neutral-300 transition-colors duration-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
