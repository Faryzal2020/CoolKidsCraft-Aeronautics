// priority: 98
// Removes all banned flight/elytra items from every loot table so they cannot
// be obtained through chests, mob drops, fishing, etc.
// Items here should mirror the banned_items list in server_banlist_config.json.

LootJS.modifiers(event => {
    const bannedLootItems = [
        "minecraft:elytra",
        "oritech:jetpack_exo_elytra",
        "oritech:jetpack_elytra",
        "deeperdarker:soul_elytra",
        "draconicevolution:item_chaotic_flight",
        "draconicevolution:item_draconic_flight",
        "draconicevolution:item_wyvern_flight",
        "cataclysm:ignitium_elytra_chestplate",
        "pneumaticcraft:elytra_upgrade",
        "silentgear:elytra_blueprint",
        "silentgear:elytra_template",
        "silentgear:elytra_wings",
        "silentgear:elytra",
    ];

    // Apply to ALL loot tables (chests, entities, blocks, fishing, etc.)
    let modifier = event.addTableModifier(/.*/);
    bannedLootItems.forEach(item => {
        modifier.removeLoot(item);
    });

});
