import Image from 'next/image';
import Link from 'next/link';

const assetBase = '/Home/figma-home-1183-11479-img';

type Resource = {
  title: string;
  duration: string;
  description: string;
  image: string;
  imageClassName: string;
  maskPosition: string;
  descriptionWidth: string;
};

const resources: Resource[] = [
  {
    title: 'Parent Education',
    duration: '5 min Read',
    description: 'OT-written articles on development, play, and everyday strategies',
    image: `${assetBase}-image124.png`,
    imageClassName: 'left-[74px] top-[-51px] h-[403px] w-[294px]',
    maskPosition: '19.221px 68.953px',
    descriptionWidth: 'w-[240px]',
  },
  {
    title: 'Milestones',
    duration: '8 min guide',
    description: 'Age-by-age developmental milestones with guidance on what to watch for',
    image: `${assetBase}-image125.png`,
    imageClassName: 'left-[90px] top-0 h-[290px] w-[273px]',
    maskPosition: '3.221px 17.953px',
    descriptionWidth: 'w-[248px]',
  },
  {
    title: 'Printable',
    duration: '15 min activity',
    description: 'Downloadable activity cards, visual schedules, and tracking sheets',
    image: `${assetBase}-image126.png`,
    imageClassName: 'left-[88px] top-[-10px] h-[410px] w-[273px]',
    maskPosition: '5.221px 27.953px',
    descriptionWidth: 'w-[240px]',
  },
  {
    title: 'Guides',
    duration: '10 min guide',
    description: 'In-depth guides covering sleep, feeding, sensory, and transitions',
    image: `${assetBase}-image127.png`,
    imageClassName: 'left-[91px] top-[-67px] h-[474px] w-[259px]',
    maskPosition: '2.221px 84.953px',
    descriptionWidth: 'w-[240px]',
  },
];

function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <article className="relative h-[460px] w-[422px] overflow-hidden rounded-3xl border border-[#E9F1EE] bg-white">
      <div className="absolute inset-x-0 top-0 h-[290px] overflow-hidden rounded-3xl bg-[#E0E7FF]">
        <div
          className={`absolute ${resource.imageClassName}`}
          style={{
            maskImage: `url('${assetBase}-image123.svg')`,
            maskPosition: resource.maskPosition,
            maskRepeat: 'no-repeat',
            maskSize: '255.559px 245.637px',
            WebkitMaskImage: `url('${assetBase}-image123.svg')`,
            WebkitMaskPosition: resource.maskPosition,
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskSize: '255.559px 245.637px',
          }}
        >
          <Image src={resource.image} alt="" fill sizes="422px" className="object-cover" />
        </div>
      </div>

      <div className="absolute left-[15px] top-[321px] flex w-[390px] flex-col gap-3">
        <div className="flex items-start justify-between">
          <h3 className="font-nunito text-xl leading-7 font-medium tracking-[-0.2px] text-[#263238]">
            {resource.title}
          </h3>
          <span className="pt-0.5 font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#7D8488]">
            {resource.duration}
          </span>
        </div>

        <p
          className={`font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#7D8488] ${resource.descriptionWidth}`}
        >
          {resource.description}
        </p>

        <Link
          href="/explore"
          className="flex w-fit items-center gap-1 font-manrope text-xs leading-[18px] font-semibold tracking-[0.48px] text-[#2F7D7E]"
        >
          Explore
          <Image
            src={`${assetBase}-vector.svg`}
            alt=""
            width={14}
            height={14}
            className="size-3.5"
          />
        </Link>
      </div>
    </article>
  );
}

function ResourcesHeading() {
  return (
    <header className="flex flex-col items-center text-center">
      <span className="rounded-xl border border-[#FAE1D9] bg-[#FCE9E3] px-2 py-1.5 font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#614840]">
        For parents
      </span>
      <h2 className="mt-4 w-[573px] font-nunito text-5xl leading-14 font-semibold tracking-[-0.48px] text-[#263238]">
        Resources for parents
      </h2>
    </header>
  );
}

function SeeAllLink() {
  return (
    <Link
      href="/explore"
      className="inline-flex min-w-20 items-center justify-center gap-1 rounded-full bg-[#263238] px-3 py-2 font-nunito text-base leading-6 font-medium tracking-[-0.176px] text-white"
    >
      See all
      <Image src={`${assetBase}-vector1.svg`} alt="" width={16} height={16} className="size-4" />
    </Link>
  );
}

export function ParentResourcesSection() {
  return (
    <section className="bg-[#FDFDFC]">
      <div className="relative mx-auto hidden h-[886px] max-w-[1920px] min-[1600px]:block">
        <div className="absolute left-1/2 top-40 w-[1760px] -translate-x-1/2">
          <ResourcesHeading />
          <div className="mt-20 flex gap-6">
            {resources.map((resource) => (
              <ResourceCard key={resource.title} resource={resource} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <SeeAllLink />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[898px] px-5 py-24 min-[1600px]:hidden sm:px-8 sm:py-32">
        <ResourcesHeading />
        <div className="mt-16 grid justify-items-center gap-6 sm:grid-cols-2">
          {resources.map((resource) => (
            <ResourceCard key={resource.title} resource={resource} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <SeeAllLink />
        </div>
      </div>
    </section>
  );
}
