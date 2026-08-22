'use client';

// Settings feature entry point.
import { AccountPanel } from './account-panel';
import { LegalPanel } from './legal-panel';
import { MembershipBillingPanel } from './membership-billing-panel';
import { NotificationsPanel } from './notifications-panel';
import { SecurityPanel } from './security-panel';
import { SettingsSidebar } from './settings-sidebar';
import type { SettingsSection } from './settings-types';
import { useState } from 'react';

function ActiveSettingsPanel({ section }: { section: SettingsSection }) {
  switch (section) {
    case 'account':
      return <AccountPanel />;
    case 'billing':
      return <MembershipBillingPanel />;
    case 'security':
      return <SecurityPanel />;
    case 'notifications':
      return <NotificationsPanel />;
    case 'legal':
      return <LegalPanel />;
  }
}

export function SettingsPage() {
  const [activeSection, setActiveSection] = useState<SettingsSection>('account');

  return (
    <section className="-mt-3 mx-auto w-full max-w-343.5 pb-8 text-[#263238]">
      <header>
        <h1 className="font-nunito text-[32px] font-medium leading-10 tracking-[-0.16px]">
          Settings & Account Management
        </h1>
        <p className="mt-1 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#7d8488]">
          Manage your parent account, security, notification preferences, membership, support, and
          legal terms.
        </p>
      </header>
      <div className="mt-10 grid items-start gap-6 xl:grid-cols-[286px_minmax(0,1fr)]">
        <SettingsSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        <div>
          <ActiveSettingsPanel section={activeSection} />
        </div>
      </div>
    </section>
  );
}
