'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const faqAssets = {
  arrow: '/Home/figma-home-1183-11826-img-vector.svg',
  flower: '/About/figma-about-739-34278-flower.svg',
  minus: '/Home/figma-home-1183-11826-img-vector1.svg',
  plus: '/Home/figma-home-1183-11826-img-vector2.svg',
} as const;

const aboutFaqs = [
  {
    question: 'What age range do the activities cover?',
    answer:
      "Plans are designed for children aged 0–8 years. During onboarding, you share your child's age and developmental stage, and every activity in your weekly plan is matched to where they are right now — not a generic age bucket.",
  },
  {
    question: 'Do I need any special equipment or supplies?',
    answer:
      'No. Most activities use simple household materials, and every plan includes a clear supply list so you can prepare with confidence.',
  },
  {
    question: 'How is this different from Pinterest or free OT printables?',
    answer:
      'Pinterest and free printables offer individual ideas. Bright Horizons turns expert-selected activities into a personalized, stage-appropriate weekly plan.',
  },
  {
    question: 'What if my child has a diagnosis or already sees a therapist?',
    answer:
      'Bright Horizons can complement professional support, but it does not diagnose, treat, or replace advice from your child’s qualified healthcare or therapy team.',
  },
  {
    question: 'Can I cancel or pause my membership?',
    answer:
      'Yes. You can pause or cancel your membership from your account settings before the next renewal.',
  },
] as const;

function FaqToggle({ open }: { open: boolean }) {
  return (
    <span aria-hidden="true" className="relative size-6 shrink-0">
      <Image
        src={open ? faqAssets.minus : faqAssets.plus}
        alt=""
        width={18}
        height={open ? 1.5 : 18}
        className={
          open
            ? 'absolute left-[3px] top-[11.25px] h-[1.5px] w-[18px]'
            : 'absolute left-[3px] top-[3px] size-[18px]'
        }
      />
    </span>
  );
}

function AboutFaqList() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="flex w-full flex-col gap-4 min-[1600px]:h-[462px] min-[1600px]:w-[868px]">
      {aboutFaqs.map((faq, index) => {
        const open = openIndex === index;
        const answerId = `about-faq-answer-${index}`;

        return (
          <article
            key={faq.question}
            className={
              open
                ? 'flex flex-col gap-2.5 rounded-[15px] border border-[#E9F1EE] bg-white p-5 shadow-[0_2px_2px_rgba(198,202,209,0.10),0_2px_8px_rgba(198,202,209,0.22)] min-[1600px]:h-[122px]'
                : 'flex min-h-[69px] items-center rounded-[15px] border border-[#D2E3DC] bg-white p-5 min-[1600px]:h-[69px]'
            }
          >
            <button
              type="button"
              aria-expanded={open}
              aria-controls={answerId}
              onClick={() => setOpenIndex(open ? -1 : index)}
              className="flex w-full items-center justify-between gap-5 text-left font-nunito text-lg font-medium leading-6 tracking-[-0.27px] text-[#263238] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2F7D7E]"
            >
              <span>{faq.question}</span>
              <FaqToggle open={open} />
            </button>
            {open && (
              <p
                id={answerId}
                className="font-manrope text-base leading-6 tracking-[-0.176px] text-[#7D8488]"
              >
                {faq.answer}
              </p>
            )}
          </article>
        );
      })}
    </div>
  );
}

function ContactCard() {
  return (
    <aside className="relative flex h-[152px] w-[273px] flex-col items-center gap-4 rounded-2xl bg-[#F6E6D4] p-8 text-center shadow-[0_1px_1.5px_rgba(0,0,0,0.1),0_1px_1px_rgba(0,0,0,0.1)]">
      <Image
        src={faqAssets.flower}
        alt=""
        width={73}
        height={81}
        aria-hidden="true"
        className="pointer-events-none absolute -left-2 -top-[49px]"
      />
      <p className="whitespace-nowrap font-nunito text-lg leading-[27px] text-[#263238]">
        Have more questions?
      </p>
      <Link
        href="/contact"
        className="inline-flex h-10 min-w-20 items-center justify-center gap-1 rounded-full border border-[#FCE9E3] bg-[#FFFDF8] px-3 font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-[#263238] shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)]"
      >
        <span className="px-1">Contact us</span>
        <span aria-hidden="true" className="relative size-4 shrink-0 overflow-hidden">
          <Image
            src={faqAssets.arrow}
            alt=""
            width={10.3333}
            height={10.3333}
            className="absolute left-[2.83px] top-[2.83px] size-[10.3333px]"
          />
        </span>
      </Link>
    </aside>
  );
}

export function AboutFaqSection() {
  return (
    <section
      aria-labelledby="about-faq-heading"
      className="bg-[#FDFDFC] px-5 py-16 sm:px-8 sm:py-20 md:px-12 md:py-24 lg:px-16 min-[1600px]:h-[622px] min-[1600px]:px-20 min-[1600px]:py-20"
    >
      <div className="mx-auto grid max-w-[1760px] grid-cols-1 gap-10 sm:gap-12 min-[1600px]:h-[462px] min-[1600px]:grid-cols-[719px_868px] min-[1600px]:grid-rows-[100px_152px] min-[1600px]:content-between min-[1600px]:justify-between min-[1600px]:gap-0">
        <header className="flex flex-col items-start gap-4 min-[1600px]:col-start-1 min-[1600px]:row-start-1">
          <span className="rounded-xl border border-[#D4D6D7] bg-[#FFFDF8] px-2 py-1.5 font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#515B60]">
            FAQ
          </span>
          <h2
            id="about-faq-heading"
            className="font-nunito text-[32px] font-semibold leading-[38px] tracking-[-0.4px] text-[#263238] sm:text-4xl sm:leading-11 min-[1600px]:text-[40px] min-[1600px]:leading-12"
          >
            Things parents always ask us
          </h2>
        </header>

        <div className="min-[1600px]:col-start-2 min-[1600px]:row-span-2 min-[1600px]:row-start-1">
          <AboutFaqList />
        </div>

        <div className="pt-3 min-[1600px]:col-start-1 min-[1600px]:row-start-2 min-[1600px]:pt-0">
          <ContactCard />
        </div>
      </div>
    </section>
  );
}
