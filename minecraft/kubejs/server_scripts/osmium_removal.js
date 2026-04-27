
ServerEvents.recipes(event => {
    const osmiumItems = [
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
    ]

    osmiumItems.forEach(item => {
        event.remove({ output: item })
        event.remove({ input: item })
    })

    // Productive Bees Osmium Honeycomb removal
    // Targeting both NBT (older) and Components (1.20.5+)
    event.remove({ output: 'productivebees:configurable_honeycomb', nbt: { "productivebees:bee_type": "productivebees:osmium" } })
    event.remove({ output: 'productivebees:configurable_comb', nbt: { "productivebees:bee_type": "productivebees:osmium" } })

    // For 1.21+ components
    event.remove({ output: 'productivebees:configurable_honeycomb', components: { "productivebees:bee_type": "productivebees:osmium" } })
    event.remove({ output: 'productivebees:configurable_comb', components: { "productivebees:bee_type": "productivebees:osmium" } })

    // Remove recipes that result in molten osmium
    event.remove({ output: 'productivemetalworks:molten_osmium' })
})

ServerEvents.tags('item', event => {
    const osmiumItems = [
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
        'alltheores:osmium_rod'
    ]

    event.removeAllTagsFrom(osmiumItems)

    // Explicitly remove from common tags just in case
    event.remove('c:ingots/osmium', 'alltheores:osmium_ingot')
    event.remove('c:dusts/osmium', 'alltheores:osmium_dust')
    event.remove('c:nuggets/osmium', 'alltheores:osmium_nugget')
    event.remove('c:storage_blocks/osmium', 'alltheores:osmium_block')
    event.remove('c:ores/osmium', '#c:ores/osmium')
})

ServerEvents.tags('fluid', event => {
    event.remove('c:molten_osmium', 'productivemetalworks:molten_osmium')
})

