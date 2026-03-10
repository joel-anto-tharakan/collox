import Link from "next/link";

import styles from "./page.module.css";

const outcomes = [
  "Access a personalized dashboard once Microsoft Entra sign-in is wired.",
  "Connect delegated Microsoft 365 data with the smallest practical scope.",
  "Launch supported UNSW systems from one authenticated home.",
];

export default function LoginPage() {
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <p className={styles.eyebrow}>Login entry point</p>
        <h1>UNSW sign-in starts here.</h1>
        <p className={styles.lead}>
          The header login button is now in place. The next implementation step
          is wiring this route to Microsoft Entra so students can authenticate
          with their UNSW account.
        </p>

        <div className={styles.actions}>
          <Link className={styles.primary} href="/">
            Back to home
          </Link>
          <span className={styles.status}>Microsoft Entra flow coming next</span>
        </div>

        <section className={styles.section}>
          <p className={styles.sectionLabel}>What login will unlock</p>
          <ul className={styles.list}>
            {outcomes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
