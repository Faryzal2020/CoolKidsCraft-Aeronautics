const OBSIDIAN_HARDNESS = 50.0
const OBSIDIAN_RESISTANCE = 1200.0

ServerEvents.tags('block', event => {
    // 1. Define the tiers of "Incorrect For" tags
    const level_0 = ['minecraft:incorrect_for_wooden_tool', 'minecraft:incorrect_for_gold_tool']
    const level_1 = ['minecraft:incorrect_for_stone_tool']
    const level_2 = ['minecraft:incorrect_for_iron_tool']
    const level_3 = [
        'minecraft:incorrect_for_diamond_tool',
        'silentgems:incorrect_for_diamond_tools'
    ]

    const moddedBelowNetherite = [
        'twilightforest:incorrect_for_knightmetal_tools',
        'twilightforest:incorrect_for_fiery_tools',
        'twilightforest:incorrect_for_ironwood_tools',
        'twilightforest:incorrect_for_steeleaf_tools',
        'twilightforest:incorrect_for_auroracite_tools',
        'twilightforest:incorrect_for_ice_tools',
        'silentgems:incorrect_for_tanzanite_tools',
        'silentgems:incorrect_for_iolite_tools',
        'silentgems:incorrect_for_bone_tools',
        'silentgems:incorrect_for_ammolite_tools',
        'silentgems:incorrect_for_turquoise_tools',
        'silentgems:incorrect_for_netherrack_tools',
        'silentgems:incorrect_for_moldavite_tools',
        'silentgems:incorrect_for_quartz_tools',
        'silentgems:incorrect_for_sandstone_tools',
        'silentgems:incorrect_for_dimerald_tools',
        'silentgems:incorrect_for_stone_tools',
        'silentgems:incorrect_for_flint_tools',
        'silentgems:incorrect_for_amethyst_tools',
        'silentgems:incorrect_for_bamboo_tools',
        'silentgems:incorrect_for_heliodor_tools',
        'silentgems:incorrect_for_azure_silver_tools',
        'silentgems:incorrect_for_gold_tools',
        'silentgems:incorrect_for_blackstone_tools',
        'silentgems:incorrect_for_lapis_lazuli_tools',
        'silentgems:incorrect_for_citrine_tools',
        'silentgems:incorrect_for_alexandrite_tools',
        'silentgems:incorrect_for_pearl_tools',
        'silentgems:incorrect_for_basalt_tools',
        'silentgems:incorrect_for_blaze_gold_tools',
        'silentgems:incorrect_for_topaz_tools',
        'silentgems:incorrect_for_terracotta_tools',
        'silentgems:incorrect_for_carnelian_tools',
        'silentgems:incorrect_for_bronze_tools',
        'silentgems:incorrect_for_peridot_tools',
        'silentgems:incorrect_for_copper_tools',
        'silentgems:incorrect_for_aquamarine_tools',
        'silentgems:incorrect_for_opal_tools',
        'silentgems:incorrect_for_sapphire_tools',
        'silentgems:incorrect_for_ruby_tools',
        'silentgems:incorrect_for_iron_tools',
        'silentgems:incorrect_for_emerald_tools',
        'silentgems:incorrect_for_crimson_iron_tools'
    ]

    // 2. Apply Netherite Requirement to END BLOCKS
    const endFilter = /^(?=.*end)(?=.*(stone|brick)).*$/
    event.add('minecraft:needs_netherite_tool', endFilter)
    event.add('neoforge:needs_netherite_tool', endFilter)

    level_3.concat(level_2, level_1, level_0, moddedBelowNetherite).forEach(tag => {
        event.add(tag, endFilter)
    })

    // 3. Apply Diamond Requirement to NETHER BRICKS
    const netherFilter = /^(?=.*nether)(?=.*brick).*$/
    event.add('minecraft:needs_diamond_tool', netherFilter)
    event.add('neoforge:needs_diamond_tool', netherFilter)

    level_3.forEach(tag => event.remove(tag, netherFilter))
    level_2.concat(level_1, level_0).forEach(tag => event.add(tag, netherFilter))
})
