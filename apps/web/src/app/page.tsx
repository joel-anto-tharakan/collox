import {
  architectureSlices,
  dashboardModules,
  discoveryQuestions,
  launchpadSystems,
  productPrinciples,
} from "@collox/types";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>Initial web implementation</p>
            <h1>One authenticated hub for UNSW student systems.</h1>
            <p className={styles.lead}>
              collox starts as a web-first home for Microsoft 365 identity,
              dashboard summaries, and launch-first integrations that students
              can trust.
            </p>
            <div className={styles.ctas}>
              <a className={styles.primary} href="#launchpad">
                Review launchpad assumptions
              </a>
              <a className={styles.secondary} href="#questions">
                Answer discovery questions
              </a>
            </div>
          </div>

          <aside className={styles.heroPanel}>
            <span className={styles.panelLabel}>First repository slices</span>
            <ul className={styles.sliceList}>
              {architectureSlices.map((slice) => (
                <li key={slice.path} className={styles.sliceCard}>
                  <div>
                    <h2>{slice.name}</h2>
                    <p>{slice.summary}</p>
                  </div>
                  <code>{slice.path}</code>
                </li>
              ))}
            </ul>
          </aside>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <p className={styles.kicker}>V1 dashboard direction</p>
            <h2>Summary-first modules keep the scope realistic.</h2>
          </div>
          <div className={styles.cardGrid}>
            {dashboardModules.map((module) => (
              <article key={module.slug} className={styles.card}>
                <p className={styles.cardLabel}>{module.slug}</p>
                <h3>{module.title}</h3>
                <p>{module.description}</p>
                <span>{module.scope}</span>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} id="launchpad">
          <div className={styles.sectionHeading}>
            <p className={styles.kicker}>Launchpad register</p>
            <h2>These integrations are framed as assumptions to validate.</h2>
          </div>
          <div className={styles.systemGrid}>
            {launchpadSystems.map((system) => (
              <article key={system.slug} className={styles.systemCard}>
                <div className={styles.systemHeader}>
                  <h3>{system.name}</h3>
                  <span>{system.deliveryStatus}</span>
                </div>
                <p>{system.purpose}</p>
                <dl className={styles.systemMeta}>
                  <div>
                    <dt>Mode</dt>
                    <dd>{system.integrationMode}</dd>
                  </div>
                  <div>
                    <dt>Note</dt>
                    <dd>{system.note}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <p className={styles.kicker}>Architecture principles</p>
            <h2>Implementation choices stay aligned with the product intent.</h2>
          </div>
          <div className={styles.principles}>
            {productPrinciples.map((principle) => (
              <article key={principle.title} className={styles.principleCard}>
                <h3>{principle.title}</h3>
                <p>{principle.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} id="questions">
          <div className={styles.sectionHeading}>
            <p className={styles.kicker}>Open product decisions</p>
            <h2>These answers unlock the next implementation steps.</h2>
          </div>
          <ol className={styles.questionList}>
            {discoveryQuestions.map((question) => (
              <li key={question.id}>{question.prompt}</li>
            ))}
          </ol>
        </section>
      </main>
    </div>
  );
}
