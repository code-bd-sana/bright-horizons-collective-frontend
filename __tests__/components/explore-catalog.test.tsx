/* eslint-disable @next/next/no-img-element, @typescript-eslint/no-unused-vars */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import { ExploreCatalog } from '@/components/explore/explore-catalog';
import type { TherapyToy } from '@/features/therapy-toys/model/therapy-toy.types';

vi.mock('next/image', () => ({
  default: ({
    alt = '',
    fill: _fill,
    unoptimized: _unoptimized,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean; unoptimized?: boolean }) => (
    <img alt={alt} {...props} />
  ),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

const mockToys: TherapyToy[] = [
  {
    id: 'toy-1',
    name: 'Hammett Durham Toy',
    description: 'A tactile sensory kit.',
    developmentArea: 'Sensory',
    price: 628,
    currency: 'USD',
    minAgeMonths: 3,
    maxAgeMonths: 3,
    imageUrl: 'https://example.com/toy1.png',
    affiliateLink: 'https://example.com/buy1',
    accessLevel: ['LITTLE_STEPS'],
    status: 'PUBLISHED',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'toy-2',
    name: 'Stephanie Luna Toy',
    description: 'Visual motor blocks.',
    developmentArea: 'Visual Motor',
    price: 23,
    currency: 'USD',
    minAgeMonths: 5,
    maxAgeMonths: 10,
    imageUrl: 'https://example.com/toy2.png',
    affiliateLink: 'https://example.com/buy2',
    accessLevel: ['LITTLE_STEPS'],
    status: 'PUBLISHED',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'toy-3',
    name: 'Cameron Sherman Toy',
    description: 'Sensory ball set.',
    developmentArea: 'Sensory',
    price: 417,
    currency: 'USD',
    minAgeMonths: 9,
    maxAgeMonths: 12,
    imageUrl: null,
    affiliateLink: 'https://example.com/buy3',
    accessLevel: ['LITTLE_STEPS'],
    status: 'PUBLISHED',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'toy-4',
    name: 'Amena Mendez Toy',
    description: 'Sensory calming pad.',
    developmentArea: 'Sensory',
    price: 9,
    currency: 'USD',
    minAgeMonths: 4,
    maxAgeMonths: 6,
    imageUrl: null,
    affiliateLink: 'https://example.com/buy4',
    accessLevel: ['LITTLE_STEPS'],
    status: 'PUBLISHED',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
];

vi.mock('@/features/therapy-toys/hooks/therapy-toys.queries', () => ({
  useTherapyToys: vi.fn(() => ({
    data: {
      items: mockToys,
      pagination: { total: 4, page: 1, limit: 100, totalPages: 1 },
    },
    isLoading: false,
    isError: false,
  })),
}));

function renderCatalog(
  activeType: 'Activities' | 'Parent Resources' | 'Therapy Toys' = 'Therapy Toys'
) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <ExploreCatalog activeType={activeType} onActiveTypeChange={vi.fn()} />
    </QueryClientProvider>
  );
}

describe('ExploreCatalog - Therapy Toys parity with other tabs', () => {
  it('renders therapy toy cards matching the design of activities and parent resources', () => {
    renderCatalog('Therapy Toys');

    // Title
    expect(screen.getByRole('heading', { name: 'Hammett Durham Toy' })).toBeInTheDocument();

    // Badge
    expect(screen.getAllByText('OT Favorite')).toHaveLength(4);

    // Recommendation action button
    const ctaButtons = screen.getAllByRole('button', { name: /See Why We Recommend It/i });
    expect(ctaButtons).toHaveLength(4);

    // Bookmark button
    const bookmarkButton = screen.getByRole('button', { name: 'Save Hammett Durham Toy' });
    expect(bookmarkButton).toBeInTheDocument();
  });

  it('applies the 2 big cards and 1 small middle card height pattern', () => {
    renderCatalog('Therapy Toys');

    const cardArticles = screen.getAllByRole('article');
    expect(cardArticles).toHaveLength(4);

    // In a 3-column layout with 4 items:
    // Col 1 top (index 0): 540px (big)
    // Col 1 bottom (index 1): 480px (small)
    // Col 2 top / middle column (index 2): 480px (small)
    // Col 3 top (index 3): 540px (big)
    // Across the top row: Col 1 is big (540), Col 2 (middle) is small (480), Col 3 is big (540)
    expect(cardArticles[0]).toHaveStyle({ height: '540px' });
    expect(cardArticles[1]).toHaveStyle({ height: '480px' });
    expect(cardArticles[2]).toHaveStyle({ height: '480px' });
    expect(cardArticles[3]).toHaveStyle({ height: '540px' });
  });

  it('opens the therapy toy modal when clicking See Why We Recommend It', async () => {
    renderCatalog('Therapy Toys');

    const ctaButtons = screen.getAllByRole('button', { name: /See Why We Recommend It/i });
    fireEvent.click(ctaButtons[0]);

    await waitFor(() => {
      expect(screen.getByText('Why we love it')).toBeInTheDocument();
      expect(screen.getByText('A tactile sensory kit.')).toBeInTheDocument();
    });
  });

  it('allows bookmarking without opening the modal', () => {
    renderCatalog('Therapy Toys');

    const bookmarkButton = screen.getByRole('button', { name: 'Save Hammett Durham Toy' });
    fireEvent.click(bookmarkButton);

    // Should toggle bookmark aria-label
    expect(
      screen.getByRole('button', { name: 'Remove Hammett Durham Toy from saved' })
    ).toBeInTheDocument();

    // Modal should NOT be open
    expect(screen.queryByText('Why we love it')).not.toBeInTheDocument();
  });
});
