import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  apiAvailabilityLabels,
  deliveryApproachLabels,
  deliveryStatusLabels,
  getLaunchpadSystemBySlug,
  integrationModeLabels,
  launchpadSystems,
  ssoCompatibilityLabels,
} from "@collox/types";

import styles from "../launchpad.module.css";

type LaunchpadRecordPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return launchpadSystems.map((system) => ({ slug: system.slug }));
}

export async function generateMetadata({
  params,
}: LaunchpadRecordPageProps): Promise<Metadata> {
  const { slug } = await params;
  const system = getLaunchpadSystemBySlug(slug);

  if (!system) {
    return {
      title: "Launchpad record not found | collox",
    };
  }

  return {
    title: `${system.name} launchpad record | collox`,
    description: `${system.name} delivery status, auth method, SSO compatibility, and launch notes for the collox launchpad register.`,
  };
}

export default async function LaunchpadRecordPage({
  params,
}: LaunchpadRecordPageProps) {
  const { slug } = await params;
  const system = getLaunchpadSystemBySlug(slug);

  if (!system) {
    notFound();
  }

  return (
    <main className={styles.page}>
      <article className={styles.content}>
        <header className={styles.topBar}>
          <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/launchpad">Launchpad</Link>
            <span aria-hidden="true">/</span>
            <span>{system.name}</span>
          </nav>
          <div className={styles.topActions}>
            <Link className={styles.secondary} href="/launchpad">
              Back to register
            </Link>
            <Link className={styles.primary} href={`/api/launchpad/${system.slug}`}>
              Open JSON record
            </Link>
          </div>
        </header>

        <header className={styles.recordHeader}>
          <p className={styles.eyebrow}>Launchpad record</p>
          <div className={styles.systemHeader}>
            <h1 className={styles.recordName}>{system.name}</h1>
            <span className={styles.statusPill}>
              {deliveryStatusLabels[system.deliveryStatus]}
            </span>
          </div>
          <p className={styles.recordSummary}>{system.purpose}</p>
          <div className={styles.recordLinks}>
            <Link className={styles.secondary} href="/api/launchpad">
              Register JSON
            </Link>
            <Link className={styles.secondary} href={`/api/launchpad/${system.slug}`}>
              Record JSON
            </Link>
          </div>
        </header>

        <section className={styles.section} aria-labelledby="record-details">
          <div className={styles.sectionHeading}>
            <p className={styles.sectionLabel}>Delivery details</p>
            <h2 id="record-details">The record keeps implementation constraints explicit.</h2>
          </div>
          <dl className={styles.metaGrid}>
            <div>
              <dt className={styles.metaLabel}>Slug</dt>
              <dd className={styles.metaValue}>{system.slug}</dd>
            </div>
            <div>
              <dt className={styles.metaLabel}>Integration mode</dt>
              <dd className={styles.metaValue}>
                {integrationModeLabels[system.integrationMode]}
              </dd>
            </div>
            <div>
              <dt className={styles.metaLabel}>API availability</dt>
              <dd className={styles.metaValue}>
                {apiAvailabilityLabels[system.apiAvailability]}
              </dd>
            </div>
            <div>
              <dt className={styles.metaLabel}>Auth method</dt>
              <dd className={styles.metaValue}>{system.authMethod}</dd>
            </div>
            <div>
              <dt className={styles.metaLabel}>SSO compatibility</dt>
              <dd className={styles.metaValue}>
                {ssoCompatibilityLabels[system.ssoCompatibility]}
              </dd>
            </div>
            <div>
              <dt className={styles.metaLabel}>Owner or support</dt>
              <dd className={styles.metaValue}>{system.ownerOrSupportContact}</dd>
            </div>
            <div>
              <dt className={styles.metaLabel}>Rate limits</dt>
              <dd className={styles.metaValue}>{system.rateLimits}</dd>
            </div>
            <div>
              <dt className={styles.metaLabel}>Terms</dt>
              <dd className={styles.metaValue}>{system.termsConstraints}</dd>
            </div>
            <div>
              <dt className={styles.metaLabel}>Delivery approach</dt>
              <dd className={styles.metaValue}>
                {deliveryApproachLabels[system.deliveryApproach]}
              </dd>
            </div>
            <div>
              <dt className={styles.metaLabel}>Implementation note</dt>
              <dd className={styles.metaValue}>{system.note}</dd>
            </div>
          </dl>
        </section>
      </article>
    </main>
  );
}
