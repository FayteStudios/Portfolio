import { detailImages } from "../data/detailImageRegistry.js";

function getImageSource(srcKey, src) {
  if (srcKey && detailImages[srcKey]) {
    return detailImages[srcKey];
  }

  return src || "";
}

function MissingImageNotice({ srcKey }) {
  return (
    <p className="detail-missing-image">
      Missing image key: <code>{srcKey || "No image key provided"}</code>
    </p>
  );
}

function getEmbedUrl(url) {
  if (!url) {
    return "";
  }

  const trimmedUrl = url.trim();

  if (trimmedUrl.includes("youtube.com/watch?v=")) {
    const videoId = trimmedUrl.split("v=")[1]?.split("&")[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : trimmedUrl;
  }

  if (trimmedUrl.includes("youtu.be/")) {
    const videoId = trimmedUrl.split("youtu.be/")[1]?.split("?")[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : trimmedUrl;
  }

  if (trimmedUrl.includes("vimeo.com/")) {
    const videoId = trimmedUrl.split("vimeo.com/")[1]?.split("?")[0];
    return videoId ? `https://player.vimeo.com/video/${videoId}` : trimmedUrl;
  }

  return trimmedUrl;
}

export default function DetailBlockRenderer({ blocks = [] }) {
  if (!blocks.length) {
    return null;
  }

  return (
    <>
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

        if (block.type === "paragraphList") {
          return (
            <section className="detail-block detail-block-paragraph-list" key={key}>
              {(block.items || []).map((item, itemIndex) => (
                <p key={`${key}-paragraph-entry-${itemIndex}`}>{item}</p>
              ))}
            </section>
          );
        }

        if (block.type === "commendation") {
          return (
            <section className="detail-block detail-block-commendation" key={key}>
              {block.quote && <p className="commendation-quote">“{block.quote}”</p>}
              {block.attribution && (
                <p className="commendation-attribution">— {block.attribution}</p>
              )}
            </section>
          );
        }

        if (block.type === "list") {
          return (
            <section className="detail-block detail-block-list" key={key}>
              {block.title && <h2 className="detail-block-list-title">{block.title}</h2>}

              <ul>
                {(block.items || []).map((item, itemIndex) => (
                  <li key={`${key}-list-item-${itemIndex}`}>{item}</li>
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

          return (
            <section
              className={`detail-block detail-block-image detail-image-${imageSize}`}
              key={key}
            >
              {imageSource ? (
                <img src={imageSource} alt={block.alt || ""} />
              ) : (
                <MissingImageNotice srcKey={block.srcKey} />
              )}

              {block.caption && <p className="detail-image-caption">{block.caption}</p>}
            </section>
          );
        }

        if (block.type === "imageGrid") {
          return (
            <section
              className={`detail-block detail-block-image-grid detail-image-grid-${block.columns || 2}`}
              key={key}
            >
              {block.title && <h2>{block.title}</h2>}

              <div className="detail-image-grid-items">
                {(block.images || []).map((image, imageIndex) => {
                  const imageSource = getImageSource(image.srcKey, image.src);
                  const imageSize = image.imageSize || "full";

                  return (
                    <figure
                      className={`detail-image-grid-item detail-image-${imageSize}`}
                      key={`${key}-image-${imageIndex}`}
                    >
                      {imageSource ? (
                        <img src={imageSource} alt={image.alt || ""} />
                      ) : (
                        <MissingImageNotice srcKey={image.srcKey} />
                      )}

                      {image.caption && <figcaption>{image.caption}</figcaption>}
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
              {(block.items || []).map((item, itemIndex) => (
                <div className="detail-stat" key={`${key}-stat-${itemIndex}`}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </section>
          );
        }

        if (block.type === "linkButton") {
          return (
            <section className="detail-block detail-block-link-button" key={key}>
              <a
                href={block.href || "#"}
                target="_blank"
                rel="noreferrer"
                className="detail-link-button"
              >
                {block.label || "Open Link"}
              </a>
            </section>
          );
        }

        if (block.type === "videoEmbed") {
          const embedUrl = getEmbedUrl(block.src);

          return (
            <section className="detail-block detail-block-video" key={key}>
              {block.title && <h2>{block.title}</h2>}

              {embedUrl ? (
                <div className="detail-video-frame">
                  <iframe
                    src={embedUrl}
                    title={block.title || "Embedded video"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              ) : (
                <p className="builder-muted">No video URL provided.</p>
              )}

              {block.caption && <p className="detail-video-caption">{block.caption}</p>}
            </section>
          );
        }

        if (block.type === "webglEmbed") {
          return (
            <section className="detail-block detail-block-webgl" key={key}>
              {block.title && <h2>{block.title}</h2>}

              {block.src ? (
                <>
                  <div
                    className="detail-webgl-frame"
                    style={{ minHeight: `${block.height || 600}px` }}
                  >
                    <iframe
                      src={block.src}
                      title={block.title || "Playable demo"}
                      allow="fullscreen; gamepad; autoplay"
                      allowFullScreen
                    />
                  </div>

                  <a
                    href={block.src}
                    target="_blank"
                    rel="noreferrer"
                    className="detail-link-button"
                  >
                    {block.buttonLabel || "Open demo in new tab"}
                  </a>
                </>
              ) : (
                <p className="builder-muted">No WebGL URL provided.</p>
              )}

              {block.caption && <p className="detail-webgl-caption">{block.caption}</p>}
            </section>
          );
        }

        if (block.type === "divider") {
          return (
            <section className="detail-block detail-block-divider" key={key}>
              <hr />
            </section>
          );
        }

        return null;
      })}
    </>
  );
}