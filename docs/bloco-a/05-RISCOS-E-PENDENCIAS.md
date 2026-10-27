# Riscos e pendências do Bloco A

## Atualização dos riscos — 27/10/2026

Esta seção registra o estado posterior aos testes realizados no Windows. A matriz original abaixo permanece preservada como histórico da entrega inicial.

| ID | Estado atualizado | Evidência ou pendência |
| --- | --- | --- |
| A-BLK-01 | RESOLVIDO LOCALMENTE | npm ci, lockfile, lint, TypeScript, Vitest, E2E e build aprovados |
| A-BLK-02 | RESOLVIDO LOCALMENTE | Docker Compose operacional; PostgreSQL dev/test conectados; persistência dev validada após reinício |
| A-BLK-03 | RESOLVIDO LOCALMENTE | Chromium instalado; Playwright 3/3 aprovado |
| A-RSK-04 | RESOLVIDO LOCALMENTE | Instalação com npm ci concluída; auditoria npm com 0 vulnerabilidades |
| A-RSK-05 | PENDENTE | PostgreSQL 17 Alpine ainda utiliza tag sem digest fixado |
| A-RSK-06 | DIFERIDO | Verificação de fronteiras modulares antes da implementação dos módulos reais |
| A-RSK-07 | DIFERIDO PARA B | Identidade visual definitiva e Anek Tamil |
| A-RSK-08 | PARCIALMENTE VALIDADO | Gate automatizado aprovou EDT-08 e 61 IDs; conferência independente das fontes ainda pendente |

### Pendências do gate do Bloco A

- Auditoria independente da implementação e documentação.
- Reprodução das verificações críticas pelo auditor.
- Conferência de segurança e ausência de segredos no código versionado.
- Revisão do risco residual da imagem PostgreSQL sem digest fixado.
- Atualização final do handoff e decisão formal sobre o aceite.

Os testes locais não equivalem à auditoria independente.

**Decisão provisória:** Bloco A ainda sem aceite definitivo. Bloco B bloqueado.

---

| ID | Gravidade | Estado | Consequência | Resolução objetiva e gate |
|---|---|---|---|---|
| A-BLK-01 | ALTO / ambiente | npm registry indisponível (`EAI_AGAIN`) | Dependências não instaladas, sem lockfile, build/typecheck/lint/Vitest/E2E não comprovados | instalar em host conectado, gerar lockfile, rodar suíte e anexar logs; antes da auditoria final A |
| A-BLK-02 | ALTO / ambiente | Docker/Compose ausentes | PostgreSQL e isolamento DB não executados | subir ambos serviços, validar healthcheck, `db:ping` dev/test e reinício; antes da auditoria A |
| A-BLK-03 | MÉDIO | Navegador Playwright e pacote não instalados | E2E não executado | instalar Chromium e rodar E2E desktop/mobile; antes da auditoria A |
| A-RSK-04 | MÉDIO | Versões declaradas sem resolução de peer deps/lockfile | Compatibilidade operacional não provada | `npm install`, lock e testes com exit 0; auditoria A |
| A-RSK-05 | BAIXO | Imagem `postgres:17-alpine` por tag | Variação futura do patch | fixar digest após primeira extração confiável; auditoria A |
| A-RSK-06 | MÉDIO | Fronteiras modulares apenas documentadas | Futuro import privado indevido | checar arquitetura/lint de fronteiras antes do primeiro módulo real; gate C/D |
| A-RSK-07 | BAIXO | Anek Tamil e marca não incorporadas | Tela técnica não é UI final | validar licença e design system apenas no B |
| A-RSK-08 | MÉDIO | Correção EDT-08 não foi auditada independentemente nesta execução | risco documental residual | auditor independente conferir `EDT-08` e adendo no gate A |

**Sem autorização comercial:** D-02/D-26, ownership, planos e demais decisões futuras permanecem pendentes. Nada autoriza B automaticamente.
