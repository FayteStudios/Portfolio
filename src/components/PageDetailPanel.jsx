export default function PageDetailPanel({ page, card, isClosing, onBack }) {
  const detail = card.detail || {};

  const title = detail.title || card.title;
  const eyebrow = detail.eyebrow || card.eyebrow || page.title;
  const summary = detail.summary || card.description;

  const paragraphs =
    detail.paragraphs && detail.paragraphs.length > 0
      ? detail.paragraphs
      : [
          "This page is ready for custom content.",
          "Replace this placeholder copy in pageCards.js with project details, story text, resume notes, links, or any longer-form information this section needs."
        ];

  return (
    <section
      className={[
        "page-detail-stage",
        isClosing ? "page-detail-stage-closing" : ""
      ].join(" ")}
      aria-label={`${title} detail page`}
    >
      <button
        className="page-detail-anchor-card"
        type="button"
        onClick={onBack}
        aria-label={`Return to ${page.title} cards`}
      >
        {card.image && (
          <img
            className="page-detail-anchor-image"
            src={card.image}
            alt=""
            aria-hidden="true"
          />
        )}

        <span className="page-detail-anchor-overlay" />

        <span className="page-detail-anchor-content">
          <span className="page-detail-anchor-eyebrow">{card.eyebrow}</span>
          <span className="page-detail-anchor-title">{card.title}</span>
          <span className="page-detail-anchor-description">
            Return to {page.title}
          </span>
        </span>
      </button>

      <article className="page-detail-panel">
        <header className="page-detail-header">
          <p className="page-detail-eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          {summary && <p className="page-detail-summary">{summary}</p>}
        </header>

        <div className="page-detail-body">
          {paragraphs.map((paragraph, index) => (
            <p key={`${card.id}-paragraph-${index}`}>{paragraph}</p>
          ))}

          {detail.sections?.map((section) => (
            <section className="page-detail-content-section" key={section.title}>
              <h2>{section.title}</h2>

              {section.paragraphs?.map((paragraph, index) => (
                <p key={`${section.title}-paragraph-${index}`}>{paragraph}</p>
              ))}

              {section.items && (
                <ul>
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {detail.links && (
            <div className="page-detail-links">
              {detail.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </article>
    </section>
  );
}