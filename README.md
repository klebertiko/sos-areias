# S.O.S Areias

Site de arrecadação (vaquinha) para a reforma da pista de skate de Areias, em parceria entre a **Ruaria Skateparks** e a comunidade local do skate (Campeche / Morro das Pedras). O site apresenta o projeto, a meta de arrecadação, o cronograma da obra, as recompensas para doadores e um mural de apoiadores — com pagamento via PIX.

## Stack

- React 19 + TypeScript
- Vite 6
- Tailwind CSS 4
- lucide-react (ícones)
- API: funções serverless (`api/`) + Neon Postgres

O estado (arrecadado, apoiadores, chave PIX, meta, cronograma) é persistido no Postgres via `api/state.ts` e `api/supporters.ts`. `localStorage` é usado só como cache/otimismo local no client.

## Rodando localmente

**Pré-requisitos:** Node.js, um banco Neon Postgres (ver `infra/schema.sql`)

```bash
npm install
cp .env.example .env.local   # preencher DATABASE_URL e ADMIN_PASSCODE
npm run dev
```

Abre em `http://localhost:3000`.

## Scripts

```bash
npm run dev       # servidor de desenvolvimento
npm run build     # build de produção (dist/)
npm run preview   # preview do build de produção
npm run lint       # checagem de tipos (tsc --noEmit)
npm run clean      # remove dist/ e server.js
```

## Estrutura

```
api/
  state.ts          # GET/PUT do estado da campanha (pix key, meta, arrecadado, cronograma)
  supporters.ts      # CRUD de apoiadores/doações
  admin-login.ts      # valida o ADMIN_PASSCODE
  _lib/db.ts          # cliente Neon + checagem isAdmin (header x-admin-passcode)
src/
  components/     # UI: hero, progresso, cronograma, mural de apoiadores, modais (PIX, admin, privacidade)
  data/mockData.ts  # dados do projeto (orçamento, parceiros, cronograma, recompensas)
  utils/pix.ts      # geração de payload/QR Code PIX (BR Code)
  types.ts
infra/
  schema.sql          # DDL + seed do Postgres (idempotente)
  main.tf / vercel.tf  # Terraform: projeto Neon e projeto/env vars da Vercel (ver infra/README.md)
docs/
  CONTEXT.md                     # briefing e fonte de verdade do conteúdo do projeto
  APRESENTAÇÃO AREIAS.pdf        # projeto técnico assinado pela Ruaria Skateparks
```

## Painel do Coletivo (admin)

Acessível pelo rodapé do site ("Painel do Coletivo"), protegido pelo `ADMIN_PASSCODE`: o passcode digitado é enviado no header `x-admin-passcode` e checado no servidor (`api/_lib/db.ts`) antes de qualquer escrita — não é um sistema de contas/usuários, mas as rotas de admin exigem o segredo correto, não é só uma trava de UI. Permite:

- Editar a chave PIX, a meta e o total arrecadado
- Gerenciar o cronograma da obra (etapas, status, datas)
- Gerenciar as recompensas para doadores (adicionar, remover, marcar como popular)
- Registrar doações manuais e editar/remover doações existentes

## Conteúdo e fonte de verdade

Todo o conteúdo do site (orçamento, parceiros, cronograma, recompensas) deve refletir fielmente `docs/CONTEXT.md` e o projeto técnico em `docs/APRESENTAÇÃO AREIAS.pdf` — sem números ou informações inventadas.
