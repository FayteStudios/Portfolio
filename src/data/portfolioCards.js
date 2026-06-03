@'
export const portfolioCards = [
  {
    id: "game-dev",
    title: "Game Development",
    subtitle: "Unity, systems, prototypes",
    suit: "♠",
    rank: "A",
    angle: -8,
    category: "Discipline",
    summary:
      "Gameplay systems, prototypes, interaction design, inventory mechanics, UI flows, and multiplayer experiments.",
    highlights: [
      "Unity and C# gameplay programming",
      "2D roleplaying and farming-sim systems",
      "Trading card game prototypes",
      "Grid movement, UI inventory, and object interaction"
    ],
    tools: ["Unity", "C#", "Netcode", "Python", "Game Design"],
    links: [
      {
        label: "View Game Projects",
        href: "#"
      }
    ]
  },
  {
    id: "web-dev",
    title: "Web Development",
    subtitle: "React, apps, tools",
    suit: "♥",
    rank: "K",
    angle: 5,
    category: "Discipline",
    summary:
      "Frontend projects, portfolio systems, interactive web applications, and practical tools built for real use.",
    highlights: [
      "React application development",
      "Reusable component systems",
      "Interactive UI/UX prototypes",
      "Portfolio and professional web presence"
    ],
    tools: ["React", "JavaScript", "HTML", "CSS", "Vite"],
    links: [
      {
        label: "View Web Projects",
        href: "#"
      }
    ]
  },
  {
    id: "art-design",
    title: "Art & Design",
    subtitle: "Pop art, visual identity, human form",
    suit: "♦",
    rank: "Q",
    angle: -2,
    category: "Discipline",
    summary:
      "Visual artwork, design direction, stylized illustration, and identity-focused creative presentation.",
    highlights: [
      "Pop-art inspired visual work",
      "Human-form studies",
      "Portfolio-ready image presentation",
      "Creative direction and visual theming"
    ],
    tools: ["Illustration", "Composition", "Color", "Branding"],
    links: [
      {
        label: "View Art Gallery",
        href: "#"
      }
    ]
  },
  {
    id: "writing",
    title: "Writing",
    subtitle: "Narrative, worldbuilding, documentation",
    suit: "♣",
    rank: "J",
    angle: 9,
    category: "Discipline",
    summary:
      "Narrative design, worldbuilding, technical documentation, project writeups, and creative systems thinking.",
    highlights: [
      "Game and character concepts",
      "Worldbuilding and lore structure",
      "Technical explanations",
      "Project case studies"
    ],
    tools: ["Narrative Design", "Documentation", "Editing", "Worldbuilding"],
    links: [
      {
        label: "View Writing Samples",
        href: "#"
      }
    ]
  },
  {
    id: "featured-work",
    title: "Featured Work",
    subtitle: "Best projects and case studies",
    suit: "★",
    rank: "10",
    angle: -11,
    category: "Showcase",
    summary:
      "A curated selection of your strongest work across multiple disciplines, presented as portfolio case studies.",
    highlights: [
      "Polished projects",
      "Screenshots and demos",
      "Problem-solution-result breakdowns",
      "Role, tools, and development process"
    ],
    tools: ["Case Studies", "Demos", "GitHub", "Screenshots"],
    links: [
      {
        label: "View Featured Work",
        href: "#"
      }
    ]
  },
  {
    id: "about-contact",
    title: "About / Contact",
    subtitle: "Resume, links, availability",
    suit: "☼",
    rank: "9",
    angle: 3,
    category: "Professional",
    summary:
      "A compact professional profile with contact links, resume access, social profiles, and current availability.",
    highlights: [
      "Professional summary",
      "Resume download",
      "GitHub and social links",
      "Contact information"
    ],
    tools: ["Resume", "GitHub", "LinkedIn", "Email"],
    links: [
      {
        label: "Contact Me",
        href: "mailto:your-email@example.com"
      }
    ]
  }
];
'@ | Set-Content -Encoding UTF8 src\data\portfolioCards.js