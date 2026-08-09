import type { Metadata } from 'next';

import { ReviewSubmitPage } from '@/components/review-submit/review-submit-page';
import { constructMetadata } from '@/lib/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'Review & Submit | Bright Horizons Collective',
  description: 'Review your Bright Horizons Collective intake before submitting it to our team.',
});

export default function ReviewSubmitRoute() {
  return <ReviewSubmitPage />;
}
