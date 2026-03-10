export const microsoftEntraIssuer =
  process.env.AUTH_MICROSOFT_ENTRA_ID_ISSUER ??
  "https://login.microsoftonline.com/organizations/v2.0";

export const microsoftEntraTenant =
  microsoftEntraIssuer.match(
    /^https:\/\/login\.microsoftonline\.com\/([^/]+)\/v2\.0\/?$/,
  )?.[1] ?? "organizations";

export const isMicrosoftAuthConfigured = Boolean(
  process.env.AUTH_SECRET &&
    process.env.AUTH_MICROSOFT_ENTRA_ID_ID &&
    process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
);
