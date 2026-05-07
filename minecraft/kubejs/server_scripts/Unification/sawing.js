ServerEvents.tags('item', event => {


    //regions_unexplored
    event.add('regions_unexplored:magnolia_logs', [
        'regions_unexplored:magnolia_log',
        'regions_unexplored:stripped_magnolia_log',
        'regions_unexplored:magnolia_wood',
        'regions_unexplored:stripped_magnolia_wood',
    ])
    event.add('regions_unexplored:alpha_logs', [
        'regions_unexplored:alpha_log'
    ])
    event.add('regions_unexplored:silver_birch_logs', [
        'regions_unexplored:silver_birch_log',
        'regions_unexplored:silver_birch_wood',
    ])

    // completing #minecraft:logs
    event.add('minecraft:logs', [
        '#integrateddynamics:menril_logs',
        '#deeperdarker:bloom_stems',
        "#deeperdarker:echo_logs",
        "aquaculture:driftwood",
    ])
})
