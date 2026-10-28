import type { ReactNode } from 'react';
import { BlogHeader } from '@/components/blog/blog-header';

export default function BlogLayout({ children }: { children: ReactNode }) {
  return <div className="bl-app"><a className="lp-skip-link" href="#conteudo-blog">Pular para o conteúdo</a><BlogHeader/><main id="conteudo-blog">{children}</main><footer className="bl-footer"><div className="bl-container"><span className="bl-wordmark">fomentoria<span>.</span></span><p>Onde a inovação encontra recurso.</p><span>Prévia editorial local · Sem notícias ou editais oficiais publicados.</span></div></footer></div>;
}
