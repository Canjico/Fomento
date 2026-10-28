import Link from 'next/link';
import type { ReactNode } from 'react';

export function AuthShell({ children, mode }: { children: ReactNode; mode: 'login' | 'cadastro' }) {
  return <main className="auth-screen">
    <div className="auth-frame">
      <aside className="auth-brand" aria-label="Fomentoria — Onde a inovação encontra recurso">
        <div className="auth-arc auth-arc-one" aria-hidden="true"/><div className="auth-arc auth-arc-two" aria-hidden="true"/><div className="auth-arc auth-arc-three" aria-hidden="true"/>
        <Link href="/" className="auth-brand-wordmark" aria-label="Fomentoria — página inicial">fomentoria<span>.</span></Link>
        <div className="auth-brand-top">
          <span className="auth-brand-rule"/>
          <p>OPORTUNIDADES<br/>IDEIAS<br/>PROJETOS<br/>IMPACTO</p>
        </div>
        <div className="auth-symbol" aria-hidden="true"><span>f</span><i/></div>
        <div className="auth-brand-bottom">
          <h2>Onde a<br/><em>inovação</em><br/>encontra<br/>recurso<span>.</span></h2>
          <p>A Fomentoria conecta pessoas, projetos e oportunidades de fomento para impulsionar o desenvolvimento no Brasil.</p>
          <div className="auth-brand-signoff"><span className="auth-brand-rule"/>FUNDAÇÃO LOCAL<br/>PARA UM BRASIL MAIS INOVADOR</div>
        </div>
      </aside>
      <section className="auth-panel" aria-label={mode === 'login' ? 'Acesso à sua conta' : 'Cadastro de conta'}>
        {children}
      </section>
    </div>
  </main>;
}
