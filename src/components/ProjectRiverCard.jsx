export default function ProjectRiverCard({
  eyebrow,
  title,
  description,
  status,
  onClick
}) {
  return (
    <button
      className="project-river-card"
      type="button"
      onClick={onClick}
      aria-label={`Open ${title}`}
    >
      <span className="project-river-card-inner">
        <span className="project-river-card-face">
          <span className="project-river-card-art" aria-hidden="true">
            <span className="project-river-card-symbol">✦</span>
          </span>

          <span className="project-river-card-frame">
            <span className="project-river-card-corner top-left" />
            <span className="project-river-card-corner top-right" />
            <span className="project-river-card-corner bottom-left" />
            <span className="project-river-card-corner bottom-right" />
          </span>

          <span className="project-river-card-eyebrow">
            {eyebrow}
          </span>

          <span className="project-river-card-copy">
            <span className="project-river-card-title">{title}</span>
            <span className="project-river-card-description">{description}</span>

            {status && (
              <span className="project-river-card-status">
                {status}
              </span>
            )}
          </span>
        </span>
      </span>
    </button>
  );
}
