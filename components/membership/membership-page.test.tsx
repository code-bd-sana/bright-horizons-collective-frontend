import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { MembershipPage } from '@/components/membership/membership-page';

describe('MembershipPage', () => {
  it('renders the annual Figma pricing by default', () => {
    render(<MembershipPage />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: "Choose the membership that's right for your family.",
      })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Bill annually/ })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    expect(screen.getByText('$150')).toBeInTheDocument();
    expect(screen.getByText('$180')).toBeInTheDocument();
    expect(screen.getByText('$375')).toBeInTheDocument();
    expect(screen.getByText('$480')).toBeInTheDocument();
  });

  it('updates paid plans when monthly billing is selected', () => {
    render(<MembershipPage />);

    fireEvent.click(screen.getByRole('button', { name: 'Bill monthly' }));

    expect(screen.getByRole('button', { name: 'Bill monthly' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    expect(screen.getByText('$15')).toBeInTheDocument();
    expect(screen.getByText('$40')).toBeInTheDocument();
    expect(screen.queryByText('$180')).not.toBeInTheDocument();
    expect(screen.queryByText('$480')).not.toBeInTheDocument();
  });
});
