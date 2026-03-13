import type { Metadata } from "next";
import Link from "next/link";
import {
  deliveryStatusLabels,
  integrationModeGuide,
  integrationModeLabels,
  launchpadSystems,
} from "@collox/types";

import styles from "./launchpad.module.css";

export const metadata: Metadata = {
  title: "Launchpad register | collox",
  description:
    "Stable launchpad register URLs for the first collox implementation, including delivery status, integration mode, and system records.",
};

const summaryCards = [
  {
    label: "Systems tracked",
    value: String(launchpadSystems.length),
    detail: "Initial register entries reviewed before any deep integration promises.",
  },
  {
    label: "Stable record URLs",
    value: "1 per system",
    detail: "Each launch target now has a dedicated route that can be revisited directly.",
  },
  {
    label: "Machine-readable surface",
    value: "/api/launchpad",
    detail: "Agents can read the same register through a small JSON endpoint.",
  },
] as const;

export default function LaunchpadPage() {
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <header className={styles.topBar}>
          <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Launchpad</span>
          </nav>
          <div className={styles.topActions}>
            <Link className={styles.secondary} href="/">
              Return home
            </Link>
            <Link className={styles.primary} href="/api/launchpad">
              Open JSON register
            </Link>
          </div>
        </header>

        <section className={styles.hero}>
          <p className={styles.eyebrow}>Stable launchpad register</p>
          <h1>Review each system through a permanent route.</h1>
          <p className={styles.lead}>
            The landing page is no longer the only place the launchpad register
            exists. Each system now has a dedicated record page, and the same
            shared data is available through a read-only JSON endpoint for
            browser-driving agents and other tooling.
          </p>
          <div className={styles.actions}>
            <Link className={styles.primary} href="/api/launchpad">
              Read JSON output
            </Link>
            <Link className={styles.secondary} href="/#questions">
              Revisit discovery questions
            </Link>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="register-summary">
          <div className={styles.sectionHeading}>
            <p className={styles.sectionLabel}>Register summary</p>
            <h2 id="register-summary">One shared source now powers people and agent views.</h2>
          </div>
          <div className={styles.summaryGrid}>
            {summaryCards.map((card) => (
              <article key={card.label} className={styles.summaryCard}>
                <p className={styles.metaLabel}>{card.label}</p>
                <p className={styles.summaryValue}>{card.value}</p>
                <p>{card.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="mode-guide">
          <div className={styles.sectionHeading}>
            <p className={styles.sectionLabel}>Integration mode guide</p>
            <h2 id="mode-guide">The register keeps delivery assumptions visible.</h2>
          </div>
          <div className={styles.systemGrid}>
            {integrationModeGuide.map((entry) => (
              <article key={entry.mode} className={styles.noteCard}>
                <p className={styles.metaLabel}>{entry.label}</p>
                <p>{entry.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="system-records">
          <div className={styles.sectionHeading}>
            <p className={styles.sectionLabel}>System records</p>
            <h2 id="system-records">Each launch target has a stable destination.</h2>
          </div>
          <div className={styles.systemGrid}>
            {launchpadSystems.map((system) => (
              <article key={system.slug} className={styles.systemCard}>
                <div className={styles.systemHeader}>
                  <h3 className={styles.recordName}>{system.name}</h3>
                  <span className={styles.statusPill}>
                    {deliveryStatusLabels[system.deliveryStatus]}
                  </span>
                </div>
                <p>{system.purpose}</p>
                <div className={styles.metaGrid}>
                  <div>
                    <p className={styles.metaLabel}>Mode</p>
                    <p className={styles.metaValue}>
                      {integrationModeLabels[system.integrationMode]}
                    </p>
                  </div>
                  <div>
                    <p className={styles.metaLabel}>Auth</p>
                    <p className={styles.metaValue}>{system.authMethod}</p>
                  </div>
                </div>
                <Link className={styles.systemLink} href={`/launchpad/${system.slug}`}>
                  Open {system.name} record
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
