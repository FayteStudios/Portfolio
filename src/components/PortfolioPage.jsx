import PageAnchorCard from "./PageAnchorCard.jsx";

export default function PortfolioPage({ page, onClose }) {
  return (
    <section className={`portfolio-page accent-${page.accent}`}>
      <aside className="portfolio-page-anchor">
        <PageAnchorCard page={page} onClose={onClose} />
        <p className="portfolio-page-anchor-hint">Click the card to return.</p>
      </aside>

      <main className="portfolio-page-content">
        <p className="portfolio-page-kicker">
          {page.rank} · {page.arcanaType}
        </p>

        <h1>{page.title}</h1>

        <p className="portfolio-page-subtitle">
          {page.subtitle}
        </p>

        <section className="project-card-grid" aria-label={`${page.title} content cards`}>
          <article className="content-tarot-card">
            <p>Featured</p>
            <h2>Project Card</h2>
            <span>Placeholder for a highlighted project.</span>
          </article>

          <article className="content-tarot-card">
            <p>Process</p>
            <h2>Case Study</h2>
            <span>Placeholder for methods, decisions, and lessons.</span>
          </article>

          <article className="content-tarot-card">
            <p>Links</p>
            <h2>Resources</h2>
            <span>Placeholder for GitHub, demos, galleries, or writing samples.</span>
          </article>
        </section>
      </main>
    </section>
  );
}
