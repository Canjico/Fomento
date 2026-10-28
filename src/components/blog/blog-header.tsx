import Link from 'next/link';
import { BlogIcon } from './blog-icons';

export function BlogHeader() {
  return <header className="bl-header">
    <div className="bl-container bl-header-inner">
      <Link href="/" className="bl-wordmark" aria-label="Fomentoria — início">fomentoria<span>.</span></Link>
      <nav className="bl-navigation" aria-label="Navegação principal">
        <Link href="/#como-funciona">Como funciona</Link>
        <Link href="/editais">Editais</Link>
        <Link href="/blog" aria-current="page" className="bl-nav-active">Blog</Link>
        <Link href="/#sobre">Sobre o projeto</Link>
      </nav>
      <div className="bl-header-actions">
        <Link href="/editais" aria-label="Pesquisar editais" className="bl-search-action"><BlogIcon name="search" size={18}/></Link>
        <span className="bl-header-separator" aria-hidden="true"/>
        <Link href="/login" className="bl-header-login">Entrar</Link>
        <Link href="/cadastro" className="bl-header-start">Começar agora</Link>
      </div>
      <details className="bl-mobile-nav">
        <summary aria-label="Abrir menu"><BlogIcon name="menu" size={24}/></summary>
        <nav aria-label="Navegação para celular">
          <Link href="/">Início</Link>
          <Link href="/#como-funciona">Como funciona</Link>
          <Link href="/editais">Editais</Link>
          <Link href="/blog" aria-current="page">Blog</Link>
          <Link href="/#sobre">Sobre o projeto</Link>
          <Link href="/login">Entrar</Link>
          <Link href="/cadastro">Criar conta</Link>
        </nav>
      </details>
    </div>
  </header>;
}
