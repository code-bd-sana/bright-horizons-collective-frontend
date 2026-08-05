import Link from 'next/link';

const sections = [
  ['introduction', 'Introduction'],
  ['acceptance-of-terms', 'Acceptance of Terms'],
  ['user-accounts', 'User Accounts'],
  ['acceptable-use', 'Acceptable Use'],
  ['user-content', 'User Content'],
  ['courses-certificates', 'Courses & Certificates'],
  ['payments-donations', 'Payments & Donations'],
  ['intellectual-property', 'Intellectual Property'],
  ['account-suspension', 'Account Suspension'],
  ['limitation-of-liability', 'Limitation of Liability'],
  ['changes-to-terms', 'Changes to These Terms'],
  ['contact-us', 'Contact Us'],
] as const;

function TermsSection({
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

export function TermsMembershipPage() {
  return (
    <main className="bg-[#FFFDF8] pt-68 text-[#263238] max-lg:pt-40">
      <header className="mx-auto flex flex-col items-center gap-3 text-center">
        <h1 className="whitespace-nowrap font-nunito text-[40px] font-semibold leading-12 tracking-[-0.4px] max-md:whitespace-normal max-md:text-[34px]">
          Terms &amp; Membership Agreement
        </h1>
        <p className="font-manrope text-base leading-6 tracking-[-0.176px] text-[#7D8488]">
          Last Updated: June 2026
        </p>
      </header>

      <div className="mx-auto mt-40 flex w-291.5 items-start gap-20 pb-120 max-xl:w-[calc(100%-64px)] max-xl:gap-10 max-lg:mt-20 max-lg:flex-col max-lg:px-5 max-lg:pb-28 max-md:w-full">
        <aside className="w-68.75 shrink-0 rounded-[20px] border border-[#EDEEF0] bg-white p-4.25 shadow-[0_2px_8px_rgba(198,202,209,0.22),0_2px_2px_rgba(198,202,209,0.1)] max-lg:w-full">
          <p className="font-manrope text-xs font-medium leading-4.5 tracking-[0.48px] text-[#7D8488]">
            Table of content
          </p>
          <nav aria-label="Terms table of contents" className="mt-4 flex flex-col gap-1">
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
          <TermsSection id="introduction" title="Introduction">
            <p>
              Welcome to Bright Horizons Collective. By accessing or using our platform, you agree
              to comply with these Terms of Use. Please read them carefully before using our
              services.
            </p>
          </TermsSection>
          <TermsSection id="acceptance-of-terms" title="Acceptance of Terms">
            <p>
              By creating an account or using Bright Horizons Collective, you agree to follow these
              Terms of Use and all applicable laws and regulations.
            </p>
          </TermsSection>
          <TermsSection id="user-accounts" title="User Accounts">
            <p>
              You are responsible for maintaining the security of your account and ensuring that the
              information you provide is accurate and up to date.
            </p>
          </TermsSection>
          <TermsSection id="acceptable-use" title="Acceptable Use">
            <p>You agree to use the platform responsibly. You must not:</p>
            <ul className="mt-3 list-disc space-y-0 pl-6.75">
              <li>Share false or misleading information</li>
              <li>Upload illegal, harmful, or offensive content</li>
              <li>Infringe on the intellectual property rights of others</li>
              <li>Attempt to disrupt or misuse the platform</li>
              <li>Access another user&apos;s account without permission</li>
            </ul>
          </TermsSection>
          <TermsSection id="user-content" title="User Content">
            <p>
              You retain ownership of the projects, comments, and other content you submit. By
              publishing content, you grant Bright Horizons Collective permission to display it
              within the platform for learning and community engagement.
            </p>
          </TermsSection>
          <TermsSection id="courses-certificates" title="Courses & Certificates">
            <p>
              Course completion, assessments, workshops, and certificates are provided for
              educational purposes. Certificates are awarded only after successfully meeting the
              required completion criteria.
            </p>
          </TermsSection>
          <TermsSection id="payments-donations" title="Payments & Donations">
            <p>
              Paid services and donations are processed through secure third-party payment
              providers. Unless otherwise stated, donations are voluntary and non-refundable.
            </p>
          </TermsSection>
          <TermsSection id="intellectual-property" title="Intellectual Property">
            <p>
              All platform content, including logos, branding, text, graphics, and learning
              materials, is the property of Creative Talkies or its content partners and may not be
              copied or distributed without permission.
            </p>
          </TermsSection>
          <TermsSection id="account-suspension" title="Account Suspension">
            <p>
              We reserve the right to suspend or terminate accounts that violate these Terms of Use
              or engage in activities that may harm the platform or its community.
            </p>
          </TermsSection>
          <TermsSection id="limitation-of-liability" title="Limitation of Liability">
            <p>
              We reserve the right to suspend or terminate accounts that violate these Terms of Use
              or engage in activities that may harm the platform or its community.
            </p>
          </TermsSection>
          <TermsSection id="changes-to-terms" title="Changes to These Terms">
            <p>
              We may update these Terms of Use from time to time. Continued use of the platform
              after changes are published constitutes acceptance of the revised terms.
            </p>
          </TermsSection>
          <TermsSection id="contact-us" title="Contact Us">
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
          </TermsSection>
        </article>
      </div>
    </main>
  );
}

export default TermsMembershipPage;
