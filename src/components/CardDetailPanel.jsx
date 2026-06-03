@'
export default function CardDetailPanel({ card }) {
  if (!card) {
    return (
      <aside className="detail-panel empty">
        <p>Select a card to view details.</p>
      </aside>
    );
  }

  return (
    <aside className="detail-panel">
      <p className="panel-eyebrow">{card.category}</p>

      <div className="panel-heading">
        <span className="panel-rank">{card.rank}</span>
        <div>
          <h2>{card.title}</h2>
          <p>{card.subtitle}</p>
        </div>
        <span className="panel-suit">{card.suit}</span>
      </div>

      <p className="panel-summary">{card.summary}</p>

      <section className="panel-section">
        <h3>Highlights</h3>
        <ul>
          {card.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      </section>

      <section className="panel-section">
        <h3>Tools / Focus</h3>
        <div className="tag-list">
          {card.tools.map((tool) => (
            <span key={tool} className="tag">
              {tool}
            </span>
          ))}
        </div>
      </section>

      <div className="panel-actions">
        {card.links.map((link) => (
          <a key={link.label} href={link.href}>
            {link.label}
          </a>
        ))}
      </div>
    </aside>
  );
}
'@ | Set-Content -Encoding UTF8 src\components\CardDetailPanel.jsx