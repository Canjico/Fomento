import Link from 'next/link';
export default function EditalNotFound() { return <main id="conteudo-editais" className="cat-shell cat-empty-results" style={{ minHeight: '55vh' }}><h1>Edital não encontrado</h1><p>Este registro não existe no conjunto de demonstração.</p><Link className="cat-primary-button" href="/editais">Voltar ao catálogo</Link></main>; }
