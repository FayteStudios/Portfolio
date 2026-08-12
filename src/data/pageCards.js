import { aboutCards } from "./cards/about.js";
import { gamesCards } from "./cards/games.js";
import { gameDesignCards } from "./cards/gameDesign.js";
import { codingCards } from "./cards/coding.js";
import { artCards } from "./cards/art.js";
import { writingCards } from "./cards/writing.js";
import { contactCards } from "./cards/contact.js";

const pageCardsBySection = {
  about: aboutCards,
  games: gamesCards,
  "game-design": gameDesignCards,
  coding: codingCards,
  art: artCards,
  writing: writingCards,
  contact: contactCards
};

export function getPageCards(page) {
  if (!page?.id) {
    return [];
  }

  return pageCardsBySection[page.id] ?? [];
}
