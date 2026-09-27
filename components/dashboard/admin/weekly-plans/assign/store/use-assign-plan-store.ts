import { create } from 'zustand';

export interface AssignablePlan {
  id: string;
  title: string;
  weekNumber?: number | null;
  accessLevels?: string[];
  minAgeMonths?: number | null;
  maxAgeMonths?: number | null;
  category?: string | null;
  customCategory?: string | null;
  description?: string | null;
  activitiesCount?: number;
  status?: string;
  featuredImage?: string | null;
}

export interface AssignPlanState {
  selectedPlan: AssignablePlan | null;
  selectedFamilyIds: string[];
  selectedChildIds: string[];
  startDate: string; // YYYY-MM-DD (Monday)
  endDate: string; // YYYY-MM-DD (Sunday)
  timeframeLabel: string;
  replaceExisting: boolean;
  notes: string;

  setSelectedPlan: (plan: AssignablePlan | null) => void;
  toggleFamily: (familyId: string, familyChildIds?: string[]) => void;
  selectAllFamilies: (families: Array<{ id: string; childIds?: string[] }>) => void;
  deselectAllFamilies: () => void;
  toggleChild: (childId: string) => void;
  selectAllChildren: (childIds: string[]) => void;
  deselectAllChildren: () => void;
  setTimeframeFromDate: (date: Date) => void;
  setReplaceExisting: (replace: boolean) => void;
  setNotes: (notes: string) => void;
  resetStore: () => void;
}

export function getMondayOfDate(d: Date): Date {
  const date = new Date(d);
  const day = date.getDay(); // 0 is Sun, 1 is Mon...
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  date.setDate(diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

export function getSundayOfMonday(monday: Date): Date {
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);
  return sunday;
}

export function formatYMD(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function formatTimeframeLabel(monday: Date, sunday: Date): string {
  const monStr = monday.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const sunStr = sunday.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  return `${monStr} – ${sunStr}`;
}

const defaultMonday = getMondayOfDate(new Date());
const defaultSunday = getSundayOfMonday(defaultMonday);

export const useAssignPlanStore = create<AssignPlanState>((set) => ({
  selectedPlan: null,
  selectedFamilyIds: [],
  selectedChildIds: [],
  startDate: formatYMD(defaultMonday),
  endDate: formatYMD(defaultSunday),
  timeframeLabel: formatTimeframeLabel(defaultMonday, defaultSunday),
  replaceExisting: false,
  notes: '',

  setSelectedPlan: (plan) =>
    set({
      selectedPlan: plan,
      // If plan changes, reset family/child selections
      selectedFamilyIds: [],
      selectedChildIds: [],
    }),

  toggleFamily: (familyId, familyChildIds = []) =>
    set((state) => {
      const isSelected = state.selectedFamilyIds.includes(familyId);
      if (isSelected) {
        // Deselect family and remove its children
        const nextFamilies = state.selectedFamilyIds.filter((id) => id !== familyId);
        const nextChildren = state.selectedChildIds.filter((cId) => !familyChildIds.includes(cId));
        return { selectedFamilyIds: nextFamilies, selectedChildIds: nextChildren };
      } else {
        // Select family and add its children by default
        const nextFamilies = [...state.selectedFamilyIds, familyId];
        const nextChildren = Array.from(new Set([...state.selectedChildIds, ...familyChildIds]));
        return { selectedFamilyIds: nextFamilies, selectedChildIds: nextChildren };
      }
    }),

  selectAllFamilies: (families) =>
    set(() => {
      const familyIds = families.map((f) => f.id);
      const childIds = families.flatMap((f) => f.childIds || []);
      return {
        selectedFamilyIds: familyIds,
        selectedChildIds: Array.from(new Set(childIds)),
      };
    }),

  deselectAllFamilies: () =>
    set({
      selectedFamilyIds: [],
      selectedChildIds: [],
    }),

  toggleChild: (childId) =>
    set((state) => {
      const exists = state.selectedChildIds.includes(childId);
      return {
        selectedChildIds: exists
          ? state.selectedChildIds.filter((id) => id !== childId)
          : [...state.selectedChildIds, childId],
      };
    }),

  selectAllChildren: (childIds) =>
    set({
      selectedChildIds: Array.from(new Set(childIds)),
    }),

  deselectAllChildren: () =>
    set({
      selectedChildIds: [],
    }),

  setTimeframeFromDate: (date) => {
    const monday = getMondayOfDate(date);
    const sunday = getSundayOfMonday(monday);
    set({
      startDate: formatYMD(monday),
      endDate: formatYMD(sunday),
      timeframeLabel: formatTimeframeLabel(monday, sunday),
    });
  },

  setReplaceExisting: (replace) => set({ replaceExisting: replace }),

  setNotes: (notes) => set({ notes }),

  resetStore: () => {
    const mon = getMondayOfDate(new Date());
    const sun = getSundayOfMonday(mon);
    set({
      selectedPlan: null,
      selectedFamilyIds: [],
      selectedChildIds: [],
      startDate: formatYMD(mon),
      endDate: formatYMD(sun),
      timeframeLabel: formatTimeframeLabel(mon, sun),
      replaceExisting: false,
      notes: '',
    });
  },
}));
