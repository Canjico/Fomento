import Link from 'next/link';
import { CatalogIcon } from './catalog-icons';

export function CatalogHeader() {
  return <header className="cat-header">
    <div className="cat-shell cat-header-inner">
      <Link className="cat-wordmark" href="/">fomentoria<span>.</span></Link>
      <nav aria-label="Navegação principal" className="cat-nav">
        <Link href="/#como-funciona">Como funciona</Link>
        <Link className="cat-nav-active" href="/editais" aria-current="page">Editais</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/#sobre">Sobre o projeto</Link>
      </nav>
      <div className="cat-header-actions">
        <Link href="/editais" aria-label="Buscar editais" className="cat-header-search"><CatalogIcon name="search" size={19}/></Link>
        <span className="cat-header-line"/>
        <span className="cat-header-session">Área local</span>
        <form method="post" action="/api/auth/logout"><button type="submit" className="cat-header-logout"><CatalogIcon name="logout" size={16}/> Sair</button></form>
      </div>
      <details className="cat-mobile-menu"><summary aria-label="Abrir navegação"><CatalogIcon name="menu"/></summary>
        <div className="cat-mobile-menu-panel"><Link href="/editais">Editais</Link><Link href="/#como-funciona">Como funciona</Link><Link href="/blog">Blog</Link><Link href="/">Página inicial</Link><form method="post" action="/api/auth/logout"><button>Sair da sessão</button></form></div>
      </details>
    </div>
  </header>;
}
