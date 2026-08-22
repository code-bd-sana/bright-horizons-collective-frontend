'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Check, Medal } from 'lucide-react';
import { useState } from 'react';

const ACTIVITY_MASK = '/Home/figma-completed-activity-thumbnail-mask.svg';
const ACTIVITY_IMAGE = '/Home/figma-completed-activity-thumbnail.png';
const HERO_IMAGE = '/Home/figma-completed-activity-hero.png';
const STAR_IMAGE = '/Home/figma-completed-activity-star.svg';
const CLOCK_ICON = '/Home/figma-completed-activity-clock.svg';
const DEVELOPMENT_ICON = '/Home/figma-completed-activity-development.svg';
const MATERIALS_ICON = '/Home/figma-completed-activity-materials.svg';
const HERO_TOP_DECORATION = '/Home/figma-completed-activity-hero-top-decoration.svg';
const HERO_GLOW = '/Home/figma-completed-activity-hero-glow.svg';
const HERO_RIGHT_DECORATION = '/Home/figma-completed-activity-hero-right-decoration.svg';
const HERO_LEFT_DECORATION = '/Home/figma-completed-activity-hero-left-decoration.svg';

const difficultyOptions = [
  { label: 'Too Easy', emoji: '😵' },
  { label: 'Easy', emoji: '🙂' },
  { label: 'Just Right', emoji: '✅' },
  { label: 'Challenging', emoji: '💪' },
  { label: 'Too Hard', emoji: '😅' },
];

const reflectionPrompts = [
  'What did Emma enjoy most about this activity?',
  'Did she find any step particularly easy or difficult?',
  'What would you try differently or adjust next time?',
];

function SectionCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-[16px] border border-[#d8ddd9] bg-[#fffdf8] p-5 shadow-[0_1px_3px_rgba(23,74,77,0.06)] sm:p-6 lg:p-8 ${className}`}
    >
      {children}
    </section>
  );
}

function SkillPill({
  label,
  value,
  warm = false,
}: {
  label: string;
  value: string;
  warm?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2 rounded-full border px-3 py-1.5 ${warm ? 'border-[#fce9e3] bg-[#fff4f0]' : 'border-[#d5e5e5] bg-[#f0f9f9]'}`}
    >
      <span
        aria-hidden
        className={`size-[5px] rounded-full ${warm ? 'bg-[#f2b59f]' : 'bg-[#2f7d7e]'}`}
      />
      <span className="font-manrope text-[10px] font-normal leading-[15px] text-[#515b60]">
        {label}
      </span>
      <span
        className={`font-nunito text-[10px] font-medium leading-[15px] ${warm ? 'text-[#e39779]' : 'text-[#2f7d7e]'}`}
      >
        {value}
      </span>
    </div>
  );
}

export function CompletedActivityPage() {
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const [rating, setRating] = useState(0);
  const [reflections, setReflections] = useState(['', '', '']);
  const [notes, setNotes] = useState('');
  const [saved, setSaved] = useState(false);

  const updateReflection = (index: number, value: string) => {
    setReflections((current) =>
      current.map((reflection, itemIndex) => (itemIndex === index ? value : reflection))
    );
  };

  return (
    <div className="mx-auto w-full max-w-[1216px] pb-12 lg:pb-16">
      <section className="relative isolate flex min-h-[290px] items-center justify-center overflow-hidden rounded-[16px] border border-[#d5e5e5] bg-[#fffdf8] p-5 shadow-[0_1px_3px_rgba(23,74,77,0.06)] sm:p-8 lg:h-[409px]">
        <div
          aria-hidden
          className="absolute left-[555px] top-[-308px] hidden h-[486.145px] w-[485.446px] items-center justify-center lg:flex"
        >
          <Image
            src={HERO_TOP_DECORATION}
            alt=""
            width={358}
            height={344}
            className="rotate-[-131.21deg]"
          />
        </div>
        <div
          aria-hidden
          className="absolute left-[-217px] top-[-643px] hidden h-[1564px] w-[2136px] lg:block"
        >
          <Image src={HERO_GLOW} alt="" fill sizes="2136px" className="scale-[1.2]" />
        </div>
        <div
          aria-hidden
          className="absolute left-[978px] top-[137px] hidden h-[311.274px] w-[312.979px] items-center justify-center lg:flex"
        >
          <Image
            src={HERO_RIGHT_DECORATION}
            alt=""
            width={237}
            height={228}
            className="rotate-[-30.88deg]"
          />
        </div>
        <div
          aria-hidden
          className="absolute left-[-180px] top-[156px] hidden h-[475.282px] w-[477.465px] items-center justify-center lg:flex"
        >
          <Image
            src={HERO_LEFT_DECORATION}
            alt=""
            width={358}
            height={344}
            className="rotate-[-33.09deg]"
          />
        </div>
        <div className="relative flex w-full max-w-[442px] flex-col items-center gap-6 text-center">
          <div className="flex w-[138px] flex-col items-center gap-4">
            <div className="relative size-20 overflow-hidden rounded-full bg-[#864949] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)]">
              <Image
                src={HERO_IMAGE}
                alt=""
                fill
                sizes="80px"
                className="scale-[1.1] object-cover"
                priority
              />
            </div>
            <p className="w-full font-manrope text-[12px] font-bold uppercase leading-[18px] tracking-[1.2px] text-[#f2b59f]">
              Activity complete
            </p>
          </div>
          <div className="flex w-full flex-col items-center gap-3">
            <h1 className="w-full max-w-[396px] font-nunito text-[28px] font-medium leading-9 tracking-[-0.16px] text-[#2f7d7e] sm:text-[32px] sm:leading-10">
              Amazing work, Emma! 🌟
            </h1>
            <p className="font-manrope text-[14px] font-normal leading-[22px] tracking-[-0.084px] text-[#7d8488]">
              You just finished{' '}
              <span className="font-semibold text-[#263238]">Animal Yoga Adventure</span> —
              that&apos;s another step forward in your development journey.
            </p>
          </div>
        </div>
      </section>

      <div className="mt-8 flex flex-col gap-6 lg:mt-14">
        <div className="grid gap-6 lg:grid-cols-2">
          <SectionCard className="lg:h-[318px]">
            <h2 className="font-nunito text-[24px] font-medium leading-8 text-[#263238]">
              Activity Summary
            </h2>
            <div className="mt-4 flex items-center gap-4 border-b border-[#d8ddd9] pb-5">
              <div className="relative size-[72px] shrink-0">
                <span
                  className="absolute inset-0 overflow-hidden bg-[#d8e2df]"
                  style={{
                    WebkitMaskImage: `url(${ACTIVITY_MASK})`,
                    maskImage: `url(${ACTIVITY_MASK})`,
                    WebkitMaskPosition: 'center',
                    maskPosition: 'center',
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    WebkitMaskSize: '100% 100%',
                    maskSize: '100% 100%',
                  }}
                >
                  <Image
                    src={ACTIVITY_IMAGE}
                    alt="Animal Yoga Adventure"
                    fill
                    sizes="72px"
                    className="object-cover"
                  />
                </span>
              </div>
              <div className="min-w-0 text-left">
                <div className="mb-2 flex gap-2">
                  <span className="rounded-full bg-[#e9f1ee] px-2 py-0.5 font-nunito text-[10px] font-medium leading-[15px] text-[#607077]">
                    Monday
                  </span>
                  <span className="rounded-full bg-[#e4f6ec] px-2 py-0.5 font-nunito text-[10px] font-medium leading-[15px] text-[#2f7d7e]">
                    Easy
                  </span>
                </div>
                <p className="truncate font-nunito text-[18px] font-medium leading-6 tracking-[-0.27px] text-[#174a4d]">
                  Animal Yoga Adventure
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 font-manrope text-[10px] font-normal leading-[15px] text-[#607077]">
                  <span className="flex items-center gap-1">
                    <Image src={CLOCK_ICON} alt="" width={12} height={12} />
                    20 min
                  </span>
                  <span className="flex items-center gap-1">
                    <Image src={DEVELOPMENT_ICON} alt="" width={12} height={12} />
                    Motor Planning &amp; Balance
                  </span>
                  <span className="flex items-center gap-1">
                    <Image src={MATERIALS_ICON} alt="" width={12} height={12} />
                    Yoga cards &amp; open space
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <div
                className="grid size-[78px] shrink-0 place-items-center rounded-full"
                style={{ background: 'conic-gradient(#20a15e 0deg 151deg, #d9e3df 151deg 360deg)' }}
              >
                <div className="grid size-[62px] place-items-center rounded-full bg-[#fffdf8] font-nunito text-[14px] font-medium leading-5 text-[#263238]">
                  42%
                </div>
              </div>
              <div className="min-w-0 pt-0.5">
                <p className="font-nunito text-[14px] font-medium leading-5 tracking-[-0.084px] text-[#263238]">
                  3 of 7 activities done this week
                </p>
                <p className="mt-1 font-manrope text-[10px] font-normal leading-[15px] text-[#7d8488]">
                  6 activities remaining in Week 3
                </p>
                <div className="mt-2 flex gap-1" aria-label="Three of seven activities completed">
                  {Array.from({ length: 7 }, (_, index) => (
                    <span
                      key={index}
                      className={`h-1 w-6 rounded-full ${index < 3 ? 'bg-[#2f7d7e]' : 'bg-[#e8ebe8]'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard className="lg:h-[318px]">
            <h2 className="font-nunito text-[24px] font-medium leading-8 text-[#263238]">
              Skills Practiced
            </h2>
            <p className="mt-3 font-manrope text-[12px] font-normal leading-[18px] text-[#607077]">
              Completing this activity contributed to these developmental skill areas for Emma.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <SkillPill label="Motor Planning" value="82%" />
              <SkillPill label="Postural Balance" value="75%" />
              <SkillPill label="Body Awareness" value="68%" />
              <SkillPill label="Self-Regulation" value="55%" warm />
            </div>
            <div className="mt-5 flex min-h-[52px] items-center gap-3 rounded-[12px] bg-[#fce9e3] px-3 py-2">
              <div className="grid size-10 shrink-0 place-items-center rounded-full bg-[#f2b59f]">
                <Medal aria-hidden className="size-5 text-white" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-manrope text-[12px] font-normal leading-[18px] text-[#263238]">
                  Motor Planning is Emma&apos;s top developing skill this week
                </p>
                <p className="font-manrope text-[10px] font-normal leading-[15px] text-[#515b60]">
                  Sequencing and executing body movements in the right order
                </p>
              </div>
            </div>
          </SectionCard>
        </div>

        <SectionCard>
          <h2 className="font-nunito text-[24px] font-medium leading-8 text-[#263238]">
            Rate Difficulty
          </h2>
          <p className="mt-2 font-manrope text-[16px] font-normal leading-6 tracking-[-0.176px] text-[#263238]">
            How challenging was this activity for Emma today?
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {difficultyOptions.map((option) => {
              const isSelected = difficulty === option.label;
              return (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => setDifficulty(option.label)}
                  aria-pressed={isSelected}
                  className={`flex items-center gap-1.5 rounded-full border border-[#d5e5e5] bg-white px-4 py-2.5 font-nunito text-[16px] font-medium leading-6 tracking-[-0.176px] text-[#263238] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#2f7d7e] ${isSelected ? 'bg-[#e9f1ee]' : ''}`}
                >
                  <span aria-hidden className="text-[20px] leading-5">
                    {option.emoji}
                  </span>
                  {option.label}
                </button>
              );
            })}
          </div>
        </SectionCard>

        <SectionCard>
          <h2 className="font-nunito text-[24px] font-medium leading-8 text-[#263238]">
            Parent Reflection
          </h2>
          <div className="mt-6 flex flex-col gap-8">
            {reflectionPrompts.map((prompt, index) => (
              <label
                key={prompt}
                className="flex flex-col gap-4 font-manrope text-[16px] font-normal leading-6 tracking-[-0.176px] text-[#263238]"
              >
                {prompt}
                <textarea
                  value={reflections[index]}
                  onChange={(event) => updateReflection(index, event.target.value)}
                  placeholder="Share your observation…"
                  className="h-[150px] w-full resize-y rounded-[24px] border border-[#d8ddd9] bg-white p-4 font-manrope text-[14px] font-normal leading-[22px] tracking-[-0.084px] text-[#263238] shadow-[0_1px_2px_rgba(16,24,40,0.05)] outline-none placeholder:text-[#7d8488] focus:border-[#2f7d7e] focus:ring-2 focus:ring-[#d5e5e5]"
                />
              </label>
            ))}
          </div>
        </SectionCard>

        <SectionCard>
          <h2 className="font-nunito text-[24px] font-medium leading-8 text-[#263238]">
            Overall Rating &amp; Notes
          </h2>
          <fieldset className="mt-6">
            <legend className="font-manrope text-[16px] font-normal leading-6 tracking-[-0.176px] text-[#263238]">
              Rate this activity overall
            </legend>
            <div className="mt-4 flex gap-2" aria-label="Overall rating">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  aria-label={`${value} star${value === 1 ? '' : 's'}`}
                  aria-pressed={rating === value}
                  className="relative size-[30px] rounded p-0.5 outline-none focus-visible:ring-2 focus-visible:ring-[#2f7d7e]"
                >
                  <Image src={STAR_IMAGE} alt="" fill sizes="26px" />
                </button>
              ))}
            </div>
          </fieldset>
          <label className="mt-8 flex flex-col gap-4 font-manrope text-[16px] font-normal leading-6 tracking-[-0.176px] text-[#263238]">
            Add Notes (optional)
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Any other observations, modifications you made, or ideas for next time…"
              className="h-[150px] w-full resize-y rounded-[24px] border border-[#d8ddd9] bg-white p-4 font-manrope text-[14px] font-normal leading-[22px] tracking-[-0.084px] text-[#263238] shadow-[0_1px_2px_rgba(16,24,40,0.05)] outline-none placeholder:text-[#7d8488] focus:border-[#2f7d7e] focus:ring-2 focus:ring-[#d5e5e5]"
            />
          </label>
        </SectionCard>

        <div className="flex flex-col gap-6 pt-2">
          <button
            type="button"
            onClick={() => setSaved(true)}
            className="flex min-h-10 w-full items-center justify-center gap-1 rounded-full bg-[#2f7d7e] px-3 py-2 font-nunito text-[16px] font-medium leading-6 tracking-[-0.176px] text-white shadow-[inset_0_-6px_2px_rgba(255,255,255,0.07)] outline-none focus-visible:ring-2 focus-visible:ring-[#174a4d]"
          >
            {saved ? <Check aria-hidden className="size-4" /> : null}
            {saved ? 'Reflection Saved' : 'Save Reflection & Continue'}
          </button>
          <Link
            href="/dashboard/weekly-plans"
            className="flex min-h-10 w-full items-center justify-center gap-1 rounded-full border border-[#d8ddd9] bg-[#fffdf8] px-3 py-2 font-nunito text-[16px] font-medium leading-6 tracking-[-0.176px] text-[#2f7d7e] outline-none focus-visible:ring-2 focus-visible:ring-[#2f7d7e]"
          >
            <ArrowLeft aria-hidden className="size-4" />
            Return to Weekly Plan
          </Link>
        </div>
      </div>
    </div>
  );
}
