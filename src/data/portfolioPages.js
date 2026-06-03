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
    subtitle: "Learn about me.",
    rank: "XIX",
    arcanaType: "Major Arcana",
    accent: "sun",
    artImage: sunImage
  },
  {
    id: "game-design",
    title: "Game Design",
    subtitle: "Turning ideas into fun.",
    rank: "Queen",
    arcanaType: "Wands",
    accent: "wands",
    artImage: queenWandsImage
  },
  {
    id: "programming",
    title: "Coding",
    subtitle: "A true form of art.",
    rank: "Ace",
    arcanaType: "Swords",
    accent: "swords",
    artImage: aceSwordsImage
  },
  {
    id: "art",
    title: "Art",
    subtitle: "A different perspective.",
    rank: "Moon",
    arcanaType: "Major Arcana",
    accent: "moon",
    artImage: moonImage
  },
  {
    id: "writing",
    title: "Writing",
    subtitle: "A thousand things to say.",
    rank: "Knight",
    arcanaType: "Cups",
    accent: "cups",
    artImage: knightCupsImage
  },
  {
    id: "contact",
    title: "Page of Pentacles",
    sectionName: "Contact",
    subtitle: "Reach out and connect.",
    rank: "Page",
    arcanaType: "Court Card",
    accent: "pentacles",
    artImage: pagePentaclesImage
  }
];
