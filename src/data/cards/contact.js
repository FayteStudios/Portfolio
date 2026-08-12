import { createCard } from "./createCard.js";

export const contactCards = [
  createCard({
    id: "contact-socials",
    title: "Social Links",
    description: "Where to find me.",
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
    id: "contact-comments",
    title: "Get in Touch",
    description: "Say something.",
    imageKey: "profile",
    pageTitle: "Get in Touch",
    detail: {
      eyebrow: "",
      title: "Get in Touch",
      summary: "Questions, thoughts on the work, or an idea you want to talk through.",
      blocks: [
        {
          type: "paragraph",
          text: "Email is the surest way to reach me, and I read everything that arrives. If you've played something of mine and have an opinion about it, I especially want to hear that one."
        },
        {
          type: "linkButton",
          href: "mailto:faytestudios@gmail.com",
          label: "faytestudios@gmail.com"
        }
      ]
    }
  }),

  createCard({
    id: "contact-commissions",
    title: "Commissions",
    description: "Hire the pen.",
    imageKey: "profile",
    pageTitle: "Commissions",
    detail: {
      eyebrow: "",
      title: "Commissions",
      summary: "Character work, creature design, card art, icons and portraits.",
      blocks: [
        {
          type: "paragraph",
          text: "I take commissions in Photoshop and Procreate — character illustrations, creature and monster design, trading card art, profile pictures and server icons. If you have a rough idea and no reference, that's fine; working out what you actually want is part of the job."
        },
        {
          type: "paragraph",
          text: "Send me a note about what you're after, roughly when you need it, and any reference you already have, and I'll come back with a price and a timeline."
        },
        {
          type: "linkButton",
          href: "mailto:faytestudios@gmail.com?subject=Commission%20enquiry",
          label: "Start a commission"
        }
      ]
    }
  })
];
