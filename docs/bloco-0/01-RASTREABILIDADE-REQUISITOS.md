# 01 — Rastreabilidade de requisitos

> **Documento de proposta para auditoria, versão 0.3-R2 · 26/10/2026.** Apenas o Bloco 0. As seções marcadas **PROPOSTA**, **PREMISSA** e **DECISÃO PENDENTE** não constituem autorização de implementação, contrato congelado ou política comercial aprovada.

**Registro histórico R1 (não normativo onde substituído por R2):** versão derivada do pacote v0.1, corrigida sob AUD-01–AUD-15. Todas as definições de R1 são **PROPOSTAS CONDICIONAIS**, não decisões aprovadas; a matriz D-01–D-28 em `03-DECISOES-E-CONFLITOS.md` prevalece como índice de gates. Nenhuma migração, implementação ou aceite foi executado. **Se houver divergência de testes, prevalece exclusivamente o catálogo R2 em `11-TESTES-E-GATES.md`.**

**Convenção de rastreabilidade:** `ORIGINAL` = conteúdo sustentado pelos anexos primários; `PROPOSTA` = desenho técnico; `PREMISSA` = hipótese; `DECISÃO PENDENTE` = aprovação requerida; `CONFLITO` = tensão entre fontes/planos. Referências: `REQ` (DOCX, página/seção), `ID` (PDF, página), `P02` e `P01` (planos mestres, seção).

## 1. Fonte e regras de leitura

`REQ`, setembro/2026, 4 páginas, é a autoridade sobre funcionalidades, RNFs, preços de referência e fases originais. `P02`, seções 3A, 4, 7A e 9, operacionaliza em 23 blocos, sem sobrescrever a origem. `ID` governa apenas marca. Cada requisito tem vínculo a uma evidência **futura**, não executada neste Bloco 0.

## 2. Matriz funcional completa (original)

| ID | Exigência ORIGINAL e fonte | Bloco(s) | Critério de verificação proposto | Risco / decisão |
|---|---|---|---|---|
| RF01 | Filtros combináveis setor, estágio, recurso, região, status — REQ p.2 §5; lista REQ p.1 §4.1 | D,E | E2E interseção ≥2 filtros; conjunto vazio, paginação e limpeza de filtros sem vazamento | Taxonomias, status de prazo D-05 |
| RF02 | Busca por título ou instituição — REQ p.2 §5 | E | Busca nos dois campos, acentos, caixa, termo inexistente e paginação determinística | Normalização linguística D-10 |
| RF03 | Detalhe com ficha, cronograma e documentos — REQ p.2 §5 e §4.2 | D,F | Ficha renderizada de registro persistido; prazo, documentos, ausências e origem | Campos de fonte e prazo D-04/05 |
| RF04 | Salvar/remover em **lista pessoal** após autenticar — REQ p.2 §5 | G,H | Mesmo usuário salva/remove; usuário distinto não vê dados; teste do teto de 3 | Escopo pessoal × empresa D-02 |
| RF05 | Checkout cartão, Pix ou boleto — REQ p.2 §5; §4.4 | L,M | Fluxo com meios fictícios e falha simulada, zero transação real | Recorrência por meio D-15 |
| RF06 | Confirmar pagamento e liberar recursos — REQ p.2 §5 | L,M | Falha, evento fraudado/replay, confirmação verificada, concessão exatamente uma vez | Estado do pagamento D-15 |
| RF07 | Recomendações por setor e estágio da empresa — REQ p.2 §5 | G,I | Match determinístico explicável, ausentes e isolamento de contexto | Critério indicativo D-17 |
| RF08 | Upgrade/downgrade/cancelar e histórico — REQ p.2 §5 | L,M | Estados, efeitos e histórico auditável, sem editar passado | Prorrata, ciclos e downgrade D-16 |
| RF09 | Preferências semanal, imediata e prazo — REQ p.2 §5 | K,Q | Consentimento, opt-out, sem duplicidade, sem envio real | Canais/frequência D-18 |
| RF10 | Parceiros submetem e equipe modera — REQ p.2 §5 | O | Parceiro não publica; aceita/rejeita com auditoria; isolamento | Cadastro instituição D-19 |

**Cobertura:** 10/10 RF descritos e associados a cenários conceituais; 0/10 executados ou auditados independentemente.

## 3. Matriz não funcional (original)

| ID proposto | Exigência ORIGINAL / fonte | Gate proposto | Medição objetiva / limitação |
|---|---|---|---|
| RNF01 | Até 2 s para listagem com até 5.000 editais ativos — REQ p.2 §6 | E e V | Benchmark local: hardware, dataset, percentis, cache, warm/cold, query plans; orçamento de medição a aprovar; não SLA público |
| RNF02 | Site público com disponibilidade mínima de 99,5% — REQ p.2 §6 | Pós-V | **NÃO VERIFICÁVEL localmente**; requer contrato SLI/SLO e observação contínua em produção |
| RNF03 | Cartão via gateway PCI-DSS, sem armazenar dados de cartão — REQ p.3 §6 | M e pós-V | M: dados fictícios e zero PAN/CVV em logs/persistência; gateway real fora do escopo |
| RNF04 | LGPD sobre dados cadastrais — REQ p.3 §6 | G e V | Data mapping, solicitações e controles locais; conformidade jurídica NÃO certificada |
| RNF05 | Paridade essencial desktop/mobile — REQ p.3 §6 | B,F,V | E2E móvel/desktop e acessibilidade proposta WCAG 2.2 AA (não consta na fonte) |
| RNF06 | Nova checagem das fontes ≥1 vez por dia — REQ p.3 §6 | D,F,R | Log de verificação manual por dia no MVP; automação somente R; cobertura real diária não presumida |

## 4. Outros requisitos fora RF01–RF10 (não omitir)

| Código de rastreio | Evidência ORIGINAL | Blocos | Observações |
|---|---|---|---|
| UX01 | Lista, **não cartões**; instituição, tags, valor, prazo/colorização e status — REQ p.1 §4.1 | B,E | A cor nunca será a única indicação de urgência |
| UX02 | Ordenação prazo/valor/nome e botão estrela — REQ p.1 §4.1 | E,H | No MVP visitante vê CTA salvar com encaminhamento honesto quando indisponível; não simular gravação |
| UX03 | Contador próximo, relacionados e CTA oficial — REQ p.2 §4.2 | F | Ausências explicitadas; nenhuma inscrição interna no MVP |
| CLI01 | Visão geral com salvos, prazos próximos, compatibilidade média — REQ p.2 §4.5 | G–I | Compatibilidade indicativa, não decisão jurídica |
| CLI02 | Dados da empresa, assinatura, alertas inclusive WhatsApp — REQ p.2 §4.5 | G,L,Q | Canal WhatsApp apenas Q, simulador local |
| MON01 | Três preços/benefícios originais e receitas futuras — REQ p.3 §7 | H–O, futuro | Cobrança real fora do escopo local |
| FLO01 | Jornada visitante → salvar → limite → planos → checkout → cliente — REQ p.3 §8 | E–M | Cada etapa liberada em seu bloco |
| RMAP01 | Sete fases incrementais; primeira manual — REQ p.3–4 §9 | A–U | Desdobramento em 23 blocos é PROPOSTA P02 §4 |
| FUT01 | Aplicativo mobile nativo e assinatura eletrônica **além da fase 7** — REQ p.4 §10 | Backlog pós-V | Não inserir em A–V silenciosamente |

## 5. Personas (ORIGINAL, REQ p.1 §3)

| Persona | Necessidade | Fluxo prioritário | Fase |
|---|---|---|---|
| Fundador de startup | Encontrar oportunidade, checar elegibilidade e prazo | Pesquisa → filtro → detalhe → site oficial | MVP; salvos depois |
| Gestor de inovação PME | Comparar recurso reembolsável/não reembolsável e documentos | Lista → ficha → comparações manuais → checklist | MVP e J |
| Consultor/assessoria | Múltiplos clientes e prazos sem mistura | Seleciona organização → favoritos/contexto → calendário | G,N; acesso isolado |
| Instituição fomentadora | Divulgar chamadas a públicos adequados | Submete edital → equipe modera → catálogo | O; gestão B2B T,U |

## 6. Lacunas priorizadas / anti-inferência

- **CONFLITO C-01:** RF04 requer lista *pessoal*; P02 propõe dados por organização. Não converter silenciosamente favoritos em compartilhados.
- **CONFLITO C-02:** checagem diária (§2, §6) × MVP manual (§9). Exige rotina demonstrável e explicitar risco de frescor; cron não autorizado.
- **CONFLITO C-03:** REQ §4.5 cita WhatsApp, mas fase 5 o reserva para depois; não mostrar como ativo no MVP.
- **DECISÃO PENDENTE:** critérios de urgência, fontes e URL, status suspenso/prorrogado, taxonomias, casos sem prazo, timezone, compatibilidade, planos humanos, política de exclusão.
- **NÃO ESPECIFICADO NO ORIGINAL:** IDs UUID, ORM, algoritmo de score, SLA de revisão, período de retenção, cotas por empresa, separação obrigatória de criador/aprovador, testes WCAG e arquitetura de jobs.

## 7. Matriz mínima de rastreabilidade cruzada

RF01–03 → `05` estados e `07` modelo de dados → `06` catálogo/fonte → `08` telas → `11` testes. RF04/07 → `04` autorização + `07` dono dos dados → `09` entitlements. RF05/06/08 → `09` estados + `10` fraude → `11` testes. RF09 → `06` notificação + `09` planos + `10` consentimento. RF10 → `05` editorial + `04` parceiros + `06` moderação. RNFs → `10` riscos + `11` gates.

## R1 — Rastreabilidade pós-auditoria (evidências futuras, não testes executados)

| Requisito | Ajuste obrigatório da especificação | Contrato/entidade/fluxo | Casos operacionais | Gate final |
|---|---|---|---|---|
| RF01/02/03 | lista e detalhe somente snapshot publicado, status temporal derivado e frescor separado | CAT `getPublishedSnapshot`, EditalRevision, 05/07/08 | EDT-04/07, TIM-06/07, RF01/02 | D–F |
| RF04 | dono privado `User` mesmo em organização; cota por escopo de benefício sob D-02/26 | FAV+ENT `effectiveEntitlement`, SavedEdital | ENT-01..03, AUTH-02/03 | H; antecipar em A só se migration |
| RF05/06/08 | política FREE H, estados comerciais L, benefício pago validado somente M | BillingSubject, Subscription, BillingEvent; 09 | BIL-01..10, ENT-03 | L/M |
| RF07 | depender de perfil `CompanyProfile` autorizado, campos do snapshot público, nunca alterar fonte | REC, ORG/CAT | RF07, AUTH-01 | I |
| RF09 | chave delivery por usuário+contexto tipado+evento+versão+canal+janela | NTF, NotificationDelivery, 06/07/10 | NTF-01..06 | K/Q |
| RF10 | separar moderação de parceiro e revisão interna; parceiro não é publicador | PartnerModerationDecision × RevisionReviewDecision | MOD-01..03, AUTH-10 | O; revisão editorial D |
| RNF01 | métrica proposta LCP P95 em 30 amostras por cenário, hardware a ratificar | 11 §PERF-01 | PERF-01 | E/V |
| RNF02 | disponibilidade 99,5% exclusivamente produção | 10 / plano pós-V | RNF02 (não medido) | pós-V |
| RNF03/04 | sem PAN/CVV; tratamento de PII com retenção pendente | BILL/IAM/AuditEvent | BIL-09, PRIV-01.. | M/V, produção para certificação |
| RNF05 | paridade essencial mobile e desktop com testes acessíveis | 08 UX | UX-R1-01..06 | B/F/V |
| RNF06 | operação manual diária com tentativa distinta de verificação válida, cobertura por dia | SRC/SourceCheck, 05 §R1 | SRC-01..07 e semana simulada | D–F |

**Semântica original preservada:** quatro personas (REQ p.1 §3), dez RF (REQ p.2 §5), seis RNFs (REQ p.2–3 §6), sete fases (REQ p.3–4 §9), aplicativo nativo e assinatura eletrônica pós-fase 7, identidade visual do ID p.2–13. `AUTH-11` agora especificado em `04/11`, `PERF-01` em `11`, `ENT-01..03` em `09/11`; IDs não significam `PASS`. D-02/D-26, D-11 e demais decisões continuam pendentes segundo matriz única de `03`.

### R2 — IDs de testes (R2)

**Nota normativa R2 (IDs):** Todas as menções a `EDT-*`, `TIM-*`, `AUTH-*`, `SRC-*`, `DED-*`, `ENT-*`, `BIL-*`, `PERF-*`, `PRIV-*`, `LOG-*` são referências; a definição de teste, suas fixtures e seu oráculo estão exclusivamente em `11-TESTES-E-GATES.md` §R2. Ocorrências antigas não prevalecem sobre o catálogo.

## R2 — RNF01 e RNF06 com oráculos verificáveis (R1-01/R1-05)

**RNF01:** teste `PERF-01` em `11` §R2 mede `catalog_ready` (linhas corretas e interativas); P95 ≤2s por cenário é proposta a ratificar antes E, não requisito de LCP. Cabeçalho/LCP a 700ms e lista a 3000ms = FAIL. **RNF06:** separar `source_coverage(d)` e `edital_coverage(d)` conforme `05` §R2, com verificação por `Edital.id`; PASS somente 100% nos dois universos com evidência. Resultado da simulação em `corretivos/bloco-0/R2/04-MATRIZ-RNF06.md`, não prova de operação real.
