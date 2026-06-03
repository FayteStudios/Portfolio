const allAssetModules = import.meta.glob("../assets/**/*", {
  eager: true,
  import: "default",
  query: "?url"
});

const imageExtensions = new Set([
  "png",
  "jpg",
  "jpeg",
  "webp",
  "avif",
  "gif",
  "svg"
]);

const legacyAliases = {
  sunImage: "sun",
  aceSwordsImage: "ace-swords",
  queenWandsImage: "queen-wands",
  moonImage: "moon",
  knightCupsImage: "knight-cups",
  pagePentaclesImage: "page-pentacles",
  rpgwoImage: "rpgwo"
};

function getExtension(filePath) {
  return filePath.split(".").pop()?.toLowerCase() || "";
}

function isImageFile(filePath) {
  return imageExtensions.has(getExtension(filePath));
}

function removeExtension(fileName) {
  return fileName.replace(/\.[^/.]+$/, "");
}

function titleCase(value) {
  return value
    .replace(/[-_/]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function createImageKey(filePath) {
  return removeExtension(filePath.replace("../assets/", ""));
}

function createImageLabel(filePath) {
  const assetPath = filePath.replace("../assets/", "");
  return titleCase(removeExtension(assetPath));
}

const imageEntries = Object.entries(allAssetModules).filter(([filePath]) =>
  isImageFile(filePath)
);

const generatedImages = Object.fromEntries(
  imageEntries.map(([filePath, imageSource]) => [
    createImageKey(filePath),
    imageSource
  ])
);

const generatedOptions = imageEntries
  .map(([filePath]) => ({
    key: createImageKey(filePath),
    label: createImageLabel(filePath),
    path: filePath.replace("../assets/", "")
  }))
  .sort((a, b) => a.label.localeCompare(b.label));

export const detailImages = {
  ...generatedImages,

  // Backward-compatible aliases for older detail objects.
  ...Object.fromEntries(
    Object.entries(legacyAliases)
      .filter(([, generatedKey]) => generatedImages[generatedKey])
      .map(([aliasKey, generatedKey]) => [aliasKey, generatedImages[generatedKey]])
  )
};

export const detailImageOptions = generatedOptions;