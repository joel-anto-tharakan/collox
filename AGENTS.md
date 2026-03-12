# AGENTS.md

## Repository overview

- Repository name: `collox`
- Product direction: build a web-first UNSW student hub, then expand to Android and iOS apps
- Primary users: students of the University of New South Wales (UNSW)
- Preferred v1 identity direction: local-first app-managed auth with minimal stored data and strong mobile-web usability
- Goal: provide one authenticated hub where a student can view and launch the different systems, information sources, and services they use
- Current state: initial TypeScript monorepo with a Next.js web app, shared types, and shared config

## Product intent

The product should become an integrated student hub for UNSW. The website comes first. Native mobile apps come later, but the architecture should be chosen so the mobile apps can reuse business logic, data models, API contracts, and design decisions as much as practical.

The hub should support:

1. sign-in that works well on the web and mobile web, with optional stronger institutional integrations later
2. a personalized dashboard for the student's most important information
3. a launchpad for UNSW systems and approved third-party systems
4. integrations with Microsoft 365 data that the student explicitly authorizes
5. eventual reuse of the same backend and shared packages for Android and iOS apps

## Product assumptions and scope boundaries

- Prefer official APIs, official SDKs, and supported SSO flows over scraping
- Prefer link-out or deep-link launchers for systems that do not expose suitable APIs
- Do not store a student's raw Microsoft password in the repository, source code, or plaintext local files
- Do not assume every third-party service can be embedded; some may only support SSO and external launch
- Do not assume tenant-wide admin consent is available until the user confirms it
- Prefer local-first architecture for the public product and store the least amount of user data practical
- Design the web experience to work well on phones before native apps exist

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

## Current implemented layout

The repository now includes:

- `apps/web` for the initial Next.js web application
- `packages/types` for shared TypeScript contracts and initial product content
- `packages/config` for shared TypeScript configuration
- root `pnpm` workspace and `turborepo` orchestration

This is still an early implementation. No backend or mobile app exists yet. The current web direction should bias toward local-first auth, minimal retained data, and strong mobile-web usability.

## Identity and Microsoft integration guidance

For identity and Microsoft data access, prefer:

- local-first app-managed auth for the initial public product unless the user explicitly requires institutional Microsoft sign-in
- Microsoft Entra ID only when the product explicitly needs official UNSW Microsoft 365 identity or delegated Microsoft Graph access
- MSAL for client authentication flows
- Microsoft Graph for Microsoft 365 APIs

Implementation guidance:

1. Start with local-first auth and secure app-owned sessions when official Microsoft identity is not strictly required.
2. If Microsoft identity is required, start with delegated permissions, not application permissions, unless a background service truly requires app-level access.
3. Request the minimum scopes needed for a feature.
4. Use incremental consent rather than asking for every permission upfront.
5. For web, prefer standard Entra ID OAuth 2.0 / OpenID Connect flows with PKCE.
6. Use Microsoft Graph best practices, including throttling-aware retries and honoring `Retry-After`.
7. Test Graph calls in a constrained, feature-by-feature way instead of enabling broad permissions early.

Initial Microsoft 365 features that are reasonable to explore first once Microsoft integration is reintroduced:

- basic profile and identity
- calendar summary
- email summary or unread counts
- OneDrive or file shortcuts
- Teams or meeting shortcuts

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

## Public product and mobile-web guidance

For this repository's current direction:

- prefer self-hosted or app-managed auth over enterprise identity dependencies when practical
- store only the minimum auth and session data needed to operate the product
- default to app-owned secure cookies for session state
- avoid persisting user productivity data unless a feature explicitly requires it
- keep mobile web as a first-class target for layout, interaction, and authentication flows
- prefer low-friction mobile-friendly methods such as passkeys or magic links over password-heavy flows when practical

## Research findings that should guide implementation

The current default direction is informed by the following practical considerations:

- Microsoft strongly supports web authentication with Entra ID, MSAL, and Microsoft Graph when official Microsoft identity is required
- Microsoft Graph integrations should follow delegated permissions, least privilege, and throttling-aware retries
- Expo now has first-class monorepo support with `pnpm`, which makes a future mobile app compatible with a shared web/mobile repository structure
- Mobile-friendly web authentication should be validated before native apps exist, and the backend API should remain platform-neutral

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

## Immediate product discovery questions

These questions should be resolved early because they affect architecture and permissions:

1. Which UNSW systems matter most in the first version?
2. Does the user have access to create or approve a Microsoft Entra app registration for the relevant tenant?
3. Which Microsoft 365 features are in scope for v1: profile, mail, calendar, files, Teams, or all of them?
4. Which third-party systems should be integrated through API versus simple launch links?
5. Are there university branding, privacy, accessibility, or data residency constraints that affect hosting?

## Cursor Cloud specific instructions

This repository now has a small implemented application stack.

- Package manager: `pnpm`
- Workspace orchestration: `turborepo`
- Web app: `apps/web` with Next.js App Router and TypeScript
- Shared packages: `packages/types`, `packages/config`
- Auth direction: local-first app-managed auth with minimal retained data

Available root commands:

1. `pnpm install`
2. `pnpm dev`
3. `pnpm lint`
4. `pnpm typecheck`
5. `pnpm test`
6. `pnpm build`

Auth-specific environment file:

- `apps/web/.env.local` based on `apps/web/.env.example`

When the first implementation is created:

1. Keep the initial scaffolding small and easy to understand.
2. Follow the recommended stack above unless the user explicitly changes direction.
3. Add only dependencies required for the requested slice of functionality.
4. Add standard commands for local dev, test, lint, and build as soon as tooling exists.
5. Update both `README.md` and this file with exact setup and run instructions.

## Current testing guidance

Current automated checks:

- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`

Current auth guidance for this repository:

- prefer local-first auth that stores the least amount of user data practical
- keep session state in secure app-owned cookies
- keep any auth UX simple enough for mobile-web use
- only use Microsoft Entra ID if the user explicitly reintroduces official Microsoft 365 identity requirements

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
