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
