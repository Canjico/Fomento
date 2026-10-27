import Link from "next/link";

const links = [
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/#catalogo", label: "Catálogo" },
  { href: "/#sobre", label: "Sobre o projeto" },
];

export function SiteHeader() {
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <header className="site-header">
        <div className="site-container site-header__inner">
          <Link className="wordmark" href="/" aria-label="Fomentoria, início">
            fomentoria<span className="wordmark__point" aria-hidden="true">.</span>
          </Link>
          <nav className="desktop-nav" aria-label="Navegação principal">
            {links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
          </nav>
          <span className="desktop-header-note">Portal em desenvolvimento</span>
          <details className="mobile-menu">
            <summary>Menu <span aria-hidden="true">☰</span></summary>
            <nav aria-label="Menu para dispositivos móveis">
              {links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
            </nav>
          </details>
        </div>
      </header>
    </>
  );
}
