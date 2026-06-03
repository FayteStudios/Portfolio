import { useRef, useState } from "react";
import { portfolioPages } from "./data/portfolioPages.js";
import CardRiver from "./components/CardRiver.jsx";
import PortfolioPage from "./components/PortfolioPage.jsx";
import "./styles/app.css";

const OPEN_TRANSITION_MS = 760;

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openingPage, setOpeningPage] = useState(null);
  const [openedPage, setOpenedPage] = useState(null);
  const transitionTimeoutRef = useRef(null);

  const activePage = portfolioPages[activeIndex];
  const isOpeningPage = Boolean(openingPage);

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

    const page = portfolioPages[index];
    setOpeningPage(page);

    transitionTimeoutRef.current = window.setTimeout(() => {
      setOpenedPage(page);
      setOpeningPage(null);
      transitionTimeoutRef.current = null;
    }, OPEN_TRANSITION_MS);
  }

  function closeOpenedPage() {
    clearTransitionTimeout();
    setOpenedPage(null);
    setOpeningPage(null);
  }

  return (
    <main
      className={[
        "app-shell",
        isOpeningPage ? "app-is-opening-page" : "",
        openedPage ? "page-is-open" : ""
      ].join(" ")}
    >
      {!openedPage && (
        <CardRiver
          pages={portfolioPages}
          activeIndex={activeIndex}
          activePageId={activePage.id}
          isOpeningPage={isOpeningPage}
          onSelect={handleCardSelect}
          onPrevious={goPrevious}
          onNext={goNext}
          canGoPrevious={activeIndex > 0 && !isOpeningPage}
          canGoNext={activeIndex < portfolioPages.length - 1 && !isOpeningPage}
        />
      )}

      {openedPage && (
        <PortfolioPage page={openedPage} onClose={closeOpenedPage} />
      )}
    </main>
  );
}
