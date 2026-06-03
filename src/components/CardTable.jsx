@'
import PortfolioCard from "./PortfolioCard.jsx";

export default function CardTable({ cards, selectedCardId, onSelectCard }) {
  return (
    <div className="card-table" aria-label="Portfolio card table">
      <div className="table-felt">
        {cards.map((card, index) => (
          <PortfolioCard
            key={card.id}
            card={card}
            index={index}
            isSelected={card.id === selectedCardId}
            onClick={() => onSelectCard(card)}
          />
        ))}
      </div>
    </div>
  );
}
'@ | Set-Content -Encoding UTF8 src\components\CardTable.jsx