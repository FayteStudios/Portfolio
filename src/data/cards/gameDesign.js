import { createCard } from "./createCard.js";

export const gameDesignCards = [
  createCard({
    id: "fayte",
    title: "Fayte",
    description: "A persistent world players are allowed to change.",
    imageKey: "",
    pageTitle: "Fayte",
    detail: {
      eyebrow: "",
      title: "Fayte",
      summary:
        "A 2D tile-based, top-down persistent-world multiplayer RPG in the lineage of RPGWO and Ultima Online. Skill-based rather than class-based, item-centric rather than menu-driven, and built around a shared world players can take apart.",
      blocks: [
        { type: "heading", text: "The shape of the game" },
        {
          type: "paragraph",
          text: "You make a character and walk into a shared world of a thousand tiles by a thousand, twenty vertical layers deep. There are no classes. What you are is the sum of the skills you picked at creation, the attributes you have spent experience on, and whatever you are carrying."
        },
        {
          type: "paragraph",
          text: "The world is mutable in a way most modern RPGs aren't. Players claim land by the plot, lay and pull up floor tiles, dig stairs between levels, mine into cave walls for ore, place structures and containers, lock what they own, decorate terrain, run shops, form guilds and fight over territory. A siege that rolls through a town hits the same tiles somebody paid for."
        },
        { type: "heading", text: "The pillars I hold it to" },
        {
          type: "paragraph",
          text: "The server decides everything. The client sends intent — an id, a slot, a direction, a tile. It never sends a damage number, a price, a hit result or a stat. Every derived value is recomputed server-side. That isn't only an anti-cheat position; it's what keeps the rules a single readable thing instead of a negotiation between two codebases."
        },
        {
          type: "paragraph",
          text: "Content is data, not code. Items, abilities, recipes, creatures, quests, tile kinds, sieges, sound and animation are all authored in files. Adding a new sword is writing an entry, not writing a class."
        },
        {
          type: "paragraph",
          text: "One implementation per concept. Where two systems do nearly the same thing, they get merged rather than duplicated. Crafting is an action. A recipe is an action. A spell is an action. Owning a plot of land and owning a dropped item are the same interface. A player's wallet, a shopkeeper's till and a guild's vault are the same interface. That matters to design and not just to code, because a rule written once applies everywhere and a system can't quietly drift from its twin."
        },
        { type: "divider" },
        { type: "heading", text: "The module system" },
        {
          type: "paragraph",
          text: "This is the core idea, and everything else is downstream of it. An entity is an id and a bag of modules, and a module is one fact. A sword is not a \"Sword\" — it is a thing carrying Weapon, WeaponDamage, WeaponSkill, Durability, AttackSpeed and SkillRequirement. A door carries BlockMovement, BlocksSight, LightTransmission, Openable and Security. A shopkeeper carries Trader, ShopStock, Schedule and NotStealable."
        },
        {
          type: "paragraph",
          text: "Items, item instances, characters, character definitions, tiles, actions, and even dialogue nodes and their reply options all use the same bag. Roughly eighty item modules, sixty action modules and twenty-six effects are the whole authoring vocabulary of the game."
        },
        {
          type: "paragraph",
          text: "The rule I hold the system to is that a module breaks a condition or an effect down to a base state many situations can call on. If every new feature grows its own bespoke module, the point is lost. The content checker enforces it — it will fail a build for a fact expressed two different ways."
        },
        { type: "heading", text: "What that buys the design" },
        {
          type: "list",
          title: "Combinations nobody sat down and authored still work",
          items: [
            "A pickaxe is a tool in a weapon slot, so it carries a durability trigger of Attack and Use, and wears from both mining and swinging. Nothing special-cased it; both triggers are simply present.",
            "A storage mule is a passive tamed animal with high Strength. Inventory size scales off Strength for every character, so no pack-animal system had to exist.",
            "A magical bridge is a plank with one flag flipped. Laying floorboards requires structural support below; an item that lays floor can set RequireSupport to false, and now it spans open air.",
            "Wall pieces are one verb, not many. A single \"lay a wall\" action offers a choice of corner or straight run, and the answer substitutes into the effect. One authored verb covers as much art as you want to draw.",
            "An enchanted sword and a plain one never merge in a stack, because every instance owns a full private copy of its definition's modules and stack merging compares whole module bags rather than ids."
          ]
        },
        { type: "heading", text: "Worked example: durability" },
        {
          type: "paragraph",
          text: "Durability is the single source of condition for every item, and it carries a trigger flag. A weapon authors Attack and wears when swung. Armour authors Damaged and wears when struck. A tool authors Use. A pickaxe authors both Attack and Use. The check lives on the module itself, so a new call site cannot forget to ask."
        },
        {
          type: "paragraph",
          text: "Before that was unified, durability lived both on the equipment slot and in its own module — the wear mechanic read one, the inspect window read the other, and a sword could sit at 200/200 for a full session while genuinely degrading. One fact, one place."
        },
        {
          type: "paragraph",
          text: "A broken item grants nothing. Worn-out gear keeps its slot but contributes no passive bonus at all until repaired. A chestplate giving 14 defence and +5 sword gives zero of both while broken. That is deliberate economic pressure toward repairmen, and toward learning the repair trade yourself."
        },
        { type: "divider" },
        { type: "heading", text: "Character" },
        {
          type: "list",
          title: "Eight attributes, floored at 10",
          items: [
            "Strength — physical power, carry weight, inventory grid size, and 70% of stamina",
            "Dexterity — precision and accuracy",
            "Agility — speed and evasion, 30% of stamina, movement speed through the Run skill",
            "Vitality — health maximum and regeneration, baseline damage mitigation",
            "Intelligence — magical power, spell book capacity",
            "Wisdom — mana maximum and regeneration",
            "Charisma — shop pricing and social checks",
            "Luck — combat hit and evade, loot rolls, the stealth gap, thieving"
          ]
        },
        {
          type: "paragraph",
          text: "Stamina deliberately doesn't key off Vitality. Its real drains are weapon swings and wading through water, which read as endurance rather than toughness. More importantly, keying everything to Vitality forced non-combat builds — traders, crafters — to invest in a stat with no other payoff for them. Strength is the most widely shared attribute across the physical trades and already governs carry weight, so it earns its place on a crafter's sheet honestly. Agility takes the minority share so evasion-leaning fighters aren't shut out."
        },
        {
          type: "list",
          title: "Forty-one skills across five categories",
          items: [
            "Combat — Evasion, Magical Resistance, Stealth, Brawling, Sword, Dagger, Staff, Spear, Scythe, Mace, Bow, Throwing, Shield",
            "Magic — Tome, Orb, Destruction, Recovery, Enhancement, Nature, Necromancy, Summoning",
            "Crafting — Fletching, Construction, Alchemy, Tailoring, Cooking, Blacksmithing, Goldsmithing, Tinkering",
            "Gathering — Mining, Fishing, Botany, Hunting",
            "General — Thieving, Locksmithing, Deception, Appraisal, Linguistics, Survival, Run, Perception"
          ]
        },
        {
          type: "paragraph",
          text: "Each skill declares a weighted map of attribute influences plus a divisor. Your base level is the weighted sum of the governing attributes, pulled down by the divisor so a well-built fresh character lands somewhere around 50 to 70 rather than skipping content tiers purely through attribute allocation. Earned levels and gear bonuses stack on top of that base."
        },
        {
          type: "paragraph",
          text: "Survival, Run, Perception and Linguistics are granted to everyone. They're never offered at creation, never cost points, and can't be specialised. They're the baseline competence a person has. Specialisation is chosen at creation and halves the experience needed per level in that skill."
        },
        {
          type: "paragraph",
          text: "Skill experience comes from four places, kept deliberately separate: landing an auto-attack trains the weapon's governing skill scaled by damage dealt, crafting trains the recipe's craft skill with a reduced award on failure, moving a tile trains Run, and casting an ability trains its governing skill from the resource actually spent."
        },
        {
          type: "paragraph",
          text: "Deriving casting experience from spend rather than a hand-written per-spell number means no spell carries an authored progression value, an expensive spell trains faster for free, and cost reduction becomes a genuine trade — a focus that makes your spells cheaper makes them train you slower."
        },
        { type: "heading", text: "Burden and inventory" },
        {
          type: "paragraph",
          text: "Maximum burden is 400 plus 40 per point of effective Strength. Go over it and you're Overburdened: forced to minimum movement speed, with hit chance and evade chance both halved. Go over double and you're Crushed, and can't move or pick anything up until you drop something. Items in a chest or a guild bank never count — only what you carry or wear."
        },
        {
          type: "paragraph",
          text: "The bag starts at 6 × 4 and grows with Strength on alternating milestones every 50 points: odd milestones add a row, even ones add a column. A shrink can never cut off an occupied cell — the grid simply refuses to contract past what's placed until you vacate those cells. Items are never destroyed or made unreachable."
        },
        { type: "heading", text: "Two grief vectors closed in the design" },
        {
          type: "paragraph",
          text: "Power-levelling: a helpful buff from another character is scaled down by the level gap between caster and target, falling off linearly across fifty levels of difference. Debuffs, damage and self-buffs are never scaled."
        },
        {
          type: "paragraph",
          text: "Cap-stripping: gear can carry attribute or skill caps, and cap enforcement measures your personal effective level, excluding buffs another character put on you. Without that, an opponent could buff you past your gear's cap to force your equipment off mid-fight. Buffing a PvP opponent additionally requires their consent."
        },
        { type: "divider" },
        { type: "heading", text: "Combat" },
        {
          type: "paragraph",
          text: "Auto-attack runs the same pipeline for players and NPCs, in a fixed order: target, stun check, protected-target check, crime triggers, friendly fire, PvP resolution, broken weapon, ammunition, range, line of sight, resource cost, stealth check, then hit, evade and damage."
        },
        {
          type: "list",
          title: "The numbers",
          items: [
            "Hit chance is 70 plus weapon skill × 1.5, plus stealth bonus and Luck, clamped between 20 and 95",
            "Evade chance is defender Evasion × 0.4 plus Luck, clamped between 0 and 50",
            "Damage rolls the weapon range, multiplies by a skill multiplier, then subtracts defence skill mitigation, flat armour, percentage armour and a Vitality term",
            "The skill multiplier's ceiling is keyed to the level difference rather than to raw skill, so a grandmaster doesn't scale indefinitely against low-level targets"
          ]
        },
        {
          type: "paragraph",
          text: "Sixteen damage affinities split into two groups. Physical — None, Cut, Thrust, Bask, Slash, Crush — is mitigated by Evasion. Magical — Fire, Ice, Earth, Water, Lightning, Air, Light, Dark, Void, Nature — is mitigated by Magical Resistance. There's no separate physical-defence skill; Evasion doubles as the dodge roll and the mitigation stat, which keeps a defensive build from needing two parallel investments."
        },
        { type: "heading", text: "Weapons" },
        {
          type: "paragraph",
          text: "A weapon is an item carrying whichever modules apply: a damage roll with an affinity, a governing skill, a range, a resource cost per swing, swing pacing, whether it takes both hands, whether it needs line of sight, an area shape, the ammunition it needs, a magic-power multiplier for casters, or a PvP-only flag. An item may carry several damage rolls."
        },
        {
          type: "paragraph",
          text: "Ammunition must sit in the Ammo equipment slot. A quiver in the bag doesn't feed a bow the same way a sword in the bag doesn't swing. One unit per shot, checked before range and cost so an empty quiver reads as \"you're out of arrows\" rather than a generic refusal. Bows, crossbows and throwing weapons all use the one mechanic, and authored NPC archers consume real arrows too."
        },
        {
          type: "paragraph",
          text: "Line of sight is an explicit weapon flag rather than something inferred from the weapon type. A real line trace runs at a single Z level and stops at the first tile or barrier that blocks sight. Melee ignores terrain between attacker and target entirely. I'd rather a designer decide which weapons care than have the engine guess."
        },
        {
          type: "paragraph",
          text: "Cleaving is wide, not free. An area weapon splashes onto every other live enemy in its shape, reusing the primary swing's already-rolled hit — cleaving isn't also more reliable — with no extra durability charge and no extra experience. A splash kill still produces full loot, quest credit and reputation."
        },
        { type: "heading", text: "Cast time" },
        {
          type: "paragraph",
          text: "Cast time is a real server-ticked channel, not a cosmetic delay folded into a cooldown. Starting a cast registers it and broadcasts it to everyone, so casts are visible counterplay. Costs are spent at resolution rather than at the start, so an interrupted cast never reaches its tick and nothing was spent. Interruption comes from taking damage, from moving, or from cancelling."
        },
        {
          type: "paragraph",
          text: "Casts can scale on an attribute: every point above the floor shortens the cast. Scaling can only ever shorten, never lengthen, and there's a hard 0.3-second floor no content can undercut. Without it, a mistaken authored minimum turns a spell with a real cast window into an instant unavoidable nuke and defeats the mechanic entirely."
        },
        { type: "heading", text: "Death, PvP and loot" },
        {
          type: "paragraph",
          text: "Players get a full heal and a respawn at their bind point. Creatures are discarded and, if they respawn, come back at the home position captured once when they were created and never overwritten. Companions are downed rather than deleted — they can't be re-summoned until their downed timer expires, and a later summon fully heals them. Losing a pet you've invested in should be a setback, not a deletion."
        },
        {
          type: "paragraph",
          text: "PvP resolves in a fixed order: a global force-on toggle, then the plot's own override, then town land being safe, then — in the open world — both characters having opted in. Safe zones always protect regardless of opt-in; forced zones always allow regardless of it. Party members, guild members and siege co-participants can never harm each other."
        },
        {
          type: "paragraph",
          text: "Each item on a killed creature rolls independently against its own drop chance, modified by the killer's Luck. Ownership is damage-weighted and rolled independently per dropped item rather than once for the whole kill, which naturally produces \"more damage dealt, better odds on the rare drop\" without a separate rarity-boost formula bolted on. A claim decays with both time and distance, and an offline or unreachable claimant counts as maximally far, so a claim can never permanently lock an item on the ground."
        },
        {
          type: "list",
          title: "Party loot modes, applied only when every contributor to a kill is in the same party",
          items: [
            "Free Drop — any member may take any drop immediately",
            "Role Priority (default) — damage-weighted, tripled for a contributor actually trained in a skill the item cares about, with a 20-second exclusive head start for the winner",
            "Leader Only — the leader owns everything, to redistribute manually"
          ]
        },
        { type: "divider" },
        { type: "heading", text: "Items, crafting and the trades" },
        {
          type: "paragraph",
          text: "A recipe is an action carrying a crafting module: a governing skill, a required level, and a list of ingredients with quantities. There is no separate recipe system. Success is 75% at exactly the requirement, five points worse per level below, and guaranteed five levels above. Failure isn't binary — a recipe can author a partial output, a list of what still gets consumed, and an amount of damage dealt to the crafter."
        },
        {
          type: "paragraph",
          text: "Output sockets are earned: one per ten skill levels above the requirement, capped at ten. An overqualified smith making a low-tier item produces a better instance of it rather than just a guaranteed one, but the cap stops a grandmaster flooding the game with early-tier gear that outscales later tiers."
        },
        {
          type: "paragraph",
          text: "A recipe can offer a choice. Two iron bars become a sword blade, a flail head or a pickaxe head from one authored recipe — the classic shape from the genre — rather than three recipes with identical ingredients. The prompt appears after every gate that could refuse the craft and before any resource is deducted, so cancelling costs nothing."
        },
        {
          type: "paragraph",
          text: "NPCs craft through the identical function players do. A hired smith runs the real validated crafting path, not a simulation of it. A separate NPC-only resolver would have drifted from the player rules within a month."
        },
        { type: "heading", text: "Repair, and why there are two paths" },
        {
          type: "paragraph",
          text: "A repair kit has no gate, repairs a flat authored amount, is consumed, teaches nothing and cannot fail. The repair trade needs a skill level to attempt at all, scales with that skill, requires the tool in hand without consuming it, teaches skill experience — half of it even on a failure — and can fail. A kit is something anyone can buy and spend. The trade is a trade. Keeping both is what makes \"find a repairman, or learn it yourself\" a real choice instead of a shop trip."
        },
        { type: "heading", text: "Mining and fishing" },
        {
          type: "paragraph",
          text: "Walking into an unmined cave wall attempts to mine it. Mining is a consequence of movement rather than a separate verb, which is how the genre it comes from handles it. Setting an item on a wall blocks it from being auto-mined, so you can protect a face you're working."
        },
        {
          type: "paragraph",
          text: "Success sits at 80% at the ore's required level and moves one point per level of difference — certain twenty levels above, impossible eighty below, with the whole curve multiplied by depth so the same ore is harder further down. The curve is deliberately shallow on purpose. An earlier version sat at 50% and moved five points per level, reaching certainty just ten levels up; since ore is authored at low required levels, any trained miner succeeded on every swing on everything reachable. The check ran, it just never said no, which in play reads as the skill not existing."
        },
        {
          type: "paragraph",
          text: "Fishing derives what's biting from the body of water itself — its depth and what kind of body it is — rather than from a hand-placed fishing-spot marker. A fish can be bound to a depth band, a kind of water, one specific lake, or an hour window, so a nocturnal deep-lake fish is a real thing to go looking for. A spot tires: ten fish from one tile and it's done until the day turns. Fishing shouldn't be a place you stand for hours."
        },
        { type: "divider" },
        { type: "heading", text: "Stealth, thievery and justice" },
        {
          type: "paragraph",
          text: "There is no hidden/visible flag. Every observer computes their own opacity for every stealthed subject from the gap between the subject's Stealth and their own Perception, recomputed each AI tick and pushed per observer-subject pair. Your own character has an opacity floor so you never lose yourself on screen even when nobody else can see you at all."
        },
        {
          type: "paragraph",
          text: "One function gates combat engagement, pickpocketing and NPC aggro acquisition — three systems, one rule. Luck is applied to the gap rather than only to the random branch, so it affects the hard threshold and the probability curve consistently. Being spotted breaks stealth globally and locks you out of re-entering it for ten seconds, and the sneak-attack hit bonus uses your pre-check state, so a swing that gives you away still gets its bonus."
        },
        {
          type: "paragraph",
          text: "Footsteps carry a loudness derived from your gear — cloth is quiet, metal is loud, and your effective noise is the loudest thing you're wearing. An unarmoured character isn't artificially silent."
        },
        { type: "heading", text: "Locks" },
        {
          type: "paragraph",
          text: "Any container can carry a per-instance lock: locked state, difficulty, an optional fitted key, and who set it. Two chests from the same definition lock independently. Access is decided in one place, in an order that is the design rather than an accident: land rights first, then the explicit lock, then a key opening without a roll. A locked chest on your own land still opens for you — a lock exists to stop other people, and being shut out of your own chest by your own lock is a bug, not a feature."
        },
        {
          type: "paragraph",
          text: "Only a lock is pickable. A land-rights refusal isn't a lock problem, and if it were pickable, lockpicking would route around land ownership entirely. Locks are only as good as the locksmith: fitting one rolls its difficulty from the locker's own Locksmithing, give or take ten, with Luck able to cancel a bad roll but never improve a good one. Setting a lock opens a panel that previews the resulting odds, because a raw difficulty number a player can't interpret is worse than none at all."
        },
        { type: "heading", text: "Stolen goods" },
        {
          type: "paragraph",
          text: "Theft is meant to be profitable and costly, and every part of it has a price attached. Thieving always teaches — caught or not, succeeded or not — with the award scaled by how hard the mark was and halved on a failure. Pickpocketing a beggar forever is worthless; the attempt on a hard target is the lesson."
        },
        {
          type: "paragraph",
          text: "Stolen items carry a mark recording the victim. An honest trader refuses them outright. A fence takes them at a third of honest value, and that gap is the entire cost of theft. A fence puts what it buys back on the shelf above what it paid, so it profits on the spread — and the real instance changes hands rather than a fresh copy from the definition, otherwise laundering would be as easy as selling and re-buying. Recovering your own property clears the mark; anyone else buying it keeps it."
        },
        { type: "heading", text: "The watch" },
        {
          type: "paragraph",
          text: "Pickpocketing, attacking a guard, attacking a protected NPC, or attempting a lock you weren't entitled to open all mark you Wanted for ninety seconds and cost you standing with the town you did it in. The crime fires on the attempt, not the success — the act is the crime."
        },
        {
          type: "paragraph",
          text: "There is no propagation code. Every guard's own per-tick target scan picks up Wanted characters independently. That is the mechanism: the word gets around because everybody is watching."
        },
        {
          type: "paragraph",
          text: "Guards arrest rather than kill. The watch truncheon warps a Wanted player to jail instead of damaging them. The sentence grows with their record, is capped so it can never be effectively permanent, and releases them outside town, so walking back in is a decision. Being jailed clears the Wanted flag — the sentence is the punishment, and leaving them Wanted would just have them re-arrested at the gate. Past three distinct offences the guards stop waiting to catch you in the act."
        },
        { type: "divider" },
        { type: "heading", text: "The world" },
        {
          type: "paragraph",
          text: "Twenty vertical layers: nine underground, the surface, ten above. Underground starts as solid cave wall and is mined out. Above ground starts as void and is built into. Void is simply the absence of a tile, which is why it needed no new rules — nothing already treated it as passable."
        },
        {
          type: "paragraph",
          text: "Building upward requires support: a solid tile within a short radius on the layer directly below, plus land rights. Removing a tile turns it back to void and refuses if anything is standing on it or items are sitting on it, so it can never be used to drop a player or their loot through the floor. Where there's a hole above you, the client renders the first solid tile below it, darkened by depth, so you can see down through the gap."
        },
        {
          type: "paragraph",
          text: "Z transitions are stairs and pits only. I built ramp and slope movement, played it, and tore it out — navigating it felt bad in a way no amount of tuning fixed. Stairs and pits are dug with a shovel and create a bidirectional pair."
        },
        {
          type: "paragraph",
          text: "Indoors is a derived fact: a tile exists directly above you. That's the whole rule. Build a roof and the tile below is inside; remove it and it's outside, with nothing to keep in sync and no admin flag to set. Split walls follow from it — a wall piece can hold both views in one image, with the half drawn chosen from where the viewer is standing, which is what makes one wall read as two."
        },
        { type: "heading", text: "Land and territory" },
        {
          type: "paragraph",
          text: "Ownership is per plot — ten tiles square — not per tile. Rights run along one axis (a player with an additional grant list, a guild, or the server) and jurisdiction along another (a town, a region). The distinction that matters in play is between structural actions and use actions: building, crafting, mining and tile editing are refused on land you have no rights to, while picking things up and opening containers aren't blocked by land alone."
        },
        {
          type: "paragraph",
          text: "Placed guild banks and quest boards resolve which guild they serve from whoever owns the ground they sit on, rather than from a baked-in id — so a bank can't be carried into another guild's territory and still open the original guild's storage. And wilderness doesn't begin at a town's fence line: owned land carries a margin of clear ground around it where hostile spawns don't appear."
        },
        { type: "heading", text: "Biomes and generation" },
        {
          type: "paragraph",
          text: "Chunks are classified as Meadows, Forest, Swamp, Mountain, Desert, Ocean or Jungle, and that drives two lotteries with deliberately opposite conventions. Plants with no biome list grow anywhere — restriction is opt-in. Creatures with no biome list never wild-spawn — inclusion is opt-in. The second one is on purpose: every hand-authored NPC defaults to excluded, so nobody ever finds four wild blacksmiths in a swamp."
        },
        {
          type: "paragraph",
          text: "Plants reseed on the Spring and Autumn transitions. Ore is placed inside cave walls deterministically from a persisted seed, so a restart doesn't silently reroll unmined ore out from under a miner."
        },
        { type: "heading", text: "Time, seasons and light" },
        {
          type: "paragraph",
          text: "One real hour is one in-game day, and sky brightness follows a smooth cosine rather than a hard cutover — a quarter at midnight, full at noon. The calendar runs 24-hour days, 7-day weeks, 30-day months, twelve months and four seasons. Hour zero is midnight, so authored schedules read the way players expect. The same hour-window check drives NPC schedules, shop opening hours and quest availability, and it handles windows that wrap past midnight."
        },
        {
          type: "paragraph",
          text: "Light sources can be point or cone — a torch spills in all directions, a lantern hood throws a wedge. A carried light follows the carrier's live facing; a placed one has its facing baked in at placement. Windows pass partial light while still blocking sight, which is one number on the barrier. Whether the sky reaches a tile is computed by walking the void column above it, so digging a shaft lights the floor below."
        },
        { type: "divider" },
        { type: "heading", text: "Creatures, NPCs and companions" },
        {
          type: "paragraph",
          text: "There is no separate NPC class. A character with a definition attached is an NPC; a character without one is a player. Everything downstream — combat, inventory, equipment, skills, experience, dialogue — works on either without special-casing. That single decision is why pets got full parity: they spend their own attribute experience and skill points and have a real drag-and-drop inventory and equipment interface, rather than a cut-down version."
        },
        {
          type: "paragraph",
          text: "Six behaviours — Passive, Aggressive, Defensive, Merchant, Quest, Guard. Hostile ones self-acquire targets within their aggro range, subject to the stealth check, with a leash pulling them back toward home."
        },
        {
          type: "paragraph",
          text: "Scripted combat happens without a behaviour tree. A creature can carry a priority-ordered list of actions with conditions; the engine evaluates top to bottom and the first fully eligible entry wins. \"Prefer this spell beyond three tiles if it's off cooldown, otherwise melee\" is two rows in a file. An empty list means \"just auto-attack\", which is exactly how every creature behaved before the feature existed, so nothing had to be migrated."
        },
        {
          type: "paragraph",
          text: "NPCs run a fixed, structured step vocabulary rather than a scripting language: move to a position, use an action, transfer an item, sweep loose items within a radius into a container, wait, wait until an hour. Both admin-authored routines and player-assigned chores compile into the same step list and run through the same executor. Schedules map hour ranges to routines — home 22 to 6, forge 6 to 18, tavern 18 to 22 — and switch automatically as the day turns."
        },
        { type: "heading", text: "Dialogue" },
        {
          type: "paragraph",
          text: "A branching tree per character. Only nodes marked as roots are candidates for the opening line, tried in order, and the first whose conditions all pass wins. Conditions are the same requirement modules actions use — level, skill, attribute, item possession, resource, faction standing, personal standing with that NPC, quest completion, land ownership. One vocabulary, one evaluator."
        },
        {
          type: "paragraph",
          text: "Options whose conditions fail are omitted entirely rather than greyed out. A reply can carry rewards directly, or trigger an offer, a turn-in, a shop, or a recruitment. The dialogue header shows the NPC's personal opinion of you alongside their faction's standing, so you can read the room before you speak."
        },
        { type: "heading", text: "Quests" },
        {
          type: "paragraph",
          text: "Kill objectives and collect objectives, with hour windows and repeatable variants on cooldowns. The two differ in where they read progress, and that difference is the interesting part. A kill leaves no trace once the corpse is gone, so kills accumulate in a saved tally. A collect objective measures what you're carrying right now — drop the items and it un-completes, pick them back up and it completes again, with no event to miss and no way to desync."
        },
        {
          type: "paragraph",
          text: "Rewards are ordinary action modules — experience, skill experience, items, faction standing, teaching an ability. There's no separate reward code path; a quest turn-in runs the same dispatcher everything else in the game runs."
        },
        { type: "heading", text: "Companions" },
        {
          type: "paragraph",
          text: "Three acquisition paths, distinguished because giving one up behaves differently in each case. A contract companion comes from a dialogue recruitment and creates an independent copy, leaving the original world NPC untouched. A tamed companion converts a live creature in place, keeping its mid-fight state, and giving it up spawns a fresh wild replacement. A created companion is summoned into existence from a definition, so releasing it simply deletes the record."
        },
        {
          type: "paragraph",
          text: "Two caps, because the two failure modes are different. Summons expire on their own, so the danger is concurrency. Companions never expire, so the danger is accumulation. A roster cap bounds how many you can enrol however you got them; a concurrency cap bounds how many stand in the world at once, which is what stops a full roster becoming a private army. The roster cap is checked before the recruitment roll and before any cost is consumed, so a full roster never takes payment and gives nothing back."
        },
        { type: "divider" },
        { type: "heading", text: "Economy" },
        {
          type: "paragraph",
          text: "A currency is an ordinary item flagged as one. Nothing hardcodes gold — a trader deals in whatever its definition names, so a faction's script, a regional coin or a guild scrip all work. Money is a balance in a ledger rather than a stack in your bag, converting the moment you'd otherwise hold it. The coin item still exists, because ground drops and NPC-held gold need to be physical, and the bridge runs both ways. Three ledgers share one interface: a player's wallet, a trader's till, a guild's vault."
        },
        {
          type: "paragraph",
          text: "Opening a shop is choosing a trade option in dialogue. A trader's browsable stock is kept separate from its inventory, so it can never be pulled out through ordinary means. Price falls back to the item's own value when a listing doesn't set one, and the final number blends the Charisma and Linguistics gap between you and the trader with a familiarity bonus — which is what makes Appraisal and Linguistics worth training for a merchant build. Shop hours are real; a trader with a schedule closes."
        },
        {
          type: "paragraph",
          text: "The till is never a real item anywhere, so it can't be pickpocketed or physically taken. Currency is unconditionally rejected as something to sell to a shop, regardless of how that shop is configured — nothing structurally stopped a trader from being authored to buy coins, which would land a genuine pickpocketable currency item in its inventory. Closed at the root rather than by trusting content authors never to make the mistake."
        },
        { type: "heading", text: "Player trading" },
        {
          type: "paragraph",
          text: "A two-panel staged offer where nothing moves until both sides confirm. Any change to either side's offer un-readies both. Past the confirmation screen a change is refused outright rather than slipping a different amount through. Staging only reserves slots; entries are re-resolved live against the offering player's real inventory rather than trusted as a snapshot, which sidesteps the entire class of \"the item vanished when I declined\" bugs by construction."
        },
        {
          type: "paragraph",
          text: "Currency stages separately, since it's a balance rather than a slot, and transfers ledger to ledger with no coin ever minted in between — so a currency trade never depends on either side having a free inventory cell. Only the staked amount is visible to the other side, never the whole wallet."
        },
        { type: "heading", text: "Guilds and the quest board" },
        {
          type: "paragraph",
          text: "Five ranks, leader down to basic member. Promotion is monotonic: you can only set someone's rank to your own plus one, or worse. Rank inflation is structurally impossible by the permission model itself rather than by a runtime check. Guilds level from member activity up to ten, and each level unlocks another bank tab. Tabs carry their own minimum rank, and a locked tab's contents are omitted from the packet entirely rather than greyed out — hiding beats disabling, because otherwise the data sits in the client's memory anyway."
        },
        {
          type: "paragraph",
          text: "The quest board is a placed board whose contents are dynamically created quest notes, each holding an objective and an escrowed reward. Posting is open to any character, not just guild members, and rewards are escrowed before the posting goes live, so a board can never promise something it can't pay. Accepting a posting registers a quest definition on the fly, and kill tracking worked the moment the feature shipped because the tracker can't tell a generated quest from an authored one."
        },
        { type: "divider" },
        { type: "heading", text: "Standing and reputation" },
        {
          type: "paragraph",
          text: "Six independent counters, all surfaced in one tabbed panel: universal, per-town, per-region, per-guild, per-faction, and per-NPC. Personal NPC standing is keyed to the definition rather than to the individual creature, so an opinion survives a respawn and is shared by every instance of a named character. A key appears the first time you've met or affected them, so talking to someone for the first time puts them on your list."
        },
        {
          type: "paragraph",
          text: "Helping an NPC nudges both layers at once — their personal opinion and their faction's standing — with the server resolving the faction so an author only has to name the person. Town and region rewards deliberately carry no territory id: a quest handed in inside a town credits that town without the author naming it, so the same quest survives the NPC being moved or the town being renamed."
        },
        {
          type: "paragraph",
          text: "Thirteen declared factions share an eight-rung ladder from Hated to Exalted, and a faction can override it. Bandits top out at Trusted — you can be tolerated by highwaymen, never honoured by them. A faction can also declare an explicitly empty ladder: wildlife, livestock and summoned creatures do, so kills still tally and stay attributable, but there's no relationship to have with a deer. Rungs can carry unlocks, handed over the first time you reach them, using the identical authoring vocabulary as quest rewards."
        },
        { type: "divider" },
        { type: "heading", text: "Social and sieges" },
        {
          type: "paragraph",
          text: "Parties hold up to eight and are temporary by design — they don't survive a restart. Two joining paths coexist deliberately: friction-free direct add for a friend, and consent-gated invites plus stranger join requests for everyone else. Chat runs global say, whisper, guild, party and system channels, with system messages tagged by category so the client can route them to tabs."
        },
        {
          type: "paragraph",
          text: "Sieges are the fully realised world event. A zone is authored with a centre, a radius, a respawn point, a wave count, a wave cooldown, a monster pool and a boss. The roster is purpose-built rather than reusing the party system: a party's hard member cap and leader semantics don't fit a leaderless, twenty-plus-person ad-hoc group that people wander into and out of."
        },
        {
          type: "paragraph",
          text: "Monster selection scales with the roster's current average level and is recomputed every wave, picking among pool entries whose level band contains it. There's no hardcoded creature list anywhere — a designer adds rows. While in a siege, participants can't harm each other and the siege overrides their respawn point, so a death puts you back in the fight rather than across the map."
        },
        { type: "divider" },
        { type: "heading", text: "Content and authoring" },
        {
          type: "paragraph",
          text: "Everything is authored in thirty-five content files, and all of it is editable from inside the running game: items, NPCs, abilities, skills, attributes, quests, tiles, factions, territories and global tuning, plus files for loot tables, currencies, buffs, companions, summons, chores and schedules, land claiming, jail, progression curves, build costs, autotiles and ornaments."
        },
        {
          type: "paragraph",
          text: "An in-game admin mode covers character stats, item spawning, module and definition authoring, NPC definitions, land and territory, quests, factions, tile kinds, skills, currencies, routines, sprite alignment, sieges and music zones. Anything committed there registers live and writes back to the matching content file — and the writer is a text splice that replaces only the entry being changed, so comments in the file survive. The same controls are hosted outside the game as well, so content work doesn't require standing in the world."
        },
        {
          type: "stats",
          items: [
            { value: "481", label: "Item definitions" },
            { value: "300", label: "Abilities, spells and recipes" },
            { value: "41", label: "Skills" },
            { value: "33", label: "Character definitions" },
            { value: "16", label: "Damage affinities" },
            { value: "1000 × 1000 × 20", label: "World" }
          ]
        },
        { type: "divider" },
        { type: "heading", text: "Where I departed from the lineage" },
        {
          type: "paragraph",
          text: "No permanent death penalty. The classic version of this game loses you gear and progress on death. I tried it and rejected it: it produces cautious, small play and lands hardest on people still learning the systems. Risk lives in what you were carrying and where you have to walk back from, not in a stat you can never get back."
        },
        {
          type: "paragraph",
          text: "No slope or ramp movement. I built elevation transitions and removed them. Navigating them felt bad in a way tuning didn't fix — the pathing was fussy, the depth cues were ambiguous, and every fix made the next thing worse. Level changes are stairs and pits, which read clearly and place cleanly."
        },
        {
          type: "paragraph",
          text: "No inventory shape puzzle. The Tetris-style multi-cell inventory got built and taken out. The tension it creates is administrative rather than interesting, and Burden already carries the \"you can't take everything\" pressure in a way that connects to a stat players actually invest in."
        }
      ]
    }
  }),

  createCard({
    id: "hearth-and-harvest",
    title: "Hearth and Harvest",
    description: "A farming life-sim as a duelling card game.",
    imageKey: "",
    pageTitle: "Hearth and Harvest",
    detail: {
      eyebrow: "",
      title: "Hearth & Harvest",
      summary:
        "A two-player competitive card game about building a farm, a livelihood, and a life in a small country town. 273 cards, nine card types, seven regions, and no way to attack anybody.",
      blocks: [
        { type: "heading", text: "Design intent" },
        {
          type: "paragraph",
          text: "Hearth & Harvest started from a simple question: what would a farming life-sim look like if it were a duelling card game, and what would it have to give up to get there?"
        },
        {
          type: "paragraph",
          text: "The answer I landed on is that it gives up nothing about building and everything about fighting. There is no combat. Neither player has a life total, and no card deals damage to a person. What players race for instead is completion — the three Goals that turn a plot of land into a life worth having."
        },
        {
          type: "paragraph",
          text: "Every turn should build something. A turn spent doing nothing is a turn a player regrets sitting down for. Animals produce, plants grow, ore comes out of the mountain — the board is always slightly richer at the end of your turn than it was at the start, even on a turn where your hand is poor."
        },
        {
          type: "paragraph",
          text: "The pressure comes from the opponent's progress, not from their attacks. Both players' Goal counts are on the table at all times. Knowing your opponent is one Goal away is what makes the last three turns of a match tense, and it does that without either player ever needing to be cruel."
        },
        {
          type: "paragraph",
          text: "Scarcity is spatial, not numerical. The interesting decisions are about where things go. Nine Land slots is enough to feel like a farm and not nearly enough to hold everything you would like to own, so every crop planted is a barn not built, and every animal kept is a stack of ore not stored."
        },
        { type: "divider" },
        { type: "heading", text: "Components" },
        {
          type: "list",
          title: "273 cards across nine types",
          items: [
            "Main Character (11) — your avatar. One per deck, in play from turn one, never leaves.",
            "Goal (25) — the win condition itself. One is active at a time.",
            "Collectable (108) — everything that lives on your land: crops, animals, ore, buildings, products, food.",
            "Action (43) — one-shot plays that resolve and are spent.",
            "Recipe (27) — consumes ingredients you own to produce a stronger effect.",
            "Tool (27) — five tools across five upgrade tiers.",
            "Event (19) — table-wide cards affecting both players, including Seasons and Festivals.",
            "Location (15) — places you visit to work: shops, the beach, the mine, the forest."
          ]
        },
        {
          type: "paragraph",
          text: "A tenth designation, Character, is layered on top of a card's real type. It marks any card that represents a specific named resident of the town — the dating Goals, the townsfolk who set you a task. Character cards are limited to one copy per deck regardless of what else they are, because there is only one Reggie."
        },
        {
          type: "paragraph",
          text: "Every card is printed with a home region: Farm, Town, City, Vineyard, Mountain, Forest, Beach, or Neutral. Regions are the deckbuilding constraint and the flavour axis at the same time. Roughly half the set is Neutral and forms the shared vocabulary of the game; the rest is what makes a Mountain deck feel nothing like a Beach deck."
        },
        { type: "divider" },
        { type: "heading", text: "The table" },
        {
          type: "list",
          title: "Both players sit at mirrored boards with a shared column down the centre",
          items: [
            "Land (3×3) — nine slots. Everything you own that isn't a Goal, a Tool or your Main Character lives here.",
            "Goal — holds your one active Goal.",
            "Ship Bin — where sold cards go. Cards in the bin are out of play and inert.",
            "Main Character — your avatar, and the card that pays your energy each turn.",
            "Tool — your equipped tool.",
            "Deck — your 40-card draw pile, face down.",
            "Event column — five slots in the middle of the table, belonging to neither player. Events and Locations both play here.",
            "Mementos — a gallery behind your Main Character rather than a slot on the table. Completed Goals collect here as permanent passive bonuses."
          ]
        },
        { type: "divider" },
        { type: "heading", text: "Deck construction" },
        {
          type: "paragraph",
          text: "A legal deck is one Main Character, one Starter Tool, and forty cards in the draw pile. At most two non-Neutral regions, since Neutral cards are always legal — that's the central identity choice of deckbuilding, because two regions is enough to have a plan and not enough to have every plan. One copy of any Goal, Tool or Character card; four copies of everything else. Your Starter Tool cannot also appear in the draw pile, and Skylar does not date Skylar."
        },
        {
          type: "paragraph",
          text: "Two categories are deliberately exempt from the region limit. Main Characters, because choosing who you are should never spend one of your two region slots. And dating Goals, which are region-universal — a correction I made after building decks against the constraint. Every townsperson is printed with a home region, and honouring those regions in deckbuilding left several perfectly legal two-region pairings with too few dating Goals to reach the win condition at all. A deck that cannot win is a rules bug, not a difficulty setting."
        },
        { type: "divider" },
        { type: "heading", text: "Setup" },
        {
          type: "list",
          title: "A sequence that finishes completely before the first turn begins",
          items: [
            "Both boards are built: Main Character and Starter Tool into their slots, draw pile shuffled.",
            "Both players draw five cards.",
            "Start-of-game abilities fire. Olivia arrives with a Chicken already on her land; Maliki searches his deck for a Tool and equips it immediately.",
            "Both players may search their deck for a Location and put it straight into play for free — optional, because some decks would rather draw their Locations later.",
            "The player going second is paid 500G.",
            "Turn one begins."
          ]
        },
        {
          type: "paragraph",
          text: "The ordering of those middle two steps matters and is not arbitrary. A Main Character's printed ability is part of who they are, so it resolves before the generic opening search. And nothing is drawn until every opening search has been answered — otherwise the first player's turn-one draw could pull a Location out of a deck the other player is still looking through."
        },
        {
          type: "paragraph",
          text: "Going first is a real advantage in any game of this shape, and paying for it explicitly is cleaner than pretending it isn't there."
        },
        { type: "divider" },
        { type: "heading", text: "Turn structure" },
        {
          type: "list",
          title: "Start of turn",
          items: [
            "Effects that lasted until the start of your next turn end.",
            "Start-of-turn abilities trigger, yours and any active Event's.",
            "The production cycle runs. Mature plants yield their crop; every fed animal produces.",
            "Energy is set. Your Main Character pays it — most of the cast grants 3, Adrian grants 4, Jasmine grants 2.",
            "Draw one card.",
            "Goal progress is recounted."
          ]
        },
        {
          type: "paragraph",
          text: "Energy is the turn's clock. In the main phase you may play a card from hand, activate a card in play, move tokens between your own Land slots, ship a card into your Ship Bin for its printed gold value, gift a token to something that accepts gifts, or move a card into a building — in any order, as often as you can pay for it."
        },
        {
          type: "paragraph",
          text: "At end of turn, end-of-turn abilities trigger and Event durations tick down. Every Event with a printed duration counts down once per player turn, so \"Lasts 2 turns\" is roughly one full round at a two-player table. At zero it leaves the column for its owner's Ship Bin — used up, not sold."
        },
        { type: "divider" },
        { type: "heading", text: "Land and tokens" },
        {
          type: "paragraph",
          text: "A Land slot holds one kind of card at a time. Interchangeable resources — ore, crops, lumber, food — stack into a single slot and display as one card with a count. Anything that does something stays an individual card and occupies its slot alone: animals, buildings, plants, anything that produces, tracks progress, or contains other cards."
        },
        {
          type: "paragraph",
          text: "That split is the whole reason nine slots is a workable number. Twelve Copper Ore is one slot. Three chickens is three. A player who wants both has to decide which one their farm is actually for."
        },
        {
          type: "paragraph",
          text: "Stacks move whole. Dropping a stack on another Land slot moves all of it and merges with a matching stack; dropping a stack on the Ship Bin sells exactly one copy and returns the rest."
        },
        { type: "heading", text: "Money and shipping" },
        {
          type: "paragraph",
          text: "Gold comes from shipping. Every Collectable has a printed ship value — a Turnip is 60G, a Chicken is 750G — and shipping is a real decision rather than a cleanup step, because a shipped card is a card you no longer own and Goals mostly ask what you own."
        },
        {
          type: "paragraph",
          text: "Costs come in three currencies and any card may ask for a mix. Energy is the turn's budget. Gold is the long game's budget. Materials are actual cards on your board, which are consumed and removed from the game — materials spent are not sold, so there is no gold and nothing goes to the bin."
        },
        { type: "heading", text: "Tools" },
        {
          type: "paragraph",
          text: "Five tools — Axe, Hammer, Sickle, Watering Can, Fishing Rod — across five tiers from Base through Copper, Iron and Gold to Mithril. Using one costs energy and produces its output; the Axe yields Lumber, the Watering Can waters your crops."
        },
        {
          type: "paragraph",
          text: "Upgrades are bought at Reggie's Smithy for gold plus ore of the matching grade, and an upgrade replaces the tool rather than handing you a second one. You never own an Axe and a Copper Axe at the same time; you own the Axe you have earned. Owning a fully upgraded tool is itself a Goal condition, which makes the upgrade chain a win path rather than a side quest."
        },
        { type: "heading", text: "Farming and animals" },
        {
          type: "paragraph",
          text: "Seeds are played to Land and watered with a Watering Can. Once a plant has taken enough water it matures at the start of your turn. A regrowing plant stays, and its crop takes a slot of its own. A non-regrowing plant is spent, and the crop takes the slot the plant was in."
        },
        {
          type: "paragraph",
          text: "An animal is fed by gifting it food it likes — chickens want Chicken Feed. A fed animal produces at the start of your next turn and its fed state clears, so livestock is a per-turn commitment rather than a one-time investment. Animals also accumulate hearts, and hearts upgrade what they produce: a Chicken at ten hearts lays a Golden Egg instead of an Egg. Several Festival Goals ask for a ten-heart animal outright, which turns raising one well into its own strategy."
        },
        { type: "heading", text: "Buildings" },
        {
          type: "paragraph",
          text: "Barn (3 animals), Coop (5 chickens) and Hothouse (plants) each occupy one Land slot and house their residents inside. Residents are fully in play — they eat, they produce, they count for Goals — but they are not on the table, so a Coop is five chickens' worth of farm in one slot."
        },
        {
          type: "paragraph",
          text: "Where a building names specific residents, that list is definitive: a Coop lists Chickens, so a Coop takes Chickens. Buildings that name no specific resident fall back to their tags, which is how a Hothouse takes anything planty. Without that rule a Coop and a Barn would be interchangeable, and there would be no reason to print both."
        },
        { type: "heading", text: "Locations, shops and festivals" },
        {
          type: "paragraph",
          text: "Locations play into the shared Event column and are worked by activating them. Resource Locations roll on a table: the Beach yields Fish, the Forest yields blackberries, walnuts and mushrooms — including the occasional poisonous one — and the Mine yields ore across six grades."
        },
        {
          type: "paragraph",
          text: "Shops sell cards for gold, sometimes gold plus materials. Browsing is free and always skippable, and the whole stock is always shown. Entries you cannot afford come back dimmed with the reason attached — \"needs 25G more\", \"needs 3 Copper Ore\" — because you cannot save toward something you have never been shown. A purchase enters play if it has a natural slot and goes to your hand if it does not, so seeds and animals hit the board and a potion goes to hand."
        },
        { type: "heading", text: "Courting" },
        {
          type: "paragraph",
          text: "Dating is a Goal, played face up, and advanced by gifting. Give a townsperson tokens from your land; liked gifts add hearts, and five hearts completes the Goal and awards a marriage Memento. Disliked gifts either do nothing, cost you progress, or are refused outright, depending on who you are courting."
        },
        {
          type: "paragraph",
          text: "Feeding an animal and courting a person run through exactly the same gifting rule. What an animal will eat is written as what it likes, which keeps one system where there could easily have been two."
        },
        { type: "heading", text: "Events, Seasons and Festivals" },
        {
          type: "paragraph",
          text: "The five-slot centre column is shared. Events affect the whole table, resolve on the active player's turn, and count down to their expiry regardless of who played them. When the column is full, playing a new Event bumps an existing one — a real decision, since the thing you displace may be yours."
        },
        {
          type: "paragraph",
          text: "Some Events are hostile in a way nothing else in the game is. Snow switches every Event off while it lies on the table, and Rain waters every crop on both farms and ends any active Season. Playing an Event is the closest thing Hearth & Harvest has to an attack, and it is deliberately blunt and double-edged."
        },
        { type: "heading", text: "Kitchen response windows" },
        {
          type: "paragraph",
          text: "A Kitchen changes when its owner may play a Recipe: on the opponent's turn, in response to something being played. The window opens only if the responder has a Kitchen in play, holds a Recipe they can legally pay for, and it is not their turn. If all three are true, the played card pauses before resolving and the responder may answer. The response resolves first, then the original card. A rope timer bounds it, and letting the rope run out counts as declining."
        },
        {
          type: "paragraph",
          text: "This is a table-top habit made explicit — the moment where someone says \"hold on, before that resolves\". Its reach in this first set is deliberately narrow, and the timing rule exists so that later sets have somewhere to grow into."
        },
        { type: "heading", text: "Mementos" },
        {
          type: "paragraph",
          text: "A completed Goal is not discarded. It turns over and becomes a Memento, and Mementos are permanent passive bonuses that stay with you for the rest of the match: double hearts from gifts, half-price animals, one less water on every crop, a shop that is always open to you."
        },
        {
          type: "paragraph",
          text: "The consequence is that the player who is ahead on Goals is also getting stronger, which shortens the endgame on purpose. A game where the leader's advantage compounds is a game that ends."
        },
        { type: "divider" },
        { type: "heading", text: "Goals and the win condition" },
        {
          type: "callout",
          text: "The third completed Goal wins the match."
        },
        {
          type: "paragraph",
          text: "You hold one active Goal at a time. Complete it, take its Memento, play the next one. Goals come in three families."
        },
        {
          type: "list",
          items: [
            "State-based — true right now, or not. Own a Chicken, a Cow and a Sheep. Own 10 Herbs. Own a fully upgraded Tool. Own 10,000G. These are recounted from the board after every change, so they cannot drift out of step and cannot be gamed by ordering.",
            "Cumulative — counted as it happens, and permanent once counted. Ship 10 Crops. Ship 10 Animal Products. Play 3 Events. These reward a consistent engine rather than a single big turn.",
            "Relational — the dating Goals, advanced by gifting, completed at five hearts."
          ]
        },
        {
          type: "paragraph",
          text: "A handful of Goals sit across the boundaries on purpose. Hotspring asks you to spend 30 Lumber and 25 Stone on building costs, which is a Goal that only completes as a side effect of playing the game well."
        },
        {
          type: "paragraph",
          text: "Why three Goals? Two ends the game before a farm exists. Four regularly runs a 40-card deck dry. Three is the number where a player has time to build something they recognise as theirs and still has to choose which two things they will never get around to."
        },
        {
          type: "paragraph",
          text: "Why is a Memento not itself a step toward victory? Because a small number of cards hand out a Memento directly, and \"gain a Memento\" must never quietly also read \"win a third of the match\". Victory counts completed Goals, and nothing else."
        },
        {
          type: "paragraph",
          text: "Conceding is a real action rather than a way of leaving. It ends the match cleanly, is recorded as a loss, and costs exactly what losing costs — a cheaper concede is a free reroll out of a bad matchup, and a ladder that permits that stops meaning anything."
        },
        { type: "divider" },
        { type: "heading", text: "Design notes" },
        {
          type: "paragraph",
          text: "Stacking exists to make nine slots feel generous and behave strictly. The first version gave every card its own slot, and the board filled before anything interesting happened. The second gave everything a count, and the farm stopped reading as a place. The split — plain resources stack, things that do something don't — is what lets the board show a farm and still be a real constraint."
        },
        {
          type: "paragraph",
          text: "Costs are checked before anything is touched. A Recipe you cannot afford stays in your hand with nothing on the board disturbed. There is no state in this game where you have half-paid for something."
        },
        {
          type: "paragraph",
          text: "Anything a player is not allowed to do is shown, not hidden. Unaffordable shop stock is greyed with the reason. An animal that will not eat what you are holding is greyed with the reason. Hiding an illegal option makes a player think the card is broken; showing it and saying why teaches them the game."
        },
        {
          type: "paragraph",
          text: "Randomness is bounded and forward-facing. The game rolls on resource tables and coin flips — things you chose to do — and never on whether your farm survives. No card destroys another player's board at random. Losing to variance you did not opt into is the failure mode of every card game I built this one to avoid."
        },
        {
          type: "paragraph",
          text: "Both players' progress is public. Goal counts, board state, everything except hands and decks. The information a player needs to decide whether to race or to build is exactly the information that makes the last turns worth playing."
        }
      ]
    }
  }),

  createCard({
    id: "revel",
    title: "Revel",
    description: "A Persona-inspired inventory management rpg.",
    imageKey: "",
    pageTitle: "Revel",
    detail: {
      eyebrow: "",
      title: "Revel",
      summary:
        "A story-driven roleplaying game with turn-based combat, deep characters, and a grid inventory that decides what you are capable of.",
      blocks: [
        { type: "heading", text: "The pitch" },
        {
          type: "paragraph",
          text: "You play a soulless peon of the God of Fate, who tells you to live \"free of destiny\" and then leaves you to work out what that means. You take on bounties, recruit people worth keeping around, and chase the scattered pages of a magical book that might be enough to unmake the Dark God of Tyranny."
        },
        { type: "heading", text: "Where it comes from" },
        {
          type: "paragraph",
          text: "Revel is my answer to Persona. What I keep coming back to in that series is not the combat — it's the way a whole cast of people becomes legible to you over a year of small conversations, and the way tarot symbolism and Jung's ideas about the psyche give those conversations a shape. I want that: turn-based fights, deep NPC storylines, strengths and weaknesses that reward paying attention, a confidant-adjacent relationship system, time you have to budget, and minigames that are worth playing on their own."
        },
        {
          type: "paragraph",
          text: "The other half comes from Backpack Hero. Its bag is the whole game — items have shapes, space is tight, and adjacency turns a pile of junk into a build. Every run feels different because the bag makes it different. I wanted that pressure inside a story game, where the thing limiting you isn't a menu of abilities but what you decided to carry this morning."
        },
        { type: "divider" },
        { type: "heading", text: "Combat" },
        {
          type: "paragraph",
          text: "Fights are turn-based, up to four characters a side. Everything you do comes out of your inventory: damage, healing, buffs, debuffs. Characters act in an order set by their stats until one party is done."
        },
        {
          type: "list",
          title: "Five attributes",
          items: [
            "Strength — physical damage, inventory space, equipment unlocks and proficiency modifiers. Swords and scythes scale off it.",
            "Agility — turn order, hit chance and dodge chance. Bows scale their damage and energy cost off it.",
            "Vitality — hit points and physical defence, and it unlocks effects on armour and shields. Outside combat it shortens how long some tasks take.",
            "Intelligence — magical damage, and how many runes you can commit to a spell. More runes means a stronger effect, and some spells change outright at higher intelligence.",
            "Wisdom — mana pool and magical defence, plus buff and debuff durations. Staves and armour unlock new effects off it."
          ]
        },
        {
          type: "paragraph",
          text: "Characters earn experience for fighting, buffing and generally participating, and level-ups hand out points to spend on attributes. Some characters gain fixed points on top. The player gains two per level where everyone else gains one."
        },
        { type: "divider" },
        { type: "heading", text: "Resources" },
        {
          type: "list",
          items: [
            "Energy and Mana are the two combat currencies. Every character starts their turn with energy, and casters start with mana set by their regeneration. Most actions cost one or both.",
            "Money matters more than it sounds. Items, character storylines and most out-of-combat activities want it, and it comes from missions, relationships, monsters, and honest work in the fields or dishonest work at the dice table.",
            "Runes power spells and special abilities. You craft them, quest for them, or buy them — and some of them look like perfectly ordinary items. They take up bag space like anything else.",
            "Inventory slots are the identity of the game. Most JRPGs give you an unbounded list of gear and skills. Revel only lets you do what you are carrying. If there's no weapon in the bag, you cannot attack.",
            "Time is a resource. Each day has a morning, an afternoon and an evening, and most things worth doing cost at least one of them."
          ]
        },
        { type: "divider" },
        { type: "heading", text: "The bag" },
        {
          type: "paragraph",
          text: "Items come in shapes and sizes, and fitting them together is a real puzzle. Weapons, armour and runes all take space. Spells that generate or consume items need room for the result. Quest items, gifts for NPCs and everything you loot compete for the same grid — so if there's no room for the goblin head, you leave it."
        },
        {
          type: "paragraph",
          text: "Every character in the game has an inventory, monsters included. Loot a corpse and their bag opens next to yours, and you choose what's worth the space. That's the tension I'm after: packing for a fight and packing for the evening you wanted to spend in town are the same decision."
        },
        { type: "divider" },
        { type: "heading", text: "Items" },
        {
          type: "list",
          items: [
            "Weapons carry damage and accuracy, and often a skill or effect of their own. Some NPCs have things to say about what you're carrying. Each weapon type has its own proficiency rank that improves through use, and damage scales with it. You can carry several, if you have the space and the energy to swing them.",
            "Armour defends, and it also signals allegiance. Wear the wrong colours in the right place and people will assume you belong to a faction you don't. Armour is bulky, and only one piece per body slot fits in a bag.",
            "Consumables are anything spent in one use — potions, food, runes. There's no limit beyond space.",
            "Materials feed crafting. Many NPCs want specific ones, so hauling them home is often worth more than selling them.",
            "Quest items belong to a job. Some do something. Some are dead weight you carry anyway."
          ]
        },
        { type: "divider" },
        { type: "heading", text: "Missions, activities and quests" },
        {
          type: "paragraph",
          text: "Missions are the bounty work: kill something, collect something, settle something for an NPC. Activities are everything else — crafting, working, spending an evening with someone. Quests are the main story, and several carry time limits that will close doors on you if you ignore them."
        },
        {
          type: "paragraph",
          text: "The calendar runs a seven-day week and a twenty-eight-day month, with three slots a day. Some things are locked to a particular time or a particular day. Keeping a schedule is most of the strategy outside a fight."
        },
        { type: "divider" },
        { type: "heading", text: "Savvy" },
        {
          type: "paragraph",
          text: "Attributes handle combat; Savvy handles everything else. NPCs, jobs and side content check against them, and they grow from doing the things they describe."
        },
        {
          type: "list",
          items: [
            "Piety — your connection with the gods. Kindness, helping the church, prayer, and time spent with the devout.",
            "Knowledge — your understanding of the world. Trade skills, scholarly company, and riddles.",
            "Avarice — your appetite for riches and power. Taking advantage of people, hoarding what you don't need, and choosing yourself.",
            "Charisma — your ability to make friends. Conversation, social activities, and showing up for people.",
            "Pride — your desire for fame. Extra missions, powerful friends, and difficult bosses."
          ]
        },
        { type: "divider" },
        { type: "heading", text: "Activities" },
        {
          type: "list",
          items: [
            "Smithing turns raw materials into weapons and armour, through a minigame that plays like a card roguelike.",
            "Alchemy turns materials into potions for combat, for the road, or for gifts. Its minigame is a pouring game.",
            "Morning prayer at the church builds piety and puts you next to people worth knowing.",
            "Drinking builds charisma and friendships, and costs money.",
            "Gambling can make you rich or ruin your week. It runs on a dice game I wrote for it.",
            "Cooking turns raw resources into food with day-long benefits, and food makes an excellent gift. The minigame runs on timing.",
            "Farming pays well and takes real time. Its minigame is a stripped-down, high-speed farm sim: plant, water and harvest in the order the order sheet demands.",
            "Deliveries pay while you walk the town, and put you in front of NPCs you'd otherwise miss, with rewards you can't get anywhere else.",
            "Hard labour changes with the month, eats a lot of the day, and pays for it. Its minigame is a stacking puzzle."
          ]
        },
        { type: "divider" },
        { type: "heading", text: "Associates" },
        {
          type: "paragraph",
          text: "Associates are the people you meet and choose to spend time on. Each one is an archetype with ten levels of progression, earned through time together and jobs done for them. Some move faster depending on your attributes, your savvy, the date, how far the story has gone, what you've given them, and who else you've been seeing."
        },
        {
          type: "paragraph",
          text: "That last one is the point. Most Associates contradict another, and every level you gain in one costs a level in its opposite. You cannot have everybody."
        },
        {
          type: "list",
          items: [
            "Hunger, the peasant girl at the church, clawing her way back to a life. Opposes Cultivation.",
            "Cultivation, the farmer who wants help in his fields and is still carrying the wife and son he lost when the city was attacked. Opposes Hunger.",
            "Retribution, the guard captain who has never seen combat and is expected to be a hero. Opposes Protection.",
            "Protection, the loyal drunk who turns out to be the ally you needed. Opposes Retribution.",
            "Heart, the young mage who joins you first and wants everyone to make it. Opposes Evolution.",
            "Evolution, the alchemist offering forbidden knowledge at the price of permanent debuffs. Opposes Heart.",
            "Clarity, the alchemist's wife, who sees straight through him and hands out remedies. Opposes Pestilence.",
            "Pestilence, who arrives late to sow havoc and offers help in a fight at costs you won't like. Opposes Clarity.",
            "Blasphemy, the heretic who says the world is ending and knows things worth having, for a price. Opposes Serenity.",
            "Serenity, the humble priest with no flock left, wondering whether to keep the faith. Opposes Blasphemy.",
            "Guidance, a familiar voice you've forgotten, found deep in a dungeon, who levels quietly as the story goes and can mend a relationship you've let rot. Opposes Betrayal.",
            "Betrayal, the suave rogue who joins the party and teaches you sleight of hand and where the money really is. Opposes Guidance.",
            "Lust, the enemy offering you a seat in a grand order of chaos — an alternate ending, locked until act five and gated hard.",
            "Rage, the duke who has lost the respect of his peers and takes it out on his town."
          ]
        },
        { type: "divider" },
        {
          type: "paragraph",
          text: "There's more written down than fits on one page. I'll keep adding to this as the design settles."
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
      summary:
        "A conversational dating sim where the day is short, the town remembers, and a line of dialogue can spend an afternoon.",
      blocks: [
        {
          type: "paragraph",
          text: "Entangled is built around a small town, a handful of people worth knowing, and a calendar that does not wait for you. Conversations, time and travel aren't three separate features stitched together — they're one loop, and every part of it can move the others."
        },
        {
          type: "list",
          title: "How the pieces connect",
          items: [
            "A dialogue choice can change the state of the world",
            "Ending a conversation can advance the clock",
            "Time and world state decide which places are open to you",
            "Travelling somewhere updates where you are, and what's available there",
            "State survives moving between scenes",
            "Narrative content and destinations are authored as data rather than written into scenes"
          ]
        },
        { type: "divider" },
        { type: "heading", text: "Conversations that have been paying attention" },
        {
          type: "paragraph",
          text: "Dialogue choices can be shown, hidden or redirected based on what has already happened. A conversation knows whether you've met someone, whether you've found a place yet, which route you took last time, how far a relationship has got, whether an event has fired, and where the story currently stands."
        },
        {
          type: "paragraph",
          text: "So a second visit isn't the same tree with the same branches. People pick up where you left off."
        },
        { type: "heading", text: "Choices that change the world" },
        {
          type: "paragraph",
          text: "Dialogue isn't only something to read. A line or a choice can set a flag, clear one, move a number, unlock a destination, record a decision, or mark a story beat as done. That's what lets a conversation in the café change what's waiting for you at home, without every scene needing to know about every other scene."
        },
        { type: "heading", text: "Dialogue as the gameplay loop" },
        {
          type: "paragraph",
          text: "A line can carry an action that fires when the conversation ends: travel somewhere, advance the calendar, start another conversation, change the world state, or trigger an event. That's what makes talking to someone a real move rather than a menu you get through. A conversation can cost you the afternoon."
        },
        { type: "divider" },
        { type: "heading", text: "Time is the thing you're actually spending" },
        {
          type: "paragraph",
          text: "The calendar tracks hour, day, month and season, and the day is divided into six periods everyone in the game shares a name for: Early, Morning, Afternoon, Evening, Night and Late."
        },
        {
          type: "paragraph",
          text: "Time moves in response to what you do — a conversation that runs long, a walk across town, an event, an activity that eats the morning. And once it's moving, it gates things. What's open, what's worth doing, which conversation you get, whether an event can happen at all, and which branch of the story advances."
        },
        {
          type: "paragraph",
          text: "That's the shape a dating sim needs: attention is finite, and choosing to give it to one person is choosing not to give it to someone else."
        },
        { type: "divider" },
        { type: "heading", text: "A town made of places, not terrain" },
        {
          type: "paragraph",
          text: "The world is a set of named destinations — home, the medium's place, the grocery store, the café, the arcade, the bar — and you get around by choosing one, not by walking there."
        },
        {
          type: "paragraph",
          text: "That's deliberate. A menu keeps the pacing tight, makes every trip an intentional decision, puts you in front of people quickly, and spends none of the day on travel that isn't about anything. The question the interface asks is what do you want to do next, not how do you get there."
        },
        { type: "heading", text: "Discovery through story" },
        {
          type: "paragraph",
          text: "Destinations appear as you learn about them. Somewhere stays off the map until a character mentions it, an event introduces it, a relationship reaches a threshold, or a route opens. You find the town by talking to people who live in it."
        },
        { type: "divider" },
        { type: "heading", text: "The loop" },
        {
          type: "callout",
          text: "Enter a location → speak with a character → make a choice → change the world → spend time → unlock or travel somewhere new"
        },
        {
          type: "paragraph",
          text: "That's the whole game in one line, and every system in it exists to make one of those arrows mean something."
        }
      ]
    }
  })
];
