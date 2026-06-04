import { useRef, useState } from "react";
import { portfolioPages } from "./data/portfolioPages.js";
import CardRiver from "./components/CardRiver.jsx";
import PortfolioPage from "./components/PortfolioPage.jsx";
import DetailPageBuilder from "./components/DetailPageBuilder.jsx";
import "./styles/app.css";

const PAGE_OPEN_MS = 780;

export default function App() {
  const [isEditorMode] = useState(() => {
    const params = new URLSearchParams(window.location.search);

    return params.get("editor") === "true" || window.location.hash === "#editor";
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [openingPage, setOpeningPage] = useState(null);
  const [openedPage, setOpenedPage] = useState(null);
  const [isDetailPageOpen, setIsDetailPageOpen] = useState(false);

  const timeoutRef = useRef(null);

  const activePage = portfolioPages[activeIndex];
  const displayedPage = openedPage;
  const isOpeningPage = Boolean(openingPage);
  const isPageOpen = Boolean(openedPage);

  if (isEditorMode) {
    return (
      <main className="editor-shell">
        <DetailPageBuilder />
      </main>
    );
  }

  function clearOpenTimer() {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }

  function goToIndex(nextIndex) {
    if (isOpeningPage || isPageOpen || isDetailPageOpen) {
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
    if (isOpeningPage || isPageOpen || isDetailPageOpen) {
      return;
    }

    if (index !== activeIndex) {
      setActiveIndex(index);
      return;
    }

    const page = portfolioPages[index];

    clearOpenTimer();
    setOpeningPage(page);

    timeoutRef.current = window.setTimeout(() => {
      setOpenedPage(page);
      setOpeningPage(null);
      timeoutRef.current = null;
    }, PAGE_OPEN_MS);
  }

  function closeOpenedPage() {
    clearOpenTimer();
    setIsDetailPageOpen(false);
    setOpenedPage(null);
    setOpeningPage(null);
  }

  return (
    <main
      className={[
        "app-shell",
        isOpeningPage ? "app-is-opening-page" : "",
        isPageOpen ? "page-is-open" : "",
        isDetailPageOpen ? "app-detail-page-open" : ""
      ].join(" ")}
    >
      {!isDetailPageOpen && (
        <CardRiver
          pages={portfolioPages}
          activeIndex={activeIndex}
          activePageId={activePage?.id}
          isOpeningPage={isOpeningPage}
          isPageOpen={isPageOpen}
          onSelect={handleCardSelect}
          onReturn={closeOpenedPage}
          onPrevious={goPrevious}
          onNext={goNext}
          canGoPrevious={
            activeIndex > 0 && !isOpeningPage && !isPageOpen
          }
          canGoNext={
            activeIndex < portfolioPages.length - 1 &&
            !isOpeningPage &&
            !isPageOpen
          }
        />
      )}

      {displayedPage && (
        <PortfolioPage
          page={displayedPage}
          onClosePage={closeOpenedPage}
          onDetailOpenChange={setIsDetailPageOpen}
        />
      )}
    </main>
  );
}