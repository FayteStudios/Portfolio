import sunImage from "../assets/sun.png";
import queenWandsImage from "../assets/queen-wands.jpg";
import aceSwordsImage from "../assets/ace-swords.jpg";
import moonImage from "../assets/moon.jpg";
import knightCupsImage from "../assets/knight-cups.jpg";
import pagePentaclesImage from "../assets/page-pentacles.jpg";

export const portfolioPages = [
  {
    id: "about",
    title: "Nathanael Paulus",
    subtitle: "Learn.",
    rank: "Sun",
    arcanaType: "Major",
    accent: "sun",
    artImage: sunImage
  },
  {
    id: "game-design",
    title: "Game Design",
    subtitle: "Explore.",
    rank: "Queen",
    arcanaType: "Wands",
    accent: "wands",
    artImage: queenWandsImage
  },
  {
    id: "coding",
    title: "Coding",
    subtitle: "Inspire.",
    rank: "Ace",
    arcanaType: "Swords",
    accent: "swords",
    artImage: aceSwordsImage
  },
  {
    id: "art",
    title: "Art",
    subtitle: "Dream.",
    rank: "Moon",
    arcanaType: "Major",
    accent: "moon",
    artImage: moonImage
  },
  {
    id: "writing",
    title: "Writing",
    subtitle: "Introspect.",
    rank: "Knight",
    arcanaType: "Cups",
    accent: "cups",
    artImage: knightCupsImage
  },
  {
    id: "contact",
    title: "Contact",
    subtitle: "Commune.",
    rank: "Page",
    arcanaType: "Pentacles",
    accent: "pentacles",
    artImage: pagePentaclesImage
  }
];