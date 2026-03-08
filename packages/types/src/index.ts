export type DeliveryStatus = "ready-now" | "next-up" | "needs-validation";

export type IntegrationMode =
  | "official-api"
  | "entra-sso-launch"
  | "deep-link";

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
  note: string;
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
    title: "Identity snapshot",
    description:
      "Show the signed-in student's basic profile once delegated Microsoft auth is available.",
    scope: "Profile and sign-in are the first Microsoft 365 feature to validate.",
  },
  {
    slug: "calendar",
    title: "Calendar summary",
    description:
      "Highlight upcoming classes, meetings, and assessment windows in one strip.",
    scope: "Use Microsoft Graph with minimal delegated scopes and incremental consent.",
  },
  {
    slug: "priority-inbox",
    title: "Priority inbox",
    description:
      "Surface unread counts and key academic messages without replacing Outlook.",
    scope: "Stay summary-first before pulling full mailbox content into the product.",
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
    deliveryStatus: "needs-validation",
    integrationMode: "deep-link",
    note: "Treat as a launch target first and validate SSO options with stakeholders.",
  },
  {
    slug: "moodle",
    name: "Moodle",
    purpose: "Course materials, activities, and assessment content.",
    deliveryStatus: "next-up",
    integrationMode: "entra-sso-launch",
    note: "Likely starts as a launcher while API and consent boundaries are confirmed.",
  },
  {
    slug: "outlook",
    name: "Outlook",
    purpose: "Student email and calendar access through Microsoft 365.",
    deliveryStatus: "ready-now",
    integrationMode: "official-api",
    note: "Profile, mail summary, and calendar are the strongest first-party Graph bets.",
  },
  {
    slug: "teams",
    name: "Microsoft Teams",
    purpose: "Classes, chats, and meeting links.",
    deliveryStatus: "next-up",
    integrationMode: "official-api",
    note: "Start with meeting shortcuts and avoid broad scopes until needed.",
  },
  {
    slug: "library",
    name: "UNSW Library",
    purpose: "Search, reserves, and learning support entry points.",
    deliveryStatus: "needs-validation",
    integrationMode: "deep-link",
    note: "Assume an external launch until official APIs and terms are reviewed.",
  },
  {
    slug: "handbook",
    name: "UNSW Handbook",
    purpose: "Course and program reference material.",
    deliveryStatus: "ready-now",
    integrationMode: "deep-link",
    note: "Good candidate for a low-risk launch integration in the first release.",
  },
];

export const productPrinciples: Principle[] = [
  {
    title: "Least privilege first",
    detail:
      "Use delegated Microsoft permissions, incremental consent, and the smallest practical Graph scope.",
  },
  {
    title: "Launch before deep integration",
    detail:
      "Prefer reliable SSO launch paths or deep links until a system exposes a supported API.",
  },
  {
    title: "Shared contracts from day one",
    detail:
      "Keep domain types and content outside the web app so future mobile and backend work can reuse them.",
  },
  {
    title: "Validate assumptions explicitly",
    detail:
      "Treat third-party compatibility, tenant permissions, and branding constraints as discovery items.",
  },
];

export const discoveryQuestions: DiscoveryQuestion[] = [
  {
    id: "systems",
    prompt: "Which UNSW systems matter most in the first version?",
  },
  {
    id: "entra-registration",
    prompt:
      "Do you have access to create or approve a Microsoft Entra app registration for this project?",
  },
  {
    id: "m365-scope",
    prompt:
      "Which Microsoft 365 features belong in v1: profile, mail, calendar, files, Teams, or a smaller subset?",
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
