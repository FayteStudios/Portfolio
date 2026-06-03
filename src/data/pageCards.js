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
  status = "Placeholder",
  detail
}) {
  return {
    id,
    eyebrow,
    title,
    description,
    status,
    image,
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

const pageCardsBySection = {
  about: [
    createCard({
      id: "about-bio",
      title: "Bio",
      description: "The Man.",
      image: sunImage,
      pageTitle: "About",
      detail: {
        eyebrow: "",
        title: "The Man.",
        summary: "",
        blocks: [
          {
            type: "image",
            "imageSize": "portrait",
            srcKey: "profile",
            alt: "Self portrait of Nathanael Paulus.",
            caption: "A self portrait of Nathanael."
          },
          {
            type: "paragraph",
            text: "A true renaissance man, Nathanael has spent his life honing the skills he needs to reach his goal of making engaging, memorable video games. Through his journey, he has taken on many titles: artist, writer, teacher, and programmer. His degrees in Studio Art and Computer Science have taught him what he needs to know to succeed and achieve his dreams."
          },
          {
            type: "paragraph",
            text: "Nathanael grew up in the small town of Santa Maria, CA, where he first fell in love with reading, creating artwork, and video games. Games offered him an escape from the harshness of his childhood, letting him explore worlds unknown. That experience harbored within him a desire to share that feeling with others and let them find a much-needed escape within worlds of his own design."
          },
          {
            type: "paragraph",
            text: "From the young age of 11, Nathanael began writing stories and poetry. What began as a form of self-expression turned into a full-fledged passion later in life as he learned new ways to speak his mind articulately and share ideas otherwise impossible to convey. He still writes novels and poetry, and he has recently begun writing music with a close friend. He currently has one finished novel and two others nearing completion, as well as a collection of poetry."
          },
          {
            type: "paragraph",
            text: "In college, he studied animation under the late Kathleen Quaife, who saw great potential in his artistic skills. He took that praise and fashioned a style all his own, leading to the current pieces you can find elsewhere on this site."
          },
          {
            type: "paragraph",
            text: "Always eager to learn everything he could get his hands on, Nathanael also became a skilled programmer, focusing on C#, Java, and Python. After seven years of working inside the Unity Engine and learning to make his game designs a reality, he developed knowledge most people barely scratch the surface of."
          },
          {
            type: "paragraph",
            text: "He now lives back home in Santa Maria, developing his projects, writing his stories, and dreaming up the next incredible game. His mind is set, and he is ready to take a leap into the next project, forming into the next stepping stone toward his ultimate goal of impacting the gaming industry."
          }
        ]
      }
    }),

    createCard({
      id: "about-resume",
      title: "Resume",
      description: "His Past.",
      image: aceSwordsImage,
      pageTitle: "About"
    }),
    createCard({
      id: "about-socials",
      title: "Social Links",
      description: "His Present.",
      image: knightCupsImage,
      pageTitle: "About"
    }),
    createCard({
      id: "about-recommendations",
      title: "Recommendations",
      description: "His Future.",
      image: queenWandsImage,
      pageTitle: "About"
    })
  ],

  "game-design": [
    createCard({
      id: "gd-beetle-rpg",
      title: "Beetle RPG",
      description: "A simple roleplaying game where you are a beetle.",
      image: queenWandsImage,
      pageTitle: "Game Design"
    }),
    createCard({
      id: "gd-fayte",
      title: "Fayte",
      description: "An oldschool online rpg fashioned after RPGWO.",
      image: pagePentaclesImage,
      pageTitle: "Game Design"
    }),
    createCard({
      id: "gd-aetheric",
      title: "Aetheric",
      description: "A 3D tactical MMO.",
      image: moonImage,
      pageTitle: "Game Design"
    }),
    createCard({
      id: "gd-hearth-and-harvest",
      title: "Hearth and Harvest",
      description: "A farming simulator inspired trading card game.",
      image: sunImage,
      pageTitle: "Game Design"
    }),
    createCard({
      id: "gd-entangled",
      title: "Entangled",
      description: "A dating sim with consequences.",
      image: aceSwordsImage,
      pageTitle: "Game Design"
    }),
    createCard({
      id: "gd-boned",
      title: "Boned",
      description: "A 3D Playstation 2 style platformer.",
      image: knightCupsImage,
      pageTitle: "Game Design"
    })
  ],

  coding: [
    createCard({
      id: "code-rpgwo-tools",
      title: "RPGWO Tools",
      description: "Utilities and tools built around RPGWO servers.",
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
      description: "Creature design and monsters.",
      image: moonImage,
      pageTitle: "Art"
    }),
    createCard({
      id: "art-trading-cards",
      title: "Trading Cards",
      description: "Art for trading card games, featuring anime inspired characters and landscapes.",
      image: queenWandsImage,
      pageTitle: "Art"
    }),
    createCard({
      id: "art-traditional",
      title: "Traditional Art",
      description: "Art with pen, paper, and dreams.",
      image: knightCupsImage,
      pageTitle: "Art"
    }),
    createCard({
      id: "art-nsfw",
      title: "NSFW",
      description: "For something spicier. Must be 18 or older.",
      image: knightCupsImage,
      pageTitle: "Art"
    })
  ],

  writing: [
    createCard({
      id: "writing-hilltops",
      eyebrow: "Writing",
      title: "The Thing about Hilltops",
      description: "A novel exploring mental illness and trying to cheat destiny.",
      image: knightCupsImage,
      pageTitle: "Writing"
    }),
    createCard({
      id: "writing-charon",
      title: "The Son of Charon",
      description: "An urban fantasy story of a forgotten deity.",
      image: moonImage,
      pageTitle: "Writing"
    }),
    createCard({
      id: "writing-dylanisms",
      title: "Dylanisms",
      description: "The story of a man going insane, desperating trying to figure out why.",
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