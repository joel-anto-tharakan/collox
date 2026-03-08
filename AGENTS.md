# AGENTS.md

## Repository overview

- Repository name: `collox`
- Product direction: build a web-first UNSW student hub, then expand to Android and iOS apps
- Primary users: students of the University of New South Wales (UNSW)
- Primary identity provider: Microsoft 365 / Microsoft Entra ID via `unsw.edu.au` accounts
- Goal: provide one authenticated hub where a student can view and launch the different systems, information sources, and services they use
- Current state: greenfield repository with only `README.md`, `LICENSE`, and this file

## Product intent

The product should become an integrated student hub for UNSW. The website comes first. Native mobile apps come later, but the architecture should be chosen so the mobile apps can reuse business logic, data models, API contracts, and design decisions as much as practical.

The hub should support:

1. sign-in with the student's UNSW Microsoft 365 account
2. a personalized dashboard for the student's most important information
3. a launchpad for UNSW systems and approved third-party systems
4. integrations with Microsoft 365 data that the student explicitly authorizes
5. eventual reuse of the same backend and shared packages for Android and iOS apps

## Confirmed v1 product shape

The initial product experience is now defined as:

1. the student signs in through Office 365 using their UNSW Microsoft account
2. after authentication, the application shows a launcher-style home screen
3. the home screen presents icons for each approved third-party or university service
4. each icon opens the corresponding external service as an authenticated launch site or quick link
5. v1 prioritizes launch sites and quick links over deep data sync

For v1, optimize for a clean, fast app-launcher experience rather than a complex dashboard.

## Product assumptions and scope boundaries

- Prefer official APIs, official SDKs, and supported SSO flows over scraping
- Prefer link-out or deep-link launchers for systems that do not expose suitable APIs
- Do not store a student's raw Microsoft password in the repository, source code, or plaintext local files
- Do not assume every third-party service can be embedded; some may only support SSO and external launch
- Do not assume tenant-wide admin consent is available until the user confirms it

## Recommended technical direction

When application code is introduced, default to a single TypeScript monorepo:

- workspace management: `pnpm` workspaces
- task orchestration and caching: `turborepo`
- web app: `Next.js` with TypeScript and App Router
- future mobile app: `Expo` / React Native with TypeScript
- backend API: `NestJS` with TypeScript
- database: `PostgreSQL`
- ORM and schema management: `Prisma`
- client-side server-state fetching: `TanStack Query`

This stack is preferred because:

- it keeps web, mobile, and backend on one language
- Next.js is a strong default for a web-first product
- Expo provides a practical path to Android and iOS later
- NestJS is a good fit for structured integrations, background jobs, and auth-heavy backend work
- PostgreSQL and Prisma are stable defaults for user settings, cached metadata, and integration state

## Proposed repository layout once implementation begins

Keep the first real implementation minimal, but steer toward this shape:

- `apps/web` for the Next.js web application
- `apps/api` for the NestJS backend
- `apps/mobile` for the future Expo app
- `packages/types` for shared types and API contracts
- `packages/config` for shared TypeScript, lint, and tooling config
- `packages/ui` only after a real need for reusable UI emerges

Share business logic, types, validation schemas, API clients, and design tokens first. Do not over-invest in cross-platform shared UI before the web product is proven.

## Microsoft 365 integration guidance

For identity and Microsoft data access, prefer:

- Microsoft Entra ID for authentication
- MSAL for client authentication flows
- Microsoft Graph for Microsoft 365 APIs

Implementation guidance:

1. Start with delegated permissions, not application permissions, unless a background service truly requires app-level access.
2. Request the minimum scopes needed for a feature.
3. Use incremental consent rather than asking for every permission upfront.
4. For web, prefer standard Entra ID OAuth 2.0 / OpenID Connect flows with PKCE.
5. Use Microsoft Graph best practices, including throttling-aware retries and honoring `Retry-After`.
6. Test Graph calls in a constrained, feature-by-feature way instead of enabling broad permissions early.

Initial Microsoft 365 features that are reasonable to explore first:

- identity and session management needed for Office 365 sign-in
- lightweight profile display if available after sign-in

Avoid requesting broad or admin-sensitive scopes until the exact feature requires them.

## Third-party website integration guidance

The hub should also help students reach third-party systems that can be accessed with the same UNSW Microsoft 365 identity.

For each target system, agents should classify the integration as one of:

1. official API integration
2. Microsoft Entra ID SSO launch integration
3. deep-link or external launch only
4. unsupported until legal, technical, or security approval exists

Maintain an integration register once the product starts. For each external system, track:

- system name
- business purpose
- API availability
- auth method
- SSO compatibility
- owner or support contact
- rate limits
- terms of use constraints
- whether the system should be embedded, proxied, or linked out

Do not scrape authenticated third-party student systems unless the user explicitly asks for it and the legal, technical, and security implications are clear.

## Initial known target integrations

The first known non-Microsoft systems to plan around are:

1. `https://webcms3.cse.unsw.edu.au/`
2. `https://moodle.telt.unsw.edu.au/`

Initial integration assumptions:

- `WebCMS3` should be treated as a high-priority UNSW academic system for course content and course operations.
- `Moodle` should be treated as a high-priority UNSW learning platform for course resources, submissions, and teaching workflows.

Initial classification guidance until real access is tested:

- `WebCMS3`: default to `deep-link or external launch only` unless an official API, supported SSO path, or explicit permission for deeper integration is confirmed.
- `Moodle`: investigate both `official API integration` and `Microsoft Entra ID SSO launch integration`, but do not assume UNSW has enabled the necessary Microsoft login or Moodle web service capabilities until verified.

Initial research notes:

- Publicly visible information suggests `WebCMS3` uses direct `zID` / `zPass` sign-in and does not expose obvious public API documentation.
- Moodle as a platform can support Microsoft-based authentication and integration, but UNSW-specific enablement and available APIs still need verification.

For both systems, the first implementation pass should likely provide:

1. authenticated launch tiles from the hub
2. metadata cards or quick links if official APIs are available
3. no embedded automation or scraping without explicit approval

The launcher UI should use recognizable service icons and concise labels so the student can reach each system with minimal friction.

## Research findings that should guide implementation

The current default direction is informed by the following practical considerations:

- Microsoft strongly supports web authentication with Entra ID, MSAL, and Microsoft Graph
- Microsoft Graph integrations should follow delegated permissions, least privilege, and throttling-aware retries
- Expo now has first-class monorepo support with `pnpm`, which makes a future mobile app compatible with a shared web/mobile repository structure
- Native mobile Microsoft auth needs an early proof of concept, so the web application should be the first production target and the backend API should remain platform-neutral
- Based on initial public research, `WebCMS3` and `Moodle` should be planned as separate integration tracks rather than assumed to be directly backed by the same Microsoft 365 APIs

## MCP recommendations

No MCP servers are configured in this repository yet. The following MCPs are recommended for this project:

1. GitHub MCP for repository, PR, issue, and CI inspection
2. Browser automation or Playwright MCP for end-to-end testing of the web app
3. Documentation-search MCP focused on Microsoft Learn, Next.js, Expo, and Prisma docs
4. A custom Microsoft Graph MCP server for safe schema discovery, test queries, and integration prototyping
5. An Azure or Entra-focused MCP, if available, for app registrations, tenant configuration visibility, and auth setup guidance
6. A Postgres MCP once the database exists, to inspect schema and validate data safely

If only one custom MCP is added early, prioritize the Microsoft Graph MCP because Microsoft 365 integration is central to the product.

## Secure handling of Microsoft 365 access

If the user provides Microsoft 365 access, treat it as sensitive production-grade access:

- never commit credentials, tokens, secrets, cookies, or exported session data
- prefer a dedicated test account or app registration over the user's personal password
- prefer OAuth app registration credentials and delegated sign-in over sharing raw credentials
- store secrets only in a secure secret manager or environment-injected secret store
- rotate or revoke credentials after setup or testing if they were shared temporarily

If there is a choice, use Azure Key Vault or another managed secret store rather than local files.

If a secret has been configured in Cursor for this project:

- access it only through the injected environment at runtime
- never print the secret value to logs or terminal output
- never copy it into source files, `.env.example`, documentation, screenshots, or commits
- prefer using it only for local development, app registration setup, or integration testing that explicitly requires it

## Immediate product discovery questions

These questions should be resolved early because they affect architecture and permissions:

1. Which UNSW systems matter most in the first version?
2. Does the user have access to create or approve a Microsoft Entra app registration for the relevant tenant?
3. Beyond Office 365 sign-in, do you want any Microsoft 365 data shown in v1, or should v1 stay focused on launch icons only?
4. Should `WebCMS3` and `Moodle` remain launch links only in v1, with deeper integration deferred to later phases?
5. Are there university branding, privacy, accessibility, or data residency constraints that affect hosting?

## Cursor Cloud specific instructions

This repository still does not have an implemented application stack yet.

- No dependency manifests exist yet.
- No source directories exist yet.
- No services exist yet.
- No test, lint, format, or build tooling is configured yet.

Because of that, agents must not claim commands or tooling exist until they actually add and configure them.

When the first implementation is created:

1. Keep the initial scaffolding small and easy to understand.
2. Follow the recommended stack above unless the user explicitly changes direction.
3. Add only dependencies required for the requested slice of functionality.
4. Add standard commands for local dev, test, lint, and build as soon as tooling exists.
5. Update both `README.md` and this file with exact setup and run instructions.

## Current testing guidance

Right now there are no configured automated checks. For documentation-only changes, manual review is sufficient.

If agents add application code or tooling, they should also add and run the smallest relevant validation for that stack, such as:

- a targeted test command
- a lint or typecheck command
- a build command when applicable

Do not claim commands exist until they are actually configured in the repository.

For future implementation work:

- web UI changes should be tested in a browser
- auth and Microsoft Graph changes should be validated with the smallest possible set of scopes
- mobile support should not be claimed until validated in an emulator, simulator, or device workflow

## Notes for repository changes

- Prefer small, focused commits.
- Avoid unrelated scaffolding unless the task requires it.
- If a task introduces a new convention or project layout, document it here so later agents can follow it consistently.
