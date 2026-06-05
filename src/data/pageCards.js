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
        "type": "commendation",
        "quote": "\Mr. Paulus is a positive person that works readily with his colleagues. He is always open to suggestions and regularly works to perfect his craft.",
        "attribution": "Cheryl Foster, Ernest Righetti High School"
        },
        {
        "type": "commendation",
        "quote": "Nathanael stepped in at the last minute and did a stellar job. He took the initiative to review extensive protocols and assured that they were strictly followed. Nathanael was punctual, flexible, and eager to cover wherever he was needed. It was comforting to know that I could depend on him to carry out his duties with little or no supervision.",
        "attribution": "Stacie Wilson, Ernest Righetti High School"
        },
        {
        "type": "commendation",
        "quote": "It always surprised me how calm and diligent Nathanael was when working with our clients. This wasn't an easy job, and without him, our research would have gone nowhere. We are so grateful he was able to create such immersive scenarios for our clients to recover.",
        "attribution": "Kristen Linton, VR Brain Injury Recovery Project"
        },
        {
        "type": "commendation",
        "quote": "The Thing about Hilltops captivated me so quickly. I found myself reading the whole thing in a single weekend, AND I DON'T READ. I can't wait to see the next project he makes.",
        "attribution": "Amazon Review, The Thing about Hilltops"
        },
        {
        "type": "commendation",
        "quote": "The discord icon I commissioned Nathanael to make is perfect. Seriously, I am ecstatic. My husband was saying he might need him to do one too!",
        "attribution": "Private Commission for discord icon"
        },
        {
        "type": "commendation",
        "quote": "Absolutely thrilled to be working with Nathanael on Entangled. I take my role as Luna very seriously, and I can't wait to see what he has in store for the game!",
        "attribution": "Luna's Voice Actor, Entangled"
        },
        ]
      }
    })
  ],

  "game-design": [
    createCard({
      id: "beetlerpg",
      title: "Beetle RPG",
      description: "A roleplaying game about beetles.",
      imageKey: "beetle",
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
      id: "revel",
      title: "Revel",
      description: "A Persona-inspired inventory management rpg.",
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
      imageKey: "barista-luna-confused",
      pageTitle: "About",
      detail: {
        eyebrow: "",
        title: "Entangled",
        summary: "A dating sim with consequences.",
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
      id: "prototype",
      title: "Unity Prototyping",
      description: "Systems lead to dreams.",
      "detail": {
        "eyebrow": "",
        "title": "Unity Prototypes",
        "summary": "Some examples of prototype systems I've worked with while learning Unity. I will keep more recent items at the top.",
        "blocks": [
          {},
          {
            "type": "videoEmbed",
            "title": "Grid Inventory System v1",
            "src": "https://youtu.be/sUXk8WYSHbE",
            "caption": "The first prototype for my game, Revel, which will utilize a grid-tetris style inventory system. Also applicable for Fayte, and any other inventory system related game. The different grids own their own array of items, and they can be referenced for things like passive buffs, ownership, and permissions. Items are stored as scriptables and can be produced rapidly in engine, as well as procedurally in game for more diverse item types and effects."
          },
          {
            "type": "videoEmbed",
            "title": "Networked 3D Combat",
            "src": "https://youtu.be/sQlq9PGP_88",
            "caption": "An exploration into Unity's built in netcode features. Allowing for seamless multiplayer interactions, including combat, transfer for data packets, and seamless integration of interactions, progression, and animations across multiple clients"
          },
          {
            "type": "videoEmbed",
            "title": "Networked Multiplayer Movement",
            "src": "https://youtu.be/d-PwNaxZt8A",
            "caption": "A study in running several clients at once, allowing players to receive realtime updates of the other players involved. This allows for future games I make to have the groundwork for networked play. "
          },
          {
            "type": "videoEmbed",
            "title": "Basic Character Controls",
            "src": "https://youtu.be/XW51kPhIsow",
            "caption": "A core character movement system. Allows for independent camera controls, movement, and animations. The setup allows for network packets to display all movement and animations to all clients in realtime. Also incorporates sounds and other animated elements to add immersion."
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
      imageKey: "emma",
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
      imageKey: "beetle",
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
      description: "Inspired by the world.",
      imageKey: "flower-5",
      pageTitle: "About",
      "detail": {
        "eyebrow": "",
        "title": "Nature",
        "summary": "The world is inspiring.",
        "blocks": [
          {},
          {
            "type": "image",
            "srcKey": "bird-1",
            "imageSize": "natural",
            "alt": "A bird with its mouth open.",
            "caption": ""
          },
          {
            "type": "image",
            "srcKey": "bird-2",
            "imageSize": "small",
            "alt": "Two images of the same bird. One has been colored in.",
            "caption": ""
          },
          {
            "type": "image",
            "srcKey": "bird-3",
            "imageSize": "full",
            "alt": "A line art drawing of a bird.",
            "caption": ""
          },
          {
            "type": "image",
            "srcKey": "bird-4",
            "imageSize": "full",
            "alt": "A bird next to a flower.",
            "caption": ""
          },
          {
            "type": "image",
            "srcKey": "flower-1",
            "imageSize": "small",
            "alt": "A flower.",
            "caption": ""
          },
          {
            "type": "image",
            "srcKey": "flower-2",
            "imageSize": "small",
            "alt": "A flower.",
            "caption": ""
          },
          {
            "type": "image",
            "srcKey": "flower-3",
            "imageSize": "small",
            "alt": "A flower.",
            "caption": ""
          },
          {
            "type": "image",
            "srcKey": "flower-4",
            "imageSize": "small",
            "alt": "A flower.",
            "caption": ""
          },
          {
            "type": "image",
            "srcKey": "flower-5",
            "imageSize": "small",
            "alt": "A flower.",
            "caption": ""
          }
        ]
      }
    }
    ),
    createCard({
      id: "art-3d",
      title: "3D Modeling",
      description: "Digital clay.",
      "imageKey": "shadow-image",
      "detail": {
        "eyebrow": "",
        "title": "Digital Clay",
        "summary": "",
        "blocks": [
          {},
          {
            "type": "videoEmbed",
            "title": "Shadow - Kingdom Hearts",
            "src": "https://youtu.be/y6dFHrv1OCU",
            "caption": "Turn around for a class."
          },
          {
            "type": "videoEmbed",
            "title": "Kingdom Key - Kingdom Hearts",
            "src": "https://youtu.be/zWaXwtykmes",
            "caption": "Turn around for a class."
          },
          {
            "type": "videoEmbed",
            "title": "Abyssal Tide - Kingdom Hearts",
            "src": "https://youtu.be/_af1tojgwGQ",
            "caption": "Turn around for a class"
          },
          {
            "type": "videoEmbed",
            "title": "Bond of Flame - Kingdom Hearts",
            "src": "https://youtu.be/vJ5C7Cg-pjU",
            "caption": "Turn around for a class."
          },
          {
            "type": "image",
            "srcKey": "mouse-3d",
            "imageSize": "small",
            "alt": "Mouse monster",
            "caption": "A mouse monster."
          }
        ]
      }
    }),
    createCard({
      id: "art-monsters",
      title: "Monsters",
      description: "Creature design and monsters.",
      "imageKey": "cow-monster",
      "detail": {
        "eyebrow": "",
        "title": "Here There Be Monsters",
        "summary": "I love to draw what I dream. It makes them feel real.",
        "blocks": [
          {},
          {
            "type": "image",
            "srcKey": "004",
            "imageSize": "full",
            "alt": "",
            "caption": "Mouth"
          },
          {
            "type": "image",
            "srcKey": "armpit",
            "imageSize": "full",
            "alt": "",
            "caption": "Armpit"
          },
          {
            "type": "image",
            "srcKey": "cow-monster",
            "imageSize": "full",
            "alt": "",
            "caption": "Cow"
          },
          {
            "type": "image",
            "srcKey": "dragon",
            "imageSize": "full",
            "alt": "",
            "caption": "Dragon"
          },
          {
            "type": "image",
            "srcKey": "fascinated",
            "imageSize": "full",
            "alt": "",
            "caption": "Fascination"
          },
          {
            "type": "image",
            "srcKey": "holes",
            "imageSize": "full",
            "alt": "",
            "caption": "Holes"
          },
          {
            "type": "image",
            "srcKey": "masked",
            "imageSize": "full",
            "alt": "",
            "caption": "Masked"
          },
          {
            "type": "image",
            "srcKey": "mimic",
            "imageSize": "full",
            "alt": "",
            "caption": "Mimic"
          },
          {
            "type": "image",
            "srcKey": "moth",
            "imageSize": "full",
            "alt": "",
            "caption": "Moth"
          },
          {
            "type": "image",
            "srcKey": "mouse",
            "imageSize": "full",
            "alt": "",
            "caption": "Mouse"
          },
          {
            "type": "image",
            "srcKey": "needle-fly",
            "imageSize": "full",
            "alt": "",
            "caption": "Needle Fly"
          },
          {
            "type": "image",
            "srcKey": "spider",
            "imageSize": "full",
            "alt": "",
            "caption": "Spider"
          },
          {
            "type": "image",
            "srcKey": "trio",
            "imageSize": "full",
            "alt": "",
            "caption": "Trio"
          }
        ]
      }
    }),
    createCard({
      id: "art-trading-cards",
      title: "Trading Cards",
      description: "Art for trading card games, featuring anime inspired characters and landscapes.",
        "imageKey": "suletta",
        "detail": {
          "eyebrow": "",
          "title": "Trading Cards",
          "summary": "An ever growing collection of art for trading card games, mine included.",
          "blocks": [
            {},
            {
              "type": "heading",
              "text": "Gundam TCG Custom Resources"
            },
            {
              "type": "image",
              "srcKey": "resource-1",
              "imageSize": "full",
              "alt": "",
              "caption": ""
            },
            {
              "type": "image",
              "srcKey": "resource-2",
              "imageSize": "full",
              "alt": "",
              "caption": ""
            },
            {
              "type": "image",
              "srcKey": "resource-3",
              "imageSize": "full",
              "alt": "",
              "caption": ""
            },
            {
              "type": "image",
              "srcKey": "resource-4",
              "imageSize": "full",
              "alt": "",
              "caption": ""
            },
            {
              "type": "image",
              "srcKey": "resource-5",
              "imageSize": "full",
              "alt": "",
              "caption": ""
            },
            {
              "type": "image",
              "srcKey": "cougar",
              "imageSize": "full",
              "alt": "",
              "caption": "Future Art"
            },
            {
              "type": "heading",
              "text": "Hearth and Harvest Art Coming soon!"
            }
          ]
        }
      }),
    createCard({
      id: "digital",
      title: "Digital Art",
      description: "Photoshop, Procreate, and Maya.",
      "imageKey": "mitz",
      "detail": {
        "eyebrow": "",
        "title": "Digital Art",
        "summary": "A collection of projects I did for fun using Photoshop and Procreate. Some are recognizable characters, and some are sillier than others. These allowed me to explore various art styles.",
        "blocks": [
          {},
          {
            "type": "image",
            "srcKey": "cat",
            "imageSize": "full",
            "alt": "",
            "caption": ""
          },
          {
            "type": "image",
            "srcKey": "kohaku",
            "imageSize": "full",
            "alt": "",
            "caption": ""
          },
          {
            "type": "image",
            "srcKey": "lady",
            "imageSize": "full",
            "alt": "",
            "caption": ""
          },
          {
            "type": "image",
            "srcKey": "library",
            "imageSize": "full",
            "alt": "",
            "caption": ""
          },
          {
            "type": "image",
            "srcKey": "makima",
            "imageSize": "full",
            "alt": "",
            "caption": ""
          },
          {
            "type": "image",
            "srcKey": "man",
            "imageSize": "full",
            "alt": "",
            "caption": ""
          },
          {
            "type": "image",
            "srcKey": "mitz",
            "imageSize": "full",
            "alt": "",
            "caption": ""
          },
          {
            "type": "image",
            "srcKey": "nami",
            "imageSize": "full",
            "alt": "",
            "caption": ""
          },
          {
            "type": "image",
            "srcKey": "queen",
            "imageSize": "full",
            "alt": "",
            "caption": ""
          },
          {
            "type": "image",
            "srcKey": "tifa",
            "imageSize": "full",
            "alt": "",
            "caption": ""
          },
          {
            "type": "heading",
            "text": "Find more on my other art pages, too!"
          }
        ]
      }
    }),
    createCard({
      id: "art-traditional",
      title: "Traditional Art",
      description: "Art with pen, paper, and dreams.",
      "imageKey": "lean-back",
      "detail": {
        "eyebrow": "",
        "title": "Tradition Art",
        "summary": "The old school way.",
        "blocks": [
          {},
          {
            "type": "heading",
            "text": "Life Drawing Studies"
          },
          {
            "type": "image",
            "srcKey": "lean-back",
            "imageSize": "full",
            "alt": "",
            "caption": ""
          },
          {
            "type": "image",
            "srcKey": "relaxed",
            "imageSize": "full",
            "alt": "",
            "caption": ""
          },
          {
            "type": "image",
            "srcKey": "shy",
            "imageSize": "full",
            "alt": "",
            "caption": ""
          },
          {
            "type": "image",
            "srcKey": "stretch",
            "imageSize": "full",
            "alt": "",
            "caption": ""
          },
          {
            "type": "image",
            "srcKey": "behind",
            "imageSize": "full",
            "alt": "",
            "caption": ""
          },
          {
            "type": "heading",
            "text": "Animations"
          },
          {
            "type": "videoEmbed",
            "title": "The birth of a phoenix.",
            "src": "https://youtu.be/fnnP84vNbs8",
            "caption": ""
          },
          {
            "type": "videoEmbed",
            "title": "Flour Sack",
            "src": "https://youtu.be/Mgq6INiG-rY",
            "caption": ""
          }
        ]
      }
    }),
    createCard({
      id: "art-nsfw",
      title: "NSFW",
      description: "For something spicier. Must be 18 or older.",
      "imageKey": "lighthouse-girl",
      "detail": {
        "eyebrow": "",
        "title": "Spicier. Enter at your own risk.",
        "summary": "An exploration on human anatomy, varying color schemes, and the passionate nature of the human body.",
        "blocks": [
          {},
          {
            "type": "heading",
            "text": "You have been warned. Please do not go further if you dislike nudity and other topics."
          },
          {
            "type": "heading",
            "text": "."
          },
          {
            "type": "heading",
            "text": "."
          },
          {
            "type": "heading",
            "text": "."
          },
          {
            "type": "heading",
            "text": "."
          },
          {
            "type": "heading",
            "text": "."
          },
          {
            "type": "image",
            "srcKey": "dancer",
            "imageSize": "full",
            "alt": "",
            "caption": "Dancer"
          },
          {
            "type": "image",
            "srcKey": "lighthouse-girl",
            "imageSize": "full",
            "alt": "",
            "caption": "Lighthouse"
          },
          {
            "type": "image",
            "srcKey": "mirror",
            "imageSize": "full",
            "alt": "",
            "caption": "Mirror"
          },
          {
            "type": "image",
            "srcKey": "time",
            "imageSize": "full",
            "alt": "",
            "caption": "Time"
          },
          {
            "type": "image",
            "srcKey": "tall",
            "imageSize": "full",
            "alt": "",
            "caption": "Tall"
          },
          {
            "type": "image",
            "srcKey": "embrace",
            "imageSize": "full",
            "alt": "",
            "caption": "Embrace"
          },
          {
            "type": "image",
            "srcKey": "kiss-1",
            "imageSize": "full",
            "alt": "",
            "caption": "Kiss 1"
          },
          {
            "type": "image",
            "srcKey": "kiss-2",
            "imageSize": "full",
            "alt": "",
            "caption": "Kiss 2"
          },
          {
            "type": "image",
            "srcKey": "lovers",
            "imageSize": "full",
            "alt": "",
            "caption": "Lovers"
          },
          {
            "type": "image",
            "srcKey": "mystery",
            "imageSize": "full",
            "alt": "",
            "caption": "Mystery"
          },
          {
            "type": "image",
            "srcKey": "passion",
            "imageSize": "full",
            "alt": "",
            "caption": "Passion"
          },
          {
            "type": "image",
            "srcKey": "oh-no",
            "imageSize": "full",
            "alt": "",
            "caption": "Distress"
          },
          {
            "type": "image",
            "srcKey": "ubele",
            "imageSize": "full",
            "alt": "",
            "caption": "Ubele, on commision"
          }
        ]
      }
    })],

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
      imageKey: "",
      pageTitle: "About",
      detail: {
        eyebrow: "",
        title: "The Man.",
        summary: "",
        blocks: [
          {
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