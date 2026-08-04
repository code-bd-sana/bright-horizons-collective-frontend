import Image from 'next/image';
import Link from 'next/link';

const assetBase = '/Home/figma-home-1183-11287-img';

const activityMaskAsset = `${assetBase}-image113.svg`;

const activityCards = [
  {
    age: '12–24 mo',
    difficulty: 'Easy',
    duration: '15 min',
    image: `${assetBase}-image114.png`,
    imageClassName: 'left-[39px] top-[-163px] h-[516px] w-[344px]',
    location: '🏠 Indoor',
    maskPosition: '44.977px 184.719px',
    material: 'Rice, small bin',
    skill: 'Sensory',
    title: 'Tactile Bin Sensory Play',
  },
  {
    age: '18–36 mo',
    difficulty: 'Easy',
    duration: '20 min',
    image: `${assetBase}-image116.png`,
    imageClassName: 'left-[77px] top-2 size-[267px]',
    location: '🏠 Indoor',
    maskPosition: '6.978px 13.721px',
    material: 'Blocks',
    skill: 'Fine Motor',
    title: 'Stacking & Sorting Challenge',
  },
  {
    age: '2–4 yr',
    difficulty: 'Moderate',
    duration: '15 min',
    image: `${assetBase}-image117.png`,
    imageClassName: 'left-[74px] top-[-17px] h-[416px] w-[297px]',
    location: '🌿 Outdoor',
    maskPosition: '9.978px 38.721px',
    material: 'Low beam',
    skill: 'Sensory',
    title: 'Outdoor Balance Walk',
  },
  {
    age: '3–5 Years',
    difficulty: 'Easy',
    duration: '15 min',
    image: `${assetBase}-image118.png`,
    imageClassName: 'left-[72px] top-[-138px] h-[537px] w-[293px]',
    location: '🏠 Indoor',
    maskPosition: '11.978px 159.721px',
    material: 'Paint, paper',
    skill: 'Sensory',
    title: 'Finger Painting Flow',
  },
] as const;

function imageMask(maskPosition: string) {
  return {
    maskClip: 'no-clip',
    maskComposite: 'intersect',
    maskImage: `url('${activityMaskAsset}')`,
    maskMode: 'alpha',
    maskPosition,
    maskRepeat: 'no-repeat',
    maskSize: '253.045px 244.812px',
    WebkitMaskImage: `url('${activityMaskAsset}')`,
    WebkitMaskPosition: maskPosition,
    WebkitMaskRepeat: 'no-repeat',
    WebkitMaskSize: '253.045px 244.812px',
  };
}

function AssetIcon({
  name,
  size,
  className = '',
}: {
  name: string;
  size: number;
  className?: string;
}) {
  return (
    <span className={`relative block shrink-0 ${className}`} style={{ height: size, width: size }}>
      <Image
        src={`${assetBase}-${name}.svg`}
        alt=""
        fill
        sizes={`${size}px`}
        className="object-contain"
      />
    </span>
  );
}

function ActivityPill({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`shrink-0 rounded-full border border-[#ACCBcb] bg-white px-[9px] py-[7px] font-nunito text-xs font-medium leading-4 text-[#2F7D7E] ${className}`}
    >
      {children}
    </span>
  );
}

function ActivityCard({ activity }: { activity: (typeof activityCards)[number] }) {
  return (
    <article className="relative h-[434px] w-[422px] shrink-0 overflow-hidden rounded-[24px] border border-[#E9F1EE] bg-white">
      <div className="absolute left-[-1px] top-[-1px] h-[286px] w-[422px] overflow-hidden rounded-[24px] bg-[#A5C7B9]">
        <div
          className={`absolute ${activity.imageClassName}`}
          style={imageMask(activity.maskPosition)}
        >
          <Image
            src={activity.image}
            alt=""
            fill
            sizes="422px"
            className="pointer-events-none object-cover"
          />
        </div>
        <span
          className={`absolute left-4 top-4 rounded-full px-[10px] py-[3px] font-nunito text-xs font-medium leading-4 text-[#174A4D] ${activity.difficulty === 'Moderate' ? 'bg-[#F6E6D4]' : 'bg-white'}`}
        >
          {activity.difficulty}
        </span>
      </div>

      <div className="absolute left-[15px] top-[301px] flex w-[390px] flex-col gap-4 pb-4">
        <h3 className="w-full font-nunito text-2xl font-medium leading-8 text-[#263238]">
          {activity.title}
        </h3>
        <div className="flex flex-col items-start gap-2">
          <div className="flex items-center gap-[5px]">
            <span className="rounded-full border border-[#DCEEEE] px-[9px] py-[7px] font-nunito text-xs font-medium leading-4 text-[#174A4D]">
              <span className="text-[#263238]">Material:</span>{' '}
              <span className="text-[#7D8488]">{activity.material}</span>
            </span>
            <span className="flex items-center gap-1 px-2 py-1.5 font-manrope text-xs leading-[18px] text-[#607077]">
              <AssetIcon name="icon4" size={12} />
              {activity.duration}
            </span>
          </div>
          <div className="flex items-start gap-[5px]">
            <ActivityPill>{activity.location}</ActivityPill>
            <ActivityPill>{activity.age}</ActivityPill>
            <ActivityPill>{activity.skill}</ActivityPill>
          </div>
        </div>
      </div>
    </article>
  );
}

function FeaturedActivities() {
  return (
    <div className="absolute left-1/2 top-[124px] z-10 w-[1760px] -translate-x-1/2">
      <header className="relative h-[106px] w-full">
        <span className="absolute left-[826px] top-0 rounded-xl border border-[#FAE1D9] bg-[#FCE9E3] px-2 py-1.5 font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#614840]">
          For your family
        </span>
        <h2 className="absolute left-[593.5px] top-[50px] w-[573px] text-center font-nunito text-5xl font-semibold leading-14 tracking-[-0.48px] text-[#263238]">
          Featured activities
        </h2>
      </header>

      <div className="mt-20 flex gap-6">
        {activityCards.map((activity) => (
          <ActivityCard key={activity.title} activity={activity} />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          href="/explore"
          className="inline-flex min-w-20 items-center justify-center gap-1 rounded-full bg-[#263238] px-3 py-2 font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-white"
        >
          <span className="px-1">See all</span>
          <AssetIcon name="vector1" size={16} />
        </Link>
      </div>
    </div>
  );
}

function ToyGallery() {
  const trainMask = {
    maskClip: 'no-clip',
    maskComposite: 'intersect',
    maskImage: `url('${assetBase}-image136.svg')`,
    maskMode: 'alpha',
    maskPosition: '34.996px 18.996px',
    maskRepeat: 'no-repeat',
    maskSize: '430.008px 430.009px',
    WebkitMaskImage: `url('${assetBase}-image136.svg')`,
    WebkitMaskPosition: '34.996px 18.996px',
    WebkitMaskRepeat: 'no-repeat',
    WebkitMaskSize: '430.008px 430.009px',
  };

  return (
    <div className="relative h-[642px] w-[576px] shrink-0 overflow-hidden rounded-[inherit] bg-[#DCEEEE]">
      <div className="absolute inset-0 flex overflow-hidden rounded-[inherit]">
        <div className="relative h-[642px] w-[576px] shrink-0 blur-[11.5px]">
          <Image
            src="/Home/figma-home-1183-11287-grimms-rainbow-arc-stacker.png"
            alt=""
            fill
            sizes="576px"
            className="object-cover"
          />
        </div>
        <div className="relative h-[642px] w-[576px] shrink-0">
          <Image
            src="/Home/figma-home-1183-11287-rainbow-stacker-close-up.png"
            alt=""
            fill
            sizes="576px"
            className="object-cover"
          />
        </div>
        <div className="relative h-[642px] w-[576px] shrink-0">
          <Image
            src="/Home/figma-home-1183-11287-child-playing-rainbow-stacker.png"
            alt=""
            fill
            sizes="576px"
            className="object-cover"
          />
        </div>
      </div>

      <div className="absolute left-[38px] top-[49.89px] h-[468px] w-[473px]" style={trainMask}>
        <Image
          src={`${assetBase}-image137.png`}
          alt="Wooden rainbow arc stacker arranged in a train play scene"
          fill
          sizes="473px"
          className="object-cover"
        />
      </div>

      <button
        type="button"
        aria-label="Previous toy image"
        className="absolute left-3 top-[265.31px] flex size-[38px] items-center justify-center rounded-[19px] bg-white/88 shadow-[0_2px_10px_rgba(0,0,0,0.14)]"
      >
        <AssetIcon name="icon" size={18} />
      </button>
      <button
        type="button"
        aria-label="Next toy image"
        className="absolute left-[526px] top-[265.31px] flex size-[38px] items-center justify-center rounded-[19px] bg-white/88 shadow-[0_2px_10px_rgba(0,0,0,0.14)]"
      >
        <AssetIcon name="icon1" size={18} />
      </button>
      <span className="absolute left-[251px] top-[557px] rounded-full bg-[#174A4D]/62 px-[13px] py-1 font-nunito text-xs font-medium leading-4 text-white">
        3 photos
      </span>
    </div>
  );
}

function BorderPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-[#ACCBcb] bg-white px-[9px] py-[7px] font-nunito text-xs font-medium leading-4 text-[#2F7D7E]">
      {children}
    </span>
  );
}

function ExpandableRow({
  emoji,
  label,
  value,
  valueClassName,
}: {
  emoji: string;
  label: string;
  value: string;
  valueClassName: string;
}) {
  return (
    <div className="flex h-[54px] items-center justify-between py-[13px]">
      <div className="flex items-center gap-2">
        <span className="font-manrope text-base font-medium leading-4 text-[#263238]">{emoji}</span>
        <span className="font-nunito text-xl font-medium leading-7 text-[#263238]">{label}</span>
        <span
          className={`rounded-full px-[9px] py-[2px] font-nunito text-xs font-medium leading-4 ${valueClassName}`}
        >
          {value}
        </span>
      </div>
      <AssetIcon name="icon3" size={16} className="rotate-90" />
    </div>
  );
}

function ToyDetails() {
  return (
    <div className="h-[642px] w-[576px] shrink-0 px-9 py-10">
      <div className="relative h-12">
        <span className="absolute left-0 top-0 rounded-full border border-[#D8DDD9] bg-[#F6E6D4] px-[15px] py-[6px] font-nunito text-xs font-medium leading-4 text-[#174A4D]">
          ✦ OT Recommended
        </span>
      </div>
      <h3 className="w-[504px] pb-4 font-nunito text-[32px] font-medium leading-10 tracking-[-0.16px] text-[#174A4D]">
        Grimm&apos;s Rainbow Arc Stacker
      </h3>
      <p className="w-[504px] pb-4 font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#515B60]">
        The Rainbow Arc Stacker builds spatial reasoning and colour recognition through open-ended
        play. Children naturally discover balance, sequencing, and cause-and-effect while creating
        freely. OT-recommended from 12 months up.
      </p>
      <p className="w-[504px] pb-2 font-manrope text-xs font-medium leading-[18px] tracking-[0.48px] text-[#7D8488]">
        Why we love it:
      </p>
      <p className="w-[504px] pb-4 font-lora text-sm italic leading-[22px] tracking-[-0.084px] text-[#2F7D7E]">
        &quot;Encourages spatial reasoning, color sequencing, and open-ended creativity - all
        through the joy of self-directed play.&quot;
      </p>
      <div className="flex gap-[5px] pb-6">
        <BorderPill>Ages 12 mo+</BorderPill>
        <BorderPill>Open-ended</BorderPill>
      </div>
      <div className="h-[117.688px] w-[504px] pb-6">
        <Link
          href="/explore"
          className="flex h-12 w-fit items-center gap-[7px] rounded-full border border-[#ACCBcb] bg-linear-to-b from-[#2F7D7E]/60 to-[#2F7D7E] px-[29px] py-[13px] font-nunito text-sm font-semibold leading-5 tracking-[-0.084px] text-white shadow-[0_4px_16px_rgba(8,55,55,0.09)]"
        >
          Shop Now
          <AssetIcon name="icon2" size={14} />
        </Link>
        <p className="flex max-w-80 gap-[5px] pt-[9px] font-manrope text-xs leading-[18px] text-[#607077]">
          <span className="text-[12.8px] leading-[19.84px] text-[#ADB1AE]">ⓘ</span>
          This is an affiliate link — we may earn a small commission at no extra cost to you.
        </p>
      </div>
      <div className="h-[5px] w-[504px] border-t border-[#D8DDD9]" />
      <ExpandableRow
        emoji="🎁"
        label="Featured Freebie"
        value="FREE"
        valueClassName="bg-[#F6E6D4] text-[#C2917F]"
      />
      <div className="h-[5px] w-[504px] border-t border-[#D8DDD9]" />
      <ExpandableRow
        emoji="📄"
        label="Featured Resource"
        value="$8"
        valueClassName="bg-[#DCEEEE] text-[#7D8488]"
      />
    </div>
  );
}

function ToySpotlight() {
  return (
    <div className="absolute left-0 top-[851px] z-0 h-[1372px] w-full bg-[#F0F9FF] px-20 pb-40 pt-80">
      <div className="relative z-10 mx-auto w-[1462px]">
        <header className="flex h-[170px] items-end justify-between">
          <div className="flex h-[170px] w-[573px] flex-col items-start gap-4">
            <span className="rounded-xl border border-[#D4D6D7] bg-[#FFFDF8] px-2 py-1.5 font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#515B60]">
              OT-recommended
            </span>
            <h2 className="font-nunito text-5xl font-semibold leading-14 tracking-[-0.48px] text-[#263238]">
              Toy Spotlight
            </h2>
            <p className="w-[456px] font-manrope text-base leading-6 tracking-[-0.176px] text-[#515B60]">
              Handpicked toys that support real developmental goals — and actually get played with.
            </p>
          </div>
          <Link
            href="/explore"
            className="mb-0 inline-flex min-w-20 items-center justify-center gap-1 rounded-full border border-[#ADB1AE] px-3 py-2 font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-[#263238]"
          >
            <span className="px-1">View toy details</span>
            <AssetIcon name="vector" size={16} />
          </Link>
        </header>
        <div className="mt-20 flex h-[642px] w-full items-center gap-9 overflow-hidden rounded-[24px] bg-white shadow-[0_6px_40px_rgba(23,74,77,0.1)]">
          <ToyGallery />
          <ToyDetails />
        </div>
      </div>
    </div>
  );
}

function BeeDecoration() {
  return (
    <div className="absolute left-[51px] top-0 z-20 flex h-[168.182px] w-[162.403px] items-center justify-center">
      <div className="-scale-y-100 rotate-[173.66deg]">
        <div className="relative h-[152.949px] w-[146.407px] overflow-hidden">
          <Image
            src={`${assetBase}-image4.png`}
            alt=""
            width={214}
            height={240}
            sizes="147px"
            className="pointer-events-none absolute -left-[41.13px] -top-[23.35px] max-w-none"
          />
        </div>
      </div>
    </div>
  );
}

function DesktopFeaturedHomeContent() {
  return (
    <div className="relative mx-auto hidden h-[2223px] max-w-[1920px] min-[1600px]:block">
      <Image
        src={`${assetBase}-union.svg`}
        alt=""
        width={2140}
        height={495}
        className="pointer-events-none absolute left-[-72px] top-[584px] z-[2] max-w-none"
      />
      <Image
        src={`${assetBase}-image7.png`}
        alt=""
        width={497}
        height={495}
        className="pointer-events-none absolute left-[1491.93px] top-[710.998px] z-[1] object-cover"
      />
      <BeeDecoration />
      <FeaturedActivities />
      <ToySpotlight />
    </div>
  );
}

function ResponsiveFeaturedHomeContent() {
  return (
    <div className="min-[1600px]:hidden">
      <div className="relative overflow-hidden px-5 pb-28 pt-28 sm:px-8 sm:pt-36">
        <div className="mx-auto max-w-290">
          <div className="text-center">
            <span className="inline-flex rounded-xl border border-[#FAE1D9] bg-[#FCE9E3] px-2 py-1.5 font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#614840]">
              For your family
            </span>
            <h2 className="mt-4 font-nunito text-[clamp(34px,5vw,48px)] font-semibold leading-[1.16] tracking-[-0.48px] text-[#263238]">
              Featured activities
            </h2>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {activityCards.map((activity) => (
              <article
                key={activity.title}
                className="overflow-hidden rounded-[24px] border border-[#E9F1EE] bg-white"
              >
                <div className="relative aspect-[422/286] overflow-hidden bg-[#A5C7B9]">
                  <Image
                    src={activity.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 90vw, 45vw"
                    className="object-cover"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white px-[10px] py-[3px] font-nunito text-xs font-medium leading-4 text-[#174A4D]">
                    {activity.difficulty}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-nunito text-2xl font-medium leading-8 text-[#263238]">
                    {activity.title}
                  </h3>
                  <p className="mt-4 font-nunito text-xs font-medium leading-4 text-[#174A4D]">
                    Material: <span className="text-[#7D8488]">{activity.material}</span>
                  </p>
                  <div className="mt-3 flex flex-wrap gap-[5px]">
                    <ActivityPill>{activity.location}</ActivityPill>
                    <ActivityPill>{activity.age}</ActivityPill>
                    <ActivityPill>{activity.skill}</ActivityPill>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/explore"
              className="inline-flex items-center gap-1 rounded-full bg-[#263238] px-3 py-2 font-nunito text-base font-medium leading-6 text-white"
            >
              See all <AssetIcon name="vector1" size={16} />
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-[#F0F9FF] px-5 py-28 sm:px-8 sm:py-36">
        <div className="mx-auto max-w-290">
          <span className="inline-flex rounded-xl border border-[#D4D6D7] bg-[#FFFDF8] px-2 py-1.5 font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#515B60]">
            OT-recommended
          </span>
          <h2 className="mt-4 font-nunito text-[clamp(34px,5vw,48px)] font-semibold leading-[1.16] tracking-[-0.48px] text-[#263238]">
            Toy Spotlight
          </h2>
          <p className="mt-6 max-w-[456px] font-manrope text-base leading-6 tracking-[-0.176px] text-[#515B60]">
            Handpicked toys that support real developmental goals — and actually get played with.
          </p>
          <div className="mt-16 overflow-hidden rounded-[24px] bg-white shadow-[0_6px_40px_rgba(23,74,77,0.1)] lg:flex">
            <div className="relative aspect-[576/642] max-h-[642px] overflow-hidden bg-[#DCEEEE] lg:w-[576px]">
              <Image
                src={`${assetBase}-image137.png`}
                alt="Wooden rainbow arc stacker arranged in a train play scene"
                fill
                sizes="(max-width: 1024px) 100vw, 576px"
                className="object-cover"
              />
            </div>
            <div className="p-6 sm:p-9">
              <span className="rounded-full border border-[#D8DDD9] bg-[#F6E6D4] px-[15px] py-[6px] font-nunito text-xs font-medium leading-4 text-[#174A4D]">
                ✦ OT Recommended
              </span>
              <h3 className="mt-6 font-nunito text-[clamp(28px,4vw,32px)] font-medium leading-10 text-[#174A4D]">
                Grimm&apos;s Rainbow Arc Stacker
              </h3>
              <p className="mt-4 font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#515B60]">
                The Rainbow Arc Stacker builds spatial reasoning and colour recognition through
                open-ended play. Children naturally discover balance, sequencing, and
                cause-and-effect while creating freely. OT-recommended from 12 months up.
              </p>
              <p className="mt-4 font-lora text-sm italic leading-[22px] text-[#2F7D7E]">
                &quot;Encourages spatial reasoning, color sequencing, and open-ended creativity -
                all through the joy of self-directed play.&quot;
              </p>
              <div className="mt-6 flex gap-[5px]">
                <BorderPill>Ages 12 mo+</BorderPill>
                <BorderPill>Open-ended</BorderPill>
              </div>
              <Link
                href="/explore"
                className="mt-6 inline-flex h-12 items-center gap-[7px] rounded-full border border-[#ACCBcb] bg-linear-to-b from-[#2F7D7E]/60 to-[#2F7D7E] px-[29px] py-[13px] font-nunito text-sm font-semibold text-white"
              >
                Shop Now <AssetIcon name="icon2" size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeaturedHomeContent() {
  return (
    <section id="activities" className="relative overflow-hidden bg-[#FDFDFC] text-[#263238]">
      <DesktopFeaturedHomeContent />
      <ResponsiveFeaturedHomeContent />
    </section>
  );
}
