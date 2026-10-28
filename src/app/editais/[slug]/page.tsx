import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { DemoOpportunityDetails } from '@/components/catalog/catalog-detail';
import { getDemoOpportunity } from '@/lib/demo-edicts';
export const dynamic = 'force-dynamic';
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getDemoOpportunity(slug);
  return { title: item ? `${item.title} (demonstração) | Fomentoria` : 'Edital não encontrado | Fomentoria', robots: { index: false, follow: false } };
}
export default async function DemoEditalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getDemoOpportunity(slug);
  if (!item) notFound();
  return <main id="conteudo-editais"><DemoOpportunityDetails edital={item}/></main>;
}
