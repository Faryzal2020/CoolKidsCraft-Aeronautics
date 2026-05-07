
ServerEvents.recipes(event => {
    const iridiumItems = [
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
})

ServerEvents.tags('item', event => {
    // Explicitly remove from common tags
    event.remove('c:ores/iridium', '#c:ores/iridium')
})

ServerEvents.tags('fluid', event => {
    event.remove('c:molten_iridium', 'productivemetalworks:molten_iridium')
})

