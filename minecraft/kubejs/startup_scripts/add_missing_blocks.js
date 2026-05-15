// Register the block and items in the mekanism namespace for compatibility
StartupEvents.registry('block', event => {
    event.create('mekanism:block_refined_obsidian')
        .soundType('metal')
        .hardness(50.0) // Tough like obsidian
        .resistance(1200.0)
        .tagBlock('minecraft:mineable/pickaxe')
        .tagBlock('minecraft:needs_diamond_tool')
        .requiresTool(true)
    event.create('mekanism:block_refined_glowstone')
        .soundType('metal')
        .lightLevel(1.0)
        .hardness(30.0)
        .resistance(300.0)
        .tagBlock('minecraft:mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')
        .requiresTool(true)
})

StartupEvents.registry('item', event => {
    event.create('mekanism:ingot_refined_obsidian')
    event.create('mekanism:dust_refined_obsidian')
    event.create('mekanism:nugget_refined_obsidian')
    event.create('mekanism:ingot_refined_glowstone')
    event.create('mekanism:nugget_refined_glowstone')
})
