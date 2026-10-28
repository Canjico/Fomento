import { NextRequest, NextResponse } from 'next/server';
import { makeLocalAccountToken, verifyLocalAccount } from '@/lib/local-dev-users';
import { createLocalSession, localAuthConfigured, localSessionCookie, verifyLocalPassword } from '@/lib/local-auth';

export const runtime = 'nodejs';
// Defesa básica em memória, apenas para ambiente de desenvolvimento single-process.
// Não é rate limiting distribuído nem autenticação apropriada para produção.
const attempts = new Map<string, { count: number; resetAt: number }>();

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  let sameOrigin = false;
  try { sameOrigin = Boolean(origin && new URL(origin).host === request.headers.get('host')); } catch { /* origem malformada */ }
  if (!sameOrigin) {
    return NextResponse.json({ error: 'Origem não autorizada.' }, { status: 403 });
  }
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'local';
  const key = ip.slice(0, 80);
  const now = Date.now();
  const record = attempts.get(key);
  if (record && record.resetAt > now && record.count >= 8) {
    return NextResponse.json({ error: 'Muitas tentativas. Tente novamente em alguns minutos.' }, { status: 429 });
  }
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'Dados inválidos.' }, { status: 400 }); }
  if (!body || typeof body !== 'object' || !('email' in body) || !('password' in body)) {
    return NextResponse.json({ error: 'Dados inválidos.' }, { status: 400 });
  }
  const { email, password } = body as { email?: unknown; password?: unknown };
  if (typeof email !== 'string' || typeof password !== 'string' || email.length > 254 || password.length > 1024) {
    return NextResponse.json({ error: 'Dados inválidos.' }, { status: 400 });
  }
  const legacyOk = localAuthConfigured() && verifyLocalPassword(email, password);
  const registered = legacyOk ? null : await verifyLocalAccount(email, password);
  if (!legacyOk && !registered) {
    attempts.set(key, { count: (record && record.resetAt > now ? record.count : 0) + 1, resetAt: record && record.resetAt > now ? record.resetAt : now + 15 * 60 * 1000 });
    return NextResponse.json({ error: 'E-mail ou senha inválidos.' }, { status: 401 });
  }
  attempts.delete(key);
  const response = NextResponse.json({ ok: true, redirectTo: '/editais' }, { headers: { 'Cache-Control': 'no-store' } });
  response.cookies.set(localSessionCookie.name, legacyOk ? createLocalSession() : await makeLocalAccountToken(registered!), {
    httpOnly: true, secure: request.nextUrl.protocol === 'https:', sameSite: 'lax', path: '/', maxAge: localSessionCookie.maxAge,
  });
  return response;
}
