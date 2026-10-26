# 07 — Changelog e diff real v0.2 → v0.3

> Correções limitadas R1-01–07, com enunciados R1 históricos preservados ou explicitamente superados onde conflitantes. Nenhum arquivo original foi modificado.

| Documento | SHA antes (prefixo) | SHA depois (prefixo) | Motivo do ajuste |
| --- | --- | --- | --- |
| docs/bloco-0/00-MANIFESTO-E-FONTES.md | 925686912a1d | 2a3b699c752c | R1-01+R1-07 |
| docs/bloco-0/01-RASTREABILIDADE-REQUISITOS.md | 838a1c56b931 | 2a28d6565fd8 | R1-01+R1-05 |
| docs/bloco-0/02-PRD-E-ESCOPO.md | 44e814a893c8 | 56541f919c14 | R1-06 |
| docs/bloco-0/03-DECISOES-E-CONFLITOS.md | 39424c98ff46 | d634a2f1451f | R1-06 |
| docs/bloco-0/04-ORGANIZACOES-PERMISSOES.md | 8c940d1c17b3 | fa572694b758 | R1-04+R1-06 |
| docs/bloco-0/05-ESTADOS-EDITORIAL-E-AUDITORIA.md | a3c03143c766 | 95c4caf401c2 | R1-01 |
| docs/bloco-0/06-ARQUITETURA-E-CONTRATOS.md | 0497fcf8cc5b | eba1e2cd2e2e | refinamento transversal |
| docs/bloco-0/07-MODELO-DE-DADOS-LOGICO.md | 44fb0942ab25 | 7172b72b4bb1 | R1-01 |
| docs/bloco-0/08-FLUXOS-E-UX.md | e89c0aacd7b8 | 7bb744b2b08e | R1-01+R1-06 |
| docs/bloco-0/09-PLANOS-E-BILLING.md | f5df7539fd37 | f7ea9a4ef62d | R1-06 |
| docs/bloco-0/10-SEGURANCA-PRIVACIDADE-RISCOS.md | e2a6eb107489 | 5d74869f9f3d | R1-04 |
| docs/bloco-0/11-TESTES-E-GATES.md | bf4279af7c80 | c09186764c40 | R1-01+R1-02+R1-03+R1-04+R1-05 |
| docs/bloco-0/12-ROADMAP-REVISADO.md | 6b7bb416620f | d304df4e2c59 | R1-01+R1-03+R1-05 |
| docs/bloco-0/13-AUTO-CHECAGEM-DO-PACOTE.md | 831d78485deb | 2ed7f2c204b7 | refinamento transversal |


**Mapa de mudança por problema:** R1-01: 01/05/07/11/12 e `04-MATRIZ-RNF06.md`; R1-02: 05/11/01/03/04/06/09/10/12/13 e `02-CATALOGO-CANONICO-TESTES.md`; R1-03: 11/12 + `03-FIXTURES-MVP1.md`; R1-04: 04/10/11; R1-05: 01/11/12; R1-06: 02/03/04/08/09 + `05-CHECKOUT-ALTERNATIVAS.md`; R1-07: 00, auto-checagem 13.

**Diff real:** `corretivos/bloco-0/R2/10-DIFF-TEXTUAL-v0.2-v0.3.diff`, em formato unified e prefixos `a/` e `b/`. **Reproduzir:** em uma pasta temporária contendo `docs/bloco-0` extraído do ZIP original v0.2, executar `patch -p1 --dry-run -i /caminho/10-DIFF-TEXTUAL-v0.2-v0.3.diff`; então em outra cópia `patch -p1 -i ...` e comparar SHA-256 de todos os 14 `.md`. O script de verificação local obteve `exit code=0` e identidade byte a byte; sem executar aplicação, migrations ou Git.
