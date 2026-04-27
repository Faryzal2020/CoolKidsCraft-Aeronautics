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

--- OTHER STRUCTURE MODS (Use Vanilla Tables) ---
- MoStructures, Create Structures Arise, The Lost City
- (These mods primarily use vanilla loot tables like minecraft:chests/abandoned_mineshaft)
================================================================================
*/

LootJS.modifiers((event) => {

    // EXAMPLES:

    /* 
    // Add a Diamond to ALL Dungeons Arise chests (5% chance)
    event.addLootTypeModifier("dungeons_arise:chests")
        .addLoot("minecraft:diamond")
        .randomChance(0.05);
    */

    /*
    // Add Arcane Essence to Mountain Towers
    event.addLootTypeModifier("irons_spellbooks:chests/mountain_tower")
        .addLoot("irons_spellbooks:arcane_essence")
        .withWeight(10);
    */

});
