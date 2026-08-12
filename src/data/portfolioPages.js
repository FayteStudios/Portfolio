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
    rank: "",
    arcanaType: "",
    accent: "",
    artImageKey: ""
  }),
  createPortfolioPage({
    id: "games",
    title: "Games",
    subtitle: "My projects",
    rank: "",
    arcanaType: "",
    accent: "",
    artImageKey: ""
  }),
  createPortfolioPage({
    id: "game-design",
    title: "Game Design",
    subtitle: "Explore.",
    rank: "",
    arcanaType: "",
    accent: "",
    artImageKey: ""
  }),
  createPortfolioPage({
    id: "coding",
    title: "Coding",
    subtitle: "Emerge.",
    rank: "",
    arcanaType: "",
    accent: "",
    artImageKey: ""
  }),
  createPortfolioPage({
    id: "art",
    title: "Art",
    subtitle: "Discover.",
    rank: "",
    arcanaType: "",
    accent: "",
    artImageKey: ""
  }),
  createPortfolioPage({
    id: "writing",
    title: "Writing",
    subtitle: "Inspire.",
    rank: "",
    arcanaType: "",
    accent: "",
    artImageKey: ""
  }),
  createPortfolioPage({
    id: "contact",
    title: "Contact",
    subtitle: "Commune",
    rank: "",
    arcanaType: "",
    accent: "",
    artImageKey: ""
  })
];