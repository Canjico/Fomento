# 04 — Organizações, permissões e ownership

> **Documento de proposta para auditoria, versão 0.3-R2 · 26/10/2026.** Apenas o Bloco 0. As seções marcadas **PROPOSTA**, **PREMISSA** e **DECISÃO PENDENTE** não constituem autorização de implementação, contrato congelado ou política comercial aprovada.

**Registro histórico R1 (não normativo onde substituído por R2):** versão derivada do pacote v0.1, corrigida sob AUD-01–AUD-15. Todas as definições de R1 são **PROPOSTAS CONDICIONAIS**, não decisões aprovadas; a matriz D-01–D-28 em `03-DECISOES-E-CONFLITOS.md` prevalece como índice de gates. Nenhuma migração, implementação ou aceite foi executado. **Se houver divergência de testes, prevalece exclusivamente o catálogo R2 em `11-TESTES-E-GATES.md`.**

**Convenção de rastreabilidade:** `ORIGINAL` = conteúdo sustentado pelos anexos primários; `PROPOSTA` = desenho técnico; `PREMISSA` = hipótese; `DECISÃO PENDENTE` = aprovação requerida; `CONFLITO` = tensão entre fontes/planos. Referências: `REQ` (DOCX, página/seção), `ID` (PDF, página), `P02` e `P01` (planos mestres, seção).

## 1. Enquadramento e limites

**ORIGINAL:** consultor atua com múltiplos clientes (REQ p.1 §3); RF04 prevê lista *pessoal* (REQ p.2 §5); Assessoria inclui até 5 usuários (REQ p.3 §7). **PROPOSTA P02 §3A A01:** estruturar multiempresa com memberships. O original não define RBAC granular, dono da assinatura e compartilhamento de favoritos; decisões D-02/03/21/26 abertas.

## 2. Identidade e contexto

- `User` representa pessoa/credencial. `Organization` representa empresa/conta de trabalho distinta; opcional `CompanyProfile` contém dados de compatibilidade.
- `Membership(user_id, organization_id, role, status, invited_by, accepted_at, revoked_at, valid_from)` admite `N:N`. Acesso efetivo requer membership `active`, não basta enviar `org_id`.
- **PROPOSTA:** operações privadas recebem `actorUserId`, `organizationId` e ação; servidor resolve membership e recurso. Nunca confiar em claims de papel, `activeOrg` armazenado no navegador ou path fornecido.
- Usuário sem membership não acessa dados de outras empresas. Ao trocar de organização, filtros, caches, sessões de formulário e permissions contextuais são revalidados.
- Pessoal/individual sem empresa é lacuna: alternativa conta pessoal sem org ou workspace individual formal; D-03.

## 3. Papéis propostos (escopos distintos)

| Papel | Escopo | Ações propostas | Restrições |
|---|---|---|---|
| `visitor` | público | listagem, busca, detalhes, navegação externa | zero acesso a backoffice |
| `user` | sua identidade | perfil pessoal, sessão, lista pessoal conforme D-02 | não lê dados de outro usuário |
| `org_owner` | organização vinculada | administrar equipe/perfil/assinatura, delegar | não transforma papel em admin global |
| `org_manager` | organização | perfil, checklist, calendário e projetos conforme permissão | não aprova próprio upgrade arbitrário |
| `org_member` | organização | leitura/escrita privada limitada por matriz | sem billing/admin de equipe por padrão |
| `consultant` | organizações às quais possui membership | alternar clientes e executar escopos delegados | nunca listar clientes de outro consultor |
| `catalog_editor` | catálogo global | criar, editar rascunhos, enviar revisão | sem aprovar/publicar salvo exceção deliberada |
| `catalog_reviewer` | catálogo global | revisar/aprovar rejeitar revisões | não confundir com `org_owner` |
| `catalog_publisher` | catálogo global | publicar versão aprovada, retificar e arquivar | versionamento e autoria obrigatórios |
| `platform_operator` | backoffice global | suporte/moderação/auditoria conforme escopo | permissões de cobrança limitadas |
| `partner_submitter` | instituição parceira | preparar/submeter conteúdos próprios | publicação somente equipe Fomentoria |
| `b2b_evaluator` | instituição/edital gerido específico | avaliar inscrição atribuída | isolamento de candidatos e conflito de interesses |

Papéis internos podem ser agrupados numa equipe mínima em ambiente local apenas mediante decisão humana D-07, com evento da exceção. Não pressupor permissões vinda do REQ.

## 4. Matriz de autorização de recursos (proposta, política default deny)

| Recurso/ação | Visitante | Usuario | Owner/Manager | Editor | Revisor | Publicador | Parceiro |
|---|---|---|---|---|---|---|---|
| catálogo publicado ler | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| edital rascunho criar/editar | – | – | – | ✓ | revisão só | aprovar só | – |
| aprovar revisão | – | – | – | – | ✓ | conforme delegação | – |
| publicar versão aprovada | – | – | – | – | – | ✓ | – |
| compartilhar lista de favoritos | – | dono sob D-02 | política específica | – | – | – | – |
| perfil da organização | – | membro autorizado | ✓ | – | – | – | – |
| billing/histórico | – | dono se pessoal | ✓ conforme D-26 | – | – | – | – |
| convidar membros | – | – | owner (manager se autorizado) | – | – | – | – |
| enviar edital parceiro | – | – | – | – | – | – | ✓ (bloco O) |
| ler auditoria global | – | – | – | somente eventos próprios autorizados | somente eventos próprios autorizados | somente eventos próprios autorizados | – |

`✓` não sobrepõe restrição contextual; elementos futuros exigem contrato próprio. `–` = negar. Assinatura não confere papel editorial nem rompe isolamento.

## 5. Ownership de dados (decisões explícitas)

| Dado | Dono jurídico/técnico proposto | Escopo de acesso | Status |
|---|---|---|---|
| Organização/empresa | `Organization` sob titular empresarial; owners são memberships | seus membros autorizados | PROPOSTA D-03 |
| Assinatura, entitlements, pagamentos | Titular **tipado** pessoa ou organização é PROPOSTA R1, versus org-only | ator/role billing do titular validado | DECISÃO PENDENTE D-02/D-26, ver R1 |
| Favoritos | `User` privado + opcional contexto `Organization` | próprio usuário; compartilhamento desligado | DECISÃO PENDENTE D-02; preservar RF04 |
| Checklists, calendário | `Organization`, com `created_by` individual | membros autorizados a casos/empresa | PROPOSTA |
| Preferências de notificação | `User` e, quando evento empresarial, `Organization` | só titular/operador autorizado e base legal | DECISÃO PENDENTE D-18 |
| Perfil de compatibilidade | `CompanyProfile` subordinado a `Organization` | membros autorizados; historização controlada | PROPOSTA |
| Papéis, memberships, convites | organização + identidade de responsável | owner/admin conforme papel | PROPOSTA D-03 |
| Auditoria editorial global | plataforma, evento vinculado ao ator | equipe com direito de auditoria | PROPOSTA |
| Catálogo, instituições, fontes, taxonomias | plataforma global | leitura pública das versões publicadas | PROPOSTA |
| Candidaturas B2B, avaliações | instituição/tenant B2B e caso, com regras específicas | somente participantes previstos | PROPOSTA T,U |

## 6. Autorização: sequência conceitual

1. Validar sessão/ator e operação; para dados públicos não requer sessão.
2. Resolver recurso pelo identificador imutável e vínculo real `organization_id`; não aceitar `organization_id` do body como autoridade.
3. Confirmar membership ativo e papel no escopo; aplicar controle fino por ação/estado/titularidade.
4. Confirmar entitlement no servidor quando necessário; validar limite e concorrência na mesma transação do efeito.
5. Persistir evento auditável com `actor`, `org`, `resource`, `action`, `decision`, `correlation_id`; nunca expor conteúdo sensível indevidamente.
6. Responder `not found` onde enumerar recursos alheios seria vazamento; registrar recusa de forma não invasiva.

## 7. Cenários adversariais obrigatórios

| ID | Ataque / teste | Esperado |
|---|---|---|
| AUTH-01 | Alterar `org_id` na URL/body para empresa sem membership | negado; nenhum dado retornado/escrito |
| AUTH-02 | Consultor ativo em A envia `saved_id` de B | negado mesmo com recurso existente |
| AUTH-03 | Revogar membership e repetir sessão/token antigo | acesso negado imediatamente ou segundo SLA revogação aprovado |
| AUTH-04 | Editor tenta publicar ou chamar endpoint direto | negado; auditado |
| AUTH-05 | Owner de empresa tenta acessar admin global | negado |
| AUTH-06 | Dois convites aceitos simultaneamente no limite de 5 usuários | somente quantidade permitida em transação |
| AUTH-07 | Cache público/privado chaveado sem organização | teste garante não contaminação entre A/B |
| AUTH-08 | Trocar empresa enquanto envia checklist sem contexto fixo | a escrita mantém escopo validado no commit ou falha |
| AUTH-09 | Acesso a documento privado por URL direta | autorização no download e metadados sem exposição |
| AUTH-10 | Parceiro altera ID da instituição ou tenta autopublicar | sem alteração e sem publicação |

## 8. Fluxo de convites e alteração de papéis

Convite é token único, temporário, associado a email/empresa/papel; no aceite validar usuário, vigência, quota e duplicidade. Revogação invalida acesso a recursos e sessões/contextos derivados, mas não apaga eventos históricos. Mudança do último owner requer transferência ou conta de recuperação deliberada; prevenção de abandono depende de D-03. Separação de poderes editoriais independe de papéis empresariais.

## R1 — AUD-01/AUD-13: favoritos pessoais versus benefício comercial (D-02/D-26 PENDENTES)

**ORIGINAL:** RF04 exige `lista pessoal`; **PROPOSTA:** `SavedEdital.owner_user_id` permanece invariavelmente o titular pessoal; um `context_organization_id` é somente contexto de criação/compatibilidade e nunca transfere a propriedade. Campos anotados com informação privada da organização são objetos separados, não payload livre de SavedEdital. Compartilhar favoritos não é capacidade implícita do plano Assessoria.

| Alternativa | Direito comercial | Usuário sem empresa | Duas empresas | Revogação | Downgrade |
|---|---|---|---|---|---|
| **A — pessoal global (recomendada condicionalmente)** | Assinatura pessoal ativa habilita limite global da pessoa; assinatura empresarial **não** eleva a lista pessoal sem concessão formal separada e explícita | Lista pessoal FREE 3, paga só se houver titular pessoal válido | Mesma lista pessoal, mesmas três vagas FREE; sem herança de Pro de A para B | Preserva `owner_user_id,edital_id` e remove/oculta somente metadados privados do contexto revogado | itens existentes permanecem legíveis ao dono, bloquear **novas inclusões** acima da cota, sem deleção arbitrária |
| **B — benefício contextual por organização** | Cota avaliada `(user, activeOrg)` após membership; fora de contexto, FREE 3; lista continua privada da pessoa | FREE pessoal 3 até política de pagamento individual | A Pro ilimitado somente no contexto A; B Free 3; salvar sem contexto não consome A | No contexto perdido, negar metadados e escrita; manter ao dono referência pública e eventualmente mover a lista pessoal para visão de recuperação autorizada | excedentes contextuais legíveis conforme política; novas inserções bloqueadas até cota retornar |

**CONFLITO e efeito técnico:** alternativa A tem menor ambiguidade frente a RF04, mas exige separar titular pessoal de assinaturas empresariais (D-26). A alternativa B exige particionamento explícito de cota e UI sempre etiquetada por contexto; não somar cotas nem usar `activeOrg` como autorização. Ambas dependem de decisão humana; não provisionar assinatura pessoal real nesta etapa. Assinatura empresarial de A jamais concede Pro na empresa B sem uma concessão de entitlement deliberada, válida e verificada.

### Porta `effectiveEntitlement(actor, context, feature, at)` — contrato conceitual

- **Entrada:** `actor` = identidade autenticada revalidada; `context` = discriminado `personal(user_id)` ou `organization(org_id)`; `feature` chave conhecida (ex.: `saved_edital.limit`); `at` instante UTC. `context` não é legitimado apenas pelo client.
- **Guarda:** sujeito e sessão válidos; para contexto org, membership **ativo no instante e na transação**, permissão da ação e organização não excluída; `personal.user_id == actor.id`; `feature` cadastrada. No H, resolver FREE estático de forma isolada de billing; paid só após L/M com fonte verificada.
- **Saída:** `{subject_kind,subject_id,context_key,feature,value,policy_version,valid_until,evidence_ref,decision}`; `decision=ALLOW/DENY`, limite `3` ou `unlimited` apenas se origem válida; redigir dados de outras pessoas.
- **Falhas:** `UNAUTHENTICATED`, `FORBIDDEN_CONTEXT`, `UNKNOWN_FEATURE`, `ENTITLEMENT_UNAVAILABLE` (falha fechada para paid, FREE apenas se policy FREE válida), `CONFLICT_QUOTA`, `REVOKED`, `STALE_VERSION`. Nunca transformar timeout em Pro.
- **Invariantes:** entitlement **não atribui RBAC**, auditoria separa fonte do benefício, não reutilizar resultado de outro sujeito/contexto; cota/insert na mesma transação; revalidar membership e estado no commit; cache chaveado `(actor,context,feature,policy_version)` com invalidação.

### Tabela de verdade ilustrativa (SIMULAÇÃO / A pessoal global; nenhuma cobrança)

| Ator | Org A (Pro empresarial hipotético) | Org B (FREE) | Contexto da operação | Direito de salvar | Resultado esperado |
|---|---|---|---|---|---|
| U1 — owner A | ativo | ausente | A | FREE pessoal 3 | Não herda Pro empresarial para lista pessoal |
| U1 — owner A | ativo | ausente | pessoal | FREE pessoal 3 | Quarta inclusão negada |
| U2 — consultor | ativo | ativo | A | FREE pessoal 3 | Não herda Pro de A; dados privados A só enquanto membro |
| U2 — consultor | ativo | ativo | B | FREE pessoal 3 | Troca de org não reinicia cota global |
| U3 — membro B | ausente | ativo | B | FREE pessoal 3 | 3 permitidos; quarto negado |
| U4 — pessoa sem org | ausente | ausente | pessoal | FREE pessoal 3 | Pode salvar 3 sem `organization_id` |
| U5 — assinatura pessoal Pro simulada para análise de alternativa, não ativa no H | ativo | ativo | pessoal | ilimitado **somente após M** | Até M, limite FREE 3 |

**Se B for aprovada**, refazer expectativa para U2: em A com membership ativo e entitlement contextual válido → ilimitado **apenas A**; em B → 3; sem empresa → 3. Cota de contexto não permite ler favoritos alheios. A matriz é teste conceitual, não política comercial ratificada.

### Revogação de membership — política proposta AUD-13

Revogar/expirar membership invalida imediatamente novos acessos empresariais (ou na janela de revogação expressamente aprovada), inclusive sessões derivadas, caches, checklists, comentários e metadados privados de favoritos. A identidade do edital público e a referência pessoal persistem: **não apagar a lista RF04**. Qualquer `context_organization_id` revogado passa a `context_hidden`/registro histórico não legível por esse ator; exportação/reassociação só da informação pessoal pública, após confirmação do titular e revisão de política LGPD. Organização removida segue tratamento de retenção/apagamento deliberado. Membership em outra empresa jamais reassocia automaticamente dados da antiga. Testes AUTH-03, FAV-04/05, PRIV-03.

## R1 — AUD-12: matriz da trilha de auditoria (somente leitura ≠ alteração)

| Papel efetivo | Eventos do próprio ator | Eventos da organização | Eventos globais do catálogo | Exportação | Alterar/apagar evento |
|---|---|---|---|---|---|
| Visitante / usuário comum | não, salvo fluxo LGPD autorizado | não | não | não | nunca |
| org_owner/manager | somente eventos organizacionais **sanitizados**, após policy específica | acesso restrito a sua org | não | somente relatório redigido com base legal | nunca |
| catalog_editor/reviewer/publisher | próprios eventos editoriais sanitizados | não | não por padrão | não | nunca |
| platform_operator | próprios e casos explicitamente atribuídos | somente caso com finalidade registrada | recorte por atribuição, sem dump global | duplo controle para export | nunca |
| `audit_reader` — novo papel proposto | sim | conforme delegação e finalidade | somente leitura de trilhas atribuídas ou global sob permissão explícita | exige concessão específica, evento da exportação e masking | nunca |
| `platform_admin` (supervisor) | sim | consultas necessárias mediante justificativa | conforme escopo global concedido | dupla confirmação + auditoria | nunca |

Controle a consulta por predicado server-side e escopo mais estreito; campos `actor_id`, IP, justificativa e payload exigem pseudonimização/mascaramento segundo papel. Cada leitura/exportação sensível gera **evento de acesso** append-only sem registrar conteúdo privado na íntegra; logs não devem virar uma nova fonte de PII. `audit_reader` não pode se autoatribuir escopo. Rotas administrativas de Histórico em `08` obedecem esta tabela. Casos `AUTH-12..15`: viewer consulta próprio escopo (sucesso); editor tenta ler global (negado); auditor tenta DELETE/export sem delegação (negado); operador exporta sem finalidade (negado).

## R1 — AUD-07: AUTH-11 anti-enumeração

**Pré-condições C/G:** usuários de teste fictícios `existente@example.test` / `ausente@example.test`, convites fictícios válido/inexistente/expirado, relógio fixo, logs coletados redigidos. **WHEN:** executar mesmos POST de recuperação/invite 20 vezes por classe com IP e device controlados; comparar código, corpo, headers e distribuição de latência sob mesmas condições (timing aproximado, não igualdade impossível). **THEN:** resposta pública genérica para conta/convite existente e não existente sempre que a operação permitir, sem revelar existência; aceite de convite com token deve distinguir inválido/expirado apenas quando detentor do token legitimamente o apresenta; sem e-mails reais. Limitação de tentativas: **PROPOSTA 5 tentativas/15 min/identificador IP+account**, não aprovada; ratificar antes C/G, testar 429 coerente para classes de conta sem vazar. Evidência futura: requests/responses normalizados, histogramas de latência, auditoria sanitizada sem e-mails/tokens literais. Não inferir dado sensível a partir do logs. Teste AUTH-11 executável apenas quando o endpoint existir.

### R2 — IDs de testes (R2)

**Nota normativa R2 (IDs):** Todas as menções a `EDT-*`, `TIM-*`, `AUTH-*`, `SRC-*`, `DED-*`, `ENT-*`, `BIL-*`, `PERF-*`, `PRIV-*`, `LOG-*` são referências; a definição de teste, suas fixtures e seu oráculo estão exclusivamente em `11-TESTES-E-GATES.md` §R2. Ocorrências antigas não prevalecem sobre o catálogo.

## R2 — Conexão RBAC e AUTH-11 (R1-04)

O caso `AUTH-11` é definido exclusivamente no `11` §R2, com fase A de enumeração em identidades/convites e fase B de rate limit sob buckets novos. Membership revogado não altera resposta pública de recuperação para revelar conta, mas ações de aceite com token válido exigem verificação server-side de sujeito, escopo e validade. Rate limit `5/15min` é **PROPOSTA NÃO APROVADA**; nenhum endpoint existe nesta etapa.

## R2 — Autorização das duas jornadas de cobrança (R1-06)

Em contratação organizacional exigir `can_manage_billing(actor, org_id)` no servidor, membership ativo no início, na criação de tentativa e antes de mudança de plano; revogação durante checkout invalida a operação autorizativa pendente. Em alternativa pessoal (APENAS SE APROVADA), `billing_subject.person_user_id` deve ser igual ao sujeito autenticado, sem direito implícito a dados das organizações. U em A Pro/B Free nunca usa benefício A em B; favoritos privados sobrevivem à revogação sem metadados da organização. Ver matriz J01–J10 em `05-CHECKOUT-ALTERNATIVAS.md`.
