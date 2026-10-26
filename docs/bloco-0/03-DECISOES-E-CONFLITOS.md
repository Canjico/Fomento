# 03 — Registro de decisões e conflitos

> **Documento de proposta para auditoria, versão 0.3-R2 · 26/10/2026.** Apenas o Bloco 0. As seções marcadas **PROPOSTA**, **PREMISSA** e **DECISÃO PENDENTE** não constituem autorização de implementação, contrato congelado ou política comercial aprovada.

**Registro histórico R1 (não normativo onde substituído por R2):** versão derivada do pacote v0.1, corrigida sob AUD-01–AUD-15. Todas as definições de R1 são **PROPOSTAS CONDICIONAIS**, não decisões aprovadas; a matriz D-01–D-28 em `03-DECISOES-E-CONFLITOS.md` prevalece como índice de gates. Nenhuma migração, implementação ou aceite foi executado. **Se houver divergência de testes, prevalece exclusivamente o catálogo R2 em `11-TESTES-E-GATES.md`.**

**Convenção de rastreabilidade:** `ORIGINAL` = conteúdo sustentado pelos anexos primários; `PROPOSTA` = desenho técnico; `PREMISSA` = hipótese; `DECISÃO PENDENTE` = aprovação requerida; `CONFLITO` = tensão entre fontes/planos. Referências: `REQ` (DOCX, página/seção), `ID` (PDF, página), `P02` e `P01` (planos mestres, seção).

**Todas as recomendações abaixo são NÃO APROVADAS.** A coluna `Gate` na tabela histórica a seguir reflete a classificação **v0.1, SUPERADA** pela matriz única R1 da §"Matriz de autoridade". Não use os gates históricos para autorizar migrations ou fases. A matriz R1 define o **último gate admissível**; o aceite documental do Bloco 0 e autorização do Bloco A são atos distintos.

| ID | Gate | Tema / fontes | Alternativas | Recomendação PROPOSTA | Impacto da omissão |
|---|---|---|---|---|---|
| D-01 | A | Stack P02 §3 | Next modular / outro monólito web | Next.js+TS modular, PostgreSQL, Tailwind, Vitest, Playwright; medir tradeoffs e versões no A | Setup e contratos ambíguos |
| D-02 | A | RF04 lista pessoal × P02 §3A A01 por organização | por usuário global; por usuário+empresa; por empresa compartilhado | favorecer privado por usuário com contexto organizacional explícito e opção futura de compartilhamento separada; **decidir regra de cota e dono** | Violação RF04 e vazamento |
| D-03 | A | `User` × `Organization`, consultores | conta individual/empresa; workspace pessoal | organizações por membership, acesso negado por padrão, `activeOrg` validado no servidor | Cross-tenant |
| D-04 | D–F | Campos e confiança REQ §4.2 | publicação permissiva/estrita | campos essenciais+fonte; incerteza exibida, revisão humana | Falso senso de oficialidade |
| D-05 | D–F | Prazos REQ §4.1 × P02 §3A A02 | estado único / status derivado+eventos | fase temporal derivada, suspensão como override e prorrogação como evento; fuso explícito | Edital fechado aparece aberto |
| D-06 | A | Editorial e auditoria P02 A03/A05 | edições in-place / revisões | versão append-only + expectedVersion + separação do ato de publicar | Perda de histórico |
| D-07 | A | Papéis no admin | autor=aprovador / quatro-olhos | exigir revisor distinto em produção; exceção local rastreada para equipe mínima **só se humano autorizar** | Publicação indevida |
| D-08 | A | Contratos modulares | acesso livre a tabelas / portas estáveis | contratos application/ports; owners de dados; sem ciclos | Acoplamento |
| D-09 | A | Trilha da auditoria P02 §7A | autoaprovação / revisão separada | validação documental isolada e gate humano | Gate falso |
| D-10 | D–F | Taxonomias e busca | palavras livres / vocabulário versionado | setores, estágios, recurso, regiões estáveis+sinônimos e `desconhecido` | Filtro inconsistente |
| D-11 | D–F | URL e frescor REQ RNF06 × MVP manual | cumprir por operador / automatizar antes | rotina manual diária auditada no MVP, status de checagem atrasada visível, registrar impossibilidade operacional | RNF pode falhar |
| D-12 | D–F | Fuso e limite inclusivo | apenas data local / instante com zona | timezone IANA por fonte, end-of-day só quando texto permitir, não inventar horário | Contagem incorreta |
| D-13 | D–F | Identidade/dedup | somente URL / composição | chave canônica por instituição+identificador oficial quando disponível; conflitos revisados | Duplicatas ou fusão indevida |
| D-14 | A | Nome / branding P02 §7 | Fomento / Fomentoria | projeto técnico Fomento, marca Fomentoria, sem pressupor domínio | Confusão documental |
| D-15 | FUT M | Billing RF05–06 | débito imediato / recorrência por meio | motor de eventos simulados; confirmação verificada; nenhum PAN, Pix ou boleto real | Liberação incorreta |
| D-16 | FUT L–M | Política comercial | prorrata, trial, ciclos, grace | não inferir; manter estados explícitos e gates próprios | Cobrança conflitante |
| D-17 | FUT I | Compatibilidade RF07 | score oculto / regras indicativas | score determinístico e justificável com dados incompletos | Falsa elegibilidade |
| D-18 | FUT K,Q | Alerta semanal/imediato/WhatsApp RF09, REQ §4.5 | todos ativos / por fase | canais desativados na UI até bloco; consentimento independente | Promessa inexequível |
| D-19 | FUT O | Parceiro RF10 | autopublicação / aprovação humana | fila moderada com trilha e rejeição | Conteúdo não autorizado |
| D-20 | FUT N | Assessoria REQ §7 | ilimitada / cotas por SLA | contrato de serviço com quantidade, SLA, anexos, responsável e capacidade | Serviço impossível |
| D-21 | FUT G–N | Limite 5 usuários Assessoria | por assinatura / por empresa / por workspace | limitar membros ativos no escopo da assinatura aprovado; convites pendentes separados | Cota burlada |
| D-22 | A | Identidade de dados e LGPD | auditoria infinita com PII / separação | minimização, retenção e redaction/tombstone por política jurídica futura | Risco privacidade |
| D-23 | A | Critério de entrada Bloco A | aceite genérico / contratos ratificados | auditoria independente e aprovação humana expressa de stack, tenant, papéis e versionamento | Início não autorizado |
| D-24 | FUT R–U | Agregado × gerido | mesma entidade / domínios separados ligados | identidades separadas com relação explícita de origem, sem copiar submissões | Contaminação B2B |
| D-25 | D–F | Urgência `Encerra em breve` | 3/7/14 dias | threshold configurável, sem default oficial até aceite | Cor e contador sem regra |
| D-26 | FUT G–M | Titularidade da assinatura | pessoa / empresa | entitlement ligado à organização, mas **não considerar definitivo** | Fav/assinatura em escopos distintos |
| D-27 | A | Fonte Anek Tamil web, ID p.7 | arquivo do PDF / fornecedor licenciado | verificar licença/entrega web; fallback acessível | Uso irregular/incompatível |
| D-28 | FUT B–F | Índice público em operação local | habilitar SEO / preparar SEO | rotas sem acesso público, metadados planejados, sem publicação na Internet | Confundir indexabilidade com deploy |

## Conflitos estruturais abertos

1. **C-01 — favoritos pessoais × contexto da empresa:** REQ p.2 RF04 usa “lista pessoal”; P02 §3A A01 propõe escopo organizacional. Sugestão distingue dono dos registros de *contexto de correspondência*. Não foi resolvido.
2. **C-02 — verificação diária × cadastro manual:** REQ p.1 §2 e p.3 §6; REQ p.3 §9 exige MVP manual. Automatização só R; criar processo operacional é possível, mas 100% de cumprimento não demonstrado em Bloco 0.
3. **C-03 — botão de salvar no catálogo × ausência de login no MVP:** REQ p.1 §4.1 e P02 §5 A–F. UI pode indicar recurso posterior/abrir explicação, jamais fingir gravação.
4. **C-04 — WhatsApp em painel do cliente × fase 5:** REQ p.2 §4.5 versus REQ p.4 §9; solução de disponibilização progressiva por módulo.
5. **C-05 — `prorrogado` como status exclusivo:** P02 §3A lista estados sugeridos, mas prorrogação também tem cronologia. Recomenda-se evento/indicador que coexiste com `aberto/encerrado`, sujeito a aceite.
6. **C-06 — plano Assessoria “5 usuários” × consultores com múltiplas empresas:** REQ p.3 §7 não define cota de organizações; não inferir limite de empresas = 5.
7. **C-07 — revisão e publicação por pessoa única:** proposta de quatro-olhos não está no REQ; exceção local deve ser deliberada, não silenciosa.
8. **C-08 — meta SLA e pagamentos reais × ambiente só local:** são requisitos do produto/produção; não testáveis realmente em A–V.

## Critério de decisão

Cada decisão deve registrar: ID, data, responsável humano, alternativas, motivo, consequências no schema, contratos, UX, permissão, teste, bloco e hash do documento afetado. `PENDENTE` → `PROPOSTA APRESENTADA` → `APROVADA PELO RESPONSÁVEL`/`REJEITADA`. Nenhum item aparece como `APROVADA` neste pacote.

## Bloqueadores para transição real ao Bloco A — regra R1

**PROPOSTA — fonte única:** ver §"Matriz de autoridade D-01–D-28 (R1)" neste arquivo. Não existe uma segunda lista autorizativa; `07` e `12` somente apontam para essa matriz. O portão A exige as decisões com `A` e qualquer decisão condicional que efetivamente afete migrations de A. Questões de tipografia e UX permanecem para B se A não instalar ativos/fontes. A etapa documental Bloco 0 requer reauditoria e aceite humano, que não substituem as deliberações pré-A.

## Matriz de autoridade D-01–D-28 (R1) — **fonte única de último gate**

**PROPOSTA CONDICIONAL / PENDENTE DE DECISÃO HUMANA.** Colunas são condensadas, mas possuem impactos explícitos. `A?` significa **somente se a migration de A realmente materializar o domínio indicado**. A decisão D-09/D-23 deve preceder o aceite documental; sua existência não autoriza A. Proprietário deliberante para **todas as linhas**: **responsável humano pelo Fomento** (pode delegar formalmente, registrar data, motivo e versão). Estado de todas: `PENDENTE`.

| ID | Tema | Estado | Último gate | Blocos | Dados / entidades | Contratos | Segurança | UX | Testes | Dependência | Se adiada | Recomendação (não aprovada) | Responsável |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| D-01 | Stack/base local | PENDENTE | A | A–V | App/base/ORM | CAT/infra | deps/segredos | build/dev | smoke stack | D-08 | Versões incompatíveis | Monólito Next+TS/PG após avaliação | Proprietário |
| D-02 | Favorito e cota pessoal | PENDENTE | G antes de H; A se migrar favoritos | G,H,L,M | SavedEdital/subject | FAV/ENT | IDOR/cota | privado e upgrade | FAV/ENT-01..03 | D-03,D-26 | Rework/cota desigual | A pessoal global; B contextual sob aceite | Proprietário |
| D-03 | Identidade/membership | PENDENTE | A se migrar User/Org; senão G | A,G,N | User/Org/Membership | IAM/ORG | cross-tenant | alternar org | AUTH-01..03 | D-02 | Isolamento frágil | Membership validado no servidor | Proprietário |
| D-04 | Campos editoriais | PENDENTE | D | D–F | EditalRevision | CAT | fonte falsa | ficha técnica | EDT-01 | D-05 | Conteúdo incompleto | Obrigatórios + desconhecidos declarados | Proprietário |
| D-05 | Prazo e suspensão | PENDENTE | D | D–F | Deadline/Event | CAT/SRC | prazo falso | badge temporal | TIM-01..07 | D-12 | Status enganoso | fase derivada + eventos | Proprietário |
| D-06 | Revisão/publicação | PENDENTE | A se migração CAT; senão D | A,D–F | EditalRevision/Snapshot | CAT/ADM | mutação indevida | revisões | EDT-04/07 | D-04 | Publicação vazada | Snapshot imutável e ponteiro atômico | Proprietário |
| D-07 | Quatro olhos/exceção | PENDENTE | C | C,D | RevisionReviewDecision | ADM/IAM | publicação indevida | fluxo aprovador | AUTH-04/EDT-04 | D-06 | Autopublicação | Separar atores; exceção formal | Proprietário |
| D-08 | Fronteiras módulos | PENDENTE | A | A–V | módulos | todas portas | ciclos | efeitos previsíveis | contratos negativos | D-01 | Acoplamento | Owners de dados/sem ciclos | Proprietário |
| D-09 | Independência dos gates | PENDENTE | antes do aceite Bloco 0 | 0–V | AuditEvidence | Gates | autoaprovação | relatórios | auditoria diff | D-23 | Gate inválido | Auditor separado do autor | Proprietário |
| D-10 | Taxonomias | PENDENTE | D | D,E,I | Taxonomy* | CAT/REC | filtro incorreto | filtros | RF01 | D-04 | Reindexação | Códigos estáveis, desconhecido | Proprietário |
| D-11 | Checagem manual diária | PENDENTE | D | D–F,R | SourceCheck | SRC/ADM | desatualização | frescor | SRC-01..07 | D-04 | RNF06 descumprido | Rotina + contingência mensurável | Proprietário |
| D-12 | Timezone/date-only | PENDENTE | D | D–F,J | Deadline | CAT | encerramento errado | prazo | TIM-06/07 | D-05 | Fuso errado | IANA + sem inventar hora | Proprietário |
| D-13 | Identidade canônica | PENDENTE | D | D,R,S | CanonicalKey | CAT/SRC | fusão indevida | duplicidade | SRC-05 | D-04 | Duplicação | ID oficial + revisão humana | Proprietário |
| D-14 | Marca exibida | PENDENTE | B; A só se nome integrar build | A,B | metadados app | UI | nomenclatura | marca | brand QA | D-27 | Inconsistência | Projeto Fomento/marca Fomentoria | Proprietário |
| D-15 | Integração billing simulada | PENDENTE | M | M | PaymentAttempt | BILL | replay/PCI | checkout | BIL-01..10 | D-16 | Pagamento inseguro | Mock local autenticado | Proprietário |
| D-16 | Política ciclo/trial | PENDENTE | L; M para cobrança | L,M | Subscription | ENT/BILL | concessão | plano/cancelar | BIL-06..09 | D-26 | Benefício indevido | Política aprovada antes da simulação | Proprietário |
| D-17 | Compatibilidade score | PENDENTE | I | I | CompatibilityEvaluation | REC | elegibilidade falsa | explicações | RF07 | D-10 | Score enganoso | Indicativo determinístico | Proprietário |
| D-18 | Consentimento/canais | PENDENTE | K; Q para WhatsApp | K,Q | Notification* | NTF | envio indevido | preferências | NTF-01..06 | D-02 | Envio incorreto | Opt-in por finalidade/canal | Proprietário |
| D-19 | Moderação parceiro | PENDENTE | O | O | PartnerModerationDecision | ADM/CAT | autopublicação | fila parceiro | MOD-01..03 | D-07 | Acesso indevido | Fluxos distintos de revisão | Proprietário |
| D-20 | Escopo de assessoria | PENDENTE | N | N | AdvisorRequest | ADV | SLA/PII | solicitações | ADV-01 | D-21 | Promessa inexecutável | SLA/limites ratificados | Proprietário |
| D-21 | 5 usuários Assessoria | PENDENTE | N; L se schema de cota | L,N | Membership/Quota | ORG/ENT | overbooking | convites | AUTH-06 | D-26 | Cota burlada | Membros ativos em account aprovado | Proprietário |
| D-22 | Privacidade base | PENDENTE | A para campos PII; C/G para sessões | A,C,G | AuditEvent/User | IAM/ORG | retenção | erasure | PRIV-01.. | D-03 | Dado indevido | Minimização + política jurídica por gate | Proprietário |
| D-23 | Critério de aceite | PENDENTE | antes do aceite Bloco 0 | 0–V | GateEvidence | Governança | autoavanço | status de gate | AUD-R1 | D-09 | Implementação sem aceitação | Aceite expresso e separado de A | Proprietário |
| D-24 | Agregado/B2B | PENDENTE | T | R,T,U | ManagedCall/Link | CAT/B2B | cross-tenant | origem dos editais | B2B-01 | D-13 | Mistura dados | Separar domínios ligados | Proprietário |
| D-25 | Encerra em breve | PENDENTE | E (ou D se persistir status) | D–F | Deadline | CAT | urgência falsa | cor/badge | TIM-03 | D-05 | UI divergente | Threshold configurado | Proprietário |
| D-26 | Titular assinatura | PENDENTE | G antes de desenho account; L antes migração Subscription; A se migrar Subscription | A?,G,L,M | BillingSubject/Subscription | ENT/BILL/FAV | direito atravessa escopo | escolher plano | ENT-02/03 | D-02,D-03 | Reestruturação | Titular tipado (preferência), pendente | Proprietário |
| D-27 | Fonte web licenciada | PENDENTE | B | B | font asset | UI | licença | tipografia | contrast/license | D-14 | Uso irregular | Fonte licenciada ou fallback | Proprietário |
| D-28 | Metadados SEO sem deploy | PENDENTE | B/E | B,E,F,P | route metadata | UI/CMS | indexação local | resultados | SEO-01 | D-14 | Promessa falsa | Metadados apenas, sem expor ambiente | Proprietário |

### Regra única para migrations futuras (AUD-05)

1. Antes de autorizar A, listar **exatamente** as migrations/entidades previstas na fundação. Caso A contenha `SavedEdital`, `BillingSubject`, `Subscription`, `EditalRevision` ou `Deadline`, antecipar D-02/26/06/05/12/13 respectivamente; se não contiver, manter gate mais tardio. Não promover todas as 28 decisões a bloqueadoras indiscriminadamente.
2. **Candidatas fixas para A por desenho:** D-01, D-08 e D-23/D-09 (governança). D-03 e D-22 são obrigatórias em A **se** User/Organization ou PII estiverem nas migrations iniciais; D-06 se modelagem editorial já existir. A separação de papéis D-07 fecha antes de C; marca/fonte D-14/D-27 antes de B.
3. `07` e `12` devem apontar para a tabela acima, jamais replicar gates divergentes. No plano curto de A listar decisões resolvidas, migrations e evidência de aprovação; sem isso, A fica bloqueado. **Nenhuma decisão foi ratificada neste R1.**
4. D-02/D-26 possuem decisão combinada: o direito comercial e o domínio pessoal não podem ser aprovados isoladamente; resolver antes de qualquer schema que imponha titularidade. As alternativas completas estão em `04` e `09`.

### R2 — IDs de testes (R2)

**Nota normativa R2 (IDs):** Todas as menções a `EDT-*`, `TIM-*`, `AUTH-*`, `SRC-*`, `DED-*`, `ENT-*`, `BIL-*`, `PERF-*`, `PRIV-*`, `LOG-*` são referências; a definição de teste, suas fixtures e seu oráculo estão exclusivamente em `11-TESTES-E-GATES.md` §R2. Ocorrências antigas não prevalecem sobre o catálogo.

## R2 — D-02 e D-26: checkout original e extensão não ratificada (R1-06)

A recomendação histórica R1 de `BillingSubject` tipado não é aprovação de venda a pessoa física. **Alternativa A (aderente a REQ §4.4):** apenas checkout empresarial com CNPJ e vinculação autorizada; conta pessoal sem empresa usa Gratuito. **Alternativa B (extensão):** checkout pessoal/empresarial com dados tributários e direitos tipados; exige mudança de escopo de negócio e análise LGPD/fiscal. Fav. RF04 continuam pessoalmente pertencentes ao usuário; escopo do benefício requer D-02. **Último gate:** D-02 antes de H e de migrations pertinentes; D-26 antes de criar Subscription/BillingSubject ou rotas de checkout, no máximo antes L/M (antecipar apenas se migrations de A/G o exigirem). **Status de ambas: PENDENTE.** Matriz única D-01–D-28 permanece authority de gates; qualquer deslocamento exigirá mudança formal nessa matriz.

## R2 — Classificação dos gates após correções delimitadas

O índice **normativo** de D-01–D-28 permanece a matriz única §"Matriz de autoridade D-01–D-28 (R1)" acima. A correção R2 **não aprovou** e **não renumerou** decisões. Casos específicos: D-11 exige capacidade de verificar **fontes e editais** antes do Gate MVP1; D-02 antes de esquema de quota no H, D-26 antes da primeira Subscription e rotas de checkout em L/M, adiantando caso alguma migration anterior contenha seus campos; D-12 determina temporalidade, D-23 define protocolo de aceite, D-09 preserva auditoria independente. Os contratos R2 em `05`,`09`,`11` e relatórios anexos explicitam alternativas sem substituir deliberação. Se a futura implementação variar o conteúdo da migration A, deve recalcular o gate exato e obter aceite específico antes de executar.
