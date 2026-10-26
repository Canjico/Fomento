# 13 — Auto-checagem do pacote do Bloco 0

> **Documento de proposta para auditoria, versão 0.3-R2 · 26/10/2026.** Apenas o Bloco 0. As seções marcadas **PROPOSTA**, **PREMISSA** e **DECISÃO PENDENTE** não constituem autorização de implementação, contrato congelado ou política comercial aprovada.

**Registro histórico R1 (não normativo onde substituído por R2):** versão derivada do pacote v0.1, corrigida sob AUD-01–AUD-15. Todas as definições de R1 são **PROPOSTAS CONDICIONAIS**, não decisões aprovadas; a matriz D-01–D-28 em `03-DECISOES-E-CONFLITOS.md` prevalece como índice de gates. Nenhuma migração, implementação ou aceite foi executado. **Se houver divergência de testes, prevalece exclusivamente o catálogo R2 em `11-TESTES-E-GATES.md`.**

**Convenção de rastreabilidade:** `ORIGINAL` = conteúdo sustentado pelos anexos primários; `PROPOSTA` = desenho técnico; `PREMISSA` = hipótese; `DECISÃO PENDENTE` = aprovação requerida; `CONFLITO` = tensão entre fontes/planos. Referências: `REQ` (DOCX, página/seção), `ID` (PDF, página), `P02` e `P01` (planos mestres, seção).

## 1. Escopo da auto-checagem

Revisão **interna** do pacote, não auditoria independente, aprovação humana nem certificação de aplicação. Fontes primárias REQ DOCX e ID PDF; planos P01/P02 encontrados e incorporados. O manifesto `00` será gerado após os outros arquivos para incluir hashes sem autorreferência.

## 2. Resultados de cobertura e coerência (planejados e validados ao empacotar)

| Verificação | Critério | Resultado esperado / ressalva |
|---|---|---|
| DOC-01 | 14 Markdown nomeados, não vazios | verificação física automatizada na montagem do ZIP |
| DOC-02 | hashes SHA-256 de originais e dos outros 13 docs no `00` | automatizado; manifesto nunca lista seu próprio hash |
| DOC-03 | RF01–RF10 mapeados com fonte, blocos e caso | 10/10 documentados no `01`; sem execução de testes |
| DOC-04 | seis RNFs originais e sete fases + além da fase 7 | `01`,`02`,`11`,`12` |
| DOC-05 | 23 blocos, scope, dependências, testes, riscos, gates e exclusões | `12`, contagem validável |
| DOC-06 | quatro personas e papéis internos separados | `01`,`02`,`04`,`08` |
| DOC-07 | três eixos de edital e publicação sem prazo implícito | `05`,`07`,`08`,`11` |
| DOC-08 | favoritos pessoais e multiempresa tratados sem inferência | `03` D-02, `04`,`07`,`09` |
| DOC-09 | billing só simulado, nenhum cartão armazenado | `06`,`09`,`10`,`11` |
| DOC-10 | estética PDF sem usá-lo como wireframe | `08` ID p.2–13 |
| DOC-11 | threat model, priorização e testes negativos | `10`,`11` |
| DOC-12 | sete itens A01–A07 da auditoria e A08 gate UX | `03`,`04`,`05`,`06`,`10`,`11`,`12` |
| DOC-13 | itens não verificáveis e decisões bloqueadoras | `03`,`10`,`11`,`13` |

## 3. Consistência cruzada — riscos explícitos, não encobertos

1. **PRD ↔ AUTHZ ↔ ERD:** `SavedEdital` combina `owner_user_id` e contexto organizacional opcional, alinhado à frase “lista pessoal” (RF04). A regra de quota não está decidida (D-02); implementação de H bloqueada.
2. **Estados ↔ admin ↔ testes:** revisão pode existir enquanto versão publicada segue pública; “prorrogado” é evidência, não estado exclusivo; suspensão não arquiva. D-05/06/07 pendentes, mas risco explicitado.
3. **Entitlement ↔ billing ↔ escopo:** `Subscription` pertence à organização como proposta D-26, enquanto favorites são pessoais; resolver ownership antes de G/H/M para não liberar acesso indevidamente.
4. **Catálogo ↔ proveniência:** fonte verificada não torna prazo aberto; atualização diária manual sujeita à capacidade (C-02).
5. **MVP UX ↔ RF04:** o botão de estrela é original, mas salva de verdade só em H. Não mentir que visitante sem conta salvou.
6. **Planos ↔ operações humanas:** Assessoria tem 5 usuários, mas não SLA/quantidade de revisões, e limite de empresas não é inferido.
7. **Marcos ↔ RNFs:** tempo de 2s/5.000 é objetivo de benchmark futuro; SLA 99,5% e gateway certificados não podem ser comprovados no laboratório.

## 4. Achados abertos e severidade

| Achado | Severidade | Situação de auto-checagem | Consequência |
|---|---|---|---|
| D-01/03/06/08: stack, tenant, revisão e módulos não ratificados | BLOQUEADOR para A | ABERTO e rastreado | não iniciar A |
| D-02/26: favorito pessoal, plano/org | BLOQUEADOR para G/H/M e decisão arquitetural antes de A | ABERTO | sem migrations definitivas |
| D-07/22: separação de poder, LGPD/retenção | ALTO | ABERTO | sem declarar segurança/conformidade |
| D-04/05/11/12/13/25: prazo, fonte, duplicidade | ALTO, bloqueia D–F | ABERTO | sem mostrar “aberto” sem evidência |
| D-15/16/20/21: comercial, assessor, cota | MÉDIO/ALTO, posterior | ADIÁVEL | sem cobrar nem prometer serviço |
| C-02: operação manual não garante atualização diária | ALTO | CONFLITO documentado | KPI diário proposto, ainda não provado |
| RNF02 99,5%, LGPD produção e PCI externo | NÃO VERIFICÁVEL localmente | LIMITAÇÃO documentada | sem certificação |

## 5. Verificações **não executadas**

- Aplicação, frontend/backend, login real, integração PostgreSQL, migrations, tests unitários/HTTP/E2E, desempenho, contraste automatizado, leitor de tela real, análise dinâmica de vulnerabilidades: **NÃO EXECUTADOS**, porque Bloco 0 proíbe código e execução.
- Validade jurídica/licença/obtenção de arquivo web Anek Tamil: **NÃO VERIFICADO**, sem acesso contratado e sem download de terceiros.
- Disponibilidade real de fontes oficiais, mensagens reais, transação financeira, conectores externos, produção, compliance PCI-DSS e LGPD: **NÃO VERIFICADOS**, fora do escopo.
- Auditoria independente: **NÃO EXECUTADA** e deve ocorrer em execução separada.

## 6. Verificações documentais efetivamente executadas (25/10/2026)

| Verificação | Procedimento reproduzível / ferramenta | Resultado | Evidência |
|---|---|---|---|
| CHECK-01 | Abrir DOCX localmente como OOXML; extrair parágrafos/tabelas e procurar RF01–RF10 | **PASS**: 10 IDs encontrados; 4 personas, 3 planos e 7 fases conferidos | Anexo `REQ` + matriz `01` |
| CHECK-02 | Abrir PDF local com PyMuPDF e contar páginas; inspecionar representações de marca do arquivo | **PASS**: 13 páginas; p.2–4 marca, p.5 cores, p.7 Anek Tamil, p.9 slogan, p.10–11 peças sociais | Anexo `ID` + `08` |
| CHECK-03 | SHA-256 dos quatro arquivos de entrada, incluindo planos da biblioteca | **PASS**: quatro SHA-256 registrados | `00`, tabela de insumos |
| CHECK-04 | Enumerar paths `docs/bloco-0/*.md` e checar tamanho não trivial | **PASS**: 14 arquivos Markdown, todos não vazios | tabela de `00`; archive ZIP |
| CHECK-05 | Contar cabeçalhos `### Bloco` no `12` | **PASS**: 23 blocos (0 + A–V) | `12`, seção 3 |
| CHECK-06 | Conferir hashes dos outros 13 documentos contra o manifesto `00` | **PASS**: 13/13; manifesto exclui próprio hash | `00`, seção 3 |
| CHECK-07 | Validar CRC (`ZipFile.testzip`) e comparar byte-a-byte cada membro empacotado com o arquivo de origem | **PASS**: 16 membros, 14 entregáveis MD + 2 planos; 0 corrupção | ZIP final |
| CHECK-08 | Revisão cruzada manual de ownership/editorial/billing/UX e decisões da auditoria preliminar | **PARCIAL**: lacunas C-01..08 e D-01..28 registradas; sem aceite externo | `03`,`04`,`05`,`06`,`07`,`08`,`09`,`11` |

**Reprodutibilidade:** extrair o ZIP, conferir os SHA-256 com utilitário local (`sha256sum` ou `Get-FileHash -Algorithm SHA256`) e confrontar com `00`. O PDF/DOCX não são repetidos no ZIP leve e precisam ser fornecidos como anexos originais ao auditor. A inspeção cruzada é **auto-checagem**, não verificação independente, e não demonstra comportamento de software.

## 7. Veredito desta auto-checagem v0.1 — histórico, SUPERADO pelo R1

**PRONTO PARA AUDITORIA INDEPENDENTE (somente documentação; condicionado à integridade verificada do ZIP).** Não significa arquitetura ratificada, Bloco 0 aprovado nem autorização do Bloco A. Questões pendentes são entregáveis explícitos para a auditoria/humano. Se uma checagem de empacotamento falhar, a classificação deve passar a **BLOQUEADO**. Este documento não atesta sozinho os hashes finais: a verificação física do pacote e o `00` são a evidência correspondente.

## R1 — checklist dos 15 achados e limites de autocertificação

Esta seção substitui qualquer interpretação de que a auto-checagem v0.1 continua válida para v0.2. A presença textual é verificada documentalmente; revisão independente ainda não ocorreu.

| Item | Situação documental R1 | Referência | Ressalva |
|---|---|---|---|
| AUD-01 | CORRIGIDO CONDICIONALMENTE | 04/09, D-02/D-26 | recomendação ainda precisa de aceite |
| AUD-02 | CORRIGIDO DOCUMENTALMENTE | 07, FAV-UNI | escolha índice/PG futuro |
| AUD-03 | CORRIGIDO CONDICIONALMENTE | 05/07/06, EDT-04/07 | D-06 e transação futura |
| AUD-04 | CORRIGIDO CONDICIONALMENTE | 06/09/12, ENT-01..03 | aprovação H/L/M futura |
| AUD-05 | CORRIGIDO DOCUMENTALMENTE | 03 §matriz única; 07/12 referência | conferir migrations A antes autorização |
| AUD-06 | CORRIGIDO CONDICIONALMENTE | 05 semana simulada, SRC | operador/escala não designados; RNF06 pode falhar |
| AUD-07 | CORRIGIDO CONDICIONALMENTE | 04/11 AUTH-11 | ratificar rate limit antes C/G |
| AUD-08 | CORRIGIDO CONDICIONALMENTE | 11 PERF-01 | métrica/hardware a ratificar antes E |
| AUD-09 | CORRIGIDO DOCUMENTALMENTE | 11 fixtures e EDT/TIM | testes ainda não existem |
| AUD-10 | CORRIGIDO DOCUMENTALMENTE | 06/07 NTF-01 | consentimento futuro |
| AUD-11 | CORRIGIDO DOCUMENTALMENTE | 06/07 ADM/MOD | permissões a testar em D/O |
| AUD-12 | CORRIGIDO CONDICIONALMENTE | 04/10 AUTH-12..15 | retenção/export requer política humana |
| AUD-13 | CORRIGIDO CONDICIONALMENTE | 04/07 FAV-04/05 | depende D-02/D-26 |
| AUD-14 | CORRIGIDO CONDICIONALMENTE | 07/09 BillingSubject | D-26 pendente |
| AUD-15 | CORRIGIDO DOCUMENTALMENTE | 10/11 RNF02 | somente disponibilidade em produção |

**Auto-checagem R1 obrigatória:** verificar presença dos 14 documentos, RF01–RF10, RNF01–RNF06, D-01–D-28, AUTH-11, PERF-01, ENT-01..03, EDT-04/07, TIM-06/07, notificações contextuais, modelo revisional, matriz única e ZIP com CRC/hashes; conferir 15 achados. Falhas são registradas como `FAIL`, não tornadas `PASS` por reescrever documentação. Resultados reproduzíveis constam em `corretivos/bloco-0/R1/04-VALIDACAO-CRUZADA.md` e `05-EVIDENCIAS-E-INTEGRIDADE.md`.

**Status R1:** pronto para **reauditoria independente COM RESSALVAS** após integridade do ZIP, e **NÃO APROVADO**. Ações não executadas: aplicação, migrations, teste real de concorrência/benchmark, rotina diária real, compliance LGPD, gateways, deploy, commit e gate humano. O próximo auditor deve testar coerência e efeitos de ambas alternativas D-02/D-26; não aceitar apenas este checklist como prova independente.

### R2 — IDs de testes (R2)

**Nota normativa R2 (IDs):** Todas as menções a `EDT-*`, `TIM-*`, `AUTH-*`, `SRC-*`, `DED-*`, `ENT-*`, `BIL-*`, `PERF-*`, `PRIV-*`, `LOG-*` são referências; a definição de teste, suas fixtures e seu oráculo estão exclusivamente em `11-TESTES-E-GATES.md` §R2. Ocorrências antigas não prevalecem sobre o catálogo.

## R2 — Auto-validação dos 28 critérios do corretivo (não certifica execução)

**Auto-verificação DOCUMENTAL, não auditoria independente nem execução de aplicação.** Os itens de integridade ZIP/diff/hashes possuem resultado final registrado no relatório 08, confirmado depois do empacotamento. Um PASS aqui significa presença/coerência documental/arquivos, não teste funcional.

| # | Condição | Estado do momento | Evidência / limitação |
| --- | --- | --- | --- |
| 01 | 14 docs e arquivos não vazios | PASS | inventário local docs/bloco-0 |
| 02 | 2 planos preservados byte-a-byte | PASS | SHA-256 comparado com v0.2 |
| 03 | 7 achados com tratamento e evidência | PASS | 01-MATRIZ-RESOLUCAO-R2 |
| 04 | F(d) e E(d) independentes | PASS | 05 §R2 + 04-MATRIZ-RNF06 |
| 05 | RNF06 falha com A2 sem check | PASS | simulação 03/11: 3/3 e 5/6 FAIL |
| 06 | EDT/TIM canônicos sem redefinições ativas | PASS | 11 §R2 + mapeamento histórico |
| 07 | 10 Edital.id distintos | PASS | 03-FIXTURES E1..E10 |
| 08 | Revisão rejeitada fora da contagem | PASS | E8/v2 não é Edital |
| 09 | AUTH-11 A/B independente | PASS | 11 §R2 |
| 10 | PERF-01 observa primeira página correta | PASS | 11 §R2 catalog_ready |
| 11 | Duas jornadas de checkout documentadas | PASS | 09 §R2 e 05-CHECKOUT-ALTERNATIVAS |
| 12 | D-02/D-26 seguem pendentes | PASS | 03 §R2 e quadro de decisões |
| 13 | Manifesto distingue as três versões | PASS | 00 §1 e §R2 |
| 14 | 28 decisões D-01 a D-28 preservadas | PASS | 03 §Matriz autoridade |
| 15 | 10 RF originais preservados | PASS | 01 §2 |
| 16 | 6 RNF originais preservados | PASS | 01 §3 |
| 17 | Identidade visual original preservada | PASS | 08 e PDF sem alterações; licença não verificada |
| 18 | Nenhuma dependência circular nova introduzida | PARCIAL | inspeção documental cruzada; independência não auditada |
| 19 | Snapshot público não alterado | PASS | 05 §R1 e 07; sem mutação de regra |
| 20 | Segregação multiempresa preservada | PARCIAL | especificação mantida; nenhum teste real |
| 21 | Diff reproduz bytes da v0.3 | PASS | patch --dry-run e apply em cópia temporária; 14/14 arquivos idênticos; relatório 08 |
| 22 | Hashes do manifesto correspondem | PASS | 13/13 verificados; relatório 08 |
| 23 | Manifesto sem auto-hash | PASS | 00 excluído da própria tabela; relatório 08 |
| 24 | ZIP passa CRC | PASS | ZipFile.testzip() após empacotamento, relatório 08 |
| 25 | Arquivos históricos não sobrescritos | PASS | trabalho em cópia separada |
| 26 | Nenhuma decisão humana aprovada | PASS | estados explicitamente pendentes |
| 27 | Nenhum software implementado | PASS | inventário de tipo MD/diff/planos apenas |
| 28 | Nenhum trabalho Bloco A iniciado | PASS | nenhuma ação de projeto prevista/executada |
