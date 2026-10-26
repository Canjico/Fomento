# 07 — Modelo de dados conceitual e lógico

> **Documento de proposta para auditoria, versão 0.3-R2 · 26/10/2026.** Apenas o Bloco 0. As seções marcadas **PROPOSTA**, **PREMISSA** e **DECISÃO PENDENTE** não constituem autorização de implementação, contrato congelado ou política comercial aprovada.

**Registro histórico R1 (não normativo onde substituído por R2):** versão derivada do pacote v0.1, corrigida sob AUD-01–AUD-15. Todas as definições de R1 são **PROPOSTAS CONDICIONAIS**, não decisões aprovadas; a matriz D-01–D-28 em `03-DECISOES-E-CONFLITOS.md` prevalece como índice de gates. Nenhuma migração, implementação ou aceite foi executado. **Se houver divergência de testes, prevalece exclusivamente o catálogo R2 em `11-TESTES-E-GATES.md`.**

**Convenção de rastreabilidade:** `ORIGINAL` = conteúdo sustentado pelos anexos primários; `PROPOSTA` = desenho técnico; `PREMISSA` = hipótese; `DECISÃO PENDENTE` = aprovação requerida; `CONFLITO` = tensão entre fontes/planos. Referências: `REQ` (DOCX, página/seção), `ID` (PDF, página), `P02` e `P01` (planos mestres, seção).

Sem SQL, migration, schema de ORM ou tabelas efetivamente criadas. Os atributos representam **campos de domínio candidatos**, não DDL aprovada.

## 1. Separação de domínios e classificação

- **GLOBAL/PÚBLICO:** catálogo publicado, instituições fonte, taxonomias setoriais, tipos de recurso, regiões, links e checagens publicamente exibíveis.
- **GLOBAL/RESTRITO:** revisões internas, auditoria administrativa, contas/sessões, moderação, billing operacional, logs.
- **ORGANIZACIONAL:** organização, membership, perfil, checklists, calendário, assinaturas e pedidos de assessoria (conforme decisão).
- **PESSOAL:** nome e contato de pessoa, credencial, preferências específicas e favoritos **pessoais** conforme RF04 e D-02; dados que recebem contexto de empresa continuam protegidos por ambas as fronteiras.
- **B2B FUTURO:** instituição tenant própria, editais geridos, inscrições e avaliação sem presumir que são a mesma entidade `Edital` agregado.

## 2. ERD textual / cardinalidades propostas

```text
User 1 ─< Membership >─ 1 Organization ─ 1 CompanyProfile
User 1 ─< Session                  BillingSubject 1 ─< Subscription
User 1 ─< SavedEdital >─ 1 Edital    Organization 1 ─< CalendarItem/Checklist
Institution 1 ─< Source ─< SourceCheck
Institution 1 ─< Edital ─< EditalRevision
EditalRevision 1 ─< VersionedDeadline / VersionedDocumentRequirement / VersionedAttachment / VersionedSourceReference
EditalRevision N ─< RevisionSector >─ N Sector
EditalRevision N ─< RevisionStage >─ N Stage
EditalRevision N ─< RevisionRegion >─ N Region
Plan 1 ─< EntitlementDefinition; Subscription N ─ 1 Plan
Subscription 1 ─< BillingEvent / PaymentAttempt
EditalRevision 1 ─< RevisionReviewDecision; PartnerSubmission 1 ─< PartnerModerationDecision; User 1 ─< AuditEvent
ImportRun 1 ─< ImportCandidate ── optional link ── Edital
ManagedCall 1 ─< FormVersion 1 ─< FormField; ManagedCall 1 ─< Application
Application 1 ─< ApplicationAnswer/Evaluation/Appeal
```

N:N e 1:N são conceitos; `1` em algumas relações pode se tornar `0..1` por ciclo de vida e depende da confirmação de D-02/24.

## 3. Inventário lógico com chaves e integridade

| Entidade [escopo] | Identidade, chaves e atributos candidatos | Relações / restrições |
|---|---|---|
| `Institution` [G] | `id` PK; `display_name`, `legal_name?`, `official_website?`, `kind`, `active` | 1:N `Source/Edital`; parceiro publicador futuro distinto de fonte editorial |
| `Source` [G] | PK; `institution_id` FK, `uri`, `source_kind`, `canonical_uri?`, `registered_at` | URI controlada, não usar URL isolada como identidade; evitar SSRF futuro |
| `SourceCheck` [G/R] | PK, `source_id`, `edital_id?`, `checked_at`, `checker`, `result`, `evidence_ref?`, `reason` | append-only, timestamp e resultado explícitos; sem alterar versão por si só |
| `Edital` [G] | PK UUID candidato, `institution_id`, `canonical_key?`, `canonical_slug?`, `editorial_state`, `published_revision_id?`, `version` | Identidade canônica e ponteiro público; **título/valor/prazo/tags somente em EditalRevision snapshot**; slug editorial no snapshot; não mesclar automaticamente |
| `EditalRevision` [R] | PK; `edital_id`, `revision_number`, `parent_revision_id?`, `snapshot`, `diff`, `author_id`, `reason`, `created_at`, `review_outcome?`, `correlation_id` | único `(edital_id, revision_number)`; insert-only; snapshots redigidos conforme LGPD |
| `VersionedDeadline` [G/R] | PK, `revision_id` FK, `kind`, `starts_at?`, `ends_at?`, `source_tz`, `date_only`, `status_event?` | Derivado apenas de snapshot aprovado; coerência start<=end quando ambos conhecidos; jamais alterar prazo público por draft |
| `VersionedDocumentRequirement` [G/R] | PK, `revision_id` FK, `label`, `required`, `description?`, `order` | Documento exigido é parte do snapshot; não é arquivo privado enviado pelo usuário |
| `VersionedAttachment` [G/R] | PK, `revision_id` FK, `filename`, `media_type`, `source_uri/ref`, `checksum?`, `visibility` | referência pública versionada; acesso seguro e sem download automático inseguro |
| `VersionedSourceReference` [G/R] | PK, `revision_id` FK, `source_id`, `official_identifier?`, `uri`, `valid_from/to` | referência oficial presente no snapshot; revisão nova para mudar URL publicável; SourceCheck separado |
| `TaxonomySector/Stage/ResourceType/Region` [G] | PK estável, `code`, `name`, `aliases`, `active`, `version` | códigos independentes do texto; **EditalRevision** N:N com taxonomias via RevisionSector/Stage/Region, campos pesquisáveis pinados à revisão |
| `User` [P/R] | PK; `display_name`, `email_normalized`, `created_at`, `status`, `deleted_at?` | email normalizado único conforme política, pseudonimização possível |
| `Session` [P/R] | PK, `user_id`, `token_digest`, `issued/expires/revoked_at`, `context_org_id?` | expiração/revogação, nunca salvar token em claro |
| `Organization` [O] | PK, `display_name`, `legal_name?`, `cnpj?`, `status`, `created_at` | CNPJ, se exigido no checkout, validar e proteger; unicidade a deliberar |
| `Membership` [O/R] | PK, `user_id`, `organization_id`, `role`, `status`, `valid_from/to`, `invited_by?` | índice composto; não duplicar membership ativa; proibir último owner sem substituto |
| `Invitation` [O/P] | PK, `organization_id`, `email`, `role`, `token_digest`, `expires_at`, `accepted_at?` | token consumo único, limite membros por assinatura |
| `CompanyProfile` [O] | PK, `organization_id` UNIQUE, `sector_ids`, `stage_id`, `regions`, `updated_at`, `version` | fonte de compatibilidade, versionar; dados do cliente isolados |
| `SavedEdital` [P+O?] | PK, `owner_user_id`, `edital_id`, `context_organization_id?`, `created_at` | titular sempre usuário RF04; unicidade de contexto NULL pela política R1 §7; cota atômica, D-02 pendente |
| `CompatibilityEvaluation` [O/R] | PK, `organization_id`, `edital_id`, `profile_version`, `edital_revision`, `score?`, `explanation`, `computed_at` | score não vinculante; nenhum dado de outra empresa |
| `DocumentChecklist` / `ChecklistItem` [O] | PK, `organization_id`, `edital_id`, `assignee_user_id?`, `state`, `updated_at` | associação ao contexto; não confundir com exigência global do edital |
| `CalendarItem` [O] | PK, `organization_id`, `edital_id?`, `deadline_at`, `source_revision?`, `status` | não garantir prazo atual sem checagem |
| `NotificationPreference` [P/O] | PK, `user_id`, `organization_id?`, `channel`, `frequency`, `consented_at`, `revoked_at` | consentimento por canal e propósito, trilha |
| `NotificationDelivery` [P/O] | PK, `recipient_user_id`, `context_key NOT NULL`, `purpose`, `event_id`, `event_version`, `window_id`, `channel`, `attempts`, `state` | unicidade composta por contexto tipado + finalidade/canal/evento/versão/janela; não usar contexto NULL |
| `Plan`/`EntitlementDefinition` [G/R] | PK, `code`, `display_price_reference`, `currency`, `limit_key`, `value`, `valid_from` | versionamento; preços de referência não transação |
| `Subscription` [P/O] | PK, `billing_subject_id` obrigatório, `plan_version`, `state`, `period_start/end`, `revision` | D-26 PENDENTE: alternativa BillingSubject tipado vs org-only; jamais owner opcional/órfão |
| `BillingEvent` [O/R] | PK, `subscription_id`, `simulator_event_id`, `kind`, `verified_at?`, `payload_digest`, `status` | unique event id, append-only, idempotência |
| `PaymentAttempt` [O/R] | PK, `subscription_id`, `method`, `state`, `created_at`, `simulation_ref` | nenhum dado sensível de cartão ou pagamento real |
| `Coupon`/`Receipt` [O/R] | PK, `code?`, `constraints`, `discount`, `issued_at`, `invoice_ref?` | política tributária/comercial futura; mock local |
| `AdvisorRequest`/`AdvisorReview` [O/R] | PK, `organization_id`, `requester`, `scope`, `attachments?`, `state`, `reviewer`, `sla?` | acesso por equipe e política de serviço D-20 |
| `PartnerSubmission`/`PartnerModerationDecision` [R] | PK, `institution_id`, `submitted_by`, `payload_draft`, `status`, `moderator_id`, `reason`, `at` | moderação O separada de `RevisionReviewDecision` editorial D; aprovar parceiro apenas cria candidato |
| `BlogPost` [G/R] | PK, `slug`, `title`, `body`, `editorial_state`, `published_at` | slug único público; revisões desejáveis |
| `ImportSource/Run/Candidate/DeduplicationDecision` [R] | PKs, `source_id`, `started_at`, `evidence`, `candidate_payload`, `matched_edital_id?`, `decision` | nunca edição automática do published |
| `ApiClient` [R] | PK, `owner_org_id?`, `credential_digest`, `scope`, `quota`, `revoked_at` | sem credenciais públicas ou dados privados por engano |
| `AuditEvent` [R] | PK, `actor_id?`, `org_id?`, `resource`, `action`, `outcome`, `correlation_id`, `occurred_at`, `metadata_redacted` | append-only, retenção e export restritos; privacidade D-22 |
| `ManagedCall/FormVersion/FormField` [B2B] | PKs, `institution_org_id`, `managed_call_id`, `schema_revision`, `immutable_on_publish` | formulários versionados; B2B não infere relação automática com agregado |
| `Application/ApplicationAnswer` [B2B] | PKs, `managed_call_id`, `applicant_org_id`, `form_version_id`, `answers`, `submitted_at` | version pin; acesso concorrencial/retenção |
| `Evaluation/EvaluationCriterion/Decision/Appeal/PostAwardMonitoring` [B2B] | PKs, `application_id`, `reviewer_id`, `criterion_version`, `score`, `outcome`, `reasons` | decisão rastreável, independência, isolamento e direito de recurso conforme futura política |

## 4. Índices previstos (não executáveis)

- CAT busca pública: `(editorial_state, published_at desc, id)`, `(deadline_end, id)` com política para nulls, `(institution_id, id)`; texto `title` e `Institution.name` com índice `GIN` full-text/trigram opcional conforme benchmark.
- Filtros: índices nas tabelas de ligação `edital_sector`, `edital_stage`, `edital_region`, tipo de recurso e combinação selectiva; páginas com ordenação estável `(sort_key, id)`.
- ORG `membership(user_id, org_id, status)` e `(org_id,status,role)`; favoritos exigem unicidade com semântica especial para `context_org_id IS NULL` (§ R1 AUD-02), e lock/cota na mesma transação.
- BILL `billing_event(simulator_event_id)` unique; `subscription(owner,state)` sob restrição parcial por escopo, política ainda não definida.
- SRC `source_reference(institution_id, official_identifier)` quando identificador confiável; fingerprints não servem como unicidade absoluta.
- AVAL benchmark com 5.000 editais, EXPLAIN posterior, plano para nulos e cardinalidade de filtros; nenhum índice obrigatório antes de medir.

## 5. Invariantes, isolamento, retenção

- FKs com integridade; `delete cascade` só para dependentes não auditáveis e apenas após política LGPD. Eventos de negócio e pagamentos não eliminados silenciosamente.
- Toda query privada usa escopo organizacional validado **e** owner pessoal quando pertinente. Valores de `org_id` não autorizam sozinho; migrar organização requer revisão de regras.
- `created_at/occurred_at` instant UTC; `source_timezone` separado, sem normalização destrutiva. Dados públicos sempre vinculados à revisão por snapshot integral R1; relações antigas por edital da v0.1 são SUPERADAS.
- Soft delete com tombstone para entidades de negócio e auditoria quando obrigação legal exigir; hard delete/anonymize dados pessoais onde permitido, preservando contagens não-identificáveis.
- Publicação usa snapshot aprovado, não JOIN mutável aos campos draft; revisão e source-check têm cadências diferentes.
- Não duplicar agregado e gerido sem `relation_type` explícita, identidade estável e fronteira de domínio.

## 6. Decisões vinculadas

D-02 dono de favoritos, D-03 workspace sem empresa, D-05 prazo, D-06 revisão, D-10 taxonomias, D-12 timezone, D-13 duplicidade, D-21 cinco membros, D-22 retenção, D-24 B2B, D-26 subscription. Este modelo é uma base de auditoria; nenhuma migration autorizada.

## R1 — Modelagem executável em conceito, sem SQL (AUD-01/02/03/10/11/14)

### Unicidade de SavedEdital com contexto nulo (AUD-02)

A constraint simples `UNIQUE(owner_user_id,context_organization_id,edital_id)` da v0.1 é **INSUFICIENTE** em PostgreSQL padrão porque dois `NULL` podem ser considerados distintos.

| Alternativa | Regra proposta | Pré-condição/risco |
|---|---|---|
| **1: dois índices únicos parciais — recomendada condicionalmente** | índice para `(owner_user_id,edital_id)` quando `context_org_id IS NULL`; índice para `(owner_user_id,context_org_id,edital_id)` quando `IS NOT NULL` | funciona em versões comuns, exige migrations e conflito explícito, não editar migration no R1 |
| 2: `UNIQUE ... NULLS NOT DISTINCT` | único composto trata `NULL` como valor não-distinto | requer confirmar PostgreSQL **15+** antes de codificar; sem assumir versão |
| 3: contexto tipado não nulo | chave `(owner_user_id,context_key,edital_id)` onde pessoal=`personal:userID` e org=`org:UUID` | maior clareza, requer política de namespace, validação de membership e não confundir string fornecida com autoridade |

**Invariantes FAV-UNI:** um usuário não pode ter dois favoritos do mesmo edital no contexto pessoal nem no mesmo contexto organizacional; contextos diferentes não se misturam; salvar exige titular pessoal; org-context requer membership ativo validado no commit; cota=3 FREE contada no escopo ratificado de D-02. Transação proposta: `authorize/resolve ENT → lock serialization por (benefit_subject,feature,context) → count → conditional insert idempotent → commit`; unicidade do banco é última barreira. Retentativas com `request_id` não duplicam; inserções simultâneas com IDs diferentes e contagem=2 produzem uma inserção e uma recusa, nunca quatro; exclusão seguida de reinserção respeita limite no instante. Controle de versões e isolamento transacional são escolhas técnicas a medir, não SQL criado agora. **D-02 continua pendente.**

### Dados públicos fixados em revisão (AUD-03)

`Edital` mantém apenas identidade, slug canônico/ponteiro `published_revision_id`, version/estado de workflow; não é fonte da verdade do título/valor/prazo exibidos. `EditalRevision` mantém `snapshot_full` serializável e digest; tabelas normalizadas `VersionedDeadline`, `VersionedDocumentRequirement`, `VersionedAttachment`, `VersionedSourceReference`, `RevisionSector`, `RevisionStage`, `RevisionRegion` **quando usadas** obrigatoriamente vinculadas a `revision_id` e nunca a campos mutáveis do rascunho. Sem dupla autoridade: a saída pública deve ser derivada exclusivamente do snapshot imutável e seus dados indexados de mesma revisão, não dos relacionamentos do Edital ativo.

**PK/FK/checks conceituais:** `Edital.published_revision_id` FK somente para revisão pertencente ao próprio `Edital.id`; revisão aprovada, conteúdo completo e digest verificado; `revision_number` único por edital; `expectedVersion` e ponteiro com CAS; `snapshot_digest` confere objetos de pesquisa; revisão rejeitada nunca selecionável. Fonte operacional `SourceCheck` fora do snapshot, com `last_verified_at` calculado de resultado efetivamente verificado. **D-06 e alterações de schema dependem do gate registrado em `03`.**

### Relações distintamente tipadas (AUD-11 e AUD-14)

- `RevisionReviewDecision(revision_id,reviewer_user_id,action,reason,at,decision_version)` só aceita `approve/reject/changes_requested`, FK para revisão, `reviewer` com permissão global, sem poder publicar diretamente.
- `PartnerModerationDecision(partner_submission_id,moderator_user_id,action,reason,at)` só aceita `accept_candidate/reject/request_changes`, FK para `PartnerSubmission`, não pertence à máquina de publicação. Parceiro nunca recebe papel `catalog_publisher` implicitamente.
- **A — org-only:** `Subscription.organization_id NOT NULL`, FK para Organization e nenhuma conta sem empresa paga diretamente; política para indivíduo precisa prever onboarding de empresa ou ser declarada não suportada.
- **B — `BillingSubject` tipado (recomendada condicionalmente):** `BillingSubject(id,type PERSONAL|ORGANIZATION,personal_user_id?,organization_id?)` com **exatamente um FK não nulo coerente com type**, FK existente/ativo ou ciclo terminal preservado; `Subscription.billing_subject_id NOT NULL`. Owner exclusivo (um titular por subscription), `EntitlementGrant.subject_id` idem, acesso ao histórico validado por dono + role faturamento. Cancelamento preserva eventos, sem órfão; migração A→B precisa conversão explícita, não ponteiro frouxo. D-26 deve ser ratificado antes da migration de Subscription (A **somente se** antecipada; ideal L). D-02 e D-26 são relacionadas mas ambas permanecem PENDENTES.
- `NotificationDelivery.context_key NOT NULL` com valor tipado `personal:<user>` ou `org:<uuid>`, derivado internamente (não confiar no client), e unique `(recipient_user_id,context_key,channel,purpose,event_id,event_version,window_id)`; revalidar consentimento por contexto para retries. Associação NTF é K/Q, não migration inicial.

### Cenários de integridade para futuros testes

| Cenário | Assert de domínio/banco, sem execução atual |
|---|---|
| Revogação do membro | ocultar org-metadata e negar consulta cross-tenant; preservar favorito público pessoal |
| Remoção organização | impedir nova sessão org; preservar referência histórica redigida; assinatura órfã proibida |
| Retificação de edital | revision+snapshot novos; published_revision mantém versão anterior até aprovação |
| Fonte alterada | SourceCheck registra divergência, não escreve no snapshot; cria candidate pendente |
| Duas revisões simultâneas | version sequence única, detecta stale version e não publica revisão obsoleta |
| Dois convites concorrentes | contagem de membros ativos e aceite serializado sob escopo de quota |
| Duas inclusões favorito em cota 2/3 | uma grava e outra recusa com estado 3/3 |
| Mudança de plano | somente evento confirmado M muda paid; excesso após downgrade não deleta lista |
| Tentativa de publicar indevida | publisher sem revisão aprovada retorna negado sem editar ponteiro |
| Edital gerenciado B2B | `ManagedCall` ID independente, associação explícita com `Edital` sem compartilhar inscrições |

**Índices adicionais candidatos:** unicidade por contexto NULL da tabela acima; `EditalRevision(edital_id,revision_number)`; `Edital(published_revision_id,id)`; projeção pública `(revision_id,filters)`; `NotificationDelivery` chave idempotente tipada; `BillingSubject(type,personal_user_id|organization_id)` com unicidade por sujeito. Índices precisam de validação futura, não foram gerados.

## R2 — Relações de cobertura diária (R1-01)

`SourceCheck` e `EditalSourceCheck` são eventos lógicos distintos: primeira chave lógica `(source_id, day, check_id)`; segunda `(edital_id, source_id, day, evidence_id)` com `completed_at`, `effective`, `checked_fields`, `compared_published_revision_id`. `SourceReference(edital_id,source_id,role,valid_from,valid_to)` define vínculos fonte primária/secundária; `DailyMonitorUniverse(day, kind=SOURCE|EDITAL, resource_id, eligible_from, exclusion_decision_id?, universe_revision)` congela denominadores ao corte. Não apagar evento de erro e não contar check de source como check de todos os editais. Duas fontes para um edital permitem múltiplas evidências, mas no numerador diário contar apenas `Edital.id` distinto efetivamente concluído. Índice conceitual `resource_id+day+effective`, vínculo FK para `EditalRevision` observado (não criar migrations).
