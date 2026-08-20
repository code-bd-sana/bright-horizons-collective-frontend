'use client';

// Support feature entry point.
import { ContactSupportModal } from '@/components/dashboard/support/contact-support-modal';
import { ReportIssueModal } from '@/components/dashboard/support/report-issue-modal';
import { SendFeedbackModal } from '@/components/dashboard/support/send-feedback-modal';
import { Bug, HandHeart, Minus, Plus, Search, Send } from 'lucide-react';
import { useMemo, useState } from 'react';

type SupportAction = {
  title: string;
  description: string;
  icon: typeof Send;
  modal: 'contact' | 'feedback' | 'issue';
};

const supportActions: SupportAction[] = [
  {
    title: 'Contact Support',
    description: 'Reach out to our parent assistance team',
    icon: Send,
    modal: 'contact',
  },
  {
    title: 'Send Feedback',
    description: 'Help us build a better platform.',
    icon: HandHeart,
    modal: 'feedback',
  },
  {
    title: 'Report an Issue',
    description: 'Report bugs or technical difficulties',
    icon: Bug,
    modal: 'issue',
  },
];

const questions = [
  {
    question: 'What age range do the activities cover?',
    answer:
      'Plans are designed for children aged 0–8 years. During onboarding, you share your child’s age and developmental stage, and every activity in your weekly plan is matched to where they are right now — not a generic age bucket.',
  },
  {
    question: 'Who creates the activities?',
    answer:
      'Our activities are created with developmental specialists and are designed to make everyday play purposeful, practical, and enjoyable for your family.',
  },
  {
    question: 'Do I need special equipment?',
    answer:
      'No. Most activities use simple household materials, with clear alternatives when a specific item may be helpful.',
  },
  {
    question: 'How long do activities take?',
    answer:
      'Most activities take 10–20 minutes, with flexible suggestions so you can fit them into your family’s day.',
  },
];

export function SupportPage() {
  const [openQuestion, setOpenQuestion] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModal, setActiveModal] = useState<SupportAction['modal'] | null>(null);

  const visibleQuestions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return questions;
    return questions.filter(
      ({ question, answer }) =>
        question.toLowerCase().includes(query) || answer.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <section className="-mt-3 w-full max-w-208 pb-8 text-[#263238]">
      <header className="mb-12">
        <h1 className="font-nunito text-[32px] font-medium leading-10 tracking-[-0.16px]">
          Support
        </h1>
        <p className="mt-1 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#7d8488]">
          Get assistance, find answers, send feedback, or report technical issues.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        {supportActions.map(({ title, description, icon: Icon, modal }) => (
          <button
            key={title}
            type="button"
            onClick={() => setActiveModal(modal)}
            className="flex min-h-32 flex-col rounded-2xl border border-[#e8ebe8] bg-white p-4 text-left transition-shadow hover:shadow-[0_2px_10px_rgba(39,69,67,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f7d7e]"
          >
            <span className="flex size-10 items-center justify-center rounded-lg bg-[#eef3f3] text-[#2f7d7e]">
              <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
            </span>
            <span className="mt-3 font-nunito text-base font-medium leading-6 tracking-[-0.176px]">
              {title}
            </span>
            <span className="mt-1 font-manrope text-xs leading-4.5 text-[#7d8488]">
              {description}
            </span>
          </button>
        ))}
      </div>

      <section
        className="mt-4 rounded-2xl border border-[#e8ebe8] bg-white p-4"
        aria-labelledby="faq-title"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2
            id="faq-title"
            className="font-nunito text-lg font-medium leading-6 tracking-[-0.27px]"
          >
            Frequently Aske Questions
          </h2>
          <label className="flex h-8.5 w-full items-center gap-2 rounded-lg border border-[#cfe0e0] bg-[#f9fbfb] px-4 sm:w-60">
            <Search
              size={16}
              strokeWidth={1.5}
              className="shrink-0 text-[#9aa5a8]"
              aria-hidden="true"
            />
            <span className="sr-only">Search frequently asked questions</span>
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search queries..."
              className="min-w-0 flex-1 bg-transparent font-manrope text-xs leading-4.5 text-[#515b60] outline-none placeholder:text-[#9aa5a8]"
            />
          </label>
        </div>

        <div className="mt-6 flex flex-col gap-4">
          {visibleQuestions.length ? (
            visibleQuestions.map(({ question, answer }) => {
              const questionIndex = questions.findIndex((item) => item.question === question);
              const isOpen = openQuestion === questionIndex;

              return (
                <article
                  key={question}
                  className={`rounded-2xl border border-[#e8ebe8] bg-white ${isOpen ? 'px-5 py-4 shadow-[0_2px_10px_rgba(39,69,67,0.08)]' : 'px-5 py-5'}`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenQuestion(isOpen ? -1 : questionIndex)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f7d7e]"
                  >
                    <span className="font-nunito text-base font-medium leading-6 tracking-[-0.176px]">
                      {question}
                    </span>
                    {isOpen ? (
                      <Minus size={20} strokeWidth={1.4} className="shrink-0 text-[#515b60]" />
                    ) : (
                      <Plus size={20} strokeWidth={1.4} className="shrink-0 text-[#515b60]" />
                    )}
                  </button>
                  {isOpen && (
                    <p className="mt-3 pr-8 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#7d8488]">
                      {answer}
                    </p>
                  )}
                </article>
              );
            })
          ) : (
            <p className="py-6 text-center font-manrope text-sm text-[#7d8488]">
              No questions match your search.
            </p>
          )}
        </div>
      </section>

      <ContactSupportModal
        isOpen={activeModal === 'contact'}
        onClose={(open) => !open && setActiveModal(null)}
      />
      <SendFeedbackModal
        isOpen={activeModal === 'feedback'}
        onClose={(open) => !open && setActiveModal(null)}
      />
      <ReportIssueModal
        isOpen={activeModal === 'issue'}
        onClose={(open) => !open && setActiveModal(null)}
      />
    </section>
  );
}
