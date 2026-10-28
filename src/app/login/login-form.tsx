'use client';
import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { AuthIcon } from '@/components/auth/auth-icon';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [showRecovery, setShowRecovery] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setError('');
    try {
      const response = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'same-origin', body: JSON.stringify({ email, password }) });
      const result: { error?: string } = await response.json();
      if (!response.ok) { setError(result.error || 'Não foi possível entrar.'); return; }
      window.location.assign('/editais');
    } catch { setError('Falha de conexão local. Verifique a aplicação.'); }
    finally { setLoading(false); }
  }
  return <div className="auth-panel-content">
    <div className="auth-mobile-wordmark">fomentoria<span>.</span></div>
    <div className="auth-login-intro">
      <p className="auth-eyebrow">BEM-VINDO DE VOLTA</p>
      <h1>Acesse sua conta</h1>
      <p className="auth-subtitle">Entre para acompanhar editais e explorar oportunidades de fomento.</p>
    </div>
    <form className="auth-form" onSubmit={handleLogin}>
      <label htmlFor="login-email">E-mail</label>
      <div className="auth-field"><AuthIcon name="mail"/><input id="login-email" type="email" autoComplete="username" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="seuemail@exemplo.com" required maxLength={254}/></div>
      <label htmlFor="login-password">Senha</label>
      <div className="auth-field"><AuthIcon name="lock"/><input id="login-password" type={visible ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Sua senha" required/><button className="auth-eye" type="button" aria-label={visible ? 'Ocultar senha' : 'Mostrar senha'} onClick={()=>setVisible(v=>!v)}><AuthIcon name={visible ? 'eye-off' : 'eye'}/></button></div>
      <div className="auth-recovery"><button type="button" onClick={()=>setShowRecovery(v=>!v)} aria-expanded={showRecovery}>Esqueci minha senha</button></div>
      {showRecovery && <p className="auth-inline-notice" role="status">A recuperação de senha por e-mail ainda não foi implementada. Para contas locais de desenvolvimento, procure o responsável por este ambiente.</p>}
      {error && <p className="auth-error" role="alert">{error}</p>}
      <button className="auth-submit" type="submit" disabled={loading}>{loading ? 'Entrando…' : 'Entrar'} <AuthIcon name="arrow-right"/></button>
    </form>
    <p className="auth-local-caption">Acesso local de desenvolvimento. Não destinado à produção.</p>
    <div className="auth-panel-footer">Ainda não tem uma conta? <Link href="/cadastro">Cadastre-se <AuthIcon name="arrow-right" size={16}/></Link></div>
  </div>;
}
