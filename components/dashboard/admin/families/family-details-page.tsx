'use client';

import {
  Archive,
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  MessageCircle,
  PlayCircle,
  UserRound,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const info = [
  ['Name', 'Amara Okonkwo'],
  ['Email', 'amara.okonkwo@email.com'],
  ['Address', '742 Evergreen Terrace, Springfield, IL'],
  ['Phone', '+1 (555) 234-5678'],
  ['Registered', 'Jan 12, 2025'],
];
const activities: Array<[string, string, typeof PlayCircle, string]> = [
  [
    'Plan assigned: Sensory Foundations — Week 1',
    'Apr 3, 2025',
    CalendarDays,
    'bg-[rgba(47,125,126,0.08)] text-[#2f7d7e]',
  ],
  [
    'Zara completed activity: Color Sorting Sensory Play',
    'Apr 2, 2025',
    PlayCircle,
    'bg-[rgba(76,175,80,0.08)] text-[#4caf50]',
  ],
  [
    'Membership renewed: Grow Together',
    'Jan 12, 2025',
    CalendarDays,
    'bg-[rgba(143,185,168,0.08)] text-[#2f7d7e]',
  ],
  ['Family registered', 'Jan 12, 2025', UserRound, 'bg-[rgba(96,125,139,0.08)] text-[#607d8b]'],
];

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <section
      className={`rounded-2xl border border-[#e7eceb] bg-white p-6 shadow-[0_4px_6px_rgba(0,0,0,0.06)] ${className}`}
    >
      {children}
    </section>
  );
}

export function FamilyDetailsPage({ familyId: _familyId }: { familyId: string }) {
  void _familyId;
  const router = useRouter();
  return (
    <section className="mx-auto w-full max-w-232.75 pb-8 text-[#263238]">
      <button
        type="button"
        onClick={() => router.push('/dashboard/admin/families')}
        className="mb-6 flex items-center gap-1.5 font-manrope text-sm font-medium text-[#607d8b]"
      >
        <ArrowLeft size={16} />
        Back to Families
      </button>
      <div className="space-y-6">
        <Card>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
            <span className="relative size-16 shrink-0 overflow-hidden rounded-full bg-[#2f7d7e]">
              <Image
                src="/Home/figma-dashboard-avatar.png"
                alt="Amara Okonkwo"
                fill
                sizes="64px"
                className="object-cover object-[50%_10%]"
              />
            </span>
            <div className="min-w-0 flex-1">
              <h1 className="font-nunito text-[22px] font-bold leading-8.25">Amara Okonkwo</h1>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#d5e5e5] px-2.5 py-0.5 font-manrope text-xs font-semibold text-[#2f7d7e]">
                  Grow Together
                </span>
                <span className="rounded-full bg-[#edf6f2] px-2.5 py-0.5 font-manrope text-xs font-semibold text-[#4caf50]">
                  Active
                </span>
                <span className="font-manrope text-xs font-medium text-[#607d8b]">
                  Joined Jan 12, 2026
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => toast.success('Message composer is ready for Amara Okonkwo.')}
                className="flex h-10 items-center gap-2 rounded-[14px] border border-[rgba(47,125,126,0.19)] bg-[rgba(47,125,126,0.07)] px-4 font-manrope text-sm font-semibold text-[#2f7d7e]"
              >
                <MessageCircle size={14} />
                Message
              </button>
              <button
                type="button"
                onClick={() => toast.success('Weekly plan assignment is ready.')}
                className="h-10 rounded-[14px] bg-[#2f7d7e] px-4 font-manrope text-sm font-semibold text-white"
              >
                Assign weekly plan
              </button>
            </div>
          </div>
        </Card>
        <Card>
          <h2 className="font-nunito text-lg font-bold leading-7">Parent Information</h2>
          <dl className="mt-4 grid gap-x-4 gap-y-4 sm:grid-cols-2">
            {info.map(([label, value]) => (
              <div key={label}>
                <dt className="font-manrope text-[11px] font-semibold uppercase tracking-[0.55px] text-[#607d8b]">
                  {label}
                </dt>
                <dd className="mt-1 font-manrope text-sm leading-5.25">{value}</dd>
              </div>
            ))}
          </dl>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <h2 className="font-nunito text-lg font-bold leading-7">Membership</h2>
            <button
              type="button"
              onClick={() => toast.success('Membership management is ready.')}
              className="flex items-center gap-1.5 font-manrope text-sm font-semibold text-[#2f7d7e]"
            >
              Manage Membership <ArrowUpRight size={13} />
            </button>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 xl:grid-cols-4">
            {[
              ['Current Plan', 'Grow Together'],
              ['Status', 'Active'],
              ['Join Date', 'Jan 12, 2025'],
              ['Renewal Date', 'Jan 12, 2026'],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[14px] bg-[#f4f8f6] p-3">
                <p className="font-manrope text-[11px] font-semibold uppercase tracking-[0.55px] text-[#607d8b]">
                  {label}
                </p>
                <p className="mt-1 font-manrope text-sm font-semibold text-[#263238]">{value}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="font-nunito text-lg font-bold leading-7">
            Children <span className="text-xs font-medium text-[#607d8b]">(2)</span>
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              ['Z', 'Zara', '3 yrs · Toddler', 'Sensory Foundations — Week 1', '60% complete'],
              ['K', 'Kofi', '1 yr · Infant', 'Language Launch — Week 1', '40% complete'],
            ].map(([initial, name, age, plan, progress]) => (
              <div key={name} className="rounded-[14px] border border-[#e7eceb] bg-[#f4f8f6] p-4">
                <div className="flex items-center gap-3">
                  <span className="flex size-8 items-center justify-center rounded-full bg-[rgba(143,185,168,0.19)] font-nunito text-xs font-bold text-[#2f7d7e]">
                    {initial}
                  </span>
                  <div>
                    <p className="font-manrope text-[13px] font-semibold">{name}</p>
                    <p className="font-manrope text-[11px] text-[#607d8b]">{age}</p>
                  </div>
                </div>
                <p className="mt-3 font-manrope text-[11px] text-[#607d8b]">Current Plan</p>
                <p className="font-manrope text-[13px] font-semibold">{plan}</p>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#e7eceb]">
                  <div className="h-full rounded-full bg-[#2f7d7e]" style={{ width: progress }} />
                </div>
                <p className="mt-1 font-manrope text-[11px] text-[#607d8b]">{progress}</p>
                <button
                  type="button"
                  className="mt-2 flex h-8 w-full items-center justify-center rounded-[10px] border border-[#cfe0e0] bg-[#e9f1ee] font-manrope text-[11px] text-[#2f7d7e]"
                >
                  View Profile
                </button>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <h2 className="font-nunito text-lg font-bold leading-7">Assigned Weekly Plans</h2>
            <button type="button" className="font-manrope text-xs font-semibold text-[#2f7d7e]">
              Assign New Plan <ArrowUpRight size={13} className="inline" />
            </button>
          </div>
          <div className="mt-4 space-y-3">
            {[
              [
                'Z',
                'Zara — Sensory Foundations — Week 1',
                'Assigned Apr 3, 2025',
                '60%',
                '3/5 activities',
              ],
              [
                'K',
                'Kofi — Language Launch — Week 1',
                'Assigned Mar 28, 2025',
                '40%',
                '2/5 activities',
              ],
            ].map(([initial, title, date, percent, count]) => (
              <div key={title} className="flex items-center gap-3 rounded-[14px] bg-[#f4f8f6] p-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-[14px] bg-[rgba(143,185,168,0.19)] font-nunito text-xs font-bold text-[#2f7d7e]">
                  {initial}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-manrope text-[13px] font-semibold">{title}</p>
                  <p className="font-manrope text-[11px] text-[#607d8b]">{date}</p>
                  <div className="mt-1.5 h-1.5 rounded-full bg-[#e7eceb]">
                    <div className="h-full rounded-full bg-[#2f7d7e]" style={{ width: percent }} />
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-nunito text-base font-bold text-[#2f7d7e]">{percent}</p>
                  <p className="font-manrope text-[11px] text-[#607d8b]">{count}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="font-nunito text-lg font-bold leading-7">Recent Activity</h2>
          <div className="mt-4 space-y-4">
            {activities.map(([title, date, Icon, colors]) => {
              const ActivityIcon = Icon as typeof PlayCircle;
              return (
                <div key={title as string} className="flex gap-3">
                  <span
                    className={`flex size-8 shrink-0 items-center justify-center rounded-[14px] ${colors as string}`}
                  >
                    <ActivityIcon size={14} />
                  </span>
                  <div>
                    <p className="font-manrope text-[13px] text-[#263238]">{title}</p>
                    <p className="mt-0.5 font-manrope text-[11px] text-[#607d8b]">{date}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <h2 className="font-nunito text-lg font-bold leading-7">Messages</h2>
            <button
              type="button"
              onClick={() => toast.success('Conversation opened.')}
              className="flex items-center gap-1.5 font-manrope text-sm font-semibold text-[#2f7d7e]"
            >
              Open Conversation
              <ArrowUpRight size={13} />
            </button>
          </div>
          <div className="mt-4 space-y-3">
            <div className="flex gap-3 border-b border-[#e7eceb] pb-3">
              <span className="flex size-7 items-center justify-center rounded-full bg-[rgba(143,185,168,0.19)] font-nunito text-xs font-bold text-[#2f7d7e]">
                A
              </span>
              <div>
                <p className="font-manrope text-xs font-semibold">
                  Amara Okonkwo{' '}
                  <span className="ml-2 font-normal text-[#607d8b]">Apr 3, 2025 · 12:01 PM</span>
                </p>
                <p className="mt-1 font-manrope text-[13px] text-[#607d8b]">
                  Perfect, thank you. Quick question — should we do the activities in the order
                  they&apos;re listed in the app?
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="flex size-7 items-center justify-center rounded-full bg-[rgba(47,125,126,0.13)] font-nunito text-xs font-bold text-[#2f7d7e]">
                S
              </span>
              <div>
                <p className="font-manrope text-xs font-semibold">
                  Sarah K.{' '}
                  <span className="ml-2 font-normal text-[#607d8b]">Apr 3, 2025 · 12:18 PM</span>
                </p>
                <p className="mt-1 font-manrope text-[13px] text-[#607d8b]">
                  Yes, the order is recommended but flexible — follow Zara&apos;s energy. If
                  she&apos;s tired, save the more stimulating activity for after rest time.
                </p>
              </div>
            </div>
          </div>
        </Card>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => toast.success('Family archived.')}
            className="flex h-10 items-center gap-2 rounded-[14px] border border-[rgba(184,134,11,0.25)] bg-[#fff8e1] px-4 font-manrope text-sm font-semibold text-[#b8860b]"
          >
            <Archive size={14} />
            Archive Family
          </button>
        </div>
      </div>
    </section>
  );
}
