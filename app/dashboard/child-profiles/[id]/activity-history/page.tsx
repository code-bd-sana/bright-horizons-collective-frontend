'use client';

import { useMemo, useState } from 'react';
import { useActiveChild } from '@/features/child-profiles/context/child-profile-detail-context';
import { useChildRecentActivities } from '@/features/child-profiles/hooks/child-profiles.queries';
import {
  ActivityHistoryFilters,
  type TimeframeFilter,
} from '@/components/dashboard/child-profile-detail/activity-history/activity-history-filters';
import { ActivityTimeline } from '@/components/dashboard/child-profile-detail/activity-history/activity-timeline';
import { getMondayOfDate, getSundayOfMonday } from '@/features/weekly-plans';

export default function ActivityHistoryPage() {
  const { child } = useActiveChild();

  const [searchQuery, setSearchQuery] = useState('');
  const [timeframe, setTimeframe] = useState<TimeframeFilter>('all');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Fetch up to 100 completed activities for the child history
  const { data: activities = [], isLoading } = useChildRecentActivities(child?.id, 100);

  // Compute available categories from real data
  const dynamicCategories = useMemo(() => {
    const set = new Set<string>();
    activities.forEach((item) => {
      const cat = item.activity?.developmentCategory;
      if (cat) set.add(cat);
    });
    const standard = ['Fine Motor', 'Gross Motor', 'Sensory', 'Communication', 'Self-Care'];
    standard.forEach((s) => set.add(s));
    return ['All', ...Array.from(set)];
  }, [activities]);

  // Filter activities
  const filteredActivities = useMemo(() => {
    const now = new Date();
    const currentMonday = getMondayOfDate(now);
    const currentSunday = getSundayOfMonday(currentMonday);
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    return activities.filter((item) => {
      // 1. Timeframe filter
      if (timeframe === 'current-week') {
        const itemDate = new Date(item.completedAt);
        if (itemDate < currentMonday || itemDate > currentSunday) {
          return false;
        }
      } else if (timeframe === 'last-month') {
        const itemDate = new Date(item.completedAt);
        if (itemDate < thirtyDaysAgo || itemDate > now) {
          return false;
        }
      }

      // 2. Category filter
      if (selectedCategory !== 'All') {
        const cat = item.activity?.developmentCategory?.toLowerCase() ?? '';
        if (!cat.includes(selectedCategory.toLowerCase())) {
          return false;
        }
      }

      // 3. Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const title = item.activity?.title?.toLowerCase() ?? '';
        const desc = item.activity?.description?.toLowerCase() ?? '';
        const shortDesc = item.activity?.shortDescription?.toLowerCase() ?? '';
        const cat = item.activity?.developmentCategory?.toLowerCase() ?? '';
        const notes = item.parentNotes?.toLowerCase() ?? '';

        const matches =
          title.includes(q) ||
          desc.includes(q) ||
          shortDesc.includes(q) ||
          cat.includes(q) ||
          notes.includes(q);

        if (!matches) return false;
      }

      return true;
    });
  }, [activities, timeframe, selectedCategory, searchQuery]);

  const timeframeLabel = useMemo(() => {
    if (timeframe === 'current-week') return 'This Week';
    if (timeframe === 'last-month') return 'Last Month';
    return 'All Activities';
  }, [timeframe]);

  const hasActiveFilters = Boolean(
    searchQuery.trim() || selectedCategory !== 'All' || timeframe !== 'all'
  );

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setTimeframe('all');
  };

  if (!child) return null;

  return (
    <div className="mx-auto mt-8 flex w-full min-w-0 max-w-286.75 flex-col gap-6 pb-12 sm:mt-10 sm:gap-8 2xl:mt-14 2xl:gap-10">
      <div className="flex w-full min-w-0 flex-col gap-3 2xl:w-265.75 2xl:max-w-265.75 2xl:self-center">
        <h1 className="font-nunito text-2xl font-medium leading-8 tracking-[-0.005em] text-[#263238] sm:text-3xl sm:leading-10 2xl:text-[32px]">
          Activity History
        </h1>
        <p className="font-manrope text-sm font-normal leading-5.5 tracking-[-0.006em] text-[#7D8488]">
          Complete timeline record of completed play routines for {child.name.split(' ')[0]}
        </p>
      </div>

      <div className="flex flex-col gap-6 sm:gap-10">
        <ActivityHistoryFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          timeframe={timeframe}
          onTimeframeChange={setTimeframe}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={dynamicCategories}
        />
        <ActivityTimeline
          childId={child.id}
          childName={child.name.split(' ')[0]}
          activities={filteredActivities}
          isLoading={isLoading}
          timeframeLabel={timeframeLabel}
          hasActiveFilters={hasActiveFilters}
          onClearFilters={handleClearFilters}
        />
      </div>
    </div>
  );
}
