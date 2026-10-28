/**
 * Conteúdo editorial de demonstração. Não representa notícias publicadas, parcerias,
 * fontes consultadas ou dados verificados por instituições oficiais.
 */
export const BLOG_CATEGORIES = [
  'Todos', 'Notícias', 'Guias', 'Análises', 'Políticas públicas',
  'Leis de incentivo', 'Inovação', 'Casos', 'Dicas', 'Instituições',
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];
export type PostCategory = Exclude<BlogCategory, 'Todos'>;

export type BlogPost = {
  slug: string;
  title: string;
  category: PostCategory;
  image: string;
  imageDescription: string;
  summary: string;
  readingMinutes: number;
  featured?: boolean;
  sections: { heading: string; paragraphs: string[] }[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'como-se-preparar-para-um-edital-de-fomento',
    title: 'Como se preparar para um edital de fomento',
    category: 'Guias',
    image: '/images/blog-feature-documents.webp',
    imageDescription: 'Mesa com documentos de trabalho e um computador',
    summary: 'Um roteiro prático para entender requisitos, organizar documentos e planejar a submissão.',
    readingMinutes: 8,
    featured: true,
    sections: [
      { heading: 'Comece pelo documento oficial', paragraphs: [
        'Antes de investir tempo na elaboração da proposta, leia integralmente o edital e suas retificações. Identifique o objetivo da chamada, quem pode participar, os critérios de elegibilidade e o prazo de envio.',
        'O resumo de uma plataforma ajuda na triagem, mas nunca substitui a publicação oficial da instituição responsável.',
      ] },
      { heading: 'Organize tudo com antecedência', paragraphs: [
        'Crie uma lista de documentos, responsáveis e datas internas. Reserve uma margem antes do prazo final para corrigir arquivos, coletar assinaturas e lidar com indisponibilidade de sistemas.',
        'Revise o orçamento e confira se cada despesa proposta é permitida pela chamada. Quando houver dúvidas, procure os canais oficiais de esclarecimento.',
      ] },
    ],
  },
  {
    slug: 'inovacao-impacto-onde-buscar-oportunidades',
    title: 'Inovação e impacto: onde buscar oportunidades',
    category: 'Inovação',
    image: '/images/blog-preview-2.webp',
    imageDescription: 'Arquitetura moderna vista de baixo',
    summary: 'Aprenda a mapear caminhos de fomento para projetos em diferentes estágios.',
    readingMinutes: 5,
    featured: true,
    sections: [
      { heading: 'Comece pelas necessidades do projeto', paragraphs: [
        'Uma iniciativa em validação pode procurar mecanismos diferentes dos de uma empresa que já escala sua solução. Descreva o estágio, setor, região, recursos necessários e prazo de execução.',
      ] },
      { heading: 'Compare fontes e modalidades', paragraphs: [
        'Instituições públicas e privadas podem operar subvenções, crédito, bolsas, prêmios ou programas de aceleração. Cada modalidade possui obrigações e condições próprias, que devem ser confirmadas em sua fonte oficial.',
      ] },
    ],
  },
  {
    slug: 'principais-linhas-de-fomento',
    title: 'Conheça as principais linhas de fomento',
    category: 'Análises',
    image: '/images/blog-preview-3.webp',
    imageDescription: 'Prédios modernos e perspectiva urbana',
    summary: 'Entenda as diferenças básicas entre crédito, subvenção, bolsas e prêmios.',
    readingMinutes: 6,
    featured: true,
    sections: [
      { heading: 'Nem todo recurso funciona da mesma forma', paragraphs: [
        'Financiamento reembolsável envolve devolução segundo as condições da operação. Recursos não reembolsáveis geralmente têm exigências próprias de aplicação, prestação de contas e resultados.',
      ] },
      { heading: 'Critérios de comparação', paragraphs: [
        'Compare valor disponível, contrapartida, público elegível, itens financiáveis, prazo, exigências documentais e obrigações depois da aprovação. Leia sempre as regras vigentes.',
      ] },
    ],
  },
  {
    slug: 'etapas-de-um-projeto-de-inovacao',
    title: 'Como estruturar um projeto de inovação',
    category: 'Guias',
    image: '/images/blog-writing.webp',
    imageDescription: 'Pessoa fazendo anotações em uma mesa',
    summary: 'Objetivos, cronograma, orçamento e indicadores: o essencial para uma proposta coerente.',
    readingMinutes: 7,
    featured: true,
    sections: [
      { heading: 'De problema a solução', paragraphs: [
        'Comece pelo problema que o projeto pretende resolver, descreva o público beneficiado e explique como a solução será validada. Evite promessas que não possam ser medidas.',
      ] },
      { heading: 'Planejamento verificável', paragraphs: [
        'Associe cada entrega a um prazo, responsável, indicador e custo estimado. Ajuste o plano ao formato exigido no edital que você pretende acessar.',
      ] },
    ],
  },
  {
    slug: 'politicas-publicas-e-fomento',
    title: 'Como políticas públicas apoiam a inovação',
    category: 'Políticas públicas',
    image: '/images/blog-government.webp',
    imageDescription: 'Detalhe arquitetônico de edifício institucional',
    summary: 'Uma visão introdutória dos instrumentos usados para estimular pesquisa e desenvolvimento.',
    readingMinutes: 5,
    sections: [
      { heading: 'Instrumentos variados', paragraphs: [
        'Políticas públicas podem combinar apoio à pesquisa, formação de pessoas, crédito e instrumentos de estímulo à inovação. As regras específicas mudam por programa e instituição.',
      ] },
      { heading: 'Como acompanhar mudanças', paragraphs: [
        'Consulte os órgãos responsáveis e observe atos oficiais, retificações, calendários e documentos complementares, em vez de depender apenas de resumos.',
      ] },
    ],
  },
  {
    slug: 'leis-de-incentivo-como-comecar',
    title: 'Leis de incentivo: por onde começar',
    category: 'Leis de incentivo',
    image: '/images/blog-urban.webp',
    imageDescription: 'Edifícios de arquitetura contemporânea',
    summary: 'Perguntas importantes para entender o enquadramento de um projeto.',
    readingMinutes: 5,
    sections: [
      { heading: 'Confira o enquadramento', paragraphs: [
        'Cada mecanismo de incentivo possui público, condições e procedimentos específicos. Verifique a legislação e as orientações oficiais antes de planejar qualquer benefício.',
      ] },
      { heading: 'Mantenha rastreabilidade', paragraphs: [
        'Guarde versões dos documentos consultados, anotações sobre exigências e referências oficiais. Uma análise técnica ou jurídica especializada pode ser necessária conforme o projeto.',
      ] },
    ],
  },
  {
    slug: 'inovacao-e-sustentabilidade',
    title: 'Projetos de inovação e sustentabilidade',
    category: 'Casos',
    image: '/images/blog-forest.webp',
    imageDescription: 'Vista aérea de floresta e rio',
    summary: 'Exemplo didático de como estruturar resultados e impacto socioambiental.',
    readingMinutes: 4,
    sections: [
      { heading: 'Exemplo de projeto fictício', paragraphs: [
        'Imagine uma solução para monitorar consumo de água em pequenas indústrias. O projeto pode ser descrito com metas técnicas, pilotos e indicadores ambientais mensuráveis.',
        'Este caso é hipotético: não representa projeto aprovado, parceria ou oportunidade aberta.',
      ] },
      { heading: 'Evidências importam', paragraphs: [
        'Indicadores devem permitir acompanhar resultados antes e depois do piloto. O enquadramento em qualquer edital dependerá da análise dos critérios oficiais.',
      ] },
    ],
  },
  {
    slug: 'criterios-de-elegibilidade',
    title: 'Como interpretar critérios de elegibilidade',
    category: 'Dicas',
    image: '/images/blog-preview-1.webp',
    imageDescription: 'Mãos em um notebook',
    summary: 'Saiba quais exigências conferir antes de começar uma candidatura.',
    readingMinutes: 4,
    sections: [
      { heading: 'Separe requisitos de preferências', paragraphs: [
        'Algumas condições impedem a participação. Outras são critérios de pontuação. Identifique essa distinção no edital e não presuma elegibilidade apenas por setor ou região.',
      ] },
      { heading: 'Registre incertezas', paragraphs: [
        'Quando a documentação estiver incompleta ou a regra for ambígua, procure esclarecimento oficial. Uma estimativa de compatibilidade não é garantia de aprovação.',
      ] },
    ],
  },
  {
    slug: 'instituicoes-do-ecossistema-de-fomento',
    title: 'Conheça instituições do ecossistema de fomento',
    category: 'Instituições',
    image: '/images/blog-city.webp',
    imageDescription: 'Edifícios altos em uma cidade',
    summary: 'Uma introdução para navegar por diferentes fontes e programas de apoio.',
    readingMinutes: 6,
    sections: [
      { heading: 'Fontes oficiais primeiro', paragraphs: [
        'Programas e chamadas podem ser divulgados por órgãos públicos, agências de pesquisa, instituições financeiras e entidades privadas. Identifique sempre o site responsável pela publicação.',
      ] },
      { heading: 'Compare a versão mais recente', paragraphs: [
        'Ao encontrar uma chamada, confira seu número, data, anexos e retificações. A existência de um portal agregador não elimina a necessidade de checar a origem.',
      ] },
    ],
  },
  {
    slug: 'como-acompanhar-mudancas-em-editais',
    title: 'Como acompanhar mudanças em chamadas públicas',
    category: 'Notícias',
    image: '/images/blog-wind.webp',
    imageDescription: 'Aerogeradores em uma paisagem',
    summary: 'Um exemplo editorial de acompanhamento de atualizações, prazos e retificações.',
    readingMinutes: 4,
    sections: [
      { heading: 'O que constitui uma atualização', paragraphs: [
        'Alterações de prazo, critérios de elegibilidade, valores e documentos exigidos podem afetar uma candidatura. Confira a comunicação na fonte oficial e registre a data da consulta.',
      ] },
      { heading: 'Não confunda exemplo com notícia real', paragraphs: [
        'Esta publicação é conteúdo demonstrativo. Não comunica uma chamada aberta, nova política ou alteração oficial de prazo.',
      ] },
    ],
  },
];

export const BLOG_FEATURED = BLOG_POSTS.filter((post) => post.featured);

export function normalizeBlogText(text: string) {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

export function filterBlogPosts(posts: BlogPost[], category: BlogCategory, query: string) {
  const search = normalizeBlogText(query);
  return posts.filter((post) => {
    if (category !== 'Todos' && post.category !== category) return false;
    if (!search) return true;
    return normalizeBlogText(`${post.title} ${post.summary} ${post.category}`).includes(search);
  });
}

export function findBlogPost(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
