'use client';

import { ArrowRight, Plus, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import { FinalCtaSection } from '@/components/Home/final-cta-section';

const faqGroups = [
  {
    title: 'Membership',
    questions: [
      'What is included in my membership?',
      'How do personalized weekly plans work?',
      'Can I cancel my membership at any time?',
      'Can I add more than one child?',
      'Can each child have different recommendations?',
      "How do I edit a child's profile?",
    ],
  },
  {
    title: 'Billing',
    questions: [
      'Which payment methods are accepted?',
      'How do I update my payment method?',
      'Can I get a refund?',
      'Will my membership renew automatically?',
    ],
  },
  {
    title: 'Account',
    questions: [
      'I forgot my password.',
      'How do I change my email?',
      "Why didn't I receive the verification email?",
    ],
  },
  {
    title: 'Privacy',
    questions: [
      "Is my child's information secure?",
      'Who can see my data?',
      'How is my information used?',
    ],
  },
];

const answers: Record<string, string> = {
  'What is included in my membership?':
    'Your membership includes personalized weekly plans, developmentally supportive activities, trusted parent resources, and toy spotlights.',
  'How do personalized weekly plans work?':
    'Your weekly plan is tailored using your child profile, including age, interests, and developmental goals.',
  'Can I cancel my membership at any time?':
    'Yes. You can manage or cancel your membership at any time from your account settings.',
  'Can I add more than one child?':
    'Yes. Add each child to your account to receive recommendations tailored to them.',
  'Can each child have different recommendations?':
    'Yes. Every child profile has its own personalized recommendations and weekly plan.',
  "How do I edit a child's profile?":
    'You can edit a child profile at any time from your account settings.',
  'Which payment methods are accepted?': 'We accept major credit and debit cards.',
  'How do I update my payment method?':
    'Update your payment method from your account billing settings.',
  'Can I get a refund?': 'Please contact support and we will help with any billing questions.',
  'Will my membership renew automatically?':
    'Memberships renew automatically unless you cancel before renewal.',
  'I forgot my password.':
    'Use the password reset link on the log in page to create a new password.',
  'How do I change my email?': 'You can update your email address from your account settings.',
  "Why didn't I receive the verification email?":
    'Check your spam folder, then contact support if you still need help.',
  "Is my child's information secure?":
    'We take privacy seriously and protect your information with appropriate safeguards.',
  'Who can see my data?':
    'Only you and authorized Bright Horizons services can access your account data.',
  'How is my information used?':
    'Your information is used to personalize your family’s experience and recommendations.',
};

function SupportCard() {
  return (
    <aside className="relative w-[300px] rounded-2xl bg-[#F6E6D4] p-8 text-center shadow-[0_1px_1.5px_rgba(0,0,0,0.1),0_1px_1px_rgba(0,0,0,0.1)]">
      <Image
        src="/Home/figma-home-1183-11826-img-image132-vectorized.svg"
        alt=""
        width={73}
        height={81}
        className="pointer-events-none absolute -left-2 -top-[49px]"
      />
      <p className="font-nunito text-lg font-medium leading-[27px] text-[#263238]">
        Still can&apos;t find your answer?
      </p>
      <Link
        href="/#contact"
        className="mt-4 inline-flex h-10 items-center gap-1 rounded-full border border-[#FCE9E3] bg-[#FFFDF8] px-4 font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-[#263238] shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)]"
      >
        Contact Support
        <ArrowRight className="size-4" strokeWidth={1.5} />
      </Link>
    </aside>
  );
}

export function FaqPage() {
  const [query, setQuery] = useState('');
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const normalizedQuery = query.trim().toLowerCase();
  const visibleGroups = useMemo(
    () =>
      faqGroups
        .map((group) => ({
          ...group,
          questions: group.questions.filter((question) =>
            question.toLowerCase().includes(normalizedQuery)
          ),
        }))
        .filter((group) => group.questions.length > 0),
    [normalizedQuery]
  );

  return (
    <main className="bg-[#FDFDFC] pt-[312px] text-[#263238] max-xl:pt-44 max-lg:pt-36">
      <section className="mx-auto flex max-w-[1920px] items-stretch justify-between gap-16 px-20 pb-40 max-xl:px-8 max-lg:flex-col max-lg:px-5 max-lg:pb-24">
        <div className="flex w-[719px] shrink-0 flex-col justify-between max-lg:w-full max-lg:gap-14">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <h1 className="font-nunito text-5xl font-semibold leading-14 tracking-[-0.48px] text-[#263238] max-md:text-[38px] max-md:leading-[46px]">
                Frequently Asked Questions
              </h1>
              <p className="max-w-[551px] font-manrope text-base leading-6 tracking-[-0.176px] text-[#607077]">
                Find answers about memberships, activities, child profiles, weekly plans, payments,
                and using Bright Horizons.
              </p>
            </div>
            <label className="flex h-[54px] w-full items-center gap-[7px] rounded-2xl border border-[#D2E3DC] bg-[#F9FAFA] px-5 py-4">
              <Search className="size-6 shrink-0 text-[#607077]" strokeWidth={1.5} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search questions..."
                className="w-full bg-transparent font-nunito text-sm text-[#263238] outline-none placeholder:text-[#A8ADAF]"
              />
            </label>
          </div>
          <SupportCard />
        </div>

        <div className="flex w-[868px] flex-col gap-12 max-lg:w-full max-lg:gap-10">
          {visibleGroups.map((group) => (
            <section key={group.title} className="flex flex-col gap-4">
              <h2 className="font-nunito text-lg font-medium uppercase leading-6 tracking-[-0.27px] text-[#7D8488]">
                {group.title}
              </h2>
              {group.questions.map((question) => {
                const isOpen = openQuestion === question;
                return (
                  <article
                    key={question}
                    className={`rounded-[15px] border bg-white ${isOpen ? 'border-[#B7D2C4] shadow-[0_2px_8px_rgba(198,202,209,0.18)]' : 'border-[#D2E3DC]'}`}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenQuestion(isOpen ? null : question)}
                      className="flex min-h-[69px] w-full items-center justify-between gap-6 p-5 text-left font-nunito text-lg font-medium leading-6 tracking-[-0.27px] text-[#263238]"
                    >
                      <span>{question}</span>
                      <Plus
                        className={`size-6 shrink-0 text-[#2F7D7E] transition-transform ${isOpen ? 'rotate-45' : ''}`}
                        strokeWidth={1.5}
                      />
                    </button>
                    {isOpen && (
                      <p className="px-5 pb-5 font-manrope text-base leading-6 text-[#607077]">
                        {answers[question]}
                      </p>
                    )}
                  </article>
                );
              })}
            </section>
          ))}
          {!visibleGroups.length && (
            <p className="rounded-[15px] border border-dashed border-[#D2E3DC] px-5 py-10 text-center font-manrope text-base text-[#607077]">
              No questions match your search.
            </p>
          )}
        </div>
      </section>
      <FinalCtaSection />
    </main>
  );
}

export default FaqPage;
