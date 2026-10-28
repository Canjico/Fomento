import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BLOG_POSTS, findBlogPost } from '@/lib/blog-demo';
import { BlogIcon } from '@/components/blog/blog-icons';

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = findBlogPost(slug);
  return { title: post ? `${post.title} | Fomentoria` : 'Artigo não encontrado | Fomentoria' };
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = findBlogPost(slug);
  if (!post) notFound();
  const related = BLOG_POSTS.filter((item) => item.slug !== slug && item.category === post.category).slice(0, 2);
  const suggestions = related.length ? related : BLOG_POSTS.filter((item) => item.slug !== slug).slice(0, 2);

  return <div className="bl-container bl-article-page">
    <nav aria-label="Trilha de navegação" className="bl-breadcrumb"><Link href="/blog">Blog</Link><BlogIcon name="chevron-right" size={15}/><span>{post.category}</span></nav>
    <div className="bl-article-page-head"><span className="bl-article-kicker">{post.category.toUpperCase()} · CONTEÚDO DEMONSTRATIVO</span><h1>{post.title}</h1><p>{post.summary}</p><div className="bl-article-head-meta"><span><BlogIcon name="book" size={16}/> Exemplo editorial</span><span><BlogIcon name="clock" size={16}/> {post.readingMinutes} min de leitura</span></div></div>
    <div className="bl-article-hero-image" role="img" aria-label={post.imageDescription} style={{ backgroundImage: `url('${post.image}')` }}/>
    <div className="bl-article-content-layout"><article className="bl-article-copy"><div className="bl-article-disclaimer"><strong>Material de demonstração</strong><p>Este texto é uma prévia da experiência do Blog. Não substitui orientações de órgãos públicos, documentos oficiais ou aconselhamento especializado.</p></div>{post.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}<div className="bl-article-end"><p>Para consultar uma oportunidade específica, sempre verifique os documentos e canais da instituição responsável.</p><Link href="/blog"><BlogIcon name="arrow-left" size={17}/> Voltar ao blog</Link></div></article><aside className="bl-article-aside"><div><strong>Continue explorando</strong><p>Veja outros materiais demonstrativos da Fomentoria.</p>{suggestions.map((item) => <Link href={`/blog/${item.slug}`} key={item.slug}><span>{item.category}</span>{item.title}<BlogIcon name="arrow-right" size={16}/></Link>)}</div></aside></div>
  </div>;
}
