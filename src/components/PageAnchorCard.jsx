export default function PageAnchorCard({ page, onClose }) {
  return (
    <button
      className={`page-anchor-card compact-card-copy accent-${page.accent}`}
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
          </span>
        </span>
      </span>
    </button>
  );
}
