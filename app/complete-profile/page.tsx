import type { Metadata } from 'next';

import { CompleteProfilePage } from '@/components/complete-profile/complete-profile-page';
import { constructMetadata } from '@/lib/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'Complete Profile | Bright Horizons Collective',
  description: 'Tell Bright Horizons Collective about your child to personalize their experience.',
});

export default function CompleteProfileRoute() {
  return <CompleteProfilePage />;
}
