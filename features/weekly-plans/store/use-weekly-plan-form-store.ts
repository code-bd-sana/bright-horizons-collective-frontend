import { create } from 'zustand';
import { type SelectedActivity, type UiMembershipTier } from '../model/weekly-plan.types';

export interface WeeklyPlanFormState {
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

export const useWeeklyPlanFormStore = create<WeeklyPlanFormState>((set, get) => ({
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
