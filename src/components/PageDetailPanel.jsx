import ProjectRiverCard from "./ProjectRiverCard.jsx";
import DetailBlockRenderer from "./DetailBlockRenderer.jsx";

function valueOrFallback(value, fallback) {
  return value === undefined || value === null ? fallback : value;
}

export default function PageDetailPanel({ page, card, isClosing, onBack }) {
  const detail = card.detail || {};

  const title = valueOrFallback(detail.title, card.title);
  const eyebrow = valueOrFallback(detail.eyebrow, card.eyebrow || "");
  const summary = valueOrFallback(detail.summary, card.description || "");

  const hasBlocks = Array.isArray(detail.blocks) && detail.blocks.length > 0;

  const paragraphs =
    detail.paragraphs && detail.paragraphs.length > 0
      ? detail.paragraphs
      : [
          "This page is ready for custom content.",
          "Replace this placeholder copy in pageCards.js with project details, story text, resume notes, links, or any longer-form information this section needs."
        ];

  const returnCard = {
    ...card,
    status: `Return to ${page.title}`
  };

  return (
    <section
      className={[
        "page-detail-stage",
        isClosing ? "page-detail-stage-closing" : ""
      ].join(" ")}
      aria-label={`${title} detail page`}
    >
      <div className="page-detail-return-card-shell">
        <ProjectRiverCard
          card={returnCard}
          index={0}
          activeIndex={0}
          isActive={true}
          onClick={onBack}
        />
      </div>

      <article className="page-detail-panel">
        <header className="page-detail-header">
          {eyebrow && <p className="page-detail-eyebrow">{eyebrow}</p>}
          {title && <h1>{title}</h1>}
          {summary && <p className="page-detail-summary">{summary}</p>}
        </header>

        <div className="page-detail-body">
          {hasBlocks ? (
            <DetailBlockRenderer blocks={detail.blocks} />
          ) : (
            <>
              {paragraphs.map((paragraph, index) => (
                <p key={`${card.id}-paragraph-${index}`}>{paragraph}</p>
              ))}

              {detail.sections?.map((section) => (
                <section
                  className="page-detail-content-section"
                  key={section.title}
                >
                  <h2>{section.title}</h2>

                  {section.paragraphs?.map((paragraph, index) => (
                    <p key={`${section.title}-paragraph-${index}`}>
                      {paragraph}
                    </p>
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
            </>
          )}
        </div>
      </article>
    </section>
  );
}