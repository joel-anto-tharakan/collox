import type { AuthOptions } from "next-auth";
import AzureAD from "next-auth/providers/azure-ad";

import {
  isMicrosoftAuthConfigured,
  microsoftEntraTenant,
} from "@/lib/auth-env";

const providers = isMicrosoftAuthConfigured
  ? [
      AzureAD({
        clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID!,
        clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET!,
        tenantId: microsoftEntraTenant,
        authorization: {
          params: {
            scope: "openid profile email User.Read",
          },
        },
      }),
    ]
  : [];

export const authOptions: AuthOptions = {
  providers,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
};
