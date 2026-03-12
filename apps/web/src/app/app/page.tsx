import Link from "next/link";
import { redirect } from "next/navigation";

import { SignOutButton } from "@/components/auth-buttons";
import { getSession } from "@/lib/session";
import styles from "./page.module.css";

const nextSlices = [
  "Profile and identity summary",
  "Pinned launch links for high-frequency student systems",
  "Passkey or magic-link authentication once the next auth layer is added",
];

export default async function HubPage() {
  const session = await getSession();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <p className={styles.eyebrow}>Signed in to collox</p>
        <h1>
          {session.user.name ?? "UNSW student"}, you are now signed in to
          collox.
        </h1>
        <p className={styles.lead}>
          This first authenticated screen proves the app can keep a signed-in
          state locally with minimal retained data and a secure app-owned
          session.
        </p>

        <dl className={styles.identityCard}>
          <div>
            <dt>Name</dt>
            <dd>{session.user.name ?? "Not provided"}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>{session.user.email ?? "Not provided"}</dd>
          </div>
          <div>
            <dt>Session storage</dt>
            <dd>Secure app-owned Better Auth session cookie</dd>
          </div>
        </dl>

        <div className={styles.actions}>
          <Link className={styles.primary} href="/">
            Return home
          </Link>
          <SignOutButton className={styles.secondary} label="Sign out" />
        </div>

        <section className={styles.section}>
          <p className={styles.sectionLabel}>Next authenticated slices</p>
          <ul className={styles.list}>
            {nextSlices.map((slice) => (
              <li key={slice}>{slice}</li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
