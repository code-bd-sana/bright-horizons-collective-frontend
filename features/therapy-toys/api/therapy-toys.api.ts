import type { ZodType } from 'zod';

import { ApiError, toApiError } from '@/services/api/client/api-error';
import { browserApi } from '@/services/api/client/browser-client';
import {
  adminTherapyToyFiltersSchema,
  createTherapyToySchema,
  deleteTherapyToyImageEnvelopeSchema,
  deleteTherapyToyImageSchema,
  publicTherapyToyFiltersSchema,
  therapyToyAdminSummaryEnvelopeSchema,
  therapyToyEnvelopeSchema,
  therapyToyFavoriteEnvelopeSchema,
  therapyToyIdSchema,
  therapyToyPageEnvelopeSchema,
  therapyToyUploadEnvelopeSchema,
  therapyToyUploadMetadataSchema,
  updateTherapyToySchema,
} from '../model/therapy-toy.schemas';
import { mapTherapyToy, mapTherapyToyPage } from '../model/therapy-toy.mapper';
import type {
  AdminTherapyToyFilters,
  CreateTherapyToyInput,
  DeleteTherapyToyImageInput,
  DeleteTherapyToyImageResult,
  TherapyToy,
  TherapyToyAdminSummary,
  TherapyToyFavoriteResult,
  TherapyToyFilters,
  TherapyToyPage,
  TherapyToyUploadResult,
  UpdateTherapyToyVariables,
} from '../model/therapy-toy.types';

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

export function getTherapyToys(filters: TherapyToyFilters = {}): Promise<TherapyToyPage> {
  const query = parseInput(publicTherapyToyFiltersSchema, filters);

  return handleApiCall(async () => {
    const response = await browserApi.get('/therapy-toys', { params: query });
    const envelope = parseResponse(therapyToyPageEnvelopeSchema, response.data);
    return mapTherapyToyPage(envelope.data);
  });
}

export function getTherapyToy(id: string): Promise<TherapyToy> {
  const toyId = parseInput(therapyToyIdSchema, id);

  return handleApiCall(async () => {
    const response = await browserApi.get(`/therapy-toys/${toyId}`);
    const envelope = parseResponse(therapyToyEnvelopeSchema, response.data);
    return mapTherapyToy(envelope.data);
  });
}

export function getAdminTherapyToys(filters: AdminTherapyToyFilters = {}): Promise<TherapyToyPage> {
  const query = parseInput(adminTherapyToyFiltersSchema, filters);

  return handleApiCall(async () => {
    const response = await browserApi.get('/therapy-toys/admin', { params: query });
    const envelope = parseResponse(therapyToyPageEnvelopeSchema, response.data);
    return mapTherapyToyPage(envelope.data);
  });
}

export function getAdminTherapyToy(id: string): Promise<TherapyToy> {
  const toyId = parseInput(therapyToyIdSchema, id);

  return handleApiCall(async () => {
    const response = await browserApi.get(`/therapy-toys/admin/${toyId}`);
    const envelope = parseResponse(therapyToyEnvelopeSchema, response.data);
    return mapTherapyToy(envelope.data);
  });
}

export function getAdminTherapyToySummary(): Promise<TherapyToyAdminSummary> {
  return handleApiCall(async () => {
    const response = await browserApi.get('/therapy-toys/admin/summary');
    return parseResponse(therapyToyAdminSummaryEnvelopeSchema, response.data).data;
  });
}

export function createTherapyToy(input: CreateTherapyToyInput): Promise<TherapyToy> {
  const payload = parseInput(createTherapyToySchema, input);

  return handleApiCall(async () => {
    const response = await browserApi.post('/therapy-toys', payload);
    const envelope = parseResponse(therapyToyEnvelopeSchema, response.data);
    return mapTherapyToy(envelope.data);
  });
}

export function updateTherapyToy({ id, input }: UpdateTherapyToyVariables): Promise<TherapyToy> {
  const toyId = parseInput(therapyToyIdSchema, id);
  const payload = parseInput(updateTherapyToySchema, input);

  return handleApiCall(async () => {
    const response = await browserApi.patch(`/therapy-toys/${toyId}`, payload);
    const envelope = parseResponse(therapyToyEnvelopeSchema, response.data);
    return mapTherapyToy(envelope.data);
  });
}

export function deleteTherapyToy(id: string): Promise<TherapyToy> {
  const toyId = parseInput(therapyToyIdSchema, id);

  return handleApiCall(async () => {
    const response = await browserApi.delete(`/therapy-toys/${toyId}`);
    const envelope = parseResponse(therapyToyEnvelopeSchema, response.data);
    return mapTherapyToy(envelope.data);
  });
}

export function uploadTherapyToyImage(file: File): Promise<TherapyToyUploadResult> {
  parseInput(therapyToyUploadMetadataSchema, {
    name: file.name,
    size: file.size,
    type: file.type,
  });

  return handleApiCall(async () => {
    const formData = new FormData();
    formData.set('file', file);

    const response = await browserApi.post('/uploads/therapy-toys', formData);
    return parseResponse(therapyToyUploadEnvelopeSchema, response.data).data;
  });
}

export function deleteTherapyToyImage(
  input: DeleteTherapyToyImageInput
): Promise<DeleteTherapyToyImageResult> {
  const payload = parseInput(deleteTherapyToyImageSchema, input);

  return handleApiCall(async () => {
    const response = await browserApi.delete('/uploads/therapy-toys', { data: payload });
    return parseResponse(deleteTherapyToyImageEnvelopeSchema, response.data).data;
  });
}

export function toggleTherapyToyFavorite(id: string): Promise<TherapyToyFavoriteResult> {
  const toyId = parseInput(therapyToyIdSchema, id);

  return handleApiCall(async () => {
    const response = await browserApi.post(`/favorites/therapy-toys/${toyId}`);
    const result = parseResponse(therapyToyFavoriteEnvelopeSchema, response.data).data;
    return { status: result.status, type: result.type };
  });
}
