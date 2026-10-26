# 12 — Roadmap revisado, dependências e fronteiras

> **Documento de proposta para auditoria, versão 0.3-R2 · 26/10/2026.** Apenas o Bloco 0. As seções marcadas **PROPOSTA**, **PREMISSA** e **DECISÃO PENDENTE** não constituem autorização de implementação, contrato congelado ou política comercial aprovada.

**Registro histórico R1 (não normativo onde substituído por R2):** versão derivada do pacote v0.1, corrigida sob AUD-01–AUD-15. Todas as definições de R1 são **PROPOSTAS CONDICIONAIS**, não decisões aprovadas; a matriz D-01–D-28 em `03-DECISOES-E-CONFLITOS.md` prevalece como índice de gates. Nenhuma migração, implementação ou aceite foi executado. **Se houver divergência de testes, prevalece exclusivamente o catálogo R2 em `11-TESTES-E-GATES.md`.**

**Convenção de rastreabilidade:** `ORIGINAL` = conteúdo sustentado pelos anexos primários; `PROPOSTA` = desenho técnico; `PREMISSA` = hipótese; `DECISÃO PENDENTE` = aprovação requerida; `CONFLITO` = tensão entre fontes/planos. Referências: `REQ` (DOCX, página/seção), `ID` (PDF, página), `P02` e `P01` (planos mestres, seção).

## 1. Origem e contagem

**ORIGINAL:** REQ p.3–4 §9 prescreve sete fases evolutivas (MVP catálogo/admin, cliente/pagamento, backoffice, blog, WhatsApp, dados/API, B2B) e REQ p.4 §10 deixa app nativo e assinatura eletrônica além da fase 7. **PROPOSTA:** P02 §4 desdobra em 23 blocos: **0 + A até V**; nenhum cronograma/calendário foi aprovado. Proibido iniciar um bloco sem gate anterior humano; roadmap não autoriza os posteriores.

## 2. Marcos

| Marco | Blocos | Condição |
|---|---|---|
| Definição | 0 | documentação entregue, auditoria independente e aceite humano antes de A |
| MVP público | A–F | Gate MVP 1 de 14 etapas ao final F, com 5 fictícios publicados + 1 draft |
| Cliente | G–M | Gate Cliente 2 em M, pagamento/mensagens simulados |
| Operação/conteúdo | N–Q | assessoria com política de serviço; moderação; blog; WhatsApp mock |
| Dados | R–S | ingestão assistida e API local |
| B2B | T–U | isolamento de instituição/candidato/avaliador |
| Final local | V | evidências, limitações e backlog, sem produzir deploy |

## 3. Planos de bloco individuais

### Bloco 0 — Produto, arquitetura e contratos

- **Objetivo:** Consolidar requisitos do produto e identidade, sem código.
- **Escopo:** Matriz RF/RNF, personas, domínios, estados, ownership, contratos, ameaças, wireframes e decisões.
- **Dependências:** Quatro fontes e este escopo autorizado.
- **Entregáveis:** 14 documentos MD, inventário, hashes, matriz e pacote ZIP.
- **Risco principal:** Inferir decisões inexistentes ou não verificar anexos.
- **Testes esperados:** Check de hashes, matriz 10/10 RF, coerência cruzada, lacunas registradas.
- **Aceite verificável:** 14 docs verificáveis e lacunas não ocultas.
- **Exclusões:** Sem instalar/criar código, repo, banco, deploy.
- **Gate:** Auditoria documental independente e aceite humano antes de A.

### Bloco A — Fundação local

- **Objetivo:** Estabelecer ambiente reprodutível local, apenas após gate 0.
- **Escopo:** Estrutura do monólito, rotinas qualidade, Compose futuro local DB/test mail, migrations iniciais mínimas.
- **Dependências:** Bloco 0 reauditado e aceito; **matriz única em `03` §R1**. D-01/D-08 e governança D-09/D-23; D-03/D-22/D-06/D-02/D-26 e outras somente se as migrations efetivas de A materializarem seus respectivos domínios. Não usar lista histórica v0.1 como autorização.
- **Entregáveis:** Scripts de setup, guia ambiente, smoke e evidências de banco isolado.
- **Risco principal:** Schema antecipar módulos futuros ou infra irreproduzível.
- **Testes esperados:** lint/typecheck/build/smoke/integração DB limpa.
- **Aceite verificável:** Ambiente limpo sobe, migra e testa sem serviço externo.
- **Exclusões:** Sem feature de catálogo, UI final, pagamento, scraping.
- **Gate:** Auditoria A e aceite humano.

### Bloco B — Design system e cascas

- **Objetivo:** Traduzir marca em componentes acessíveis e navegação MVP.
- **Escopo:** Tokens ID, fonte web licenciada, componentes, layout público/admin, estados vazios/mobile.
- **Dependências:** A aceito; D-27/licença decidida.
- **Entregáveis:** Design tokens, story states, testes de navegação e contraste.
- **Risco principal:** Baixo contraste e transformar lista em cards.
- **Testes esperados:** Playwright a11y/teclado/mobile/visual.
- **Aceite verificável:** Lista e shell fiéis à marca, sem recurso falso.
- **Exclusões:** Sem CRUD, login ou catálogo real.
- **Gate:** Auditoria B e aceite humano.

### Bloco C — Segurança e acesso interno

- **Objetivo:** Garantir administração local autorizada.
- **Escopo:** Identidade/sessão admin, RBAC editorial, rotas protegidas e auditoria negativa.
- **Dependências:** B; D-07/08 e sessão escolhida.
- **Entregáveis:** Login admin local e policies testadas.
- **Risco principal:** Privilege escalation, CSRF, enumeração.
- **Testes esperados:** 401/403; bypass, revogação, CSRF aplicável.
- **Aceite verificável:** Editor não consegue publicar por endpoint direto.
- **Exclusões:** Sem login cliente G ou social sign-in.
- **Gate:** Auditoria C e aceite humano.

### Bloco D — Catálogo e admin manual

- **Objetivo:** Persistir editais e versões com operação editorial.
- **Escopo:** Institution/Source/Edital, revisões, prazos, checagem, CRUD e moderação interna.
- **Dependências:** C aceito; D-04/05/06/10/11/12/13/25 ratificados conforme matriz `03`; dados públicos integralmente versionados e rotina diária com operador/substituto e evidências definidos.
- **Entregáveis:** CRUD local de fonte e edital com revisão e trilha.
- **Risco principal:** Publicação sem fonte, duplicidade, races.
- **Testes esperados:** DB real, transições, 409, autorizações.
- **Aceite verificável:** Admin publica somente revisão autorizada e historizada.
- **Exclusões:** Sem listagem pública avançada ou import automático.
- **Gate:** Auditoria D e aceite humano.

### Bloco E — Lista, busca e filtros

- **Objetivo:** Entregar descoberta em linhas no portal público.
- **Escopo:** Filtros AND, busca título/instituição, ordenação, paginação, status.
- **Dependências:** D e taxonomias aprovadas.
- **Entregáveis:** Listagem responsiva, endpoint público paginado.
- **Risco principal:** Consulta lenta, vazamento de drafts, paginação instável.
- **Testes esperados:** RF01/02, SQLi, acentos, 5.000 benchmark preliminar.
- **Aceite verificável:** Lista sem cards, só published, filtros corretos.
- **Exclusões:** Sem favoritos persistidos ou score.
- **Gate:** Auditoria E e aceite humano.

### Bloco F — Detalhe público

- **Objetivo:** Completar MVP e conduzir validação prática.
- **Escopo:** Ficha, cronograma, elegibilidade, documentos, fonte, checagem, relacionados, URL segura.
- **Dependências:** E e regras de fonte/prazo aprovadas.
- **Entregáveis:** Detalhe conectado ao DB; 14 etapas de MVP 1.
- **Risco principal:** Link enganoso, interpretação de prazo, mobile ruim.
- **Testes esperados:** RF03, fonte inválida, teclado, E2E MVP-01..14.
- **Aceite verificável:** ≥5 fictícios publicados distintos + 1 draft oculto; Gate MVP 1 PASS.
- **Exclusões:** Sem conta cliente, cobrança, avisos reais.
- **Gate:** GATE MVP 1 + auditoria F + aceite humano.

### Bloco G — Contas e empresa

- **Objetivo:** Adicionar identidade de cliente e contextos de organização.
- **Escopo:** Cadastro/login, recuperação local, CompanyProfile, Membership, troca de contexto.
- **Dependências:** F gate; D-02/03/22/26 conforme necessidade.
- **Entregáveis:** Membros A/B e política de acesso server-side.
- **Risco principal:** IDOR e recuperação insegura.
- **Testes esperados:** AUTH-01..09, permissão cross-tenant.
- **Aceite verificável:** Trocar cliente nunca expõe dados de outro.
- **Exclusões:** Sem salvar/planos pagos.
- **Gate:** Auditoria G e aceite humano.

### Bloco H — Favoritos e freemium

- **Objetivo:** Salvar/remover respeitando dono e limite.
- **Escopo:** Lista pessoal RF04; máximo 3 grátis; resolver entitlement FREE server-side pelo contrato versionado do H, cota transacional; UX de upgrade informativa, **nenhuma liberação paga**.
- **Dependências:** G; D-02/D-26 ratificados antes de schema/contrato de favoritos; porta ENT `FREE_POLICY_V1` criada no próprio H, **sem depender de L/BILL**.
- **Entregáveis:** Favoritos com autorização e limite concorrente.
- **Risco principal:** Escopo confuso e race >3.
- **Testes esperados:** RF04, ENT-01..03, replay/save paralelo.
- **Aceite verificável:** Isolamento e teto não burláveis.
- **Exclusões:** Sem billing real ou recomendação.
- **Gate:** Auditoria H e aceite humano.

### Bloco I — Recomendações explicáveis

- **Objetivo:** Sugerir editais com critérios auditáveis.
- **Escopo:** Score determinístico setor/estágio/região; missing data e explicação.
- **Dependências:** H; taxonomias/perfil aprovados.
- **Entregáveis:** Explicação do match com versão do perfil.
- **Risco principal:** Falso positivo jurídico e viés.
- **Testes esperados:** RF07, ausências, mudanças de perfil e cross-tenant.
- **Aceite verificável:** Nunca apresentar garantia de elegibilidade.
- **Exclusões:** Sem IA opaca ou aplicação automática.
- **Gate:** Auditoria I e aceite humano.

### Bloco J — Checklist e calendário

- **Objetivo:** Ajudar organização dos prazos.
- **Escopo:** Itens por empresa/edital, calendário e eventual export local aprovada.
- **Dependências:** I e ownership org revisado.
- **Entregáveis:** Checklist e cronograma versionados.
- **Risco principal:** Prazos defasados, escopo vazado.
- **Testes esperados:** criação/edição, timezone, AUTH-09.
- **Aceite verificável:** Org B não altera checklist A.
- **Exclusões:** Sem inscrição interna ou sincronização real.
- **Gate:** Auditoria J e aceite humano.

### Bloco K — Notificações por e-mail

- **Objetivo:** Planejar/capturar alertas localmente.
- **Escopo:** Consentimento, semanal/diário/prazo, fila idempotente, Mailpit local.
- **Dependências:** J; D-18 aprovado.
- **Entregáveis:** Preferências e logs de e-mail capturados localmente.
- **Risco principal:** Duplicidade, envio sem consentimento.
- **Testes esperados:** job replay, opt-out, throttle e privacy.
- **Aceite verificável:** Zero envio real, sem duplicações em replay.
- **Exclusões:** Sem WhatsApp real.
- **Gate:** Auditoria K e aceite humano.

### Bloco L — Planos e assinatura

- **Objetivo:** Definir acesso por plano e ciclo.
- **Escopo:** PlanDefinition/Subscription e máquinas de estados consumindo porta ENT já existente em H, sem ativação de benefícios pagos antes da confirmação local de M.
- **Dependências:** K; D-16/26 decisões comerciais de simulação.
- **Entregáveis:** Matriz validada e máquina de assinaturas simuladas.
- **Risco principal:** Benefício sem pagamento.
- **Testes esperados:** ENT e estados de assinatura.
- **Aceite verificável:** Políticas explícitas antes de habilitar uso.
- **Exclusões:** Sem checkout/gateway real.
- **Gate:** Auditoria L e aceite humano.

### Bloco M — Checkout e billing local

- **Objetivo:** Simular três métodos com confirmação segura.
- **Escopo:** Checkout, CNPJ/cupom, attempts, eventos fictícios, idempotência.
- **Dependências:** L; D-15/16 ratificados localmente.
- **Entregáveis:** Test harness fake, conciliação e recibo fictício.
- **Risco principal:** Replay, fraude, cartão armazenado.
- **Testes esperados:** BIL-01..10, concorrência, logs sanitizados.
- **Aceite verificável:** Só evento verificado concede plano, 0 pagamentos reais.
- **Exclusões:** Sem gateway/PIX/boleto verdadeiros.
- **Gate:** GATE Cliente 2 + auditoria M + aceite humano.

### Bloco N — Assessoria e equipes

- **Objetivo:** Especificar/operar workflows humanos sob limites.
- **Escopo:** Solicitação de revisão, SLA, capacidade, relatórios, convites e 5 usuários.
- **Dependências:** M; D-20/21/26 aprovados.
- **Entregáveis:** Fluxos de equipe/revisão com evidência.
- **Risco principal:** Serviço não viável, quotas cruzadas.
- **Testes esperados:** AUTH-06, convites concorrentes, anexos privados.
- **Aceite verificável:** Limite humano/SLA testável e declarado.
- **Exclusões:** Sem contratar serviços externos.
- **Gate:** Auditoria N e aceite humano.

### Bloco O — Backoffice e moderação

- **Objetivo:** Centralizar suporte/editorial/instituições.
- **Escopo:** Usuários, planos, pagamentos simulados, parceiros e fila de submissão.
- **Dependências:** N; D-19 e papéis aprovados.
- **Entregáveis:** Painel operações e decisão moderada.
- **Risco principal:** Parceiro autopublica ou escala privilégios.
- **Testes esperados:** PART-01, publicação negada, PII logs.
- **Aceite verificável:** Parceiro não publica sem moderação.
- **Exclusões:** Sem blog/automação.
- **Gate:** Auditoria O e aceite humano.

### Bloco P — Blog/CMS

- **Objetivo:** Publicar conteúdo editorial com SEO planejado.
- **Escopo:** Posts, categorias, slug, estados, metadados e busca.
- **Dependências:** O; contrato CMS aprovado.
- **Entregáveis:** CMS interno e portal público local.
- **Risco principal:** XSS e autoria indevida.
- **Testes esperados:** XSS, RBAC, rascunho invisível.
- **Aceite verificável:** Publicação controlada e texto sanitizado.
- **Exclusões:** Sem distribuição externa e-mail/social.
- **Gate:** Auditoria P e aceite humano.

### Bloco Q — WhatsApp em modo local

- **Objetivo:** Modelar canal mantendo zero disparos reais.
- **Escopo:** Preferências, consentimentos, templates e mock adapter.
- **Dependências:** P/K; D-18 e termos definidos.
- **Entregáveis:** Logs simulados/testes de opt-out.
- **Risco principal:** Canal ativo incorretamente, dados sensíveis.
- **Testes esperados:** template/consent/replay/idempotência.
- **Aceite verificável:** Nenhuma mensagem sai do ambiente local.
- **Exclusões:** Sem WhatsApp Business conectado.
- **Gate:** Auditoria Q e aceite humano.

### Bloco R — Ingestão assistida

- **Objetivo:** Normalizar fontes com fila de revisão.
- **Escopo:** ImportSource/Run/Candidate, proveniência, diff, dedup.
- **Dependências:** Q e CAT/FON/ADM estáveis.
- **Entregáveis:** Pipeline candidato→aprovação, sem autopublish.
- **Risco principal:** SSRF, duplicação, prazo falso.
- **Testes esperados:** ING-01, SRC, DED, sem rede por padrão.
- **Aceite verificável:** Edital publicado exige revisão humana.
- **Exclusões:** Sem crawling real por padrão.
- **Gate:** Auditoria R e aceite humano.

### Bloco S — API de pesquisa

- **Objetivo:** Expor pesquisa controlada, versionada.
- **Escopo:** Endpoints, filtros, quota, autenticação apropriada, paginação.
- **Dependências:** R e contrato CAT estabilizado.
- **Entregáveis:** API docs/contract tests local.
- **Risco principal:** Enumerar tenants, abuso/rate.
- **Testes esperados:** AUTH/429, filtros e estabilidade.
- **Aceite verificável:** Sem dados privados e com quota server-side.
- **Exclusões:** Sem serviço de terceiros ou API pública real.
- **Gate:** Auditoria S e aceite humano.

### Bloco T — B2B publicação e inscrição

- **Objetivo:** Preparar instituição gestora e candidatos.
- **Escopo:** ManagedCall, FormVersion/Field, Application e isolamento.
- **Dependências:** S; D-24 e LGPD B2B ratificados.
- **Entregáveis:** Formulário versionado, submissão interna.
- **Risco principal:** Mistura com catálogo global, PII.
- **Testes esperados:** cross-tenant, formulário frozen, deadline.
- **Aceite verificável:** Candidato só vê/edita a própria inscrição.
- **Exclusões:** Sem avaliação/decisão U.
- **Gate:** Auditoria T e aceite humano.

### Bloco U — B2B avaliação e acompanhamento

- **Objetivo:** Concluir workflow institucional.
- **Escopo:** Avaliadores, critérios, pontuação, decisão, recursos e monitoramento.
- **Dependências:** T; política de avaliação/recurso aprovada.
- **Entregáveis:** Trilha de decisão e recurso com locks.
- **Risco principal:** Conflito interesses e acesso não atribuído.
- **Testes esperados:** B2B-01, auditoria, replay, histórico.
- **Aceite verificável:** Avaliador acessa só designados; versão imutável.
- **Exclusões:** Sem integrações de assinatura eletrônica.
- **Gate:** Auditoria U e aceite humano.

### Bloco V — Auditoria final local

- **Objetivo:** Reproduzir toda a matriz sem inferir produção.
- **Escopo:** E2E, carga 5.000, regressão, segurança/privacidade, backup simulado e inventário de limites.
- **Dependências:** U + todos gates e evidências disponíveis.
- **Entregáveis:** Relatório final local, gaps e backlog pós-produção.
- **Risco principal:** Falsos passes, SLA inferido.
- **Testes esperados:** PERF-01, AUTH/BIL/ING/B2B, testes negativos.
- **Aceite verificável:** Relatórios reproduzidos, bloqueadores tratados.
- **Exclusões:** Sem deploy, gateway, WhatsApp, crawling real.
- **Gate:** GATE Final Local + aceite humano; plano produção separado.

## 4. Dependências transversais e divisões condicionais

- A precisa do aceite de arquitetura/tenant/segurança; D exige estados, proveniência e regra de prazo antes da migration; G/H precisam da decisão de favoritos pessoais e escopo de assinatura; L/M exigem política comercial; N exige SLA humano; T/U exigem política de proteção do candidato e segregação institucional.
- **PROPOSTA de subdivisão se necessário:** D1 domínio/DB, D2 fluxos revisão/admin; M1 entitlements/ledger, M2 simulador/eventos; N1 membros, N2 assessoria; T1 gestão de editais, T2 inscrições/formulários; U1 avaliação, U2 recursos/monitoramento. Sub-blocos teriam gates próprios e novos rastreios, jamais fusão tácita.
- Mudança de requisito exige registro de motivo, RF/RNF, dados, interface, segurança, test plan, esforço/custo relativo e impacto em blocos; encaminhar auditoria e aprovação humana.
- A plataforma começa como **agregador**; gestão ponta a ponta nasce em T/U sem migrar candidaturas externas do MVP para dentro da plataforma por suposição.

## 5. Bloqueios / regra de não execução

Nenhum bloco de A–V foi executado neste pacote. Não há commit, branch, PR, deploy ou testes de aplicativo. Próximo ato permitido após esta entrega é auditoria documental independente e discussão de decisões; não implementação automática.

## R1 — Reconciliação única dos gates e subdivisões (AUD-04/05/09)

**Fonte única de autoridade:** `03-DECISOES-E-CONFLITOS.md` §"Matriz de autoridade D-01–D-28 (R1)". As dependências escritas em blocos individuais são requisitos técnicos locais **subordinados** à matriz única, especialmente no que for condicionado à migration real. Nesta versão não há schema executável; logo, a hipótese “A migrará Subscription/SavedEdital” **não está aprovada**. A rota de menor risco é A migrar somente o mínimo necessário para setup, sem antecipar billing/favoritos; se essa hipótese mudar, antecipar D-02/D-26 e documentar risco.

- **0:** documento corrigido R1 → reauditoria por outra execução → deliberação humana; auditoria não é aprovação.
- **A:** Stack + fronteiras de módulos aprovadas para estrutura local. Levantamento `migration→entidade→decisão` integra o plano de A; sem escolher políticas de H/L/M por conveniência.
- **B/C:** B fecha identidade/fontes tipográficas antes UI; C fecha D-07 e AUTH-11 operacional antes liberar administração.
- **D–F:** snapshot versionado `published_revision_id`, rotina diária, taxonomias, fontes, timezone, concorrência e Gate MVP1 com 10 fixtures/15 cenários; D-06 será obrigatório se ainda não ratificado.
- **G–H:** entidade de login/organizações + favoritos; ENT mínimo gratuito nasce em H. `D-02/D-26` ratificados até schema relevante, ou gate posterior impedido.
- **L–M:** L define estados e direitos versionados mas não libera paid. M só mock validado, idempotente, sujeito tipado; nenhum checkout real ou serviço externo.
- **K/Q:** chave delivery contextual não nula; opt-out/consentimento revalidado; enviar somente Mailpit local/adapter mock quando autorizado.
- **O:** `PartnerSubmission` passa por `PartnerModerationDecision` e só depois gera candidato editorial D; aceitar parceiro não publica.

**Divisões para deliberação, sem execução antecipada:** D1 entidades/revisões, D2 CRUD, D3 revisão/publicação/auditoria; M1 planos/eventos simulados, M2 checkout/conciliador; N1 membros/papéis, N2 operação de assessoria; T1 isolamento instituição/formulários, T2 submissões; U1 avaliação, U2 decisões/recursos/pós-seleção. Cada subgate preserva testes do bloco original e aprovação humana.

**Bloqueio principal:** nenhuma etapa posterior pode começar apenas porque o documento cita `PROPOSTA`. A classificação de gates é planejamento, nunca autorização. Bloco A permanece não iniciado.

### R2 — IDs de testes (R2)

**Nota normativa R2 (IDs):** Todas as menções a `EDT-*`, `TIM-*`, `AUTH-*`, `SRC-*`, `DED-*`, `ENT-*`, `BIL-*`, `PERF-*`, `PRIV-*`, `LOG-*` são referências; a definição de teste, suas fixtures e seu oráculo estão exclusivamente em `11-TESTES-E-GATES.md` §R2. Ocorrências antigas não prevalecem sobre o catálogo.

## R2 — Gates de checagem diária e métrica de listagem (R1-01/R1-05)

- **Bloco D (D-11):** confirmar contrato `F(d)`/`E(d)`, responsáveis e regime de plantão; implementar registros atômicos de evidência por fonte e edital; não declarar checagem diária por page view da fonte. **Bloco F/Gate MVP1:** demonstrar dia `source_coverage=100%`, `edital_coverage<100%` e reprovação objetiva; proteger transparência de frescor ao visitante. **Bloco R:** futura ingestão assistida não altera denominador nem substitui validação humana de alterações críticas.
- **Bloco E (RNF01/PERF-01):** ratificar métrica funcional `catalog_ready`, oráculo de IDs/ordenação e hardware/cenários antes do benchmark; sob linhas após 3s, reprovar mesmo com LCP baixo. **Bloco V:** repetir em ambiente local de referência documentado. RNF02 de 99,5% continua exclusivamente verificável em produção. Nenhum gate foi aprovado nesta correção.

## R2 — Dataset inequívoco Gate MVP 1 (R1-03)

O Gate após F usa `E1..E10` como **dez editais distintos**, E1–E8 publicados, E9–E10 rascunhos; `E8/v2` rejeitada é revisão, não 11.º edital. A matriz completa `Fixture → revisão → teste → oráculo`, relógio-base e transições em `corretivos/bloco-0/R2/03-FIXTURES-MVP1.md`. A autorização de teste/execução só acontece em D–F e gate explícito, não nesta etapa.
