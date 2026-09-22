'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createChildProfile,
  deleteChildProfile,
  updateChildProfile,
  uploadChildAvatar,
} from '../api/child-profiles.api';
import { childProfileKeys } from '../child-profile.keys';
import type {
  CreateChildProfileInput,
  UpdateChildProfileInput,
} from '../model/child-profile.types';

export function useCreateChildProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateChildProfileInput) => createChildProfile(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: childProfileKeys.all });
    },
  });
}

export function useUpdateChildProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateChildProfileInput }) =>
      updateChildProfile(id, input),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(childProfileKeys.detail(variables.id), data);
      void queryClient.invalidateQueries({ queryKey: childProfileKeys.all });
    },
  });
}

export function useDeleteChildProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteChildProfile(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: childProfileKeys.all });
    },
  });
}

export function useUploadChildAvatar() {
  return useMutation({
    mutationFn: (file: File) => uploadChildAvatar(file),
  });
}
