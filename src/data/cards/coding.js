import { createCard } from "./createCard.js";

export const codingCards = [
  createCard({
    id: "code-fayte",
    title: "Fayte",
    description: "A server-authoritative MMO built from nothing but a render loop.",
    imageKey: "",
    pageTitle: "Fayte",
    detail: {
      eyebrow: "",
      title: "Fayte",
      summary:
        "A from-scratch, server-authoritative 2D multiplayer online RPG in C# on .NET 9. Nine projects around one shared library, roughly 90,000 lines, a hand-rolled encrypted protocol, a lazily-streamed million-tile world, and a scripted deploy onto the Linux box it actually runs on.",
      blocks: [
        {
          type: "paragraph",
          text: "No game-engine networking framework, no ECS library, no serialisation library beyond System.Text.Json, and no game framework beyond MonoGame's render and input loop. The dependency list is four entries long and every one of them is load-bearing."
        },
        {
          type: "paragraph",
          text: "This is how it's built and the decisions I'd defend in a design review."
        },
        { type: "divider" },
        { type: "heading", text: "Layout" },
        {
          type: "list",
          title: "Nine projects",
          items: [
            "Core (library) — the shared model. World, entities, modules, packets, rules, persistence, content loaders. Compiled into both binaries.",
            "Server (console) — the authority. Cross-platform, runs headless on Linux.",
            "Client (WinExe) — MonoGame world rendering with an Avalonia UI overlay.",
            "Launcher (Avalonia) — what testers run. Self-updates, then updates the game.",
            "DevHub (Avalonia) — local control panel and content editor host.",
            "MapEditor (Avalonia) — offline map-template authoring.",
            "ContentPacker (console) — AES-256-GCM packer for the shipped client content.",
            "LoadTest (console) — headless bot swarm, plus the client-state gate.",
            "Verify (console) — standalone invariant checker over content and rules."
          ]
        },
        {
          type: "paragraph",
          text: "Plus a Python sprite pipeline for sheet slicing and anchor authoring. Dependencies: YamlDotNet, Avalonia, MonoGame.Framework.DesktopGL, and System.Drawing.Common in the tools. That's the whole list."
        },
        {
          type: "paragraph",
          text: "Core being compiled into both the client and the server is what makes the authority model enforceable rather than aspirational: both sides agree on the shape of every message by construction, and the server alone owns the meaning."
        },
        { type: "divider" },
        { type: "heading", text: "The authority model" },
        {
          type: "paragraph",
          text: "The client's entire outbound vocabulary is ids, slot coordinates, tile positions, directions, quantities and free text. Nothing else. Every derived value — damage rolls, prices, hit chances, skill checks, success and failure, experience awarded, whether an action is permitted at all — is computed on the server from the server's own loaded content. The client's copy of the content exists purely to render, and is never trusted as input."
        },
        {
          type: "paragraph",
          text: "I audited this specifically before shipping encrypted client content, and the conclusion was that distributing the content in plaintext would not itself enable cheating. The content is still encrypted in shipped builds, but as a spoiler and tampering deterrent, not as a security control. It's worth being honest with yourself about which of the two you're doing."
        },
        {
          type: "list",
          title: "How one action travels — a player clicks an enemy and presses attack",
          items: [
            "The client resolves the click to a tile, finds the character on it, and sends an auto-attack request carrying a target id.",
            "That gets serialised and written as one JSON line to the TLS stream.",
            "The server's per-connection read loop pulls the line and hands it to the dispatch switch — one switch over the packet type, 211 cases.",
            "The handler runs the actual rules: range, line of sight, stamina, hostile-act denial, the hit roll, damage, durability wear, experience.",
            "The server broadcasts a combat event to everyone who can see it and sends a result to the attacker.",
            "The client renders floating damage, a log line, the target's health bar, and decides whether the auto-attack loop continues."
          ]
        },
        {
          type: "paragraph",
          text: "Two things to take from that: the client never decides anything, and the dispatch switch is the complete index of everything the game can be asked to do."
        },
        { type: "divider" },
        { type: "heading", text: "The module system" },
        {
          type: "paragraph",
          text: "The engine spine, and the part that makes \"content is data\" true rather than a slogan. Item definitions, item instances, characters, character definitions, tiles, actions, dialogue nodes and dialogue options all derive from one generic entity holding a list of modules. A sword carries Weapon, WeaponDamage, Durability, AttackSpeed and SkillRequirement. There is no Sword class."
        },
        {
          type: "paragraph",
          text: "Every module type has exactly one codec: a parse and a flatten sitting next to each other, plus optional inspect-window text and an editor field schema. The wire form is a flat array of strings, and it is used identically for the network, for save files, and for YAML authoring. One format, three uses."
        },
        {
          type: "callout",
          title: "An unregistered codec fails open",
          text: "A module with no codec flattens to a bare token and parses back as an empty base module — the data is silently gone. Fourteen requirement gates had stopped gating exactly that way before a reflection sweep in the checker caught them: present in the content, present in the editor, enforcing nothing. That sweep is now non-optional, and it's the single highest-value check in the project."
        },
        {
          type: "paragraph",
          text: "Nested modules are length-prefixed. A trap module carries other modules inside it, and the original encoding concatenated them with no count, so a read reconstructed only the first — a trap authored with two effects silently lost one on the next restart. Length prefixes fixed it, and everything that builds a nested module now goes through the codec rather than hand-assembling the array."
        },
        { type: "heading", text: "Every instance owns its modules" },
        {
          type: "paragraph",
          text: "An item instance's constructor eagerly copies every module its definition authors, through a full flatten-and-reparse rather than a shallow clone. Some modules hold mutable reference types — an internal inventory, a list of trap effects — that a shallow copy would let leak back into the shared definition."
        },
        {
          type: "paragraph",
          text: "Before this, the most common item-spawn path in the codebase left the per-instance module list empty and relied on every consumer knowing to fall back to the definition, which defeats the entire point of having per-instance item state. Fixing it at the root exposed two follow-on problems immediately."
        },
        {
          type: "list",
          items: [
            "Seven modules holding a direct reference to another content object dereferenced it unchecked during serialisation — previously never exercised, because nothing had ever flattened a definition-level copy.",
            "A project-wide silent stat-doubling bug. Three call sites — bonus calculation, armour mitigation, and the inspect window — were still concatenating instance modules with definition modules, which had been correct under the old shape and now double-counted everything. It surfaced as one report about a ring showing +4 on a stat authored as +2, and traced back to all three."
          ]
        },
        { type: "heading", text: "Gates: one evaluator" },
        {
          type: "paragraph",
          text: "A gate answers one question — is this unmet? — returning null when satisfied and otherwise the player-facing reason. The reason is the return value because every caller wants to tell the player why."
        },
        {
          type: "paragraph",
          text: "There used to be two evaluators. The server checked action requirements with one type switch; dialogue checked the same modules with another. Both ended in a default arm that passed, and they had drifted: a resource requirement was enforced on an action and ignored in dialogue, land ownership was enforced on an action and opened for anyone in dialogue, an item requirement counted stacks in one and quantity plus worn items in the other, and an attribute requirement read the earned level in one and the buffed level in the other."
        },
        {
          type: "paragraph",
          text: "None of that is visible from a build, a boot, or a playthrough of content that happens not to use it. Now there's one evaluation per requirement, living on the module, and the checker sweeps for it. A gate that needs context it doesn't have denies — an unknown answer to \"do you own this land?\" is no."
        },
        {
          type: "paragraph",
          text: "One subtlety worth recording: gates that read the action's target item couldn't work at all, because the requirement pass runs before target resolution. Those gates now declare that they need a target, the first pass skips exactly them, and a second pass runs exactly them once a target exists. That split is only safe if the second pass always happens, so the checker asserts no action can carry a target-needing gate behind a non-item target."
        },
        { type: "heading", text: "What the module system bought" },
        {
          type: "list",
          items: [
            "Moving tile aspects onto a lazy module bag made tiles smaller: 208 bytes to 136, and a 100 × 100 chunk from 2,031 KB to about 1,350 KB. An empty type check went from 124 ns to 5.7 ns.",
            "Character definitions became module bags, and a packet with thirty scalar fields and five per-entry DTOs collapsed into one module list. The hand-maintained copy-forward list that went with it is what had been dropping a shopkeeper's trader flag on an unrelated tab edit.",
            "The module editor's field schema lives on the codec, so the in-game editor and the desktop editor are generated from the same source, and neither can offer a field the parser doesn't read."
          ]
        },
        { type: "divider" },
        { type: "heading", text: "The network" },
        {
          type: "paragraph",
          text: "Hand-rolled. 352 packet types, one enum, one record per payload. TCP wrapped in SslStream, with the server generating and persisting a self-signed certificate with a stable thumbprint across restarts. The client pins that thumbprint on first connect — trust-on-first-use, modelled directly on SSH's known_hosts and keyed by host and port. Chosen over a CA-issued certificate because the project has no domain and is in closed testing, and verified with a throwaway TLS smoke client confirming a real TLS 1.3 handshake and an encrypted login round trip."
        },
        {
          type: "paragraph",
          text: "Framing is one JSON object per line. Serialisation uses System.Text.Json with IncludeFields turned on — that flag is load-bearing, because the DTOs use public fields and System.Text.Json serialises properties only. Without it every packet is an empty object. Packet ids are hand-assigned in bands, and since two members sharing a value misroute silently, the checker asserts uniqueness. The client sends its build version on login before credentials are even touched, so stale builds get a clear message rather than a mysterious failure."
        },
        {
          type: "paragraph",
          text: "Rather than pull in a web framework for patch distribution, the update server is a second lightweight listener running inside the same process on its own port, reusing the exact TLS and pinning trust model already built for the game protocol. The control protocol is line-based and deliberately avoids buffered stream readers, so a following binary payload never gets read ahead into a buffer nobody looks at again."
        },
        { type: "heading", text: "Exception safety across the transport" },
        {
          type: "paragraph",
          text: "Both sides had the mirror image of the same bug. The server's per-connection receive loop ran inside a fire-and-forget task with no exception handling at all, so an unhandled exception became a silently swallowed background-task failure that killed the connection with zero logging — presenting to the player as an inexplicable freeze. The client had dozens of raw UI-thread dispatch calls with no guard, where an exception inside any one of them crashed the entire desktop application. Fixed with a wrapper swept mechanically across all sixty-nine call sites."
        },
        { type: "heading", text: "Concurrency" },
        {
          type: "paragraph",
          text: "Each connection runs its own task; there is no central game-loop thread owning world state, and shared collections are concurrent. One coarse lock serialises every world-item container mutation: ordinary containers, the guild bank, the quest board, and the final atomic step of a player trade. The semantics that buys are first come, first served — the loser of a race finds the slot empty and gets its normal failure message. It's deliberately coarse-grained rather than per-tile because none of those paths are hot; they're all player-driven, not per-tick. Before it existed, handlers mutated shared inventory state with zero synchronisation, which was a real race, not a hypothetical one."
        },
        { type: "divider" },
        { type: "heading", text: "The world" },
        {
          type: "paragraph",
          text: "The largest infrastructure rewrite in the project: from creating and simulating the entire world at boot, to lazy loading."
        },
        {
          type: "list",
          title: "Chunk streaming",
          items: [
            "Chunks are 20 × 20 across 20 layers. Only resident chunks live in the map dictionary.",
            "Chunks within a two-chunk radius of a player load on demand, first triggered on world entry before a spawn point is even resolved.",
            "A 60-second eviction loop recomputes the should-stay-resident set from scratch every sweep, from every online player's current position — not from a decaying last-touched timestamp. That's what makes instant teleports correct rather than just walking. A one-chunk buffer avoids evicting a chunk somebody is standing at the edge of, and dirty chunks save before removal.",
            "NPCs in dormant chunks are frozen, not deleted: they keep their object and position and simply stop ticking.",
            "Every NPC-touching loop is gated on an O(1) residency check, so idle regions of a million-tile world cost nothing."
          ]
        },
        {
          type: "paragraph",
          text: "This took the world from 200² to 1,000² while reducing idle server cost. It also surfaced two previously invisible bugs: a tile-resync packet sent on every player move had a server-side handler that was a literal no-op — the only real tile delivery was a one-time radius-15 push at login, which nobody had ever walked far enough to notice on the old small map. And admin teleports on the same Z level delivered zero fresh tile data, because the resync push only fired on a Z-level change."
        },
        {
          type: "paragraph",
          text: "Because chunks generate lazily, every world feature has to be a pure function of position rather than a one-time pass. Biome classification, water placement, ore inside cave walls and plant scatter are all written that way, and ore uses a persisted seed epoch so a restart doesn't silently reroll unmined ore."
        },
        { type: "heading", text: "Multiple maps" },
        {
          type: "paragraph",
          text: "A string-backed map id identifies which map a character, chunk or warp destination belongs to. Three kinds share the representation: the overworld, persistent named maps, and runtime instances keyed by a Guid."
        },
        {
          type: "paragraph",
          text: "Tile positions deliberately do not carry a map id. The map is always contextual — a character's current map, or a chunk's owning map — and only warp destinations carry a map component, because only they cross maps. That decision kept the most-used type in the codebase completely untouched by the multi-map work."
        },
        {
          type: "paragraph",
          text: "Broadcast scoping is mandatory, because maps share coordinate space. A raw send-to-all leaks an instance's tile and character updates onto overworld players standing at the same coordinates, so every broadcast filters by the recipient's current map."
        },
        { type: "heading", text: "Systems" },
        {
          type: "paragraph",
          text: "Every piece of recurring server work is a named system with a declared cadence, made of named steps that run in order. A step that throws is recorded and skipped; the rest still run."
        },
        {
          type: "paragraph",
          text: "This replaced nine hand-rolled loops, each shaped as a while-true with a delay, each started with a bare fire-and-forget whose returned task was discarded, and not one of them with a try/catch. That combination is worse than it looks. An exception in one of those loops doesn't crash the server and doesn't print anything — it faults a task nobody awaits, the loop exits, and that subsystem is dead for the rest of the process's life while the server keeps accepting connections and looks perfectly healthy."
        },
        {
          type: "paragraph",
          text: "They were also bundles. One loop ran NPC AI, schedules, chores, idle wander, ambient barks, stealth visibility, shop restocking, sieges and pending casts. A single throw in any of them took down all nine, at once, forever, with nothing in the log. Several of them touch authored content, so a bad content id was enough to do it. Cadences are now per-system: AI at 500 ms, character upkeep at 1 s, environment at 2 s, day/night at 5 s, scheduled events at 30 s, persistence and chunk eviction at 60 s."
        },
        { type: "divider" },
        { type: "heading", text: "The client" },
        {
          type: "paragraph",
          text: "The client runs two UI frameworks at once. MonoGame renders the tile world, characters, items, lighting, floating combat text, chat bubbles and animation effects. Avalonia renders every in-game window — inventory grids, guild bank, trade, crafting, dialogue, admin tools — as real data-bound controls."
        },
        { type: "heading", text: "The compositing layer" },
        {
          type: "paragraph",
          text: "This is the part I'd point at first. In-game windows live on a transparent, click-through Avalonia window composited on top of the MonoGame window."
        },
        {
          type: "list",
          items: [
            "The overlay is an owned window of the game window rather than topmost, synced every 100 ms to the game's client rect through Win32 calls.",
            "Its window procedure is subclassed: a hit test over empty canvas regions returns HTTRANSPARENT, so clicks pass straight through to the game underneath. The delegate is held in a field specifically to keep the GC from collecting it out from under the native callback.",
            "Transparency is suppressed during a drag, so Avalonia still receives the mouse-up regardless of where the cursor ends up.",
            "The MonoGame side reads whether the last hit was interactive to decide whether a click belongs to the UI or to the world."
          ]
        },
        {
          type: "paragraph",
          text: "That's how a MonoGame game got a full modern data-bound UI toolkit without writing an immediate-mode UI system from scratch."
        },
        { type: "heading", text: "Sprites" },
        {
          type: "paragraph",
          text: "The sprite database slices sheets into named cells and reads an authored pixel size and anchor point per sprite. The renderer draws at the authored size, warping if needed, anchored at the authored point — not at the raw PNG dimensions. That's what lets a tall tree or a wide building occupy more than its data tile. Because a sprite can exceed one tile, the draw loop queries an extra margin of tiles beyond the viewport, so a large sprite anchored just off-screen bleeds into view instead of popping in."
        },
        { type: "heading", text: "Two sync hazards worth recording" },
        {
          type: "paragraph",
          text: "Both produced bugs invisible to the build, the boot smoke test, the bot harness and ordinary play. They share a shape: a server push the client accepted and then quietly failed to apply."
        },
        {
          type: "paragraph",
          text: "Applying an update is not the same as placing an item. The inventory grid's place operation refuses an instance id already in the grid and refuses an occupied cell. That's correct for a player action — it's what stops an item being duplicated into two slots. It's wrong for an authoritative update, because an in-place mutation carries the same instance id by construction. The client used the same call for both, so every update describing a changed item already in the bag was rejected: a decremented stack, worn durability, a fresh enchant. The rule now is one call for server pushes, another for player actions."
        },
        {
          type: "paragraph",
          text: "A push that lands before its control exists is lost. The Avalonia UI is built after login, but several state pushes are sent at world entry, so a handler written with a null-conditional call no-ops on the only unprompted push the server ever sends, and the panel sits at its constructor default until something happens to change the value again. That's why gold read zero on login and the hotbar came up empty. A handler for a state push must cache what it received, and the construction site must replay that cache. The null-conditional operator isn't a safety net there; it's the bug, converting \"arrived too early\" into \"never arrived\"."
        },
        { type: "heading", text: "Measured performance" },
        {
          type: "paragraph",
          text: "Character hot path, Release build, two million iterations per case, against a character with eight attributes and all skills. Recomputing bonuses went from roughly 856 ns to 224 ns after the module-bag shift; a regeneration tick across a thousand characters costs nine hundredths of a millisecond on a loop that runs every four seconds. The character hot path is not a bottleneck at any population this game will see, and the stated justification for optimising it further isn't supported by measurement."
        },
        {
          type: "paragraph",
          text: "I keep the table because it's the baseline any future change gets measured against — and it earned its keep already. The first module-bag implementation validated its cache by counting modules of its type across the whole bag on every access, which turned every lookup into a bag walk. Using the list count as an O(1) version token fixed it, and the regression was caught by re-running the harness rather than by intuition."
        },
        { type: "divider" },
        { type: "heading", text: "Persistence" },
        {
          type: "paragraph",
          text: "Everything lives under the server's save directory as JSON: accounts, one file per character, world chunks per map, live persistent instances, runtime-authored item definitions, guilds, land, territories, warp points, events, and the TLS certificate. Writes go through an atomic file helper — temp file, then move — so a crash mid-write leaves the previous version rather than half a new one."
        },
        {
          type: "paragraph",
          text: "A dedicated persistence audit found the two most severe bugs in the project. Both were silent, production-grade data loss that had been live since the affected feature first shipped — not regressions."
        },
        {
          type: "list",
          items: [
            "Guild bank contents were wiped on every server restart. System.Text.Json serialises properties by default and the save DTOs use public fields, so without the opt-in flag every deposited item serialised as an empty object and reloaded as a phantom empty slot. Tab and slot counts in the save file looked completely correct; only the contents were gone. This directly undermined the quest board's reward-escrow guarantee — a board could promise a reward it could no longer pay.",
            "Every land claim in the game was wiped on every restart, and had been since land claiming existed. Same root cause, compounded by two more: reloaded plot coordinates had no field initialiser so every plot came back at (0,0), and the coordinate index used a dictionary indexer assignment rather than an add, so every claimed plot collapsed into a single overwritten entry with no exception thrown."
          ]
        },
        {
          type: "paragraph",
          text: "Both were verified empirically rather than by reading code: a harness deposits an item, constructs a second store instance against the same directory to simulate a restart, and asserts survival. It failed before the fix and passed after. That pattern is now a permanent part of the checker rather than a scratch test that gets deleted once it says yes."
        },
        { type: "heading", text: "A definition is a pointer; the id is the data" },
        {
          type: "paragraph",
          text: "Trimming the item catalogue left 1,244 world items referencing ids that no longer resolved. A chunk holding one loaded fine and threw on the way back out — so every world edit since the last clean save was being lost, on every shutdown, with no symptom but a stack trace after the shutdown command. The fix: an instance keeps the id it was constructed with, independently of whether the definition currently resolves. An item whose definition has left the game can still be written down, read back, and come back whole if the definition returns."
        },
        { type: "divider" },
        { type: "heading", text: "Verification" },
        {
          type: "paragraph",
          text: "Five rungs, ordered by how much each actually proves, and each one catches a class the ones below cannot."
        },
        {
          type: "list",
          items: [
            "Build — types line up. Nothing about behaviour.",
            "Boot smoke — content loads, world characters restore, the listener binds, saves complete.",
            "Content invariants — roughly 5,100 assertions over content and rules.",
            "Bots — AI ticks, movement and the real packet path actually run under traffic.",
            "Client state — roughly 220 assertions about what the player is shown.",
            "Live play — UI, interaction, economy loops. Unverifiable headlessly."
          ]
        },
        {
          type: "paragraph",
          text: "Verify is a standalone console app checking the things a compiler can't: dangling content references across files, module codecs that round-trip lossily, unregistered codecs, gates that stopped gating, modules that lose data through a save, content id collisions that differ only by case, ore ladders that stopped ascending, and access rules that would let one denial route around another. It gates every deploy."
        },
        {
          type: "paragraph",
          text: "LoadTest project-references the real client networking class rather than a hand-rolled stand-in, so every simulated bot exercises the identical TCP, TLS, certificate-pinning and packet path a real player uses. It drives N concurrent bots through connect, account create, login, character create, world entry and sustained movement, reporting per-stage latency percentiles. That harness found a genuine concurrency bug: two bots connecting for the first time simultaneously raced to write the shared trust-pin file and threw out of the TLS validation callback, spuriously failing a valid handshake. Not a load-test artifact — the local multi-client dev launcher hit the same race in practice."
        },
        {
          type: "callout",
          title: "Why the last rung exists",
          text: "A green build, a clean boot, a passing content check and a zero-exception bot run were all true at the same time as the client silently dropping every in-place inventory update. None of those gates watch the screen. The client-state gate drives the real client packet handling offline — no server, no network — and asserts the resulting local state."
        },
        {
          type: "paragraph",
          text: "The working method is to prove a fix by reverting it and watching a named check fail. A check that cannot fail is worth less than no check. Two text-based sweeps that could never pass again after a rename got repaired rather than left in place, for exactly that reason."
        },
        { type: "heading", text: "Bug classes only live testing found" },
        {
          type: "list",
          items: [
            "A window's repositioning logic ran every frame and unconditionally overwrote the position, so any window a player dragged snapped back on the next frame — silently making the reposition feature useless the moment it was actually used.",
            "A weapon-cost fallback that looked completely correct never fired, because a LINQ query with zero matches returns an empty collection rather than null, so the null-coalescing default never triggered and every equipped weapon without an explicit cost cost nothing to use.",
            "A crash reproducing only on \"switch tabs, then switch back\" had previously been patched with a try/catch that suppressed the symptom. The real cause was an Avalonia rule about re-parenting a control into a second container without detaching it first, found only after getting a precise repro.",
            "World drag-and-drop was reported as an admin-only bug and was actually broken for everyone: the same coordinate-space mistake — mixing absolute desktop pixels from the overlay with window-relative coordinates from MonoGame — copy-pasted at three call sites, which had only ever appeared to work when the game window sat at the corner of the screen.",
            "A crash that looked like \"opening the social menu breaks the whole server\" was three unrelated bugs chained: a background I/O thread updating UI controls with no thread safety, which crashed the dev launcher, which broke a piped connection to the server process, which interpreted the resulting broken input stream as an intentional shutdown."
          ]
        },
        { type: "divider" },
        { type: "heading", text: "Security" },
        {
          type: "paragraph",
          text: "TLS 1.3 with certificate pinning is the primary control once the server became internet-reachable, including for login credentials."
        },
        {
          type: "paragraph",
          text: "Research for a proper permission system turned up a live, unauthenticated privilege escalation: several admin-only packets — world tile editing, ore reveal, and most seriously spawning arbitrary NPC definitions into the world — had no permission check at all beyond \"is this a logged-in player\". Any connected player could already do all of it. Closed with an account-level admin flag, a cached per-session check re-verified on every request, and a console-only bootstrap as the sole path to creating the first admin. A second instance of the identical bug class turned up later in item spawn and despawn."
        },
        {
          type: "paragraph",
          text: "The generic open, transfer and move container handlers would have let a player open a quest-board posting exactly like an ordinary chest and pull the escrowed reward straight into their inventory, skipping the accept and turn-in flow entirely. Closed with an explicit type check on all four sites."
        },
        {
          type: "paragraph",
          text: "A currency-laundering vector was closed before it could be exploited. Nothing structurally prevented a shop from being configured to buy currency items, which would land a genuine pickpocketable currency item in the shop's own inventory. The shipped content didn't trigger it, but the sell path now rejects currency unconditionally — closed at the root rather than relying on authors never making the mistake."
        },
        {
          type: "paragraph",
          text: "The shipped client's content files are AES-256-GCM encrypted into a single packed file, with a verification mode that round-trips and diffs every file before shipping. Building it surfaced three content files with no client-side purpose at all, which were dropped from the shipped client — quest rewards and objectives had been readable on disk by any player."
        },
        { type: "divider" },
        { type: "heading", text: "Tooling" },
        {
          type: "paragraph",
          text: "DevHub is the local control panel: start and stop the server, launch any number of client instances for multiplayer testing, launch the launcher, run the content checker, and read a live server log. It also hosts the game's own admin controls, so the same editors work in and out of the game from one wiring — adding a tool to the game adds it to the desktop editor for free."
        },
        {
          type: "paragraph",
          text: "The in-game admin client was the single largest tooling effort in the project. It replaced three disconnected surfaces — chat commands, a locally-piped dev console, and an offline editor that needed a full server restart to test anything — with fifteen in-game windows covering character stats, item spawning, module and definition authoring, NPC definitions, land and territory, quests, factions, tile kinds, maps, warp points, sieges, music zones, sprite alignment and a definition browser. All of it behind the same account-level permission built earlier."
        },
        {
          type: "paragraph",
          text: "Anything committed there registers live and writes back to the content file. The writer is a text splice that replaces only the bytes of the entry being written, because the previous whole-file round trip destroyed every comment in the file."
        },
        {
          type: "paragraph",
          text: "One layout rule I settled on: when a tool gets crowded, split it into tabs by function — by what an admin came to the window to do — not by widget type and not by which packet each control sends. Two things stay outside the tabs: the shared subject, because a position that reset on tab change would make the tabs feel like separate windows, and the shared commit, because a save button on one tab reads as saving one tab."
        },
        { type: "divider" },
        { type: "heading", text: "Deployment" },
        {
          type: "paragraph",
          text: "The server dropped a genuinely dead 400-line Windows-only UI class, confirmed unreachable by tracing the actual process-launch path, and moved off the Windows target framework entirely. That took hosting from $15–30 a month Windows-licensed to $4–6 a month Linux, verified with a full clean rebuild and a multi-bot load test showing an unchanged latency profile."
        },
        {
          type: "paragraph",
          text: "Shipping a build is one command. The deploy script bumps the version once and deploys the server and client from that single version. That matters more than it sounds: the version constant lives in Core, so the server binary carries the same value as the client, and the patch endpoint advertises the server's value as the manifest version. Deploy them separately and you get one of two broken states, and neither is something a tester can undo — their launcher has already installed whatever it was told about."
        },
        {
          type: "paragraph",
          text: "Deploys are additive by construction: the process never deletes remote files and the save directory is never part of what gets shipped, so live player data and the TLS certificate survive every redeploy."
        },
        {
          type: "paragraph",
          text: "Two bugs found deploying to a real server. The deploy script had no exit-code checking on a remote copy, so a missed SSH prompt could silently succeed while doing nothing; every remote step now fails loudly on a nonzero exit. More significantly, the server's console input loop treated a closed standard-input stream as a signal to shut down — which is exactly what happens under systemd, where stdin defaults to nothing. The server would start, log that it was listening, and immediately exit on its own the moment it ran as a real background service. That would have silently broken any headless or containerised deployment of the software, not just this one."
        },
        { type: "heading", text: "The launcher" },
        {
          type: "paragraph",
          text: "A genuinely separate executable, specifically because a running program can't safely overwrite its own files. Testers get it once. After that it does both halves itself, in order: it updates itself if the server advertises a different launcher version — staging the new build in a temp directory and re-invoking it with an apply-update flag — and then updates the game client if the patch manifest version differs from the local one, and launches it. It checksum-verifies what it downloads, refuses to overwrite an install that's currently running, and falls back to launching the existing install if the patch server can't be reached."
        },
        { type: "divider" },
        { type: "heading", text: "What I'd point at in an interview" },
        {
          type: "paragraph",
          text: "The module system and what enforcing it cost. The idea is easy; keeping it honest is not. Fourteen gates silently stopped gating because a codec wasn't registered and the failure mode was open rather than loud. Two systems expressed durability differently and both looked correct at every individual call site. The interesting work was building the checks that make those unrepresentable, not the abstraction itself."
        },
        {
          type: "paragraph",
          text: "The persistence audit. Two silent, live, restart-triggered data-loss bugs found by going looking rather than by a bug report, and proved fixed with an empirical before-and-after harness rather than by reasoning about the code."
        },
        {
          type: "paragraph",
          text: "The chunk-streaming rewrite, which grew the addressable world five times over while reducing idle server cost, and turned up two entirely dead network code paths nobody had noticed because the old world was too small to walk out of."
        },
        {
          type: "paragraph",
          text: "The verification ladder — specifically the moment that produced the last rung. Four green gates at the same time as a client silently dropping every inventory update reframed how I think about what a passing test actually proves."
        },
        {
          type: "paragraph",
          text: "And the compositing layer: a from-scratch bridge letting a modern data-bound UI framework run click-through-transparent over a MonoGame render loop, which is what let the game have a real UI without writing one."
        }
      ]
    }
  }),

  createCard({
    id: "code-hearth-and-harvest",
    title: "Hearth and Harvest",
    description: "An authoritative card server and a data-driven rules engine.",
    imageKey: "",
    pageTitle: "Hearth and Harvest",
    detail: {
      eyebrow: "",
      title: "Hearth & Harvest",
      summary:
        "A networked two-player card game in C# on .NET 9: an authoritative game server, a desktop client, a self-updating launcher, and a data-driven card engine shared by all three. Roughly 28,600 lines across five projects.",
      blocks: [
        {
          type: "paragraph",
          text: "This is the architecture and the decisions behind it. Where a decision cost me a rewrite, I've said so — those are the parts worth reading."
        },
        { type: "divider" },
        { type: "heading", text: "Solution layout" },
        {
          type: "list",
          items: [
            "Core — card definitions and modules, the complete rules engine, deck codec and validator, progression rules, network protocol, patch protocol, security primitives. No UI of any kind. Depends on YamlDotNet alone.",
            "Server — TCP listener, authentication, SQLite persistence, matchmaking, and the socket wiring around the match engine.",
            "Client — Avalonia desktop app: login, dashboard, deck builder, matchmaking, game board.",
            "Launcher — the application a player installs once. Updates itself, installs and patches the game, signs the player in, hands off to the client.",
            "Tools — console harness: six test suites and a card-data coverage auditor."
          ]
        },
        {
          type: "paragraph",
          text: "Core is deliberately dependency-light, and that constraint earns its keep twice. It compiles into a headless Linux server build where there is no graphics stack to load from, and it means the entire rules engine is testable in a console process with no window, no message pump and no test framework."
        },
        {
          type: "paragraph",
          text: "The dependency graph is a deliberate tree, not a web. The Launcher references Core only — never Client. It needs the patch protocol, the login packets and the trust store, and nothing about playing a game. Making that a compile-time fact rather than a convention is what stops the launcher slowly growing a card catalog."
        },
        { type: "divider" },
        { type: "heading", text: "The card engine: data, not code" },
        {
          type: "paragraph",
          text: "Cards are not classes. A card is a row of YAML naming a set of modules, and the engine executes modules. A Chicken is a Collectable tagged Animal, from the Farm region, carrying a ship value of 750 gold, a gift rule that sets a Fed flag when given Chicken Feed, and a production module that outputs an Egg — or a Golden Egg once it has ten hearts."
        },
        {
          type: "paragraph",
          text: "There are around twenty-five module kinds — costs, gift rules, production, plant growth, containers, shops, weighted resource tables, goal conditions, passive modifiers, duration timers — and roughly forty effect kinds layered on top of a shared trigger vocabulary. The payoff is that 273 cards required no card-specific code. Adding a card is a data change. Designing a new mechanic is the only thing that touches C#, and once it exists every card in the set can use it."
        },
        {
          type: "callout",
          title: "The risk is the mirror image",
          text: "A card can reference a module the engine does not implement and fail silently, doing nothing at all. That is not a failure a play session reliably surfaces, so a coverage auditor walks every card in the set, resolves every module and effect kind against what the engine actually handles, and reports each one as implemented or blocked with the cards affected. It is the one report that answers \"is the set actually playable?\" without playing it. It currently reports 0 of 273 cards blocked."
        },
        {
          type: "paragraph",
          text: "Card text is generated from the modules by default, and any card may override it with a hand-written line. The override is display-only — modules remain the single source of truth for what a card does, so wrong or missing card text can never change how a card plays. A tooling mode emits every card's generated text as ready-to-paste blocks, so writing a card's real text starts from what the machine currently says rather than from a blank line."
        },
        { type: "divider" },
        { type: "heading", text: "Authority model" },
        {
          type: "paragraph",
          text: "The server owns the game. This is the single most consequential decision in the project, and I made it the second way round first."
        },
        {
          type: "paragraph",
          text: "The original build ran every rule client-side and used the server as a message relay: each client simulated its own board and told the other what it had done. It worked, and it was wrong in two ways that could not be patched out. A modified client could do anything at all. And the two boards could silently diverge — one client resolving an effect in a slightly different order, and from then on the two players were playing different games without either being told."
        },
        {
          type: "paragraph",
          text: "The rewrite moved the entire simulation into Core and put one instance of it on the server per match. The old relay protocol was deleted, not disabled."
        },
        { type: "heading", text: "Intents in, events out" },
        {
          type: "paragraph",
          text: "A client sends an intent; the server asks whose turn it is, whether that card is really theirs, and whether they can actually pay, then applies it and collects the resulting events. Those events go back redacted per recipient, and the client's read-only projection applies them."
        },
        {
          type: "paragraph",
          text: "A client's entire surface is the intent list: play a card, activate a card, move tokens, ship, gift, drop on a container, resolve or skip a choice, respond with a recipe, end turn, concede. Anything not expressible as an intent is not something a client can do, which is exactly the property I wanted from the type system rather than from discipline. A rejection is a normal outcome, not an error — a client racing its own UI will legitimately ask for things that just became illegal, and it's told why."
        },
        { type: "heading", text: "Hidden information" },
        {
          type: "paragraph",
          text: "Redaction is enforced on events, not just on snapshots — the mistake I expected to make and specifically tested for. A snapshot-only implementation leaks constantly: drawing a card is an event, and an unredacted event stream tells your opponent exactly which card you drew."
        },
        {
          type: "paragraph",
          text: "Snapshots build the board as one seat is allowed to see it, materialising hidden cards as real instances with real ids and no identity attached — so a later reveal is a card being identified, not a card appearing from nowhere. The same rule applies to the live stream, and a choice prompt is stripped of its options for whoever isn't the chooser, so searching your own deck cannot leak your deck."
        },
        { type: "heading", text: "The client's half" },
        {
          type: "paragraph",
          text: "The projection is a read-only replica: it holds the same state type the engine does, but it never runs a rule. Snapshots overwrite it wholesale, events patch it, and that is the only way it ever changes. It lives in Core and is free of Avalonia on purpose — replaying an event stream into a projection and asserting the resulting board is the cheapest possible test for \"do the two sides agree?\", and that test should not need a window."
        },
        {
          type: "paragraph",
          text: "The client's board view model still contains methods that look like rules — can I ship this, is this a valid gift target — and every one of them is answering a presentation question: whether to draw a highlight, whether a click is worth sending. The server checks it again properly, and where the two disagree the server wins and the client is told why."
        },
        { type: "divider" },
        { type: "heading", text: "Networking and security" },
        {
          type: "paragraph",
          text: "TCP with TLS 1.2/1.3, carrying length-prefixed JSON messages. The server generates a self-signed certificate on first start into its data directory — deliberately not the application directory, because a deploy replaces that, and a replaced certificate locks out every client that has already pinned it. The client pins the fingerprint on first connection and refuses a changed one: trust-on-first-use, the same model SSH uses. An admin command prints the fingerprint for publishing alongside the download, which closes the first-connection gap for anyone who cares to check."
        },
        {
          type: "list",
          title: "Hardening on the match path",
          items: [
            "Twenty intents per second per player.",
            "Wire types are matched against a whitelist rather than resolved by reflection. The type name arrives from the network, and reflective type resolution on attacker-controlled strings is a deserialisation vulnerability with a long history.",
            "Deck codes are re-validated server-side on every submission and again at match start. The editor's live constraints are a convenience; the validator is the rule.",
            "Protocol version is checked at login. Client and server ship together, and a mismatch is reported plainly at the door rather than failing somewhere deep in a match."
          ]
        },
        {
          type: "paragraph",
          text: "The client heartbeats every twenty seconds; the server stamps a last-seen time on every message and closes anything quiet for fifty seconds — two missed heartbeats, so a single dropped packet costs nobody a match. Closing the socket routes the player through the ordinary disconnect path, which starts a five-minute forfeit clock, and reconnecting within it hands the whole board back via a fresh snapshot. One shared ten-second sweep enforces the forfeit clock, caps matches at four hours and reaps finished ones — one timer for the whole server rather than a thread per match."
        },
        { type: "heading", text: "Authentication" },
        {
          type: "paragraph",
          text: "Password accounts use BCrypt. Google sign-in uses the authorization code flow with PKCE, split across the two processes in a specific way: the launcher runs the browser half, opening the consent page and catching the redirect on a loopback listener, and sends the resulting authorization code to the game server. The server exchanges that code with Google using the client secret."
        },
        {
          type: "paragraph",
          text: "That split is the whole point. The client secret never ships inside a binary a player can unzip, and the only ID token in the system is one this server fetched from Google itself over TLS, authenticated with our own credentials. It is also why there is no JWKS signature check: the token did not arrive from a client, it arrived from the token endpoint. The audience, issuer, expiry and verified-email claims are still checked, and the code documents exactly which assumption would have to change before the no-signature shortcut stops being sound."
        },
        {
          type: "paragraph",
          text: "Two further details that matter more than they look. Accounts key on Google's subject id, never the email address — an address can be changed or given away by its owner, and a subject id cannot. It is uniquely indexed with a partial index, because every pre-Google account has it empty and a plain unique index would make the second such account a constraint violation. And linking happens after the password is verified, never before; otherwise anyone could attach their own Google account to any username they could name."
        },
        {
          type: "paragraph",
          text: "The launcher hands the game client a single-use session token rather than a password, which retires the \"credentials visible in the process list\" problem the naive hand-off has."
        },
        { type: "divider" },
        { type: "heading", text: "Persistence" },
        {
          type: "paragraph",
          text: "EF Core over SQLite, with the database anchored to a configurable data directory so it can live on a mounted volume that a deploy never touches. Entities: players, decks, friendships, match records, chat messages."
        },
        {
          type: "paragraph",
          text: "Schema management is split in two, and the split is load-bearing. One path builds the full schema for a database file that does not exist yet; a separate catch-up path brings an existing database forward. Those are genuinely different jobs, and conflating them is how a table ends up existing on every developer machine and on no production box."
        },
        {
          type: "paragraph",
          text: "Match history is denormalised on purpose. A record stores both players, both decks as they were at the time, goals scored, turn count, the reason it ended and the rank swing. Storing deck references would let a player rewrite their own history by renaming a deck."
        },
        {
          type: "paragraph",
          text: "The database runs in WAL mode so the admin CLI is safe to use against a live server: list players, stats, ban, unban, reset password, decks, verify database, fingerprint, recover account. That last one unlinks a Google account and sets a password in one step — unlinking alone would strand a Google-created account, since it has no password to fall back to, which is the kind of admin tool that only bites once."
        },
        { type: "divider" },
        { type: "heading", text: "Progression" },
        {
          type: "paragraph",
          text: "The rank rules and the matchmaker live in Core, not on the server, and that placement is deliberate: the client draws the tier and the server awards the points. A disagreement between those two is the category of bug players notice and nobody can reproduce."
        },
        {
          type: "paragraph",
          text: "The ladder is flat arithmetic rather than Elo — seven tiers from Seedling to Master, +25 for a win with up to +15 more for beating someone above you, −20 for a loss, and conceding costs exactly what losing costs. Nobody can look at an Elo number and tell whether it was fair. \"+25 for a win, +10 more because they outranked you\" is arguable over a table, and being arguable is the point."
        },
        {
          type: "paragraph",
          text: "Two queues: casual takes the first opponent available; ranked pairs by rating and widens its search as you wait, taking anyone after ninety seconds. A strict band is correct when there is a crowd and useless when four people are online, and I would rather ship the honest trade than an empty queue."
        },
        { type: "divider" },
        { type: "heading", text: "Client" },
        {
          type: "paragraph",
          text: "Avalonia with CommunityToolkit.Mvvm, MVVM throughout. One shared card control renders in hand, on the board, in previews and in the deck editor, scaling its own layout — one place to change how a card looks. Custom layout panels handle the fanned hand and the effect queue, because the arc, overlap and rotation are geometry and geometry belongs in a panel rather than in bindings. The board is a 1600×1000 canvas with both sides as exact mirrors."
        },
        {
          type: "paragraph",
          text: "Slot positions are presentation and live in the view model; slot identity comes from Core, so the client and server are naming the same board. Slot ids name a seat, not a point of view. They were originally written from the local player's perspective, which forced the network layer to rewrite every id it relayed and made a shared server board impossible — \"my land slot 1\" means a different slot to each client. The server names seats, and each client decides which seat it draws at the bottom of its own screen."
        },
        {
          type: "paragraph",
          text: "A public effect feed shows every triggered effect to both players, large, with the queue fanned behind it. In a game where most of the action is passive triggers firing on someone else's board, the alternative is two players watching numbers change for reasons neither can see."
        },
        { type: "divider" },
        { type: "heading", text: "Launcher and patching" },
        {
          type: "paragraph",
          text: "The launcher is the only thing a player installs. It updates itself, installs and patches the game, shows patch notes, signs the player in and hands off. The patch protocol is five verbs on a plain line-oriented connection: client version, client download, launcher version, launcher download, and an info endpoint for patch notes. One connection per request, no keep-alive, no session."
        },
        {
          type: "paragraph",
          text: "It is deliberately not HTTP. The patch endpoint is a second listener inside the game-server process, sharing its TLS certificate — so there is no web server to stand up, firewall separately, or keep alive. For five verbs, a dedicated protocol is less operational surface than a web stack."
        },
        {
          type: "list",
          title: "Three details worth calling out",
          items: [
            "Versions are compared for inequality, never for being newer. That makes rollback work for free: deploy an older zip and every install moves back to it, because different is the trigger rather than newer.",
            "Archives are SHA-256 verified before they are unpacked, and the transfer has a hard size ceiling so a corrupt length prefix cannot make a launcher allocate its way to death.",
            "A malformed patch-notes file degrades to an empty panel, never to an error. It is content, it is edited by hand, and content should not be able to take the launcher's update check down. A deploy-time check parses it and prints what it found before it is uploaded, so a YAML typo is one line of output at the moment it is introduced rather than a blank panel nobody notices for a week."
          ]
        },
        { type: "divider" },
        { type: "heading", text: "Deployment" },
        {
          type: "paragraph",
          text: "The server project builds two different programs from one source tree: an Avalonia admin GUI for local development, and a console-only Linux service. The headless configuration does not merely skip the UI at runtime — it removes the view, view-model and App sources from the compile entirely and drops the Avalonia package references. Nothing UI-shaped is handed to the compiler, so a stray using-directive added to a view later cannot break the server deploy silently. Every server rule has exactly one implementation, shared by both builds."
        },
        {
          type: "paragraph",
          text: "Headless mode starts the listener immediately, logs to stdout for journald, and shuts down cleanly on the usual signals. It fails loudly and non-zero if the card data or the database is unusable, rather than serving a server that rejects every deck for reasons no log explains."
        },
        {
          type: "paragraph",
          text: "Deployment is scripted end to end: inspect, bootstrap the volume mount and service user and systemd unit and firewall, deploy with an atomic application-directory swap and one-step rollback, status with a real reachability probe, restart, database backup, and a packaged playtester client build with the server address already written in."
        },
        { type: "divider" },
        { type: "heading", text: "Testing" },
        {
          type: "paragraph",
          text: "There is no test framework. Tools is a console application with six modes, and it runs the whole suite in about a second."
        },
        {
          type: "list",
          items: [
            "Rules — 316 assertions over costs, production, growth, gifting, goals, containers, shops and card text.",
            "Authority — 371 assertions over intent validation, snapshot redaction, event visibility, reconnect, concede and response windows.",
            "Auth — 77 assertions over password and Google identity handling, account linking and username rules.",
            "Progression — 69 assertions over ladder arithmetic, tier boundaries, matchmaking bands and chat rate limiting.",
            "Patch — 47 assertions over the patch protocol, manifests and patch-notes parsing.",
            "Default — 9 assertions over deck validation, deck-code round-trips, region and copy rules.",
            "Coverage — the card-data audit: every module and effect kind, implemented or blocked."
          ]
        },
        {
          type: "stats",
          items: [
            { value: "889", label: "Assertions, all passing" },
            { value: "273", label: "Cards, none blocked" },
            { value: "~28,600", label: "Lines of C#" }
          ]
        },
        {
          type: "paragraph",
          text: "Skipping a framework was a consequence of the Core design rather than a preference. Once the engine has no UI dependency and no ambient state, a test is a function that builds a match, applies intents and asserts on the resulting state — and the harness that runs those is fifty lines. Keeping it a plain executable means it runs identically on a developer machine, on the deploy box and in a script, with no runner to install."
        },
        {
          type: "paragraph",
          text: "The suites are written to catch the failures that actually happened. The authority suite includes a test that plays a full match through the intent surface and asserts the client projection and the server engine agree card-for-card at every step — because divergence is the failure mode the whole authority rewrite exists to eliminate, and it is invisible until someone loses a game to it."
        },
        { type: "divider" },
        { type: "heading", text: "Stack" },
        {
          type: "list",
          items: [
            "C# 12 on .NET 9",
            "Avalonia and CommunityToolkit.Mvvm for the UI",
            "YamlDotNet for card definitions, EF Core and SQLite for persistence",
            "TLS 1.2/1.3, BCrypt, Google OAuth 2.0 with authorization code and PKCE",
            "TCP with length-prefixed JSON, and a custom line protocol for patching",
            "Linux, systemd, a mounted data volume, and a scripted atomic deploy with rollback"
          ]
        }
      ]
    }
  }),

  createCard({
    id: "code-entangled",
    title: "Entangled",
    description: "A narrative runtime in Unity where dialogue drives everything.",
    imageKey: "emma",
    pageTitle: "Entangled",
    detail: {
      eyebrow: "",
      title: "Entangled",
      summary:
        "A Unity narrative runtime: branching dialogue authored as data, a shared flag vocabulary, a calendar, and managers that survive the scene changes underneath them.",
      blocks: [
        {
          type: "paragraph",
          text: "Entangled treats conversations, time and travel as one system rather than three. A dialogue choice can change the world, ending a conversation can move the clock, and the clock decides what's open to you. Most of the engineering is about making those three things able to reach each other without every scene needing to know about every other scene."
        },
        { type: "divider" },
        { type: "heading", text: "Unity architecture" },
        {
          type: "paragraph",
          text: "Built with C#, MonoBehaviours, ScriptableObjects, TextMeshPro, Unity's scene management, coroutines and persistent singleton managers. Authored content is separated from scene presentation: dialogue, locations, conditions and global state are reusable data structures, while scene-level components handle presentation, input, animation and transitions. That's what lets the narrative systems stay consistent while the player moves between independently constructed scenes."
        },
        { type: "divider" },
        { type: "heading", text: "Branching dialogue" },
        {
          type: "paragraph",
          text: "Dialogue is authored through a hierarchy of ScriptableObjects rather than embedded in scene scripts: conversations, lines, player choices, conditional transitions, entry and exit actions, and state-changing effects."
        },
        {
          type: "callout",
          text: "Dialogue line → available choices → conditional destination → next line or exit action"
        },
        {
          type: "paragraph",
          text: "Choices can be shown, hidden or redirected according to stored conditions, evaluated over boolean flags, integer flags and required values. Conditions affect both player-facing choices and automatic transitions between lines, so a conversation can react to whether you've met someone, whether you've found a place, which route you took, how far a relationship has come, whether an event has fired, and where the story currently stands. A second visit isn't the same tree."
        },
        { type: "heading", text: "State changes from dialogue" },
        {
          type: "paragraph",
          text: "Lines and choices can update global state when they're entered or selected: set a flag, clear one, move an integer, unlock a destination, record a decision, mark a beat complete. Letting dialogue content modify shared state is what keeps the wiring shallow — a conversation in the café changes what's waiting at home without the two scenes ever referring to each other."
        },
        { type: "heading", text: "The presentation layer" },
        {
          type: "paragraph",
          text: "A scene-spanning dialogue manager coordinates both the logic and its presentation: TextMeshPro text, speaker portraits, character animation, typewriter output, voice playback, choice buttons, progression and exit behaviour. It persists across scene transitions, so conversations use one consistent runtime controller rather than every scene carrying its own separately configured dialogue implementation."
        },
        {
          type: "paragraph",
          text: "That creates a Unity lifecycle problem worth naming: the manager survives scene changes and scene UI objects do not. Each newly loaded scene hands the persistent manager the local interface it should control, so the manager keeps its conversation logic and state while replacing only its scene-specific presentation references."
        },
        {
          type: "paragraph",
          text: "Text is presented through coroutine-driven typewriter behaviour, which is also what coordinates player input, voice playback, animation state, line completion and choice activation. Presentation runs on the same runtime that controls narrative progression rather than on an unrelated collection of scene scripts."
        },
        { type: "heading", text: "Exit actions" },
        {
          type: "paragraph",
          text: "A line can carry an action that fires when the conversation ends: travel somewhere, advance the calendar, start another conversation, update flags, trigger an event. That's what makes dialogue a functional part of the gameplay loop rather than a layer on top of it. A conversation can directly cause time to pass, move the player, or change what's available next."
        },
        { type: "divider" },
        { type: "heading", text: "Global state" },
        {
          type: "paragraph",
          text: "A persistent ScriptableObject tracks the session: story flags, relationship variables, money, character statistics, current location, calendar state, discovered destinations, event completion and route-specific decisions. It starts from an authored set of defaults and stays available to every scene-spanning manager, which gives the whole game one source of truth for what the player has already done."
        },
        {
          type: "paragraph",
          text: "Both boolean and integer values are supported, and using both is what lets the prototype represent more than yes-or-no branches. Booleans cover binary facts — a person has been introduced, a destination has been found, an event has happened, a route is active. Integers cover relationship values, repeated interaction counts, story stages, currency, statistics and progressive unlocks."
        },
        {
          type: "paragraph",
          text: "Global managers use Unity's persistent object lifecycle to survive scene loads, so loading the café or the arcade doesn't reset dialogue progression, calendar values, flags, statistics, location state or unlocks. That mattered because Entangled treats locations as separate scenes rather than regions inside one continuous world."
        },
        { type: "divider" },
        { type: "heading", text: "The calendar" },
        {
          type: "paragraph",
          text: "The calendar tracks hour, day, month and season, advancing through explicit progression methods rather than a real-time simulation, and it accounts for differing month lengths. Six named periods — Early, Morning, Afternoon, Evening, Night, Late — give every other system a shared vocabulary for when something happens."
        },
        {
          type: "paragraph",
          text: "Time advances in response to gameplay: dialogue exit actions, location transitions, scripted events, and activities that consume it. Once it's moving it becomes a gate — whether an activity is available, whether a destination shows, which dialogue is entered, whether an event can occur, which branch advances, and whether travel costs part of the day. That's the structure a dating sim needs, where attention and time are the limited resources."
        },
        { type: "divider" },
        { type: "heading", text: "Locations and navigation" },
        {
          type: "paragraph",
          text: "The world is a set of discrete named destinations — home, the medium's residence, the grocery store, the café, the arcade, the bar. Each is a closed identifier plus a definition object that maps the narrative concept of a place to the Unity scene used to present it."
        },
        {
          type: "paragraph",
          text: "Those definitions separate travel data from the buttons and scenes that invoke it. A location carries its identifier, its display name, its scene, whether travelling there advances time, the conditions required to show it, and its discovery flags — so multiple interfaces can refer to the same destination without duplicating scene names and rules across the project."
        },
        {
          type: "paragraph",
          text: "The overworld is menu-driven on purpose. Choosing a destination from a list keeps the pacing tight, makes travel an intentional decision, puts the player in front of people quickly, and spends none of the day on movement that isn't about anything. Buttons can be shown or hidden by flag, so the map grows as the player learns the town rather than as they walk it."
        },
        {
          type: "paragraph",
          text: "Travel runs through one shared navigation system: update the current location, optionally advance the calendar, begin a fade, load the scene, reconnect the persistent managers, present the destination. That makes scene loading a controlled gameplay operation rather than letting individual buttons call Unity's scene manager without updating shared state. The fade isn't only cosmetic — because the world is split across scenes, the transition is the predictable point where navigation state, time and presentation get synchronised."
        },
        { type: "divider" },
        { type: "heading", text: "Why the pieces matter more than the parts" },
        {
          type: "paragraph",
          text: "The strongest contribution here isn't any single manager. A dialogue choice can set a flag, change a value, advance the conversation, end it, move the clock, unlock a destination and trigger travel. The destination scene then reconnects its UI to the persistent manager, reads the updated state, presents different dialogue, shows newly available locations and reacts to the new time period."
        },
        {
          type: "callout",
          text: "Enter a location → speak with a character → make a choice → update state → spend time → unlock or travel somewhere new"
        },
        {
          type: "paragraph",
          text: "ScriptableObjects are what keep that authorable. Dialogue lines, choices, conditional transitions, state changes, location definitions, exit actions and character presentation are all edited in Unity rather than encoded in scripts, which gives design and engineering one shared content model: content gets assembled in the editor, and the runtime stays responsible for evaluating conditions and presenting the result."
        }
      ]
    }
  }),

  createCard({
    id: "code-rpgwo-tools",
    title: "RPGWO Tools",
    description: "Modern editing tools for a game that never had any.",
    imageKey: "rpgwo",
    pageTitle: "RPGWO Tools",
    detail: {
      eyebrow: "",
      title: "RPGWO Tools",
      summary:
        "Schema-driven content editing, sprite management, binary map work and procedural generation for RPG World Online — a legacy MMO whose original ecosystem never had modern tooling.",
      blocks: [
        {
          type: "paragraph",
          text: "What started as a Windows utility for editing configuration files and sprite artwork grew into two independent .NET applications: a WPF desktop app with direct filesystem access, and a Blazor WebAssembly app that runs entirely inside a browser tab."
        },
        {
          type: "paragraph",
          text: "Between them they cover schema-driven data editing, sprite-sheet management, binary map editing, procedural world generation, legacy package creation, and direct control of a running game server."
        },
        {
          type: "paragraph",
          text: "The hard part was never the interface. Most of the formats involved had no surviving documentation, no supported integration layer and no modern tooling at all, so large portions of the toolkit came out of binary-format analysis, source inspection, behavioural testing and independent reimplementation."
        },
        { type: "divider" },
        { type: "heading", text: "What it does" },
        {
          type: "list",
          items: [
            "A schema-driven editor for the game's core configuration files",
            "Sprite-sheet browsing, composition, packing and patching",
            "A layered tile-map editor backed by the game's actual map formats",
            "Seeded procedural generation for dungeons, towns, wilderness and world terrain",
            "Browser-based filesystem editing with offline persistence",
            "Legacy binary package generation",
            "Live Windows server-process control and monitoring",
            "Automated browser testing against genuine game data"
          ]
        },
        {
          type: "paragraph",
          text: "The goal I held everything to was format fidelity. The toolkit doesn't import legacy data into a new format — it edits the original files, preserving unknown fields, comments, formatting, binary records and unsupported values wherever it can. A tool that quietly normalises somebody's server data is worse than no tool."
        },
        { type: "divider" },
        { type: "heading", text: "Two applications, one design language" },
        {
          type: "paragraph",
          text: "The desktop application has direct filesystem access and does the things that need native Windows integration: editing server files on disk, creating timestamped backups, rebuilding legacy distribution packages, controlling the running game server through Win32 APIs, and capturing the server's rendered map view through GDI."
        },
        {
          type: "paragraph",
          text: "The browser application runs entirely in the tab. No backend, no cloud processing, no account, and no upload of anyone's game files to an external service — all parsing, editing, image processing, map generation and file creation happen locally. It deploys as a static site while still offering workflows normally associated with a desktop editor."
        },
        { type: "heading", text: "Deliberate risk management" },
        {
          type: "paragraph",
          text: "The two applications intentionally do not share a compiled class library. The desktop app was already functional and depended on by users when work on the web version began, and refactoring it around a new shared project would have introduced regression risk for no user-facing gain. So the web app was built as an additive, parallel implementation."
        },
        {
          type: "paragraph",
          text: "That accepted a controlled amount of duplicated logic in exchange for protecting the stable desktop app, letting the browser architecture evolve independently, avoiding a large disruptive restructuring, and keeping deployment and platform concerns isolated."
        },
        {
          type: "paragraph",
          text: "The UI-independent systems — map formats, procedural generation — were written with no WPF, browser or filesystem dependencies, so they copy between both projects without modification and compile in both runtimes. That gives most of the practical benefit of shared architecture without putting the production desktop app at risk."
        },
        { type: "divider" },
        { type: "heading", text: "Browser filesystem architecture" },
        {
          type: "paragraph",
          text: "Porting to the browser introduced one fundamental constraint: a tab cannot touch the filesystem the way a Windows application can. Everything is therefore built around a virtual filesystem interface, and every ported service — configuration parsers and writers, backup services, sprite-sheet compositors, map codecs, project persistence, export workflows — reads and writes through it."
        },
        {
          type: "paragraph",
          text: "The same core operations then run against multiple storage strategies without the editing services knowing which one is active. On Chromium browsers the user can pick a real folder from disk: the app reads it into an in-memory snapshot, edits against the virtual filesystem, flushes changed files back to their original locations, writes real timestamped backups, and persists the directory handle so the project survives a refresh with only a permission prompt to answer."
        },
        { type: "divider" },
        { type: "heading", text: "How it grew" },
        {
          type: "list",
          items: [
            "Configuration editing",
            "Schema and reference tooling",
            "Sprite-sheet management",
            "Desktop workflow expansion",
            "The Blazor WebAssembly port",
            "Virtual filesystem and browser persistence",
            "Binary map-format implementation",
            "Integrated map editing",
            "Procedural generation",
            "Automated browser validation",
            "Legacy packaging and server integration"
          ]
        },
        {
          type: "paragraph",
          text: "This is what engineering looks like when the ideal dependencies, documentation and APIs simply don't exist: analyse an undocumented system, recover the binary structure, reimplement the observed behaviour, and be careful enough with someone else's data that they'll trust you with it a second time. The result turns a pile of inaccessible legacy formats and disconnected workflows into one tool content creators can actually use."
        }
      ]
    }
  }),

  createCard({
    id: "prototype",
    title: "Unity Prototyping",
    description: "Systems lead to dreams.",
    imageKey: "",
    pageTitle: "Unity Prototyping",
    detail: {
      eyebrow: "",
      title: "Unity Prototypes",
      summary:
        "Systems I built while learning what Unity can and can't do for me. Most recent at the top.",
      blocks: [
        {
          type: "videoEmbed",
          title: "Grid Inventory System v1",
          src: "https://youtu.be/sUXk8WYSHbE",
          caption:
            "The first pass at the grid inventory Revel is built around, and the same idea Fayte uses. Each grid owns its own array of items, so a grid can be asked about passive buffs, ownership and permissions without knowing whose bag it is. Items are ScriptableObjects, which makes them quick to author in-editor and possible to generate at runtime for more varied types and effects."
        },
        {
          type: "videoEmbed",
          title: "Networked 3D Combat",
          src: "https://youtu.be/sQlq9PGP_88",
          caption:
            "A study in Unity's netcode: combat resolving across clients, data moving in packets, and interactions, progression and animation staying in step for everyone watching."
        },
        {
          type: "videoEmbed",
          title: "Networked Multiplayer Movement",
          src: "https://youtu.be/d-PwNaxZt8A",
          caption:
            "Several clients running at once, each getting real-time updates about the others. This is the groundwork everything networked I've built since sits on top of."
        },
        {
          type: "videoEmbed",
          title: "Basic Character Controls",
          src: "https://youtu.be/XW51kPhIsow",
          caption:
            "A core movement system with independent camera control, movement and animation, wired so every client sees the same motion at the same time. Sound and small animated flourishes are in there too, because movement that feels good is mostly the details."
        }
      ]
    }
  })
];
