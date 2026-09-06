import Image from 'next/image';

export function ActivityDetailHero() {
  return (
    <section className="rounded-2xl border border-[#e8ebe8] bg-white p-5 shadow-[0_1px_1px_rgba(0,0,0,0.05)] sm:p-8">
      <div className="relative h-75 overflow-hidden rounded-2xl bg-[#d2e3dc] sm:h-119.25">
        <Image
          src="/images/admin/activities/stacking-sorting-challenge.png"
          alt="Colorful sorting toys in a sensory bin"
          fill
          priority
          sizes="(min-width: 768px) 999px, 100vw"
          className="object-cover object-[50%_59%]"
        />
        <div className="absolute left-4 top-4 flex flex-wrap gap-3">
          <span className="rounded-full border border-[#e9f1ee] bg-[#e0f0e9] px-2.5 py-1.5 font-nunito text-xs font-medium leading-4 text-[#263238]">
            Easy
          </span>
          <span className="rounded-full border border-[#e9f1ee] bg-[#e0f0e9] px-2.5 py-1.5 font-nunito text-xs font-medium leading-4 text-[#263238]">
            Fine motors
          </span>
          <span className="rounded-full border border-[#e9f1ee] bg-white px-2.5 py-1.5 font-nunito text-xs font-medium leading-4 text-[#263238]">
            2–5 yr
          </span>
        </div>
      </div>
      <div className="mt-8">
        <div className="max-w-180">
          <h1 className="font-nunito text-[28px] font-medium leading-10 tracking-[-0.16px] text-[#263238] sm:text-[32px]">
            Stacking &amp; Sorting Challenge
          </h1>
          <p className="mt-3 max-w-146 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#515b60]">
            Move through fun animal poses to build balance and whole-body motor planning. Perfect
            for an energetic start to the week.
          </p>
        </div>
        <dl className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <dt className="font-nunito text-xs font-medium uppercase leading-4 text-[#7d8488]">
              Duration
            </dt>
            <dd className="mt-1 font-manrope text-base leading-6 tracking-[-0.176px] text-[#263238]">
              20 min
            </dd>
          </div>
          <div>
            <dt className="font-nunito text-xs font-medium uppercase leading-4 text-[#7d8488]">
              Materials
            </dt>
            <dd className="mt-1 font-manrope text-base leading-6 tracking-[-0.176px] text-[#263238]">
              Yoga cards &amp; open space
            </dd>
          </div>
          <div>
            <dt className="font-nunito text-xs font-medium uppercase leading-4 text-[#7d8488]">
              Development Goal
            </dt>
            <dd className="mt-1 font-manrope text-base leading-6 tracking-[-0.176px] text-[#263238]">
              Motor planning &amp; balance
            </dd>
          </div>
          <div>
            <dt className="font-nunito text-xs font-medium uppercase leading-4 text-[#7d8488]">
              OT Designed
            </dt>
            <dd className="mt-1 font-manrope text-base leading-6 tracking-[-0.176px] text-[#263238]">
              Therapist-approved
            </dd>
          </div>
        </dl>
        <section className="mt-12">
          <h2 className="font-nunito text-xl font-medium leading-7 text-[#263238]">
            Learning Objective
          </h2>
          <p className="mt-3 max-w-123.75 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#515b60]">
            Emma will move through at least 5 animal-themed yoga poses, holding each for 3–5
            seconds, building postural control and spatial body awareness.
          </p>
        </section>
      </div>
    </section>
  );
}
