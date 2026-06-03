import sunImage from "../assets/sun.png";
import aceSwordsImage from "../assets/ace-swords.jpg";
import queenWandsImage from "../assets/queen-wands.jpg";
import moonImage from "../assets/moon.jpg";
import knightCupsImage from "../assets/knight-cups.jpg";
import pagePentaclesImage from "../assets/page-pentacles.jpg";
import rpgwoImage from "../assets/rpgwo.png";

const pageCardsBySection = {
  about: [
    {
      id: "about-bio",
      eyebrow: "About Me",
      title: "Bio",
      description: "A quick look at who I am and what I do.",
      status: "Placeholder",
      image: sunImage
    },
    {
      id: "about-resume",
      eyebrow: "About Me",
      title: "Resume",
      description: "Experience, skills, and work history.",
      status: "Placeholder",
      image: aceSwordsImage
    },
    {
      id: "about-socials",
      eyebrow: "About Me",
      title: "Social Links",
      description: "My platforms and public spaces.",
      status: "Placeholder",
      image: knightCupsImage
    },
    {
      id: "about-recommendations",
      eyebrow: "About Me",
      title: "Recommendations",
      description: "Comments, references, and feedback.",
      status: "Placeholder",
      image: queenWandsImage
    }
  ],

  "game-design": [
    {
      id: "gd-beetle-rpg",
      eyebrow: "Game Design",
      title: "Beetle RPG",
      description: "A role-playing game project and systems showcase.",
      status: "Placeholder",
      image: queenWandsImage
    },
    {
      id: "gd-fayte",
      eyebrow: "Game Design",
      title: "Fayte",
      description: "A project space for mechanics and world systems.",
      status: "Placeholder",
      image: pagePentaclesImage
    },
    {
      id: "gd-aetheric",
      eyebrow: "Game Design",
      title: "Aetheric",
      description: "A game concept or prototype section.",
      status: "Placeholder",
      image: moonImage
    },
    {
      id: "gd-hearth-and-harvest",
      eyebrow: "Game Design",
      title: "Hearth and Harvest",
      description: "Farming, community, and simulation design work.",
      status: "Placeholder",
      image: sunImage
    },
    {
      id: "gd-entangled",
      eyebrow: "Game Design",
      title: "Entangled",
      description: "Design notes, mechanics, and project details.",
      status: "Placeholder",
      image: aceSwordsImage
    },
    {
      id: "gd-boned",
      eyebrow: "Game Design",
      title: "Boned",
      description: "A project slot for concept and presentation.",
      status: "Placeholder",
      image: knightCupsImage
    }
  ],

  coding: [
    {
      id: "code-rpgwo-tools",
      eyebrow: "Coding",
      title: "RPGWO Tools",
      description: "Utilities and tools built around RPGWO workflows.",
      status: "Placeholder",
      image: rpgwoImage
    },
    {
      id: "code-ffxiv-shopping-list",
      eyebrow: "Coding",
      title: "FFXIV Shopping List",
      description: "A planner/tool project for Final Fantasy XIV.",
      status: "Placeholder",
      image: pagePentaclesImage
    },
    {
      id: "code-fayte",
      eyebrow: "Coding",
      title: "Fayte",
      description: "Technical work connected to Fayte.",
      status: "Placeholder",
      image: sunImage
    },
    {
      id: "code-aetheric",
      eyebrow: "Coding",
      title: "Aetheric",
      description: "Code systems, experiments, or tools for Aetheric.",
      status: "Placeholder",
      image: moonImage
    },
    {
      id: "code-entangled",
      eyebrow: "Coding",
      title: "Entangled",
      description: "Programming work tied to Entangled.",
      status: "Placeholder",
      image: knightCupsImage
    },
    {
      id: "code-beetle-rpg",
      eyebrow: "Coding",
      title: "Beetle RPG",
      description: "Implementation details, systems, and tooling.",
      status: "Placeholder",
      image: queenWandsImage
    }
  ],

  art: [
    {
      id: "art-nature",
      eyebrow: "Art",
      title: "Nature",
      description: "Nature-focused pieces and studies.",
      status: "Placeholder",
      image: sunImage
    },
    {
      id: "art-monsters",
      eyebrow: "Art",
      title: "Monsters",
      description: "Creature design and monster work.",
      status: "Placeholder",
      image: moonImage
    },
    {
      id: "art-trading-cards",
      eyebrow: "Art",
      title: "Trading Cards",
      description: "Card-style compositions and related work.",
      status: "Placeholder",
      image: queenWandsImage
    },
    {
      id: "art-nsfw",
      eyebrow: "Art",
      title: "NSFW",
      description: "Eventually this can use a blurred card image.",
      status: "Placeholder",
      image: knightCupsImage
    }
  ],

  writing: [
    {
      id: "writing-hilltops",
      eyebrow: "Writing",
      title: "The Thing about Hilltops",
      description: "A writing/project card for this piece.",
      status: "Placeholder",
      image: knightCupsImage
    },
    {
      id: "writing-charon",
      eyebrow: "Writing",
      title: "The Son of Charon",
      description: "A writing/project card for this piece.",
      status: "Placeholder",
      image: moonImage
    },
    {
      id: "writing-dylanisms",
      eyebrow: "Writing",
      title: "Dylanisms",
      description: "A writing/project card for this piece.",
      status: "Placeholder",
      image: sunImage
    }
  ],

  contact: [
    {
      id: "contact-email",
      eyebrow: "Contact",
      title: "Email Form",
      description: "A direct message or inquiry form.",
      status: "Placeholder",
      image: pagePentaclesImage
    },
    {
      id: "contact-socials",
      eyebrow: "Contact",
      title: "Social Links",
      description: "A central place for all social platforms.",
      status: "Placeholder",
      image: knightCupsImage
    },
    {
      id: "contact-comments",
      eyebrow: "Contact",
      title: "Comment Form",
      description: "A feedback or comment submission form.",
      status: "Placeholder",
      image: moonImage
    },
    {
      id: "contact-commissions",
      eyebrow: "Contact",
      title: "Commissions",
      description: "A form or page for commission inquiries.",
      status: "Placeholder",
      image: queenWandsImage
    }
  ]
};

export function getPageCards(page) {
  if (!page?.id) {
    return [];
  }

  return pageCardsBySection[page.id] ?? [];
}
