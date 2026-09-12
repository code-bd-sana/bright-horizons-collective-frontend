import { NextRequest, NextResponse } from 'next/server';
import { backendErrorResponse, validateJsonRequest } from '@/lib/auth/route-utils';
import {
  backendMessageResponseSchema,
  resetPasswordRequestSchema,
} from '@/services/api/auth/auth.schemas';
import { serverApi } from '@/services/api/client/server-client';

export async function POST(request: NextRequest) {
  const invalidRequest = validateJsonRequest(request);
  if (invalidRequest) return invalidRequest;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: 'Invalid request body.' }, { status: 400 });
  }

  const input = resetPasswordRequestSchema.safeParse(body);
  if (!input.success) {
    return NextResponse.json(
      { message: input.error.issues[0]?.message ?? 'Invalid password reset details.' },
      { status: 400 }
    );
  }

  try {
    const backendResponse = await serverApi.post('/auth/reset-password', input.data);
    const parsed = backendMessageResponseSchema.parse(backendResponse.data);
    return NextResponse.json(
      { message: parsed.message },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (error) {
    return backendErrorResponse(error, 'Unable to reset your password. Please try again.');
  }
}
