import { NextRequest, NextResponse } from 'next/server';

import {
  parseJsonRequest,
  readAuthHeaders,
  safeBackendErrorResponse,
  unauthenticatedResponse,
  validatedUpstreamResponse,
  validateMutationContentType,
} from '@/lib/api/bff';
import { serverApi } from '@/services/api/client/server-client';
import {
  deleteTherapyToyImageEnvelopeSchema,
  deleteTherapyToyImageSchema,
  therapyToyUploadEnvelopeSchema,
  therapyToyUploadMetadataSchema,
} from '@/features/therapy-toys/model/therapy-toy.schemas';

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
    return NextResponse.json({ message: 'Exactly one image file is required.' }, { status: 400 });
  }

  const metadata = therapyToyUploadMetadataSchema.safeParse({
    name: file.name,
    size: file.size,
    type: file.type,
  });

  if (!metadata.success) {
    return NextResponse.json(
      { message: metadata.error.issues[0]?.message ?? 'Invalid therapy toy image.' },
      { status: 400 }
    );
  }

  const upstreamFormData = new FormData();
  upstreamFormData.set('file', file, file.name);

  try {
    const response = await serverApi.post('/uploads/therapy-toys', upstreamFormData, {
      headers: authHeaders,
      // Multipart framing adds a small amount beyond the file's five-megabyte limit.
      maxBodyLength: 6 * 1024 * 1024,
    });
    return validatedUpstreamResponse(
      response.data,
      therapyToyUploadEnvelopeSchema,
      response.status
    );
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to upload the therapy toy image.');
  }
}

export async function DELETE(request: NextRequest) {
  const invalidRequest = validateMutationContentType(request, 'json');
  if (invalidRequest) return invalidRequest;

  const authHeaders = await readAuthHeaders();
  if (!authHeaders) return unauthenticatedResponse();

  const input = await parseJsonRequest(request, deleteTherapyToyImageSchema);
  if ('response' in input) return input.response;

  try {
    const response = await serverApi.delete('/uploads/therapy-toys', {
      data: input.data,
      headers: authHeaders,
    });
    return validatedUpstreamResponse(response.data, deleteTherapyToyImageEnvelopeSchema);
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to delete the therapy toy image.');
  }
}
