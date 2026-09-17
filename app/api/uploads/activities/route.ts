import { NextRequest, NextResponse } from 'next/server';

import {
  readAuthHeaders,
  safeBackendErrorResponse,
  unauthenticatedResponse,
  validatedUpstreamResponse,
  validateMutationContentType,
} from '@/lib/api/bff';
import { serverApi } from '@/services/api/client/server-client';
import {
  activityUploadEnvelopeSchema,
  activityUploadMetadataSchema,
} from '@/features/activities/model/activity.schemas';

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

  const metadata = activityUploadMetadataSchema.safeParse({
    name: file.name,
    size: file.size,
    type: file.type,
  });

  if (!metadata.success) {
    return NextResponse.json(
      { message: metadata.error.issues[0]?.message ?? 'Invalid activity image.' },
      { status: 400 }
    );
  }

  const upstreamFormData = new FormData();
  upstreamFormData.set('file', file, file.name);

  try {
    const response = await serverApi.post('/uploads/activities', upstreamFormData, {
      headers: authHeaders,
      maxBodyLength: 6 * 1024 * 1024,
    });
    return validatedUpstreamResponse(response.data, activityUploadEnvelopeSchema, response.status);
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to upload the activity image.');
  }
}
