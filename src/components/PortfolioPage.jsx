export default function PortfolioPage({ page, onClose }) {
  return (
    <section className={`portfolio-page accent-${page.accent}`}>
      <button
        className="portfolio-page-back"
        type="button"
        onClick={onClose}
        aria-label="Return to card river"
      >
        Back
      </button>

      <div className="portfolio-page-inner">
        <p className="portfolio-page-kicker">
          {page.rank} · {page.arcanaType}
        </p>

        <h1>{page.title}</h1>

        <p className="portfolio-page-subtitle">
          {page.subtitle}
        </p>

        <div className="portfolio-page-placeholder">
          <p>
            This is the bare content page for <strong>{page.title}</strong>.
          </p>
          <p>
            Next pass: project cards, images, links, case studies, or section-specific layout.
          </p>
        </div>
      </div>
    </section>
  );
}
