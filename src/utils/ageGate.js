const STORAGE_PREFIX = "fayte-portfolio:age-gate:";

export function isAgeConfirmed(cardId) {
  try {
    return sessionStorage.getItem(STORAGE_PREFIX + cardId) === "true";
  } catch {
    return false;
  }
}

export function confirmAge(cardId) {
  try {
    sessionStorage.setItem(STORAGE_PREFIX + cardId, "true");
  } catch {
    // Storage unavailable (private browsing, etc.) - confirmation just won't persist.
  }
}
