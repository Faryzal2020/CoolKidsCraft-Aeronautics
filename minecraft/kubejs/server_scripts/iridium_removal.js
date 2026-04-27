
ServerEvents.recipes(event => {
    const iridiumItems = [
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
    ]

    iridiumItems.forEach(item => {
        event.remove({ output: item })
        event.remove({ input: item })
    })

    // Productive Bees Iridium Honeycomb removal
    event.remove({ output: 'productivebees:configurable_honeycomb', nbt: { "productivebees:bee_type": "productivebees:iridium" } })
    event.remove({ output: 'productivebees:configurable_comb', nbt: { "productivebees:bee_type": "productivebees:iridium" } })

    // For 1.21+ components
    event.remove({ output: 'productivebees:configurable_honeycomb', components: { "productivebees:bee_type": "productivebees:iridium" } })
    event.remove({ output: 'productivebees:configurable_comb', components: { "productivebees:bee_type": "productivebees:iridium" } })

    // Remove recipes that result in molten iridium
    event.remove({ output: 'productivemetalworks:molten_iridium' })
})

ServerEvents.tags('item', event => {
    const iridiumItems = [
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
        'alltheores:iridium_rod'
    ]

    event.removeAllTagsFrom(iridiumItems)

    // Explicitly remove from common tags
    event.remove('c:ingots/iridium', 'alltheores:iridium_ingot')
    event.remove('c:dusts/iridium', 'alltheores:iridium_dust')
    event.remove('c:nuggets/iridium', 'alltheores:iridium_nugget')
    event.remove('c:storage_blocks/iridium', 'alltheores:iridium_block')
    event.remove('c:ores/iridium', '#c:ores/iridium')
})

ServerEvents.tags('fluid', event => {
    event.remove('c:molten_iridium', 'productivemetalworks:molten_iridium')
})

