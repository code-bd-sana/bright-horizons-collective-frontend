import { NextRequest, NextResponse } from 'next/server';
import {
  readAuthHeaders,
  safeBackendErrorResponse,
  unauthenticatedResponse,
  validateMutationContentType,
} from '@/lib/api/bff';
import { serverApi } from '@/services/api/client/server-client';

const MAX_AVATAR_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];

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

  if (files.length !== 1 || !(file instanceof File)) {
    return NextResponse.json({ message: 'Exactly one image file is required.' }, { status: 400 });
  }

  if (file.size > MAX_AVATAR_SIZE) {
    return NextResponse.json(
      { message: 'Image size exceeds maximum limit of 5MB.' },
      { status: 400 }
    );
  }

  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return NextResponse.json(
      { message: 'Only JPG, PNG, and WebP images are allowed.' },
      { status: 400 }
    );
  }

  const upstreamFormData = new FormData();
  upstreamFormData.set('file', file, file.name);

  try {
    const response = await serverApi.post('/uploads/avatars', upstreamFormData, {
      headers: authHeaders,
      maxBodyLength: 6 * 1024 * 1024,
    });

    const responseData = response.data?.data ?? response.data;
    return NextResponse.json({ url: responseData.url, data: responseData });
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to upload profile picture.');
  }
}
