import type { ReactNode } from 'react';
import { requireLocalSession } from '@/lib/local-auth';
import { CatalogHeader } from '@/components/catalog/catalog-header';

export const dynamic = 'force-dynamic';
export default async function EditaisLayout({ children }: { children: ReactNode }) {
  await requireLocalSession();
  return <div className="cat-app"><a className="lp-skip-link" href="#conteudo-editais">Pular para o conteúdo</a><CatalogHeader/>{children}</div>;
}
