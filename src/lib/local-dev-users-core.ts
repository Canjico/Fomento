/**
 * Armazenamento restrito a prototipação LOCAL, sem banco multiusuário, e-mail
 * verificado, recuperação de senha, auditoria de sessões ou garantia de produção.
 * Nunca habilitar esta implementação em uma instância publicada.
 */
import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { mkdir, open, readFile, rename, rm, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

export const localAccountTypes = ['pessoa', 'startup', 'empresa', 'consultoria'] as const;
export type LocalAccountType = (typeof localAccountTypes)[number];
export type NewLocalAccount = { name: string; email: string; password: string; accountType: LocalAccountType };
type StoredUser = { id: string; name: string; email: string; passwordHash: string; accountType: LocalAccountType; createdAt: string };
type Store = { version: 1; secret: string; users: StoredUser[] };

const folder = join(process.cwd(), '.local-data');
const file = join(folder, 'accounts.json');
const lock = join(folder, '.accounts.lock');
const NORMAL_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMPTY_SALT = 'constant-salt-for-local-demo';
const EMPTY_HASH = scryptSync('fake-password-not-an-account', EMPTY_SALT, 64);
export function localRegistrationEnabled() { return process.env.NODE_ENV !== 'production'; }
export function normalizeAccountEmail(email: string) { return email.trim().toLowerCase(); }
export function validateLocalAccount(value: NewLocalAccount): string | null {
  if (typeof value.name !== 'string' || value.name.trim().length < 2 || value.name.trim().length > 100) return 'Informe seu nome (2 a 100 caracteres).';
  if (typeof value.email !== 'string' || value.email.length > 254 || !NORMAL_EMAIL.test(normalizeAccountEmail(value.email))) return 'Informe um e-mail válido.';
  if (typeof value.password !== 'string' || value.password.length < 8 || value.password.length > 128 || !/[A-Za-z]/.test(value.password) || !/\d/.test(value.password)) return 'A senha deve ter de 8 a 128 caracteres, incluindo letras e números.';
  if (!localAccountTypes.includes(value.accountType)) return 'Escolha o tipo de conta.';
  return null;
}
async function readStore(): Promise<Store | null> {
  try {
    const value: unknown = JSON.parse(await readFile(file, 'utf8'));
    if (!value || typeof value !== 'object' || !('users' in value) || !('secret' in value)) throw new Error('Arquivo local de contas inválido');
    const candidate = value as Store;
    if (candidate.version !== 1 || !Array.isArray(candidate.users) || typeof candidate.secret !== 'string' || candidate.secret.length < 64) throw new Error('Arquivo local de contas inválido');
    return candidate;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return null;
    throw error;
  }
}
async function withExclusiveLock<T>(action: () => Promise<T>): Promise<T> {
  await mkdir(folder, { recursive: true, mode: 0o700 });
  let handle: Awaited<ReturnType<typeof open>> | undefined;
  for (let attempt = 0; attempt < 100; attempt++) {
    try { handle = await open(lock, 'wx', 0o600); break; }
    catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'EEXIST') throw error;
      // Um lock muito antigo após interrupção do processo pode ser recuperado.
      try { if (Date.now() - (await stat(lock)).mtimeMs > 30_000) await rm(lock); } catch { /* outro processo já removeu */ }
      await new Promise((resolve) => setTimeout(resolve, 20));
    }
  }
  if (!handle) throw new Error('Armazenamento local indisponível temporariamente.');
  try { return await action(); }
  finally { await handle.close(); await rm(lock, { force: true }); }
}
export async function createLocalAccount(value: NewLocalAccount): Promise<{ id: string; email: string }> {
  if (!localRegistrationEnabled()) throw new Error('Cadastro local indisponível.');
  const error = validateLocalAccount(value);
  if (error) throw new Error(error);
  return withExclusiveLock(async () => {
    const store: Store = (await readStore()) ?? { version: 1, secret: randomBytes(48).toString('hex'), users: [] };
    const email = normalizeAccountEmail(value.email);
    if (store.users.some((user) => user.email === email)) throw new Error('Este e-mail já está cadastrado neste ambiente local.');
    const salt = randomBytes(24).toString('hex');
    const passwordHash = `scrypt:${salt}:${scryptSync(value.password, salt, 64).toString('hex')}`;
    const id = randomBytes(16).toString('hex');
    store.users.push({ id, name: value.name.trim(), email, passwordHash, accountType: value.accountType, createdAt: new Date().toISOString() });
    const temp = join(folder, `accounts-${randomBytes(8).toString('hex')}.tmp`);
    try {
      await writeFile(temp, JSON.stringify(store, null, 2) + '\n', { flag: 'wx', mode: 0o600 });
      await rename(temp, file);
    } finally { await rm(temp, { force: true }); }
    return { id, email };
  });
}
export async function verifyLocalAccount(email: string, password: string): Promise<{ id: string; email: string } | null> {
  if (!localRegistrationEnabled() || !email || email.length > 254 || !password || password.length > 128) return null;
  const store = await readStore();
  const user = store?.users.find((entry) => entry.email === normalizeAccountEmail(email));
  const [, salt, hex] = user?.passwordHash.split(':') ?? [];
  const expected = hex && /^[a-f\d]{128}$/i.test(hex) ? Buffer.from(hex, 'hex') : EMPTY_HASH;
  const derived = scryptSync(password, salt || EMPTY_SALT, 64);
  if (!timingSafeEqual(derived, expected) || !user) return null;
  return { id: user.id, email: user.email };
}
function sign(secret: string, payload: string) { return createHmac('sha256', secret).update(payload).digest('base64url'); }
export async function makeLocalAccountToken(user: { id: string; email: string }, now = Date.now()) {
  if (!localRegistrationEnabled()) throw new Error('Acesso local indisponível.');
  const store = await readStore();
  if (!store || !store.users.some((item) => item.id === user.id && item.email === user.email)) throw new Error('Conta local inválida');
  const payload = Buffer.from(JSON.stringify({ kind: 'demo-user', sub: user.id, exp: now + 8 * 60 * 60 * 1000 })).toString('base64url');
  return `${payload}.${sign(store.secret, payload)}`;
}
export async function isLocalAccountTokenValid(token: string | undefined, now = Date.now()): Promise<boolean> {
  if (!localRegistrationEnabled() || !token || token.length > 4096) return false;
  const [payload, provided, extra] = token.split('.');
  if (!payload || !provided || extra) return false;
  const store = await readStore();
  if (!store) return false;
  const expected = Buffer.from(sign(store.secret, payload));
  const actual = Buffer.from(provided);
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return false;
  try {
    const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as { kind?: string; sub?: string; exp?: number };
    return parsed.kind === 'demo-user' && typeof parsed.exp === 'number' && parsed.exp > now && store.users.some((user) => user.id === parsed.sub);
  } catch { return false; }
}
