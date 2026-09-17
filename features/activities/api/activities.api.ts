import type { ZodType } from 'zod';

import { ApiError, toApiError } from '@/services/api/client/api-error';
import { browserApi } from '@/services/api/client/browser-client';
import {
  activityUploadEnvelopeSchema,
  activityUploadMetadataSchema,
  backendActivitiesListEnvelopeSchema,
  backendActivityEnvelopeSchema,
} from '../model/activity.schemas';
import type { Activity, CreateActivityInput } from '../model/activity.types';

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

export function createActivity(input: CreateActivityInput): Promise<Activity> {
  return handleApiCall(async () => {
    const response = await browserApi.post('/activities/admin', input);
    const envelope = parseResponse(backendActivityEnvelopeSchema, response.data);
    return envelope.data as Activity;
  });
}

export function uploadActivityImage(file: File): Promise<{ url: string }> {
  parseInput(activityUploadMetadataSchema, {
    name: file.name,
    size: file.size,
    type: file.type,
  });

  return handleApiCall(async () => {
    const formData = new FormData();
    formData.set('file', file, file.name);

    const response = await browserApi.post('/uploads/activities', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    const envelope = parseResponse(activityUploadEnvelopeSchema, response.data);
    return envelope.data;
  });
}

export function getAdminActivities(params: Record<string, unknown> = {}): Promise<{
  data: Activity[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}> {
  return handleApiCall(async () => {
    const response = await browserApi.get('/activities/admin', { params });
    const envelope = parseResponse(backendActivitiesListEnvelopeSchema, response.data);
    return envelope.data as {
      data: Activity[];
      meta: { total: number; page: number; limit: number; totalPages: number };
    };
  });
}
