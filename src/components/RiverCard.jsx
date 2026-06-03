export default function RiverCard({ page, index, activeIndex, isActive, onSelect }) {
  const offset = index - activeIndex;
  const distance = Math.abs(offset);
  const isVisible = distance <= 2;

  return (
    <button
      className={[
        "river-card",
        "tarot-card",
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
      aria-label={`Open ${page.sectionName}`}
      aria-pressed={isActive}
    >
      <span className="river-card-inner">
        <span className="river-card-face river-card-back">
          <span className="tarot-glow" />
          <span className="tarot-back-frame">
            <span className="tarot-back-pattern" />
            <span className="tarot-back-orbit">
              <span>FS</span>
            </span>
          </span>
        </span>

        <span className="river-card-face river-card-front">
          <span
            className="tarot-art-image"
            style={{ backgroundImage: `url(${page.artImage})` }}
            aria-hidden="true"
          />

          <span className="tarot-glow" />

          <span className="tarot-frame">
            <span className="tarot-corner tarot-corner-top-left" />
            <span className="tarot-corner tarot-corner-top-right" />
            <span className="tarot-corner tarot-corner-bottom-left" />
            <span className="tarot-corner tarot-corner-bottom-right" />

            <span className="tarot-topline">
              <span>{page.rank}</span>
              <span>{page.arcanaType}</span>
            </span>

            <span className="tarot-haze">
              <span className="tarot-section-name">{page.sectionName}</span>
              <span className="tarot-title">{page.title}</span>
              <span className="tarot-subtitle">{page.subtitle}</span>
            </span>
          </span>
        </span>
      </span>
    </button>
  );
}
