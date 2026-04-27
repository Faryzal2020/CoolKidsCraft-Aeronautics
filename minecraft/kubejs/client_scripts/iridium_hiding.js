
RecipeViewerEvents.removeEntriesCompletely('item', event => {
    event.remove([
        'alltheores:iridium_ingot',
        'alltheores:iridium_dust',
        'alltheores:iridium_nugget',
        'alltheores:iridium_block',
        'alltheores:raw_iridium',
        'alltheores:raw_iridium_block',
        'alltheores:iridium_ore',
        'alltheores:deepslate_iridium_ore',
        'alltheores:nether_iridium_ore',
        'alltheores:end_iridium_ore',
        'alltheores:other_iridium_ore',
        'alltheores:iridium_gear',
        'alltheores:iridium_plate',
        'alltheores:iridium_rod',
        'productivemetalworks:molten_iridium_bucket'
    ])
})

RecipeViewerEvents.removeEntriesCompletely('fluid', event => {
    event.remove([
        'productivemetalworks:molten_iridium',
        'tfmg:crude_oil'
    ])
})
