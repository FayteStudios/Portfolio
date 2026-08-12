import { createCard } from "./createCard.js";

export const gamesCards = [
  createCard({
    id: "games-fayte",
    title: "Fayte",
    description: "A world that remembers what you did to it.",
    imageKey: "",
    pageTitle: "Fayte",
    detail: {
      eyebrow: "",
      title: "Fayte",
      summary:
        "A persistent online RPG where you dig the tunnels, lay the floors, claim the land and set the locks. No classes. No levels handed to you. Just a million tiles of shared world, twenty layers deep, and whatever you decide to make of it.",
      blocks: [
        {
          type: "paragraph",
          text: "Skill-based, not class-based. A world you can physically change. Everything player-driven."
        },
        {
          type: "linkButton",
          href: "/FayteLauncher/",
          label: "Download the Launcher"
        },
        { type: "divider" },
        { type: "heading", text: "Pick a life, not a class" },
        {
          type: "paragraph",
          text: "You start with the skills you chose and nothing else. Forty-one of them, from Sword and Destruction Magic to Blacksmithing, Locksmithing, Fishing and Appraisal, and nothing stops you learning outside your lane later. Your Strength decides how much you can carry and how big your bag is. Your Charisma decides what a shopkeeper charges you. Your Luck shows up quietly everywhere — in a hit, in a loot roll, in whether a guard notices you."
        },
        {
          type: "paragraph",
          text: "Nobody is a \"warrior\". People are the sum of what they've actually done."
        },
        {
          type: "twoColumn",
          leftTitle: "Fight",
          leftText:
            "Twelve weapon and defensive skills, sixteen damage types, and a hit that has to get through your evasion, your armour and your sheer toughness before it means anything.",
          rightTitle: "Make",
          rightText:
            "Ore comes out of walls. Bars come out of forges. A good smith puts sockets in what they make and a bad one wastes the iron."
        },
        {
          type: "callout",
          title: "Take",
          text: "Pick pockets, pick locks, and find someone crooked enough to buy what you're carrying. The watch is looking for you, and every guard in town works it out on their own."
        },
        { type: "divider" },
        { type: "heading", text: "Twenty layers deep, and all of it is yours to move" },
        {
          type: "paragraph",
          text: "Mine into the rock and the tunnel stays mined. Lay a floor above ground and you've built a second storey — but only where something below can hold it up. Dig stairs. Claim a plot. Put a chest on it and fit a lock only your key opens."
        },
        {
          type: "paragraph",
          text: "A thousand tiles by a thousand, and it loads around you as you walk, so the far side of the map costs nothing until somebody's standing on it."
        },
        { type: "divider" },
        { type: "heading", text: "An hour is a day" },
        {
          type: "paragraph",
          text: "Dawn to midnight in sixty real minutes, on a smooth curve rather than a switch. Shops keep hours. NPCs go to the forge in the morning and the tavern at night, because that's what their day says. Seasons turn, and what grows turns with them."
        },
        {
          type: "paragraph",
          text: "Carry a torch and it spills light in every direction. Carry a hooded lantern and it throws a cone in front of you, and the dark behind you stays dark."
        },
        { type: "divider" },
        { type: "heading", text: "They remember you personally" },
        {
          type: "paragraph",
          text: "Every character you meet keeps their own opinion of you, and it survives their death and yours. Do a smith a favour and it counts twice: once with him, once with everyone who counts him as one of theirs."
        },
        {
          type: "paragraph",
          text: "Standing runs eight rungs from Hated to Exalted, and not everyone offers the full ladder. You can be tolerated by bandits. You will never be honoured by them."
        },
        {
          type: "callout",
          text: "Conversations open and close based on who you are. If you don't qualify for a line, you don't see it greyed out. You just never knew it was there."
        },
        { type: "divider" },
        { type: "heading", text: "Guilds, banks, boards and sieges" },
        {
          type: "paragraph",
          text: "Form a guild and it levels as its members do, unlocking another bank tab each time, each tab locked to a rank you set. Post a bounty on the board and the reward is held in escrow before the posting goes live, so a board can never promise what it can't pay."
        },
        {
          type: "paragraph",
          text: "Trade face to face across a two-panel window where nothing moves until both of you confirm, and any change un-readies both sides."
        },
        {
          type: "paragraph",
          text: "And when the horns go up, a siege doesn't care who your friends are. It's a leaderless roster, however many people show, with waves that scale to who actually turned up."
        },
        { type: "divider" },
        { type: "heading", text: "Built to be broken open" },
        {
          type: "paragraph",
          text: "Nothing in Fayte is hardcoded. Every item, creature, spell, recipe, quest and tile is a set of small facts attached to a thing. A sword isn't a sword — it's something that carries damage, a governing skill, a range and a durability rule. Change one of those facts and you get a genuinely different object, and every system in the game already knows how to handle it."
        },
        {
          type: "paragraph",
          text: "That's why a pickaxe wears down both from mining and from being swung at somebody. Why a pack animal is just a tame with high Strength. Why a magical bridge is an ordinary plank with the support requirement switched off."
        },
        {
          type: "paragraph",
          text: "It's also why the world can keep growing without the rules underneath it getting more complicated."
        },
        { type: "divider" },
        { type: "heading", text: "Two things we left out on purpose" },
        {
          type: "paragraph",
          text: "You don't lose everything when you die. The game this one grew out of took your gear and your progress, and all it ever produced was careful, boring play. Death here is a full heal and a walk back from your bind point. The risk is what you were carrying and how far out you were."
        },
        {
          type: "paragraph",
          text: "Your bag isn't a puzzle. No shape-fitting, no rotating a breastplate to make it fit. What limits you is weight, and weight ties to a stat you can actually train."
        },
        { type: "divider" },
        { type: "heading", text: "The world's already running" },
        {
          type: "paragraph",
          text: "Fayte is in closed beta on a live server. Grab the launcher once and it keeps itself up to date from then on."
        },
        {
          type: "linkButton",
          href: "/FayteLauncher/",
          label: "Download the Launcher"
        }
      ]
    }
  }),

  createCard({
    id: "games-hearth-and-harvest",
    title: "Hearth and Harvest",
    description: "A card game about growing something worth keeping.",
    imageKey: "",
    pageTitle: "Hearth and Harvest",
    detail: {
      eyebrow: "",
      title: "Hearth & Harvest",
      summary:
        "Raise animals. Work the land. Court the neighbours. Two farms, one table, and no way to win except by finishing what you started.",
      blocks: [
        {
          type: "linkButton",
          href: "/HnHLauncher/",
          label: "Download for Windows"
        },
        { type: "divider" },
        { type: "heading", text: "Nine slots. One farm." },
        {
          type: "paragraph",
          text: "Your land is three squares by three. Every crop you plant is a barn you didn't build, and every animal you keep is a stack of ore you can't store. What you grow is the whole strategy."
        },
        { type: "heading", text: "Nobody attacks anybody." },
        {
          type: "paragraph",
          text: "There is no combat, no life total, and nothing that burns your farm down while you watch. You win by finishing three Goals before your opponent finishes theirs — and their progress is face up on the table the entire time."
        },
        { type: "heading", text: "The town is full of people." },
        {
          type: "paragraph",
          text: "Eleven characters to play as, and a whole town to get to know. Bring someone the things they like often enough and you'll end up married — which, as it happens, is one of the fastest ways to win."
        },
        { type: "divider" },
        { type: "heading", text: "How a match goes" },
        {
          type: "list",
          title: "1. Build your deck",
          items: [
            "Forty cards, one character, one tool. Pick two regions out of seven and commit to them."
          ]
        },
        {
          type: "list",
          title: "2. Work your land",
          items: [
            "Plant, water, feed, mine, fish, cook, sell. Every turn leaves your farm a little better than it was."
          ]
        },
        {
          type: "list",
          title: "3. Finish three Goals",
          items: [
            "Own a fully upgraded tool. Ship ten crops. Marry the baker. Third one wins."
          ]
        },
        { type: "divider" },
        { type: "heading", text: "The regions" },
        {
          type: "list",
          items: [
            "Farm — Chickens, cows, crops, and the barn to keep them in.",
            "Town — Shops, neighbours, and everything you can't grow yourself.",
            "City — Money, festivals, and people with expensive tastes.",
            "Vineyard — Grapes, wine, and the patience both require.",
            "Mountain — Ore, the forge, and tools worth carrying.",
            "Forest — Foraging, herbs, and the occasional mushroom you shouldn't eat.",
            "Beach — Fish, sun, and a slower way to make a living."
          ]
        },
        {
          type: "callout",
          text: "A deck runs two regions. Choosing which two is the first real decision you make."
        },
        { type: "divider" },
        { type: "heading", text: "Who are you this time?" },
        {
          type: "paragraph",
          text: "Eleven characters, each with their own way of starting a farm — and each with their own reasons for being in town. Olivia turns up with a chicken already under her arm. Maliki brings his own tools. Trisha reads ahead."
        },
        { type: "divider" },
        { type: "heading", text: "Get Hearth & Harvest" },
        {
          type: "paragraph",
          text: "Install the launcher once. It keeps the game up to date, and signs you in with Google or with a username and password — your choice."
        },
        {
          type: "linkButton",
          href: "/HnHLauncher/",
          label: "Download for Windows"
        }
      ]
    }
  })
];
