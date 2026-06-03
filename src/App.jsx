@'
import { useState } from "react";
import { portfolioCards } from "./data/portfolioCards.js";
import CardTable from "./components/CardTable.jsx";
import CardDetailPanel from "./components/CardDetailPanel.jsx";
import "./styles/app.css";

export default function App() {
  const [selectedCard, setSelectedCard] = useState(portfolioCards[0]);

  return (
    <main className="app-shell">
      <section className="hero">
        <p className="eyebrow">Professional Portfolio Hub</p>
        <h1>Creative work, technical systems, and interactive projects.</h1>
        <p className="hero-copy">
          A tabletop-style portfolio where each card represents a discipline,
          project area, or professional resource.
        </p>
      </section>

      <section className="portfolio-layout">
        <CardTable
          cards={portfolioCards}
          selectedCardId={selectedCard?.id}
          onSelectCard={setSelectedCard}
        />

        <CardDetailPanel card={selectedCard} />
      </section>
    </main>
  );
}
'@ | Set-Content -Encoding UTF8 src\App.jsx