import { useRef } from "react";
import RiverCard from "./RiverCard.jsx";

const SWIPE_THRESHOLD = 45;
const WHEEL_THRESHOLD = 40;
const WHEEL_COOLDOWN_MS = 520;

export default function CardRiver({
  pages,
  activeIndex,
  activePageId,
  isOpeningPage,
  onSelect,
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext
}) {
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const lastWheelTime = useRef(0);

  function handleTouchStart(event) {
    if (isOpeningPage) {
      return;
    }

    const touch = event.touches[0];

    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
  }

  function handleTouchEnd(event) {
    if (isOpeningPage) {
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
      onNext();
    }

    if (deltaX > 0 && canGoPrevious) {
      onPrevious();
    }
  }

  function handleWheel(event) {
    if (isOpeningPage) {
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
      onNext();
    }

    if (dominantDelta < 0 && canGoPrevious) {
      onPrevious();
    }
  }

  function handleKeyDown(event) {
    if (isOpeningPage) {
      return;
    }

    if (event.key === "ArrowRight" && canGoNext) {
      onNext();
    }

    if (event.key === "ArrowLeft" && canGoPrevious) {
      onPrevious();
    }
  }

  return (
    <section
      className={`river-section ${isOpeningPage ? "river-section-opening" : ""}`}
      aria-label="Portfolio card river"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div
        className="river-viewport"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
      >
        <div className="river-track">
          {pages.map((page, index) => (
            <RiverCard
              key={page.id}
              page={page}
              index={index}
              activeIndex={activeIndex}
              isActive={index === activeIndex}
              isOpeningPage={isOpeningPage}
              isOpeningCard={isOpeningPage && page.id === activePageId}
              onSelect={() => onSelect(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
