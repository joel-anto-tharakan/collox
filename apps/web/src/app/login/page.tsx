import Link from "next/link";
import { redirect } from "next/navigation";
 
import { LocalAuthPanel } from "@/components/local-auth-panel";
import { getSession } from "@/lib/session";
import styles from "./page.module.css";

const storedData = [
  "Name, email address, password hash, and active session records.",
  "No Microsoft or Office cookies, tokens, or delegated productivity data.",
];

export default async function LoginPage() {
  const session = await getSession();

  if (session?.user) {
    redirect("/app");
  }

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <p className={styles.eyebrow}>Login entry point</p>
        <h1>Local sign-in starts here.</h1>
        <p className={styles.lead}>
          collox now starts with app-managed authentication so the public web
          experience stays local, low-data, and usable on phones before native
          apps exist.
        </p>

        <div className={styles.actions}>
          <Link className={styles.primary} href="/">
            Back to home
          </Link>
          <span className={styles.status}>
            Sessions stay in secure app-owned cookies.
          </span>
        </div>

        <section className={styles.section}>
          <p className={styles.sectionLabel}>What we store</p>
          <ul className={styles.list}>
            {storedData.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <p className={styles.sectionLabel}>Why start this way</p>
          <p className={styles.storageNote}>
            This keeps the first public version easy to run, easy to explain,
            and practical on mobile web. Institutional Microsoft integrations
            can still be added later if the product truly needs them.
          </p>
        </section>

        <LocalAuthPanel />
      </div>
    </main>
  );
}
