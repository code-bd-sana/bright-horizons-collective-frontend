import Link from 'next/link';

const sections = [
  ['medical-emergency', 'Medical Emergency'],
  ['educational-purpose', 'Educational Purpose'],
  ['not-medical-advice', 'Not Medical Advice'],
  ['consult-professionals', 'Consult Healthcare Professionals'],
  ['individual-differences', 'Individual Differences'],
  ['use-at-your-discretion', 'Use at Your Own Discretion'],
  ['contact-us', 'Contact Us'],
] as const;

function DisclaimerSection({
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

export function MedicalDisclaimerPage() {
  return (
    <main className="bg-[#FFFDF8] pt-68 text-[#263238] max-lg:pt-40 max-md:pt-28 max-sm:pt-20">
      <header className="mx-auto flex max-w-3xl flex-col items-center gap-3 px-5 text-center max-sm:gap-2">
        <h1 className="font-nunito text-[40px] font-semibold leading-12 tracking-[-0.4px] max-md:text-4xl max-sm:text-3xl">
          Medical Disclaimer
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
            aria-label="Medical disclaimer table of contents"
            className="mt-4 flex flex-col gap-1"
          >
            {sections.map(([id, title], index) => (
              <Link
                key={id}
                href={`#${id}`}
                className={`rounded-md p-1 font-nunito text-sm font-medium leading-5 tracking-[-0.084px] ${index === 0 ? 'bg-[#E9F1EE] text-[#263238]' : 'text-[#7D8488] hover:bg-[#E9F1EE] hover:text-[#263238]'}`}
              >
                {title}
              </Link>
            ))}
          </nav>
        </aside>
        <article className="min-w-0 flex-1 space-y-8">
          <section id="medical-emergency" className="scroll-mt-32 rounded-xl bg-[#FEE2E2] p-4">
            <h2 className="font-nunito text-2xl font-medium leading-8 text-[#263238]">
              Medical Emergency
            </h2>
            <p className="mt-3 font-manrope text-lg leading-6.75 tracking-[-0.27px] text-[#515B60]">
              If you think you or your child may have a medical emergency, call your doctor, go to
              the nearest hospital emergency department, or call emergency services immediately. Do
              not rely on electronic communications or information provided by Bright Horizons
              Collective for immediate, urgent medical needs.
            </p>
          </section>
          <DisclaimerSection id="educational-purpose" title="Educational Purpose">
            <p>
              Bright Horizons Collective provides pediatric occupational therapy resources,
              articles, tools, and general information. These materials are created to educate
              parents, caregivers, and professionals. They are designed to support general knowledge
              and understanding of child development and are not a substitute for formal clinical
              training or personalized therapeutic intervention.
            </p>
          </DisclaimerSection>
          <DisclaimerSection id="not-medical-advice" title="Not Medical Advice">
            <p>
              We are committed to providing honest and helpful information. We only recommend
              products or services that we believe provide genuine value for children and families.
              Recommendations are never made solely for the purpose of earning a commission.
            </p>
          </DisclaimerSection>
          <DisclaimerSection id="consult-professionals" title="Consult Healthcare Professionals">
            <p>
              Always seek the advice of your pediatrician, a qualified occupational therapist, or
              other qualified health provider with any questions you may have regarding a medical
              condition or developmental concern. A formal evaluation by a licensed professional in
              your area is the only way to accurately diagnose and create an appropriate treatment
              plan for a child.
            </p>
          </DisclaimerSection>
          <DisclaimerSection id="individual-differences" title="Individual Differences">
            <p>
              Every child is unique, and developmental trajectories vary significantly. Strategies,
              exercises, or developmental milestones discussed in our resources may not be
              applicable or appropriate for every individual. What works for one child may not work
              for another, and applying generalized advice without professional supervision can be
              ineffective or potentially harmful.
            </p>
          </DisclaimerSection>
          <DisclaimerSection id="use-at-your-discretion" title="Use at Your Own Discretion">
            <p>
              By using our website and resources, you acknowledge that you are responsible for your
              own health decisions and the decisions you make regarding a child in your care. Bright
              Horizons Collective, its authors, and contributors are not liable for any damages or
              negative consequences arising from any action, application, or preparation to any
              person reading or following the information offered on this site.
            </p>
          </DisclaimerSection>
          <DisclaimerSection id="contact-us" title="Contact Us">
            <p>
              If you have questions about our educational resources or this disclaimer, please
              contact us:
            </p>
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
          </DisclaimerSection>
        </article>
      </div>
    </main>
  );
}

export default MedicalDisclaimerPage;
