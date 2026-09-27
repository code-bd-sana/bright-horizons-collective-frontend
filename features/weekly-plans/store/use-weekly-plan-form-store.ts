import { create } from 'zustand';
import {
  type BackendWeeklyPlanDetail,
  type SelectedActivity,
  type UiMembershipTier,
  CATEGORY_BACKEND_TO_UI,
  getPlanMembershipTier,
} from '../model/weekly-plan.types';

export interface WeeklyPlanFormState {
  // Editing state
  editingPlanId: string | null;

  // Step 1: Basic Info
  title: string;
  description: string;
  weekNumber: string;
  minAgeMonths: string;
  maxAgeMonths: string;
  category: string;
  customCategory: string;
  featuredImageUrl: string;
  featuredImageName: string;
  featuredImageFile: File | null;

  // Step 2: Activities Selection
  selectedActivities: SelectedActivity[];

  // Step 3: Schedule (day -> activityId[])
  schedule: Record<string, string[]>;

  // Step 4: Membership Tier
  membershipTier: UiMembershipTier;

  // Actions
  setEditingPlanId: (id: string | null) => void;
  populateFromPlan: (plan: BackendWeeklyPlanDetail) => void;
  setBasicInfo: (
    info: Partial<{
      title: string;
      description: string;
      weekNumber: string;
      minAgeMonths: string;
      maxAgeMonths: string;
      category: string;
      customCategory: string;
      featuredImageUrl: string;
      featuredImageName: string;
      featuredImageFile: File | null;
    }>
  ) => void;

  toggleActivity: (activity: SelectedActivity) => void;
  removeActivity: (activityId: string) => void;
  assignActivityToDay: (day: string, activityId: string) => void;
  removeActivityFromDay: (day: string, activityId: string) => void;
  setMembershipTier: (tier: UiMembershipTier) => void;
  resetForm: () => void;
}

const initialSchedule: Record<string, string[]> = {
  Monday: [],
  Tuesday: [],
  Wednesday: [],
  Thursday: [],
  Friday: [],
};

export const useWeeklyPlanFormStore = create<WeeklyPlanFormState>((set) => ({
  editingPlanId: null,
  title: '',
  description: '',
  weekNumber: '1',
  minAgeMonths: '0',
  maxAgeMonths: '36',
  category: 'Sensory Play',
  customCategory: '',
  featuredImageUrl: '',
  featuredImageName: '',
  featuredImageFile: null,

  selectedActivities: [],
  schedule: { ...initialSchedule },
  membershipTier: 'Little Steps',

  setEditingPlanId: (id) => set({ editingPlanId: id }),

  populateFromPlan: (plan) => {
    let uiCategory = 'Sensory Play';
    let uiCustom = '';
    if (plan.customCategory) {
      uiCategory = 'Other';
      uiCustom = plan.customCategory;
    } else if (plan.category && CATEGORY_BACKEND_TO_UI[plan.category]) {
      uiCategory = CATEGORY_BACKEND_TO_UI[plan.category];
    }

    const uiTier = getPlanMembershipTier(plan.accessLevels);

    const selectedActivities: SelectedActivity[] = (plan.activities || []).map((item) => ({
      id: item.activity.id,
      title: item.activity.title,
      category: item.activity.developmentCategory,
      duration: item.activity.estimatedDuration ?? undefined,
      age: `${item.activity.minAgeMonths}–${item.activity.maxAgeMonths} mo`,
    }));

    const schedule: Record<string, string[]> = {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
    };

    for (const item of plan.activities || []) {
      if (item.day && schedule[item.day]) {
        schedule[item.day] = [item.activity.id];
      }
    }

    set({
      editingPlanId: plan.id,
      title: plan.title,
      description: plan.description ?? '',
      weekNumber: String(plan.weekNumber ?? '1'),
      minAgeMonths: String(plan.minAgeMonths ?? '0'),
      maxAgeMonths: String(plan.maxAgeMonths ?? '36'),
      category: uiCategory,
      customCategory: uiCustom,
      featuredImageUrl: plan.featuredImage ?? '',
      featuredImageName: plan.featuredImage ? 'featured-image' : '',
      featuredImageFile: null,
      selectedActivities,
      schedule,
      membershipTier: uiTier,
    });
  },

  setBasicInfo: (info) =>
    set((state) => ({
      ...state,
      ...info,
    })),

  toggleActivity: (activity) =>
    set((state) => {
      const exists = state.selectedActivities.some((item) => item.id === activity.id);
      if (exists) {
        // Remove from selectedActivities AND clean from any day in schedule
        const updatedSelected = state.selectedActivities.filter((item) => item.id !== activity.id);
        const updatedSchedule: Record<string, string[]> = {};
        for (const [day, ids] of Object.entries(state.schedule)) {
          updatedSchedule[day] = ids.filter((id) => id !== activity.id);
        }
        return {
          selectedActivities: updatedSelected,
          schedule: updatedSchedule,
        };
      } else {
        return {
          selectedActivities: [...state.selectedActivities, activity],
        };
      }
    }),

  removeActivity: (activityId) =>
    set((state) => {
      const updatedSelected = state.selectedActivities.filter((item) => item.id !== activityId);
      const updatedSchedule: Record<string, string[]> = {};
      for (const [day, ids] of Object.entries(state.schedule)) {
        updatedSchedule[day] = ids.filter((id) => id !== activityId);
      }
      return {
        selectedActivities: updatedSelected,
        schedule: updatedSchedule,
      };
    }),

  assignActivityToDay: (day, activityId) =>
    set((state) => {
      // Rule 1: An activity can be set only in 1 day!
      // Rule 2: Each day can have ONLY ONE activity!
      const updatedSchedule: Record<string, string[]> = {};
      for (const [d, ids] of Object.entries(state.schedule)) {
        updatedSchedule[d] = ids.filter((id) => id !== activityId);
      }
      // Single activity for this day
      updatedSchedule[day] = [activityId];

      return { schedule: updatedSchedule };
    }),

  removeActivityFromDay: (day, activityId) =>
    set((state) => {
      const dayList = state.schedule[day] ?? [];
      return {
        schedule: {
          ...state.schedule,
          [day]: dayList.filter((id) => id !== activityId),
        },
      };
    }),

  setMembershipTier: (tier) => set({ membershipTier: tier }),

  resetForm: () =>
    set({
      editingPlanId: null,
      title: '',
      description: '',
      weekNumber: '1',
      minAgeMonths: '0',
      maxAgeMonths: '36',
      category: 'Sensory Play',
      customCategory: '',
      featuredImageUrl: '',
      featuredImageName: '',
      featuredImageFile: null,
      selectedActivities: [],
      schedule: {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
      },
      membershipTier: 'Little Steps',
    }),
}));
