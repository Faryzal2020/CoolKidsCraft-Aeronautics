
ServerEvents.recipes(event => {
    const osmiumItems = [
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
    event.remove({ id: /.*molten_osmium.*/ })
})

ServerEvents.tags('item', event => {
    const osmiumItems = [
    ]

    event.removeAllTagsFrom(osmiumItems)

    // Explicitly remove from common tags just in case
    event.remove('c:ores/osmium', '#c:ores/osmium')
})

ServerEvents.tags('fluid', event => {
    event.remove('c:molten_osmium', 'productivemetalworks:molten_osmium')
})

