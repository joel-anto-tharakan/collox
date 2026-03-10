# collox

Web-first UNSW student hub scaffolding with a Next.js app, shared TypeScript
contracts, and monorepo tooling that can grow into web, API, and mobile apps.

## Current implementation

This repository now includes the first implementation slice:

- `apps/web`: Next.js App Router web app
- `packages/types`: shared domain types and initial product content
- `packages/config`: shared TypeScript configuration presets
- root workspace tooling with `pnpm` workspaces and `turborepo`

The current web app is an initial product-direction landing page. It does not
yet include Microsoft Graph data fetching or backend APIs, but it now includes
the first Microsoft Entra sign-in foundation.

## Getting started

Prerequisites:

- Node.js 22 or newer
- `pnpm` 10 or newer

Install dependencies:

- `pnpm install`

Run the web app in development:

- `pnpm dev`

Open `http://localhost:3000`.

## Microsoft login setup

The web app now uses Auth.js with the Microsoft Entra ID provider.

1. Copy `apps/web/.env.example` to `apps/web/.env.local`
2. Create a Microsoft Entra app registration
3. Add this redirect URI:
   - `http://localhost:3000/api/auth/callback/azure-ad`
4. Fill these environment variables:
   - `AUTH_SECRET`
   - `AUTH_MICROSOFT_ENTRA_ID_ID`
   - `AUTH_MICROSOFT_ENTRA_ID_SECRET`
   - `AUTH_MICROSOFT_ENTRA_ID_ISSUER`

Recommended issuer values:

- single tenant: `https://login.microsoftonline.com/<tenant-id>/v2.0`
- work/school accounts: `https://login.microsoftonline.com/organizations/v2.0`
- multi-tenant including personal Microsoft accounts: `https://login.microsoftonline.com/common/v2.0`

Storage strategy:

- do not reuse Office browser cookies
- let Microsoft handle login at `login.microsoftonline.com`
- let `collox` store its own encrypted HttpOnly Auth.js session cookie

## Validation commands

- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`

## Current product framing

The first screen intentionally stays honest about scope:

- Microsoft sign-in is scaffolded, but needs Entra app registration values to run live
- dashboard modules are summary-first
- launchpad integrations are classified as assumptions to validate
- discovery questions are surfaced directly in the UI

## Next implementation priorities

1. Confirm the first UNSW systems to support in the launchpad
2. Provide or create a Microsoft Entra app registration for local and deployed environments
3. Fetch the first authenticated Microsoft Graph slice, likely profile or calendar summary
4. Add backend persistence once a database exists