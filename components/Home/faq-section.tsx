'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const faqs = [
  {
    question: 'What age range do the activities cover?',
    answer:
      "Plans are designed for children aged 0–8 years. During onboarding, you share your child's age and developmental stage, and every activity in your weekly plan is matched to where they are right now — not a generic age bucket.",
  },
  {
    question: 'How is Bright Horizons Collective different from other activity websites?',
    answer:
      "Every activity is selected to support your child's development, with the guidance and flexibility to make meaningful play part of everyday life.",
  },
  {
    question: 'Do I need special materials or equipment?',
    answer:
      'No. Activities use simple, everyday items and include clear material guidance so you can prepare with confidence.',
  },
  {
    question: 'Can I use Bright Horizons Collective with more than one child?',
    answer:
      'Yes. Add each child to your account and receive recommendations that reflect their individual age and developmental stage.',
  },
  {
    question: 'What happens after I join?',
    answer:
      "You'll complete a short onboarding flow, then receive a personalized weekly plan with activities and resources ready to explore.",
  },
];

function FaqToggle({ open }: { open: boolean }) {
  return (
    <Image
      src={
        open
          ? '/Home/figma-home-1183-11826-img-vector1.svg'
          : '/Home/figma-home-1183-11826-img-vector2.svg'
      }
      alt=""
      width={16}
      height={16}
      aria-hidden="true"
      className="shrink-0"
    />
  );
}

function FaqList({ compact = false }: { compact?: boolean }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className={compact ? 'flex flex-col gap-3' : 'flex h-[462px] flex-col gap-4'}>
      {faqs.map((faq, index) => {
        const open = openIndex === index;

        return (
          <article
            key={faq.question}
            className={
              open
                ? `rounded-[15px] border border-[#E9F1EE] bg-white p-5 shadow-[0_2px_2px_rgba(198,202,209,0.10),0_2px_8px_rgba(198,202,209,0.22)] ${
                    index === 0 && !compact ? 'h-[122px]' : ''
                  }`
                : `${compact ? '' : 'h-[69px] '}rounded-[15px] border border-[#D2E3DC] bg-white p-5`
            }
          >
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setOpenIndex(open ? -1 : index)}
              className="flex w-full items-center justify-between gap-5 text-left font-nunito text-[18px] font-medium leading-6 text-[#263238]"
            >
              <span>{faq.question}</span>
              <FaqToggle open={open} />
            </button>
            {open && (
              <p className="mt-2.5 font-manrope text-base leading-6 text-[#7D8488]">{faq.answer}</p>
            )}
          </article>
        );
      })}
    </div>
  );
}

function DesktopFaq() {
  return (
    <section id="faq" className="hidden h-[782px] bg-[#FDFDFC] px-20 py-40 min-[1600px]:block">
      <div className="mx-auto flex h-[462px] max-w-[1760px] justify-between">
        <div className="flex h-[462px] w-[719px] flex-col gap-[210px]">
          <div>
            <h2 className="font-nunito text-[40px] font-semibold leading-12 tracking-[-0.4px] text-[#263238]">
              Frequently asked questions
            </h2>
            <p className="mt-4 max-w-[655px] font-manrope text-base leading-6 text-[#607077]">
              Everything you need to know about Bright Horizons Collective and how we support your
              family&apos;s journey.
            </p>
          </div>

          <div className="relative h-[140px] w-[273px] overflow-hidden rounded-2xl bg-[#F6E6D4] text-center">
            <Image
              src="/Home/figma-home-1183-11826-img-image132-vectorized.svg"
              alt=""
              width={73}
              height={81}
              aria-hidden="true"
              className="pointer-events-none absolute -left-2 -top-[49px]"
            />
            <p className="absolute left-0 top-[22px] w-full font-nunito text-[18px] font-semibold leading-[27px] text-[#614840]">
              Still have questions?
            </p>
            <Link
              href="/contact"
              className="absolute left-[58px] top-[75px] inline-flex h-10 items-center gap-2 rounded-full bg-white px-5 font-nunito text-sm font-medium leading-5 text-[#263238]"
            >
              Get in touch
              <Image
                src="/Home/figma-home-1183-11826-img-vector.svg"
                alt=""
                width={16}
                height={16}
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
        <div className="w-[868px]">
          <FaqList />
        </div>
      </div>
    </section>
  );
}

function CompactFaq() {
  return (
    <section id="faq" className="bg-[#FDFDFC] px-5 py-20 min-[1600px]:hidden sm:px-8 sm:py-28">
      <div className="mx-auto max-w-[868px]">
        <h2 className="font-nunito text-[clamp(32px,5vw,40px)] font-semibold leading-tight tracking-[-0.4px] text-[#263238]">
          Frequently asked questions
        </h2>
        <p className="mt-4 max-w-[655px] font-manrope text-base leading-6 text-[#607077]">
          Everything you need to know about Bright Horizons Collective and how we support your
          family&apos;s journey.
        </p>
        <div className="mt-10">
          <FaqList compact />
        </div>
        <div className="relative mt-10 h-[140px] w-[273px] overflow-hidden rounded-2xl bg-[#F6E6D4] text-center">
          <Image
            src="/Home/figma-home-1183-11826-img-image132-vectorized.svg"
            alt=""
            width={73}
            height={81}
            aria-hidden="true"
            className="pointer-events-none absolute -left-2 -top-[49px]"
          />
          <p className="absolute left-0 top-[22px] w-full font-nunito text-[18px] font-semibold leading-[27px] text-[#614840]">
            Still have questions?
          </p>
          <Link
            href="/contact"
            className="absolute left-[58px] top-[75px] inline-flex h-10 items-center gap-2 rounded-full bg-white px-5 font-nunito text-sm font-medium leading-5 text-[#263238]"
          >
            Get in touch
            <Image
              src="/Home/figma-home-1183-11826-img-vector.svg"
              alt=""
              width={16}
              height={16}
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <>
      <DesktopFaq />
      <CompactFaq />
    </>
  );
}
