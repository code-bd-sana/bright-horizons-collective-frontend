import { NextRequest, NextResponse } from 'next/server';

import {
  readAuthHeaders,
  safeBackendErrorResponse,
  unauthenticatedResponse,
  validatedUpstreamResponse,
  validateMutationContentType,
} from '@/lib/api/bff';
import { serverApi } from '@/services/api/client/server-client';
import { parentResourceUploadEnvelopeSchema } from '@/features/parent-resources/model/parent-resource.schemas';

export async function POST(request: NextRequest) {
  const invalidRequest = validateMutationContentType(request, 'multipart');
  if (invalidRequest) return invalidRequest;

  const authHeaders = await readAuthHeaders();
  if (!authHeaders) return unauthenticatedResponse();

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ message: 'Invalid multipart request.' }, { status: 400 });
  }

  const files = formData.getAll('file');
  const [file] = files;
  const hasUnexpectedFields = [...formData.keys()].some((key) => key !== 'file');

  if (files.length !== 1 || hasUnexpectedFields || !(file instanceof File)) {
    return NextResponse.json({ message: 'Exactly one file is required.' }, { status: 400 });
  }

  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json(
      { message: 'File size exceeds maximum allowed limit (10MB).' },
      { status: 400 }
    );
  }

  const upstreamFormData = new FormData();
  upstreamFormData.set('file', file, file.name);

  try {
    const response = await serverApi.post('/uploads/parent-resources', upstreamFormData, {
      headers: authHeaders,
      maxBodyLength: 12 * 1024 * 1024,
    });
    return validatedUpstreamResponse(
      response.data,
      parentResourceUploadEnvelopeSchema,
      response.status
    );
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to upload the parent resource file.');
  }
}
