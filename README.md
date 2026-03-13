# collox

Web-first UNSW student hub scaffolding with a Next.js app, shared TypeScript
contracts, and monorepo tooling that can grow into web, API, and mobile apps.

## Current implementation

This repository now includes the first implementation slice:

- `apps/web`: Next.js App Router web app
- `packages/types`: shared domain types and initial product content
- `packages/config`: shared TypeScript configuration presets
- root workspace tooling with `pnpm` workspaces and `turborepo`

The current web app is an initial product-direction landing page with a
local-first authentication foundation. It does not yet include backend APIs,
deep third-party integrations, or Microsoft Graph data fetching.

The launchpad register now also has stable web routes and a read-only JSON
surface:

- `/launchpad`: full launchpad register
- `/launchpad/[slug]`: stable record URL for each tracked system
- `/api/launchpad`: machine-readable register output
- `/api/launchpad/[slug]`: machine-readable output for a single system record

## Getting started

Prerequisites:

- Node.js 22 or newer
- `pnpm` 10 or newer

Install dependencies:

- `pnpm install`

Run the web app in development:

- `pnpm dev`

Open `http://localhost:3000`.

## Local auth setup

The web app now uses Better Auth with a local SQLite database and secure
app-owned session cookies.

1. Copy `apps/web/.env.example` to `apps/web/.env.local`
2. Fill these environment variables:
   - `BETTER_AUTH_SECRET`
   - `BETTER_AUTH_URL`
3. Create the local auth schema:
   - `pnpm --filter @collox/web run auth:migrate`

Storage strategy:

- store only the minimum auth data needed: name, email, password hash, and sessions
- keep session state in secure app-owned cookies
- keep the SQLite auth database local to the web app
- do not store Microsoft or Office cookies or synced productivity data by default

## Validation commands

- `pnpm lint`
- `pnpm typecheck`
- `pnpm test` (currently validates shared launchpad/content contracts in `packages/types`)
- `pnpm build`

## Current product framing

The first screen intentionally stays honest about scope:

- local auth is implemented first so the public project stays lightweight
- dashboard modules are summary-first
- launchpad integrations are tracked in a register with stable URLs, JSON output, auth, SSO, terms, and delivery assumptions
- discovery questions are surfaced directly in the UI

## Next implementation priorities

1. Confirm the first UNSW systems to support in the launchpad
2. Decide whether passkeys, magic links, or both should be the next auth upgrade
3. Add mobile-web polish and PWA behavior to the authenticated flow
4. Fetch only the first user-approved data slice once a real integration is worth the extra storage