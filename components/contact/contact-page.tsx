'use client';

import { ArrowRight, ChevronDown, FileUp } from 'lucide-react';
import Image from 'next/image';
import { FormEvent, useState } from 'react';

import { MessageSentModal } from '@/components/contact/message-sent-modal';

const contactCards = [
  {
    title: 'Email Support',
    description: 'General inquiries, technical assistance, and account support.',
    detail: 'Responds in ~24 hours',
    image: '/Home/figma-contact-card-email.png',
    overlay: '/Home/figma-contact-card-email-overlay.svg',
    imageClass: 'left-[-23px] top-[-100px] h-[456px] w-[350px]',
    imageInnerClass: 'left-[-6.27%] top-[-22.45%] h-[122.45%] w-[106.27%] max-w-none',
    overlayClass: 'left-[-1px] top-[148px] h-[208px] w-[273px]',
  },
  {
    title: 'Membership',
    description: 'Questions about Premium access, billing, and subscription.',
    detail: 'Responds in ~12 hours',
    image: '/Home/figma-contact-card-chat.png',
    overlay: '/Home/figma-contact-card-membership-overlay.svg',
    imageClass: 'left-[98px] top-[-18px] h-[324px] w-[213px]',
    imageInnerClass: 'left-[-11.79%] top-0 h-full w-[121.66%] max-w-none',
    overlayClass: 'left-[-1px] top-[119px] h-[237px] w-[273px]',
  },
  {
    title: 'Consultation',
    description: 'Book specialized time with our pediatric occupational therapists.',
    detail: 'Schedule Anytime',
    image: '/Home/figma-contact-card-consultation.png',
    overlay: '/Home/figma-contact-card-chat-overlay.svg',
    imageClass: 'left-[42px] top-[-71px] h-[354px] w-[284px]',
    imageInnerClass: 'inset-0',
    overlayClass: 'left-[-1px] top-[119px] h-[237px] w-[273px]',
  },
  {
    title: 'FAQ',
    description: 'Quick answers to common questions.',
    detail: 'Instant Answers',
    image: '/Home/figma-contact-card-faq.png',
    overlay: '/Home/figma-contact-card-faq-overlay.svg',
    imageClass: 'left-[74px] top-[-56px] h-[336px] w-[240px]',
    imageInnerClass: 'inset-0',
    overlayClass: 'left-[-1px] top-[119px] h-[237px] w-[273px]',
  },
];

function ContactCard({ card }: { card: (typeof contactCards)[number] }) {
  return (
    <article className="relative h-89.25 w-68.25 shrink-0 overflow-hidden rounded-2xl border border-[#E8EBE8] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] max-lg:w-full">
      <div className={`pointer-events-none absolute ${card.imageClass}`}>
        <Image
          src={card.image}
          alt=""
          fill
          sizes="350px"
          className={`object-cover ${card.imageInnerClass}`}
        />
      </div>
      {card.overlay && (
        <div className={`pointer-events-none absolute ${card.overlayClass}`}>
          <Image src={card.overlay} alt="" fill sizes="273px" />
        </div>
      )}
      <div className="absolute left-4.75 top-53 z-10 flex w-56.5 flex-col gap-5 max-lg:right-4.75 max-lg:w-auto">
        <div className="flex flex-col gap-3">
          <h2 className="font-nunito text-xl font-medium leading-7 text-[#263238]">{card.title}</h2>
          <p className="font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#515B60]">
            {card.description}
          </p>
        </div>
        <p className="font-nunito text-sm font-medium leading-5 tracking-[-0.084px] text-[#2F7D7E]">
          {card.detail}
        </p>
      </div>
    </article>
  );
}

function Field({
  label,
  required,
  placeholder,
  type = 'text',
}: {
  label: string;
  required?: boolean;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="flex w-full flex-col gap-2">
      <span className="font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-[#263238]">
        {label}
        {required && <span className="text-[#B24B4B]"> *</span>}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        className="h-10.5 rounded-md border border-[#E2E8F0] bg-white px-3 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#263238] outline-none placeholder:text-[#A8ADAF] focus:border-[#2F7D7E]"
      />
    </label>
  );
}

export function ContactPage() {
  const [isMessageSent, setMessageSent] = useState(false);
  const [isReasonMenuOpen, setReasonMenuOpen] = useState(false);
  const [contactReason, setContactReason] = useState('');
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessageSent(true);
  };
  const contactReasons = [
    'General Question',
    'Membership',
    'Weekly Plan',
    'Activities',
    'Billing',
    'Technical Support',
    'Development Question',
    'Other',
  ];

  return (
    <main className="overflow-hidden bg-[#FFFDF8] text-[#263238]">
      <section className="relative h-215.25 bg-[#FDFDFC] max-lg:h-auto max-lg:pb-16">
        <div className="relative z-10 mx-auto flex w-full max-w-167.75 flex-col items-center px-5 pt-48 text-center max-lg:pt-36">
          <h1 className="font-nunito text-[56px] font-semibold leading-16 tracking-[-0.56px] text-[#F2B59F] max-md:text-[44px] max-md:leading-13">
            Contact Us
          </h1>
          <p className="mt-4 max-w-140.25 font-manrope text-base leading-6 tracking-[-0.176px] text-[#607077]">
            Whether you have a question about your child&apos;s milestones, need technical support,
            or want to explore our premium features, our dedicated team of experts is ready to
            assist you on your parenting journey.
          </p>
        </div>
        <div className="pointer-events-none absolute left-[calc(50%-1065px)] top-67.5 flex h-123.5 w-[2140px] items-center justify-center max-lg:hidden">
          <Image
            src="/Home/figma-contact-wave.png"
            alt=""
            width={2140}
            height={495}
            className="max-w-none scale-x-100"
            priority
          />
        </div>
        <div className="pointer-events-none absolute left-[calc(50%+510px)] top-74 flex h-31.25 w-25 items-center justify-center max-lg:hidden">
          <div className="relative h-42.5 w-20 rotate-[13.25deg] overflow-hidden">
            <Image
              src="/Home/figma-contact-hero-decoration.png"
              alt=""
              fill
              sizes="81px"
              className="left-[-28.86%] top-[-52.17%] h-[206.24%] w-[127.59%]! max-w-none"
              priority
            />
          </div>
        </div>
        <div className="absolute left-1/2 top-126 z-10 flex w-291 -translate-x-1/2 gap-6 max-xl:w-[calc(100%-64px)] max-lg:relative max-lg:left-auto max-lg:top-auto max-lg:mx-auto max-lg:mt-16 max-lg:grid max-lg:w-auto max-lg:translate-x-0 max-lg:grid-cols-2 max-lg:px-5 max-md:grid-cols-1">
          {contactCards.map((card) => (
            <ContactCard key={card.title} card={card} />
          ))}
        </div>
      </section>

      <section className="relative min-h-360.5 bg-[#FFFDF8] py-40 max-lg:min-h-0 max-lg:py-20">
        <form
          onSubmit={handleSubmit}
          className="relative z-10 ml-[calc(50%-731px)] flex w-179.75 flex-col rounded-3xl border border-[#E8EBE8] bg-white p-20 shadow-[0_1px_1px_rgba(0,0,0,0.05)] max-xl:ml-[12%] max-lg:mx-auto max-lg:w-[min(90%,719px)] max-lg:p-8 max-md:w-[calc(100%-40px)] max-md:p-5"
        >
          <div className="flex flex-col gap-18">
            <div className="flex flex-col gap-9">
              <h2 className="font-nunito text-[32px] font-medium leading-10 tracking-[-0.16px] text-[#174A4D]">
                Send Us Message
              </h2>
              <div className="flex w-105.5 max-w-full flex-col gap-6">
                <Field label="Full Name" placeholder="Sarah J." />
                <Field label="Email" required type="email" placeholder="sarahj@mail.com" />
                <div className="relative flex w-full flex-col gap-1.5">
                  <span className="font-nunito text-base font-medium leading-6 tracking-[-0.176px]">
                    Contact Reason
                  </span>
                  <button
                    type="button"
                    aria-expanded={isReasonMenuOpen}
                    onClick={() => setReasonMenuOpen((isOpen) => !isOpen)}
                    className="flex h-10.5 w-full items-center justify-between rounded-md border border-[#E2E8F0] px-3.5 text-left font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#515B60]"
                  >
                    <span>{contactReason || 'Select a topic...'}</span>
                    <ChevronDown
                      className={`size-5 text-[#607077] transition-transform ${isReasonMenuOpen ? 'rotate-180' : ''}`}
                      strokeWidth={1.5}
                    />
                  </button>
                  {isReasonMenuOpen && (
                    <div className="absolute left-0 top-18 z-30 w-full overflow-hidden rounded-md border border-[#E2E8F0] bg-white shadow-[0_2px_4px_-2px_rgba(0,0,0,0.1),0_4px_6px_-1px_rgba(0,0,0,0.1)]">
                      <div className="bg-[#E9F1EE] p-1">
                        <p className="px-2 py-1.5 font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-[#263238]">
                          Contact Reason
                        </p>
                      </div>
                      <div className="border-t border-[#E2E8F0] p-1">
                        {contactReasons.map((reason) => (
                          <button
                            key={reason}
                            type="button"
                            onClick={() => {
                              setContactReason(reason);
                              setReasonMenuOpen(false);
                            }}
                            className={`flex w-full items-center rounded px-2 py-1.5 text-left font-nunito text-sm font-medium leading-5 tracking-[-0.084px] text-[#515B60] hover:bg-[#FCE9E3] ${reason === 'Membership' ? 'bg-[#FCE9E3]' : ''}`}
                          >
                            {reason}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <Field label="Subject" placeholder="One line of your inquiry" />
                <label className="flex w-full flex-col gap-1.5">
                  <span className="font-manrope text-base leading-6 tracking-[-0.176px]">
                    Message <span className="text-[#B24B4B]">*</span>
                  </span>
                  <textarea
                    placeholder="Please provide as much detail as possible..."
                    className="h-37.5 resize-none rounded-md border border-[#E2E8F0] p-4 font-manrope text-sm leading-5.5 tracking-[-0.084px] outline-none placeholder:text-[#A8ADAF] focus:border-[#2F7D7E]"
                  />
                </label>
                <label className="flex w-full flex-col gap-1.5">
                  <span className="font-manrope text-base leading-6 tracking-[-0.176px]">
                    Attachments (Optional)
                  </span>
                  <span className="flex h-37.5 cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed border-[#E2E8F0] p-4">
                    <span className="flex w-7 items-center justify-center rounded-md bg-[#F1F5F9] p-1.5">
                      <FileUp className="size-4 text-[#607077]" strokeWidth={1.5} />
                    </span>
                    <span className="font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#515B60]">
                      Drag &amp; drop files or click to browse
                    </span>
                    <span className="font-manrope text-xs font-medium leading-4.5 tracking-[0.48px] text-[#A8ADAF]">
                      Max file size: 10MB
                    </span>
                    <input type="file" className="sr-only" />
                  </span>
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="relative inline-flex h-10 w-fit items-center gap-1 overflow-hidden rounded-full border border-[#ACCBCB] bg-linear-to-b from-[#2F7D7E]/60 to-[#2F7D7E] px-4 font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-[#F8FAFC] shadow-[inset_0_-6px_2px_rgba(255,255,255,0.07)]"
            >
              Send Message <ArrowRight className="size-4" strokeWidth={1.5} />
            </button>
          </div>
        </form>

        <Image
          src="/Home/contact-image.svg"
          alt=""
          width={570}
          height={658}
          className="pointer-events-none absolute left-[calc(50%+161px)] top-60 h-164.5 w-142.5 object-contain max-xl:hidden"
          priority
        />
      </section>
      <MessageSentModal isOpen={isMessageSent} onClose={setMessageSent} />
    </main>
  );
}

export default ContactPage;
