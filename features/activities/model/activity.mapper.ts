import type { Activity } from './activity.types';
import type { ActivityExploreItem } from '@/features/explore/model/explore-types';

export function formatAgeRange(minMonths?: number, maxMonths?: number): string {
  const min = minMonths ?? 0;
  const max = maxMonths ?? 2160;
  if (min === 0 && max <= 12) return '0–12 mo';
  if (min >= 12 && max <= 24) return '12–24 mo';
  if (max <= 24) return `${min}–${max} mo`;
  const minYears = Math.floor(min / 12);
  const maxYears = Math.ceil(max / 12);
  if (minYears === maxYears) return `${minYears} yr`;
  if (maxYears >= 18) return `${minYears}+ yr`;
  return `${minYears}–${maxYears} yr`;
}

function getMatchingAgeFilters(minMonths: number, maxMonths: number): string[] {
  const matched: string[] = [];
  if (minMonths < 12 && maxMonths >= 0) matched.push('0–12 mo');
  if (minMonths < 24 && maxMonths >= 12) matched.push('12–24 mo');
  if (minMonths < 36 && maxMonths >= 24) matched.push('2–3 yr');
  if (minMonths < 60 && maxMonths >= 36) matched.push('3–5 yr');
  if (minMonths < 84 && maxMonths >= 60) matched.push('5–7 yr');
  return matched;
}

function getMatchingSkills(category: string, goal?: string): string[] {
  const skills: string[] = [];
  const text = `${category} ${goal ?? ''}`.toLowerCase();
  if (text.includes('fine motor')) skills.push('Fine Motor');
  if (text.includes('gross motor')) skills.push('Gross Motor');
  if (text.includes('sensory')) skills.push('Sensory');
  if (text.includes('coordination')) skills.push('Coordination');
  if (text.includes('visual')) skills.push('Visual-Motor');
  if (skills.length === 0) {
    if (category) skills.push(category);
    else skills.push('Fine Motor');
  }
  return skills;
}

function getDifficultyBadge(level: 'EASY' | 'MODERATE' | 'CHALLENGING'): string {
  switch (level) {
    case 'EASY':
      return 'Easy';
    case 'MODERATE':
      return 'Moderate';
    case 'CHALLENGING':
      return 'Advanced';
    default:
      return 'Easy';
  }
}

export function mapActivityToExploreItem(activity: Activity, saved = false): ActivityExploreItem {
  const badge =
    activity.otDesigned ||
    (activity.isOtDesigned ? 'OT Approved' : getDifficultyBadge(activity.difficultyLevel));

  const material =
    activity.materialsSummary ||
    (Array.isArray(activity.materialsNeeded) && activity.materialsNeeded.length > 0
      ? typeof activity.materialsNeeded[0] === 'string'
        ? activity.materialsNeeded[0]
        : activity.materialsNeeded[0]?.name || 'Household Items'
      : 'Household Items');

  const ageText = formatAgeRange(activity.minAgeMonths, activity.maxAgeMonths);
  const primarySkill = activity.developmentCategory || 'Fine Motor';
  const tags: string[] = ['🏠 Indoor', ageText, primarySkill];

  const ageFilters = getMatchingAgeFilters(activity.minAgeMonths, activity.maxAgeMonths);
  const skillFilters = getMatchingSkills(activity.developmentCategory, activity.developmentGoal);

  const difficultyOption =
    activity.difficultyLevel === 'CHALLENGING'
      ? 'Advanced'
      : activity.difficultyLevel === 'MODERATE'
        ? 'Moderate'
        : 'Easy';

  const collectionFilters: string[] = [];
  if (activity.isOtDesigned || activity.otDesigned) collectionFilters.push('OT Picks');
  if (activity.difficultyLevel === 'EASY') collectionFilters.push('Starter Series');
  if (skillFilters.includes('Sensory')) collectionFilters.push('Sensory Saturdays');

  return {
    id: activity.id,
    kind: 'activity',
    title: activity.title,
    imageSrc:
      activity.featuredImageUrl || '/images/admin/activities/stacking-sorting-challenge.png',
    imageAlt: activity.title,
    badge,
    href: `/dashboard/explore/activities/${activity.id}`,
    saved,
    material,
    duration: activity.estimatedDuration || '15–20 min',
    tags,
    filters: {
      age: ageFilters,
      developmentalSkill: skillFilters,
      category: ['Indoor'],
      collection: collectionFilters,
      difficulty: [difficultyOption],
    },
  };
}
