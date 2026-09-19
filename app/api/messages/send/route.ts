import { NextRequest, NextResponse } from 'next/server';

import {
  readAuthHeaders,
  safeBackendErrorResponse,
  unauthenticatedResponse,
  validatedUpstreamResponse,
} from '@/lib/api/bff';
import { serverApi } from '@/services/api/client/server-client';
import {
  backendMessageEnvelopeSchema,
  sendMessageJsonSchema,
} from '@/features/messages/model/message.schemas';

export async function POST(request: NextRequest) {
  const authHeaders = await readAuthHeaders();
  if (!authHeaders) return unauthenticatedResponse();

  const contentType = request.headers.get('content-type') || '';

  if (contentType.toLowerCase().startsWith('multipart/form-data')) {
    let formData: FormData;
    try {
      formData = await request.formData();
    } catch {
      return NextResponse.json({ message: 'Invalid multipart form data.' }, { status: 400 });
    }

    const upstreamFormData = new FormData();
    const threadId = formData.get('threadId');
    const content = formData.get('content');
    const file = formData.get('file');

    if (threadId && typeof threadId === 'string') {
      upstreamFormData.append('threadId', threadId);
    }
    if (content && typeof content === 'string') {
      upstreamFormData.append('content', content);
    }
    if (file instanceof File) {
      upstreamFormData.append('file', file, file.name);
    }

    try {
      const response = await serverApi.post('/messages', upstreamFormData, {
        headers: authHeaders,
        maxBodyLength: 12 * 1024 * 1024,
      });
      return validatedUpstreamResponse(
        response.data,
        backendMessageEnvelopeSchema,
        response.status
      );
    } catch (error) {
      return safeBackendErrorResponse(error, 'Unable to send the message.');
    }
  } else {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ message: 'Invalid JSON request body.' }, { status: 400 });
    }

    const parsed = sendMessageJsonSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.issues[0]?.message ?? 'Invalid message payload.' },
        { status: 400 }
      );
    }

    try {
      const response = await serverApi.post('/messages', parsed.data, {
        headers: authHeaders,
      });
      return validatedUpstreamResponse(
        response.data,
        backendMessageEnvelopeSchema,
        response.status
      );
    } catch (error) {
      return safeBackendErrorResponse(error, 'Unable to send the message.');
    }
  }
}
