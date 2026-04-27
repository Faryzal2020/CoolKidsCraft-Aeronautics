
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

    // Hide Productive Bees variants
    event.remove(Item.of('productivebees:configurable_honeycomb', '{"productivebees:bee_type":"productivebees:osmium"}'))
    event.remove(Item.of('productivebees:configurable_comb', '{"productivebees:bee_type":"productivebees:osmium"}'))
    // Additional check for 1.21 component path
    event.remove(Item.of('productivebees:configurable_honeycomb', '{"minecraft:custom_data":{"productivebees":{"bee_type":"productivebees:osmium"}}}'))
})

RecipeViewerEvents.removeEntriesCompletely('fluid', event => {
    event.remove('productivemetalworks:molten_osmium')
})
