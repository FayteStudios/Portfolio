using System;
using System.Collections.Generic;
using System.Linq;

namespace MyTools
{
    public static class EditorDefinitions
    {
        public static readonly IReadOnlyList<EditorEntry> World = new List<EditorEntry>
        {
            //Admin
            new()
            {
                group = "Admin",
                type = "Field",
                kind = "text",
                key = "Admin",
                label = "Admin",
                description = "Admin account name. Can have multiple. Separate with commas."
            },
            new()
            {
                group = "Admin",
                type = "Field",
                kind = "text",
                key = "SuperAdmin",
                label = "Super Admin",
                description = "The most powerful admin account. Can have multiple. Separate with commas."
            },
            new()
            {
                group = "Admin",
                type = "Field",
                kind = "text",
                key = "UltraAdmin",
                label = "Ultra Admin",
                description = "A powerful admin account. Can have multiple. Separate with commas."
            },
            new()
            {
                group = "Admin",
                type = "Field",
                kind = "text",
                key = "BuilderAdmin",
                label = "Builder Admin",
                description = "Admin account intended for building and quest work. Can have multiple. Separate with commas."
            },
            new()
            {
                group = "Admin",
                type = "Field",
                kind = "text",
                key = "SecretClient",
                label = "Secret Client",
                description = "Secret client/account value."
            },
            new()
            {
                group = "Admin",
                type = "Field",
                kind = "text",
                key = "BanClient",
                label = "Banned Clients",
                description = "Banned clients. Can have multiple. Separate with commas."
            },
            new()
            {
                group = "Admin",
                type = "Field",
                kind = "bool",
                key = "AutoShutdown",
                label = "Auto Shutdown",
                description = "Whether the server should automatically shut down."
            },
            new()
            {
                group = "Admin",
                type = "Field",
                kind = "number",
                key = "AdminSerial",
                label = "Admin Serial",
                description = "Admin serial value."
            },
            new()
            {
                group = "Admin",
                type = "Field",
                kind = "text",
                key = "MasterPassword",
                label = "Master Password",
                description = "The admin master password."
            },
            new()
            {
                group = "Admin",
                type = "Field",
                kind = "text",
                key = "OwnerEmail",
                label = "Owner Email",
                description = "The server owner's email."
            },
            new()
            {
                group = "Admin",
                type = "Field",
                kind = "text",
                key = "EmailMessage",
                label = "Email Message",
                description = "Message shown about emails."
            },
            new()
            {
                group = "Admin",
                type = "Field",
                kind = "text",
                key = "ServerMessage",
                label = "Server Message",
                description = "Message shown by the server."
            },
            new()
            {
                group = "Admin",
                type = "Field",
                kind = "number",
                key = "ServerPort",
                label = "Server Port",
                description = "Port used by the server."
            },
            new()
            {
                group = "Admin",
                type = "Field",
                kind = "number",
                key = "PostDelay",
                label = "Post Delay",
                description = "Frequency players can make posts."
            },
            new()
            {
                group = "Admin",
                type = "Field",
                kind = "number",
                key = "GlobalChatDelay",
                label = "Global Chat Delay",
                description = "Frequency players can send global chat messages."
            },
            new()
            {
                group = "Admin",
                type = "Field",
                kind = "number",
                key = "PPSLimit",
                label = "PPS Limit",
                description = "Packets-per-second or player processing limit."
            },
            new()
            {
                group = "Admin",
                type = "Field",
                kind = "text",
                key = "PPSLimitNote",
                label = "PPS Limit Note",
                description = "Message or note related to PPS limit."
            },
            new()
            {
                group = "Admin",
                type = "Field",
                kind = "number",
                key = "LogThreshold",
                label = "Log Threshold",
                description = "Threshold for logging."
            },
            new()
            {
                group = "Admin",
                type = "Field",
                kind = "number",
                key = "LogonTimeLimit",
                label = "Logon Time Limit",
                description = "How long a player has to finish logging in."
            },
            new()
            {
                group = "Admin",
                type = "Field",
                kind = "number",
                key = "PlayerExitDelay",
                label = "Player Exit Delay",
                description = "Delay before a player fully exits the world."
            },
            new()
            {
                group = "Admin",
                type = "Field",
                kind = "number",
                key = "IdlePlayerTimeout",
                label = "Idle Player Timeout",
                description = "How long a player can be idle before timeout."
            },
            new()
            {
                group = "Admin",
                type = "Field",
                kind = "number",
                key = "MaxAllowedClients",
                label = "Max Allowed Clients",
                description = "Maximum number of clients allowed to connect."
            },
            new()
            {
                group = "Admin",
                type = "Field",
                kind = "flag",
                key = "AllowDupIPClients",
                label = "Allow Duplicate IP Clients",
                description = "How many duplicate IP clients are allowed, if supported by the server."
            },
            new()
            {
                group = "Admin",
                type = "Field",
                kind = "number",
                key = "MaxPlayerPerClient",
                label = "Max Players Per Client",
                description = "Maximum character/player count per client."
            },
            new()
            {
                group = "Admin",
                type = "Field",
                kind = "number",
                key = "MaxDupIP",
                label = "Max Duplicate IPs",
                description = "Maximum duplicate IP connections."
            },

            //Land
            new()
            {
                group = "Land",
                type = "Field",
                kind = "number",
                key = "MapSize",
                label = "Map Size",
                description = "World map size."
            },
            new()
            {
                group = "Land",
                type = "Field",
                kind = "number",
                key = "WorldDepth",
                label = "World Depth",
                description = "Number of world depth layers."
            },
            new()
            {
                group = "Land",
                type = "Field",
                kind = "number",
                key = "StartXpos",
                label = "Starting X",
                description = "Starting X coordinate."
            },
            new()
            {
                group = "Land",
                type = "Field",
                kind = "number",
                key = "StartYpos",
                label = "Starting Y",
                description = "Starting Y coordinate."
            },
            new()
            {
                group = "Land",
                type = "Field",
                kind = "number",
                key = "StartZpos",
                label = "Starting Z",
                description = "Starting Z coordinate."
            },
            new()
            {
                group = "Land",
                type = "Field",
                kind = "number",
                key = "StartPlace",
                label = "Starting Place",
                description = "Starting place value."
            },
            new()
            {
                group = "Land",
                type = "Field",
                kind = "spritePicker",
                picker = "sprite",
                key = "DefaultSurface",
                label = "Default Surface",
                description = "The default surface image."
            },
            new()
            {
                group = "Land",
                type = "Field",
                kind = "number",
                key = "MaxElevation",
                label = "Maximum Elevation",
                description = "The highest terrain elevation the map can generate."
            },
            new()
            {
                group = "Land",
                type = "Field",
                kind = "number",
                key = "ClimbLowElevation",
                label = "Low Climb Elevation Point",
                description = "Low elevation point for climb checks."
            },
            new()
            {
                group = "Land",
                type = "Field",
                kind = "number",
                key = "ClimbHighElevation",
                label = "High Climb Elevation Point",
                description = "High elevation point for climb checks."
            },
            new()
            {
                group = "Land",
                type = "Field",
                kind = "number",
                key = "TerrainClimb",
                label = "Terrain Climb",
                description = "Terrain climb setting."
            },
            new()
            {
                group = "Land",
                type = "Field",
                kind = "number",
                key = "Terrain",
                label = "Terrain",
                description = "Terrain setting."
            },
            new()
            {
                group = "Land",
                type = "Field",
                kind = "bool",
                key = "SurfaceGrowth",
                label = "Surface Growth",
                description = "Whether surface growth is enabled."
            },
            new()
            {
                group = "Land",
                type = "Field",
                kind = "flag",
                key = "AllowSurfaceGrowth",
                label = "Allow Surface Growth",
                description = "Allows surface growth behavior."
            },
            new()
            {
                group = "Land",
                type = "Field",
                kind = "spritePicker",
                picker = "sprite",
                key = "DesertSurface",
                label = "Desert Surface",
                description = "Desert surface sprite."
            },
            new()
            {
                group = "Land",
                type = "Field",
                kind = "number",
                key = "DesertSurfaceDamage",
                label = "Desert Surface Damage",
                description = "Damage caused by desert surface."
            },
            new()
            {
                group = "Land",
                type = "Field",
                kind = "number",
                key = "SurfaceDamage",
                label = "Surface Damage",
                description = "Surface damage setting."
            },
            new()
            {
                group = "Land",
                type = "Field",
                kind = "number",
                key = "PlayerSurfaceCost",
                label = "Player Surface Cost",
                description = "Cost for player surface changes."
            },
            new()
            {
                group = "Land",
                type = "Field",
                kind = "number",
                key = "SpeedUpGrowth",
                label = "Speed Up Growth",
                description = "How quickly things grow or decay."
            },
            new()
            {
                group = "Land",
                type = "Flag",
                kind = "flag",
                key = "DisableClientSecurity",
                label = "Disable Client Security",
                description = "Whether or not to disable client security."
            },
            new()
            {
                group = "Land",
                type = "Flag",
                kind = "flag",
                key = "NoSeasons",
                label = "No Seasons",
                description = "Disables seasons."
            },
            new()
            {
                group = "Land",
                type = "Flag",
                kind = "flag",
                key = "OpenReservedLand",
                label = "Open Reserved Land",
                description = "Whether reserved land can be opened."
            },
            new()
            {
                group = "Land",
                type = "Flag",
                kind = "flag",
                key = "UsableUnClaimedLand",
                label = "Usable Unclaimed Land",
                description = "Whether unclaimed land can be interacted with."
            },
            new()
            {
                group = "Land",
                type = "Field",
                kind = "number",
                key = "MaxUnClaimCount",
                label = "Max Unclaim Count",
                description = "Maximum unclaim count."
            },
            new()
            {
                group = "Land",
                type = "Field",
                kind = "number",
                key = "MaxLandOwn",
                label = "Max Land Own",
                description = "Maximum number of land claims a player can own."
            },
            new()
            {
                group = "Land",
                type = "Field",
                kind = "number",
                key = "LandClaimCost",
                label = "Land Claim Cost",
                description = "Cost to claim land."
            },
            new()
            {
                group = "Land",
                type = "Field",
                kind = "number",
                key = "LandClaimMaxRange",
                label = "Land Claim Max Range",
                description = "Maximum range for claiming land."
            },
            new()
            {
                group = "Land",
                type = "Field",
                kind = "number",
                key = "LandOwnerTimeToLiveDays",
                label = "Land Ownership Decay",
                description = "AFK timer for land being unclaimed."
            },
            new()
            {
                group = "Land",
                type = "Field",
                kind = "number",
                key = "DarkSectorXpos",
                label = "Dark Sector X Position",
                description = "X position for the dark sector."
            },
            new()
            {
                group = "Land",
                type = "Field",
                kind = "number",
                key = "DarkSectorYpos",
                label = "Dark Sector Y Position",
                description = "Y position for the dark sector."
            },
            new()
            {
                group = "Land",
                type = "Field",
                kind = "number",
                key = "LightSectorXpos",
                label = "Light Sector X Position",
                description = "X position for the light sector."
            },
            new()
            {
                group = "Land",
                type = "Field",
                kind = "number",
                key = "LightSectorYpos",
                label = "Light Sector Y Position",
                description = "Y position for the light sector."
            },
            new()
            {
                group = "Land",
                type = "Field",
                kind = "spritePicker",
                picker = "sprite",
                key = "MiningBraceSurface",
                label = "Mining Brace Image",
                description = "Image to use for a mining brace."
            },
            new()
            {
                group = "Land",
                type = "Field",
                kind = "number",
                key = "MiningDepthMax",
                label = "Mining Depth Max",
                description = "How deep players can dig down."
            },
            new()
            {
                group = "Land",
                type = "Field",
                kind = "number",
                key = "MiningDepthFactor",
                label = "Mining Depth XP Scaling",
                description = "How much XP increases as players dig deeper."
            },
            new()
            {
                group = "Land",
                type = "Field",
                kind = "number",
                key = "MiningHazard",
                label = "Mining Hazard",
                description = "Mining hazard chance or severity."
            },
            new()
            {
                group = "Land",
                type = "Field",
                kind = "itemPicker",
                picker = "item",
                key = "ExplodeDebris",
                label = "Explode Debris",
                description = "Item or debris used when something explodes."
            },
            new()
            {
                group = "Land",
                type = "Field",
                kind = "animationPicker",
                picker = "animation",
                key = "ExplodeAnimation",
                label = "Explode Animation",
                description = "Animation used for explosions."
            },
            new()
            {
                group = "Land",
                type = "Field",
                kind = "number",
                key = "ExplodeReset",
                label = "Explode Reset",
                description = "Reset value or timer for explosion behavior."
            },
            new()
            {
                group = "Land",
                type = "Field",
                kind = "animationPicker",
                picker = "animation",
                key = "CaveInAnimation",
                label = "Cave In Animation",
                description = "Animation used when a cave-in happens."
            },
            new()
            {
                group = "Land",
                type = "Flag",
                kind = "flag",
                key = "CaveInItemDestroy",
                label = "Cave In Destroys Items",
                description = "Whether items are destroyed during a cave-in."
            },
            new()
            {
                group = "Land",
                type = "Flag",
                kind = "flag",
                key = "disablenewbieisland",
                label = "Disable Newbie Island",
                description = "Newbie Island is enabled by default. This disables it."
            },

            //Player
            new()
            {
                group = "Player",
                type = "Field",
                kind = "number",
                key = "SkillPoints",
                label = "Skill Points",
                description = "Starting skill points."
            },
            new()
            {
                group = "Player",
                type = "Field",
                kind = "number",
                key = "AttributePoints",
                label = "Attribute Points",
                description = "Starting attribute points."
            },
            new()
            {
                group = "Player",
                type = "Field",
                kind = "text",
                key = "SkillRollType",
                label = "Skill Roll Type",
                description = "Skill roll type."
            },
            new()
            {
                group = "Player",
                type = "Field",
                kind = "number",
                key = "SkillRollAlpha",
                label = "Skill Roll Alpha",
                description = "Skill roll alpha value."
            },
            new()
            {
                group = "Player",
                type = "Field",
                kind = "number",
                key = "SkillCap",
                label = "Skill Cap",
                description = "Maximum skill cap."
            },
            new()
            {
                group = "Player",
                type = "Field",
                kind = "number",
                key = "SlowDownSkillPoints",
                label = "Slow Down Skill Points",
                description = "Skill point threshold or modifier for slowing skill gain."
            },
            new()
            {
                group = "Player",
                type = "Field",
                kind = "number",
                key = "LevelXpLimit",
                label = "Level XP Limit",
                description = "Experience limit per level."
            },
            new()
            {
                group = "Player",
                type = "Field",
                kind = "number",
                key = "XPFactor",
                label = "XP Factor",
                description = "Global XP factor."
            },
            new()
            {
                group = "Player",
                type = "Field",
                kind = "number",
                key = "XPFactorCombat",
                label = "Combat XP Factor",
                description = "Modifies the XP rates of combat skills."
            },
            new()
            {
                group = "Player",
                type = "Field",
                kind = "number",
                key = "XPFactorPKCombat",
                label = "PK Combat XP Factor",
                description = "XP factor for PK combat."
            },
            new()
            {
                group = "Player",
                type = "Field",
                kind = "number",
                key = "XPFactorTrade",
                label = "Trade XP Factor",
                description = "Modifies the XP rates of trade skills."
            },
            new()
            {
                group = "Player",
                type = "Field",
                kind = "number",
                key = "DamagePercent",
                label = "Damage Percent",
                description = "Global damage percentage modifier."
            },
            new()
            {
                group = "Player",
                type = "Field",
                kind = "number",
                key = "PKLevelRange",
                label = "PK Level Range",
                description = "Range players can kill each other based on compared levels."
            },
            new()
            {
                group = "Player",
                type = "Field",
                kind = "number",
                key = "VitaePenalty",
                label = "Vitae Penalty",
                description = "Vitae penalty applied to players."
            },
            new()
            {
                group = "Player",
                type = "Field",
                kind = "number",
                key = "VitaeFactor",
                label = "Vitae Factor",
                description = "Modifier for vitae penalty behavior."
            },
            new()
            {
                group = "Player",
                type = "Field",
                kind = "number",
                key = "DeathProtectionTime",
                label = "Death Protection Time",
                description = "Time after death where protection applies."
            },
            new()
            {
                group = "Player",
                type = "Field",
                kind = "number",
                key = "TimeToResurrect",
                label = "Resurrection Time",
                description = "How long it takes for a player to respawn on death."
            },
            new()
            {
                group = "Player",
                type = "Field",
                kind = "number",
                key = "FoodOnDeath",
                label = "Food On Death",
                description = "Food value after player death."
            },
            new()
            {
                group = "Player",
                type = "Field",
                kind = "number",
                key = "MaxPlayerFood",
                label = "Max Player Food",
                description = "Maximum player food value."
            },
            new()
            {
                group = "Player",
                type = "Field",
                kind = "number",
                key = "MaxPlayerWater",
                label = "Max Player Water",
                description = "Maximum player water value."
            },
            new()
            {
                group = "Player",
                type = "Field",
                kind = "spritePicker",
                picker = "sprite",
                key = "PassedOutImage",
                label = "Passed Out Image",
                description = "Sprite used when a player is passed out."
            },
            new()
            {
                group = "Player",
                type = "Field",
                kind = "number",
                key = "PlayerLives",
                label = "Player Lives",
                description = "Number of lives a player has."
            },
            new()
            {
                group = "Player",
                type = "Field",
                kind = "number",
                key = "MaxPoison",
                label = "Max Poison",
                description = "Maximum poison value."
            },
            new()
            {
                group = "Player",
                type = "Field",
                kind = "magicPicker",
                picker = "magic",
                key = "StarterSpell",
                label = "Starter Spell",
                description = "Spell a player starts with."
            },
            new()
            {
                group = "Player",
                type = "Flag",
                kind = "flag",
                key = "AllowImageChange",
                label = "Allow Image Change",
                description = "Allows players to change their character image."
            },
            new()
            {
                group = "Player",
                type = "Flag",
                kind = "flag",
                key = "AllowTopTen",
                label = "Allow Top Ten",
                description = "Whether players can use /topten command to see statistics."
            },

            //Mobs
            new()
            {
                group = "Mobs",
                type = "Field",
                kind = "number",
                key = "MobEffect",
                label = "Mob Effect",
                description = "The general modifier for monsters ganging up on a target."
            },
            new()
            {
                group = "Mobs",
                type = "Field",
                kind = "number",
                key = "MonsterSpread",
                label = "Monster Spread",
                description = "How far apart monsters spawn in the wild."
            },
            new()
            {
                group = "Mobs",
                type = "Field",
                kind = "number",
                key = "MonsterChase",
                label = "Monster Chase",
                description = "How far a monster will chase a player before returning to spawn."
            },
            new()
            {
                group = "Mobs",
                type = "Field",
                kind = "number",
                key = "MonsterProcessSeconds",
                label = "Monster Process Seconds",
                description = "How quickly monsters can make decisions."
            },
            new()
            {
                group = "Mobs",
                type = "Field",
                kind = "number",
                key = "MonsterSpawnProcessSeconds",
                label = "Monster Spawn Process Seconds",
                description = "How quickly new monsters spawn in the wild."
            },
            new()
            {
                group = "Mobs",
                type = "Field",
                kind = "number",
                key = "MonsterSpawnCount",
                label = "Monster Spawn Count",
                description = "How many monsters spawn at once in the wild."
            },
            new()
            {
                group = "Mobs",
                type = "Field",
                kind = "number",
                key = "DefaultMonsterSpeed",
                label = "Default Monster Speed",
                description = "The general speed modifier of monsters."
            },
            new()
            {
                group = "Mobs",
                type = "Field",
                kind = "number",
                key = "ZombiePoison",
                label = "Zombie Poison",
                description = "Poison value used by zombies."
            },
            new()
            {
                group = "Mobs",
                type = "Field",
                kind = "number",
                key = "MaxReproduceCount",
                label = "Max Reproduce Count",
                description = "Maximum number of times a monster can reproduce."
            },
            new()
            {
                group = "Mobs",
                type = "Field",
                kind = "monsterPicker",
                picker = "monster",
                key = "AutoStalkerId",
                label = "Stalker Monster",
                description = "If stalkers are enabled, the ID of the monster."
            },
            new()
            {
                group = "Mobs",
                type = "Field",
                kind = "number",
                key = "AutoStalkerLevel",
                label = "Auto Stalker Level",
                description = "Level used for auto stalker behavior."
            },
            new()
            {
                group = "Mobs",
                type = "Flag",
                kind = "flag",
                key = "DISABLEOPTIMIZEDMONSTERMOVES",
                label = "Disable Optimized Monster Moves",
                description = "Optimized monster moves are enabled by default. This disables them."
            },
            new()
            {
                group = "Mobs",
                type = "Flag",
                kind = "flag",
                key = "Bitch",
                label = "Bitch Enabled",
                description = "Can players 'bitch' each other after being PKed."
            },

            //Combat
            new()
            {
                group = "Combat",
                type = "Field",
                kind = "number",
                key = "AttackStealthBonus",
                label = "Attack Stealth Bonus",
                description = "Attack bonus from stealth."
            },
            new()
            {
                group = "Combat",
                type = "Field",
                kind = "number",
                key = "AttackElevationBonus",
                label = "Attack Elevation Bonus",
                description = "Attack bonus from elevation."
            },
            new()
            {
                group = "Combat",
                type = "Field",
                kind = "number",
                key = "MeleeDefenseFactor",
                label = "Melee Defense Factor",
                description = "Defense factor for melee attacks."
            },
            new()
            {
                group = "Combat",
                type = "Field",
                kind = "number",
                key = "MissleDefenseFactor",
                label = "Missile Defense Factor",
                description = "Defense factor for missile/ranged attacks."
            },
            new()
            {
                group = "Combat",
                type = "Field",
                kind = "number",
                key = "PKDamagePercent",
                label = "PK Damage Percent",
                description = "Damage percentage used in PK combat."
            },
            new()
            {
                group = "Combat",
                type = "Field",
                kind = "number",
                key = "PKDamageMinLife",
                label = "PK Damage Minimum Life",
                description = "Minimum life affected by PK damage."
            },
            new()
            {
                group = "Combat",
                type = "Field",
                kind = "number",
                key = "PKprotectionLevel",
                label = "PK Protection Level",
                description = "The level where players lose protection from being PKed."
            },

            //Item
            new()
            {
                group = "Item",
                type = "Field",
                kind = "number",
                key = "ItemStackLimit",
                label = "Item Stack Limit",
                description = "The maximum number of items that can be in a stack."
            },
            new()
            {
                group = "Item",
                type = "Field",
                kind = "number",
                key = "ItemMapStackLimit",
                label = "Item Map Stack Limit",
                description = "How many items can be placed on a single tile."
            },
            new()
            {
                group = "Item",
                type = "Field",
                kind = "number",
                key = "ItemOwnerDecay",
                label = "Item Owner Decay",
                description = "How long an item is considered claimed by its creator before others can pick it up."
            },
            new()
            {
                group = "Item",
                type = "Field",
                kind = "number",
                key = "MaxSkillBonus",
                label = "Max Skill Bonus",
                description = "Maximum bonus players can receive from equipped items."
            },
            new()
            {
                group = "Item",
                type = "Field",
                kind = "number",
                key = "MaxItemSkillBonus",
                label = "Max Item Skill Bonus",
                description = "Maximum bonus players can receive from equipped items."
            },
            new()
            {
                group = "Item",
                type = "Field",
                kind = "number",
                key = "ItemSkillBonusValue",
                label = "Item Skill Bonus Value",
                description = "Value of item skill bonus."
            },
            new()
            {
                group = "Item",
                type = "Field",
                kind = "number",
                key = "RepairDegrade",
                label = "Repair Degrade",
                description = "Modifies how quickly things degrade before they need repair."
            },
            new()
            {
                group = "Item",
                type = "Field",
                kind = "number",
                key = "JewelryDecay",
                label = "Jewelry Decay",
                description = "How quickly jewelry decays."
            },
            new()
            {
                group = "Item",
                type = "Field",
                kind = "spritePicker",
                picker = "sprite",
                key = "CarryImage",
                label = "Carry Image",
                description = "Sprite used when carrying an item."
            },
            new()
            {
                group = "Item",
                type = "Field",
                kind = "itemPicker",
                picker = "item",
                key = "StarterItem",
                label = "Starter Item",
                description = "Item a player starts with."
            },
            new()
            {
                group = "Item",
                type = "Field",
                kind = "number",
                key = "StarterQty",
                label = "Starter Quantity",
                description = "Quantity of the starter item."
            },
            new()
            {
                group = "Item",
                type = "Field",
                kind = "number",
                key = "MeteoriteRate",
                label = "Meteorite Rate",
                description = "Rate at which meteorites occur."
            },
            new()
            {
                group = "Item",
                type = "Field",
                kind = "number",
                key = "MeteoriteSize",
                label = "Meteorite Size",
                description = "Size of meteorite events."
            },
            new()
            {
                group = "Item",
                type = "Field",
                kind = "number",
                key = "MeteoriteSpawn",
                label = "Meteorite Spawn",
                description = "Meteorite spawn value."
            },
            new()
            {
                group = "Item",
                type = "Field",
                kind = "itemPicker",
                picker = "item",
                key = "MeteoriteItem",
                label = "Meteorite Item",
                description = "When a meteorite falls, what item does it create?"
            },

            //Guilds
            new()
            {
                group = "Guilds",
                type = "Field",
                kind = "number",
                key = "GuildCreateCost",
                label = "Guild Creation Cost",
                description = "How much a guild costs to create."
            },
            new()
            {
                group = "Guilds",
                type = "Field",
                kind = "number",
                key = "GuildCreateLevel",
                label = "Guild Creation Level",
                description = "What level a player can create a guild."
            },
            new()
            {
                group = "Guilds",
                type = "Field",
                kind = "number",
                key = "GuildJoinLevel",
                label = "Guild Join Level",
                description = "Level required to join a guild."
            },
            new()
            {
                group = "Guilds",
                type = "Field",
                kind = "number",
                key = "GuildJoinCost",
                label = "Guild Join Cost",
                description = "Cost required to join a guild."
            },
            new()
            {
                group = "Guilds",
                type = "Field",
                kind = "number",
                key = "GuildMaintainCost",
                label = "Guild Maintenance Cost",
                description = "How much a guild costs to maintain."
            },
            new()
            {
                group = "Guilds",
                type = "Field",
                kind = "decimal",
                key = "GuildXPPercent",
                label = "Guild XP Percentage",
                description = "How much XP goes into the guild XP pool and how much gets distributed by rank."
            },
            new()
            {
                group = "Guilds",
                type = "Field",
                kind = "number",
                key = "GuildLandClaimCost",
                label = "Guild Land Cost",
                description = "How much a plot of guild land costs to claim."
            },
            new()
            {
                group = "Guilds",
                type = "Field",
                kind = "number",
                key = "GuildNPCBuy",
                label = "Guild NPC Buy",
                description = "Guild NPC buy value."
            },

            //Non-Mob NPC
            new()
            {
                group = "Non-Mob NPC",
                type = "Field",
                kind = "number",
                key = "MaxTameCount",
                label = "Max Tame Count",
                description = "Maximum tame count."
            },
            new()
            {
                group = "Non-Mob NPC",
                type = "Field",
                kind = "number",
                key = "TameFactor",
                label = "Tame Factor",
                description = "Modifier used for taming."
            },
            new()
            {
                group = "Non-Mob NPC",
                type = "Field",
                kind = "number",
                key = "TameLevelRange",
                label = "Tame Level Range",
                description = "Level range used for taming."
            },
            new()
            {
                group = "Non-Mob NPC",
                type = "Field",
                kind = "number",
                key = "TameShareXPPercent",
                label = "Tame Share XP Rate",
                description = "How much XP is gained from tames."
            },
            new()
            {
                group = "Non-Mob NPC",
                type = "Field",
                kind = "number",
                key = "NPCTraderStartGold",
                label = "Trader Starting Gold",
                description = "Default amount of gold a trader spawns with."
            },
            new()
            {
                group = "Non-Mob NPC",
                type = "Field",
                kind = "number",
                key = "NPCTraderItemTTL",
                label = "NPC Trader Item TTL",
                description = "How long trader items remain available."
            },
            new()
            {
                group = "Non-Mob NPC",
                type = "Field",
                kind = "number",
                key = "NPCIdleTimeout",
                label = "NPC Idle Timer",
                description = "Time it takes for an NPC to despawn for being idle."
            },
            new()
            {
                group = "Non-Mob NPC",
                type = "Field",
                kind = "number",
                key = "TraderBuyMax",
                label = "Trader Buy Max",
                description = "Maximum number of traders a player can buy."
            },
            new()
            {
                group = "Non-Mob NPC",
                type = "Field",
                kind = "number",
                key = "TraderBuyCost",
                label = "Trader Cost",
                description = "How much it costs to buy a personal trader."
            },
            new()
            {
                group = "Non-Mob NPC",
                type = "Field",
                kind = "number",
                key = "MuleBuyMax",
                label = "Mule Buy Max",
                description = "Maximum number of mules a player can buy."
            },
            new()
            {
                group = "Non-Mob NPC",
                type = "Field",
                kind = "number",
                key = "MuleBuyCost",
                label = "Mule Cost",
                description = "How much it costs to buy a personal mule."
            },

            //Event
            new()
            {
                group = "Event",
                type = "Field",
                kind = "spritePicker",
                picker = "sprite",
                key = "CTFRedImage",
                label = "CTF Red Image",
                description = "The image red players use when playing Capture the Flag."
            },
            new()
            {
                group = "Event",
                type = "Field",
                kind = "spritePicker",
                picker = "sprite",
                key = "CTFBlueImage",
                label = "CTF Blue Image",
                description = "The image blue players use when playing Capture the Flag."
            },
            new()
            {
                group = "Event",
                type = "Field",
                kind = "number",
                key = "CTFRedResurrect",
                label = "CTF Red Resurrection Timer",
                description = "How long it takes for red players to respawn after death."
            },
            new()
            {
                group = "Event",
                type = "Field",
                kind = "number",
                key = "CTFBlueResurrect",
                label = "CTF Blue Resurrection Timer",
                description = "How long it takes for blue players to respawn after death."
            },
            new()
            {
                group = "Event",
                type = "Field",
                kind = "spritePicker",
                picker = "sprite",
                key = "TeamFlag",
                label = "Team Flag",
                description = "Sprite/image used for team flag."
            },
            new()
            {
                group = "Event",
                type = "Field",
                kind = "text",
                key = "TeamName",
                label = "Team Name",
                description = "Team name."
            },
            new()
            {
                group = "Event",
                type = "Field",
                kind = "monsterPicker",
                picker = "monster",
                key = "FactionTroop",
                label = "Faction Troop",
                description = "Monster used as faction troop."
            },
            new()
            {
                group = "Event",
                type = "Field",
                kind = "text",
                key = "Content",
                label = "Content",
                description = "Content setting."
            },
            new()
            {
                group = "Event",
                type = "Field",
                kind = "number",
                key = "LootTimeToLive",
                label = "Loot Time To Live",
                description = "How long loot remains before expiring."
            },
            new()
            {
                group = "Event",
                type = "Field",
                kind = "number",
                key = "EconomyFactor",
                label = "Economy Factor",
                description = "Economy modifier."
            },
            new()
            {
                group = "Event",
                type = "Field",
                kind = "number",
                key = "SpamCount",
                label = "Spam Count",
                description = "Spam count threshold."
            },
            new()
            {
                group = "Event",
                type = "Field",
                kind = "number",
                key = "AppealTimeToLive",
                label = "Appeal Time To Live",
                description = "How long appeals remain active."
            },
            new()
            {
                group = "Event",
                type = "Field",
                kind = "number",
                key = "DeletePlayerVDayDelay",
                label = "Delete Player V-Day Delay",
                description = "Delay before deleting a player."
            },
            new()
            {
                group = "Event",
                type = "Field",
                kind = "text",
                key = "EventStart",
                label = "Event Start",
                description = "Event start value."
            },
            new()
            {
                group = "Event",
                type = "Field",
                kind = "animationPicker",
                picker = "animation",
                key = "GunShotHit",
                label = "Gun Shot Hit",
                description = "Animation used when a gun shot hits."
            },
            new()
            {
                group = "Event",
                type = "Field",
                kind = "text",
                key = "Swear",
                label = "Swear",
                description = "Swear filter or swear setting."
            },
            new()
            {
                group = "Event",
                type = "Field",
                kind = "number",
                key = "TribunalMode",
                label = "Tribunal Mode",
                description = "Tribunal mode setting."
            },

            //Community / Misc Existing Flags
            new()
            {
                group = "Community",
                type = "Flag",
                kind = "flag",
                key = "PopupMotd",
                label = "Popup MOTD",
                description = "Shows the message of the day as a popup."
            },
            new()
            {
                group = "Community",
                type = "Flag",
                kind = "flag",
                key = "Perks",
                label = "Perks",
                description = "Enables perk behavior."
            },
            new()
            {
                group = "Community",
                type = "Flag",
                kind = "flag",
                key = "LogHistory",
                label = "Log History",
                description = "Whether or not to log history."
            }
        };
        public static readonly IReadOnlyList<EditorEntry> Item = new List<EditorEntry>
        {
            new()
            {
                group = "Core",
                type = "Field",
                kind = "number",
                key = "Item",
                label = "Item ID",
                required = true,
                allowEmpty = false
            },

            new()
            {
                group = "Core",
                type = "Field",
                kind = "text",
                key = "Name",
                label = "Name",
                required = true,
                allowEmpty = false
            },

            new()
            {
                group = "Core",
                type = "Field",
                kind = "dropdown",
                key = "Class",
                label = "Class",
                options = new List<string>
                {
                    "Normal",
                    "Weapon",
                    "Armor",
                    "Food",
                    "Tool",
                    "Container",
                    "Surface",
                    "Wall",
                    "Door",
                    "Key",
                    "Book",
                    "Magic",
                    "Money"
                }
            },
            new()
            {
                group = "Core",
                type = "Field",
                kind = "text",
                key = "Type",
                label = "Type"
            },
            new()
            {
                group = "Stats",
                type = "Field",
                kind = "number",
                key = "Value",
                label = "Value"
            },
            new()
            {
                group = "Core",
                type = "Field",
                kind = "text",
                key = "SubType",
                label = "Sub Type"
            },

            new()
            {
                group = "Visual",
                type = "Field",
                kind = "sprite",
                picker = "itemSprite",
                key = "Image",
                label = "Image"
            },

            new()
            {
                group = "Visual",
                type = "Field",
                kind = "number",
                key = "ImageType",
                label = "Image Type"
            },

            new()
            {
                group = "Visual",
                type = "Field",
                kind = "sprite",
                picker = "itemSprite",
                key = "Animation0",
                label = "Animation 0"
            },

            new()
            {
                group = "Visual",
                type = "Field",
                kind = "sprite",
                picker = "itemSprite",
                key = "Animation1",
                label = "Animation 1"
            },
                        new()
            {
                group = "Visual",
                type = "Field",
                kind = "sprite",
                picker = "itemSprite",
                key = "Animation2",
                label = "Animation 2"
            },
                        new()
            {
                group = "Visual",
                type = "Field",
                kind = "sprite",
                picker = "itemSprite",
                key = "Animation3",
                label = "Animation 3"
            },
                        new()
            {
                group = "Visual",
                type = "Field",
                kind = "sprite",
                picker = "itemSprite",
                key = "Animation4",
                label = "Animation 4"
            },
                        new()
            {
                group = "Visual",
                type = "Field",
                kind = "sprite",
                picker = "itemSprite",
                key = "Animation5",
                label = "Animation 5"
            },
                        new()
            {
                group = "Visual",
                type = "Field",
                kind = "sprite",
                picker = "itemSprite",
                key = "Animation6",
                label = "Animation 6"
            },
                        new()
            {
                group = "Visual",
                type = "Field",
                kind = "sprite",
                picker = "itemSprite",
                key = "Animation7",
                label = "Animation 7"
            },
                        new()
            {
                group = "Visual",
                type = "Field",
                kind = "sprite",
                picker = "itemSprite",
                key = "Animation8",
                label = "Animation 8"
            },
                        new()
            {
                group = "Visual",
                type = "Field",
                kind = "sprite",
                picker = "itemSprite",
                key = "Animation9",
                label = "Animation 9"
            },

            new()
            {
                group = "Visual",
                type = "Field",
                kind = "sprite",
                picker = "wearSprite",
                key = "WearImage",
                label = "Wear Image"
            },

            new()
            {
                group = "Stats",
                type = "Field",
                kind = "dropdown",
                key = "Size",
                label = "Size",
                options = new List<string>
                {
                    "Tiny",
                    "Small",
                    "Medium",
                    "Large",
                    "Huge"
                }
            },
            new()
            {
                group = "Stats",
                type = "Field",
                kind = "number",
                key = "Burden",
                label = "Burden"
            },
            new()
            {
                group = "Stats",
                type = "Field",
                kind = "number",
                key = "StackLimit",
                label = "Stack Limit"
            },
            new()
            {
                group = "Equipment",
                type = "Field",
                kind = "dropdown",
                key = "ArmorSpot",
                label = "Armor Spot",
                options = new List<string> { "Head", "Chest", "Legs", "Back" }
            },

            new()
            {
                group = "Equipment",
                type = "Field",
                kind = "number",
                key = "ArmorLevel",
                label = "Armor Level"
            },

            new()
            {
                group = "Weapon",
                type = "Field",
                kind = "number",
                key = "DamageLow",
                label = "Damage Low"
            },

            new()
            {
                group = "Weapon",
                type = "Field",
                kind = "number",
                key = "DamageHigh",
                label = "Damage High"
            },

            new()
            {
                group = "Weapon",
                type = "Field",
                kind = "decimal",
                key = "AttackSpeed",
                label = "Attack Speed"
            },

            new()
            {
                group = "Equipment",
                type = "Field",
                kind = "dropdown",
                key = "WeaponDamageType",
                label = "Weapon Damage Type",
                options = new List<string>
                {
                    "Cut",
                    "Thrust",
                    "Bash",
                    "Magic",
                    "Fire",
                    "Ice",
                    "Electric",
                    "Cold"
                }
            },

            new()
            {
                group = "Equipment",
                type = "Field",
                kind = "number",
                key = "WeaponMinRange",
                label = "Weapon Min Range"
            },

            new()
            {
                group = "Equipment",
                type = "Field",
                kind = "number",
                key = "WeaponMaxRange",
                label = "Weapon Max Range"
            },

            new()
            {
                group = "Food",
                type = "Field",
                kind = "number",
                key = "Food",
                label = "Food"
            },

            new()
            {
                group = "Food",
                type = "Field",
                kind = "number",
                key = "Water",
                label = "Water"
            },

            new()
            {
                group = "Food",
                type = "Field",
                kind = "number",
                key = "FoodLife",
                label = "Food Life"
            },

            new()
            {
                group = "Food",
                type = "Field",
                kind = "number",
                key = "FoodStamina",
                label = "Food Stamina"
            },

            new()
            {
                group = "Food",
                type = "Field",
                kind = "number",
                key = "FoodMana",
                label = "Food Mana"
            },

            new()
            {
                group = "Food",
                type = "Field",
                kind = "number",
                key = "PoisonCure",
                label = "Poison Cure"
            },

            new()
            {
                group = "Flags",
                type = "Flag",
                kind = "flag",
                key = "Stackable",
                label = "Stackable",
            },

            new()
            {
                group = "Flags",
                type = "Flag",
                kind = "flag",
                key = "Destroyable",
                label = "Destroyable",
            },

            new()
            {
                group = "Flags",
                type = "Flag",
                kind = "flag",
                key = "Fixable",
                label = "Fixable",
            },

            new()
            {
                group = "Flags",
                type = "Flag",
                kind = "flag",
                key = "NotMovable",
                label = "Not Movable",
            },

            new()
            {
                group = "Flags",
                type = "Flag",
                kind = "flag",
                key = "NotPickupable",
                label = "Not Pickupable",
            },

            new()
            {
                group = "Flags",
                type = "Flag",
                kind = "flag",
                key = "NoDrop",
                label = "No Drop",
            },

            new()
            {
                group = "Flags",
                type = "Flag",
                kind = "flag",
                key = "2HandWeapon",
                label = "Two Hand Weapon",
            },
                        
            //Legacy / Alias
            new()
            {
                group = "Visual",
                type = "Field",
                kind = "sprite",
                picker = "itemSprite",
                key = "Animation",
                label = "Animation"
            },

            new()
            {
                group = "Stats",
                type = "Field",
                kind = "number",
                key = "Stack",
                label = "Stack"
            },

            //Stats
            new()
            {
                group = "Stats",
                type = "Field",
                kind = "text",
                key = "Group",
                label = "Group"
            },

            new()
            {
                group = "Stats",
                type = "Field",
                kind = "number",
                key = "Durability",
                label = "Durability"
            },

            new()
            {
                group = "Stats",
                type = "Field",
                kind = "number",
                key = "Damage",
                label = "Damage"
            },

            new()
            {
                group = "Stats",
                type = "Field",
                kind = "number",
                key = "TotalUses",
                label = "Total Uses"
            },

            new()
            {
                group = "Stats",
                type = "Field",
                kind = "number",
                key = "Rarity",
                label = "Rarity"
            },

            new()
            {
                group = "Stats",
                type = "Field",
                kind = "number",
                key = "Light",
                label = "Light"
            },

            new()
            {
                group = "Stats",
                type = "Field",
                kind = "number",
                key = "SelfRepair",
                label = "Self Repair"
            },

            new()
            {
                group = "Stats",
                type = "Field",
                kind = "number",
                key = "DynamicCycle",
                label = "Dynamic Cycle"
            },

            new()
            {
                group = "Stats",
                type = "Field",
                kind = "text",
                key = "DynamicDamage",
                label = "Dynamic Damage"
            },

            new()
            {
                group = "Stats",
                type = "Field",
                kind = "flag",
                key = "Artifact",
                label = "Artifact"
            },

            //Equipment
            new()
            {
                group = "Equipment",
                type = "Field",
                kind = "number",
                key = "WeaponDamage",
                label = "Weapon Damage"
            },

            new()
            {
                group = "Equipment",
                type = "Field",
                kind = "number",
                key = "WeaponSpeed",
                label = "Weapon Speed"
            },

            new()
            {
                group = "Equipment",
                type = "Field",
                kind = "dropdown",
                key = "EquipSlot",
                label = "Equipment Slot",
                options = new List<string>
                {
                    "Head",
                    "Chest",
                    "Legs",
                    "Back"
                }
            },

            new()
            {
                group = "Equipment",
                type = "Field",
                kind = "itemPicker",
                picker = "item",
                key = "BreakID",
                label = "Break ID"
            },

            new()
            {
                group = "Equipment",
                type = "Field",
                kind = "skillPicker",
                picker = "skill",
                key = "CombatSkill",
                label = "Combat Skill"
            },

            new()
            {
                group = "Equipment",
                type = "Field",
                kind = "number",
                key = "WeaponAL",
                label = "Weapon Armor Level"
            },

            new()
            {
                group = "Equipment",
                type = "Field",
                kind = "skillPicker",
                picker = "skill",
                key = "SkillReq",
                label = "Skill Required"
            },

            new()
            {
                group = "Equipment",
                type = "Field",
                kind = "number",
                key = "MagicArmorLevel",
                label = "Magic Armor Level"
            },

            new()
            {
                group = "Equipment",
                type = "Field",
                kind = "number",
                key = "FireAL",
                label = "Fire Armor Level"
            },

            new()
            {
                group = "Equipment",
                type = "Field",
                kind = "number",
                key = "ElectricAL",
                label = "Electric Armor Level"
            },

            new()
            {
                group = "Equipment",
                type = "Field",
                kind = "number",
                key = "ColdAL",
                label = "Cold Armor Level"
            },

            new()
            {
                group = "Equipment",
                type = "Field",
                kind = "number",
                key = "ThrustAL",
                label = "Thrust Armor Level"
            },

            new()
            {
                group = "Equipment",
                type = "Field",
                kind = "number",
                key = "BashAL",
                label = "Bash Armor Level"
            },

            new()
            {
                group = "Equipment",
                type = "Field",
                kind = "number",
                key = "CutAL",
                label = "Cut Armor Level"
            },

            new()
            {
                group = "Equipment",
                type = "Field",
                kind = "number",
                key = "CriticalBonus",
                label = "Critical Bonus"
            },

            new()
            {
                group = "Equipment",
                type = "Field",
                kind = "number",
                key = "EssenceSteal",
                label = "Essence Steal"
            },

            new()
            {
                group = "Equipment",
                type = "Field",
                kind = "number",
                key = "MagicPower",
                label = "Magic Power"
            },

            new()
            {
                group = "Equipment",
                type = "Field",
                kind = "decimal",
                key = "MagicBreakChance",
                label = "Magic Break Chance"
            },

            new()
            {
                group = "Equipment",
                type = "Field",
                kind = "decimal",
                key = "MagicStability",
                label = "Magic Stability"
            },

            new()
            {
                group = "Equipment",
                type = "Field",
                kind = "itemPicker",
                picker = "item",
                key = "MagicBreakItemID",
                label = "Magic Break Item ID"
            },

            new()
            {
                group = "Equipment",
                type = "Field",
                kind = "number",
                key = "MagicBreakDamage",
                label = "Magic Break Damage"
            },

            new()
            {
                group = "Equipment",
                type = "Field",
                kind = "number",
                key = "BreakDurability",
                label = "Break Durability"
            },

            new()
            {
                group = "Equipment",
                type = "Field",
                kind = "number",
                key = "ArmorDurability",
                label = "Armor Durability"
            },

            new()
            {
                group = "Equipment",
                type = "Field",
                kind = "number",
                key = "WeaponDurability",
                label = "Weapon Durability"
            },

            new()
            {
                group = "Equipment",
                type = "Field",
                kind = "number",
                key = "PoisonDamage",
                label = "Poison Damage"
            },

            new()
            {
                group = "Equipment",
                type = "Field",
                kind = "flag",
                key = "Blood",
                label = "Blood"
            },

            new()
            {
                group = "Equipment",
                type = "Field",
                kind = "bool",
                key = "Ammo",
                label = "Ammo",
            },

            new()
            {
                group = "Equipment",
                type = "Field",
                kind = "flag",
                key = "MissleWeapon",
                label = "Missile Weapon",
            },

            //Visual
            new()
            {
                group = "Visual",
                type = "Field",
                kind ="spritePicker",
                picker = "sprite",
                key = "AttackAnimation",
                label = "Attack Animation"
            },

            new()
            {
                group = "Visual",
                type = "Field",
                kind = "animationPicker",
                picker = "animation",
                label = "Projectile Animation"
            },

            new()
            {
                group = "Visual",
                type = "Field",
                kind = "number",
                key = "FlagDown",
                label = "Flag Down"
            },

            new()
            {
                group = "Visual",
                type = "Field",
                kind = "number",
                key = "FlagUp",
                label = "Flag Up"
            },

            new()
            {
                group = "Visual",
                type = "Field",
                kind = "animationPicker",
                picker = "animation",
                label = "Scan Animation"
            },

            //Terrain / Surface
            new()
            {
                group = "Terrain",
                type = "Field",
                kind = "text",
                key = "Terrain",
                label = "Terrain"
            },

            new()
            {
                group = "Terrain",
                type = "Field",
                kind = "flag",
                key = "FireCatch",
                label = "Fire Catch",
            },

            new()
            {
                group = "Terrain",
                type = "Field",
                kind = "bool",
                key = "AllowSurfaceGrowth",
                label = "Allow Surface Growth",
            },

            new()
            {
                group = "Terrain",
                type = "Field",
                kind = "number",
                key = "GrowthHighElevation",
                label = "Growth High Elevation"
            },

            new()
            {
                group = "Terrain",
                type = "Field",
                kind = "number",
                key = "GrowthLowElevation",
                label = "Growth Low Elevation"
            },

            new()
            {
                group = "Terrain",
                type = "Field",
                kind = "number",
                key = "StepOnID",
                label = "Step On ID"
            },

            new()
            {
                group = "Terrain",
                type = "Field",
                kind = "itemPicker",
                picker = "item",
                key = "TriggerID",
                label = "Trigger ID"
            },

            new()
            {
                group = "Terrain",
                type = "Field",
                kind = "magicPicker",
                picker = "magic",
                key = "TrapEffect",
                label = "Trap Effect"
            },

            new()
            {
                group = "Terrain",
                type = "Field",
                kind = "number",
                key = "HoldDamage",
                label = "Hold Damage"
            },

            new()
            {
                group = "Terrain",
                type = "Field",
                kind = "dropdown",
                key = "FishDepth",
                label = "Fishing Depth",
                options = new List<string>
                {
                    "Shallow",
                    "Medium",
                    "Deep"
                }
            },

            new()
            {
                group = "Terrain",
                type = "Field",
                kind = "number",
                key = "WarmthRadius",
                label = "Warmth Radius"
            },

            new()
            {
                group = "Terrain",
                type = "Field",
                kind = "number",
                key = "Warmth",
                label = "Warmth"
            },

            new()
            {
                group = "Terrain",
                type = "Field",
                kind = "number",
                key = "Coolness",
                label = "Coolness"
            },

            new()
            {
                group = "Terrain",
                type = "Field",
                kind = "number",
                key = "RestGain",
                label = "Rest Gain"
            },

            new()
            {
                group = "Terrain",
                type = "Field",
                kind = "flag",
                key = "Bounce",
                label = "Bounce"
            },

            new()
            {
                group = "Terrain",
                type = "Field",
                kind = "text",
                key = "MoveDirection",
                label = "Move Direction"
            },

            new()
            {
                group = "Terrain",
                type = "Field",
                kind = "number",
                key = "DayID",
                label = "Day ID"
            },

            new()
            {
                group = "Terrain",
                type = "Field",
                kind = "number",
                key = "NiteID",
                label = "Nite ID"
            },

            new()
            {
                group = "Terrain",
                type = "Field",
                kind = "number",
                key = "PoisonRate",
                label = "Poison Rate"
            },

            new()
            {
                group = "Terrain",
                type = "Field",
                kind = "flag",
                key = "StandDamage",
                label = "Stand Damage",
            },

            //Growth
            new()
            {
                group = "Growth",
                type = "Field",
                kind = "number",
                key = "GrowthSproutChance",
                label = "Growth Sprout Chance"
            },

            new()
            {
                group = "Growth",
                type = "Field",
                kind = "itemPicker",
                picker = "item",
                key = "GrowthSproutItem",
                label = "Growth Sprout Item"
            },

            new()
            {
                group = "Growth",
                type = "Field",
                kind = "number",
                key = "GrowthSproutRadius",
                label = "Growth Sprout Radius"
            },

            new()
            {
                group = "Growth",
                type = "Field",
                kind = "number",
                key = "DegradeDelta",
                label = "Degrade Delta"
            },

            new()
            {
                group = "Growth",
                type = "Field",
                kind = "itemPicker",
                picker = "item",
                key = "DegradeItem",
                label = "Degrade Item"
            },

            new()
            {
                group = "Growth",
                type = "Field",
                kind = "number",
                key = "GrowthDelta",
                label = "Growth Delta"
            },

            new()
            {
                group = "Growth",
                type = "Field",
                kind = "itemPicker",
                picker = "item",
                key = "GrowthItem",
                label = "Growth Item"
            },

            new()
            {
                group = "Growth",
                type = "Field",
                kind = "text",
                key = "GrowthGrassKill",
                label = "Growth Grass Kill"
            },

            new()
            {
                group = "Growth",
                type = "Field",
                kind = "itemPicker",
                picker = "item",
                key = "GrowthDeadItem",
                label = "Growth Dead Item"
            },

            new()
            {
                group = "Growth",
                type = "Field",
                kind = "decimal",
                key = "GrowthDeathChance",
                label = "Growth Death Chance"
            },

            new()
            {
                group = "Growth",
                type = "Field",
                kind = "text",
                key = "GrowthMassSpread",
                label = "Growth Mass Spread"
            },

            new()
            {
                group = "Growth",
                type = "Field",
                kind = "text",
                key = "GrowthElevationRange",
                label = "Growth Elevation Range"
            },

            new()
            {
                group = "Growth",
                type = "Field",
                kind = "number",
                key = "GrowthCrowding",
                label = "Growth Crowding"
            },

            //Bonus
            new()
            {
                group = "Bonus",
                type = "Field",
                kind = "number",
                key = "BonusCount",
                label = "Bonus Count"
            },

            new()
            {
                group = "Bonus",
                type = "Field",
                kind = "text",
                key = "SkillBonus",
                label = "Skill Bonus"
            },

            new()
            {
                group = "Bonus",
                type = "Field",
                kind = "skillPicker",
                picker = "skill",
                key = "SkillIDBonus",
                label = "Skill ID Bonus"
            },

            new()
            {
                group = "Bonus",
                type = "Field",
                kind = "number",
                key = "DexterityBonus",
                label = "Dexterity Bonus"
            },

            new()
            {
                group = "Bonus",
                type = "Field",
                kind = "number",
                key = "IntelligenceBonus",
                label = "Intelligence Bonus"
            },

            new()
            {
                group = "Bonus",
                type = "Field",
                kind = "number",
                key = "QuicknessBonus",
                label = "Quickness Bonus"
            },

            new()
            {
                group = "Bonus",
                type = "Field",
                kind = "number",
                key = "StrengthBonus",
                label = "Strength Bonus"
            },

            new()
            {
                group = "Bonus",
                type = "Field",
                kind = "number",
                key = "WisdomBonus",
                label = "Wisdom Bonus"
            },

            new()
            {
                group = "Bonus",
                type = "Field",
                kind = "text",
                key = "Data1",
                label = "Data 1"
            },

            new()
            {
                group = "Bonus",
                type = "Field",
                kind = "text",
                key = "Data2",
                label = "Data 2"
            },

            new()
            {
                group = "Bonus",
                type = "Field",
                kind = "text",
                key = "Data3",
                label = "Data 3"
            },

            new()
            {
                group = "Bonus",
                type = "Field",
                kind = "text",
                key = "Data4",
                label = "Data 4"
            },

            new()
            {
                group = "Bonus",
                type = "Field",
                kind = "text",
                key = "Writing",
                label = "Writing"
            },

            //Starter
            new()
            {
                group = "Starter",
                type = "Field",
                kind = "skillPicker",
                picker = "skill",
                key = "StarterSkill",
                label = "Starter Skill"
            },

            new()
            {
                group = "Starter",
                type = "Field",
                kind = "number",
                key = "StarterQty",
                label = "Starter Quantity"
            },

            //Trader
            new()
            {
                group = "Trader",
                type = "Field",
                kind = "number",
                key = "TraderMax",
                label = "Trader Max"
            },

            new()
            {
                group = "Trader",
                type = "Flag",
                kind = "flag",
                key = "AlwaysStock",
                label = "Always Stock",
            },

            //Spawn
            new()
            {
                group = "Spawn",
                type = "Field",
                kind = "monsterPicker",
                picker = "monster",
                key = "SpawnMonster",
                label = "Spawn Monster"
            },

            new()
            {
                group = "Spawn",
                type = "Field",
                kind = "decimal",
                key = "SpawnMonsterChance",
                label = "Spawn Monster Chance"
            },

            new()
            {
                group = "Spawn",
                type = "Field",
                kind = "number",
                key = "SpawnMonsterTimeout",
                label = "Spawn Monster Timeout"
            },

            new()
            {
                group = "Spawn",
                type = "Field",
                kind = "itemPicker",
                picker = "item",
                key = "ItemSpawn",
                label = "Item Spawn"
            },

            new()
            {
                group = "Spawn",
                type = "Field",
                kind = "number",
                key = "ItemSpawnDelta",
                label = "Item Spawn Delta"
            },

            //Dungeon / Warp
            new()
            {
                group = "Dungeon",
                type = "Field",
                kind = "text",
                key = "Dungeon",
                label = "Dungeon"
            },

            new()
            {
                group = "Dungeon",
                type = "Field",
                kind = "text",
                key = "BuildWarp",
                label = "Build Warp"
            },

            new()
            {
                group = "Dungeon",
                type = "Field",
                kind = "text",
                key = "DungeonWarp",
                label = "Dungeon Warp"
            },

            new()
            {
                group = "Dungeon",
                type = "Field",
                kind = "number",
                key = "DungeonAddSize",
                label = "Dungeon Add Size"
            },

            new()
            {
                group = "Dungeon",
                type = "Field",
                kind = "number",
                key = "DungeonSurface",
                label = "Dungeon Surface"
            },

            new()
            {
                group = "Dungeon",
                type = "Field",
                kind = "number",
                key = "InvasionID",
                label = "Invasion ID"
            },

            //Misc
            new()
            {
                group = "Misc",
                type = "Field",
                kind = "text",
                key = "Build",
                label = "Build"
            },

            new()
            {
                group = "Misc",
                type = "Field",
                kind = "number",
                key = "MineSkillReq",
                label = "Mine Skill Required"
            },

            new()
            {
                group = "Misc",
                type = "Field",
                kind = "itemPicker",
                picker = "item",
                key = "ExcludeItem",
                label = "Exclude Item"
            },

            new()
            {
                group = "Misc",
                type = "Field",
                kind = "flag",
                key = "Scanable",
                label = "Scanable"
            },

            new()
            {
                group = "Misc",
                type = "Field",
                kind = "flag",
                key = "StealthVision",
                label = "Stealth Vision"
            },

            //Flags
            new()
            {
                group = "Flags",
                type = "Flag",
                kind = "flag",
                key = "OpenSightLine",
                label = "Open Sight Line",
            },

            new()
            {
                group = "Flags",
                type = "Flag",
                kind = "flag",
                key = "StaminaDamage",
                label = "Stamina Damage",
            },

            new()
            {
                group = "Flags",
                type = "Flag",
                kind = "flag",
                key = "ShieldBreak",
                label = "Shield Break",
            },

            new()
            {
                group = "Flags",
                type = "Flag",
                kind = "flag",
                key = "IgnoreShields",
                label = "Ignore Shields",
            },

            new()
            {
                group = "Flags",
                type = "Flag",
                kind = "flag",
                key = "Invisible",
                label = "Invisible",
            },

            new()
            {
                group = "Flags",
                type = "Flag",
                kind = "flag",
                key = "Lockable",
                label = "Lockable",
            },

            new()
            {
                group = "Flags",
                type = "Flag",
                kind = "flag",
                key = "Keyable",
                label = "Keyable",
            },

            new()
            {
                group = "Flags",
                type = "Flag",
                kind = "flag",
                key = "Readable",
                label = "Readable",
            },

            new()
            {
                group = "Flags",
                type = "Flag",
                kind = "flag",
                key = "NotContainerable",
                label = "Not Containerable",
            },

            new()
            {
                group = "Flags",
                type = "Flag",
                kind = "flag",
                key = "Postable",
                label = "Postable",
            },

            new()
            {
                group = "Flags",
                type = "Flag",
                kind = "flag",
                key = "Ancient",
                label = "Ancient",
            },

            new()
            {
                group = "Flags",
                type = "Flag",
                kind = "flag",
                key = "PKDamage",
                label = "PK Damage",
            },

            new()
            {
                group = "Flags",
                type = "Flag",
                kind = "flag",
                key = "BlockMovement",
                label = "Block Movement",
            },

            new()
            {
                group = "Flags",
                type = "Flag",
                kind = "flag",
                key = "NoDeathDrop",
                label = "No Death Drop",
            },

            new()
            {
                group = "Flags",
                type = "Flag",
                kind = "flag",
                key = "NoEconomyValueDrop",
                label = "No Economy Value Drop",
            }
        };
    
        public static readonly IReadOnlyList<EditorEntry> Skill = new List<EditorEntry>
        {
            //Core
            new()
            {
                group = "Core",
                type = "Field",
                kind = "number",
                key = "Skill",
                label = "Skill ID",
                required = true,
                description = "The unique Skill ID. This is the block header: Skill=<id>."
            },

            new()
            {
                group = "Core",
                type = "Field",
                kind = "text",
                key = "Name",
                label = "Name",
                required = true,
                description = "Display name of the skill."
            },

            //General
            new()
            {
                group = "General",
                type = "Field",
                kind = "flag",
                key = "Usable",
                label = "Usable",
                description = "Whether this skill can be actively used."
            },

            new()
            {
                group = "General",
                type = "Field",
                kind = "number",
                key = "SkillPoints",
                label = "Skill Points",
                description = "Skill point cost or value."
            },

            new()
            {
                group = "General",
                type = "Field",
                kind = "text",
                key = "Description",
                label = "Description",
                description = "Description shown for the skill."
            },

            new()
            {
                group = "General",
                type = "Field",
                kind = "dropdown",
                key = "Purpose",
                label = "Purpose",
                options = new List<string>
                {
                    "",
                    "Melee",
                    "Missle",
                    "Magic"
                },
                description = "Skill purpose/category. Kept as Missle to match legacy spelling."
            },

            //Attributes
            new()
            {
                group = "Attributes",
                type = "Flag",
                kind = "flag",
                key = "Str",
                label = "Strength",
                defaultValue = "false",
                description = "Strength contributes to this skill."
            },

            new()
            {
                group = "Attributes",
                type = "Flag",
                kind = "flag",
                key = "Dex",
                label = "Dexterity",
                defaultValue = "false",
                description = "Dexterity contributes to this skill."
            },

            new()
            {
                group = "Attributes",
                type = "Flag",
                kind = "flag",
                key = "Quick",
                label = "Quickness",
                defaultValue = "false",
                description = "Quickness contributes to this skill."
            },

            new()
            {
                group = "Attributes",
                type = "Flag",
                kind = "flag",
                key = "Intel",
                label = "Intelligence",
                defaultValue = "false",
                description = "Intelligence contributes to this skill. Legacy reader also accepts Int."
            },

            new()
            {
                group = "Attributes",
                type = "Flag",
                kind = "flag",
                key = "Wisdom",
                label = "Wisdom",
                defaultValue = "false",
                description = "Wisdom contributes to this skill. Legacy reader also accepts Wis."
            },

            new()
            {
                group = "Attributes",
                type = "Field",
                kind = "number",
                key = "Divisor",
                label = "Divisor",
                description = "Divisor used in skill calculation."
            },

            new()
            {
                group = "Attributes",
                type = "Flag",
                kind = "flag",
                key = "BurdenFactor",
                label = "Burden Factor",
                defaultValue = "false",
                description = "Whether burden affects this skill."
            },

            //Flags
            new()
            {
                group = "Flags",
                type = "Flag",
                kind = "flag",
                key = "SpecialFeature",
                label = "Special Feature",
                defaultValue = "false",
                description = "Marks the skill as having a special feature."
            },

            new()
            {
                group = "Flags",
                type = "Flag",
                kind = "flag",
                key = "FreeSkill",
                label = "Free Skill",
                defaultValue = "false",
                description = "Marks the skill as free."
            },

            new()
            {
                group = "Flags",
                type = "Flag",
                kind = "number",
                key = "LevelReq",
                label = "Level Required",
                defaultValue = "false",
                description = "Marks the skill as having a level requirement."
            },

            new()
            {
                group = "Flags",
                type = "Flag",
                kind = "flag",
                key = "ExcludeSkill",
                label = "Exclude Skill",
                defaultValue = "false",
                description = "Marks the skill as excluded."
            }
        };
    
    public static readonly IReadOnlyList<EditorEntry> Monster = new List<EditorEntry>
    {
        //Core
        new()
        {
            group = "Core",
            type = "Field",
            kind = "number",
            key = "Monster",
            label = "Monster ID",
            required = true
        },

        new()
        {
            group = "Core",
            type = "Field",
            kind = "text",
            key = "Name",
            label = "Name",
            required = true
        },

        new()
        {
            group = "Core",
            type = "Field",
            kind = "text",
            key = "Class",
            label = "Class"
        },

        new()
        {
            group = "Core",
            type = "Field",
            kind = "text",
            key = "Type",
            label = "Type"
        },

        new()
        {
            group = "Core",
            type = "Field",
            kind = "text",
            key = "SubType",
            label = "Sub Type"
        },

        new()
        {
            group = "Core",
            type = "Field",
            kind = "text",
            key = "Catagory",
            label = "Catagory"
        },

        new()
        {
            group = "Core",
            type = "Field",
            kind = "number",
            key = "Level",
            label = "Level"
        },

        //Visual
        new()
        {
            group = "Visual",
            type = "Field",
            kind = "spritePicker",
            picker = "monsterSprite",
            key = "Image",
            label = "Image"
        },

        new()
        {
            group = "Visual",
            type = "Field",
            kind = "animationPicker",
            picker = "animation",
            key = "Animation",
            label = "Animation"
        },

        new()
        {
            group = "Visual",
            type = "Field",
            kind = "animationPicker",
            picker = "animation",
            key = "Animation0",
            label = "Animation 0"
        },

        new()
        {
            group = "Visual",
            type = "Field",
            kind = "animationPicker",
            picker = "animation",
            key = "Animation1",
            label = "Animation 1"
        },

        new()
        {
            group = "Visual",
            type = "Field",
            kind = "animationPicker",
            picker = "animation",
            key = "Animation2",
            label = "Animation 2"
        },

        new()
        {
            group = "Visual",
            type = "Field",
            kind = "animationPicker",
            picker = "animation",
            key = "Animation3",
            label = "Animation 3"
        },

        new()
        {
            group = "Visual",
            type = "Field",
            kind = "number",
            key = "ImageType",
            label = "Image Type"
        },

        new()
        {
            group = "Visual",
            type = "Field",
            kind = "animationPicker",
            picker = "animation",
            key = "GreetingAnimation",
            label = "Greeting Animation"
        },

        //Stats
        new()
        {
            group = "Stats",
            type = "Field",
            kind = "number",
            key = "Life",
            label = "Life"
        },

        new()
        {
            group = "Stats",
            type = "Field",
            kind = "number",
            key = "Health",
            label = "Health"
        },

        new()
        {
            group = "Stats",
            type = "Field",
            kind = "number",
            key = "Stamina",
            label = "Stamina"
        },

        new()
        {
            group = "Stats",
            type = "Field",
            kind = "number",
            key = "Mana",
            label = "Mana"
        },

        new()
        {
            group = "Stats",
            type = "Field",
            kind = "number",
            key = "Strength",
            label = "Strength"
        },

        new()
        {
            group = "Stats",
            type = "Field",
            kind = "number",
            key = "Dexterity",
            label = "Dexterity"
        },

        new()
        {
            group = "Stats",
            type = "Field",
            kind = "number",
            key = "Quickness",
            label = "Quickness"
        },

        new()
        {
            group = "Stats",
            type = "Field",
            kind = "number",
            key = "Intelligence",
            label = "Intelligence"
        },

        new()
        {
            group = "Stats",
            type = "Field",
            kind = "number",
            key = "Wisdom",
            label = "Wisdom"
        },

        new()
        {
            group = "Stats",
            type = "Field",
            kind = "number",
            key = "Experience",
            label = "Experience"
        },

        new()
        {
            group = "Stats",
            type = "Field",
            kind = "number",
            key = "Money",
            label = "Money"
        },

        //Combat
        new()
        {
            group = "Combat",
            type = "Field",
            kind = "number",
            key = "Attack",
            label = "Attack"
        },

        new()
        {
            group = "Combat",
            type = "Field",
            kind = "number",
            key = "Defense",
            label = "Defense"
        },

        new()
        {
            group = "Combat",
            type = "Field",
            kind = "number",
            key = "MeleeDefense",
            label = "Melee Defense"
        },

        new()
        {
            group = "Combat",
            type = "Field",
            kind = "number",
            key = "MissleDefense",
            label = "Missile Defense"
        },

        new()
        {
            group = "Combat",
            type = "Field",
            kind = "number",
            key = "MagicDefense",
            label = "Magic Defense"
        },

        new()
        {
            group = "Combat",
            type = "Field",
            kind = "number",
            key = "DamageLow",
            label = "Damage Low"
        },

        new()
        {
            group = "Combat",
            type = "Field",
            kind = "number",
            key = "DamageHigh",
            label = "Damage High"
        },

        new()
        {
            group = "Combat",
            type = "Field",
            kind = "double",
            key = "AttackSpeed",
            label = "Attack Speed"
        },

        new()
        {
            group = "Weapon",
            type = "Field",
            kind = "dropdown",
            key = "WeaponDamageType",
            label = "Weapon Damage Type",
            options = new List<string>
            {
                "Cut",
                "Thrust",
                "Bash",
                "Magic",
                "Fire",
                "Ice",
                "Electric",
                "Cold"
            }
        },

        new()
        {
            group = "Combat",
            type = "Field",
            kind = "number",
            key = "Unarmed",
            label = "Unarmed"
        },

        new()
        {
            group = "Combat",
            type = "Field",
            kind = "number",
            key = "Scan",
            label = "Scan"
        },

        new()
        {
            group = "Combat",
            type = "Field",
            kind = "decimal",
            key = "FearFactor",
            label = "Fear Factor"
        },

        new()
        {
            group = "Combat",
            type = "Field",
            kind = "text",
            key = "DamageFragments",
            label = "Damage Fragments"
        },

        new()
        {
            group = "Misc",
            type = "Field",
            kind = "flag",
            key = "RobPlayer",
            label = "Rob Player"
        },

        //Armor
        new()
        {
            group = "Armor",
            type = "Field",
            kind = "number",
            key = "ArmorLevel",
            label = "Armor Level"
        },

        new()
        {
            group = "Armor",
            type = "Field",
            kind = "number",
            key = "MagicArmorLevel",
            label = "Magic Armor Level"
        },

        new()
        {
            group = "Armor",
            type = "Field",
            kind = "number",
            key = "FireAL",
            label = "Fire Armor Level"
        },

        new()
        {
            group = "Armor",
            type = "Field",
            kind = "number",
            key = "ColdAL",
            label = "Cold Armor Level"
        },

        new()
        {
            group = "Armor",
            type = "Field",
            kind = "number",
            key = "ElectricAL",
            label = "Electric Armor Level"
        },

        new()
        {
            group = "Armor",
            type = "Field",
            kind = "number",
            key = "BashAL",
            label = "Bash Armor Level"
        },

        new()
        {
            group = "Armor",
            type = "Field",
            kind = "number",
            key = "CutAL",
            label = "Cut Armor Level"
        },

        new()
        {
            group = "Armor",
            type = "Field",
            kind = "number",
            key = "ThrustAL",
            label = "Thrust Armor Level"
        },

        new()
        {
            group = "Armor",
            type = "Field",
            kind = "itemPicker",
            picker = "item",
            key = "ChestArmor",
            label = "Chest Armor"
        },

        new()
        {
            group = "Armor",
            type = "Field",
            kind = "itemPicker",
            picker = "item",
            key = "HeadArmor",
            label = "Head Armor"
        },

        new()
        {
            group = "Armor",
            type = "Field",
            kind = "itemPicker",
            picker = "item",
            key = "LegArmor",
            label = "Leg Armor"
        },

        new()
        {
            group = "Armor",
            type = "Field",
            kind = "itemPicker",
            picker = "item",
            key = "Sheild",
            label = "Shield"
        },

        //Equipment
        new()
        {
            group = "Weapon",
            type = "Field",
            kind = "itemPicker",
            picker = "item",
            key = "Weapon",
            label = "Weapon"
        },

        new()
        {
            group = "Weapon",
            type = "Field",
            kind = "itemPicker",
            picker = "item",
            key = "RangeWeapon",
            label = "Range Weapon"
        },

        new()
        {
            group = "Treasure",
            type = "Field",
            kind = "itemPicker",
            picker = "item",
            key = "DeadItem",
            label = "Dead Item"
        },

        //Movement / AI
        new()
        {
            group = "Movement",
            type = "Field",
            kind = "number",
            key = "Speed",
            label = "Speed"
        },

        new()
        {
            group = "Movement",
            type = "Field",
            kind = "number",
            key = "MoveSpeed",
            label = "Move Speed"
        },

        new()
        {
            group = "Movement",
            type = "Field",
            kind = "number",
            key = "SightRange",
            label = "Sight Range"
        },

        new()
        {
            group = "Movement",
            type = "Field",
            kind = "number",
            key = "ChaseRange",
            label = "Chase Range"
        },

        new()
        {
            group = "Movement",
            type = "Field",
            kind = "number",
            key = "KeepDistance",
            label = "Keep Distance"
        },

        new()
        {
            group = "Movement",
            type = "Field",
            kind = "number",
            key = "Run",
            label = "Run"
        },

        new()
        {
            group = "Movement",
            type = "Field",
            kind = "number",
            key = "Roam",
            label = "Roam"
        },

        new()
        {
            group = "Movement",
            type = "Field",
            kind = "number",
            key = "RoamChance",
            label = "Roam Chance"
        },

        new()
        {
            group = "Movement",
            type = "Field",
            kind = "number",
            key = "Swim",
            label = "Swim"
        },

        new()
        {
            group = "Movement",
            type = "Field",
            kind = "flag",
            key = "WarpMove",
            label = "Warp Move"
        },

        new()
        {
            group = "Movement",
            type = "Field",
            kind = "itemPicker",
            picker = "item",
            key = "ChaseItem",
            label = "Chase Item"
        },

        //Skills
        new()
        {
            group = "Skills",
            type = "Field",
            kind = "number",
            key = "Sword",
            label = "Sword"
        },

        new()
        {
            group = "Skills",
            type = "Field",
            kind = "number",
            key = "Dagger",
            label = "Dagger"
        },

        new()
        {
            group = "Skills",
            type = "Field",
            kind = "number",
            key = "Bow",
            label = "Bow"
        },

        new()
        {
            group = "Skills",
            type = "Field",
            kind = "number",
            key = "Throwing",
            label = "Throwing"
        },

        new()
        {
            group = "Skills",
            type = "Field",
            kind = "number",
            key = "Crossbow",
            label = "Crossbow"
        },

        new()
        {
            group = "Skills",
            type = "Field",
            kind = "number",
            key = "Axe",
            label = "Axe"
        },

        new()
        {
            group = "Skills",
            type = "Field",
            kind = "number",
            key = "Mace",
            label = "Mace"
        },

        new()
        {
            group = "Skills",
            type = "Field",
            kind = "number",
            key = "Flail",
            label = "Flail"
        },

        new()
        {
            group = "Skills",
            type = "Field",
            kind = "number",
            key = "Scythe",
            label = "Scythe"
        },

        new()
        {
            group = "Skills",
            type = "Field",
            kind = "number",
            key = "Staff",
            label = "Staff"
        },

        new()
        {
            group = "Skills",
            type = "Field",
            kind = "number",
            key = "Spear",
            label = "Spear"
        },

        new()
        {
            group = "Skills",
            type = "Field",
            kind = "number",
            key = "Sneak",
            label = "Sneak"
        },

        new()
        {
            group = "Skills",
            type = "Field",
            kind = "number",
            key = "Stealth",
            label = "Stealth"
        },

        //Magic
        new()
        {
            group = "Magic",
            type = "Field",
            kind = "magicPicker",
            picker = "magic",
            key = "CastSpell",
            label = "Cast Spell"
        },
        /*
        new()
        {
            group = "Magic",
            type = "Field",
            kind = "magicPicker",
            picker = "magic",
            key = "CastHeal",
            label = "Cast Heal"
        },

        new()
        {
            group = "Magic",
            type = "Field",
            kind = "magicPicker",
            picker = "magic",
            key = "CastHarm",
            label = "Cast Harm"
        },

        new()
        {
            group = "Magic",
            type = "Field",
            kind = "magicPicker",
            picker = "magic",
            key = "CastNova",
            label = "Cast Nova"
        },

        new()
        {
            group = "Magic",
            type = "Field",
            kind = "magicPicker",
            picker = "magic",
            key = "CastHero",
            label = "Cast Hero"
        },

        new()
        {
            group = "Magic",
            type = "Field",
            kind = "magicPicker",
            picker = "magic",
            key = "CastIce",
            label = "Cast Ice"
        },

        new()
        {
            group = "Magic",
            type = "Field",
            kind = "magicPicker",
            picker = "magic",
            key = "CastBlackHole",
            label = "Cast Black Hole"
        },

        new()
        {
            group = "Magic",
            type = "Field",
            kind = "bool",
            key = "CastLightning",
            label = "Cast Lightning",
            defaultValue = "false"
        },
        */
        new()
        {
            group = "Magic",
            type = "Field",
            kind = "decimal",
            key = "MagicPower",
            label = "Magic Power"
        },

        //Spawn / Growth
        new()
        {
            group = "Spawn",
            type = "Field",
            kind = "number",
            key = "SpawnTime",
            label = "Spawn Time"
        },

        new()
        {
            group = "Spawn",
            type = "Field",
            kind = "number",
            key = "SpawnRange",
            label = "Spawn Range"
        },

        new()
        {
            group = "Spawn",
            type = "Field",
            kind = "itemPicker",
            picker = "item",
            key = "SpawnItem",
            label = "Spawn Item"
        },

        new()
        {
            group = "Spawn",
            type = "Field",
            kind = "decimal",
            key = "SpawnItemChance",
            label = "Spawn Item Chance"
        },

        new()
        {
            group = "Spawn",
            type = "Field",
            kind = "number",
            key = "SpawnItemTimeout",
            label = "Spawn Item Timeout"
        },

        new()
        {
            group = "Spawn",
            type = "Field",
            kind = "monsterPicker",
            picker = "monster",
            key = "SpawnMonster",
            label = "Spawn Monster"
        },

        new()
        {
            group = "Spawn",
            type = "Field",
            kind = "decimal",
            key = "SpawnMonsterChance",
            label = "Spawn Monster Chance"
        },

        new()
        {
            group = "Spawn",
            type = "Field",
            kind = "number",
            key = "SpawnMonsterTimeout",
            label = "Spawn Monster Timeout"
        },

        new()
        {
            group = "Spawn",
            type = "Field",
            kind = "itemPicker",
            picker = "item",
            key = "ItemTrail",
            label = "Item Trail"
        },

        new()
        {
            group = "Growth",
            type = "Field",
            kind = "monsterPicker",
            picker = "monster",
            key = "GrowthMonster",
            label = "Growth Monster"
        },

        new()
        {
            group = "Growth",
            type = "Field",
            kind = "number",
            key = "GrowthMonsterChance",
            label = "Growth Monster Chance"
        },

        new()
        {
            group = "Growth",
            type = "Field",
            kind = "number",
            key = "GrowthMonsterTimeout",
            label = "Growth Monster Timeout"
        },

        new()
        {
            group = "Growth",
            type = "Field",
            kind = "itemPicker",
            picker = "item",
            key = "IdleTransformItem",
            label = "Idle Transform Item"
        },

        //Taming
        new()
        {
            group = "Taming",
            type = "Field",
            kind = "skillPicker",
            picker = "skill",
            key = "TameSkill",
            label = "Tame Skill"
        },

        new()
        {
            group = "Taming",
            type = "Field",
            kind = "number",
            key = "TameDifficulty",
            label = "Tame Difficulty"
        },

        //Loot / Treasure: real monster.ini uses fixed numbered slots Treasure0-Treasure9,
        //not a repeated bare "Treasure=" key - confirmed against Original References/monster.ini.
        new()
        {
            group = "Treasure",
            type = "Field",
            kind = "text",
            key = "Treasure0",
            label = "Treasure 0",
            description = "Loot slot 0: an item name, the special keyword \"Gold\" (drops currency), or \"<GroupName>\" to pull a random item from one of treasure.ini's named groups."
        },

        new()
        {
            group = "Treasure",
            type = "Field",
            kind = "number",
            key = "TreasureQty0",
            label = "Treasure Quantity 0"
        },

        new()
        {
            group = "Treasure",
            type = "Field",
            kind = "decimal",
            key = "TreasureChance0",
            label = "Treasure Chance 0"
        },

        new()
        {
            group = "Treasure",
            type = "Field",
            kind = "text",
            key = "Treasure1",
            label = "Treasure 1",
            description = "Loot slot 1: an item name, the special keyword \"Gold\" (drops currency), or \"<GroupName>\" to pull a random item from one of treasure.ini's named groups."
        },

        new()
        {
            group = "Treasure",
            type = "Field",
            kind = "number",
            key = "TreasureQty1",
            label = "Treasure Quantity 1"
        },

        new()
        {
            group = "Treasure",
            type = "Field",
            kind = "decimal",
            key = "TreasureChance1",
            label = "Treasure Chance 1"
        },

        new()
        {
            group = "Treasure",
            type = "Field",
            kind = "text",
            key = "Treasure2",
            label = "Treasure 2",
            description = "Loot slot 2: an item name, the special keyword \"Gold\" (drops currency), or \"<GroupName>\" to pull a random item from one of treasure.ini's named groups."
        },

        new()
        {
            group = "Treasure",
            type = "Field",
            kind = "number",
            key = "TreasureQty2",
            label = "Treasure Quantity 2"
        },

        new()
        {
            group = "Treasure",
            type = "Field",
            kind = "decimal",
            key = "TreasureChance2",
            label = "Treasure Chance 2"
        },

        new()
        {
            group = "Treasure",
            type = "Field",
            kind = "text",
            key = "Treasure3",
            label = "Treasure 3",
            description = "Loot slot 3: an item name, the special keyword \"Gold\" (drops currency), or \"<GroupName>\" to pull a random item from one of treasure.ini's named groups."
        },

        new()
        {
            group = "Treasure",
            type = "Field",
            kind = "number",
            key = "TreasureQty3",
            label = "Treasure Quantity 3"
        },

        new()
        {
            group = "Treasure",
            type = "Field",
            kind = "decimal",
            key = "TreasureChance3",
            label = "Treasure Chance 3"
        },

        new()
        {
            group = "Treasure",
            type = "Field",
            kind = "text",
            key = "Treasure4",
            label = "Treasure 4",
            description = "Loot slot 4: an item name, the special keyword \"Gold\" (drops currency), or \"<GroupName>\" to pull a random item from one of treasure.ini's named groups."
        },

        new()
        {
            group = "Treasure",
            type = "Field",
            kind = "number",
            key = "TreasureQty4",
            label = "Treasure Quantity 4"
        },

        new()
        {
            group = "Treasure",
            type = "Field",
            kind = "decimal",
            key = "TreasureChance4",
            label = "Treasure Chance 4"
        },

        new()
        {
            group = "Treasure",
            type = "Field",
            kind = "text",
            key = "Treasure5",
            label = "Treasure 5",
            description = "Loot slot 5: an item name, the special keyword \"Gold\" (drops currency), or \"<GroupName>\" to pull a random item from one of treasure.ini's named groups."
        },

        new()
        {
            group = "Treasure",
            type = "Field",
            kind = "number",
            key = "TreasureQty5",
            label = "Treasure Quantity 5"
        },

        new()
        {
            group = "Treasure",
            type = "Field",
            kind = "decimal",
            key = "TreasureChance5",
            label = "Treasure Chance 5"
        },

        new()
        {
            group = "Treasure",
            type = "Field",
            kind = "text",
            key = "Treasure6",
            label = "Treasure 6",
            description = "Loot slot 6: an item name, the special keyword \"Gold\" (drops currency), or \"<GroupName>\" to pull a random item from one of treasure.ini's named groups."
        },

        new()
        {
            group = "Treasure",
            type = "Field",
            kind = "number",
            key = "TreasureQty6",
            label = "Treasure Quantity 6"
        },

        new()
        {
            group = "Treasure",
            type = "Field",
            kind = "decimal",
            key = "TreasureChance6",
            label = "Treasure Chance 6"
        },

        new()
        {
            group = "Treasure",
            type = "Field",
            kind = "text",
            key = "Treasure7",
            label = "Treasure 7",
            description = "Loot slot 7: an item name, the special keyword \"Gold\" (drops currency), or \"<GroupName>\" to pull a random item from one of treasure.ini's named groups."
        },

        new()
        {
            group = "Treasure",
            type = "Field",
            kind = "number",
            key = "TreasureQty7",
            label = "Treasure Quantity 7"
        },

        new()
        {
            group = "Treasure",
            type = "Field",
            kind = "decimal",
            key = "TreasureChance7",
            label = "Treasure Chance 7"
        },

        new()
        {
            group = "Treasure",
            type = "Field",
            kind = "text",
            key = "Treasure8",
            label = "Treasure 8",
            description = "Loot slot 8: an item name, the special keyword \"Gold\" (drops currency), or \"<GroupName>\" to pull a random item from one of treasure.ini's named groups."
        },

        new()
        {
            group = "Treasure",
            type = "Field",
            kind = "number",
            key = "TreasureQty8",
            label = "Treasure Quantity 8"
        },

        new()
        {
            group = "Treasure",
            type = "Field",
            kind = "decimal",
            key = "TreasureChance8",
            label = "Treasure Chance 8"
        },

        new()
        {
            group = "Treasure",
            type = "Field",
            kind = "text",
            key = "Treasure9",
            label = "Treasure 9",
            description = "Loot slot 9: an item name, the special keyword \"Gold\" (drops currency), or \"<GroupName>\" to pull a random item from one of treasure.ini's named groups."
        },

        new()
        {
            group = "Treasure",
            type = "Field",
            kind = "number",
            key = "TreasureQty9",
            label = "Treasure Quantity 9"
        },

        new()
        {
            group = "Treasure",
            type = "Field",
            kind = "decimal",
            key = "TreasureChance9",
            label = "Treasure Chance 9"
        },

        new()
        {
            group = "Treasure",
            type = "Field",
            kind = "text",
            key = "TreasureData1",
            label = "Treasure Data 1",
            allowMultiple = true
        },

        new()
        {
            group = "Treasure",
            type = "Field",
            kind = "text",
            key = "TreasureData2",
            label = "Treasure Data 2",
            allowMultiple = true
        },

        new()
        {
            group = "Treasure",
            type = "Field",
            kind = "text",
            key = "TreasureData3",
            label = "Treasure Data 3",
            allowMultiple = true
        },

        new()
        {
            group = "Treasure",
            type = "Field",
            kind = "text",
            key = "TreasureData4",
            label = "Treasure Data 4",
            allowMultiple = true
        },

        new()
        {
            group = "Treasure",
            type = "Field",
            kind = "number",
            key = "TreasureTotalUses",
            label = "Treasure Total Uses",
            allowMultiple = true
        },

        new()
        {
            group = "Treasure",
            type = "Field",
            kind = "text",
            key = "TreasureText",
            label = "Treasure Text",
            allowMultiple = true
        },

        //Relationships
        new()
        {
            group = "Relationships",
            type = "Field",
            kind = "monsterPicker",
            picker = "monster",
            key = "Friend",
            label = "Friend",
            allowMultiple = true
        },

        new()
        {
            group = "Relationships",
            type = "Field",
            kind = "text",
            key = "FriendCatagory",
            label = "Friend Catagory",
            allowMultiple = true
        },

        new()
        {
            group = "Relationships",
            type = "Field",
            kind = "text",
            key = "EnemyCatagory",
            label = "Enemy Catagory",
            allowMultiple = true
        },

        //Talk
        new()
        {
            group = "Talk",
            type = "Field",
            kind = "text",
            key = "TalkGreeting",
            label = "Talk Greeting"
        },

        new()
        {
            group = "Talk",
            type = "Field",
            kind = "text",
            key = "TalkIdle",
            label = "Talk Idle"
        },

        new()
        {
            group = "Talk",
            type = "Field",
            kind = "text",
            key = "TradeTalkFarewell",
            label = "Trade Talk Farewell"
        },

        new()
        {
            group = "Talk",
            type = "Field",
            kind = "text",
            key = "TradeTalkSuccess",
            label = "Trade Talk Success"
        },

        //Trade
        new()
        {
            group = "Trade",
            type = "Field",
            kind = "decimal",
            key = "TradeBuyValue",
            label = "Trade Buy Value"
        },

        new()
        {
            group = "Trade",
            type = "Field",
            kind = "decimal",
            key = "TradeSellValue",
            label = "Trade Sell Value"
        },

        new()
        {
            group = "Trade",
            type = "Field",
            kind = "text",
            key = "TradeGroup",
            label = "Trade Group",
            allowMultiple = true
        },

        new()
        {
            group = "Trade",
            type = "Field",
            kind = "number",
            key = "TradeGroupSellMax",
            label = "Trade Group Sell Max",
            allowMultiple = true
        },

        //Quest
        new()
        {
            group = "Quest",
            type = "Field",
            kind = "itemPicker",
            picker = "item",
            key = "QuestTakeItem",
            label = "Quest Take Item",
            allowMultiple = true
        },

        new()
        {
            group = "Quest",
            type = "Field",
            kind = "number",
            key = "QuestTakeQty",
            label = "Quest Take Quantity",
            allowMultiple = true
        },

        new()
        {
            group = "Quest",
            type = "Field",
            kind = "text",
            key = "QuestTalk",
            label = "Quest Talk",
            allowMultiple = true
        },

        new()
        {
            group = "Quest",
            type = "Field",
            kind = "itemPicker",
            picker = "item",
            key = "QuestGiveItem",
            label = "Quest Give Item",
            allowMultiple = true
        },

        new()
        {
            group = "Quest",
            type = "Field",
            kind = "number",
            key = "QuestGiveQty",
            label = "Quest Give Quantity",
            allowMultiple = true
        },

        new()
        {
            group = "Quest",
            type = "Field",
            kind = "number",
            key = "QuestGiveExperience",
            label = "Quest Give Experience",
            allowMultiple = true
        },

        new()
        {
            group = "Quest",
            type = "Field",
            kind = "text",
            key = "QuestGiveData1",
            label = "Quest Give Data 1",
            allowMultiple = true
        },

        new()
        {
            group = "Quest",
            type = "Field",
            kind = "text",
            key = "QuestGiveData2",
            label = "Quest Give Data 2",
            allowMultiple = true
        },

        new()
        {
            group = "Quest",
            type = "Field",
            kind = "text",
            key = "QuestGiveData3",
            label = "Quest Give Data 3",
            allowMultiple = true
        },

        new()
        {
            group = "Quest",
            type = "Field",
            kind = "text",
            key = "QuestGiveData4",
            label = "Quest Give Data 4",
            allowMultiple = true
        },

        new()
        {
            group = "Quest",
            type = "Field",
            kind = "monsterPicker",
            picker = "monster",
            key = "QuestGiveTame",
            label = "Quest Give Tame",
            allowMultiple = true
        },

        //Sounds
        new()
        {
            group = "Weapon",
            type = "Field",
            kind = "soundPicker",
            picker = "sound",
            key = "AttackSound",
            label = "Attack Sound"
        },

        new()
        {
            group = "Sounds",
            type = "Field",
            kind = "soundPicker",
            picker = "sound",
            key = "DefendSound",
            label = "Defend Sound"
        },

        new()
        {
            group = "Sounds",
            type = "Field",
            kind = "soundPicker",
            picker = "sound",
            key = "DeathSound",
            label = "Death Sound"
        },

        new()
        {
            group = "Sounds",
            type = "Field",
            kind = "soundPicker",
            picker = "sound",
            key = "IdleSound",
            label = "Idle Sound"
        },

        //Processing
        new()
        {
            group = "Misc",
            type = "Field",
            kind = "decimal",
            key = "FastProcess",
            label = "Fast Process"
        },

        //Flags
        new()
        {
            group = "Relationships",
            type = "Flag",
            kind = "flag",
            key = "HelpFriends",
            label = "Help Friends",
            defaultValue = "false"
        },

        new()
        {
            group = "Taming",
            type = "Flag",
            kind = "flag",
            key = "NotTamable",
            label = "Not Tamable",
            defaultValue = "false"
        },

        new()
        {
            group = "Misc",
            type = "Flag",
            kind = "flag",
            key = "LogHistory",
            label = "Log History",
            defaultValue = "false"
        },

        new()
        {
            group = "Skills",
            type = "Flag",
            kind = "flag",
            key = "ScanAlot",
            label = "Scan Alot",
            defaultValue = "false"
        },

        new()
        {
            group = "Core",
            type = "Flag",
            kind = "flag",
            key = "NotAttackable",
            label = "Not Attackable",
            defaultValue = "false"
        },

        new()
        {
            group = "Relationships",
            type = "Flag",
            kind = "flag",
            key = "Desert",
            label = "Desert",
            defaultValue = "false"
        },

        new()
        {
            group = "Misc",
            type = "Flag",
            kind = "flag",
            key = "Unique",
            label = "Unique",
            defaultValue = "false"
        },

        new()
        {
            group = "Weapon",
            type = "Flag",
            kind = "flag",
            key = "AttackHigh",
            label = "Attack High",
            defaultValue = "false"
        },

        new()
        {
            group = "Weapon",
            type = "Flag",
            kind = "flag",
            key = "AttackMid",
            label = "Attack Mid",
            defaultValue = "false"
        },

        new()
        {
            group = "Weapon",
            type = "Flag",
            kind = "flag",
            key = "AttackLow",
            label = "Attack Low",
            defaultValue = "false"
        },

        new()
        {
            group = "Movement",
            type = "Flag",
            kind = "flag",
            key = "MoveFast",
            label = "Move Fast",
            defaultValue = "false"
        },

        new()
        {
            group = "Misc",
            type = "Flag",
            kind = "flag",
            key = "ItemDamageImmune",
            label = "Item Damage Immune",
            defaultValue = "false"
        },

        new()
        {
            group = "Combat",
            type = "Flag",
            kind = "flag",
            key = "AttackMonsters",
            label = "Attack Monsters",
            defaultValue = "false"
        },

        new()
        {
            group = "Combat",
            type = "Flag",
            kind = "flag",
            key = "StealthVision",
            label = "Stealth Vision",
            defaultValue = "false"
        },

        new()
        {
            group = "Trade",
            type = "Flag",
            kind = "flag",
            key = "TradeAlwaysStock",
            label = "Trade Always Stock",
            defaultValue = "false"
        },

        new()
        {
            group = "Combat",
            type = "Flag",
            kind = "flag",
            key = "IgnorePlayers",
            label = "Ignore Players",
            defaultValue = "false"
        },

        new()
        {
            group = "Movement",
            type = "Flag",
            kind = "flag",
            key = "StandStill",
            label = "Stand Still",
            defaultValue = "false"
        },

        new()
        {
            group = "Movement",
            type = "Flag",
            kind = "flag",
            key = "AirMove",
            label = "Air Move",
            defaultValue = "false"
        },

        new()
        {
            group = "Combat",
            type = "Flag",
            kind = "flag",
            key = "NoHands",
            label = "No Hands",
            defaultValue = "false"
        },

        new()
        {
            group = "Movement",
            type = "Flag",
            kind = "flag",
            key = "GhostMove",
            label = "Ghost Move",
            defaultValue = "false"
        },

        new()
        {
            group = "Misc",
            type = "Flag",
            kind = "flag",
            key = "NeedWarmth",
            label = "Need Warmth",
            defaultValue = "false"
        },

        new()
        {
            group = "Trade",
            type = "Flag",
            kind = "flag",
            key = "OnlyBuyLoot",
            label = "Only Buy Loot",
            defaultValue = "false"
        },

        new()
        {
            group = "Movement",
            type = "Flag",
            kind = "flag",
            key = "WaterMove",
            label = "Water Move",
            defaultValue = "false"
        },

        new()
        {
            group = "Misc",
            type = "Flag",
            kind = "flag",
            key = "EatGrass",
            label = "Eat Grass",
            defaultValue = "false"
        },

        new()
        {
            group = "Combat",
            type = "Flag",
            kind = "flag",
            key = "IgnoreNewbies",
            label = "Ignore Newbies",
            defaultValue = "false"
        },

        new()
        {
            group = "Treasure",
            type = "Flag",
            kind = "flag",
            key = "NoCorpse",
            label = "No Corpse",
            defaultValue = "false"
        },

        new()
        {
            group = "Combat",
            type = "Flag",
            kind = "flag",
            key = "NoRespawn",
            label = "No Respawn",
            defaultValue = "false"
        },

        new()
        {
            group = "Combat",
            type = "Flag",
            kind = "flag",
            key = "Aggressive",
            label = "Aggressive",
            defaultValue = "false"
        },

        new()
        {
            group = "Combat",
            type = "Flag",
            kind = "flag",
            key = "Passive",
            label = "Passive",
            defaultValue = "false"
        },

        new()
        {
            group = "Taming",
            type = "Flag",
            kind = "flag",
            key = "Tameable",
            label = "Tameable",
            defaultValue = "false"
        },

        new()
        {
            group = "Movement",
            type = "Flag",
            kind = "flag",
            key = "Flying",
            label = "Flying",
            defaultValue = "false"
        },

        new()
        {
            group = "Movement",
            type = "Flag",
            kind = "flag",
            key = "Swimming",
            label = "Swimming",
            defaultValue = "false"
        },

        new()
        {
            group = "Relationships",
            type = "Flag",
            kind = "flag",
            key = "Undead",
            label = "Undead",
            defaultValue = "false"
        }
    };

    public static readonly IReadOnlyList<EditorEntry> Animation = new List<EditorEntry>
    {
        //Core
        new()
        {
            group = "Core",
            type = "Field",
            kind = "number",
            key = "Animation",
            label = "Animation ID",
            required = true,
            description = "The unique Animation ID. This is the block header: Animation=<id>."
        },

        new()
        {
            group = "Core",
            type = "Field",
            kind = "text",
            key = "Name",
            label = "Name",
            required = true,
            description = "Animation display name."
        },

        //Frames
        new()
        {
            group = "Frames",
            type = "Field",
            kind = "itemPicker",
            picker = "itemSprite",
            key = "Frame",
            label = "Frame",
            allowMultiple = true,
            description = "Sprite frame ID. Animation blocks can have multiple Frame lines."
        },

        new()
        {
            group = "Frames",
            type = "Field",
            kind = "number",
            key = "FrameSize",
            label = "Frame Size",
            allowMultiple = true,
            description = "Optional frame size value. Animation blocks can have multiple FrameSize lines."
        },

        //Audio
        new()
        {
            group = "Audio",
            type = "Field",
            kind = "soundPicker",
            picker = "sound",
            key = "Sound",
            label = "Sound",
            allowMultiple = true,
            description = "Sound played during this animation. Animation blocks can have multiple Sound lines."
        },

        //Flags
        new()
        {
            group = "Flags",
            type = "Flag",
            kind = "flag",
            key = "Rotational",
            label = "Rotational",
            defaultValue = "false",
            description = "Marks this animation as rotational."
        }
    };
        
    public static readonly IReadOnlyList<EditorEntry> Magic = new List<EditorEntry>
    {
        //Core
        new()
        {
            group = "Core",
            type = "Field",
            kind = "number",
            key = "Spell",
            label = "Spell ID",
            required = true,
            description = "The unique Spell ID. This is the block header: Spell=<id>."
        },

        new()
        {
            group = "Core",
            type = "Field",
            kind = "text",
            key = "Name",
            label = "Name",
            required = true
        },

        new()
        {
            group = "Core",
            type = "Field",
            kind = "text",
            key = "Description",
            label = "Description"
        },

        //Skill
        new()
        {
            group = "Skill",
            type = "Field",
            kind = "skillPicker",
            picker = "skill",
            key = "Skill",
            label = "Skill"
        },

        new()
        {
            group = "Skill",
            type = "Field",
            kind = "skillPicker",
            picker = "skill",
            key = "SkillToLearn",
            label = "Skill To Learn"
        },

        new()
        {
            group = "Skill",
            type = "Field",
            kind = "number",
            key = "SkillMin",
            label = "Skill Min"
        },

        new()
        {
            group = "Skill",
            type = "Field",
            kind = "number",
            key = "SkillMax",
            label = "Skill Max"
        },

        //Casting
        new()
        {
            group = "Casting",
            type = "Field",
            kind = "number",
            key = "WandUse",
            label = "Wand Use"
        },

        new()
        {
            group = "Casting",
            type = "Field",
            kind = "number",
            key = "ManaCost",
            label = "Mana Cost"
        },

        new()
        {
            group = "Casting",
            type = "Field",
            kind = "number",
            key = "Range",
            label = "Range"
        },

        new()
        {
            group = "Casting",
            type = "Field",
            kind = "dropdown",
            key = "Target",
            label = "Target",
            options = new List<string>
            {
                "",
                "Self",
                "Other",
                "Spot",
                "Ward",
                "Item"
            }
        },

        new()
        {
            group = "Casting",
            type = "Field",
            kind = "decimal",
            key = "CastTime",
            label = "Cast Time"
        },

        new()
        {
            group = "Casting",
            type = "Field",
            kind = "number",
            key = "SuccessXP",
            label = "Success XP"
        },

        new()
        {
            group = "Casting",
            type = "Field",
            kind = "number",
            key = "FailedXP",
            label = "Failed XP"
        },

        //Runes
        new()
        {
            group = "Runes",
            type = "Field",
            kind = "itemPicker",
            picker = "item",
            key = "Rune1",
            label = "Rune 1"
        },

        new()
        {
            group = "Runes",
            type = "Field",
            kind = "number",
            key = "RuneUse1",
            label = "Rune Use 1"
        },

        new()
        {
            group = "Runes",
            type = "Field",
            kind = "itemPicker",
            picker = "item",
            key = "Rune2",
            label = "Rune 2"
        },

        new()
        {
            group = "Runes",
            type = "Field",
            kind = "number",
            key = "RuneUse2",
            label = "Rune Use 2"
        },

        new()
        {
            group = "Runes",
            type = "Field",
            kind = "itemPicker",
            picker = "item",
            key = "Rune3",
            label = "Rune 3"
        },

        new()
        {
            group = "Runes",
            type = "Field",
            kind = "number",
            key = "RuneUse3",
            label = "Rune Use 3"
        },

        new()
        {
            group = "Runes",
            type = "Field",
            kind = "itemPicker",
            picker = "item",
            key = "Rune4",
            label = "Rune 4"
        },

        new()
        {
            group = "Runes",
            type = "Field",
            kind = "number",
            key = "RuneUse4",
            label = "Rune Use 4"
        },

        new()
        {
            group = "Runes",
            type = "Field",
            kind = "itemPicker",
            picker = "item",
            key = "Rune5",
            label = "Rune 5"
        },

        new()
        {
            group = "Runes",
            type = "Field",
            kind = "number",
            key = "RuneUse5",
            label = "Rune Use 5"
        },

        //Visual / Audio
        new()
        {
            group = "Visual / Audio",
            type = "Field",
            kind = "animationPicker",
            picker = "animation",
            key = "Animation",
            label = "Animation"
        },

        new()
        {
            group = "Visual / Audio",
            type = "Field",
            kind = "animationPicker",
            picker = "animation",
            key = "Animation1",
            label = "Animation 1"
        },

        new()
        {
            group = "Visual / Audio",
            type = "Field",
            kind = "animationPicker",
            picker = "animation",
            key = "Animation2",
            label = "Animation 2"
        },

        new()
        {
            group = "Visual / Audio",
            type = "Field",
            kind = "animationPicker",
            picker = "animation",
            key = "Animation3",
            label = "Animation 3"
        },

        new()
        {
            group = "Visual / Audio",
            type = "Field",
            kind = "animationPicker",
            picker = "animation",
            key = "Animation4",
            label = "Animation 4"
        },

        new()
        {
            group = "Visual / Audio",
            type = "Field",
            kind = "animationPicker",
            picker = "animation",
            key = "Animation5",
            label = "Animation 5"
        },

        new()
        {
            group = "Visual / Audio",
            type = "Field",
            kind = "animationPicker",
            picker = "animation",
            key = "ProjectileAnimation",
            label = "Projectile Animation"
        },

        new()
        {
            group = "Visual / Audio",
            type = "Field",
            kind = "soundPicker",
            picker = "sound",
            key = "Sound",
            label = "Sound"
        },

        //Effects
        new()
        {
            group = "Effects",
            type = "Field",
            kind = "number",
            key = "Variance",
            label = "Variance"
        },

        new()
        {
            group = "Effects",
            type = "Field",
            kind = "number",
            key = "Life",
            label = "Life"
        },

        new()
        {
            group = "Effects",
            type = "Field",
            kind = "number",
            key = "LifeRenewal",
            label = "Life Renewal"
        },

        new()
        {
            group = "Effects",
            type = "Field",
            kind = "number",
            key = "LifeSteal",
            label = "Life Steal"
        },

        new()
        {
            group = "Effects",
            type = "Field",
            kind = "number",
            key = "Stamina",
            label = "Stamina"
        },

        new()
        {
            group = "Effects",
            type = "Field",
            kind = "number",
            key = "StaminaRenewal",
            label = "Stamina Renewal"
        },

        new()
        {
            group = "Effects",
            type = "Field",
            kind = "number",
            key = "StaminaSteal",
            label = "Stamina Steal"
        },

        new()
        {
            group = "Effects",
            type = "Field",
            kind = "number",
            key = "Mana",
            label = "Mana"
        },

        new()
        {
            group = "Effects",
            type = "Field",
            kind = "number",
            key = "ManaRenewal",
            label = "Mana Renewal"
        },

        new()
        {
            group = "Effects",
            type = "Field",
            kind = "number",
            key = "ManaSteal",
            label = "Mana Steal"
        },

        new()
        {
            group = "Effects",
            type = "Field",
            kind = "number",
            key = "Cure",
            label = "Cure"
        },

        new()
        {
            group = "Effects",
            type = "Field",
            kind = "number",
            key = "Ice",
            label = "Ice"
        },

        new()
        {
            group = "Effects",
            type = "Field",
            kind = "number",
            key = "Blind",
            label = "Blind"
        },

        new()
        {
            group = "Effects",
            type = "Field",
            kind = "number",
            key = "Hero",
            label = "Hero"
        },

        //Attribute Effects
        new()
        {
            group = "Attribute Effects",
            type = "Field",
            kind = "number",
            key = "Strength",
            label = "Strength"
        },

        new()
        {
            group = "Attribute Effects",
            type = "Field",
            kind = "number",
            key = "Dexterity",
            label = "Dexterity"
        },

        new()
        {
            group = "Attribute Effects",
            type = "Field",
            kind = "number",
            key = "Quickness",
            label = "Quickness"
        },

        new()
        {
            group = "Attribute Effects",
            type = "Field",
            kind = "number",
            key = "Intelligence",
            label = "Intelligence"
        },

        new()
        {
            group = "Attribute Effects",
            type = "Field",
            kind = "number",
            key = "Wisdom",
            label = "Wisdom"
        },

        //Combat Effects
        new()
        {
            group = "Combat Effects",
            type = "Field",
            kind = "number",
            key = "Armor",
            label = "Armor"
        },

        new()
        {
            group = "Combat Effects",
            type = "Field",
            kind = "number",
            key = "Improve",
            label = "Improve"
        },

        new()
        {
            group = "Combat Effects",
            type = "Field",
            kind = "number",
            key = "EssenceSteal",
            label = "Essence Steal"
        },

        new()
        {
            group = "Combat Effects",
            type = "Field",
            kind = "dropdown",
            key = "DamageType",
            label = "Damage Type",
            options = new List<string>
            {
                "",
                "Cut",
                "Bash",
                "Thrust",
                "Fire",
                "Cold",
                "Electric",
                "Cut/Thrust",
                "Magic"
            }
        },

        //Spawn / Transform / Golem
        new()
        {
            group = "Spawn / Transform",
            type = "Field",
            kind = "itemPicker",
            picker = "item",
            key = "SpawnItem",
            label = "Spawn Item",
            allowMultiple = true
        },

        new()
        {
            group = "Spawn / Transform",
            type = "Field",
            kind = "number",
            key = "SpawnItemQty",
            label = "Spawn Item Quantity",
            allowMultiple = true
        },

        new()
        {
            group = "Spawn / Transform",
            type = "Field",
            kind = "itemPicker",
            picker = "item",
            key = "SpawnItemQuantity",
            label = "Spawn Item Quantity Alias",
            allowMultiple = true,
            description = "Legacy alias accepted by the old reader."
        },

        new()
        {
            group = "Spawn / Transform",
            type = "Field",
            kind = "itemPicker",
            picker = "item",
            key = "TransformFrom",
            label = "Transform From"
        },

        new()
        {
            group = "Spawn / Transform",
            type = "Field",
            kind = "itemPicker",
            picker = "item",
            key = "TransformTo",
            label = "Transform To"
        },

        new()
        {
            group = "Spawn / Transform",
            type = "Field",
            kind = "itemPicker",
            picker = "item",
            key = "GolemItem",
            label = "Golem Item"
        },

        new()
        {
            group = "Spawn / Transform",
            type = "Field",
            kind = "monsterPicker",
            picker = "monster",
            key = "GolemMonster",
            label = "Golem Monster"
        },

        new()
        {
            group = "Spawn / Transform",
            type = "Field",
            kind = "skillPicker",
            picker = "skill",
            key = "GolemSkill",
            label = "Golem Skill"
        },

        //Flags
        new()
        {
            group = "Flags",
            type = "Flag",
            kind = "flag",
            key = "Perk",
            label = "Perk",
            defaultValue = "false"
        },

        new()
        {
            group = "Flags",
            type = "Flag",
            kind = "flag",
            key = "DeityOnly",
            label = "Deity Only",
            defaultValue = "false"
        },

        new()
        {
            group = "Flags",
            type = "Flag",
            kind = "flag",
            key = "IgnoreWandPower",
            label = "Ignore Wand Power",
            defaultValue = "false"
        },

        new()
        {
            group = "Flags",
            type = "Flag",
            kind = "flag",
            key = "LineOfSight",
            label = "Line Of Sight",
            defaultValue = "false"
        },

        new()
        {
            group = "Flags",
            type = "Flag",
            kind = "flag",
            key = "AllowDefend",
            label = "Allow Defend",
            defaultValue = "false"
        },

        new()
        {
            group = "Flags",
            type = "Flag",
            kind = "flag",
            key = "SpecialFeature",
            label = "Special Feature",
            defaultValue = "false"
        },

        new()
        {
            group = "Flags",
            type = "Flag",
            kind = "flag",
            key = "NotOnOthersLand",
            label = "Not On Others Land",
            defaultValue = "false"
        },

        new()
        {
            group = "Flags",
            type = "Flag",
            kind = "flag",
            key = "LogHistory",
            label = "Log History",
            defaultValue = "false"
        },

        new()
        {
            group = "Flags",
            type = "Flag",
            kind = "flag",
            key = "AllowOnPlot",
            label = "Allow On Plot",
            defaultValue = "false"
        },

        new()
        {
            group = "Flags",
            type = "Flag",
            kind = "flag",
            key = "WarpMemorize",
            label = "Warp Memorize",
            defaultValue = "false"
        },

        new()
        {
            group = "Flags",
            type = "Flag",
            kind = "flag",
            key = "Warp",
            label = "Warp",
            defaultValue = "false"
        },

        new()
        {
            group = "Flags",
            type = "Flag",
            kind = "flag",
            key = "CreateWarpStone",
            label = "Create Warp Stone",
            defaultValue = "false"
        },

        new()
        {
            group = "Flags",
            type = "Flag",
            kind = "flag",
            key = "Lock",
            label = "Lock",
            defaultValue = "false"
        },

        new()
        {
            group = "Flags",
            type = "Flag",
            kind = "flag",
            key = "ActivePlayersOnly",
            label = "Active Players Only",
            defaultValue = "false"
        },

        new()
        {
            group = "Flags",
            type = "Flag",
            kind = "flag",
            key = "ManaBond",
            label = "Mana Bond",
            defaultValue = "false"
        },

        new()
        {
            group = "Flags",
            type = "Flag",
            kind = "flag",
            key = "RevealOre",
            label = "Reveal Ore",
            defaultValue = "false"
        }
    };

    // itemuse.ini: FlagBlock keyed on the bare "Itemuse" marker (no id of its own), one
    // block per craft/action recipe. Field set is the full key table the server's own parser
    // (modItemUse) recognizes - extracted from the literal strings it compares incoming lines
    // against inside Original References/server2.exe (search "ITEMTOOL=", "SUCCESSFOCUS=",
    // "PROXIMITYITEM", etc. in the binary to re-derive/verify). Real sample blocks in
    // Original References/itemuse.ini only exercise a subset of these; the rest are confirmed
    // real (the server will recognize them) but their exact game-mechanic effect is inferred
    // from field naming and nearby error strings where no example usage exists - flagged below.
    public static readonly IReadOnlyList<EditorEntry> ItemUse = new List<EditorEntry>
    {
        new()
        {
            group = "Core",
            type = "Field",
            kind = "itemPicker",
            picker = "item",
            key = "ItemTool",
            label = "Item Tool",
            description = "The item the player must be holding/using."
        },
        new()
        {
            group = "Core",
            type = "Field",
            kind = "itemPicker",
            picker = "item",
            key = "ItemFocus",
            label = "Item Focus",
            description = "The item being used on (the target of the tool)."
        },
        new()
        {
            group = "Core",
            type = "Field",
            kind = "text",
            key = "FocusSubType",
            label = "Focus Sub Type",
            description = "Sub type restriction on the focus item."
        },
        new()
        {
            group = "Core",
            type = "Field",
            kind = "text",
            key = "ToolSubType",
            label = "Tool Sub Type",
            description = "Sub type restriction on the tool item."
        },
        new()
        {
            group = "Core",
            type = "Field",
            kind = "number",
            key = "UseType",
            label = "Use Type",
            description = "Numeric use-category code recognized by the server (exact meaning not documented in the binary strings - confirmed real key, effect inferred)."
        },

        new()
        {
            group = "Skill Check",
            type = "Field",
            kind = "skillPicker",
            picker = "skill",
            key = "Skill",
            label = "Skill",
            description = "Skill checked for this use. 0 or blank for no skill requirement."
        },
        new()
        {
            group = "Skill Check",
            type = "Field",
            kind = "number",
            key = "SkillMin",
            label = "Skill Min",
            description = "Minimum skill level for a chance of success (0% chance)."
        },
        new()
        {
            group = "Skill Check",
            type = "Field",
            kind = "number",
            key = "SkillMax",
            label = "Skill Max",
            description = "Skill level for a guaranteed success (100% chance)."
        },
        new()
        {
            group = "Skill Check",
            type = "Field",
            kind = "number",
            key = "SkillXPSuccess",
            label = "Skill XP Success",
            description = "Experience earned on a successful use."
        },
        new()
        {
            group = "Skill Check",
            type = "Field",
            kind = "number",
            key = "SkillXPFailure",
            label = "Skill XP Failure",
            description = "Experience earned on a failed use."
        },
        new()
        {
            group = "Skill Check",
            type = "Field",
            kind = "number",
            key = "GiveSkillBonus",
            label = "Give Skill Bonus",
            description = "Bonus skill amount granted by this use (server has a dedicated GiveSkillBonus error path, confirming this is a real mechanic)."
        },

        new()
        {
            group = "Outcome",
            type = "Field",
            kind = "itemPicker",
            picker = "item",
            key = "SuccessTool",
            label = "Success Tool",
            description = "What the tool item turns into on success."
        },
        new()
        {
            group = "Outcome",
            type = "Field",
            kind = "itemPicker",
            picker = "item",
            key = "SuccessFocus",
            label = "Success Focus",
            description = "What the focus item turns into on success."
        },
        new()
        {
            group = "Outcome",
            type = "Field",
            kind = "itemPicker",
            picker = "item",
            key = "FailedTool",
            label = "Failed Tool",
            description = "What the tool item turns into on failure."
        },
        new()
        {
            group = "Outcome",
            type = "Field",
            kind = "itemPicker",
            picker = "item",
            key = "FailedFocus",
            label = "Failed Focus",
            description = "What the focus item turns into on failure."
        },
        new()
        {
            group = "Outcome",
            type = "Field",
            kind = "number",
            key = "DegradeTool",
            label = "Degrade Tool",
            description = "Quality degrade applied to the tool on use."
        },
        new()
        {
            group = "Outcome",
            type = "Field",
            kind = "number",
            key = "FailedDamage",
            label = "Failed Damage",
            description = "Damage/durability loss applied on failure."
        },
        new()
        {
            group = "Outcome",
            type = "Field",
            kind = "text",
            key = "ReverseTool",
            label = "Reverse Tool",
            description = "Alternate outcome used when the tool/focus roles are reversed."
        },
        new()
        {
            group = "Outcome",
            type = "Field",
            kind = "text",
            key = "SuccessMsg",
            label = "Success Message",
            description = "Message shown to the player on success."
        },
        new()
        {
            group = "Outcome",
            type = "Field",
            kind = "text",
            key = "FailedMsg",
            label = "Failed Message",
            description = "Message shown to the player on failure."
        },
        new()
        {
            group = "Outcome",
            type = "Flag",
            kind = "flag",
            key = "DoNotUseSuccessTool",
            label = "Do Not Use Success Tool",
            defaultValue = "false"
        },
        new()
        {
            group = "Outcome",
            type = "Flag",
            kind = "flag",
            key = "UseSuccessTool",
            label = "Use Success Tool",
            defaultValue = "false"
        },

        new()
        {
            group = "Requirements",
            type = "Field",
            kind = "number",
            key = "Range",
            label = "Range",
            description = "Max range in squares from the player this use can happen at. Default 1."
        },
        new()
        {
            group = "Requirements",
            type = "Field",
            kind = "number",
            key = "StaminaCost",
            label = "Stamina Cost",
            description = "Stamina spent performing this use."
        },
        new()
        {
            group = "Requirements",
            type = "Field",
            kind = "bool",
            key = "NeedFlatSurface",
            label = "Need Flat Surface",
            description = "Whether the success focus spot needs a flat surface."
        },
        new()
        {
            group = "Requirements",
            type = "Field",
            kind = "bool",
            key = "NeedUnLevelSurface",
            label = "Need Uneven Surface",
            description = "Whether the success focus spot needs an unleveled surface."
        },
        new()
        {
            group = "Requirements",
            type = "Field",
            kind = "bool",
            key = "UsePlayerPosition",
            label = "Use Player Position",
            description = "If true, created items are placed on the player's own map position rather than the focus's."
        },
        new()
        {
            group = "Requirements",
            type = "Field",
            kind = "number",
            key = "SurfaceGround",
            label = "Surface Ground",
            description = "Ground surface requirement at the focus spot."
        },
        new()
        {
            group = "Requirements",
            type = "Field",
            kind = "number",
            key = "SurfaceUnderGround",
            label = "Surface Underground",
            description = "Underground surface requirement at the focus spot."
        },
        new()
        {
            group = "Requirements",
            type = "Field",
            kind = "number",
            key = "SurfaceWater",
            label = "Surface Water",
            description = "Water depth needed at the focus spot (e.g. for fishing)."
        },
        new()
        {
            group = "Requirements",
            type = "Field",
            kind = "itemPicker",
            picker = "item",
            key = "ProximityItem",
            label = "Proximity Item",
            description = "An item that must be within range for this use to succeed (server has a dedicated Check_Proximity error path for itemuse, confirming this is a real, separate mechanic from item.ini's own proximity fields)."
        },
        new()
        {
            group = "Requirements",
            type = "Field",
            kind = "number",
            key = "ProximityRange",
            label = "Proximity Range",
            description = "How close the proximity item must be."
        },
        new()
        {
            group = "Requirements",
            type = "Field",
            kind = "monsterPicker",
            picker = "monster",
            key = "MonsterID",
            label = "Monster",
            description = "Monster involved in this use (e.g. required to be nearby, or spawned)."
        },
        new()
        {
            group = "Requirements",
            type = "Field",
            kind = "number",
            key = "PlayerUsageTimeout",
            label = "Player Usage Timeout",
            description = "Cooldown before the player can use this again."
        },
        new()
        {
            group = "Requirements",
            type = "Field",
            kind = "text",
            key = "Guild",
            label = "Guild",
            description = "Requires the player to be in this guild (\"Use item failed. You must be in the guild...\")."
        },
        new()
        {
            group = "Requirements",
            type = "Field",
            kind = "number",
            key = "FactionRank",
            label = "Faction Rank",
            description = "Minimum faction rank required."
        },
        new()
        {
            group = "Requirements",
            type = "Field",
            kind = "text",
            key = "Player",
            label = "Player",
            description = "Restricts this use to a specific player (exact matching rule not documented in the binary strings - confirmed real key, effect inferred)."
        },

        new()
        {
            group = "Effects",
            type = "Field",
            kind = "number",
            key = "Heal",
            label = "Heal",
            description = "Health restored to the player on use."
        },
        new()
        {
            group = "Effects",
            type = "Field",
            kind = "number",
            key = "HealPoison",
            label = "Heal Poison",
            description = "Poison cured on use."
        },
        new()
        {
            group = "Effects",
            type = "Field",
            kind = "number",
            key = "Revive",
            label = "Revive",
            description = "Revive amount/flag applied to the player."
        },
        new()
        {
            group = "Effects",
            type = "Field",
            kind = "number",
            key = "Drunk",
            label = "Drunk",
            description = "Drunkenness added to the player."
        },
        new()
        {
            group = "Effects",
            type = "Field",
            kind = "number",
            key = "MagicBonus",
            label = "Magic Bonus",
            description = "Magic bonus granted by this use."
        },
        new()
        {
            group = "Effects",
            type = "Field",
            kind = "animationPicker",
            picker = "animation",
            key = "Animation",
            label = "Animation",
            description = "Animation played for this use."
        },
        new()
        {
            group = "Effects",
            type = "Field",
            kind = "number",
            key = "AddSurfaceWater",
            label = "Add Surface Water",
            description = "Adjusts the water level at the focus spot."
        },
        new()
        {
            group = "Effects",
            type = "Field",
            kind = "number",
            key = "AddAirWater",
            label = "Add Air Water",
            description = "Adjusts humidity/air-water at the focus spot (exact mechanic not documented in the binary strings - confirmed real key, effect inferred; mirrors Add Surface Water)."
        },
        new()
        {
            group = "Effects",
            type = "Field",
            kind = "number",
            key = "AddTame",
            label = "Add Tame",
            description = "Taming progress added toward a nearby tameable monster."
        },
        new()
        {
            group = "Effects",
            type = "Field",
            kind = "number",
            key = "FishVariance",
            label = "Fish Variance",
            description = "Randomness applied to fishing results."
        },
        new()
        {
            group = "Effects",
            type = "Field",
            kind = "number",
            key = "MortarSpeed",
            label = "Mortar Speed",
            description = "Projectile speed for a mortar/launcher-style use."
        },
        new()
        {
            group = "Effects",
            type = "Field",
            kind = "number",
            key = "MortarDamage",
            label = "Mortar Damage",
            description = "Damage dealt by a mortar/launcher-style use."
        },
        new()
        {
            group = "Effects",
            type = "Field",
            kind = "number",
            key = "InvasionDamage",
            label = "Invasion Damage",
            description = "Damage dealt against invasion-event targets."
        },
        new()
        {
            group = "Effects",
            type = "Field",
            kind = "number",
            key = "SetFocusData1",
            label = "Set Focus Data 1",
            description = "Sets custom data slot 1 on the focus item."
        },
        new()
        {
            group = "Effects",
            type = "Field",
            kind = "text",
            key = "SetFocusData8",
            label = "Set Focus Data 8",
            description = "Sets custom data slot 8 on the focus item. The server recognizes both a bare flag form and a key=value form of this field."
        },

        new()
        {
            group = "Locks & Writing",
            type = "Field",
            kind = "text",
            key = "KeyFocus",
            label = "Key Focus",
            description = "The key value the focus's lock is set to."
        },
        new()
        {
            group = "Locks & Writing",
            type = "Flag",
            kind = "flag",
            key = "DispKeyFocus",
            label = "Display Key Focus",
            defaultValue = "false",
            description = "Shows the focus's key value to the player."
        },
        new()
        {
            group = "Locks & Writing",
            type = "Flag",
            kind = "flag",
            key = "LockFocus",
            label = "Lock Focus",
            defaultValue = "false",
            description = "Focus spot cannot be re-used by this action until it changes state."
        },
        new()
        {
            group = "Locks & Writing",
            type = "Flag",
            kind = "flag",
            key = "SetWriting",
            label = "Set Writing",
            defaultValue = "false"
        },
        new()
        {
            group = "Locks & Writing",
            type = "Flag",
            kind = "flag",
            key = "ShowWriting",
            label = "Show Writing",
            defaultValue = "false"
        },

        new()
        {
            group = "Building",
            type = "Field",
            kind = "itemPicker",
            picker = "item",
            key = "BuildItem",
            label = "Build Item",
            description = "The item being progressively constructed."
        },
        new()
        {
            group = "Building",
            type = "Field",
            kind = "number",
            key = "BuildNeeded",
            label = "Build Needed",
            description = "Total build progress needed to complete construction."
        },
        new()
        {
            group = "Building",
            type = "Field",
            kind = "number",
            key = "BuildWork",
            label = "Build Work",
            description = "Build progress added per use."
        },

        new()
        {
            group = "Flags",
            type = "Flag",
            kind = "flag",
            key = "Ownland",
            label = "Own Land",
            defaultValue = "false",
            description = "Requires the player to own the land."
        },
        new()
        {
            group = "Flags",
            type = "Flag",
            kind = "flag",
            key = "PublicUse",
            label = "Public Use",
            defaultValue = "false",
            description = "Allows use even on land the player doesn't own."
        },
        new()
        {
            group = "Flags",
            type = "Flag",
            kind = "flag",
            key = "NotOnPlayer",
            label = "Not On Player",
            defaultValue = "false",
            description = "This use cannot target a player."
        },
        new()
        {
            group = "Flags",
            type = "Flag",
            kind = "flag",
            key = "PreserveData",
            label = "Preserve Data",
            defaultValue = "false",
            description = "Preserve the focus item's custom data through the transformation."
        },
        new()
        {
            group = "Flags",
            type = "Flag",
            kind = "flag",
            key = "Hidden",
            label = "Hidden",
            defaultValue = "false",
            description = "Do not send this use's existence to the client."
        },
        new()
        {
            group = "Flags",
            type = "Flag",
            kind = "flag",
            key = "SurfaceOnly",
            label = "Surface Only",
            defaultValue = "false"
        },
        new()
        {
            group = "Flags",
            type = "Flag",
            kind = "flag",
            key = "UnderGroundOnly",
            label = "Underground Only",
            defaultValue = "false"
        },
        new()
        {
            group = "Flags",
            type = "Flag",
            kind = "flag",
            key = "DigUnderGround",
            label = "Dig Underground",
            defaultValue = "false"
        },
        new()
        {
            group = "Flags",
            type = "Flag",
            kind = "flag",
            key = "LowerLand",
            label = "Lower Land",
            defaultValue = "false"
        },
        new()
        {
            group = "Flags",
            type = "Flag",
            kind = "flag",
            key = "RaiseLand",
            label = "Raise Land",
            defaultValue = "false"
        },
        new()
        {
            group = "Flags",
            type = "Flag",
            kind = "flag",
            key = "PlotUse",
            label = "Plot Use",
            defaultValue = "false"
        },
        new()
        {
            group = "Flags",
            type = "Flag",
            kind = "flag",
            key = "UseItemSkillReq",
            label = "Use Item Skill Requirement",
            defaultValue = "false",
            description = "Enforce the tool item's own skill requirement for this use."
        },
        new()
        {
            group = "Flags",
            type = "Flag",
            kind = "flag",
            key = "UseAllQty",
            label = "Use All Quantity",
            defaultValue = "false"
        },
        new()
        {
            group = "Flags",
            type = "Flag",
            kind = "flag",
            key = "ResetItemUse",
            label = "Reset Item Use",
            defaultValue = "false"
        },
        new()
        {
            group = "Flags",
            type = "Flag",
            kind = "flag",
            key = "ResetWeapon",
            label = "Reset Weapon",
            defaultValue = "false"
        },
        new()
        {
            group = "Flags",
            type = "Flag",
            kind = "flag",
            key = "ResetArmor",
            label = "Reset Armor",
            defaultValue = "false"
        },
        new()
        {
            group = "Flags",
            type = "Flag",
            kind = "flag",
            key = "DisarmTrap",
            label = "Disarm Trap",
            defaultValue = "false"
        },
        new()
        {
            group = "Flags",
            type = "Flag",
            kind = "flag",
            key = "MakePK",
            label = "Make PK",
            defaultValue = "false"
        },
        new()
        {
            group = "Flags",
            type = "Flag",
            kind = "flag",
            key = "MakeNonPK",
            label = "Make Non-PK",
            defaultValue = "false"
        },
        new()
        {
            group = "Flags",
            type = "Flag",
            kind = "flag",
            key = "SetResurrectSpot",
            label = "Set Resurrect Spot",
            defaultValue = "false"
        },
        new()
        {
            group = "Flags",
            type = "Flag",
            kind = "flag",
            key = "RenewInnRoom",
            label = "Renew Inn Room",
            defaultValue = "false"
        },
        new()
        {
            group = "Flags",
            type = "Flag",
            kind = "flag",
            key = "SetAim",
            label = "Set Aim",
            defaultValue = "false"
        },

        new()
        {
            group = "Success Items",
            type = "Field",
            kind = "itemPicker",
            picker = "item",
            key = "SuccessItem1",
            label = "Success Item 1",
            description = "Item created on success, slot 1."
        },
        new()
        {
            group = "Success Items",
            type = "Field",
            kind = "number",
            key = "SuccessItemQty1",
            label = "Success Item Quantity 1"
        },

        new()
        {
            group = "Success Items",
            type = "Field",
            kind = "itemPicker",
            picker = "item",
            key = "SuccessItem2",
            label = "Success Item 2",
            description = "Item created on success, slot 2."
        },
        new()
        {
            group = "Success Items",
            type = "Field",
            kind = "number",
            key = "SuccessItemQty2",
            label = "Success Item Quantity 2"
        },

        new()
        {
            group = "Success Items",
            type = "Field",
            kind = "itemPicker",
            picker = "item",
            key = "SuccessItem3",
            label = "Success Item 3",
            description = "Item created on success, slot 3."
        },
        new()
        {
            group = "Success Items",
            type = "Field",
            kind = "number",
            key = "SuccessItemQty3",
            label = "Success Item Quantity 3"
        },

        new()
        {
            group = "Success Items",
            type = "Field",
            kind = "itemPicker",
            picker = "item",
            key = "SuccessItem4",
            label = "Success Item 4",
            description = "Item created on success, slot 4."
        },
        new()
        {
            group = "Success Items",
            type = "Field",
            kind = "number",
            key = "SuccessItemQty4",
            label = "Success Item Quantity 4"
        },

        new()
        {
            group = "Success Items",
            type = "Field",
            kind = "itemPicker",
            picker = "item",
            key = "SuccessItem5",
            label = "Success Item 5",
            description = "Item created on success, slot 5."
        },
        new()
        {
            group = "Success Items",
            type = "Field",
            kind = "number",
            key = "SuccessItemQty5",
            label = "Success Item Quantity 5"
        },

        new()
        {
            group = "Success Items",
            type = "Field",
            kind = "itemPicker",
            picker = "item",
            key = "SuccessItem6",
            label = "Success Item 6",
            description = "Item created on success, slot 6."
        },
        new()
        {
            group = "Success Items",
            type = "Field",
            kind = "number",
            key = "SuccessItemQty6",
            label = "Success Item Quantity 6"
        },

        new()
        {
            group = "Success Items",
            type = "Field",
            kind = "itemPicker",
            picker = "item",
            key = "SuccessItem7",
            label = "Success Item 7",
            description = "Item created on success, slot 7."
        },
        new()
        {
            group = "Success Items",
            type = "Field",
            kind = "number",
            key = "SuccessItemQty7",
            label = "Success Item Quantity 7"
        },

        new()
        {
            group = "Success Items",
            type = "Field",
            kind = "itemPicker",
            picker = "item",
            key = "SuccessItem8",
            label = "Success Item 8",
            description = "Item created on success, slot 8."
        },
        new()
        {
            group = "Success Items",
            type = "Field",
            kind = "number",
            key = "SuccessItemQty8",
            label = "Success Item Quantity 8"
        },

        new()
        {
            group = "Success Items",
            type = "Field",
            kind = "itemPicker",
            picker = "item",
            key = "SuccessItem9",
            label = "Success Item 9",
            description = "Item created on success, slot 9."
        },
        new()
        {
            group = "Success Items",
            type = "Field",
            kind = "number",
            key = "SuccessItemQty9",
            label = "Success Item Quantity 9"
        },

        new()
        {
            group = "Success Items",
            type = "Field",
            kind = "itemPicker",
            picker = "item",
            key = "SuccessItem10",
            label = "Success Item 10",
            description = "Item created on success, slot 10."
        },
        new()
        {
            group = "Success Items",
            type = "Field",
            kind = "number",
            key = "SuccessItemQty10",
            label = "Success Item Quantity 10"
        },

        new()
        {
            group = "Failed Items",
            type = "Field",
            kind = "itemPicker",
            picker = "item",
            key = "FailedItem1",
            label = "Failed Item 1",
            description = "Item created on failure, slot 1."
        },
        new()
        {
            group = "Failed Items",
            type = "Field",
            kind = "number",
            key = "FailedItemQty1",
            label = "Failed Item Quantity 1"
        },

        new()
        {
            group = "Failed Items",
            type = "Field",
            kind = "itemPicker",
            picker = "item",
            key = "FailedItem2",
            label = "Failed Item 2",
            description = "Item created on failure, slot 2."
        },
        new()
        {
            group = "Failed Items",
            type = "Field",
            kind = "number",
            key = "FailedItemQty2",
            label = "Failed Item Quantity 2"
        },

        new()
        {
            group = "Failed Items",
            type = "Field",
            kind = "itemPicker",
            picker = "item",
            key = "FailedItem3",
            label = "Failed Item 3",
            description = "Item created on failure, slot 3."
        },
        new()
        {
            group = "Failed Items",
            type = "Field",
            kind = "number",
            key = "FailedItemQty3",
            label = "Failed Item Quantity 3"
        },

        new()
        {
            group = "Failed Items",
            type = "Field",
            kind = "itemPicker",
            picker = "item",
            key = "FailedItem4",
            label = "Failed Item 4",
            description = "Item created on failure, slot 4."
        },
        new()
        {
            group = "Failed Items",
            type = "Field",
            kind = "number",
            key = "FailedItemQty4",
            label = "Failed Item Quantity 4"
        },

        new()
        {
            group = "Failed Items",
            type = "Field",
            kind = "itemPicker",
            picker = "item",
            key = "FailedItem5",
            label = "Failed Item 5",
            description = "Item created on failure, slot 5."
        },
        new()
        {
            group = "Failed Items",
            type = "Field",
            kind = "number",
            key = "FailedItemQty5",
            label = "Failed Item Quantity 5"
        },

        new()
        {
            group = "Failed Items",
            type = "Field",
            kind = "itemPicker",
            picker = "item",
            key = "FailedItem6",
            label = "Failed Item 6",
            description = "Item created on failure, slot 6."
        },
        new()
        {
            group = "Failed Items",
            type = "Field",
            kind = "number",
            key = "FailedItemQty6",
            label = "Failed Item Quantity 6"
        },

        new()
        {
            group = "Failed Items",
            type = "Field",
            kind = "itemPicker",
            picker = "item",
            key = "FailedItem7",
            label = "Failed Item 7",
            description = "Item created on failure, slot 7."
        },
        new()
        {
            group = "Failed Items",
            type = "Field",
            kind = "number",
            key = "FailedItemQty7",
            label = "Failed Item Quantity 7"
        },

        new()
        {
            group = "Failed Items",
            type = "Field",
            kind = "itemPicker",
            picker = "item",
            key = "FailedItem8",
            label = "Failed Item 8",
            description = "Item created on failure, slot 8."
        },
        new()
        {
            group = "Failed Items",
            type = "Field",
            kind = "number",
            key = "FailedItemQty8",
            label = "Failed Item Quantity 8"
        },

        new()
        {
            group = "Failed Items",
            type = "Field",
            kind = "itemPicker",
            picker = "item",
            key = "FailedItem9",
            label = "Failed Item 9",
            description = "Item created on failure, slot 9."
        },
        new()
        {
            group = "Failed Items",
            type = "Field",
            kind = "number",
            key = "FailedItemQty9",
            label = "Failed Item Quantity 9"
        },

        new()
        {
            group = "Failed Items",
            type = "Field",
            kind = "itemPicker",
            picker = "item",
            key = "FailedItem10",
            label = "Failed Item 10",
            description = "Item created on failure, slot 10."
        },
        new()
        {
            group = "Failed Items",
            type = "Field",
            kind = "number",
            key = "FailedItemQty10",
            label = "Failed Item Quantity 10"
        },

    };

    // multiuse.ini: FlagBlock keyed on the bare "MultiUse" marker, one block per multi-item
    // crafting recipe. NeedItem/NeedItemQTY/ResultItem/ResultItemQTY repeat as parallel lists -
    // each "ingredient slot" is one NeedItem(+Qty) line, paired with its own ResultItem(+Qty)
    // (usually "nothing" except for the last slot, which yields the crafted item). Confirmed
    // against every sample block in Original References/multiuse.ini - no other fields appear.
    public static readonly IReadOnlyList<EditorEntry> MultiUse = new List<EditorEntry>
    {
        new()
        {
            group = "Core",
            type = "Field",
            kind = "itemPicker",
            picker = "item",
            key = "FocusItem",
            label = "Focus Item",
            description = "The item the ingredients are combined on/at."
        },
        new()
        {
            group = "Core",
            type = "Field",
            kind = "number",
            key = "FocusItemQTY",
            label = "Focus Item Quantity",
            description = "How many of the focus item are required/consumed (confirmed as a real key in server2.exe; not exercised by any sample recipe seen so far)."
        },
        new()
        {
            group = "Core",
            type = "Field",
            kind = "itemPicker",
            picker = "item",
            key = "SuccessItem",
            label = "Success Item",
            description = "Item created when all ingredients are supplied."
        },
        new()
        {
            group = "Core",
            type = "Field",
            kind = "number",
            key = "SuccessItemQTY",
            label = "Success Item Quantity"
        },

        new()
        {
            group = "Ingredients",
            type = "Field",
            kind = "itemPicker",
            picker = "item",
            key = "NeedItem",
            label = "Need Item",
            description = "An ingredient item required. Add one per ingredient slot.",
            allowMultiple = true
        },
        new()
        {
            group = "Ingredients",
            type = "Field",
            kind = "number",
            key = "NeedItemQTY",
            label = "Need Item Quantity",
            allowMultiple = true
        },
        new()
        {
            group = "Ingredients",
            type = "Field",
            kind = "itemPicker",
            picker = "item",
            key = "ResultItem",
            label = "Result Item",
            description = "What that ingredient turns into/consumes to (usually \"nothing\").",
            allowMultiple = true
        },
        new()
        {
            group = "Ingredients",
            type = "Field",
            kind = "number",
            key = "ResultItemQTY",
            label = "Result Item Quantity",
            allowMultiple = true
        },

        new()
        {
            group = "Skill Check",
            type = "Field",
            kind = "skillPicker",
            picker = "skill",
            key = "Skill",
            label = "Skill",
            description = "Skill checked for this recipe. 0 or blank for no skill requirement."
        },
        new()
        {
            group = "Skill Check",
            type = "Field",
            kind = "number",
            key = "SkillMin",
            label = "Skill Min",
            description = "Minimum skill level for a chance of success (0% chance)."
        },
        new()
        {
            group = "Skill Check",
            type = "Field",
            kind = "number",
            key = "SkillMax",
            label = "Skill Max",
            description = "Skill level for a guaranteed success (100% chance)."
        },
        new()
        {
            group = "Skill Check",
            type = "Field",
            kind = "number",
            key = "SkillXPSuccess",
            label = "Skill XP Success"
        },

        new()
        {
            group = "Requirements",
            type = "Field",
            kind = "number",
            key = "StaminaCost",
            label = "Stamina Cost"
        },

        new()
        {
            group = "Outcome",
            type = "Field",
            kind = "text",
            key = "SuccessMsg",
            label = "Success Message"
        }
    };

    // treasure.ini: NamedKeyBlock - blocks are keyed by the loot group's name
    // (e.g. "Treasure=LowWeapon"), not a numeric id. Each group repeats an Item/SkillId/
    // SkillLow/SkillHigh/Chance cluster per possible drop (SpellID/SpellData appear for
    // enchanted-jewelry style drops). Confirmed against Original References/treasure.ini.
    public static readonly IReadOnlyList<EditorEntry> Treasure = new List<EditorEntry>
    {
        new()
        {
            group = "Core",
            type = "Field",
            kind = "text",
            key = "Treasure",
            label = "Group Name",
            required = true,
            description = "The loot group's name. This is the block header: Treasure=<name>."
        },

        new()
        {
            group = "Drops",
            type = "Field",
            kind = "itemPicker",
            picker = "item",
            key = "Item",
            label = "Item",
            description = "A possible drop. Add one per possible item in this group.",
            allowMultiple = true
        },
        new()
        {
            group = "Drops",
            type = "Field",
            kind = "skillPicker",
            picker = "skill",
            key = "SkillId",
            label = "Skill",
            description = "Skill associated with this drop (or \"random\").",
            allowMultiple = true
        },
        new()
        {
            group = "Drops",
            type = "Field",
            kind = "number",
            key = "SkillLow",
            label = "Skill Low",
            allowMultiple = true
        },
        new()
        {
            group = "Drops",
            type = "Field",
            kind = "number",
            key = "SkillHigh",
            label = "Skill High",
            allowMultiple = true
        },
        new()
        {
            group = "Drops",
            type = "Field",
            kind = "number",
            key = "Chance",
            label = "Chance",
            allowMultiple = true
        },
        new()
        {
            group = "Drops",
            type = "Field",
            kind = "number",
            key = "SpellID",
            label = "Spell ID",
            description = "Enchantment/spell id granted by this drop, if any.",
            allowMultiple = true
        },
        new()
        {
            group = "Drops",
            type = "Field",
            kind = "number",
            key = "SpellData",
            label = "Spell Data",
            allowMultiple = true
        }
    };

        public static IReadOnlyList<EditorEntry> For(ServerFile file)
        {
            return file switch
            {
                ServerFile.World => World,
                ServerFile.Items => Item,
                ServerFile.Skills => Skill,
                ServerFile.Monsters => Monster,
                ServerFile.Magic => Magic,
                ServerFile.Animations => Animation,
                ServerFile.Usages => ItemUse,
                ServerFile.MultiUses => MultiUse,
                ServerFile.Treasure => Treasure,
                _ => Array.Empty<EditorEntry>()
            };
        }
    }

    
        
}
