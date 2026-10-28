'use client';
import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { AuthIcon } from '@/components/auth/auth-icon';

type AccountType = '' | 'pessoa' | 'startup' | 'empresa' | 'consultoria';
export function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState<AccountType>('');
  const [acceptedLocalTerms, setAcceptedLocalTerms] = useState(false);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  async function handleRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError('');
    if (!/[A-Za-z]/.test(password) || !/\d/.test(password) || password.length < 8) { setError('A senha precisa de pelo menos 8 caracteres, com letras e números.'); return; }
    if (!accountType || !acceptedLocalTerms) { setError('Selecione o tipo de conta e confirme o uso demonstrativo.'); return; }
    setLoading(true);
    try {
      const response = await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'same-origin', body: JSON.stringify({ name, email, password, accountType, acceptedLocalTerms }) });
      const result: { error?: string } = await response.json();
      if (!response.ok) { setError(result.error || 'Não foi possível criar a conta local.'); return; }
      window.location.assign('/editais');
    } catch { setError('Falha de conexão local. Verifique a aplicação.'); }
    finally { setLoading(false); }
  }
  return <div className="auth-panel-content auth-register-content">
    <div className="auth-mobile-wordmark">fomentoria<span>.</span></div>
    <Link href="/login" className="auth-back"><AuthIcon name="arrow-left" size={16}/> Voltar</Link>
    <div className="auth-register-intro"><p className="auth-eyebrow">CRIAR CONTA</p><h1>Cadastre-se</h1><p className="auth-subtitle">Crie sua conta local para explorar editais e oportunidades demonstrativas.</p></div>
    <form className="auth-form" onSubmit={handleRegister}>
      <label htmlFor="register-name">Nome completo</label>
      <div className="auth-field"><AuthIcon name="user"/><input id="register-name" type="text" autoComplete="name" value={name} onChange={e=>setName(e.target.value)} placeholder="Seu nome" minLength={2} maxLength={100} required/></div>
      <label htmlFor="register-email">E-mail</label>
      <div className="auth-field"><AuthIcon name="mail"/><input id="register-email" type="email" autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="seuemail@exemplo.com" maxLength={254} required/></div>
      <label htmlFor="register-password">Senha</label>
      <div className="auth-field"><AuthIcon name="lock"/><input id="register-password" type={visible ? 'text' : 'password'} autoComplete="new-password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Crie uma senha" minLength={8} maxLength={128} required/><button className="auth-eye" type="button" aria-label={visible ? 'Ocultar senha' : 'Mostrar senha'} onClick={()=>setVisible(v=>!v)}><AuthIcon name={visible ? 'eye-off' : 'eye'}/></button></div>
      <p className="auth-helper">Mínimo de 8 caracteres, com letras e números.</p>
      <label htmlFor="register-account-type">Tipo de conta</label>
      <div className="auth-field auth-select-field"><AuthIcon name="building"/><select id="register-account-type" value={accountType} onChange={e=>setAccountType(e.target.value as AccountType)} required><option value="" disabled>Selecione uma opção</option><option value="pessoa">Pessoa física</option><option value="startup">Startup</option><option value="empresa">Empresa / PME</option><option value="consultoria">Consultoria</option></select><AuthIcon name="chevron-down" size={18}/></div>
      <label className="auth-checkbox" htmlFor="register-local-terms"><input type="checkbox" id="register-local-terms" checked={acceptedLocalTerms} onChange={e=>setAcceptedLocalTerms(e.target.checked)} required/><span>Entendi que este é um <Link href="/termos" target="_blank" rel="noopener noreferrer">ambiente de demonstração local</Link> e li as <Link href="/privacidade" target="_blank" rel="noopener noreferrer">informações de privacidade</Link>.</span></label>
      {error && <p className="auth-error" role="alert">{error}</p>}
      <button className="auth-submit" type="submit" disabled={loading}>{loading ? 'Criando conta…' : 'Criar conta'} <AuthIcon name="arrow-right"/></button>
    </form>
    <p className="auth-local-caption">Sem autenticação Google ou Microsoft. Cadastro restrito ao desenvolvimento local.</p>
    <div className="auth-panel-footer">Já tem uma conta? <Link href="/login">Entre aqui <AuthIcon name="arrow-right" size={16}/></Link></div>
  </div>;
}
