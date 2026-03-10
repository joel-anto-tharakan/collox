import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/auth";
import { SignInButton } from "@/components/auth-controls";
import { isMicrosoftAuthConfigured } from "@/lib/auth-env";
import styles from "./page.module.css";

const outcomes = [
  "Access a personalized dashboard once Microsoft Entra sign-in is wired.",
  "Connect delegated Microsoft 365 data with the smallest practical scope.",
  "Launch supported UNSW systems from one authenticated home.",
];

const setupItems = [
  "AUTH_SECRET",
  "AUTH_MICROSOFT_ENTRA_ID_ID",
  "AUTH_MICROSOFT_ENTRA_ID_SECRET",
  "AUTH_MICROSOFT_ENTRA_ID_ISSUER",
] as const;

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/app");
  }

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <p className={styles.eyebrow}>Login entry point</p>
        <h1>UNSW sign-in starts here.</h1>
        <p className={styles.lead}>
          {isMicrosoftAuthConfigured
            ? "collox now hands sign-in off to Microsoft Entra, the same identity platform behind the Microsoft 365 login screen students already expect."
            : "The product is ready to hand sign-in off to Microsoft Entra, but the Entra app registration values still need to be provided before the redirect can go live."}
        </p>

        <div className={styles.actions}>
          {isMicrosoftAuthConfigured ? (
            <SignInButton
              className={styles.primary}
              label="Continue with Microsoft 365"
            />
          ) : (
            <Link className={styles.primary} href="/">
              Back to home
            </Link>
          )}
          <span className={styles.status}>
            {isMicrosoftAuthConfigured
              ? "After login, collox stores an app-owned secure session cookie."
              : "Add the Entra app settings below to finish the live redirect."}
          </span>
        </div>

        <section className={styles.section}>
          <p className={styles.sectionLabel}>
            {isMicrosoftAuthConfigured ? "What login will unlock" : "Required setup"}
          </p>
          {isMicrosoftAuthConfigured ? (
            <ul className={styles.list}>
              {outcomes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            <ul className={styles.list}>
              {setupItems.map((item) => (
                <li key={item}>
                  <code>{item}</code>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className={styles.section}>
          <p className={styles.sectionLabel}>Session storage strategy</p>
          <p className={styles.storageNote}>
            collox should never try to reuse Office browser cookies. Instead, it
            exchanges the Microsoft OAuth response for its own encrypted,
            HttpOnly session cookie so the signed-in state belongs to this app.
          </p>
        </section>
      </div>
    </main>
  );
}
