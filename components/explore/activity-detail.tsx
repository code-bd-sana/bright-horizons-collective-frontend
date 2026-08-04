'use client';

import { Bookmark, Check, Clock3 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const steps = [
  'Invite your child to stomp freely for 1–2 minutes.',
  'Count pops together out loud.',
  'Introduce a pattern: “Two stomps, then a jump!”',
  'Try stomping with one foot, then joint input.',
  'Let your child make up their own stomping game.',
];

const relatedActivities = [
  {
    title: 'Obstacle Course Adventure',
    age: '3–5 yr',
    skill: 'Gross Motor',
    image: '/Home/activity-obstacle-course.png',
  },
  {
    title: 'Tong Transfer Challenge',
    age: '3–6 yr',
    skill: 'Fine Motor',
    image: '/Home/activity-tong-transfer.png',
  },
  {
    title: 'Bilateral Drawing Rainbows',
    age: '3–5 yr',
    skill: 'Visual-Motor',
    image: '/Home/activity-bilateral-drawing.png',
  },
];

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-[#DCEEEE] px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 text-[#174A4D]">
      {children}
    </span>
  );
}

export function ActivityDetail() {
  const [saved, setSaved] = useState(false);
  const [completed, setCompleted] = useState(false);

  return (
    <main className="bg-[#FDFDFC] text-[#263238]">
      <div className="mx-auto flex w-full max-w-311 flex-col gap-15 px-20 pb-20 pt-40 max-xl:px-8 max-lg:pt-36 max-md:gap-10 max-md:px-5 max-md:pb-12 max-md:pt-36">
        <section className="flex flex-col gap-8">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1.5 font-nunito text-2xl font-medium leading-8 max-md:text-lg"
          >
            <Link href="/explore" className="text-[#2F7D7E] hover:underline">
              Explore
            </Link>
            <span className="font-manrope text-lg text-[#D8DDD9]">/</span>
            <Link href="/explore" className="text-[#2F7D7E] hover:underline">
              Activities
            </Link>
            <span className="font-manrope text-lg text-[#D8DDD9]">/</span>
            <span>Bubble Wrap Stomp Counting</span>
          </nav>

          <div className="relative h-101.25 overflow-hidden rounded-2xl bg-[#DCEEEE] max-md:h-64">
            <Image
              src="/Home/activity-bubble-wrap-stomp.png"
              alt="Colourful toy numbers and vehicles"
              fill
              priority
              className="object-cover object-bottom"
              sizes="(min-width: 1280px) 1244px, 100vw"
            />
          </div>
        </section>

        <section className="flex flex-col gap-8">
          <div className="border-b border-[#ADB1AE] pb-6">
            <h1 className="font-nunito text-[40px] font-medium leading-12 tracking-[-0.4px] text-[#174A4D] max-md:text-[32px] max-md:leading-10">
              Bubble Wrap Stomp Counting
            </h1>
            <div className="mt-6 flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <Chip>2–5 yr</Chip>
                <Chip>Coordination</Chip>
                <span className="flex items-center gap-1.5 rounded-full bg-[#F0F4F3] px-2.5 py-0.5 font-manrope text-xs leading-4 text-[#607077]">
                  <Clock3 className="size-2.75" /> 10 min
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSaved((value) => !value)}
                  aria-label={saved ? 'Remove from saved activities' : 'Save activity'}
                  className="flex size-10 items-center justify-center rounded-full border-2 border-[#D8DDD9] bg-white text-[#2F7D7E]"
                >
                  <Bookmark className={saved ? 'size-5 fill-[#2F7D7E]' : 'size-5'} />
                </button>
                <button
                  type="button"
                  onClick={() => setCompleted((value) => !value)}
                  className={`flex items-center gap-2 rounded-full border-2 px-4.5 py-2.5 font-manrope text-sm font-semibold leading-5 ${completed ? 'border-[#2F7D7E] bg-[#2F7D7E] text-white' : 'border-[#2F7D7E] bg-white text-[#2F7D7E]'}`}
                >
                  <Check className="size-3.75" />
                  {completed ? 'Completed' : 'Mark Completed'}
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <p className="w-full max-w-180 font-nunito text-lg font-medium leading-6 tracking-[-0.27px]">
              Tape bubble wrap to the floor and let children stomp, jump, and count the pops.
              It&apos;s loud, it&apos;s joyful, and it&apos;s surprisingly therapeutic.
            </p>
            <div className="rounded-2xl bg-[#DCEEEE] p-5">
              <h2 className="font-nunito text-base font-bold leading-6 text-[#174A4D]">
                Why It Matters
              </h2>
              <p className="pt-2 font-nunito text-sm font-medium leading-5 tracking-[-0.084px] text-[#174A4D]">
                Stomping on bubble wrap provides heavy proprioceptive input to joints and muscles —
                the kind of deep pressure input that many children need to feel calm and organized.
                The counting layer adds a language and attention bonus.
              </p>
            </div>
          </div>
        </section>

        <section className="flex max-w-180 flex-col gap-6">
          <div>
            <h2 className="font-nunito text-xl font-bold leading-7">Materials Needed</h2>
            <ul className="mt-3 flex flex-col gap-2 font-manrope text-sm leading-5">
              {['Large sheet of bubble wrap', "Painter's tape"].map((material) => (
                <li key={material} className="flex items-start gap-2.5">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#8FB9A8]" />
                  {material}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <h2 className="font-nunito text-xl font-bold leading-7">Setup</h2>
              <p className="mt-0.5 font-manrope text-sm leading-[23.8px]">
                Tape bubble wrap securely to a hard floor in a clear open space.
              </p>
            </div>
            <div>
              <h2 className="font-nunito text-xl font-bold leading-7">Step-by-Step</h2>
              <ol className="mt-4 flex flex-col gap-4">
                {steps.map((step, index) => (
                  <li key={step} className="flex items-start gap-4">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#2F7D7E] font-manrope text-sm font-bold leading-5 text-white">
                      {index + 1}
                    </span>
                    <span className="pt-0.5 font-nunito text-sm font-medium leading-5 tracking-[-0.084px]">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <h2 className="font-nunito text-xl font-bold leading-7">Modifications</h2>
            <div className="grid max-w-180.5 grid-cols-2 gap-4 max-md:grid-cols-1">
              <div className="rounded-[14px] bg-[#F6E6D4] p-4">
                <h3 className="font-nunito text-sm font-bold leading-5">Easier Version</h3>
                <p className="pt-2 font-manrope text-sm leading-5.5 tracking-[-0.084px]">
                  Hold both hands and stomp together. Allow sitting and pressing with hands instead.
                </p>
              </div>
              <div className="rounded-[14px] bg-[#F6E6D4] p-4">
                <h3 className="font-nunito text-sm font-bold leading-5">Harder Version</h3>
                <p className="pt-2 font-manrope text-sm leading-5.5 tracking-[-0.084px]">
                  Count in groups of 5. Add a math challenge: “Stomp 3 more — how many is that?”
                </p>
              </div>
            </div>
          </div>

          <blockquote className="rounded-[14px] border-l-4 border-[#F2B59F] bg-[#FFF8F5] py-5 pl-6 pr-5">
            <p className="font-(family-name:--font-lora) text-base italic leading-7">
              “This is a great “alerting” activity for sluggish mornings or pre-homework energy
              regulation. The proprioceptive input typically lasts 30–60 minutes.”
            </p>
            <footer className="pt-3 font-manrope text-xs font-semibold leading-4 text-[#607077]">
              — OT Coaching Tip
            </footer>
          </blockquote>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="font-nunito text-xl font-bold leading-7">Related Activities</h2>
          <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
            {relatedActivities.map((activity) => (
              <Link
                href="/explore/activities/bubble-wrap-stomp-counting"
                key={activity.title}
                className="h-61 overflow-hidden rounded-2xl border border-[#D8DDD9] bg-white shadow-[0px_2px_8px_rgba(38,50,56,0.06)]"
              >
                <div className="relative h-32">
                  <Image
                    src={activity.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(min-width: 1280px) 404px, 50vw"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-nunito text-sm font-bold leading-[19.25px]">
                    {activity.title}
                  </h3>
                  <div className="mt-1.5 flex gap-1">
                    <Chip>{activity.age}</Chip>
                    <Chip>{activity.skill}</Chip>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default ActivityDetail;
