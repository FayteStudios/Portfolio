export default function RiverCard({ page, index, activeIndex, isActive, onSelect }) {
  const offset = index - activeIndex;
  const distance = Math.abs(offset);
  const isVisible = distance <= 2;

  return (
    <button
      className={[
        "river-card",
        `accent-${page.accent}`,
        isActive ? "active" : "",
        isVisible ? "visible" : ""
      ].join(" ")}
      style={{
        "--offset": offset,
        "--distance": distance
      }}
      type="button"
      onClick={onSelect}
      aria-label={`Open ${page.title}`}
      aria-pressed={isActive}
    >
      <span className="river-card-inner">
        <span className="river-card-face river-card-back">
          <span className="card-back-border">
            <span className="card-back-pattern" />
            <span className="card-back-logo">FS</span>
          </span>
        </span>

        <span className="river-card-face river-card-front">
          <span className="river-card-corner top">
            <span>{page.rank}</span>
            <span>{page.suit}</span>
          </span>

          <span className="snapshot">
            <span className="snapshot-browser">
              <span />
              <span />
              <span />
            </span>

            <span className="snapshot-content">
              <span className="snapshot-label">{page.previewMeta}</span>
              <span className="snapshot-title">{page.previewTitle}</span>

              <span className="snapshot-lines">
                <span />
                <span />
                <span />
                <span />
              </span>
            </span>
          </span>

          <span className="river-card-title">
            <span>{page.title}</span>
            <small>{page.subtitle}</small>
          </span>

          <span className="river-card-summary">
            {page.summary}
          </span>

          <span className="river-card-action">
            Open section
          </span>

          <span className="river-card-corner bottom">
            <span>{page.rank}</span>
            <span>{page.suit}</span>
          </span>
        </span>
      </span>
    </button>
  );
}
