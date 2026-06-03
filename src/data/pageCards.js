import sunImage from "../assets/sun.png";
import aceSwordsImage from "../assets/ace-swords.jpg";
import queenWandsImage from "../assets/queen-wands.jpg";
import moonImage from "../assets/moon.jpg";
import knightCupsImage from "../assets/knight-cups.jpg";
import pagePentaclesImage from "../assets/page-pentacles.jpg";
import rpgwoImage from "../assets/rpgwo.png";

function createDetail({ eyebrow, title, description, pageTitle }) {
  return {
    eyebrow,
    title,
    summary: description,
    paragraphs: [
      `${title} is set up as a longer-form portfolio page inside the ${pageTitle} section.`,
      "This panel is meant for deeper written content, project notes, links, screenshots, process explanations, or anything else that needs more room than a river card.",
      "Replace this placeholder text with final copy when you are ready. The structure is intentionally reusable so most page cards can open this same paragraph-style layout."
    ],
    sections: [
      {
        title: "Page Content",
        items: [
          "Long-form paragraphs",
          "Project details",
          "Process notes",
          "Links or calls to action"
        ]
      }
    ]
  };
}

function createCard({
  id,
  eyebrow,
  title,
  description,
  image,
  pageTitle,
  status = "Placeholder"
}) {
  return {
    id,
    eyebrow,
    title,
    description,
    status,
    image,
    detail: createDetail({
      eyebrow,
      title,
      description,
      pageTitle
    })
  };
}

const pageCardsBySection = {
  about: [
    createCard({
      id: "about-bio",
      title: "Bio",
      description: "A quick look at who I am and what I do.",
      image: sunImage,
      pageTitle: "About"
    }),
    createCard({
      id: "about-resume",
      title: "Resume",
      description: "Experience, skills, and work history.",
      image: aceSwordsImage,
      pageTitle: "About"
    }),
    createCard({
      id: "about-socials",
      title: "Social Links",
      description: "My platforms and public spaces.",
      image: knightCupsImage,
      pageTitle: "About"
    }),
    createCard({
      id: "about-recommendations",
      title: "Recommendations",
      description: "Comments, references, and feedback.",
      image: queenWandsImage,
      pageTitle: "About"
    })
  ],

  "game-design": [
    createCard({
      id: "gd-beetle-rpg",
      title: "Beetle RPG",
      description: "A role-playing game project and systems showcase.",
      image: queenWandsImage,
      pageTitle: "Game Design"
    }),
    createCard({
      id: "gd-fayte",
      title: "Fayte",
      description: "A project space for mechanics and world systems.",
      image: pagePentaclesImage,
      pageTitle: "Game Design"
    }),
    createCard({
      id: "gd-aetheric",
      title: "Aetheric",
      description: "A game concept or prototype section.",
      image: moonImage,
      pageTitle: "Game Design"
    }),
    createCard({
      id: "gd-hearth-and-harvest",
      title: "Hearth and Harvest",
      description: "Farming, community, and simulation design work.",
      image: sunImage,
      pageTitle: "Game Design"
    }),
    createCard({
      id: "gd-entangled",
      title: "Entangled",
      description: "Design notes, mechanics, and project details.",
      image: aceSwordsImage,
      pageTitle: "Game Design"
    }),
    createCard({
      id: "gd-boned",
      title: "Boned",
      description: "A project slot for concept and presentation.",
      image: knightCupsImage,
      pageTitle: "Game Design"
    })
  ],

  coding: [
    createCard({
      id: "code-rpgwo-tools",
      title: "RPGWO Tools",
      description: "Utilities and tools built around RPGWO workflows.",
      image: rpgwoImage,
      pageTitle: "Coding"
    }),
    createCard({
      id: "code-ffxiv-shopping-list",
      title: "FFXIV Shopping List",
      description: "A planner/tool project for Final Fantasy XIV.",
      image: pagePentaclesImage,
      pageTitle: "Coding"
    }),
    createCard({
      id: "code-fayte",
      title: "Fayte",
      description: "Technical work connected to Fayte.",
      image: sunImage,
      pageTitle: "Coding"
    }),
    createCard({
      id: "code-aetheric",
      title: "Aetheric",
      description: "Code systems, experiments, or tools for Aetheric.",
      image: moonImage,
      pageTitle: "Coding"
    }),
    createCard({
      id: "code-entangled",
      title: "Entangled",
      description: "Programming work tied to Entangled.",
      image: knightCupsImage,
      pageTitle: "Coding"
    }),
    createCard({
      id: "code-beetle-rpg",
      title: "Beetle RPG",
      description: "Implementation details, systems, and tooling.",
      image: queenWandsImage,
      pageTitle: "Coding"
    })
  ],

  art: [
    createCard({
      id: "art-nature",
      title: "Nature",
      description: "Nature-focused pieces and studies.",
      image: sunImage,
      pageTitle: "Art"
    }),
    createCard({
      id: "art-monsters",
      title: "Monsters",
      description: "Creature design and monster work.",
      image: moonImage,
      pageTitle: "Art"
    }),
    createCard({
      id: "art-trading-cards",
      title: "Trading Cards",
      description: "Card-style compositions and related work.",
      image: queenWandsImage,
      pageTitle: "Art"
    }),
    createCard({
      id: "art-nsfw",
      title: "NSFW",
      description: "Eventually this can use a blurred card image.",
      image: knightCupsImage,
      pageTitle: "Art"
    })
  ],

  writing: [
    createCard({
      id: "writing-hilltops",
      eyebrow: "Writing",
      title: "The Thing about Hilltops",
      description: "A writing/project card for this piece.",
      image: knightCupsImage,
      pageTitle: "Writing"
    }),
    createCard({
      id: "writing-charon",
      title: "The Son of Charon",
      description: "A writing/project card for this piece.",
      image: moonImage,
      pageTitle: "Writing"
    }),
    createCard({
      id: "writing-dylanisms",
      title: "Dylanisms",
      description: "A writing/project card for this piece.",
      image: sunImage,
      pageTitle: "Writing"
    })
  ],

  contact: [
    createCard({
      id: "contact-email",
      title: "Email Form",
      description: "A direct message or inquiry form.",
      image: pagePentaclesImage,
      pageTitle: "Contact"
    }),
    createCard({
      id: "contact-socials",
      title: "Social Links",
      description: "A central place for all social platforms.",
      image: knightCupsImage,
      pageTitle: "Contact"
    }),
    createCard({
      id: "contact-comments",
      title: "Comment Form",
      description: "A feedback or comment submission form.",
      image: moonImage,
      pageTitle: "Contact"
    }),
    createCard({
      id: "contact-commissions",
      title: "Commissions",
      description: "A form or page for commission inquiries.",
      image: queenWandsImage,
      pageTitle: "Contact"
    })
  ]
};

export function getPageCards(page) {
  if (!page?.id) {
    return [];
  }

  return pageCardsBySection[page.id] ?? [];
}