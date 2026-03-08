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
yet include Microsoft Entra sign-in, Microsoft Graph calls, or backend APIs.

## Getting started

Prerequisites:

- Node.js 22 or newer
- `pnpm` 10 or newer

Install dependencies:

- `pnpm install`

Run the web app in development:

- `pnpm dev`

Open `http://localhost:3000`.

## Validation commands

- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`

## Current product framing

The first screen intentionally stays honest about scope:

- Microsoft 365 auth is planned, but not wired yet
- dashboard modules are summary-first
- launchpad integrations are classified as assumptions to validate
- discovery questions are surfaced directly in the UI

## Next implementation priorities

1. Confirm the first UNSW systems to support in the launchpad
2. Confirm whether a Microsoft Entra app registration can be created
3. Implement sign-in with minimal delegated Microsoft scopes
4. Add a first authenticated dashboard slice, likely profile or calendar summary