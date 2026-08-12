import { createCard } from "./createCard.js";

export const aboutCards = [
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
          imageSize: "portrait",
          srcKey: "profile",
          alt: "Self portrait of Nathanael Paulus.",
          caption: "A self portrait."
        },
        {
          type: "paragraph",
          text: "Nathanael has spent a long time collecting the skills it takes to make a game by himself: artist, writer, teacher, programmer. The degrees — Studio Art, then Computer Science — were mostly a way of getting good at the two halves of the same job."
        },
        {
          type: "paragraph",
          text: "He grew up in Santa Maria, California, where he fell in love with reading, drawing, and video games in roughly that order. Games were the door out of a hard childhood, and that's the thing he keeps trying to build: somewhere worth going for a while."
        },
        {
          type: "paragraph",
          text: "He started writing at eleven — stories first, then poetry — because it was the only way to say some things out loud. It stuck. He has one finished novel, two more close behind, a collection of poetry, and, lately, songs written with a close friend."
        },
        {
          type: "paragraph",
          text: "In college he studied animation under the late Kathleen Quaife, who took his drawing seriously before he did. What came out of that is the work you'll find elsewhere on this site."
        },
        {
          type: "paragraph",
          text: "The programming came after, and it took. Seven years inside Unity, mostly in C#, with Java and Python alongside it — long enough to stop treating a design document as a wish list and start treating it as a build order."
        },
        {
          type: "paragraph",
          text: "He lives back home in Santa Maria now, making his projects, writing his stories, and thinking about the next game."
        }
      ]
    }
  }),

  createCard({
    id: "resume",
    title: "Resume",
    description: "His Past.",
    imageKey: "",
    pageTitle: "Resume",
    detail: {
      eyebrow: "",
      title: "Game Designer",
      summary: "",
      blocks: [
        { type: "heading", text: "Bachelor of Arts — Studio Art" },
        {
          type: "paragraph",
          text: "Four years designing characters, scenes and worlds, plus two full years in Maya and ZBrush and an Adobe Suite certificate. The animation background is the part I lean on most: it's what taught me that a thing feels alive because of timing, not detail."
        },
        { type: "heading", text: "Master's — Computer Science" },
        {
          type: "paragraph",
          text: "I went back for the other half. App development, data systems and database work, alongside the practical stuff — project management, Agile, and enough version control to work with other people without ruining their week. My final project was the digital client for my card game, Hearth and Harvest."
        },
        { type: "heading", text: "Experience" },
        {
          type: "list",
          title: "Game Designer — Icarus Alpha, June 2026 to present",
          items: [
            "Designing systems for The Come Up",
            "Building the Unity tools that let those designs be tried, changed and tried again",
            "Working across departments to keep the design consistent from one end of the game to the other"
          ]
        },
        {
          type: "list",
          title: "Unity VR Developer — CSUCI Research, September 2022 to May 2023",
          items: [
            "Designed and built VR scenarios to help patients recovering from brain injuries regain motor skills",
            "Worked directly with those patients to iterate on what actually helped",
            "Documented and analysed the results into peer-reviewed papers",
            "Ran seminars showing what the scenarios did and why they worked"
          ]
        },
        {
          type: "list",
          title: "Solo Developer — Fayte Studios",
          items: [
            "Design, documentation and execution across every discipline a game needs",
            "Code architecture, tooling and assets, mostly in Unity and C#",
            "Drawing, modelling and animating for active projects",
            "Recruiting collaborators, building the community, and getting the work in front of people"
          ]
        },
        {
          type: "list",
          title: "What I bring",
          items: [
            "Seven-plus years in Unity, fluent in C#, with Python and React alongside",
            "A stubborn problem solver — I would rather find the root cause than route around it",
            "Deep grounding in game design principles, and the writing to explain a design to someone who has to build it",
            "Comfortable in Agile teams and under real deadlines",
            "Adobe Creative Suite certified, including Photoshop, Premiere and After Effects",
            "Maya and ZBrush for 3D models and animation",
            "A habit of building the tool before building the thing twice by hand",
            "An avid player of roleplaying games, card games and visual novels — and a tester on Hearthstone, Final Fantasy XIV and Albion Online",
            "Organised, dependable, and easy to work beside"
          ]
        }
      ]
    }
  }),

  createCard({
    id: "sociallinks",
    title: "Social Links",
    description: "His Present.",
    imageKey: "",
    pageTitle: "Social Links",
    detail: {
      eyebrow: "",
      title: "Social Links",
      summary: "The best place to find me.",
      blocks: [
        {
          type: "linkButton",
          href: "https://www.linkedin.com/in/nathanael-paulus",
          label: "LinkedIn"
        }
      ]
    }
  }),

  createCard({
    id: "commendations",
    title: "Commendations",
    description: "His Future.",
    imageKey: "",
    pageTitle: "Commendations",
    detail: {
      eyebrow: "",
      title: "Commendations",
      summary: "Things other people have said.",
      blocks: [
        {
          type: "commendation",
          quote:
            "Mr. Paulus is a positive person that works readily with his colleagues. He is always open to suggestions and regularly works to perfect his craft.",
          attribution: "Cheryl Foster, Ernest Righetti High School"
        },
        {
          type: "commendation",
          quote:
            "Nathanael stepped in at the last minute and did a stellar job. He took the initiative to review extensive protocols and assured that they were strictly followed. Nathanael was punctual, flexible, and eager to cover wherever he was needed. It was comforting to know that I could depend on him to carry out his duties with little or no supervision.",
          attribution: "Stacie Wilson, Ernest Righetti High School"
        },
        {
          type: "commendation",
          quote:
            "It always surprised me how calm and diligent Nathanael was when working with our clients. This wasn't an easy job, and without him, our research would have gone nowhere. We are so grateful he was able to create such immersive scenarios for our clients to recover.",
          attribution: "Kristen Linton, VR Brain Injury Recovery Project"
        },
        {
          type: "commendation",
          quote:
            "The Thing about Hilltops captivated me so quickly. I found myself reading the whole thing in a single weekend, AND I DON'T READ. I can't wait to see the next project he makes.",
          attribution: "Amazon review, The Thing about Hilltops"
        },
        {
          type: "commendation",
          quote:
            "The discord icon I commissioned Nathanael to make is perfect. Seriously, I am ecstatic. My husband was saying he might need him to do one too!",
          attribution: "Private commission"
        },
        {
          type: "commendation",
          quote:
            "Absolutely thrilled to be working with Nathanael on Entangled. I take my role as Luna very seriously, and I can't wait to see what he has in store for the game!",
          attribution: "Luna's voice actor, Entangled"
        }
      ]
    }
  })
];
