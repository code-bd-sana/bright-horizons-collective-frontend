export type BackendAgeGroup =
  'MONTHS_0_12' | 'MONTHS_12_24' | 'YEARS_2_3' | 'YEARS_3_5' | 'YEARS_5_7';

export type BackendDevelopmentCategory =
  'FINE_MOTOR' | 'GROSS_MOTOR' | 'SENSORY' | 'COORDINATION' | 'VISUAL_MOTOR' | 'ALL';

export type BackendMembershipTier = 'LITTLE_STEPS' | 'GROW_TOGETHER' | 'PERSONALIZED_PATHWAYS';

export type BackendContentStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export type UiMembershipTier = 'Little Steps' | 'Grow Together' | 'Personalized Pathways';

export const CATEGORY_OPTIONS = [
  { label: 'Sensory Play', value: 'Sensory Play' },
  { label: 'Fine Motor', value: 'Fine Motor' },
  { label: 'Gross Motor', value: 'Gross Motor' },
  { label: 'Coordination', value: 'Coordination' },
  { label: 'Visual-Motor', value: 'Visual-Motor' },
  { label: 'All Categories', value: 'All Categories' },
  { label: 'Other', value: 'Other' },
] as const;

export const CATEGORY_UI_TO_BACKEND: Record<string, BackendDevelopmentCategory | null> = {
  'Sensory Play': 'SENSORY',
  'Fine Motor': 'FINE_MOTOR',
  'Gross Motor': 'GROSS_MOTOR',
  Coordination: 'COORDINATION',
  'Visual-Motor': 'VISUAL_MOTOR',
  'All Categories': 'ALL',
  Other: null,
};

export const CATEGORY_BACKEND_TO_UI: Record<string, string> = {
  SENSORY: 'Sensory Play',
  FINE_MOTOR: 'Fine Motor',
  GROSS_MOTOR: 'Gross Motor',
  COORDINATION: 'Coordination',
  VISUAL_MOTOR: 'Visual-Motor',
  ALL: 'All Categories',
};

export const TIER_UI_TO_BACKEND: Record<UiMembershipTier, BackendMembershipTier[]> = {
  'Little Steps': ['LITTLE_STEPS'],
  'Grow Together': ['GROW_TOGETHER'],
  'Personalized Pathways': ['PERSONALIZED_PATHWAYS'],
};

export function getPlanMembershipTier(accessLevels?: string[] | null): UiMembershipTier {
  if (!accessLevels || accessLevels.length === 0) {
    return 'Little Steps';
  }

  if (accessLevels.includes('LITTLE_STEPS')) {
    return 'Little Steps';
  }

  if (accessLevels.includes('GROW_TOGETHER')) {
    return 'Grow Together';
  }

  if (accessLevels.includes('PERSONALIZED_PATHWAYS')) {
    return 'Personalized Pathways';
  }

  return 'Little Steps';
}

export interface SelectedActivity {
  id: string;
  title: string;
  category?: string;
  duration?: string;
  age?: string;
}

export interface CreateWeeklyPlanPayload {
  title: string;
  description?: string;
  weekNumber?: number;
  minAgeMonths?: number;
  maxAgeMonths?: number;
  category?: BackendDevelopmentCategory | null;
  customCategory?: string;
  featuredImage?: string;
  status: BackendContentStatus;
  accessLevels?: BackendMembershipTier[];
  activities?: Array<{
    activityId: string;
    day: string;
  }>;
}

export interface BackendWeeklyPlanDetail {
  id: string;
  title: string;
  description?: string | null;
  weekNumber?: number | null;
  minAgeMonths?: number | null;
  maxAgeMonths?: number | null;
  category?: BackendDevelopmentCategory | null;
  customCategory?: string | null;
  featuredImage?: string | null;
  status: BackendContentStatus;
  accessLevels?: BackendMembershipTier[];
  activities: Array<{
    id: string;
    weeklyPlanId: string;
    activityId: string;
    day: string;
    activity: {
      id: string;
      title: string;
      developmentCategory: string;
      estimatedDuration?: string | null;
      minAgeMonths: number;
      maxAgeMonths: number;
    };
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface WeeklyPlanAdminSummary {
  total: number;
  published: number;
  draft: number;
  archived: number;
  assignments: number;
  enrolledChildren: number;
}

export interface ActivityCompletionSummary {
  id: string;
  activityId: string;
  weeklyPlanId?: string | null;
  childId?: string | null;
  completedAt: string;
  rating?: number | null;
  difficulty?: string | null;
}

export interface AssignedWeeklyPlanActivityItem {
  id: string;
  weeklyPlanId: string;
  activityId: string;
  day: string;
  activity: {
    id: string;
    title: string;
    description?: string | null;
    shortDescription?: string | null;
    developmentCategory?: string | null;
    estimatedDuration?: string | null;
    difficultyLevel?: string | null;
    materialsSummary?: string | null;
    materialsNeeded?: Array<{ name: string }> | null;
    featuredImageUrl?: string | null;
    featuredImage?: string | null;
  };
}

export interface AssignedWeeklyPlan {
  id: string;
  weeklyPlanId: string;
  childId: string;
  startDate?: string | null;
  endDate?: string | null;
  notes?: string | null;
  createdAt: string;
  child: {
    id: string;
    name: string;
    parentId: string;
    photoUrl?: string | null;
    activityCompletions?: ActivityCompletionSummary[];
  };
  weeklyPlan: {
    id: string;
    title: string;
    description?: string | null;
    weekNumber?: number | null;
    category?: string | null;
    customCategory?: string | null;
    featuredImage?: string | null;
    activities: AssignedWeeklyPlanActivityItem[];
  };
  feedbacks?: Array<{
    id: string;
    rating?: number | null;
    comment?: string | null;
  }>;
}
