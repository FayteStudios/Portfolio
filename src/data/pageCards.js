import { getDetailImage } from "./detailImageRegistry.js";

function createDetail({ eyebrow, title, description}) {
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
  detail,
  ageRestricted = false
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
    ageRestricted,
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
        "quote": "Mr. Paulus is a positive person that works readily with his colleagues. He is always open to suggestions and regularly works to perfect his craft.",
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
      id: "fayte",
      title: "Fayte",
      description: "An oldschool online rpg fashioned after RPGWO.",
      imageKey: "",
      pageTitle: "Fayte",
      detail: {
        eyebrow: "",
        title: "Fayte",
        summary: "An oldschool online rpg.",
        blocks: [
          {
            type: "paragraph",
            text: "FayteWO is not only a game prototype."
          },
          {
            type: "paragraph",
            text: "It is a compact, end-to-end example of game design, distributed-system engineering, content tooling, security work, deployment, and iterative multiplayer development."
          },
          { type: "heading", text: "As a Game Designer" },
          {
            type: "list",
            title: "FayteWO demonstrates the ability to",
            items: [
              "Design interconnected RPG systems",
              "Evaluate and remove mechanics that do not improve play",
              "Create consistent rules shared by players and NPCs",
              "Build progression with exploit resistance",
              "Design secure economies",
              "Structure social systems and guild hierarchies",
              "Create PvP rules around consent and location",
              "Reuse core mechanics for emergent features",
              "Develop content pipelines that support continued expansion",
              "Respond to actual playtest feedback"
            ]
          },
          { type: "divider" },
          {
            type: "paragraph",
            text: "Fayte offers an oldschool uncapped-progression style online rpg experience. Focused on character diversity, social mechanics, and ultimately freedom to play as you want."
          },
          {
            type: "linkButton",
            href: "/FayteLauncher/",
            label: "Download Fayte Launcher"
          },
          {
            type: "list",
            title: "Stat and Skill System",
            items: [
              "8 Attribute Character Progression. Allowing for diverse character build choices from level 1 to level  1000.",
              "Unlimited Skills. Fayte is designed as an engine to be mutated and built upon by others. Open to community made content just as much as admin made content.",
              "Persistent, online, player impacted world. Players can own land, build houses, and shape the world.",
              "Infinitely customizable items, actions, and characters. Have an cool idea for a magic spell? Make one! Want a sword with 6 different damage types? Make it!",
              "Oldschool tile based movement and sprite sheet visuals, with sprites handled as anchored "
            ]
          },
          { type: "divider" },
          { type: "heading", text: "FayteWO v002" },
          {
            type: "paragraph",
            text: "A server-authoritative multiplayer RPG built from the ground up in C# and .NET"
          },
          {
            type: "paragraph",
            text: "FayteWO v002 is a from-scratch, 2D tile-based multiplayer online RPG inspired by the systemic, persistent-world design of games such as RPG World Online and Ultima Online."
          },
          {
            type: "paragraph",
            text: "The project was developed solo as a complete vertical slice of an MMO architecture—not as an engine prototype or isolated gameplay demo."
          },
          {
            type: "list",
            title: "It includes",
            items: [
              "A persistent 1000 × 1000 tile world",
              "Real multiplayer networking",
              "Server-authoritative combat and economy systems",
              "Character, guild, land, and world persistence",
              "Hybrid MonoGame and Avalonia rendering",
              "AI-driven NPCs and companions",
              "Guild economies and player-authored quests",
              "Content-authoring and live administration tools",
              "TLS-secured internet deployment",
              "Automated load testing",
              "A standalone launcher and patching system",
              "Real multiplayer playtesting and production-style bug fixing"
            ]
          },
          {
            type: "paragraph",
            text: "The current project contains more than 2,000 authored content entries, including a verified catalog of 683 item definitions, spread across seven deployable applications and a shared game-rules library."
          },
          {
            type: "paragraph",
            text: "The project was built over an intensive four-week development period, progressing from a tile-system rewrite to a live, internet-accessible game server deployed on a Linux VPS."
          },
          { type: "divider" },
          { type: "heading", text: "Project at a Glance" },
          { type: "heading", text: "Role" },
          {
            type: "paragraph",
            text: "Solo developer and game designer"
          },
          { type: "heading", text: "Development Scope" },
          {
            type: "list",
            items: [
              "Game systems design",
              "World and content architecture",
              "Multiplayer networking",
              "Server development",
              "Client development",
              "UI and interaction design",
              "Persistence engineering",
              "Content-authoring tools",
              "Security auditing",
              "Deployment and live operations",
              "Multiplayer testing"
            ]
          },
          { type: "heading", text: "Technology" },
          {
            type: "list",
            items: [
              "C#",
              ".NET 9",
              "MonoGame",
              "Avalonia 11.2",
              "WinForms",
              "System.Text.Json",
              "YamlDotNet",
              "TCP networking",
              "TLS through SslStream",
              "Linux and systemd",
              "PowerShell deployment automation",
              "AES-256-GCM content packaging"
            ]
          },
          { type: "divider" },
          { type: "heading", text: "Game Design & Systems Design" },
          {
            type: "paragraph",
            text: "FayteWO was designed around a central principle:"
          },
          {
            type: "callout",
            text: "The world should behave according to consistent systems rather than isolated scripted exceptions."
          },
          {
            type: "paragraph",
            text: "Combat, crafting, quests, NPC behavior, guilds, reputation, trading, pets, PvP, crime, and world ownership are implemented as interacting systems that share common rules and data."
          },
          {
            type: "paragraph",
            text: "This allowed later features to reuse existing mechanics rather than creating a separate implementation for every new activity."
          },
          { type: "divider" },
          { type: "heading", text: "Persistent-World Design" },
          {
            type: "paragraph",
            text: "The world is a persistent, tile-based environment built around player activity, ownership, travel, and long-term character progression."
          },
          {
            type: "list",
            title: "The world supports",
            items: [
              "Multiple vertical levels",
              "Buildings and underground spaces",
              "Persistent item placement",
              "Player and guild land ownership",
              "Town and faction reputation",
              "Resource gathering",
              "NPC schedules",
              "Shops with opening hours",
              "Dynamic encounters",
              "Player-created economic activity"
            ]
          },
          {
            type: "paragraph",
            text: "The playable world expanded from 200 × 200 tiles to 1000 × 1000 tiles after the simulation was redesigned around chunk streaming."
          },
          {
            type: "paragraph",
            text: "This was not simply a larger map. The world architecture was changed so inactive regions consume almost no simulation cost, allowing greater scale without requiring every NPC and tile to remain active continuously."
          },
          { type: "divider" },
          { type: "heading", text: "Vertical World Structure" },
          {
            type: "paragraph",
            text: "An early ramp and slope system was implemented, evaluated, and then deliberately removed because it did not feel good to navigate."
          },
          {
            type: "list",
            title: "Vertical transitions instead use explicit structures such as",
            items: ["Stairs", "Ladders", "Traps", "Teleport-style gateways"]
          },
          {
            type: "paragraph",
            text: "This provides clearer movement rules and makes level transitions easier for players to understand."
          },
          {
            type: "paragraph",
            text: "Above-ground structures use a null-tile void system. Empty space is represented through the same impassable behavior already used by the movement system, avoiding unnecessary new tile flags or special movement exceptions."
          },
          {
            type: "paragraph",
            text: "This is an example of prioritizing readable player experience over preserving a technically interesting mechanic."
          },
          { type: "divider" },
          { type: "heading", text: "Combat Design" },
          {
            type: "paragraph",
            text: "Combat combines skill progression, equipment, positioning, line of sight, defensive specialization, and interruptible actions."
          },
          { type: "heading", text: "Accuracy and Evasion" },
          {
            type: "paragraph",
            text: "Hit chance is determined by the gap between attacker and defender skill, with bounded results to prevent guaranteed success or failure."
          },
          {
            type: "list",
            items: [
              "Hit chance is clamped between 20% and 95%",
              "Evasion is clamped between 0% and 50%",
              "Physical and magical attacks use separate defensive skills"
            ]
          },
          {
            type: "paragraph",
            text: "This allows character progression to remain meaningful without making lower-level players completely incapable of interacting with stronger opponents."
          },
          { type: "heading", text: "Damage and Armor" },
          {
            type: "list",
            title: "Damage is calculated from",
            items: [
              "Weapon damage range",
              "Attacker weapon skill",
              "Flat armor reduction",
              "Skill-based percentage mitigation",
              "Damage type",
              "Relevant defensive skill"
            ]
          },
          {
            type: "paragraph",
            text: "Armor therefore provides both predictable mitigation and progression-based scaling."
          },
          {
            type: "paragraph",
            text: "Physical and magical defense remain distinct, allowing equipment and skill choices to create recognizable character builds."
          },
          { type: "heading", text: "Line of Sight" },
          {
            type: "paragraph",
            text: "Ranged attacks are not assumed to require line of sight based on weapon category. Instead, line-of-sight behavior is controlled by an explicit item flag."
          },
          {
            type: "paragraph",
            text: "When required, the server performs a Bresenham line trace through the world and tests each crossed tile for sight-blocking properties."
          },
          {
            type: "paragraph",
            text: "This allows unusual weapons and abilities to opt into or out of line-of-sight requirements without hard-coding category assumptions."
          },
          { type: "heading", text: "Channeled Casting" },
          {
            type: "paragraph",
            text: "The first cast-time implementation was primarily cosmetic: cast duration was included in cooldown timing but did not actually delay action resolution."
          },
          {
            type: "paragraph",
            text: "The system was later rebuilt as a genuine server-controlled channeling state."
          },
          {
            type: "list",
            title: "Casting can now be interrupted by",
            items: ["Movement", "Taking damage", "Other state changes"]
          },
          {
            type: "paragraph",
            text: "Cast progress is broadcast to nearby players, allowing observers to see that an action is being prepared."
          },
          {
            type: "paragraph",
            text: "Cast time can scale from character attributes on a per-action basis. For example, Intelligence may shorten the cast time of a fire spell, but the calculation is bounded so poor attributes do not lengthen it beyond the authored base duration."
          },
          { type: "divider" },
          { type: "heading", text: "Character Progression" },
          {
            type: "list",
            title: "Characters have base attributes and skills that are modified by",
            items: [
              "Earned progression",
              "Equipment",
              "Temporary effects",
              "External buffs",
              "Character-specific caps"
            ]
          },
          {
            type: "paragraph",
            text: "Personal progression and externally granted bonuses are tracked separately."
          },
          {
            type: "paragraph",
            text: "This distinction supports systems that would be difficult to enforce if every bonus were collapsed into one total."
          },
          { type: "heading", text: "Dynamic Equipment Caps" },
          {
            type: "paragraph",
            text: "Equipment can provide caps as well as bonuses."
          },
          {
            type: "paragraph",
            text: "These caps are continuously re-evaluated rather than only checked when equipment is first equipped."
          },
          {
            type: "list",
            title: "This prevents invalid builds from persisting after",
            items: [
              "Equipment changes",
              "Buff expiration",
              "Stat changes",
              "Skill changes",
              "External effects"
            ]
          },
          {
            type: "paragraph",
            text: "A small grace buffer avoids unnecessary oscillation around exact thresholds."
          },
          { type: "heading", text: "Anti-Power-Leveling Buff Scaling" },
          {
            type: "paragraph",
            text: "External buffs are scaled down based on the progression gap between the caster and recipient."
          },
          {
            type: "paragraph",
            text: "This closes a common power-leveling exploit where a high-level character can apply disproportionately strong buffs to a low-level character."
          },
          {
            type: "paragraph",
            text: "PvP buffing also requires consent."
          },
          {
            type: "paragraph",
            text: "This prevents hostile players from deliberately pushing an opponent beyond equipment restrictions and causing part of their build to become unusable."
          },
          { type: "divider" },
          { type: "heading", text: "Unified Action System" },
          {
            type: "paragraph",
            text: "Spells, abilities, crafting, and several NPC behaviors share one generalized action architecture."
          },
          {
            type: "paragraph",
            text: "A crafting recipe is not handled by a separate crafting engine. It is an action definition containing crafting-specific modules."
          },
          {
            type: "paragraph",
            text: "The previous standalone recipe system was removed rather than maintained as a parallel workflow."
          },
          {
            type: "list",
            title: "This provides",
            items: [
              "Shared validation",
              "Shared costs",
              "Shared requirements",
              "Shared rewards",
              "Shared execution rules",
              "Shared networking behavior"
            ]
          },
          {
            type: "list",
            title: "The same action framework can therefore support",
            items: ["Spells", "Combat abilities", "Crafting", "Gathering", "NPC chores", "Special interactions"]
          },
          { type: "heading", text: "Player and NPC Parity" },
          {
            type: "paragraph",
            text: "NPC crafting and task execution use the exact same validated action logic as player crafting."
          },
          {
            type: "paragraph",
            text: "A simpler NPC-only simulation was considered but rejected."
          },
          {
            type: "paragraph",
            text: "Instead, the central execution method was refactored so it could operate with or without a player network session."
          },
          {
            type: "paragraph",
            text: "This means NPCs cannot bypass requirements or produce outcomes using a second, simplified ruleset. It also makes the systems easier to test because both players and NPCs follow one source of truth."
          },
          { type: "divider" },
          { type: "heading", text: "Quest and Dialogue Design" },
          {
            type: "list",
            title: "The quest system supports",
            items: [
              "Kill objectives",
              "Collection objectives",
              "Experience rewards",
              "Item rewards",
              "Skill-experience rewards",
              "Faction reputation rewards",
              "Repeatable quests",
              "Cooldowns",
              "Server-side validation"
            ]
          },
          {
            type: "paragraph",
            text: "Rewards use the same reward-application machinery used throughout the rest of the game."
          },
          {
            type: "paragraph",
            text: "This avoids separate quest-only reward logic and ensures consistent behavior."
          },
          { type: "heading", text: "Branching Dialogue" },
          {
            type: "paragraph",
            text: "Dialogue is structured as a branching tree."
          },
          {
            type: "list",
            title: "Dialogue choices can be gated by reusable requirements such as",
            items: [
              "Character level",
              "Skill level",
              "Attribute level",
              "Inventory contents",
              "Faction reputation",
              "Quest state"
            ]
          },
          {
            type: "paragraph",
            text: "Requirements are evaluated by the server, preventing clients from selecting dialogue outcomes for which the character is not eligible."
          },
          { type: "heading", text: "Synthetic Player-Created Quests" },
          {
            type: "paragraph",
            text: "The guild quest board allows players to create bounty-style quest postings."
          },
          {
            type: "paragraph",
            text: "Instead of building a separate tracking system, each posting registers a synthetic quest definition with the existing quest tracker."
          },
          {
            type: "paragraph",
            text: "The tracker treats player-authored and designer-authored quests identically."
          },
          {
            type: "paragraph",
            text: "As a result, existing kill tracking and reward logic worked without requiring a second quest implementation."
          },
          { type: "divider" },
          { type: "heading", text: "NPC and AI Design" },
          {
            type: "paragraph",
            text: "NPCs and players share the same fundamental character model."
          },
          {
            type: "paragraph",
            text: "An NPC is identified by having a character definition rather than by belonging to an entirely separate class hierarchy."
          },
          {
            type: "list",
            title: "This gives NPCs access to many of the same systems as players",
            items: [
              "Movement",
              "Combat",
              "Inventory",
              "Equipment",
              "Skills",
              "Actions",
              "Crafting",
              "Resources",
              "Status effects"
            ]
          },
          { type: "heading", text: "Aggro and Leashing" },
          {
            type: "paragraph",
            text: "Hostile NPCs independently search for valid targets within their detection range."
          },
          {
            type: "paragraph",
            text: "Once engaged, they pursue the target but remain constrained by a leash system connected to their home location. This prevents enemies from being dragged indefinitely across the map."
          },
          { type: "heading", text: "NPC Schedules" },
          {
            type: "paragraph",
            text: "NPC behavior can vary based on time and schedule."
          },
          {
            type: "list",
            title: "This supports",
            items: [
              "Shop opening hours",
              "Work periods",
              "Patrols",
              "Idle behavior",
              "Movement between locations",
              "Context-specific activities"
            ]
          },
          {
            type: "paragraph",
            text: "NPC simulation is gated by active world chunks, so scheduled behavior in distant regions does not consume continuous server resources."
          },
          { type: "heading", text: "Crime and Guard Behavior" },
          {
            type: "paragraph",
            text: "Criminal actions can mark a character as wanted."
          },
          {
            type: "list",
            title: "Examples include",
            items: ["Pickpocketing", "Attacking a guard", "Attacking a protected NPC"]
          },
          {
            type: "paragraph",
            text: "Guards do not need a central crime event to assign targets manually."
          },
          {
            type: "paragraph",
            text: "Each guard performs its own detection scan and recognizes wanted characters through shared character state."
          },
          {
            type: "paragraph",
            text: "This keeps the crime system decentralized while still producing consistent guard behavior."
          },
          { type: "divider" },
          { type: "heading", text: "Stealth Design" },
          {
            type: "paragraph",
            text: "Stealth is not represented by a universal hidden flag."
          },
          {
            type: "list",
            title: "Visibility is calculated separately for each observer based on the difference between",
            items: ["The hidden character's stealth", "The observer's perception"]
          },
          {
            type: "paragraph",
            text: "This means one character may detect a target that another character cannot."
          },
          {
            type: "list",
            title: "The same detection function is reused for",
            items: [
              "Player awareness",
              "NPC aggression",
              "Combat targeting",
              "Pickpocketing",
              "Guard detection"
            ]
          },
          {
            type: "paragraph",
            text: "This creates one consistent stealth model rather than several slightly different checks."
          },
          { type: "divider" },
          { type: "heading", text: "Economy and Trading" },
          {
            type: "paragraph",
            text: "The economy is designed around secure server-side movement of items and currency."
          },
          { type: "heading", text: "NPC Shops" },
          {
            type: "list",
            title: "NPC shops support",
            items: [
              "Restockable inventory",
              "Item-specific stock",
              "Purchase and sale pricing",
              "Dialogue-based access",
              "Character-influenced prices",
              "Item familiarity bonuses"
            ]
          },
          {
            type: "list",
            title: "Pricing incorporates differences in",
            items: ["Charisma", "Linguistics", "Item familiarity"]
          },
          {
            type: "paragraph",
            text: "Shops use a hidden till abstraction rather than storing their currency as a physical, stealable item."
          },
          {
            type: "paragraph",
            text: "This prevents a shop's financial state from accidentally becoming ordinary loot."
          },
          { type: "heading", text: "Player Trading" },
          {
            type: "paragraph",
            text: "Player-to-player trading uses a staged, two-sided offer interface."
          },
          {
            type: "paragraph",
            text: "Items are not immediately transferred into a temporary container. Instead, they are reserved server-side until both players confirm."
          },
          {
            type: "paragraph",
            text: "Nothing changes ownership until the trade executes successfully."
          },
          {
            type: "list",
            title: "This architecture avoids an entire category of problems involving",
            items: ["Declined trades", "Disconnections", "Window closure", "Item restoration", "Partial transfers"]
          },
          {
            type: "paragraph",
            text: "The safer behavior comes from the structure of the system rather than from a growing list of recovery cases."
          },
          { type: "divider" },
          { type: "heading", text: "Guild Design" },
          {
            type: "list",
            title: "Guilds include",
            items: [
              "Five rank tiers",
              "Shared banks",
              "Guild progression",
              "Unlockable bank tabs",
              "Guild land ownership",
              "Guild events",
              "Player-authored quest boards"
            ]
          },
          { type: "heading", text: "Rank Permissions" },
          {
            type: "paragraph",
            text: "Promotion follows a monotonic hierarchy."
          },
          {
            type: "paragraph",
            text: "A player can only promote another member to a rank below their own authority level."
          },
          {
            type: "paragraph",
            text: "This makes unauthorized rank inflation structurally impossible rather than relying on scattered runtime checks."
          },
          { type: "heading", text: "Quest Reward Escrow" },
          {
            type: "paragraph",
            text: "Rewards for player-created quests are placed into escrow before the posting becomes active."
          },
          {
            type: "list",
            title: "The rewards are pulled from",
            items: ["A guild bank", "A personal inventory"]
          },
          {
            type: "paragraph",
            text: "This ensures that a posted quest cannot promise a reward that does not exist."
          },
          {
            type: "paragraph",
            text: "The same quest-board system can operate in both guild and personal contexts."
          },
          { type: "divider" },
          { type: "heading", text: "Reputation Design" },
          {
            type: "list",
            title: "The game tracks four separate reputation categories",
            items: ["Global reputation", "Town reputation", "Guild reputation", "Faction reputation"]
          },
          {
            type: "paragraph",
            text: "These tracks can influence different interactions without collapsing every social consequence into a single morality score."
          },
          {
            type: "paragraph",
            text: "Faction reputation decreases when the player kills a member of that faction, turning faction identity into a meaningful gameplay relationship rather than a display-only statistic."
          },
          { type: "divider" },
          { type: "heading", text: "PvP and Death" },
          {
            type: "list",
            title: "PvP eligibility is resolved through three layers",
            items: [
              "1. Global server setting",
              "2. Zone-specific override",
              "3. Mutual player opt-in in open-world areas"
            ]
          },
          {
            type: "paragraph",
            text: "This allows structured PvP regions while preserving consensual interaction elsewhere."
          },
          {
            type: "paragraph",
            text: "A permanent or severe death penalty inspired by older RPGWO systems was deliberately rejected."
          },
          {
            type: "list",
            title: "Death instead results in",
            items: ["Full resource restoration", "Respawn at the character's bind location"]
          },
          {
            type: "paragraph",
            text: "The goal is to preserve danger and interruption without imposing a loss severe enough to discourage experimentation or continued play."
          },
          { type: "divider" },
          { type: "heading", text: "Companion and Pet Design" },
          {
            type: "list",
            title: "Companions can be acquired through three distinct paths",
            items: ["Dialogue-based contracts", "In-combat taming", "Summoning directly from a definition"]
          },
          {
            type: "list",
            title: "They support",
            items: [
              "Summoning",
              "Dismissal",
              "Persistent progression",
              "Equipment",
              "Inventory",
              "Stat-point allocation",
              "Recoverable downed states"
            ]
          },
          {
            type: "paragraph",
            text: "Companions do not disappear permanently when defeated."
          },
          {
            type: "paragraph",
            text: "They enter a recoverable state instead, preserving the player's investment."
          },
          { type: "heading", text: "Acting Character Abstraction" },
          {
            type: "paragraph",
            text: "Several pet and companion features were built using the same acting-character resolution pattern used for the player."
          },
          {
            type: "list",
            title: "This abstraction enabled",
            items: [
              "Pet inventory management",
              "Pet equipment",
              "Pet stat allocation",
              "Pet actions",
              "Pet interaction windows"
            ]
          },
          {
            type: "paragraph",
            text: "Five separate features were implemented through one reusable concept rather than writing companion-specific variants of every system."
          },
          { type: "divider" },
          { type: "heading", text: "Scheduled Events and Sieges" },
          {
            type: "list",
            title: "The game includes a general event framework supporting",
            items: [
              "Personal reminders",
              "Guild events",
              "Server-wide events",
              "Push notifications",
              "Accept or decline responses"
            ]
          },
          {
            type: "paragraph",
            text: "Events run through their own server tick loop."
          },
          { type: "heading", text: "Siege Encounter" },
          {
            type: "paragraph",
            text: "The siege system is a complete wave-based event."
          },
          {
            type: "list",
            title: "It includes",
            items: [
              "Dynamic participant rosters",
              "Temporary alliances",
              "Repeated enemy waves",
              "Player-level-based scaling",
              "Per-wave monster selection",
              "Boss encounters",
              "Damage-weighted rewards"
            ]
          },
          {
            type: "paragraph",
            text: "The existing party system was intentionally not reused."
          },
          {
            type: "paragraph",
            text: "Parties had leader semantics and member limits that did not fit a leaderless, temporary event group of twenty or more players."
          },
          {
            type: "paragraph",
            text: "The siege therefore uses a purpose-built roster suited to the design."
          },
          {
            type: "paragraph",
            text: "Boss reward contribution must be captured at the exact moment of death because the temporary damage ledger does not survive beyond that event."
          },
          { type: "divider" },
          { type: "heading", text: "Loot Ownership" },
          {
            type: "paragraph",
            text: "Dropped items use damage-weighted ownership."
          },
          {
            type: "paragraph",
            text: "Ownership is rolled independently for each item rather than once for the entire enemy. This means players who contributed more damage have better odds of receiving valuable drops, while other participants can still receive part of the loot."
          },
          {
            type: "list",
            title: "Claims expire based on",
            items: ["Time", "The claimant's distance from the item"]
          },
          {
            type: "paragraph",
            text: "This prevents abandoned ownership from blocking the world indefinitely."
          },
          { type: "divider" },
          { type: "heading", text: "Player Creativity and World Decoration" },
          {
            type: "paragraph",
            text: "Players can compose small material sprites—such as flowers or vines—onto compatible items and terrain."
          },
          {
            type: "paragraph",
            text: "This feature is gated through an existing character skill and includes a small placement interface inside the editor. It extends the world beyond combat and progression by giving players limited tools for visual authorship and personalization."
          }
        ]
      }
    }),
    createCard({
      id: "revel",
      title: "Revel",
      description: "A Persona-inspired inventory management rpg.",
      "detail": {
        "eyebrow": "",
        "title": "Revel",
        "summary": "A Persona-Inspired story driven role layer game featuring turn based combat, deep characters, and a tetris style inventory system.",
        "blocks": [
          {},
          {
            "type": "heading",
            "text": "Pitch"
          },
          {
            "type": "paragraph",
            "text": "Revel is a story driven roleplaying game where the player takes on the role of a soulless peon of the God of Fate who tells you to live \"free of destiny,\" The player explores a world as a bounty hunter, recruiting other lively characters to help fight monsters and pursue a way to destroy the \"Dark God of Tyranny\" by gathering sacred pages of a magical book."
          },
          {
            "type": "heading",
            "text": "Inspiration"
          },
          {
            "type": "paragraph",
            "text": "Revel is inspired by Persona 3, 4 and 5. The persona series follows a group of teenagers who have been granted special powers to fight along side summoned monsters. Through a deep story driven set of questlines, the player grows to know and understand a wide variety of characters and the depths of human emotion. The systems rely heavily on tarot card related symbolism as well as referencing a lot of Carl Jung's philosophical approaches toward the human psyche and its place in the universe. Combat is turn based, aka JRPG, and it takes place in a space outside of the public's eye, typically in some kind of secret world. Each game ends with an ultimate being of some kind needing to be defeated to save humanity."
          },
          {
            "type": "list",
            "title": "Planned Take Aways From Persona",
            "items": [
              "Turn Based, JRPG style combat",
              "Deep NPC Storylines",
              "Strength/Weaknesses mechanics",
              "A Confidant-adjacent NPC quest system",
              "Time Management",
              "Mini-games"
            ]
          },
          {
            "type": "paragraph",
            "text": "Revel also takes inspiration from the indie title Backpack Hero. Backpack Hero is a roguelike game where the player explores procedurally generated dungeons with monsters, events, treasure, and more. Through the use of a magical backpack, items of all shapes and sizes can be stored and used in an instance turn based combat system. Items can be moved outside of combat, and many items rely on placement and adjacency to other items to give unique and interesting effects. Space is limited, though, so the player must choose what to keep or toss. Item placement, size, shape of the backpack (yes, there are different backpack shapes), and item synergies make for some wacky combinations. This makes each run feel novel and compelling. There are a variety of playable characters, each with their own set of specialty items, backpack shapes, and mechanics. "
          },
          {
            "type": "list",
            "title": "Take Aways From Backpack Hero",
            "items": [
              "Inventory System",
              "Limited Space for Items",
              "Abilities are limited to items in bag",
              "Turn based combat reliant on bag space",
              "Item synergies",
              "Variety of character styles"
            ]
          },
          {
            "type": "heading",
            "text": "Player Experience"
          },
          {
            "type": "paragraph",
            "text": "Turn Based Combat: Fight enemies as a group of up to 4 characters. Utilize items in your inventory to deal damage, heal, buff, or debuff characters. Each character takes turns (depending on stats) until one party is defeated."
          },
          {
            "type": "paragraph",
            "text": "Attributes: All characters have 5 primary attribute stats that affect combat, social interactions, and other meaningful stats. "
          },
          {
            "type": "list",
            "title": "Attribute Effects",
            "items": [
              "Strength affects physical damage, inventory space, equipment unlocks and proficiency modifiers. Swords and Scythes scale based on strength.",
              "Agility dictates the character's place in the turn order. It also affects a character's hit chance and dodge chance in combat. Agility can be buffed and debuffed and is affected by equipment modifiers. Bows scale their damage and energy costs based off agility.",
              "Vitality determines the character's hit points and physical defenses. It unlocks effects for various armors and shields. It can be buffed and debuffed, and it is affected by equipment modifiers. Outside of combat, it also can reduce the amount of time certain tasks take up in order to be completed.",
              "Intelligence handles magical damage. Any magic requires runes to use, and the higher the intelligent, the more runes can be used to cast spells. The more runes a spell requires, the stronger the spell's effect will be. Some spells even change effects based on the caster's intelligence. It can be buffed and debuffed. Staves scale their damage based off intelligence.",
              "Wisdom dictates a character's mana pool and magical defense. Mana is used to act in combat, with some actions require a lot more mana than others. Staves and armors unlock new effects based on wisdom level. It can be buffed and debuffed, and it is affected by equipment modifiers. Buff and debuff durations are impacted by wisdom. "
            ]
          },
          {
            "type": "heading",
            "text": "Progression"
          },
          {
            "type": "paragraph",
            "text": "Characters gain experience points when participating in combat. By defeating enemies, buffing allies, and other combat actions, that character can progress toward leveling up. When a character levels up, they are rewarded with points that can be used to increase an attribute. Some characters gain predetermined points upon leveling as well. The player gains 2 points instead of the usual 1 other characters get."
          },
          {
            "type": "heading",
            "text": "Resources"
          },
          {
            "type": "paragraph",
            "text": "Revel requires utilizing a couple resource systems to play the game. Some are involved in combat. Some only exist outside of combat. But they are all important to keep track of to maximize options."
          },
          {
            "type": "list",
            "title": "Resources",
            "items": [
              "Energy and Mana are the two primary resources when in combat. Each character begins their turn with a designated about of energy, and in the case of mages, an amount of mana determined by their mana regeneration. Actions of all kinds typically require one or both of these resources to be executed.",
              "Money, if you can believe it, is vital to maintaining a smooth playthrough. Items, character storylines, and other important out of combat activities require money. It can be gained from completing missions, meeting relationship thresholds, slaying monsters, and performing tasks like working the fields or gambling.",
              "Runes are used to cast a number of special abilities and spells. They are acquired through crafting, quests, and shops. Some \"runes\" appear as ordinary items. Runes take up space in your inventory, so it is vital to manage that space as part of your arsenal.",
              "Inventory slots are a crucial part of the identity of the game. While most JRPGs allow for an infinite number of gear, item, and skill options, Revel only allows for actions stored within your inventory. This includes weapons, spells, and item, as well as other special cases. If the items in your bag do not allow you to perform the action, you cannot perform it. Make sure to bring a weapon with you or you won't even be able to attack.",
              "Time passes in Revel. Each day has 3 distinct time periods. Most tasks require one or more timeslots to be spent in order to accomplish the task. A quest, for example, may take the morning, it could take a whole day, it could take several days, or a week. Depending on the length of the activity, different provisions and criteria need to be met in under to accomplish the task at hand. Vitality can reduce the time requirements for some tasks."
            ]
          },
          {
            "type": "heading",
            "text": "Tetris Style Inventory"
          },
          {
            "type": "paragraph",
            "text": "One of the primary new systems introduced in Revel is a grid inventory system. Items come in a variety of shapes and sizes, and in order to fit everything you need, you must plan accordingly. Weapons, armor, and runes all require a set amount of space. Some skills and magic need to generate or consume items, so they require that to be managed as well. In addition, any quest items, gifts for npc's, and monster loot must be stored within this grid inventory. So if there is no room for that goblin head, you have to leave it behind. Every character in Revel, NPCs and monsters included, have their own inventory. When looting a corpse, the enemy's inventory will appear on screen, and the player must choose what to take, assuming they have room. This requires planning ahead in order to succeed in combat while also progressing storylines back home."
          },
          {
            "type": "heading",
            "text": "Items"
          },
          {
            "type": "paragraph",
            "text": "Items are a key component in the gameplay loop. Almost every aspect of the game requires the utilization of items and the inventory system. As such, knowing the types of items and their importance is vital to success. "
          },
          {
            "type": "list",
            "title": "Item Types",
            "items": [
              "Weapons allow the character to deal damage. They come with base stats like damage and accuracy, but they can also provide unique skills and effects. Some NPCs may even have special dialogue depending on the weapon the character uses. Each weapon type has its own ranking system which is improved through combat and other tasks and questlines. Damage scales based on a character's proficiency with a weapon. A character can hold multiple weapons assuming they have enough inventory space and energy to use them.",
              "Armor helps defend characters. It can also signal allegiances both in and out of combat. If another character belongs to a faction, they can be tricked into thinking you are a part of that faction which can lead to interesting interactions. There are different types of armor, limiting certain types like chest and leg armor to one of that type per inventory. Armor tends to be bulky, forcing the player to choose wisely which armor they plan to take into battle.",
              "Consumables are any item that is used in or out of combat. This can include potions, food, runes, and other expendable one-use items. Assuming the character has enough inventory space, there is no other limit on the amount of consumables a character can have at one time.",
              "Materials are used in crafting. Revel showcases a variety of different methods for turning loot and resources into usable, and often profitable, items. When on quests, the player may choose to collect items of this type, but be warned that they take up inventory space. Many NPCs desire specific items, so prioritizing materials while out on quests can greatly improve relationships if they make it a priority.",
              "Quest items typically belong to a specific quest or mission. They require inventory space. They can have unique effects or be dead weight depending on their purpose. "
            ]
          },
          {
            "type": "heading",
            "text": "Missions, Activities and Quests"
          },
          {
            "type": "paragraph",
            "text": "Missions, activities, and quests are the primary way the story progresses in Revel. Players take on missions to conquer enemies, collect items, and fulfill wishes for NPCs. Activities include things like crafting, working a job, and spending time with NPCs. When not looking for combat, activities make up the rest of the gameplay. Quests are important, required missions that push the main story along. Some have important time limits and can limit story progression for some characters. They can also end the game for you if you do not take them and their time restrictions serious."
          },
          {
            "type": "heading",
            "text": "Time"
          },
          {
            "type": "paragraph",
            "text": "The game utilizes a standard time system. All missions, activities, quests, and social interactions require a specific amount of time. The game has a 7 day week and 28 day month setup. Each day has a morning, afternoon, and evening slot. The player has full control over which activities they can spend time on. Various choices are locked to specific timeslots or days. Maintaining a solid schedule is important in order to accomplish goals in a timely manner. The main questline requires linear stages of the plot which can lock players out of certain content if not done in a timely manner."
          },
          {
            "type": "heading",
            "text": "Savvy Stats"
          },
          {
            "type": "paragraph",
            "text": "While attributes typically handle the combat side of things, Savvy stats affect activities. NPCs, jobs, and other side content require certain progression in one of these to be unlocked. Characters improve their savvy stats by doing specific activities."
          },
          {
            "type": "list",
            "title": "Savvy",
            "items": [
              "Piety is your connection with the gods. This can be gained through acts of kindness, offering to help the church, prayer, and spending time with Piety aligned characters.",
              "Knowledge is your understanding of the world. It can be improved through a variety of trade skills, spending time with knowledge associated npcs, and solving riddles.",
              "Avarice represents your desire for riches and power. This can be obtained by taking advantage of others, accumulating unneeded wealth, and making choices that only benefit yourself.",
              "Charisma determines your ability to make friends. It can be gained through general character interactions, social activities, and helping others.",
              "Pride shows your desire for fame. Completing extra missions, befriending powerful people, and slaying difficult bosses improve your reputation, and thus inflates your pride."
            ]
          },
          {
            "type": "heading",
            "text": "Activities"
          },
          {
            "type": "paragraph",
            "text": "There are several activities that do not require missions or quests to enjoy. They can range from social interactions, work, and crafting. Activities have timeframes they are accessible for. "
          },
          {
            "type": "list",
            "title": "Activities",
            "items": [
              "Smithing allows for raw materials to be made into weapons and armor. It has its own minigame associated with it. It follows a similar play pattern to card roguelikes.",
              "Alchemy allows for materials to be make into potions, which can be used in and out of combat or given as gifts. This also has its own minigame which mimics a pouring minigame.",
              "Morning Prayer is offered at the church to increase piety and form relations with others. It has a simple plate-up style minigame.",
              "Drinking is a great way to make friends, build up charisma, and improve relationships. It costs money. The minigame is undecided at this time.",
              "Gambling allows the player to make a lot of money or lose it all. Currently, a minigame involves a dice game I created. ",
              "Cooking allows the player to take raw resources and make food out it. Similar to potions, they offer benefits out of combat that can last all day. Food also makes great gifts. The minigame involves a lot of clicking and well timed clicks.",
              "Farming is a great way to make money and gather materials to cook with. It is hard work and often requires a larger time commitment. The minigame is a stripped down, high speed farming simulator where the player plants, waters, and harvests crops in a specific order to meet demands.",
              "Delivery services give the player a way to make money while exploring the town. It offers unique interactions with NPCs and sometimes rewards only found in this activity. The minigame is like it sounds. A delivery game.",
              "Hard Labor can be a variety of tasks depending on the month. It is a huge time commitment, but the cash reward is substantial. The game is a tetris style stacking game."
            ]
          },
          {
            "type": "heading",
            "text": "Associates"
          },
          {
            "type": "paragraph",
            "text": "Similar to Persona's confidant system, Associates are characters the player meets and can spend time with. The main cast all belong to a specific associate archetype. Each Associate type has its own 10 level progression system which is gained through spending time with the character and completed request for them. Some progress faster depending on other factors like attributes, savvy, what day/month it is, story progression, gifts, and the level of other associates. Many of them contradict each other, forcing the player to choose between two options sometimes. I will expand on the details more later. For every level in one associate, its contradicting associate loses a level."
          },
          {
            "type": "list",
            "title": "The Associate Types",
            "items": [
              "Hunger, the peasant girl at the church. A story of someone in dire straights finding her way back to a suitable life. Direct counter to Cultivation.",
              "Cultivation, the farmer who requests help in his fields. He struggles with the loss of his wife and son in a recent attack on the city. Contradicts Hunger.",
              "Retribution, the guard caption who has never seen actual combat and is expected to be a great hero. Contradicts Protection.",
              "Protection, the loyal drunkard who becomes a treasured ally. He joins your party and provides meaningful impact to the main story. Contradicts Retribution.",
              "Heart, the young mage girl who joins the party first. She is a kindhearted person who wants the party to succeed. She also makes a huge impact on the main story. Contradicts Evolution.",
              "Evolution, the crazed alchemist who offers the player forbidden knowledge in exchange for permanent debuffs. Contradicts Heart.",
              "Clarity, the alchemist's wife who sees through her husband's insanity and offers remedies to ailments. Contradicts Pestilence.",
              "Pestilence, a dreadful enemy who arrives later in the story to sow havok. They offer combat support at the cost of other unknown resources. Contradicts Clarity.",
              "Blasphemy, the heretic who claims the world is ending. He has many secrets that can lend a hand in the main quest, but it requires great sacrifice to obtain what he knows. Contradicts Serentity.",
              "Serenity, the humble priest looking for his flock. The church is struggling to harbor support, and he is considering giving up on his faith. Contradicts with Blasphemy.",
              "Guidance, the familiar voice of someone you've forgotten. Found deep in a dungeon, the voice offers help in dangerous situations and can help repair poorly developing relationships. Levels passively throughout the story. Contradicts Betrayal.",
              "Betrayal, the suave rogue who joins the party, offering his special skills in treasure hunting and thievery. He teaches the player sleight of hand and ways to obtain great riches. Contradicts Guidance.",
              "Lust, the mysterious enemy who offers you a place in a grand order of chaos. Alternate ending option that is locked until act 5 and can only be accessed through strict criteria. Does not contradict an associate.",
              "Rage, the wrathful duke who has lost respect among his peers and tries to take it out on his town. Does not contradict as it is a key part of a optional path of the story. "
            ]
          },
          {
            "type": "heading",
            "text": "More to come!"
          },
          {
            "type": "paragraph",
            "text": "I will be updating this periodically! I have more written down, but I feel like this page is becoming too enormous."
          }
        ]
      }
    }),

    createCard({
      id: "entangled",
      title: "Entangled",
      description: "A dating sim with consequences.",
      imageKey: "barista-luna-confused",
      pageTitle: "Entangled",
      detail: {
        eyebrow: "",
        title: "Entangled",
        summary: "A narrative dating-sim prototype built around branching dialogue, persistent session state, time progression, and location-driven storytelling",
        blocks: [
          {
            type: "paragraph",
            text: "Entangled is a Unity-based conversational dating-sim prototype centered on character relationships, branching dialogue, scheduled activities, and progression through a small interconnected town."
          },
          {
            type: "paragraph",
            text: "The prototype established the original gameplay and data structures that informed later experimentation in related projects. Its most substantial technical contributions are found in its dialogue architecture, global flag system, calendar progression, location navigation, and scene-spanning state management."
          },
          {
            type: "paragraph",
            text: "Rather than treating conversations, time, and travel as unrelated features, Entangled connects them through a shared progression model:"
          },
          {
            type: "list",
            items: [
              "Dialogue choices can modify global state",
              "Dialogue exits can advance time",
              "Time and flags can change which locations are available",
              "Scene travel updates the player's current location",
              "Persistent managers preserve state while Unity scenes change",
              "ScriptableObjects allow narrative content and destinations to be authored as data"
            ]
          },
          {
            type: "paragraph",
            text: "The result is a prototype in which narrative progression is driven by the interaction between conversation choices, world state, time, and location."
          },
          { type: "divider" },
          { type: "heading", text: "Conditional, Evolving Conversations" },
          {
            type: "paragraph",
            text: "Dialogue choices can be shown, hidden, or redirected according to stored conditions. This allows a conversation to respond to prior events such as:"
          },
          {
            type: "list",
            items: [
              "Whether the player has met a character",
              "Whether a location has been discovered",
              "Which route the player previously selected",
              "How far a relationship has progressed",
              "Whether a scripted event has occurred",
              "Which stage of the story is currently active"
            ]
          },
          {
            type: "paragraph",
            text: "The system therefore supports conversations that evolve over repeated visits rather than always presenting the same static dialogue tree."
          },
          { type: "heading", text: "Choices That Change the World" },
          {
            type: "paragraph",
            text: "Dialogue is not only presentational. Lines and choices can update global state when they are entered or selected. This supports operations such as:"
          },
          {
            type: "list",
            items: [
              "Setting a Boolean flag",
              "Clearing a Boolean flag",
              "Updating an integer progression value",
              "Unlocking a destination",
              "Recording a prior decision",
              "Marking a narrative event as complete"
            ]
          },
          {
            type: "paragraph",
            text: "By allowing dialogue content to modify shared game state, narrative choices can affect later scenes and interactions without requiring every destination to communicate directly with every other destination."
          },
          { type: "heading", text: "Dialogue Drives the Gameplay Loop" },
          {
            type: "paragraph",
            text: "A dialogue line can trigger an action when the conversation ends. These exit actions connect dialogue to the rest of the game and can perform operations such as:"
          },
          {
            type: "list",
            items: [
              "Traveling to another location",
              "Advancing the calendar",
              "Starting another conversation",
              "Updating global flags",
              "Triggering a scripted event"
            ]
          },
          {
            type: "paragraph",
            text: "This makes dialogue a functional part of the gameplay loop. A conversation can directly cause time to pass, move the player elsewhere, or alter what becomes available next."
          },
          { type: "divider" },
          { type: "heading", text: "Calendar and Time as a Narrative Resource" },
          {
            type: "paragraph",
            text: "Entangled includes a calendar system that tracks hour, day, month, and season. The prototype defines six recognizable periods:"
          },
          {
            type: "list",
            items: ["Early", "Morning", "Afternoon", "Evening", "Night", "Late"]
          },
          {
            type: "paragraph",
            text: "This provides the narrative systems with a shared vocabulary for when events occur."
          },
          {
            type: "paragraph",
            text: "Time can advance in response to gameplay actions, particularly dialogue exit actions, location transitions, scripted events, and activities that consume time. This allows the game to represent time as a narrative resource. A choice is not only about what the player says; it may also determine how much of the day remains available."
          },
          { type: "heading", text: "Time as a Narrative Gate" },
          {
            type: "paragraph",
            text: "Although the prototype does not yet contain a full NPC schedule resolver, its calendar already provides conditions that narrative and location systems can react to. Time can be used to determine:"
          },
          {
            type: "list",
            items: [
              "Whether an activity is available",
              "Whether a destination should be displayed",
              "Which dialogue should be entered",
              "Whether an event can occur",
              "Which story branch should advance",
              "Whether travel should consume part of the day"
            ]
          },
          {
            type: "paragraph",
            text: "This establishes the foundation for a dating-sim structure in which attention and time are limited resources."
          },
          { type: "divider" },
          { type: "heading", text: "A Town of Discrete Destinations" },
          {
            type: "paragraph",
            text: "Entangled organizes its world as a collection of discrete named destinations. Locations include places such as:"
          },
          {
            type: "list",
            items: [
              "Home",
              "The medium's residence",
              "Grocery store",
              "Café",
              "Arcade",
              "Bar",
              "Book-related destinations"
            ]
          },
          { type: "heading", text: "Menu-Driven Overworld" },
          {
            type: "paragraph",
            text: "The overworld is intentionally menu-driven rather than based on direct character movement. Players choose a destination from an interface containing location buttons. This design emphasizes:"
          },
          {
            type: "list",
            items: [
              "Narrative pacing",
              "Intentional destination selection",
              "Fast access to social encounters",
              "Limited daily decision-making",
              "Reduced travel downtime"
            ]
          },
          {
            type: "paragraph",
            text: "The navigation system is therefore structured around choosing what to do next rather than physically traversing a large map."
          },
          { type: "heading", text: "World Discovery Through Story, Not Exploration" },
          {
            type: "paragraph",
            text: "Individual destination buttons can be shown or hidden according to global flags. This allows the world menu to expand as the player learns more about the town. For example, a destination may remain hidden until:"
          },
          {
            type: "list",
            items: [
              "A character mentions it",
              "An introductory event is completed",
              "A relationship reaches a threshold",
              "A story route is selected",
              "A discovery flag is set"
            ]
          },
          {
            type: "paragraph",
            text: "World discovery is represented through narrative progression rather than geographical exploration."
          },
          { type: "divider" },
          { type: "heading", text: "The Core Loop" },
          {
            type: "paragraph",
            text: "The strongest contribution of Entangled is not any one isolated system. It is the way its core systems connect. A dialogue choice can:"
          },
          {
            type: "list",
            items: [
              "Set a global flag",
              "Change an integer value",
              "Advance the current conversation",
              "End the conversation",
              "Advance time",
              "Unlock a destination",
              "Trigger travel to a new scene"
            ]
          },
          {
            type: "paragraph",
            text: "The destination scene can then:"
          },
          {
            type: "list",
            items: [
              "Reconnect its UI to the persistent dialogue manager",
              "Read the updated global state",
              "Present different dialogue",
              "Display newly available locations",
              "React to the new time period"
            ]
          },
          {
            type: "paragraph",
            text: "This creates a reusable narrative loop:"
          },
          {
            type: "callout",
            text: "Enter a location → speak with a character → make a choice → update state → spend time → unlock or travel somewhere new"
          },
          {
            type: "paragraph",
            text: "That loop is central to the project's identity as a conversational dating sim."
          },
          { type: "divider" },
          { type: "heading", text: "Current Prototype Boundaries" },
          {
            type: "paragraph",
            text: "The current Entangled prototype demonstrates:"
          },
          {
            type: "list",
            items: [
              "Branching dialogue",
              "ScriptableObject-authored narrative data",
              "Conditional choice routing",
              "Boolean and integer global flags",
              "Dialogue-controlled state changes",
              "Dialogue exit actions",
              "Calendar progression",
              "Named time periods",
              "Data-defined destinations",
              "Menu-driven location travel",
              "Conditional destination visibility",
              "Scene fade transitions",
              "Persistent scene-spanning state"
            ]
          },
          {
            type: "paragraph",
            text: "The analyzed prototype does not currently demonstrate:"
          },
          {
            type: "list",
            items: [
              "Real-time overworld movement",
              "A complete NPC scheduling and location resolver",
              "Disk-based save and load persistence",
              "Combat",
              "A generalized inventory and item system"
            ]
          },
          {
            type: "paragraph",
            text: "Those systems should not be presented as completed Entangled features."
          }
        ]
      }
    }),
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
  ],

  coding: [
    createCard({
      id: "code-rpgwo-tools",
      title: "RPGWO Tools",
      description: "Utilities and tools built around RPGWO servers.",
      imageKey: "rpgwo",
      pageTitle: "RPGWO Tools",
      detail: {
        eyebrow: "",
        title: "RPGWO_Tools",
        summary: "Modern content creation, procedural world generation, and legacy-system integration for RPG World Online",
        blocks: [
          {
            type: "paragraph",
            text: "RPGWO_Tools is a comprehensive development toolkit built for RPG World Online, a legacy MMO whose original ecosystem lacks modern content-editing software."
          },
          {
            type: "paragraph",
            text: "What began as a Windows desktop utility for editing configuration files and sprite artwork evolved into a broader engineering platform with two independent applications:"
          },
          {
            type: "list",
            items: [
              "A production-ready WPF desktop application",
              "A fully client-side Blazor WebAssembly application"
            ]
          },
          {
            type: "paragraph",
            text: "Together, they provide schema-driven data editing, sprite-sheet management, binary map editing, procedural world generation, legacy package creation, and direct control of a running game server."
          },
          {
            type: "paragraph",
            text: "The project required more than building a user interface around existing APIs. Many of the formats and systems involved had no surviving documentation, no supported integration layer, and no modern development tooling. Major portions of the toolkit were therefore built through binary-format analysis, source inspection, behavioral testing, and independent reimplementation."
          },
          {
            type: "linkButton",
            href: "/RPGWOTools/",
            label: "Open RPGWO Tools"
          },
          { type: "divider" },
          { type: "heading", text: "Project Overview" },
          {
            type: "paragraph",
            text: "RPGWO_Tools allows server owners and content creators to work with the game's real configuration files, artwork, maps, monsters, items, and server processes through a modern visual interface."
          },
          {
            type: "list",
            title: "The toolkit includes",
            items: [
              "A schema-driven editor for the game's core configuration files",
              "Sprite-sheet browsing, composition, packing, and patching tools",
              "A layered tile-map editor backed by the game's actual map formats",
              "Seeded procedural generation for dungeons, towns, wilderness, and world terrain",
              "Browser-based filesystem editing with offline persistence",
              "Legacy binary package generation",
              "Live Windows server-process control and monitoring",
              "Automated browser testing against genuine game data"
            ]
          },
          {
            type: "paragraph",
            text: "A central goal throughout development was format fidelity. RPGWO_Tools does not merely import legacy data into a new format. It edits the original files while preserving unknown fields, comments, formatting, binary records, and unsupported values wherever possible."
          },
          { type: "divider" },
          { type: "heading", text: "Two Applications, One Design Language" },
          {
            type: "paragraph",
            text: "RPGWO_Tools is implemented as two independent .NET 8 applications."
          },
          { type: "heading", text: "RPGWO_Tools Desktop" },
          {
            type: "stats",
            items: [
              { value: "Windows", label: "Platform" },
              { value: "WPF · .NET 8", label: "Framework" }
            ]
          },
          {
            type: "paragraph",
            text: "The desktop application has direct filesystem access and supports functionality that requires native Windows integration, including:"
          },
          {
            type: "list",
            items: [
              "Editing server files directly on disk",
              "Creating timestamped backups",
              "Rebuilding legacy distribution packages",
              "Controlling the running game server through Win32 APIs",
              "Capturing the server's rendered map view through GDI"
            ]
          },
          { type: "heading", text: "RPGWO_Tools Web" },
          {
            type: "stats",
            items: [
              { value: "Modern web browsers", label: "Platform" },
              { value: "Blazor WebAssembly · .NET 8", label: "Framework" }
            ]
          },
          {
            type: "paragraph",
            text: "The browser application runs entirely inside the user's browser tab."
          },
          {
            type: "list",
            title: "There is",
            items: [
              "No backend server",
              "No cloud processing",
              "No account requirement",
              "No upload of game files to an external service"
            ]
          },
          {
            type: "paragraph",
            text: "All parsing, editing, image processing, map generation, and file creation occur locally on the user's machine."
          },
          {
            type: "paragraph",
            text: "The web application can be deployed as a static website while still providing workflows normally associated with a desktop editor."
          },
          { type: "divider" },
          { type: "heading", text: "Deliberate Risk Management" },
          {
            type: "paragraph",
            text: "The desktop and browser applications intentionally do not share a compiled class library."
          },
          {
            type: "paragraph",
            text: "The desktop application was already functional and depended upon by users when development of the web version began. Refactoring it around a new shared project would have introduced unnecessary regression risk."
          },
          {
            type: "paragraph",
            text: "Instead, the web application was developed as an additive, parallel implementation."
          },
          {
            type: "list",
            title: "This decision accepted a controlled amount of duplicated logic in exchange for",
            items: [
              "Protecting the stable desktop application",
              "Allowing the browser architecture to evolve independently",
              "Avoiding a large, disruptive restructuring effort",
              "Keeping deployment and platform concerns isolated"
            ]
          },
          {
            type: "paragraph",
            text: "UI-independent systems such as map formats and procedural generation were designed with no WPF, browser, or filesystem dependencies. As a result, those systems could be copied between both projects without modification and compiled successfully in both runtimes."
          },
          {
            type: "paragraph",
            text: "This provided many of the practical benefits of shared architecture without putting the production desktop application at risk."
          },
          { type: "divider" },
          { type: "heading", text: "Browser Filesystem Architecture" },
          {
            type: "paragraph",
            text: "Porting the toolkit to the browser introduced a fundamental constraint: a browser tab cannot access the filesystem in the same way as a Windows application."
          },
          {
            type: "paragraph",
            text: "To isolate this difference, the web application is built around an IVirtualFileSystem abstraction."
          },
          {
            type: "list",
            title: "Every ported service reads and writes through this interface, including",
            items: [
              "Configuration parsers",
              "Configuration writers",
              "Backup services",
              "Sprite-sheet compositors",
              "Map codecs",
              "Project persistence",
              "Export workflows"
            ]
          },
          {
            type: "paragraph",
            text: "The application can therefore run the same core operations against multiple storage strategies without the editing services knowing which strategy is active."
          },
          { type: "heading", text: "File System Access API Mode" },
          {
            type: "paragraph",
            text: "On supported Chromium browsers such as Chrome and Edge, the user can select a real folder from disk."
          },
          {
            type: "list",
            title: "The application then",
            items: [
              "Reads the folder into an in-memory snapshot",
              "Performs edits against the virtual filesystem",
              "Flushes changed files back to their original disk locations",
              "Creates real timestamped backup files",
              "Persists the directory handle in IndexedDB"
            ]
          },
          {
            type: "paragraph",
            text: "After a page refresh, the user only needs to grant permission to the folder again. This permission prompt is required by browser security rules, but the project and folder context remain available."
          },
          { type: "heading", text: "Upload and Download Mode" },
          {
            type: "paragraph",
            text: "Browsers without the File System Access API use a separate fallback workflow."
          },
          {
            type: "list",
            title: "Users can",
            items: [
              "Upload a project folder",
              "Edit its files through the same application interface",
              "Persist in-progress changes to IndexedDB",
              "Restore the session after a refresh",
              "Export the completed project as a ZIP archive"
            ]
          },
          {
            type: "paragraph",
            text: "Both modes use the same editor services and virtual filesystem contract. Storage behavior changes without requiring separate implementations of the higher-level editing tools."
          },
          { type: "divider" },
          { type: "heading", text: "Schema-Driven Configuration Editing" },
          {
            type: "paragraph",
            text: "RPGWO uses nine primary configuration files covering:"
          },
          {
            type: "list",
            items: [
              "Items",
              "Monsters",
              "Skills",
              "Item-use recipes",
              "Multi-item recipes",
              "Magic and spells",
              "Treasure tables",
              "World settings",
              "Animations"
            ]
          },
          {
            type: "paragraph",
            text: "Rather than building nine separate editors, RPGWO_Tools uses a generic, schema-driven editing system."
          },
          {
            type: "paragraph",
            text: "At the center of the system is a hand-authored field catalog containing approximately 7,500 lines of definitions."
          },
          {
            type: "list",
            title: "The catalog describes",
            items: [
              "Known fields and flags",
              "Data types",
              "Validation behavior",
              "UI grouping",
              "Display labels",
              "Reference relationships",
              "Specialized selection interfaces"
            ]
          },
          {
            type: "list",
            title: "For example, the schema can identify that a field references",
            items: [
              "A sprite",
              "A monster",
              "An item",
              "A skill",
              "Another configuration entry"
            ]
          },
          {
            type: "paragraph",
            text: "The editor generates the appropriate interface automatically."
          },
          {
            type: "paragraph",
            text: "Adding a newly discovered field generally requires updating the schema rather than writing a new form, control, or editor page."
          },
          { type: "heading", text: "Custom Parser and Writer" },
          {
            type: "paragraph",
            text: "Although the configuration files resemble INI files, they are not conventional INI documents."
          },
          {
            type: "paragraph",
            text: "They use a custom block-oriented structure with different entry-boundary conventions depending on the file type."
          },
          {
            type: "paragraph",
            text: "RPGWO_Tools includes a hand-written parser and writer for this dialect."
          },
          {
            type: "paragraph",
            text: "A BlockWriter abstraction normalizes the differences between the file structures, allowing operations such as:"
          },
          {
            type: "callout",
            text: "Set field X on entry Y"
          },
          {
            type: "paragraph",
            text: "to work consistently across all supported configuration files. This layer also supports format-preserving edits rather than reconstructing every document from a normalized object model."
          },
          { type: "divider" },
          { type: "heading", text: "Lossless Format Preservation" },
          {
            type: "paragraph",
            text: "Legacy development tools can easily damage files they only partially understand. RPGWO_Tools takes a preserve-first approach."
          },
          {
            type: "list",
            title: "When a file is loaded and edited",
            items: [
              "Unknown fields are retained",
              "Comments are retained",
              "Existing whitespace is retained",
              "Unmodified binary records are retained",
              "Unsupported values are retained",
              "Only explicitly changed data is rewritten"
            ]
          },
          {
            type: "list",
            title: "This applies to",
            items: [
              "Configuration documents",
              "Sprite-sheet conventions",
              "Binary map files",
              "Legacy package formats"
            ]
          },
          {
            type: "paragraph",
            text: "The preservation behavior was verified through direct file comparisons."
          },
          {
            type: "paragraph",
            text: "An untouched load-and-save cycle was confirmed to produce a byte-identical file. A single-field modification was then compared against the original to verify that only the intended data changed."
          },
          {
            type: "paragraph",
            text: "This establishes a higher reliability standard than simply confirming that the parser can read and write the file without throwing an exception."
          },
          { type: "divider" },
          { type: "heading", text: "Sprite-Sheet Tooling" },
          {
            type: "paragraph",
            text: "RPGWO stores sprites in fixed-grid image sheets."
          },
          {
            type: "list",
            title: "Each sheet contains",
            items: [
              "A 10 × 10 tile grid",
              "32 × 32 pixel cells",
              "100 sequential sprite IDs"
            ]
          },
          {
            type: "list",
            title: "For example",
            items: [
              "Sheet 0 contains sprite IDs 0–99",
              "Sheet 1 contains sprite IDs 100–199",
              "Sheet 2 contains sprite IDs 200–299"
            ]
          },
          {
            type: "list",
            title: "Larger monsters and objects can occupy several contiguous cells, including",
            items: ["1 × 1", "1 × 2", "2 × 2"]
          },
          {
            type: "paragraph",
            text: "The size is determined by metadata in the corresponding item or monster definition."
          },
          { type: "heading", text: "Sprite Editor Capabilities" },
          {
            type: "list",
            title: "The sprite tooling can",
            items: [
              "Browse existing sprite sheets",
              "Extract and preview individual sprites",
              "Compose new sprite sheets",
              "Patch one cell without rebuilding the entire sheet",
              "Pack folders of cropped images into numbered sheets",
              "Support multi-cell sprites",
              "Identify every item or monster referencing a sprite ID"
            ]
          },
          {
            type: "paragraph",
            text: "The reference search uses the same schema as the configuration editor. This avoids maintaining a separate reference index that could become inconsistent with the editor definitions."
          },
          { type: "heading", text: "Cross-Platform Image Processing" },
          {
            type: "paragraph",
            text: "The desktop and browser applications use different rendering technologies while maintaining the same sprite semantics."
          },
          { type: "heading", text: "Desktop" },
          {
            type: "list",
            title: "Image composition is handled through WPF using",
            items: ["DrawingVisual", "RenderTargetBitmap"]
          },
          { type: "heading", text: "Browser and WebAssembly" },
          {
            type: "list",
            title: "Image manipulation is handled through",
            items: [
              "SixLabors.ImageSharp",
              "Pure managed C# processing",
              "No native image-processing dependency"
            ]
          },
          { type: "heading", text: "Live Browser Rendering" },
          {
            type: "paragraph",
            text: "The browser map editor also performs sprite extraction and composition through JavaScript and HTML5 Canvas."
          },
          {
            type: "list",
            title: "This means the same visual rules are implemented across",
            items: ["WPF", "ImageSharp", "Canvas JavaScript"]
          },
          {
            type: "paragraph",
            text: "All three implementations match the game's pixel addressing, cropping, multi-cell sprite layout, and chroma-key transparency behavior."
          },
          {
            type: "paragraph",
            text: "The game's legacy transparency convention—pure white pixels representing transparency—is applied during sprite extraction and cached per sprite rather than modifying the original source artwork."
          },
          { type: "divider" },
          { type: "heading", text: "Integrated Map Editor" },
          {
            type: "paragraph",
            text: "The map editor is the largest and most technically complex component of RPGWO_Tools."
          },
          {
            type: "paragraph",
            text: "It allows users to paint maps using the item, monster, and sprite data already loaded from their real server configuration. There is no separate mock catalog or duplicate content database."
          },
          {
            type: "paragraph",
            text: "When a user places an item or monster, they are selecting an actual entry from their server data and seeing it rendered with the corresponding production sprite artwork."
          },
          { type: "heading", text: "Map Data Model" },
          {
            type: "paragraph",
            text: "A map document represents one flat play area with a configurable width and height."
          },
          {
            type: "list",
            title: "Each tile can contain data across three sparse layers",
            items: ["Surface or terrain", "Item placement", "Monster spawn placement"]
          },
          {
            type: "paragraph",
            text: "Item placements retain their complete spawn metadata. Monster placements include respawn behavior and timing information."
          },
          {
            type: "paragraph",
            text: "The editor follows the game's actual world model. RPGWO does not treat floors as vertical layers in one map file. Instead, floor transitions are ordinary teleporter items linking separate maps."
          },
          {
            type: "paragraph",
            text: "RPGWO_Tools therefore represents multiple floors as separate map documents rather than introducing an artificial z-axis that the game itself does not support."
          },
          { type: "divider" },
          { type: "heading", text: "Binary Map Reverse Engineering" },
          {
            type: "paragraph",
            text: "The project includes a complete implementation of RPGWO's binary .map format. The format was not supported by an official specification."
          },
          {
            type: "list",
            title: "Its implementation required determining",
            items: [
              "Record layouts",
              "Header structures",
              "Field sizes",
              "Tile encoding",
              "Spawn metadata",
              "Version-specific differences",
              "Unknown or undocumented bytes"
            ]
          },
          {
            type: "paragraph",
            text: "One particularly important discovery was that different versions of the format use different width and height header layouts, including different count-field sizes. The codec supports both variants."
          },
          {
            type: "paragraph",
            text: "For records that include partially understood data, RPGWO_Tools uses a preserve-unless-modified strategy. Original bytes are retained until the user changes the associated value, minimizing the possibility that undocumented information will be overwritten or corrupted."
          },
          { type: "heading", text: "RSF Scripting Format" },
          {
            type: "paragraph",
            text: "The editor also supports the map system's companion .rsf format. RSF is a line-oriented scripting format based on imperative map commands."
          },
          {
            type: "list",
            title: "RPGWO_Tools can",
            items: [
              "Parse RSF scripts into map state",
              "Generate RSF scripts from map state",
              "Convert between RSF and binary map representations",
              "Re-import generated output for validation"
            ]
          },
          { type: "divider" },
          { type: "heading", text: "Procedural Generation Engine" },
          {
            type: "paragraph",
            text: "RPGWO_Tools includes a procedural generation framework written from scratch in C#."
          },
          {
            type: "list",
            title: "The engine is independent of",
            items: ["WPF", "Blazor", "JavaScript", "Filesystem APIs", "Rendering APIs"]
          },
          {
            type: "paragraph",
            text: "The same generation code therefore runs in both the desktop application and WebAssembly browser application without modification."
          },
          { type: "heading", text: "Deterministic Generation" },
          {
            type: "paragraph",
            text: "Every generator uses a seeded pseudo-random number generator."
          },
          {
            type: "list",
            title: "A map can be reproduced exactly by providing the same",
            items: ["Algorithm", "Parameters", "Seed"]
          },
          {
            type: "paragraph",
            text: "This makes generated content testable, debuggable, and shareable."
          },
          { type: "heading", text: "Terrain Generation" },
          {
            type: "paragraph",
            text: "The project includes an original Perlin and fractal-noise implementation for natural terrain generation."
          },
          {
            type: "list",
            title: "It can produce data used for",
            items: [
              "Elevation",
              "Biomes",
              "Wilderness",
              "Terrain transitions",
              "Environmental regions",
              "Large world maps"
            ]
          },
          {
            type: "paragraph",
            text: "Because the implementation is part of the core engine, it behaves identically on desktop and in the browser."
          },
          { type: "heading", text: "Connectivity Repair" },
          {
            type: "paragraph",
            text: "Randomized dungeon and maze generation can create isolated areas that players cannot reach. RPGWO_Tools performs flood-fill connectivity analysis after generation."
          },
          {
            type: "paragraph",
            text: "Disconnected regions are detected and repaired so the resulting map remains fully traversable. This converts connectivity from a visual assumption into an explicit generation guarantee."
          },
          { type: "heading", text: "Automatic Wall Tiling" },
          {
            type: "paragraph",
            text: "The generator includes a four-neighbor bitmask auto-tiling system."
          },
          {
            type: "list",
            title: "For every wall tile, the engine examines whether adjacent wall tiles exist to the",
            items: ["North", "East", "South", "West"]
          },
          {
            type: "list",
            title: "The resulting bitmask is classified into one of 18 supported wall shapes, including",
            items: [
              "Straight segments",
              "Corners",
              "T-junctions",
              "Cross-junctions",
              "End caps",
              "Door placements"
            ]
          },
          {
            type: "paragraph",
            text: "Each logical shape maps to a configurable in-game item. This allows generated maps to use the server owner's own wall artwork and item definitions rather than hard-coded visual assets."
          },
          { type: "heading", text: "Monster and Encounter Placement" },
          {
            type: "paragraph",
            text: "Generators can populate maps using real monster definitions from the active project."
          },
          {
            type: "list",
            title: "Spawn generation supports",
            items: [
              "Individual placement",
              "Configurable density",
              "Regional placement",
              "Pack spawning",
              "Cluster spawning",
              "Respawn metadata"
            ]
          },
          {
            type: "paragraph",
            text: "Because the generator works with the same catalog as the editor, generated maps remain consistent with the user's server configuration."
          },
          { type: "heading", text: "Generator Registry" },
          {
            type: "paragraph",
            text: "Procedural algorithms are registered through an extensible registry. New algorithms can be added without redesigning the editor or generation engine."
          },
          {
            type: "list",
            title: "The current system includes 15 distinct generation algorithms across 11 categories, including",
            items: [
              "Mazes",
              "Dungeons",
              "Towns",
              "World and biome terrain",
              "Building interiors",
              "Combat encounters",
              "Wilderness",
              "Infrastructure",
              "Puzzle rooms",
              "Landmarks",
              "Environmental hazards"
            ]
          },
          { type: "divider" },
          { type: "heading", text: "Reverse Engineering an Existing Map Editor" },
          {
            type: "paragraph",
            text: "A major source of information was an existing browser-based map editor created by another developer."
          },
          {
            type: "paragraph",
            text: "Its original source repository was not available. However, the deployed application used an unbundled, unminified Vue codebase, allowing its shipped JavaScript, CSS, and HTML to be inspected directly."
          },
          {
            type: "list",
            title: "That implementation was analyzed to recover",
            items: [
              "Binary data layouts",
              "Map record structures",
              "Sprite-sheet addressing mathematics",
              "Rendering conventions",
              "Map and RSF file behavior",
              "The parameter surface of approximately 198 generation routines"
            ]
          },
          {
            type: "paragraph",
            text: "These findings were then independently reimplemented in C#."
          },
          {
            type: "paragraph",
            text: "The objective was not to reproduce the application's user interface. The objective was to understand the underlying formats and behaviors well enough to build a maintainable implementation integrated into RPGWO_Tools."
          },
          {
            type: "paragraph",
            text: "The new implementation also removes a major limitation of the original editor. The existing editor required users to upload a separate compiled data file containing item and monster information. RPGWO_Tools instead uses the configuration data that the toolkit already has loaded."
          },
          {
            type: "paragraph",
            text: "This eliminates duplicate setup and ensures the map editor always reflects the content currently being edited."
          },
          { type: "divider" },
          { type: "heading", text: "Web Map Rendering Architecture" },
          {
            type: "paragraph",
            text: "The browser map editor uses HTML5 Canvas for rendering, but editing decisions remain in C#. The architecture deliberately separates responsibilities."
          },
          { type: "heading", text: "C# and WebAssembly" },
          {
            type: "list",
            title: "C# owns",
            items: [
              "Map state",
              "Selection state",
              "Editing tools",
              "Placement rules",
              "Generation logic",
              "Undoable operations",
              "Catalog lookups",
              "File encoding"
            ]
          },
          { type: "heading", text: "JavaScript and Canvas" },
          {
            type: "list",
            title: "JavaScript handles",
            items: [
              "Drawing sprites",
              "Drawing overlays",
              "Canvas scaling",
              "Pointer-event capture",
              "Input forwarding",
              "Pixel-level rendering"
            ]
          },
          {
            type: "paragraph",
            text: "C# issues commands such as:"
          },
          {
            type: "callout",
            text: "Draw this sprite at this map position."
          },
          {
            type: "paragraph",
            text: "JavaScript does not decide what should be placed, removed, generated, or selected. Mouse and pointer events are passed back to C# through the JavaScript interop boundary."
          },
          {
            type: "paragraph",
            text: "This keeps the rules engine testable and platform-independent while still benefiting from Canvas rendering performance."
          },
          { type: "divider" },
          { type: "heading", text: "Legacy Package Builder" },
          {
            type: "paragraph",
            text: "The desktop application can rebuild RPGWO's legacy distribution package format."
          },
          {
            type: "list",
            title: "This includes",
            items: [
              "MASTER2.DAT",
              "Per-file compressed companion data",
              "Zlib-compressed content",
              "Legacy metadata structures"
            ]
          },
          {
            type: "paragraph",
            text: "The original packaging utility was no longer available, and no format documentation existed. The format was recovered by decompiling an existing assembly and analyzing its output behavior to determine the precise binary layout."
          },
          {
            type: "paragraph",
            text: "RPGWO_Tools can now generate compatible packages without depending on the unavailable original program."
          },
          { type: "divider" },
          { type: "heading", text: "Live Server Control" },
          {
            type: "list",
            title: "The desktop application can communicate with the running RPGWO server despite the server having",
            items: [
              "No API",
              "No command protocol",
              "No IPC interface",
              "No scripting endpoint",
              "No automation layer"
            ]
          },
          {
            type: "paragraph",
            text: "Integration is performed through Win32 UI automation."
          },
          {
            type: "list",
            title: "The toolkit can",
            items: [
              "Locate the server window by class name and control layout",
              "Find hidden child controls",
              "Trigger server buttons programmatically",
              "Read the live status bar",
              "Read the active player list",
              "Capture the server's rendered map display",
              "Convert the captured GDI bitmap for display in the toolkit"
            ]
          },
          {
            type: "paragraph",
            text: "Button actions use PostMessage with BM_CLICK rather than synchronous SendMessage."
          },
          {
            type: "paragraph",
            text: "This is an intentional concurrency decision. A synchronous message could block indefinitely if the server opened a modal dialog in response to the click. Posting the message avoids coupling the toolkit's UI thread to the legacy server's modal event loop."
          },
          {
            type: "paragraph",
            text: "This functionality remains desktop-only because browsers cannot inspect or control arbitrary native application windows."
          },
          { type: "divider" },
          { type: "heading", text: "Automated Validation" },
          {
            type: "paragraph",
            text: "The browser application's core workflows are tested through Playwright browser automation."
          },
          {
            type: "list",
            title: "Tests exercise real user flows against genuine parsed project data, including",
            items: [
              "Loading a project folder",
              "Reading configuration catalogs",
              "Editing catalog-backed values",
              "Saving changes",
              "Creating backup files",
              "Restoring state after a refresh",
              "Running procedural generation",
              "Exporting binary map files",
              "Re-importing exported files",
              "Verifying full format round trips"
            ]
          },
          {
            type: "list",
            title: "Automated testing exposed two significant defects that were not reliably visible during manual testing",
            items: [
              "A schema edge case in which an entry had no safe write target",
              "A rendering race condition caused by two competing UI update paths"
            ]
          },
          {
            type: "paragraph",
            text: "Both issues were fixed at their architectural root rather than patched at the visible symptom."
          },
          { type: "divider" },
          { type: "heading", text: "Engineering Challenges Demonstrated" },
          { type: "heading", text: "Binary-Format Reverse Engineering" },
          {
            type: "list",
            title: "RPGWO_Tools implements multiple undocumented binary formats, including",
            items: [
              "The game's map format",
              "A legacy master-package format",
              "Sprite-sheet addressing conventions",
              "Version-dependent map headers"
            ]
          },
          {
            type: "paragraph",
            text: "The implementation accounts for unknown data and layout differences rather than assuming every byte is understood."
          },
          { type: "heading", text: "Cross-Runtime C# Architecture" },
          {
            type: "list",
            title: "The procedural generation and format systems run under",
            items: [
              "Native .NET on Windows",
              ".NET compiled to WebAssembly",
              "WPF application workflows",
              "Browser application workflows"
            ]
          },
          {
            type: "paragraph",
            text: "This was possible because those systems were designed without UI, rendering, or filesystem dependencies."
          },
          { type: "heading", text: "Browser Storage and Permissions" },
          {
            type: "list",
            title: "The project combines",
            items: [
              "File System Access API",
              "IndexedDB",
              "Persistent directory handles",
              "In-memory virtual filesystems",
              "Folder uploads",
              "ZIP downloads",
              "Session restoration"
            ]
          },
          {
            type: "paragraph",
            text: "These capabilities are unified behind one abstraction rather than spread throughout the application."
          },
          { type: "heading", text: "Format Fidelity" },
          {
            type: "paragraph",
            text: "The project treats byte-for-byte preservation as a core requirement. Round-trip behavior was validated using direct binary and text comparisons rather than relying only on successful parsing."
          },
          { type: "heading", text: "Legacy-System Integration" },
          {
            type: "list",
            title: "RPGWO_Tools works with systems that were never designed for modern integration",
            items: [
              "Custom text formats",
              "Undocumented binary files",
              "Fixed-grid sprite sheets",
              "An API-less native server",
              "Discontinued packaging utilities",
              "Browser security restrictions"
            ]
          },
          {
            type: "paragraph",
            text: "Each required a different integration strategy."
          },
          { type: "heading", text: "Architectural Risk Management" },
          {
            type: "paragraph",
            text: "The project demonstrates a pragmatic approach to a growing codebase."
          },
          {
            type: "list",
            title: "Instead of pursuing code reuse at any cost, the architecture prioritized",
            items: [
              "Stability",
              "Incremental delivery",
              "Platform isolation",
              "Regression avoidance",
              "Testability",
              "Future extensibility"
            ]
          },
          {
            type: "paragraph",
            text: "During development, a full solution build also exposed an SDK file-globbing issue in which files from the new browser project were unintentionally compiled into the desktop application. The issue was corrected through a targeted project exclusion rather than an unnecessary repository restructuring."
          },
          { type: "divider" },
          { type: "heading", text: "Technology Stack" },
          {
            type: "list",
            title: "Languages",
            items: ["C#", "JavaScript", "XAML"]
          },
          {
            type: "list",
            title: "Desktop",
            items: [
              ".NET 8",
              "WPF",
              "Win32 P/Invoke",
              "GDI capture",
              "DrawingVisual",
              "RenderTargetBitmap"
            ]
          },
          {
            type: "list",
            title: "Web",
            items: [
              ".NET 8",
              "Blazor WebAssembly",
              "JavaScript interop",
              "HTML5 Canvas",
              "File System Access API",
              "IndexedDB"
            ]
          },
          {
            type: "list",
            title: "Imaging",
            items: ["WPF imaging", "SixLabors.ImageSharp", "Canvas-based sprite rendering"]
          },
          {
            type: "list",
            title: "Testing",
            items: [
              "Playwright",
              "End-to-end browser automation",
              "Binary round-trip validation",
              "Direct file-diff verification"
            ]
          },
          {
            type: "list",
            title: "Formats Implemented",
            items: [
              "Custom block-based configuration dialect",
              "Fixed-grid sprite-sheet format",
              "Binary .map format",
              "Line-oriented .rsf map scripting format",
              "Legacy MASTER2.DAT distribution format"
            ]
          },
          { type: "divider" },
          { type: "heading", text: "Development Progression" },
          {
            type: "paragraph",
            text: "The project was developed in phases:"
          },
          {
            type: "list",
            items: [
              "1. Configuration editing",
              "2. Schema and reference tooling",
              "3. Sprite-sheet management",
              "4. Desktop workflow expansion",
              "5. Blazor WebAssembly port",
              "6. Virtual filesystem and browser persistence",
              "7. Binary map-format implementation",
              "8. Integrated map editing",
              "9. Procedural generation",
              "10. Automated browser validation",
              "11. Legacy packaging and server integration"
            ]
          },
          {
            type: "paragraph",
            text: "This phased progression reflects the project's expansion from a focused utility into a broader content-development environment."
          },
          { type: "divider" },
          { type: "heading", text: "What This Project Demonstrates" },
          {
            type: "paragraph",
            text: "RPGWO_Tools is a practical example of engineering in an environment where the ideal dependencies, documentation, and APIs do not exist."
          },
          {
            type: "list",
            title: "It demonstrates the ability to",
            items: [
              "Analyze undocumented systems",
              "Recover binary file structures",
              "Reimplement observed behavior",
              "Preserve legacy data safely",
              "Build portable C# architecture",
              "Design browser-based local-file workflows",
              "Integrate modern tools with native Windows software",
              "Create deterministic procedural generation systems",
              "Build schema-driven interfaces",
              "Automate real browser workflows",
              "Manage risk in an incrementally growing production codebase"
            ]
          },
          {
            type: "paragraph",
            text: "Most importantly, the project turns a collection of inaccessible legacy formats and disconnected workflows into a unified tool that real content creators can use."
          },
          {
            type: "linkButton",
            href: "/RPGWOTools/",
            label: "Open RPGWO Tools"
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
      pageTitle: "Fayte",
      detail: {
        eyebrow: "",
        title: "Fayte",
        summary: "Tools built to support Fayte's sprite pipeline.",
        blocks: [
          {
            type: "list",
            title: "FayteWO demonstrates experience with",
            items: [
              "Server-authoritative multiplayer architecture",
              "Custom secure TCP protocols with TLS and certificate pinning",
              "Chunk-streamed world simulation at scale",
              "Hybrid rendering framework integration",
              "Persistent-world serialization and empirical persistence testing",
              "Data-integrity audits and silent data-loss diagnosis",
              "Content-authoring pipelines and verification tooling",
              "Security auditing and live exploit mitigation",
              "Live administration tools",
              "Cross-platform Linux deployment",
              "Automated load testing",
              "Multiplayer debugging and cross-layer root-cause tracing",
              "Launcher and patch architecture",
              "Production-style operational failure handling"
            ]
          },
          { type: "divider" },
          {
            type: "paragraph",
            text: "The Sprite Warp Editor is a browser-based tool for composing, positioning, and anchoring sprite layers used by Fayte's tile-based visuals. Nothing is uploaded anywhere; everything runs client-side."
          },
          {
            type: "linkButton",
            href: "/SpriteWarper/",
            label: "Open Sprite Warp Editor"
          },
          { type: "divider" },
          { type: "heading", text: "Technical Engineering" },
          {
            type: "paragraph",
            text: "The technical architecture of FayteWO was built around server authority, shared rules, format consistency, and operational reliability."
          },
          {
            type: "paragraph",
            text: "The project consists of seven deployable applications sharing one core library."
          },
          { type: "divider" },
          { type: "heading", text: "Application Architecture" },
          { type: "heading", text: "Core" },
          {
            type: "list",
            title: "The shared Core project contains",
            items: [
              "World models",
              "Packet definitions",
              "Game rules",
              "Data-transfer objects",
              "Persistence structures",
              "Content definitions",
              "Shared validation logic"
            ]
          },
          {
            type: "paragraph",
            text: "Both the server and client compile against the same definitions. This helps prevent protocol drift and supports the server-authoritative architecture."
          },
          { type: "heading", text: "Server" },
          {
            type: "list",
            title: "The server owns",
            items: [
              "World state",
              "Character state",
              "Combat resolution",
              "Inventory mutations",
              "Economy calculations",
              "NPC simulation",
              "Guild state",
              "Persistence",
              "Permission checks",
              "Network validation"
            ]
          },
          {
            type: "paragraph",
            text: "The server never trusts clients to provide derived gameplay values."
          },
          { type: "heading", text: "Client" },
          {
            type: "list",
            title: "The client combines",
            items: [
              "MonoGame world rendering",
              "Avalonia user interfaces",
              "Network communication",
              "Input handling",
              "Audio",
              "Local presentation state"
            ]
          },
          {
            type: "paragraph",
            text: "It displays server-owned data rather than acting as the source of truth."
          },
          { type: "heading", text: "ItemEditor" },
          {
            type: "list",
            title: "A WinForms application provides offline authoring for",
            items: ["Items", "NPCs", "Skills", "Actions", "Abilities", "Quests", "Crafting data"]
          },
          {
            type: "paragraph",
            text: "Crafting was folded into the action editor after the separate recipe workflow caused duplicated file handling and a real double-I/O defect."
          },
          { type: "heading", text: "DevHub" },
          {
            type: "paragraph",
            text: "An Avalonia launcher replaces the need to manually start several projects in separate terminal windows."
          },
          {
            type: "list",
            title: "It can launch",
            items: ["The server", "The editor", "Multiple client instances"]
          },
          {
            type: "paragraph",
            text: "Unlimited local clients can be opened for multiplayer testing."
          },
          { type: "heading", text: "Launcher" },
          {
            type: "list",
            title: "The standalone launcher handles",
            items: [
              "Version checking",
              "Patch download",
              "Checksum validation",
              "Client installation",
              "Update fallback behavior",
              "Starting the installed game"
            ]
          },
          {
            type: "paragraph",
            text: "It is separate from the game client so it can safely replace client files while the client is not running."
          },
          { type: "heading", text: "LoadTest" },
          {
            type: "paragraph",
            text: "The load-testing application launches simulated clients through the real networking layer."
          },
          {
            type: "list",
            title: "Each bot follows the complete lifecycle",
            items: [
              "1. Connect",
              "2. Complete TLS negotiation",
              "3. Create an account",
              "4. Log in",
              "5. Create a character",
              "6. Enter the world",
              "7. Move continuously"
            ]
          },
          {
            type: "paragraph",
            text: "It reports stage latency, percentiles, and throughput."
          },
          { type: "heading", text: "ContentPacker" },
          {
            type: "paragraph",
            text: "The content packer encrypts client content into a single AES-256-GCM package."
          },
          {
            type: "list",
            title: "It includes a verification mode that",
            items: [
              "1. Packs all files",
              "2. Decrypts them",
              "3. Reconstructs the original files",
              "4. Diffs the results"
            ]
          },
          {
            type: "paragraph",
            text: "This ensures corruption is detected before distribution."
          },
          { type: "divider" },
          { type: "heading", text: "Hybrid MonoGame and Avalonia UI" },
          {
            type: "paragraph",
            text: "The game world is rendered through MonoGame, while application-style interfaces are built with Avalonia."
          },
          {
            type: "list",
            title: "This provides modern features such as",
            items: ["Data binding", "Reusable controls", "Grid layouts", "Drag-and-drop", "Styled windows", "Dynamic forms"]
          },
          {
            type: "paragraph",
            text: "without requiring a custom immediate-mode UI framework."
          },
          { type: "heading", text: "Transparent Overlay Architecture" },
          {
            type: "paragraph",
            text: "Avalonia controls are hosted in a transparent overlay window positioned above the MonoGame game window."
          },
          {
            type: "list",
            title: "The overlay",
            items: [
              "Synchronizes to the game client rectangle every 100 milliseconds",
              "Uses Win32 interop to track window position and size",
              "Remains transparent outside actual controls",
              "Allows clicks through empty canvas regions",
              "Captures input only where a UI control is present"
            ]
          },
          {
            type: "paragraph",
            text: "A subclassed Windows procedure handles hit testing so empty overlay areas pass interaction to the game below."
          },
          {
            type: "paragraph",
            text: "This lets real Avalonia UserControl windows coexist with a MonoGame render loop."
          },
          {
            type: "list",
            title: "Namespace aliases are used where MonoGame and Avalonia expose conflicting type names such as",
            items: ["Color", "Point", "Texture2D"]
          },
          { type: "divider" },
          { type: "heading", text: "Server-Authoritative Networking" },
          {
            type: "paragraph",
            text: "The network protocol was built manually over TCP."
          },
          {
            type: "list",
            title: "Each packet consists of",
            items: ["A PacketType", "A corresponding C# record", "JSON-serialized payload data"]
          },
          {
            type: "paragraph",
            text: "Traffic is transported through SslStream."
          },
          {
            type: "paragraph",
            text: "No game-engine networking framework or third-party netcode layer is used."
          },
          { type: "heading", text: "Trust Model" },
          {
            type: "list",
            title: "Clients send requests such as",
            items: ["Item ID", "Ability ID", "Quantity", "Inventory position", "Target location"]
          },
          {
            type: "list",
            title: "Clients do not send",
            items: [
              "Damage",
              "Price",
              "Character stats",
              "Success chance",
              "Skill-check results",
              "Reward totals"
            ]
          },
          {
            type: "paragraph",
            text: "Every derived value is recalculated by the server using server-owned content."
          },
          {
            type: "paragraph",
            text: "This architecture was explicitly audited before shipping encrypted client content to confirm that readable client-side content could not itself become a direct cheat vector."
          },
          { type: "divider" },
          { type: "heading", text: "TLS and Certificate Pinning" },
          {
            type: "paragraph",
            text: "All internet-facing traffic is encrypted."
          },
          {
            type: "paragraph",
            text: "The server generates and persists a self-signed certificate with a stable thumbprint."
          },
          {
            type: "paragraph",
            text: "The client uses trust-on-first-use certificate pinning modeled after SSH known_hosts."
          },
          {
            type: "list",
            title: "Pins are stored by",
            items: ["Host", "Port", "Certificate identity"]
          },
          {
            type: "paragraph",
            text: "This approach was selected because the game was in closed testing and did not yet have a domain suitable for a CA-issued certificate."
          },
          {
            type: "list",
            title: "A dedicated smoke-test client verified",
            items: ["A real TLS 1.3 handshake", "Certificate trust behavior", "Encrypted login round trips"]
          },
          { type: "divider" },
          { type: "heading", text: "Client Version Gating" },
          {
            type: "paragraph",
            text: "The server validates the client's GameVersion.Current value before processing credentials."
          },
          {
            type: "paragraph",
            text: "Outdated clients are rejected with a clear message."
          },
          {
            type: "paragraph",
            text: "This prevents incompatible packet or content formats from reaching account and character logic."
          },
          {
            type: "paragraph",
            text: "The implementation was intentionally kept simple for the small tester pool rather than prematurely building a full mandatory-update workflow into login."
          },
          { type: "divider" },
          { type: "heading", text: "Chunk Streaming" },
          {
            type: "paragraph",
            text: "Chunk streaming was the largest infrastructure rewrite in the project."
          },
          {
            type: "paragraph",
            text: "The original server eagerly created and simulated the entire world at startup."
          },
          {
            type: "paragraph",
            text: "The replacement architecture loads chunks around active players."
          },
          { type: "heading", text: "Loading" },
          {
            type: "paragraph",
            text: "Chunks within a two-chunk radius of each player are loaded on demand."
          },
          { type: "heading", text: "Eviction" },
          {
            type: "paragraph",
            text: "Every 60 seconds, the server:"
          },
          {
            type: "list",
            items: [
              "1. Recomputes the required chunks from current player positions",
              "2. Saves dirty chunks outside the required area",
              "3. Unloads inactive chunks"
            ]
          },
          {
            type: "paragraph",
            text: "Player positions are recalculated fresh on each pass, allowing instant teleports to work correctly rather than assuming players moved gradually."
          },
          { type: "heading", text: "NPC Simulation Gating" },
          {
            type: "paragraph",
            text: "Six independent NPC systems were updated to skip NPCs in inactive chunks:"
          },
          {
            type: "list",
            items: ["Combat AI", "Scheduling", "Idle wandering", "Stealth visibility", "Shop restocking", "Resource regeneration"]
          },
          {
            type: "paragraph",
            text: "The active-chunk check is O(1). As a result, empty regions have effectively no NPC simulation cost."
          },
          {
            type: "paragraph",
            text: "This architecture allowed the persistent world to grow fivefold while reducing idle-server work."
          },
          { type: "heading", text: "Bugs Revealed by the Rewrite" },
          {
            type: "paragraph",
            text: "Chunk streaming uncovered two previously hidden networking defects."
          },
          { type: "heading", text: "Dead Tile Resynchronization Handler" },
          {
            type: "paragraph",
            text: "The client requested tile updates while moving, but the corresponding server handler was a no-op."
          },
          {
            type: "paragraph",
            text: "The only real world delivery occurred during the initial radius-15 login push."
          },
          {
            type: "paragraph",
            text: "The issue had gone unnoticed because testers had not previously walked far enough across the smaller map."
          },
          { type: "heading", text: "Same-Level Teleport Failure" },
          {
            type: "paragraph",
            text: "Administrative teleports only pushed fresh map data when the Z-level changed."
          },
          {
            type: "paragraph",
            text: "Teleporting a player to a distant location on the same level delivered no new tiles."
          },
          {
            type: "paragraph",
            text: "Both bugs were corrected as part of the streaming rewrite."
          },
          { type: "divider" },
          { type: "heading", text: "Persistence Engineering" },
          {
            type: "paragraph",
            text: "Persistence became one of the most heavily audited parts of the project."
          },
          {
            type: "paragraph",
            text: "A dedicated audit was performed after a period of rapid feature development to identify silent save and restore failures."
          },
          {
            type: "paragraph",
            text: "This uncovered the most severe defects in the project."
          },
          { type: "heading", text: "Guild Bank Data Loss" },
          {
            type: "paragraph",
            text: "Guild bank items were silently lost after every server restart."
          },
          {
            type: "paragraph",
            text: "The save structures used public fields, while System.Text.Json serializes properties by default unless field support is explicitly enabled."
          },
          {
            type: "list",
            title: "The save files retained",
            items: ["Bank tabs", "Slot counts", "Empty entry structures"]
          },
          {
            type: "paragraph",
            text: "but not the actual item data. Because the structure looked valid, the failure was not obvious from inspecting the JSON."
          },
          {
            type: "list",
            title: "A test harness was written to",
            items: [
              "1. Create a guild bank",
              "2. Deposit an item",
              "3. Save the data",
              "4. Construct a new store against the same directory",
              "5. Reload the bank",
              "6. Assert that the item survived"
            ]
          },
          {
            type: "paragraph",
            text: "The test failed before the repair and passed afterward."
          },
          { type: "heading", text: "Land Claim Data Loss" },
          {
            type: "paragraph",
            text: "Every land claim was also being lost after every restart."
          },
          {
            type: "paragraph",
            text: "This issue had two independent causes."
          },
          {
            type: "paragraph",
            text: "First, the same field-serialization issue discarded claim data."
          },
          {
            type: "paragraph",
            text: "Second, restored plot coordinates lacked a field initializer and defaulted to (0,0)."
          },
          {
            type: "paragraph",
            text: "The coordinate index used dictionary index assignment, so every restored claim silently overwrote the previous claim at the same default key."
          },
          {
            type: "paragraph",
            text: "No duplicate-key exception exposed the problem."
          },
          {
            type: "list",
            title: "The result was that",
            items: ["Personal claims", "Guild territory", "PvP-zone overrides"]
          },
          {
            type: "paragraph",
            text: "were all silently removed on restart."
          },
          {
            type: "paragraph",
            text: "This was verified using the same empirical save-and-reload testing strategy."
          },
          { type: "heading", text: "Serialization Symmetry" },
          {
            type: "paragraph",
            text: "Several additional defects involved asymmetric parsing and serialization."
          },
          {
            type: "list",
            title: "Examples included",
            items: [
              "A weapon-cost module with a parser but no serializer",
              "Trap effects written without delimiters",
              "Multi-effect traps restoring only the first effect",
              "Missing ownership fields",
              "Missing facing direction",
              "Learned spells omitted from character saves"
            ]
          },
          {
            type: "paragraph",
            text: "The trap system was corrected using a length-prefixed format and validated with a multi-effect round-trip test."
          },
          { type: "divider" },
          { type: "heading", text: "Per-Instance Item State" },
          {
            type: "list",
            title: "Items can contain modules representing state such as",
            items: ["Durability", "Enchantments", "Internal storage", "Trap effects", "Costs", "Bonuses"]
          },
          {
            type: "paragraph",
            text: "The most common item-construction path originally created items with an empty instance-module list."
          },
          {
            type: "paragraph",
            text: "Consuming systems were expected to fall back to the shared item definition."
          },
          {
            type: "paragraph",
            text: "This undermined the purpose of instance state and made unique item modification unreliable."
          },
          { type: "heading", text: "Deep Module Copying" },
          {
            type: "paragraph",
            text: "The constructor was changed to copy all definition modules into each item instance."
          },
          {
            type: "paragraph",
            text: "A shallow copy was deliberately avoided because some modules contain mutable reference data, including:"
          },
          {
            type: "list",
            items: ["Inventories", "Lists of trap effects", "Nested state"]
          },
          {
            type: "paragraph",
            text: "Instead, modules are cloned through a full serialize-and-deserialize round trip. This guarantees each item receives isolated state."
          },
          {
            type: "paragraph",
            text: "The solution was verified by constructing, saving, restoring, and validating the complete 683-item catalog with zero failures."
          },
          { type: "heading", text: "Second-Order Defects" },
          {
            type: "paragraph",
            text: "The corrected construction path immediately exercised code that had never previously run for every item."
          },
          {
            type: "paragraph",
            text: "Seven modules containing references to other content definitions could dereference null values during serialization."
          },
          {
            type: "paragraph",
            text: "These paths were hardened before they produced live crashes."
          },
          { type: "divider" },
          { type: "heading", text: "Project-Wide Stat Doubling" },
          {
            type: "paragraph",
            text: "A reported symptom showed a piece of jewelry granting +4 to a stat authored as +2."
          },
          {
            type: "paragraph",
            text: "The underlying issue was not limited to the jewelry interface."
          },
          {
            type: "paragraph",
            text: "After the item-module architecture changed, three systems still concatenated definition modules and instance modules using the old assumptions."
          },
          {
            type: "list",
            title: "This doubled",
            items: ["Equipment stat bonuses", "Armor mitigation", "Item-inspection values"]
          },
          {
            type: "paragraph",
            text: "The issue was traced from one visible symptom to all three call sites."
          },
          {
            type: "paragraph",
            text: "A regression test was added to assert the exact expected value."
          },
          { type: "divider" },
          { type: "heading", text: "Resource Synchronization Defect" },
          {
            type: "paragraph",
            text: "Player health, stamina, and mana appeared permanently fixed at their spawn values."
          },
          {
            type: "paragraph",
            text: "The first investigation found a display-layer casing mismatch."
          },
          {
            type: "paragraph",
            text: "That fix did not resolve the true issue."
          },
          {
            type: "paragraph",
            text: "The actual root cause occurred earlier in content parsing: a case-sensitive switch received lowercase resource values and mapped every resource type to none."
          },
          {
            type: "paragraph",
            text: "The problem was corrected at the parsing chokepoint rather than patched in every display path."
          },
          { type: "divider" },
          { type: "heading", text: "Concurrency and Exception Safety" },
          {
            type: "paragraph",
            text: "Several networking and UI paths were hardened after real testing exposed unsafe background behavior."
          },
          { type: "heading", text: "Server Receive Loop" },
          {
            type: "paragraph",
            text: "Each connection's receive loop ran inside a fire-and-forget task with no exception handler."
          },
          {
            type: "paragraph",
            text: "An exception could silently terminate the connection without useful logging."
          },
          {
            type: "list",
            title: "The loop was updated with",
            items: ["Exception handling", "Connection-context logging", "Controlled disconnect cleanup"]
          },
          { type: "heading", text: "Client UI Dispatch" },
          {
            type: "paragraph",
            text: "The client contained approximately 69 raw UI-thread dispatch calls."
          },
          {
            type: "paragraph",
            text: "An exception inside any one could crash the entire desktop application."
          },
          {
            type: "paragraph",
            text: "A SafePost wrapper was introduced and applied across the main UI update class."
          },
          {
            type: "list",
            title: "This centralized",
            items: ["Dispatch behavior", "Exception handling", "Error logging"]
          },
          { type: "heading", text: "Shared Mutation Locking" },
          {
            type: "paragraph",
            text: "Container and guild-board mutations were processed concurrently without synchronization."
          },
          {
            type: "paragraph",
            text: "A coarse lock was added around these operations."
          },
          {
            type: "paragraph",
            text: "The lock is intentionally broad because these mutations are not performance-critical hot paths. This favored correctness and clarity over premature fine-grained concurrency."
          },
          { type: "divider" },
          { type: "heading", text: "Load Testing" },
          {
            type: "paragraph",
            text: "The load tester references the real client networking class."
          },
          {
            type: "list",
            title: "This means simulated clients exercise",
            items: [
              "TCP",
              "TLS",
              "Certificate pinning",
              "Packet serialization",
              "Login",
              "Character creation",
              "World entry",
              "Movement"
            ]
          },
          {
            type: "paragraph",
            text: "The test does not use a simplified networking mock."
          },
          { type: "heading", text: "Trust-Pin Race Condition" },
          {
            type: "paragraph",
            text: "When two clients connected for the first time simultaneously, both attempted to update the shared trust-pin file."
          },
          {
            type: "paragraph",
            text: "This could throw an exception from the TLS validation callback and reject a valid connection."
          },
          {
            type: "paragraph",
            text: "The same problem had also occurred in local multi-client testing."
          },
          {
            type: "paragraph",
            text: "It was corrected with retry and randomized jitter around the shared file update."
          },
          { type: "divider" },
          { type: "heading", text: "Security Engineering" },
          {
            type: "paragraph",
            text: "The project underwent active exploit auditing rather than assuming server authority was sufficient by itself."
          },
          { type: "heading", text: "Unauthenticated Administrative Packets" },
          {
            type: "paragraph",
            text: "Several administrative packets originally checked only whether the sender was logged in."
          },
          {
            type: "list",
            title: "Any connected player could potentially",
            items: ["Edit world tiles", "Reveal ore", "Spawn arbitrary NPC definitions"]
          },
          {
            type: "paragraph",
            text: "A second set of item spawn and deletion packets later proved to have the same defect."
          },
          {
            type: "list",
            title: "The fix introduced",
            items: [
              "Account-level administrator status",
              "Cached session authorization",
              "Server-side permission checks",
              "A console-only bootstrap command for creating the first administrator"
            ]
          },
          {
            type: "paragraph",
            text: "This closed a live privilege-escalation vulnerability."
          },
          { type: "heading", text: "Currency Laundering Prevention" },
          {
            type: "paragraph",
            text: "Nothing originally prevented a shop definition from buying currency items."
          },
          {
            type: "paragraph",
            text: "That could allow real currency objects to enter a shop inventory and become stealable, creating a duplication or laundering route."
          },
          {
            type: "paragraph",
            text: "The sale handler now rejects currency items regardless of shop configuration."
          },
          {
            type: "paragraph",
            text: "The exploit is prevented at the execution layer rather than relying on content authors to configure every shop correctly."
          },
          { type: "heading", text: "Escrow Container Bypass" },
          {
            type: "paragraph",
            text: "Generic container packets could treat a quest-board reward container like an ordinary chest."
          },
          {
            type: "paragraph",
            text: "A player could potentially open it and remove the escrowed reward without completing the quest."
          },
          {
            type: "paragraph",
            text: "Open, transfer, and move handlers now explicitly reject restricted container types."
          },
          { type: "heading", text: "Content Encryption" },
          {
            type: "paragraph",
            text: "Client content is packed using AES-256-GCM."
          },
          {
            type: "list",
            title: "This is documented as",
            items: ["A spoiler deterrent", "A casual tampering barrier", "A packaging mechanism"]
          },
          {
            type: "paragraph",
            text: "It is not presented as DRM or as a substitute for server authority."
          },
          {
            type: "paragraph",
            text: "The packer also revealed three files that had no client-side purpose and exposed quest information unnecessarily. Those files were removed from the shipped client."
          },
          { type: "divider" },
          { type: "heading", text: "Live Administration Tools" },
          {
            type: "paragraph",
            text: "FayteWO includes a full in-game administration mode."
          },
          {
            type: "list",
            title: "It replaced three separate workflows",
            items: [
              "Chat-based text commands",
              "A locally piped developer console",
              "An offline editor requiring server restarts"
            ]
          },
          {
            type: "list",
            title: "Administrators can inspect or edit",
            items: [
              "Characters",
              "Attributes",
              "Skills",
              "Items",
              "Item modules",
              "Abilities",
              "NPC definitions",
              "Land",
              "World content"
            ]
          },
          {
            type: "list",
            title: "Content operations can be performed as",
            items: ["Live-only test changes", "Permanent changes saved to authored content"]
          },
          {
            type: "paragraph",
            text: "The entire interface is protected by the same account-level permission system used by the server."
          },
          { type: "divider" },
          { type: "heading", text: "Verification Harness" },
          {
            type: "paragraph",
            text: "A dedicated console harness references the shared core project directly."
          },
          {
            type: "list",
            title: "It is used for",
            items: [
              "Save-and-reload tests",
              "Module parsing",
              "YAML round trips",
              "Content sweeps",
              "Full-catalog consistency validation",
              "Regression checks"
            ]
          },
          {
            type: "paragraph",
            text: "The harness was explicitly treated as stronger evidence than a successful build."
          },
          {
            type: "paragraph",
            text: "It was also recognized as incomplete: it validates shared-core behavior but cannot automatically cover the majority of server-only gameplay logic. That limitation informed the continued use of live multiplayer testing."
          },
          { type: "divider" },
          { type: "heading", text: "Real Multiplayer Testing" },
          {
            type: "paragraph",
            text: "Multiple rounds of actual multiplayer testing revealed defects that compilation and serialization tests could not detect."
          },
          { type: "heading", text: "Window Position Reset" },
          {
            type: "paragraph",
            text: "A window-repositioning routine ran every frame and overwrote user-dragged positions."
          },
          {
            type: "paragraph",
            text: "The same code repeatedly registered drag handlers, accumulating duplicate events."
          },
          { type: "heading", text: "Avalonia Layout Timing" },
          {
            type: "paragraph",
            text: "A stats window required three correction attempts."
          },
          {
            type: "paragraph",
            text: "Early fixes measured controls before they joined the visual tree, producing invalid near-zero dimensions."
          },
          {
            type: "paragraph",
            text: "The final design relied on Avalonia's continuous layout system rather than manual measurement."
          },
          { type: "heading", text: "Duplicate Stealth Controls" },
          {
            type: "paragraph",
            text: "Two separate UI controls triggered the same stealth action."
          },
          {
            type: "paragraph",
            text: "The first search missed the duplicate because it used overly narrow terminology."
          },
          { type: "heading", text: "LINQ Empty-versus-Null Defect" },
          {
            type: "paragraph",
            text: "A weapon-cost fallback checked whether a query result was null."
          },
          {
            type: "paragraph",
            text: "A LINQ query with no results returns an empty collection rather than null."
          },
          {
            type: "paragraph",
            text: "The fallback therefore never executed, allowing weapons without explicit costs to be used for free."
          },
          { type: "heading", text: "Re-Parenting Crash" },
          {
            type: "paragraph",
            text: "A tab-switch sequence crashed because one control was inserted into a second parent without first being detached from its original container."
          },
          {
            type: "paragraph",
            text: "A previous try/catch suppressed the symptom but did not repair the ownership error."
          },
          { type: "heading", text: "Coordinate-Space Errors" },
          {
            type: "paragraph",
            text: "World drag-and-drop mixed desktop-space coordinates with game-window-relative coordinates."
          },
          {
            type: "paragraph",
            text: "The same copied defect existed in three separate call sites."
          },
          {
            type: "paragraph",
            text: "It appeared functional only when the game window happened to sit at the corner of the screen."
          },
          { type: "heading", text: "Level-Transition Sign Errors" },
          {
            type: "paragraph",
            text: "An investigation into one inactive transition tile revealed:"
          },
          {
            type: "list",
            items: ["Two vertical sign inversions", "One bounds check comparing the wrong values"]
          },
          {
            type: "paragraph",
            text: "The fixes were verified by travelling through a real transition in a live client."
          },
          { type: "divider" },
          { type: "heading", text: "Deployment and Operations" },
          {
            type: "paragraph",
            text: "The server was converted from Windows-only execution to cross-platform .NET hosting."
          },
          {
            type: "paragraph",
            text: "A dead Windows UI class of approximately 400 lines was removed after confirming it was unreachable from the actual process startup path."
          },
          {
            type: "paragraph",
            text: "The server was then deployed to Linux."
          },
          {
            type: "paragraph",
            text: "This reduced expected hosting cost from approximately $15–30 or more per month for Windows hosting to approximately $4–6 per month for a Linux VPS."
          },
          { type: "heading", text: "Deployment Pipeline" },
          {
            type: "paragraph",
            text: "PowerShell scripts:"
          },
          {
            type: "list",
            items: [
              "1. Publish a self-contained Linux build",
              "2. Copy the build to the remote VPS",
              "3. Preserve save files and certificates",
              "4. Restart the game through systemd"
            ]
          },
          {
            type: "paragraph",
            text: "A first-time setup mode provisions:"
          },
          {
            type: "list",
            items: [
              "An unprivileged server user",
              "Required directories",
              "Firewall instructions",
              "Service installation commands"
            ]
          },
          {
            type: "paragraph",
            text: "Deployments are additive."
          },
          {
            type: "paragraph",
            text: "The deployment process does not delete remote files, and the live save directory is never included in the published payload."
          },
          { type: "heading", text: "Real Deployment Failures" },
          {
            type: "paragraph",
            text: "Testing on a real server exposed two significant operational bugs."
          },
          { type: "heading", text: "Silent Copy Failure" },
          {
            type: "paragraph",
            text: "The deployment script did not check remote copy exit codes."
          },
          {
            type: "paragraph",
            text: "An interrupted authentication prompt could make a failed deployment appear successful."
          },
          {
            type: "paragraph",
            text: "Every remote step now fails loudly on nonzero exit status."
          },
          { type: "heading", text: "Standard-Input Shutdown" },
          {
            type: "paragraph",
            text: "The server console loop treated end-of-stream on standard input as a shutdown request."
          },
          {
            type: "paragraph",
            text: "Under systemd, standard input is normally closed."
          },
          {
            type: "list",
            title: "The server would therefore",
            items: ["1. Start successfully", "2. Report that it was listening", "3. Immediately shut itself down"]
          },
          {
            type: "paragraph",
            text: "The loop was changed so closed input causes the console reader to sleep rather than terminate the process."
          },
          {
            type: "paragraph",
            text: "Intentional shutdown remains available through commands and normal process signals."
          },
          {
            type: "paragraph",
            text: "This repair also makes the server compatible with other headless and containerized environments."
          },
          { type: "divider" },
          { type: "heading", text: "Patching and Distribution" },
          {
            type: "paragraph",
            text: "A separate patch service runs inside the game server process on another port."
          },
          {
            type: "list",
            title: "It uses",
            items: [
              "TcpListener",
              "SslStream",
              "The same certificate trust model as the game protocol",
              "A lightweight line-oriented control protocol"
            ]
          },
          {
            type: "paragraph",
            text: "Buffered text readers were deliberately avoided to prevent them from reading ahead into a following binary payload."
          },
          { type: "heading", text: "Standalone Auto-Updater" },
          {
            type: "list",
            title: "The launcher",
            items: [
              "Connects to the patch endpoint",
              "Checks available versions",
              "Downloads updates",
              "Verifies checksums",
              "Refuses to overwrite a running install",
              "Installs the update",
              "Starts the client"
            ]
          },
          {
            type: "paragraph",
            text: "When the patch server is unavailable, it can launch the existing installed version rather than leaving the player unable to play."
          },
          { type: "divider" },
          { type: "heading", text: "Architecture Patterns" },
          {
            type: "paragraph",
            text: "Three major content domains follow a shared modular structure:"
          },
          {
            type: "list",
            items: [
              "ItemDef and ItemModule",
              "ActionDefinition and ActionModule",
              "Character definitions and modules"
            ]
          },
          {
            type: "list",
            title: "Each system uses",
            items: [
              "Typed module collections",
              "LINQ-based accessors",
              "Flatten and parse round trips",
              "YAML-authored data",
              "Shared runtime validation"
            ]
          },
          {
            type: "paragraph",
            text: "This consistency reduces the number of special-case pipelines required as the game expands."
          }
        ]
      }
    }),
    createCard({
      id: "code-entangled",
      title: "Entangled",
      description: "Programming work tied to Entangled.",
      imageKey: "emma",
      pageTitle: "Entangled",
      detail: {
        eyebrow: "",
        title: "Entangled",
        summary: "A narrative dating-sim prototype built around branching dialogue, persistent session state, time progression, and location-driven storytelling",
        blocks: [
          {
            type: "paragraph",
            text: "Entangled is a Unity-based conversational dating-sim prototype centered on character relationships, branching dialogue, scheduled activities, and progression through a small interconnected town."
          },
          {
            type: "paragraph",
            text: "The prototype established the original gameplay and data structures that informed later experimentation in related projects. Its most substantial technical contributions are found in its dialogue architecture, global flag system, calendar progression, location navigation, and scene-spanning state management."
          },
          {
            type: "paragraph",
            text: "Rather than treating conversations, time, and travel as unrelated features, Entangled connects them through a shared progression model:"
          },
          {
            type: "list",
            items: [
              "Dialogue choices can modify global state",
              "Dialogue exits can advance time",
              "Time and flags can change which locations are available",
              "Scene travel updates the player's current location",
              "Persistent managers preserve state while Unity scenes change",
              "ScriptableObjects allow narrative content and destinations to be authored as data"
            ]
          },
          {
            type: "paragraph",
            text: "The result is a prototype in which narrative progression is driven by the interaction between conversation choices, world state, time, and location."
          },
          { type: "divider" },
          { type: "heading", text: "Unity Architecture" },
          {
            type: "paragraph",
            text: "Entangled was developed in Unity using a combination of:"
          },
          {
            type: "list",
            items: [
              "C#",
              "MonoBehaviours",
              "ScriptableObjects",
              "TextMeshPro",
              "Unity scene management",
              "Coroutines",
              "Persistent singleton managers",
              "Inspector-authored narrative data"
            ]
          },
          {
            type: "paragraph",
            text: "The prototype separates authored content from scene presentation where practical."
          },
          {
            type: "paragraph",
            text: "Dialogue, locations, conditions, and global state are represented through reusable data structures, while scene-level components handle presentation, input, animation, and transitions."
          },
          {
            type: "paragraph",
            text: "This allows the narrative systems to remain consistent even as the player moves between independently constructed Unity scenes."
          },
          { type: "divider" },
          { type: "heading", text: "Branching Dialogue System" },
          {
            type: "paragraph",
            text: "Dialogue is authored through a hierarchy of ScriptableObjects rather than being embedded directly into scene scripts."
          },
          {
            type: "list",
            title: "The core structure includes",
            items: [
              "Dialogue conversations",
              "Dialogue lines",
              "Player choices",
              "Conditional transitions",
              "Entry and exit actions",
              "State-changing effects"
            ]
          },
          {
            type: "paragraph",
            text: "A conversation can move from a line into one or more player choices, route into another line, or exit into a new gameplay state."
          },
          {
            type: "paragraph",
            text: "Conceptually, the flow resembles:"
          },
          {
            type: "callout",
            text: "Dialogue line → available choices → conditional destination → next line or exit action"
          },
          {
            type: "paragraph",
            text: "This gives the dialogue system enough structure to support both straightforward conversations and state-dependent branching."
          },
          { type: "heading", text: "Conditional Choices and Routing" },
          {
            type: "paragraph",
            text: "Dialogue choices can be shown, hidden, or redirected according to stored conditions."
          },
          {
            type: "list",
            title: "The system evaluates collections of",
            items: ["Boolean flags", "Integer flags", "Required values", "State changes"]
          },
          {
            type: "paragraph",
            text: "Conditions can affect both player-facing choices and automatic transitions between dialogue lines."
          },
          {
            type: "list",
            title: "This allows a conversation to respond to prior events such as",
            items: [
              "Whether the player has met a character",
              "Whether a location has been discovered",
              "Which route the player previously selected",
              "How far a relationship has progressed",
              "Whether a scripted event has occurred",
              "Which stage of the story is currently active"
            ]
          },
          {
            type: "paragraph",
            text: "The system therefore supports conversations that evolve over repeated visits rather than always presenting the same static dialogue tree."
          },
          { type: "heading", text: "Dialogue State Changes" },
          {
            type: "paragraph",
            text: "Dialogue is not only presentational."
          },
          {
            type: "paragraph",
            text: "Lines and choices can update global state when they are entered or selected. This supports operations such as:"
          },
          {
            type: "list",
            items: [
              "Setting a Boolean flag",
              "Clearing a Boolean flag",
              "Updating an integer progression value",
              "Unlocking a destination",
              "Recording a prior decision",
              "Marking a narrative event as complete"
            ]
          },
          {
            type: "paragraph",
            text: "By allowing dialogue content to modify shared game state, narrative choices can affect later scenes and interactions without requiring every destination to communicate directly with every other destination."
          },
          { type: "heading", text: "Dialogue Presentation Layer" },
          {
            type: "paragraph",
            text: "A scene-spanning DialogueManager coordinates both dialogue logic and its visual presentation."
          },
          {
            type: "list",
            title: "It manages elements such as",
            items: [
              "TextMeshPro dialogue text",
              "Speaker portraits",
              "Character animation",
              "Typewriter presentation",
              "Voice playback",
              "Choice buttons",
              "Conversation progression",
              "Dialogue exit behavior"
            ]
          },
          {
            type: "paragraph",
            text: "The manager persists across scene transitions, allowing conversations to use one consistent runtime controller rather than requiring every scene to contain a separately configured dialogue implementation."
          },
          { type: "heading", text: "Scene-Level UI Integration" },
          {
            type: "paragraph",
            text: "Dialogue presentation is connected to each scene through a scene-level UI hook."
          },
          {
            type: "paragraph",
            text: "When a destination scene loads, the hook provides the persistent dialogue manager with the local interface it should control."
          },
          {
            type: "paragraph",
            text: "This solves an important Unity lifecycle problem:"
          },
          {
            type: "list",
            items: [
              "The dialogue manager survives scene changes",
              "Scene UI objects do not",
              "Each newly loaded scene must reconnect its UI to the persistent manager"
            ]
          },
          {
            type: "paragraph",
            text: "The hook-based approach allows the manager to retain conversation logic and state while replacing only its scene-specific presentation references."
          },
          { type: "heading", text: "Typewriter and Voice Timing" },
          {
            type: "paragraph",
            text: "Dialogue text is presented through coroutine-driven typewriter behavior."
          },
          {
            type: "list",
            title: "This allows the system to coordinate",
            items: [
              "Progressive text display",
              "Player input",
              "Voice playback",
              "Animation state",
              "Line completion",
              "Choice activation"
            ]
          },
          {
            type: "paragraph",
            text: "Presentation is therefore driven by the same dialogue runtime that controls narrative progression rather than by an unrelated collection of scene scripts."
          },
          { type: "heading", text: "Dialogue Exit Actions" },
          {
            type: "paragraph",
            text: "A dialogue line can trigger an action when the conversation ends."
          },
          {
            type: "list",
            title: "These exit actions connect dialogue to the rest of the game and can perform operations such as",
            items: [
              "Traveling to another location",
              "Advancing the calendar",
              "Starting another conversation",
              "Updating global flags",
              "Triggering a scripted event"
            ]
          },
          {
            type: "paragraph",
            text: "This makes dialogue a functional part of the gameplay loop."
          },
          {
            type: "paragraph",
            text: "A conversation can directly cause time to pass, move the player elsewhere, or alter what becomes available next."
          },
          { type: "divider" },
          { type: "heading", text: "Global State System" },
          {
            type: "paragraph",
            text: "Entangled uses a persistent GlobalFlags ScriptableObject to track the player's session state."
          },
          {
            type: "list",
            title: "The global state includes information such as",
            items: [
              "Story flags",
              "Relationship variables",
              "Money",
              "Character statistics",
              "Current location",
              "Calendar state",
              "Discovered destinations",
              "Event completion",
              "Route-specific decisions"
            ]
          },
          {
            type: "paragraph",
            text: "The ScriptableObject begins from an authored set of default values and remains available to the game's scene-spanning managers."
          },
          {
            type: "paragraph",
            text: "This creates a shared source of truth for systems that need to respond to prior player actions."
          },
          { type: "heading", text: "Boolean and Integer Flags" },
          {
            type: "paragraph",
            text: "The state model supports both Boolean and integer values."
          },
          {
            type: "list",
            title: "Boolean flags are appropriate for binary conditions such as",
            items: [
              "A person has been introduced",
              "A destination has been discovered",
              "An event has already occurred",
              "A particular route is active"
            ]
          },
          {
            type: "list",
            title: "Integer flags allow more granular progression, including",
            items: [
              "Relationship values",
              "Repeated interaction counts",
              "Story stages",
              "Currency",
              "Character statistics",
              "Progressive unlock conditions"
            ]
          },
          {
            type: "paragraph",
            text: "Using both types allows the prototype to represent more than simple yes-or-no story branches."
          },
          { type: "heading", text: "Persistent Runtime State" },
          {
            type: "paragraph",
            text: "Global managers use Unity's persistent object lifecycle to survive scene loads."
          },
          {
            type: "paragraph",
            text: "This means that loading a café, home, arcade, or other location does not reset the player's broader session state."
          },
          {
            type: "list",
            title: "Scene changes replace the environment and local interface while retaining",
            items: [
              "Dialogue progression",
              "Calendar values",
              "Global flags",
              "Player statistics",
              "Location state",
              "Narrative unlocks"
            ]
          },
          {
            type: "paragraph",
            text: "This was essential because Entangled treats locations as separate Unity scenes rather than as regions inside one continuous world."
          },
          { type: "divider" },
          { type: "heading", text: "Calendar and Time Progression" },
          {
            type: "paragraph",
            text: "Entangled includes a calendar system that tracks:"
          },
          {
            type: "list",
            items: ["Hour", "Day", "Month", "Season"]
          },
          {
            type: "paragraph",
            text: "Time advances through explicit progression methods rather than relying on a real-time simulation."
          },
          {
            type: "list",
            title: "The prototype defines six recognizable periods",
            items: ["Early", "Morning", "Afternoon", "Evening", "Night", "Late"]
          },
          {
            type: "paragraph",
            text: "This provides the narrative systems with a shared vocabulary for when events occur."
          },
          { type: "heading", text: "Calendar Advancement" },
          {
            type: "paragraph",
            text: "Time can advance in response to gameplay actions, particularly:"
          },
          {
            type: "list",
            items: [
              "Dialogue exit actions",
              "Location transitions",
              "Scripted events",
              "Activities that consume time"
            ]
          },
          {
            type: "paragraph",
            text: "The system progresses through hours, days, months, and seasons while accounting for differing month lengths."
          },
          {
            type: "paragraph",
            text: "This allows the game to represent time as a narrative resource."
          },
          {
            type: "paragraph",
            text: "A choice is not only about what the player says; it may also determine how much of the day remains available."
          },
          { type: "heading", text: "Time as a Narrative Gate" },
          {
            type: "paragraph",
            text: "Although the prototype does not yet contain a full NPC schedule resolver, its calendar already provides conditions that narrative and location systems can react to."
          },
          {
            type: "list",
            title: "Time can be used to determine",
            items: [
              "Whether an activity is available",
              "Whether a destination should be displayed",
              "Which dialogue should be entered",
              "Whether an event can occur",
              "Which story branch should advance",
              "Whether travel should consume part of the day"
            ]
          },
          {
            type: "paragraph",
            text: "This establishes the foundation for a dating-sim structure in which attention and time are limited resources."
          },
          { type: "divider" },
          { type: "heading", text: "Location and Navigation System" },
          {
            type: "paragraph",
            text: "Entangled organizes its world as a collection of discrete named destinations."
          },
          {
            type: "list",
            title: "Locations include places such as",
            items: [
              "Home",
              "The medium's residence",
              "Grocery store",
              "Café",
              "Arcade",
              "Bar",
              "Book-related destinations"
            ]
          },
          {
            type: "paragraph",
            text: "Each location is represented through a closed location identifier and an associated LocationDefinition ScriptableObject."
          },
          {
            type: "paragraph",
            text: "That definition maps the narrative concept of a location to the Unity scene used to present it."
          },
          { type: "heading", text: "Data-Driven Destination Definitions" },
          {
            type: "paragraph",
            text: "Location definitions separate travel data from the buttons or scenes that invoke it."
          },
          {
            type: "list",
            title: "A location can contain information such as",
            items: [
              "Its identifier",
              "Its display name",
              "Its Unity scene",
              "Whether travel advances time",
              "The conditions required to show it",
              "Related discovery flags"
            ]
          },
          {
            type: "paragraph",
            text: "This lets multiple interfaces refer to the same destination without duplicating scene names and rules throughout the project."
          },
          { type: "heading", text: "Menu-Driven Overworld" },
          {
            type: "paragraph",
            text: "The overworld is intentionally menu-driven rather than based on direct character movement."
          },
          {
            type: "paragraph",
            text: "Players choose a destination from an interface containing location buttons. This design emphasizes:"
          },
          {
            type: "list",
            items: [
              "Narrative pacing",
              "Intentional destination selection",
              "Fast access to social encounters",
              "Limited daily decision-making",
              "Reduced travel downtime"
            ]
          },
          {
            type: "paragraph",
            text: "The navigation system is therefore structured around choosing what to do next rather than physically traversing a large map."
          },
          { type: "heading", text: "Conditional Location Availability" },
          {
            type: "paragraph",
            text: "Individual destination buttons can be shown or hidden according to global flags."
          },
          {
            type: "paragraph",
            text: "This allows the world menu to expand as the player learns more about the town. For example, a destination may remain hidden until:"
          },
          {
            type: "list",
            items: [
              "A character mentions it",
              "An introductory event is completed",
              "A relationship reaches a threshold",
              "A story route is selected",
              "A discovery flag is set"
            ]
          },
          {
            type: "paragraph",
            text: "World discovery is represented through narrative progression rather than geographical exploration."
          },
          { type: "heading", text: "Scene Travel Pipeline" },
          {
            type: "paragraph",
            text: "Travel is coordinated through a shared WorldNavigation system."
          },
          {
            type: "list",
            title: "When the player chooses a destination, the system can",
            items: [
              "Update the current-location value",
              "Optionally advance the calendar",
              "Begin a fade transition",
              "Load the corresponding Unity scene",
              "Reconnect persistent managers to the new scene",
              "Present the newly loaded destination"
            ]
          },
          {
            type: "paragraph",
            text: "This makes scene loading part of a controlled gameplay operation rather than allowing individual buttons to call Unity's scene manager without shared state updates."
          },
          { type: "heading", text: "Transition Presentation" },
          {
            type: "paragraph",
            text: "A ScreenFadeController manages the visual transition between scenes."
          },
          {
            type: "paragraph",
            text: "The fade disguises the hard scene boundary and gives location changes a more cohesive presentation."
          },
          {
            type: "paragraph",
            text: "Because the world is split across separate scenes, transition handling is important not only aesthetically but architecturally: it creates a predictable point at which navigation state, time, and presentation can be synchronized."
          },
          { type: "divider" },
          { type: "heading", text: "Interconnected Narrative Systems" },
          {
            type: "paragraph",
            text: "The strongest technical contribution of Entangled is not any one isolated manager."
          },
          {
            type: "paragraph",
            text: "It is the way its core systems connect."
          },
          {
            type: "paragraph",
            text: "A dialogue choice can:"
          },
          {
            type: "list",
            items: [
              "Set a global flag",
              "Change an integer value",
              "Advance the current conversation",
              "End the conversation",
              "Advance time",
              "Unlock a destination",
              "Trigger travel to a new scene"
            ]
          },
          {
            type: "paragraph",
            text: "The destination scene can then:"
          },
          {
            type: "list",
            items: [
              "Reconnect its UI to the persistent dialogue manager",
              "Read the updated global state",
              "Present different dialogue",
              "Display newly available locations",
              "React to the new time period"
            ]
          },
          {
            type: "paragraph",
            text: "This creates a reusable narrative loop:"
          },
          {
            type: "callout",
            text: "Enter a location → speak with a character → make a choice → update state → spend time → unlock or travel somewhere new"
          },
          {
            type: "paragraph",
            text: "That loop is central to the project's identity as a conversational dating sim."
          },
          { type: "heading", text: "Content-Driven Design" },
          {
            type: "paragraph",
            text: "Entangled uses ScriptableObjects to make narrative content editable through Unity rather than encoding every conversation and destination directly in scripts."
          },
          {
            type: "list",
            title: "This supports authoring for",
            items: [
              "Dialogue lines",
              "Dialogue choices",
              "Conditional transitions",
              "Global state changes",
              "Location definitions",
              "Exit actions",
              "Character presentation"
            ]
          },
          {
            type: "paragraph",
            text: "The approach gives design and engineering a shared content model."
          },
          {
            type: "paragraph",
            text: "Narrative content can be assembled and adjusted in the editor while the runtime code remains responsible for evaluating conditions and presenting the result."
          },
          { type: "divider" },
          { type: "heading", text: "Technical Contributions" },
          {
            type: "paragraph",
            text: "Entangled established several reusable systems and patterns:"
          },
          { type: "heading", text: "ScriptableObject-Based Dialogue" },
          {
            type: "paragraph",
            text: "A branching conversation model containing lines, choices, conditional transitions, and exit behavior."
          },
          { type: "heading", text: "Shared Flag Vocabulary" },
          {
            type: "paragraph",
            text: "Boolean and integer flags used to connect dialogue, world navigation, unlocks, and story progression."
          },
          { type: "heading", text: "Persistent Scene-Spanning Managers" },
          {
            type: "paragraph",
            text: "Runtime controllers that preserve narrative and calendar state while location scenes are replaced."
          },
          { type: "heading", text: "Scene UI Rebinding" },
          {
            type: "paragraph",
            text: "A hook-based approach for reconnecting persistent managers to scene-specific TextMeshPro interfaces and presentation components."
          },
          { type: "heading", text: "Data-Driven Navigation" },
          {
            type: "paragraph",
            text: "Location definitions that map story locations to scenes while retaining conditions and time costs."
          },
          { type: "heading", text: "Dialogue-Driven Game Flow" },
          {
            type: "paragraph",
            text: "Exit actions that allow conversations to advance time, update the world, or initiate travel."
          },
          { type: "heading", text: "Narrative Calendar Foundation" },
          {
            type: "paragraph",
            text: "A multi-level calendar supporting hours, days, months, seasons, and six named periods of the day."
          },
          { type: "divider" },
          { type: "heading", text: "Current Prototype Boundaries" },
          {
            type: "paragraph",
            text: "The current Entangled prototype demonstrates:"
          },
          {
            type: "list",
            items: [
              "Branching dialogue",
              "ScriptableObject-authored narrative data",
              "Conditional choice routing",
              "Boolean and integer global flags",
              "Dialogue-controlled state changes",
              "Dialogue exit actions",
              "Calendar progression",
              "Named time periods",
              "Data-defined destinations",
              "Menu-driven location travel",
              "Conditional destination visibility",
              "Scene fade transitions",
              "Persistent scene-spanning state"
            ]
          },
          {
            type: "paragraph",
            text: "The analyzed prototype does not currently demonstrate:"
          },
          {
            type: "list",
            items: [
              "Real-time overworld movement",
              "A complete NPC scheduling and location resolver",
              "Disk-based save and load persistence",
              "Combat",
              "A generalized inventory and item system"
            ]
          },
          {
            type: "paragraph",
            text: "Those systems should not be presented as completed Entangled features."
          },
          { type: "divider" },
          { type: "heading", text: "What Entangled Demonstrates Technically" },
          {
            type: "list",
            title: "Entangled demonstrates the ability to",
            items: [
              "Build a branching narrative runtime in Unity",
              "Represent narrative content through ScriptableObjects",
              "Coordinate state across independently loaded scenes",
              "Connect dialogue decisions to global game progression",
              "Design reusable conditional-routing structures",
              "Manage persistent and scene-local objects together",
              "Treat time as a gameplay and narrative resource",
              "Build data-driven destination navigation",
              "Create editor-authored content pipelines",
              "Connect UI presentation to reusable runtime systems",
              "Establish technical foundations that can later be generalized into engine-independent architecture"
            ]
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
      "imageKey": "",
      ageRestricted: true,
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
      pageTitle: "The Thing about Hilltops",
      detail: {
        eyebrow: "",
        title: "The Thing about Hilltops",
        summary: "(Finished) Psychological Thriller Romance. 72000 words.",
        blocks: [
          {
            "type": "paragraph",
            "text": "The Thing About Hilltops follows Peter Arnold, a kindergarten teacher, aspiring novelist, and deeply fractured man who has built his life around one impossible destination: a green hilltop where the woman he lost might one day take him back. To survive the months leading there, Peter clings to rituals, fantasies, and the dangerous belief that if he can just endure long enough, everything broken inside him will finally make sense. But when a lonely student, a struggling young mother, and a haunting harlequin mask enter his life, Peter is forced to confront a terrifying question: is his hilltop a dream worth chasing, or just another way to avoid living? Part psychological drama, part tragic romance, and part slow descent into the stories we tell ourselves to stay alive, The Thing About Hilltops is about obsession, grief, fatherhood, guilt, and the fragile line between hope and self-destruction."
          }
        ]
      }
    }),
    createCard({
      id: "writing-charon",
      title: "The Son of Charon",
      description: "An urban fantasy story of a forgotten deity.",
      imageKey: "",
      pageTitle: "The Son of Charon",
      detail: {
        eyebrow: "",
        title: "Son of Charon",
        summary: "(Ongoing) Urban Fantasy Romance. Current: 87000 words.",
        blocks: [
          {
            "type": "paragraph",
            "text": "Son of Charon follows Linos, the forgotten younger son of the ferryman of the dead. Punished for a mistake that cost sixteen souls their passage, Linos spends eternity as a collector: invisible to the living, hated by his father, and forced to carry the dead inside the stitched-open wound across his body. Then Selene sees him. For the first time in centuries, Linos is not just a monster in the dark. He is a man. Awkward, wounded, bitter, funny, and desperate for something beyond duty. As Selene pulls him into the world of the living, the souls inside him begin to change him too, especially one voice that refuses to be just another passenger. Caught between love, death, obligation, and the dangerous possibility of becoming human again, Linos must decide what he is willing to lose for the chance to be more than Charon’s son. Darkly romantic, tragic, mythological, and deeply strange, Son of Charon is a story about grief, identity, and the brutal cost of being seen."
          }
        ]
      }
    }),
    createCard({
      id: "writing-dylanisms",
      title: "Dylanisms",
      description: "The story of a man going insane, desperating trying to figure out why.",
      imageKey: "",
      pageTitle: "Dylanisms",
      detail: {
        eyebrow: "",
        title: "Dylanisms",
        summary: "(Ongoing) Psychological Thriller Romance. 30000 words.",
        blocks: [
          {
            "type": "paragraph",
            "text": "Dylan McCone is not thriving. He says he is, but Dylan says a lot of things. He says them from the safety of a ruined couch, through a haze of jokes, old heartbreak, and spirits only he can see. Then one strange day, Dylan meets a woman who makes him want to paint again—and the world around him begins to take notice. What follows is not a clean love story. It is a supernatural unraveling. Part confession, part comedy, part descent into the ugly little desires people pretend they don’t have. As monsters and mystical forces push Dylan toward the life he thinks he deserves, he must decide what kind of man he is willing to become to get it. Dylanisms is a story about temptation, loneliness, love, and the brutal difference between wanting something and being worthy of it."
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