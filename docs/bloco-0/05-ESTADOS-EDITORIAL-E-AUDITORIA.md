# 05 — Estados, prazos, proveniência e auditoria

> **Documento de proposta para auditoria, versão 0.3-R2 · 26/10/2026.** Apenas o Bloco 0. As seções marcadas **PROPOSTA**, **PREMISSA** e **DECISÃO PENDENTE** não constituem autorização de implementação, contrato congelado ou política comercial aprovada.

**Registro histórico R1 (não normativo onde substituído por R2):** versão derivada do pacote v0.1, corrigida sob AUD-01–AUD-15. Todas as definições de R1 são **PROPOSTAS CONDICIONAIS**, não decisões aprovadas; a matriz D-01–D-28 em `03-DECISOES-E-CONFLITOS.md` prevalece como índice de gates. Nenhuma migração, implementação ou aceite foi executado. **Se houver divergência de testes, prevalece exclusivamente o catálogo R2 em `11-TESTES-E-GATES.md`.**

**Convenção de rastreabilidade:** `ORIGINAL` = conteúdo sustentado pelos anexos primários; `PROPOSTA` = desenho técnico; `PREMISSA` = hipótese; `DECISÃO PENDENTE` = aprovação requerida; `CONFLITO` = tensão entre fontes/planos. Referências: `REQ` (DOCX, página/seção), `ID` (PDF, página), `P02` e `P01` (planos mestres, seção).

## 1. Três dimensões independentes — proposta de modelagem

**ORIGINAL (REQ p.1 §4.1):** estados de exibição `Aberto`, `Encerra em breve`, `Encerrado`. **PROPOSTA P02 §3A A02:** separar estado editorial, situação temporal e verificação. `Prorrogado` e `suspenso` não constam como estados estruturais no REQ; são hipóteses adicionais para não mentir sobre retificações.

| Eixo | Representação recomendada | Valores e exclusões |
|---|---|---|
| Editorial, persistido | `draft / in_review / published / archived` no registro canônico + revision workflow | `rejected` e `changes_requested` são **resultados de revisão**, não necessariamente estado terminal do edital; `published` com revisão pendente preserva versão pública atual |
| Inscrição, majoritariamente derivada | `upcoming / open / closed / unknown` a partir da janela explícita; `suspended` como override/evento vigente | `extended`/prorrogado é anotação histórica e flag exibível, não alternativa exclusiva a `open/closed`; `Encerra em breve` é rótulo de urgência calculado |
| Checagem de fonte, persistida | `unchecked / verified / review_required / unavailable` com `checked_at`, resultado, ator, validade política | tempo expirado cria `stale` derivado; `verified` não valida juridicamente elegibilidade nem torna oportunidade aberta |

**Invariante crítica:** publicação não determina inscrições abertas; prazo encerrado não arquiva; fonte indisponível não apaga dados; atualização de checagem não publica silenciosamente nova versão.

## 2. Máquina editorial (PROPOSTA)

| Origem | Comando e papel | Destino | Pré-condições | Erro esperado |
|---|---|---|---|---|
| ∅ | criar / editor | draft | ator autorizado | 403 para visitante |
| draft | enviar_revisao / editor | in_review | campos de revisão presentes; version ok | 422 faltas / 409 versão |
| in_review | pedir_correcao / revisor | draft (com motivo) | revisão vigente | 409 se obsoleta |
| in_review | rejeitar_revisao / revisor | draft com revisão rejeitada | motivo obrigatório, evento | revisão rejeitada continua histórica |
| in_review | aprovar_revisao / revisor | in_review + `approved_revision_id` | validações e independência do autor D-07 | 403 autoaprovação se proibida |
| in_review aprovado | publicar / publicador | published | link/fonte, revisão idempotente e guardas | 409/422/403 |
| published | iniciar_retificacao / editor | published + revisão em draft | versão pública estável até aprovar | 409 concorrência |
| published com revisão aprovada | publicar_retificacao / publicador | published nova versão | ref. à versão anterior e motivo | 409 se já aplicada |
| draft / published | arquivar / publicador | archived | justificativa registrada | 403 papel insuficiente |
| archived | restaurar / publicador com revisão | draft ou in_review | aprovação explícita a decidir | proibida sem trilha |

Não exigir transições `published→draft` que removam a versão pública sem deliberação. Pode existir arquivo público apenas de dados históricos ou endpoint administrativo; decisão D-04.

## 3. Datas, prazos e status

Campos conceituais: `window_start_at` (UTC nullable), `window_end_at` (UTC nullable), `date_only` + `source_timezone` IANA quando fonte só tem data, `deadline_kind` (known, unknown, continuous, not_applicable), `suspension_started_at`, `suspension_ended_at`, `extension_events[]`, `source_timestamp_text` e `verified_at`. **Não inventar hora de encerramento.** D-12 exige política humana para edital que diz apenas “até 31/10”.

**Algoritmo conceitual não executável:**

1. Se `suspended` vigente: estado operacional = suspenso, independentemente do horário.
2. Caso prazo desconhecido/contraditório: `unknown`, aviso de confirmação oficial; nunca afirmar aberto.
3. Se início conhecido e ainda não alcançado: `upcoming`; se fim conhecido e instante de avaliação é após fim: `closed`; em janela válida: `open`.
4. Se fim não existe mas modalidade contínua verificada: `open` com indicação contínua; caso contrário `unknown`.
5. `Encerra em breve` = `open` e dias/horas restantes sob threshold D-25. Não expressar `0 dias` como aberto quando expirado.
6. `extended` é rótulo oriundo de `extension_event` com documento oficial e novo prazo; tem início/fim historizados.

| Caso | Exibição esperada | Prova necessária |
|---|---|---|
| Publicado, prazo passado | Encerrado; ainda acessível conforme política editorial | TIM-01 |
| Publicado, suspensão vigente | Suspenso, CTA sinalizado adequadamente | TIM-02 |
| Edital prorrogado e ainda aberto | Aberto + Prorrogado (histórico) | TIM-03 |
| Sem prazo na origem | Prazo não informado / confirmar na fonte | TIM-04 |
| Fonte indisponível, verificação antiga | Última checagem + fonte indisponível; não mudar inscrição sem nova evidência | TIM-05 |
| End date exato e timezone | comparar instantes sem converter silenciosamente | TIM-06 |
| Virada do dia/horário de verão | teste por relógio fixo e timezone IANA | TIM-07 |

## 4. Identidade, deduplicação e fonte

**PROPOSTA:** `Edital.id` é identidade interna estável; `official_id`/`source_id` são opcionais porque nem toda instituição numera editais. Fingerprint auxiliar por instituição, número/ano, natureza, título normalizado e fonte; **não** fundir automaticamente apenas por URL/título. `CanonicalEdital` pode mapear múltiplas `SourceReference` (URLs e capturas), e decisões humanas de duplicidade registram vencedor/perdedor/motivo. URL válida sintaticamente não significa fonte disponível ou oficial. Em MVP, admin confere manualmente origem e última checagem; R introduz candidatos e fila.

## 5. Auditoria append-only

Modelo lógico de `EditalRevision` (snapshot/diff): `id`, `edital_id`, `sequence`, `parent_revision_id`, `public_version`, `payload_snapshot_hash`, `changed_fields`, `before_values/after_values` sanitizados, `actor_id` ou `system_actor`, `change_origin`, `occurred_at`, `reason`, `correlation_id`, `review_decision`, `approved_by/at`. `AuditEvent` separa evento de negócio de log técnico e contém `actor`, `resource`, `action`, `result`, `org_id` se aplicável, `occurred_at`, hash/pointer e correlação.

- **Invariante:** número de versão cresce monotonicamente por edital; não sobrescrever versão aprovada ou evento. Restauração cria **nova versão** com referência à recuperada.
- Edição simultânea: `expected_revision/expected_version`, compare-and-swap transacional; perdedor recebe `409 Conflict` com instrução de recarregar/conciliar (nunca overwrite silencioso).
- Falha de autorização e tentativa de publicar obsoleto são eventos de segurança com conteúdo mínimo; aprovações rejeitadas têm decisão histórica.
- Dados pessoais em eventos: minimização, redaction/tombstone por política LGPD, retenção por base legal e autorização; não prometer histórico imutável absoluto e exclusão integral simultaneamente. Período e controlador jurídico = D-22.
- Retificação de edital requer motivo, proveniência e referência a comunicação oficial; mudanças de prazo/valor/elegibilidade são críticas e exigem revisão.

## 6. Matriz de fluxos administrativos

| Fluxo | Operador | Guardas | Auditoria | Teste negativo |
|---|---|---|---|---|
| 1 criar | editor | sessão/papel | autoria inicial | visitante 403 |
| 2 salvar rascunho | editor | version | diff mínimo | 409 simultâneo |
| 3 editar | editor | validações/ownership global | novo draft revision | edição do published sem revisão |
| 4 solicitar revisão | editor | completude, fonte | evento request | ausências 422 |
| 5 aprovar/rejeitar | reviewer | origem e conflito D-07 | decisão+motivo | autor tenta autoaprovar |
| 6 publicar | publisher | revisão aprovada, source policy | published version | URL inválida / revisão não aprovada |
| 7 retificar | editor→reviewer→publisher | nova revisão e fonte | diff e revisão | mudar prazo direto |
| 8 suspender | publisher/curador | motivo+evidência | evento temporal sem arquivar | suspensão sem origem |
| 9 arquivar | publisher | justificativa e versão | evento archive | editar arquivo sem restore |
| 10 consultar histórico | papel autorizado | minimização de PII | audit-read opcional | usuário comum acessa histórico privado |

## 7. Referência de testes — R2 canônico

Todos os IDs de testes (`EDT-*`, `TIM-*`, `SRC-*`, `DED-*`, `AUTH-*`, `BIL-*`, `ENT-*`, `PERF-*`, `PRIV-*`, `LOG-*`) têm **uma única autoridade normativa**: o catálogo do documento `11-TESTES-E-GATES.md`, seção **R2 — Catálogo canônico**. Este documento descreve regras do domínio, não redeclara a semântica dos casos. Identificadores antigos que colidiam estão preservados no mapa histórico daquele catálogo. Os cenários históricos R1 a seguir são **obsoletos como definição de ID** e não podem ser usados para aceitar um gate.

## R1 — AUD-03: instantâneo público transacional e imutável (D-06 PENDENTE)

**Alternativa A — snapshot público agregado (RECOMENDAÇÃO CONDICIONAL):** `EditalRevision.snapshot` contém representação **integral e imutável** do conteúdo exibível, inclusive arrays de anexos/requisitos, fontes oficiais, prazo com IANA e metadados de filtros; `Edital.published_revision_id` é referência verificável para **uma revisão aprovada do mesmo edital**. **Alternativa B:** todas as associações publicáveis apontam para `revision_id`; exige propagação consistente, maior risco de JOIN de revisão incorreta. Escolher A para o MVP por simplicidade transacional, mantendo B como opção de consulta derivada sobre a mesma versão. O proprietário ainda deve aprovar D-06 antes de migração que materialize CAT.

**Campos presos ao snapshot aprovado:** título/slug editorial, descrição, valor/min-max/moeda, modalidade e tipo de recurso, elegibilidade, setores, estágios, regiões, tags, cronograma, cada data/prazo com precisão/timezone, documentos exigidos, metadados públicos de anexos, URL oficial e referência à fonte, identificador oficial; os **valores de pesquisa e filtros são extraídos da mesma revisão**. Entidades globais `Institution` e códigos taxonômicos estáveis podem ser referenciados por IDs, mas rótulos relevantes de exibição e conteúdo da revisão precisam estar resolvidos/preservados para reproduzir o estado aprovado.

**Separação:** `Edital` é identidade e ponteiro; `EditalRevision` é conteúdo versionado; `PublicCatalogProjection` (conceito derivado/cache) identifica `(edital_id, published_revision_id, snapshot_digest)`; `SourceCheck` é telemetria independente append-only e pode atualizar `verification_status`/`last_checked_at` **sem alterar snapshot editorial**. Um novo prazo identificado na fonte **cria revisão candidata**, não altera prazo publicado; overlay de suspensão emergencial exige autorização e evento separado explicitamente definido em D-05/D-07, nunca mutação de conteúdo silenciosa.

**Publicação em uma transação:** validar actor publisher autorizado e revisão previamente aprovada distinta da sua autoria (exceção só ratificada); conferir `expected_published_revision_id`, `expected_edital_version`, `review_decision_id`, `snapshot_digest` e estado da fonte; atribuir ponteiro e publicar evento `RevisionPublished`/`AuditEvent` de forma atômica. Se revisão obsoleta, tentativa repetida concorrente, slug conflitante ou falha no commit → `409`, nenhuma projeção parcial. Idempotência do comando de publicação pela chave lógica `(edital_id, revision_id, publication_request_id)`. Listagem/detalhe públicos referenciam **o mesmo ponteiro**; ambos resolvem a versão no início da leitura e não juntam campos mutáveis de draft. Busca é reindexada por `revision_id`; atualização parcial da busca mantém versão anterior até projeção íntegra ou retorna estado conservador, sem exposição de rascunho.

| Caso | Regra e resultado esperado (somente conceitual) |
|---|---|
| Rejeição | revisão rejeitada persiste internamente; `published_revision_id` não muda |
| Retificação em preparação | snapshot público anterior continua idêntico até nova publicação |
| Dois publishers concorrentes | somente publicação serializável com versão esperada; outra retorna `409` e não duplica evento |
| Restauração | nova revisão com `restored_from_revision_id` e aprovação, nunca reescrever snapshot anterior |
| Mudança de prazo/doc/valor/elegibilidade | novos valores ficam ocultos até revisão aprovada; listagem e detalhe mudam juntos |
| Fonte indisponível | `SourceCheck=unavailable` e badge de verificação; último snapshot e prazo conhecido permanecem identificados como não reverificados |
| Falha no reindex | não expor novo registro parcial ou conteúdo não aprovado; fila/idempotência de atualização interna futura |
| Arquivamento | despublicar pela política proposta, preservando revisão e trilha; reativação somente via revisão/aprovação |

**Testes futuros:** EDT-04, EDT-07, EDT-08, EDT-09, TIM-07 e AUTH-04; observar `published_revision_id`, digest e respostas públicas antes e depois.

## R1 — AUD-06: contrato operacional de checagem manual diária (RNF06)

**ORIGINAL:** checar editais das fontes oficiais ao menos 1 vez/dia (REQ §6). **CONFLITO aberto:** processo manual do MVP não garante execução ininterrupta, especialmente fins de semana/feriados. Não declarar RNF06 atendido até prova operacional.

- **Universo diário U(d):** todas `Source` ativas cadastradas e todos editais publicados acompanhados no fechamento do dia anterior, mais entradas surgidas antes do horário de corte. Pausadas legalmente só saem de U por decisão auditada e motivo; fonte indisponível **não sai** do denominador.
- **Janela PROPOSTA:** dia civil `America/Sao_Paulo` de 00:00 a 23:59:59; tentativa concluída registrada dentro dessa janela (sem inventar timezone da instituição do edital). O proprietário deve ratificar horário de corte e staffing no Bloco D.
- **Operador:** responsável operacional nominal **PENDENTE** (cargo sugerido editor de dados); substituto **PENDENTE**; escala obrigatória inclui sábados/domingos/feriados ou registro explícito de incapacidade. Sem escala = risco de não cumprir RNF.
- **Evidência por fonte/edital:** `check_id,source_id,edital_id?,started_at,completed_at?,actor_id,method=manual,link_original,evidence_digest,result=verified_no_change|verified_changed|unavailable|invalid_link|inconclusive,observed_revision?,follow_up_at?,correlation_id`; não gravar cópia confidencial de terceiros indevidamente. `verified_*` apenas se conteúdo comparável foi efetivamente inspecionado; HTTP inacessível é tentativa, não verificação concluída.
- **Métrica HISTÓRICA SUPERADA POR R2 (apenas fontes):** `cobertura efetiva(d)=#fontes em U(d) com checagem verified_* concluída até corte / #fontes U(d)`; `taxa tentativas(d)=#fontes tentadas / #fontes U(d)`; `pendentes=U−concluídas efetivamente`; `age` = horas desde última checagem efetiva; falhas por resultado; `revisão necessária` conta editais com divergência não decidida. Guardar numerador/denominador/versionamento de U.
- **Processo e contingência:** fila diária atribuída, dupla verificação apenas para mudança crítica, fonte indisponível→tentar via canal oficial alternativo sem scraping, agendar retorno e escalar ao responsável; divergência de prazo→criar revisão editorial e sinalizar verificação pendente sem publicar automaticamente; link inválido→marca e tarefa manual; sobrecarga/sem operador→registrar **RNF06 NÃO CUMPRIDO**, escalar, não simular check; informar ao público a data real da última verificação, com aviso `fonte não verificada recentemente`.

### Exemplo histórico R1 (somente fontes; **INSUFICIENTE para RNF06**; substituído pela simulação R2)

| Dia em America/Sao_Paulo | A | B | C | Verificadas/U | Tentadas/U | Pendências e evento |
|---|---|---|---|---|---|---|
| seg 19/10/2026 | verificada | verificada | verificada | 3/3 = 100% | 3/3 | nenhuma |
| ter 20/10 | verificada | **indisponível** | verificada | 2/3 = 66,7% | 3/3 | B falhou; rechecagem/escalonamento |
| qua 21/10 | verificada (mudança de prazo) | verificada | verificada | 3/3 = 100% | 3/3 | revisão candidata A, público permanece na anterior |
| qui 22/10 | verificada | verificada | verificada | 3/3 = 100% | 3/3 | avaliar revisão de A |
| sex 23/10 | verificada | verificada | **atrasada (só dia seguinte)** | 2/3 = 66,7% | 2/3 | C pendente no corte; RNF falha |
| sáb 24/10 | verificada | verificada | verificada (rechecagem C) | 3/3 = 100% | 3/3 | atraso do dia anterior NÃO vira sucesso retroativo |
| dom 25/10 | verificada | verificada | verificada | 3/3 = 100% | 3/3 | cobertura semanal efetiva = 19/21 = **90,48%** |

**Critério proposto:** exigir 100% de verificações efetivas por dia para afirmar cumprimento literal. Nos dias 20 e 23 o RNF06 **FALHA**, apesar de tentativas honestas. Se a equipe não puder operar no fim de semana, deve declarar conflito e solicitar mudança humana do requisito/estratégia, nunca tratá-lo como exceção automática. Casos `SRC-01..07` são planejados; nenhuma rotina foi executada.

## R2 — Contrato canônico de cobertura por fonte e edital (R1-01)

**PROPOSTA R2; RNF06 original REQ §6.** Define-se por dia civil `d` no fuso `America/Sao_Paulo` (`00:00:00` inclusivo até `00:00:00` do dia seguinte exclusivo), com corte no final da janela. Hora de verificação gravada em UTC, exibida no fuso do relatório. Horário/capacidade/cargo precisam de aceite em D (D-11). **Nenhuma checagem real ocorreu.**

**Universos versionados:** `F(d)` = todas as fontes oficiais ativas acompanhadas em qualquer instante antes do corte, incluindo indisponíveis, mais fontes vinculadas a editais monitorados; exclusão apenas por decisão registrada previamente ao início da janela, sem retirada retroativa. `E(d)` = cada `Edital.id` publicado com acompanhamento vigente (inclusive já encerrado se ainda monitorado), mais editais ingressados até o corte; excluem-se somente editais formalmente arquivados e dispensados de acompanhamento por decisão auditada anterior à janela. Revisão em andamento não remove edital. Se edital for incluído no decorrer do dia, a obrigação começa no instante de ingresso e deve ser concluída até o corte; registrar `eligible_from` para reproduzir. Editais com múltiplas fontes contam **uma única vez** em `E(d)`.

**Fonte→edital:** `SourceReference(edital_id,source_id,role=primary|secondary, valid_from/to, source_official_evidence)`. Exigir uma fonte oficial primária por edital monitorado (ou exceção temporária `review_required`, bloqueando publicação conforme D-04), e permitir secundárias. Verificação de fonte só atesta a checagem de conteúdo editorial/institucional e disponibilidade da fonte segundo seu protocolo; **não** implica conclusão dos editais relacionados. Para cada edital, registrar `EditalSourceCheck(edital_id, source_id, evidence_id, examined_fields, compared_revision_id, outcome, started_at, completed_at, actor_id, correlation_id, is_effective)`; a conclusão exige conferência explícita de dados da oportunidade e sua situação atual em fonte oficial. Um mesmo documento oficial consolidado pode suportar vários editais somente quando evidencia, de forma individual identificável, cada `Edital.id`, seus dados relevantes e a comparação realizada; gerar `check_id` e resultado por edital, não fan-out automático da visita à fonte. Múltiplas fontes não elevam contagem além de 1 por edital/dia.

**Métricas independentes, por dia e janela (conjuntos deduplicados):**

| Métrica | Fórmula exata | Falha/observação |
|---|---|---|
| `source_coverage(d)` | `count(distinct source_id em F(d) com check efetivo até corte) / \|F(d)\|` | `verified_no_change`/`verified_changed` com evidência; HTTP 200 ou `unavailable` não são conclusão |
| `edital_coverage(d)` | `count(distinct edital_id em E(d) com check efetivo até corte) / \|E(d)\|` | verificação de página genérica não equivale a conferir edital; divergência documentada pode ser `verified_changed` com revisão em aberto |
| `source_attempt_rate(d)` | `fontes distintas com qualquer tentativa registrada no dia / \|F(d)\|` | tentativas incompletas entram aqui, não em coverage |
| `edital_attempt_rate(d)` | `editais distintos com tentativa individual registrada no dia / \|E(d)\|` | checagem de fonte não cria tentativa fictícia por edital |
| `source_overdue_count(d)` | `\|F(d)\| − fontes efetivamente verificadas até corte` | indicador inteiro; indisponibilidade soma pendência |
| `edital_overdue_count(d)` | `\|E(d)\| − editais efetivamente verificados até corte` | idem; jamais deduzir do total de fontes |

**Denominador zero:** apresentar `N/A (0 elegíveis)` para a métrica respectiva, armazenar prova do universo vazio e não afirmar PASS sem justificar ausência de obrigações; universo inteiro vazio requer auditoria humana da configuração. Falha ou atraso após corte não contam retroativamente, mesmo quando resolvidos no dia seguinte. Não reduzir os denominadores em finais de semana e feriados; ausência de substituto gera FAIL e escalonamento. Registro de evidência deve indicar ator, captura/consulta oficial com hash ou referência verificável, fields verificados, resultado e datas, sem armazenar material de terceiro sem base. `review_required`, fonte `unavailable`, erro de link e tentativa inconclusiva **não contam conclusão** até evidência individual adequada.

**Regra operacional para cada dia elegível:** `PASS` somente se `source_coverage=100%` **e** `edital_coverage=100%`, com evidências e até o corte, sem falsear dados; `FAIL` quando qualquer obrigação vencida não for concluída; `NÃO VERIFICADO` quando registros/universos faltarem ou não houver auditoria de evidência suficiente (não inferir PASS). A conformidade global requer todos os dias da janela acompanhada em PASS. O MVP manual permanece `CONFLITO` com a disponibilidade de equipe D-11: indicar responsável, substituto, plantões e comunicação pública da última checagem por edital antes de declarar que o RNF foi atendido.

## R2 — Resultado dos sete dias por dois universos (R1-01)

A simulação normativa usa três fontes A/B/C e seis editais A1/A2/B1/B2/C1/C2, todos fictícios. Fonte A completa com A2 pendente em 03/11 prova RNF06 FAIL. Totais fontes `19/21=90,48%` e editais `37/42=88,10%` **não são o mesmo indicador**. Tabela diária com tentativas, overdue e eventos está em `corretivos/bloco-0/R2/04-MATRIZ-RNF06.md`, incorporada como evidência; a autoridade sobre fórmulas e regras de corte está nesta seção R2. Dia com fonte 100% e edital <100% não é PASS; fim de semana sem operador = FAIL. Dados apenas simulados.
