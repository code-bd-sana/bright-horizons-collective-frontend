import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';

const productLinks = [
  ['Activity library', '/explore'],
  ['Activities', '/explore'],
  ['Toy Spotlight', '/explore'],
  ['Membership', '/#membership'],
];

const companyLinks = [
  ['About', '/#about'],
  ['Blog', '/explore'],
  ['Contact', '/#contact'],
  ['Privacy Policy', '#'],
  ['Terms of Use', '#'],
  ['Affiliate Disclosure', '#'],
];

const footerMask: CSSProperties = {
  WebkitMaskImage: 'url(/Home/figma-home-1183-12076-img-image135.svg)',
  maskImage: 'url(/Home/figma-home-1183-12076-img-image135.svg)',
  WebkitMaskPosition: '-588.771px 106.292px',
  maskPosition: '-588.771px 106.292px',
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
  WebkitMaskSize: '4349.315px 2453.845px',
  maskSize: '4349.315px 2453.845px',
};

const socialLinks = [
  {
    label: 'Instagram',
    icon: '/Home/figma-home-1183-12076-img-vector14.svg',
    inset: 'inset-[9.38%]',
    bordered: false,
  },
  {
    label: 'LinkedIn',
    icon: '/Home/figma-home-1183-12076-img-vector15.svg',
    inset: 'inset-[9.38%]',
    bordered: true,
  },
  {
    label: 'Twitter',
    icon: '/Home/figma-home-1183-12076-img-vector16.svg',
    inset: 'inset-[15.62%_3.12%_9.38%_12.5%]',
    bordered: false,
  },
];

function FooterLogo() {
  return (
    <Link
      href="/"
      aria-label="Bright Horizons Collective"
      className="relative block h-[85px] w-[101px] overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
    >
      <Image
        src="/Home/figma-home-1183-12076-img-image1.png"
        alt="Bright Horizons Collective"
        fill
        sizes="101px"
        className="object-cover object-top"
      />
    </Link>
  );
}

function SocialLinks() {
  return (
    <div className="flex gap-3" aria-label="Social links">
      {socialLinks.map(({ label, icon, inset, bordered }) => (
        <Link
          key={label}
          href="#"
          aria-label={label}
          className={`flex size-10 items-center justify-center rounded-[50px] bg-[#FFFDF8] ${bordered ? 'border border-[#F6E6D4]' : ''}`}
        >
          <span className="relative size-5">
            <Image src={icon} alt="" fill sizes="20px" aria-hidden="true" className={inset} />
          </span>
        </Link>
      ))}
    </div>
  );
}

function FooterForm({ className = 'w-[384px]' }: { className?: string }) {
  return (
    <form action="#" className={`flex ${className} flex-col gap-2`}>
      <label
        htmlFor="footer-email"
        className="font-manrope text-sm font-medium leading-[22px] tracking-[0.84px] text-[#263238]"
      >
        Subscribe Newsletter
      </label>
      <div className="flex h-[42px] items-center gap-2">
        <input
          id="footer-email"
          type="email"
          placeholder="Email"
          className="h-full min-w-0 flex-1 rounded-full border border-[#E2E8F0] bg-white px-3 font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#263238] outline-none placeholder:text-[#64748B] focus:border-[#2F7D7E]"
        />
        <button
          type="submit"
          className="h-full min-w-20 rounded-full bg-[#F2B59F] px-4 font-nunito text-sm font-medium leading-5 tracking-[-0.084px] text-[#F8FAFC]"
        >
          Subscribe
        </button>
      </div>
    </form>
  );
}

function FooterMenu({ title, links, width }: { title: string; links: string[][]; width: string }) {
  return (
    <nav aria-label={`${title} links`} className={width}>
      <h2 className="font-manrope text-base font-medium leading-6 tracking-[0.96px] text-[#263238]">
        {title}
      </h2>
      <ul className="mt-[14px] font-manrope text-sm font-normal leading-9 tracking-[-0.084px] text-[#515B60]">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link href={href} className="transition-colors hover:text-[#2F7D7E]">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function FooterBackground() {
  return (
    <>
      <div
        aria-hidden="true"
        style={footerMask}
        className="pointer-events-none absolute -left-[205px] -top-[70px] h-[1537px] w-[2296px]"
      >
        <Image
          src="/Home/figma-home-1183-12076-img-image136.png"
          alt=""
          fill
          sizes="2296px"
          className="object-cover"
        />
      </div>
      <div className="pointer-events-none absolute left-[708px] top-[709px] flex size-[339.927px] items-center justify-center mix-blend-multiply">
        <div className="-scale-y-100 rotate-[-172.75deg]">
          <div className="relative size-[304px]">
            <Image
              src="/Home/figma-home-1183-12076-img-image3.png"
              alt=""
              fill
              sizes="304px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute left-[1575px] top-[497px] h-48 w-[390px] overflow-hidden">
        <Image
          src="/Home/figma-home-1183-12076-img-image29.png"
          alt=""
          fill
          sizes="390px"
          className="h-[202.45%] !w-full max-w-none object-cover object-top"
        />
      </div>
      <div className="pointer-events-none absolute left-[131px] top-[987px] h-[179px] w-[246px] overflow-hidden">
        <Image
          src="/Home/figma-home-1183-12076-img-image2.png"
          alt=""
          fill
          sizes="246px"
          className="h-[117.12%] !w-full max-w-none object-cover object-top"
        />
      </div>
      <p
        aria-hidden="true"
        className="pointer-events-none absolute -left-4 top-[1318px] whitespace-nowrap font-nunito text-[210px] font-extrabold leading-none tracking-[-0.08em] text-[#A7CCF8]"
      >
        Bright Horizons
      </p>
    </>
  );
}

function DesktopFooter() {
  return (
    <footer
      id="contact"
      className="relative hidden h-[1467px] overflow-hidden bg-[#FDFDFC] min-[1600px]:block"
      style={{
        backgroundImage:
          'linear-gradient(180deg, rgba(224, 242, 254, 0) 0%, rgb(224, 242, 254) 35.577%, rgb(224, 242, 254) 52.404%, rgb(224, 242, 254) 75.481%, rgb(224, 242, 254) 100%)',
      }}
    >
      <FooterBackground />
      <div className="absolute left-1/2 top-[292px] z-10 flex w-[1166px] -translate-x-1/2 items-start gap-40">
        <div className="flex w-[384px] flex-col gap-8">
          <div className="flex w-full flex-col gap-4">
            <FooterLogo />
            <p className="font-manrope text-sm font-normal leading-[22px] tracking-[-0.084px] text-[#515B60]">
              Personalized pediatric OT activities and weekly plans for families, created by a
              licensed occupational therapist.
            </p>
            <FooterForm />
          </div>
          <SocialLinks />
        </div>
        <div className="flex items-start gap-6">
          <FooterMenu title="Product" links={productLinks} width="w-[346px]" />
          <FooterMenu title="Company" links={companyLinks} width="w-[280px]" />
        </div>
      </div>
    </footer>
  );
}

function CompactFooter() {
  return (
    <footer
      id="contact-compact"
      className="relative overflow-hidden bg-[#FDFDFC] px-5 py-20 sm:px-8 sm:py-28 min-[1600px]:hidden"
      style={{
        backgroundImage:
          'linear-gradient(180deg, rgba(224, 242, 254, 0) 0%, rgb(224, 242, 254) 35.577%, rgb(224, 242, 254) 100%)',
      }}
    >
      <div className="relative z-10 mx-auto max-w-[760px]">
        <div className="grid gap-12 sm:grid-cols-2">
          <div className="flex flex-col gap-4">
            <FooterLogo />
            <p className="font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#515B60]">
              Personalized pediatric OT activities and weekly plans for families, created by a
              licensed occupational therapist.
            </p>
            <FooterForm className="w-full" />
            <SocialLinks />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <FooterMenu title="Product" links={productLinks} width="w-full" />
            <FooterMenu title="Company" links={companyLinks} width="w-full" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export function SiteFooter() {
  return (
    <>
      <DesktopFooter />
      <CompactFooter />
    </>
  );
}
