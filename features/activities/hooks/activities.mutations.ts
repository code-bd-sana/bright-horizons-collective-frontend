'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createActivity,
  deleteActivity,
  submitActivityCompletionFeedback,
  toggleActivityComplete,
  toggleActivityFavorite,
  updateActivity,
  uploadActivityImage,
} from '../api/activities.api';
import { activityKeys } from '../activity.keys';
import type { Activity } from '../model/activity.types';

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
    onSuccess: (data, id) => {
      const isFavorited = data.status === 'favorited';
      queryClient.setQueryData(activityKeys.detail(id), (old: Activity | undefined) => {
        if (!old) return old;
        return {
          ...old,
          isFavorited,
        };
      });
      void queryClient.invalidateQueries({ queryKey: activityKeys.all });
      void queryClient.invalidateQueries({ queryKey: ['activities', 'favorites'] });
      void queryClient.invalidateQueries({ queryKey: ['favorites'] });
      void queryClient.invalidateQueries({ queryKey: ['activities', 'public', 'dashboard'] });
    },
  });
}

export function useToggleActivityComplete() {
  const queryClient = useQueryClient();

  return useMutation<
    { isCompleted: boolean; status: string },
    Error,
    string | { id: string; childId?: string }
  >({
    mutationFn: (param) => {
      const id = typeof param === 'string' ? param : param.id;
      const childId = typeof param === 'string' ? undefined : param.childId;
      return toggleActivityComplete(id, childId);
    },
    onSuccess: (data, param) => {
      const id = typeof param === 'string' ? param : param.id;
      queryClient.setQueryData(activityKeys.detail(id), (old: Activity | undefined) => {
        if (!old) return old;
        return {
          ...old,
          isCompleted: data.isCompleted,
        };
      });
      void queryClient.invalidateQueries({ queryKey: activityKeys.all });
      void queryClient.invalidateQueries({ queryKey: ['activities', 'public', 'dashboard'] });
      void queryClient.invalidateQueries({ queryKey: ['activities', 'completed'] });
      void queryClient.invalidateQueries({ queryKey: ['child-progress'] });
      void queryClient.invalidateQueries({ queryKey: ['weekly-plans'] });
    },
  });
}

export function useSubmitActivityCompletionFeedback() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      childId,
      input,
    }: {
      childId: string;
      input: Parameters<typeof submitActivityCompletionFeedback>[1];
    }) => submitActivityCompletionFeedback(childId, input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: activityKeys.all });
      void queryClient.invalidateQueries({ queryKey: ['child-progress'] });
      void queryClient.invalidateQueries({ queryKey: ['weekly-plans'] });
      void queryClient.invalidateQueries({ queryKey: ['child-profiles'] });
    },
  });
}
