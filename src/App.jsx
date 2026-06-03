import { useState } from "react";
import { portfolioPages } from "./data/portfolioPages.js";
import CardRiver from "./components/CardRiver.jsx";
import "./styles/app.css";

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);

  const canGoPrevious = activeIndex > 0;
  const canGoNext = activeIndex < portfolioPages.length - 1;

  function goToIndex(nextIndex) {
    if (nextIndex < 0 || nextIndex >= portfolioPages.length) {
      return;
    }

    setActiveIndex(nextIndex);
  }

  function goPrevious() {
    goToIndex(activeIndex - 1);
  }

  function goNext() {
    goToIndex(activeIndex + 1);
  }

  return (
    <main className="app-shell">
      <CardRiver
        pages={portfolioPages}
        activeIndex={activeIndex}
        onSelect={goToIndex}
        onPrevious={goPrevious}
        onNext={goNext}
        canGoPrevious={canGoPrevious}
        canGoNext={canGoNext}
      />
    </main>
  );
}
