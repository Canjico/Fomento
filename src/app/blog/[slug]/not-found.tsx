import Link from 'next/link';

export default function ArticleNotFound() {
  return <div className="bl-container bl-not-found"><h1>Artigo não encontrado</h1><p>O conteúdo solicitado não existe nesta prévia editorial.</p><Link href="/blog">Voltar ao Blog</Link></div>;
}
