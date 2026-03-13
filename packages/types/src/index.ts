export type DeliveryStatus = "candidate" | "validate-next" | "blocked";

export type IntegrationMode =
  | "official-api"
  | "entra-sso-launch"
  | "deep-link"
  | "unsupported";

export type ApiAvailability =
  | "documented-api"
  | "limited-or-unknown"
  | "no-validated-api";

export type SsoCompatibility =
  | "confirmed"
  | "possible"
  | "unknown"
  | "not-applicable";

export type DeliveryApproach = "embedded" | "proxied" | "linked-out";

export interface ArchitectureSlice {
  name: string;
  path: string;
  summary: string;
}

export interface DashboardModule {
  slug: string;
  title: string;
  description: string;
  scope: string;
}

export interface LaunchpadSystem {
  slug: string;
  name: string;
  purpose: string;
  deliveryStatus: DeliveryStatus;
  integrationMode: IntegrationMode;
  apiAvailability: ApiAvailability;
  authMethod: string;
  ssoCompatibility: SsoCompatibility;
  ownerOrSupportContact: string;
  rateLimits: string;
  termsConstraints: string;
  deliveryApproach: DeliveryApproach;
  note: string;
}

export interface IntegrationModeGuide {
  mode: IntegrationMode;
  label: string;
  summary: string;
}

export interface DiscoveryQuestion {
  id: string;
  prompt: string;
}

export interface Principle {
  title: string;
  detail: string;
}

export const architectureSlices: ArchitectureSlice[] = [
  {
    name: "Web app",
    path: "apps/web",
    summary: "Next.js App Router entry point for the student-facing experience.",
  },
  {
    name: "Shared types",
    path: "packages/types",
    summary: "Reusable TypeScript contracts and launch content for future apps.",
  },
  {
    name: "Shared config",
    path: "packages/config",
    summary: "Common tsconfig presets for new workspace packages.",
  },
];

export const dashboardModules: DashboardModule[] = [
  {
    slug: "identity",
    title: "Account snapshot",
    description:
      "Show the signed-in student's basic profile with the minimum account data needed to run the app.",
    scope: "Start with local auth and a simple session-aware profile area.",
  },
  {
    slug: "calendar",
    title: "Study rhythm",
    description:
      "Highlight upcoming classes, deadlines, and routines in one mobile-friendly strip.",
    scope: "Keep it useful even before any deep institutional integration exists.",
  },
  {
    slug: "priority-inbox",
    title: "Priority updates",
    description:
      "Surface the most relevant academic reminders without becoming a full communications system.",
    scope: "Favor concise summaries and user-controlled storage over large synced datasets.",
  },
  {
    slug: "quick-links",
    title: "Quick links",
    description:
      "Launch the systems a student uses every day from a consistent home screen.",
    scope: "Start with reliable launch paths before deeper system integrations.",
  },
];

export const launchpadSystems: LaunchpadSystem[] = [
  {
    slug: "myunsw",
    name: "myUNSW",
    purpose: "Core student administration, enrolment, and fee workflows.",
    deliveryStatus: "candidate",
    integrationMode: "deep-link",
    apiAvailability: "limited-or-unknown",
    authMethod: "Existing UNSW student account flow",
    ssoCompatibility: "possible",
    ownerOrSupportContact: "UNSW student administration channels",
    rateLimits: "Unknown until an official interface is confirmed.",
    termsConstraints:
      "Treat as an external launch until supported integration guidance exists.",
    deliveryApproach: "linked-out",
    note: "Start with a dependable launch path and validate any SSO or API options with stakeholders.",
  },
  {
    slug: "moodle",
    name: "Moodle",
    purpose: "Course materials, activities, and assessment content.",
    deliveryStatus: "validate-next",
    integrationMode: "entra-sso-launch",
    apiAvailability: "limited-or-unknown",
    authMethod: "UNSW single sign-on",
    ssoCompatibility: "possible",
    ownerOrSupportContact: "UNSW Moodle support",
    rateLimits: "Unknown until an official integration surface is selected.",
    termsConstraints:
      "Keep the first release as a launcher while consent, support, and API boundaries are reviewed.",
    deliveryApproach: "linked-out",
    note: "Likely begins as a launch integration before any deeper coursework data is considered.",
  },
  {
    slug: "outlook",
    name: "Outlook",
    purpose: "Student email and calendar access through Microsoft 365.",
    deliveryStatus: "validate-next",
    integrationMode: "official-api",
    apiAvailability: "documented-api",
    authMethod: "Microsoft Entra ID delegated sign-in",
    ssoCompatibility: "confirmed",
    ownerOrSupportContact: "Microsoft 365 and UNSW identity administrators",
    rateLimits: "Microsoft Graph throttling and Retry-After handling apply.",
    termsConstraints:
      "Only request least-privilege delegated scopes when a specific summary feature is in scope.",
    deliveryApproach: "proxied",
    note: "Good candidate for future profile, unread count, and calendar summaries, but not implemented today.",
  },
  {
    slug: "teams",
    name: "Microsoft Teams",
    purpose: "Classes, chats, and meeting links.",
    deliveryStatus: "candidate",
    integrationMode: "official-api",
    apiAvailability: "documented-api",
    authMethod: "Microsoft Entra ID delegated sign-in",
    ssoCompatibility: "confirmed",
    ownerOrSupportContact: "Microsoft 365 and UNSW collaboration support",
    rateLimits: "Graph rate limits depend on endpoint choice and tenant policy.",
    termsConstraints:
      "Avoid broad chat or team scopes until a concrete student-facing feature justifies them.",
    deliveryApproach: "linked-out",
    note: "Meeting shortcuts are more realistic than full in-app Teams workflows in the early product.",
  },
  {
    slug: "library",
    name: "UNSW Library",
    purpose: "Search, reserves, and learning support entry points.",
    deliveryStatus: "candidate",
    integrationMode: "deep-link",
    apiAvailability: "limited-or-unknown",
    authMethod: "Public web access plus any existing institutional login flows",
    ssoCompatibility: "unknown",
    ownerOrSupportContact: "UNSW Library support",
    rateLimits: "Unknown until official APIs or supported feeds are reviewed.",
    termsConstraints:
      "Do not assume embeddable access until terms and supported integration paths are confirmed.",
    deliveryApproach: "linked-out",
    note: "A low-risk external launch is more credible than a custom integration at this stage.",
  },
  {
    slug: "handbook",
    name: "UNSW Handbook",
    purpose: "Course and program reference material.",
    deliveryStatus: "candidate",
    integrationMode: "deep-link",
    apiAvailability: "limited-or-unknown",
    authMethod: "Public web access",
    ssoCompatibility: "not-applicable",
    ownerOrSupportContact: "UNSW Handbook owners",
    rateLimits: "Unknown; treat as a linked destination until supported feeds are confirmed.",
    termsConstraints:
      "Prefer a straightforward external launch unless official data access terms are documented.",
    deliveryApproach: "linked-out",
    note: "Useful as a launch destination, but the product should not imply a maintained data sync yet.",
  },
];

export const integrationModeGuide: IntegrationModeGuide[] = [
  {
    mode: "official-api",
    label: "Official API integration",
    summary: "Use a supported API only when the feature needs structured data and clear permission boundaries.",
  },
  {
    mode: "entra-sso-launch",
    label: "Microsoft Entra SSO launch",
    summary: "Prefer a launcher when institutional sign-in exists but the product does not need to copy data.",
  },
  {
    mode: "deep-link",
    label: "Deep-link or external launch",
    summary: "Keep the app useful with safe launch paths when a system is better reached than reimplemented.",
  },
  {
    mode: "unsupported",
    label: "Unsupported until approval exists",
    summary: "Block work that lacks legal, technical, or security approval instead of guessing past the constraints.",
  },
];

export const productPrinciples: Principle[] = [
  {
    title: "Store the minimum",
    detail:
      "Keep auth and session data small, and avoid persisting student productivity data unless a feature truly needs it.",
  },
  {
    title: "Launch before deep integration",
    detail:
      "Prefer reliable SSO launch paths or deep links until a system exposes a supported API.",
  },
  {
    title: "Mobile web first",
    detail:
      "Make authentication and navigation feel good on phones before native apps exist.",
  },
  {
    title: "Shared contracts from day one",
    detail:
      "Keep domain types and content outside the web app so future mobile and backend work can reuse them.",
  },
];

export const discoveryQuestions: DiscoveryQuestion[] = [
  {
    id: "systems",
    prompt: "Which UNSW systems matter most in the first version?",
  },
  {
    id: "auth-method",
    prompt:
      "Which local-first auth method should graduate past this first implementation: passkeys, magic links, or both?",
  },
  {
    id: "data-retention",
    prompt:
      "What is the smallest amount of user data the product can retain while still being useful?",
  },
  {
    id: "third-party",
    prompt:
      "Which third-party systems should be integrated via API versus simple launch links?",
  },
  {
    id: "constraints",
    prompt:
      "Are there branding, privacy, accessibility, or hosting constraints we should design around now?",
  },
];

export const deliveryStatusLabels = {
  candidate: "Candidate",
  "validate-next": "Validate next",
  blocked: "Blocked",
} as const satisfies Record<DeliveryStatus, string>;

export const integrationModeLabels = {
  "official-api": "Official API",
  "entra-sso-launch": "Entra SSO launch",
  "deep-link": "Deep link",
  unsupported: "Unsupported",
} as const satisfies Record<IntegrationMode, string>;

export const apiAvailabilityLabels = {
  "documented-api": "Documented API",
  "limited-or-unknown": "Limited or unknown",
  "no-validated-api": "No validated API",
} as const satisfies Record<ApiAvailability, string>;

export const ssoCompatibilityLabels = {
  confirmed: "Confirmed",
  possible: "Possible",
  unknown: "Unknown",
  "not-applicable": "Not applicable",
} as const satisfies Record<SsoCompatibility, string>;

export const deliveryApproachLabels = {
  embedded: "Embedded",
  proxied: "Proxied",
  "linked-out": "Linked out",
} as const satisfies Record<DeliveryApproach, string>;

export function getLaunchpadSystemBySlug(slug: string): LaunchpadSystem | undefined {
  return launchpadSystems.find((system) => system.slug === slug);
}
