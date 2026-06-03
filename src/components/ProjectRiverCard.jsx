import cardBackImage from "../assets/back.jpg";

export default function ProjectRiverCard({
  card,
  index,
  activeIndex,
  isActive,
  onClick
}) {
  const offset = index - activeIndex;
  const distance = Math.abs(offset);
  const isVisible = distance <= 2;

  return (
    <button
      className={[
        "project-river-card",
        isActive ? "active" : "",
        isVisible ? "visible" : ""
      ].join(" ")}
      style={{
        "--project-offset": offset,
        "--project-distance": distance
      }}
      type="button"
      onClick={onClick}
      aria-label={`Open ${card.title}`}
      aria-pressed={isActive}
    >
      <span className="project-river-card-inner">
        <span className="project-river-card-face project-river-card-back">
          <span
            className="project-river-card-back-image"
            style={{ backgroundImage: `url(${cardBackImage})` }}
            aria-hidden="true"
          />
        </span>

        <span className="project-river-card-face project-river-card-front">
          <span
            className={[
              "project-river-card-art",
              card.image ? "has-project-image" : ""
            ].join(" ")}
            aria-hidden="true"
            style={
              card.image
                ? { backgroundImage: `url(${card.image})` }
                : undefined
            }
          >
            {!card.image && (
              <span className="project-river-card-symbol">✦</span>
            )}
          </span>

          <span className="project-river-card-frame">
            <span className="project-river-card-corner top-left" />
            <span className="project-river-card-corner top-right" />
            <span className="project-river-card-corner bottom-left" />
            <span className="project-river-card-corner bottom-right" />
          </span>

          <span className="project-river-card-eyebrow">
            {card.eyebrow}
          </span>

          <span className="project-river-card-copy">
            <span className="project-river-card-title">{card.title}</span>
            <span className="project-river-card-description">
              {card.description}
            </span>

            {card.status && (
              <span className="project-river-card-status">
                {card.status}
              </span>
            )}
          </span>
        </span>
      </span>
    </button>
  );
}
