/**
 * Primitivas puras do acesso LOCAL (não destinadas a auth multiusuário de produção).
 * Separadas da API Next para testes sem dependências externas.
 */
import { createHmac, scryptSync, timingSafeEqual } from 'node:crypto';

export type LocalAuthConfig = { email: string; passwordHash: string; sessionSecret: string };
export function isLocalAuthConfigValid(config: LocalAuthConfig): boolean {
  const [algorithm, salt, hex] = config.passwordHash.split(':');
  return Boolean(config.email && config.sessionSecret.length >= 32 && algorithm === 'scrypt' && salt && /^[a-f\d]{128}$/i.test(hex ?? ''));
}
export function localPasswordMatches(config: LocalAuthConfig, email: string, password: string): boolean {
  if (!isLocalAuthConfigValid(config) || !password || password.length > 1024 || email.length > 254) return false;
  const [, salt, hex] = config.passwordHash.split(':');
  const actual = scryptSync(password, salt, 64);
  return timingSafeEqual(actual, Buffer.from(hex, 'hex')) && email.trim().toLowerCase() === config.email.trim().toLowerCase();
}
function signature(config: LocalAuthConfig, payload: string) {
  return createHmac('sha256', config.sessionSecret).update(payload).digest('base64url');
}
export function makeLocalToken(config: LocalAuthConfig, now = Date.now(), maxAgeMs = 8 * 60 * 60 * 1000): string {
  if (!isLocalAuthConfigValid(config)) throw new Error('Configuração de login local inválida');
  const payload = Buffer.from(JSON.stringify({ email: config.email, exp: now + maxAgeMs })).toString('base64url');
  return `${payload}.${signature(config, payload)}`;
}
export function localTokenValid(config: LocalAuthConfig, token: string | undefined, now = Date.now()): boolean {
  if (!isLocalAuthConfigValid(config) || !token || token.length > 4096) return false;
  const [payload, provided, extra] = token.split('.');
  if (!payload || !provided || extra) return false;
  try {
    const expected = Buffer.from(signature(config, payload));
    const actual = Buffer.from(provided);
    if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return false;
    const value: unknown = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (!value || typeof value !== 'object' || !('email' in value) || !('exp' in value)) return false;
    const record = value as { email: unknown; exp: unknown };
    return record.email === config.email && typeof record.exp === 'number' && record.exp > now;
  } catch { return false; }
}
