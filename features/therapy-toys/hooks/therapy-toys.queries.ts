'use client';

import { useQuery } from '@tanstack/react-query';

import {
  getAdminTherapyToys,
  getAdminTherapyToySummary,
  getTherapyToy,
  getTherapyToys,
} from '../api/therapy-toys.api';
import type { AdminTherapyToyFilters, TherapyToyFilters } from '../model/therapy-toy.types';
import { therapyToyKeys } from '../therapy-toy.keys';

export function useTherapyToys(filters: TherapyToyFilters = {}) {
  return useQuery({
    queryKey: therapyToyKeys.publicList(filters),
    queryFn: () => getTherapyToys(filters),
  });
}

export function useTherapyToy(id: string) {
  return useQuery({
    queryKey: therapyToyKeys.detail(id),
    queryFn: () => getTherapyToy(id),
    enabled: Boolean(id),
  });
}

export function useAdminTherapyToys(filters: AdminTherapyToyFilters = {}) {
  return useQuery({
    queryKey: therapyToyKeys.adminList(filters),
    queryFn: () => getAdminTherapyToys(filters),
  });
}

export function useAdminTherapyToySummary() {
  return useQuery({
    queryKey: therapyToyKeys.adminSummary(),
    queryFn: getAdminTherapyToySummary,
  });
}
