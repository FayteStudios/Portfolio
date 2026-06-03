import { useRef, useState } from "react";
import ProjectRiverCard from "./ProjectRiverCard.jsx";
import { getPageCards } from "../data/pageCards.js";

const SWIPE_THRESHOLD = 45;
const WHEEL_THRESHOLD = 40;
const WHEEL_COOLDOWN_MS = 520;

export default function PortfolioPage({ page }) {
  const pageCards = getPageCards(page);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const lastWheelTime = useRef(0);

  const canGoPrevious = activeProjectIndex > 0;
  const canGoNext = activeProjectIndex < pageCards.length - 1;

  function goToProjectIndex(nextIndex) {
    if (nextIndex < 0 || nextIndex >= pageCards.length) {
      return;
    }

    setActiveProjectIndex(nextIndex);
  }

  function goPrevious() {
    goToProjectIndex(activeProjectIndex - 1);
  }

  function goNext() {
    goToProjectIndex(activeProjectIndex + 1);
  }

  function handleProjectSelect(index, card) {
    if (index !== activeProjectIndex) {
      setActiveProjectIndex(index);
      return;
    }

    console.log(`Open nested card: ${card.title}`);
  }

  function handleTouchStart(event) {
    const touch = event.touches[0];

    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
  }

  function handleTouchEnd(event) {
    if (touchStartX.current === null || touchStartY.current === null) {
      return;
    }

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartX.current;
    const deltaY = touch.clientY - touchStartY.current;

    touchStartX.current = null;
    touchStartY.current = null;

    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      return;
    }

    if (Math.abs(deltaX) < SWIPE_THRESHOLD) {
      return;
    }

    if (deltaX < 0 && canGoNext) {
      goNext();
    }

    if (deltaX > 0 && canGoPrevious) {
      goPrevious();
    }
  }

  function handleWheel(event) {
    event.preventDefault();

    const now = Date.now();

    if (now - lastWheelTime.current < WHEEL_COOLDOWN_MS) {
      return;
    }

    const dominantDelta =
      Math.abs(event.deltaX) > Math.abs(event.deltaY)
        ? event.deltaX
        : event.deltaY;

    if (Math.abs(dominantDelta) < WHEEL_THRESHOLD) {
      return;
    }

    lastWheelTime.current = now;

    if (dominantDelta > 0 && canGoNext) {
      goNext();
    }

    if (dominantDelta < 0 && canGoPrevious) {
      goPrevious();
    }
  }

  function handleKeyDown(event) {
    if (event.key === "ArrowRight" && canGoNext) {
      goNext();
    }

    if (event.key === "ArrowLeft" && canGoPrevious) {
      goPrevious();
    }
  }

  return (
      <section
        className={`portfolio-page accent-${page.accent} portfolio-page-open`}
      >
      <section
        className="project-river"
        aria-label={`${page.title} section cards`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <div className="project-river-track">
          {pageCards.map((card, index) => (
            <ProjectRiverCard
              key={card.id}
              card={card}
              index={index}
              activeIndex={activeProjectIndex}
              isActive={index === activeProjectIndex}
              onClick={() => handleProjectSelect(index, card)}
            />
          ))}
        </div>
      </section>
    </section>
  );
}
