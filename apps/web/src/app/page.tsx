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
        <header className={styles.topBar}>
          <div>
            <p className={styles.wordmark}>collox</p>
            <p className={styles.wordmarkMeta}>UNSW student hub / initial web slice</p>
          </div>
          <nav className={styles.topNav} aria-label="Page sections">
            <a href="#modules">Modules</a>
            <a href="#launchpad">Launchpad</a>
            <a href="#questions">Questions</a>
          </nav>
        </header>

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

            <dl className={styles.signalStrip}>
              <div>
                <dt>{dashboardModules.length}</dt>
                <dd>dashboard modules scoped first</dd>
              </div>
              <div>
                <dt>{launchpadSystems.length}</dt>
                <dd>launch targets under review</dd>
              </div>
              <div>
                <dt>{discoveryQuestions.length}</dt>
                <dd>open decisions before auth work</dd>
              </div>
            </dl>
          </div>

          <aside className={styles.heroPanel}>
            <span className={styles.panelLabel}>Why this first slice exists</span>
            <p className={styles.panelSummary}>
              The product needs a clear editorial home before it grows into
              sign-in, Graph data, and launch integrations. This first pass
              makes the direction legible.
            </p>
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

        <section className={styles.section} id="modules">
          <div className={styles.sectionHeading}>
            <p className={styles.kicker}>V1 dashboard direction</p>
            <h2>Summary-first modules keep the scope realistic.</h2>
            <p className={styles.sectionLead}>
              Instead of pretending every student system can be deeply integrated
              from day one, the first dashboard focuses on concise, high-signal
              summaries.
            </p>
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
            <p className={styles.sectionLead}>
              Some systems may become real API integrations. Others may stay as
              SSO launchers or deep links. The product should be honest about
              that split.
            </p>
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
            <p className={styles.sectionLead}>
              The codebase is small, but the rules already point toward safer
              Microsoft 365 integrations and a reusable monorepo structure.
            </p>
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
            <p className={styles.sectionLead}>
              Once these decisions are settled, the next slice can move from a
              framed concept into real authentication and personalized content.
            </p>
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
