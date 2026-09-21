export type MembershipTier = 'LITTLE_STEPS' | 'GROW_TOGETHER' | 'PERSONALIZED_PATHWAYS';

export const TIER_RANKS: Record<MembershipTier, number> = {
  LITTLE_STEPS: 1,
  GROW_TOGETHER: 2,
  PERSONALIZED_PATHWAYS: 3,
};

export type MembershipPlan = {
  id?: string;
  tier?: MembershipTier;
  name: string;
  description: string;
  action: string;
  featuresHeading?: string;
  features: string[];
  price?: number;
  monthlyPrice?: number;
  monthlyDiscount?: number;
  annualPrice?: number;
  annualDiscount?: number;
  annualRegularPrice?: number;
  effectiveMonthlyPrice?: number;
  effectiveAnnualPrice?: number;
  popular?: boolean;
  isPopular?: boolean;
  isActive?: boolean;
  activeMembersCount?: number;
};

export const membershipPlans: MembershipPlan[] = [
  {
    tier: 'LITTLE_STEPS',
    name: 'Little Steps',
    description: 'Perfect for exploring Bright Horizons Collective.',
    action: 'Start Free',
    featuresHeading: undefined,
    features: [
      'Selected activities',
      'Selected parent resources',
      'Therapy Toy Spotlights',
      'Weekly plan preview',
      'Limited downloads',
      '7-day premium trial',
    ],
    monthlyPrice: 0,
    monthlyDiscount: 0,
    annualPrice: 0,
    annualDiscount: 0,
    effectiveMonthlyPrice: 0,
    effectiveAnnualPrice: 0,
    popular: false,
    isPopular: false,
  },
  {
    tier: 'GROW_TOGETHER',
    name: 'Grow Together',
    description: 'Perfect for families wanting additional developmental support.',
    action: 'Choose Grow Together',
    featuresHeading: 'Everything in Little Steps, plus:',
    features: [
      'Full Explore Library',
      'Parent Resources',
      'Save favorites',
      'Five developmental questions each month',
    ],
    monthlyPrice: 15,
    monthlyDiscount: 0,
    annualPrice: 180,
    annualDiscount: 20,
    annualRegularPrice: 180,
    effectiveMonthlyPrice: 15,
    effectiveAnnualPrice: 144,
    popular: true,
    isPopular: true,
  },
  {
    tier: 'PERSONALIZED_PATHWAYS',
    name: 'Personalized Pathways',
    description: 'Our most personalized experience.',
    action: 'Choose Personalized Pathways',
    featuresHeading: 'Includes everything in Grow Together plus',
    features: [
      'Personalized weekly plans',
      'Child-specific recommendations',
      'Progress tracking',
      'Parent feedback',
      'Premium resources',
      'Priority support',
    ],
    monthlyPrice: 40,
    monthlyDiscount: 0,
    annualPrice: 480,
    annualDiscount: 20,
    annualRegularPrice: 480,
    effectiveMonthlyPrice: 40,
    effectiveAnnualPrice: 384,
    popular: false,
    isPopular: false,
  },
];
