import { useRef, useState } from "react";
import { portfolioPages } from "./data/portfolioPages.js";
import CardRiver from "./components/CardRiver.jsx";
import PortfolioPage from "./components/PortfolioPage.jsx";
import "./styles/app.css";

const PAGE_TRANSITION_MS = 900;

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openedPage, setOpenedPage] = useState(null);
  const [isOpeningPage, setIsOpeningPage] = useState(false);
  const transitionTimeoutRef = useRef(null);

  const activePage = portfolioPages[activeIndex];
  const canGoPrevious = activeIndex > 0 && !isOpeningPage;
  const canGoNext = activeIndex < portfolioPages.length - 1 && !isOpeningPage;

  function clearTransitionTimeout() {
    if (transitionTimeoutRef.current) {
      window.clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = null;
    }
  }

  function goToIndex(nextIndex) {
    if (isOpeningPage || openedPage) {
      return;
    }

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

  function handleCardSelect(index) {
    if (isOpeningPage || openedPage) {
      return;
    }

    if (index !== activeIndex) {
      setActiveIndex(index);
      return;
    }

    clearTransitionTimeout();

    setIsOpeningPage(true);

    transitionTimeoutRef.current = window.setTimeout(() => {
      setOpenedPage(portfolioPages[index]);
      setIsOpeningPage(false);
      transitionTimeoutRef.current = null;
    }, PAGE_TRANSITION_MS);
  }

  function closeOpenedPage() {
    clearTransitionTimeout();
    setOpenedPage(null);
    setIsOpeningPage(false);
  }

  return (
    <main className={`app-shell ${openedPage ? "page-is-open" : ""}`}>
      {!openedPage && (
        <CardRiver
          pages={portfolioPages}
          activeIndex={activeIndex}
          activePageId={activePage.id}
          isOpeningPage={isOpeningPage}
          onSelect={handleCardSelect}
          onPrevious={goPrevious}
          onNext={goNext}
          canGoPrevious={canGoPrevious}
          canGoNext={canGoNext}
        />
      )}

      {openedPage && (
        <PortfolioPage page={openedPage} onClose={closeOpenedPage} />
      )}
    </main>
  );
}
