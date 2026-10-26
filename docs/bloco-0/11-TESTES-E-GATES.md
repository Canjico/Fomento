# 11 — Estratégia de testes, critérios por bloco e gates

> **Documento de proposta para auditoria, versão 0.3-R2 · 26/10/2026.** Apenas o Bloco 0. As seções marcadas **PROPOSTA**, **PREMISSA** e **DECISÃO PENDENTE** não constituem autorização de implementação, contrato congelado ou política comercial aprovada.

**Registro histórico R1 (não normativo onde substituído por R2):** versão derivada do pacote v0.1, corrigida sob AUD-01–AUD-15. Todas as definições de R1 são **PROPOSTAS CONDICIONAIS**, não decisões aprovadas; a matriz D-01–D-28 em `03-DECISOES-E-CONFLITOS.md` prevalece como índice de gates. Nenhuma migração, implementação ou aceite foi executado. **Se houver divergência de testes, prevalece exclusivamente o catálogo R2 em `11-TESTES-E-GATES.md`.**

**Convenção de rastreabilidade:** `ORIGINAL` = conteúdo sustentado pelos anexos primários; `PROPOSTA` = desenho técnico; `PREMISSA` = hipótese; `DECISÃO PENDENTE` = aprovação requerida; `CONFLITO` = tensão entre fontes/planos. Referências: `REQ` (DOCX, página/seção), `ID` (PDF, página), `P02` e `P01` (planos mestres, seção).

## 1. Status dos testes

**Todos os testes de aplicação são roteiros conceituais: 0 executados, 0 pass, 0 fail, 0 skip de aplicação.** Foram verificadas apenas a estrutura, hashes e consistência documental no processo de geração. Não há app, banco, containers, endpoints ou dados de teste implantados.

## 2. Pirâmide de testes futura

| Camada | Objetivo | Ferramenta proposta | Escopo inicial |
|---|---|---|---|
| Unidade | domínio: status, validade, taxonomia, entitlement, autorização | Vitest | C–M; relógio fixo para prazos |
| Integração DB isolado | constraints, transações, schema real, replays e migrations reversíveis | PostgreSQL local futuro, Vitest | A,D,H,M; banco efêmero isolado |
| HTTP/contrato | erro authz, cache, validação, idempotência | Vitest/fetch local | C,D,E,F,G, M,O,S |
| E2E navegador | fluxo público/administrativo, mobile e sessão | Playwright | B–F, G–M, N–U |
| Acessibilidade | teclado, contraste, semântica/leitor de tela | axe/Playwright + revisão manual | B,F,V |
| Segurança adversarial | IDOR, CSRF, XSS, manipulação payment/evento, cross-tenant | casos negativos e análise especializada | C,G,H,M,N,T,U,V |
| Performance/robustez | 5.000 editais, latência e regressão, carga/restart | benchmark reproduzível local | E,V |

Capturar comandos exatos, exit codes, dataset, máquina, relógio/timezone, versões de dependência e hash/commit somente quando existir, pass/fail/skip sem maquiagem. Revisão independente deve reexecutar cenários, não confiar apenas em relatório.

## 3. Critérios de aceite e gates gerais

**Gate de cada bloco:** inspecionar predecessores aprovados, escopo/diff, matriz requisito, testes felizes/negativos pertinentes, docs, evidências e pendências; auditoria separada em Work, status `APROVADO / REPROVADO / APROVADO COM RESSALVAS EXPLÍCITAS` e aceite humano; sem push/deploy automáticos (P02 §8). `APROVADO COM RESSALVAS` não autoriza atravessar bloqueio de segurança ou fonte. Bloco 0 só produz material de auditoria.

**Gate MVP 1 após F:** matriz operacional abaixo. **Gate Cliente 2 após M:** `AUTH/ENT/BIL`, idempotência/concorrência, e-mail apenas local, zero envio/pagamento real. **Gate Final Local V:** matriz completa, benchmark local e inventário de limitações de produção.

## 4. Gate MVP 1 — roteiro E2E operacional planejado (não executado)

Pré-condição futura: A–F aceitos; app local com admin autorizado, banco/test runner isolados, seis ou mais fixtures fictícias (cinco publicadas e ao menos uma rascunho), relógio do teste controlado, captura de tela e logs sanitizados. **Nunca** usar editais reais com anúncio de publicação, nem acessar sites oficiais reais durante o teste. URLs de fonte: stub local ou domínio `.invalid` deliberadamente reservado; se CTA for acionado, conferir destino/aviso sem tráfego externo.

| Etapa | Procedimento planejado | Resultado de aceite / evidência |
|---|---|---|
| MVP-01 | subir stack **local** conforme scripts de A | smoke saudável, logs startup e hash/commit |
| MVP-02 | login admin e tentativa de acesso anônimo ao admin | admin entra; anônimo 401/redirect; captura+log |
| MVP-03 | criar ao menos seis editais: F1 aberto futuro; F2 encerrado; F3 suspenso; F4 prazo desconhecido; F5 prorrogado; F6 rascunho | todos rotulados FICTÍCIOS, dados divergentes de setor/região/valor/fonte, IDs persistidos |
| MVP-04 | salvar drafts, encaminhar revisão, aprovar e publicar F1–F5; manter F6 como draft e registrar revisão rejeitada em um fluxo isolado | só F1–F5 publicados aparecem; F6 oculto; decisões, autoria, prazo e suspensão exibidos corretamente |
| MVP-05 | abrir catálogo anonimamente sem login | páginas carregam, estado correto, sem drafts |
| MVP-06 | filtrar setor+estágio+região+tipo+status, limpar filtros, paginar | interseção exata, contagem estável, zero duplicações, query preservada |
| MVP-07 | buscar título e instituição; acentos/case; termo inexistente | resultados corretos e vazio informativo |
| MVP-08 | abrir detalhes, ficha, docs, última checagem, prazo e timezone | conteúdo persistido; ausentes explicitados; contador sem negativos |
| MVP-09 | clicar CTA de teste externo, verificar destino `example.invalid` ou stub local | destino seguro, nenhuma inscrição ou requisição real efetuada |
| MVP-10 | E2E viewport mobile e desktop (ao menos 375px e 1280px como PROPOSTA) | listas funcionais, sem overflow impeditivo, filtros acessíveis |
| MVP-11 | percorrer via Tab/Shift+Tab/Enter/Escape + leitor de tela | controles operáveis, foco visível, descrição de prazo não apenas cor; relatório axe+manual |
| MVP-12 | simular link inválido, falha de persistência, filtro vazio, URL ausente | falhas informativas e estado consistente, sem crash/confusão |
| MVP-13 | pedir URL de draft por slug/id | não público/404 mesmo com query direta, sem vazamento cache |
| MVP-14 | tentar publicar como editor, editar com versão obsoleta, ver auditoria | negado por papel, 409 para conflito, histórico autor/versão/instante |

**Consistência do dataset:** pelo menos cinco oportunidades fictícias *publicadas* e uma sexta em rascunho. A revisão rejeitada permanece como caso histórico separado. O teste não deve sacrificar um dos cinco estados publicados para comprovar ocultação de drafts.

Critério objetivo do gate: etapas MVP-01..14 reproduzidas com PASS documental/evidência; **zero violação de acesso/publicação e zero falha crítica de navegação**; falhas menores classificadas com owner e gate humano, não ocultadas. Devem ser testadas ao menos 5 oportunidades publicadas distintas + 1 draft; se não houver recursos suficientes, marcar BLOQUEADO, não maquiar.

## 5. Casos negativos transversais e referência

| Grupo | IDs | Resultado mínimo |
|---|---|---|
| Editor/prazo | EDT-01..08; TIM-01..07; SRC-01..03; DED-01..02 | versões/revisões fidedignas, fonte não inventada |
| Autorização tenant | AUTH-01..10, AUTH-11 | 403/404 sem dados cruzados, revogação/limites respeitados |
| Billing/entitlement | BIL-01..10; ENT-01..03 | sem concessão por client, replay, concorrência ou erro |
| Import e parceiro | ING-01, PART-01 | fonte externa não publica; moderação humana |
| B2B futuro | B2B-01 | avaliador não lê inscrição não atribuída |
| Dados pessoais/log | PRIV-01, LOG-01 | base/consentimento e logs minimizados |
| Performance | PERF-01 | com 5.000 ativos medir latência ≤2s conforme método aprovado |

## 6. Benchmark de desempenho local (planejado)

Fixture ≥5.000 editais **ativos** (diferentes taxonomias/prazos), hardware/CPU/RAM/disco definidos, baseline sem cache e com cache, N iterações e warmup, distribuição de filtros, métricas P50/P95/P99, hora, queries, memória, versões; aprovação específica sobre o que é “carrega até 2 s” (TTFB/DOMContentLoaded/LCP) antes da implementação. REQ RNF01 é teto solicitado, não prova que a meta foi atingida. RNF02 `99,5%` exige produção e não possui gate certificável local.

## 7. Evidências e veredito esperado

Evidências futuras: `docs/blocos/`, `artifacts/blocos/XX/`, hashes SHA-256, scripts executados com exit status, prints/descritivos acessíveis e logs de falhas. Teste skipped ou infraestrutura fora não vira pass. Auditoria independente usa os quatro insumos, cruza PRD/ERD/authz/editorial/billing e aponta bloqueadores e ressalvas sem iniciar novos blocos.

## R1 — AUD-07/08/09/10: cenários operacionais adicionais NÃO EXECUTADOS

### AUTH-11 — REGISTRO HISTÓRICO R1; substituído pelo protocolo R2 de duas fases

**GIVEN** base isolada fictícia com usuário `exists@example.test`, endereço inexistente, convite ativo, inexistente e expirado, relógio, conexão e IP de teste controlados. **WHEN** repetir 20 vezes cada classe nas rotas futuras de recuperação e solicitação/aceite de convite, variando token válido/inválido, e depois simular taxa excedida sob configuração ratificada. **THEN** respostas públicas não revelam existência de conta/convite quando pertinente; erros de token apresentados apenas ao portador legítimo; rate limiting neutro ao estado da conta; distribuições de tempo comparadas sob condições iguais, sem limiar de diferença aprovado inventado. A configuração candidata `5/15 minutos` deve ser ratificada antes C/G. **Evidências futuras:** request/response redigido, histogramas e logs auditados sem PII/token. `PASS` depende de endpoint real futuro, não deste relatório.

### Dataset Gate MVP 1 — REGISTRO HISTÓRICO R1, SUPERADO

O inventário de “dez editais” na v0.2 contava uma revisão rejeitada como se fosse edital. **Não utilizar para gates.** A seção canônica R2 deste documento e o relatório `03-FIXTURES-MVP1.md` definem E1–E10 como identidades distintas e revisões como entidades dependentes.

Os IDs EDT/TIM nesta seção histórica foram remapeados no catálogo R2; nenhuma redefinição antiga aqui é normativa.

### PERF-01 — REGISTRO HISTÓRICO R1; LCP primário foi substituído por métrica de lista pronta em R2

**ORIGINAL:** listagem <=2s com <=5.000 editais ativos (REQ p.3 §6), sem métrica/percentil. **PROPOSTA HISTÓRICA R1 SUPERADA, NÃO NORMATIVA:** tomar **LCP P95 <= 2.000 ms** como métrica primária da navegação **cold-cache** na página 1 em navegador real; registrar também TTFB P50/P95/P99, DOMContentLoaded, CLS, tempos SQL e total de bytes. LCP não foi exigido nominalmente pelo DOCX; se não for adequada ao objetivo, ratificar alternativa `navigationStart → renderização visível de linhas` com instrumento documentado antes do benchmark.

- Ambiente: estação isolada documentada com CPU modelo/cores, memória, SSD, SO, navegador e versões Node/PG/framework; escolher hardware de referência antes E, não declarar arbitrariamente um valor aprovado. Registrar limites cgroup/CPU throttle e resolução viewport `1440×900` e `390×844`.
- Base: **5.000 editais ativos/publicados**, pelo menos 20 instituições, 12 setores, 6 estágios, 5 modalidades e distribuição regional e de prazo incluindo nulos, fechados, suspensos, datas-limite. Seeds determinísticas com digest e índice SQL planejado/EXPLAIN futuro.
- Cenários: home sem filtro, texto por título/instituição, 2 e 4 filtros combinados, prazo asc/desc, nome, valor, páginas 1/50/última; paginação estável e consultas com resultados 0, poucos e muitos.
- Execução proposta: 5 warmups **não contados**, **30 amostras válidas por cenário e viewport** com cache cold no browser, execução adicional warm-cache medida separadamente; **concorrência 1 e 10 usuários** em lotes separados; clock monotônico e rede local/loopback sem serviços externos; iniciar banco limpo e descrever pré-aquecimento DB. Um cenário não é aprovado apenas porque mediana passa.
- Aprovação proposta: `P95(LCP) <= 2000ms` para **cada** cenário/viewport sob concorrência de referência ratificada; falha, timeout, erro 5xx, artefato ausente ou página inconsistente contam como falha e são registrados; P99/TFB informativos, sem fingir SLA produção. Testar repetições independentes e publicar sample CSV/JSON, trace, versão exata do app, migrations, seed/hash, comandos e exit codes.
- Comandos **futuros exemplificativos, NÃO EXECUTÁVEIS nesta fase sem scripts reais:** `npm run bench:seed -- --count=5000` e `npm run bench:public -- --cold --runs=30 --concurrency=10`. São contratos de CLI desejados, **não scripts existentes**; registrar `NÃO EXECUTADO` até bloco E/V.

**RNF02:** disponibilidade >=99,5% é indicador de produção, **NÃO VERIFICÁVEL** por este benchmark local. `RNF06`: a rotina diária do documento `05` também não é certificada por testes conceituais.

## R2 — Catálogo canônico de testes e equivalências (R1-02)

### R2 — Catálogo canônico, autoridade exclusiva (R1-02)

**ÚNICA DEFINIÇÃO ATIVA:** linhas abaixo, combinadas ao contrato transversal de GIVEN/WHEN/THEN. Todos os documentos `01–13` devem **referenciar** estes casos, não redefini-los; listas antigas no `05` e na seção R1 acima são registros históricos SUPERADOS. **Estado de todos: ESPECIFICADO CONCEITUALMENTE, NÃO EXECUTADO.** Em nenhum caso a presença do ID comprova PASS. Fila no bloco/gate indicado. Fluxos reais 401/403/409/422 são expectativas sujeitas a contrato HTTP final; observar resultado e ausência de mutação como oráculo.

**Pré-condições transversais:** ambiente local isolado e limpo; clock injetável; fixtures fictícias imutáveis E1–E10 (e outras por módulo conforme contrato), versões e memberships identificados; sessão/papel/entitlement pertinentes; banco de testes do bloco futuro. **GIVEN** = pré-condição indicada na tabela; **WHEN** = ação; **THEN** = resultado esperado verificável. **Evidência** = dados anonimizados, comandos+exit codes, event log e comparação de estado; quando algum requisito estiver pendente de decisão, oráculo final fica condicionado ao gate e não passa automaticamente.

| ID / nome | Requisito | Bloco | GIVEN / fixture | WHEN | THEN | Evidência futura / gate |
| --- | --- | --- | --- | --- | --- | --- |
| `EDT-01` — Draft oculto | RF03 | D/F | E9 em rascunho | consultar rota pública/lista | não expor E9:404 e nenhuma linha | snapshot, event-log sanitizado, transação/versões; D/F |
| `EDT-02` — Revisão publicada isolada | RF03 | D/F | E4 v2 publicada e v3 em revisão | ler lista e detalhe | ambos usam apenas o snapshot v2 | snapshot, event-log sanitizado, transação/versões; D/F |
| `EDT-03` — Rejeição auditável | RF03 | D | E8 revisão v2 submetida | revisor rejeita com motivo | rejeição persistida, v1 pública inalterada | snapshot, event-log sanitizado, transação/versões; D/F |
| `EDT-04` — Concorrência de revisão | RF03 | D | E1 v1 e dois editores leem versão idêntica | ambos salvam revisões condicionais | uma atualização aceita, outra 409, nenhum overwrite | snapshot, event-log sanitizado, transação/versões; D/F |
| `EDT-05` — Imutabilidade na restauração | RF03 | D | E2 versões v1/v2 e restaurador autorizado | restaurar conteúdo histórico | criar v3; v1/v2 e audit trail intactos | snapshot, event-log sanitizado, transação/versões; D/F |
| `EDT-06` — Separação de papéis | RF03 | C/D | editor sem papel publisher | tenta publicar revisão aprovada | 403 e nenhuma troca de published_revision_id | snapshot, event-log sanitizado, transação/versões; D/F |
| `EDT-07` — Retificação ainda não publicada | RF03 | D/F | E4 v2 pública e v3 retificação pendente | consultar lista/detalhe/filtros | somente v2 exibida em todas as projeções | snapshot, event-log sanitizado, transação/versões; D/F |
| `EDT-08` — Correção de PII em trilha | RNF04 | G/V | evento com PII de teste e política ratificada | solicitar tratamento | redaction/tombstone controlado, retenção do evento minimizado | snapshot, event-log sanitizado, transação/versões; G/V |
| `EDT-09` — Restauração formal | RF03 | D | E2 v2 publicado, autor autorizado | submeter restauração para revisão/publicação | aprovação gera v3 com link a v1 e evento único | snapshot, event-log sanitizado, transação/versões; D/F |
| `EDT-10` — Edição pública bloqueada | RF03 | D/F | E4 v2 publicada | editor muda docs/prazo em rascunho v3 | digest público inalterado até aprovação | snapshot, event-log sanitizado, transação/versões; D/F |
| `EDT-11` — Publicação concorrente | RF03 | D | E8 revisão aprovada, dois publishers e expectedVersion igual | ambos publicam simultaneamente | exatamente um commit e um 409; evento único | snapshot, event-log sanitizado, transação/versões; D/F |
| `EDT-12` — Rejeição preserva ponteiro público | RF03 | D | E8 v1 publicada e candidata v2 | revisor rejeita candidata | ponteiro segue v1, decisão auditável | snapshot, event-log sanitizado, transação/versões; D/F |
| `TIM-01` — Publicado expirado | RF01 | E/F | E2 vencido e publicado | avaliar relógio de teste | estado encerrado; não arquivado | instantes UTC/IANA + texto original + snapshot; D/F |
| `TIM-02` — Suspensão prevalente | RF01 | D/F | E3 prazo futuro e suspensão ativa | calcular status | suspenso e sem declaração enganosa de aberto | instantes UTC/IANA + texto original + snapshot; D/F |
| `TIM-03` — Prorrogação como histórico | RF03 | D/F | E4 prazo atualizado com prova oficial | calcular status | aberto + indicador de prorrogação; histórico intacto | instantes UTC/IANA + texto original + snapshot; D/F |
| `TIM-04` — Prazo ausente | RF03 | D/F | E5 sem fim e sem fonte afirmando continuidade | calcular status | desconhecido; CTA pede confirmar fonte | instantes UTC/IANA + texto original + snapshot; D/F |
| `TIM-05` — Fonte indisponível | RNF06 | D/F | E4 com último prazo e fonte unavailable | ler detalhe | preservar último prazo rotulado não revalidado | instantes UTC/IANA + texto original + snapshot; D/F |
| `TIM-06` — Limite temporal exato | RF01 | E/F | E8 encerramento com instante explícito UTC | avaliar antes/no/depois da fronteira | inclusividade segue decisão D-12; nenhum estado ambíguo | instantes UTC/IANA + texto original + snapshot; D/F |
| `TIM-07` — Virada de timezone | RF01 | E/F | E1 com zona IANA, relógios em transição | variar instante UTC ao redor do dia local | status resulta de instantes e zona declarada | instantes UTC/IANA + texto original + snapshot; D/F |
| `TIM-08` — A iniciar e outros eixos | RF01 | E/F | E6 futuro, E3 suspenso, E4 prorrogado | renderizar resultados | a iniciar / suspenso / aberto prorrogado separadamente | instantes UTC/IANA + texto original + snapshot; D/F |
| `TIM-09` — Suspensão revertida | RF01 | D/F | E3 suspenso e fonte autoriza reabrir | registrar evento de reversão | estado recalculado, sem apagar suspensão | instantes UTC/IANA + texto original + snapshot; D/F |
| `TIM-10` — Data sem hora | RF03 | D/F | E7 somente data 12/11 e zona IANA | avaliar próximo à meia-noite | não inventar 23:59:59; incerteza explicada sob D-12 | instantes UTC/IANA + texto original + snapshot; D/F |
| `SRC-01` — Link inválido | RNF06 | D/F | URL oficial fictícia inválida | abrir detalhe | sinalizar destino indisponível | registros com fonte/edital, relógio, evidência, contagens; D/F |
| `SRC-02` — Domínio alterado | RNF06 | D/F | URL mudou desde última revisão | checagem manual | exigir prova oficial; não aprovar sem fonte | registros com fonte/edital, relógio, evidência, contagens; D/F |
| `SRC-03` — Erro de checagem | RNF06 | D/F | fonte temporariamente indisponível | registrar tentativa | não contar conclusão; manter prova anterior | registros com fonte/edital, relógio, evidência, contagens; D/F |
| `SRC-04` — Fonte com edital pendente | RNF06 | D/F | fonte A verificada e E-A2 sem check | fechar dia | source coverage 100% parcial vs edital coverage <100%; RNF06 FAIL | registros com fonte/edital, relógio, evidência, contagens; D/F |
| `SRC-05` — Revisão detectada | RNF06 | D/F | edital mudou em fonte oficial | registrar divergência | criar revisão pendente, não trocar snapshot | registros com fonte/edital, relógio, evidência, contagens; D/F |
| `SRC-06` — Falha em fonte mantém status | RNF06 | D/F | fonte B indisponível e prazo antigo | consultar detalhe | mostrar última checagem não revalidada | registros com fonte/edital, relógio, evidência, contagens; D/F |
| `SRC-07` — Corte diário e atraso | RNF06 | D/F | fonte concluída após fim da janela | fechar dia anterior | dia anterior FAIL, sem reclassificação retroativa | registros com fonte/edital, relógio, evidência, contagens; D/F |
| `SRC-08` — Cobertura por edital | RNF06 | D/F | 6 editais em 3 fontes | calcular ambas coberturas | numeradores independentes e logs por edital | registros com fonte/edital, relógio, evidência, contagens; D/F |
| `DED-01` — Suspeita não mescla | RF01 | D | dois candidatos semelhantes | processar possível duplicidade | fila de revisão; nenhum merge automático | request/response + trace + estado versionado; D |
| `DED-02` — Título repetido válido | RF01 | D | duas instituições com título igual | deduplicar | preservar ambos Edital.id | request/response + trace + estado versionado; D |
| `AUTH-01` — Visitante não gerencia admin | RNF04 | C/D | visitante anônimo | POST /admin/edital | 401/403 sem mutação | request/response + trace + estado versionado; C/D |
| `AUTH-02` — Usuário não autorizado por empresa | RNF04 | G | U sem membership A | GET dado A | 403/404 e nenhuma informação | request/response + trace + estado versionado; G |
| `AUTH-03` — Membership revogado | RNF04 | G | U antigo membro A | consulta de contexto A | DENY mesmo com token antigo | request/response + trace + estado versionado; G |
| `AUTH-04` — Editor não publica | RNF04 | C/D | Editor ativo sem publish | publicar revisão | 403 e evento mínimo | request/response + trace + estado versionado; C/D |
| `AUTH-05` — Self-approval não autorizado | RNF04 | D | Editor da revisão | tenta aprovar | 403 quando quatro-olhos ratificado | request/response + trace + estado versionado; D |
| `AUTH-06` — Troca de org indevida | RNF04 | G | U membro A sem B | substituir org_id por B | 403/404; sem acesso cross-tenant | request/response + trace + estado versionado; G |
| `AUTH-07` — Convite alterado | RNF04 | G | U com convite para A | trocar id de destino | denegar e auditar | request/response + trace + estado versionado; G |
| `AUTH-08` — Privilégio expirado | RNF04 | G | papel removido | reutilizar sessão antiga | permissão recalculada e DENY | request/response + trace + estado versionado; G |
| `AUTH-09` — Auditoria somente leitura | RNF04 | C/D | audit_reader | tentar editar/exportar fora de escopo | 403 e trilha de tentativa | request/response + trace + estado versionado; C/D |
| `AUTH-10` — Permissão por objeto | RNF04 | D | Publisher fora do escopo | publicar edital indevido | negação, sem ponteiro publicado | request/response + trace + estado versionado; D |
| `AUTH-11` — Anti-enumeração e abuso separados | RNF04 | C/G | usuários/convites fictícios | executar fases A/B separadas | classes indistinguíveis na A; limite efetivo sem vazamento na B | request/response + trace + estado versionado; C/G |
| `AUTH-12` — Consulta auditada | RNF04 | C/D | audit_reader com escopo limitado | abrir eventos sensíveis | mascarar campos; leitura registrada | request/response + trace + estado versionado; C/D |
| `BIL-01` — Checkout não concede | RF05/RF06 | M | plano Pro só selecionado | abrir checkout | sem benefício pago | request/response + trace + estado versionado; M |
| `BIL-02` — Confirmação válida libera | RF05/RF06 | M | BillingEvent verificado | confirmar pagamento simulado | ENT concede ao sujeito correto | request/response + trace + estado versionado; M |
| `BIL-03` — Pagamento recusado | RF05/RF06 | M | attempt refused | consultar direitos | permanece Free | request/response + trace + estado versionado; M |
| `BIL-04` — Replay idempotente | RF05/RF06 | M | mesmo eventId | reentregar 2 vezes | única transição | request/response + trace + estado versionado; M |
| `BIL-05` — Webhook falso | RF05/RF06 | M | assinatura de evento inválida | enviar evento fictício | rejeitar sem liberar | request/response + trace + estado versionado; M |
| `BIL-06` — Concorrência pagamentos | RF05/RF06 | M | dois eventos simultâneos | processar ambos | estado comercial consistente | request/response + trace + estado versionado; M |
| `BIL-07` — Cancelamento repetido | RF05/RF06 | M | assinatura ativa | cancelar duas vezes | efeito idempotente auditado | request/response + trace + estado versionado; M |
| `BIL-08` — Downgrade e cota | RF05/RF06 | M | usuário com >3 salvos | aplicar downgrade | sem apagar pessoal; bloquear novos | request/response + trace + estado versionado; M |
| `BIL-09` — PII não vaza | RF05/RF06 | M | empresa com CNPJ de teste | consultar logs | mascarar identificadores | request/response + trace + estado versionado; M |
| `BIL-10` — Sem serviços externos | RF05/RF06 | M | gateway simulado local | executar fluxo | zero chamadas externas | request/response + trace + estado versionado; M |
| `ENT-01` — Free concorrente | RF04 | H/L/M | 2/3 favoritos, duas gravações | salvar ambas | uma aceita, final 3 | request/response + trace + estado versionado; H/L/M |
| `ENT-02` — Contexto multiempresa | RF04 | H/L/M | membro A Pro e B Free simulado | alternar A/B | escopo A não eleva B | request/response + trace + estado versionado; H/L/M |
| `ENT-03` — Sem confirmação não libera | RF04 | H/L/M | escolha plano Pro sem evento | salvar quarto | negado; só conceder no contexto após M | request/response + trace + estado versionado; H/L/M |
| `PERF-01` — Primeira página pronta em até 2s | RNF01 | E/V | 5000 ativos, datasets e cache controlados | medir renderização, ordem, filtros e interatividade | P95 da lista pronta ≤2000ms por cenário proposto; LCP isolado não aprova | trace E2E + time series + CSV + seed hash; E/V |
| `PRIV-01` — Minimização e exclusão | RNF04 | G/V | dados pessoais sintéticos com motivo legal | solicitar exclusão | atender política; reter só o permitido | request/response + trace + estado versionado; G/V |
| `PRIV-03` — Escopo auditor privado | RNF04 | C/D | audit_reader sem escopo PII | consultar payload | redaction e acesso negado se fora escopo | request/response + trace + estado versionado; C/D |
| `LOG-01` — Não vazar segredo | RNF04 | C/V | requests com PII e token fictícios | registrar logs de erro | segredos ausentes nos logs | request/response + trace + estado versionado; C/V |

**Inventário completo:** famílias EDT, TIM, AUTH, SRC, DED, ENT, BIL, PERF, PRIV e LOG; intervalos genéricos usados nos roteiros (`AUTH-01..10`, `BIL-01..10` etc.) referem-se exatamente aos códigos acima. Novos IDs não são criados por menção a uma família. Qualquer teste sem fixture ou oráculo aprovado permanece **condicionado**, mesmo catalogado. Casos de segurança não são prova de segurança dinâmica, e casos de produção não comprovam conformidade regulatória.

#### Mapeamento histórico sem colisão

| Referência histórica | Significado histórico / origem | ID ativo | Tratamento |
|---|---|---|---|
| `EDT-04`, 05 §7 v0.2 | Duas revisões concorrentes | `EDT-04` | preservado |
| `EDT-04`, 11 R1 v0.2 | Editar conteúdo não aprovado e checar público | `EDT-10` | novo ID, sem redefinir EDT-04 |
| `EDT-07`, 05 §7 v0.2 | Retificação não publicada | `EDT-07` | preservado |
| `EDT-07`, 11 R1 v0.2 | Dois publicadores simultâneos | `EDT-11` | novo ID |
| `EDT-08`, 05 §7 v0.2 | PII e audit trail | `EDT-08` | preservado |
| `EDT-08`, 11 R1 v0.2 | Revisão rejeitada em E8 | `EDT-12` | novo ID |
| `TIM-06`, 05 §3 v0.2 | Limite temporal exato | `TIM-06` | preservado |
| `TIM-06`, 11 R1 v0.2 | Prazo apenas data | `TIM-10` | novo ID |
| `TIM-07`, 05 §3 v0.2 | Virada de timezone | `TIM-07` | preservado |
| `TIM-07`, 11 R1 v0.2 | Instante exato de fim | `TIM-06` | reuso do significado canônico, sem redefinição |

As origens históricas constam nos pacotes v0.1/v0.2 preservados e no diff R2. O teste de unicidade de significados é documental e será refeito na auditoria R2.

## R2 — Protocolo AUTH-11 segregado (R1-04)

**R1-04 — uma identidade canônica com subfases `AUTH-11A` e `AUTH-11B`; executadas separadamente no futuro.** O objetivo de A é anti-enumeração, o de B é resistência a abuso. **Não misturar amostras.** `AUTH-11` somente passa se A e B passarem. Decisão sobre limites permanece pendente D-07/segurança do gate C/G.

| Fase | GIVEN | WHEN | THEN / oráculo verificável | Evidências |
|---|---|---|---|---|
| A — comparação | Ambiente local isolado, mesma versão de banco e sessão; 2 contas presentes/2 ausentes, 2 convites ativos/2 inexistentes, todos `example.test`; buckets de rate limit isolados e reiniciados simetricamente entre amostras | Executar **40 amostras por classe** em ordem intercalada e embaralhada com seed registrada; reset lógico antes de cada par; comparar rotas equivalentes de recuperação/convite | respostas públicas da mesma família com códigos HTTP, corpo e tamanho normalizados; mensagens não revelam identidade; timing sem separação sistemática sob limiar estatístico **proposto**, a ratificar | CSV com seed, code, body hash, payload_size, duração monotônica, ambiente, nenhum token/PII |
| B — proteção contra abuso | Novos buckets de teste; limite candidato **5 requisições/15 min** POR IP+rota+hash sujeito normalizado, *não aprovado*; contas de teste simétricas; clock congelável | enviar `limite+1` tentativas e avançar relógio para recuperação; repetir presente/ausente; verificar resets | rate limit responde genericamente `429` ao excesso com recuperação consistente; não revelar identidade/convite; sem bloquear indevidamente outra conta legítima na mesma chave conforme política ratificada | respostas e 429, timestamps, chaves sanitizadas, contador, reinicialização demonstrada |

**Métrica timing A:** comparar mediana e P95 de cada classe com estratificação por latência de rede; propor equivalência operacional de diferença absoluta de mediana e P95 de no máximo `max(50ms, 10% do tempo de referência)` entre pares comparáveis, exigindo IC de 95% para diferença contido nessa margem sob bootstrap pré-registrado. **Limiar experimental a ratificar**, não prova de ausência de side-channel nem garantia para produção; não declarar indistinguível apenas por não-significância estatística. Requisito objetivo de aceitação deve ser ratificado antes C/G; se não houver amostras suficientes, `NÃO VERIFICADO`. Não desativar proteção em ambientes reais; isolamento é condição experimental. Limitações técnicas de reset e política de abusos são pendentes, não inventadas como atendidas. Cenários de tokens existentes/inexistentes devem seguir mesmo tratamento público antes de prova de posse. `AUTH-11A/B` são subcasos, não IDs de testes de outras famílias.

## R2 — Contrato de PERF-01 lista efetivamente pronta (R1-05)

**R1-05 — PROPOSTA para D-23 e gate E, não métrica aprovada pelo DOCX.** `navigation_start → catalog_ready`: instante monotônico em navegador E2E quando **a primeira página correta** contém o número esperado de linhas e IDs, títulos, instituições, datas/prazos e ordenação correspondentes a oráculo derivado do seed; filtros selecionados aparecem refletidos; requisição sem erro; skeletons encerrados; componentes e controles essenciais hidratados e operáveis por teclado; nenhum placeholder tomado por dado real. DevTools/trace registram `catalog_ready`, não uma promessa isolada de `data-ready=true`: o E2E deve verificar DOM e conteúdo contra expected JSON **antes** de aceitar o marco. Invalida ready se filtros/linhas mudarem indevidamente após o evento.

**Oráculo**: fixture determinística de 5.000 `Edital.id` ativos (publicação e status definidos explicitamente), 20 instituições, 12 setores, 6 estágios, 5 modalidades, prazos/zonas variados. Seed SHA-256, paginação aprovada (ex. 25/50 por página), ordenação total incluindo tie-break por `edital_id`. Cenários: inicial; título; instituição; 2 e 4 filtros; sem resultados; primeiro, intermediário, última página; ordenação prazo, valor e nome; desktop 1440×900 e mobile 390×844. Para cada cenário, validar IDs/ordem/cardinalidade contra consulta-oráculo independente sem confiar na contagem do browser.

**Ambiente e execução futura:** CPU modelo/cores e RAM, armazenamento, versões OS/Node/PG/Next/browser, Docker/host, perfil de throttling, rede loopback sem externas, recursos limitados, estado do cache separado frio/quente (cold browser cache não necessariamente cold DB), warmups=5 **não contabilizados**, 30 amostras válidas por cenário/viewport, concorrência 1 e 10 em lotes separados, ordem das consultas intercalada, tempos monotônicos e no mínimo um cold-start reprodutível. **Critério de aprovação proposto**: P95(`catalog_ready` − `navigation_start`) ≤ **2.000ms para cada cenário, viewport e concorrência de referência aprovada**, sem falhas 5xx, placeholder falso ou dados incorretos; timeout/erros contam FAIL (não filtrar amostras ruins). TTFB, LCP, DCL, SQL, EXPLAIN e tamanho de resposta são auxiliares; LCP menor que 2s **não** aprova. `99,5%` (RNF02) somente produção, não inferível localmente.

**Negativo obrigatório:** cabeçalho em 500ms, LCP em 700ms, linhas corretas em 3000ms → `catalog_ready=3000ms` → **FAIL**, mesmo que LCP passe. Evidências futuras CSV/JSON por amostra (tempo, contexto, hash seed, IDs esperados/observados), trace Playwright, screenshot, configuração hardware e comandos realmente existentes com códigos de saída; se script não existir, marcar não executado, nunca inventar comando bem-sucedido. Escopo de execução previsto: E e V, **não neste Bloco 0**.

## R2 — Gate de checagem diária (R1-01)

Casos `SRC-04`, `SRC-07` e `SRC-08` estão no catálogo R2. GIVEN F(d) com 3 fontes e E(d) com 6 editais, WHEN A é conferida e A1 é validado mas A2 não, THEN `source_coverage` pode permanecer `3/3`, enquanto `edital_coverage=5/6`, `RNF06=FAIL` e A2 entra em `edital_overdue_count`. Evidence futura: universo versionado, checks fonte+edital, relógio IANA, resultados e log de escalonamento. Ver relatório `04-MATRIZ-RNF06.md`; nenhuma execução funcional.

## R2 — Inventário formal E1–E10 e rastreio por revisão (R1-03)

**Fonte normativa das fixtures:** tabela do relatório `corretivos/bloco-0/R2/03-FIXTURES-MVP1.md` incorporada como matriz detalhada. Contagem: **10 Edital.id distintos = 8 publicados E1–E8 + 2 rascunhos E9–E10**; E8/v2 rejeitada é revisão do E8, não novo Edital; publicação concorrente é em branch de cenário isolado. Relógio base `2026-11-10T12:00:00-03:00`, timezones IANA/precisão explícitos, URLs `.example.invalid`. Cenários vinculados EDT-01,04,07,09,10,11,12 e TIM-01..10 no catálogo R2. Fixtures são plano futuro e gate necessita resultados/trace/DB reais.
