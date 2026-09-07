import Image from 'next/image';

const ASSET_ROOT = '/Membership/';

type TestimonialCardProps = {
  variant: 'compact' | 'wide';
  portrait: 'a' | 'b';
};

const responsiveTestimonials: TestimonialCardProps[] = [
  { variant: 'compact', portrait: 'a' },
  { variant: 'wide', portrait: 'b' },
  { variant: 'compact', portrait: 'a' },
  { variant: 'wide', portrait: 'b' },
  { variant: 'compact', portrait: 'a' },
  { variant: 'wide', portrait: 'b' },
  { variant: 'compact', portrait: 'a' },
];

function Portrait({ portrait }: Pick<TestimonialCardProps, 'portrait'>) {
  return (
    <div className="relative h-31 w-31 shrink-0">
      <Image
        src={`${ASSET_ROOT}testimonial-star.svg`}
        alt=""
        width={124}
        height={124}
        aria-hidden="true"
        className="absolute top-0 left-0 size-31"
      />
      <div
        className="absolute top-1.75 left-4 h-34.5 w-23 overflow-hidden"
        style={{
          maskImage: `url(${ASSET_ROOT}testimonial-mask.svg)`,
          WebkitMaskImage: `url(${ASSET_ROOT}testimonial-mask.svg)`,
          maskPosition: '-11px -4px',
          maskRepeat: 'no-repeat',
          maskSize: '114px 110px',
        }}
      >
        <Image
          src={`${ASSET_ROOT}testimonial-portrait-${portrait}.png`}
          alt=""
          fill
          sizes="92px"
          aria-hidden="true"
          className="object-cover"
        />
      </div>
    </div>
  );
}

function Profile({ portrait }: Pick<TestimonialCardProps, 'portrait'>) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 min-[440px]:flex-row min-[440px]:items-start min-[440px]:gap-6">
      <Portrait portrait={portrait} />
      <div className="flex w-34 flex-col items-center gap-4 text-center">
        <div className="flex w-full flex-col items-center gap-2">
          <p className="w-full font-nunito text-xl font-semibold leading-7 text-[#263238]">
            Sarah Karim
          </p>
          <div className="flex w-full flex-col items-center gap-1 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#7D8488]">
            <p>Child age 2</p>
            <div className="flex h-11 flex-col items-center">
              <p>Member since 2024</p>
              <p>Portland, OR</p>
            </div>
          </div>
        </div>
        <Image
          src={`${ASSET_ROOT}testimonial-rating.svg`}
          alt="5 out of 5 stars"
          width={96}
          height={16}
          className="h-4 w-24"
        />
      </div>
    </div>
  );
}

function Sticker({ position }: { position: 'left' | 'right' }) {
  const crop =
    position === 'left'
      ? 'h-[161px] w-[161px] -left-[17px] -top-[19px]'
      : 'h-[147px] w-[147px] -left-[11px] -top-[62px]';

  return (
    <div
      aria-hidden="true"
      className={`absolute overflow-hidden ${
        position === 'left'
          ? 'top-4.25 left-5.75 h-10.75 w-11 rotate-[-10.54deg]'
          : 'top-3 right-6 h-11 w-10.75 rotate-[19.65deg]'
      }`}
    >
      <Image
        src={`${ASSET_ROOT}testimonial-sticker.png`}
        alt=""
        width={161}
        height={161}
        className={`absolute max-w-none ${crop}`}
      />
    </div>
  );
}

function TestimonialCard({ variant, portrait }: TestimonialCardProps) {
  const isWide = variant === 'wide';
  const quote = isWide
    ? '"I finally know what to do at home."'
    : '"My daughter loves her weekly activities."';

  return (
    <article
      className={`relative overflow-hidden rounded-[16px] border border-[#ACCBCC] bg-white p-6 shadow-[4px_5px_0_#ACCBCC] sm:p-8 ${
        isWide ? 'min-h-107.5 sm:h-82.5 min-[1920px]:h-81.5' : 'min-h-107.5 sm:h-82.5'
      }`}
    >
      {isWide ? (
        <>
          <div className="flex h-full flex-col items-center justify-center gap-6 min-[1920px]:hidden">
            <Profile portrait={portrait} />
            <blockquote className="w-full max-w-85.75 font-lora text-[28px] font-medium italic leading-9 tracking-[-0.16px] text-[#263238] text-center sm:text-[32px] sm:leading-10">
              {quote}
            </blockquote>
          </div>
          <div className="hidden h-full items-center justify-center gap-20 min-[1920px]:flex">
            <div className="flex w-31.25 shrink-0 flex-col items-center min-[1920px]:items-end">
              <Portrait portrait={portrait} />
              <div className="flex w-31.25 flex-col items-center gap-4 text-center">
                <div className="flex w-full flex-col items-center gap-2">
                  <p className="w-full font-nunito text-xl font-semibold leading-7 text-[#263238]">
                    Sarah Karim
                  </p>
                  <div className="flex w-full flex-col items-center gap-1 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#7D8488]">
                    <p>Child age 2</p>
                    <div className="flex h-11 flex-col items-center">
                      <p>Member since 2024</p>
                      <p>Portland, OR</p>
                    </div>
                  </div>
                </div>
                <Image
                  src={`${ASSET_ROOT}testimonial-rating.svg`}
                  alt="5 out of 5 stars"
                  width={96}
                  height={16}
                  className="h-4 w-24"
                />
              </div>
            </div>
            <blockquote className="w-full max-w-85.75 font-lora text-[28px] font-medium italic leading-9 tracking-[-0.16px] text-[#263238] text-center sm:text-[32px] sm:leading-10">
              {quote}
            </blockquote>
          </div>
        </>
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-6 sm:gap-12">
          <Profile portrait={portrait} />
          <blockquote className="w-full font-lora text-[28px] font-medium italic leading-9 tracking-[-0.16px] text-[#263238] text-center sm:text-[32px] sm:leading-10">
            {quote}
          </blockquote>
        </div>
      )}
      <Sticker position={isWide ? 'right' : 'left'} />
    </article>
  );
}

export function MembershipTestimonials() {
  return (
    <section className="bg-[#FDFDFC] px-5 py-20 sm:px-8 md:py-40 min-[1800px]:px-20">
      <div className="mx-auto flex w-full max-w-[1760px] flex-col items-center gap-20">
        <header className="flex w-full max-w-175.25 flex-col items-center gap-4 text-center">
          <span className="rounded-[12px] border border-[#E8EBE8] bg-white px-2 py-1.5 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#263238]">
            Testimonials
          </span>
          <h2 className="font-nunito text-[32px] font-medium leading-10 tracking-[-0.4px] text-[#263238] md:text-[40px] md:leading-12">
            Families love Bright Horizons Collective
          </h2>
        </header>

        <div className="grid w-full grid-cols-1 gap-12 md:hidden">
          {responsiveTestimonials.map((testimonial, index) => (
            <TestimonialCard
              key={`${testimonial.variant}-${testimonial.portrait}-${index}`}
              variant={testimonial.variant}
              portrait={testimonial.portrait}
            />
          ))}
        </div>

        <div className="hidden w-full grid-cols-2 gap-12 md:grid min-[1920px]:hidden">
          {responsiveTestimonials.map((testimonial, index) => (
            <TestimonialCard
              key={`${testimonial.variant}-${testimonial.portrait}-${index}`}
              variant={testimonial.variant}
              portrait={testimonial.portrait}
            />
          ))}
        </div>

        <div className="hidden w-full min-[1920px]:grid min-[1920px]:grid-cols-[397px_728px_535px] min-[1920px]:gap-12">
          <div className="flex flex-col gap-12">
            <TestimonialCard variant="compact" portrait="a" />
            <TestimonialCard variant="compact" portrait="a" />
          </div>
          <div className="flex flex-col gap-12">
            <TestimonialCard variant="wide" portrait="b" />
            <TestimonialCard variant="wide" portrait="b" />
            <TestimonialCard variant="wide" portrait="b" />
          </div>
          <div className="flex flex-col gap-12">
            <TestimonialCard variant="compact" portrait="a" />
            <TestimonialCard variant="compact" portrait="a" />
          </div>
        </div>
      </div>
    </section>
  );
}
