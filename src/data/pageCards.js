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
      pageTitle: "About",
      detail: {
        eyebrow: "",
        title: "",
        summary: "",
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