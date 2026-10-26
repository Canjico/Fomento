# FOMENTO — Plano mestre de desenvolvimento local

**Status:** proposta técnica v0.1 — sujeito a aceite; nenhuma implementação iniciada.  
**Projeto técnico:** Fomento. **Marca exibida (conforme anexos):** Fomentoria.  
**Fontes:** `Fomentoria_Documento_de_Requisitos (3).docx` (setembro de 2026) e `Fomentoria ID.pdf` (13 páginas).  
**Ambiente-alvo deste plano:** exclusivamente local. Produção, domínio, hospedagem, integrações reais e publicação ficam fora do escopo de execução até aprovação futura.

## 1. Produto que vamos construir

Plataforma brasileira para centralizar e organizar **editais, chamadas públicas, prêmios e linhas de fomento** (reembolsáveis e não reembolsáveis) para startups, PMEs e empresas inovadoras. O núcleo inicial é um **agregador de oportunidades**: busca/filtros, páginas de detalhes, fontes oficiais e atualização inicialmente **manual por administradores**. A candidatura ocorre no site oficial de cada edital, fora da plataforma.

Evoluções documentadas: conta e perfil empresarial, favoritos, recomendações, checklist, calendário, alertas, freemium e assinatura, serviço de assessoria, backoffice, envio de editais por parceiros com moderação, blog, WhatsApp, ingestão assistida e API de busca e, somente depois, gestão B2B de editais ponta a ponta.

### Personas preservadas
- Fundador de startup.
- Gestor de inovação em PME.
- Consultor / assessoria com múltiplos clientes.
- Instituição fomentadora / parceira publicadora.

### Planos de referência do documento (preços ainda não aprovados para cobrança real)
- Gratuito: R$ 0; pesquisa e filtros, até **3** editais salvos, resumo semanal por e-mail.
- Pro: **R$ 49/mês**; salvos ilimitados, alertas diários, checklist, calendário e compatibilidade.
- Assessoria: **R$ 199/mês**; benefícios Pro, revisão de propostas por especialista, relatório mensal, até **5 usuários**.

**Regra:** serviços humanos prometidos precisam de processo operacional e limites claros antes de qualquer cobrança real.

## 2. Diretriz visual dos anexos

O PDF recebido é **guia de identidade visual**, não wireframe de telas web. Consta:

- Assinatura com símbolo manuscrito `f`, logotipo **fomentoria**; conceito de conexão entre projeto e recursos.
- Paleta declarada: `#0A1551` (azul-marinho), `#042E2D` (verde-escuro), `#121617` (quase preto), `#7CBFE4` (azul-claro), `#FE6E54` (coral). Há também superfícies claras nas aplicações.
- Família tipográfica: **Anek Tamil**. Validar obtenção e licença da versão web antes de incorporá-la; não pressupor que o PDF tenha fonte web utilizável.
- Frase: **“Onde a inovação encontra recurso.”**
- Linguagem: institucional/confiável, moderna e acolhedora. As peças de redes sociais exemplificam a marca, não a arquitetura do produto.

Proposta de UX alinhada ao documento funcional: **lista compacta, não mural de cards**, filtros pesquisáveis e combináveis, prazos em destaque, detalhe editorial, CTA “Inscrever-se no site oficial” e portal do cliente bem separado do administrativo.

## 3. Decisões já tomadas e premissas técnicas

1. Tudo rodará localmente; nada será colocado em produção durante estes blocos.
2. **Um bloco por vez.** Inspecionar estado anterior, implementar apenas o escopo autorizado, testar, documentar, congelar evidências e submeter ao Work para auditoria independente.
3. Nenhum bloco inicia após seu predecessor até aceite explícito do responsável pelo projeto.
4. Git local com commits controlados; push/PR/deploy não são automáticos. Operações remotas somente por ação/autorização específica.
5. Nada de cartões reais, Pix real, boleto real, mensagens reais ou crawling de fontes externas na etapa local por padrão. Usar adaptadores e simuladores documentados.
6. Dados de demonstração **identificados como fictícios**, separados de dados verificados, sem simular publicação oficial.
7. Sem arquitetura de microsserviços ou infraestrutura cara por antecipação.
8. Ambiguidades de produto serão registradas como decisões pendentes; não inventar regra silenciosamente.

### Stack sugerida, a validar e congelar no Bloco 0

- Aplicação web: **Next.js + TypeScript** em monólito modular, separando camada de domínio, casos de uso e persistência.
- UI: Tailwind CSS + biblioteca de componentes acessíveis; tokens da identidade visual.
- Persistência: PostgreSQL, migrations versionadas e ORM tipado (selecionar no Bloco 0).
- Ambiente: Docker Compose para PostgreSQL e serviço local de captura de e-mails (ex.: Mailpit); app Node no host ou Compose, com scripts reproduzíveis.
- Validação: schemas tipados; autorização sempre no servidor, nunca somente na UI.
- Testes: unidade, integração com banco real isolado, E2E de navegador e testes de acessibilidade/segurança/performance.
- Busca v1: PostgreSQL com índices e paginação; motor de busca independente só mediante evidência de necessidade.
- Tarefas recorrentes: abstratas por interface; implementar mecanismo de jobs apenas quando chegar o bloco de alertas.

A escolha **não é** um contrato de implementação até a auditoria de arquitetura aprová-la.

## 4. Matriz dos blocos e marcos

| Bloco | Nome | Entrega / fronteira do bloco | Marco |
|---|---|---|---|
| **0** | Produto, arquitetura e contratos | Requisitos rastreáveis, fluxos, decisões, ERD, threat model, backlog e protótipos de navegação; sem código | Definição |
| **A** | Fundação local | Repositório, configuração, PostgreSQL local, migrations, qualidade, execução e smoke test | MVP público |
| **B** | Design system e cascas | Tokens/cores/tipografia/componentes, navegação pública, layouts desktop/mobile, estados vazios | MVP público |
| **C** | Segurança e acesso interno | Login de administrador, sessões, papéis mínimos e rotas protegidas; auditoria de autorização | MVP público |
| **D** | Catálogo e admin manual | Entidades de edital/instituição, publicação/revisão, CRUD administrativo, trilha de alterações e seeds fictícios | MVP público |
| **E** | Lista, busca e filtros | Listagem em linhas, busca textual, combinação de filtros, ordenação, paginação e status por prazo | MVP público |
| **F** | Detalhe público | Ficha técnica, elegibilidade, cronograma, documentos, relacionados, fonte/checagem e CTA externo seguro | **Gate MVP 1** |
| **G** | Contas e perfil da empresa | Cadastro/login usuário, recuperação, empresas, setores/estágios, escopos de acesso | Cliente |
| **H** | Favoritos e freemium | Salvar/remover, teto de 3 no gratuito, entitlements no backend e UX de upgrade | Cliente |
| **I** | Recomendações explicáveis | Match determinístico setor/estágio/região; score auditável, campos ausentes e testes de elegibilidade | Cliente |
| **J** | Checklist e calendário | Checklist por edital/empresa, eventos e prazos, exportação local se aprovada, sem submissão interna | Cliente |
| **K** | Notificações por e-mail | Preferências/consentimento, resumo semanal/alerta diário/urgência; jobs idempotentes e Mailpit local | Cliente |
| **L** | Planos e ciclo de assinatura | Matriz de funcionalidades, escolha de plano, mudanças/cancelamento, estados e histórico | Cliente |
| **M** | Checkout local e billing | Checkout, CNPJ, cupons, simulador de cartão/Pix/boleto, eventos/webhooks fictícios e conciliação idempotente | **Gate Cliente 2** |
| **N** | Assessoria e equipes | Até 5 usuários, convites, papéis, clientes/empresas (se aprovado), solicitações de revisão e relatórios | Operação |
| **O** | Backoffice completo | Usuários, planos, moderação, trilhas, estados de pagamento; fluxo de envio de editais por instituições | Operação |
| **P** | Blog/CMS editorial | Posts, categorias, publicação, busca e metadados SEO; sem automação externa | Conteúdo |
| **Q** | WhatsApp em modo local | Preferências e consentimento, templates e adapter com simulação; nenhum envio real | Alertas |
| **R** | Ingestão assistida | Fonte oficial, proveniência, detecção de atualização, normalização, deduplicação e fila de revisão | Dados |
| **S** | API de pesquisa | API versionada, filtros, paginação, autenticação/permissões conforme exposição e limites | Dados |
| **T** | B2B — publicação e inscrições | Instituições, isolamento de dados, editais geridos, formulários versionados e inscrições internas | B2B |
| **U** | B2B — avaliação e acompanhamento | Avaliadores, pontuação, decisões, recursos/auditoria e monitoramento pós-seleção | B2B |
| **V** | Auditoria final local | E2E, segurança, privacidade, carga, acessibilidade, falhas, matriz RF/RNF e backlog pré-produção | **Gate Final Local** |

**Importante:** o planejamento dos blocos posteriores não autoriza desenvolvê-los agora. Blocos poderão ser desdobrados por auditoria de tamanho/risco, preservando os requisitos originais.

## 5. Critérios mínimos de aceite por bloco

### Bloco 0 — contratos e decisões
- Requisitos RF01–RF10 associados a blocos e cenários de teste.
- Fluxos aprovados: visitante, administrador, cliente gratuito, Pro, Assessoria, instituição e operador.
- Regras de planos, valores, instituições, regiões, prazos, elegibilidade, fonte e atualização documentadas.
- ERD lógico, fronteiras de autorização, mapa de rotas, arquitetura e estratégia de testes aprovados.
- Wireframes de listagem, detalhe, admin e área do cliente (sem confundir com peças de marca).
- Registro explícito das lacunas da seção 7 e decisões abertas.

### A–F — primeiro sistema utilizável
- Setup documentado e reproduzível em ambiente local limpo.
- Administrador consegue entrar, criar/editar/revisar/publicar/encerrar edital sem acesso direto ao banco.
- Usuário anônimo consegue filtrar/buscar/ver detalhes; paginação consistente; nenhuma página de detalhe depende de hardcode.
- Cada edital publicado mostra link verificável, fonte, data da última checagem, prazo e status calculado conforme regra aprovada.
- Sem contas de clientes, pagamento, scraping ou mensagens reais. **Sem exigir login do visitante.**
- Testes felizes e negativos, E2E mobile/desktop, authorization bypass, XSS, SQL injection, slugs e datas-limite.

### G–M — monetização em simulação
- Usuários e empresas corretamente isolados; permissões testadas contra leitura/gravação cruzada.
- Limite gratuito aplicado server-side, inclusive concorrência/replay.
- Recomendação não se apresenta como decisão oficial de elegibilidade e deve explicar motivos e incertezas.
- Alertas determinísticos, sem mensagens duplicadas; e-mails capturados somente localmente.
- Planos/checkout têm estados explícitos: pendente, confirmado, recusado, cancelado, reembolsado etc. conforme contrato escolhido.
- Nenhuma liberação de benefícios sem confirmação de evento de pagamento autenticado/simulado de forma verificada; replay idempotente.
- Cartão nunca armazenado. Nenhum pagamento de verdade executado.

### N–U — expansão
- Assessoria define SLA, capacidade, anexos, atores e limites antes de prometer entrega.
- Parceiro não publica diretamente: passa por moderação e rastreabilidade.
- Ingestão nunca altera edital publicado sem regras de revisão definidas; mudanças críticas (prazo/status) geram eventos auditáveis.
- B2B mantém fronteiras de instituição/edital/candidato/avaliador, com revisões e trilhas de decisão.

### V — auditoria final local
- Cobertura funcional integral do escopo local aprovado, evidências reproduzíveis e matriz de requisitos preenchida.
- Testes de 5.000 editais e listagem alvo de 2 s no ambiente de benchmark documentado; sem confundir medida local com SLA público.
- Testes de perdas de rede, duplicidade, replay de webhook/job, tentativas cross-tenant, condições de corrida, falhas de migração e recuperação.
- Inventário do que **não pode ser certificado localmente** (ex.: disponibilidade de 99,5%, entregabilidade real de e-mail/WhatsApp, pagamentos reais, fontes ao vivo, segurança/configuração de produção).
- Entrega de backlog e plano de hardening/deploy **sem efetuar deploy**.

## 6. Modelo de dados conceitual, para aprovação no Bloco 0

Entidades principais e evolução prevista:

- `Institution`, `Source`, `CallForProposals/Edital`, `EditalRevision`, `EditalDeadline`, `EditalDocumentRequirement`, `EditalAttachment`, `TaxonomySector`, `TaxonomyStage`, `Region`, `EditalSourceCheck`, `AuditEvent`.
- `User`, `Session`, `Organization/Company`, `Membership`, `CompanyProfile`, `SavedEdital`, `CompatibilityEvaluation`, `DocumentChecklist`, `CalendarItem`, `NotificationPreference`, `NotificationDelivery`.
- `Plan`, `Entitlement`, `Subscription`, `BillingEvent`, `PaymentAttempt`, `Coupon`, `Invoice/Receipt` (de acordo com desenho de gateway futuro).
- `AdvisorRequest`, `AdvisorReview`, `PartnerSubmission`, `ModerationDecision`, `BlogPost`.
- `ImportSource`, `ImportRun`, `ImportCandidate`, `DeduplicationDecision`, `ApiClient`.
- Futuro B2B: `ManagedCall`, `FormVersion`, `FormField`, `Application`, `ApplicationAnswer`, `Evaluation`, `EvaluationCriterion`, `Decision`, `Appeal`, `PostAwardMonitoring`.

**Observação:** nomenclatura e cardinalidades são preliminares. Evitar duplicar um edital agregado e um edital gerido sem regra clara.

## 7. Lacunas/regras que precisam de decisão antes de código relevante

| Tema | Problema identificado | Proposta inicial |
|---|---|---|
| Nome | Conversa usa “Fomento”; os dois anexos usam “Fomentoria” | Repositório `fomento`, marca de interface `Fomentoria`, sujeito a aprovação |
| Aparência | PDF não define telas, estados ou grids | Bloco 0 cria wireframes; B produz UI, obedecendo lista (não cards) |
| Atualização | Requisito de checagem diária versus MVP manual | No MVP, campo `última checagem` + revisão administrativa diária; automação só no bloco R |
| Editais | Falta contrato de campos, fontes, anexos, versões | Schema validado, provenance, revisão, valores ausentes, prazo/date/timezone |
| Prazos | “Encerra em breve” não tem threshold; editais podem prorrogar ou suspender | Configurar threshold e regras de retificação/indisponibilidade no Bloco 0 |
| Elegibilidade | Setor/estágio podem não bastar para critérios jurídicos | Score indicativo e explicável; link ao edital oficial e alertas sobre informações incompletas |
| Planos | Resumo semanal gratuito vs notificações imediatas; WhatsApp listado antes da integração | Tabela de entitlements por plano e canal; não mostrar recurso desativado como funcional |
| Assessoria | “Revisão por especialista” não define quantidade, escopo, SLA ou responsáveis | Delimitar workflow, SLA, anexos, solicitações e capacidade no Bloco 0/N |
| Multiempresa | Consultores precisam de múltiplos clientes e plano prevê até 5 usuários | Isolamento por organização e papéis; multiempresa explícito, nunca acesso cruzado |
| Cobrança | “Mensal + cartão/Pix/boleto” não assegura recorrência equivalente por meio | Simulador local; decidir gateway e regras de renovação/inadimplência só na etapa de integração real |
| Origem dos dados | Risco de dado desatualizado, duplicado, link inválido ou informação inventada | Proveniência, checagem, revisão e aviso de fonte oficial |
| Conteúdo | Blog e editais precisam de SEO, slug, atualização e arquivamento | Páginas indexáveis desde o MVP; controles editoriais no P |
| LGPD | Não há política detalhada para consentimento, retenção e exclusão | Minimização, fluxos de solicitação, base legal e auditoria documentados |
| Segurança | Autenticação interna precede o primeiro CRUD administrativo | Bloco C antes de D, com autorização e testes negativos |
| Desempenho | Meta 2 s/5.000 editais e SLA 99,5% têm medições distintas | Benchmark local reprodutível; SLA apenas validável em produção |

## 8. Contrato de implementação, auditoria e aceite (método Jonas)

Para **cada bloco**:

1. **Pré-auditoria de leitura:** inspecionar repo e relatórios congelados; mapear dependências e preservar o que já existe.
2. **Plano curto do bloco:** objetivos, fronteiras, arquivos previstos, contratos, dados/migrations, testes e riscos. Registrar desvios antes de implementar.
3. **Implementação limitada:** somente o bloco liberado; sem iniciar o próximo e sem mudanças invisíveis de escopo.
4. **Verificação técnica:** lint, typecheck, build, unit/integration/E2E pertinentes, testes negativos, verificações de segurança, acessibilidade e regressão; registrar também falhas e skips.
5. **Evidências:** `docs/blocos/BLOCO-XX-IMPLEMENTACAO.md`, `docs/blocos/BLOCO-XX-AUDITORIA.md`, `artifacts/blocos/XX/` para logs, relatórios, capturas, migrações e inventário; hashes para congelamento quando necessário.
6. **Auditoria independente no Work:** inspecionar os artefatos e reproduzir cenários, buscando falsos positivos, contorno de autorização e desvios de requisito; emitir APROVADO / REPROVADO / APROVADO COM RESSALVAS EXPLÍCITAS.
7. **Gate humano:** proprietário aprova a passagem. Nada de autoaprovação, push/PR remoto, deploy ou novo bloco pelo agente.

**Padrão de relatórios:** escopo declarado, escopo efetivo, arquivos alterados, riscos, decisões, contratos, migrations, fluxo feliz, teste negativo, testes executados e comandos exatos com exit code, resultados pass/fail/skip, pendências, diff, conclusões e evidências de reprodução.

**Disciplina de testes:** não remover assertions, maquiar skips, interpretar falhas de infraestrutura como sucesso, usar dados reais inadvertidamente ou afirmar integração real porque passou em mock.

## 9. Matriz de rastreabilidade dos requisitos originais

| Requisito | Blocos principais | Observação |
|---|---|---|
| RF01 Filtros combináveis | D, E | E2E combina filtros, vazios e paginação |
| RF02 Busca título/instituição | E | Normalização e índices |
| RF03 Detalhe/cronograma/docs | D, F | Origem oficial e revisão |
| RF04 Salvos | G, H | Teto por plano, isolamento e concorrência |
| RF05 Checkout cartão/Pix/boleto | L, M | **Somente simulado localmente** |
| RF06 Confirmação/liberação | L, M | Máquina de estados, replay, idempotência |
| RF07 Recomendação | G, I | Explicável e não garantidora de elegibilidade |
| RF08 Alterar plano/histórico | L, M | Ciclo completo de estados |
| RF09 Preferências e-mail/alertas | K, Q | E-mail local, WhatsApp mock posterior |
| RF10 Instituições submetem editais | O | Moderação humana antes de publicação |

## 10. Política para a fase de produção (fora deste desenvolvimento)

Após o aceite do bloco V, abrir **outro plano de implantação** com: segredos/credenciais, provedor de e-mails, gateway real de pagamento, WhatsApp Business, domínio, backup/restore, disponibilidade/monitoramento, automações de fontes oficiais, testes de carga em ambiente de destino, LGPD operacional, política de retenção e deploy com rollback. Não começar essa fase automaticamente.

## 11. Próxima execução autorizável

**Somente Bloco 0 — Descoberta/contratos.**

Prompt resumido recomendado ao Work, modo GPT-6 Astra com raciocínio High:

> Use os anexos de requisitos e identidade visual da Fomentoria como fontes primárias. Sem escrever código, prepare um pacote de arquitetura e produto para desenvolvimento 100% local: matriz RF/RNF, fluxos e papéis, taxonomias, modelo de dados lógico, status e regras de prazo, planos/entitlements, desenho de telas (wireframes descritos ou protótipos autorizados), contratos entre módulos, threat model, cenários de teste e decisões pendentes. Não invente funcionalidades como aprovadas: identifique lacunas, proponha defaults e marque-os claramente. Preserve a listagem em linhas, o CTA para o site oficial, cadastro manual como primeiro MVP e a identidade visual. Gere relatórios auditáveis, não inicie o Bloco A, não efetue push, PR nem deploy. Ao final, solicite aceite explícito.
