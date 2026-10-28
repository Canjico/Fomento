import type { Metadata } from 'next';
import { CatalogList } from '@/components/catalog/catalog-list';
export const metadata: Metadata = { title: 'Catálogo demonstrativo de editais | Fomentoria', robots: { index: false, follow: false } };
export default function EditaisPage() { return <main id="conteudo-editais"><CatalogList/></main>; }
