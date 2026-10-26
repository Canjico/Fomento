# Reauditoria Independente R2 — Veredito executivo

**Projeto:** Fomento (técnico) / Fomentoria (marca). **Data:** 26/10/2026. **Objeto:** pacote documental v0.3-R2 (Bloco 0). **Independência metodológica:** cálculo próprio de hashes/CRC, reprodução de patch e inventários a partir de bytes, comparação com DOCX/PDF e leitura cruzada de contratos. A documentação avaliada não foi modificada. Não houve testes de software, operação de sistemas externos nem aprovação humana.

## Veredito

**APTO PARA DELIBERAÇÃO HUMANA.** Os sete problemas da R1 estão resolvidos no plano documental ou cobertos por alternativas explicitamente condicionadas, sem achados CRÍTICOS ou ALTOS remanescentes. Há **um novo achado MÉDIO, R2-01**, restrito ao gate do teste canônico `EDT-08`: implementação G/V × evidência/aceite D/F, que poderia ser prematuramente exigido no MVP1. Não demonstra falha de isolamento, permissões ou dados implementados; tratar antes de usar o catálogo como lista formal de aceite D/F. Não exige outro ciclo amplo de corretivos antes de discutir decisões humanas.

**Este veredito não aprova o Bloco 0, não congela contratos e não autoriza o Bloco A.** Para avançar, o responsável deve deliberar D-09/D-23 (critérios/independência do gate), decidir ou adiar conscientemente os demais itens por último gate e emitir ato separado de autorização de A após inventário real das migrations planejadas.

## Base efetivamente examinada

- DOCX original: `Fomentoria_Documento_de_Requisitos (3).docx`, 4 páginas; visão geral, personas, RF01–RF10, seis RNFs, três planos, checkout empresarial, sete fases e itens pós-fase 7.
- PDF original: `Fomentoria ID.pdf`, 13 páginas. Verificação visual das páginas 2–5, 7, 9–11; símbolo manuscrito, variantes de logotipo, cores, Anek Tamil, slogan e peças de redes sociais (não wireframes).
- v0.3-R2: 14 documentos normativos, dois planos mestres históricos e 10 artefatos R2 (nove relatórios + diff).
- v0.2-R1: base de comparação byte a byte; reauditoria R1 com os critérios originais R1-01 a R1-07.
- Pacotes v0.1 e auditoria original: disponíveis para proveniência; a reauditoria é **delimitada ao delta R2** e interfaces que ele afetou, não uma nova auditoria genérica de todo o produto.

## Integridade e verificações-chave

| Item | Resultado independente |
|---|---|
| ZIP v0.3 | SHA-256 `f1ef662de2cd8b6236984f3ce92281e01d2fde70b7a629a126f055e9599b1d21`; 26 entradas; CRC íntegro |
| ZIP v0.2 | SHA-256 `4d6bf04a61e34dfba5402cfdc9fa3adfe38daeaf44c984541ce931ccb5a8fc61`; 22 entradas; CRC íntegro |
| R1 | SHA-256 `b37524268639835c88727591e3220ca137e76f1b90d7a3ceb6086381ec0d7e36`; nove relatórios; CRC íntegro |
| Manifesto v0.3 | 13/13 SHA-256 e tamanhos dos outros Markdown atuais conferidos; sem auto-hash |
| Insumos históricos | SHA-256 de DOCX/PDF/planos batem com manifesto |
| Diff v0.2→v0.3 | `patch -p1 --dry-run` e aplicação em cópia: exit 0; 14/14 Markdown reconstruídos byte idênticos |
| Catálogo de testes | 61 linhas/IDs únicos em `11 §R2` (12 EDT, 10 TIM, 8 SRC, 2 DED, 12 AUTH, 10 BIL, 3 ENT, 1 PERF, 2 PRIV, 1 LOG) |
| Fixtures | E1…E10 distintos; oito publicados, dois rascunhos; rejeição E8/v2 contabilizada como revisão |
| RNF06 | 19/21 fontes; 37/42 editais; tentativas 20/21 e 39/42; quatro PASS, três FAIL na simulação |

## Tratamento dos sete achados R1

| Achado | Estado independente | Justificativa sucinta |
|---|---|---|
| R1-01 RNF06 | RESOLVIDO CONDICIONALMENTE | Universos F(d)/E(d), evidência por recurso, denominadores, corte e FAIL por edital sem check; D-11 mantém responsável/escala pendentes |
| R1-02 IDs EDT/TIM | RESOLVIDO | Catálogo único em `11 §R2`, preservação histórica com aliases; ressalva nova R2-01 sobre gate, não colisão de significado |
| R1-03 Fixtures | RESOLVIDO | Dez `Edital.id` distintos com revisões e cenários separados |
| R1-04 AUTH-11 | RESOLVIDO CONDICIONALMENTE | A e B segregados, reset/controle de rate-limit, respostas/oráculos; política e limites a ratificar C/G |
| R1-05 PERF-01 | RESOLVIDO CONDICIONALMENTE | `catalog_ready` e conferência E2E independente; P95≤2s proposto, ambiente a ratificar E/V |
| R1-06 Checkout | RESOLVIDO CONDICIONALMENTE | Alternativa empresarial preserva requisito original; pessoal apenas extensão dependente D-02/D-26 |
| R1-07 Manifesto | RESOLVIDO | versão corrente v0.3 e versões históricas diferenciadas, hashes atuais corretos |

## Não confundir

- **Especificação verificável** ≠ funcionalidade testada; nenhuma aplicação foi executada.
- **Capacidade futura de monitorar fontes** ≠ RNF06 cumprido em operação. A simulação tem 3 dias FAIL.
- **Alternativa arquitetural recomendada** ≠ decisão empresarial/comercial aceita.
- **Auditado para deliberação** ≠ apto para iniciar A sem gate humano formal.

**Próxima ação única recomendada:** **DELIBERAÇÃO HUMANA DO BLOCO 0**, acompanhada do registro R2-01 como ajuste pontual obrigatório antes de usar o catálogo no Gate D/F. Ver `07-DECISOES-PARA-DELIBERACAO.md` e `08-EVIDENCIAS-E-GATE-FINAL.md`.
