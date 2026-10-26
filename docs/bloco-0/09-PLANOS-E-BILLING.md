# 09 — Planos, entitlements e cobrança futura local

> **Documento de proposta para auditoria, versão 0.3-R2 · 26/10/2026.** Apenas o Bloco 0. As seções marcadas **PROPOSTA**, **PREMISSA** e **DECISÃO PENDENTE** não constituem autorização de implementação, contrato congelado ou política comercial aprovada.

**Registro histórico R1 (não normativo onde substituído por R2):** versão derivada do pacote v0.1, corrigida sob AUD-01–AUD-15. Todas as definições de R1 são **PROPOSTAS CONDICIONAIS**, não decisões aprovadas; a matriz D-01–D-28 em `03-DECISOES-E-CONFLITOS.md` prevalece como índice de gates. Nenhuma migração, implementação ou aceite foi executado. **Se houver divergência de testes, prevalece exclusivamente o catálogo R2 em `11-TESTES-E-GATES.md`.**

**Convenção de rastreabilidade:** `ORIGINAL` = conteúdo sustentado pelos anexos primários; `PROPOSTA` = desenho técnico; `PREMISSA` = hipótese; `DECISÃO PENDENTE` = aprovação requerida; `CONFLITO` = tensão entre fontes/planos. Referências: `REQ` (DOCX, página/seção), `ID` (PDF, página), `P02` e `P01` (planos mestres, seção).

## 1. Matriz ORIGINAL, preços de referência (REQ p.3 §7)

| Recurso | Gratuito — R$ 0 | Pro — R$ 49/mês | Assessoria — R$ 199/mês |
|---|---|---|---|
| Pesquisa e filtros completos | ✓ | ✓ (herdado) | ✓ (herdado) |
| Editais salvos | Até **3** | **Ilimitados** | **Ilimitados** (herda Pro) |
| Resumo semanal de e-mail | ✓ | sem menção explícita de remoção: a decidir | idem |
| Alertas diários | — | ✓ | ✓ |
| Checklist de documentos | — | ✓ | ✓ |
| Calendário | — | ✓ | ✓ |
| Score de compatibilidade | — | ✓ | ✓ |
| Revisão de propostas por especialista | — | — | ✓, **quantidade/SLA NÃO DEFINIDOS** |
| Relatório mensal | — | — | ✓ |
| Usuários na equipe | não definido | não definido | Até **5 usuários** |

**Observação:** o documento original fala em “alerta imediato” nas configurações (REQ p.2 §4.5 e RF09) mas não define entitlement por plano, canal e duração. Não equiparar imediatamente ao alerta diário. WhatsApp só na fase posterior, sem envio local real.

## 2. Entitlement model proposto (D-02/D-21/D-26)

`EntitlementDefinition(planVersion, featureKey, limit?, period?, scope)` estabelece regras versionadas por plano; `effectiveEntitlement(actor, context, feature, at)` devolve capacidade somente após autenticação, autorização e validação da fonte do direito (ver R1). Feature flags não conferem permissão; é preciso `membership` e direito comercial. Teto favorito deve ser verificado na transação/índice para rejeitar salvamentos simultâneos acima de 3. Cota *por usuário* ou *por organização* segue **DECISÃO PENDENTE D-02**; conta de consultor em múltiplas empresas exige testar limites sem assumir uma única assinatura global.

Exemplo **não aprovado** de chaves conceituais: `catalog.search`, `saved_edital.limit`, `recommendation.score`, `notifications.email.weekly`, `notifications.email.daily`, `documents.checklist`, `calendar.events`, `advisor.review.request`, `team.active_members.limit`. Ao retirar entitlement, não apagar imediatamente dados de clientes; restringir uso e fornecer política de exportação/retomada a deliberar.

## 3. Modelos de estados propostos

**Subscription:** `draft → pending_payment → active → scheduled_change / cancel_at_period_end → canceled`, com `past_due`, `suspended`, `expired` conforme método e política. Cancelado e reembolsado não são equivalentes. **PaymentAttempt:** `created → pending → confirmed / declined / canceled / expired / refunded` com evento compensatório de reembolso após confirmação. `BillingEvent` registra fatos imutáveis de origem, integridade e processamento.

| Entrada/ação | Guarda | Resultado proposto | Cenário negativo |
|---|---|---|---|
| Escolher Pro | organização e actor billing autorizados | intenção de mudança, não benefício | sem membership: negar |
| Iniciar checkout simulado | plano válido, CNPJ fictício, idempotency key | attempt `pending` | cupom inválido: erro controlado |
| Receber evento “confirmado” | origem de simulação verificada, payload válido, valor/plano compatível, evento novo | registrar e ativar uma vez | replay/spoof: não ativar |
| Confirmar pela tela de sucesso | **não confiável** | consultar status da assinatura | UI nunca concede entitlement |
| Upgrade | política comercial D-16 | agendar ou trocar após confirmação simulada | falha de evento não concede |
| Downgrade | D-16, verificar excesso de salvos/membros | cronograma/restrição, sem excluir em massa | limite maior bloqueia operações futuras até resolver |
| Cancelar | usuário com billing role, período e reembolso definidos | estado consistente/histórico | ato repetido idempotente |
| Falha/no payment | tratamento/“grace” D-16 | `past_due`/expirado conforme decisão | não prolongar ilimitadamente sem regra |
| Reembolso | evento formal verificado | revisão do acesso por política | refund não reescreve evento confirmed |

## 4. Checkout local futuro (M) — fronteira absoluta

Passos que o REQ p.2 §4.4 prevê: plano → razão social/CNPJ/setor/estágio → cartão/Pix/boleto → confirmação e redirecionamento. No desenvolvimento local, implementar **apenas simuladores** selecionáveis que gerem resultados previsíveis em banco isolado, sem redes externas, credenciais reais, PAN/CVV nem e-mails enviados. Evitar formular campos de cartão reais até haver gateway certificado na fase pós-V; testes usar tokens sintéticos sem semelhança com dados reais. Mesmo em simulação, tratar eventos como não confiáveis até assinatura/verificação HMAC fake local e binding a tentativa legítima.

**Idempotência proposta:** chave de negócio `(provider_mock, event_id)` única; processamento transacional; tentativa duplicada registrada como replay seguro e não concede recursos novamente; valores e titular vinculados à subscription. Reconciliação evidencia divergências e estado terminal. Jobs futuros idempotentes, sem chamada de rede.

## 5. Assessoria: promessa humana não operacionalizada

**ORIGINAL:** revisão de propostas por especialista, relatório mensal, até cinco usuários; REQ p.3 §7. **DECISÃO PENDENTE D-20:** quantidade de revisões/mês, tipos de proposta, anexos, canal de entrega, prazo em dias úteis, revisores responsáveis, exclusões, sobrecarga, confidencialidade, tratamento de conflitos, retenção e cancelamento. **Nenhum SLA/quantidade foi inventado como aprovado.** Bloco N só pode ativar a oferta após essa política.

## 6. Regras comerciais aguardando decisão

| ID | Regra não prevista no REQ | Opções a aprovar | Impacto |
|---|---|---|---|
| D-15 | recorrência Pix/boleto, gateway, falhas | cobrança manual renovável vs instrumento recorrente | máquina estados e gateway futuro |
| D-16 | trial / prorrata / dia de vencimento | sem trial por padrão (proposta), pró-rata conforme gateway | faturamento e UI |
| D-16 | downgrade no meio do ciclo | imediato vs fim do período | quota, retenção e direitos |
| D-16 | inadimplência / tolerância | suspender imediatamente vs grace | entitlement; comunicação |
| D-16 | cancelamento e reembolso | próximo ciclo vs imediato; regra legal | direitos e histórico |
| D-21 | limite de usuários Assessoria | membros ativos em account dono, convites pendentes fora cota (proposta) | concorrência |
| D-02 | favorites pessoais e contagem | por conta pessoal global vs por contexto empresa | alinhamento RF04 |
| D-26 | entidade titular pagante | organização ou usuário individual | ownership e fiscal |
| D-18 | frequência/canais conforme plano | weekly, daily, immediate, WhatsApp futuro | notificações |

## 7. Verificação e testes futuros

`BIL-01` CTA não libera plano; `BIL-02` confirmação verificada libera; `BIL-03` pagamento recusado mantém limite; `BIL-04` replay não duplica; `BIL-05` spoof rejeitado; `BIL-06` duas cobranças simultâneas não alteram owner; `BIL-07` cancelar e repetir; `BIL-08` upgrade/downgrade respeita quotas; `BIL-09` CNPJ fictício não vaza; `BIL-10` nenhuma requisição a provedor externo; `ENT-01` limite de 3 com concorrência; `ENT-02` múltiplos usuários em org; `ENT-03` troca de empresa não herda assinatura errada. Ver `11`.

Não há cobrança executada, contrato de gateway assinado ou compliance PCI-DSS certificado neste documento.

## R1 — AUD-01/04/14: política de titularidade e trilha H→L→M

**ORIGINAL (REQ p.2 RF04 e p.3 §7):** favoritos pessoais, Free 3, Pro ilimitado, Assessoria até cinco usuários. O DOCX **não define** se a assinatura é pessoal ou empresarial. Portanto **D-02/D-26 PENDENTES**, sem conceder Pro pelo mero vínculo de membership.

| Critério | A — assinatura só organizacional | B — titular tipado, pessoal ou organização (**recomendação condicional**) |
|---|---|---|
| Sujeito | Organização ativa obrigatória | `BillingSubject(PERSONAL, user_id)` ou `(ORGANIZATION, org_id)`, exatamente um |
| Pessoa sem empresa | só Free; checkout requer criar/associar organização, se aprovado | Free 3 e opção futura de assinatura individual mediante decisão comercial |
| Assinatura org A vs org B | benefício A não pode transcender B; lista pessoal RF04 exige política adicional de cota | benefício pessoal se mantém pessoal; org A não eleva org B nem lista pessoal automaticamente |
| FKs | `subscription.organization_id NOT NULL` | `subscription.billing_subject_id NOT NULL`, sujeição discriminada com integridade |
| Cancelamento/retention | cancela organização, mantém histórico conforme política LGPD | cancela sujeito tipado, mantém eventos, evita órfãos |
| Impactos | menos entidades, mas onboarding/benefício pessoal precisa de decisão | mais entidade, facilita conta pessoal e múltiplas organizações; maior rigor de autorização |

**Recomendação:** B junto com favoritos **pessoais globais A de D-02**. Se proprietário preferir benefícios contextuais, exigir chaves contextuais e UX explícita antes de H/L, sem herdar Pro de outra org. A recomendação **não é aprovação**.

### Porta de entitlement e evolução sem dependência cíclica

| Fase | Autoridade | Entradas | Saída para SavedEdital | Invariantes |
|---|---|---|---|---|
| **H** | ENT (`FREE_POLICY_V1` local versionada) | actor+context+feature+at | `3`, ou `DENY` para contexto não autorizado | sem Billing/Subscription, sem capacidade paga, escrita atômica |
| **L** | ENT (`PlanDefinition` e Subscription states simulados) | idem + versão da policy | Free continua `3`; paid permanece **indisponível** sem confirmação do M | não conceder por escolha/tela de plano |
| **M** | ENT consome evidência da autoridade BILL em evento validado | `BillingEventVerified(subject,attempt,eventId,signature)` | limitações pagas apenas com evento efetivo e estado elegível | idempotência, confirmação vinculada ao sujeito/valor/plano/ciclo |

`effectiveEntitlement` definido em `04`: exige sessão, membership se org, escopo tipado, feature, instante UTC e retorna `decision,value,policy_version,evidence_ref,valid_until`. DENY se falha de validação; um benefício nunca atribui permissões editoriais ou expõe dados de outrem. Em H o FREE é default aprovado somente no gate de H; antecipação no desenho **não** cria implementação de billing.

**Casos conceituais:** `ENT-01` GIVEN usuário Free com dois SavedEdital WHEN duas inclusões paralelas para editais distintos THEN contagem final exatamente 3, uma rejeitada `CONFLICT_QUOTA`, replay não duplica; `ENT-02` GIVEN U membro ativo A Pro empresarial hipotético e B Free WHEN troca contexto THEN nunca herda A em B nem favorito de outro usuário (a política pessoal global segue Free se não houver benefício pessoal); `ENT-03` GIVEN seleção Pro via UI sem confirmação BILL WHEN salvar quarto favorito THEN negar; após simulação validada M e sujeito de benefício correto, permitir só no escopo aprovado; replay do evento não cria segunda concessão. Testes FUTUROS, sem execução nesta fase.

**Downgrade:** manter itens pessoalmente pertencentes ao usuário para leitura, não permitir novas inclusões acima da cota e propor controle de remoção/regularização sem deleção automática. Definir transição de Assessorias com membros >5, convites pendentes, prorrata/trial e grace na D-16/D-21 antes L/N; não prometer serviço humano ou recorrência real sem contrato. Todos os valores permanecem referências comerciais do REQ.

### R2 — IDs de testes (R2)

**Nota normativa R2 (IDs):** Todas as menções a `EDT-*`, `TIM-*`, `AUTH-*`, `SRC-*`, `DED-*`, `ENT-*`, `BIL-*`, `PERF-*`, `PRIV-*`, `LOG-*` são referências; a definição de teste, suas fixtures e seu oráculo estão exclusivamente em `11-TESTES-E-GATES.md` §R2. Ocorrências antigas não prevalecem sobre o catálogo.

## R2 — Checkout empresarial original versus pessoal proposto (R1-06)

**Fonte original:** REQ p.2 §4.4 exige `Plano → razão social/CNPJ/setor/estágio da empresa → cartão/Pix/boleto → confirmação`. **Alternativa A** mantém assinatura somente de organização, sujeito não nulo, sem Pro para conta sem empresa; proprietário financeiro pode contratar no contexto autorizado. **Alternativa B** acrescenta checkout pessoal por `BillingSubject(PERSON)` com campos/obrigações fiscais próprios: é **EXTENSÃO DO ORIGINAL**, exige aceite expresso D-26 e impacto LGPD D-22 antes G/L/M. Ambas mantêm favoritos pessoais RF04 e proíbem herança automática do benefício A para B. **Não presumir assinatura pessoal na UX ou no banco**. Matriz das dez jornadas e impactos é parte do contrato proposto no relatório `corretivos/bloco-0/R2/05-CHECKOUT-ALTERNATIVAS.md`. Até escolha, nenhuma subscription migration que fixe owner é autorizável. D-02/D-26 permanecem **PENDENTES**, sem checkout real.
