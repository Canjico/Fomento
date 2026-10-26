# 02 — PRD e escopo

> **Documento de proposta para auditoria, versão 0.3-R2 · 26/10/2026.** Apenas o Bloco 0. As seções marcadas **PROPOSTA**, **PREMISSA** e **DECISÃO PENDENTE** não constituem autorização de implementação, contrato congelado ou política comercial aprovada.

**Registro histórico R1 (não normativo onde substituído por R2):** versão derivada do pacote v0.1, corrigida sob AUD-01–AUD-15. Todas as definições de R1 são **PROPOSTAS CONDICIONAIS**, não decisões aprovadas; a matriz D-01–D-28 em `03-DECISOES-E-CONFLITOS.md` prevalece como índice de gates. Nenhuma migração, implementação ou aceite foi executado. **Se houver divergência de testes, prevalece exclusivamente o catálogo R2 em `11-TESTES-E-GATES.md`.**

**Convenção de rastreabilidade:** `ORIGINAL` = conteúdo sustentado pelos anexos primários; `PROPOSTA` = desenho técnico; `PREMISSA` = hipótese; `DECISÃO PENDENTE` = aprovação requerida; `CONFLITO` = tensão entre fontes/planos. Referências: `REQ` (DOCX, página/seção), `ID` (PDF, página), `P02` e `P01` (planos mestres, seção).

## 1. Visão e proposta de valor

**ORIGINAL (REQ p.1 §§1–2):** Fomentoria centraliza editais, chamadas, prêmios e financiamentos reembolsáveis/não reembolsáveis para inovação, startups e PMEs no Brasil. A dispersão de fontes e os prazos dificultam a descoberta. Objetivos: descoberta rápida, compatibilidade, menor perda de prazos e receita recorrente futura. Instituições citadas como exemplos pela fonte não constituem parceria ou acesso autorizado.

**PROPOSTA:** Tese de MVP = validar que usuários encontram oportunidades confiáveis em catálogo público **em linhas**, com manutenção humana e link à fonte original. A candidatura é externa. Não declarar qualquer registro fictício como oportunidade real, mesmo quando a ficha parecer institucional.

## 2. Valor por persona e jornada

1. **Fundador (REQ p.1 §3):** abre catálogo sem login; filtra setor/estágio; compara valor/prazo; consulta fonte. Fricções: dúvida de elegibilidade, informação incompleta.
2. **Gestor de inovação (REQ p.1 §3):** busca modalidade, região e prazo; consulta documentos e requisitos; futuro checklist/calendário.
3. **Consultor (REQ p.1 §3):** seleciona explicitamente a empresa ativa; alterna contextos; somente acessa clientes com membership válido; não existe acesso cruzado implícito.
4. **Instituição (REQ p.1 §3):** conhece formato de divulgação e, no bloco O, submete conteúdo para moderação; nunca autopublica no catálogo global.

Operadores internos são atores de operação (PROPOSTA), não uma quinta persona reivindicada como ORIGINAL. Ver `04` e `08`.

## 3. MVP 1 — fronteira fechada A–F

| Incluído | Fora do MVP 1 |
|---|---|
| CRUD manual de editais, revisões, checagem e link oficial | Captura/crawling de fontes |
| Autenticação e autorização **somente interna** | Conta de cliente, senha de cliente e salvos persistidos |
| Lista/pesquisa/filtros/ordenação/paginação | Recomendações, checkout, pagamento, calendários |
| Ficha detalhada e estados verificáveis | WhatsApp, disparo de e-mails externos, blog |
| Seeds demonstrativos com rótulo fictício e validações negativas | Publicação de fontes reais ou inscrição dentro da Fomentoria |
| Mobile, navegação por teclado e QA local | Hospedagem, disponibilidade pública, indexação live |

**Critério de sucesso do MVP:** operador pode cadastrar e publicar cinco registros fictícios sem alterar banco manualmente; visitante os encontra e entende prazos, ressalvas e fonte num percurso reproduzível. Gate F/11.

## 4. Entregas incrementais aprováveis, nunca autoautorizadas

- **Cliente (G–M):** identidade/perfil empresarial, favoritos, compatibilidade indicativa, checklist, calendário, consentimento, planos, checkout simulado.
- **Operação/conteúdo (N–Q):** assessoria humana com SLA por decidir, gestão, moderação, blog e WhatsApp apenas adapter local.
- **Dados e API (R–S):** ingestão assistida com proveniência e moderação, API de pesquisa controlada.
- **B2B (T–U):** criação de formulários, inscrições, avaliação e acompanhamento entre instituições e candidatos com fronteiras de isolamento.
- **Auditoria local (V):** inspeção integrada, segurança, acessibilidade, falhas, benchmark; não certifica produção.
- **Pós fase 7 do REQ:** aplicativo nativo e assinatura eletrônica = backlog explícito fora A–V (REQ p.4 §10).

## 5. Objetivos e métricas propostos, sem metas comerciais inventadas

| Objetivo | Instrumentação/conteúdo futuro | Leitura correta |
|---|---|---|
| Descoberta | Tempo de encontrar edital em teste moderado e sucesso da tarefa | Medida local não equivale a adoção |
| Confiabilidade | % de registros com URL, fonte, data checagem e estado explícitos | Checagem registrada ≠ validação de veracidade |
| Operação | Tempo/erros para cadastrar, revisar e publicar | Dados fictícios separados dos verificados |
| Desempenho | REQ RNF até 2 s / 5.000 ativos | Benchmark local padronizado; gate a definir |
| Conversão futura | Favoritos, acesso a planos, assinatura | Não cobrar nem medir receita real localmente |

## 6. Limites e anti-escopo

- Nenhum agente decide elegibilidade legal; `match` é auxiliar e explicável.
- Não alterar/retificar registro sem histórico e autoria conceitual.
- Fonte oficial e link externo são distintos de selo de verificação; rótulos explícitos.
- Não habilitar publicação por instituição antes de moderação O, nem postagem B2B antes de T.
- Não habilitar serviços humanos sem capacidade, SLA, limites e responsáveis aprovados.
- Não usar marca visual como wireframe: ID p.10–11 exemplifica redes sociais, não UI final.

## 7. Políticas de qualidade de dados propostas

Campos mínimos para publicar (propostos): título, instituição responsável, fonte de origem com URL, método/data de checagem, finalidade, tipo de recurso, descrição/requisitos com campos ausentes reconhecíveis, cronograma ou `prazo desconhecido`, proveniência e revisão aprovada. Publicação com informação faltante crítica requer bloqueio ou aviso conforme D-04; não inventar valor financeiro nem datas.

## 8. Riscos de descoberta

R-PRD-01: lista com fontes defasadas; R-PRD-02: informações equivocadas interpretadas como oficiais; R-PRD-03: confusão entre prazo e estado editorial; R-PRD-04: vazamento multiempresa futuro; R-PRD-05: cobrança/serviço humano antes de processo. Mitigações e owners propostos em `03`, `05`, `10`.

## R1 — limites de produto revalidados

O MVP A–F continua **catálogo público em linhas e cadastro manual administrativo**, com busca, filtros combináveis, detalhe, prazo e CTA externo para fonte oficial, sem login do visitante. Salvar favorito com persistência começa em G/H; selecionar plano e cobrança não são recursos MVP. Informações de `última checagem` são fatos auditáveis e jamais promessas de que todas as fontes já foram verificadas diariamente.

Uma ficha publicada referencia a revisão editorial aprovada; preparação de retificação não afeta o que o visitante encontra. Favoritos são pessoais (RF04), enquanto o modelo de entitlement comercial depende de decisão D-02/D-26 — não transformar automaticamente plano Assessoria em listas compartilhadas por empresa. Recomendação não equivale à elegibilidade oficial. A evolução H→L→M está desenhada em `06/09/12` sem ativação de pagamentos reais nem cobranças externas.

**Sem ampliação silenciosa:** equipe editorial de exceção, política de retenção, rate limit, métricas de performance e atendimento de checagem diária são propostas aguardando deliberação por gate. O PRD não declara nenhuma dessas políticas aprovada. Os sete estágios originais de negócio e todas as funcionalidades pós-fase 7 permanecem, sem antecipação de implementação.

## R2 — Coerência do checkout (R1-06)

RF05 no DOCX pressupõe dados de empresa (razão social, CNPJ, setor, estágio) durante checkout. Alternativa A preserva fluxo empresarial com criação/vínculo de organização antes da contratação; B estende produto a pessoa física e requer deliberação humana explícita antes de modelar UX/fiscal. **Nenhuma tela pessoal paga pode ser presumida pelo implementador**. `BillingSubject` tipado permanece proposta condicional de arquitetura; favoritar gratuitamente sem empresa não implica poder contratar Pro pessoal. Ver `09` §R2 e relatório `05-CHECKOUT-ALTERNATIVAS.md`.
