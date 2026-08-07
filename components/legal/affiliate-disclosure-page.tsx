import Link from 'next/link';

const sections = [
  ['affiliate-links', 'What Are Affiliate Links?'],
  ['no-extra-cost', 'No Extra Cost'],
  ['commitment', 'Our Commitment'],
  ['editorial-independence', 'Editorial Independence'],
  ['contact-us', 'Contact Us'],
] as const;

function DisclosureSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-32">
      <h2 className="font-nunito text-2xl font-medium leading-8 text-[#263238]">{title}</h2>
      <div className="mt-3 font-manrope text-lg leading-6.75 tracking-[-0.27px] text-[#515B60]">
        {children}
      </div>
    </section>
  );
}

export function AffiliateDisclosurePage() {
  return (
    <main className="bg-[#FFFDF8] pt-68 text-[#263238] max-lg:pt-40 max-md:pt-28 max-sm:pt-20">
      <header className="mx-auto flex max-w-3xl flex-col items-center gap-3 px-5 text-center max-sm:gap-2">
        <h1 className="font-nunito text-[40px] font-semibold leading-12 tracking-[-0.4px] max-md:text-4xl max-sm:text-3xl">
          Affiliate Disclosure
        </h1>
        <p className="font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#7D8488]">
          At Bright Horizons Collective, transparency is important to us. This page explains how
          affiliate links may be used throughout our website.
        </p>
      </header>

      <div className="mx-auto mt-40 flex w-full max-w-291.5 items-start gap-20 px-8 pb-40 max-xl:gap-10 max-lg:mt-20 max-lg:flex-col max-lg:px-5 max-lg:pb-28 max-md:mt-12 max-sm:pb-16">
        <aside className="w-68.75 shrink-0 rounded-[20px] border border-[#EDEEF0] bg-white p-4.25 shadow-[0_2px_8px_rgba(198,202,209,0.22),0_2px_2px_rgba(198,202,209,0.1)] max-lg:w-full">
          <p className="font-manrope text-xs font-medium leading-4.5 tracking-[0.48px] text-[#7D8488]">
            Table of content
          </p>
          <nav
            aria-label="Affiliate disclosure table of contents"
            className="mt-4 flex flex-col gap-1"
          >
            {sections.map(([id, title], index) => (
              <Link
                key={id}
                href={`#${id}`}
                className={`rounded-md p-1 font-nunito text-sm font-medium leading-5 tracking-[-0.084px] transition-colors ${index === 0 ? 'bg-[#E9F1EE] text-[#263238]' : 'text-[#7D8488] hover:bg-[#E9F1EE] hover:text-[#263238]'}`}
              >
                {title}
              </Link>
            ))}
          </nav>
        </aside>

        <article className="min-w-0 flex-1 space-y-8">
          <DisclosureSection id="affiliate-links" title="What Are Affiliate Links?">
            <p>
              Some links on our website may be affiliate links. This means that if you click on the
              link and make a purchase, Bright Horizons Collective may earn a small commission from
              the retailer at no additional cost to you.
            </p>
          </DisclosureSection>
          <DisclosureSection id="no-extra-cost" title="No Extra Cost">
            <p>
              Using an affiliate link does not increase the purchase price for you. The price you
              pay is the same whether you use our affiliate link or go directly to the vendor&apos;s
              website.
            </p>
          </DisclosureSection>
          <DisclosureSection id="commitment" title="Our Commitment">
            <p>
              We are committed to providing honest and helpful information. We only recommend
              products or services that we believe provide genuine value for children and families.
              Recommendations are never made solely for the purpose of earning a commission.
            </p>
          </DisclosureSection>
          <DisclosureSection id="editorial-independence" title="Editorial Independence">
            <p>
              Our educational content and recommendations remain entirely independent. They are
              based on our clinical expertise, professional judgment, and extensive experience in
              early childhood development, uninfluenced by potential affiliate relationships.
            </p>
          </DisclosureSection>
          <DisclosureSection id="contact-us" title="Contact Us">
            <p>If you have any questions regarding this disclosure, please contact us:</p>
            <p>
              Email:{' '}
              <a
                href="mailto:support@brighthorizonscollective.com"
                className="text-[#263238] underline"
              >
                support@brighthorizonscollective.com
              </a>
            </p>
            <p>Thank you for trusting Bright Horizons Collective as your developmental growth.</p>
          </DisclosureSection>
        </article>
      </div>
    </main>
  );
}

export default AffiliateDisclosurePage;
