import { useMemo, useState } from "react";
import { portfolioPages } from "../data/portfolioPages.js";
import { getPageCards } from "../data/pageCards.js";
import { detailImageOptions } from "../data/detailImageRegistry.js";
import DetailBlockRenderer from "./DetailBlockRenderer.jsx";

function createId() {
  return crypto.randomUUID
    ? crypto.randomUUID()
    : `block-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}


const imageSizeOptions = [
  {
    value: "full",
    label: "Full width"
  },
  {
    value: "large",
    label: "Large"
  },
  {
    value: "medium",
    label: "Medium"
  },
  {
    value: "small",
    label: "Small"
  },
  {
    value: "portrait",
    label: "Portrait crop"
  },
  {
    value: "wide",
    label: "Wide banner crop"
  },
  {
    value: "natural",
    label: "Natural"
  }
];

function valueOrFallback(value, fallback) {
  return value === undefined || value === null ? fallback : value;
}

function createEditableDetailFromCard(card) {
  return {
    eyebrow: valueOrFallback(card?.detail?.eyebrow, card?.eyebrow || ""),
    title: valueOrFallback(card?.detail?.title, card?.title || ""),
    summary: valueOrFallback(card?.detail?.summary, card?.description || ""),
    blocks:
      card?.detail?.blocks?.map((block) => ({
        ...block,
        id: createId()
      })) || [
        createBlock("paragraph"),
        createBlock("heading"),
        createBlock("imageGrid")
      ]
  };
}

function createBlock(type) {
  if (type === "heading") {
    return {
      id: createId(),
      type: "heading",
      text: "New Heading"
    };
  }

  if (type === "paragraph") {
    return {
      id: createId(),
      type: "paragraph",
      text: "Write a paragraph here."
    };
  }

    if (type === "paragraphList") {
    return {
        id: createId(),
        type: "paragraphList",
        items: [""]
    };
    }

  if (type === "list") {
    return {
      id: createId(),
      type: "list",
      title: "List Title",
      items: ["First item", "Second item", "Third item", "Fourth item"]
    };
  }

  // keep the rest of your existing createBlock function below this
}

function cleanDetailForExport(detail) {
  return {
    eyebrow: detail.eyebrow,
    title: detail.title,
    summary: detail.summary,
    blocks: detail.blocks.map((block) => {
      const { id, ...cleanBlock } = block;
      return cleanBlock;
    })
  };
}

function blockToEditableText(block) {
  if (block.type === "list") {
    return (block.items || []).join("\n");
  }

  if (block.type === "stats") {
    return (block.items || [])
      .map((item) => `${item.value} | ${item.label}`)
      .join("\n");
  }

    if (block.type === "imageGrid") {
    return (block.images || [])
        .map((image) =>
        [
            image.srcKey || "",
            image.imageSize || "full",
            image.alt || "",
            image.caption || ""
        ].join(" | ")
        )
        .join("\n");
    }

  return "";
}

function updateBlockFromEditableText(block, value) {
  if (block.type === "list") {
    return {
      ...block,
      items: value
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean)
    };
  }

  if (block.type === "stats") {
    return {
      ...block,
      items: value
        .split("\n")
        .map((line) => {
          const [valuePart, labelPart] = line.split("|");

          return {
            value: valuePart?.trim() || "",
            label: labelPart?.trim() || ""
          };
        })
        .filter((item) => item.value || item.label)
    };
  }

    if (block.type === "imageGrid") {
    return {
        ...block,
        images: value
        .split("\n")
        .map((line) => {
            const [srcKey, imageSize, alt, caption] = line.split("|");

            return {
            srcKey: srcKey?.trim() || "",
            imageSize: imageSize?.trim() || "full",
            alt: alt?.trim() || "",
            caption: caption?.trim() || ""
            };
        })
        .filter((image) => image.srcKey)
    };
    }

  return block;
}

function BlockEditor({ block, onChange, onMoveUp, onMoveDown, onDelete }) {
  function updateField(field, value) {
    onChange({
      ...block,
      [field]: value
    });
  }

  function updateItem(itemIndex, value) {
    const nextItems = [...(block.items || [])];
    nextItems[itemIndex] = value;

    onChange({
      ...block,
      items: nextItems
    });
  }

  function addItem() {
    onChange({
      ...block,
      items: [...(block.items || []), ""]
    });
  }

  function deleteItem(itemIndex) {
    onChange({
      ...block,
      items: (block.items || []).filter((_, index) => index !== itemIndex)
    });
  }

  return (
    <article className="builder-block-editor">
      <header className="builder-block-header">
        <strong>{block.type}</strong>

        <div className="builder-block-actions">
          <button type="button" onClick={onMoveUp}>
            Up
          </button>
          <button type="button" onClick={onMoveDown}>
            Down
          </button>
          <button type="button" onClick={onDelete}>
            Delete
          </button>
        </div>
      </header>

      {block.type === "heading" && (
        <label>
          Heading
          <input
            value={block.text || ""}
            onChange={(event) => updateField("text", event.target.value)}
          />
        </label>
      )}

      {block.type === "paragraph" && (
        <label>
          Paragraph
          <textarea
            value={block.text || ""}
            onChange={(event) => updateField("text", event.target.value)}
          />
        </label>
      )}

      {block.type === "callout" && (
        <>
          <label>
            Title
            <input
              value={block.title || ""}
              onChange={(event) => updateField("title", event.target.value)}
            />
          </label>

          <label>
            Text
            <textarea
              value={block.text || ""}
              onChange={(event) => updateField("text", event.target.value)}
            />
          </label>
        </>
      )}

      {block.type === "image" && (
  <>
    <label>
      Image
      <select
        value={block.srcKey || ""}
        onChange={(event) => updateField("srcKey", event.target.value)}
      >
        {detailImageOptions.map((image) => (
          <option value={image.key} key={image.key}>
            {image.label}
          </option>
        ))}
      </select>
    </label>

    <label>
      Image Size
      <select
        value={block.imageSize || "full"}
        onChange={(event) => updateField("imageSize", event.target.value)}
      >
        {imageSizeOptions.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>

    <label>
      Alt Text
      <input
        value={block.alt || ""}
        onChange={(event) => updateField("alt", event.target.value)}
      />
    </label>

    <label>
      Caption
      <input
        value={block.caption || ""}
        onChange={(event) => updateField("caption", event.target.value)}
      />
    </label>
  </>
)}

      {block.type === "imageGrid" && (
        <>
          <label>
            Title
            <input
              value={block.title || ""}
              onChange={(event) => updateField("title", event.target.value)}
            />
          </label>

          <label>
            Columns
            <select
              value={block.columns || 2}
              onChange={(event) =>
                updateField("columns", Number(event.target.value))
              }
            >
              <option value={2}>2 columns</option>
              <option value={3}>3 columns</option>
              <option value={4}>4 columns</option>
            </select>
          </label>

          <label>
            Images
            <span className="builder-field-note">
                One per line: imageKey | size | alt text | caption
            </span>
            <textarea
              value={blockToEditableText(block)}
              onChange={(event) =>
                onChange(updateBlockFromEditableText(block, event.target.value))
              }
            />
          </label>
        </>
      )}

      {block.type === "twoColumn" && (
        <>
          <label>
            Left Title
            <input
              value={block.leftTitle || ""}
              onChange={(event) => updateField("leftTitle", event.target.value)}
            />
          </label>

          <label>
            Left Text
            <textarea
              value={block.leftText || ""}
              onChange={(event) => updateField("leftText", event.target.value)}
            />
          </label>

          <label>
            Right Title
            <input
              value={block.rightTitle || ""}
              onChange={(event) => updateField("rightTitle", event.target.value)}
            />
          </label>

          <label>
            Right Text
            <textarea
              value={block.rightText || ""}
              onChange={(event) => updateField("rightText", event.target.value)}
            />
          </label>
        </>
      )}

    {block.type === "list" && (
    <>
        <label>
        Title
        <input
            value={block.title || ""}
            onChange={(event) => updateField("title", event.target.value)}
        />
        </label>

        <div className="builder-item-editor">
        <div className="builder-item-editor-header">
            <strong>Items</strong>
            <button type="button" onClick={addItem}>
            Add Item
            </button>
        </div>

        {(block.items || []).map((item, itemIndex) => (
            <div className="builder-item-row" key={`${block.id}-item-${itemIndex}`}>
            <input
                value={item}
                placeholder={`Item ${itemIndex + 1}`}
                onChange={(event) => updateItem(itemIndex, event.target.value)}
            />

            <button type="button" onClick={() => deleteItem(itemIndex)}>
                Delete
            </button>
            </div>
        ))}
        </div>
    </>
    )}
    {block.type === "paragraphList" && (
        <div className="builder-item-editor">
            <div className="builder-item-editor-header">
            <strong>Paragraph Entries</strong>
            <button type="button" onClick={addItem}>
                Add Entry
            </button>
            </div>

            <span className="builder-field-note">
            Each entry renders as paragraph-styled text with tighter spacing.
            </span>

            {(block.items || []).map((item, itemIndex) => (
            <div className="builder-item-row" key={`${block.id}-paragraph-${itemIndex}`}>
                <input
                value={item}
                placeholder={`Entry ${itemIndex + 1}`}
                onChange={(event) => updateItem(itemIndex, event.target.value)}
                />

                <button type="button" onClick={() => deleteItem(itemIndex)}>
                Delete
                </button>
            </div>
            ))}
        </div>
        )}

      {block.type === "stats" && (
        <label>
          Stats
          <span className="builder-field-note">
            One per line: value | label
          </span>
          <textarea
            value={blockToEditableText(block)}
            onChange={(event) =>
              onChange(updateBlockFromEditableText(block, event.target.value))
            }
          />
        </label>
      )}

      {block.type === "linkButton" && (
        <>
          <label>
            Label
            <input
              value={block.label || ""}
              onChange={(event) => updateField("label", event.target.value)}
            />
          </label>

          <label>
            URL
            <input
              value={block.href || ""}
              onChange={(event) => updateField("href", event.target.value)}
            />
          </label>
        </>
      )}

      {block.type === "divider" && (
        <p className="builder-muted">Divider has no editable fields.</p>
      )}
    </article>
  );
}

export default function DetailPageBuilder() {
  const [selectedPageId, setSelectedPageId] = useState(
    portfolioPages[0]?.id || ""
  );

  const selectedPage = useMemo(
    () => portfolioPages.find((page) => page.id === selectedPageId),
    [selectedPageId]
  );

  const pageCards = useMemo(() => getPageCards(selectedPage), [selectedPage]);

  const [selectedCardId, setSelectedCardId] = useState(pageCards[0]?.id || "");

  const selectedCard = useMemo(
    () => pageCards.find((card) => card.id === selectedCardId) || pageCards[0],
    [pageCards, selectedCardId]
  );

  const [cardImageKey, setCardImageKey] = useState(
    selectedCard?.imageKey || ""
  );

  const [detail, setDetail] = useState(() =>
    createEditableDetailFromCard(selectedCard)
  );

  const exportText = useMemo(() => {
    const exportedCardData = {
      imageKey: cardImageKey || undefined,
      detail: cleanDetailForExport(detail)
    };

    return JSON.stringify(exportedCardData, null, 2);
  }, [cardImageKey, detail]);

  function handlePageChange(pageId) {
    const nextPage = portfolioPages.find((page) => page.id === pageId);
    const nextCards = getPageCards(nextPage);
    const nextCard = nextCards[0];

    setSelectedPageId(pageId);
    setSelectedCardId(nextCard?.id || "");
    setCardImageKey(nextCard?.imageKey || "");
    setDetail(createEditableDetailFromCard(nextCard));
  }

  function handleCardChange(cardId) {
    const nextCard = pageCards.find((card) => card.id === cardId);

    setSelectedCardId(cardId);
    setCardImageKey(nextCard?.imageKey || "");
    setDetail(createEditableDetailFromCard(nextCard));
  }

  function addBlock(type) {
    setDetail((currentDetail) => ({
      ...currentDetail,
      blocks: [...currentDetail.blocks, createBlock(type)]
    }));
  }

  function updateBlock(index, nextBlock) {
    setDetail((currentDetail) => ({
      ...currentDetail,
      blocks: currentDetail.blocks.map((block, blockIndex) =>
        blockIndex === index ? nextBlock : block
      )
    }));
  }

  function moveBlock(index, direction) {
    setDetail((currentDetail) => {
      const nextBlocks = [...currentDetail.blocks];
      const nextIndex = index + direction;

      if (nextIndex < 0 || nextIndex >= nextBlocks.length) {
        return currentDetail;
      }

      const [block] = nextBlocks.splice(index, 1);
      nextBlocks.splice(nextIndex, 0, block);

      return {
        ...currentDetail,
        blocks: nextBlocks
      };
    });
  }

  function deleteBlock(index) {
    setDetail((currentDetail) => ({
      ...currentDetail,
      blocks: currentDetail.blocks.filter(
        (_, blockIndex) => blockIndex !== index
      )
    }));
  }

  async function copyExportText() {
    await navigator.clipboard.writeText(exportText);
  }

  return (
    <main className="detail-builder-page">
      <aside className="detail-builder-sidebar">
        <header>
          <p className="builder-eyebrow">Local Tool</p>
          <h1>Detail Page Builder</h1>
          <p>
            Build a detail page with reusable blocks, then copy the generated
            object into the matching card in pageCards.js.
          </p>
        </header>

        <label>
          Main Page
          <select
            value={selectedPageId}
            onChange={(event) => handlePageChange(event.target.value)}
          >
            {portfolioPages.map((page) => (
              <option value={page.id} key={page.id}>
                {page.title}
              </option>
            ))}
          </select>
        </label>

        <label>
          Page Card
          <select
            value={selectedCard?.id || ""}
            onChange={(event) => handleCardChange(event.target.value)}
          >
            {pageCards.map((card) => (
              <option value={card.id} key={card.id}>
                {card.title}
              </option>
            ))}
          </select>
        </label>

        <label>
          Card Image
          <select
            value={cardImageKey}
            onChange={(event) => setCardImageKey(event.target.value)}
          >
            <option value="">No card image</option>

            {detailImageOptions.map((image) => (
              <option value={image.key} key={image.key}>
                {image.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          Eyebrow
          <input
            value={detail.eyebrow}
            onChange={(event) =>
              setDetail((currentDetail) => ({
                ...currentDetail,
                eyebrow: event.target.value
              }))
            }
          />
        </label>

        <label>
          Title
          <input
            value={detail.title}
            onChange={(event) =>
              setDetail((currentDetail) => ({
                ...currentDetail,
                title: event.target.value
              }))
            }
          />
        </label>

        <label>
          Summary
          <textarea
            value={detail.summary}
            onChange={(event) =>
              setDetail((currentDetail) => ({
                ...currentDetail,
                summary: event.target.value
              }))
            }
          />
        </label>

        <section className="builder-add-blocks">
          <h2>Add Block</h2>

          <div>
            {[
                "heading",
                "paragraph",
                "paragraphList",
                "image",
                "imageGrid",
                "twoColumn",
                "callout",
                "list",
                "stats",
                "linkButton",
                "divider"
                ].map((type) => (
              <button type="button" onClick={() => addBlock(type)} key={type}>
                {type}
              </button>
            ))}
          </div>
        </section>

        <section className="builder-image-key-list">
          <h2>Image Keys</h2>

          {detailImageOptions.map((image) => (
            <code key={image.key}>{image.key}</code>
          ))}
        </section>
      </aside>

      <section className="detail-builder-editor">
        <section className="builder-edit-list">
          <h2>Blocks</h2>

          {detail.blocks.map((block, index) => (
            <BlockEditor
              key={block.id}
              block={block}
              onChange={(nextBlock) => updateBlock(index, nextBlock)}
              onMoveUp={() => moveBlock(index, -1)}
              onMoveDown={() => moveBlock(index, 1)}
              onDelete={() => deleteBlock(index)}
            />
          ))}
        </section>

        <section className="builder-preview-panel">
          <div className="builder-preview-card">
            {detail.eyebrow && (
              <p className="page-detail-eyebrow">{detail.eyebrow}</p>
            )}

            {detail.title && <h1>{detail.title}</h1>}

            {detail.summary && (
              <p className="page-detail-summary">{detail.summary}</p>
            )}

            <DetailBlockRenderer blocks={detail.blocks} />
          </div>
        </section>

        <section className="builder-export-panel">
          <header>
            <h2>Export</h2>
            <button type="button" onClick={copyExportText}>
              Copy Detail Object
            </button>
          </header>

          <pre>{exportText}</pre>
        </section>
      </section>
    </main>
  );
}