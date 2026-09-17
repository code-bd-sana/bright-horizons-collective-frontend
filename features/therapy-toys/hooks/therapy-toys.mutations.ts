'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  createTherapyToy,
  deleteTherapyToy,
  deleteTherapyToyImage,
  toggleTherapyToyFavorite,
  updateTherapyToy,
  uploadTherapyToyImage,
} from '../api/therapy-toys.api';
import { therapyToyKeys } from '../therapy-toy.keys';

export function useCreateTherapyToy() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTherapyToy,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: therapyToyKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: therapyToyKeys.adminSummary() });
    },
  });
}

export function useUpdateTherapyToy() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTherapyToy,
    onSuccess: (toy) => {
      queryClient.setQueryData(therapyToyKeys.detail(toy.id), toy);
      void queryClient.invalidateQueries({ queryKey: therapyToyKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: therapyToyKeys.adminSummary() });
    },
  });
}

export function useDeleteTherapyToy() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTherapyToy,
    onSuccess: (toy) => {
      queryClient.removeQueries({ queryKey: therapyToyKeys.detail(toy.id) });
      void queryClient.invalidateQueries({ queryKey: therapyToyKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: therapyToyKeys.adminSummary() });
    },
  });
}

export function useUploadTherapyToyImage() {
  return useMutation({ mutationFn: uploadTherapyToyImage });
}

export function useDeleteTherapyToyImage() {
  return useMutation({ mutationFn: deleteTherapyToyImage });
}

export function useToggleTherapyToyFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleTherapyToyFavorite,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [...therapyToyKeys.all, 'favorites'] });
    },
  });
}
