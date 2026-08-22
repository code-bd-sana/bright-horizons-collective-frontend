/* eslint-disable @next/next/no-img-element, @typescript-eslint/no-unused-vars */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import { DashboardExplorePage } from '@/components/dashboard/explore/dashboard-explore-page';

vi.mock('next/image', () => ({
  default: ({
    alt = '',
    fill: _fill,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean }) => (
    <img alt={alt} {...props} />
  ),
}));

function renderPage(tab: 'activities' | 'parent-resources' | 'therapy-toys') {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <DashboardExplorePage initialTab={tab} />
    </QueryClientProvider>
  );
}

describe('Dashboard Explore page', () => {
  it('renders the activity catalog and applies the Figma filters', async () => {
    renderPage('activities');

    expect(screen.getByRole('heading', { name: 'Explore the Library' })).toBeInTheDocument();
    expect(await screen.findByRole('heading', { name: 'Saved Activities' })).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { name: 'Outdoor Balance Walk' })).toHaveLength(4);

    fireEvent.click(screen.getByLabelText('Outdoor'));

    await waitFor(() => {
      expect(
        screen.queryAllByRole('heading', { name: 'Stacking & Sorting Challenge' })
      ).toHaveLength(4);
      expect(screen.getAllByRole('heading', { name: 'Outdoor Balance Walk' })).toHaveLength(4);
    });
  });

  it('renders the printable, saved, and newsletter resource sections', async () => {
    renderPage('parent-resources');

    expect(screen.getByRole('heading', { name: 'Explore Trusted Guidance' })).toBeInTheDocument();
    expect(await screen.findByRole('heading', { name: 'Printable Resources' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Saved Resources' })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Get Weekly Learning Updates' })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Subscribe' })).toBeInTheDocument();
  });

  it('renders the therapy-toy recipe and recommendation actions', async () => {
    renderPage('therapy-toys');

    const recommendations = await screen.findAllByRole('link', {
      name: 'See Why We Recommend It',
    });
    expect(recommendations).toHaveLength(9);
    expect(screen.getByRole('heading', { name: 'Saved Resources' })).toBeInTheDocument();
    expect(recommendations[0].closest('article')).toHaveAttribute('data-recipe', 'therapyToy');
    expect(
      screen.getByAltText('Children wearing superhero costumes during imaginative play')
    ).toHaveAttribute('src', '/figma/explore/toy-superhero.png');
    expect(screen.getByAltText('A child creating a colorful paper craft')).toHaveAttribute(
      'src',
      '/figma/explore/toy-crafts.png'
    );
    expect(
      screen.getByAltText('Children practicing breath control by blowing bubbles')
    ).toHaveAttribute('src', '/figma/explore/toy-bubbles.png');
    expect(
      screen.getByAltText('Three children laughing together during social play')
    ).toHaveAttribute('src', '/figma/explore/toy-friends.png');
  });
});
