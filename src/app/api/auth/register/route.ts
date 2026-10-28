import { NextRequest, NextResponse } from 'next/server';
import { createLocalAccount, localAccountTypes, localRegistrationEnabled, type LocalAccountType } from '@/lib/local-dev-users';
import { localSessionCookie } from '@/lib/local-auth';
import { makeLocalAccountToken } from '@/lib/local-dev-users';

export const runtime = 'nodejs';
const attempts = new Map<string, { count: number; resetAt: number }>();
export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  try { if (!origin || new URL(origin).host !== request.headers.get('host')) return NextResponse.json({ error: 'Origem não autorizada.' }, { status: 403 }); }
  catch { return NextResponse.json({ error: 'Origem não autorizada.' }, { status: 403 }); }
  if (!localRegistrationEnabled()) return NextResponse.json({ error: 'Cadastro disponível apenas no ambiente de desenvolvimento local.' }, { status: 503 });
  const ip = (request.headers.get('x-forwarded-for')?.split(',')[0] ?? 'local').trim().slice(0, 80);
  const now = Date.now();
  const current = attempts.get(ip);
  if (current && now < current.resetAt && current.count >= 6) return NextResponse.json({ error: 'Muitas tentativas. Tente mais tarde.' }, { status: 429 });
  const length = Number(request.headers.get('content-length') ?? 0);
  if (length > 8192) return NextResponse.json({ error: 'Dados excedem o tamanho permitido.' }, { status: 413 });
  let body: unknown;
  try { const raw = await request.text(); if (raw.length > 8192) throw new Error('payload'); body = JSON.parse(raw); }
  catch { return NextResponse.json({ error: 'Dados inválidos.' }, { status: 400 }); }
  if (!body || typeof body !== 'object') return NextResponse.json({ error: 'Dados inválidos.' }, { status: 400 });
  const { name, email, password, accountType, acceptedLocalTerms } = body as Record<string, unknown>;
  if (acceptedLocalTerms !== true) return NextResponse.json({ error: 'Confirme que leu as informações do ambiente demonstrativo.' }, { status: 400 });
  if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string' || typeof accountType !== 'string' || !localAccountTypes.includes(accountType as LocalAccountType)) {
    return NextResponse.json({ error: 'Revise os dados informados.' }, { status: 400 });
  }
  attempts.set(ip, { count: (current && current.resetAt > now ? current.count : 0) + 1, resetAt: current && current.resetAt > now ? current.resetAt : now + 15 * 60 * 1000 });
  try {
    const user = await createLocalAccount({ name, email, password, accountType: accountType as LocalAccountType });
    const response = NextResponse.json({ ok: true, redirectTo: '/editais' }, { status: 201, headers: { 'Cache-Control': 'no-store' } });
    response.cookies.set(localSessionCookie.name, await makeLocalAccountToken(user), { httpOnly: true, secure: request.nextUrl.protocol === 'https:', sameSite: 'lax', path: '/', maxAge: localSessionCookie.maxAge });
    return response;
  } catch (error) {
    const reason = error instanceof Error ? error.message : 'Não foi possível criar sua conta local.';
    const known = /e-mail já está cadastrado|Informe|Escolha|senha deve/i.test(reason);
    return NextResponse.json({ error: known ? reason : 'Falha ao criar conta local. Verifique as permissões de escrita do projeto.' }, { status: known ? 400 : 500 });
  }
}
