import type { ZodType } from 'zod';

import { ApiError, toApiError } from '@/services/api/client/api-error';
import { browserApi } from '@/services/api/client/browser-client';
import {
  backendChildEnvelopeSchema,
  backendChildrenListEnvelopeSchema,
  childIdSchema,
  childUploadEnvelopeSchema,
  childUploadMetadataSchema,
  createChildProfileSchema,
  updateChildProfileSchema,
} from '../model/child-profile.schemas';
import type {
  ChildProfile,
  CreateChildProfileInput,
  UpdateChildProfileInput,
} from '../model/child-profile.types';

function parseInput<T>(schema: ZodType<T>, value: unknown): T {
  const parsed = schema.safeParse(value);
  if (!parsed.success) {
    throw new ApiError(parsed.error.issues[0]?.message ?? 'Invalid request.', 400);
  }
  return parsed.data;
}

function parseResponse<T>(schema: ZodType<T>, value: unknown): T {
  const parsed = schema.safeParse(value);
  if (!parsed.success) {
    throw new ApiError('The server returned an invalid response.', 502, 'INVALID_RESPONSE');
  }
  return parsed.data;
}

async function handleApiCall<T>(request: () => Promise<T>): Promise<T> {
  try {
    return await request();
  } catch (error) {
    throw toApiError(error);
  }
}

export function createChildProfile(input: CreateChildProfileInput): Promise<ChildProfile> {
  const payload = parseInput(createChildProfileSchema, input);

  return handleApiCall(async () => {
    const response = await browserApi.post('/child-profiles', payload);
    const envelope = parseResponse(backendChildEnvelopeSchema, response.data);
    return envelope.data as ChildProfile;
  });
}

export function getChildProfiles(): Promise<ChildProfile[]> {
  return handleApiCall(async () => {
    const response = await browserApi.get('/child-profiles');
    const envelope = parseResponse(backendChildrenListEnvelopeSchema, response.data);
    return envelope.data as ChildProfile[];
  });
}

export function getChildProfile(id: string): Promise<ChildProfile> {
  const childId = parseInput(childIdSchema, id);

  return handleApiCall(async () => {
    const response = await browserApi.get(`/child-profiles/${childId}`);
    const envelope = parseResponse(backendChildEnvelopeSchema, response.data);
    return envelope.data as ChildProfile;
  });
}

export function updateChildProfile(
  id: string,
  input: UpdateChildProfileInput
): Promise<ChildProfile> {
  const childId = parseInput(childIdSchema, id);
  const payload = parseInput(updateChildProfileSchema, input);

  return handleApiCall(async () => {
    const response = await browserApi.patch(`/child-profiles/${childId}`, payload);
    const envelope = parseResponse(backendChildEnvelopeSchema, response.data);
    return envelope.data as ChildProfile;
  });
}

export function deleteChildProfile(id: string): Promise<void> {
  const childId = parseInput(childIdSchema, id);

  return handleApiCall(async () => {
    await browserApi.delete(`/child-profiles/${childId}`);
  });
}

export function uploadChildAvatar(file: File): Promise<{ url: string }> {
  parseInput(childUploadMetadataSchema, {
    name: file.name,
    size: file.size,
    type: file.type,
  });

  return handleApiCall(async () => {
    const formData = new FormData();
    formData.set('file', file, file.name);

    const response = await browserApi.post('/uploads/children', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    const envelope = parseResponse(childUploadEnvelopeSchema, response.data);
    return envelope.data;
  });
}

export type ChildDevelopmentProgress = {
  fineMotorProgress: number;
  grossMotorProgress: number;
  sensoryProgress: number;
  coordinationProgress: number;
  visualMotorProgress: number;
  therapistNotes?: string | null;
  reportMonth?: string | null;
};

export function getChildProgress(id: string): Promise<ChildDevelopmentProgress> {
  const childId = parseInput(childIdSchema, id);

  return handleApiCall(async () => {
    const response = await browserApi.get(`/child-progress/${childId}/progress`);
    const data = response.data?.data ?? response.data;
    return data as ChildDevelopmentProgress;
  });
}

export type ChildCompletedActivitiesResponse = {
  completedActivityIds: string[];
  completions: Array<{
    id: string;
    activityId: string;
    completedAt: string;
  }>;
};

export function getChildCompletedActivities(id: string): Promise<ChildCompletedActivitiesResponse> {
  const childId = parseInput(childIdSchema, id);

  return handleApiCall(async () => {
    const response = await browserApi.get(`/child-progress/${childId}/completed-activities`);
    const data = response.data?.data ?? response.data;
    return data as ChildCompletedActivitiesResponse;
  });
}

export type ChildRecentActivity = {
  id: string;
  activityId: string;
  childId?: string | null;
  weeklyPlanId?: string | null;
  completedAt: string;
  difficulty?: string | null;
  rating?: number | null;
  parentNotes?: string | null;
  artworkUrl?: string | null;
  reflections?: string[] | string | null;
  activity?: {
    id: string;
    title: string;
    description?: string | null;
    shortDescription?: string | null;
    developmentCategory?: string | null;
    developmentGoal?: string | null;
    estimatedDuration?: string | null;
    featuredImageUrl?: string | null;
    materialsSummary?: string | null;
    difficultyLevel?: string | null;
  } | null;
};

export function getChildRecentActivities(
  childId: string,
  limit = 5
): Promise<ChildRecentActivity[]> {
  const id = parseInput(childIdSchema, childId);

  return handleApiCall(async () => {
    const response = await browserApi.get(`/child-progress/${id}/recent-activities`, {
      params: { limit },
    });
    const data = response.data?.data ?? response.data;
    return (Array.isArray(data) ? data : []) as ChildRecentActivity[];
  });
}
