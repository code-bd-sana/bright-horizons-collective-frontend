import type { Metadata } from 'next';

import { MembershipPage } from '@/components/membership/membership-page';
import { constructMetadata } from '@/lib/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'Membership | Bright Horizons Collective',
  description:
    'Choose a Bright Horizons Collective membership with developmental activities, parent resources, and personalized weekly support.',
});

export default function MembershipRoute() {
  return <MembershipPage />;
}
