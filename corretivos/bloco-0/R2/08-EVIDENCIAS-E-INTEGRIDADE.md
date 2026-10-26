# 08 — Evidências, integridade e limitações · Corretivo R2

> Auto-verificação documental; **NÃO é reauditoria independente R2**, nem teste funcional. ZIP final tem hash informado fora de seu conteúdo para evitar circularidade. Este relatório não contém seu próprio SHA.

## Insumos efetivamente lidos

| Insumo | SHA-256 confirmado |
| --- | --- |
| DOCX original | `adf7a4d06916f7f5408646db6b0ceb23937a60f37e87a79007fa80b387e64957` |
| PDF original | `50e61c488112a18d5dc8bd7bc6d101f22501b18487af94506e232e0c9f11ff50` |
| v0.2 ZIP original | `4d6bf04a61e34dfba5402cfdc9fa3adfe38daeaf44c984541ce931ccb5a8fc61` |
| R1 auditoria ZIP | `b37524268639835c88727591e3220ca137e76f1b90d7a3ceb6086381ec0d7e36` |

- Anexos DOCX/PDF foram inspecionados anteriormente e permanecem originais; os dois planos mestres foram copiados byte a byte sem edição. Os ZIPs fornecidos passam CRC. Insumos v0.1 históricos estão disponíveis e não foram alterados.

## Inventário de hashes dos 14 documentos principais v0.3

| Documento | Bytes | SHA-256 |
| --- | --- | --- |
| docs/bloco-0/00-MANIFESTO-E-FONTES.md | 12500 | `2a3b699c752c5217b730c6cf24849ac119f9ef2d0ff5be4a7b15b3e56d3e943d` |
| docs/bloco-0/01-RASTREABILIDADE-REQUISITOS.md | 11723 | `2a28d6565fd816fca70cbab616a616277e47f53eb762319597a5cecff3a76aed` |
| docs/bloco-0/02-PRD-E-ESCOPO.md | 8607 | `56541f919c145fef26394ef4229624f6b93585432581c3a6b8c224163d5fa4e0` |
| docs/bloco-0/03-DECISOES-E-CONFLITOS.md | 19434 | `d634a2f1451f2b6d7bb0d67f1d75aa901bad2592424c7600d7911600e270c9c5` |
| docs/bloco-0/04-ORGANIZACOES-PERMISSOES.md | 19981 | `fa572694b7580a2ed28f6ce6e67fe5eb1df20b3768cc90361d1a8187e31eac8d` |
| docs/bloco-0/05-ESTADOS-EDITORIAL-E-AUDITORIA.md | 24118 | `95c4caf401c27700634614b6c6a6a0a127347facb0477c3edbcd3c27319dcf5a` |
| docs/bloco-0/06-ARQUITETURA-E-CONTRATOS.md | 15694 | `eba1e2cd2e2eec448ca6cda90b235788d80a8838111550eb4a6906c704539d48` |
| docs/bloco-0/07-MODELO-DE-DADOS-LOGICO.md | 20831 | `7172b72b4bb11c1bfbf1ed14df9cbe30f562719532bb0bb6d02f4e0d599585f8` |
| docs/bloco-0/08-FLUXOS-E-UX.md | 13217 | `7bb744b2b08e85519a2c78afbb098ba4f66bd8a8f84ae434704df4c6d36f5c44` |
| docs/bloco-0/09-PLANOS-E-BILLING.md | 14037 | `f7ea9a4ef62d8313859988af32230d8e6c7084881dcc5a402e2681b847144018` |
| docs/bloco-0/10-SEGURANCA-PRIVACIDADE-RISCOS.md | 11798 | `5d74869f9f3d65f4dae2be59c05d8e7b5f2b968bb79a010e91c3182dc1e95bbd` |
| docs/bloco-0/11-TESTES-E-GATES.md | 35567 | `c09186764c40bc283063d4d6a8ca98d9e6439a862b5120a69606bd64ec11323a` |
| docs/bloco-0/12-ROADMAP-REVISADO.md | 22887 | `d304df4e2c59e587ad555b284be56faa214f93584889c3eddab8b01307c57c21` |
| docs/bloco-0/13-AUTO-CHECAGEM-DO-PACOTE.md | 14242 | `2ed7f2c204b770b7dc35b97b3ddf36ab0b5951ffc32ff71914e24cac93de7f06` |


## Relatórios R2, diff e planos históricos

| Arquivo | Bytes | SHA-256 |
| --- | --- | --- |
| corretivos/bloco-0/R2/01-MATRIZ-RESOLUCAO-R2.md | 1804 | `3718a89fac2cf8a5eecc9dcac00c91809d2c58d29e52acc489055f7b2f8ae764` |
| corretivos/bloco-0/R2/02-CATALOGO-CANONICO-TESTES.md | 2112 | `fa15b62f62db22f286c672af760089386c3bb25c2d5778e2a31db7dd88909610` |
| corretivos/bloco-0/R2/03-FIXTURES-MVP1.md | 6588 | `b786c58a8d593979f666e010c623090acfdc3c2c2921712d0165c0d2ccce216b` |
| corretivos/bloco-0/R2/04-MATRIZ-RNF06.md | 4333 | `39bc30abd7b58dddce7226a070928f30403549a698494f7dc29df8609e70da2b` |
| corretivos/bloco-0/R2/05-CHECKOUT-ALTERNATIVAS.md | 5538 | `fe237fa62af081c798365828fe3d8c424aad81064527c6c3c58051867c0329ed` |
| corretivos/bloco-0/R2/06-VALIDACAO-CRUZADA.md | 2591 | `429d04bd0593ec48f0c0eadbc1f90b54d1129467b289353ba9b4bab17eb203a3` |
| corretivos/bloco-0/R2/07-CHANGELOG-E-DIFF.md | 2367 | `ebcbe21b80a052468cba3c4c7ea1c747e6b88ff6300f84c11309a6aaa2f978e5` |
| corretivos/bloco-0/R2/09-DECISOES-PENDENTES.md | 2801 | `db232e9aaa2df744288383b1775d8343a56d4cbd31f37ddb8817bb4e32b7f66a` |
| corretivos/bloco-0/R2/10-DIFF-TEXTUAL-v0.2-v0.3.diff | 95712 | `be1f249c179ddcebfd9c85990ef2d32343db8936ebc531a3242e5626f4872b9d` |
| fontes/FOMENTO_PLANO_MESTRE_LOCAL_v0.2.md | 31551 | `18d49c15877f6676ac12db0a0e55c0acc95f797a949c4aaa9bebad7ff6c6276b` |
| fontes/FOMENTO_PLANO_MESTRE_LOCAL_v0.1.md | 20121 | `286019de9e843dba86b34c6ba7e26f259a266496b134fd16331edde26456b79c` |


**Excluídos de sua própria tabela de hash:** este relatório `08` (evitar autorreferência) e ZIP final (não se pode embutir SHA do próprio ZIP); seu checksum poderá ser recalculado por verificador externo a partir do arquivo entregue.

## Procedimentos e resultados (locais)

| Check | Método | Resultado |
|---|---|---|
| Source hashes | Python hashlib.sha256(bytes) dos ZIPs originais e anexos | PASS; hashes iguais aos informados |
| ZIPs origem | `zipfile.ZipFile.testzip()` | PASS, CRC íntegro |
| 14/2/7/10 | `Path.glob` para docs/planos/relatórios MD/diff, contagem | PASS após embalagem, 26 membros esperados |
| Diff | `difflib.unified_diff`; `patch -p1 --dry-run`, depois `patch -p1` em cópia temporária | PASS, exit code 0 e 14/14 bytes idênticos |
| Hashes manifesto | comparar hashes dos 13 docs `01..13` com tabela 00 §R2; o próprio 00 excluído | PASS |
| Catálogo | regex de referências e unicidade de ID canônico na tabela do 11 | PASS estrutural; colisões históricas mapeadas |
| Fixtures | contagem explícita de `Edital.id` E1–E10 e revisões separadas | PASS estrutural; sem execução |
| RNF06 | calcular evento dia/fonte/edital e fórmula em simulação | PASS aritmético; RNF06 operacional NÃO VERIFICADO |
| UX, auth, billing, performance | revisar propostas nos docs contra DOCX, **não** executar software | PARCIAL/CONDICIONAL |

## Limitações, de forma explícita

**NÃO EXECUTADOS:** código, PostgreSQL, migrations, browser/E2E, tarefas diárias reais, segurança dinâmica, timeouts reais, cobranças, e-mails/WhatsApp, fontes reais, auditoria R2, gate humano e Bloco A. **NÃO VERIFICADOS:** licença web Anek Tamil, conformidade jurídica de cobrança pessoal, SLAs de produção, 99,5% real, escopo fiscal, hardware do benchmark e operador/plantões da verificação diária. A política comercial D-02/D-26 segue pendente.
