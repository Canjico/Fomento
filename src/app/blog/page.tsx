import type { Metadata } from 'next';
import { BlogListing } from '@/components/blog/blog-listing';

export const metadata: Metadata = {
  title: 'Blog | Fomentoria',
  description: 'Conhecimento que aproxima ideias e recursos. Prévia de guias e conteúdos sobre fomento e inovação.',
};

export default function BlogPage() {
  return <BlogListing/>;
}
