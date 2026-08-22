/* eslint-disable @next/next/no-img-element, @typescript-eslint/no-unused-vars */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { ParentDashboardPage } from '@/components/dashboard/parent-dashboard-page';

vi.mock('next/image', () => ({
  default: ({
    alt = '',
    fill: _fill,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean }) => (
    <img alt={alt} {...props} />
  ),
}));

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('ParentDashboardPage', () => {
  it('renders the parent dashboard sections from the Figma design', () => {
    render(<ParentDashboardPage />);

    expect(screen.getByRole('heading', { name: 'Welcome back, Sarah!' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Animal Yoga Adventure' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: "Emma's Progress" })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: "This Week's Plan" })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Recent activity' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Messages' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Recommended For You' })).toBeInTheDocument();
  });
});
