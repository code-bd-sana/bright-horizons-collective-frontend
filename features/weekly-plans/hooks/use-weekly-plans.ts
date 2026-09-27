import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createAdminWeeklyPlan, uploadWeeklyPlanFeaturedImage } from '../api/weekly-plans.api';
import { type CreateWeeklyPlanPayload } from '../model/weekly-plan.types';

export const weeklyPlanKeys = {
  all: ['weekly-plans'] as const,
  adminList: () => [...weeklyPlanKeys.all, 'admin-list'] as const,
};

export function useAdminWeeklyPlans() {
  return useQuery({
    queryKey: weeklyPlanKeys.adminList(),
    queryFn: async () => {
      const response = await fetch('/api/admin/weekly-plans');
      if (!response.ok) {
        throw new Error('Failed to fetch weekly plans');
      }
      return response.json();
    },
  });
}

export function useCreateWeeklyPlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateWeeklyPlanPayload) => createAdminWeeklyPlan(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: weeklyPlanKeys.all });
    },
  });
}

export function useUploadWeeklyPlanImage() {
  return useMutation({
    mutationFn: (file: File) => uploadWeeklyPlanFeaturedImage(file),
  });
}
