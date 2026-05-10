LootJS.modifiers(event => {
    event.addLootModifier(/.*/) // Scans every loot table
        .removeLoot('supplementaries:lumisene_bucket')
        .removeLoot('supplementaries:lumisene_bottle');
});

BlockEvents.placed('supplementaries:lumisene', event => {
    event.cancel() // Stop placement by players/dispensers
})
