import { getDetailImage } from "./detailImageRegistry.js";


function createPortfolioPage({
  id,
  title,
  subtitle,
  rank,
  arcanaType,
  accent,
  artImageKey,
  artImage
}) {
  return {
    id,
    title,
    subtitle,
    rank,
    arcanaType,
    accent,
    artImageKey,
    artImage: artImage || getDetailImage(artImageKey)
  };
}

export const portfolioPages = [
  createPortfolioPage({
    id: "about",
    title: "Nathanael Paulus",
    subtitle: "Learn.",
    rank: "Sun",
    arcanaType: "Major",
    accent: "sun",
    artImageKey: "sun"
  }),
  createPortfolioPage({
    id: "game-design",
    title: "Game Design",
    subtitle: "Explore.",
    rank: "Queen",
    arcanaType: "Wands",
    accent: "wands",
    artImageKey: "queen-wands"
  }),
  createPortfolioPage({
    id: "coding",
    title: "Coding",
    subtitle: "Emerge.",
    rank: "Ace",
    arcanaType: "Swords",
    accent: "swords",
    artImageKey: "ace-swords"
  }),
  createPortfolioPage({
    id: "art",
    title: "Art",
    subtitle: "Discover.",
    rank: "Moon",
    arcanaType: "Major",
    accent: "moon",
    artImageKey: "moon"
  }),
  createPortfolioPage({
    id: "writing",
    title: "Writing",
    subtitle: "Inspire.",
    rank: "Knight",
    arcanaType: "Cups",
    accent: "cups",
    artImageKey: "knight-cups"
  }),
  createPortfolioPage({
    id: "contact",
    title: "Contact",
    subtitle: "Commune",
    rank: "Page",
    arcanaType: "Pentacles",
    accent: "pentacles",
    artImageKey: "page-pentacles"
  })
];