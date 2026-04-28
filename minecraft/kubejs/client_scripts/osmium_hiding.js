
RecipeViewerEvents.removeEntriesCompletely('item', event => {
    event.remove([
        'alltheores:osmium_ingot',
        'alltheores:osmium_dust',
        'alltheores:osmium_nugget',
        'alltheores:osmium_block',
        'alltheores:raw_osmium',
        'alltheores:raw_osmium_block',
        'alltheores:osmium_ore',
        'alltheores:deepslate_osmium_ore',
        'alltheores:nether_osmium_ore',
        'alltheores:end_osmium_ore',
        'alltheores:other_osmium_ore',
        'alltheores:osmium_gear',
        'alltheores:osmium_plate',
        'alltheores:osmium_rod',
        'productivemetalworks:molten_osmium_bucket'
    ])
})

RecipeViewerEvents.removeEntriesCompletely('fluid', event => {
    event.remove('productivemetalworks:molten_osmium')
})
