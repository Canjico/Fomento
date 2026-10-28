import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { currentLocalSession } from '@/lib/local-auth';
import { AuthShell } from '@/components/auth/auth-shell';
import { LoginForm } from './login-form';

export const metadata: Metadata = { title: 'Entrar | Fomentoria' };
export const dynamic = 'force-dynamic';
export default async function LoginPage() {
  if (await currentLocalSession()) redirect('/editais');
  return <AuthShell mode="login"><LoginForm/></AuthShell>;
}
