# Regressões e achados materiais novos da Reauditoria R2

O escopo de busca é o **delta R2 e suas interfaces**; achados da R1 já sanados não foram duplicados sob IDs novos. Foi identificado **um erro MÉDIO**. Nenhum CRÍTICO ou ALTO novo foi observado. Ausência de teste de aplicação não é defeito documental e decisões comerciais já formuladas não são novas regressões.

## R2-01 — Gate de `EDT-08` incompatível com bloco de implementação

| Campo | Evidência |
|---|---|
| Gravidade | **MÉDIO** (documental; não bloqueia deliberação, mas pode bloquear futuro uso literal do catálogo) |
| Arquivo/seção | `docs/bloco-0/11-TESTES-E-GATES.md`, §R2, linha canônica `EDT-08` — Correção de PII em trilha |
| Dado literal | Coluna **Bloco = G/V**; coluna **Evidência futura/gate = D/F** |
| Fonte relacionada | `docs/bloco-0/01-RASTREABILIDADE-REQUISITOS.md` RNF04 (LGPD; fase G/V) e `12-ROADMAP-REVISADO.md` G/V posteriores a D/F |
| Causa raiz | Reutilização da nota de gate D/F de quase todos os casos EDT sem adequar o teste de privacidade que pertence a G/V |
| Consequência | Um futuro auditor poderia exigir correção/erasure de PII em eventos de usuários clientes no MVP1, antes do módulo G, ou dispensar teste em seu gate real por falsa associação a D/F |
| Correção mínima necessária | Alinhar a coluna de gate a **G/V** para o escopo de tratamento de PII descrito. **Alternativa:** se há requisito distinto de sanitizar logs administrativos já em C/D, criar cenário próprio daquele módulo sem deslocar o teste de G/V |
| Blocos afetados | G e V; apenas como clareza da matriz futura D/F/C |
| Gate afetado | Pré-uso do catálogo como norma vinculante do **Gate MVP1 D/F** e planejamento dos gates G/V |
| Aceite objetivo | Em `11`, `EDT-08` mantém uma única semântica, bloco e gate coerentes (ou separação explícita); nenhuma evidência de módulo futuro é exigida no MVP1 sem dependência implementada |

### Por que não é ALTO ou bloqueador do aceite humano

- A semântica `EDT-08` é única, sem colisão, e os contratos de privacidade não foram suprimidos.
- RNF04 continua rastreado a G/V, com obrigações iniciais proporcionais aos dados tratados anteriormente.
- O requisito pode ser classificado corretamente antes do gate de D/F, sem mudar ownership, bancos, estados editoriais, checkout, identidades ou lógica do produto.
- A reauditoria não deve gerar corretivos intermináveis por esse ajuste pontual; o responsável pode deliberar D-09/D-23 e registrar a correção de catálogo no primeiro adendo documental autorizado, com rechecagem objetiva do campo de gate.

## Matriz de regressões dirigidas

| Interface reavaliada | Resultado | Fundamentação |
|---|---|---|
| R1-01 fontes × edital × status | Sem regressão material | `05 §R2` separa checks; alteração de prazo abre revisão candidata, não publicação silenciosa |
| Catálogo IDs × significado | Sem colisões ativas | 61 IDs únicos, crosswalk histórico em `11` |
| Catálogo teste × gate | **R2-01 MÉDIO** | EDT-08 aponta G/V mas gate D/F |
| Fixtures × revisão | Sem regressão | E8/v2 rejeitada não conta edital; 8 publicados+2 drafts |
| AUTH-11 × IAM | Sem regressão documentada | bucket controle simétrico na fase A; abuso isolado fase B, parâmetros pendentes |
| PERF-01 × UX | Sem regressão | lista correta pronta como oráculo; LCP apenas auxiliar |
| FAV × ORG × BILL | Sem propagação indevida proposta | org A/B separadas, alternativa pessoal explicitamente condicionada |
| CAT × ADM × SRC | Sem regressão | `published_revision_id`, snapshot/candidatas e workflow separados |
| RBAC × logs | Sem regressão no delta | privilégios e leitura da trilha continuam escopados |
| Testes × roadmap | Ressalva EDT-08 | demais blocos/gates catalogados compatíveis no nível examinável |
| Identidade visual × UX | Sem regressão | Anek Tamil, paleta, marca e lista em linhas; campanhas sociais não substituíram UX |
| Manifesto × arquivos | Íntegro | tabela v0.3 e histórico claramente distintos |

## Não classificar como defeito neste gate

- D-02/D-26 ainda não aprovadas: ambas possuem opções, impactos, testagem e gate identificados.
- Equipe de verificação diária ainda não contratada/indicada: capacidade antes de D/F, não requisito de documentar um profissional nominal na auditoria Bloco 0.
- Hardware benchmark não escolhido: antes E, não aplicação existente.
- Política definitiva de rate limit ainda não aprovada: antes C/G.
- Ausência de conformidade LGPD ou gateway certificado em produção: fora do escopo documental/local.
