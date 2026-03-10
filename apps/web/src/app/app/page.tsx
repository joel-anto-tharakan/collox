import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/auth";
import { SignOutButton } from "@/components/auth-controls";
import styles from "./page.module.css";

const nextSlices = [
  "Profile and identity summary",
  "Calendar overview from Microsoft 365",
  "Quick launch links for core UNSW systems",
];

export default async function HubPage() {
  const session = await getServerSession(authOptions);

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
          This first authenticated screen proves the app can recognize the
          signed-in Microsoft identity and keep that state in a secure app-owned
          session.
        </p>

        <dl className={styles.identityCard}>
          <div>
            <dt>Name</dt>
            <dd>{session.user.name ?? "Not provided by Microsoft"}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>{session.user.email ?? "Not provided by Microsoft"}</dd>
          </div>
          <div>
            <dt>Session storage</dt>
            <dd>Encrypted HttpOnly Auth.js session cookie</dd>
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
