# Evidências, integridade e gate final — Reauditoria R2

**Objeto:** ZIP v0.3-R2, 26 arquivos, submetido sem modificação. **Data de execução:** 26/10/2026. Todos os comandos citados são verificações documentais locais, não de aplicação. `OK` significa apenas resultado do respectivo procedimento.

## Fonte, hash e CRC

| Insumo | SHA-256 calculado diretamente | Entradas / estado |
|---|---|---|
| FOMENTO_BLOCO_0_DOCUMENTACAO_v0.3(1).zip | `f1ef662de2cd8b6236984f3ce92281e01d2fde70b7a629a126f055e9599b1d21` | 26, CRC OK |
| FOMENTO_BLOCO_0_DOCUMENTACAO_v0.2(1).zip | `4d6bf04a61e34dfba5402cfdc9fa3adfe38daeaf44c984541ce931ccb5a8fc61` | 22, CRC OK |
| FOMENTO_REAUDITORIA_INDEPENDENTE_BLOCO_0_R1_v0.1(1).zip | `b37524268639835c88727591e3220ca137e76f1b90d7a3ceb6086381ec0d7e36` | 9, CRC OK |
| DOCX de requisitos | `adf7a4d06916f7f5408646db6b0ceb23937a60f37e87a79007fa80b387e64957` | 4 páginas, analisado |
| PDF ID | `50e61c488112a18d5dc8bd7bc6d101f22501b18487af94506e232e0c9f11ff50` | 13 páginas, páginas visuais inspecionadas |

Além desses: v0.1 e auditoria v0.1 acessíveis, CRC OK e SHA-256 verificados para proveniência. Os planos mestres históricos no ZIP v0.3 reproduzem os hashes do manifesto. Não há repositório Git de aplicação sob auditoria.

## Procedimentos reproduzíveis e resultados

| Procedimento e comando | Resultado / exit code | Evidência |
|---|---|---|
| `python` com `hashlib.file_digest(..., 'sha256')` | 0; três ZIPs e originais com SHA informado | tabela acima |
| `zipfile.ZipFile(...).testzip()` | 0; `None` = zero entradas corrompidas em v0.1, v0.2, v0.3, audit v0.1 e R1 | inventário independente |
| `zipfile.namelist()` | 0; v0.3 14 docs + 2 planos + 9 relatórios R2 + 1 diff | inventário paths relativo |
| `patch -p1 --dry-run < 10-DIFF...diff` em cópia v0.2 | 0; sem conflitos | saída: 14 linhas `checking file docs/bloco-0/00...13` (log local não incluído no ZIP) |
| `patch -p1 < 10-DIFF...diff` em segunda cópia de teste | 0; aplicou mudanças | saída: 14 linhas `patching file docs/bloco-0/00...13` (log local não incluído no ZIP) |
| Leitura de bytes dos 14 Markdown reconstruídos comparada ao ZIP v0.3 | 0; **14/14 idênticos** | inventário hash e diff |
| Busca 13 hashes em `00` e comparação com bytes reais | 0; **13/13 corretos**; o manifesto não consta da própria tabela | `00 §R2` |
| Script de extração da tabela canônica `11 §R2` | 0; **61 linhas e 61 IDs únicos** | `04-AUDITORIA-CATALOGO-TESTES-E-MVP1.md` |
| Regex de linhas de fixture E1–E10 | 0; dez IDs únicos, 8 published / 2 draft | `03-FIXTURES-MVP1.md` |
| Reconstrução de eventos da semana `04-MATRIZ-RNF06.md` | 0; F=19/21, E=37/42, F tentativa=20/21, E tentativa=39/42, 4 PASS/3 FAIL | `03-AUDITORIA-RNF06-E-OPERACAO.md` |
| Inspeção DOCX com parser OOXML e PDF renderizado | 0; RF01–RF10, seis RNFs, preço e fluxo, guia marca | evidências textuais/visuais, sem extrapolar para código |
| Varredura das 28 decisões na matriz normativa `03` | 0; D-01 a D-28 presentes e PENDENTES | `07-DECISOES-PARA-DELIBERACAO.md` |

**Nota de contagem:** `03` contém mais de uma tabela histórica com linhas D-xx; a contagem correta usa os **28 identificadores únicos da matriz normativa**, não linhas duplicadas como 56 decisões. Subfases AUTH-11A/B não ampliam a contagem de 61 casos canônicos.

## Inventário e hashes dos sete primeiros relatórios de auditoria

| Relatório em `auditoria/bloco-0/R2/` | Bytes | SHA-256 |
|---|---:|---|
| `01-VEREDITO-EXECUTIVO.md` | 5157 | `20a3db5a931bd6b6976bb1d16cb301bab8a50a80c5726b1bc6894167f1129817` |
| `02-MATRIZ-7-ACHADOS.md` | 3408 | `38d03b8f78e1c2459f6748570bfdc03ad9ccb8cb057b9258d6068640ef2f0067` |
| `03-AUDITORIA-RNF06-E-OPERACAO.md` | 5179 | `e182b70302ab0f4e4a7595a3109b33644e7e76190630a2a52e09f1435c3851a4` |
| `04-AUDITORIA-CATALOGO-TESTES-E-MVP1.md` | 6194 | `5488fca110ff8fd0946866e756c8edc727f919d98004db50a40fe02d1fdf2891` |
| `05-AUDITORIA-BILLING-E-ARQUITETURA.md` | 5031 | `8987a42f163d11fcd8af0ebebca7d10826f45bb0224386dda311ec4a2e651549` |
| `06-REGRESSOES-E-NOVOS-ACHADOS.md` | 4647 | `98ba2e92cc3e8602bd9b221b9012f42b7fdf4950a89d1cd383b90e0be6f920de` |
| `07-DECISOES-PARA-DELIBERACAO.md` | 5609 | `e150b035fa595958a93ab7439fd02736e029af855c616b47dcf397c0aaaaa92b` |

**Este documento 08 é deliberadamente excluído de sua própria tabela SHA-256**, evitando referência circular. Seu hash e o hash do ZIP constam da resposta final e da verificação externa pós-empacotamento; o ZIP não contém a si mesmo.

## Veredito consolidado

**APTO PARA DELIBERAÇÃO HUMANA**. R1-01/04/05/06 resolvidos condicionalmente; R1-02/03/07 resolvidos documentalmente. Um achado **R2-01 MÉDIO** de gate de `EDT-08` deve ser corrigido pontualmente antes de fixar gate D/F; não há CRÍTICO/ALTO impeditivo da deliberação. O documento de decisão oferece alternativas e últimos gates. **Bloco 0 não aprovado**, arquitetura não congelada, A não autorizado.

## Verificações deliberadamente NÃO EXECUTADAS

- Testes unitários, integração, E2E, acessibilidade de interface, segurança dinâmica, recuperação, concorrência ou load test de aplicação; não existe implementação autorizada.
- Atualização diária efetiva de fontes, crawl/scraping, disponibilidade de instituição, SLA 99,5% ou domínio/hospedagem.
- Checkout, gateway PCI-DSS, pagamentos, WhatsApp, envio de e-mail real ou webhook externo.
- Auditoria jurídica LGPD final, homologação de licença web Anek Tamil ou certificado de produção.
- Migrations, PostgreSQL, Docker, Git remoto, branch/commit, push/PR, deploy; nenhuma etapa do Bloco A.

## Condições para a próxima etapa

1. Apresentar deliberação formal D-09/D-23 e decisões que precisem ser ratificadas para qualquer migração real futura.
2. Registrar R2-01 como correção mínima de classificação antes da adoção do catálogo como gate de testes de D/F, sem reabrir as especificações resolvidas.
3. Separar **aceite documental** de **autorização expressa para A**; neste ato de auditoria não ocorreu nenhum dos dois.

A execução termina com este relatório e oito documentos na pasta isolada `auditoria/bloco-0/R2/`.
