import Image from 'next/image';

const ASSET_ROOT = '/Membership/';

type TestimonialCardProps = {
  variant: 'compact' | 'wide';
  portrait: 'a' | 'b';
};

function Portrait({ portrait }: Pick<TestimonialCardProps, 'portrait'>) {
  return (
    <div className="relative h-[124px] w-[124px] shrink-0">
      <Image
        src={`${ASSET_ROOT}testimonial-star.svg`}
        alt=""
        width={124}
        height={124}
        aria-hidden="true"
        className="absolute top-0 left-0 size-[124px]"
      />
      <div
        className="absolute top-[7px] left-4 h-[138px] w-[92px] overflow-hidden"
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
    <div className="flex items-start justify-center gap-6">
      <Portrait portrait={portrait} />
      <div className="flex w-[136px] flex-col items-center gap-4 text-center">
        <div className="flex w-full flex-col items-center gap-2">
          <p className="w-full font-nunito text-xl font-semibold leading-7 text-[#263238]">
            Sarah Karim
          </p>
          <div className="flex w-full flex-col items-center gap-1 font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#7D8488]">
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
          ? 'top-[17px] left-[23px] h-[43px] w-11 -rotate-[10.54deg]'
          : 'top-3 right-6 h-11 w-[43px] rotate-[19.65deg]'
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
      className={`relative overflow-hidden rounded-[16px] border border-[#ACCBCC] bg-white p-8 shadow-[4px_5px_0_#ACCBCC] ${
        isWide ? 'h-[326px]' : 'h-[330px]'
      }`}
    >
      {isWide ? (
        <div className="flex h-full items-center justify-center gap-20">
          <div className="flex w-[125px] shrink-0 flex-col items-end">
            <Portrait portrait={portrait} />
            <div className="flex w-[125px] flex-col items-center gap-4 text-center">
              <div className="flex w-full flex-col items-center gap-2">
                <p className="w-full font-nunito text-xl font-semibold leading-7 text-[#263238]">
                  Sarah Karim
                </p>
                <div className="flex w-full flex-col items-center gap-1 font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#7D8488]">
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
          <blockquote className="w-[343px] font-lora text-[32px] font-medium italic leading-10 tracking-[-0.16px] text-[#263238] text-center">
            {quote}
          </blockquote>
        </div>
      ) : (
        <div className="flex h-full flex-col items-center gap-12">
          <Profile portrait={portrait} />
          <blockquote className="w-full font-lora text-[32px] font-medium italic leading-10 tracking-[-0.16px] text-[#263238] text-center">
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
        <header className="flex w-full max-w-[701px] flex-col items-center gap-4 text-center">
          <span className="rounded-[12px] border border-[#E8EBE8] bg-white px-2 py-1.5 font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#263238]">
            Testimonials
          </span>
          <h2 className="font-nunito text-[32px] font-medium leading-10 tracking-[-0.4px] text-[#263238] md:text-[40px] md:leading-[48px]">
            Families love Bright Horizons Collective
          </h2>
        </header>

        <div className="grid w-full grid-cols-1 gap-12 min-[1200px]:grid-cols-[397px_728px_535px] min-[1200px]:gap-12">
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
