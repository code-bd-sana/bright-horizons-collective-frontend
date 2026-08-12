import Image from 'next/image';

type ChildProfile = {
  name: string;
  age: string;
  focus: string;
  focusLabel: string;
  image: string;
  imagePosition: string;
  progress: number;
};

const summaryCards = [
  { value: '2', label: 'Children', icon: '/Home/figma-child-profiles-children.svg' },
  { value: '2', label: 'Active weekly plans', icon: '/Home/figma-child-profiles-plans.svg' },
  { value: '5', label: 'Activities this week', icon: '/Home/figma-child-profiles-activities.svg' },
];

const children: ChildProfile[] = [
  {
    name: 'Emma',
    age: '4 yr',
    focusLabel: 'Fine Motor',
    focus: 'Build fine motor strength through daily hand activities',
    image: '/Home/figma-child-profile-emma.png',
    imagePosition: '50% 25%',
    progress: 40,
  },
  {
    name: 'Leo',
    age: '3 yr',
    focusLabel: 'Gross Motor',
    focus: 'Practice standing balance and supported walking',
    image: '/Home/figma-child-profile-leo.png',
    imagePosition: '50% 22%',
    progress: 40,
  },
];

function ChildCard({ child, selected = false }: { child: ChildProfile; selected?: boolean }) {
  return (
    <article
      className={`flex min-h-90 flex-1 flex-col gap-4 rounded-2xl border bg-white p-6 ${
        selected ? 'border-[#8fb9a8]' : 'border-[#e8ebe8]'
      }`}
    >
      <div className="flex items-start gap-3">
        <span className="flex size-13 shrink-0 items-center justify-center rounded-2xl border border-[#d5e5e5] bg-white shadow-[0_1px_1.5px_rgba(0,0,0,0.1),0_1px_1px_rgba(0,0,0,0.1)]">
          <span className="relative size-12 overflow-hidden rounded-2xl bg-[#b16262] shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            <Image
              src={child.image}
              alt={child.name}
              fill
              sizes="48px"
              className="object-cover"
              style={{ objectPosition: child.imagePosition }}
            />
          </span>
        </span>
        <div className="flex flex-col">
          <h2 className="font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-[#263238]">
            {child.name}
          </h2>
          <p className="font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#7d8488]">
            {child.age}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <span className="w-fit rounded-full border border-[#accbcb] bg-[#d5e5e5] px-2.25 py-1.25 font-nunito text-xs font-medium leading-4 text-[#2f7d7e]">
          {child.focusLabel}
        </span>
        <p className="font-manrope text-xs leading-4.5 text-[#7d8488]">
          <span className="text-[#1e282d]">Current focus:</span> {child.focus}
        </p>
      </div>

      <div>
        <div className="flex items-center justify-between font-manrope text-xs leading-4 text-[#7d8488]">
          <span>This week</span>
          <span className="font-medium text-[#263238]">2/5 activities</span>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#f2f5f5]">
          <div
            className="h-full rounded-full bg-[#2f7d7e]"
            style={{ width: `${child.progress}%` }}
          />
        </div>
      </div>

      <button
        type="button"
        className="mt-auto flex h-10 w-full items-center justify-center gap-1 rounded-full border border-[#d8ddd9] bg-white px-3 py-2 font-nunito text-sm font-medium leading-6 tracking-[-0.176px] text-[#2f7d7e]"
      >
        View Profile
        <Image src="/Home/figma-child-profiles-arrow.svg" alt="" width={16} height={16} />
      </button>
    </article>
  );
}

export function ChildProfilesPage() {
  return (
    <section className="mx-auto flex w-full max-w-382.25 flex-col gap-6">
      <div className="flex items-center justify-between gap-6">
        <div>
          <h1 className="font-nunito text-2xl font-medium leading-8 text-[#272f3a]">
            Child Profiles
          </h1>
          <p className="mt-1 font-manrope text-xs leading-4.5 text-[#7d8488]">
            Select a profile to view their developmental journey.
          </p>
        </div>
        <button
          type="button"
          className="flex h-10 items-center gap-1 rounded-full border border-[#accbcb] bg-linear-to-b from-[#2f7d7e]/60 to-[#2f7d7e] px-3 py-2 font-nunito text-sm font-medium leading-5 tracking-[-0.084px] text-[#f8fafc] shadow-[inset_0_-6px_2px_rgba(255,255,255,0.07)]"
        >
          <span className="text-base leading-4">+</span>
          Add Child
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {summaryCards.map((card) => (
          <article
            key={card.label}
            className="rounded-2xl border border-[#f7ebe8] bg-[#faf6f4] p-4"
          >
            <Image
              src={card.icon}
              alt=""
              width={16}
              height={16}
              className="mb-3 flex size-8 rounded-lg border border-[#fafafa] bg-white p-2"
            />
            <p className="font-nunito text-2xl font-medium leading-8 text-[#272f3a]">
              {card.value}
            </p>
            <p className="font-manrope text-xs font-medium leading-4.5 tracking-[0.48px] text-[#515b60]">
              {card.label}
            </p>
          </article>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {children.map((child, index) => (
          <ChildCard key={child.name} child={child} selected={index === 0} />
        ))}
      </div>
    </section>
  );
}
