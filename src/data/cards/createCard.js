import { getDetailImage } from "../detailImageRegistry.js";

function createDetail({ eyebrow, title, description }) {
  return {
    eyebrow,
    title,
    summary: description,
    paragraphs: []
  };
}

export function createCard({
  id,
  eyebrow,
  title,
  description,
  imageKey,
  image,
  pageTitle,
  status = "",
  detail,
  ageRestricted = false
}) {
  const resolvedImage = image || getDetailImage(imageKey);

  return {
    id,
    eyebrow,
    title,
    description,
    status,
    imageKey,
    image: resolvedImage,
    ageRestricted,
    detail:
      detail ||
      createDetail({
        eyebrow,
        title,
        description,
        pageTitle
      })
  };
}
