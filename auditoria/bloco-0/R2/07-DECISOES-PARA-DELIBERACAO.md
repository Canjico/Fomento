# Quadro de deliberação humana — Bloco 0 Fomentoria

**Finalidade:** permitir ao responsável aceitar/rejeitar propostas e registrar adiamentos conscientes. Este relatório **não altera status** de nenhuma D-01–D-28. A matriz normativa de último gate é `docs/bloco-0/03-DECISOES-E-CONFLITOS.md` §Matriz de autoridade. Campos obrigatórios do futuro registro: ID, responsável, alternativa escolhida, data, justificativa, escopo/versão, implicações de migrations e assinatura/registro de aceite.

## I. Obrigatórias antes do aceite documental do Bloco 0

| ID | Escolha para deliberação | Recomendação técnica não aprovada | Efeito |
|---|---|---|---|
| D-09 | Auditoria realmente independente, ou permitir autoaceite? | **Manter** auditor separado do implementador/autor | Sem aceite independente confiável, bloquear gate |
| D-23 | O que constitui APROVADO, APROVADO COM RESSALVAS ou REPROVADO? | Definir status, registro humano explícito e gate por bloco; aceitar Bloco 0 e autorizar A **em atos distintos** | Evita autorizar desenvolvimento acidental |

Documentação oferece critérios para esta escolha. Não há justificativa técnica para exigir mais um amplo corretivo apenas por estas decisões não terem sido deliberadas.

## II. Obrigatórias antes de autorizar ou iniciar A

| ID | Alternativas/condição | Recomendação não aprovada | Dependência |
|---|---|---|---|
| D-01 | Next.js/TS + PG vs outra stack local | Avaliar e aprovar versões concretas e operacionalidade local | Fundação e tooling |
| D-08 | Contratos por módulos no monólito vs outra separação | Preservar CAT/SRC/IAM/ORG/FAV/ENT/BILL; impedir escrita intermodular direta | Estrutura de pastas/interfaces |
| D-03/D-22 | Antecipar entidades User/Org/PII em A ou somente em G | Fechar apenas se as migrations de A as incluírem | Identidade/privacidade |
| D-06/D-05/D-12 | Criar entidade editorial/prazo em A ou somente D | Fechar quando a migration real tocar EditalRevision/Deadline | Snapshot/status |
| D-02/D-26 | Antecipar SavedEdital/Subscription/BillingSubject em A ou adiar | **Não** modelar titularidade antes de escolha; adiar quando A só incluir base técnica | Favoritos/assinaturas |

**Procedimento obrigatório:** antes do A, apresentar inventário *real* das migrations propostas, conferir D-01/D-08, resolver as decisões disparadas por entidades incluídas, passar gate humano **distinto**.

## III. Até B/C e D–F/MVP1

| Gate | Decisão | Alternativas / recomendação não aprovada |
|---|---|---|
| B | D-14/D-27, marca/tipografia | Fomentoria na UI, Anek Tamil somente após licença válida ou fallback; testes contraste/legibilidade |
| C | D-07, segregação editorial; política AUTH-11 | Separar criador, revisor, publisher com exceções rastreáveis; limite/tempo/bucket ratificados antes de usar AUTH-11 como aceite |
| D | D-04/D-05/D-06/D-10/D-11/D-12/D-13 | Campos obrigatórios e desconhecidos, prazos IANA, snapshots, fontes/deduplicação, responsável de checagem diária, inclusão no universo e escala |
| E/F | D-25 e desempenho D-23 | Definir urgência e protocolo de PERF-01 (hardware, percentil) e casos de Gate MVP1 antes de executar |

Registrar **R2-01** como correção de catálogo obrigatória antes de fixar os gates D/F e G/V, sem alterar o significado do caso EDT-08 ou forçar tratamento futuro de PII no MVP inicial.

## IV. Até G–M

| ID | Alternativas | Recomendação condicional | Impacto de adiamento |
|---|---|---|---|
| D-02 | Favorito pessoal com cota global (quando plano pessoal) vs direito contextual por organização | Preservar propriedade User; never cross-org; definir cota conforme contrato escolhido | Bloqueia H e migrations SavedEdital que materializem política |
| D-26 | Contrato apenas de organização (A), ou pessoa+empresa (B) | **A** preserva REQ §4.4; **B** somente mediante mudança aprovada de escopo comercial/fiscal | Bloqueia L/Subscription e fluxo checkout |
| D-16 | Trial/prorrata/renovação/cancelamento | Estados explícitos e vigência definida antes L/M | Billing inconsistente |
| D-21 | Até 5 usuários Assessoria, por qual sujeito/equipe? | Cota ativa validada server-side e concorrência de convites | Necessária N ou antes se modelar quota em L |
| D-18/D-22 | Preferências/canais e retenção LGPD | Consentimento por finalidade e política jurídica documentada antes K/Q/G conforme dados | Notificação indevida/PII |

**Cenário para escolher D-02/D-26:** consultor U participa A Pro e B Gratuita; favoritos são privados de U; benefício empresarial Pro A não concede Pro B; revogação do membership A remove acesso à empresa, não apaga automaticamente favoritos pessoais. O usuário sem empresa permanece no Free pela opção A; Pro pessoal exige opção B formal. Com opções completas, a discussão agora é comercial/humana, não defeito arquitetural.

## V. Posteriores/adiáveis

D-15 (simulador/gateway), D-17 (score), D-19 (parceiros/moderação), D-20 (assessoria e SLA), D-24 (B2B), D-28 (SEO quando chegar), e demais políticas do último gate definido em `03`. Nenhum desses itens deve ser antecipado indiscriminadamente para bloquear A.

## Saída esperada da deliberação

- Ato 1: aprovação, recusa ou aceite com ressalvas do **pacote documental do Bloco 0**, com registro D-09 e D-23.
- Ato 2, **se e quando pretendido**: aprovação explícita de escopo técnico/migrations/stack do Bloco A e autorização separada para começar.
- Nenhuma decisão foi tomada nesta reauditoria; nenhuma publicação, pagamento, integração ou deploy autorizado.
