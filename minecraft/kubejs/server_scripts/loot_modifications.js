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

--- IRON'S SPELLS 'N SPELLBOOKS (irons_spellbooks) ---
- irons_spellbooks:chests/mountain_tower
- irons_spellbooks:chests/evoker_fort
- irons_spellbooks:chests/mangrove_hut
- irons_spellbooks:chests/catacombs
- irons_spellbooks:chests/ancient_battleground

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

--- APOTHEOSIS ---
- apotheosis:chests/boss_dungeon

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

    /*
    // Add Arcane Essence to Mountain Towers
    event.addLootTableModifier("irons_spellbooks:chests/mountain_tower")
        .addLoot("irons_spellbooks:arcane_essence")
        .withWeight(10);
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

    const Grade_1 = { "items": [M1911, GLOCK_17, SPRINGFIELD1873, DB_SHORT, DB_LONG], "baseChance": 0.1 }
    const Grade_2 = { "items": [M4A1, GLOCK_17, P320, B93R, CZ75, HK416D, SCAR_L, G36K, AUG, M870, UZI], "baseChance": 0.075 }
    const Grade_3 = { "items": [M16A1, M16A4, DEAGLE, QBZ_95, AK47, TYPE_81, QBZ_191, SPAS_12, UMP45, HK_MP5A5], "baseChance": 0.05 }
    const Grade_4 = { "items": [SPR15HB, M700, HK_G3, SKS_TACTICAL, SCAR_H, FN_FAL, AA12, M1014, P90], "baseChance": 0.03 }
    const Grade_5 = { "items": [M107, TIMELESS50, AI_AWP, MK14, VECTOR45, M320, M249, RPK], "baseChance": 0.02 }
    const Grade_6 = { "items": [DEAGLE_GOLDEN, M95, RPG7, MINIGUN, FN_Evolys], "baseChance": 0.01 }

    const AMMO_TYPES = [
        "tacz:9mm", "tacz:45acp", "tacz:57x28", "tacz:12g",
        "tacz:556x45", "tacz:762x39", "tacz:762x51", "tacz:762x54",
        "tacz:308", "tacz:338", "tacz:50bmg", "tacz:50ae"
    ];

    const Preset_0 = {
        "lootTables": ["apotheosis:chests/chest_valuable", "mostructures:jungle_temple_treasure"],
        "addedLoots": [{ "items": [M16A1, M16A4, DEAGLE, QBZ_95, AK47, TYPE_81, QBZ_191, SPAS_12, UMP45, HK_MP5A5], "baseChance": 0.5 }]
    }

    const Preset_1 = {
        "lootTables": [
            "explorify:chest/supply_cache",
            /.*chests.*(supply|armorer)/
        ],
        "addedLoots": [Grade_1, Grade_2, Grade_3],
        "chanceOverride": 0.5
    }
    const Preset_2 = {
        "lootTables": [
            /.*chests.*(legendary|treasure|legend|tresure|vault|boss|deep_dark|city)/
        ],
        "addedLoots": [Grade_4, Grade_5, Grade_6],
        "chanceOverride": 1
    }
    const Preset_3 = {
        "lootTables": [
            /.*:chests\/.*/,
            /.*:chest\/.*/,
            /mvs:.*mineshaft\/.*/,
            /mvs:houses.*/,
            /mvs:large_carts.*/,
            /mvs:general/,
            /aether:chests\/dungeon\/bronze\/.*/,
            "create_ltab:nether/basic_loot",
            "create_ltab:desert/basic_loot"
        ],
        "addedLoots": [Grade_1, Grade_2, Grade_3, Grade_4, Grade_5, Grade_6]
    }
    const Preset_4 = {
        "lootTables": [
            /nova_structures:chests\/end.*/,
            /aether:chests\/dungeon\/silver\/.*/
        ],
        "addedLoots": [Grade_6],
        "chanceOverride": 0.9
    }
    const Preset_5 = {
        "lootTables": [
            /nova_structures:chests\/nether.*/,
            /nova_structures:chests\/lone_citadel\/.*/,
            /nova_structures:chests\/witch_villa\/.*/,
            /nova_structures:chests\/piglin.*/,
            /nova_structures:chests\/illager.*/,
            /nova_structures:chests\/desert.*/,
            /nova_structures:chests\/creeping.*/,
            /aether:chests\/dungeon\/gold\/.*/,
        ],
        "addedLoots": [Grade_3, Grade_4, Grade_5],
        "chanceOverride": 0.4
    }

    const Preset_6 = {
        "lootTables": [
            /structory.*/
        ],
        "addedLoots": [Grade_1, Grade_2, Grade_3, Grade_4, Grade_5, Grade_6]
    }

    const EnabledPresets = [Preset_0, Preset_1, Preset_2, Preset_3, Preset_4, Preset_5, Preset_6]

    //Testing manual entry
    /*let table = Preset_0.lootTables[1]
    let loot = Preset_0.addedLoots[0]
    event.getLootTable(table).createPool(pool => { // create pool for specific loot table
        pool.rolls(2) // 2 rolls for each hit
        pool.when(c => c.randomChance(loot.baseChance))
        let ammo = AMMO_TYPES[Math.floor(Math.random() * AMMO_TYPES.length)] // pick whichever of the ammo
        console.log("[TACZ Loot] Loading ammo: " + ammo)
        let ammoItem = Item.of("tacz:ammo", { "minecraft:custom_data": { "AmmoId": ammo } })
        console.log("[TACZ Loot] Loading ammoItem: " + ammoItem)
        // Add the gun into the pool
        let gunId = loot.items[Math.floor(Math.random() * Preset_0.lootTables.length)] // pick whichever of the guns
        console.log("[TACZ Loot] Loading gun: " + gunId)
        pool.addEntry(
            LootEntry.sequence(
                LootEntry.of(gunId),
                LootEntry.of(ammoItem).setCount([8, 32])
            )
        )
    })*/

    const enabled = true
    // Process all enabled presets
    if (enabled) {
        EnabledPresets.forEach(preset => {
            // Iterate through each table/regex individually as modifyLootTables expects a single filter
            preset.lootTables.forEach(table => {
                console.log("[TACZ Loot] Modifying table: " + String(table));
                let modifier = event.modifyLootTables(table);
                preset.addedLoots.forEach(loot => {
                    let chance = loot.baseChance
                    if (preset.chanceOverride) {
                        chance = preset.chanceOverride
                    }
                    modifier.createPool(pool => {
                        pool.rolls(2);
                        pool.when(c => c.randomChance(chance));

                        loot.items.forEach(gun => {
                            AMMO_TYPES.forEach(ammoId => {
                                pool.addEntry(LootEntry.sequence(
                                    LootEntry.of(gun).withWeight(1),
                                    LootEntry.of(Item.of("tacz:ammo", { "minecraft:custom_data": { "AmmoId": ammoId } }))
                                        .withWeight(1)
                                        .setCount([8, 32])
                                ));
                            });
                        });
                    });
                });
            });
        });
    }

});
