import Image from 'next/image';

const ASSET_ROOT = '/Membership/';

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  location: string;
  badge: string;
  portrait: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      '"I used to spend hours googling activities, never sure if I was helping or guessing. Now I open our weekly plan and know exactly what to do. It has transformed our home routine."',
    name: 'Sarah Karim',
    role: 'Parent of 2-year-old',
    location: 'Portland, OR',
    badge: 'Sensory & Motor Plan',
    portrait: `${ASSET_ROOT}testimonial-portrait-a.png`,
  },
  {
    quote:
      '"The milestone tracking and customized weekly plans take away all the overwhelm. My son genuinely looks forward to activity time every single afternoon."',
    name: 'Marcus Chen',
    role: 'Parent of 4-year-old',
    location: 'Austin, TX',
    badge: 'Fine Motor Skills',
    portrait: `${ASSET_ROOT}testimonial-portrait-b.png`,
  },
  {
    quote:
      '"The therapy toy recommendations alone have saved us hundreds of dollars on toys we would have bought and discarded. Everything has purpose and clear developmental benefits."',
    name: 'Elena Rodriguez',
    role: 'Parent of 3-year-old',
    location: 'Denver, CO',
    badge: 'Therapy Toys & Play',
    portrait: '/Home/figma-home-1183-11549-img-image128.png',
  },
  {
    quote:
      '"Direct messaging with a licensed pediatric occupational therapist gives our family so much confidence. Whenever we have questions, we receive thoughtful, practical answers."',
    name: 'David & Maya Miller',
    role: 'Parents of 5-year-old',
    location: 'Seattle, WA',
    badge: 'Premium OT Support',
    portrait: `${ASSET_ROOT}testimonial-portrait-a.png`,
  },
  {
    quote:
      '"As a working mom, I don\'t have time to invent therapy games from scratch. These 15-minute daily exercises fit seamlessly into our schedule with zero stress."',
    name: 'Priya Patel',
    role: 'Parent of 2-year-old',
    location: 'Chicago, IL',
    badge: 'Daily Routines',
    portrait: '/Home/figma-home-1183-11549-img-image129.png',
  },
  {
    quote:
      '"Our daughter\'s grip strength and handwriting readiness improved noticeably in just two months. The guidance is compassionate, practical, and truly effective."',
    name: 'Jessica Taylor',
    role: 'Parent of 4-year-old',
    location: 'Atlanta, GA',
    badge: 'Handwriting Readiness',
    portrait: '/Home/figma-home-1183-11549-img-image130.png',
  },
];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="group relative flex flex-col justify-between rounded-2xl border border-[#DCE8E5] bg-white p-6 sm:p-7 shadow-[0_2px_12px_rgba(23,74,77,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#B2D6CF] hover:shadow-[0_12px_28px_rgba(23,74,77,0.08)]">
      <div>
        <div className="flex items-center justify-between gap-3">
          <Image
            src={`${ASSET_ROOT}testimonial-rating.svg`}
            alt="5 out of 5 stars"
            width={84}
            height={14}
            className="h-3.5 w-auto"
          />
          <span className="rounded-full bg-[#EBF5F3] px-2.5 py-0.5 font-manrope text-xs font-semibold text-[#174A4D]">
            {testimonial.badge}
          </span>
        </div>

        <blockquote className="mt-4 font-nunito text-[15px] sm:text-base leading-relaxed text-[#3D4D54]">
          {testimonial.quote}
        </blockquote>
      </div>

      <div className="mt-6 flex items-center gap-3.5 border-t border-[#F0F5F3] pt-4">
        <div className="relative size-11 shrink-0 overflow-hidden rounded-full border-2 border-[#DCE8E5] bg-[#F4F9F8]">
          <Image
            src={testimonial.portrait}
            alt={testimonial.name}
            fill
            sizes="44px"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <p className="font-nunito text-sm sm:text-base font-bold text-[#174A4D] leading-tight">
            {testimonial.name}
          </p>
          <p className="font-manrope text-xs text-[#7D8488] leading-normal mt-0.5">
            {testimonial.role} · {testimonial.location}
          </p>
        </div>
      </div>
    </article>
  );
}

export function MembershipTestimonials() {
  return (
    <section className="bg-[#FDFDFC] px-5 py-16 sm:px-8 sm:py-24 md:py-28">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-12 sm:gap-16">
        <header className="flex w-full max-w-xl flex-col items-center gap-3 text-center">
          <span className="rounded-full border border-[#DCE8E5] bg-[#F4F9F8] px-3 py-1 font-manrope text-xs font-semibold uppercase tracking-wider text-[#174A4D]">
            Testimonials
          </span>
          <h2 className="font-nunito text-2xl font-bold tracking-tight text-[#174A4D] sm:text-3xl md:text-4xl">
            Families Love Bright Horizons Collective
          </h2>
          <p className="font-manrope text-sm sm:text-base text-[#607077]">
            Real feedback from parents empowering their children&apos;s developmental journey with
            confidence.
          </p>
        </header>

        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={`${testimonial.name}-${index}`} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
