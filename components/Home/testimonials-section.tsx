'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

const assetBase = '/Home/figma-home-1183-11549-img';

type Testimonial = {
  number: string;
  name: string;
  age: string;
  memberSince: string;
  location: string;
  rating: string;
  quote: string;
  image: string;
  divider: string;
};

const testimonials: Testimonial[] = [
  {
    number: '01',
    name: 'Emily Davis',
    age: 'Child age 2',
    memberSince: 'Member since 2024',
    location: 'Portland, OR',
    rating: '4.9',
    quote:
      "\"I used to spend my evenings googling activities, never sure if I was even doing the right thing. Now I just open my plan for the week and know exactly what to try. It's the first thing that's actually made me feel like I'm helping, not guessing.\"",
    image: `${assetBase}-image128.png`,
    divider: `${assetBase}-line2.svg`,
  },
  {
    number: '02',
    name: 'Jessica Miller',
    age: 'Child age 5',
    memberSince: 'Member since 2023',
    location: 'Denver, CO',
    rating: '5.0',
    quote:
      '"The OT-designed activities have been a complete game changer for my son\'s fine motor confidence. Watching him master pencil grasp and scissor skills through playful daily challenges brought so much joy to our family."',
    image: `${assetBase}-image129.png`,
    divider: `${assetBase}-line3.svg`,
  },
  {
    number: '03',
    name: 'Amanda Brooks',
    age: 'Child age 6',
    memberSince: 'Member since 2024',
    location: 'Austin, TX',
    rating: '4.9',
    quote:
      '"Bright Horizons takes all the overwhelm out of after-school sensory routines. The 15-minute ideas fit seamlessly into our busy schedule, and my daughter actually looks forward to them every single day."',
    image: `${assetBase}-image130.png`,
    divider: `${assetBase}-line4.svg`,
  },
];

function TestimonialCard({
  testimonial,
  isActive = false,
  onClick,
}: {
  testimonial: Testimonial;
  isActive?: boolean;
  onClick?: () => void;
}) {
  return (
    <article
      onClick={onClick}
      className={`w-full max-w-[571px] cursor-pointer overflow-hidden rounded-3xl bg-white p-5 sm:p-7 lg:p-8 transition-all duration-300 ${
        isActive
          ? 'border-2 border-[#F2B59F] shadow-[0_12px_32px_rgba(242,181,159,0.28)] ring-1 ring-[#F2B59F]/40'
          : 'border border-[#E9F1EE] shadow-xs hover:border-[#D4E4DE] hover:shadow-sm'
      }`}
    >
      <div className="flex flex-col gap-6 sm:gap-8">
        <div className="flex items-center justify-between">
          <span className="font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#7D8488]">
            {testimonial.number}
          </span>
          <div className="rounded-xl border border-[#E8EBE8] bg-[#FAFDFB] px-2.5 py-1">
            <div className="flex items-center gap-1.5">
              <Image
                src={`${assetBase}-icon.svg`}
                alt=""
                width={16}
                height={16}
                className="size-4"
              />
              <span className="font-manrope text-sm font-semibold leading-5.5 tracking-[-0.084px] text-[#263238]">
                {testimonial.rating}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 sm:gap-6">
          <blockquote className="font-nunito text-base sm:text-lg lg:text-xl leading-6 sm:leading-7 font-medium text-[#4F5B62] min-h-[96px] sm:min-h-[112px]">
            {testimonial.quote}
          </blockquote>

          <div className="relative h-1 w-full overflow-hidden">
            <Image
              src={testimonial.divider}
              alt=""
              fill
              sizes="571px"
              className="object-cover object-left"
            />
          </div>

          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1 sm:gap-1.5">
              <p className="font-nunito text-lg sm:text-xl font-semibold leading-7 text-[#263238]">
                {testimonial.name}
              </p>
              <p className="font-manrope text-xs sm:text-sm leading-5 sm:leading-5.5 tracking-[-0.084px] text-[#7D8488]">
                {testimonial.age}
              </p>
              <p className="flex flex-wrap items-center gap-1.5 sm:gap-2 font-manrope text-xs sm:text-sm leading-5 sm:leading-5.5 tracking-[-0.084px] text-[#7D8488]">
                <span>{testimonial.memberSince}</span>
                <span>·</span>
                <span>{testimonial.location}</span>
              </p>
            </div>

            <div className="relative size-12 sm:size-[58px] shrink-0 overflow-hidden rounded-lg">
              <div className="absolute -left-0.5 -top-5 sm:-top-[26px] h-24 sm:h-[106px] w-14 sm:w-16">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  sizes="58px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function TestimonialsHeading() {
  return (
    <header className="flex flex-col items-center gap-3 sm:gap-4 text-center px-4">
      <span className="rounded-xl border border-[#FAE1D9] bg-white px-2 py-1.5 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#614840]">
        Member love
      </span>
      <h2 className="font-nunito text-[clamp(28px,5vw,48px)] leading-[1.16] font-semibold tracking-[-0.48px] text-[#263238]">
        Why families love Bright Horizons
      </h2>
    </header>
  );
}

function TestimonialControls({
  currentIndex,
  total,
  onPrev,
  onNext,
  onSelect,
}: {
  currentIndex: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="flex items-center gap-4 sm:gap-5">
      <button
        type="button"
        onClick={onPrev}
        aria-label="Previous testimonial"
        className="flex size-10 items-center justify-center rounded-full transition-all duration-200 hover:scale-110 active:scale-95 hover:shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F2B59F]"
      >
        <Image
          src={`${assetBase}-teenyicons-arrow-up-solid.svg`}
          alt=""
          width={40}
          height={40}
          className="size-10 -rotate-90"
        />
      </button>

      {/* Indicator dots */}
      <div className="flex items-center gap-2 px-1">
        {Array.from({ length: total }).map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSelect(idx)}
            aria-label={`Go to testimonial ${idx + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
              idx === currentIndex ? 'w-7 bg-[#F2B59F]' : 'w-2.5 bg-white/70 hover:bg-white'
            }`}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={onNext}
        aria-label="Next testimonial"
        className="flex size-10 items-center justify-center rounded-full transition-all duration-200 hover:scale-110 active:scale-95 hover:shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F2B59F]"
      >
        <Image
          src={`${assetBase}-teenyicons-arrow-up-solid1.svg`}
          alt=""
          width={40}
          height={40}
          className="size-10 rotate-90"
        />
      </button>
    </div>
  );
}

function DesktopTestimonials({
  currentIndex,
  onPrev,
  onNext,
  onSelect,
}: {
  currentIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="relative mx-auto hidden h-[1393px] max-w-[1920px] overflow-hidden min-[1600px]:block">
      <Image
        src={`${assetBase}-union.svg`}
        alt=""
        width={2140}
        height={495}
        className="absolute -left-[110px] top-[898px] z-0 h-[495px] w-[2140px] max-w-none"
      />

      <div className="absolute left-0 top-40 z-10 flex w-full flex-col items-start gap-2.5 bg-[#E0F2FE] px-20 py-40">
        <div className="flex w-full flex-col items-center gap-10">
          <div className="flex w-full flex-col items-start gap-20">
            <TestimonialsHeading />
            <div className="flex w-full items-center gap-6">
              {testimonials.map((testimonial, idx) => (
                <TestimonialCard
                  key={testimonial.number}
                  testimonial={testimonial}
                  isActive={idx === currentIndex}
                  onClick={() => onSelect(idx)}
                />
              ))}
            </div>
          </div>
          <TestimonialControls
            currentIndex={currentIndex}
            total={testimonials.length}
            onPrev={onPrev}
            onNext={onNext}
            onSelect={onSelect}
          />
        </div>

        <div className="absolute -top-[6px] left-[1581px] flex size-[366.095px] items-center justify-center">
          <Image
            src={`${assetBase}-image11.png`}
            alt=""
            width={268}
            height={268}
            className="size-[268px] rotate-[120deg] object-cover"
          />
        </div>
      </div>
    </div>
  );
}

function CompactTestimonials({
  currentIndex,
  onPrev,
  onNext,
  onSelect,
}: {
  currentIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
}) {
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 40) {
      onNext();
    } else if (diff < -40) {
      onPrev();
    }
    touchStartX.current = null;
  };

  return (
    <div className="relative overflow-hidden bg-[#E0F2FE] px-4 py-16 sm:px-8 sm:py-24 min-[1600px]:hidden">
      <div className="relative z-10 mx-auto max-w-290">
        <TestimonialsHeading />

        {/* Mobile & Tablet Slider (< 1024px): 1 card visible at a time with smooth sliding and touch swipe */}
        <div
          className="lg:hidden mt-10 sm:mt-14 w-full max-w-[571px] mx-auto overflow-hidden select-none py-2"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial, idx) => (
              <div key={testimonial.number} className="w-full shrink-0 px-1 sm:px-2">
                <TestimonialCard
                  testimonial={testimonial}
                  isActive={idx === currentIndex}
                  onClick={() => onSelect(idx)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Grid (>= 1024px and < 1600px): 3 cards in a row with active card highlighting */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6 justify-items-center mt-10 sm:mt-16 py-2">
          {testimonials.map((testimonial, idx) => (
            <TestimonialCard
              key={testimonial.number}
              testimonial={testimonial}
              isActive={idx === currentIndex}
              onClick={() => onSelect(idx)}
            />
          ))}
        </div>

        <div className="mt-10 sm:mt-12 flex justify-center">
          <TestimonialControls
            currentIndex={currentIndex}
            total={testimonials.length}
            onPrev={onPrev}
            onNext={onNext}
            onSelect={onSelect}
          />
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handleSelect = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="bg-[#FDFDFC]">
      <DesktopTestimonials
        currentIndex={currentIndex}
        onPrev={handlePrev}
        onNext={handleNext}
        onSelect={handleSelect}
      />
      <CompactTestimonials
        currentIndex={currentIndex}
        onPrev={handlePrev}
        onNext={handleNext}
        onSelect={handleSelect}
      />
    </section>
  );
}
