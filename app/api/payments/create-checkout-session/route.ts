import { NextRequest, NextResponse } from 'next/server';
import {
  readAuthHeaders,
  safeBackendErrorResponse,
  unauthenticatedResponse,
  validateMutationContentType,
} from '@/lib/api/bff';
import { serverApi } from '@/services/api/client/server-client';

export async function POST(request: NextRequest) {
  const invalidContent = validateMutationContentType(request, 'json');
  if (invalidContent) return invalidContent;

  const authHeaders = await readAuthHeaders();
  if (!authHeaders) return unauthenticatedResponse();

  try {
    const body = await request.json();
    const response = await serverApi.post('/payments/create-checkout-session', body, {
      headers: authHeaders,
    });
    return NextResponse.json(response.data);
  } catch (error) {
    return safeBackendErrorResponse(error, 'Unable to create checkout session.');
  }
}
