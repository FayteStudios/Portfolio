import cardBackImage from "../assets/back.jpg";

export default function PageAnchorCard({ page, onClose }) {
  return (
    <button
      className={`page-anchor-card accent-${page.accent}`}
      type="button"
      onClick={onClose}
      aria-label="Return to card river"
    >
      <span className="page-anchor-card-inner">
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
              <span className="tarot-title">{page.title}</span>
              <span className="tarot-subtitle">{page.subtitle}</span>
            </span>
          </span>
        </span>

        <span
          className="page-anchor-card-back-reference"
          style={{ backgroundImage: `url(${cardBackImage})` }}
          aria-hidden="true"
        />
      </span>
    </button>
  );
}
