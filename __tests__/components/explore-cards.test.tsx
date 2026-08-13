/* eslint-disable @next/next/no-img-element, @typescript-eslint/no-unused-vars */

import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import {
  ActivityCard,
  PrintableResourceCard,
  ResourceCard,
} from '@/components/dashboard/explore/explore-cards';
import {
  UniversalCard,
  UniversalCardBody,
  UniversalCardMedia,
} from '@/components/dashboard/explore/universal-card';

vi.mock('next/image', () => ({
  default: ({ alt = '', fill: _fill, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
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

describe('Explore card system', () => {
  it('renders arbitrary UI through the universal card slots', () => {
    render(
      <UniversalCard recipe="custom" aria-label="Custom progress card">
        <UniversalCardMedia>
          <div>Custom chart</div>
        </UniversalCardMedia>
        <UniversalCardBody>
          <button type="button">Custom action</button>
        </UniversalCardBody>
      </UniversalCard>
    );

    expect(screen.getByRole('article', { name: 'Custom progress card' })).toBeInTheDocument();
    expect(screen.getByText('Custom chart')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Custom action' })).toBeInTheDocument();
  });

  it('renders the Figma activity recipe and toggles its saved state accessibly', () => {
    const onSavedChange = vi.fn();

    render(
      <ActivityCard
        title="Outdoor Balance Walk"
        imageAlt="A child practicing balance outdoors"
        difficulty="Moderate"
        material="Low beam"
        duration="15 min"
        tags={['🌿 Outdoor', '2–4 yr', 'Sensory']}
        onSavedChange={onSavedChange}
      />
    );

    expect(screen.getByRole('heading', { name: 'Outdoor Balance Walk' })).toBeInTheDocument();
    expect(screen.getByText('Low beam')).toBeInTheDocument();
    expect(screen.getByText('2–4 yr')).toBeInTheDocument();

    const saveButton = screen.getByRole('button', { name: 'Save Outdoor Balance Walk' });
    expect(saveButton).toHaveAttribute('aria-pressed', 'false');
    fireEvent.click(saveButton);
    expect(onSavedChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole('button', { name: 'Remove Outdoor Balance Walk' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
  });

  it('renders the exact resource content pattern and link', () => {
    render(
      <ResourceCard
        title="Guides"
        description="In-depth guides covering sleep, feeding, sensory, and transitions"
        href="/dashboard/explore/parent-resources/guides"
      />
    );

    expect(screen.getByRole('heading', { name: 'Guides' })).toBeInTheDocument();
    expect(screen.getByText('5 min Read')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Explore' })).toHaveAttribute(
      'href',
      '/dashboard/explore/parent-resources/guides'
    );
  });

  it('renders the horizontal printable recipe with a download action', () => {
    render(
      <PrintableResourceCard
        title="Daily Routine Chart"
        description="Customizable morning and evening checklist for preschool ages."
        href="/downloads/daily-routine-chart.pdf"
      />
    );

    const card = screen.getByRole('heading', { name: 'Daily Routine Chart' }).closest('article');
    expect(card).toHaveAttribute('data-recipe', 'printable');
    expect(screen.getByRole('link', { name: 'Download (1.2 MB)' })).toHaveAttribute(
      'href',
      '/downloads/daily-routine-chart.pdf'
    );
  });

  it('supports fully custom media and body UI in a Figma recipe', () => {
    render(
      <ActivityCard
        title="Custom activity"
        difficulty="Easy"
        material="None"
        duration="5 min"
        tags={[]}
        media={<div data-testid="custom-media">Interactive media</div>}
        body={<div data-testid="custom-body">Any card interface</div>}
      />
    );

    expect(screen.getByTestId('custom-media')).toBeInTheDocument();
    expect(screen.getByTestId('custom-body')).toBeInTheDocument();
  });
});
