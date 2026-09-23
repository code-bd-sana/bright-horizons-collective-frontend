'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createParentResource,
  deleteParentResource,
  toggleParentResourceFavorite,
  updateParentResource,
  uploadParentResourceFile,
  uploadResourceAttachment,
} from '../api/parent-resources.api';
import { parentResourceKeys } from '../parent-resource.keys';
import type { ParentResource } from '../model/parent-resource.types';

export function useCreateParentResource() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createParentResource,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: parentResourceKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: parentResourceKeys.adminSummary() });
    },
  });
}

export function useUpdateParentResource() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateParentResource,
    onSuccess: (resource) => {
      queryClient.setQueryData(parentResourceKeys.detail(resource.id), resource);
      void queryClient.invalidateQueries({ queryKey: parentResourceKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: parentResourceKeys.adminSummary() });
    },
  });
}

export function useDeleteParentResource() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteParentResource,
    onSuccess: (resource) => {
      queryClient.removeQueries({ queryKey: parentResourceKeys.detail(resource.id) });
      void queryClient.invalidateQueries({ queryKey: parentResourceKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: parentResourceKeys.adminSummary() });
    },
  });
}

export function useUploadParentResourceFile() {
  return useMutation({
    mutationFn: uploadParentResourceFile,
  });
}

export function useUploadResourceAttachment() {
  return useMutation({
    mutationFn: uploadResourceAttachment,
  });
}

export function useToggleParentResourceFavorite() {
  const queryClient = useQueryClient();

  return useMutation<{ status: string; type: string }, Error, string>({
    mutationFn: (id: string) => toggleParentResourceFavorite(id),
    onSuccess: (data, id) => {
      const isFavorited = data.status === 'favorited';
      queryClient.setQueryData(parentResourceKeys.detail(id), (old: ParentResource | undefined) => {
        if (!old) return old;
        return {
          ...old,
          isFavorited,
        };
      });
      void queryClient.invalidateQueries({ queryKey: parentResourceKeys.all });
      void queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });
}
