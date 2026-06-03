import cardBackImage from "../assets/back.jpg";

export default function RiverCard({
  page,
  index,
  activeIndex,
  isActive,
  isOpeningPage,
  isPageOpen,
  isOpeningCard,
  isPageAnchorCard,
  onSelect
}) {
  const offset = index - activeIndex;
  const distance = Math.abs(offset);
  const isVisible = distance <= 2;

  const compactTitleClass =
    page.title.length >= 22
      ? "title-extra-long"
      : page.title.length >= 15
        ? "title-long"
        : "";

  return (
    <button
      className={[
        "river-card",
        "tarot-card",
        `accent-${page.accent}`,
        compactTitleClass,
        isActive ? "active" : "",
        isVisible ? "visible" : "",
        isOpeningPage && !isOpeningCard ? "collecting-card" : "",
        isPageOpen && !isPageAnchorCard ? "page-hidden-card" : "",
        isOpeningCard ? "opening-anchor-card compact-card-copy" : "",
        isPageAnchorCard ? "page-anchor-river-card compact-card-copy" : ""
      ].join(" ")}
      style={{
        "--offset": offset,
        "--distance": distance
      }}
      type="button"
      onClick={onSelect}
      aria-label={
        isPageAnchorCard ? "Return to card river" : `Open ${page.title}`
      }
      aria-pressed={isActive}
    >
      <span className="river-card-inner">
        <span className="river-card-face river-card-back">
          <span
            className="tarot-back-image"
            style={{ backgroundImage: `url(${cardBackImage})` }}
            aria-hidden="true"
          />
        </span>

        <span className="river-card-face river-card-front">
          <span
            className="tarot-art-image"
            style={{ backgroundImage: `url(${page.artImage})` }}
            aria-hidden="true"
          />

          <span className="tarot-glow" />

          <span className="tarot-frame">
            <span className="tarot-corner tarot-corner-top-left" />
            <span className="tarot-corner tarot-corner-top-right" />
            <span className="tarot-corner tarot-corner-bottom-left" />
            <span className="tarot-corner tarot-corner-bottom-right" />

            <span className="tarot-topline">
              <span>{page.rank}</span>
              <span>{page.arcanaType}</span>
            </span>

            <span className="tarot-haze">
              <span className="tarot-title">{page.title}</span>
              <span className="tarot-subtitle">{page.subtitle}</span>
            </span>
          </span>
        </span>
      </span>
    </button>
  );
}
