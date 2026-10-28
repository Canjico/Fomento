import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { currentLocalSession } from '@/lib/local-auth';
import { AuthShell } from '@/components/auth/auth-shell';
import { RegisterForm } from './register-form';

export const metadata: Metadata = { title: 'Criar conta | Fomentoria' };
export const dynamic = 'force-dynamic';
export default async function CadastroPage() {
  if (await currentLocalSession()) redirect('/editais');
  return <AuthShell mode="cadastro"><RegisterForm/></AuthShell>;
}
