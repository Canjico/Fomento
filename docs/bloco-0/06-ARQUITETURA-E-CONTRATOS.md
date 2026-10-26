# 06 — Arquitetura proposta e contratos dos módulos

> **Documento de proposta para auditoria, versão 0.3-R2 · 26/10/2026.** Apenas o Bloco 0. As seções marcadas **PROPOSTA**, **PREMISSA** e **DECISÃO PENDENTE** não constituem autorização de implementação, contrato congelado ou política comercial aprovada.

**Registro histórico R1 (não normativo onde substituído por R2):** versão derivada do pacote v0.1, corrigida sob AUD-01–AUD-15. Todas as definições de R1 são **PROPOSTAS CONDICIONAIS**, não decisões aprovadas; a matriz D-01–D-28 em `03-DECISOES-E-CONFLITOS.md` prevalece como índice de gates. Nenhuma migração, implementação ou aceite foi executado. **Se houver divergência de testes, prevalece exclusivamente o catálogo R2 em `11-TESTES-E-GATES.md`.**

**Convenção de rastreabilidade:** `ORIGINAL` = conteúdo sustentado pelos anexos primários; `PROPOSTA` = desenho técnico; `PREMISSA` = hipótese; `DECISÃO PENDENTE` = aprovação requerida; `CONFLITO` = tensão entre fontes/planos. Referências: `REQ` (DOCX, página/seção), `ID` (PDF, página), `P02` e `P01` (planos mestres, seção).

## 1. Arquitetura proposta — não congelada

**PROPOSTA (P02 §3 e §3A A04):** monólito modular web Next.js+TypeScript, camadas `domain` (regras), `application` (casos de uso), `ports` (dependências abstratas), `adapters` (persistence/notifications), `presentation` (HTTP/UI). PostgreSQL no futuro, aplicação e captura de e-mails **somente localmente**. Tailwind, Vitest, Playwright sugeridos; selecionar ORM e biblioteca UI no Bloco 0/aceite A. Não iniciar infraestrutura neste pacote.

```text
Visitante ─┐
Cliente ───┼── UI pública / cliente ──┐
Operador ──┘                         ├── authn/contexto/validação server-side
Parceiro (O) ─ UI moderação ────────┘               │
                 ┌──────── Application contracts/ports ─────────┐
                 Catálogo ↔ Fontes; Organizações → Acesso
                 Favoritos → Catálogo; Recomendações → Perfil
                 Entitlements ← Assinaturas ← BillingEvents
                 Notificações ← Eventos autorizados
                 Editorial/Moderação → Catálogo/revisões
                 CMS | Ingestão | API | B2B (somente futuros)
                 └─────────────────────┬────────────────────────┘
                        Persistência SQL futura / adapters simulados
```

Setas representam dependências **lógicas** e não importações permissivas. Dependência circular direta é proibida. Database compartilhado fisicamente pode ser usado; cada módulo tem tabelas sob autoridade própria e acessos intermodulares via operações estáveis.

## 2. Padrão de contrato conceitual

Todo comando futuro expõe `actorContext` (user, org validado, roles, correlationId), `requestId` para mutações reexecutáveis, `input` validado e `expectedVersion` quando concorre. Retorno: `result` tipado (`resourceId`, `version`, fatos mínimos) ou erro sem detalhes sensíveis. Erros semânticos: `UNAUTHENTICATED`, `FORBIDDEN/NOT_FOUND`, `VALIDATION`, `CONFLICT`, `RATE_LIMIT`, `DEPENDENCY_UNAVAILABLE`, `INVARIANT_VIOLATION`; mapear para HTTP apenas no adapter. Sem efeito colateral escondido em leitura. Eventos assíncronos futuros incluem id/version/occurredAt/correlationId e consumer idempotente.

## 3. Matriz de contratos — responsabilidades, authority e dependências

| Módulo | Fonte de autoridade | Comandos/queries propostos | Usa (permitido) | Proibido |
|---|---|---|---|---|
| CAT Catálogo | Edital, revisões e snapshot público imutável, prazos editoriais versionados, classificações | `createDraft`, `submitRevision`, `publishApproved`, `searchPublished`, `getPublicDetail`, `archive` | FON, ACESSO em mutação | ler tabelas de billing, publicar import automaticamente |
| FON Fontes/proveniência | Institution, Source, checks, canonical refs | `registerSource`, `recordCheck`, `resolveOfficialLink`, `flagDivergence` | ACESSO, CAT via contrato de referência | marcar edital publicado por checagem isolada |
| IAM Identidade/autenticação | User, credenciais e sessões | `authenticate`, `revokeSession`, `getActor` | nenhuma privada sem contrato | conceder membership ou plano sozinho |
| ORG Organizações/permissões | Organization, Membership, invite, role | `authorize`, `switchContext`, `invite`, `revokeMembership`, `getScope` | IAM identidade | elevar papel por body/cookie |
| FAV Favoritos | SavedEdital e dono por D-02 | `save`, `remove`, `listMine` | CAT publicação, ORG contexto, ENT limites | listar favoritos alheios |
| REC Compatibilidade | perfil versão + avaliações de match | `evaluate`, `explain`, `listRecommended` | CAT campos públicos, ORG perfil | alegar elegibilidade oficial |
| ENT Política de acesso (H) / Planos e assinaturas (L) | Política FREE versionada em H; Plan, Entitlement, Subscription só em L | `effectiveEntitlement`, `planChangeRequest`, `cancel` | ORG contexto; BILL eventos confirmados só em M | conceder paid por escolha/UI, marcar pagamento confirmado |
| BILL Cobrança | PaymentAttempt, BillingEvent, Coupon | `simulateCheckout`, `verifyEvent`, `applyLedger` | ENT contrato de intenção; ORG titular | armazenar PAN/CVV ou chamar gateway real local |
| NTF Notificações | preferências, consentimentos, delivery receipts com contexto tipado | `optIn`, `optOut`, `scheduleDigest`, `recordDelivery` | IAM, ORG, CAT eventos, ENT acesso | mandar e-mail/WhatsApp real local |
| ADM Editorial/moderação | pedidos de revisão/decisões/moderação | `assignReview`, `approve`, `reject`, `queuePartnerSubmission` | CAT revisions, IAM/ORG autorização | sobrescrever revisão pública via bypass |
| CMS Conteúdo | BlogPost, categorias e publicação | `createPost`, `publishPost`, `searchPosts` | IAM/ADM papéis | modificar editais |
| ING Ingestão | import runs, candidate, dedup decisions | `ingestCandidate`, `compare`, `submitForReview` | FON, CAT leitura, ADM fila | autoalterar published |
| API Busca | ApiClient, quotas, policy de exposição | `searchPublic`, `verifyClient`, `enforceLimits` | CAT search, IAM conforme tipo | expor dados empresariais sem autorização |
| B2B Gestão | ManagedCall, FormVersion, Application, Evaluation etc | `publishManaged`, `submitApplication`, `assignReview`, `decide`, `appeal` | ORG contexto, IAM, eventuais refs CAT | unir identidade B2B com catálogo automaticamente |

`ACESSO` = política IAM+ORG; `ENT` = entitlement; nomes são linguagem de domínio conceitual, **não** interfaces TypeScript geradas.

## 4. Eventos, invariantes, falhas, mitigação por módulo

| Módulo | Evento(s) previsto(s) | Invariante e segurança | Erros e tratamento |
|---|---|---|---|
| CAT | `EditalPublished(v)`, `EditalRectified(v)`, `EditalArchived` | só versão aprovada publicável; públicas nunca incluem drafts | `VERSION_CONFLICT` recarregar; invalidação de cache escopada |
| FON | `SourceChecked`, `SourceUnreachable`, `SourceChanged` | evidência temporal sem falsificar fonte | falha externa apenas marca indisponível, não excluir edital |
| IAM | `SessionRevoked`, `CredentialChanged` | sessão íntegra/expirável | falha genérica em login; rate limit posterior |
| ORG | `MembershipGranted/Revoked`, `OrgContextChanged` | membership requerido no commit | `FORBIDDEN` sem informação do tenant |
| FAV | `EditalSaved/Removed` | unicidade por dono+edital+contexto definido | conflito de cota transacional; replay idempotente |
| REC | `CompatibilityEvaluated` | explicação+versão do perfil e edital | ausentes→desconhecido, não elegível falsa |
| ENT | `FreePolicyResolved`, `SubscriptionChanged`, `EntitlementGranted/Revoked` | FREE 3 definido em H; benefício **pago** só após evento billing legitimado em M | inconsistência: falha fechada para paid/quarentena |
| BILL | `PaymentEventReceived/Accepted/Rejected` | replay única vez; nunca liberar por client redirect | assinatura inválida/eventId repetido → ignorar, auditar |
| NTF | `PreferenceChanged`, `NotificationQueued/Suppressed` | consentimento e canal habilitado | repetição/opt-out bloqueia envio; retry limitado |
| ADM | `ReviewApproved/Rejected`, `ModerationDecided` | separação de responsabilidades D-07 | revisão já aplicada→409 |
| CMS | `PostPublished/Unpublished` | rascunho não público | slug duplicado→conflito |
| ING | `CandidateImported`, `DuplicateFlagged` | sem autopublicação | URL inválida→fila revisão |
| API | `QuotaExceeded`, `ClientRevoked` | dados públicos ou policy explícita | 429, logging sem PII excessiva |
| B2B | `ApplicationSubmitted`, `DecisionIssued`, `AppealFiled` | versão imutável de formulário por submissão | cross-tenant, alteração pós-prazo→nega |

## 5. Fronteiras críticas e versionamento

- `CAT` não conhece preço nem CNPJ; `FAV` consulta entitlement por contrato, não por JOIN nas tabelas BILL.
- `ADM` solicita a publicação a CAT, mas CAT reforça invariantes; UI não é fronteira de segurança.
- `ING` produz **candidatos**, não edita diretamente `Edital` publicado; deduplicação precisa de aprovação.
- `REC` usa snapshot/versionamento para resultados reproduzíveis; não expõe perfis de outras organizações.
- `BILL` recebe somente eventos simulados autenticados pelo test harness local; “gateway” real isolado em adapter futuro.
- Evolução: contratos semânticos versionados, alterações breaking exigem plano de compatibilidade, migração futura e teste cruzado; schema de dados não é API pública. Eventos com `schema_version`, handlers tolerantes a campos opcionais e idempotência.
- Observabilidade: logs estruturados por request/correlation, métricas de falha e trilha auditável, sanitização de PII e credenciais; implementação apenas a partir dos blocos autorizados.

## 6. Escolhas e alternativas não decididas

Next.js monólito vs app/backend separado; Prisma vs Drizzle vs outro ORM; sessão via cookies HttpOnly/SameSite vs providers; componentes acessíveis; modelo de job/outbox; escalabilidade do PostgreSQL full-text. Critérios: manutenção/curva, query performance com 5.000 editais, segurança de authz, testes DB real local, licenças e risco operacional. Nada foi instalado ou validado neste pacote. Decisões D-01/D-08 e dependentes.

## R1 — AUD-01/03/04/10/11/14: contratos de fronteira corrigidos

### CAT × ADM × SRC — domínio editorial versionado

- `CAT` **único dono** de `Edital`, `EditalRevision`, snapshot e ponteiro `published_revision_id`; `ADM` decide o workflow por `RevisionReviewDecision` e aciona `CAT.publishApprovedRevision` com autorização e `expectedVersion`; não atualiza tabela CAT diretamente.
- `SRC` **único dono** de `SourceCheck`, check operacional e evidência de proveniência; `SRC` pode emitir `SourceChangedCandidate`, mas **não altera** snapshot CAT; CAT cria `EditalRevision` candidata somente via caso de uso autorizado. `ING` mais tarde repete esse caminho, sem bypass.
- Porta `CAT.getPublishedSnapshot(editalId, at)` entrega `{revisionId, digest, payload_public,verification_metadata}`; a lista e o detalhe devem ver **mesma revisionId**. Publicação atômica e evento outbox conceitual no mesmo commit; falha de projeção não permite exposição de rascunho.

### FAV × ENT × BILL/ORG/IAM — autoridade e dependência H→L→M

- `FAV` possui `SavedEdital` **pessoal** e executa `save(actor,context,edital,expectedPolicyVersion,requestId)`; não consulta nem altera `Subscription` diretamente. `ENT` é **dono da decisão de capacidade comercial**, mas não concede papel nem autentica. `IAM/ORG` são donos da identidade/membership; `BILL` é único dono de confirmação financeira simulada futura.
- **H:** porta `effectiveEntitlement` com política `FREE v1` local **autorizada somente após gate H**; nenhuma subscription ou módulo BILL necessário. `FAV` aplica limite `3` sob atomicidade e unicidade. **L:** ENT passa a interpretar definições versionadas/assinaturas apenas como estados; o contrato da porta mantém semântica; paid segue DENY. **M:** somente `BillingEventVerified` do simulador validado, vinculado ao titular e tentativa, permite concessão `paid`, com replay idempotente. Nada pago durante H/L.
- Sujeito de direitos `BillingSubject(type,id)` explicitamente tipado ou org-only, dependendo de D-26; recomendação condicional `type=PERSONAL|ORGANIZATION` com exatamente um dono efetivo e inexistência de assinatura órfã. Toda resolução exige vínculo `subject_id`/`context` exatos, sem cruzar org A→B.
- `FAV` não pode manter o retorno de entitlement em cache sem `actor/context/feature/version`; membership é revalidado no commit da escrita. Mudança de plano/revogação invalida decisões cacheadas; downgrade não deleta histórico pessoal arbitrariamente.

### NTF (K/Q) — idempotência contextual de entrega

- Porta `NTF.queueNotification(recipientUserId, context=personal|organization, purpose, channel, eventId, eventVersion, windowId, preferenceVersion)` calcula `delivery_identity=(recipient,normalized_context_key,purpose,channel,event_id,event_version,window_id)` com **contexto não nulo tipado**. `personal:userId` difere de `org:orgId`; evitar SQL UNIQUE nulo. `windowId` é obrigatório para resumos periódicos e fixo/não vazio para evento unitário (`once`).
- Exemplo: consultor U em A e B vê mesmo `eventId` de prazo; entrega A e entrega B **distintas** se autorizadas e consentidas; retry de A com mesma chave é `duplicate_suppressed`, sem impedir B. Revogação/opt-out → suprimir envio e registrar causa; novo consentimento não autoriza replay histórico automaticamente. Mudança de preferências antes de envio exige rechecagem, nenhuma notificação real no R1.

### ADM — decisões editoriais separadas da moderação

- `RevisionReviewDecision(revision_id,reviewer_id,action,reason,at,version)` pertence ao fluxo interno D; `PartnerModerationDecision(partner_submission_id,moderator_id,action,reason,at)` pertence ao fluxo O e jamais aponta diretamente para `published_revision_id`. Aprovar submissão de parceiro cria **candidato editorial**, sujeito a aprovação e publicação interna com permissions distintas.
- Falhas: `409` revisão obsoleta, `FORBIDDEN` parceiro chamando publicação, `UNAVAILABLE` fonte externa; registrar `AuditEvent` sanitizado e correlação. Nenhuma FK polimórfica sem discriminador.

### Protocolo de evolução de portas

Cada porta especifica `actor/context`, `version`, `policy`, `idempotency_key`, `correlation_id`, enum de falhas e permissões. Evitar chamadas cíclicas: `IAM/ORG → ENT` **não**; `ENT → ORG` para validar escopo através de porta de autorização, `FAV → ENT`, `ENT` nunca chama `FAV` para conceder, `BILL → ENT` somente publica evento confirmado, `ADM → CAT` para comando autorizado, `CAT → SRC` somente leitura de proveniência ou materialização de metadados. Outbox/inbox é conceito futuro, não job instalado. Contratos R1 exigem testes `AUTH-01/03`, `FAV-01..05`, `ENT-01..03`, `BIL-01..05`, `EDT-04/07`, `NTF-01..06`, `MOD-01..03`.

### R2 — IDs de testes (R2)

**Nota normativa R2 (IDs):** Todas as menções a `EDT-*`, `TIM-*`, `AUTH-*`, `SRC-*`, `DED-*`, `ENT-*`, `BIL-*`, `PERF-*`, `PRIV-*`, `LOG-*` são referências; a definição de teste, suas fixtures e seu oráculo estão exclusivamente em `11-TESTES-E-GATES.md` §R2. Ocorrências antigas não prevalecem sobre o catálogo.
