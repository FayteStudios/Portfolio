import ProjectRiverCard from "./ProjectRiverCard.jsx";
import { getPageCards } from "../data/pageCards.js";

export default function PortfolioPage({ page, isOpening }) {
  const pageCards = getPageCards(page);

  function handleNestedCardClick(card) {
    console.log(`Open nested card: ${card.title}`);
  }

  return (
    <section
      className={[
        "portfolio-page",
        `accent-${page.accent}`,
        isOpening ? "portfolio-page-opening" : "portfolio-page-open"
      ].join(" ")}
    >
      <section className="project-river" aria-label={`${page.title} section cards`}>
        {pageCards.map((card) => (
          <ProjectRiverCard
            key={card.id}
            eyebrow={card.eyebrow}
            title={card.title}
            description={card.description}
            status={card.status}
            onClick={() => handleNestedCardClick(card)}
          />
        ))}
      </section>
    </section>
  );
}
