import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { AboutFinalCtaSection } from '@/components/about/about-final-cta-section';

describe('AboutFinalCtaSection', () => {
  it('renders the CTA content and registration link', () => {
    render(<AboutFinalCtaSection />);

    expect(
      screen.getByRole('heading', { name: "Your child's plan is one step away." })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Start your plan' })).toHaveAttribute(
      'href',
      '/register'
    );
  });
});
