import { getDetailImage } from "./detailImageRegistry.js";

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
  imageKey,
  image,
  pageTitle,
  status = "Placeholder",
  detail
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
      imageKey: "profile",
      pageTitle: "About",
      detail: {
        title: "The Man",
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
      id: "resume",
      title: "Resume",
      description: "His Past.",
      imageKey: "profile",
      pageTitle: "About",
      detail: {
        eyebrow: "",
        title: "The Man.",
        summary: "",
        blocks: [
          {
            type: "image",
            srcKey: "profile",
            imageSize: "medium",
            alt: "Self portrait of Nathanael Paulus.",
            caption: "A self portrait of Nathanael."
          }
        ]
      }
    }),
    createCard({
      id: "sociallinks",
      title: "Social Links",
      description: "His Present.",
      imageKey: "profile",
      pageTitle: "About",
      detail: {
        eyebrow: "",
        title: "The Man.",
        summary: "",
        blocks: [
          {
            type: "image",
            srcKey: "profile",
            imageSize: "medium",
            alt: "Self portrait of Nathanael Paulus.",
            caption: "A self portrait of Nathanael."
          }
        ]
      }
    }),
    createCard({
      id: "reccomandations",
      title: "Reccomendations",
      description: "His Future.",
      imageKey: "profile",
      pageTitle: "About",
      detail: {
        eyebrow: "",
        title: "The Man.",
        summary: "",
        blocks: [
          {
            type: "image",
            srcKey: "profile",
            imageSize: "medium",
            alt: "Self portrait of Nathanael Paulus.",
            caption: "A self portrait of Nathanael."
          }
        ]
      }
    })
  ],

  "game-design": [
    createCard({
      id: "beetlerpg",
      title: "Beetle RPG",
      description: "A roleplaying game about beetles.",
      imageKey: "profile",
      pageTitle: "About",
      detail: {
        eyebrow: "",
        title: "The Man.",
        summary: "",
        blocks: [
          {
            type: "image",
            srcKey: "profile",
            imageSize: "medium",
            alt: "Self portrait of Nathanael Paulus.",
            caption: "A self portrait of Nathanael."
          }
        ]
      }
    }),
    createCard({
      id: "fayte",
      title: "Fayte",
      description: "An oldschool online rpg fashioned after RPGWO.",
      imageKey: "profile",
      pageTitle: "About",
      detail: {
        eyebrow: "",
        title: "The Man.",
        summary: "",
        blocks: [
          {
            type: "image",
            srcKey: "profile",
            imageSize: "medium",
            alt: "Self portrait of Nathanael Paulus.",
            caption: "A self portrait of Nathanael."
          }
        ]
      }
    }),
    createCard({
      id: "aetheric",
      title: "Aetheric",
      description: "A 3D tactical MMO.",
      imageKey: "profile",
      pageTitle: "About",
      detail: {
        eyebrow: "",
        title: "The Man.",
        summary: "",
        blocks: [
          {
            type: "image",
            srcKey: "profile",
            imageSize: "medium",
            alt: "Self portrait of Nathanael Paulus.",
            caption: "A self portrait of Nathanael."
          }
        ]
      }
    }),
    createCard({
      id: "entangled",
      title: "Entangled",
      description: "A dating sim with consequences.",
      imageKey: "profile",
      pageTitle: "About",
      detail: {
        eyebrow: "",
        title: "The Man.",
        summary: "",
        blocks: [
          {
            type: "image",
            srcKey: "profile",
            imageSize: "medium",
            alt: "Self portrait of Nathanael Paulus.",
            caption: "A self portrait of Nathanael."
          }
        ]
      }
    }),
    createCard({
      id: "boned",
      title: "Boned",
      description: "A 3D Playstation 2 style platformer.",
      imageKey: "profile",
      pageTitle: "About",
      detail: {
        eyebrow: "",
        title: "The Man.",
        summary: "",
        blocks: [
          {
            type: "image",
            srcKey: "profile",
            imageSize: "medium",
            alt: "Self portrait of Nathanael Paulus.",
            caption: "A self portrait of Nathanael."
          }
        ]
      }
    }),
  ],

  coding: [
    createCard({
      id: "code-rpgwo-tools",
      title: "RPGWO Tools",
      description: "Utilities and tools built around RPGWO servers.",
      imageKey: "profile",
      pageTitle: "About",
      detail: {
        eyebrow: "",
        title: "The Man.",
        summary: "",
        blocks: [
          {
            type: "image",
            srcKey: "profile",
            imageSize: "medium",
            alt: "Self portrait of Nathanael Paulus.",
            caption: "A self portrait of Nathanael."
          }
        ]
      }
    }),
    createCard({
      id: "code-fayte",
      title: "Fayte",
      description: "Technical work connected to Fayte.",
      imageKey: "profile",
      pageTitle: "About",
      detail: {
        eyebrow: "",
        title: "The Man.",
        summary: "",
        blocks: [
          {
            type: "image",
            srcKey: "profile",
            imageSize: "medium",
            alt: "Self portrait of Nathanael Paulus.",
            caption: "A self portrait of Nathanael."
          }
        ]
      }
    }),
    createCard({
      id: "code-entangled",
      title: "Entangled",
      description: "Programming work tied to Entangled.",
      imageKey: "profile",
      pageTitle: "About",
      detail: {
        eyebrow: "",
        title: "The Man.",
        summary: "",
        blocks: [
          {
            type: "image",
            srcKey: "profile",
            imageSize: "medium",
            alt: "Self portrait of Nathanael Paulus.",
            caption: "A self portrait of Nathanael."
          }
        ]
      }
    }),
    createCard({
      id: "code-beetle-rpg",
      title: "Beetle RPG",
      description: "Implementation details, systems, and tooling.",
      imageKey: "profile",
      pageTitle: "About",
      detail: {
        eyebrow: "",
        title: "The Man.",
        summary: "",
        blocks: [
          {
            type: "image",
            srcKey: "profile",
            imageSize: "medium",
            alt: "Self portrait of Nathanael Paulus.",
            caption: "A self portrait of Nathanael."
          }
        ]
      }
    })
  ],

  art: [
    createCard({
      id: "art-nature",
      title: "Nature",
      description: "Nature-focused pieces and studies.",
      imageKey: "profile",
      pageTitle: "About",
      detail: {
        eyebrow: "",
        title: "The Man.",
        summary: "",
        blocks: [
          {
            type: "image",
            srcKey: "profile",
            imageSize: "medium",
            alt: "Self portrait of Nathanael Paulus.",
            caption: "A self portrait of Nathanael."
          }
        ]
      }
    }),
    createCard({
      id: "art-monsters",
      title: "Monsters",
      description: "Creature design and monsters.",
      imageKey: "profile",
      pageTitle: "About",
      detail: {
        eyebrow: "",
        title: "The Man.",
        summary: "",
        blocks: [
          {
            type: "image",
            srcKey: "profile",
            imageSize: "medium",
            alt: "Self portrait of Nathanael Paulus.",
            caption: "A self portrait of Nathanael."
          }
        ]
      }
    }),
    createCard({
      id: "art-trading-cards",
      title: "Trading Cards",
      description: "Art for trading card games, featuring anime inspired characters and landscapes.",
      imageKey: "profile",
      pageTitle: "About",
      detail: {
        eyebrow: "",
        title: "The Man.",
        summary: "",
        blocks: [
          {
            type: "image",
            srcKey: "profile",
            imageSize: "medium",
            alt: "Self portrait of Nathanael Paulus.",
            caption: "A self portrait of Nathanael."
          }
        ]
      }
    }),
    createCard({
      id: "art-traditional",
      title: "Traditional Art",
      description: "Art with pen, paper, and dreams.",
      imageKey: "profile",
      pageTitle: "About",
      detail: {
        eyebrow: "",
        title: "The Man.",
        summary: "",
        blocks: [
          {
            type: "image",
            srcKey: "profile",
            imageSize: "medium",
            alt: "Self portrait of Nathanael Paulus.",
            caption: "A self portrait of Nathanael."
          }
        ]
      }
    }),
    createCard({
      id: "art-nsfw",
      title: "NSFW",
      description: "For something spicier. Must be 18 or older.",
      imageKey: "profile",
      pageTitle: "About",
      detail: {
        eyebrow: "",
        title: "The Man.",
        summary: "",
        blocks: [
          {
            type: "image",
            srcKey: "profile",
            imageSize: "medium",
            alt: "Self portrait of Nathanael Paulus.",
            caption: "A self portrait of Nathanael."
          }
        ]
      }
    })
  ],

  writing: [
    createCard({
      id: "writing-hilltops",
      title: "The Thing about Hilltops",
      description: "A novel exploring mental illness and trying to cheat destiny.",
      imageKey: "profile",
      pageTitle: "About",
      detail: {
        eyebrow: "",
        title: "The Man.",
        summary: "",
        blocks: [
          {
            type: "image",
            srcKey: "profile",
            imageSize: "medium",
            alt: "Self portrait of Nathanael Paulus.",
            caption: "A self portrait of Nathanael."
          }
        ]
      }
    }),
    createCard({
      id: "writing-charon",
      title: "The Son of Charon",
      description: "An urban fantasy story of a forgotten deity.",
      imageKey: "profile",
      pageTitle: "About",
      detail: {
        eyebrow: "",
        title: "The Man.",
        summary: "",
        blocks: [
          {
            type: "image",
            srcKey: "profile",
            imageSize: "medium",
            alt: "Self portrait of Nathanael Paulus.",
            caption: "A self portrait of Nathanael."
          }
        ]
      }
    }),
    createCard({
      id: "writing-dylanisms",
      title: "Dylanisms",
      description: "The story of a man going insane, desperating trying to figure out why.",
      imageKey: "profile",
      pageTitle: "About",
      detail: {
        eyebrow: "",
        title: "The Man.",
        summary: "",
        blocks: [
          {
            type: "image",
            srcKey: "profile",
            imageSize: "medium",
            alt: "Self portrait of Nathanael Paulus.",
            caption: "A self portrait of Nathanael."
          }
        ]
      }
    })
  ],

  contact: [
    createCard({
      id: "contact-socials",
      title: "Social Links",
      description: "A central place for all social platforms.",
      imageKey: "profile",
      pageTitle: "About",
      detail: {
        eyebrow: "",
        title: "The Man.",
        summary: "",
        blocks: [
          {
            type: "image",
            srcKey: "profile",
            imageSize: "medium",
            alt: "Self portrait of Nathanael Paulus.",
            caption: "A self portrait of Nathanael."
          }
        ]
      }
    }),
    createCard({
      id: "contact-comments",
      title: "Comment Form",
      description: "A feedback or comment submission form.",
      imageKey: "profile",
      pageTitle: "About",
      detail: {
        eyebrow: "",
        title: "The Man.",
        summary: "",
        blocks: [
          {
            type: "image",
            srcKey: "profile",
            imageSize: "medium",
            alt: "Self portrait of Nathanael Paulus.",
            caption: "A self portrait of Nathanael."
          }
        ]
      }
    }),
    createCard({
      id: "contact-commissions",
      title: "Commissions",
      description: "A form or page for commission inquiries.",
      imageKey: "profile",
      pageTitle: "About",
      detail: {
        eyebrow: "",
        title: "The Man.",
        summary: "",
        blocks: [
          {
            type: "image",
            srcKey: "profile",
            imageSize: "medium",
            alt: "Self portrait of Nathanael Paulus.",
            caption: "A self portrait of Nathanael."
          }
        ]
      }
    })
  ]
};

export function getPageCards(page) {
  if (!page?.id) {
    return [];
  }

  return pageCardsBySection[page.id] ?? [];
}