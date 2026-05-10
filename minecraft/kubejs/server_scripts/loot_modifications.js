// LootJS Modification Script
// This script allows you to add, remove, or replace loot in chests.
// Use the command '/kubejs reload server_scripts' to apply changes without restarting.

/* 
================================================================================
AVAILABLE MODDED STRUCTURES (REFERENCE LIST)
================================================================================
Based on your installed mods, here are common loot table IDs you can target.
Note: To find the exact ID in-game, look at a chest and use the command:
/loot help (or check Advanced Tooltips with F3+H)

--- WHEN DUNGEONS ARISE (dungeons_arise) ---
- dungeons_arise:chests/abandoned_temple/abandoned_temple_treasure
- dungeons_arise:chests/bandit_towers/bandit_tower_treasure
- dungeons_arise:chests/foundry/foundry_treasure
- dungeons_arise:chests/keep_kayra/keep_kayra_treasure
- dungeons_arise:chests/shiraz_palace/shiraz_palace_treasure
- dungeons_arise:chests/mining_complex/mining_complex_treasure
- dungeons_arise:chests/coliseum/coliseum_treasure

--- ETERNAL STARLIGHT (eternal_starlight) ---
- eternal_starlight:chests/golem_forge
- eternal_starlight:chests/cursed_garden
- eternal_starlight:chests/starlight_portal_ruins


--- YUNG'S BETTER SERIES (Overrides Vanilla but often adds custom tables) ---
- betterdungeons:chests/zombie_dungeon
- betterdungeons:chests/spider_dungeon
- betterfortresses:chests/keep
- betterfortresses:chests/bridge
- betterstrongholds:chests/library
- betterdeserttemples:chests/tomb

--- THE BUMBLEZONE (the_bumblezone) ---
- the_bumblezone:chests/honey_cave_treasure
- the_bumblezone:chests/bee_dungeon

--- CHOICETHEOREM'S OVERHAULED VILLAGERS (ctov) ---
- ctov:chests/village/village_armorer
- ctov:chests/village/village_fletcher
- (Usually matches vanilla village loot paths but prefixed with ctov:)


--- CREATE: LET THE ADVENTURE BEGIN (create_ltab) ---
- create_ltab:core/basic_loot
- create_ltab:core/legend_loot
- create_ltab:core/rare_loot
- create_ltab:normal/basic_loot
- create_ltab:normal/legend_loot
- create_ltab:normal/rare_loot
- create_ltab:normal/trash_loot
- create_ltab:desert/basic_loot
- create_ltab:nether/basic_loot
- create_ltab:snow/basic_loot
- create_ltab:water/basic_loot

--- EXPLORIFY (explorify) ---
- explorify:chest/dark_forest_settlement
- explorify:chest/mausoleum_pot
- explorify:chest/supply_cache

--- DUNGEONS AND TAVERNS (nova_structures) ---
- nova_structures:chests/underground_dungeon
- nova_structures:chests/pillager_camp
- nova_structures:chests/deep_dark_shrine
- nova_structures:chests/pillager_outpost_treasure
- nova_structures:chests/bunker/medical_supplies
- nova_structures:chests/bunker/bunker_trash
- nova_structures:chests/witch_villa/lab
- nova_structures:chests/witch_villa/library
- (D&T uses many sub-paths, see its jar for full list)


- mvs:general
- mvs:cathedral_rare
- mvs:floating_islands
- mvs:houses_rare
- mvs:houses_uncommon
- mvs:jungle_tower
- mvs:large_carts
- mvs:large_carts_2
- mvs:mineshaft/common
- mvs:mineshaft/rare
- mvs:mineshaft/uncommon
- mvs:pillager
- mvs:rare

--- OTHER STRUCTURE MODS (Use Vanilla Tables) ---
- MoStructures, Create Structures Arise, The Lost City
- (These mods primarily use vanilla loot tables like minecraft:chests/abandoned_mineshaft)
================================================================================
*/

LootJS.lootTables((event) => {

    // EXAMPLES:

    /* 
    // Add a Diamond to ALL Dungeons Arise chests (5% chance)
    event.addLootTableModifier("dungeons_arise:chests")
        .addLoot("minecraft:diamond")
        .randomChance(0.05);
    */


    // ================================================================================
    // TaCZ GUN LOOT (EXPERIMENTAL - BARE MINIMUM TEST)
    // ================================================================================

    const FN_Evolys = Item.of("tacz:modern_kinetic_gun", { "minecraft:custom_data": { "GunFireMode": "AUTO", "HasBulletInBarrel": 1, "GunId": "tacz:fn_evolys", "GunCurrentAmmoCount": 75 } });
    const RPK = Item.of("tacz:modern_kinetic_gun", { "minecraft:custom_data": { "GunFireMode": "AUTO", "HasBulletInBarrel": 1, "GunId": "tacz:rpk", "GunCurrentAmmoCount": 40 } });
    const MINIGUN = Item.of("tacz:modern_kinetic_gun", { "minecraft:custom_data": { "GunFireMode": "AUTO", "HasBulletInBarrel": 1, "GunId": "tacz:minigun", "GunCurrentAmmoCount": 30 } });
    const M249 = Item.of("tacz:modern_kinetic_gun", { "minecraft:custom_data": { "GunFireMode": "AUTO", "HasBulletInBarrel": 1, "GunId": "tacz:m249", "GunCurrentAmmoCount": 75 } });
    const RPG7 = Item.of("tacz:modern_kinetic_gun", { "minecraft:custom_data": { "GunFireMode": "SEMI", "HasBulletInBarrel": 1, "GunId": "tacz:rpg7", "GunCurrentAmmoCount": 1 } });
    const M320 = Item.of("tacz:modern_kinetic_gun", { "minecraft:custom_data": { "GunFireMode": "SEMI", "HasBulletInBarrel": 1, "GunId": "tacz:m320", "GunCurrentAmmoCount": 1 } });
    const P90 = Item.of("tacz:modern_kinetic_gun", { "minecraft:custom_data": { "GunFireMode": "AUTO", "HasBulletInBarrel": 1, "GunId": "tacz:p90", "GunCurrentAmmoCount": 50 } });
    const VECTOR45 = Item.of("tacz:modern_kinetic_gun", { "minecraft:custom_data": { "GunFireMode": "AUTO", "HasBulletInBarrel": 1, "GunId": "tacz:vector45", "GunCurrentAmmoCount": 20 } });
    const HK_MP5A5 = Item.of("tacz:modern_kinetic_gun", { "minecraft:custom_data": { "GunFireMode": "AUTO", "HasBulletInBarrel": 1, "GunId": "tacz:hk_mp5a5", "GunCurrentAmmoCount": 30 } });
    const UZI = Item.of("tacz:modern_kinetic_gun", { "minecraft:custom_data": { "GunFireMode": "AUTO", "HasBulletInBarrel": 1, "GunId": "tacz:uzi", "GunCurrentAmmoCount": 20 } });
    const UMP45 = Item.of("tacz:modern_kinetic_gun", { "minecraft:custom_data": { "GunFireMode": "AUTO", "HasBulletInBarrel": 1, "GunId": "tacz:ump45", "GunCurrentAmmoCount": 25 } });
    const M1014 = Item.of("tacz:modern_kinetic_gun", { "minecraft:custom_data": { "GunFireMode": "SEMI", "HasBulletInBarrel": 1, "GunId": "tacz:m1014", "GunCurrentAmmoCount": 6 } });
    const AA12 = Item.of("tacz:modern_kinetic_gun", { "minecraft:custom_data": { "GunFireMode": "SEMI", "HasBulletInBarrel": 1, "GunId": "tacz:aa12", "GunCurrentAmmoCount": 8 } });
    const SPAS_12 = Item.of("tacz:modern_kinetic_gun", { "minecraft:custom_data": { "GunFireMode": "SEMI", "HasBulletInBarrel": 1, "GunId": "tacz:spas_12", "GunCurrentAmmoCount": 5 } });
    const M870 = Item.of("tacz:modern_kinetic_gun", { "minecraft:custom_data": { "GunFireMode": "SEMI", "HasBulletInBarrel": 1, "GunId": "tacz:m870", "GunCurrentAmmoCount": 5 } });
    const DB_LONG = Item.of("tacz:modern_kinetic_gun", { "minecraft:custom_data": { "GunFireMode": "SEMI", "HasBulletInBarrel": 1, "GunId": "tacz:db_long", "GunCurrentAmmoCount": 2 } });
    const DB_SHORT = Item.of("tacz:modern_kinetic_gun", { "minecraft:custom_data": { "GunFireMode": "BURST", "HasBulletInBarrel": 1, "GunId": "tacz:db_short", "GunCurrentAmmoCount": 2 } });
    const QBZ_191 = Item.of("tacz:modern_kinetic_gun", { "minecraft:custom_data": { "GunFireMode": "AUTO", "HasBulletInBarrel": 1, "GunId": "tacz:qbz_191", "GunCurrentAmmoCount": 30 } });
    const FN_FAL = Item.of("tacz:modern_kinetic_gun", { "minecraft:custom_data": { "GunFireMode": "SEMI", "HasBulletInBarrel": 1, "GunId": "tacz:fn_fal", "GunCurrentAmmoCount": 20 } });
    const AUG = Item.of("tacz:modern_kinetic_gun", { "minecraft:custom_data": { "GunFireMode": "AUTO", "HasBulletInBarrel": 1, "GunId": "tacz:aug", "GunCurrentAmmoCount": 30 } });
    const G36K = Item.of("tacz:modern_kinetic_gun", { "minecraft:custom_data": { "GunFireMode": "AUTO", "HasBulletInBarrel": 1, "GunId": "tacz:g36k", "GunCurrentAmmoCount": 30 } });
    const SCAR_H = Item.of("tacz:modern_kinetic_gun", { "minecraft:custom_data": { "GunFireMode": "SEMI", "HasBulletInBarrel": 1, "GunId": "tacz:scar_h", "GunCurrentAmmoCount": 20 } });
    const SCAR_L = Item.of("tacz:modern_kinetic_gun", { "minecraft:custom_data": { "GunFireMode": "AUTO", "HasBulletInBarrel": 1, "GunId": "tacz:scar_l", "GunCurrentAmmoCount": 30 } });
    const MK14 = Item.of("tacz:modern_kinetic_gun", { "minecraft:custom_data": { "GunFireMode": "SEMI", "HasBulletInBarrel": 1, "GunId": "tacz:mk14", "GunCurrentAmmoCount": 10 } });
    const SPR15HB = Item.of("tacz:modern_kinetic_gun", { "minecraft:custom_data": { "GunFireMode": "SEMI", "HasBulletInBarrel": 1, "GunId": "tacz:spr15hb", "GunCurrentAmmoCount": 15 } });
    const M16A4 = Item.of("tacz:modern_kinetic_gun", { "minecraft:custom_data": { "GunFireMode": "BURST", "HasBulletInBarrel": 1, "GunId": "tacz:m16a4", "GunCurrentAmmoCount": 30 } });
    const HK_G3 = Item.of("tacz:modern_kinetic_gun", { "minecraft:custom_data": { "GunFireMode": "SEMI", "HasBulletInBarrel": 1, "GunId": "tacz:hk_g3", "GunCurrentAmmoCount": 20 } });
    const M16A1 = Item.of("tacz:modern_kinetic_gun", { "minecraft:custom_data": { "GunFireMode": "AUTO", "HasBulletInBarrel": 1, "GunId": "tacz:m16a1", "GunCurrentAmmoCount": 20 } });
    const M4A1 = Item.of("tacz:modern_kinetic_gun", { "minecraft:custom_data": { "GunFireMode": "AUTO", "HasBulletInBarrel": 1, "GunId": "tacz:m4a1", "GunCurrentAmmoCount": 30 } });
    const HK416D = Item.of("tacz:modern_kinetic_gun", { "minecraft:custom_data": { "GunFireMode": "AUTO", "HasBulletInBarrel": 1, "GunId": "tacz:hk416d", "GunCurrentAmmoCount": 30 } });
    const AK47 = Item.of("tacz:modern_kinetic_gun", { "minecraft:custom_data": { "GunFireMode": "AUTO", "HasBulletInBarrel": 1, "GunId": "tacz:ak47", "GunCurrentAmmoCount": 30 } });
    const QBZ_95 = Item.of("tacz:modern_kinetic_gun", { "minecraft:custom_data": { "GunFireMode": "AUTO", "HasBulletInBarrel": 1, "GunId": "tacz:qbz_95", "GunCurrentAmmoCount": 30 } });
    const TYPE_81 = Item.of("tacz:modern_kinetic_gun", { "minecraft:custom_data": { "GunFireMode": "AUTO", "HasBulletInBarrel": 1, "GunId": "tacz:type_81", "GunCurrentAmmoCount": 30 } });
    const SKS_TACTICAL = Item.of("tacz:modern_kinetic_gun", { "minecraft:custom_data": { "GunFireMode": "SEMI", "HasBulletInBarrel": 1, "GunId": "tacz:sks_tactical", "GunCurrentAmmoCount": 10 } });
    const AI_AWP = Item.of("tacz:modern_kinetic_gun", { "minecraft:custom_data": { "GunFireMode": "SEMI", "HasBulletInBarrel": 1, "GunId": "tacz:ai_awp", "GunCurrentAmmoCount": 5 } });
    const M95 = Item.of("tacz:modern_kinetic_gun", { "minecraft:custom_data": { "GunFireMode": "SEMI", "HasBulletInBarrel": 1, "GunId": "tacz:m95", "GunCurrentAmmoCount": 5 } });
    const SPRINGFIELD1873 = Item.of("tacz:modern_kinetic_gun", { "minecraft:custom_data": { "GunFireMode": "SEMI", "HasBulletInBarrel": 1, "GunId": "tacz:springfield1873", "GunCurrentAmmoCount": 1 } });
    const M107 = Item.of("tacz:modern_kinetic_gun", { "minecraft:custom_data": { "GunFireMode": "SEMI", "HasBulletInBarrel": 1, "GunId": "tacz:m107", "GunCurrentAmmoCount": 10 } });
    const M700 = Item.of("tacz:modern_kinetic_gun", { "minecraft:custom_data": { "GunFireMode": "SEMI", "HasBulletInBarrel": 1, "GunId": "tacz:m700", "GunCurrentAmmoCount": 5 } });
    const M1911 = Item.of("tacz:modern_kinetic_gun", { "minecraft:custom_data": { "GunFireMode": "SEMI", "HasBulletInBarrel": 1, "GunId": "tacz:m1911", "GunCurrentAmmoCount": 7 } });
    const TIMELESS50 = Item.of("tacz:modern_kinetic_gun", { "minecraft:custom_data": { "GunFireMode": "SEMI", "HasBulletInBarrel": 1, "GunId": "tacz:timeless50", "GunCurrentAmmoCount": 8 } });
    const B93R = Item.of("tacz:modern_kinetic_gun", { "minecraft:custom_data": { "GunFireMode": "BURST", "HasBulletInBarrel": 1, "GunId": "tacz:b93r", "GunCurrentAmmoCount": 20 } });
    const DEAGLE_GOLDEN = Item.of("tacz:modern_kinetic_gun", { "minecraft:custom_data": { "GunFireMode": "SEMI", "HasBulletInBarrel": 1, "GunId": "tacz:deagle_golden", "GunCurrentAmmoCount": 9 } });
    const P320 = Item.of("tacz:modern_kinetic_gun", { "minecraft:custom_data": { "GunFireMode": "SEMI", "HasBulletInBarrel": 1, "GunId": "tacz:p320", "GunCurrentAmmoCount": 12 } });
    const GLOCK_17 = Item.of("tacz:modern_kinetic_gun", { "minecraft:custom_data": { "GunFireMode": "SEMI", "HasBulletInBarrel": 1, "GunId": "tacz:glock_17", "GunCurrentAmmoCount": 17 } });
    const CZ75 = Item.of("tacz:modern_kinetic_gun", { "minecraft:custom_data": { "GunFireMode": "AUTO", "HasBulletInBarrel": 1, "GunId": "tacz:cz75", "GunCurrentAmmoCount": 16 } });
    const DEAGLE = Item.of("tacz:modern_kinetic_gun", { "minecraft:custom_data": { "GunFireMode": "SEMI", "HasBulletInBarrel": 1, "GunId": "tacz:deagle", "GunCurrentAmmoCount": 7 } });
    const RHINO357 = Item.of("tacz:modern_kinetic_gun", { "minecraft:custom_data": { "GunFireMode": "SEMI", "HasBulletInBarrel": 1, "GunId": "tacz:rhino357", "GunCurrentAmmoCount": 6 } });
    const LONETRAIL = Item.of("tacz:modern_kinetic_gun", { "minecraft:custom_data": { "GunFireMode": "SEMI", "HasBulletInBarrel": 1, "GunId": "tacz:lonetrail", "GunCurrentAmmoCount": 1 } });
    const TAURUS943 = Item.of("tacz:modern_kinetic_gun", { "minecraft:custom_data": { "GunFireMode": "SEMI", "HasBulletInBarrel": 1, "GunId": "tacz:taurus943", "GunCurrentAmmoCount": 9 } });
    const KAR98 = Item.of("tacz:modern_kinetic_gun", { "minecraft:custom_data": { "GunFireMode": "SEMI", "HasBulletInBarrel": 1, "GunId": "tacz:kar98", "GunCurrentAmmoCount": 5 } });
    const HK_MK23 = Item.of("tacz:modern_kinetic_gun", { "minecraft:custom_data": { "GunFireMode": "SEMI", "HasBulletInBarrel": 1, "GunId": "tacz:hk_mk23", "GunCurrentAmmoCount": 12 } });
    const TAURUS500 = Item.of("tacz:modern_kinetic_gun", { "minecraft:custom_data": { "GunFireMode": "SEMI", "HasBulletInBarrel": 1, "GunId": "tacz:taurus500", "GunCurrentAmmoCount": 5 } });
    const M9A4 = Item.of("tacz:modern_kinetic_gun", { "minecraft:custom_data": { "GunFireMode": "SEMI", "HasBulletInBarrel": 1, "GunId": "tacz:m9a4", "GunCurrentAmmoCount": 15 } });

    const Grade_1 = { "items": [M1911, GLOCK_17, SPRINGFIELD1873, DB_SHORT, DB_LONG, TAURUS943], "baseChance": 0.05 }
    const Grade_2 = { "items": [M4A1, P320, B93R, CZ75, HK416D, SCAR_L, G36K, AUG, M870, UZI, RHINO357, HK_MK23, M9A4], "baseChance": 0.02 }
    const Grade_3 = { "items": [M16A1, M16A4, DEAGLE, QBZ_95, AK47, TYPE_81, QBZ_191, SPAS_12, UMP45, HK_MP5A5], "baseChance": 0.015 }
    const Grade_4 = { "items": [SPR15HB, M700, HK_G3, SKS_TACTICAL, SCAR_H, FN_FAL, AA12, M1014, P90, KAR98, LONETRAIL], "baseChance": 0.01 }
    const Grade_5 = { "items": [M107, TIMELESS50, AI_AWP, MK14, VECTOR45, M320, M249, RPK, TAURUS500], "baseChance": 0.005 }
    const Grade_6 = { "items": [DEAGLE_GOLDEN, M95, RPG7, MINIGUN, FN_Evolys], "baseChance": 0.001 }

    // Inject gun_grade into the custom_data of each gun item for Legendary Tooltips
    let grades = [Grade_1, Grade_2, Grade_3, Grade_4, Grade_5, Grade_6];
    grades.forEach((grade, i) => {
        grade.items.forEach(gun => {
            gun.nbt.merge({ gun_grade: i + 1 });
        });
    });
    // Lessons:
    // withCustomData() is not available in KubeJS

    // Ammo types with per-caliber weight (selection rarity) and count ranges.
    // Higher weight = more likely to be picked. countMin/countMax = drop range.
    // Small/pistol calibers: common, high count. Heavy/explosive: rare, low count.
    const AMMO_TYPES = [
        // Pistol / SMG calibers — common, high count
        { id: "tacz:9mm", weight: 10, countMin: 16, countMax: 64 }, // glock_17, b93r, cz75, hk_mp5a5, uzi, m9a4
        { id: "tacz:45acp", weight: 10, countMin: 12, countMax: 48 }, // m1911, p320, ump45, vector45, hk_mk23
        { id: "tacz:22wmr", weight: 10, countMin: 16, countMax: 64 }, // taurus943
        { id: "tacz:57x28", weight: 8, countMin: 12, countMax: 48 }, // p90
        { id: "tacz:357mag", weight: 8, countMin: 8, countMax: 32 }, // deagle_golden, rhino357
        { id: "tacz:50ae", weight: 6, countMin: 6, countMax: 24 }, // deagle, timeless50
        { id: "tacz:500mag", weight: 6, countMin: 6, countMax: 24 }, // taurus500

        // Shotgun — common-ish, medium-low count (shells are bulky)
        { id: "tacz:12g", weight: 8, countMin: 4, countMax: 20 }, // aa12, db_long, db_short, m1014, m870, spas_12

        // Intermediate rifle calibers — medium, medium count
        { id: "tacz:556x45", weight: 6, countMin: 10, countMax: 40 }, // aug, g36k, hk416d, m16a1, m16a4, m249, m4a1, scar_l, spr15hb
        { id: "tacz:762x39", weight: 6, countMin: 10, countMax: 40 }, // ak47, rpk, sks_tactical, type_81
        { id: "tacz:58x42", weight: 6, countMin: 10, countMax: 40 }, // qbz_191, qbz_95
        { id: "tacz:545x39", weight: 6, countMin: 10, countMax: 40 },
        { id: "tacz:46x30", weight: 7, countMin: 12, countMax: 40 },
        { id: "tacz:68x51fury", weight: 4, countMin: 5, countMax: 20 },

        // Battle rifle / DMR calibers — uncommon, lower count
        { id: "tacz:308", weight: 4, countMin: 5, countMax: 20 }, // fn_evolys, fn_fal, hk_g3, minigun, mk14, scar_h
        { id: "tacz:762x25", weight: 5, countMin: 8, countMax: 30 },
        { id: "tacz:762x54", weight: 4, countMin: 5, countMax: 20 },
        { id: "tacz:30_06", weight: 4, countMin: 5, countMax: 20 }, // m700, lonetrail
        { id: "tacz:45_70", weight: 4, countMin: 4, countMax: 16 }, // springfield1873
        { id: "tacz:792x57", weight: 4, countMin: 4, countMax: 16 }, // kar98
        { id: "tacz:magnum_r", weight: 3, countMin: 3, countMax: 12 },

        // Sniper / anti-materiel — rare, low count
        { id: "tacz:338", weight: 2, countMin: 2, countMax: 8 }, // ai_awp
        { id: "tacz:50bmg", weight: 2, countMin: 2, countMax: 8 }, // m107, m95

        // Heavy / explosive — very rare, very low count
        { id: "tacz:40mm", weight: 1, countMin: 1, countMax: 3 }, // m320
        { id: "tacz:rpg_rocket", weight: 1, countMin: 1, countMax: 2 }, // rpg7
    ];

    const Preset_0 = {
        "lootTables": ["mostructures:jungle_temple_treasure"],
        "addedLoots": [{ "items": [M16A1, M16A4, DEAGLE, QBZ_95, AK47, TYPE_81, QBZ_191, SPAS_12, UMP45, HK_MP5A5], "baseChance": 0.2 }]
    }

    const Preset_1 = {
        "lootTables": [
            "explorify:chest/supply_cache",
            /.*chests?.*(supply|armorer|treasure|tresure|vault)/
        ],
        "addedLoots": [Grade_1, Grade_2, Grade_3],
        "chanceIncrease": 0.02
    }
    const Preset_2 = {
        "lootTables": [
            /.*chests?.*(deep_dark|city)/
        ],
        "addedLoots": [Grade_4, Grade_5, Grade_6],
        "chanceIncrease": 0.05
    }
    const Preset_3 = {
        "lootTables": [
            /.*:chests?\/.*$/,
            /mvs:.*mineshaft\/.*$/,
            /mvs:houses.*$/,
            /mvs:large_carts.*$/,
            /mvs:general$/,
            "create_ltab:nether/basic_loot",
            "create_ltab:desert/basic_loot"
        ],
        "addedLoots": [Grade_1, Grade_2, Grade_3, Grade_4, Grade_5, Grade_6]
    }
    const Preset_4 = {
        "lootTables": [
            /nova_structures:chests\/end.*$/,
            /.*chests?.*(legendary|legend|boss)/
        ],
        "addedLoots": [Grade_5, Grade_6],
        "chanceOverride": 0.1
    }
    const Preset_5 = {
        "lootTables": [
            /nova_structures:chests\/nether.*/,
            /nova_structures:chests\/lone_citadel\/.*/,
            /nova_structures:chests\/witch_villa\/.*/,
            /nova_structures:chests\/piglin.*/,
            /nova_structures:chests\/illager.*/,
            /nova_structures:chests\/desert.*/,
            /nova_structures:chests\/creeping.*/
        ],
        "addedLoots": [Grade_3, Grade_4, Grade_5],
        "chanceIncrease": 0.05
    }

    const Preset_6 = {
        "lootTables": [
            /structory.*/
        ],
        "addedLoots": [Grade_1, Grade_2, Grade_3, Grade_4, Grade_5, Grade_6]
    }

    const SPECIFIC_PRESETS = [Preset_0, Preset_1, Preset_2, Preset_4, Preset_5];
    const GENERAL_PRESETS = [Preset_3, Preset_6];

    const enabled = true;
    if (enabled) {

        // 1. Collect all table IDs matched by specific presets (for exclusion from general presets)
        let allSpecificFilters = [];
        SPECIFIC_PRESETS.forEach(p => {
            allSpecificFilters = allSpecificFilters.concat(p.lootTables);
        });

        // 2. Apply Specific Presets (High Priority) — target directly, no exclusion needed
        SPECIFIC_PRESETS.forEach(preset => {
            preset.lootTables.forEach(table => {
                applyModifier(event, table, preset);
            });
        });

        // 3. Apply General Presets (Low Priority) — resolve to actual table IDs first,
        //    then subtract any already covered by specific presets.
        //
        //    NOTE: LootTableList (returned by event.modifyLootTables) does NOT support
        //    addCondition() with a runtime callback. The exclusion must be done statically
        //    at script-load time using getLootTableIds() + set subtraction.
        GENERAL_PRESETS.forEach(preset => {
            preset.lootTables.forEach(table => {
                // Resolve matching IDs for this general filter
                let matchedIds = event.getLootTableIds(table);

                // Subtract IDs that are already handled by a specific preset
                let exclusiveIds = matchedIds.filter(id => !matchesAnyFilter(id, allSpecificFilters));

                if (exclusiveIds.length === 0) return;

                console.log("[TACZ Loot] General filter '" + String(table) + "' matched " + exclusiveIds.length + " exclusive tables.");
                exclusiveIds.forEach(id => {
                    applyModifier(event, id, preset);
                });
            });
        });
    }

    // Helper: check if a table ID matches any filter (string or regex)
    // Defined at top-level event scope so Rhino can see it inside arrow function callbacks.
    function matchesAnyFilter(id, filters) {
        return filters.some(f => (f instanceof RegExp) ? f.test(id) : id === String(f));
    }

    function applyModifier(event, table, preset) {
        let modifier = event.modifyLootTables(table);

        preset.addedLoots.forEach(loot => {
            let chance = loot.baseChance;
            if (preset.chanceIncrease) {
                chance = chance + preset.chanceIncrease;
            }
            if (preset.chanceOverride) {
                chance = preset.chanceOverride;
            }

            modifier.createPool(pool => {
                pool.rolls(2); // if roll = 1 it would either drop gun or ammo , confirmed it works like that in the game as of 1.21.1 based on ingame tests
                pool.when(c => c.randomChance(chance));

                loot.items.forEach(gun => {
                    AMMO_TYPES.forEach(ammo => {
                        pool.addEntry(
                            LootEntry.group(
                                LootEntry.of(gun).withWeight(1),
                                LootEntry.of(Item.of("tacz:ammo", { "minecraft:custom_data": { "AmmoId": ammo.id } }))
                                    .withWeight(1) // to balance with the gun, so that pool #x = gun (50%) + ammo (50%)
                                    .setCount([ammo.countMin, ammo.countMax])
                            ) // cannot put withWeight() here dumbass , read the API docs
                        );
                    });
                });
            });
        });
    }

});

LootJS.modifiers(event => {
    event
        .addBlockModifier("waystones:portstone")
        .replaceLoot("#waystones:portstones", "minecraft:cobblestone")
});
LootJS.modifiers(event => {
    event
        .addBlockModifier("#waystones:portstones")
        .replaceLoot(/waystones:.*portstone/, "minecraft:glass")
});
LootJS.modifiers(event => {
    event
        .addBlockModifier("#waystones:sharestones")
        .replaceLoot("#waystones:sharestones", "minecraft:dirt")
});

//works
LootJS.modifiers(event => {
    event
        .addBlockModifier("waystones:waystone")
        .replaceLoot("waystones:waystone", "minecraft:cobblestone")
});
