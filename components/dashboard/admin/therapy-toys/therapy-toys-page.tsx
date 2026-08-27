'use client';

import { Plus } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

import { therapyToys } from './therapy-toys-data';
import { TherapyToyFilters } from './therapy-toy-filters';
import { TherapyToysSummary } from './therapy-toys-summary';
import { TherapyToysTable } from './therapy-toys-table';
import type { TherapyToy } from './therapy-toys-types';

export function TherapyToysPage() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    age: 'all',
    membership: 'all',
    status: 'all',
  });

  const filteredToys = useMemo(() => {
    const query = search.trim().toLowerCase();
    return therapyToys.filter((toy) => {
      const ageMatches =
        filters.age === 'all' || toy.ageRange.includes(filters.age.replace('+', ''));
      return (
        (filters.category === 'all' || toy.category === filters.category) &&
        ageMatches &&
        (filters.membership === 'all' || toy.membership === filters.membership) &&
        (filters.status === 'all' || toy.status === filters.status) &&
        (!query ||
          `${toy.title} ${toy.brand} ${toy.category} ${toy.primarySkill}`
            .toLowerCase()
            .includes(query))
      );
    });
  }, [filters, search]);

  const updateFilter = (filter: keyof typeof filters, value: string) => {
    setFilters((current) => ({ ...current, [filter]: value }));
  };

  const handleAction = (action: string, toy: TherapyToy) => {
    toast.success(`${action} is ready for “${toy.title}”.`);
  };

  return (
    <section className="mx-auto w-full max-w-383.5 pb-8 text-[#3d3d3d]">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-nunito text-[32px] font-medium leading-10 tracking-[-0.4px] sm:text-[40px] sm:leading-12">
            Therapy Toys
          </h1>
          <p className="mt-0.5 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#6b6b6b]">
            Manage therapist-recommended toys and developmental tools available to parents.
          </p>
        </div>
        <button
          type="button"
          onClick={() => toast.message('The Add Therapy Toy form will be available here.')}
          className="flex h-10 w-full items-center justify-center gap-2 rounded-full bg-[#2f7d7e] px-4 py-2.5 font-nunito text-sm font-medium leading-5 tracking-[-0.084px] text-white sm:w-auto"
        >
          <Plus aria-hidden="true" size={15} strokeWidth={2} />
          Add Therapy Toy
        </button>
      </header>
      <div className="mt-8 space-y-8">
        <TherapyToysSummary />
        <div className="space-y-6">
          <TherapyToyFilters
            search={search}
            category={filters.category}
            age={filters.age}
            membership={filters.membership}
            status={filters.status}
            onSearchChange={setSearch}
            onFilterChange={updateFilter}
          />
          <TherapyToysTable toys={filteredToys} onAction={handleAction} />
        </div>
      </div>
    </section>
  );
}
