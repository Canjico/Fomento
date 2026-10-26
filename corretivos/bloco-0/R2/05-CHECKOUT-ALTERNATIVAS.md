# 05 — Alternativas de checkout e direitos comerciais (R1-06)

> **ORIGINAL REQ §4.4:** Plano → dados empresariais (razão social, CNPJ, setor, estágio) → cartão/Pix/boleto → confirmação. **Simulação local apenas em M.** D-02 e D-26 permanecem **DECISÕES PENDENTES**; checkout pessoal não consta no DOCX e só poderá surgir por alteração deliberada.

## Alternativas não aprovadas

| Parâmetro | A — contratação somente empresarial (mais fiel ao original) | B — sujeito pessoal ou empresarial (extensão proposta) |
|---|---|---|
| Sujeito da assinatura | Organization obrigatória | BillingSubject discriminado `PERSON` ou `ORGANIZATION`, exactly one owner |
| Quem sem empresa quer Pro | criar/vincular organização autorizada, ou permanecer Free | poderá escolher Pro pessoal **somente após alteração de requisito aprovada** |
| Dados fiscais | razão social, CNPJ, setor, estágio para empresa | empresa como A; pessoa exige campos pessoais/base legal/tributação definidos antes M, sem CNPJ fictício |
| Entitlement | sempre contextual à org; favoritos pessoais RF04 pedem regra explícita D-02 | pessoal pode ser global, org só contextual; nunca propagar A para B |
| Principal risco | usuário individual sem empresa não converte e ambiguidade de cota | novo fluxo, privacidade, tributos, consentimento, contratos e regras de conflitos |
| Gate mínimo | G/H titularidade e L/M cobrança | **aprovar formalmente extensão ao checkout original antes de G/L e migrations afetadas** |

## Matriz das dez jornadas — cenário por cenário

| ID | Ator | Contexto | Plano | Titular do contrato | BillingSubject | Dados/permissão/checkout | Benefício | Favoritos / UX | Teste futuro |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| J01 | U0 | nenhuma | Free | Pessoal gratuito (sem assinatura) | PERSON (apenas política FREE, nenhum contrato) | nenhum checkout | Free 3 pessoais | salvar até 3 sem organização | RF04/ENT-01 |
| J02 | U0 | nenhuma | quer Pro | A: sem contrato; B: PERSON após aceite | A: não cria; B: PERSON | A: criar/associar empresa com autorização; B: dados pessoais legalmente definidos | nenhum pago antes confirmação M | mesma lista pessoal, quarto negado até evento | BIL-01/BIL-02 |
| J03 | U1 proprietário | Org A | Pro empresarial | Org A | ORGANIZATION(A) | dados empresariais REQ; can_manage_billing(A) | Pro somente para A conforme D-02 | lista pessoal U1 nunca compartilhada automaticamente | AUTH-06/ENT-02 |
| J04 | U2 consultor | Org A Pro / Org B Free | contextual | Org A e Org B distintos | ORGANIZATION(A/B) | sem novo checkout | nenhum benefício A em B | lista pessoal U2 permanece privada | ENT-02/AUTH-06 |
| J05 | U2 consultor | nenhuma/Org A+B | quer Pro pessoal | A: impossível sem org; B: PERSON após aceite | A: n/a; B: PERSON | B: checkout pessoal legalmente aprovado | B: global apenas para U2, sem permissões de A/B | lista pessoal U2, sem acesso a dados empresariais | BIL-02/ENT-03 |
| J06 | U3 membro sem finanças | Org A | quer contratar Pro | Org A | ORGANIZATION(A) | can_manage_billing(A)=false | DENY sem criar payment attempt | nenhum efeito | AUTH-06/BIL-01 |
| J07 | U1 | Org A, membership revogado | checkout pendente | Org A | ORGANIZATION(A) | revalidar membership ANTES de confirmar | DENY/invalidar operação; evento financeiro não concede a ator sem acesso | U1 pessoais mantidos sem metadados A | AUTH-03/BIL-02 |
| J08 | U1 financeiro | Org A | cancelar Pro | Org A | ORGANIZATION(A) | can_manage_billing(A); regra D-16 pendente | direitos seguem política de vigência aprovada, sem cobrança nova | U1 salvos pessoais preservados; inclusão limitada | BIL-07/ENT-03 |
| J09 | U0 | nenhuma | downgrade Free | pessoal se modalidade B aprovada | PERSON ou org conforme titular | efeito/tempo a decidir D-16 | bloquear novas inclusões acima de 3, sem apagar pessoais automaticamente | 4+ favoritos leitura preservada conforme política | BIL-08/ENT-01 |
| J10 | U2 consultor | Org B Free | tenta usar Org A Pro | Org A (não B) | ORGANIZATION(A) | contexto B não autorizado ao sujeito A | DENY Pro em B | nenhum favorito de terceiros | ENT-02/AUTH-06 |

**Invariantes:** `Subscription.billing_subject_id` obrigatório e consistente com discriminador; impedidos sujeitos órfãos; nenhum membro altera assinatura por substituir `org_id`; `effectiveEntitlement(actor,context,feature,at)` recalcula autorização e escopo, não reutiliza claim do cliente; benefício pessoal não concede acesso a dados privados de organização, benefício de A não concede B; ausência de evento autenticado/simulado validado **não** libera recursos pagos; checkout interrompido por revogação não continua por sessão velha. **POLÍTICAS EM ABERTO:** escopo exato de cota RF04 versus entitlement empresarial D-02, titular D-26, dia de vigência, reembolso, tributação, período, prorrata, consentimento e campos pessoais D-16/D-22. Recomenda-se A para aderência inicial ao fluxo original; B só mediante aprovação de ampliação. Isso altera recomendação anterior, mas **não** decide o produto.

**Dados e UX:** se A, usuário sem empresa vê explicação, vínculo/criação de empresa e tela empresa/CNPJ; se B aprovada, bifurcar a jornada antes de dados, obter modalidade, tratamento jurídico/fiscal e consentimento específicos; ambas exibem simulador local quando M autorizado. Em nenhum caso exigir ou inventar CNPJ para pessoa física. Nenhum cartão real, Pix real ou notificação real.
