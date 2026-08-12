import { createCard } from "./createCard.js";

export const artCards = [
  createCard({
    id: "digital",
    title: "Digital Art",
    description: "Photoshop, Procreate, and Maya.",
    imageKey: "mitz",
    pageTitle: "Digital Art",
    detail: {
      eyebrow: "",
      title: "Digital Art",
      summary:
        "Pieces I made for the pleasure of making them. Some are characters you'll recognise, some are jokes that got out of hand, and all of them were an excuse to try on a style and see how it fit.",
      blocks: [
        { type: "image", srcKey: "cat", imageSize: "full", alt: "", caption: "" },
        { type: "image", srcKey: "kohaku", imageSize: "full", alt: "", caption: "" },
        { type: "image", srcKey: "lady", imageSize: "full", alt: "", caption: "" },
        { type: "image", srcKey: "library", imageSize: "full", alt: "", caption: "" },
        { type: "image", srcKey: "makima", imageSize: "full", alt: "", caption: "" },
        { type: "image", srcKey: "man", imageSize: "full", alt: "", caption: "" },
        { type: "image", srcKey: "mitz", imageSize: "full", alt: "", caption: "" },
        { type: "image", srcKey: "nami", imageSize: "full", alt: "", caption: "" },
        { type: "image", srcKey: "queen", imageSize: "full", alt: "", caption: "" },
        { type: "image", srcKey: "tifa", imageSize: "full", alt: "", caption: "" },
        {
          type: "paragraph",
          text: "There's more scattered across the other art pages, too."
        }
      ]
    }
  }),

  createCard({
    id: "art-trading-cards",
    title: "Trading Cards",
    description: "Card art, anime-inspired characters, and landscapes.",
    imageKey: "suletta",
    pageTitle: "Trading Cards",
    detail: {
      eyebrow: "",
      title: "Trading Cards",
      summary:
        "A growing pile of card art. Some of it is for other people's games, and some of it is for mine.",
      blocks: [
        { type: "heading", text: "Gundam TCG custom resources" },
        { type: "image", srcKey: "resource-1", imageSize: "full", alt: "", caption: "" },
        { type: "image", srcKey: "resource-2", imageSize: "full", alt: "", caption: "" },
        { type: "image", srcKey: "resource-3", imageSize: "full", alt: "", caption: "" },
        { type: "image", srcKey: "resource-4", imageSize: "full", alt: "", caption: "" },
        { type: "image", srcKey: "resource-5", imageSize: "full", alt: "", caption: "" },
        { type: "image", srcKey: "cougar", imageSize: "full", alt: "", caption: "" }
      ]
    }
  }),

  createCard({
    id: "art-nature",
    title: "Nature",
    description: "Inspired by the world.",
    imageKey: "flower-5",
    pageTitle: "Nature",
    detail: {
      eyebrow: "",
      title: "Nature",
      summary:
        "Birds and flowers, mostly. The best reference in the world is outside and it costs nothing.",
      blocks: [
        {
          type: "image",
          srcKey: "bird-1",
          imageSize: "natural",
          alt: "A bird with its mouth open.",
          caption: ""
        },
        {
          type: "image",
          srcKey: "bird-2",
          imageSize: "small",
          alt: "Two versions of the same bird, one of them coloured in.",
          caption: ""
        },
        {
          type: "image",
          srcKey: "bird-3",
          imageSize: "full",
          alt: "A line drawing of a bird.",
          caption: ""
        },
        {
          type: "image",
          srcKey: "bird-4",
          imageSize: "full",
          alt: "A bird beside a flower.",
          caption: ""
        },
        { type: "image", srcKey: "flower-1", imageSize: "small", alt: "A flower.", caption: "" },
        { type: "image", srcKey: "flower-2", imageSize: "small", alt: "A flower.", caption: "" },
        { type: "image", srcKey: "flower-3", imageSize: "small", alt: "A flower.", caption: "" },
        { type: "image", srcKey: "flower-4", imageSize: "small", alt: "A flower.", caption: "" },
        { type: "image", srcKey: "flower-5", imageSize: "small", alt: "A flower.", caption: "" }
      ]
    }
  }),

  createCard({
    id: "art-3d",
    title: "3D Modeling",
    description: "Digital clay.",
    imageKey: "shadow-image",
    pageTitle: "3D Modeling",
    detail: {
      eyebrow: "",
      title: "Digital Clay",
      summary:
        "Modelling and turntables, mostly out of Maya and ZBrush. A few of these started as class work and kept going after the grade was in.",
      blocks: [
        {
          type: "videoEmbed",
          title: "Shadow — Kingdom Hearts",
          src: "https://youtu.be/y6dFHrv1OCU",
          caption: "Turntable."
        },
        {
          type: "videoEmbed",
          title: "Kingdom Key — Kingdom Hearts",
          src: "https://youtu.be/zWaXwtykmes",
          caption: "Turntable."
        },
        {
          type: "videoEmbed",
          title: "Abyssal Tide — Kingdom Hearts",
          src: "https://youtu.be/_af1tojgwGQ",
          caption: "Turntable."
        },
        {
          type: "videoEmbed",
          title: "Bond of Flame — Kingdom Hearts",
          src: "https://youtu.be/vJ5C7Cg-pjU",
          caption: "Turntable."
        },
        {
          type: "image",
          srcKey: "mouse-3d",
          imageSize: "small",
          alt: "A mouse monster.",
          caption: "A mouse monster."
        }
      ]
    }
  }),

  createCard({
    id: "art-monsters",
    title: "Monsters",
    description: "Creature design and monsters.",
    imageKey: "cow-monster",
    pageTitle: "Monsters",
    detail: {
      eyebrow: "",
      title: "Here There Be Monsters",
      summary:
        "I draw what I dream. It's the only way to get a proper look at it.",
      blocks: [
        { type: "image", srcKey: "004", imageSize: "full", alt: "", caption: "Mouth" },
        { type: "image", srcKey: "armpit", imageSize: "full", alt: "", caption: "Armpit" },
        { type: "image", srcKey: "cow-monster", imageSize: "full", alt: "", caption: "Cow" },
        { type: "image", srcKey: "dragon", imageSize: "full", alt: "", caption: "Dragon" },
        { type: "image", srcKey: "fascinated", imageSize: "full", alt: "", caption: "Fascination" },
        { type: "image", srcKey: "holes", imageSize: "full", alt: "", caption: "Holes" },
        { type: "image", srcKey: "masked", imageSize: "full", alt: "", caption: "Masked" },
        { type: "image", srcKey: "mimic", imageSize: "full", alt: "", caption: "Mimic" },
        { type: "image", srcKey: "moth", imageSize: "full", alt: "", caption: "Moth" },
        { type: "image", srcKey: "mouse", imageSize: "full", alt: "", caption: "Mouse" },
        { type: "image", srcKey: "needle-fly", imageSize: "full", alt: "", caption: "Needle Fly" },
        { type: "image", srcKey: "spider", imageSize: "full", alt: "", caption: "Spider" },
        { type: "image", srcKey: "trio", imageSize: "full", alt: "", caption: "Trio" }
      ]
    }
  }),

  createCard({
    id: "art-traditional",
    title: "Traditional Art",
    description: "Pen, paper, and dreams.",
    imageKey: "lean-back",
    pageTitle: "Traditional Art",
    detail: {
      eyebrow: "",
      title: "Traditional Art",
      summary: "The old school way.",
      blocks: [
        { type: "heading", text: "Life drawing" },
        { type: "image", srcKey: "lean-back", imageSize: "full", alt: "", caption: "" },
        { type: "image", srcKey: "relaxed", imageSize: "full", alt: "", caption: "" },
        { type: "image", srcKey: "shy", imageSize: "full", alt: "", caption: "" },
        { type: "image", srcKey: "stretch", imageSize: "full", alt: "", caption: "" },
        { type: "image", srcKey: "behind", imageSize: "full", alt: "", caption: "" },
        { type: "heading", text: "Animation" },
        {
          type: "videoEmbed",
          title: "The birth of a phoenix",
          src: "https://youtu.be/fnnP84vNbs8",
          caption: ""
        },
        {
          type: "videoEmbed",
          title: "Flour Sack",
          src: "https://youtu.be/Mgq6INiG-rY",
          caption: ""
        }
      ]
    }
  })
];
