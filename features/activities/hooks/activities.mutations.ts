'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createActivity,
  deleteActivity,
  toggleActivityComplete,
  toggleActivityFavorite,
  updateActivity,
  uploadActivityImage,
} from '../api/activities.api';
import { activityKeys } from '../activity.keys';

export function useCreateActivity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createActivity,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: activityKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: activityKeys.adminSummary() });
    },
  });
}

export function useUpdateActivity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateActivity,
    onSuccess: (activity) => {
      queryClient.setQueryData(activityKeys.detail(activity.id), activity);
      void queryClient.invalidateQueries({ queryKey: activityKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: activityKeys.adminSummary() });
    },
  });
}

export function useDeleteActivity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteActivity,
    onSuccess: (activity) => {
      queryClient.removeQueries({ queryKey: activityKeys.detail(activity.id) });
      void queryClient.invalidateQueries({ queryKey: activityKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: activityKeys.adminSummary() });
    },
  });
}

export function useUploadActivityImage() {
  return useMutation({
    mutationFn: uploadActivityImage,
  });
}

export function useToggleActivityFavorite() {
  const queryClient = useQueryClient();

  return useMutation<{ status: string; type: string }, Error, string>({
    mutationFn: (id: string) => toggleActivityFavorite(id),
    onSuccess: (_data, id) => {
      void queryClient.invalidateQueries({ queryKey: activityKeys.detail(id) });
      void queryClient.invalidateQueries({ queryKey: ['activities', 'favorites'] });
      void queryClient.invalidateQueries({ queryKey: ['favorites'] });
      void queryClient.invalidateQueries({ queryKey: activityKeys.lists() });
    },
  });
}

export function useToggleActivityComplete() {
  const queryClient = useQueryClient();

  return useMutation<{ isCompleted: boolean; status: string }, Error, string>({
    mutationFn: (id: string) => toggleActivityComplete(id),
    onSuccess: (_data, id) => {
      void queryClient.invalidateQueries({ queryKey: activityKeys.detail(id) });
    },
  });
}
