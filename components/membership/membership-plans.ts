export type MembershipPlan = {
  name: string;
  description: string;
  action: string;
  featuresHeading?: string;
  features: string[];
  monthlyPrice?: number;
  annualPrice?: number;
  annualRegularPrice?: number;
  popular?: boolean;
};

export const membershipPlans: MembershipPlan[] = [
  {
    name: 'Little Steps',
    description: 'Perfect for exploring Bright Horizons Collective.',
    action: 'Start Free',
    features: [
      'Selected activities',
      'Selected parent resources',
      'Therapy Toy Spotlights',
      'Weekly plan preview',
      'Limited downloads',
      '7-day premium trial',
    ],
  },
  {
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
    annualPrice: 150,
    annualRegularPrice: 180,
    popular: true,
  },
  {
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
    annualPrice: 375,
    annualRegularPrice: 480,
  },
];
