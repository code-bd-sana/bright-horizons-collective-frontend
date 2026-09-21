import type { Metadata } from 'next';
import { PaymentErrorPage } from '@/components/payment/payment-error-page';
import { constructMetadata } from '@/lib/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'Payment Error | Bright Horizons Collective',
  description: 'An issue occurred during payment processing. Please try again or contact support.',
});

export default function PaymentErrorRoute() {
  return <PaymentErrorPage />;
}
