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
      "imageKey": "",
      "detail": {
        "eyebrow": "",
        "title": "Game Designer",
        "summary": "",
        "blocks": [
          {
            "type": "heading",
            "text": ""
          },
          {
            "type": "heading",
            "text": "Bachelor of Arts - Studio Art"
          },
          {
            "type": "paragraph",
            "text": "During my undergrad years, I spent a lot of time honing my ability to design characters, scenes, and worlds. With an Adobe Suite Certificate in hand, and 2 full years learning to use Maya and ZBrush, I am confident in my ability to utilize industry standard tools to convey my design ideas and create assets for any project I am a part of. My background in animation also lends to creating dynamic and memorable experiences, bring my creative ideas to life"
          },
          {
            "type": "heading",
            "text": "Masters - Computer Science"
          },
          {
            "type": "paragraph",
            "text": "After graduating with my art degree, I returned to another passion of mine: programming. Projects involving app development, AI designs, and database systems taught me about project management, Agile team workflows, and Github utilization. My final project involved creating a digital client for my trading card game Hearth and Harvest."
          },
          {
            "type": "heading",
            "text": "Experience"
          },
          {
            "type": "list",
            "title": "Game Designer - Icarus Alpha",
            "items": [
              "June 2026 - Present",
              "Designs system for \"The Come Up\"",
              "Develops Unity tools and systems to implement and iterate designs",
              "Collaborates across multiple departments to make designs smooth and consistent"
            ]
          },
          {
            "type": "list",
            "title": "Unity VR Developer - CSUCI Research",
            "items": [
              "September 2022 - May 2023",
              "Designed and implemented virtual reality scenarios to help patients recovering from brain injuries to regain motor skills",
              "Worked closely with compromised individuals to iterate and improve systems through practical application",
              "Documented and analyzed findings, forming cohesive, peer reviews papers",
              "Conducted seminars on the project, showcasing the effectiveness of the scenarios"
            ]
          },
          {
            "type": "list",
            "title": "Solo Developer - Fayte Studios",
            "items": [
              "Designs, documents, and executes tasks across all disciplines",
              "Creates code architectures, develops tools, and produces assets within Unity",
              "Draws, models, and animates assets for active pojects",
              "Recruits talent, builds communities, and promotes work through social media"
            ]
          },
          {
            "type": "list",
            "title": "Relevant Skills and Traits",
            "items": [
              "7+ years working in Unity Game Engine",
              "Fluent in C#, Python, and React",
              "Talented problem solver",
              "Vast knowledge of game design principles",
              "Excellent written and communication skills",
              "Experienced working in Agile team structures and working under strict deadlines",
              "Certified in Adobe's Creative Suite, including Photoshop, Premiere, and After Effects",
              "Educated in using Maya and Zbrush to make 3D models and animations",
              "Skilled in creating technical tools to improve project workflow",
              "Avid gamer, focusing on roleplaying games, card games, and visual novels",
              "Participated in multiple stages of prototyping and testing stages for major titles like Hearthstone, Final Fantasy 14, and Albion Online",
              "Articulate, organized, and dependable",
              "A team player who values comradery, dedication, and cooperation during projects"
            ]
          }
        ]
      }
    }),
    createCard({
      id: "sociallinks",
      title: "Social Links",
      description: "His Present.",
      "imageKey": "",
      "detail": {
        "eyebrow": "",
        "title": "Social Links",
        "summary": "Nathanael is currently working on developing his online presence to increase his reach. For now:",
        "blocks": [
          {
            "type": "heading",
            "text": ""
          },
          {
            "type": "list",
            "title": "",
            "items": [
              "www.linkedin.com/in/nathanael-paulus"
            ]
          }
        ]
      }
    }),
    createCard({
      id: "commendations",
      title: "Commendations",
      description: "His Future.",
      imageKey: "",
      pageTitle: "About",
      "detail": {
        "eyebrow": "",
        "title": "Commends",
        "summary": "",
        "blocks": [
          {      
            "type": "list",
            "title": "",
            "items": [
              "\"Mr. Paulus is a positive person that works readily with his colleagues. He is always open to suggestions and regularly works to perfect his craft.\" ",
              "\"Nathanael stepped in at the last minute  and did a stellar job. He took the initiative to review extensive protocols and assured that they were strictly followed. Nathanael was punctual, flexible, and eager to cover wherever he was needed. It was comforting to know that I could depend on him to carry out his duties with little or no supervision.\"",
              "\"It always surprised me how calm and diligent Nathanael was when working with our clients. This wasn't an easy job, and without him, our research would have gone nowhere. We are so grateful he was able to create such immersive scenarios for our clients to recover.\"",
              "\"The Thing about Hilltops captivated me so quickly. I found myself reading the whole thing in a single weekend, AND I DON'T READ. I can't wait to see the next projects he makes.\"",
            ]
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
      imageKey: "",
      pageTitle: "About",
      detail: {
        eyebrow: "",
        title: "",
        summary: "",
        blocks: [
          {
          }
        ]
      }
    }),
    createCard({
      id: "fayte",
      title: "Fayte",
      description: "An oldschool online rpg fashioned after RPGWO.",
      imageKey: "",
      pageTitle: "About",
      detail: {
        eyebrow: "",
        title: "",
        summary: "",
        blocks: [
          {
          }
        ]
      }
    }),
    createCard({
      id: "aetheric",
      title: "Aetheric",
      description: "A 3D tactical MMO.",
      imageKey: "",
      pageTitle: "About",
      detail: {
        eyebrow: "",
        title: "",
        summary: "",
        blocks: [
          {
          }
        ]
      }
    }),
    createCard({
      id: "entangled",
      title: "Entangled",
      description: "A dating sim with consequences.",
      imageKey: "",
      pageTitle: "About",
      detail: {
        eyebrow: "",
        title: "",
        summary: "",
        blocks: [
          {
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
      imageKey: "rpgwo",
      pageTitle: "About",
      detail: {
        eyebrow: "",
        title: "",
        summary: "",
        blocks: [
          {
          }
        ]
      }
    }),
    createCard({
      id: "code-fayte",
      title: "Fayte",
      description: "Technical work connected to Fayte.",
      imageKey: "",
      pageTitle: "About",
      detail: {
        eyebrow: "",
        title: "",
        summary: "",
        blocks: [
          {
          }
        ]
      }
    }),
    createCard({
      id: "code-entangled",
      title: "Entangled",
      description: "Programming work tied to Entangled.",
      imageKey: "",
      pageTitle: "About",
      detail: {
        eyebrow: "",
        title: "",
        summary: "",
        blocks: [
          {
          }
        ]
      }
    }),
    createCard({
      id: "code-beetle-rpg",
      title: "Beetle RPG",
      description: "Implementation details, systems, and tooling.",
      imageKey: "",
      pageTitle: "About",
      detail: {
        eyebrow: "",
        title: "",
        summary: "",
        blocks: [
          {
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
      imageKey: "",
      pageTitle: "About",
      detail: {
        eyebrow: "",
        title: "T",
        summary: "",
        blocks: [
          {
          }
        ]
      }
    }),
    createCard({
      id: "art-monsters",
      title: "Monsters",
      description: "Creature design and monsters.",
      imageKey: "",
      pageTitle: "About",
      detail: {
        eyebrow: "",
        title: "",
        summary: "",
        blocks: [
          {
          }
        ]
      }
    }),
    createCard({
      id: "art-trading-cards",
      title: "Trading Cards",
      description: "Art for trading card games, featuring anime inspired characters and landscapes.",
      imageKey: "",
      pageTitle: "About",
      detail: {
        eyebrow: "",
        title: "",
        summary: "",
        blocks: [
          {
          }
        ]
      }
    }),
    createCard({
      id: "art-traditional",
      title: "Traditional Art",
      description: "Art with pen, paper, and dreams.",
      imageKey: "",
      pageTitle: "About",
      detail: {
        eyebrow: "",
        title: "",
        summary: "",
        blocks: [
          {
          }
        ]
      }
    }),
    createCard({
      id: "art-nsfw",
      title: "NSFW",
      description: "For something spicier. Must be 18 or older.",
      imageKey: "",
      pageTitle: "About",
      detail: {
        eyebrow: "",
        title: "",
        summary: "",
        blocks: [
          {
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
      imageKey: "",
      pageTitle: "About",
      detail: {
        eyebrow: "",
        title: "",
        summary: "",
        blocks: [
          {
          }
        ]
      }
    }),
    createCard({
      id: "writing-charon",
      title: "The Son of Charon",
      description: "An urban fantasy story of a forgotten deity.",
      imageKey: "",
      pageTitle: "About",
      detail: {
        eyebrow: "",
        title: "",
        summary: "",
        blocks: [
          {
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