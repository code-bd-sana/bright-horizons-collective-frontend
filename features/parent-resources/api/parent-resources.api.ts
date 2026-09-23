import type { ZodType } from 'zod';

import { ApiError, toApiError } from '@/services/api/client/api-error';
import { browserApi } from '@/services/api/client/browser-client';
import {
  backendParentResourceEnvelopeSchema,
  backendParentResourcesListEnvelopeSchema,
  parentResourceAdminSummaryEnvelopeSchema,
  parentResourceIdSchema,
  parentResourceUploadEnvelopeSchema,
} from '../model/parent-resource.schemas';
import type {
  CreateParentResourceInput,
  ParentResource,
  ParentResourceSummary,
  ResourceAttachment,
  UpdateParentResourceVariables,
} from '../model/parent-resource.types';

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

export function createParentResource(input: CreateParentResourceInput): Promise<ParentResource> {
  return handleApiCall(async () => {
    const response = await browserApi.post('/parent-resources', input);
    const envelope = parseResponse(backendParentResourceEnvelopeSchema, response.data);
    return envelope.data as ParentResource;
  });
}

export function uploadParentResourceFile(file: File): Promise<{ url: string }> {
  return handleApiCall(async () => {
    const formData = new FormData();
    formData.set('file', file, file.name);

    const response = await browserApi.post('/uploads/parent-resources', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    const envelope = parseResponse(parentResourceUploadEnvelopeSchema, response.data);
    return envelope.data;
  });
}

export async function uploadResourceAttachment(file: File): Promise<ResourceAttachment> {
  const uploadResult = await uploadParentResourceFile(file);
  return {
    name: file.name,
    url: uploadResult.url,
    size: file.size,
    type: file.type,
  };
}

export function getParentResources(params: Record<string, unknown> = {}): Promise<{
  data: ParentResource[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}> {
  return handleApiCall(async () => {
    const response = await browserApi.get('/parent-resources', { params });
    const envelope = parseResponse(backendParentResourcesListEnvelopeSchema, response.data);

    if (Array.isArray(envelope.data)) {
      return {
        data: envelope.data as ParentResource[],
        meta: {
          total: envelope.data.length,
          page: 1,
          limit: envelope.data.length,
          totalPages: 1,
        },
      };
    }

    return envelope.data as {
      data: ParentResource[];
      meta: { total: number; page: number; limit: number; totalPages: number };
    };
  });
}

export function getParentResource(id: string): Promise<ParentResource> {
  const resourceId = parseInput(parentResourceIdSchema, id);

  return handleApiCall(async () => {
    const response = await browserApi.get(`/parent-resources/${resourceId}`);
    const envelope = parseResponse(backendParentResourceEnvelopeSchema, response.data);
    return envelope.data as ParentResource;
  });
}

export function getAdminParentResourceSummary(): Promise<ParentResourceSummary> {
  return handleApiCall(async () => {
    const response = await browserApi.get('/parent-resources/admin/summary');
    const envelope = parseResponse(parentResourceAdminSummaryEnvelopeSchema, response.data);
    return envelope.data as ParentResourceSummary;
  });
}

export function updateParentResource({
  id,
  input,
}: UpdateParentResourceVariables): Promise<ParentResource> {
  const resourceId = parseInput(parentResourceIdSchema, id);

  return handleApiCall(async () => {
    const response = await browserApi.patch(`/parent-resources/${resourceId}`, input);
    const envelope = parseResponse(backendParentResourceEnvelopeSchema, response.data);
    return envelope.data as ParentResource;
  });
}

export function deleteParentResource(id: string): Promise<ParentResource> {
  const resourceId = parseInput(parentResourceIdSchema, id);

  return handleApiCall(async () => {
    const response = await browserApi.delete(`/parent-resources/${resourceId}`);
    const envelope = parseResponse(backendParentResourceEnvelopeSchema, response.data);
    return envelope.data as ParentResource;
  });
}

export function toggleParentResourceFavorite(
  id: string
): Promise<{ status: string; type: string }> {
  const resourceId = parseInput(parentResourceIdSchema, id);

  return handleApiCall(async () => {
    const response = await browserApi.post(`/favorites/parent-resources/${resourceId}`);
    return response.data.data;
  });
}

export function getParentResourceFavorites(): Promise<{ resourceIds: string[] }> {
  return handleApiCall(async () => {
    try {
      const response = await browserApi.get('/favorites');
      const data = response.data?.data;
      const resources = (data?.resources ?? []) as Array<{
        resourceId?: string;
        resource?: { id?: string };
      }>;
      return {
        resourceIds: resources
          .map((favorite) => favorite.resource?.id ?? favorite.resourceId)
          .filter((id): id is string => Boolean(id)),
      };
    } catch {
      return { resourceIds: [] };
    }
  });
}
