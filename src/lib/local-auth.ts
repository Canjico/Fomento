import 'server-only';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { isLocalAccountTokenValid } from './local-dev-users';
import { isLocalAuthConfigValid, localPasswordMatches, makeLocalToken, localTokenValid, type LocalAuthConfig } from './local-auth-core';

const COOKIE = 'fomentoria_local_session';
const MAX_AGE_SECONDS = 60 * 60 * 8;
function config(): LocalAuthConfig {
  return { email: process.env.FOMENTO_LOCAL_EMAIL ?? '', passwordHash: process.env.FOMENTO_LOCAL_PASSWORD_HASH ?? '', sessionSecret: process.env.FOMENTO_LOCAL_SESSION_SECRET ?? '' };
}
export function localAuthConfigured(): boolean { return isLocalAuthConfigValid(config()); }
export function verifyLocalPassword(email: string, password: string): boolean { return localPasswordMatches(config(), email, password); }
export function createLocalSession(): string { return makeLocalToken(config()); }
export function verifyLocalSession(token: string | undefined): boolean { return localTokenValid(config(), token); }
export async function currentLocalSession(): Promise<boolean> {
  const token = (await cookies()).get(COOKIE)?.value;
  return verifyLocalSession(token) || await isLocalAccountTokenValid(token);
}
export async function requireLocalSession(): Promise<void> {
  if (!(await currentLocalSession())) redirect('/login');
}
export const localSessionCookie = { name: COOKIE, maxAge: MAX_AGE_SECONDS };
