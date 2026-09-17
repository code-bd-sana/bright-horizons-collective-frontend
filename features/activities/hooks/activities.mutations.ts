'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createActivity, uploadActivityImage } from '../api/activities.api';
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

export function useUploadActivityImage() {
  return useMutation({
    mutationFn: uploadActivityImage,
  });
}
