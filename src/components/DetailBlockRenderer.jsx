import { detailImages } from "../data/detailImageRegistry.js";

function getImageSource(srcKey, src) {
  if (srcKey && detailImages[srcKey]) {
    return detailImages[srcKey];
  }

  return src || "";
}

function MissingImageNotice({ srcKey }) {
  return (
    <div className="detail-missing-image">
      Missing image key: <code>{srcKey || "No image key provided"}</code>
    </div>
  );
}

export default function DetailBlockRenderer({ blocks = [] }) {
  if (!blocks.length) {
    return null;
  }

  return (
    <div className="detail-blocks">
      {blocks.map((block, index) => {
        const key = block.id || `${block.type}-${index}`;

        if (block.type === "heading") {
          return (
            <section className="detail-block detail-block-heading" key={key}>
              <h2>{block.text}</h2>
            </section>
          );
        }

        if (block.type === "paragraph") {
          return (
            <section className="detail-block detail-block-paragraph" key={key}>
              <p>{block.text}</p>
            </section>
          );
        }

        if (block.type === "list") {
          return (
            <section className="detail-block detail-block-list" key={key}>
              {block.title && <h2>{block.title}</h2>}

              <ul>
                {(block.items || []).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          );
        }

        if (block.type === "callout") {
          return (
            <section className="detail-block detail-block-callout" key={key}>
              {block.title && <h2>{block.title}</h2>}
              {block.text && <p>{block.text}</p>}
            </section>
          );
        }

        if (block.type === "image") {
          const imageSource = getImageSource(block.srcKey, block.src);
          const imageSize = block.imageSize || "full";

          if (!imageSource) {
            return (
              <section className="detail-block" key={key}>
                <MissingImageNotice srcKey={block.srcKey} />
              </section>
            );
          }

          return (
            <figure
              className={[
                "detail-block",
                "detail-block-image",
                `detail-image-size-${imageSize}`
              ].join(" ")}
              key={key}
            >
              <img src={imageSource} alt={block.alt || ""} />

              {block.caption && <figcaption>{block.caption}</figcaption>}
            </figure>
          );
        }

        if (block.type === "imageGrid") {
          const images = block.images || [];

          return (
            <section
              className="detail-block detail-block-image-grid"
              style={{ "--detail-grid-columns": block.columns || 2 }}
              key={key}
            >
              {block.title && <h2>{block.title}</h2>}

              <div className="detail-image-grid">
                {images.map((image, imageIndex) => {
                  const imageSource = getImageSource(image.srcKey, image.src);

                  if (!imageSource) {
                    return (
                      <figure key={`${key}-image-${imageIndex}`}>
                        <MissingImageNotice srcKey={image.srcKey} />
                      </figure>
                    );
                  }

                  return (
                    <figure
                      className={`detail-image-size-${image.imageSize || "full"}`}
                      key={`${key}-image-${imageIndex}`}
                    >
                      <img src={imageSource} alt={image.alt || ""} />

                      {image.caption && (
                        <figcaption>{image.caption}</figcaption>
                      )}
                    </figure>
                  );
                })}
              </div>
            </section>
          );
        }

        if (block.type === "twoColumn") {
          return (
            <section className="detail-block detail-block-two-column" key={key}>
              <div>
                {block.leftTitle && <h2>{block.leftTitle}</h2>}
                {block.leftText && <p>{block.leftText}</p>}
              </div>

              <div>
                {block.rightTitle && <h2>{block.rightTitle}</h2>}
                {block.rightText && <p>{block.rightText}</p>}
              </div>
            </section>
          );
        }

        if (block.type === "stats") {
          return (
            <section className="detail-block detail-block-stats" key={key}>
              {(block.items || []).map((item) => (
                <article className="detail-stat-card" key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </article>
              ))}
            </section>
          );
        }

        if (block.type === "linkButton") {
          return (
            <section className="detail-block detail-block-link-button" key={key}>
              <a href={block.href} target="_blank" rel="noreferrer">
                {block.label || "Open Link"}
              </a>
            </section>
          );
        }

        if (block.type === "divider") {
          return <hr className="detail-block detail-block-divider" key={key} />;
        }

        return null;
      })}
    </div>
  );
}