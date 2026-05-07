

ServerEvents.recipes(event => {

    function sagMill(input, energy, output) {
        event.custom(
            {
                type: 'enderio:sag_milling',
                energy: energy,
                input: Ingredient.of(input).toJson(),
                outputs: [
                    {
                        item: {
                            count: output.count,
                            id: output.item
                        }
                    }
                ]
            }
        )
    }

    //sagMill(input, energy, output{item, count})
    if (Platform.isLoaded('actuallyadditions')) {
        sagMill('#c:ores/black_quartz', 2400, { item: 'actuallyadditions:black_quartz', count: 2 })
    }
    if (Platform.isLoaded('powah')) {
        sagMill('#c:ores/uraninite_poor', 2400, { item: 'powah:uraninite_raw', count: 2 })
        sagMill('#c:ores/uraninite_regular', 2400, { item: 'powah:uraninite_raw', count: 4 })
        sagMill('#c:ores/uraninite_dense', 2400, { item: 'powah:uraninite_raw', count: 6 })
    }
    if (Platform.isLoaded('silentgear')) {
        sagMill('#c:ores/bort', 2400, { item: 'silentgear:bort', count: 3 })
    }
    global.xycraftColours.forEach(colour => {
        sagMill(`#c:ores/xychorium_${colour}`, 2400, { item: `xycraft_world:xychorium_gem_${colour}`, count: 4 })
    })

    sagMill('#c:raw_materials/nickel', 2400, { item: 'oritech:nickel_dust', count: 2 })
    sagMill('#c:raw_materials/lithium', 2400, { item: 'tfmg:crushed_raw_lithium', count: 2 })
    sagMill('#c:raw_materials/lead', 2400, { item: 'create:crushed_raw_lead', count: 2 })
    sagMill('#c:raw_materials/silver', 2400, { item: 'create:crushed_raw_silver', count: 2 })
    sagMill('#c:raw_materials/zinc', 2400, { item: 'create:crushed_raw_zinc', count: 2 })
    sagMill('#c:raw_materials/aluminum', 2400, { item: 'create:crushed_raw_aluminum', count: 2 })
})

