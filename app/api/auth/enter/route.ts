import { NextRequest, NextResponse } from 'next/server';

const INVITE_CODE = process.env.INVITE_CODE;
const COOKIE_NAME = 'speakeasier_access';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export async function POST(request: NextRequest) {
  const { code } = await request.json();

  if (!INVITE_CODE || code !== INVITE_CODE) {
    return new NextResponse(JSON.stringify({ error: 'Invalid code' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const response = new NextResponse(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });

  response.cookies.set(COOKIE_NAME, INVITE_CODE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  });

  return response;
}
