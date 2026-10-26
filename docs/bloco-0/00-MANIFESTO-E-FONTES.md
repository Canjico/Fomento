# 00 — Manifesto, fontes, proveniência e integridade

> **Documento de proposta para auditoria, versão 0.3-R2 · 26/10/2026.** Apenas o Bloco 0. As seções marcadas **PROPOSTA**, **PREMISSA** e **DECISÃO PENDENTE** não constituem autorização de implementação, contrato congelado ou política comercial aprovada.

**Registro histórico R1:** versão derivada do pacote v0.1, corrigida sob AUD-01–AUD-15. Todas as definições de R1 são **PROPOSTAS CONDICIONAIS**, não decisões aprovadas; a matriz D-01–D-28 em `03-DECISOES-E-CONFLITOS.md` prevalece como índice de gates. Nenhuma migração, implementação ou aceite foi executado.

**Convenção de rastreabilidade:** `ORIGINAL` = conteúdo sustentado pelos anexos primários; `PROPOSTA` = desenho técnico; `PREMISSA` = hipótese; `DECISÃO PENDENTE` = aprovação requerida; `CONFLITO` = tensão entre fontes/planos. Referências: `REQ` (DOCX, página/seção), `ID` (PDF, página), `P02` e `P01` (planos mestres, seção).

## 1. Objeto e escopo fechado

Pacote atual de **documentação do Bloco 0** do Fomento (nome técnico) / Fomentoria (marca exibida): **v0.3-R2 (26/10/2026, CORRETIVO DOCUMENTAL, NÃO APROVADO)**, derivado da v0.2-R1, por sua vez derivada da v0.1 de 25/10/2026. A versão v0.1 mencionada aqui é **histórica**, não a versão corrente. Não há código de aplicação, banco, scripts executáveis, migrations, containers, deploy, credenciais, conexão externa, branch, commit ou PR neste pacote. A ausência de código é **requisito**, não omissão.

## 2. Fontes e hierarquia

| Prioridade | Fonte | Uso legítimo |
|---|---|---|
| 1 | `REQ`: Fomentoria_Documento_de_Requisitos (3).docx, setembro 2026, 4 páginas de conteúdo | RF/RNF, personas, funcionalidades, sete fases, preços/benefícios de referência |
| 1 | `ID`: Fomentoria ID.pdf, 13 páginas | símbolo, assinatura, paleta, tipografia, tom e aplicações de identidade |
| 2 | `P02`: FOMENTO_PLANO_MESTRE_LOCAL_v0.2.md, biblioteca do usuário | organização em blocos, critérios A01–A08, lacunas e protocolo de auditoria |
| 3 | `P01`: FOMENTO_PLANO_MESTRE_LOCAL_v0.1.md, biblioteca do usuário | premissas anteriores e comparação de evolução do plano |

A disponibilidade dos quatro arquivos foi verificada por acesso aos bytes. Os planos v0.1/v0.2 vieram da biblioteca do usuário e foram copiados sem edição para `fontes/`. O DOCX e PDF estão anexados à conversa e foram analisados diretamente, mas **não estão repetidos no ZIP**: o PDF original tem 204.366.764 bytes (~204 MB), e o pacote prioriza download leve dos 14 entregáveis. Para auditoria independente, fornecer também os dois anexos originais recebidos, confrontando os hashes abaixo. Os planos são propostas, não substituem requisitos de negócio e identidade.

### SHA-256 dos quatro insumos (bytes originais)

| Chave | Localização (ou referência externa) | Tamanho (bytes) | SHA-256 |
|---|---|---:|---|
| `REQ` | **Anexo DOCX original desta conversa (fora do ZIP)** | 15,586 | `adf7a4d06916f7f5408646db6b0ceb23937a60f37e87a79007fa80b387e64957` |
| `ID` | **Anexo PDF original desta conversa (fora do ZIP)** | 204,366,764 | `50e61c488112a18d5dc8bd7bc6d101f22501b18487af94506e232e0c9f11ff50` |
| `P02` | `fontes/FOMENTO_PLANO_MESTRE_LOCAL_v0.2.md` | 31,551 | `18d49c15877f6676ac12db0a0e55c0acc95f797a949c4aaa9bebad7ff6c6276b` |
| `P01` | `fontes/FOMENTO_PLANO_MESTRE_LOCAL_v0.1.md` | 20,121 | `286019de9e843dba86b34c6ba7e26f259a266496b134fd16331edde26456b79c` |

## 3. Registro histórico de integridade R1 (v0.2; SUPERADO por tabela R2 abaixo)

**Os SHA-256 da tabela antiga v0.1 ficam substituídos por estes valores da cópia corrigida v0.2.** O manifesto 00 está **deliberadamente excluído** de sua própria tabela de hashes para evitar referência circular; o SHA de 00 consta no relatório independente de integridade `corretivos/bloco-0/R1/05-EVIDENCIAS-E-INTEGRIDADE.md`.

| Documento | Bytes | SHA-256 v0.2 |
|---|---:|---|
| `01-RASTREABILIDADE-REQUISITOS.md` | 10,643 | `838a1c56b931dd014d11d82db24ea40ad7d57f4437747279cf03775c78ab1d1a` |
| `02-PRD-E-ESCOPO.md` | 7,820 | `44e814a893c859a465781791b2114e067368335370425b94d407743fbdefeb15` |
| `03-DECISOES-E-CONFLITOS.md` | 17,120 | `39424c98ff46af472db326b8c3423ea8f37c310acfae6b6f2e48f90a64c82351` |
| `04-ORGANIZACOES-PERMISSOES.md` | 18,331 | `8c940d1c17b378c7a4a507f088a5512d7c37643713345ff96bd7e49aea91e4b9` |
| `05-ESTADOS-EDITORIAL-E-AUDITORIA.md` | 18,434 | `a3c03143c76664d9be3678337a35aaf22b3ee96a18787684049990646584e31f` |
| `06-ARQUITETURA-E-CONTRATOS.md` | 15,177 | `0497fcf8cc5ba6b2de5fddf1ef70c9e59a3a2095fee3634830c168c4192f1eed` |
| `07-MODELO-DE-DADOS-LOGICO.md` | 19,748 | `44fb0942ab2535f512c31ca8fe5f1d4c2058ace682c06338f1f9f7d69e68babe` |
| `08-FLUXOS-E-UX.md` | 12,207 | `e89c0aacd7b8c57f13ef3537db2df964048c6d02a6eeeaf0b0749eecd0ad2318` |
| `09-PLANOS-E-BILLING.md` | 12,507 | `f5df7539fd37a693b5f0272d0dffcf6b1101160aa80b411b0b39ee28fb4272ca` |
| `10-SEGURANCA-PRIVACIDADE-RISCOS.md` | 10,829 | `e2a6eb107489a7f35303fa825a58e6cee04bc6b35974c84a6fa06885395b9784` |
| `11-TESTES-E-GATES.md` | 15,326 | `bf4279af7c808d427b68c34f882351feafc72cebd46e08f7bd414bb17a29b6e7` |
| `12-ROADMAP-REVISADO.md` | 20,986 | `6b7bb416620ff9efee64f473122718df66f720ad5775c0e0c101ad7e95c8e2cf` |
| `13-AUTO-CHECAGEM-DO-PACOTE.md` | 10,892 | `831d78485debdb0789d9a3f61eb2e48ba6447868586d77ab147c4a8792dd5970` |

**Nota de integridade:** os dois planos mestres históricos `fontes/` preservam seus SHA-256 originais e não foram editados. O DOCX e PDF originais continuam fora do ZIP por tamanho; seus hashes na §2 foram verificados novamente em R1. O pacote original v0.1 e a auditoria v0.1 também permanecem intocados.

## 4. Extração, referências e evidência de cobertura

- DOCX: leitura de parágrafos e tabelas via processador OOXML local; confirmado texto `RF01`–`RF10`, seis RNFs, quatro personas, três preços e sete fases; REQ tem quatro páginas conforme marcação do documento.
- PDF: contagem física de **13 páginas**, leitura visual das aplicações e texto do manual; ícone/assinaturas p.2–4, cores p.5, tipografia p.7, slogan p.9, redes p.10–11. A fonte não define grids/funcionalidades do site. Anek Tamil web/licença: **NÃO VERIFICADO**.
- P02: revisão das seções 3A A01–A08, §4 23 blocos, §7A auditoria, §8 gates, §9 RF e §12 decisões pendentes. P01: mapa de fases e lacunas; P02 acrescenta critérios de multiempresa, auditoria e Gate MVP 1. Não tratar diferenças como novos requisitos ORIGINAIS.
- Nenhuma verificação de autenticidade/autoridade dos documentos, registro público de marcas, licença de assets visuais ou completude de fontes externas foi executada.

## 5. Estado do repositório

Repositório Git do Fomento **não fornecido nem identificável como checkout nesta área de trabalho**. HEAD/branch/dirty-state: **NÃO VERIFICADO**; nenhum Git foi criado ou alterado.

## 6. Classificação das evidências e limites

**ORIGINAL:** somente fatos localizáveis no DOCX/PDF. **PROPOSTA:** técnicas e fluxos sugeridos para aprovação. **PREMISSA:** hipótese sem validação de usuário/mercado. **DECISÃO PENDENTE:** itens listados em `03`, sem congelamento. **CONFLITO:** C-01..08 documentados, incluindo lista pessoal/tenant, checagem diária/manual, canais e status. **NÃO VERIFICADO:** licença web da fonte, repositório não fornecido, requisitos legais operacionais/produção, testes de app não existente, integração real, auditoria independente.

## 7. Caminhos do pacote

`docs/bloco-0/00..13-*.md` = 14 entregáveis de planejamento; `fontes/` = dois planos mestres preservados (não são entregáveis novos); **DOCX e PDF originais não estão no ZIP** e precisam acompanhar a execução da auditoria independente como anexos externos. Todos os caminhos empacotados são relativos à raiz deste ZIP. Nenhum arquivo foi gravado em repositório de aplicação.

## 8. Condição de encerramento

Status **HISTÓRICO v0.1: PRONTO PARA AUDITORIA INDEPENDENTE**, condicionado à validação física da montagem e ressalvas registradas em `13`; **NÃO APROVADO**, sem arquitetura congelada e sem iniciar Bloco A. A auditoria independente e o gate humano são etapas posteriores.

## R1 — Proveniência do corretivo e condição atual (26/10/2026)

- **Entrada documental:** `FOMENTO_BLOCO_0_DOCUMENTACAO_v0.1.zip` SHA-256 `98cba093f825ee2680e2e17d156c24c405f13bc41585f8785876a595a0d1c557`; **entrada de auditoria:** `FOMENTO_AUDITORIA_INDEPENDENTE_BLOCO_0_v0.1.zip` SHA-256 `c51edd9233f2cfd52849797fcdcef7044a1b8181794ab074304c2c50df6bfb9e`. Hashes confirmados diretamente dos arquivos entregues.
- **Alterações realizadas apenas em cópia:** os 14 Markdown receberam versão `0.2-R1`; D-01–D-28 permanecem decisões **PENDENTES**; 15 achados tratados documentalmente; 5 relatórios e diff real em `corretivos/bloco-0/R1/`.
- **Originais de autoridade:** `REQ` (DOCX) p.1–4 e `ID` (PDF) p.1–13 preservados por referência/hashes. P02 e P01 são fontes históricas, não contratos aprovados.
- **Limites:** nenhum software, database, migration, API, serviço, pagamento, envio externo, operação Git ou deploy; nenhuma reauditoria independente ou aceite humano. O resultado é **PRONTO PARA REAUDITORIA COM RESSALVAS**, não congelamento de arquitetura.
- **Reprodutibilidade:** compare `SHA256SUMS` lógico da tabela §3 com os bytes dos documentos, confira integridade CRC do ZIP; use `corretivos/bloco-0/R1/06-DIFF-TEXTUAL-v0.1-v0.2.diff` para reconstruir as mudanças. O SHA global do arquivo ZIP é entregue separadamente, pois não é possível embuti-lo no próprio ZIP sem circularidade.

## R2 — Versão corrente, linhagem, sem autoaprovação (R1-07)

**Versão corrente do pacote: v0.3-R2, 26/10/2026, documental, NÃO APROVADO.** Histórico: v0.1 gerada 25/10, auditada na auditoria v0.1; v0.2-R1 corrigida a partir da auditoria v0.1, reavaliada em R1; v0.3-R2 é a revisão delimitada dos achados R1-01 a R1-07. Fontes primárias imutáveis DOCX/PDF com hashes na §2; planos P01/P02 históricos byte a byte. **A tabela §3 acima é HISTÓRICA v0.2 e NÃO deve ser usada para validar hashes v0.3.** Somente a próxima tabela R2 valida os 13 documentos corrigidos. Os 9 relatórios R2 e diff possuem inventário externo `08-EVIDENCIAS-E-INTEGRIDADE.md`; não são auto-hashados neste manifesto para evitar dependência circular. A nova reauditoria independente R2 e o aceite humano ainda NÃO ocorreram; nenhum contrato foi congelado, Bloco A não autorizado.

## R2 — SHA-256 canônico dos 13 documentos da v0.3 (exceto este manifesto)

A tabela histórica §3 refere-se EXCLUSIVAMENTE à v0.2-R1. **Autoridade de integridade da versão corrente v0.3-R2 é somente esta tabela R2.** O SHA deste manifesto não consta aqui, evitando dependência circular. Os relatórios R2 e o diff são inventariados em `08-EVIDENCIAS-E-INTEGRIDADE.md`, nunca incorporados por hash neste manifesto.

| Documento v0.3 | Bytes | SHA-256 |
| --- | --- | --- |
| `01-RASTREABILIDADE-REQUISITOS.md` | 11723 | `2a28d6565fd816fca70cbab616a616277e47f53eb762319597a5cecff3a76aed` |
| `02-PRD-E-ESCOPO.md` | 8607 | `56541f919c145fef26394ef4229624f6b93585432581c3a6b8c224163d5fa4e0` |
| `03-DECISOES-E-CONFLITOS.md` | 19434 | `d634a2f1451f2b6d7bb0d67f1d75aa901bad2592424c7600d7911600e270c9c5` |
| `04-ORGANIZACOES-PERMISSOES.md` | 19981 | `fa572694b7580a2ed28f6ce6e67fe5eb1df20b3768cc90361d1a8187e31eac8d` |
| `05-ESTADOS-EDITORIAL-E-AUDITORIA.md` | 24118 | `95c4caf401c27700634614b6c6a6a0a127347facb0477c3edbcd3c27319dcf5a` |
| `06-ARQUITETURA-E-CONTRATOS.md` | 15694 | `eba1e2cd2e2eec448ca6cda90b235788d80a8838111550eb4a6906c704539d48` |
| `07-MODELO-DE-DADOS-LOGICO.md` | 20831 | `7172b72b4bb11c1bfbf1ed14df9cbe30f562719532bb0bb6d02f4e0d599585f8` |
| `08-FLUXOS-E-UX.md` | 13217 | `7bb744b2b08e85519a2c78afbb098ba4f66bd8a8f84ae434704df4c6d36f5c44` |
| `09-PLANOS-E-BILLING.md` | 14037 | `f7ea9a4ef62d8313859988af32230d8e6c7084881dcc5a402e2681b847144018` |
| `10-SEGURANCA-PRIVACIDADE-RISCOS.md` | 11798 | `5d74869f9f3d65f4dae2be59c05d8e7b5f2b968bb79a010e91c3182dc1e95bbd` |
| `11-TESTES-E-GATES.md` | 35567 | `c09186764c40bc283063d4d6a8ca98d9e6439a862b5120a69606bd64ec11323a` |
| `12-ROADMAP-REVISADO.md` | 22887 | `d304df4e2c59e587ad555b284be56faa214f93584889c3eddab8b01307c57c21` |
| `13-AUTO-CHECAGEM-DO-PACOTE.md` | 14242 | `2ed7f2c204b770b7dc35b97b3ddf36ab0b5951ffc32ff71914e24cac93de7f06` |
