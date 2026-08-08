import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { AboutFaqSection } from '@/components/about/about-faq-section';

describe('AboutFaqSection', () => {
  it('renders the first answer expanded by default', () => {
    render(<AboutFaqSection />);

    const firstQuestion = screen.getByRole('button', {
      name: 'What age range do the activities cover?',
    });

    expect(firstQuestion).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(/Plans are designed for children aged 0–8 years/)).toBeInTheDocument();
  });

  it('opens one answer at a time and allows it to be closed', () => {
    render(<AboutFaqSection />);

    const firstQuestion = screen.getByRole('button', {
      name: 'What age range do the activities cover?',
    });
    const secondQuestion = screen.getByRole('button', {
      name: 'Do I need any special equipment or supplies?',
    });

    fireEvent.click(secondQuestion);

    expect(firstQuestion).toHaveAttribute('aria-expanded', 'false');
    expect(secondQuestion).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(/Most activities use simple household materials/)).toBeInTheDocument();

    fireEvent.click(secondQuestion);

    expect(secondQuestion).toHaveAttribute('aria-expanded', 'false');
    expect(
      screen.queryByText(/Most activities use simple household materials/)
    ).not.toBeInTheDocument();
  });
});
