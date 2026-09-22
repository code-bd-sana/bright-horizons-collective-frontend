'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export type UserProfile = {
  id: string;
  email: string;
  name: string;
  phone?: string | null;
  profileImage?: string | null;
  relationship?: string | null;
  language?: string | null;
  timezone?: string | null;
  role: string;
  membershipTier?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type UpdateUserProfileInput = {
  name?: string;
  phone?: string | null;
  profileImage?: string | null;
  relationship?: string | null;
  language?: string | null;
};

export const userProfileKeys = {
  all: ['user-profile'] as const,
  profile: () => [...userProfileKeys.all, 'me'] as const,
};

export async function fetchUserProfile(): Promise<UserProfile> {
  const res = await fetch('/api/users/profile', {
    headers: { 'Cache-Control': 'no-cache' },
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to load user profile');
  }
  const data = await res.json();
  return data?.data ?? data;
}

export async function updateUserProfile(input: UpdateUserProfileInput): Promise<UserProfile> {
  const res = await fetch('/api/users/profile', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to update profile');
  }
  const data = await res.json();
  return data?.data ?? data;
}

export async function uploadAvatar(file: File): Promise<string> {
  const formData = new FormData();
  formData.set('file', file, file.name);

  const res = await fetch('/api/uploads/avatars', {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to upload photo');
  }

  const data = await res.json();
  const url = data?.url ?? data?.data?.url;
  if (!url) {
    throw new Error('No image URL returned from upload');
  }
  return url;
}

export function useUserProfile() {
  return useQuery<UserProfile>({
    queryKey: userProfileKeys.profile(),
    queryFn: fetchUserProfile,
    staleTime: 30 * 1000,
  });
}

export function useUpdateUserProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (updated) => {
      queryClient.setQueryData(userProfileKeys.profile(), updated);
      queryClient.invalidateQueries({ queryKey: userProfileKeys.all });
      queryClient.invalidateQueries({ queryKey: ['session'] });
      queryClient.invalidateQueries({ queryKey: ['auth-session'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to save account settings.');
    },
  });
}
