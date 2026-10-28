'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { BLOG_CATEGORIES, BLOG_FEATURED, BLOG_POSTS, filterBlogPosts, type BlogCategory, type BlogPost } from '@/lib/blog-demo';
import { BlogIcon } from './blog-icons';

function Picture({ src, label, className = '' }: { src: string; label: string; className?: string }) {
  return <div className={`bl-picture ${className}`} role="img" aria-label={label} style={{ backgroundImage: `url('${src}')` }}/>
}

function PostCard({ post }: { post: BlogPost }) {
  return <Link href={`/blog/${post.slug}`} className="bl-post-card">
    <Picture src={post.image} label={post.imageDescription} className="bl-post-image"/>
    <div className="bl-post-body">
      <span className="bl-post-category">{post.category.toUpperCase()}</span>
      <h3>{post.title}</h3>
      <p>{post.summary}</p>
      <span className="bl-post-meta"><span><BlogIcon name="book" size={14}/> Leitura demonstrativa</span><span><BlogIcon name="clock" size={14}/> {post.readingMinutes} min</span></span>
    </div>
  </Link>;
}

export function BlogListing() {
  const [category, setCategory] = useState<BlogCategory>('Todos');
  const [query, setQuery] = useState('');
  const [featured, setFeatured] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const matching = useMemo(() => filterBlogPosts(BLOG_POSTS, category, query), [category, query]);
  const visible = showAll ? matching : matching.slice(0, 8);
  const top = BLOG_FEATURED[featured];
  const side = BLOG_FEATURED.filter((post) => post.slug !== top.slug).slice(0, 3);
  const changeFeatured = (offset: number) => setFeatured((current) => (current + offset + BLOG_FEATURED.length) % BLOG_FEATURED.length);

  return <>
    <section className="bl-hero" aria-labelledby="blog-title">
      <div className="bl-container bl-hero-grid">
        <div className="bl-hero-copy">
          <p className="bl-eyebrow">BLOG DA FOMENTORIA</p>
          <h1 id="blog-title">Conhecimento<br/>que aproxima<br/><span>ideias e recursos</span><em>.</em></h1>
          <p>Análises, guias e conteúdos sobre editais, fomento, inovação e desenvolvimento no Brasil.</p>
          <span className="bl-demo-label">Prévia editorial · conteúdo demonstrativo</span>
        </div>
        <div className="bl-hero-visual" aria-label="Imagem arquitetônica ilustrativa">
          <div className="bl-hero-photo" role="img" aria-label="Edifício institucional em tons azuis"/>
          <span className="bl-orbit bl-orbit-a"/><span className="bl-orbit bl-orbit-b"/>
          <span className="bl-visual-words">POLÍTICAS<br/>OPORTUNIDADES<br/>INOVAÇÃO<br/>IMPACTO</span>
          <span className="bl-visual-rule"/>
          <div className="bl-visual-note"><BlogIcon name="book" size={30}/><span>Conteúdo prático<br/>para você aproveitar<br/>melhor as oportunidades<br/>de fomento.</span></div>
        </div>
      </div>
    </section>

    <div className="bl-container bl-toolbar" id="artigos">
      <div className="bl-categories" role="group" aria-label="Filtrar artigos por categoria">
        {BLOG_CATEGORIES.map((item) => <button key={item} type="button" className={category === item ? 'bl-category-active' : ''} aria-pressed={category === item} onClick={() => { setCategory(item); setShowAll(false); }}>{item}</button>)}
      </div>
      <label className="bl-search"><BlogIcon name="search" size={18}/><span className="bl-sr-only">Buscar artigos</span><input type="search" placeholder="Buscar no blog..." value={query} onChange={(event) => { setQuery(event.target.value); setShowAll(false); }} />{query && <button type="button" onClick={() => setQuery('')} aria-label="Limpar busca"><BlogIcon name="x" size={16}/></button>}</label>
    </div>

    <div className="bl-container bl-content">
      <div className="bl-content-notice" role="note">Artigos de exemplo para demonstrar a interface. Não representam notícias verificadas, editais abertos ou publicações oficiais.</div>
      {!query && category === 'Todos' && <section className="bl-featured-layout" aria-label="Conteúdo em destaque">
        <article className="bl-feature-large">
          <Picture src={top.image} label={top.imageDescription} className="bl-feature-image"/>
          <div className="bl-feature-shade" />
          <div className="bl-feature-copy">
            <span className="bl-feature-type">{top.category.toUpperCase()}</span>
            <h2><Link href={`/blog/${top.slug}`}>{top.title}</Link></h2>
            <p>{top.summary}</p>
            <span className="bl-feature-meta"><BlogIcon name="book" size={17}/> Exemplo editorial <BlogIcon name="clock" size={17}/> {top.readingMinutes} min de leitura</span>
          </div>
          <div className="bl-feature-controls">
            <button type="button" onClick={() => changeFeatured(-1)} aria-label="Destaque anterior"><BlogIcon name="arrow-left" size={21}/></button>
            <button type="button" onClick={() => changeFeatured(1)} aria-label="Próximo destaque"><BlogIcon name="arrow-right" size={21}/></button>
          </div>
        </article>
        <aside className="bl-feature-side">
          <h2><BlogIcon name="trend" size={20}/> Em destaque</h2>
          {side.map((post) => <Link className="bl-side-article" key={post.slug} href={`/blog/${post.slug}`}>
            <Picture src={post.image} label={post.imageDescription} className="bl-side-image"/>
            <div><span>{post.category.toUpperCase()}</span><strong>{post.title}</strong><small>Leitura de exemplo · {post.readingMinutes} min</small></div>
          </Link>)}
          <a className="bl-side-more" href="#ultimos-artigos">Ver todos os artigos <BlogIcon name="arrow-right" size={15}/></a>
        </aside>
      </section>}

      <section className="bl-latest" id="ultimos-artigos" aria-labelledby="bl-latest-heading">
        <div className="bl-section-title"><div><h2 id="bl-latest-heading">{category === 'Todos' && !query ? 'Últimos artigos' : 'Artigos encontrados'}</h2><p>{matching.length} {matching.length === 1 ? 'artigo demonstrativo' : 'artigos demonstrativos'} {category !== 'Todos' ? `em ${category}` : ''}</p></div>{(category !== 'Todos' || query) && <button type="button" className="bl-clear" onClick={() => { setCategory('Todos'); setQuery(''); setShowAll(false); }}>Limpar filtros</button>}</div>
        {matching.length > 0 ? <><div className="bl-article-grid">{visible.map((post) => <PostCard key={post.slug} post={post}/>)}</div>{matching.length > visible.length && <button type="button" className="bl-show-more" onClick={() => setShowAll(true)}>Ver todos os artigos <BlogIcon name="arrow-right" size={17}/></button>}</> : <div className="bl-empty"><BlogIcon name="search" size={27}/><h3>Nenhum artigo encontrado</h3><p>Tente outro termo ou selecione uma categoria diferente.</p><button type="button" onClick={() => { setCategory('Todos'); setQuery(''); }}>Mostrar todos</button></div>}
      </section>
    </div>
  </>;
}
