'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const FAQ_ASSETS = {
  arrow: '/Home/figma-home-1183-11826-img-vector.svg',
  flower: '/About/figma-about-739-34278-flower.svg',
  minus: '/Home/figma-home-1183-11826-img-vector1.svg',
  plus: '/Home/figma-home-1183-11826-img-vector2.svg',
} as const;

const membershipFaqs = [
  {
    question: 'Can I cancel anytime?',
    answer:
      'Yes, you can cancel your membership at any time without any penalties. We believe in flexibility, allowing you to make the best choices for your family as your needs change. Simply navigate to your account settings to initiate the cancellation process.',
  },
  {
    question: 'Can I have multiple children?',
    answer:
      'Yes. You can add multiple child profiles so each child receives activities and guidance appropriate for their age and developmental needs.',
  },
  {
    question: 'What ages is this for?',
    answer:
      'Bright Horizons Collective supports families with children from infancy through early childhood, with plans tailored to each child profile.',
  },
  {
    question: 'Are activities created by therapists?',
    answer:
      'Activities are developed with developmental expertise and designed to be practical, engaging, and easy to complete at home.',
  },
  {
    question: 'How are weekly plans assigned?',
    answer:
      'Weekly plans are selected using your child profile and membership level, then refreshed to give your family a clear, useful rhythm each week.',
  },
  {
    question: "What's included in each membership?",
    answer:
      'Each plan includes a different level of access to the resource library, activities, weekly plans, and personalized support.',
  },
] as const;

function FaqIcon({ open }: { open: boolean }) {
  return (
    <span aria-hidden="true" className="relative size-6 shrink-0">
      <Image
        src={open ? FAQ_ASSETS.minus : FAQ_ASSETS.plus}
        alt=""
        width={18}
        height={open ? 2 : 18}
        className={
          open
            ? 'absolute top-[11px] left-[3px] h-0.5 w-[18px]'
            : 'absolute top-[3px] left-[3px] size-[18px]'
        }
      />
    </span>
  );
}

function MembershipFaqList() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="flex w-full flex-col gap-4">
      {membershipFaqs.map((faq, index) => {
        const open = openIndex === index;
        const answerId = `membership-faq-answer-${index}`;

        return (
          <article
            key={faq.question}
            className={
              open
                ? 'flex flex-col gap-2.5 rounded-[15px] border border-[#E9F1EE] bg-white p-5 shadow-[0_2px_2px_rgba(198,202,209,0.10),0_2px_8px_rgba(198,202,209,0.22)]'
                : 'flex h-[69px] items-center rounded-[15px] border border-[#D2E3DC] bg-white p-5'
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
              <FaqIcon open={open} />
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
    <aside className="relative flex h-[152px] w-[273px] flex-col items-center gap-4 rounded-[16px] bg-[#F6E6D4] p-8 text-center shadow-[0_1px_1.5px_rgba(0,0,0,0.10),0_1px_1px_rgba(0,0,0,0.10)]">
      <Image
        src={FAQ_ASSETS.flower}
        alt=""
        width={73}
        height={81}
        aria-hidden="true"
        className="pointer-events-none absolute -top-[49px] -left-2"
      />
      <p className="font-nunito text-lg font-medium leading-[27px] text-[#263238]">
        Have more questions?
      </p>
      <Link
        href="/contact"
        className="inline-flex min-w-20 items-center justify-center gap-1 rounded-full border border-[#FCE9E3] bg-[#FFFDF8] px-3 py-2 font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-[#263238] shadow-[0_1px_3px_rgba(0,0,0,0.10),0_1px_2px_-1px_rgba(0,0,0,0.10)]"
      >
        <span className="px-1">Contact Us</span>
        <span aria-hidden="true" className="relative size-4 shrink-0 overflow-hidden">
          <Image
            src={FAQ_ASSETS.arrow}
            alt=""
            width={10.33}
            height={10.33}
            className="absolute top-[2.83px] left-[2.83px] size-[10.33px]"
          />
        </span>
      </Link>
    </aside>
  );
}

export function MembershipFaqSection() {
  return (
    <section
      aria-labelledby="membership-faq-heading"
      className="bg-[#FCE9E3] px-5 py-20 sm:px-8 md:py-40 min-[1600px]:px-40"
    >
      <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-12 min-[1600px]:grid-cols-[571px_719px] min-[1600px]:justify-between">
        <div className="flex min-[1600px]:min-h-full min-[1600px]:flex-col min-[1600px]:justify-between">
          <header className="flex flex-col gap-4">
            <h2
              id="membership-faq-heading"
              className="font-nunito text-[32px] font-semibold leading-10 tracking-[-0.4px] text-[#263238] min-[1600px]:text-[40px] min-[1600px]:leading-12"
            >
              Frequently Asked Questions
            </h2>
            <p className="font-manrope text-base leading-6 tracking-[-0.176px] text-[#607077]">
              Have questions? Find answers about memberships, weekly plans, activities, and how
              Bright Horizons Collective works.
            </p>
          </header>
          <div className="mt-20 min-[1600px]:mt-0">
            <ContactCard />
          </div>
        </div>

        <MembershipFaqList />
      </div>
    </section>
  );
}
