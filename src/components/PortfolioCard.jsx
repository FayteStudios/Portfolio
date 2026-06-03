@'
export default function PortfolioCard({ card, index, isSelected, onClick }) {
  const cardStyle = {
    "--card-angle": `${card.angle ?? 0}deg`,
    "--card-delay": `${index * 70}ms`
  };

  return (
    <button
      className={`portfolio-card ${isSelected ? "selected" : ""}`}
      style={cardStyle}
      onClick={onClick}
      type="button"
      aria-pressed={isSelected}
    >
      <span className="card-corner top">
        <span>{card.rank}</span>
        <span>{card.suit}</span>
      </span>

      <span className="card-center-suit">{card.suit}</span>

      <span className="card-content">
        <span className="card-category">{card.category}</span>
        <span className="card-title">{card.title}</span>
        <span className="card-subtitle">{card.subtitle}</span>
      </span>

      <span className="card-corner bottom">
        <span>{card.rank}</span>
        <span>{card.suit}</span>
      </span>
    </button>
  );
}
'@ | Set-Content -Encoding UTF8 src\components\PortfolioCard.jsx