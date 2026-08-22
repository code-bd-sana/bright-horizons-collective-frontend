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
    <article className="w-[571px] shrink-0 overflow-hidden rounded-3xl border border-[#E9F1EE] bg-white p-8 max-lg:w-full max-md:p-5">
      <div className="flex flex-col gap-12">
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

        <div className="flex flex-col gap-6">
          <blockquote className="min-w-full font-nunito text-xl leading-7 font-medium text-[#7D8488]">
            {quote}
          </blockquote>

          <div className="relative h-0 w-[507px] max-w-full rotate-180">
            <Image
              src={testimonial.divider}
              alt=""
              width={507}
              height={2}
              className="absolute left-0 top-[-2px] h-0.5 w-full"
            />
          </div>

          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-2">
              <p className="w-[233px] font-nunito text-xl leading-7 font-medium text-[#263238]">
                Sarah Karim
              </p>
              <p className="font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#7D8488]">
                {testimonial.age}
              </p>
              <p className="flex flex-wrap items-center gap-x-2 font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#7D8488]">
                <span>Member since 2024</span>
                <span>·</span>
                <span>Portland, OR</span>
              </p>
            </div>

            <div className="relative size-[58px] shrink-0 overflow-hidden rounded-lg">
              <div className="absolute -left-0.5 -top-[26px] h-[106px] w-16">
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
    <header className="flex flex-col items-center gap-4 text-center">
      <span className="rounded-xl border border-[#FAE1D9] bg-white px-2 py-1.5 font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#614840]">
        Member love
      </span>
      <h2 className="whitespace-nowrap font-nunito text-5xl leading-14 font-semibold tracking-[-0.48px] text-[#263238] max-lg:whitespace-normal max-md:text-[34px] max-md:leading-[1.16]">
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
        className="flex size-10 items-center justify-center"
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
        className="flex size-10 items-center justify-center"
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
    <div className="relative overflow-hidden bg-[#E0F2FE] px-5 py-24 sm:px-8 sm:py-32 min-[1600px]:hidden">
      <div className="relative z-10 mx-auto max-w-[571px]">
        <TestimonialsHeading />
        <div className="mt-16 flex flex-col items-center gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.number} className="max-w-full overflow-hidden rounded-3xl">
              <TestimonialCard testimonial={testimonial} />
            </div>
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
