# Bloco B — Implementação da fundação visual

**Branch:** `feat/bloco-b-design-system-shells`. **Estado:** implementação em análise, não aprovada por auditoria.

## Entregáveis

- `src/app/globals.css`: tokens de marca/semânticos para cores, superfícies, espaçamento, foco e layout responsivo.
- `src/app/layout.tsx`: tipografia Anek Tamil via `next/font/google`, gerada no build e servida localmente pelo Next; fallback acessível de sistema.
- `src/components/ui/primitives.tsx`: componentes reutilizáveis ActionLink, ActionButton, TextField, StatusLabel, SectionEyebrow, InfoChip e FeedbackState (carregamento/vazio/erro).
- `src/components/shells/site-header.tsx` e `site-footer.tsx`: navegação em âncoras reais e menu responsivo de HTML nativo.
- `src/components/shells/admin-shell-preview.tsx`: somente componente de apresentação, NÃO montado em rota/admin.
- `src/app/page.tsx`: casca pública de apresentação, jornada prevista e catálogo com estado vazio. Nunca exibe dados fictícios, simula busca ou links de inscrição.

## Limites deliberados

- Nada de ORM, migrations, autenticação, admin real, captura de e-mails, API pública, busca, dados de editais ou checkout.
- `/admin`, `/api/admin`, `/login` continuam 404.
- A vitrine geométrica `f.` é elemento tipográfico abstrato **decorativo** (aria-hidden), não reprodução do logotipo original. Assinatura textual simples até receber o vetor oficial.
- Funcionalidades futuras são identificadas como previsões, não afirmações de disponibilidade.

## Testes e gate

`npm ci`, `npm run verify:static`, `npm run test:offline`, `npm run docs:gate`, `npm run test:e2e`. Revisão manual visual para 375px, 768px, desktop; zoom 200/400% e contraste em estados reais. Novos testes em `tests/e2e/design-system.spec.ts` (incluindo screenshots anexados em 320/375/768/1280 px) e `tests/unit/design-states.test.tsx`.

**Não conceder aceite B sem auditoria independente, licença e testes reproduzidos em ambiente separado.** O Bloco C permanece bloqueado.
