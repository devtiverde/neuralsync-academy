# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Vite HMR)
npm run build     # Production build
npm run lint      # ESLint
npm run preview   # Preview production build locally
```

No test framework is configured.

## Environment

Requires a `.env` file with:
```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_ANTHROPIC_API_KEY=...   # Required for QuizIA and Inventor (Phase 3)
```

## Architecture

**NeuralSync Academy** is a Brazilian Portuguese SaaS platform for parental control of children's screen time. The UI and all content are in pt-BR.

**Stack:** React 19 + Vite 8 + Tailwind CSS v4 (via `@tailwindcss/vite` plugin — no `tailwind.config.js`) + Supabase (auth + database).

**Key libraries:** `react-router-dom` v7, `framer-motion`, `recharts`, `jspdf`, `lucide-react`.

### Two user worlds

The app has two entirely separate interfaces that share no layout:

| World | Route prefix | CSS | Description |
|---|---|---|---|
| Parent (pai) | `/dashboard`, `/timer`, `/agenda`, `/relatorio`, `/notificacoes` | `src/styles/pai.css` | Parent management panel |
| Child (crianca) | `/home-crianca`, `/trilha`, `/timer-ativo`, `/ranking`, `/loja`, `/perfil-crianca`, etc. | `src/styles/crianca.css` | Gamified child experience |

There's also `/kids` (educational video catalog), `/ebook`, and public routes (`/`, `/auth`, `/planos`).

### Auth & data flow

- `src/lib/supabase.js` — exports a single `supabase` client instance
- `src/contexts/AuthContext.jsx` — provides `{ user, loading, signIn, signUp, signOut }` via `useAuth()` hook
- `src/main.jsx` — wraps `<App>` in `<AuthProvider>`
- **Route guards via `PrivateRoute` in `src/App.jsx`** — wraps all authenticated routes; redirects to `/auth` when unauthenticated. A `NotFound` component handles `*` route with auth-aware redirect (logged in → `/dashboard`, logged out → `/auth`).

### Supabase tables (inferred from code)

- `users` — `{ id, email, nome, tipo: 'pai' }` — created on sign-up
- `children` — `{ id, parent_id, nome, idade, faixa_etaria, nivel, xp, neural_coins, streak_atual, streak_maximo }` — managed by parent

### Child age tiers (`faixa_etaria`)

```
exploradores  → 3–5 anos
construtores  → 6–8 anos
criadores     → 9–11 anos
inventores    → 12+ anos
```

### Styling conventions

Pages use a mix of inline `style={{}}` props and Tailwind utility classes. The two CSS files (`pai.css`, `crianca.css`) define shared layout classes like `.page-wrapper` and `.header-gradient` used across their respective worlds. Tailwind v4 doesn't use a config file — add custom tokens via CSS `@theme` if needed.

### `setup.mjs`

A one-off code generation script that writes source files (e.g. `Planos.jsx`). Not part of the build pipeline — run with `node setup.mjs` if you need to regenerate scaffolded files.
