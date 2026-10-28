/*
 * Landing page pública da Fomentoria.
 * Catálogo demonstrativo e login local em rotas próprias; blog editorial demonstrativo disponível publicamente.
 * Não introduzir dados de editais como se fossem registros reais.
 */

import Link from "next/link";

type IconName =
  | "search"
  | "arrow-right"
  | "arrow-down"
  | "file-search"
  | "file-text"
  | "external-link"
  | "file"
  | "layers"
  | "landmark"
  | "trending-up"
  | "menu";

const iconPaths: Record<IconName, React.ReactNode> = {
  search: <><circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/></>,
  "arrow-right": <><path d="M4 12h16"/><path d="m13 5 7 7-7 7"/></>,
  "arrow-down": <><path d="M12 4v16"/><path d="m5 13 7 7 7-7"/></>,
  "file-search": <><path d="M14 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7"/><path d="M14 3v6h6"/><path d="M14 3l6 6"/><path d="M7 12h6M7 16h3"/><circle cx="17" cy="17" r="3"/><path d="m19.5 19.5 2 2"/></>,
  "file-text": <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h8"/></>,
  "external-link": <><path d="M13 4h7v7M20 4l-9 9"/><path d="M20 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h6"/></>,
  file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h8"/></>,
  layers: <><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v7c0 1.7 3.6 3 8 3s8-1.3 8-3v-7"/></>,
  landmark: <><path d="m2 10 10-7 10 7M3 10h18M5 10v9M10 10v9M14 10v9M19 10v9M2 21h20"/></>,
  "trending-up": <><path d="m2 17 7-7 4 4 9-9"/><path d="M16 5h6v6"/></>,
  menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
};

function Icon({ name, size = 24, className = "" }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {iconPaths[name]}
    </svg>
  );
}

const steps: { no: string; icon: IconName; title: string; description: string }[] = [
  { no: "01", icon: "file-search", title: "Descobrir", description: "Encontre editais e chamadas em uma lista organizada, com filtros práticos." },
  { no: "02", icon: "file-text", title: "Entender", description: "Compare informações essenciais e identifique os requisitos com clareza." },
  { no: "03", icon: "external-link", title: "Ir à origem", description: "Acesse o edital na página oficial responsável e realize a inscrição." },
];

const sources = ["FINEP", "CNPq", "CAPES", "BNDES", "SEBRAE", "Embrapii", "FAPESP"];

const blogPreviews = [
  { kind: "GUIA", title: "Como se preparar para um edital de fomento", summary: "Passo a passo para organizar sua próxima oportunidade.", image: "/images/blog-preview-1.webp", slug: "como-se-preparar-para-um-edital-de-fomento" },
  { kind: "NOTÍCIA", title: "Inovação e impacto: onde buscar oportunidades", summary: "Entenda caminhos para tirar projetos do papel.", image: "/images/blog-preview-2.webp", slug: "inovacao-impacto-onde-buscar-oportunidades" },
  { kind: "ANÁLISE", title: "Conheça as principais linhas de fomento", summary: "Um panorama das diferentes modalidades de apoio.", image: "/images/blog-preview-3.webp", slug: "principais-linhas-de-fomento" },
];

export default function Home() {
  return (
    <>
      <a className="lp-skip-link" href="#conteudo">Pular para o conteúdo</a>
      <header className="lp-header">
        <div className="lp-container lp-header-inner">
          <a href="#inicio" className="lp-wordmark" aria-label="Fomentoria — voltar ao início">
            fomentoria<span>.</span>
          </a>
          <nav className="lp-nav" aria-label="Navegação principal">
            <a href="#como-funciona">Como funciona</a>
            <Link href="/editais">Editais</Link>
            <Link href="/blog">Blog</Link>
            <a href="#sobre">Sobre o projeto</a>
          </nav>
          <div className="lp-header-actions">
            <Link className="lp-header-search" href="/editais" aria-label="Explorar catálogo de editais">
              <Icon name="search" size={20} />
            </Link>
            <span className="lp-header-divider" aria-hidden="true" />
            <Link href="/login" className="lp-login">Entrar</Link>
            <Link href="/cadastro" className="lp-header-cta">Começar agora</Link>
          </div>
          <details className="lp-mobile-menu">
            <summary aria-label="Abrir menu de navegação"><Icon name="menu" size={23}/></summary>
            <nav aria-label="Navegação para celular">
              <a href="#como-funciona">Como funciona</a>
              <Link href="/editais">Editais</Link>
              <Link href="/blog">Blog</Link>
              <a href="#sobre">Sobre o projeto</a>
              <Link href="/login">Entrar <small>Local</small></Link>
              <Link href="/cadastro">Começar agora <small>Local</small></Link>
            </nav>
          </details>
        </div>
      </header>

      <main id="conteudo" className="lp-main">
        <section className="lp-hero" id="inicio" aria-labelledby="lp-hero-title">
          <div className="lp-container lp-hero-inner">
            <div className="lp-hero-copy">
              <p className="lp-eyebrow">CONEXÃO ENTRE IDEIAS E OPORTUNIDADES</p>
              <h1 id="lp-hero-title">
                Onde a<br />
                <span className="lp-text-green">inovação</span><br />
                encontra<br />
                recurso<span className="lp-dot">.</span>
              </h1>
              <p className="lp-hero-description">
                Descubra e acompanhe oportunidades de fomento, editais, chamadas e programas que impulsionam ideias, projetos e negócios no Brasil.
              </p>
              <div className="lp-hero-buttons">
                <Link href="/editais" className="lp-button-primary">Explorar editais <Icon name="arrow-right" size={17}/></Link>
                <a href="#como-funciona" className="lp-button-text">Como funciona <Icon name="arrow-down" size={16}/></a>
              </div>
              <span className="lp-availability-note">Catálogo demonstrativo disponível após login local · inscrições indisponíveis</span>
            </div>
            <div className="lp-hero-media" aria-hidden="true">
              <div className="lp-hero-art">
                <span className="lp-orbit lp-orbit-one"/>
                <span className="lp-orbit lp-orbit-two"/>
                <span className="lp-orbit lp-orbit-three"/>
                <div className="lp-art-topline">IDEIAS<br/>PROJETOS<br/>PESSOAS<br/>IMPACTO</div>
                <span className="lp-art-rule" />
                <span className="lp-art-letter">f</span>
                <span className="lp-art-coral" />
                <div className="lp-art-footer">FOMENTO<br/>INOVAÇÃO<br/>DESENVOLVIMENTO<br/>BRASIL</div>
                <span className="lp-art-bottom-rule"/>
              </div>
              <div className="lp-float-card">
                <div className="lp-float-icon"><Icon name="trending-up" size={34}/></div>
                <div><strong>Oportunidades<br/>em um só lugar.</strong><p>Mais clareza para você encontrar o que faz sentido.</p></div>
              </div>
            </div>
          </div>
        </section>

        <section className="lp-stats" id="oportunidades" aria-labelledby="lp-stats-title">
          <div className="lp-container lp-stats-inner">
            <div className="lp-stats-intro">
              <p className="lp-eyebrow lp-eyebrow-on-dark">A PLATAFORMA ESTÁ EM CONSTRUÇÃO</p>
              <h2 id="lp-stats-title">Impulsionando<br/>projetos que<br/>geram <span>impacto.</span></h2>
            </div>
            <div className="lp-stat-grid">
              <div className="lp-stat"><Icon name="file" size={27}/><strong>Em breve</strong><span>editais organizados<br/>em um só lugar</span></div>
              <div className="lp-stat"><Icon name="layers" size={27}/><strong>Em breve</strong><span>valores e modalidades<br/>de fomento</span></div>
              <div className="lp-stat"><Icon name="landmark" size={27}/><strong>Em breve</strong><span>fontes oficiais<br/>acompanhadas</span></div>
            </div>
          </div>
          <p className="lp-stats-disclaimer">A plataforma está em desenvolvimento. Acesse o catálogo demonstrativo após configurar o login local; não há estatísticas de editais reais.</p>
        </section>

        <section className="lp-how" id="como-funciona" aria-labelledby="lp-how-title">
          <div className="lp-container">
            <div className="lp-how-heading">
              <div>
                <p className="lp-eyebrow">COMO FUNCIONA</p>
                <h2 id="lp-how-title">Da ideia à oportunidade,<br/>sem complicação.</h2>
              </div>
              <p>Acompanhe oportunidades de fomento de diversas fontes, entenda os requisitos e acesse a página oficial para se inscrever.</p>
            </div>
            <ol className="lp-steps">
              {steps.map((step) => (
                <li key={step.no}>
                  <span className="lp-step-number">{step.no}</span>
                  <div className="lp-step-body">
                    <Icon name={step.icon} size={29} className="lp-step-icon" />
                    <div><h3>{step.title}</h3><p>{step.description}</p></div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="lp-sources" id="fontes" aria-labelledby="lp-sources-title">
          <div className="lp-container">
            <div className="lp-sources-heading">
              <div>
                <p className="lp-eyebrow">ECOSSISTEMA DE FOMENTO</p>
                <h2 id="lp-sources-title">Instituições e programas<br/>que queremos acompanhar.</h2>
              </div>
              <a href="#sobre" className="lp-secondary-link">Sobre o projeto <Icon name="arrow-right" size={16}/></a>
            </div>
            <ul className="lp-source-list" aria-label="Exemplos de instituições do ecossistema">
              {sources.map((source) => <li key={source}>{source}</li>)}
              <li className="lp-other-sources">+ outras<br/>fontes</li>
            </ul>
            <p className="lp-sources-note">Referências do ecossistema brasileiro. A exibição dos nomes não indica parceria, integração ou monitoramento ativo.</p>
          </div>
        </section>

        <section className="lp-blog" id="blog" aria-labelledby="lp-blog-title">
          <div className="lp-container lp-blog-inner">
            <div className="lp-blog-intro">
              <p className="lp-eyebrow">CONTEÚDO</p>
              <h2 id="lp-blog-title">Blog da Fomentoria</h2>
              <p>Análises, guias e notícias sobre editais, financiamento, inovação e desenvolvimento.</p>
              <Link href="/blog" className="lp-blog-soon">Explorar o blog <Icon name="arrow-right" size={15}/></Link>
            </div>
            <div className="lp-article-grid">
              {blogPreviews.map((post) => (
                <article className="lp-article" key={post.title}>
                  <div className="lp-article-image" style={{ backgroundImage: `linear-gradient(0deg, rgba(3,19,41,.16), rgba(3,19,41,.16)), url('${post.image}')` }} role="img" aria-label="Imagem ilustrativa de prévia editorial" />
                  <div className="lp-article-content"><span className="lp-article-type">{post.kind} · EXEMPLO</span><h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3><p>{post.summary}</p><span className="lp-article-date">Conteúdo demonstrativo</span></div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="lp-footer" id="sobre">
        <div className="lp-container lp-footer-inner">
          <div><span className="lp-wordmark lp-footer-logo">fomentoria<span>.</span></span><p>Onde a inovação encontra recurso.</p></div>
          <p>Prévia visual em ambiente local. Plataforma e funcionalidades em desenvolvimento.</p>
        </div>
      </footer>
    </>
  );
}
