import { ArrowLeft, CircleAlert, Crown } from 'lucide-react';
import Link from 'next/link';

type MembershipPlan = {
  name: string;
  price: string;
  activeMembers: string;
  features: string[];
  theme: 'littleSteps' | 'growTogether' | 'personalizedPathways';
  premium?: boolean;
};

const membershipPlans: MembershipPlan[] = [
  {
    name: 'Little Steps',
    price: 'Free',
    activeMembers: '3 active members',
    features: [
      'Access to Little Steps activity library',
      'Basic weekly plan templates',
      'Progress tracking (limited)',
      'Community resource articles',
    ],
    theme: 'littleSteps',
  },
  {
    name: 'Grow Together',
    price: '$29 / month',
    activeMembers: '3 active members',
    features: [
      'Full activity library (all categories)',
      'Unlimited weekly plan assignments',
      'Progress tracking + milestone reports',
      'Caregiver guidance & therapist tips',
      'Priority parent messaging',
    ],
    theme: 'growTogether',
  },
  {
    name: 'Personalized Pathways',
    price: '$79 / month',
    activeMembers: '2 active members',
    features: [
      'Everything in Grow Together',
      'Individually therapist-curated plans',
      '1-on-1 therapist check-ins',
      'Detailed developmental assessments',
      'Custom goal setting per child',
      'Exclusive specialist resources',
    ],
    theme: 'personalizedPathways',
    premium: true,
  },
];

const planThemes = {
  littleSteps: {
    card: 'border-[#e7eceb] p-px',
    header: 'h-33 bg-[#edf6f2]',
    badge: 'bg-[#edf6f2] text-[#2f7d7e]',
    price: 'text-[#2f7d7e]',
    dot: 'bg-[rgba(47,125,126,0.13)] [&>span]:bg-[#2f7d7e]',
    primary: 'bg-[#2f7d7e] hover:bg-[#266b6c]',
  },
  growTogether: {
    card: 'border-[#e7eceb] p-px',
    header: 'h-33 bg-[#dcefe7]',
    badge: 'bg-[#dcefe7] text-[#2f7d7e]',
    price: 'text-[#2f7d7e]',
    dot: 'bg-[rgba(47,125,126,0.13)] [&>span]:bg-[#2f7d7e]',
    primary: 'bg-[#2f7d7e] hover:bg-[#266b6c]',
  },
  personalizedPathways: {
    card: 'border-2 border-[rgba(160,90,58,0.25)] p-0.5',
    header: 'h-40.25 bg-[#fce9e2]',
    badge: 'bg-[#fce9e2] text-[#a05a3a]',
    price: 'text-[#a05a3a]',
    dot: 'bg-[rgba(160,90,58,0.13)] [&>span]:bg-[#a05a3a]',
    primary: 'bg-[#a05a3a] hover:bg-[#8e4d30]',
  },
} as const;

function PlanFeatureList({ plan }: { plan: MembershipPlan }) {
  const theme = planThemes[plan.theme];

  return (
    <div>
      <h2 className="font-manrope text-[11px] font-semibold leading-[16.5px] tracking-[0.55px] text-[#607d8b] uppercase">
        Included Features
      </h2>
      <ul className="mt-2.5 space-y-2.5">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <span
              className={`mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full ${theme.dot}`}
            >
              <span className="size-1.5 rounded-full" />
            </span>
            <span className="font-manrope text-[13px] leading-[19.5px] text-[#263238]">
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MembershipPlanCard({ plan }: { plan: MembershipPlan }) {
  const theme = planThemes[plan.theme];
  const planSlug = plan.name.toLowerCase().replaceAll(' ', '-');

  return (
    <article
      className={`flex h-131 flex-col overflow-hidden rounded-2xl border bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)] ${theme.card}`}
    >
      <header className={`shrink-0 px-6 pt-6 pb-5 ${theme.header}`}>
        {plan.premium && (
          <p className="flex items-center gap-1 pb-3 font-manrope text-[11px] font-bold leading-[16.5px] tracking-[0.55px] text-[#a05a3a] uppercase">
            <Crown aria-hidden="true" size={12} strokeWidth={1.7} />
            Premium
          </p>
        )}
        <span
          className={`inline-flex rounded-full px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 ${theme.badge}`}
        >
          {plan.name}
        </span>
        <p className={`mt-3 font-nunito text-[28px] font-bold leading-7 ${theme.price}`}>
          {plan.price}
        </p>
        <p className="mt-1 font-manrope text-[13px] leading-[19.5px] text-[#607d8b]">
          {plan.activeMembers}
        </p>
      </header>

      <div className="flex min-h-0 flex-1 flex-col px-6 pt-5 pb-6">
        <PlanFeatureList plan={plan} />
        <div className="mt-auto border-t border-[#e7eceb] pt-4.25">
          <Link
            href={`/dashboard/admin/memberships/member-directory?plan=${planSlug}`}
            className={`flex h-10 items-center justify-center rounded-[14px] font-manrope text-sm font-semibold leading-5 text-white transition-colors ${theme.primary}`}
          >
            View Members
          </Link>
          <button
            type="button"
            disabled
            className="mt-2 flex h-10.5 w-full items-center justify-center rounded-[14px] border border-[#e7eceb] bg-white font-manrope text-sm font-semibold leading-5 text-[#607d8b] disabled:cursor-default disabled:opacity-100"
          >
            Edit Plan
          </button>
        </div>
      </div>
    </article>
  );
}

export function ManageMembershipPlansPage() {
  return (
    <section className="mx-auto w-full max-w-383.5 pb-8 text-[#263238]">
      <Link
        href="/dashboard/admin/memberships"
        className="inline-flex items-center gap-1.5 font-manrope text-sm font-medium leading-5 text-[#607d8b] transition-colors hover:text-[#2f7d7e]"
      >
        <ArrowLeft aria-hidden="true" size={16} strokeWidth={1.6} />
        Back to Memberships
      </Link>

      <header className="mt-6">
        <h1 className="font-nunito text-2xl font-bold leading-9 text-[#263238]">
          Membership Plans
        </h1>
        <p className="pt-0.5 font-manrope text-sm leading-5.25 text-[#607d8b]">
          The three membership tiers and their included benefits.
        </p>
        <div className="mt-2 flex min-h-10 w-full max-w-fit items-center gap-2 rounded-[14px] border border-[rgba(246,195,68,0.19)] bg-[#fff8e1] px-4.25 py-2.75 text-[#b8860b]">
          <CircleAlert aria-hidden="true" size={13} strokeWidth={1.8} />
          <p className="font-manrope text-xs leading-4.5">
            <strong className="font-bold">Note:</strong> Plan editing (features, pricing) is out of
            scope for this MVP — this page is informational display only. Confirm before enabling
            &quot;Edit Plan&quot; functionality.
          </p>
        </div>
      </header>

      <div className="mt-6 grid max-w-378 gap-6 lg:grid-cols-3">
        {membershipPlans.map((plan) => (
          <MembershipPlanCard key={plan.name} plan={plan} />
        ))}
      </div>
    </section>
  );
}
