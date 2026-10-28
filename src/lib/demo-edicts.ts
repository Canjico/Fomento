/**
 * CONTEÚDO FICTÍCIO exclusivo para demonstrar interface e navegação locais.
 * Não representa editais existentes, vínculos com instituições ou URLs oficiais.
 * A futura camada de catálogo substituirá este arquivo após os blocos D–F.
 */
export type OpportunityStatus = 'aberto' | 'encerrado' | 'suspenso' | 'em-breve';
export type OpportunityCategory = 'Cultura' | 'Inovação' | 'Meio Ambiente' | 'Ciência e Pesquisa' | 'Educação' | 'Saúde' | 'Tecnologia' | 'Indústria';
export type Opportunity = {
  id: string;
  slug: string;
  title: string;
  institution: string;
  institutionAbbreviation: string;
  category: OpportunityCategory;
  status: OpportunityStatus;
  location: string;
  amount: number | null;
  deadline: string | null;
  opensAt: string | null;
  audience: string;
  submission: string;
  description: string;
  eligibility: string[];
  themes: string[];
  requiredDocuments: string[];
  timeline: { label: string; date: string }[];
  color: string;
  officialUrl: null;
};

export const demoOpportunities: readonly Opportunity[] = [
  {
    id: 'DEMO-001', slug: 'circuito-criativo-2026', title: 'Circuito Criativo 2026 — Projetos Culturais',
    institution: 'Fundação Horizonte (instituição fictícia)', institutionAbbreviation: 'HORIZONTE',
    category: 'Cultura', status: 'aberto', location: 'Nacional', amount: 500000,
    deadline: '2026-11-28', opensAt: '2026-10-10', audience: 'Projetos culturais',
    submission: 'Inscrição na página oficial, quando houver fonte verificada',
    description: 'Chamada ilustrativa para apoiar propostas de circulação, produção cultural e inclusão por meio da arte.',
    eligibility: ['Pessoa jurídica com projeto cultural definido', 'Atuação em território brasileiro', 'Documentação de regularidade conforme regulamento fictício'],
    themes: ['Produção cultural', 'Patrimônio e memória', 'Acesso à cultura'],
    requiredDocuments: ['Apresentação do projeto', 'Plano de execução', 'Orçamento detalhado'],
    timeline: [{ label: 'Abertura simulada', date: '10/10/2026' }, { label: 'Encerramento simulado', date: '28/11/2026' }],
    color: '#e5f3ff', officialUrl: null,
  },
  {
    id: 'DEMO-002', slug: 'transformacao-industrial-verde', title: 'Programa Transformação Industrial Verde — Rodada 2',
    institution: 'Instituto Ponte de Inovação (instituição fictícia)', institutionAbbreviation: 'PONTE',
    category: 'Inovação', status: 'aberto', location: 'Nacional', amount: 1000000,
    deadline: '2026-11-30', opensAt: '2026-10-20', audience: 'Empresas e startups',
    submission: 'Conforme edital oficial — indisponível nesta demonstração',
    description: 'Exemplo de oportunidade para propostas de inovação industrial, eficiência de recursos e soluções de menor impacto ambiental.',
    eligibility: ['Empresas brasileiras formalizadas', 'Projeto de inovação com objetivos mensuráveis', 'Equipe técnica identificada'],
    themes: ['Materiais estratégicos', 'Eficiência industrial', 'Tecnologias sustentáveis', 'Descarbonização da indústria'],
    requiredDocuments: ['Plano técnico', 'Cronograma de execução', 'Orçamento', 'Comprovação cadastral'],
    timeline: [{ label: 'Abertura simulada', date: '20/10/2026' }, { label: 'Encerramento simulado', date: '30/11/2026' }],
    color: '#d6f5ec', officialUrl: null,
  },
  {
    id: 'DEMO-003', slug: 'clima-biodiversidade-2026', title: 'Soluções para Clima e Biodiversidade 2026',
    institution: 'Agência Verde (instituição fictícia)', institutionAbbreviation: 'VERDE',
    category: 'Meio Ambiente', status: 'aberto', location: 'Nacional', amount: 2000000,
    deadline: '2026-11-15', opensAt: '2026-09-25', audience: 'Empresas e organizações',
    submission: 'Conforme edital oficial — indisponível nesta demonstração',
    description: 'Iniciativa de demonstração voltada à conservação, adaptação climática e pesquisa aplicada.',
    eligibility: ['Projeto com impacto ambiental demonstrável', 'Pessoa jurídica elegível', 'Cronograma viável'],
    themes: ['Economia circular', 'Biodiversidade', 'Mudanças climáticas'],
    requiredDocuments: ['Resumo executivo', 'Orçamento', 'Indicadores de resultado'],
    timeline: [{ label: 'Início simulado', date: '25/09/2026' }, { label: 'Fim simulado', date: '15/11/2026' }],
    color: '#d7f4ef', officialUrl: null,
  },
  {
    id: 'DEMO-004', slug: 'pesquisa-ciencias-humanas', title: 'Pesquisa em Ciências Humanas com Impacto Social',
    institution: 'Fundação Pesquisa Aberta (instituição fictícia)', institutionAbbreviation: 'PESQUISA',
    category: 'Ciência e Pesquisa', status: 'aberto', location: 'São Paulo', amount: 600000,
    deadline: '2026-11-27', opensAt: '2026-10-01', audience: 'Pesquisadores e instituições',
    submission: 'Conforme edital oficial — indisponível nesta demonstração',
    description: 'Chamada simulada de financiamento a estudos e pesquisas com relevância social.',
    eligibility: ['Instituição responsável com atuação no Brasil', 'Projeto científico com metodologia clara'],
    themes: ['Educação e sociedade', 'Territórios', 'Políticas públicas'],
    requiredDocuments: ['Projeto de pesquisa', 'Currículos', 'Plano financeiro'],
    timeline: [{ label: 'Abertura simulada', date: '01/10/2026' }, { label: 'Fim simulado', date: '27/11/2026' }],
    color: '#e0ebfe', officialUrl: null,
  },
  {
    id: 'DEMO-005', slug: 'educacao-do-futuro', title: 'Educação do Futuro — Soluções de Aprendizagem',
    institution: 'Rede de Apoio ao Empreendedor (instituição fictícia)', institutionAbbreviation: 'REDE',
    category: 'Educação', status: 'aberto', location: 'São Paulo', amount: 20000,
    deadline: '2026-11-27', opensAt: '2026-10-22', audience: 'Empreendedores e estudantes',
    submission: 'Conforme edital oficial — indisponível nesta demonstração',
    description: 'Edital fictício para protótipos de educação e tecnologias de aprendizagem.',
    eligibility: ['Projetos em estágio inicial', 'Equipe com vínculo ao projeto'],
    themes: ['Tecnologias educacionais', 'Inclusão', 'Aprendizagem'],
    requiredDocuments: ['Apresentação', 'Plano de atividades'],
    timeline: [{ label: 'Abertura simulada', date: '22/10/2026' }, { label: 'Fim simulado', date: '27/11/2026' }],
    color: '#e4f1ff', officialUrl: null,
  },
  {
    id: 'DEMO-006', slug: 'saude-digital-conectada', title: 'Saúde Digital Conectada — Projetos de Tecnologia',
    institution: 'Instituto Vida Digital (instituição fictícia)', institutionAbbreviation: 'VIDA',
    category: 'Saúde', status: 'em-breve', location: 'Minas Gerais', amount: 300000,
    deadline: '2026-12-20', opensAt: '2026-11-15', audience: 'Startups e centros de pesquisa',
    submission: 'Conforme edital oficial — indisponível nesta demonstração',
    description: 'Oportunidade fictícia com inscrições previstas para data futura.',
    eligibility: ['Solução orientada a problemas de saúde', 'Protótipo documentado'],
    themes: ['Saúde digital', 'Dados e bem-estar'],
    requiredDocuments: ['Apresentação da solução'],
    timeline: [{ label: 'Abertura simulada', date: '15/11/2026' }, { label: 'Fim simulado', date: '20/12/2026' }],
    color: '#dff7ed', officialUrl: null,
  },
  {
    id: 'DEMO-007', slug: 'empreende-tech', title: 'Empreende Tech — Aceleração de Produtos Digitais',
    institution: 'Centro Avança (instituição fictícia)', institutionAbbreviation: 'AVANÇA',
    category: 'Tecnologia', status: 'suspenso', location: 'Nacional', amount: 150000,
    deadline: '2026-12-10', opensAt: '2026-09-10', audience: 'Startups em tração',
    submission: 'Conforme edital oficial — indisponível nesta demonstração',
    description: 'Exemplo de chamada temporariamente suspensa, independente da data originalmente anunciada.',
    eligibility: ['Produto digital em operação', 'Equipe responsável'],
    themes: ['Software', 'Produtos digitais'],
    requiredDocuments: ['Pitch deck', 'Plano de crescimento'],
    timeline: [{ label: 'Abertura simulada', date: '10/09/2026' }, { label: 'Suspensão fictícia', date: '15/10/2026' }],
    color: '#fce8d9', officialUrl: null,
  },
  {
    id: 'DEMO-008', slug: 'industria-lab-2026', title: 'Indústria Lab 2026 — Desenvolvimento de Protótipos',
    institution: 'Laboratório Produtivo (instituição fictícia)', institutionAbbreviation: 'LAB',
    category: 'Indústria', status: 'encerrado', location: 'Paraná', amount: 750000,
    deadline: '2026-10-15', opensAt: '2026-08-01', audience: 'PMEs e indústrias',
    submission: 'Inscrições encerradas no cenário demonstrativo',
    description: 'Exemplo de oportunidade encerrada, preservada para consulta histórica.',
    eligibility: ['Empresa com operação industrial'],
    themes: ['Prototipagem', 'Indústria 4.0'],
    requiredDocuments: ['Plano de execução', 'Orçamento'],
    timeline: [{ label: 'Abertura simulada', date: '01/08/2026' }, { label: 'Encerramento simulado', date: '15/10/2026' }],
    color: '#eff0f2', officialUrl: null,
  },
];

export const categoryOptions: readonly OpportunityCategory[] = ['Cultura', 'Inovação', 'Ciência e Pesquisa', 'Meio Ambiente', 'Educação', 'Saúde', 'Tecnologia', 'Indústria'];
export const statusLabels: Record<OpportunityStatus, string> = { aberto: 'Aberto', encerrado: 'Encerrado', suspenso: 'Suspenso', 'em-breve': 'Em breve' };
export function formatMoney(value: number | null): string { return value === null ? 'Não informado' : new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 2 }).format(value); }
export function formatDate(date: string | null): string { if (!date) return 'Não informado'; const [y, m, d] = date.split('-'); return `${d}/${m}/${y}`; }
export function getDemoOpportunity(slug: string): Opportunity | undefined { return demoOpportunities.find((item) => item.slug === slug); }
export type DemoFilters = { query: string; status: string; category: string; institution: string; location: string; sort: string };
export function filterDemoOpportunities(rows: readonly Opportunity[], filters: DemoFilters): Opportunity[] {
  const query = filters.query.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');
  return rows.filter((item) => {
    const searchable = [item.title, item.institution, item.category, item.description].join(' ').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');
    return (!query || searchable.includes(query))
      && (filters.status === 'todas' || item.status === filters.status)
      && (filters.category === 'todas' || item.category === filters.category)
      && (filters.institution === 'todas' || item.institutionAbbreviation === filters.institution)
      && (filters.location === 'todas' || item.location === filters.location);
  }).sort((a, b) => {
    if (filters.sort === 'valor-maior') return (b.amount ?? -1) - (a.amount ?? -1);
    if (filters.sort === 'valor-menor') return (a.amount ?? Number.MAX_VALUE) - (b.amount ?? Number.MAX_VALUE);
    if (filters.sort === 'nome') return a.title.localeCompare(b.title, 'pt-BR');
    return (a.deadline ?? '9999').localeCompare(b.deadline ?? '9999');
  });
}
