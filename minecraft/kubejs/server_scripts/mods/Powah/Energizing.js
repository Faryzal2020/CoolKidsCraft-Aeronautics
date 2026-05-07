ServerEvents.tags('item', event => {
    event.add('c:storage_blocks/blaze_powder', 'kubejs:blaze_powder_block')
    event.add('c:storage_blocks/blaze_rod', 'kubejs:blaze_block')
})

ServerEvents.recipes(event => {
    //Blaze Powder
    event.shaped('kubejs:blaze_powder_block', [
        'SSS',
        'SSS',
        'SSS'
    ], {
        S: 'minecraft:blaze_powder'
    })
    event.shapeless('9x minecraft:blaze_powder', [ // arg 1: output
        'kubejs:blaze_powder_block'
    ])
    //Blaze Block
    // event.shaped('kubejs:blaze_block', [
    //     'SSS',
    //     'SSS',
    //     'SSS'
    // ], {
    //     S: 'minecraft:blaze_rod'
    // })
    // event.shapeless('9x minecraft:blaze_rod', [ // arg 1: output
    //     'kubejs:blaze_block'
    // ])

    function bulk_energizing(input, input_number, output, energy, id) {
        let loop = 0
        let ingredients = []
        let ingredientStr = input.startsWith('#') ? input : (input.startsWith('c:') || input.startsWith('forge:') ? '#' + input : input)
        while (loop <= 5) {
            for (let item = 1; item <= input_number; item++) {
                ingredients.push(ingredientStr)
            }
            let count = (loop + input_number) / input_number
            event.recipes.powah.energizing(ingredients.slice(), Item.of(output, count), energy * count).id(`kubejs:energizing/${count}x_${id}`)
            loop = loop + input_number
        }
    }

    function energizing(input, output, energy, id) {
        let ingredients = []

        for (let item = 1; item <= input.count; item++) {
            if (input.tag) {
                ingredients.push('#' + input.tag)
            } else {
                ingredients.push(input.item)
            }
        }

        event.recipes.powah.energizing(ingredients, Item.of(output.item, output.count || 1), energy).id(`kubejs:energizing/${id}`)
    }

    bulk_energizing('c:ices/blue', 2, 'powah:dry_ice', 10000, 'dry_ice')
    bulk_energizing('c:ingots/uranium', 1, 'powah:uraninite', 30000, 'uraninite_from_uranium')
    bulk_energizing('c:raw_materials/uraninite', 1, 'powah:uraninite', 2000, 'uraninite_from_raw')
    bulk_energizing('bigreactors:yellorium_block', 1, 'powah:uraninite_block', 270000, 'uraninite_from_yellorium_block')
    bulk_energizing('oritech:uranium_dust_block', 1, 'powah:uraninite_block', 270000, 'uraninite_from_uranium_dust_block')
    energizing({ tag: 'c:storage_blocks/blaze_powder', count: 4 }, { item: 'powah:blazing_crystal_block' }, 1080000, 'blazing_crystal_from_powder_block')
    energizing({ tag: 'c:storage_blocks/blaze_rod', count: 1 }, { item: 'powah:blazing_crystal_block' }, 1080000, 'blazing_crystal_from_block')
})



