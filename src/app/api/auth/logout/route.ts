import { NextRequest, NextResponse } from 'next/server';
import { localSessionCookie } from '@/lib/local-auth';

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  let sameOrigin = false;
  try { sameOrigin = Boolean(origin && new URL(origin).host === request.headers.get('host')); } catch { /* origem malformada */ }
  if (!sameOrigin) return NextResponse.json({ error: 'Origem não autorizada.' }, { status: 403 });
  const response = NextResponse.redirect(new URL('/', request.url), { status: 303 });
  response.cookies.set(localSessionCookie.name, '', { path: '/', httpOnly: true, maxAge: 0, sameSite: 'lax' });
  return response;
}
