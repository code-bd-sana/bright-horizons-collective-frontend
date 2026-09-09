import Image from 'next/image';

const assetBase = '/Home/figma-home-1183-11549-img';

const quote =
  "\"I used to spend my evenings googling activities, never sure if I was even doing the right thing. Now I just open my plan for the week and know exactly what to try. It's the first thing that's actually made me feel like I'm helping, not guessing.\"";

type Testimonial = {
  number: string;
  age: string;
  image: string;
  divider: string;
};

const testimonials: Testimonial[] = [
  {
    number: '01',
    age: 'Child age 2',
    image: `${assetBase}-image128.png`,
    divider: `${assetBase}-line2.svg`,
  },
  {
    number: '02',
    age: 'Child age 5',
    image: `${assetBase}-image129.png`,
    divider: `${assetBase}-line3.svg`,
  },
  {
    number: '03',
    age: 'Child age 6',
    image: `${assetBase}-image130.png`,
    divider: `${assetBase}-line4.svg`,
  },
];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="w-full max-w-[571px] overflow-hidden rounded-3xl border border-[#E9F1EE] bg-white p-5 sm:p-8">
      <div className="flex flex-col gap-6 sm:gap-10">
        <div className="flex items-center justify-between">
          <span className="font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#7D8488]">
            {testimonial.number}
          </span>
          <div className="rounded-xl border border-[#E8EBE8] bg-white px-2 py-1.5">
            <div className="flex items-center gap-1">
              <Image
                src={`${assetBase}-icon.svg`}
                alt=""
                width={16}
                height={16}
                className="size-4"
              />
              <span className="font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#263238]">
                4.9
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 sm:gap-6">
          <blockquote className="font-nunito text-base sm:text-xl leading-6 sm:leading-7 font-medium text-[#7D8488]">
            {quote}
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
            <div className="flex flex-col gap-1 sm:gap-2">
              <p className="font-nunito text-lg sm:text-xl leading-7 font-medium text-[#263238]">
                Sarah Karim
              </p>
              <p className="font-manrope text-xs sm:text-sm leading-[20px] sm:leading-[22px] tracking-[-0.084px] text-[#7D8488]">
                {testimonial.age}
              </p>
              <p className="flex flex-wrap items-center gap-1.5 sm:gap-2 font-manrope text-xs sm:text-sm leading-[20px] sm:leading-[22px] tracking-[-0.084px] text-[#7D8488]">
                <span>Member since 2024</span>
                <span>·</span>
                <span>Portland, OR</span>
              </p>
            </div>

            <div className="relative size-12 sm:size-[58px] shrink-0 overflow-hidden rounded-lg">
              <div className="absolute -left-0.5 -top-5 sm:-top-[26px] h-24 sm:h-[106px] w-14 sm:w-16">
                <Image src={testimonial.image} alt="" fill sizes="58px" className="object-cover" />
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
      <span className="rounded-xl border border-[#FAE1D9] bg-white px-2 py-1.5 font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#614840]">
        Member love
      </span>
      <h2 className="font-nunito text-[clamp(28px,5vw,48px)] leading-[1.16] font-semibold tracking-[-0.48px] text-[#263238]">
        Why families love Bright Horizons
      </h2>
    </header>
  );
}

function TestimonialControls() {
  return (
    <div className="flex items-center gap-5">
      <button
        type="button"
        aria-label="Previous testimonial"
        className="flex size-10 items-center justify-center transition-opacity hover:opacity-75"
      >
        <Image
          src={`${assetBase}-teenyicons-arrow-up-solid.svg`}
          alt=""
          width={40}
          height={40}
          className="size-10 -scale-y-100 rotate-90"
        />
      </button>
      <button
        type="button"
        aria-label="Next testimonial"
        className="flex size-10 items-center justify-center transition-opacity hover:opacity-75"
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

function DesktopTestimonials() {
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
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.number} testimonial={testimonial} />
              ))}
            </div>
          </div>
          <TestimonialControls />
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

function CompactTestimonials() {
  return (
    <div className="relative overflow-hidden bg-[#E0F2FE] px-4 py-16 sm:px-8 sm:py-24 min-[1600px]:hidden">
      <div className="relative z-10 mx-auto max-w-290">
        <TestimonialsHeading />
        <div className="mt-10 sm:mt-16 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.number} testimonial={testimonial} />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <TestimonialControls />
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="bg-[#FDFDFC]">
      <DesktopTestimonials />
      <CompactTestimonials />
    </section>
  );
}
