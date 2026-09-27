import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  archiveAdminWeeklyPlan,
  assignAdminWeeklyPlan,
  createAdminWeeklyPlan,
  deleteAdminWeeklyPlan,
  duplicateAdminWeeklyPlan,
  getAdminWeeklyPlan,
  publishAdminWeeklyPlan,
  updateAdminWeeklyPlan,
  uploadWeeklyPlanFeaturedImage,
  type AssignWeeklyPlanPayload,
} from '../api/weekly-plans.api';
import { type CreateWeeklyPlanPayload } from '../model/weekly-plan.types';

export const weeklyPlanKeys = {
  all: ['weekly-plans'] as const,
  adminList: () => [...weeklyPlanKeys.all, 'admin-list'] as const,
  detail: (id: string) => [...weeklyPlanKeys.all, 'detail', id] as const,
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

export function useAdminWeeklyPlan(id: string | null | undefined) {
  return useQuery({
    queryKey: weeklyPlanKeys.detail(id ?? ''),
    queryFn: () => getAdminWeeklyPlan(id!),
    enabled: Boolean(id),
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

export function useUpdateWeeklyPlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<CreateWeeklyPlanPayload> }) =>
      updateAdminWeeklyPlan(id, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: weeklyPlanKeys.all });
      queryClient.invalidateQueries({ queryKey: weeklyPlanKeys.detail(variables.id) });
    },
  });
}

export function useDuplicateWeeklyPlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => duplicateAdminWeeklyPlan(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: weeklyPlanKeys.all });
    },
  });
}

export function usePublishWeeklyPlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => publishAdminWeeklyPlan(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: weeklyPlanKeys.all });
      queryClient.invalidateQueries({ queryKey: weeklyPlanKeys.detail(id) });
    },
  });
}

export function useArchiveWeeklyPlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => archiveAdminWeeklyPlan(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: weeklyPlanKeys.all });
      queryClient.invalidateQueries({ queryKey: weeklyPlanKeys.detail(id) });
    },
  });
}

export function useDeleteWeeklyPlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteAdminWeeklyPlan(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: weeklyPlanKeys.all });
    },
  });
}

export function useAssignWeeklyPlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AssignWeeklyPlanPayload) => assignAdminWeeklyPlan(payload),
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
