'use client';

import { Bookmark, Play, ShieldCheck, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { parentTips, safetyNotes } from './activity-detail-data';

function formatTime(seconds: number) {
  return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
}

export function ActivitySidePanels() {
  const [seconds, setSeconds] = useState(20 * 60);
  const [running, setRunning] = useState(false);
  const [saved, setSaved] = useState(false);
  const [completed, setCompleted] = useState(false);
  useEffect(() => {
    if (!running || seconds === 0) return;
    const timer = window.setInterval(() => setSeconds((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [running, seconds]);
  return (
    <aside className="space-y-6">
      <section className="rounded-2xl border border-[#e8ebe8] bg-white p-8 shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
        <p className="font-nunito text-xs font-medium uppercase leading-4 text-[#7d8488]">
          Session Timer
        </p>
        <p className="mt-4 text-center font-manrope text-[40px] leading-12 tracking-[-0.4px] text-[#2f7d7e]">
          {formatTime(seconds)}
        </p>
        <button
          type="button"
          onClick={() => setRunning((value) => !value)}
          className="mt-5 flex h-9 w-full items-center justify-center gap-2 rounded-full border border-[#2f7d7e] font-manrope text-sm leading-5.5 text-[#2f7d7e]"
        >
          <Play aria-hidden="true" size={15} fill="currentColor" strokeWidth={1.5} />
          {running ? 'Pause session timer' : 'Start session timer'}
        </button>
      </section>
      <section className="rounded-2xl border border-[#e8ebe8] bg-white p-8 shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
        <p className="font-nunito text-xs font-medium uppercase leading-4 text-[#7d8488]">
          Ready to begin?
        </p>
        <button
          type="button"
          onClick={() => setCompleted(true)}
          className="mt-5 flex h-9 w-full items-center justify-center gap-2 rounded-full bg-[#2f7d7e] font-manrope text-sm leading-5.5 text-white"
        >
          {completed ? 'Activity Completed' : 'Complete Activity'} <span aria-hidden="true">→</span>
        </button>
        <button
          type="button"
          onClick={() => setSaved((value) => !value)}
          className="mt-4 flex h-9 w-full items-center justify-center gap-2 rounded-full border border-[#d8ddd9] font-manrope text-sm leading-5.5 text-[#515b60]"
        >
          <Bookmark aria-hidden="true" size={15} strokeWidth={1.5} />
          {saved ? 'Saved for Later' : 'Save for Later'}
        </button>
      </section>
      <section className="rounded-2xl border border-[#e8ebe8] bg-white p-8 shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
        <h2 className="font-nunito text-2xl font-medium leading-8 text-[#263238]">Parent Tips</h2>
        <div className="mt-6 space-y-5">
          {parentTips.map((tip, index) => (
            <div key={tip} className="flex gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#dceeee] font-nunito text-xs font-medium text-[#2f7d7e]">
                {index + 1}
              </span>
              <p className="font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#263238]">
                {tip}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="rounded-2xl border border-[#fff0a8] bg-[#fffde8] p-8">
        <h2 className="font-nunito text-2xl font-medium leading-8 text-[#263238]">Safety Notes</h2>
        <div className="mt-6 space-y-6">
          {safetyNotes.map((note) => (
            <div key={note} className="flex gap-3">
              <ShieldCheck
                aria-hidden="true"
                size={21}
                strokeWidth={1.5}
                className="shrink-0 text-[#e9a900]"
              />
              <p className="font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#263238]">
                {note}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="rounded-2xl bg-[#cfe1dc] p-8">
        <h2 className="flex items-center gap-2 font-nunito text-xl font-medium leading-7 text-[#263238]">
          <TrendingUp aria-hidden="true" size={20} strokeWidth={1.5} className="text-[#2f7d7e]" />
          Development Goal
        </h2>
        <p className="mt-4 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#394a43]">
          Improve whole-body motor planning, balance, and body awareness
        </p>
      </section>
    </aside>
  );
}
