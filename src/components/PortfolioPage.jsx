import { useEffect, useRef, useState } from "react";
import ProjectRiverCard from "./ProjectRiverCard.jsx";
import PageDetailPanel from "./PageDetailPanel.jsx";
import { getPageCards } from "../data/pageCards.js";

const SWIPE_THRESHOLD = 45;
const WHEEL_THRESHOLD = 40;
const WHEEL_COOLDOWN_MS = 520;
const DEAL_ANIMATION_MS = 1500;
const DETAIL_CLOSE_MS = 650;

export default function PortfolioPage({ page }) {
  const pageCards = getPageCards(page);

  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [isDealing, setIsDealing] = useState(true);
  const [openedDetailCard, setOpenedDetailCard] = useState(null);
  const [isClosingDetail, setIsClosingDetail] = useState(false);

  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const lastWheelTime = useRef(0);
  const closeTimerRef = useRef(null);

  const canGoPrevious =
    activeProjectIndex > 0 && !openedDetailCard && !isClosingDetail;

  const canGoNext =
    activeProjectIndex < pageCards.length - 1 &&
    !openedDetailCard &&
    !isClosingDetail;

  useEffect(() => {
    setIsDealing(true);
    setActiveProjectIndex(0);
    setOpenedDetailCard(null);
    setIsClosingDetail(false);

    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    const dealTimer = window.setTimeout(() => {
      setIsDealing(false);
    }, DEAL_ANIMATION_MS);

    return () => {
      window.clearTimeout(dealTimer);

      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
    };
  }, [page.id]);

  function goToProjectIndex(nextIndex) {
    if (openedDetailCard || isClosingDetail) {
      return;
    }

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
    if (openedDetailCard || isClosingDetail) {
      return;
    }

    if (index !== activeProjectIndex) {
      setActiveProjectIndex(index);
      return;
    }

    setOpenedDetailCard(card);
    setIsClosingDetail(false);
  }

  function closeDetailCard() {
    if (!openedDetailCard || isClosingDetail) {
      return;
    }

    setIsClosingDetail(true);

    closeTimerRef.current = window.setTimeout(() => {
      setOpenedDetailCard(null);
      setIsClosingDetail(false);
      closeTimerRef.current = null;
    }, DETAIL_CLOSE_MS);
  }

  function handleTouchStart(event) {
    if (openedDetailCard || isClosingDetail) {
      return;
    }

    const touch = event.touches[0];
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
  }

  function handleTouchEnd(event) {
    if (openedDetailCard || isClosingDetail) {
      return;
    }

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
    if (openedDetailCard) {
      return;
    }

    event.preventDefault();

    if (isDealing || isClosingDetail) {
      return;
    }

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
    if (openedDetailCard) {
      if (event.key === "Escape") {
        closeDetailCard();
      }

      return;
    }

    if (isDealing || isClosingDetail) {
      return;
    }

    if (event.key === "ArrowRight" && canGoNext) {
      goNext();
    }

    if (event.key === "ArrowLeft" && canGoPrevious) {
      goPrevious();
    }
  }

  return (
    <section
      className={[
        `portfolio-page accent-${page.accent}`,
        "portfolio-page-open",
        openedDetailCard ? "portfolio-detail-open" : "",
        isClosingDetail ? "portfolio-detail-closing" : ""
      ].join(" ")}
      onKeyDown={handleKeyDown}
    >
      {!openedDetailCard && (
        <section
          className={[
            "project-river",
            isDealing ? "project-river-dealing" : ""
          ].join(" ")}
          aria-label={`${page.title} section cards`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
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
      )}

      {openedDetailCard && (
        <PageDetailPanel
          page={page}
          card={openedDetailCard}
          isClosing={isClosingDetail}
          onBack={closeDetailCard}
        />
      )}
    </section>
  );
}