import Link from 'next/link';

const sections = [
  { id: 'introduction', title: 'Introduction' },
  { id: 'information-we-collect', title: 'Information We Collect' },
  { id: 'how-we-use-your-information', title: 'How We Use Your Information' },
  { id: 'sharing-your-information', title: 'Sharing Your Information' },
  { id: 'data-security', title: 'Data Security' },
  { id: 'your-rights', title: 'Your Rights' },
  { id: 'policy-updates', title: 'Policy Updates' },
  { id: 'contact-us', title: 'Contact Us' },
];

function PolicySection({
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

export function PrivacyPolicyPage() {
  return (
    <main className="bg-[#FFFDF8] pt-68 text-[#263238] max-lg:pt-40 max-md:pt-28 max-sm:pt-20">
      <header className="mx-auto flex max-w-3xl flex-col items-center gap-3 px-5 text-center max-sm:gap-2">
        <h1 className="font-nunito text-[40px] font-semibold leading-12 tracking-[-0.4px] max-md:text-4xl max-sm:text-3xl">
          Privacy Policy
        </h1>
        <p className="font-manrope text-base leading-6 tracking-[-0.176px] text-[#7D8488]">
          Last Updated: June 2026
        </p>
      </header>

      <div className="mx-auto mt-40 flex w-full max-w-291.5 items-start gap-20 px-8 pb-40 max-xl:gap-10 max-lg:mt-20 max-lg:flex-col max-lg:px-5 max-lg:pb-28 max-md:mt-12 max-sm:pb-16">
        <aside className="w-68.5 shrink-0 rounded-[20px] border border-[#E8EBE8] bg-white p-4.25 shadow-[0_2px_8px_rgba(198,202,209,0.22),0_2px_2px_rgba(198,202,209,0.1)] max-lg:w-full">
          <p className="font-manrope text-xs font-medium leading-4.5 tracking-[0.48px] text-[#7D8488]">
            Table of content
          </p>
          <nav aria-label="Privacy policy table of contents" className="mt-4 flex flex-col gap-1">
            {sections.map((section, index) => (
              <Link
                key={section.id}
                href={`#${section.id}`}
                className={`rounded-md p-1 font-nunito text-sm font-medium leading-5 tracking-[-0.084px] transition-colors ${index === 0 ? 'bg-[#E9F1EE] text-[#263238]' : 'text-[#7D8488] hover:bg-[#E9F1EE] hover:text-[#263238]'}`}
              >
                {section.title}
              </Link>
            ))}
          </nav>
        </aside>

        <article className="min-w-0 flex-1 space-y-8">
          <PolicySection id="introduction" title="Introduction">
            <p>
              At Bright Horizons Collective, we value your privacy and are committed to protecting
              your personal information. This Privacy Policy explains how we collect, use, and
              safeguard your data when you use our platform.
            </p>
          </PolicySection>

          <PolicySection id="information-we-collect" title="Information We Collect">
            <p>We may collect:</p>
            <ul className="mt-3 list-disc space-y-0 pl-6.75">
              <li>Name and email address</li>
              <li>Profile information</li>
              <li>Learning progress and certificates</li>
              <li>Workshop and event registrations</li>
              <li>Projects, comments, and community activity</li>
              <li>Payment information (processed securely by third-party providers)</li>
            </ul>
          </PolicySection>

          <PolicySection id="how-we-use-your-information" title="How We Use Your Information">
            <p>We use your information to:</p>
            <ul className="mt-3 list-disc space-y-0 pl-6.75">
              <li>Create and manage your account</li>
              <li>Deliver courses and workshops</li>
              <li>Track learning progress</li>
              <li>Issue certificates</li>
              <li>Improve platform performance</li>
              <li>Provide customer support</li>
              <li>Send important updates and notifications</li>
            </ul>
          </PolicySection>

          <PolicySection id="sharing-your-information" title="Sharing Your Information">
            <p>
              We do not sell your personal information. We only share data with trusted service
              providers when necessary to deliver our services or comply with legal requirements.
            </p>
          </PolicySection>

          <PolicySection id="data-security" title="Data Security">
            <p>
              We use industry-standard security measures to protect your personal information. While
              we strive to keep your data safe, no online platform can guarantee absolute security.
            </p>
          </PolicySection>

          <PolicySection id="your-rights" title="Your Rights">
            <p>
              You can access, update, or request deletion of your personal information at any time
              through your account settings or by contacting our support team.
            </p>
          </PolicySection>

          <PolicySection id="policy-updates" title="Policy Updates">
            <p>
              This Privacy Policy may be updated periodically. Any significant changes will be
              posted on this page with the latest revision date.
            </p>
          </PolicySection>

          <PolicySection id="contact-us" title="Contact Us">
            <p>If you have any questions about this Privacy Policy, please contact us:</p>
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
          </PolicySection>
        </article>
      </div>
    </main>
  );
}

export default PrivacyPolicyPage;
