import { NextRequest, NextResponse } from 'next/server';
import { backendErrorResponse, validateJsonRequest } from '@/lib/auth/route-utils';
import { backendVerifyOtpResponseSchema, verifyOtpSchema } from '@/services/api/auth/auth.schemas';
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

  const input = verifyOtpSchema.safeParse(body);
  if (!input.success) {
    return NextResponse.json(
      { message: input.error.issues[0]?.message ?? 'Enter a valid verification code.' },
      { status: 400 }
    );
  }

  try {
    const backendResponse = await serverApi.post('/auth/verify-otp', input.data);
    const parsed = backendVerifyOtpResponseSchema.parse(backendResponse.data);
    return NextResponse.json(
      { resetToken: parsed.data.reset_token },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (error) {
    return backendErrorResponse(error, 'Unable to verify the code. Please try again.');
  }
}
